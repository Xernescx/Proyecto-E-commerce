import React from 'react';
import { useState } from 'react';
import { auth, db } from '../FireBase/Firebase'
import firebase from 'firebase/app';
import { useForm } from "react-hook-form";
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Alert from '@material-ui/lab/Alert';
import Modal from '@material-ui/core/Modal';

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
    alert: {
        width: '100%',
        "& .MuiAlert-message": { color: 'red', },
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
}));




const Login = () => {
    const classes = useStyles();
    const initalStateValue = {
        email: '',
        password: '',
    }
    const [error, setError] = useState(null);
    const [send, setSend] = useState();
    const { register, errors, handleSubmit } = useForm({});
    const [open, setOpen] = React.useState({ open: false });
    const onSubmit = async data => {//Metodo de auth de firestore
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

    };

    const [formState, setFormState] = useState(initalStateValue);
    const handleChange = event => {
        setFormState({
            ...formState,
            [event.target.name]: event.target.value,
        })
    }

    const activateModal = () => {
        setOpen({ open: true })
    }

    const closeModal = () => {
        setOpen({ open: false })
    }

    //mandar un correo de recuperacion de contraseña
    const forgotPassword = (email) => {
        let auth = firebase.auth();
        let emailAddress = email;

        auth.sendPasswordResetEmail(emailAddress).then(function () {
           setSend("Se ha enviado un correo a tu cuenta")
        }).catch(function (error) {
            // An error happened.
        });
    }

    //logeo en la aplicaion
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const login = React.useCallback(async () => { //metodo de login 
        try {
            await auth.signInWithEmailAndPassword(formState.email, formState.password).then(user => {

                if (user.user.emailVerified) {
                    db.collection("users").where("email", "==", formState.email).get().then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            window.sessionStorage.setItem('user', JSON.stringify({
                                email: doc.data().email,
                                role: doc.data().userType
                            }));
                        });
                    })

                    setTimeout(function () {
                        window.location = '/home';
                    }, 1000)

                }
                else {
                    setError("Correo no verificado, revise su correo")
                    return error;
                }

            })
        } catch (error) {

            if (error.code === "auth/user-not-found") {
                setError('Email no registrado');
                return;
            }
            if (error.code === "auth/wrong-password") {
                setError('Contraseña o Email incorrecta');
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
                            name: "password",
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
                    <p className="forgot" onClick={activateModal}>Se me olvido mi contraseña</p>
                    <Modal
                        className={classes.modal}
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        open={open.open}
                        onClose={closeModal}
                    >
                        <div className={classes.root + " modalStyle"}>

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

                            <button className="btn" onClick={() => forgotPassword(formState.email)}>Enviar correo</button>
                            {send && <Alert severity="success">{send}</Alert>}
                        </div>
                    </Modal>

                    <div className={classes.alert}>
                        {errors.password && <Alert severity="error">{errors.password.message}</Alert>}
                        {error && <Alert severity="error">{error}</Alert>}
                    </div>



                </form>
            </div>

        </div>
    )



}

export default Login;