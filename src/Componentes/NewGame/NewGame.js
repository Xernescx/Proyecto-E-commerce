import React from 'react';
import { useState, useEffect } from 'react';
import './NewGame.css';
import { db } from '../FireBase/Firebase'
import { useForm } from "react-hook-form";
import firebase from 'firebase/app';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import { Typography } from '@material-ui/core';
import { parse } from 'date-fns';


const useStyles = makeStyles((theme) => ({
    root: {
        '& >*': {
            margin: theme.spacing(1),

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
    check: {
        color: "fff",
        '&$checked': {
            color: "fff",
        }
    }
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
        genders: {

        },
        video: '',
        plataform: '',
        price: 0,
        promo: 0,
    }


    const [formState, setFormState] = useState(state);
    const [genders2, setGenders2] = useState([])
    const [genders, setGenders] = useState([])
    const [gpu, setGpu] = useState([])
    const [cpu, setCpu] = useState([])
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

        db.collection("Gpu").get().then((querySnapshot) => {
            let data = [];
            querySnapshot.forEach((doc) => {

                data.push({
                    id: doc.id,
                    name: doc.data().name
                })
                setGpu(data)
            });
            /* console.log(gpu) */
        });

        db.collection("Cpu").get().then((querySnapshot) => {
            let data = [];
            querySnapshot.forEach((doc) => {

                data.push({
                    id: doc.id,
                    name: doc.data().name
                })
                setCpu(data)
            });
           /*  console.log(cpu) */
        });
        

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    // eslint-disable-next-line react-hooks/exhaustive-deps
    const registro = React.useCallback(async () => {
        console.log(genders)
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


            const newRef = storageRef.ref('images/' + formState.name.toLowerCase()).child(imagen.name); // nombre del archivo
            await newRef.put(imagen);
            let urlImagen = await newRef.getDownloadURL()
            /*  console.log('la ul de la imagen es' + urlImagen); */
            console.log(formState.genders)


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

                cpuMin: db.collection("Cpu").doc(formState.cpuMin),
                ramMin: parseFloat(formState.ramMin),
                gpuMin: db.collection("Gpu").doc(formState.gpuMin),


                cpuMax: db.collection("Cpu").doc(formState.cpuMax),
                ramMax: parseFloat(formState.ramMax),
                gpuMax: db.collection("Gpu").doc(formState.gpuMax),

                plataform: formState.plataform,
                plataformURL: plataformURL2,
                imageArray,
                genders,
                urlVideo: formState.urlVideo,
                so: formState.so,
                discSpaces: formState.discSpaces,
                price: formState.price,
                promo: "",
                stock:  parseFloat(formState.stock),
            });
            console.log(formState)



        } catch (error) {
            console.log(error)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    })

    return (
        <div className="formulario">

            <div className="game-form">
                <form className={classes.root} onSubmit={handleSubmit(onSubmit)} id="formulario" >
                    <div className="formulario2222">

                        <div className="spaceForm">
                            <h2 className="tituloForm">Info general</h2>

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


                            <label className="file" id="src-file1">imagen de portada
                                <input onChange={changeImagen}
                                    name="src-file1"
                                    type="file"
                                    // eslint-disable-next-line react/jsx-no-duplicate-props
                                    name="covePage"
                                ></input>
                            </label>
                            <br />
                            <br />
                            <label className="file">Imagenes
                                <input onChange={changeImagens}
                                    type="file"
                                    name="images"
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
                            <br />

                            <TextField label="Stock" name="stock"
                                
                                ref={register}
                                onChange={handleChange}
                            />
                            <br />


                            <label className="labelForm" id="date">Fecha de salida
                                <input className="inputForm"
                                    onChange={handleChange} type="date"
                                    name="date"
                                    ref={register({
                                    })}
                                />
                            </label>
                            <br />


                        </div>
                        <div className="spaceForm requisitos">

                            <div>
                                <h2 className="tituloForm"> Minimos</h2>

                                <InputLabel className={classes.root} id="demo-simple-select-label">Cpu Min</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    defaultValue=""
                                    onChange={handleChange}
                                    name="cpuMin"
                                >
                                    <option select value=""  ></option>
                                    {cpu.map(cpu => {
                                        return (
                                            <option key={cpu.name.toLowerCase()} value={cpu.id}>{cpu.name}</option>
                                        )
                                    })}
                                </Select>
                                <br />

                                <InputLabel className={classes.root} id="demo-simple-select-label">Gpu Min</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    defaultValue=""
                                    onChange={handleChange}
                                    name="gpuMin"
                                >
                                    <option value="" select ></option>
                                    {gpu.map(gpu => {
                                        return (
                                            <option key={gpu.name.toLowerCase() } value={gpu.id}>{gpu.name}</option>
                                        )
                                    })
                                    }
                                </Select>
                                <br />

                                <TextField label="RamMin" name="ramMin"
                                    onChange={handleChange}
                                    ref={register}
                                />
                                <br />

                            </div>
                            <div>
                                <h2 className="tituloForm"> Recomendados</h2>


                                <InputLabel className={classes.root} id="demo-simple-select-label">Cpu Max</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    defaultValue=""
                                    onChange={handleChange}
                                    name="cpuMax"
                                >
                                    <option value="" select ></option>
                                    {cpu.map(cpu => {
                                        return (
                                            <option key={cpu.name} value={cpu.id}>{cpu.name}</option>
                                        )
                                    })
                                    }
                                </Select>
                                <br />

                                <InputLabel className={classes.root} id="demo-simple-select-label">Gpi Max</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    defaultValue=""
                                    onChange={handleChange}
                                    name="gpuMax"
                                >
                                    <option value="" select ></option>
                                    {gpu.map(gpu => {
                                        return (
                                            <option key={gpu.name} value={gpu.id}>{gpu.name}</option>
                                        )
                                    })
                                    }
                                </ Select>
                                <br />

                                <TextField label="RamMax" name="ramMax"
                                    onChange={handleChange}
                                    ref={register}
                                />
                                <br />

                            </div>
                        </div>

                        <div className="spaceForm">
                            <div className="generosGames">
                                {genders2.map(gender => {
                                    return (
                                        <FormControlLabel
                                            control={<Checkbox style={{ color: "#ac4caf" }} key={gender + 1} value={gender} onChange={onChangeFavorite} name="gender" ref={register} />}
                                            label={<Typography style={{ color: 'rgb(184, 180, 180)' }}>{gender}</Typography>}

                                        />

                                    )

                                })}
                            </div>
                        </div>
                    </div>

                    <br />
                    <Grid
                        container

                        justify="center"
                        alignItems="center"
                    >
                        <button className="btn" type="submit" >registrarse</button>
                    </Grid>
                </form>
            </div>

        </div>
    )



}

export default NewGame;



