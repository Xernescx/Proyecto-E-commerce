import { NavLink } from 'react-router-dom';
import './Navbar.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faShoppingCart} from '@fortawesome/free-solid-svg-icons' ;
import {faBars} from '@fortawesome/free-solid-svg-icons' ;
const Navbar = () => {


  return (
    <nav class="navbar">
    <span class="navbar-toggle" id="js-navbar-toggle" >
        <FontAwesomeIcon class="fas fa-bars" icon="{faBars}" />
    </span>
    <a href="#" class="logo">logo</a>
    <div class="container">
        <input type="text" placeholder="Search..." />
        <div class="search"></div>
      </div>
    <ul class="main-nav" id="js-menu">
      <li>
            <a href="#" class="nav-links">Login</a>
        </li>
        <li>
            <a href="#" class="nav-links registro">Create Account</a>
        </li>
        <li>
            <a href="#" class="nav-links shoppingColor "><FontAwesomeIcon  class=" fas fa-shopping-cart" icon="{faShoppingCart}" /></a>
        </li>
    </ul>
</nav>
  );
};

export default Navbar;
