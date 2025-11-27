import React, { useEffect } from 'react';
import './ImageModal.css';

function ImageModal({ imageSrc, imageAlt, isOpen, onClose }) {
  useEffect(() => {
    if (isOpen) {
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen || !imageSrc) return null;

  return (
    <div className="image-modal-overlay" onClick={onClose}>
      <div className="image-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="image-modal-close" onClick={onClose} aria-label="Close image">
          ×
        </button>
        <img src={imageSrc} alt={imageAlt || 'Enlarged view'} className="image-modal-image" />
      </div>
    </div>
  );
}

export default ImageModal;

