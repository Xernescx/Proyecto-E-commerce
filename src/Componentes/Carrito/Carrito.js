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

const Carrito = () => {
   




    return (
        <div className="carrito " >
           
        </div>
    )


}

export default Carrito;