import { useEffect, useState } from "react";
import axios from "../../../AxiosConfig";
import { Link, useNavigate } from "react-router-dom";
import './RingList.css';
import { useLocation } from "react-router-dom";


function ViewRingUser() {
    const [rings, setRings] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        fetchRings();
    }, []);

    const fetchRings = async () => {
        try {
            const response = await axios.get('/user/rings/my');
            console.log('Fetched rings data: ', response.data);
            setRings(response.data);
        } catch (error) {
            console.error('Error fetching rings', error)
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`user/rings/${id}`);
            fetchRings();
        } catch (error) {
            console.error('Error deleting ring', error)
        }
    };

    return (
        <div className="container">
            <h2>My List</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Ring size</th>
                        <th>Metal type</th>
                        <th>Photos</th>
                    </tr>
                </thead>
                <tbody>
                    {rings.map((ring) => (
                        <tr key={ring.id}>
                            <td>{ring.id}</td>
                            <td>{ring.name}</td>
                            <td>{ring.description}</td>
                            <td>{ring.size}</td>
                            <td>{ring.metalType}</td>
                            <td>
                                {ring.images && ring.images.length > 0 ? (
                                    ring.images.map((img, idx) => (
                                        <img
                                            key={idx}
                                            src={img.url || img}
                                            alt={`Ring ${ring.name} image ${idx + 1}`}
                                            style={{ width: '50px', marginRight: '5px' }}
                                        />
                                    ))
                                ) : (
                                    'No images'
                                )}
                            </td>
                            <td className="action-buttons">
                                <Link to={`/user/rings/edit/${ring.id}`} className="edit-button">Edit</Link>
                                <button onClick={() => handleDelete(ring.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ViewRingUser;