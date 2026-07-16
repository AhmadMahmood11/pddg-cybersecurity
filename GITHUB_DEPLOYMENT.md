# Publish the PDDG website with GitHub Pages

This project includes an automatic GitHub Pages workflow. You do not need to upload the generated `out` folder manually.

## 1. Create the repository

1. Sign in to GitHub.
2. Select **New repository**.
3. Name it, for example, `pddg-cybersecurity`.
4. Keep it public if you are using GitHub Pages on a free GitHub account.
5. Do not add a README or starter files because they are already included here.

## 2. Upload the project

Extract the ZIP and upload **all files and folders inside it**, including the hidden `.github` folder.

If using Git from Terminal:

```bash
git init
git add .
git commit -m "Publish PDDG website"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
git push -u origin main
```

## 3. Enable GitHub Pages

1. Open the repository on GitHub.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, choose **GitHub Actions** as the source.
4. Open the **Actions** tab and wait for `Deploy PDDG website to GitHub Pages` to finish.

The URL will normally be:

```text
https://YOUR-USERNAME.github.io/YOUR-REPOSITORY/
```

If the repository is named `YOUR-USERNAME.github.io`, the website will use:

```text
https://YOUR-USERNAME.github.io/
```

The workflow detects both URL formats automatically.

## Optional custom domain

Configure the domain under **Settings → Pages → Custom domain**. GitHub will tell you which DNS records to add. Do not point the live `pddg.io` domain to GitHub until PDDG approves replacing its current website.

## Important limitations

- Contact, booking, and report-request forms remain in clearly labeled demonstration mode.
- A secure form provider or backend must be connected before forms can send data.
- GitHub Pages hosts static websites and does not run private server-side code.
- Analytics, CRM, and calendar integrations still require their respective credentials.
