import React from 'react';
import { useState, useEffect } from 'react';
import './Destacados.css';
import { Link } from 'react-router-dom'
import { db } from '../FireBase/Firebase'
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import { ThemeProvider, makeStyles, createMuiTheme } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(2),
      color: "#ffff",
    },
  },
}));

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
  const classes = useStyles();
  const [links, setLink] = useState([]);
  const [loading, setloading] = useState(true);
  const [page, setPage] = React.useState(1)
  const [data, setdata] = React.useState({
    total: 0,
    paginas: 0,
    porPagina: 12,
  });


  const handleChange = (event, value) => {


    console.log(value)
    let ref;

    if (value === page) {
      return
    }
    else if (value < page) {

      ref = db.collection("VideoGames").limit(data.porPagina).orderBy("nameSearch").endAt(links[0].nameSearch)
    } else {
      ref = db.collection("VideoGames").limit(data.porPagina).orderBy("nameSearch").startAfter(links[links.length - 1].nameSearch)
    }
    setloading(true)
    setPage(value)
    ref.get().then((querySnapshot) => {
      let docs = []
      querySnapshot.forEach((doc) => {
        /* console.log(doc.data()) */
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


    });

  };




  useEffect(() => {

    db.collection("VideoGames").get().then(res => {
      data.total = res.size
      data.paginas = Math.ceil((data.total / data.porPagina))
    })
    db.collection("VideoGames").where("nameSearch", ">=", " ").orderBy("nameSearch", "asc").limit(data.porPagina).get().then((querySnapshot) => {
      let docs = []

      querySnapshot.forEach((doc) => {

        /* console.log(querySnapshot)
        console.log(doc.data()) */
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
      /* console.log(docs) */
    });
    console.log(links)
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
      <CssBaseline zIndex="tooltip" />
      <div className="destacadosContainer">
        <div className="presentacion">
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
          >
            <iframe title="lugar" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d8086.398453993333!2d-8.413570333663609!3d43.365349489822265!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x26192fb5b3328d58!2sPraza%20Angel%20Ron%20Fraga!5e0!3m2!1ses!2ses!4v1616230522736!5m2!1ses!2ses" width="250" height="300"  loading="lazy"></iframe>
            
            <p>Bievenido, somos una tienda de juegos totalmente original, no nos copiamos para nada de Insta Gaming, vendemos juegos de todas las plataformas de pc y con todos los generos</p>
          </Grid>
        </div>
        <h1>Destacados</h1>

        <div>
          {links.map(link => {

            return (
              <div className="gamesD" key={link.name}  style={{zIndex: 1}}>
                <Link className="cover" to={`/product/${link.name}`}>
                  <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                  >
                    <div>
                      <img className="bange" src={link.plataformURL} alt={link.plataform} />
                      <img className="covePage" alt={link.name} title={link.name} src={link.covePage} />
                      <div className="priceData">
                        {link.promo && (<span className="promo">{link.promo}%</span>)}
                        {link.promo && (<span className="price">{((link.price - (link.price * link.promo) / 100)).toFixed(2)}€</span>)}
                        {!link.promo && (<span className="price">{link.price}€</span>)}

                      </div>
                    </div>
                    <div className="nameGame ">{link.name}</div>
                  </Grid>
                </Link>
              </div>
            )
          })}
        </div>
        <ThemeProvider theme={theme}>
          <div className={classes.root}>
            <Grid
              container
              justify="center"
              alignItems="center"
            >
              <Pagination count={data.paginas} page={page} variant="outlined" color="primary" onChange={handleChange} />
            </Grid>

          </div>
        </ThemeProvider>
      </div>

    </React.Fragment>
  );
}