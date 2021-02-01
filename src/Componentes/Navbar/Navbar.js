import { NavLink } from 'react-router-dom';
import './Navbar.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faShoppingCart, faBars} from '@fortawesome/free-solid-svg-icons' ;
const Navbar = () => {


  return (
    <nav class="navbar">
        <span class="navbar-toggle" id="js-navbar-toggle">
        <FontAwesomeIcon  icon={faBars} />
        </span>
        <a href="#p" class="logo">logo</a>
        <div class="container">
            <input type="text" placeholder="Search..." />
            <div class="search"></div>
          </div>
        <ul class="main-nav" id="js-menu">
        <li>
                <a href="#p" class="nav-links">Login</a>
            </li>
            <li>
                <a href="#p" class="nav-links registro">Create Account</a>
            </li>
            <li>
                <a href="#p" class="nav-links shoppingColor "><FontAwesomeIcon   icon={faShoppingCart} />{" "}</a>
            </li>
        </ul>
    </nav>



    //<FontAwesomeIcon class="fas fa-bars" icon={faBars} />
       
        //<FontAwesomeIcon  class=" fas fa-shopping-cart" icon={faShoppingCart} />
       
  );
};

export default Navbar;
