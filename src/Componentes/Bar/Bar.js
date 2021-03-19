import React from 'react';
import { useEffect, useState } from 'react';
import { db } from '../FireBase/Firebase'
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
    const [genders, setGenders] = useState([]);
    const classes = useStyles();
    useEffect(() => {
        
        db.collection(" genders")
        .orderBy("name", "asc").get().then((querySnapshot) => {
            let docs = []
            querySnapshot.forEach((doc) => {

                docs.push(doc.data())
            });
            setGenders(docs)
        });


    }, [])



    return (
        <div className="Bar " >
            <Link to="/products/"><h1>All</h1></Link>
            <Link to={`/products/Steam`}><img src={Steam} all={Steam} /></Link>
            <Link to={`/products/Epic store`}><img src={Epic} all={Epic} /></Link>
            <Link to={`/products/Origin`}><img src={Orinin} all={Orinin} /></Link>
            <Link to={`/products/Battle`}><img src={Battle} all={Battle} /></Link>
            <Link to={`/products/GoG`}><img src={Gog} all={Gog} /></Link>
            <Link to={`/products/U-play`}><img src={Uplay} all={Uplay} /></Link>
            < IconButton >< YouTubeIcon className={`iconButtonYoutube primero ${classes.root}`} /></IconButton>
            < IconButton >< FacebookIcon className={`iconButtonFacebook ${classes.root}`} /></IconButton>
            < IconButton >< TwitterIcon className={`iconButtonTwitter ${classes.root}`}/></IconButton>
            
        </div>
    )


}

export default Bar;