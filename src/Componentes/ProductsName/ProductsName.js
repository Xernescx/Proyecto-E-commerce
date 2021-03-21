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
        width: "90%",
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
    const [loading, setloading] = useState(true);
    const [logState, setLogstate] = useState(true);
    const classes = useStyles();
    let nameV = useParams()
    /* console.log(nameV) */

    useEffect(() => {
        if (window.localStorage.getItem("user") === null) {
            setLogstate(true);
            console.log("no hay log");

        } else {
            setLogstate(false)
            console.log("si hay log");
        }
    }, []); 

    const putCar = () => {
        db.collection("users").doc(firebase.auth().currentUser.uid).update({
            carrito: firebase.firestore.FieldValue.arrayUnion(info.name),

            
        }).then(() => {
            console.log("Document successfully updated!");
            window.location.href ="/car"
        })
        .catch((error) => {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });
        


    }


    useEffect(() => {

        db.collection("VideoGames")
            .where("name", "==", nameV.name).get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    setInfo(doc.data())
                    /* console.log(info) */
                });
            });

        setloading(false);
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
                                    <img key= "images" onClick={activateModal} src={images} alt={info.name + "image"} />
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
                            <img src={open.currentImg} className={classes.images} alt={info.name}/>
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
                            <li>Procesador: {info.requerimentsMin.cpuMin}</li>
                            <li>RAM: {info.requerimentsMin.ramMin}</li>
                            <li>GPU: {info.requerimentsMin.gpuMin}</li>
                            <li>Espacio: {info.discSpaces}</li>
                        </ul>
                        <br />
                        <h3>Requisitos Recomendados</h3>
                        <ul>
                            <li>Sistema Operativo: {info.so}</li>
                            <li>Procesador: {info.requerimentsMax.cpuMax}</li>
                            <li>RAM: {info.requerimentsMax.ramMax}</li>
                            <li>GPU: {info.requerimentsMax.gpuMax}</li>
                            <li>Espacio: {info.discSpaces}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )

}

