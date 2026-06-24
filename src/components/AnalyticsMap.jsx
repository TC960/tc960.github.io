import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { scaleSqrt } from 'd3';
import countries from 'i18n-iso-countries';
import enLocale from 'i18n-iso-countries/langs/en.json';
import { ANALYTICS_API_URL, WORLD_GEO_URL } from '../config/analytics';

countries.registerLocale(enLocale);

const RANGES = [
  { label: '7d', days: 7 },
  { label: '30d', days: 30 },
  { label: '90d', days: 90 },
];

const fmt = (n) => (n ?? 0).toLocaleString();

const AnalyticsMap = () => {
  const [days, setDays] = useState(30);
  const [data, setData] = useState(null);
  const [status, setStatus] = useState('loading'); // loading | ok | error | unconfigured
  const [error, setError] = useState('');
  const [hover, setHover] = useState(null); // { name, visits }

  const configured = ANALYTICS_API_URL && !ANALYTICS_API_URL.startsWith('PUT_YOUR');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!configured) {
      setStatus('unconfigured');
      return;
    }
    let cancelled = false;
    setStatus('loading');
    fetch(`${ANALYTICS_API_URL}?days=${days}`)
      .then((r) => r.json())
      .then((json) => {
        if (cancelled) return;
        if (json.error) {
          setError(typeof json.error === 'string' ? json.error : 'Request failed');
          setStatus('error');
          return;
        }
        setData(json);
        setStatus('ok');
      })
      .catch((err) => {
        if (cancelled) return;
        setError(String(err));
        setStatus('error');
      });
    return () => {
      cancelled = true;
    };
  }, [days, configured]);

  // visits keyed by ISO numeric id (matches world-atlas geography ids)
  const { byNumericId, maxVisits } = useMemo(() => {
    const map = {};
    let max = 0;
    (data?.countries || []).forEach((c) => {
      const numeric = countries.alpha2ToNumeric(c.code);
      if (numeric) {
        map[numeric] = (map[numeric] || 0) + c.visits;
        if (map[numeric] > max) max = map[numeric];
      }
    });
    return { byNumericId: map, maxVisits: max };
  }, [data]);

  const colorScale = useMemo(
    () => scaleSqrt().domain([0, maxVisits || 1]).range([0.08, 1]),
    [maxVisits]
  );

  const topCountries = useMemo(() => {
    return [...(data?.countries || [])]
      .filter((c) => c.code && c.code !== 'Unknown')
      .slice(0, 8)
      .map((c) => ({ ...c, name: countries.getName(c.code, 'en') || c.code }));
  }, [data]);

  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white transition-colors duration-300">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-black/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-[1400px] mx-auto px-6 py-6 flex items-center">
          <Link to="/" className="absolute text-lg font-medium hover:text-orange-500 transition-colors">
            ← Back to Portfolio
          </Link>
          <h1 className="text-xl font-medium w-full text-center">Visitor Analytics</h1>
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto px-6 pt-28 pb-16">
        {/* Range switch */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Live, cookieless analytics via Cloudflare. No personal data — aggregate visits only.
          </p>
          <div className="flex gap-1 bg-gray-100 dark:bg-zinc-900 rounded-lg p-1">
            {RANGES.map((r) => (
              <button
                key={r.days}
                onClick={() => setDays(r.days)}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                  days === r.days
                    ? 'bg-orange-500 text-white'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>

        {status === 'unconfigured' && (
          <Notice title="Analytics proxy not configured">
            Set the deployed Worker URL in <code className="text-orange-500">src/config/analytics.js</code> (or the{' '}
            <code className="text-orange-500">VITE_ANALYTICS_API</code> env var) to start showing data.
          </Notice>
        )}
        {status === 'error' && (
          <Notice title="Couldn’t load analytics">{error}</Notice>
        )}
        {status === 'loading' && (
          <div className="py-24 text-center text-gray-400">Loading analytics…</div>
        )}

        {status === 'ok' && data && (
          <>
            {/* Stat cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <Stat label="Visits" value={fmt(data.totals.visits)} />
              <Stat label="Page views" value={fmt(data.totals.pageviews)} />
              <Stat label="Countries" value={fmt(topCountriesCount(data))} />
              <Stat label="Top referrer" value={topReferrer(data)} small />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Map */}
              <div className="lg:col-span-2 bg-gray-50 dark:bg-zinc-900 rounded-xl p-4 relative">
                <ComposableMap
                  projectionConfig={{ scale: 145 }}
                  width={800}
                  height={400}
                  style={{ width: '100%', height: 'auto' }}
                >
                  <Geographies geography={WORLD_GEO_URL}>
                    {({ geographies }) =>
                      geographies.map((geo) => {
                        const v = byNumericId[geo.id] || 0;
                        const t = v > 0 ? colorScale(v) : 0;
                        const fill =
                          v > 0
                            ? `rgba(249, 115, 22, ${Math.max(0.12, t)})`
                            : 'rgba(120,120,120,0.12)';
                        return (
                          <Geography
                            key={geo.rsmKey}
                            geography={geo}
                            fill={fill}
                            stroke="rgba(120,120,120,0.25)"
                            strokeWidth={0.4}
                            style={{
                              default: { outline: 'none' },
                              hover: { outline: 'none', fill: 'rgba(249,115,22,0.9)' },
                              pressed: { outline: 'none' },
                            }}
                            onMouseEnter={() =>
                              setHover({ name: geo.properties.name, visits: v })
                            }
                            onMouseLeave={() => setHover(null)}
                          />
                        );
                      })
                    }
                  </Geographies>
                </ComposableMap>
                {hover && (
                  <div className="absolute top-4 left-4 bg-black/80 text-white text-sm px-3 py-1.5 rounded-md pointer-events-none">
                    <span className="font-medium">{hover.name}</span> · {fmt(hover.visits)} visits
                  </div>
                )}
              </div>

              {/* Lists */}
              <div className="space-y-6">
                <RankList
                  title="Top countries"
                  rows={topCountries.map((c) => ({ label: c.name, value: c.visits }))}
                />
                <RankList
                  title="Referrers"
                  rows={(data.referrers || []).slice(0, 8).map((r) => ({
                    label: r.host || 'direct',
                    value: r.visits,
                  }))}
                />
                <RankList
                  title="Top pages"
                  rows={(data.paths || []).slice(0, 8).map((p) => ({
                    label: p.path || '/',
                    value: p.pageviews,
                  }))}
                />
              </div>
            </div>

            <p className="text-xs text-gray-400 mt-6">
              Last {data.range.days} days · updated {new Date(data.updatedAt).toLocaleString()}
            </p>
          </>
        )}
      </main>
    </div>
  );
};

const topReferrer = (data) => {
  const r = (data.referrers || []).filter((x) => x.host && x.host !== '(none)')[0];
  return r ? r.host : '—';
};
const topCountriesCount = (data) =>
  (data.countries || []).filter((c) => c.code && c.code !== 'Unknown').length;

const Stat = ({ label, value, small }) => (
  <div className="bg-gray-50 dark:bg-zinc-900 rounded-xl p-5">
    <div className={`font-bold text-orange-500 ${small ? 'text-base truncate' : 'text-3xl'}`}>{value}</div>
    <div className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400 mt-1">{label}</div>
  </div>
);

const RankList = ({ title, rows }) => {
  const max = Math.max(1, ...rows.map((r) => r.value));
  return (
    <div>
      <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-2">
        {title}
      </h3>
      <div className="space-y-1.5">
        {rows.length === 0 && <div className="text-sm text-gray-400">No data yet</div>}
        {rows.map((r, i) => (
          <div key={i} className="relative rounded-md overflow-hidden bg-gray-100 dark:bg-zinc-800/60">
            <div
              className="absolute inset-y-0 left-0 bg-orange-500/20"
              style={{ width: `${(r.value / max) * 100}%` }}
            />
            <div className="relative flex justify-between px-3 py-1.5 text-sm">
              <span className="truncate pr-2">{r.label}</span>
              <span className="font-medium tabular-nums">{fmt(r.value)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Notice = ({ title, children }) => (
  <div className="border border-orange-500/30 bg-orange-500/5 rounded-xl p-6 my-8">
    <h2 className="font-semibold mb-1">{title}</h2>
    <p className="text-sm text-gray-600 dark:text-gray-400">{children}</p>
  </div>
);

export default AnalyticsMap;
