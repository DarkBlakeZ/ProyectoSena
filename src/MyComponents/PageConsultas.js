import React from 'react'
import { Redirect } from 'react-router-dom'
import CompSideBar from './AddSideBar'
import ConsultarEntradas from './CompConsultarEntradas'
import ConsultarSalidas from './CompConsultarSalidas'



const CompConsultas = () =>{

    let rol = sessionStorage.getItem("rol")

    return(
        <>
        {
            rol==='Auxiliar'?
            (
            alert('El auxiliar solo puede registrar'),
            <Redirect to='/home' />
            )
            :
            null
        }
        <CompSideBar/>
        <div className="content">
            <ul class="nav nav-tabs " id="myTab" role="tablist">
            <li class="nav-item" role="presentation">
            <a class="nav-link active" id="entrada-tab" data-toggle="tab" href="#entrada" role="tab" aria-controls="entrada" aria-selected="true"><strong>Entradas</strong></a>
            </li>
            <li class="nav-item" role="presentation">
            <a class="nav-link" id="salida-tab" data-toggle="tab" href="#salida" role="tab" aria-controls="salida" aria-selected="false"><strong>Salidas</strong></a>
            </li>
            </ul>
            <div class="tab-content" id="myTabContent">
            <div class="tab-pane fade show active" id="entrada" role="tabpanel" aria-labelledby="entrada-tab">
                <br/>
                <ConsultarEntradas/>
            </div>
            <div class="tab-pane fade" id="salida" role="tabpanel" aria-labelledby="salida-tab">
                <br/>
                <ConsultarSalidas/>
            </div>
            </div>
            
        </div>
        </>
    )
}

export default CompConsultas