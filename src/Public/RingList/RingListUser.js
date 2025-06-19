import RingCard from '../RingCard/RingCard';
import './RingListUser.css';
import axios from 'axios';
import React, { useEffect, useState } from "react";

function RingListUser() {
  const [rings, setRings] = useState([]);

  useEffect(() => {
    fetchRings();
  }, []);

  const fetchRings = async () => {
    try {
      const response = await axios.get('http://localhost:8080/rings');
      console.log('Fetched rings data: ', response.data);
      setRings(response.data);
    } catch (error) {
      console.error('Error getting rings: ', error)
    }
  }

  if (!rings || rings.length === 0) {
    return <p>No rings available.</p>;
  }

  return (
    <div className="ring-list-user">
      {rings.map((ring) => (
        <RingCard key={ring.id} ring={ring} />
      ))}
    </div>
  );
}

export default RingListUser;
