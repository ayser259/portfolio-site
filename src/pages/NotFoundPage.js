import React from 'react';
import { Link } from 'react-router-dom';
import './NotFoundPage.css';

function NotFoundPage() {
  return (
    <div className="not-found-page">
      <div className="not-found-container">
        <h1 className="not-found-title">404</h1>
        <p className="not-found-message">Page not found</p>
        <p className="not-found-description">
          The page you're looking for doesn't exist.
        </p>
        <Link to="/" className="not-found-link">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;

