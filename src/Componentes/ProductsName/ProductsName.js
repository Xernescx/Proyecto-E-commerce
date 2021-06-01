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
            window.location.href = "/car"
        })
            .catch((error) => {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
            });



    }


    useEffect(() => {

        if (window.localStorage.getItem("user") === null) {
            setLogstate(true);

        } else {
            setLogstate(false)   
        }

        db.collection("VideoGames")
            .where("name", "==", nameV.name).get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    let a = doc.data();

                    if (doc.data().gpuMax) {
                        doc.data().gpuMax.get().then((result) => { a.gpuMax = result.data() }
                        );
                    }

                    if (doc.data().gpuMin) {
                        doc.data().gpuMin.get().then((result) => { a.gpuMin = result.data() }
                        );
                    }

                    if (doc.data().cpuMax) {
                        doc.data().cpuMax.get().then((result) => { a.cpuMax = result.data() }
                        );
                    }
                    if (doc.data().cpuMin) {
                        doc.data().cpuMin.get().then((result) => { a.cpuMin = result.data() }
                        );
                    }


                    setproductoID(doc.id)
                    setInfo(a)
                });
            });

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
                                    {user.role === "ROLE_ADMIN" && (<Link className="buttonEdit " to={`/editGame/ ${productoID}`} ><div >
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
                                            <p onClick={putCar} className="buttonCar">
                                                Añadir al carrito<AddShoppingCartIcon />
                                            </p>

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
                        <h2>Requisitos</h2>
                        <br />
                        <h3>Requisitos Minimos</h3>
                        <ul>
                            <li>Sistema Operativo: {info.so}</li>
                            <li>Procesador: {info.cpuMin && info.cpuMin.name}</li>
                            <li>RAM: {info.ramMin}</li>
                            <li>GPU: {info.gpuMin && info.gpuMin.name}</li>
                            <li>Espacio: {info.discSpaces}</li>
                        </ul>
                        <br />
                        <h3>Requisitos Recomendados</h3>
                        <ul>
                            <li>Sistema Operativo: {info.so}</li>
                            <li>Procesador: {info.cpuMax && info.cpuMax.name}</li>
                            <li>RAM: {info.ramMax}</li>
                            <li>GPU: {info.gpuMax && info.gpuMax.name}</li>
                            <li>Espacio: {info.discSpaces}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )

}

