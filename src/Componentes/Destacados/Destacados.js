import React from 'react';
import { useState, useEffect } from 'react';
import './Destacados.css';
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
      main: '#ac4caf'
    },
    secondary: {
      main: '#ac4caf'
    }
  }
})

export default function SimpleContainer() {



  const [data, setState] = useState({
    name: '',
    covePage: '',
  });
  const [links, setLink] = useState([]);
  const [loading, setloading] = useState(true);

  useEffect(() => {


    db.collection("VideoGames").get().then((querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {


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

      console.log(docs)
      setLink(docs)
      setloading(false);
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
              <CircularProgress theme={theme} className="pepe" />
            </div>
          </Grid>
        </ThemeProvider>
      </div>
    )
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <div className="uldetacados">
        <ul  >
          <li>
            <div className="destacadosContainer">
              {links.map(link => {
                return (
                  <div className="gamesD">
                    <Grid
                      container
                      direction="column"
                      justify="center"
                      alignItems="center"
                    >
                      <img className="covePage" alt={link.name + "covePage"} src={link.covePage} />
                      <div className="nameGame ">{link.name}</div>
                    </Grid>
                  </div>
                )
              })}
            </div>
          </li>
          <li>
            <div className="destacadosContainer">
              {links.map(link => {
                return (
                  <div className="gamesD">
                    <Grid
                      container
                      direction="column"
                      justify="center"
                      alignItems="center"
                    >
                      <img className="covePage" alt={link.name + "covePage"} src={link.covePage} />
                      <div className="nameGame ">{link.name}</div>
                    </Grid>
                  </div>
                )
              })}
            </div>
          </li>
          <li>
            <div className="destacadosContainer">
              {links.map(link => {
                return (
                  <div className="gamesD">
                    <Grid
                      container
                      direction="column"
                      justify="center"
                      alignItems="center"
                    >
                      <img className="covePage" alt={link.name + "covePage"} src={link.covePage} />
                      <div className="nameGame ">{link.name}</div>
                    </Grid>
                  </div>
                )
              })}
            </div>
          </li>

        </ul>





      </div>
    </React.Fragment>
  );
}

