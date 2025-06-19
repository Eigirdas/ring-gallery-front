import { useEffect, useState } from "react";
import axios from "../../../AxiosConfig";
import { Link, useNavigate } from "react-router-dom";
import './RingList.css';

const RingList = () => {
  const [rings, setRings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRings();
  }, []);

  const fetchRings = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get('/rings');
      setRings(response.data);
    } catch (error) {
      console.error('Error fetching rings:', error);
      setError('Failed to load rings. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this ring?')) return;
    
    try {
      await axios.delete(`admin/rings/${id}`);
      fetchRings();
    } catch (error) {
      console.error('Error deleting ring:', error);
      alert('Failed to delete ring. Please try again.');
    }
  };

  if (isLoading) return <div className="container">Loading...</div>;
  if (error) return <div className="container">{error}</div>;

  return (
    <div className="container">
      <h2>Rings List</h2>
      
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Ring size</th>
              <th>Metal type</th>
              <th>Belongs to user</th>
              <th>Photos</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rings.length > 0 ? (
              rings.map((ring) => (
                <tr key={ring.id}>
                  <td data-label="ID">{ring.id}</td>
                  <td data-label="Name">{ring.name}</td>
                  <td data-label="Description">{ring.description}</td>
                  <td data-label="Ring size">{ring.size}</td>
                  <td data-label="Metal type">{ring.metalType}</td>
                  <td data-label="User ID">{ring.username|| 'N/A'}</td>
                  <td data-label="Photos">
                    {ring.images?.length > 0 ? (
                      ring.images.map((img, idx) => (
                        <img
                          key={idx}
                          src={img.url || img}
                          alt={`Ring ${ring.name}`}
                          title={`Ring ${ring.name}`}
                        />
                      ))
                    ) : (
                      'No images'
                    )}
                  </td>
                  <td data-label="Actions">
                    <div className="action-buttons">
                      <Link to={`/admin/rings/edit/${ring.id}`} className="edit-button">
                        Edit
                      </Link>
                      <button 
                        onClick={() => handleDelete(ring.id)}
                        className="delete-button"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" style={{ textAlign: 'center' }}>
                  No rings found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Link to="/admin/rings/add" className="add-button">
        Add Ring
      </Link>
    </div>
  );
};

export default RingList;