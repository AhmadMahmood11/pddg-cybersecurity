# PDDG Premium Animated Cybersecurity Website

A complete static redesign of the Pinnacle Digital Defense Group website for GitHub Pages.

The project preserves all existing pages, routes, services, industries, resources, FAQs, contact information, legal text, footer content, and non-hero written copy. Hero wording was intentionally condensed to create shorter, stronger page introductions.

## Stack

- Static HTML
- Responsive CSS
- Vanilla JavaScript
- GSAP + ScrollTrigger
- Lenis smooth scrolling
- Native Canvas network animation

No npm installation or build command is required.

## Deploy to GitHub Pages

1. Extract the ZIP.
2. Replace the files in the existing `pddg-cybersecurity` repository.
3. Commit and push to `main`.
4. Open **Settings → Pages** in GitHub.
5. Choose **GitHub Actions** as the deployment source.
6. Confirm that the deployment workflow completes in the **Actions** tab.

## Key files

- `index.html` — homepage
- `services/`, `industries/`, and `resources/` — preserved routes
- `assets/css/styles.css` — complete design and responsive motion system
- `assets/js/main.js` — GSAP, ScrollTrigger, Lenis, interactions, Canvas, forms, FAQ, and page transitions
- `ANIMATION-CHANGELOG.md` — complete effect list and editing guide
- `.github/workflows/deploy.yml` — GitHub Pages deployment

## Forms

The site is static. Contact, booking, and sample-report forms prepare an email in the visitor's email application. They do not store form data on the website.

## Important source note

The deployment-ready HTML, CSS, and JavaScript files are the current source of truth. The included `generate_site.py` belongs to the earlier static generator and does not include the final GSAP and Lenis upgrade. Do not run it unless the premium motion changes are also ported into that generator.
