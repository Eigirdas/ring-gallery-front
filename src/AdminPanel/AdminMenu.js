import RingList from '../components/Rings/RingListAdmin/RingList';
import AddRing from '../components/Rings/AddRing';
import EditRing from '../components/Rings/EditRing';
import axios from '../AxiosConfig';
import { Routes, Route, Link, Navigate } from 'react-router-dom';

function AdminMenu() {
  return (
    <div className='AppLinks'>
      <Routes>
        <Route path="/" element={<Navigate to="rings" />} />
        <Route path="rings" element={<RingList />} />
        <Route path="rings/add" element={<AddRing />} />
        <Route path="rings/edit/:id" element={<EditRing />} />
      </Routes>
    </div>
  );
}

export default AdminMenu;
