import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/location">Location</Link>
      {/* Add more Links as needed */}
    </nav>
  );
}

export default Navbar;