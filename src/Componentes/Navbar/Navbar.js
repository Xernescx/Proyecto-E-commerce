
import { NavLink, Redirect } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './Navbar.css';
import { createMuiTheme, fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import InputBase from '@material-ui/core/InputBase';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import HomeIcon from '@material-ui/icons/Home';
import MoreIcon from '@material-ui/icons/MoreVert';
import { ThemeProvider } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import firebase from 'firebase/app';
import Badge from '@material-ui/core/Badge';

import { db, /* auth */ } from '../FireBase/Firebase'

const useStyles = makeStyles((theme) => ({

  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    transition: 'width 0.5s',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: '40%',
    },
    '&:hover': {
      width: '50%',

    }
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '200%',
    [theme.breakpoints.up('md')]: {
      width: '100%',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },

}));


const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#212529'
    },
    secondary: {
      main: '#ac4caf'
    }
  }
})

export default function PrimarySearchAppBar() {
  const classes = useStyles();
  const userJ = JSON.parse(window.localStorage.getItem("user"));
  const [carrito, setCarrito] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [logState, setLogstate] = useState(true);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [search, setSearch] = useState(false);

  /* Mira si el usuario esta registrado en el localstorte */
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      /* console.log("que miras puto") */
      setSearch(e.target.value)

    }

    /* console.log(e.target.value)  */
  }
  const updateSearch = e => {
    /* console.log(e.target.value) */
  }








  useEffect(() => {
    
    


    if (window.localStorage.getItem("user") === null) {
      setLogstate(true);
      console.log("no hay log");

    } else {
      setLogstate(false)
      console.log("si hay log");
      
      db.collection("users").where("email", "==", userJ.email)
      .orderBy("carrito", "asc").get().then((querySnapshot) => {

        querySnapshot.forEach((doc) => {

        setCarrito(doc.data().carrito)
        console.log(doc.data().carrito.length)

        });

      })
    }

  }, [logState]);


  /* Metodo de salir de la secion */
  const SingOutMethod = () => {
    firebase.auth().signOut().then(() => {
      /* console.log('hola buenas') */
      window.location = '/home';
      window.localStorage.clear("user");
    }).catch((error) => {
      /*  console.log('no pos yiyi') */
    });

  }

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);




  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };



  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <NavLink className='navLinkMenu' to="/profile">
        <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      </NavLink>
      <MenuItem onClick={SingOutMethod}>Sing Out</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <ThemeProvider theme={theme}>
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id={mobileMenuId}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
      >
        <NavLink className='navLinkMenu' to="/home">
          <MenuItem>
            <IconButton aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              color="inherit">
              <HomeIcon />
            </IconButton>
            <p>Home</p>
          </MenuItem>
        </NavLink>
        {logState && (
          <div>
            <NavLink className='navLinkMenu' to="/login">
              <MenuItem>
                <IconButton aria-label="account of current user"
                  aria-controls="primary-search-account-menu"
                  aria-haspopup="true"
                  color="inherit" >
                  <ShoppingCartIcon />
                </IconButton>
                <p>Carrito</p>
              </MenuItem>
            </NavLink>
            <NavLink className='navLinkMenu' to="/login">
              <MenuItem>
                <IconButton
                  aria-label="account of current user"
                  aria-controls="primary-search-account-menu"
                  aria-haspopup="true"
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <p>Login</p>
              </MenuItem>
            </NavLink>
            <NavLink className='navLinkMenu' to="/register">
              <MenuItem>
                <IconButton
                  aria-label="account of current user"
                  aria-controls="primary-search-account-menu"
                  aria-haspopup="true"
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <p>Sing In</p>
              </MenuItem>
            </NavLink>
          </div>
        )}
        
        {!logState && (
          <div>
            <NavLink className='navLinkMenu' to='/car'>
              <MenuItem>
                <IconButton aria-label="account of current user"
                  aria-controls="primary-search-account-menu"
                  aria-haspopup="true"
                  color="inherit" >
                  <Badge badgeContent={carrito.length} color="secondary">
                    <ShoppingCartIcon />
                  </Badge>
                </IconButton>
                <p>Carrito</p>
              </MenuItem>
            </NavLink>
            <MenuItem onClick={handleProfileMenuOpen}>
              <IconButton
                aria-label="account of current user"
                aria-controls="primary-search-account-menu"
                aria-haspopup="true"
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <p>Profile</p>
            </MenuItem>
          </div>
        )}
      </Menu>
    </ThemeProvider>
  );

  return (
    <div className={classes.grow}>
      <ThemeProvider theme={theme}>
        <AppBar position="static">
          <Toolbar>
            <Typography className={classes.title} variant="h5" >
              <NavLink className='navLinkBase' to="/home">
                HyperPC
              </NavLink>
            </Typography>
            <Grid
              container
              justify="center"
            >
              <div className={classes.search} >
                <div className={classes.searchIcon} >
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Search…"
                  fullWidth="true"
                  onKeyDown={handleKeyDown}
                  onChange={updateSearch}
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ 'aria-label': 'search' }}
                />
              </div>
            </Grid>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              {/* Cambions de navbar  */}
              {logState && (
                <div >
                  <ul className="main-nav" id="js-menu">
                    <li>
                      <NavLink className='navLinkBase' to="/login">
                        <p className="nav-links">Login</p>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className='navLinkBase' to="/register">
                        <p className="nav-links registro">Sign in</p>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className='navLinkMenu' to="/login">
                        <IconButton

                          aria-controls="primary-search-account-menu"
                          aria-haspopup="true"
                          color="inherit" >
                          <ShoppingCartIcon />
                        </IconButton>
                      </NavLink>
                    </li>
                  </ul>
                </div>
              )}
              {!logState && (
                <div>
                  <ul className="main-nav" id="js-menu">
                    <li>
                      <IconButton
                        edge="end"
                        aria-label="account of current user"
                        aria-controls={menuId}
                        aria-haspopup="true"
                        onClick={handleProfileMenuOpen}
                        color="inherit"
                      >
                        <AccountCircle />
                      </IconButton>
                    </li>
                    <li>
                      <NavLink className='navLinkMenu' to='/car'>
                        <IconButton aria-label="account of current user"
                          aria-controls="primary-search-account-menu"
                          aria-haspopup="true"
                          color="inherit" >
                          <Badge badgeContent={carrito.length} color="secondary">
                            <ShoppingCartIcon /></Badge>
                        </IconButton>
                      </NavLink>
                    </li>
                  </ul>
                </div>
              )}
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
      </ThemeProvider>
      {search && (
        <Redirect to={`/search/?name=${search.toLowerCase()}`} />
      )}
    </div>

  );
}
