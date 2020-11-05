import React from 'react'
import CompSideBar from './AddSideBar'
import CompListEntradas from './CompEntradas'


const CompRegistrarIngreso = () =>{


    return(
        <>
        <CompSideBar/>
        <div className="content">
            <CompListEntradas/>
        </div>
        </>
    )
}

export default CompRegistrarIngreso