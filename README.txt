NESTORA PROPERTY MARKETPLACE - STATIC WEBSITE
=============================================

FOLDER
  index.html      main page (all screens: home, search, property, account, dashboard ...)
  css/style.css   styles
  js/app.js       all site logic and sample listing data
  img/            photos (hero, about, owner banner, UK listings)
  favicon.svg, robots.txt, 404.html

No build step and no server code needed. Upload the CONTENTS of this folder so index.html sits at the top level.

OPTION 1 - NETLIFY (free, 2 minutes)
  1. Go to app.netlify.com/drop
  2. Drag this whole folder onto the page.
  3. You get a live link. Add your own domain under Domain settings.

OPTION 2 - VERCEL
  1. vercel.com > Add New > Project > upload the folder (or push it to GitHub and import).
  2. Framework preset: Other. Build command: none. Output directory: ./

OPTION 3 - GITHUB PAGES
  1. Create a repository and upload these files.
  2. Settings > Pages > Deploy from branch > main / root.

OPTION 4 - HOSTINGER / GODADDY / cPanel
  1. Open File Manager > public_html.
  2. Upload the files and folders (or upload the zip and Extract there).
  3. Visit your domain.

TO EDIT
  - Listings, companies and plan prices: js/app.js (search for "const L=[", "const COS=", "const PLANS=").
  - Add photos: put <REF>.jpg in img/ and add the REF to "const PHOTOS=new Set([...])" in js/app.js.
  - Colours: top of css/style.css (--bg, --sage, --red ...).

IMPORTANT
  This is a front-end prototype. Sign-in (OTP), favourites, listings you add, enquiries and payments
  are saved only in the visitor's own browser (localStorage) and are simulated. Before going live
  with real users you need a backend: real authentication + OTP/SMS, database, admin review panel,
  payment gateway (e.g. Stripe for GBP, Razorpay for INR), map provider and private document storage.
  Sample listings, companies, prices and contact details are placeholders.
