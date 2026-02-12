# Deployment Instructions

## GitHub Pages Setup

### Option 1: User/Organization Site (`username.github.io`)
1. Create a repository named `username.github.io` on GitHub
2. Clone it locally
3. Copy all files from this project into that repository
4. Push to GitHub
5. Your site will be live at `https://username.github.io`

### Option 2: Project Repository (`lafamily`)
1. Create a repository named `lafamily` on GitHub
2. Clone it locally
3. Copy all files from this project into that repository
4. Update the base href in `index.html` to: `<base href="/lafamily/">`
5. In GitHub Settings → Pages:
   - Select "Deploy from a branch"
   - Choose `main` branch and `/ (root)` folder
6. Push to GitHub
7. Your site will be live at `https://username..githubio/lafamily`

## Current Setup
- All assets use relative paths (works with either option)
- Base href is set to `/` for flexibility
- Images: `pic1.jpg`, `pic2.jpg`, etc.
- Stylesheet: `styles.css`
- Script: `script.js`

**Make sure all image files and media files are included when pushing to GitHub!**
