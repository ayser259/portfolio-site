# Portfolio Site

Personal portfolio website with a modern, terminal-inspired design.

## Project Structure

```
portfolio-site/
├── index.html              # Main HTML file
├── assets/
│   ├── images/            # All images and videos go here
│   ├── css/
│   │   └── styles.css     # All styling - edit this to change appearance
│   └── js/
│       ├── content.js     # All text content and copy - edit this to update text
│       └── script.js      # JavaScript functionality
└── projects/              # Project-related assets
```

## Quick Start

### Option 1: Direct file
Just open `index.html` in your browser.

### Option 2: Local server (recommended)
```bash
npm start
```
This will start a local server at `http://localhost:8000` and open it in your browser.

## Editing Your Site

### To Edit Text/Copy:
Edit `assets/js/content.js` - This file contains:
- Terminal messages
- About section content
- Project descriptions
- Contact information
- Social media links
- All other text content

### To Edit Styling:
Edit `assets/css/styles.css` - This file contains:
- Colors and themes
- Animations
- Layout styles
- Responsive breakpoints

### To Add Images:
Place images in `assets/images/` and reference them in your HTML or content.js file.

### To Edit Structure:
Edit `index.html` for any HTML structure changes.

## Assets

- **Images**: Put all images in `assets/images/`
- **Background Video**: Place your background video at `assets/images/background.mp4` (or update the path in index.html)

