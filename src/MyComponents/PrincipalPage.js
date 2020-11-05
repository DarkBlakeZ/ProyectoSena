import React from 'react'
import CompSideBar from './AddSideBar'
import CompGDUsuarios from './CompGestionDeUsuario'


const CompPrincipal = () =>{


    return(
        <>
        <CompSideBar/>
        <div className="content">
            <CompGDUsuarios/>
        </div>
        </>
    )
}

export default CompPrincipal