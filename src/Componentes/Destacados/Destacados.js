import React from 'react';
import { useState, useEffect } from 'react';
import './Destacados.css';
import {Link} from 'react-router-dom'
import { db } from '../FireBase/Firebase'
import { useForm } from "react-hook-form";
import firebase from 'firebase/app';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import { createMuiTheme, fade, makeStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';



const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#ac4caf',
    },
    secondary: {
      main: '#ac4caf'
    }

  },

})

export default function SimpleContainer() {



  const [links, setLink] = useState([]);
  const [promo, setPromo] = useState();
  const [loading, setloading] = useState(true);
  /* const [page, setPage] = React.useState(1); */

  /* const handleChange = (event, value) => {
    setloading(true)

    setPage(value)
    console.log(value)
    db.collection("VideoGames").limit(pagination.forPages).orderBy("nameSearch")
    .startAfter(pagination.forPages*(value - 1)).get().then((querySnapshot) => {
      pagination.entradas = []; 
      querySnapshot.forEach((doc) => {
        console.log(doc.data())
        pagination.entradas.push({
          ...doc.data(), date: doc.date,
            requerimentsMax: doc.requerimentsMax,
            requerimentsMin: doc.requerimentsMin,
            developer: doc.developer,
            discSpaces: doc.discSpaces,
            description: doc.description,
            so: doc.so
        })
      });

      setLink(pagination.entradas)
      setloading(false);


    });

  }; */
  useEffect(() => {


    db.collection("VideoGames").orderBy("nameSearch", "asc" ).get().then((querySnapshot) => {
      let docs = []
        querySnapshot.forEach((doc) => {
          
          console.log(querySnapshot)
          console.log(doc.data())
          docs.push({
            ...doc.data(), date: doc.date,
            requerimentsMax: doc.requerimentsMax,
            requerimentsMin: doc.requerimentsMin,
            developer: doc.developer,
            discSpaces: doc.discSpaces,
            description: doc.description,
            so: doc.so
          })
        });

        setLink(docs)
        setloading(false);
        console.log(docs)
      });
     
  }, [])



  if (loading === true) {
    return (
      <div className="loading">
        <ThemeProvider theme={theme}>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
          >
            <div>
              <CircularProgress theme={theme} />
            </div>
          </Grid>
        </ThemeProvider>
      </div>
    )
  }

  return (
    <React.Fragment>
      <CssBaseline />


      <div className="destacadosContainer"> 
        {links.map(link => {
          return (
            <div className="gamesD">
              <Link className="cover" to={`/product/${link.name}`}>
                <Grid
                  container
                  direction="column"
                  justify="center"
                  alignItems="center"
                >
                  <div>
                  <img  className="bange" src={link.plataformURL} alt={link.plataform}/>
                  <img className="covePage" alt={link.name} title={link.name} src={link.covePage} />
                  <div className="priceData">
                    {link.promo && ( <spam className="promo">{link.promo}%</spam> )}
                    {link.promo && ( <spam className="price">{((link.price - (link.price * link.promo) / 100)).toFixed(2)}€</spam>)}
                    {!link.promo && (  <spam className="price">{link.price}€</spam>)}
                    
                  </div>
                  </div>
                  <div className="nameGame ">{link.name}</div>
                </Grid>
              </Link>
            </div>
          )
        })}
      </div>

    </React.Fragment>
  );
}