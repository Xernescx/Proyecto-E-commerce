import React from "react";
import { useState, useEffect } from 'react';
import "./GpuFomr.css";
import { db } from '../FireBase/Firebase'
import { useForm } from "react-hook-form";
import firebase from 'firebase/app';
import TextField from '@material-ui/core/TextField';
import { makeStyles} from '@material-ui/core/styles';
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
            db.collection("Gpu").add({

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

                        <TextField id="standard-multiline-static" label="Description" name="description" rows={4}
                            InputLabelProps={{ shrink: true }}
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
                        <TextField label="Ram" name="ram"
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
                            onChange={handleChange}
                            ref={register}
                        />
                        <br />
                        <TextField label="Punto Flotante" name="puntoFlotante"
                            onChange={handleChange}
                            ref={register}
                        />
                        <br />
                        <TextField label="Indice Textura" name="indiceTextura"
                            ref={register}
                            onChange={handleChange}
                        />

                        <br />

                        <TextField label="Velocidad Memoria Gpu" name="velocidadMemoriaGpu"
                            ref={register}
                            onChange={handleChange}
                        />
                        <br />

                        <TextField label="Unidades De Tonalidad" name="unidadesDeTonalidad"
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
                            ref={register}
                            onChange={handleChange}
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