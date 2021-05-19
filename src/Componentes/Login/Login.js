import React from 'react';
import { useState } from 'react';
import './Login.css';
import { auth } from '../FireBase/Firebase'
import firebase from 'firebase/app';
import { useForm } from "react-hook-form";
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '28ch',
        },
        "& .MuiOutlinedInput-input": {
            color: "white"
        },
        '& .MuiInputBase-root': {
            color: 'white',
        },
        "& .MuiInputLabel-root": {
            color: "rgb(184, 180, 180)"
        },
        "& .MuiInputLabel-root.Mui-focused": {
            color: "purple"
        },

        '& .MuiInput-underline:before': {
            borderBottomColor: 'rgb(184, 180, 180)',
        },

        '& .MuiInput-underline:after': {
            borderBottomColor: '#ac4caf',
        },



    },
}));



const Login = () => {
    const classes = useStyles();
    const initalStateValue = {
        email: '',
        password: '',
    }
    const [error, setError] = useState(null);
    const [errorp, setErrorp] = useState(null);

    const { register, errors, handleSubmit } = useForm({});
    
    const onSubmit = async data => {
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
            .then(() => {
                // Existing and future Auth states are now persisted in the current
                // session only. Closing the window would clear any existing state even
                // if a user forgets to sign out.
                // ...
                // New sign-in will be persisted with session persistence.
                login();
            })
            .catch((error) => {
                // Handle Errors here.
            });
        console.log(formState);
    };

    const [formState, setFormState] = useState(initalStateValue);
    const handleChange = event => {
        setFormState({
            ...formState,
            [event.target.name]: event.target.value,
        })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const login = React.useCallback(async () => {
        try {
            await auth.signInWithEmailAndPassword(formState.email, formState.password).then(user => {
                
                if(user.user.emailVerified){
                    /*  console.log("logeado parece") */
                window.sessionStorage.setItem('user', JSON.stringify(formState));
                /* console.log(window.localStorage.getItem('user')); */
                window.location = '/home'; 
                }
                else{
                    setError("Correo no verificado")
                    return error;
                }

            })
        } catch (error) {
            if(error.code === "auth/invalid-email-verified"){
                setError("Correo no verificado")
            }

            if (error.code === "auth/user-not-found") {
                setErrorp('Email no registrado');
                return;
            }
            if (error.code === "auth/wrong-password") {
                setErrorp('Contraseña o Email incorrecta');
                return;
            }
            /* var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode); */
        }
    })
    return (
        <div className="formulario">
            <div className="log-form ">
                <form className={classes.root} onSubmit={handleSubmit(onSubmit)} >



                    <TextField underline={false} className={classes.sortFormLabel} id="standard-required" label="email" name="email"
                        onChange={handleChange}
                        InputProps={{
                            className: classes.input
                        }}

                        ref={register({
                            name: 'email',
                            required: "Parametro requerido.",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Caracteres no validos."
                            },

                        })}

                    />



                    <TextField
                        onChange={handleChange}
                        id="standard-password-input"
                        label="password"
                        type="password"
                        name="password"
                        autoComplete="current-password"
                        InputProps={{
                            className: classes.multilineColor
                        }}
                        ref={register({

                            required: "Parametro requerido.",

                        })}
                    />

                    {/* <a class="forgot" href="#"> Aun no tienes cuenta? registrate</a> */}
                    <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                    >
                        <button className="btn" type="submit">Entrar</button>
                    </Grid>

                    {errorp && <div className="alert"><p>{errorp}</p></div>}
                    {errors.password && <div className="alert"><p>{errors.password.message}</p></div>}
                    {error && <div className="alert"><p>{error}</p></div>}

                </form>
            </div>

        </div>
    )



}

export default Login;