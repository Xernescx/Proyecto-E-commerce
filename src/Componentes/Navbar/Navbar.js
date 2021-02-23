import React from 'react';
import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './Navbar.css';
import { createMuiTheme, fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import { ThemeProvider } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import firebase from 'firebase/app';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faBars, faUserCircle } from '@fortawesome/free-solid-svg-icons';

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
  typographyStyle: {
    color: 'red'
  }
}));


const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#212529'
    },
    secondary: {
      main: '#ffffffb3'
    }
  }
})

export default function PrimarySearchAppBar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [logState, setLogstate] = React.useState(true);

  //verifica que el usuarioo esta logeado
  window.onload = () => {
    if (window.localStorage.getItem("user") === null) {
      setLogstate(true);
      console.log("no hay log");

    } else {
      setLogstate(false)
      console.log("si hay log");
    }

  }
  //Metodo de salir del usuario
  const SingOutMethod = () => {
    firebase.auth().signOut().then(() => {
      console.log('hola buenas')
      window.location = '/home';
      window.localStorage.clear("user");
    }).catch((error) => {
      console.log('no pos yiyi')
    });

  }



  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

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
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
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
        {logState && (
          <div></div>
        )}
        <MenuItem>
          <IconButton aria-label="show 4 new mails" color="inherit">
            <Badge badgeContent={4} color="secondary">
              <MailIcon />
            </Badge>
          </IconButton>
          <p>Messages</p>
        </MenuItem>
        <MenuItem>
          <IconButton aria-label="show 11 new notifications" color="inherit">
            <Badge badgeContent={11} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <p>Notifications</p>
        </MenuItem>
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

      </Menu>
    </ThemeProvider>
  );

  return (
    <div className={classes.grow}>
      <ThemeProvider theme={theme}>
        <AppBar position="static">
          <Toolbar>

            <Typography className={classes.title} variant="h5" >
              Logo
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
              {/* Partes cambiantes del Navbar */}
              {logState && (
                <div>
                  <p className="nav-links shoppingColor "><FontAwesomeIcon icon={faShoppingCart} />{" "}</p>
                </div>
              )}
              {!logState && (
                <div>

                </div>
              )}

            </div>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
      </ThemeProvider>
    </div>

  );
}
