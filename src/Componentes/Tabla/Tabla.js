import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, ThemeProvider, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import { db, auth } from '../FireBase/Firebase'
import { createMuiTheme, Grid } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import './Tabla.css'

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

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: "grey",
        color: theme.palette.common.white,

    },

    body: {
        fontSize: 14,
    },
}))(TableCell);

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        margin: "5%"
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
}));


export default function EnhancedTable() {
    const classes = useStyles();
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('calories');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [loading, setloading] = useState(true);
    const userJSON = JSON.parse(window.sessionStorage.getItem("user"))


    const [rows, setRows] = useState([]);

    const headCells = [
        { id: 'id', label: 'ID', minWidth: 170 },
        { id: 'email', label: 'Email', minWidth: 100 },
        { id: 'nombre', label: 'Nombre', minWidth: 170, },
        { id: 'apellido', label: 'Apellido', minWidth: 170, },
        { id: 'pais', label: 'Pais', minWidth: 170, },
        { id: 'role', label: 'Role', minWidth: 170, },
        { id: 'boton', label: 'Admin', minWidth: 170, },
    ];


    useEffect(() => {
        auth.onAuthStateChanged(function (user) {
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

        db.collection("users").get().then((querySnapshot) => {
            let row = [];
            querySnapshot.forEach((doc) => {
                console.log(doc);
                console.log(doc.data());
                row.push(createData(doc.id, doc.data().email, doc.data().name, doc.data().lastName, doc.data().country, doc.data().userType))
            });
            setRows(row)
            setloading(false);
            console.log(rows)
        });

        setloading(false)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function createData(id, email, nombre, apellido, pais, role, boton) {
        if (role === "ROLE_USER") {
            boton = <button onClick={() => setAdmin(id)} disabled={userJSON.email === email && (true)} className="buttonAdmin">Set Admin</button>
        } else {
            boton = <button onClick={() => endAdmin(id)} disabled={userJSON.email === email && (true)}  className="buttonAdmin2">End Admin</button>
        }

        return { id, email, nombre, apellido, pais, role, boton };
    }


    function descendingComparator(a, b, orderBy) {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }

    function getComparator(order, orderBy) {
        return order === 'desc'
            ? (a, b) => descendingComparator(a, b, orderBy)
            : (a, b) => -descendingComparator(a, b, orderBy);
    }

    function stableSort(array, comparator) {
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) return order;
            return a[1] - b[1];
        });
        return stabilizedThis.map((el) => el[0]);
    }


    function EnhancedTableHead(props) {
        const { classes, order, orderBy, onRequestSort } = props;
        const createSortHandler = (property) => (event) => {
            onRequestSort(event, property);
        };

        return (
            <TableHead>
                <TableRow>
                    {headCells.map((headCell) => (
                        <StyledTableCell
                            key={headCell.id}
                            align={headCell.numeric ? 'right' : 'left'}
                            padding={headCell.disablePadding ? 'none' : 'default'}
                            sortDirection={orderBy === headCell.id ? order : false}
                        >
                            <TableSortLabel
                                active={orderBy === headCell.id}
                                direction={orderBy === headCell.id ? order : 'asc'}
                                onClick={createSortHandler(headCell.id)}
                            >
                                {headCell.label}
                                {orderBy === headCell.id ? (
                                    <span className={classes.visuallyHidden}>
                                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                    </span>
                                ) : null}
                            </TableSortLabel>
                        </StyledTableCell>
                    ))}
                </TableRow>
            </TableHead>
        );
    }

    EnhancedTableHead.propTypes = {
        classes: PropTypes.object.isRequired,
        numSelected: PropTypes.number.isRequired,
        onRequestSort: PropTypes.func.isRequired,
        onSelectAllClick: PropTypes.func.isRequired,
        order: PropTypes.oneOf(['asc', 'desc']).isRequired,
        orderBy: PropTypes.string.isRequired,
        rowCount: PropTypes.number.isRequired,
    };











    const setAdmin = (id) => {

        db.collection("users").doc(id).update({
            userType: "ROLE_ADMIN"
        }).then(() => {
            console.log("Document successfully updated!");
            window.location.reload();
        })
            .catch((error) => {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
            });

    }

    const endAdmin = (id) => {

        db.collection("users").doc(id).update({
            userType: "ROLE_USER"
        }).then(() => {
            console.log("Document successfully updated!");
            window.location.reload();
        })
            .catch((error) => {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
            });


    }

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };




    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };





    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

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

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <TableContainer>
                    <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        aria-label="enhanced table"
                    >
                        <EnhancedTableHead
                            classes={classes}

                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                        />
                        <TableBody>
                            {stableSort(rows, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {


                                    return (
                                        <TableRow
                                            tabIndex={-1}
                                            key={row.name}
                                        >

                                            <TableCell >{row.id}</TableCell>
                                            <TableCell >{row.email}</TableCell>
                                            <TableCell >{row.nombre}</TableCell>
                                            <TableCell >{row.apellido}</TableCell>
                                            <TableCell >{row.pais}</TableCell>
                                            <TableCell >{row.role}</TableCell>
                                            <TableCell >{row.boton}</TableCell>
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow >
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
        </div>
    );
}
