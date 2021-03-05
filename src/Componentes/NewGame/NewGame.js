import React from 'react';
import { useState } from 'react';
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
            ramMin: '',
            gpuMin: '',
        },
        requerimentsMax: {
            cpuMax: '',
            ramMax: '',
            gpuMax: '',
        },
        so: '',
        discSpaces: '',
        covePage: '',
        imageTwo: '',
        imageThree: '',
        video: '',
        price: 0,
        promo: 0,
    }


    const [value, setvalue] = useState("");
    const [formState, setFormState] = useState(state);

    const handleChange = event => {
        setFormState({
            ...formState,
            [event.target.name]: event.target.value,
        })
    }

    const [Imagen, setImagen] = useState();

    //OBTENIENDO LA IMAGEN
    const changeImagen = e => {
        setImagen(e.target.files[0]);
        console.log(Imagen)
    }

    const onSubmit = async data => {
        registro();
    };


    const registro = React.useCallback(async () => {
        try {

            console.log(Imagen)
            let storageRef = firebase.storage();
            const newRef = storageRef.ref('images/' + formState.name.toLowerCase()).child(Imagen.name); // nombre del archivo

            await newRef.put(Imagen);

            let urlImagen = await newRef.getDownloadURL()
            console.log('la ul de la imagen es' + urlImagen);
            console.log(formState)

            db.collection("VideoGames").add({
                name: formState.name,
                nameSearch: formState.name.toLowerCase(),
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
                so: formState.so,
                discSpaces: formState.discSpaces,
                price: formState.price
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
                }); */


        } catch (error) {
            console.log(error)
        }
    }, [Imagen, formState])

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

                <label className="labelForm">Imagen de portadas
                    <input onChange={changeImagen}
                        type="file"
                        name="imageOne"
                    ></input>
                </label>
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
                    /></label>
                <br />
                <br />
                <button className="btn" type="submit" >registrarse</button>
            </form>
        </div>
    )



}

export default NewGame;