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

const useStyles = makeStyles((theme) => ({
  root: {
    fontSize:"87px"

  },
}))

const Bar = () => {
    
    const classes = useStyles();
    


    return (
        <div className="Bar " >
            <Link to="/product"><h1>All</h1></Link>
            <Link to={`/products/Steam`}><img src={Steam} alt="Steam" /></Link>
            <Link to={`/products/Epic store`}><img src={Epic} alt="Epic" /></Link>
            <Link to={`/products/Origin`}><img src={Orinin} alt="Orinin" /></Link>
            <Link to={`/products/Battle`}><img src={Battle} alt="Battle" /></Link>
            <Link to={`/products/GoG`}><img src={Gog} alt="Gog" /></Link>
            <Link to={`/products/U-play`}><img src={Uplay} alt="Uplay" /></Link>
            < IconButton >< YouTubeIcon className={`iconButtonYoutube primero ${classes.root}`} /></IconButton>
            < IconButton >< FacebookIcon className={`iconButtonFacebook ${classes.root}`} /></IconButton>
            < IconButton >< TwitterIcon className={`iconButtonTwitter ${classes.root}`}/></IconButton>
            
        </div>
    )


}

export default Bar;