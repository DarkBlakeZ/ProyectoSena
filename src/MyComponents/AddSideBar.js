import React from 'react'
import Verificar from './Vefiricar'
import {Link} from 'react-router-dom'


const CompSideBar = () =>{

    const nombre = sessionStorage.getItem("nombre")
    const rol = sessionStorage.getItem("rol")


    return(
        <>
        <Verificar/>
        <input type="checkbox" id="check"/>

        <header>
            <label for="check">
                <i class="fas fa-bars" id="sidebar_btn"></i>
            </label>
            <div class="left_area">
                <h3>SENA <span>{rol}</span></h3>
            </div>
            <div class="right_area">
                <Link to="/logout" class="logout_btn">Logout</Link>
            </div>
        </header>
        <div class="mobile_nav">
            <div class="nav_bar">
                <img src="unnamed.jpg" class="mobile_profile_image" alt=""/>
                <i class="fa fa-bars nav_btn"></i>
            </div>
            <div class="mobile_nav_items">
            <Link to="/home"><i class="fas fa-desktop"></i><span>Gestion de Usuarios</span></Link>
            <Link to="/registrarIngreso"><i class="fas fa-door-open"></i><span>Registrar Ingreso</span></Link>
            <Link to="/registrarSalida"><i class="fas fa-sign-in-alt"></i><span>Registrar Salida</span></Link>
            <Link to="/consultas"><i class="fas fa-th"></i><span>Consultas</span></Link>
            </div>
        </div>
        <div class="sidebar">
        <div class="profile_info">
            <img src="unnamed.jpg" class="profile_image" alt=""/>
            <h4>{nombre}</h4>
        </div>
            <Link to="/home"><i class="fas fa-desktop"></i><span>Gestion de Usuarios</span></Link>
            <Link to="/registrarIngreso"><i class="fas fa-door-open"></i><span>Registrar Ingreso</span></Link>
            <Link to="/registrarSalida"><i class="fas fa-sign-in-alt"></i><span>Registrar Salida</span></Link>
            <Link to="/consultas"><i class="fas fa-th"></i><span>Consultas</span></Link>
        </div>
        </>
    )
}

export default CompSideBar