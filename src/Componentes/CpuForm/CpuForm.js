import React from "react";
import "./CpuForm.css";
import { useState } from 'react';
import { db } from '../FireBase/Firebase'
import { useForm } from "react-hook-form";
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


const CpuForm = props => {
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
            <TextField label="SemiConductores" name="semiConductores"
              step="0.01"
              onChange={handleChange}
              ref={register}
            />
            <br />

            <TextField label="Velocidad Reloc Procesador" name="VelocidadRprocesador"
              step="0.01"
              onChange={handleChange}
              ref={register}
            />
            <br />

            <TextField label="Potencia de diseño terminco(TDP)" name="tdp"
              onChange={handleChange}
              ref={register}
            />
            <br />

            <TextField label="Version PCI EXPRESS" name="pcie"
              onChange={handleChange}
              step="0.01"
              ref={register}
            />
            <br />

            <br />
            <TextField label="Directx" name="directx"
              onChange={handleChange}
              ref={register}
            />
            <br />

            <TextField label="Numero de Transistores" name="transistores"
              onChange={handleChange}
              step="0.01"
              ref={register}
            />
            <br />

            <TextField label="Version OPENGL" name="opengl"
              onChange={handleChange}
              step="0.01"
              ref={register}
            />

            <br />

            <br />
            <TextField label="Version OPENCL" name="opencl"
              onChange={handleChange}
              ref={register}
            />
            <br />






            <TextField label="Turbo Gpu" name="turboGPU"
              step="0.01"
              onChange={handleChange}
              ref={register}
            />
            <br />



            


            <TextField label="velocidad Gpu" name="velocidadGPU"
              step="0.01"
              onChange={handleChange}
              ref={register}
            />

            <br />
            <TextField label="Hilos de la Gpu" name="hilos"
              onChange={handleChange}
              ref={register}
            />

            <br />´
            
            <TextField label="Cache l2" name="cachel2"
              step="0.01"
              onChange={handleChange}
              ref={register}
            />
            <br />

            <TextField label="Velocidada Reloc procesador turbo" name="velocidadRProcesadorTurbo"
              step="0.01"
              onChange={handleChange}
              ref={register}
            />
            <br />

            <TextField label="Cache L3" name="cachel3"
              step="0.01"
              ref={register}
              onChange={handleChange}
            />
            <br />
            
            <TextField label="Cache l1" name="cachel1"
              step="0.01"
              ref={register}
              onChange={handleChange}
            />
            <br />

            <TextField label="Nucleo L2" name="nucleol2"
              step="0.01"
              ref={register}
              onChange={handleChange}
            />
            <br />


            <TextField label="Nucleo L3" name="nucleol3"
              step="0.01"
              ref={register}
              onChange={handleChange}
            />
            <br />

            <TextField label="multipicador de Reloc" name="multiplicadorR"
              step="0.01"
              ref={register}
              onChange={handleChange}
            />

            <br />

            

           

            <TextField label="Velocidad Memoria Ram" name="velocidadMemoriaRam"
              step="0.01"
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

            <TextField label="Canales de memoria" name="canalesMemoria"
              step="0.01"
              onChange={handleChange}
              ref={register}
            />
            <br />

            <TextField label="Tamaño de memoria maxima" name="tamañoDeMemoria"
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

            <button className="btn" type="submit" >registrarse</button>
          </form>
        </div>
      </Grid>
    </div>
  )
};

export default CpuForm;