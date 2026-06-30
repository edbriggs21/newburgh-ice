# Newburgh Ice — Team Portal

A single-page team portal for the **Newburgh Ice 8U** travel softball team
(Newburgh, IN). Sections: Home, Schedule, Scores (live GameChanger widget),
Roster, Tryouts, Billing, Drills, Contact. Dark "sports-broadcast" theme with a
scrolling results ticker.

## Live site

- **URL:** https://newburgh-ice.netlify.app
- **Netlify project:** `newburgh-ice` (under the user's Netlify team; direct link:
  https://app.netlify.com/projects/newburgh-ice)
- **Access:** Password protected (Netlify Basic protection, applies to all deploys).
  Temporary password is `GoIce2026` — change it in
  Project configuration → General → Visitor access → Password Protection.
- Deployed as a single static `index.html`. No build command on Netlify; it just
  serves the file.

## Files

- `index.html` — the deployable, fully self-contained page (what's live).
- `newburgh-ice-portal.html` — identical copy (for opening/previewing locally).
- `source/App.jsx` — **source of truth.** The entire React app (UI + data + helpers),
  ~900 lines, inline styles only. Exposes `window.App`.
- `source/assets/newburgh-ice-logo.png` — transparent team wordmark logo.
- `source/assets/team-photo.jpg` — team photo used as the Home hero background.
- `source/DESIGN_NOTES.md` — original design handoff notes.

All team data (schedule, roster, announcements, tryout info, etc.) lives in `const`
arrays at the top of `source/App.jsx` — edit there, then rebuild.

## How `index.html` is built (current, no-bundler approach)

`index.html` is assembled from `source/App.jsx` by: embedding the logo + photo as
base64 data URIs, Babel-compiling the JSX (classic runtime → `React.createElement`),
and inlining React 18 UMD + ReactDOM 18 UMD. The result needs no network at runtime
except Google Fonts (Anton + Barlow), which degrade gracefully to system fonts.

Reproduce the build with Node (needs `@babel/core`, `@babel/preset-react`,
`react`, `react-dom` installed):

```js
const babel = require('@babel/core'), fs = require('fs');
let app = fs.readFileSync('source/App.jsx', 'utf8');
const logo  = fs.readFileSync('source/assets/newburgh-ice-logo.png').toString('base64');
const photo = fs.readFileSync('source/assets/team-photo.jpg').toString('base64');
const anchor = 'const { useState, useEffect } = React;';
app = app.replace(anchor, anchor
  + `\nconst LOGO = "data:image/png;base64,${logo}";`
  + `\nconst TEAM_PHOTO = "data:image/jpeg;base64,${photo}";`);
app = app.replace(/src="assets\/newburgh-ice-logo\.png"/g, 'src={LOGO}')
         .replace(/src="assets\/team-photo\.jpg"/g, 'src={TEAM_PHOTO}');
const compiled = babel.transformSync(app, { presets: [['@babel/preset-react', { runtime: 'classic' }]] }).code;
const react    = fs.readFileSync('node_modules/react/umd/react.production.min.js', 'utf8');
const reactDom = fs.readFileSync('node_modules/react-dom/umd/react-dom.production.min.js', 'utf8');
// wrap: <head> loads Google Fonts + keyframes CSS; <body> has <div id="root">,
// then <script>react</script><script>reactDom</script><script>compiled +
// ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(window.App))</script>
```

The four keyframes the app relies on (`tickerScroll`, `fadeUp`, `pulseGlow`,
`sweep`) and the base CSS are already in the `<style>` block of the current
`index.html` — copy that head as the template.

> Recommended for Claude Code: convert `source/App.jsx` into a normal Vite + React
> project (`App.jsx` becomes the root component; change `window.App = App` /
> `export default`). Then GitHub → Netlify auto-deploy builds it normally. The
> single-file approach above was only used because the build environment had no
> bundler/deploy access.

## GameChanger live widget (Scores tab)

The Scores tab loads GameChanger's SDK (`https://widgets.gc.com/static/js/sdk.v1.js`)
and renders an iframe widget for widget id `478411de-82ed-4d57-a6e1-4e375a23235e`.
It needs internet and won't render inside sandboxed previews — works on the live site.
The Home record/ticker are computed from the `SCHEDULE` array (a manual snapshot of
GameChanger results), not live — refresh by updating `SCHEDULE`.

## Suggested next steps

1. Put this folder in a GitHub repo.
2. Connect the repo to the existing `newburgh-ice` Netlify project for auto-deploy
   (or create a new project — but then re-apply password protection).
3. Confirm password protection survived the first auto-deploy.
4. Optional custom domain: `icefastpitch.com` is taken (premium/for-sale), but
   `newburghice.com`, `newburghicesoftball.com`, and `newburghicefastpitch.com` were
   all available at normal price — buy one and point it at the Netlify site.

## Saving form submissions (Netlify Forms) — TO IMPLEMENT

Right now the **Tryout Registration** and **Contact** forms only show a success
state; submissions are NOT saved or sent anywhere. Wire them to **Netlify Forms** so
entries appear in the Netlify dashboard (Project → Forms) with optional email alerts.

Because this is a client-rendered React SPA, Netlify's build bot can't detect the
form from the JSX. Standard fix:

1. Add hidden static detection forms to the page `<body>` (so Netlify registers them
   at deploy). Include every field `name` you submit:

   ```html
   <form name="tryout-registration" netlify netlify-honeypot="bot-field" hidden>
     <input name="player-name"><input name="dob"><input name="position">
     <input name="parent-email"><input name="parent-phone"><textarea name="experience"></textarea>
   </form>
   <form name="contact" netlify netlify-honeypot="bot-field" hidden>
     <input name="name"><input name="email"><input name="subject"><textarea name="message"></textarea>
   </form>
   ```

2. On submit in `App.jsx`, POST the data instead of just flipping the success state:

   ```js
   await fetch("/", {
     method: "POST",
     headers: { "Content-Type": "application/x-www-form-urlencoded" },
     body: new URLSearchParams({ "form-name": "tryout-registration", ...form }).toString()
   });
   // then show the existing "You're Registered" state
   ```

3. **Access submissions:** Netlify dashboard → `newburgh-ice` project → **Forms** →
   pick the form → view entries / export CSV. Turn on email notifications under
   Forms → Settings → Form notifications. Free tier ≈ 100 submissions/month.

> Alternative: point the form's button at an external **Google Form** (responses land
> in a Google Sheet) — simplest if non-technical staff need to read entries.

## Two sites (intentional split)

1. **Team portal** — https://newburgh-ice.netlify.app — Netlify project `newburgh-ice`,
   **password-protected** (has the roster + parent emails). For current families.
2. **Public tryout sign-up** — https://newburgh-ice-tryouts.netlify.app — Netlify
   project `newburgh-ice-tryouts`, **public, no password** (so prospective families can
   register). This is what the tryout flyer QR points to.

### Public tryout page — files & deploy

- `tryout-signup.html` — standalone, self-contained public sign-up page (branded; date
  Tue Jul 14 2026 5:30 PM, Field 1, 9U). Contains a **real static HTML form**
  `name="tryout-registration"` with `data-netlify="true"`, so Netlify Forms captures
  submissions automatically (no React-detection workaround needed).
- `tryout-deploy/index.html` — same file named `index.html`, ready to deploy to the
  `newburgh-ice-tryouts` site.
- **Deploy:** drag `tryout-deploy/index.html` onto the deploy drop zone at
  https://app.netlify.com/projects/newburgh-ice-tryouts/deploys (or let Claude Code do
  it). The site was created but is **not deployed yet** as of this writing.
- **Access submissions:** after deploy, Netlify dashboard → `newburgh-ice-tryouts` →
  **Forms** → `tryout-registration` → view/export entries. Enable email notifications
  in Forms settings. Form fields: player-name, dob, position, parent-name, parent-email,
  parent-phone, experience, notes.

### QR codes

- `tryout-qr.png` / `tryout-qr-flyer.png` — point to the **public tryout** site
  (https://newburgh-ice-tryouts.netlify.app). **Use these on the tryout flyer.** Verified.
- `newburgh-ice-qr.png` / `newburgh-ice-qr-flyer.png` — point to the **password-protected
  team portal**. Only share with current families who have the password.

## Known TODOs / placeholders

- Billing tab still has placeholder fee amounts; every player shows "Balance Due"
  (no real payment data yet). Fundraisers section shows "TBA".
- Roster detail shows parent emails — these are why the site is password protected.
  Hide them if the site is ever made fully public.
- Tryout registration + Contact forms show a success state but do not actually send
  or store submissions (no backend wired up).
