# Google Analytics Setup Guide

This guide will walk you through setting up Google Analytics for your portfolio site.

## Step 1: Create a Google Analytics Account

1. Go to [Google Analytics](https://analytics.google.com/)
2. Sign in with your Google account
3. Click "Start measuring" or "Admin" → "Create Account"
4. Fill in your account details:
   - Account name: Your name or "Portfolio Site"
   - Property name: "Portfolio" or "Ayser Portfolio"
   - Time zone and currency
5. Click "Next" and fill in business information
6. Click "Create"

## Step 2: Get Your Measurement ID

1. After creating your property, you'll be prompted to set up a data stream
2. Choose "Web" as your platform
3. Enter your website URL (e.g., `https://ayser.ca` or your domain)
4. Enter a stream name (e.g., "Portfolio Website")
5. Click "Create stream"
6. You'll see your **Measurement ID** (format: `G-XXXXXXXXXX`)
7. **Copy this ID** - you'll need it in the next step

## Step 3: Add Your Tracking ID to the Site

### Option A: Using Environment Variable (Recommended)

1. Create a `.env` file in the root of your project (same level as `package.json`)
2. Add this line:
   ```
   REACT_APP_GA_TRACKING_ID=G-XXXXXXXXXX
   ```
   Replace `G-XXXXXXXXXX` with your actual Measurement ID

3. Restart your development server:
   ```bash
   npm start
   ```

### Option B: Direct Configuration (Quick Test)

If you want to test quickly without environment variables:

1. Open `src/utils/analytics.js`
2. Find the line: `export const GA_TRACKING_ID = process.env.REACT_APP_GA_TRACKING_ID || 'G-XXXXXXXXXX';`
3. Replace `'G-XXXXXXXXXX'` with your actual Measurement ID:
   ```javascript
   export const GA_TRACKING_ID = process.env.REACT_APP_GA_TRACKING_ID || 'G-YOUR-ACTUAL-ID';
   ```

**Note:** Option A is better for production as it keeps your tracking ID out of your code.

## Step 4: Verify It's Working

1. Start your development server: `npm start`
2. Open your site in a browser
3. Open Google Analytics → Reports → Realtime
4. Visit your site - you should see yourself as an active user within a few seconds

## Step 5: Deploy

When deploying to production:

- **If using environment variables:** Make sure to set `REACT_APP_GA_TRACKING_ID` in your hosting platform's environment variables
  - Vercel: Project Settings → Environment Variables
  - Netlify: Site Settings → Build & Deploy → Environment
  - Other platforms: Check their documentation for setting environment variables

- **If using direct configuration:** Your tracking ID is already in the code, so it will work automatically

## What Gets Tracked

The setup automatically tracks:
- Page views (all routes)
- Route changes (when navigating between pages)
- Time on page

## Optional: Track Custom Events

You can track custom events (like button clicks, project views, etc.) by importing the tracking function:

```javascript
import { trackEvent } from '../utils/analytics';

// Example: Track when someone clicks a project
trackEvent({
  action: 'click',
  category: 'project',
  label: 'SighedKick',
  value: 1
});
```

## Troubleshooting

### Can't Create a Property?

If you're having trouble creating a property:

1. **Make sure you have a Google account** - You need to be signed in
2. **Try starting fresh:**
   - Go to https://analytics.google.com/
   - Click "Start measuring" (big blue button)
   - This will walk you through account → property → data stream creation
3. **Check if you already have an account:**
   - Look at the top left dropdown (shows "All accounts > property name")
   - If you see an account, you might already have one
   - Try clicking the dropdown and selecting "Create Account" or "Create Property"
4. **Browser issues:**
   - Try a different browser
   - Clear cache and cookies
   - Disable ad blockers temporarily

### Other Issues

- **Not seeing data?** Wait a few minutes - Google Analytics can have a delay
- **Still not working?** Check the browser console for errors
- **Development mode:** GA might not track localhost by default - test on a deployed version or use the GA Debugger extension
- **Can't find Data Streams?** After creating a property, you should automatically be prompted to create a data stream. If not, go to Admin → Data Streams → Add stream

## Privacy Note

Make sure to:
- Add a privacy policy if required in your jurisdiction
- Consider adding a cookie consent banner if needed
- Google Analytics automatically handles GDPR compliance, but you may want to add explicit consent

