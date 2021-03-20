import React from 'react';
import { useState, useEffect, } from 'react';
import { Link, useParams } from 'react-router-dom'
import { db } from '../FireBase/Firebase'
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import { ThemeProvider, makeStyles, createMuiTheme } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import clsx from 'clsx';
import Checkbox from '@material-ui/core/Checkbox';
import './Products.css'
const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            marginTop: theme.spacing(2),
            color: "#ffff",
        },
    },
    fab: {
        margin: theme.spacing(2),
    },
    absolute: {
        position: 'fixed',
        background: "#ac4caf",
        bottom: "5%",
        left: "5%"


    },
    list: {
        width: "auto",
        background: "#212529",
    },
    fullList: {
        width: 'auto',

    },

    title: {
        textDecoration: "none",
        color: "rgba(255, 255, 255, 0.7)",
        textAlign: "center",
        fontSize: "50px"

    },
    diriver: {
        background: "#fff",
    },
    ul: {
        "& .MuiPaginationItem-root": {
            marginTop: theme.spacing(2),
            color: "rgba(255, 255, 255, 0.7)"
        }
    }

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

    const classes = useStyles();
    const [checked, setChecked] = useState(true);

    const [links, setLink] = useState([]);
    const [loading, setloading] = useState(true);
    const [page, setPage] = React.useState(1)
    const [genders, setGenders] = useState([])
    const [plataform, setPlataform] = useState([]);
    const [state, setState] = useState({

        left: false,

    });
    const [data, setdata] = React.useState({
        total: 0,
        paginas: 0,
        porPagina: 18,
    });



    let nameV = useParams()
    console.log(nameV)
    let search;
    let search2;
    const handleChange = (event, value) => {

        /* console.log(value) */
        let ref;
        let ref2;
        ////////////////////////////////////////
        if (nameV.name === undefined) {
            search = ""
            ref2 = db.collection("VideoGames").where("nameSearch", ">=", search)
        } else {
            search = nameV.name;
            ref2 = db.collection("VideoGames").where("nameSearch", ">=", search)
        }
        /////////////////////////////////////////
        if (nameV.plataform === undefined) {
            search2 = ""


        } else {
            search2 = nameV.plataform;
            ref2 = db.collection("VideoGames").where("nameSearch", ">=", search).where("plataform", "==", search2)

        }
        if (value === page) {
            return
        }

        else if (value < page) {
            ref = ref2.limit(data.porPagina).orderBy("nameSearch").endAt(links[0].nameSearch)
        } else {
            ref = ref2.limit(data.porPagina).orderBy("nameSearch").startAfter(links[links.length - 1].nameSearch)
        }
        setloading(true)
        setPage(value)
        ref.get().then((querySnapshot) => {
            let docs = []
            querySnapshot.forEach((doc) => {
                /* console.log(doc.data()) */
                docs.push({
                    ...doc.data(), date: doc.date,
                    requerimentsMax: doc.requerimentsMax,
                    requerimentsMin: doc.requerimentsMin,
                    developer: doc.developer,
                    discSpaces: doc.discSpaces,
                    description: doc.description,
                    so: doc.so
                })
            });

            setLink(docs)
            setloading(false);


        });

    };

    useEffect(() => {
        let ref;
        ////////////////////////////////////////
        if (nameV.name === undefined) {
            search = "";
            ref = db.collection("VideoGames").where("nameSearch", ">=", search)
        } else {
            search = nameV.name;
            ref = db.collection("VideoGames").where("nameSearch", ">=", search)
        }
        /////////////////////////////////////////
        if (nameV.plataform === undefined) {
            search2 = "";


        } else {
            search2 = nameV.plataform;
            ref = db.collection("VideoGames").where("nameSearch", ">=", search).where("plataform", "==", search2)

        }
        /////////////////////////////////////////
        /* console.log(nameV) */
        ref.get().then(res => {
            data.total = res.size
            /* console.log(res.size) */
            data.paginas = Math.ceil((data.total / data.porPagina))
        })
        ref.orderBy("nameSearch", "asc").limit(data.porPagina).get().then((querySnapshot) => {
            let docs = []

            querySnapshot.forEach((doc) => {

                /*  console.log(querySnapshot)
                    console.log(doc.data()) */
                docs.push({
                    ...doc.data(), date: doc.date,
                    requerimentsMax: doc.requerimentsMax,
                    requerimentsMin: doc.requerimentsMin,
                    developer: doc.developer,
                    discSpaces: doc.discSpaces,
                    description: doc.description,
                    so: doc.so
                })
            });

            setLink(docs)
            setPage(1)
            setloading(false);
            console.log(docs)


            db.collection(" genders")
                .orderBy("name", "asc").get().then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        setGenders(genders => [...genders, doc.data().name])
                        /* console.log(doc.data().name) */
                    });
                })


        });

    }, [nameV])



    if (loading === true) {
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

    const handleChange2 = (event) => {
        setChecked(event.target.checked);
    };

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <div
            className={clsx(classes.list, {
                [classes.fullList]: anchor === 'top' || anchor === 'bottom',
            })}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                <p><Checkbox onChange={handleChange2} />Steam</p>
                <p><Checkbox onChange={handleChange2} />EpicGames</p>
                <p><Checkbox onChange={handleChange2} />Origin</p>
                <p><Checkbox onChange={handleChange2} />U-play</p>
                <p><Checkbox onChange={handleChange2} />GoG</p>
                <p><Checkbox onChange={handleChange2} />Battle.net</p>


            </List>
            <Divider className={classes.diriver} />
            <List>
                {genders.map(gender => {
                    return (
                        <p><Checkbox key={gender} onChange={handleChange2} />{gender}</p>
                    )

                })}
            </List>
        </div>
    );
    return (
        <React.Fragment>
            <CssBaseline />
            <div className="addIcon">
                {['left'].map((anchor) => (
                    <React.Fragment key={anchor}>

                        <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
                            {list(anchor)}
                        </Drawer>
                        <Tooltip onClick={toggleDrawer(anchor, true)} className={classes.absolute} style={{ zIndex: 3 }} title="Add" aria-label="add">
                            <Fab color="primary" aria-label="add">
                                <AddIcon />
                            </Fab>
                        </Tooltip>
                    </React.Fragment>
                ))}
            </div>
            <div className="gendersBar">

                <p><Checkbox value="Steam" onChange={handleChange2} />Steam</p>
                <p><Checkbox value="Epic store" onChange={handleChange2} />EpicGames</p>
                <p><Checkbox value="Origin" onChange={handleChange2} />Origin</p>
                <p><Checkbox value="U-play" onChange={handleChange2} />U-play</p>
                <p><Checkbox value="GoG" onChange={handleChange2} />GoG</p>
                <p><Checkbox value="Battle" onChange={handleChange2} />Battle.net</p>

                <Divider className={classes.diriver} />

                {genders.map(gender => {
                    return (
                        <p><Checkbox key={gender} value={gender} onChange={handleChange2} />{gender}</p>
                    )

                })}

            </div>

            <div className="destacadosContainer">
                {links.length > 0 ? (links.map(link => {
                    return (
                        <div className="gamesD" key={link.name}>
                            <Link className="cover" to={`/product/${link.name}`}>
                                <Grid
                                    container
                                    direction="column"
                                    justify="center"
                                    alignItems="center"
                                >
                                    <div>
                                        <img className="bange" src={link.plataformURL} alt={link.plataform} />
                                        <img className="covePage" alt={link.name} title={link.name} src={link.covePage} />
                                        <div className="priceData">
                                            {link.promo && (<span className="promo">{link.promo}%</span>)}
                                            {link.promo && (<span className="price">{((link.price - (link.price * link.promo) / 100)).toFixed(2)}€</span>)}
                                            {!link.promo && (<span className="price">{link.price}€</span>)}

                                        </div>
                                    </div>
                                    <div className="nameGame ">{link.name}</div>
                                </Grid>
                            </Link>
                        </div>
                    )
                })) : (
                    <p className="Error404">No se han econtrado resultados</p>
                )}
                <ThemeProvider theme={theme}>
                    <div className={classes.root}>
                        <Grid
                            container
                            justify="center"
                            alignItems="center"
                        >
                            <Pagination   classes={{ ul: classes.ul }} count={data.paginas} page={page} variant="outlined" color="primary" onChange={handleChange} />
                        </Grid>

                    </div>
                </ThemeProvider>
            </div>

        </React.Fragment>
    );
}