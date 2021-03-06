import React from 'react';
import { useState, useEffect } from 'react';
import './Destacados.css';
import { db } from '../FireBase/Firebase'
import { useForm } from "react-hook-form";
import firebase from 'firebase/app';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

export default function SimpleContainer() {



  const [data, setState] = useState({
    name: '',
    covePage: '',
  });
    const [links, setLink] = useState([]);
 

  useEffect(() => {

     
    db.collection("VideoGames").get().then((querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        

        console.log(doc.data())
        docs.push({...doc.data(), date: doc.date, 
          requerimentsMax: doc.requerimentsMax,
           requerimentsMin: doc.requerimentsMin,
            developer: doc.developer,
            discSpaces: doc.discSpaces,
          description: doc.description,
        so: doc.so})
      });
      console.log(docs)
      setLink(docs)
    });
  }, [])




  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        {links.map(link =>{
          return (  
            <div>
              <p>{link.name}</p>
              <img src={link.covePage} />
            </div>
          
          

          )
          
        })}


      </Container>
    </React.Fragment>
  );
}
