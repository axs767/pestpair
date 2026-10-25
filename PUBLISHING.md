# How to publish PestPair (beginner guide)

You will put the site on the internet with **GitHub Pages**. It is free. You need a web browser and an email address.

## Part 1: Create a GitHub account

1. Go to https://github.com and click **Sign up**.
2. Follow the steps to create a free account and confirm your email.

If you already have a GitHub account, skip to Part 2.

## Part 2: Create a repository

A repository (or "repo") is a folder on GitHub that holds your files.

1. Sign in to GitHub. Click the **+** icon in the top-right corner, then **New repository**.
2. **Repository name:** type `pestpair`.
3. Choose **Public**. GitHub Pages on a free account needs a public repository.
4. Leave "Add a README file" **unchecked**. You already have one.
5. Click **Create repository**.

## Part 3: Upload the files

1. On your new repository page, click **uploading an existing file**. (If you do not see this link, click **Add file**, then **Upload files**.)
2. Open the `pestpair` folder on your computer in Finder.
3. Select **everything inside** the folder: `index.html`, `book.html`, `exterminators.html`, the `assets` folder, `.nojekyll`, `README.md`, and `PUBLISHING.md`. Drag them onto the GitHub page.
4. Wait for the uploads to finish. Scroll down and click **Commit changes**.

Check that the `assets` folder appears with its `css` and `js` folders inside it.

## Part 4: Turn on GitHub Pages

1. In your repository, click **Settings** (the tab near the top).
2. In the left sidebar, click **Pages**.
3. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
4. Under **Branch**, choose **main** and the folder **/ (root)**. Click **Save**.
5. Wait 1 to 3 minutes. Refresh the Pages settings page. A box shows your live link.

Your address will look like this:

```
https://YOUR-GITHUB-USERNAME.github.io/pestpair/
```

Replace `YOUR-GITHUB-USERNAME` with your GitHub username. Open the link on your phone to check the mobile layout.

## Alternative: Netlify Drop (no GitHub needed)

1. Go to https://app.netlify.com/drop and sign up or log in (free).
2. Drag the whole `pestpair` folder onto the page.
3. Netlify gives you a public link right away. You can rename it in the site settings.

## Updating the site later

Upload the changed file to GitHub again with **Add file → Upload files**, then **Commit changes**. The site updates within a few minutes.
