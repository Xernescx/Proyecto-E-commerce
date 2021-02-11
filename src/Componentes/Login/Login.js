import React from 'react';
import { useState } from 'react';
import './Login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { db, auth } from '../FireBase/Firebase'
import { useForm } from "react-hook-form";


const Login = () => {

    const initalStateValue = {
        email: '',
        password: '',
        confirmPassword: '',
        name: '',
        lastName: '',
        date: '',
        country: 'Afghanistan',
        nickname: ''
    }
    const [error, setError] = useState(null);


    const { register, errors, handleSubmit, watch} = useForm({});
    const onSubmit = async data => {
        //registro();
        login();
        console.log(formState);
    };
    const [formState, setFormState] = useState(initalStateValue);
    const handleChange = event => {
        setFormState({
            ...formState,
            [event.target.name]: event.target.value,
        })
    }

    const login = React.useCallback(async () => {
        try {
            const res = await auth.signInWithEmailAndPassword(formState.email, formState.password).then((user) => {
                console.log("logeado puto")
            })
        } catch (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage, errorCode);
        }
    })




    

    /* const registro = React.useCallback(async () => {
        try {
            const res = await auth.createUserWithEmailAndPassword(formState.email, formState.password)
            await db.collection('users').doc(res.user.uid).set({
                email: res.user.email,
                password: formState.password,
                name: formState.name,
                lastName: formState.lastName,
                date: formState.date,
                country: formState.country,
                nickname: ''
            });

        } catch (error) {
            console.log(error)
            // setError(error.message)
            if (error.code === 'auth/email-already-in-use') {
                setError('Usuario ya registrado...')
                return
            }
            if (error.code === 'auth/invalid-email') {
                setError('Email no válido')
                return
            }
        }



    }) */

    return (
        <div className="formulario">
            <div className="log-form">
                <form onSubmit={handleSubmit(onSubmit)} >
                    <FontAwesomeIcon className="fa-exclamationCircle" icon={faExclamationCircle} />  <label className="labelForm" id="email">Correo                         
                    <input className="inputForm" onChange={handleChange} type="email" name="email" required /></label>
                    <br />
                    <FontAwesomeIcon className="fa-exclamationCircle" icon={faExclamationCircle} />  <label className="labelForm" id="password">Constraseña                 
                    <input className="inputForm" onChange={handleChange} type="password" name="password" required /></label>
                    <br />
                    {/* <a class="forgot" href="#"> Aun no tienes cuenta? registrate</a> */}
                    <button className="btn" type="submit">Entrar</button>
                    
                </form>
            </div>
        </div>
    )



}

export default Login;