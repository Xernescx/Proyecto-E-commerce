import React, { useState } from 'react';
import { ThemeProvider, makeStyles, createMuiTheme, withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { db } from '../FireBase/Firebase'
import { useEffect } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import './Tabla.css'
import { useParams } from 'react-router-dom';
const useStyles = makeStyles({
    root: {
        margin: "5%",
        width: '100%',
    },
    container: {
        maxHeight: 440,
    },

});

const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);

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


const Tabla = () => {
    const [loading, setloading] = useState(true);
    let tableType =useParams() 
    console.log(tableType.variable)
    let columns;
    const [rows, setRows] = useState([]);

 
    if (tableType.variable === "users") {
        columns = [
            { id: 'id', label: 'ID', minWidth: 170 },
            { id: 'email', label: 'Email', minWidth: 100 },
            { id: 'nombre', label: 'Nombre', minWidth: 170, },
            { id: 'apellido', label: 'Apellido', minWidth: 170, },
            { id: 'pais', label: 'Pais', minWidth: 170, },
            { id: 'role', label: 'Role', minWidth: 170, },
            { id: 'boton', label: 'Admin', minWidth: 170, },
        ];
    } else {
        columns = [
            { id: 'id', label: 'ID', minWidth: 170 },
            { id: 'precio', label: 'Precio', minWidth: 100 },
            { id: 'total', label: 'Total', minWidth: 170, },
            { id: 'Fecha', label: 'Fecha', minWidth: 170, },
            { id: 'usuario', label: 'Usuario', minWidth: 170, },
            { id: 'role', label: 'Role', minWidth: 170, },
        ];
    }


    const setAdmin = (id) => {

        db.collection("users").doc(id).update({
            userType: "ROLE_ADMIN"
        }).then(() => {
            console.log("Document successfully updated!");
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
        })
            .catch((error) => {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
            });


    }

    function createData(id, email, nombre, apellido, pais, role, boton) {
        if (role === "ROLE_USER") {
            boton = <button onClick={() =>setAdmin(id)} className="buttonAdmin">Set Admin</button>
        } else {
            boton = <button onClick={() =>endAdmin(id)} className="buttonAdmin2">End Admin</button>
        }

        return { id, email, nombre, apellido, pais, role, boton };
    }


    useEffect(() => {


        db.collection("users").get().then((querySnapshot) => {
            let row = [];
            querySnapshot.forEach((doc) => {
                console.log(doc);
                console.log(doc.data());
                row.push(createData(doc.id, doc.data().email, doc.data().name, doc.data().lastname, doc.data().country, doc.data().userType))
            });
            setRows(row)
            setloading(false);
            console.log(rows)
        });

        setloading(false)

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

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
        <Paper className={classes.root}>
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <StyledTableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </StyledTableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                    {columns.map((column) => {
                                        const value = row[column.id];
                                        return (
                                            <TableCell key={column.id} align={column.align}>
                                                {column.format && typeof value === 'number' ? column.format(value) : value}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
export default Tabla;