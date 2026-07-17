# PDDG Premium Cybersecurity Website Redesign

A complete static redesign of the Pinnacle Digital Defense Group website for GitHub Pages. The project preserves the existing service names, industry pages, core business content, legal pages, resources, contact details, and public URL structure while replacing the design and front-end experience.

## Deploy to GitHub Pages

1. Extract the ZIP.
2. Replace the contents of your existing `pddg-cybersecurity` repository with the extracted files.
3. Commit and push everything to the `main` branch.
4. In GitHub, open **Settings → Pages**.
5. Under **Build and deployment**, choose **GitHub Actions**.
6. Open the **Actions** tab and confirm that “Deploy static site to GitHub Pages” completes successfully.

The site is built with plain HTML, CSS, and JavaScript, so there is no npm installation or build command.

## Forms

The site is static. Contact, booking, and sample-report forms prepare an email in the visitor's email application and do not store form data on the website. For production lead capture, connect the forms to your CRM or form endpoint.

## Main files

- `index.html` — homepage
- `services/`, `industries/`, `resources/` — all preserved routes
- `assets/css/styles.css` — complete responsive design system
- `assets/js/main.js` — animations, navigation, accordions, service tabs, checklist, and form behavior
- `.github/workflows/deploy.yml` — automatic GitHub Pages deployment

## Editing content

The generated HTML files are deployment-ready. `generate_site.py` is also included as the structured source used to generate the pages. Edit its content dictionaries and run `python generate_site.py` to regenerate the site consistently.
