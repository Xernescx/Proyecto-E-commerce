import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDvRUDKoqHJRSczwy7s7QO_Oq9LPN_d6mY",
    authDomain: "proyectoreact-8ff3e.firebaseapp.com",
    projectId: "proyectoreact-8ff3e",
    storageBucket: "proyectoreact-8ff3e.appspot.com",
    messagingSenderId: "724725699296",
    appId: "1:724725699296:web:49c5ffc6afca7e666ef685"
};

    
    const fb = firebase.initializeApp(firebaseConfig);
    
    
    export const auth = fb.auth();
    
    export const db = fb.firestore();