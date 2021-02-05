import{ 
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from 'react-router-dom';
import './App.css';
import Navbar from './Componentes/Navbar';
import Footer from './Componentes/Footer';
import Home from './Componentes/Pages/Home';
import Register from './Componentes/Pages/Register'

const App = () => (
  <Router>
    <Navbar />
    <Switch>  
      <Route path="/home" >
        <Home />
      </Route>
    <Route exact path="/registro">
        <Register />
    </Route>
    
    <Redirect to="/home"/>
    </Switch>
    <Footer />
  </Router>
);

export default App;
