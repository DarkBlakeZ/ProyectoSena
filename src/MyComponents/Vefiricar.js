import React, {useState} from 'react'
import {Redirect} from 'react-router-dom'

const Verificar = () => {

    const token = sessionStorage.getItem("token")

    let logged

    if(token == null){
        logged = false
    }else{
        logged = true
    }

    const [loggedIn] = useState({
        logged
    })

    return(
        <>
        {
            !loggedIn.logged ?
            <Redirect to="/" />
            :
            null
        }
        </>
    )

}

export default Verificar