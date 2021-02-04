import{ 
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from 'react-router-dom';
import './App.css';
import Header from './Componentes/Header';
import Navbar from './Componentes/Navbar';
import Footer from './Componentes/Footer';
import Bar from './Componentes/Bar';
import Formulario from './Componentes/Formulario';

const App = () => (
  <Router>
    <Navbar />
    
    <Formulario />
    
    
    
    <Footer />
  </Router>
);

export default App;
