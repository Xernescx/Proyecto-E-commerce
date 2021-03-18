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
import Home from './Componentes/Pages/Home';
import Login from './Componentes/Login'
import Register from './Componentes/Register'
import Profile from './Componentes/Profile';
import NewGame from './Componentes/NewGame'
import ProductsName from './Componentes/ProductsName'
import Products from './Componentes/Products'


const App = () => (

  <div className="main-container">
    <Router>
      <Navbar />
      <Switch>
        <Route path="/home" >
          <Home />
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
            <ProductsName />
          </Grid>
        </Route>
        <Route path="/product/search/:name">
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
          >
            <Products />
          </Grid>
        </Route>
        <Redirect to="/home" />
      </Switch>
      <Footer />
    </Router>
  </div>
);

export default App;
