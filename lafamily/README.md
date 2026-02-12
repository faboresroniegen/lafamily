# LA FAMILIA DUMAGUETE 2.0

A responsive, interactive landing page for LA FAMILIA friendship circle celebrating memories from 2021-2026. Features a smooth photo gallery with lightbox zoom, fullscreen view, responsive mobile design, and background audio.

## 🎯 Features

- **Responsive Design**: Fully mobile-friendly with breakpoints at 1024px, 768px, 480px, 320px
- **Interactive Gallery**: Click to open memories gallery modal with image/video items
- **Lightbox Viewer**: Professional fullscreen/popup image viewer with:
  - Auto-fit images to viewport with smooth transitions
  - Zoom toggle (double-click or button)
  - Fullscreen API support
  - Touch panning when zoomed
  - Previous/Next navigation with counter
  - Keyboard controls (arrows, ESC)
- **Smooth Animations**: CSS3 keyframe animations (slideInUp, fadeInUp, zoomIn, etc.)
- **Friendship Goals Modal**: Interactive popup with goal cards and back button
- **Background Audio**: Floating play/pause control with localStorage persistence
- **Enhanced Button Effects**: Ripple, glow, and pulse animations on CTA buttons
- **Professional UI**: Glass-morphism effects, gradient overlays, smooth cubic-bezier transitions

## 📁 Project Structure

```
lafamily/
├── Rons.html           # Main HTML file (entry point)
├── styles.css          # All CSS styles and animations
├── .gitignore          # Git ignore rules
├── README.md           # This file
│
├── pic1.jpg - pic8.jpg # Background images for slideshow
├── bro.jpg, band.jpg, summer.jpg, etc. # Gallery images
├── band.mp4, jul.mp4, vd.mp4  # Video files for gallery
├── keenan.m4a          # Background audio (or use audio/bg-music.mp3)
│
└── audio/ (optional)   # Create this folder for background music
    └── bg-music.mp3    # Your background audio file
```

## 🚀 Quick Start

### Local Testing

1. **Download or clone the project**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/lafamily.git
   cd lafamily
   ```

2. **Open in browser**:
   - Simply open `Rons.html` in any modern web browser (Chrome, Firefox, Safari, Edge)
   - No build process or server required for basic functionality

3. **Test features**:
   - Click "JOIN THE CIRCLE" button to see modal with ripple effects
   - Click "Friendship Goals" button to open goals modal
   - Click "Share Memories" button to open gallery
   - Click any thumbnail in gallery to open lightbox viewer
   - Double-click/tap an image in lightbox to zoom
   - Use arrow keys or buttons to navigate
   - Press ESC to close

### Audio Setup

The page expects background audio at:
- **Path**: `lafamily/audio/bg-music.mp3`

If your audio is elsewhere, update line in `Rons.html`:
```html
<source src="audio/bg-music.mp3" type="audio/mpeg">
```
Or use the included `keenan.m4a` file:
```html
<source src="keenan.m4a" type="audio/mp4">
```

## 📱 Responsive Breakpoints

- **Desktop (1024px+)**: Full-size modals, optimized button positioning
- **Tablet (768px - 1023px)**: Adjusted padding and font sizes
- **Mobile (480px - 767px)**: Full-screen modals, larger touch targets (56x56px buttons)
- **Small Mobile (320px - 479px)**: Compact layout with essential controls only

## 🌐 Deployment to GitHub

### 1. Create a GitHub Repository

```bash
cd lafamily
git init
git add .
git commit -m "Initial commit: LA FAMILIA landing page with responsive gallery and modals"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/lafamily.git
git push -u origin main
```

### 2. GitHub Pages (Free Hosting)

If using GitHub Pages:

1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Select `main` branch as the source
4. Click **Save**
5. Your site will be live at: `https://YOUR_USERNAME.github.io/lafamily/`

To open `Rons.html` directly:
- Visit: `https://YOUR_USERNAME.github.io/lafamily/Rons.html`

## 🌍 Deployment to Your Website

### Option 1: FTP Upload (Most Common)

1. **Download your hosting's FTP client** (FileZilla, Cyberduck, WinSCP)
2. **Connect to your server** using FTP credentials from your hosting provider
3. **Navigate to your domain's root folder** (usually `public_html/` or `www/`)
4. **Create a new folder**: `lafamily/`
5. **Upload all files**:
   - Rons.html
   - styles.css
   - All image files (pic*.jpg, bro.jpg, etc.)
   - All video files (band.mp4, jul.mp4, vd.mp4)
   - Audio file (keenan.m4a or bg-music.mp3)
   - .gitignore (optional)
   - README.md (optional)

6. **Access your site**:
   - `https://yourdomain.com/lafamily/Rons.html`

### Option 2: cPanel File Manager (If included in hosting)

1. Log in to **cPanel**
2. Click **File Manager**
3. Navigate to `public_html/`
4. Create folder `lafamily`
5. Upload all files via drag-and-drop or upload button
6. Access at: `https://yourdomain.com/lafamily/Rons.html`

### Option 3: Git Deploy (Advanced)

If your hosting supports Git:

```bash
# SSH into your server
ssh user@yourdomain.com

# Navigate to web root
cd ~/public_html

# Clone the repository
git clone https://github.com/YOUR_USERNAME/lafamily.git

# Done! Site is live at yourdomain.com/lafamily/Rons.html
```

## ⚙️ Configuration

### Change Background Images

Edit `styles.css` (lines ~50-65):
```css
.fullpage-slide:nth-child(1) { background-image: url('pic1.jpg'); }
.fullpage-slide:nth-child(2) { background-image: url('pic2.jpg'); }
/* ... etc ... */
```

### Update Gallery Items

Edit `Rons.html` (around line 182):
```html
<div class="memory-item" data-type="image" data-src="memory1.jpg" data-thumb="memory1-thumb.jpg">
    <div class="memory-thumbnail">
        <img src="pic3.jpg" alt="Memory 1" loading="lazy">
```

Change:
- `data-src`: Full-size image path
- `data-thumb`: Thumbnail path (or leave same as src)
- `src`: Quick-load thumbnail
- `alt`: Description for accessibility

### Update Audio File

Edit `Rons.html` (around line 792):
```html
<audio id="bgAudio" loop preload="auto">
    <source src="your-music-file.mp3" type="audio/mpeg">
</audio>
```

## 🎨 Customization

### Colors & Gradients
- Primary: `#4ecdc4` (teal)
- Secondary: `#ff6b6b` (red)
- Edit in `styles.css` for global color changes

### Animations
- All animations use CSS `@keyframes`
- Adjust `animation-duration` and `cubic-bezier()` values in `styles.css`

### Fonts
- Current: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif
- Change in `styles.css` `* { font-family: ... }`

## 📋 Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (12+)
- ✅ Mobile Safari (iOS 12+)
- ✅ Chrome Android

**Requirements**:
- ES6 JavaScript (arrow functions, template literals)
- CSS Grid & Flexbox
- Fullscreen API (optional, gracefully degrades)

## 🔧 Troubleshooting

### Images not loading
- Check file paths match your folder structure
- Ensure filenames match exactly (case-sensitive on Linux servers)
- Use relative paths: `pic1.jpg` (not absolute paths)

### Audio not playing
- Verify audio file exists at correct path
- Check browser autoplay policy (usually requires user gesture)
- Click the music button to start playback

### Lightbox not appearing
- Ensure `styles.css` is loaded (check browser DevTools Network tab)
- Check for console errors (F12 → Console)
- Verify `Rons.html` is the main file, not a backup

### Mobile layout broken
- Clear browser cache (Ctrl+Shift+Del)
- Ensure viewport meta tag is in `<head>`:
  ```html
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  ```

## 📝 File Checklist Before Upload

Before uploading to GitHub or your website:

- [ ] `Rons.html` (main file)
- [ ] `styles.css` (stylesheet)
- [ ] All image files: `pic1.jpg` - `pic8.jpg`
- [ ] All gallery images: `bro.jpg`, `summer.jpg`, etc.
- [ ] All video files: `band.mp4`, `jul.mp4`, `vd.mp4`
- [ ] Audio file: `keenan.m4a` or `audio/bg-music.mp3`
- [ ] `.gitignore` (for GitHub)
- [ ] `README.md` (this file, for documentation)

## 🤝 Contributing

To make updates:

```bash
# Clone your GitHub repo
git clone https://github.com/YOUR_USERNAME/lafamily.git
cd lafamily

# Make changes to files (Rons.html, styles.css, add images, etc.)

# Commit and push
git add .
git commit -m "Description of changes"
git push origin main
```

## 📄 License

This project is open for personal use. Feel free to customize and deploy.

## 🎉 Credits

**LA FAMILIA DUMAGUETE 2.0**
- Designed for friendship circle 2021-2026
- Built with HTML5, CSS3, Vanilla JavaScript
- Icons by Font Awesome 6.4.0
- Responsive design & smooth animations

---

## Quick Links

- **Live Demo** (once deployed): `https://yourdomain.com/lafamily/Rons.html`
- **GitHub Repository**: `https://github.com/YOUR_USERNAME/lafamily`
- **Font Awesome Icons**: https://fontawesome.com/icons

For more help, contact your hosting provider or refer to HTML/CSS documentation.
