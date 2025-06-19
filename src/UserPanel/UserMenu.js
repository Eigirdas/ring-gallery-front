import { Routes, Route, Link } from 'react-router-dom';

import RingListUser from '../Public/RingList/RingListUser';
import AddRingUser from './UserRingManagement/RingAddUser/AddRingUser';
import ViewRingUser from './UserRingManagement/RingAddUser/ViewRingUser';
import EditRingUser from './UserRingManagement/EditRingUser/EditRingUser';


function UserMenu({ rings }) {
  return (
    <div className='AppLinks'>
      <nav>
        <ul className='links'>
          <li><Link to="/user/rings/add" className="add-button">Add ring</Link></li>
          <li><Link to="/user/rings/my" className="add-button">My rings</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="rings" element={<RingListUser rings={rings} />} />
        <Route path="rings/add" element={<AddRingUser />} />
        <Route path="rings/my" element={<ViewRingUser />} />
        <Route path="rings/edit/:id" element={<EditRingUser />} />
      </Routes>
    </div>
  );
}

export default UserMenu;
