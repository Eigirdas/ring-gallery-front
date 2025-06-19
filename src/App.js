import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AdminMenu from './AdminPanel/AdminMenu';
import { useEffect, useState } from 'react';
import config from './config'
import UserMenu from './UserPanel/UserMenu';
import Login from './components/authentication/Login';
import AuthService from './components/services/auth.service';
import RingListUser from './Public/RingList/RingListUser';
import Register from './components/authentication/Register';
import PrivateRoute from './components/services/PrivateRoute';
import Unauthorized from './components/services/Unauthorized';
import RingDetails from './Public/RingInfo/RingDetails';




function App() {

  const [rings,setRings] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);

  const fetchRings = () => {
    const token = JSON.parse(localStorage.getItem("user"))?.jwt;

    fetch(config.API_ROOT_PATH + "/rings", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return response.json();
      })
      .then(json => setRings(json))
      .catch(e => console.error("Klaida gaunant ziedus:", e));
  };

    useEffect(() => {
    fetchRings();
    const user = JSON.parse(localStorage.getItem('user'));
    console.log("Logged in user:", user);
    if(user){
      setCurrentUser(user);
    }
  }, []);

  const handleLogout = () => {
    AuthService.logout();
    setCurrentUser(undefined);
    window.location.href = "/login";
  }

  return (

    <Router>
      <div className='AppLinks'>
        <nav>
          <ul className='links'>
            {!currentUser && <li><Link to="/login">Login</Link></li>} 
            {!currentUser && <li><Link to="/register">Register</Link></li> }
            <li><Link to="/rings">Rings</Link></li>
            
            
            {currentUser && (
              <>
              <li><Link to="/user">User Panel</Link></li>
              {currentUser.roles?.includes("ROLE_ADMIN") && (
                <li><Link to="/admin">Admin panel</Link></li>
              )}
              <li><button onClick={handleLogout}>Logout</button></li>
              </>
            )}
            
            
            
          </ul>
        </nav>
        </div>
        
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          <Route path="/rings" element={<RingListUser rings={rings} />} />
          <Route path="/rings/:id" element={<RingDetails />} />

          <Route
            path="/admin/*"
            element={
              <PrivateRoute roles={["ROLE_ADMIN"]}>
                <AdminMenu />
              </PrivateRoute>
            }
          />
          <Route
            path="/user/*"
            element={
              <PrivateRoute roles={["ROLE_USER", "ROLE_ADMIN"]}>
                <UserMenu />
              </PrivateRoute>
            }
          />
        </Routes>
      
    </Router>

  );

}

export default App;
