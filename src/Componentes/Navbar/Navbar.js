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
        <a href="#p" className="logo">logo</a>
        <div className="container">
            <input type="text" placeholder="Search..." />
            <div className="search"></div>
          </div>
        <ul className={show? "main-nav" : "main-nav active"} id="js-menu">
        <li>
                <a href="#p" className="nav-links">Login</a>
            </li>
            <li>
                <a href="#p" className="nav-links registro">Create Account</a>
            </li>
            <li>
                <a href="#p" className="nav-links shoppingColor "><FontAwesomeIcon   icon={faShoppingCart} />{" "}</a>
            </li>
        </ul>
    </nav>
  );
};

export default Navbar;
