import axios from "axios";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Store/index.js";
import { useState, useEffect } from "react";
import { toast } from 'react-toastify'; // Import react-toastify
import 'react-toastify/dist/ReactToastify.css';
import './Css/Navbar.css'; // Import your CSS file for styling
axios.defaults.withCredentials = true;

function Navbar() {
  const isLoggedIn = useSelector((state) => state.isLogin);
  const dispatch = useDispatch();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("https://your-task-backend.vercel.app/api/user", {
          withCredentials: true
        });
        setUserData(response.data.user);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    if (isLoggedIn) {
      fetchUserData();
    }
  }, [isLoggedIn]);

  const sendHandleLogout = async () => {
    try {
      await axios.post("https://your-task-backend.vercel.app/api/logout", null, {
        withCredentials: true
      });
      // Show logout success toast
      toast.success('Logout successful!');
    } catch (error) {
      console.error("Failed to logout:", error);
      // Show logout error toast
      toast.error('Failed to logout. Please try again.');
    }
  };

  const handleLogout = async () => {
    try {
      await sendHandleLogout();
      dispatch(logout());
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };

  return (
    <div className="navbar-container">
      <div className="navbar-left">
        {isLoggedIn && userData && (
          <>
            <img
              src={`https://your-task-backend.vercel.app/${userData.avatar ? userData.avatar.replace(/\\/g, '/') : 'default-avatar.png'}`}
              className="avatar"
              alt="User Avatar"
            />
            <span className="username">{userData.name || 'User'}</span>
          </>
        )}

        {/* Show icon and username when not logged in */}
        {!isLoggedIn && (
          <>
            <i className="fas fa-user avatar-default"></i>
            <span className="username">Guest</span>
          </>
        )}
      </div>
      <div className="navbar-right">
        {!isLoggedIn ? (
          <>
            <Link className="btn btn-primary" to="/login">Login</Link>
            <Link className="btn btn-secondary" to="/signup">Signup</Link>
          </>
        ) : (
          <>
            <Link className="btn btn-secondary" to="/add-task">Add Task</Link>
            <Link className="btn btn-secondary" to="/" onClick={handleLogout}>Logout</Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
