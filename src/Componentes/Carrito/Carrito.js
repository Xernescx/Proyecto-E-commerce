/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import { db, auth } from '../FireBase/Firebase'
import { Link } from 'react-router-dom'
import "./Carrito.css";
import { ThemeProvider, makeStyles, createMuiTheme } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';
import IconButton from '@material-ui/core/IconButton';


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

const useStyles = makeStyles((theme) => ({
  title: {
    color: "#ac4caf",
  },

}));

export default function SimpleContainer() {
  const classes = useStyles();
  const userJ = JSON.parse(window.sessionStorage.getItem("user"));
  const [links, setLink] = useState([]);
  const [id, setID] = useState({});
  const [price, setPrice] = useState([]);
  const [loading, setloading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    let total = 0;
    setLink([])

    let user = firebase.auth().currentUser;
    if (user != null) {

    } else {
      if (window.sessionStorage.getItem("user") === null) {
        window.location = '/home';
      } else {
        /* console.log("si hay log"); */
        login();
      }
    }
    db.collection("users").where("email", "==", userJ.email)
      .orderBy("carrito", "asc").get().then((querySnapshot) => {
        let games = [];
        querySnapshot.forEach((doc) => {

          doc.data().carrito.forEach(element => {
          

            db.collection("VideoGames")
              .where("name", "==", element).get().then((querySnapshot) => {
                querySnapshot.forEach((doc1) => {
                  /* console.log(doc1.data()) */
                  total = parseFloat(doc1.data().price) + parseFloat(total)
                  setTotalPrice(total)
                  games.push({ name: doc1.data().name, price: doc1.data().price})
                  setLink(links => [...links, doc1.data()])
                });
              });
          });
          setID(games)
        });
      });

    /* console.log(links) */
    setloading(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function removeItemFromArr(arr, item) {
    var i = arr.indexOf(item);
    arr.splice(i, 1);
  }

  const deleteCarList = (a) => {
    setloading(true);
    console.log(a)
    removeItemFromArr(links, a);
    console.log(links)
    db.collection("users").doc(firebase.auth().currentUser.uid).update({
      carrito: firebase.firestore.FieldValue.arrayRemove(a)
    }).then(() => {
      console.log("Document successfully updated!");
      window.location.reload();
    })
      .catch((error) => {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });
    setloading(false);
  };

  const comprar = () => {

    db.collection("pedidos").add({
      user: db.collection("users").doc(firebase.auth().currentUser.uid),
      date: new Date(),
      total: parseFloat(totalPrice),
      games: id,


    }).then(() => {
      console.log("Document successfully updated!");

    })
      .catch((error) => {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
        return;
      });


    db.collection("users").doc(firebase.auth().currentUser.uid).update({
      carrito: [],


    }).then(() => {
      console.log("Document successfully updated!");
      window.location = "/pedidos"
    })
      .catch((error) => {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });

  }

  const login = React.useCallback(async () => {
    console.log('Login')
    try {
      await auth.signInWithEmailAndPassword(userJ.email, userJ.password).then((user) => {
        /* console.log("logeado parece") */
        /*  console.log(window.localStorage.getItem('user')); */
      })
    } catch (error) {
      console.log(error.code)
    }
  })


  if (loading === true) {
    return (
      <div className="carrito">


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
    <Grid
      container
      justify="center"
      alignItems="center"
    >
      <div className="carrito " >

        {links.length > 0 ? (links.map(link => {
          /*  console.log('pepe') */
          return (
            <div className="carDiv" key={link.name}>
              <Grid
                container
                direction="row"

              >
                <Link className="aCar" to={`/product/${link.name}`}>
                  <img className="carImage" alt={link.name} title={link.name} src={link.covePage} />
                </Link>
                <div className="textCar">
                  <div>
                    <p className="carTitle">{link.name}</p>
                  </div>

                  <p className="priceCar">{link.promo && (((link.price - (link.price * link.promo) / 100)).toFixed(2))}{!link.promo && (link.price)}€</p>
                  <IconButton onClick={() => deleteCarList(link.name)}>
                    <DeleteSweepIcon className={classes.title} />
                  </IconButton>
                </div>

              </Grid>

            </div>
          )

        })) : (
          <p className="Error404">No se han econtrado resultados</p>
        )}


        <div className="carritoTotal">
          <button className="" onClick={comprar} >Comprar</button>
          <p>Total: {totalPrice} €</p>

        </div>


      </div>

    </Grid>
  );


};
