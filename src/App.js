import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from 'react-router-dom';
import './App.css';
import Grid from '@material-ui/core/Grid';
import './Componentes/FireBase/Firebase';
import Navbar from './Componentes/Navbar';
import Footer from './Componentes/Footer';
import Destacados from './Componentes/Destacados';
import Login from './Componentes/Login'
import Register from './Componentes/Register'
import Profile from './Componentes/Profile';
import NewGame from './Componentes/NewGame'
import ProductsName from './Componentes/ProductsName'
import Products from './Componentes/Products'
import Carrito from './Componentes/Carrito'
import Bar from './Componentes/Bar';
import GpuFomr from './Componentes/GpuFomr/GpuFomr';
import CpuForm from './Componentes/CpuForm/CpuForm';
const App = () => (

  <div className="main-container">
    <Router>
      <Navbar />
      <Switch>
        <Route path="/home" >
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
          >
            <Destacados />
          </Grid>
        </Route>
        <Route path="/Login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/newGame">
          <NewGame />
        </Route>
        <Route path="/product/:name">
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
          >
            <Bar />
            <hr />
            <ProductsName />
          </Grid>
        </Route>

        <Route exact path="/car">
          <Carrito />
        </Route>
        {/* <Route path="/search">  :plataform 
            <Products />
        </Route> */}
        <Route path="/search" >  {/*:name :plataform */}
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
          >
            <Products />
          </Grid>
        </Route>
        <Route path="/FomrGpu" >  {/*:name :plataform */}
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
          >
            <GpuFomr />
          </Grid>
        </Route>
        <Route path="/FomrCpu" >  {/*:name :plataform */}
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
          >
            <CpuForm />
          </Grid>
        </Route>
        <Redirect to="/home" />
      </Switch>
      <Footer />
    </Router>
  </div>
);

export default App;
