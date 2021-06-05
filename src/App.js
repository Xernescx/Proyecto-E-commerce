import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from 'react-router-dom';
import './App.css';
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
import Tabla from './Componentes/Tabla';
import TablaPedidos from './Componentes/TablaPedidos';


/* const isAuthenticated = () => {
  const token = window.sessionStorage.getItem("user")

  if (token !== undefined) {
    return true;
  } else {
    return false;
  }
} */

const App = () => (

  <div className="main-container">
    <Router>
      <Navbar />
      <div className="containerBody">
        <Switch>
          {/* Parte publica */}
          <Route path="/home" >
            <Destacados />
          </Route>

          <Route path="/Login">
            <Login />
          </Route>

          <Route path="/product/:name">
            <Bar />
            <ProductsName />
          </Route>

          <Route path="/search" >
            <Products />
          </Route>

          <Route path="/register">
            <Register />
          </Route>

          {/* Parte usuario */}
          <Route path="/profile">
            <Profile />
          </Route>

          <Route exact path="/car">
            <Carrito />
          </Route>

          <Route exact path="/pedidos">
            <TablaPedidos />
          </Route>


           {/* Parte administradro */}
          <Route path="/newGame">
            <NewGame />
          </Route>

          <Route path="/formGpu" >
            <GpuFomr />
          </Route>

          <Route path="/formCpu" >
            <CpuForm />
          </Route>

          <Route path="/editGame:id">
            <NewGame />
          </Route>

          <Route path="/table/:variable" >
            <Tabla />
          </Route>

          <Route path="/editGame/:id" >
            <NewGame />
          </Route>

          <Redirect to="/home" />
        </Switch>
      </div>
      <Footer />
    </Router>
  </div>
);

export default App;
