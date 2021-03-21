import React from 'react';
import { useState, useEffect } from 'react';
import './NewGame.css';
import { db } from '../FireBase/Firebase'
import { useForm } from "react-hook-form";
import firebase from 'firebase/app';


const NewGame = () => {

    const { register, errors, handleSubmit } = useForm({});

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


    const [value, setvalue] = useState("");
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
            }  else if (formState.plataform === "Epic store "){
                plataformURL2 = "https://firebasestorage.googleapis.com/v0/b/proyectoreact-8ff3e.appspot.com/o/Plataformas%2Fepic.png?alt=media&token=4156f2d0-bf76-48bb-a45f-4111ed962b16"
            }  else if (formState.plataform === "U-play"){
                plataformURL2 = "https://firebasestorage.googleapis.com/v0/b/proyectoreact-8ff3e.appspot.com/o/Plataformas%2Fuplay.png?alt=media&token=d05d6c7a-8e7c-4760-a63f-02c64bf40869"
            } else if (formState.plataform === "Battle"){
                plataformURL2 = "https://firebasestorage.googleapis.com/v0/b/proyectoreact-8ff3e.appspot.com/o/Plataformas%2Fbattle.png?alt=media&token=ae9c3015-c541-457b-9384-736b765bd78a"
            } else if (formState.plataform === "Origin"){
                plataformURL2 = "https://firebasestorage.googleapis.com/v0/b/proyectoreact-8ff3e.appspot.com/o/Plataformas%2Forigin.png?alt=media&token=2af92504-49a1-4b32-b435-017d65e33f43"
            }else{
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
    }, [imagen, formState, imagens])

    return (
        <div className="formulario">
            <form onSubmit={handleSubmit(onSubmit)} id="formulario" >
                <label className="labelForm" id="name">Nombre
                    <input className="inputForm"
                        onChange={handleChange}
                        type="text"
                        name="name" /></label>
                <br />

                <label className="labelForm" id="name">Description
                    <textarea
                        onChange={handleChange}

                        rows="4" cols="50"
                        ref={register}
                        name="description"
                    ></textarea> </label>

                <label className="labelForm" id="lastName">Developer
                    <input className="inputForm"
                        onChange={handleChange}
                        type="text"
                        name="developer" /></label>
                <br />

                <label className="labelForm">imagen de portadas
                    <input onChange={changeImagen}
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

                <label className="labelForm" id="lastName">PLataforma
                    <input className="inputForm"
                        onChange={handleChange}
                        type="text"
                        name="plataform" /></label>
                <br />
                <label className="labelForm" id="lastName">Url video
                    <input className="inputForm"
                        onChange={handleChange}
                        type="text"
                        name="urlVideo" /></label>
                <br />
                <label className="labelForm" id="lastName">CpuMin
                    <input className="inputForm"
                        onChange={handleChange}
                        type="text"
                        name="cpuMin" /></label>
                <br />

                <label className="labelForm" id="lastName">CpuMax
                    <input className="inputForm"
                        onChange={handleChange}
                        type="text"
                        name="cpuMax" /></label>
                <br />

                <label className="labelForm" id="lastName">GpuMin
                    <input className="inputForm"
                        onChange={handleChange}
                        type="text"
                        name="gpuMin" /></label>
                <br />

                <label className="labelForm" id="lastName">GpuMax
                    <input className="inputForm"
                        onChange={handleChange}
                        type="text"
                        name="gpuMax" /></label>
                <br />

                <label className="labelForm" id="lastName">RamMax
                    <input className="inputForm"
                        onChange={handleChange}
                        type="text"
                        name="ramMin" /></label>
                <br />

                <label className="labelForm" id="lastName">RamMin
                    <input className="inputForm"
                        onChange={handleChange}
                        type="text"
                        name="ramMax" /></label>
                <br />

                <label className="labelForm" id="lastName">sistema operativo
                    <input className="inputForm"
                        onChange={handleChange}
                        type="text"
                        name="so" /></label>
                <br />

                <label className="labelForm" id="lastName">espacio
                    <input className="inputForm"
                        onChange={handleChange}
                        type="text"
                        name="discSpaces" /></label>
                <br />


                <label className="labelForm" id="date">Precio
                    <input className="inputForm"
                        onChange={handleChange} type="number"
                        name="price"
                        step="0.01"
                        ref={register({
                        })}

                    /></label>
                <label className="labelForm" id="date">Fecha de nacimiento
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
                        <p><input key={gender + 1} onChange={onChangeFavorite} value={gender} type="checkbox" name="gender" ref={register} />{gender}</p>
                    )

                })}
                <br />
                <button className="btn" type="submit" >registrarse</button>
            </form>
        </div>
    )



}

export default NewGame;



