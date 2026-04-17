import { NavLink, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [dark, setDark] = useState(false);

  const toggleDarkMode = () => {
    setDark(!dark);

    if (!dark) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  };

  const handleLogout = () => {
    logout();
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="navbar">

      {/* LEFT */}
      <div className="nav-left">

        {/* 🌸 MOVED LOGO HERE */}
        <div className="nav-logo">
          🌼💐 BLOOM THROUGH LENS 💐🌼
        </div>

        <NavLink to="/home">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/contact">Contact</NavLink>
        <NavLink to="/create-post">New Post</NavLink>
        <NavLink to="/profile">Profile</NavLink>

        {user?.role === 'admin' && (
          <NavLink to="/admin">Admin</NavLink>
        )}
      </div>

      {/* RIGHT */}
      <div className="nav-right">

        {/* 🌙 DARK MODE */}
        <button className="mode-btn" onClick={toggleDarkMode}>
          {dark ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>

        {user && (
          <span className="username">
            👤 {user.name}
          </span>
        )}

        {user ? (
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        ) : (
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Register</NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;