import React from 'react';
import CompListEntradas from './MyComponents/CompEntradas';
import './firebase';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CompListRegistrados from './MyComponents/CompRegistrados';

const App = () => {

  //Crear state de registrado

  return (
    <React.Fragment>

    <h1>Administrador de entradas</h1>
    <div className="container">
      <ToastContainer/>
      <div className="row">
        <div className="one-half column">
          {
            <CompListEntradas
            />   
          }
        </div>
        <div className="one-half column">
        {  
            <CompListRegistrados
            />
        }
        </div>
        
      </div>
      
    </div>
    </React.Fragment>
  );
};

export default App;
