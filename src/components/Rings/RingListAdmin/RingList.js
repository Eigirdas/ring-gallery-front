import { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import './RingList.css';
import { useLocation } from "react-router-dom";

function RingList(){
    const [rings, setRings] = useState([]);
    const location = useLocation();

    useEffect(() => {
        fetchRings();
    }, [location.key]);

    const fetchRings = async () => {
        try{
            const response = await axios.get('http://localhost:8080/rings');
            console.log('Fetched rings data: ' , response.data);
            setRings(response.data);
        } catch (error) {
            console.error('Klaida gaunant ziedus', error)
        }
    };



    const handleDelete = async (id) => {
        try{
            await axios.delete(`http://localhost:8080/rings/${id}`);
            fetchRings(); // refresh books list
        } catch(error) {
            console.error('Klaida trinant zieda', error)
        }
    };

    return(
        <div className="container">
            <h2>Rings List</h2>
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
                            <td>{ring.user.id}</td>
                            <td>{ring.images}</td>
                            <td className="action-buttons">
                                <Link to={`/admin/rings/edit/${ring.id}`}className="edit-button">Redaguoti</Link>
                                <button onClick={() => handleDelete(ring.id)}>Trinti</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Link to="/admin/rings/add" className="add-button">Prideti zieda</Link>
        </div>
    )
}

export default RingList;