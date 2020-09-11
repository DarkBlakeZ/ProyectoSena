import React from 'react';
import CompListEntradas from './MyComponents/CompEntradas';
import './firebase';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <React.Fragment>

    <h1>Administrador de entradas</h1>
    <div className="container">
      <ToastContainer/>
      <div className="row">
        <div className="one-half column">
          {
            //Lado Izquierdo
          }
        </div>
        <div className="one-half column">
        <h2>Lado derecho</h2>
        {
            <CompListEntradas/>   

        }
        </div>
        
      </div>
      
    </div>
    </React.Fragment>
  );
}

export default App;
