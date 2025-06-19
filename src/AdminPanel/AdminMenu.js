import RingList from '../components/admin/rings/RingList';
import AddRing from '../components/admin/rings/AddRing';
import EditRing from '../components/admin/rings/EditRing';

import EditUser from '../components/admin/users/EditUser';
import UserList from '../components/admin/users/UserList';
import AddUser from '../components/admin/users/AddUser';
import './AdminMenu.css';
import { Routes, Route, Link, Navigate } from 'react-router-dom';

function AdminMenu() {
  return (
    <div className='AppLinks'>
      <nav>
        <ul className='links'>
        <li><Link to="/admin/users">Users</Link></li>
        <li><Link to="/admin/rings">Rings</Link></li>
      </ul>
      </nav>

      <Routes>
        <Route path="rings" element={<RingList />} />
        <Route path="users" element={<UserList />} />
        <Route path="rings/add" element={<AddRing />} />
        <Route path="rings/edit/:id" element={<EditRing />} />
        <Route path="users/edit/:id" element={<EditUser />} />
        <Route path="users/add" element={<AddUser />} />
      </Routes>
    </div>
  );
}

export default AdminMenu;
