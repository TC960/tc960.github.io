/**
 * Cloudflare Worker: Web Analytics proxy.
 *
 * Holds the Account Analytics API token server-side and exposes a small,
 * sanitized JSON summary of the site's Web Analytics (RUM) data so a static
 * frontend can render it without ever seeing the token.
 *
 * Env (see wrangler.toml):
 *   CF_ACCOUNT_ID    - Cloudflare account id (var)
 *   CF_SITE_TAG      - Web Analytics site tag = the beacon token (var)
 *   ALLOWED_ORIGINS  - comma-separated origins allowed to read this (var)
 *   CF_API_TOKEN     - API token with "Account Analytics: Read" (SECRET)
 *
 * Query params:
 *   ?days=N   - lookback window, 1..90 (default 30)
 */

const GRAPHQL_ENDPOINT = 'https://api.cloudflare.com/client/v4/graphql';

// Values are all server-controlled (env vars + computed ISO timestamps), so
// inlining them into the query avoids Cloudflare's custom-scalar typing quirks.
function buildQuery(accountTag, siteTag, start, end) {
  const f = `{ AND: [{ datetime_geq: "${start}" }, { datetime_leq: "${end}" }, { siteTag: "${siteTag}" }] }`;
  return `
query {
  viewer {
    accounts(filter: { accountTag: "${accountTag}" }) {
      totals: rumPageloadEventsAdaptiveGroups(filter: ${f}, limit: 1) {
        count
        sum { visits }
      }
      countries: rumPageloadEventsAdaptiveGroups(filter: ${f}, limit: 300, orderBy: [sum_visits_DESC]) {
        count
        sum { visits }
        dimensions { metric: countryName }
      }
      referrers: rumPageloadEventsAdaptiveGroups(filter: ${f}, limit: 25, orderBy: [sum_visits_DESC]) {
        count
        sum { visits }
        dimensions { metric: refererHost }
      }
      paths: rumPageloadEventsAdaptiveGroups(filter: ${f}, limit: 25, orderBy: [count_DESC]) {
        count
        dimensions { metric: requestPath }
      }
      daily: rumPageloadEventsAdaptiveGroups(filter: ${f}, limit: 100, orderBy: [date_ASC]) {
        count
        sum { visits }
        dimensions { metric: date }
      }
    }
  }
}`;
}

function corsHeaders(origin, allowed) {
  const list = (allowed || '').split(',').map((s) => s.trim()).filter(Boolean);
  const allow = list.includes(origin) ? origin : list[0] || '*';
  return {
    'Access-Control-Allow-Origin': allow,
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Vary': 'Origin',
  };
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '';
    const cors = corsHeaders(origin, env.ALLOWED_ORIGINS);

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: cors });
    }
    if (request.method !== 'GET') {
      return json({ error: 'Method not allowed' }, 405, cors);
    }
    if (!env.CF_API_TOKEN || !env.CF_ACCOUNT_ID || !env.CF_SITE_TAG) {
      return json({ error: 'Worker not configured (missing CF_API_TOKEN / CF_ACCOUNT_ID / CF_SITE_TAG).' }, 500, cors);
    }

    const url = new URL(request.url);
    let days = parseInt(url.searchParams.get('days') || '30', 10);
    if (!Number.isFinite(days) || days < 1) days = 30;
    if (days > 90) days = 90;

    const end = new Date();
    const start = new Date(end.getTime() - days * 24 * 60 * 60 * 1000);
    const startISO = start.toISOString();
    const endISO = end.toISOString();

    let payload;
    try {
      const res = await fetch(GRAPHQL_ENDPOINT, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${env.CF_API_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: buildQuery(env.CF_ACCOUNT_ID, env.CF_SITE_TAG, startISO, endISO) }),
      });
      payload = await res.json();
    } catch (err) {
      return json({ error: 'Upstream request failed', detail: String(err) }, 502, cors);
    }

    if (payload.errors && payload.errors.length) {
      return json({ error: 'GraphQL error', detail: payload.errors }, 502, cors);
    }

    const account = payload?.data?.viewer?.accounts?.[0];
    if (!account) {
      return json({ error: 'No analytics data returned' }, 502, cors);
    }

    const totals = account.totals?.[0] || { count: 0, sum: { visits: 0 } };

    const result = {
      range: { start: startISO, end: endISO, days },
      totals: {
        pageviews: totals.count || 0,
        visits: totals.sum?.visits || 0,
      },
      countries: (account.countries || []).map((r) => ({
        code: r.dimensions.metric || 'Unknown',
        visits: r.sum?.visits || 0,
        pageviews: r.count || 0,
      })),
      referrers: (account.referrers || []).map((r) => ({
        host: r.dimensions.metric || 'direct',
        visits: r.sum?.visits || 0,
        pageviews: r.count || 0,
      })),
      paths: (account.paths || []).map((r) => ({
        path: r.dimensions.metric || '/',
        pageviews: r.count || 0,
      })),
      daily: (account.daily || []).map((r) => ({
        date: r.dimensions.metric,
        visits: r.sum?.visits || 0,
        pageviews: r.count || 0,
      })),
      updatedAt: new Date().toISOString(),
    };

    return json(result, 200, { ...cors, 'Cache-Control': 'public, max-age=300' });
  },
};

function json(body, status, headers) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', ...headers },
  });
}
