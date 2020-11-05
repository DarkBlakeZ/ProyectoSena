import React from 'react';
import './firebase';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Complogin from './MyComponents/login'
import CompLogout from './MyComponents/logout'
import CompRegSalida from './MyComponents/PageRegistrarSalidas';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import CompPrincipal from './MyComponents/PrincipalPage';
import CompRegistrarIngreso from './MyComponents/PageRegIngreso';
import CompConsultas from './MyComponents/PageConsultas';
import ConsultarEntradas from './MyComponents/CompConsultarEntradas';


const App = () => {

  //Crear state de registrado

  return (
<>
    <ToastContainer />
    
      <Router>

        <Switch>
          <Route path="/" component={Complogin} exact/>
          <Route path="/home" component={CompPrincipal} exact/>
          <Route path="/registrarIngreso" component={CompRegistrarIngreso} exact/>
          <Route path='/registrarSalida' component={CompRegSalida} exact/>
          <Route path='/consultas' component={CompConsultas} exact/>
          <Route path='/consultas/entradas' component={ConsultarEntradas}/>
          <Route path='/logout' component={CompLogout} exact/>
          <Route>
            <h1>Page not Found 404</h1>
          </Route>
        </Switch>
      </Router>

</>
    
  );
};

export default App;
