import React from 'react';
import { useState } from 'react';
import './Formulario.css';

const Formulario = () => {

    const [formState, setFormState] = useState({});

    const handleChange = event => {
        setFormState({
            ...formState,
            [event.target.name]: event.target.value,
        })
    }

    const handleSubmit = event => {
        event.preventDefault();
        if (formState.password !== formState.confirmPassword) {
            console.error('Passwords do not match');
            return;
        }
        console.log(formState);
    };
    return (
        
        <form onSubmit={handleSubmit}>
            <label>Nombre de Usuario: <input onChange={handleChange} type="text" name="userName" /></label>
            <br />
            <label>Constraseña: <input onChange={handleChange} type="password" name="password" /></label>
            <br />
            <label>Confirma Constraseña: <input onChange={handleChange} type="password" name="confirmPassword" /></label>
            <br />
            <label>Correo: <input onChange={handleChange} type="email" name="email" /></label>
            <br />
            <label>Pais: <input onChange={handleChange} type="text" name="country" /></label>
            <br />
            <label>Nombres: <input onChange={handleChange} type="text" name="name" /></label>
            <br />
            <label>Apellidos: <input onChange={handleChange} type="text" name="lastname" /></label>
            <br />
            <label>Fecha de nacimiento: <input onChange={handleChange} type="date" name="dateB" /></label>
            <br />
            <button type="submit">Submit</button>
        </form>
    )



}

export default Formulario;