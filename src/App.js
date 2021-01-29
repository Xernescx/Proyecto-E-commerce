import{ 
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from 'react-router-dom';
import './App.css';
import Header from './Componentes/Header'
import Navbar from './Componentes/Navbar';
import Footer from './Componentes/Footer';
import Home from './Componentes/Home';

const App = () => (
  <Router>
    <Navbar />
    <Home />
    <Footer />
  </Router>
);

export default App;
