import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AdminMenu from './AdminPanel/AdminMenu';
import RingCard from './components/Rings/RingCard/RingCard';
import { useEffect, useState } from 'react';
import config from './config'
import RingListUser from './components/Rings/UserListRings/RingListUser';

function App() {

  const [rings,setRings] = useState([]);

  const fetchRings = () => {
    fetch(config.API_ROOT_PATH + "/rings")
      .then(response => response.json())
      .then(json => setRings(json))
      .catch(e => console.error(e));
  };

    useEffect(() => {
    fetchRings();
  }, []);

  return (

    <Router>
      <div className='AppLinks'>
        <nav>
          <ul className='links'>
            <li><Link to="/admin">Admin panel</Link></li>
            <li><Link to="/rings">Rings</Link></li>
          </ul>
        </nav>
        </div>
        <Routes>
          <Route path="/admin/*" element={<AdminMenu />} />
          <Route path="/rings" element={<RingListUser rings={rings}/>} />
        </Routes>
      
    </Router>

  );

}

export default App;
