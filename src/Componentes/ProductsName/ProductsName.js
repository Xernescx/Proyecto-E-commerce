import React from 'react';
import { useState, useEffect } from 'react';
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
        width: "60%",
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
    const [open, setOpen] = React.useState({open: false, currentImg: null});
    const [loading, setloading] = useState(true);


    const classes = useStyles();
    useEffect(() => {

        db.collection("VideoGames")
            .where("name", "==", "Hollow Knight").get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    setInfo(doc.data())
                    console.log(info)
                });

            });
        setloading(false);

    }, [])

    const activateModal = (tile) => {
        setOpen({open: true, currentImg: tile})
    }

    const closeModal = () => {
        setOpen({open: false, currentImg: null})
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
        <div className="text">
            <div className="contenido">
                <Grid
                    container
                    direction="row"
                    alignItems="flex-start"
                >
                    <div className="productImage" >
                        <img src={info.covePage} alt={info.name}></img>
                    </div>
                    <div className="imagesTitle">
                        <Grid
                            container
                            direction="row"
                            justify="space-between"
                            alignItems="center"
                        >
                            <h1>{info.name} </h1>
                            <IconButton >
                                <StarBorderIcon className={classes.title} />
                            </IconButton>
                        </Grid>
                        
                    </div>
                </Grid>
                <div>
                <iframe height="340" src={info.urlVideo} frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen></iframe>
                        <div className={classes.root}>
                            <GridList className={classes.gridList} id="barScroll" cellHeight={130} cols={3.5} >
                                {info.imageArray.map((tile) => (

                                    <GridListTile key={tile}>
                                        
                                            <img  onclick={activateModal} src={tile} alt={info.name + "image"} />
                                    
                                        <GridListTileBar
                                            classes={{
                                                root: classes.titleBar,
                                                title: classes.title,
                                            }}
                                            actionIcon={
                                                <IconButton onClick={() => activateModal(tile)}  aria-label={`star ${tile.title}`}>
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
                            <img src={open.currentImg}  className={classes.images} />
                        </Modal>
                        </div>
                    <h2>Descripcion</h2>
                    <p>{info.description}</p>
                </div>
            </div>
        </div>
    )

}

