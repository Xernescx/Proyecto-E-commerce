import React from "react";
import { useState, useEffect } from 'react';
import "./GpuFomr.css";
import { db } from '../FireBase/Firebase'
import { useForm } from "react-hook-form";
import firebase from 'firebase/app';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
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


const GpuFomr = props => {
  const classes = useStyles();

  const { register, /* errors, */ handleSubmit } = useForm({});



  const [formState, setFormState] = useState();
  const handleChange = event => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    })
  }


  const onSubmit = async data => {
    registro();
  };



  const registro = React.useCallback(async () => {
    try {
      console.log(formState)
      db.collection("Gpu").add({
        name: formState.name,
        marca: formState.marca,
        modelo: formState.modelo,
        ram: parseFloat(formState.ram),
        tdp: parseFloat(formState.tdp),
        transistores: parseFloat (formState.transistores),
        semiConductores: parseFloat (formState.semiConductores),
        pciExpress: parseFloat (formState.pciExpress),
        velocidadRProcesador: parseFloat (formState.velocidadRProcesador),
        indiceDePixeles: parseFloat (formState.indiceDePixeles),
        puntoFlotante: parseFloat (formState.puntoFlotante),
        indiceTextura: parseFloat (formState.indiceTextura),
        velocidadMemoriaGpu: parseFloat (formState.velocidadMemoriaGpu),
        unidadesDeTonalidad: parseFloat (formState.unidadesDeTonalidad),
        velocidadMemoriaEfectiva: parseFloat (formState.velocidadMemoriaEfectiva),
        memoriaMaximaAnchoBanda: parseFloat (formState.memoriaMaximaAnchoBanda),
        capacidadBus: parseFloat (formState.capacidadBus),
        memoriaGDD: parseFloat (formState.memoriaGDD),
        turboGpu: parseFloat (formState.turboGpu),
        tmus: parseFloat (formState.tmus),
        rops: parseFloat (formState.rops),






      });
      console.log(formState)



    } catch (error) {
      console.log(error)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formState])

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


            <TextField label="Marca" name="marca"
              onChange={handleChange}
              ref={register}
            />
            <br />

            <TextField label="Modelo" name="modelo"
              onChange={handleChange}
              ref={register}
            />
            <br />

            <TextField label="Tdp" name="tdp"
              onChange={handleChange}
              ref={register}
            />

            <br />




            <TextField label="Transistores" name="transistores"
              onChange={handleChange}
              ref={register}
            />

            <br />
            <TextField label="SemiConductores" name="semiConductores"
              onChange={handleChange}
              ref={register}
            />

            <br />
            <TextField label="Pci Express" name="pciExpress"
              onChange={handleChange}
              ref={register}
            />

            <br />
            <TextField label="Velocidad Reloc Procesador" name="velocidadRProcesador"
              onChange={handleChange}
              ref={register}
            />

            <br />
            <TextField label="Indice De Pixeles" name="indiceDePixeles"
              step="0.01"
              onChange={handleChange}
              ref={register}
            />
            <br />
            <TextField label="Punto Flotante" name="puntoFlotante"
              step="0.01"
              onChange={handleChange}
              ref={register}
            />
            <br />
            <TextField label="Velocidad Memoria Gpu" name="velocidadMemoriaGpu"
              ref={register}
              onChange={handleChange}
            />
            <br />

            <TextField label="Indice Textura" name="indiceTextura"
              step="0.01"
              ref={register}
              onChange={handleChange}
            />

            <br />



            <TextField label="Unidades De Tonalidad" name="unidadesDeTonalidad"
              ref={register}
              onChange={handleChange}
            />
            <br />

            <TextField label="unidades de mapeo" name="tmus"
              ref={register}
              onChange={handleChange}
            />
            <br />

            <TextField label="Turbo Gpu" name="turboGpu"
              ref={register}
              onChange={handleChange}
            />
            <br />

            <TextField label="Unidades Generacion Salida" name="rops"
              ref={register}
              onChange={handleChange}
            />
            <br />
            

            <TextField label="Velocidad Memoria Efectiva" name="velocidadMemoriaEfectiva"
              ref={register}
              onChange={handleChange}
            />
            <br />

            <TextField label="Memoria Maxima de Ancho Banda" name="memoriaMaximaAnchoBanda"
              step="0.01"
              ref={register}
              onChange={handleChange}
            />
            <br />

            <TextField label="Ram" name="ram"
              onChange={handleChange}
              ref={register}
            />
            <br />

            <TextField label="capacidad del Bus" name="capacidadBus"
              ref={register}
              onChange={handleChange}
            />
            <br />

            <TextField label="Memoria GDD" name="memoriaGDD"
              ref={register}
              onChange={handleChange}
            />
            <br />

            <button className="btn" type="submit" >registrarse</button>
          </form>
        </div>
      </Grid>
    </div>
  )
};

export default GpuFomr;