import React from 'react';
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './ProductsName.css';
import { db } from '../FireBase/Firebase'
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Modal from '@material-ui/core/Modal';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import firebase from 'firebase/app';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Box } from '@material-ui/core';



const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        flexWrap: 'nowrap',

        backgroundColor: "#212529",
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
    },
    images: {
        width: "70%",
    },
    title: {
        color: "#ac4caf",
    },
    titleBar: {
        background:
            'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
}));

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#ac4caf',
        },
        secondary: {
            main: '#ac4caf'
        }
    },

})

export default function SimpleContainer() {

    const [info, setInfo] = useState(null);
    const [id, setID] = useState(null);
    const [infoGPUmax, setInfoGPUmax] = useState(null);
    const [infoGPUmin, setInfoGPUmin] = useState(null);
    const [infoCPUmax, setInfoCPUmax] = useState(null);
    const [infoCPUmin, setInfoCPUmin] = useState(null);
    const [progreso, setProgreso] = useState(0);
    const [userState, setUserState] = useState({});
    const [gpuU, setGpuU] = useState({})
    const [cpuU, setCpuU] = useState({})

    const [stateGpuMax, setStateGpuMax] = useState("")
    const [stateGpuMin, setStateGpuMin] = useState("")
    const [stateCpuMax, setStateCpuMax] = useState("")
    const [stateRamMax, setStateRamMax] = useState("")
    const [stateRamMin, setStateRamMin] = useState("")
    const [stateCpuMin, setStateCpuMin] = useState("")


    const [open, setOpen] = React.useState({ open: false, currentImg: null });
    // eslint-disable-next-line no-unused-vars
    const [loading, setloading] = useState(true);
    const [logState, setLogstate] = useState(true);
    const classes = useStyles();
    const user = JSON.parse(window.sessionStorage.getItem("user"));
    const [productoID, setproductoID] = useState();
    let nameV = useParams()
    /* console.log(nameV) */


    const putCar = () => {
        db.collection("users").doc(firebase.auth().currentUser.uid).update({
            carrito: firebase.firestore.FieldValue.arrayUnion(info.name),


        }).then(() => {
            console.log("Document successfully updated!");
            window.location = '/car';

        })
            .catch((error) => {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
            });

    }

    const comparar = () => {
        if (userState.cpu === "" || userState.gpu === "" || userState.ram === "") {
            alert("No se encontro componenetes, ve a tu perfil para configurarlos ")
            return
        } else {
            if (info.ramMin <= userState.ram) {
                setStateRamMin("positive")
            } else {
                setStateRamMin("negatice")
            }
            setProgreso(5)
            if (info.ramMax <= userState.ram) {
                setStateRamMax("positive")
            } else {
                setStateRamMax("negative")
            }
            setProgreso(10)
            let cpuMinState = 0;
            if (infoCPUmin.semiConductores >= cpuU.semiConductores) {
                cpuMinState++;
            } else {
                cpuMinState--;
            }
            if (infoCPUmin.velocidadRProcesador <= cpuU.velocidadRProcesador) {
                cpuMinState++;
            } else {
                cpuMinState--;
            }
            if (infoCPUmin.tdp >= cpuU.tdp) {
                cpuMinState++;
            } else {
                cpuMinState--;
            }
            if (infoCPUmin.pcie <= cpuU.pcie) {
                cpuMinState++;
            } else {
                cpuMinState--;
            }
            if (infoCPUmin.directx <= cpuU.directx) {
                cpuMinState++;
            } else {
                cpuMinState--;
            }
            if (infoCPUmin.transistores <= cpuU.transistores) {
                cpuMinState++;
            } else {
                cpuMinState--;
            }
            if (infoCPUmin.opengl <= cpuU.opengl) {
                cpuMinState++;
            } else {
                cpuMinState--;
            }
            if (infoCPUmin.opencl <= cpuU.opencl) {
                cpuMinState++;
            } else {
                cpuMinState--;
            }
            if (infoCPUmin.turboGPU <= cpuU.turboGPU) {
                cpuMinState++;
            } else {
                cpuMinState--;
            }
            if (infoCPUmin.velocidadGPU <= cpuU.velocidadGPU) {
                cpuMinState++;
            } else {
                cpuMinState--;
            }
            if (infoCPUmin.hilos <= cpuU.hilos) {
                cpuMinState++;
            } else {
                cpuMinState--;
            }
            if (infoCPUmin.cachel2 <= cpuU.cachel2) {
                cpuMinState++;
            } else {
                cpuMinState--;
            }
            if (infoCPUmin.velocidadRProcesadorTurbo <= cpuU.velocidadRProcesadorTurbo) {
                cpuMinState++;
            } else {
                cpuMinState--;
            }
            if (infoCPUmin.cachel3 <= cpuU.cachel3) {
                cpuMinState++;
            } else {
                cpuMinState--;
            }
            if (infoCPUmin.cachel1 <= cpuU.cachel1) {
                cpuMinState++;
            } else {
                cpuMinState--;
            }
            if (infoCPUmin.nucleol2 <= cpuU.nucleol2) {
                cpuMinState++;
            } else {
                cpuMinState--;
            }
            if (infoCPUmin.nucleol3 <= cpuU.nucleol3) {
                cpuMinState++;
            } else {
                cpuMinState--;
            }
            if (infoCPUmin.multiplicadorR <= cpuU.multiplicadorR) {
                cpuMinState++;
            } else {
                cpuMinState--;
            }
            if (infoCPUmin.velocidadMemoriaRam <= cpuU.velocidadMemoriaRam) {
                cpuMinState++;
            } else {
                cpuMinState--;
            }
            if (infoCPUmin.canalesMemoria <= cpuU.canalesMemoria) {
                cpuMinState++;
            } else {
                cpuMinState--;
            }
            if (infoCPUmin.tamañoDeMemoria <= cpuU.tamañoDeMemoria) {
                cpuMinState++;
            } else {
                cpuMinState--;
            }
            if (infoCPUmin.trasferencias <= cpuU.trasferencias) {
                cpuMinState++;
            } else {
                cpuMinState--;
            }
            if (cpuMinState >= 0) {
                setStateCpuMin("positive")
            } else {
                setStateCpuMin("negative")
            }
            setProgreso(34)
            let cpuMaxState = 0;
            if (infoCPUmax.semiConductores >= cpuU.semiConductores) {
                cpuMaxState++;
            } else {
                cpuMaxState--;
            }
            if (infoCPUmax.velocidadRProcesador <= cpuU.velocidadRProcesador) {
                cpuMaxState++;
            } else {
                cpuMaxState--;
            }
            if (infoCPUmax.tdp >= cpuU.tdp) {
                cpuMaxState++;
            } else {
                cpuMaxState--;
            }
            if (infoCPUmax.pcie <= cpuU.pcie) {
                cpuMaxState++;
            } else {
                cpuMaxState--;
            }
            if (infoCPUmax.directx <= cpuU.directx) {
                cpuMaxState++;
            } else {
                cpuMaxState--;
            }
            if (infoCPUmax.transistores <= cpuU.transistores) {
                cpuMaxState++;
            } else {
                cpuMaxState--;
            }
            if (infoCPUmax.opengl <= cpuU.opengl) {
                cpuMaxState++;
            } else {
                cpuMaxState--;
            }
            if (infoCPUmax.opencl <= cpuU.opencl) {
                cpuMaxState++;
            } else {
                cpuMaxState--;
            }
            if (infoCPUmax.turboGPU <= cpuU.turboGPU) {
                cpuMaxState++;
            } else {
                cpuMaxState--;
            }
            if (infoCPUmax.velocidadGPU <= cpuU.velocidadGPU) {
                cpuMaxState++;
            } else {
                cpuMaxState--;
            }
            if (infoCPUmax.hilos <= cpuU.hilos) {
                cpuMaxState++;
            } else {
                cpuMaxState--;
            }
            if (infoCPUmax.cachel2 <= cpuU.cachel2) {
                cpuMaxState++;
            } else {
                cpuMaxState--;
            }
            if (infoCPUmax.velocidadRProcesadorTurbo <= cpuU.velocidadRProcesadorTurbo) {
                cpuMaxState++;
            } else {
                cpuMaxState--;
            }
            if (infoCPUmax.cachel3 <= cpuU.cachel3) {
                cpuMaxState++;
            } else {
                cpuMaxState--;
            }
            if (infoCPUmax.cachel1 <= cpuU.cachel1) {
                cpuMaxState++;
            } else {
                cpuMaxState--;
            }
            if (infoCPUmax.nucleol2 <= cpuU.nucleol2) {
                cpuMaxState++;
            } else {
                cpuMaxState--;
            }
            if (infoCPUmax.nucleol3 <= cpuU.nucleol3) {
                cpuMaxState++;
            } else {
                cpuMaxState--;
            }
            if (infoCPUmax.multiplicadorR <= cpuU.multiplicadorR) {
                cpuMaxState++;
            } else {
                cpuMaxState--;
            }
            if (infoCPUmax.velocidadMemoriaRam <= cpuU.velocidadMemoriaRam) {
                cpuMaxState++;
            } else {
                cpuMaxState--;
            }
            if (infoCPUmax.canalesMemoria <= cpuU.canalesMemoria) {
                cpuMaxState++;
            } else {
                cpuMaxState--;
            }
            if (infoCPUmax.tamañoDeMemoria <= cpuU.tamañoDeMemoria) {
                cpuMaxState++;
            } else {
                cpuMaxState--;
            }
            if (infoCPUmax.trasferencias <= cpuU.trasferencias) {
                cpuMaxState++;
            } else {
                cpuMaxState--;
            }
            if (cpuMaxState >= 0) {
                setStateCpuMax("positive")
            } else {
                setStateCpuMax("negative")
            }
            setProgreso(62)

            let gpuMaxState = 0;
            if (infoGPUmax.tdp <= gpuU.tdp) {
                gpuMaxState++;
            } else {
                gpuMaxState--;
            }
            if (infoGPUmax.transistores <= gpuU.transistores) {
                gpuMaxState++;
            } else {
                gpuMaxState--;
            }
            if (infoGPUmax.semiConductores >= gpuU.semiConductores) {
                gpuMaxState++;
            } else {
                gpuMaxState--;
            }
            if (infoGPUmax.velocidadRProcesador <= gpuU.velocidadRProcesador) {
                gpuMaxState++;
            } else {
                gpuMaxState--;
            }
            if (infoGPUmax.indiceDePixeles <= gpuU.indiceDePixeles) {
                gpuMaxState++;
            } else {
                gpuMaxState--;
            }
            if (infoGPUmax.puntoFlotante <= gpuU.puntoFlotante) {
                gpuMaxState++;
            } else {
                gpuMaxState--;
            }
            if (infoGPUmax.velocidadMemoriaGpu <= gpuU.velocidadMemoriaGpu) {
                gpuMaxState++;
            } else {
                gpuMaxState--;
            }
            if (infoGPUmax.indiceTextura <= gpuU.indiceTextura) {
                gpuMaxState++;
            } else {
                gpuMaxState--;
            }
            if (infoGPUmax.unidadesDeTonalidad <= gpuU.unidadesDeTonalidad) {
                gpuMaxState++;
            } else {
                gpuMaxState--;
            }
            if (infoGPUmax.tmus <= gpuU.tmus) {
                gpuMaxState++;
            } else {
                gpuMaxState--;
            }
            if (infoGPUmax.turboGpu <= gpuU.turboGpu) {
                gpuMaxState++;
            } else {
                gpuMaxState--;
            }
            if (infoGPUmax.rops <= gpuU.rops) {
                gpuMaxState++;
            } else {
                gpuMaxState--;
            }
            if (infoGPUmax.velocidadMemoriaEfectiva <= gpuU.velocidadMemoriaEfectiva) {
                gpuMaxState++;
            } else {
                gpuMaxState--;
            }
            if (infoGPUmax.memoriaMaximaAnchoBanda <= gpuU.memoriaMaximaAnchoBanda) {
                gpuMaxState++;
            } else {
                gpuMaxState--;
            }
            if (infoGPUmax.ram <= gpuU.ram) {
                gpuMaxState++;
            } else {
                gpuMaxState--;
            }
            if (infoGPUmax.capacidadBus <= gpuU.capacidadBus) {
                gpuMaxState++;
            } else {
                gpuMaxState--;
            }
            if (infoGPUmax.memoriaGDD <= gpuU.memoriaGDD) {
                gpuMaxState++;
            } else {
                gpuMaxState--;
            }
            if (gpuMaxState >= 0) {
                setStateGpuMax("positive")
            } else {
                setStateGpuMax("negative")
            }
            setProgreso(84)

            let gpuMinState = 0;
            if (infoGPUmin.tdp <= gpuU.tdp) {
                gpuMinState++;
            } else {
                gpuMinState--;
            }
            if (infoGPUmin.transistores <= gpuU.transistores) {
                gpuMinState++;
            } else {
                gpuMinState--;
            }
            if (infoGPUmin.semiConductores >= gpuU.semiConductores) {
                gpuMinState++;
            } else {
                gpuMinState--;
            }
            if (infoGPUmin.velocidadRProcesador <= gpuU.velocidadRProcesador) {
                gpuMinState++;
            } else {
                gpuMinState--;
            }
            if (infoGPUmin.indiceDePixeles <= gpuU.indiceDePixeles) {
                gpuMinState++;
            } else {
                gpuMinState--;
            }
            if (infoGPUmax.puntoFlotante <= gpuU.puntoFlotante) {
                gpuMaxState++;
            } else {
                gpuMaxState--;
            }
            if (infoGPUmin.velocidadMemoriaGpu <= gpuU.velocidadMemoriaGpu) {
                gpuMinState++;
            } else {
                gpuMinState--;
            }
            if (infoGPUmin.indiceTextura <= gpuU.indiceTextura) {
                gpuMinState++;
            } else {
                gpuMinState--;
            }
            if (infoGPUmin.unidadesDeTonalidad <= gpuU.unidadesDeTonalidad) {
                gpuMinState++;
            } else {
                gpuMinState--;
            }
            if (infoGPUmin.tmus <= gpuU.tmus) {
                gpuMinState++;
            } else {
                gpuMinState--;
            }
            if (infoGPUmin.turboGpu <= gpuU.turboGpu) {
                gpuMinState++;
            } else {
                gpuMinState--;
            }
            if (infoGPUmin.rops <= gpuU.rops) {
                gpuMinState++;
            } else {
                gpuMinState--;
            }
            if (infoGPUmin.velocidadMemoriaEfectiva <= gpuU.velocidadMemoriaEfectiva) {
                gpuMinState++;
            } else {
                gpuMinState--;
            }
            if (infoGPUmin.memoriaMaximaAnchoBanda <= gpuU.memoriaMaximaAnchoBanda) {
                gpuMinState++;
            } else {
                gpuMinState--;
            }
            if (infoGPUmin.ram <= gpuU.ram) {
                gpuMinState++;
            } else {
                gpuMinState--;
            }
            if (infoGPUmin.capacidadBus <= gpuU.capacidadBus) {
                gpuMinState++;
            } else {
                gpuMinState--;
            }
            if (infoGPUmin.memoriaGDD <= gpuU.memoriaGDD) {
                gpuMinState++;
            } else {
                gpuMinState--;
            }
            if (gpuMinState >= 0) {
                setStateGpuMin("positive")
            } else {
                setStateGpuMin("negative")
            }
            setProgreso(100)

            if (stateCpuMin === "positive" && stateGpuMin === "positive" && stateRamMin === "positive") {

            } else {

            }

            if (stateCpuMax === "positive" && stateGpuMax === "positive" && stateRamMax === "positive") {

            } else {

            }

        }
    }

    useEffect(() => {

        if (window.sessionStorage.getItem("user") === null) {
            setLogstate(true);

        } else {
            setLogstate(false)
        }

        db.collection("VideoGames")
            .where("name", "==", nameV.name).get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    let id = doc.id;
                    let a = doc.data();

                    buscarComponenetes();

                    async function buscarComponenetes() {

                        await doc.data().gpuMax.get().then((result) => { setInfoGPUmax(result.data()) }
                        );

                        await doc.data().gpuMin.get().then((result) => { setInfoGPUmin(result.data()) }
                        );

                        await doc.data().cpuMax.get().then((result) => { setInfoCPUmax(result.data()) }
                        );

                        await doc.data().cpuMin.get().then((result) => { setInfoCPUmin(result.data()) }
                        );
                    }



                    setproductoID(doc.id)
                    setInfo(a)
                    setID(id)
                });
            });

        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                db.collection("users").where("email", "==", user.email)
                    .onSnapshot((querySnapshot) => {
                        querySnapshot.forEach((doc) => {

                            if (doc.data().cpu !== "") {
                                db.collection("Cpu").doc(doc.data().cpu.id).get().then((doc) => {
                                    setCpuU(doc.data())
                                })
                            }

                            if (doc.data().gpu !== "") {
                                db.collection("Gpu").doc(doc.data().gpu.id).get().then((doc) => {
                                    setGpuU(doc.data())
                                })
                            }

                            setUserState({
                                cpu: cpuU,
                                gpu: gpuU,
                                ram: doc.data().ram,
                            })


                        });
                        console.log(userState)
                    });
            } else {

            }
        })


        setloading(false);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const activateModal = (images) => {
        setOpen({ open: true, currentImg: images })
    }

    const closeModal = () => {
        setOpen({ open: false, currentImg: null })
    }

    if (info === null) {
        return (
            <div className="loading">
                <ThemeProvider theme={theme}>
                    <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                    >
                        <div>
                            <CircularProgress theme={theme} />
                        </div>
                    </Grid>
                </ThemeProvider>
            </div>
        )
    }

    return (
        <div className="text" >
            <div className="contenido" >
                <Grid

                    container
                    direction="row"
                    alignItems="flex-start"
                >
                    <div className="productImage" >
                        <img src={info.covePage} alt={info.name}></img>
                    </div>
                    <div className="info">
                        <Grid
                            container
                            direction="row"
                            justify="space-between"
                            alignItems="center"
                        >
                            <h1>{info.name}</h1>
                            <IconButton >
                                <StarBorderIcon className={classes.title} />
                            </IconButton>
                        </Grid>
                        <div className="infoDevImg">
                            <Grid
                                container
                                direction="row"
                                alignItems="center"
                            >
                                <div className="infoImg">
                                    <p>{info.plataform}</p>
                                    <img className="imgPlataform" src={info.plataformURL} alt={info.plataform} />
                                </div>
                                <p className="infoDev" >Developer:    {info.developer}</p>
                            </Grid>
                        </div>
                        <div className="infoGenderDiv">
                            {info.genders.map(gender => {
                                return (

                                    <Link key={gender} className="enlacesLink" to={`/search?gender=${gender}`}><p className="infoGender">{gender}</p></Link>
                                )
                            }
                            )}
                        </div>
                        <div className="priceInfo2">
                            <div className="priceInfo">
                                <Grid
                                    container
                                    direction="row"
                                    justify="flex-end"
                                    alignItems="center"
                                >
                                    {info.promo && (<p className="promoInfo">{info.promo}%</p>)}
                                    <div className="pricesInfo">

                                        <Grid
                                            container
                                            direction="column"
                                        >

                                            {info.promo && (<spam >{info.price}€</spam>)}
                                            <p>{info.promo && (((info.price - (info.price * info.promo) / 100)).toFixed(2))}
                                                {!info.promo && (info.price)}€</p>
                                        </Grid>
                                    </div>
                                    {!logState && user.role === "ROLE_ADMIN" && (<Link className="buttonEdit " to={`/editGame/ ${productoID}`} ><div >
                                        Edit Game
                                    </div></Link>)}
                                    {logState && (
                                        <Link className="carritoImg" to="/login">
                                            <p className="buttonCar">
                                                Añadir al carrito<AddShoppingCartIcon />
                                            </p>

                                        </Link>
                                    )}
                                    {!logState && (
                                        <Link className="carritoImg" to="#">
                                            {info.stock > 0 && (
                                                <p onClick={putCar} className="buttonCar">
                                                    Añadir al carrito<AddShoppingCartIcon />
                                                </p>
                                            )}
                                            {info.stock === 0 && (
                                                <p disabled className="buttonCar">
                                                    No hay stock
                                                </p>
                                            )}


                                        </Link>


                                    )}

                                </Grid>
                            </div>
                        </div>
                    </div>
                </Grid>
                <div>
                    <iframe height="340" src={info.urlVideo} frameBorder="0" title={info.name}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen></iframe>
                    <div className={classes.root}>
                        <GridList className={classes.gridList} id="barScroll" cellHeight={130} cols={3.5} >
                            {info.imageArray.map((images) => (
                                <GridListTile key={images}>
                                    <img key={[5]} onClick={() => activateModal(images)} src={images} alt={info.name + "image"} />
                                    <GridListTileBar
                                        classes={{
                                            root: classes.titleBar,
                                            title: classes.title,
                                        }}
                                        actionIcon={
                                            <IconButton onClick={() => activateModal(images)} aria-label={`star ${images.title}`}>
                                                <ZoomInIcon className={classes.title} />
                                            </IconButton>
                                        }
                                    />
                                </GridListTile>
                            ))}
                        </GridList>
                        <Modal
                            className={classes.modal}
                            aria-labelledby="transition-modal-title"
                            aria-describedby="transition-modal-description"
                            open={open.open}
                            onClose={closeModal}
                        >
                            <img src={open.currentImg} className={classes.images} alt={info.name} />
                        </Modal>
                    </div>
                    <div className="textContent">
                        <h2>Descripcion</h2>
                        <br />
                        <p>{info.description}</p>
                        <br />

                        <div className="tableGames">

                            {userState && (
                                <Box display="flex" alignItems="center">
                                    <button onClick={comparar} className="btn" > Combarar </button>
                                    <Box width="100%" mr={1}>
                                        <LinearProgress variant="determinate" value={progreso} />
                                    </Box>
                                </Box>
                            )}

                            <table   >
                                <thead> Requisitos Minimo</thead>
                                <tbody>
                                    <tr>
                                        <th ></th>
                                        <th>Minimos</th>
                                        <th>Tu Pc</th>
                                    </tr>
                                    <tr>
                                        <td className="reqName">SO</td>
                                        <td> {info.so}</td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td className="reqName">Procesador</td>
                                        <td>{infoCPUmin && infoCPUmin.name}</td>
                                        <td className={stateCpuMin}>{userState && cpuU.name}</td>
                                    </tr>
                                    <tr>
                                        <td className="reqName">RAM</td>
                                        <td>{info.ramMin} GB</td>
                                        <td className={stateRamMin} >{userState && userState.ram} GB</td>
                                    </tr>
                                    <tr>
                                        <td className="reqName">GPU</td>
                                        <td>{infoGPUmin && infoGPUmin.name}</td>
                                        <td className={stateGpuMin}>{userState && gpuU.name}</td>
                                    </tr>
                                    <tr>
                                        <td className="reqName">Espacio</td>
                                        <td>{info.discSpaces}</td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <br />
                        <div className="tableGames">
                            <table >
                                <thead> Requisitos Recomendados</thead>
                                <tbody>
                                    <tr >
                                        <th></th>
                                        <th>Recomendados</th>
                                        <th>Tu Pc</th>
                                    </tr>
                                    <tr>
                                        <td className="reqName">SO</td>
                                        <td> {info.so}</td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td className="reqName">Procesador</td>
                                        <td>{infoCPUmax && infoCPUmax.name}</td>
                                        <td className={stateCpuMax}>{userState && cpuU.name}</td>
                                    </tr>
                                    <tr>
                                        <td className="reqName">RAM</td>
                                        <td > {info.ramMax} GB</td>
                                        <td className={stateRamMax} >{userState && userState.ram}  GB</td>
                                    </tr>
                                    <tr>
                                        <td className="reqName">GPU</td>
                                        <td>{infoGPUmax && infoGPUmax.name}</td>
                                        <td className={stateGpuMax}>{userState && gpuU.name}</td>
                                    </tr>
                                    <tr>
                                        <td className="reqName">Espacio</td>
                                        <td>{info.discSpaces}</td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )

}

