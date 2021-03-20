import React from 'react';
import { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import { db, auth } from '../FireBase/Firebase'
import { Link } from 'react-router-dom'
import "./Carrito.css";
import { ThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';

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
  const userJ = JSON.parse(window.localStorage.getItem("user"));
  const [links, setLink] = useState([]);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    setloading(true)
    let user = firebase.auth().currentUser;
    if (user != null) {
      
    } else {
      if (window.localStorage.getItem("user") === null) {
        window.location = '/home';
      } else {
        /* console.log("si hay log"); */
        login();
      }
    }

    db.collection("users").where("email", "==", userJ.email)
      .orderBy("carrito", "asc").get().then((querySnapshot) => {
        let docs = [];
        querySnapshot.forEach((doc) => {
          
          doc.data().carrito.forEach(element => {
            db.collection("VideoGames").where("name", "==", element).get().then((querySnapshot1) => {
              querySnapshot1.forEach((doc2) => {
                docs.push(doc2.data())
              })
              
            })

          });

        });
        setLink(docs)
        /* console.log(docs) */
        console.log(links) 

      });
    setloading(false);
    
  }, [])

  const login = React.useCallback(async () => {
    console.log('Login')
    try {
      const res = await auth.signInWithEmailAndPassword(userJ.email, userJ.password).then((user) => {
        /* console.log("logeado parece") */
        /*  console.log(window.localStorage.getItem('user')); */
      })
    } catch (error) {
      console.log(error.code)
    }
  })


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
    <div className="carrito " >
      
      {links.map(link => {
            console.log('pepe')
            return (
              <div className="gamesD" key={link.name}>
                <Link className="cover" to={`/product/${link.name}`}>
                
                    <div>
                      <img className="bange" src={link.plataformURL} alt={link.plataform} />
                      <img className="covePage" alt={link.name} title={link.name} src={link.covePage} />
                      <div className="priceData">
                        {link.promo && (<spam className="promo">{link.promo}%</spam>)}
                        {link.promo && (<spam className="price">{((link.price - (link.price * link.promo) / 100)).toFixed(2)}€</spam>)}
                        {!link.promo && (<spam className="price">{link.price}€</spam>)}

                      </div>
                    </div>
                    <div className="nameGame ">{link.name}</div>
                  
                </Link>
              </div>
            )
            
          })}
    </div>
  );


};
