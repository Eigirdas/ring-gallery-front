import { useState } from 'react';
import './RingCard.css';
import { Link } from 'react-router-dom';

function RingCard({ ring }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!ring) {
    return <div className="ring-card-error">No ring data provided</div>;
  }

  const images = ring.images || [];

  const handlePrev = () => {
    setCurrentImageIndex(idx => (idx === 0 ? images.length - 1 : idx - 1));
  };

  const handleNext = () => {
    setCurrentImageIndex(idx => (idx === images.length - 1 ? 0 : idx + 1));
  };

  return (
    <div className="ring-card">
      <Link to={`/rings/${ring.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <h3 className="ring-name">{ring.name}</h3>
      <p className="ring-description">{ring.description}</p>
      <p className="ring-detail"><strong>Metal:</strong> {ring.metalType}</p>
      <p className="ring-detail"><strong>Size:</strong> {ring.size}</p>
      </Link>

      <div className="ring-gallery">
        {images.length > 0 ? (
          <div className="gallery-container">
            <button className="gallery-nav left" onClick={handlePrev} aria-label="Previous image">
              ‹
            </button>
            <img
              src={`http://localhost:8080${images[currentImageIndex]}`}
              alt={`${ring.name} nuotrauka ${currentImageIndex + 1}`}
              className="gallery-image"
              draggable={false}
            />
            <button className="gallery-nav right" onClick={handleNext} aria-label="Next image">
              ›
            </button>
          </div>
        ) : (
          <p className="no-images">No images available</p>
        )}
      </div>
    </div>
  );
}

export default RingCard;
