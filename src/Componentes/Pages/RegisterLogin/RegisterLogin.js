import{ 
    BrowserRouter as Router,
    Redirect,
    Route,
    Switch
} from 'react-router-dom';
import React from 'react';
import Register from '../../Register';
import Login from '../../Login';


const  LoginRegister = () => { 


    return (
        <div>
        <Route exact path="/formulario/register">
            <Register />
        </Route>
        <Route exact path="/formulario/login">
            <Login />
        </Route>

        </div>
    
        
       

    )
    
        


}

export default LoginRegister;