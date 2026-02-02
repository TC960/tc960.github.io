# Deployment Guide

This guide explains how to deploy your portfolio to GitHub Pages with EmailJS integration.

## Prerequisites

- GitHub account with push access to this repository
- EmailJS account (https://dashboard.emailjs.com/)

## Setup GitHub Secrets for EmailJS

GitHub Secrets keep your EmailJS credentials secure and out of version control. Follow these steps:

### 1. Get Your EmailJS Credentials

1. Go to https://dashboard.emailjs.com/
2. Log in or create an account
3. Get these values:
   - **Service ID**: From the Email Services page (or use `service_3zgve99` if already created)
   - **Template ID**: Create a new template with these variables:
     - `{{from_name}}` - Sender's name
     - `{{from_email}}` - Sender's email
     - `{{message}}` - Message content
   - **Public Key**: From Account → General → API Keys

### 2. Add Secrets to GitHub Repository

1. Go to your GitHub repository: `https://github.com/TC960/tc960.github.io`
2. Click **Settings** (top navigation)
3. In the left sidebar, click **Secrets and variables** → **Actions**
4. Click **New repository secret** button
5. Add each of these secrets one by one:

#### Secret 1: VITE_EMAILJS_SERVICE_ID
- **Name:** `VITE_EMAILJS_SERVICE_ID`
- **Value:** `service_3zgve99` (or your service ID)
- Click **Add secret**

#### Secret 2: VITE_EMAILJS_TEMPLATE_ID
- **Name:** `VITE_EMAILJS_TEMPLATE_ID`
- **Value:** Your template ID (e.g., `template_abc123`)
- Click **Add secret**

#### Secret 3: VITE_EMAILJS_PUBLIC_KEY
- **Name:** `VITE_EMAILJS_PUBLIC_KEY`
- **Value:** Your public key (looks like a random string)
- Click **Add secret**

### 3. Verify Secrets Are Added

You should see all three secrets listed:
- ✅ VITE_EMAILJS_SERVICE_ID
- ✅ VITE_EMAILJS_TEMPLATE_ID
- ✅ VITE_EMAILJS_PUBLIC_KEY

## Deployment Process

### Automatic Deployment (Recommended)

Every time you push to the `main` branch, GitHub Actions automatically:
1. Builds the site
2. Injects your EmailJS secrets as environment variables
3. Deploys to GitHub Pages

**To deploy:**
```bash
git add .
git commit -m "Your commit message"
git push origin main
```

### Monitor Deployment

1. Go to: `https://github.com/TC960/tc960.github.io/actions`
2. Click on the latest workflow run
3. Watch the build and deployment progress
4. Typical deployment time: 2-3 minutes

### View Your Site

After successful deployment, visit:
- **Production URL:** `https://tc960.github.io/`

## Local Development with EmailJS

For local development, create a `.env.local` file in the project root:

```env
VITE_EMAILJS_SERVICE_ID=service_3zgve99
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

This file is in `.gitignore` and won't be committed.

Run locally:
```bash
npm run dev
```

## Testing EmailJS

### Test Locally
1. Run `npm run dev`
2. Go to `http://localhost:5173`
3. Fill out the contact form
4. Open browser console (F12)
5. Check for:
   - "EmailJS initialized"
   - Form submission logs
   - Success or error messages

### Test in Production
1. After deploying, visit your live site
2. Fill out the contact form
3. Open browser console (F12)
4. Submit the form
5. Check your email for the message

## Troubleshooting

### EmailJS Not Working in Production

**Issue:** Contact form doesn't send emails after deployment

**Solution:**
1. Verify secrets are added correctly in GitHub Settings
2. Check the Actions workflow completed successfully
3. Open browser console on your live site
4. Look for error messages when submitting the form

Common errors:
- `"EmailJS public key not found"` → Secret not set correctly
- `401/403 errors` → Invalid credentials
- Template errors → Variable names don't match (`{{from_name}}` etc.)

### Build Fails in GitHub Actions

**Issue:** The workflow shows a red X

**Solution:**
1. Click on the failed workflow
2. Expand the failed step
3. Read the error message
4. Common fixes:
   - Missing dependencies: `npm ci` should fix
   - TypeScript errors: Check the error logs
   - Build errors: Test locally with `npm run build`

## Security Notes

✅ **Safe to expose (already public):**
- EmailJS Public Key (designed to be public)
- Service ID
- Template ID

❌ **Never commit:**
- `.env.local` file
- Private API keys
- Any credentials

## Need Help?

If you run into issues:
1. Check the GitHub Actions logs
2. Check browser console for errors
3. Verify EmailJS dashboard for email logs
4. Test the template directly in EmailJS dashboard

---

**Last Updated:** February 2026
