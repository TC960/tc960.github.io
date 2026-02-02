# Quick Setup: GitHub Secrets for EmailJS

## Step-by-Step Instructions

### 1. Get EmailJS Credentials

Go to https://dashboard.emailjs.com/ and collect:

- ✅ **Service ID:** `service_3zgve99` (or create new)
- ✅ **Template ID:** Create template with variables:
  - `{{from_name}}`
  - `{{from_email}}`
  - `{{message}}`
- ✅ **Public Key:** Account → General → API Keys

### 2. Add to GitHub

1. **Go to:** https://github.com/TC960/tc960.github.io/settings/secrets/actions

2. **Click:** "New repository secret" button

3. **Add these 3 secrets:**

   | Name | Value |
   |------|-------|
   | `VITE_EMAILJS_SERVICE_ID` | `service_3zgve99` |
   | `VITE_EMAILJS_TEMPLATE_ID` | Your template ID |
   | `VITE_EMAILJS_PUBLIC_KEY` | Your public key |

### 3. Deploy

```bash
git add .
git commit -m "Update GitHub Actions workflow for EmailJS secrets"
git push origin main
```

### 4. Monitor

Go to: https://github.com/TC960/tc960.github.io/actions

Watch for green checkmark ✅

### 5. Test

Visit: https://tc960.github.io/

Try the contact form!

---

## Quick Links

- **Repository Settings:** https://github.com/TC960/tc960.github.io/settings
- **Secrets Page:** https://github.com/TC960/tc960.github.io/settings/secrets/actions
- **Actions Page:** https://github.com/TC960/tc960.github.io/actions
- **EmailJS Dashboard:** https://dashboard.emailjs.com/

---

## Done! 🎉

Once you see the green checkmark in GitHub Actions, your portfolio is live with working EmailJS!
