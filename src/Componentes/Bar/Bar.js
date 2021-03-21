import React from 'react';
import { Link } from 'react-router-dom'
import "./Bar.css";
import Steam from '../IconLogo/steam.png';
import Epic from '../IconLogo/epic.png'
import Battle from '../IconLogo/battle.png'
import Gog from '../IconLogo/gog.png'
import Uplay from '../IconLogo/uplay.png'
import Orinin from '../IconLogo/origin.png'
import YouTubeIcon from '@material-ui/icons/YouTube';
import IconButton from '@material-ui/core/IconButton';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  root: {
    fontSize: "87px"

  },
  fab: {
    margin: theme.spacing(2),
  },
  absolute: {
    position: 'fixed',
    background: "#ac4caf",
    bottom: "5%",
    left: "5%"


  },
  list: {
    width: 100,
    background: "#212529",
  },
  fullList: {
    width: 'auto',
    
  },

  title: {
    textDecoration: "none",
    color: "rgba(255, 255, 255, 0.7)",
    textAlign: "center",
    fontSize: "50px"

  }
}))

const Bar = () => {

  const classes = useStyles();
  const [state, setState] = React.useState({

    left: false,

  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
      

      <Link to="/search?"><h1 className={classes.title}>All</h1></Link>
        <Link to={`/search?plataform=Steam`}><img src={Steam} alt="Steam" /></Link>
        <Link to={`/search?plataform=Epic store`}><img src={Epic} alt="Epic" /></Link>
        <Link to={`/search?plataform=Origin`}><img src={Orinin} alt="Orinin" /></Link>
        <Link to={`/search?plataform=Battle`}><img src={Battle} alt="Battle" /></Link>
        <Link to={`/search?plataform=GoG`}><img src={Gog} alt="Gog" /></Link>
        <Link to={`/search?plataform=U-play`}><img src={Uplay} alt="Uplay" /></Link>
        
      </List>
      <Divider />
      <List>
      < IconButton >< YouTubeIcon className={`iconButtonYoutube primero ${classes.root}`} /></IconButton>
        < IconButton >< FacebookIcon className={`iconButtonFacebook ${classes.root}`} /></IconButton>
        < IconButton >< TwitterIcon className={`iconButtonTwitter ${classes.root}`} /></IconButton>
      </List>
    </div>
  );


  return (
    <div>
      <div className="addIcon">
        {['left'].map((anchor) => (
          <React.Fragment key={anchor}>
            
            <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
              {list(anchor)}
            </Drawer>
            <Tooltip onClick={toggleDrawer(anchor, true)} className={classes.absolute} style={{ zIndex: 3 }} title="Add" aria-label="add">
              <Fab color="primary" aria-label="add">
                <AddIcon />
              </Fab>
            </Tooltip>
          </React.Fragment>
        ))}
      </div>

      <div className="Bar " >

        <Link to="/search?"><h1>All</h1></Link>
        <Link to={`/search?plataform=Steam`}><img src={Steam} alt="Steam" /></Link>
        <Link to={`/search?plataform=Epic store`}><img src={Epic} alt="Epic" /></Link>
        <Link to={`/search?plataform=Origin`}><img src={Orinin} alt="Orinin" /></Link>
        <Link to={`/search?plataform=Battle`}><img src={Battle} alt="Battle" /></Link>
        <Link to={`/search?plataform=GoG`}><img src={Gog} alt="Gog" /></Link>
        <Link to={`/search?plataform=U-play`}><img src={Uplay} alt="Uplay" /></Link>
        < IconButton >< YouTubeIcon className={`iconButtonYoutube primero ${classes.root}`} /></IconButton>
        < IconButton >< FacebookIcon className={`iconButtonFacebook ${classes.root}`} /></IconButton>
        < IconButton >< TwitterIcon className={`iconButtonTwitter ${classes.root}`} /></IconButton>

      </div>
    </div>
  )


}

export default Bar;