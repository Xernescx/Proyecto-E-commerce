import { NavLink } from 'react-router-dom';
import {useState} from 'react';
import './Navbar.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faShoppingCart, faBars} from '@fortawesome/free-solid-svg-icons' ;
const Navbar = () => {

const [show, setShow] = useState(true);
function showC(e){
  setShow (
    !show
  );
}


  return (
    <nav className="navbar">
        <span className="navbar-toggle" id="js-navbar-toggle" onClick={(e) => showC()}>
        <FontAwesomeIcon  icon={faBars} />
        </span>
        <NavLink to="/home">
        <p  className="logo">logo</p>
        </NavLink>
        <div className="container">
            <input type="text" placeholder="Search..." />
            <div className="search"></div>
          </div>
        <ul className={show? "main-nav" : "main-nav activeOpen"} id="js-menu">
        <li>
                <p  className="nav-links">Login</p>
            </li>
            <li>
                <NavLink to="/registro">
                <p  className="nav-links registro">Create Account</p>
                </NavLink>
            </li>
            <li>
                <p  className="nav-links shoppingColor "><FontAwesomeIcon   icon={faShoppingCart} />{" "}</p>
            </li>
        </ul>
    </nav>
  );
};

export default Navbar;
