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
const App = () => (

  <div className="main-container">
    <Router>
      <Navbar />
      <div className="containerBody">
      <Switch>

        <Route path="/home" >
            <Destacados />
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
            <Bar />
            
            <ProductsName />
        </Route>

        <Route exact path="/car">
          <Carrito />
        </Route>
        {/* <Route path="/search">  :plataform 
            <Products />
        </Route> */}

        <Route path="/search" >  {/*:name :plataform */}
            <Products />
        </Route>

        <Route path="/FormGpu" >  {/*:name :plataform */}
            <GpuFomr />
        </Route>

        <Route path="/FormCpu" >  {/*:name :plataform */}
            <CpuForm />
        </Route>

        <Redirect to="/home" />
      </Switch>
      </div>
      <Footer />
    </Router>
  </div>
);

export default App;
