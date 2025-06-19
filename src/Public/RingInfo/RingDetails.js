import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from '../../AxiosConfig';
import './RingDetails.css';

function RingDetails() {
  const { id } = useParams();
  const [ring, setRing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
        console.log("Data fetched", ring);

    axios.get(`http://localhost:8080/rings/${id}`)
      .then(res => {
        setRing(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Could not fetch ring details.');
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!ring) return <p>Ring not found.</p>;

  const images = ring.images || [];

  const handlePrev = () => {
    setCurrentImageIndex(i => (i === 0 ? images.length - 1 : i - 1));
  };

  const handleNext = () => {
    setCurrentImageIndex(i => (i === images.length - 1 ? 0 : i + 1));
  };

  return (
    <div className="ring-details-container">
      <div className="gallery-section">
        {images.length > 0 ? (
          <>
            <button className="gallery-nav left" onClick={handlePrev} aria-label="Previous image">‹</button>
            <img
              src={`http://localhost:8080${images[currentImageIndex]}`}
              alt={`${ring.name} image ${currentImageIndex + 1}`}
              className="gallery-image"
              draggable={false}
            />
            <button className="gallery-nav right" onClick={handleNext} aria-label="Next image">›</button>
          </>
        ) : (
          <p>No images available</p>
        )}
      </div>

      <div className="info-section">
        <h2>{ring.name}</h2>
        <p className="description">{ring.description}</p>
        <p><strong>Metal type:</strong> {ring.metalType}</p>
        <p><strong>Size:</strong> {ring.size}</p>
      </div>

      <div className="poster-section">
        <h3>Posted By</h3>
        <p>{ring.username|| 'Unknown'}</p>
      </div>
    </div>
  );
}

export default RingDetails;
