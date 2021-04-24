import React from 'react'
import CompSideBar from './AddSideBar'
import Verificar from './Vefiricar'
import CompFormSalida from './ComponentSalida'


const CompRegSalida = () => {


    return(
        <>
        
        <CompSideBar/>
        <div className="content">
            <CompFormSalida />
        </div>
            
        
        </>
    )
}

export default CompRegSalida