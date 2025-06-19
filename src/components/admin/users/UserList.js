import { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import './UserList.css';

function UserList() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const userData = JSON.parse(localStorage.getItem("user"));
            const token = userData?.jwt;

            if (!token) {
                alert("User not logged in!");
                return;
            }

            const response = await axios.get('http://localhost:8080/admin/users', {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            console.log('Fetched user data', response.data);
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const userData = JSON.parse(localStorage.getItem("user"));
            const token = userData?.jwt;

            await axios.delete(`http://localhost:8080/admin/users/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            fetchUsers(); // refresh user list
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    return (
        <div className="container">
            <h2>User list</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td className="action-buttons">
                                <Link to={`/admin/users/edit/${user.id}`} className="edit-button">Edit</Link>
                                <button onClick={() => handleDelete(user.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Link to="/admin/users/add" className="add-button">Add user</Link>
        </div>
    );
}

export default UserList;
