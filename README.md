# PDDG Cybersecurity Website

Complete static-export-ready website for Pinnacle Digital Defense Group. The repository includes every public page, responsive styling, accessible interactive components, local SVG assets, metadata, sitemap, robots file, custom 404 page, and an automated GitHub Pages workflow.

## Publish with GitHub Pages

1. Create a public GitHub repository or open the existing PDDG repository.
2. Place all files from this project in the repository root. Do not upload the ZIP as a single file.
3. Open **Settings → Pages** in GitHub.
4. Under **Build and deployment**, set **Source** to **GitHub Actions**.
5. Commit and push the files to the `main` branch.
6. Open the **Actions** tab and wait for the deployment workflow to complete.

The included workflow automatically detects whether the site is hosted at a repository subdirectory such as `username.github.io/repository-name/` or at a root Pages domain.

### Update an existing clone

```bash
cd /path/to/pddg-cybersecurity
git pull --rebase origin main
git add .
git commit -m "Update PDDG website"
git push origin main
```

See [GITHUB_DEPLOYMENT.md](GITHUB_DEPLOYMENT.md) for troubleshooting and alternative upload instructions.

## Local development

Node.js 22 or newer is recommended.

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Test the GitHub Pages export

Replace the values below with the intended GitHub username and repository name:

```bash
GITHUB_PAGES=true \
NEXT_PUBLIC_BASE_PATH=/repository-name \
NEXT_PUBLIC_SITE_URL=https://username.github.io/repository-name \
npm run build:github
```

The static website is written to `out/`. The deployment workflow uploads that directory and includes `.nojekyll` automatically.
