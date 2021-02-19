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
    }
    const [error, setError] = useState(null);
    const [errorp, setErrorp] = useState(null);

    const { register, errors, handleSubmit, watch } = useForm({});
    const onSubmit = async data => {
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
                console.log("logeado parece")
                window.location = '/home';
            })
        } catch (error) {
            if (error.code === "auth/user-not-found") {
                setError('Email invalido');
                return;
            }
            if (error.code === "auth/wrong-password") {
                setErrorp('Contraseña incorrecta');
                return;
            }
            /* var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode); */
        }
    })
    return (
        <div className="formulario">
            <div className="log-form">
                <form onSubmit={handleSubmit(onSubmit)} >
                    <label className="labelForm" id="email">Correo
                    {error && <div><FontAwesomeIcon className="fa-exclamationCircle"
                            icon={faExclamationCircle} /><p>{error}</p></div>}
                    {errors.email && <div><FontAwesomeIcon className="fa-exclamationCircle"
                        icon={faExclamationCircle}  /><p>{errors.email.message}</p></div>}
                        <input className="inputForm" onChange={handleChange}
                            type="email"
                            name="email"
                            ref={register({
                                required: "Correo requerido."
                            })} /></label>
                    <br />
                    <label className="labelForm" id="password">Constraseña
                    {errorp && <div><FontAwesomeIcon className="fa-exclamationCircle"
                            icon={faExclamationCircle} /><p>{errorp}</p></div>}
                    {errors.password && <div><FontAwesomeIcon className="fa-exclamationCircle"
                            icon={faExclamationCircle} /><p>{errors.password.message}</p></div>}
                        <input className="inputForm" onChange={handleChange}
                            type="password"
                            name="password"
                            ref={register({
                                required: "contraseña requerida.",

                            })} /></label>
                    <br />
                    {/* <a class="forgot" href="#"> Aun no tienes cuenta? registrate</a> */}
                    <button className="btn" type="submit">Entrar</button>

                </form>
            </div>
        </div>
    )



}

export default Login;