# PDDG Cybersecurity Website

Premium multi-page website for Pinnacle Digital Defense Group.

## GitHub Pages deployment

See [GITHUB_DEPLOYMENT.md](GITHUB_DEPLOYMENT.md) for the complete publishing instructions. The included workflow deploys the website automatically whenever the `main` branch is updated.

## Local development

```bash
npm install
npm run dev
```

## Build for GitHub Pages

```bash
GITHUB_PAGES=true NEXT_PUBLIC_BASE_PATH=/repository-name NEXT_PUBLIC_SITE_URL=https://username.github.io/repository-name npm run build:github
```

The exported website will be created in the `out` directory.
