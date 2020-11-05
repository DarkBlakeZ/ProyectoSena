import React from 'react'
import {Redirect} from 'react-router-dom'

const CompLogout = () =>{

    sessionStorage.removeItem("token")

    return(
        <>
        {(
            
            alert('Deslogueado con exito'),
            <Redirect to='/' />
        )}
        </>
    )
}

export default CompLogout