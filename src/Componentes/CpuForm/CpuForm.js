import React, { useEffect } from "react";
import { useState } from 'react';
import { db } from '../FireBase/Firebase'
import { useForm } from "react-hook-form";
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Alert from "@material-ui/lab/Alert";
import firebase from 'firebase/app';
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '30ch',
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


const CpuForm = props => {
  const classes = useStyles();
  const [confirmet, setConfirmet] = useState();
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

  //Validacion de admin usuario 
  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        db.collection("users").where("email", "==", user.email)
          .onSnapshot((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              if (!doc.data().userType === "ROLE_ADMIN") {
                window.location = '/home';
              }
            })
          });

      } else {

        window.location = '/home';

      }
    })
  })

  const registro = React.useCallback(async () => {
    try {
      console.log(formState)
      db.collection("Cpu").add({
        name: formState.name,
        marca: formState.marca,
        modelo: formState.modelo,
        pcie: formState.pcie,
        transistores: formState.transistores,
        tdp: parseFloat(formState.tdp),
        semiConductores: parseFloat(formState.semiConductores),
        velocidadRProcesadorTurbo: parseFloat(formState.velocidadRProcesadorTurbo),
        directx: parseFloat(formState.directx),
        turboGPU: parseFloat(formState.turboGPU),
        opencl: parseFloat(formState.opencl),
        opengl: parseFloat(formState.opengl),
        velocidadGPU: parseFloat(formState.velocidadGPU),
        hilos: parseFloat(formState.hilos),
        cachel2: parseFloat(formState.cachel2),
        cachel3: parseFloat(formState.cachel3),
        cachel1: parseFloat(formState.cachel1),
        multiplicadorR: parseFloat(formState.multiplicadorR),
        nucleol3: parseFloat(formState.nucleol3),
        nucleol2: parseFloat(formState.nucleol2),
        velocidadMemoriaRam: parseFloat(formState.velocidadMemoriaRam),
        memoriaMaximaAnchoBanda: parseFloat(formState.memoriaMaximaAnchoBanda),
        canalesMemoria: parseFloat(formState.canalesMemoria),
        tamañoDeMemoria: parseFloat(formState.tamañoDeMemoria),
        trasferencias: parseFloat(formState.trasferencias),
        velocidadRprocesador: parseFloat(formState.VelocidadRprocesador),

      });
      console.log(formState)
      setConfirmet("Se Introducido los datos con exito")


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

            <br />
            <TextField label="Semiconductores" name="semiConductores"
              type="number"
              step="0.01"
              onChange={handleChange}
              ref={register}
            />
            <br />

            <TextField label="Velocidad Reloj Procesador" name="VelocidadRprocesador"
              type="number"
              step="0.01"
              onChange={handleChange}
              ref={register}
            />
            <br />

            <TextField label="Potencia de diseño térmico(TDP)" name="tdp"
              type="number"
              onChange={handleChange}
              ref={register}
            />
            <br />

            <TextField label="Versión PCI EXPRESS" name="pcie"
              type="number"
              onChange={handleChange}
              step="0.01"
              ref={register}
            />
            <br />

            <br />
            <TextField label="DirectX" name="directx"
              type="number"
              onChange={handleChange}
              ref={register}
            />
            <br />

            <TextField label="Número de Transistores" name="transistores"
              type="number"
              onChange={handleChange}
              step="0.01"
              ref={register}
            />
            <br />

            <TextField label="Versión OPENGL" name="opengl"
              type="number"
              onChange={handleChange}
              step="0.01"
              ref={register}
            />

            <br />

            <br />
            <TextField label="Versión OPENCL" name="opencl"
              type="number"
              step="0.01"
              onChange={handleChange}
              ref={register}
            />
            <br />






            <TextField label="Turbo Gpu" name="turboGPU"
              type="number"
              step="0.01"
              onChange={handleChange}
              ref={register}
            />
            <br />


            <TextField label="Velocidad Gpu" name="velocidadGPU"
              type="number"
              step="0.01"
              onChange={handleChange}
              ref={register}
            />

            <br />
            <TextField label="Hilos de la Gpu" name="hilos"
              type="number"
              onChange={handleChange}
              ref={register}
            />

            <br />´

            <TextField label="Cache l2" name="cachel2"
              type="number"
              step="0.01"
              onChange={handleChange}
              ref={register}
            />
            <br />

            <TextField label="Velocidad Reloj procesador turbo" name="velocidadRProcesadorTurbo"
              type="number"
              step="0.01"
              onChange={handleChange}
              ref={register}
            />
            <br />

            <TextField label="Cache L3" name="cachel3"
              type="number"
              step="0.01"
              ref={register}
              onChange={handleChange}
            />
            <br />

            <TextField label="Cache l1" name="cachel1"

              type="number"
              step="0.01"
              ref={register}
              onChange={handleChange}
            />
            <br />

            <TextField label="Núcleo L2" name="nucleol2"
              type="number"
              step="0.01"
              ref={register}
              onChange={handleChange}
            />
            <br />


            <TextField label="Núcleo L3" name="nucleol3"
              type="number"
              step="0.01"
              ref={register}
              onChange={handleChange}
            />
            <br />

            <TextField label="Multipicador de Reloj" name="multiplicadorR"
              type="number"
              step="0.01"
              ref={register}
              onChange={handleChange}
            />

            <br />





            <TextField label="Velocidad Memoria Ram" name="velocidadMemoriaRam"
              type="number"
              step="0.01"
              ref={register}
              onChange={handleChange}
            />
            <br />

            <TextField label="Memoria Máxima de Ancho Banda" name="memoriaMaximaAnchoBanda"
              type="number"
              step="0.01"
              ref={register}
              onChange={handleChange}
            />
            <br />

            <TextField label="Canales de memoria" name="canalesMemoria"
              type="number"
              step="0.01"
              onChange={handleChange}
              ref={register}
            />
            <br />

            <TextField label="Tamaño de memoria máxima" name="tamañoDeMemoria"
              type="number"
              step="0.01"
              ref={register}
              onChange={handleChange}
            />
            <br />

            <TextField label="Tasa de trasferencias Bus" name="tasaTrasferenciaBus"
              step="0.01"
              ref={register}
              onChange={handleChange}
            />
            <br />

            <Grid
              container

              justify="center"
              alignItems="center"
            >
              <button className="btn" type="submit" >Registar Cpu</button>
            </Grid>
          </form>
          {confirmet && <Alert className={classes.succes} variant="outlined" severity="success">{confirmet}</Alert>}
        </div>
      </Grid>
    </div>
  )
};

export default CpuForm;