import React, { useState } from 'react';
import { db } from '../FireBase/Firebase'
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { useEffect } from 'react';
import firebase from 'firebase/app';


const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
});



const useStyles = makeStyles(() => ({
    root: {
        width: '100%',
        margin: "2%"
    },

}));

export default function CollapsibleTable() {
    const [rows, setRows] = useState([]);
    const classes = useStyles();




    useEffect(() => {


        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                const userID = db.collection('users').doc(user.uid);
                db.collection("pedidos").where("user", "==", userID)
                    .get().then((querySnapshot) => {
                        let row = [];
                        querySnapshot.forEach((doc) => {
                            let date = doc.data().date.toDate()
                            let newDate = (date.getDay() - 1) + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
                            row.push(createData(doc.id, newDate, doc.data().total))


                            function createData(id, fecha, total) {
                                return {
                                    id,
                                    fecha,
                                    total,
                                    history: doc.data().games,
                                };
                            }



                        })
                        setRows(row.reverse())
                    })

            } else {
                window.location = '/home'
            }
        });





    }, [])



    function Row(props) {
        const { row } = props;
        const [open, setOpen] = React.useState(false);
        const classes = useRowStyles();

        return (
            <React.Fragment>
                <TableRow className={classes.root}>
                    <TableCell>
                        <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                    </TableCell>
                    <TableCell component="th" scope="row">
                        {row.id}
                    </TableCell>
                    <TableCell align="right">{row.fecha}</TableCell>
                    <TableCell align="right">{row.total}€</TableCell>

                </TableRow>
                <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <Box margin={1}>
                                <Typography variant="h6" gutterBottom component="div">
                                    Juegos:
                                </Typography>
                                <Table size="small" aria-label="purchases">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Nombre</TableCell>
                                            <TableCell>Precio</TableCell>

                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {row.history.map((historyRow) => (
                                            <TableRow key={historyRow.name}>
                                                <TableCell component="th" scope="row">
                                                    {historyRow.name}
                                                </TableCell>
                                                <TableCell component="th" scope="row">
                                                    {historyRow.price}
                                                </TableCell>

                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </Box>
                        </Collapse>
                    </TableCell>
                </TableRow>
            </React.Fragment>
        );
    }

    Row.propTypes = {
        row: PropTypes.shape({
            fecha: PropTypes.number.isRequired,
            total: PropTypes.number.isRequired,
            history: PropTypes.arrayOf(
                PropTypes.shape({
                    precio: PropTypes.string.isRequired,
                    Juego: PropTypes.string.isRequired,
                }),
            ).isRequired,
            id: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,

        }).isRequired,
    };











    return (
        <div className={classes.root}>
            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell>ID</TableCell>
                            <TableCell align="right">Fecha</TableCell>
                            <TableCell align="right">Total</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <Row key={row.id} row={row} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}