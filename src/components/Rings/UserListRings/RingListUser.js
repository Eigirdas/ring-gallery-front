
import RingCard from '../RingCard/RingCard';
import './RingListUser.css';


function RingListUser({ rings }) {
  if (!rings || rings.length === 0) {
    return <p>No rings available.</p>;
  }

  return (
    <>
    <h2>Rings</h2>
    <div className="ring-list-user">
      
      {rings.map(ring => (
        <RingCard key={ring.id} ring={ring} />
      ))}
    </div>
    </>
  );
  
}

export default RingListUser;