// Simple Node.js server for serving React app on Render
const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

// Check if build directory exists
const buildPath = path.join(__dirname, 'build');
if (!fs.existsSync(buildPath)) {
  console.error('ERROR: Build directory does not exist!');
  console.error('Please run "npm run build" first before starting the server.');
  process.exit(1);
}

// Serve static files from the React app build directory
// This includes all assets from public/ folder that were copied during build
app.use(express.static(buildPath, {
  // Handle errors gracefully
  fallthrough: true
}));

// The "catchall" handler: for any request that doesn't
// match a static file, send back React's index.html file.
// This enables client-side routing with React Router
app.get('*', (req, res, next) => {
  // Skip API routes or other non-HTML requests
  if (req.path.startsWith('/api/') || req.path.includes('.')) {
    return next();
  }
  res.sendFile(path.join(buildPath, 'index.html'), (err) => {
    if (err) {
      console.error('Error sending index.html:', err);
      res.status(500).send('Error loading page');
    }
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`Serving React app from ${buildPath}`);
});

