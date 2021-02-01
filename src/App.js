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


const App = () => (
  <Router>
    <Navbar />
    <Footer />
  </Router>
);

export default App;
