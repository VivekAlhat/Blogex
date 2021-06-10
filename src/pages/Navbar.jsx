import { Link } from "react-router-dom";
import "./css/navbar.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <h2>Blogex</h2>
      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
