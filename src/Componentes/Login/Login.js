import React from 'react';
import { useState } from 'react';
import './Login.css';
import { auth } from '../FireBase/Firebase'
import firebase from 'firebase/app';
import { useForm } from "react-hook-form";
import TextField from '@material-ui/core/TextField';
import { ThemeProvider, makeStyles, createMuiTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
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

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#ac4caf',
        },
        secondary: {
            main: '#fff',

        }
    }
})

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
            await auth.signInWithEmailAndPassword(formState.email, formState.password).then((user) => {
                /*  console.log("logeado parece") */
                window.sessionStorage.setItem('user', JSON.stringify(formState));
                /* console.log(window.localStorage.getItem('user')); */
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
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
            >
                <div className="log-form">
                    <form className={classes.root} onSubmit={handleSubmit(onSubmit)} >


                        <ThemeProvider theme={theme}>
                            {error && <div className="alert"><p>{error}</p></div>}
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

                            
                            {errorp && <div className="alert"><p>{errorp}</p></div>}
                            {errors.password && <div className="alert"><p>{errors.password.message}</p></div>}
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
                                    name: "standard-password",
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
                        </ThemeProvider>
                    </form>
                </div>
            </Grid>
        </div>
    )



}

export default Login;