import config from "../../../config";
import './RingCard.css';

function RingCard({ ring }) {

    if (!ring) {
    return <div>No ring data provided</div>;
  }

  const imageUrl = ring.images?.length > 0 ? ring.images[0].url : null;

    return (
    <div className="ring-card">
      <h3>{ring.name}</h3>
      <p>{ring.description}</p>
      <p>Medžiaga: {ring.metalType}</p>
      <p>Dydis: {ring.size}</p>
      <div className="ring-images">
        {ring.images.map((img, i) => (
          <img
            key={i}
            src={`http://localhost:8080${img}`}
            alt={`Žiedo nuotrauka ${i + 1}`}
            style={{ width: "150px", marginRight: "10px" }}
          />
        ))}
      </div>
    </div>
  );
}

export default RingCard;
