import { Link } from 'react-router-dom';
import './navbar.css';

function Navbar() {
  return (
      <nav className="navbar">
      <Link to="/" className="nav-item">Home</Link>
      <Link to="/location" className="nav-item">Location</Link>
      <Link to="/episode" className="nav-item">Episode</Link>
    </nav>
  );
}

export default Navbar;