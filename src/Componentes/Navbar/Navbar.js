import { NavLink } from 'react-router-dom';
import {useState} from 'react';
import './Navbar.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faShoppingCart, faBars, faUserCircle} from '@fortawesome/free-solid-svg-icons' ;
import {Dropdown} from 'react-bootstrap';
import firebase from 'firebase/app';
const Navbar = () => {

const [show, setShow] = useState(true);
function showC(e){
  setShow (
    !show
  );
}
const [isLoggedIn, setIsLoggedIn] = useState(false);

const [exit, setExit] = useState(true);

/*
firebase.auth().signOut().then(() => {
  console.log('hola buenas')
}).catch((error) => {
  console.log('no pos yiyi')
}); */

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    setIsLoggedIn(true)
    console.log('logeado puto')
  } else {
    setIsLoggedIn(false)
    console.log('marica')
  }
});


if (!isLoggedIn) {
return(
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
  <NavLink to="/login">
    <p className="nav-links">Login</p>
  </NavLink>
</li>
<li>
  <NavLink to="/register">
    <p className="nav-links registro">Create Account</p>
  </NavLink>
</li>
    <li>
        <p  className="nav-links shoppingColor "><FontAwesomeIcon   icon={faShoppingCart} />{" "}</p>
    </li>
</ul>
</nav>
);

}else{



  return(

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
          <NavLink to="#">
            <p className="nav-links registro"><FontAwesomeIcon icon={faUserCircle}/> My profile</p>
          </NavLink>
          
        </li>
        <li>
        <button className="btn" type="submit">Entrar</button>
        </li>
            <li>
                <p  className="nav-links shoppingColor "><FontAwesomeIcon   icon={faShoppingCart} />{" "}</p>
            </li>
        </ul>
    </nav>

  );
}
};




export default Navbar;
