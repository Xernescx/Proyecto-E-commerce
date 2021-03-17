import React from 'react';
import { useState, useEffect } from 'react';
import './Products.css';
import { db } from '../FireBase/Firebase'
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
  const [pagination, setPagination] = useState({
    entradas: [],
    paginas: 0,
    forPages: 6,
    total: 0,
    page: 0,

  });
  


  const [links, setLink] = useState([]);
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

        console.log(pagination.entradas)
        setLink(pagination.entradas)
        
        setloading(false);
        console.log(pagination)

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
              <a className="cover" href="#">
                <Grid
                  container
                  direction="column"
                  justify="center"
                  alignItems="center"
                >
                  <img className="covePage" alt={link.name} title={link.name} src={link.covePage} />
                  <div className="nameGame ">{link.name}</div>
                </Grid>
              </a>
            </div>
          )
        })}
      </div>

    </React.Fragment>
  );
}