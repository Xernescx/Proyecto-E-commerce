import React from 'react';
import { useState, useEffect } from 'react';
import './NewGame.css';
import { db } from '../FireBase/Firebase'
import { useForm } from "react-hook-form";
import firebase from 'firebase/app';
import TextField from '@material-ui/core/TextField';
import { makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

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


const NewGame = () => {
    const classes = useStyles();
    
    const { register, /* errors, */ handleSubmit } = useForm({});

    const state = {
        name: '',
        nameSearch: '',
        description: '',
        developer: '',
        date: '',
        requerimentsMin: {
            cpuMin: '',
            cpuMin2: '',
            ramMin: '',
            gpuMin: '',
            gpuMin2: '',
        },
        requerimentsMax: {
            cpuMax: '',
            cpuMax2: '',
            ramMax: '',
            gpuMax: '',
            gpuMax2: '',

        },
        so: '',
        discSpaces: '',
        covePage: '',
        imageArray: {

        },
        video: '',
        plataform: '',
        genders: {

        },
        price: 0,
        promo: 0,
    }


    const [formState, setFormState] = useState(state);
    const [genders2, setGenders2] = useState([])
    const [genders, setGenders] = useState([])
    const handleChange = event => {
        setFormState({
            ...formState,
            [event.target.name]: event.target.value,
        })
    }

    const [imagens, setImagens] = useState([]);
    const [imagen, setImagen] = useState();

    //OBTENIENDO LA IMAGEN
    const changeImagen = e => {
        console.log(e.target.files[0])
        setImagen(e.target.files[0]);
        console.log(imagen)
    }

    const changeImagens = e => {
        console.log(e.target.files)
        setImagens(e.target.files);
        console.log(imagens)
    }
    const onSubmit = async data => {
        registro();
    };

    const onChangeFavorite = (event) => {
        console.log(event.target.checked, event.target.value);
        if (event.target.checked === true) {

            setGenders(genders => [...genders, event.target.value]);
            /* window.history.pushState(null, "", event.target.value); */
        } else {
            var i = genders.indexOf(event.target.value);

            if (i !== -1) {
                genders.splice(i, 1);
            }
        }
        console.log(genders)

    };

    useEffect(() => {
        db.collection(" genders")
            .orderBy("name", "asc").get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    setGenders2(genders2 => [...genders2, doc.data().name])
                    /* console.log(doc.data().name) */
                });
            })


    }, [])

    const registro = React.useCallback(async () => {
        try {
            let imageArray = [];
            let storageRef = firebase.storage();
            console.log(imagens)
            /* console.log(imagen) */
            for (let index = 0; index < imagens.length; index++) {
                const newRef = storageRef.ref('images/' + formState.name.toLowerCase()).child(imagens[index].name); // nombre del archivo
                await newRef.put(imagens[index]);
                let urlImagen = await newRef.getDownloadURL()
                console.log('la ul de la imagen es' + urlImagen);
                imageArray.push(urlImagen);

            }
            console.log(imageArray)

            const newRef = storageRef.ref('images/' + formState.name.toLowerCase()).child(imagen.name); // nombre del archivo
            await newRef.put(imagen);
            let urlImagen = await newRef.getDownloadURL()
            /*  console.log('la ul de la imagen es' + urlImagen); */
            console.log(formState)


            let nameS = formState.name.toLowerCase()
            let plataformURL2 = ""
            if (formState.plataform === "Steam") {
                plataformURL2 = "https://firebasestorage.googleapis.com/v0/b/proyectoreact-8ff3e.appspot.com/o/Plataformas%2Fsteam.png?alt=media&token=d3e640ec-8776-4dfe-a67e-48229edf8fb5"
            } else if (formState.plataform === "Epic store ") {
                plataformURL2 = "https://firebasestorage.googleapis.com/v0/b/proyectoreact-8ff3e.appspot.com/o/Plataformas%2Fepic.png?alt=media&token=4156f2d0-bf76-48bb-a45f-4111ed962b16"
            } else if (formState.plataform === "U-play") {
                plataformURL2 = "https://firebasestorage.googleapis.com/v0/b/proyectoreact-8ff3e.appspot.com/o/Plataformas%2Fuplay.png?alt=media&token=d05d6c7a-8e7c-4760-a63f-02c64bf40869"
            } else if (formState.plataform === "Battle") {
                plataformURL2 = "https://firebasestorage.googleapis.com/v0/b/proyectoreact-8ff3e.appspot.com/o/Plataformas%2Fbattle.png?alt=media&token=ae9c3015-c541-457b-9384-736b765bd78a"
            } else if (formState.plataform === "Origin") {
                plataformURL2 = "https://firebasestorage.googleapis.com/v0/b/proyectoreact-8ff3e.appspot.com/o/Plataformas%2Forigin.png?alt=media&token=2af92504-49a1-4b32-b435-017d65e33f43"
            } else {
                plataformURL2 = "https://firebasestorage.googleapis.com/v0/b/proyectoreact-8ff3e.appspot.com/o/Plataformas%2Fgog.png?alt=media&token=fccc6ccf-8fbe-4098-9961-9c9a1442936e"
            }

            db.collection("VideoGames").add({
                name: formState.name,
                nameSearch: nameS,
                description: formState.description,
                developer: formState.developer,
                date: formState.date,
                covePage: urlImagen,
                requerimentsMin: {
                    cpuMin: formState.cpuMin,
                    ramMin: formState.ramMin,
                    gpuMin: formState.gpuMin,
                },
                requerimentsMax: {
                    cpuMax: formState.cpuMax,
                    ramMax: formState.ramMax,
                    gpuMax: formState.gpuMax,
                },
                plataform: formState.plataform,
                plataformURL: plataformURL2,
                imageArray,
                genders,
                urlVideo: formState.urlVideo,
                so: formState.so,
                discSpaces: formState.discSpaces,
                price: formState.price,
                promo: "",
            });
            console.log(formState)
            /*  const res = await auth.createUserWithEmailAndPassword(formState.email, formState.password)
                await db.collection('videoGames').doc(res.user.uid).set({
                    email: res.user.email,
                    password: formState.password,
                    name: formState.name,
                    lastName: formState.lastName,
                    date: formState.date,
                    country: formState.country,
                    nickname: ''
                });  */


        } catch (error) {
            console.log(error)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [imagen, formState, imagens])

    return (
        <div className="formulario">
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
            >
                <div className="log-form">
                    <form className={classes.root} onSubmit={handleSubmit(onSubmit)} id="formulario" >

                        <TextField label="Nombre" name="name"
                            onChange={handleChange}
                            ref={register}
                        />

                        <br />
                        <TextField id="standard-multiline-static" label="Description" name="description" rows={4}
                            InputLabelProps={{ shrink: true }}
                            onChange={handleChange}
                            ref={register}
                        />
                        <br />
                        <TextField label="Developer" name="developer"
                            onChange={handleChange}
                            ref={register}
                        />

                        <br />

                        <label className="labelForm">imagen de portadas
                    <input className="btn" onChange={changeImagen}
                                type="file"
                                name="imageOne"
                            ></input>
                        </label>
                        <br />
                        <label className="labelForm">imagenasondoasugkbdas
                    <input onChange={changeImagens}
                                type="file"
                                name="imageOne"
                                multiple
                            ></input>
                        </label>
                        <br />

                        <TextField label="PLataforma" name="plataform"
                            onChange={handleChange}
                            ref={register}
                        />
                        <br />
                        <TextField label="Url video" name="urlVideo"
                            onChange={handleChange}
                            ref={register}
                        />
                        <br />
                        <TextField label="CpuMin" name="cpuMin"
                            onChange={handleChange}
                            ref={register}
                        />

                        <br />
                        <TextField label="CpuMax" name="cpuMax"
                            onChange={handleChange}
                            ref={register}
                        />

                        <br />
                        <TextField label="GpuMin" name="gpuMin"
                            onChange={handleChange}
                            ref={register}
                        />

                        <br />
                        <TextField label="GpuMax" name="gpuMax"
                            onChange={handleChange}
                            ref={register}
                        />

                        <br />
                        <TextField label="RamMax" name="ramMax"
                            onChange={handleChange}
                            ref={register}
                        />

                        <br />
                        <TextField label="RamMin" name="ramMin"
                            onChange={handleChange}
                            ref={register}
                        />
                        <br />
                        <TextField label="sistema operativo" name="so"
                            onChange={handleChange}
                            ref={register}
                        />
                        <br />
                        <TextField label="espacio" name="discSpaces"
                            ref={register}
                            onChange={handleChange}
                        />

                        <br />

                        <TextField label="Precio" name="price"
                            step="0.01"
                            ref={register}
                            onChange={handleChange}
                        />

                        <label className="labelForm" id="date">Fecha de salida
                    <input className="inputForm"
                                onChange={handleChange} type="date"
                                name="date"
                                ref={register({
                                })}
                            />
                        </label>
                        <br />
                        {genders2.map(gender => {
                            return (
                                <FormControlLabel
                                    control={<Checkbox key={gender + 1} value={gender} checked={state.checkedA} onChange={onChangeFavorite} name="gender" ref={register} />}
                                    label={gender}

                                />

                            )

                        })}
                        <br />
                        <button className="btn" type="submit" >registrarse</button>
                    </form>
                </div>
            </Grid>
        </div>
    )



}

export default NewGame;



