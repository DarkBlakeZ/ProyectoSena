import React, { useState, useEffect } from 'react';
import {db} from '../firebase';
import { toast } from 'react-toastify';
import { ownerWindow } from '@material-ui/core';

const CompGDUsuarios = (props) => {

    let rol = sessionStorage.getItem("rol")

    const [registrados, setregistrados] = useState([]);
    const [IdActualR, setIdActualR] = useState("");
    const [MostrarList, UpdMostrarList] = useState({
        showMe:false
    })    

    const docni = props.IdNoEncontrado

    //Crear state de registrado

    const [registrado, actualizar_registrado] = useState({
        tipopersonaR:'',
        documentoR:docni,
        documentoBR:'',
        nombreR:'',
        fichaR:'',
        areaR:''
    });

    //State de error

    const [error, actualizarError] = useState({
        verificar: false,
        msj:null
    })
    
    //Funcion para leer todo lo que escribe el usuario

    const actualizarState = e => {
        actualizar_registrado({
            ...registrado,
            [e.target.name] : e.target.value

        })
    }

    //Extraer los valores
    
    const {tipopersonaR,documentoR,documentoBR,nombreR,fichaR,areaR} = registrado;

    //Estado submit del formulario

    const handleSubmit = async() =>{
        const doc = await db.collection('registrados').doc(documentoR).get();
        
        if(IdActualR===''){ 
        if(doc.data()!==undefined){
        if(documentoR === doc.data().documentoR){
            actualizarError({verificar:true, msj:'El Documento ya existe'})
            return;
        }
    }
        }
        if(documentoR.trim() === '' || nombreR.trim()==='' || tipopersonaR==='' || areaR.trim()===''){
            actualizarError({verificar:true, msj:'HAY CAMPOS OBLIGATORIOS(*)'})
            return;
        }
        else{
        addOrEditFormReg(documentoR,registrado);
        actualizar_registrado({
            tipopersonaR:'',
            documentoR:'', 
            nombreR:'',
            fichaR:'',
            areaR:''
        });
        setIdActualR("")
        actualizarError({verificar:false, msj:null})
    }
    }

    

    //Campos obligatorios



    //-----

    const getregistradoById = async(id) => {
        
        const doc = await db.collection('registrados').doc(id).get();
        actualizar_registrado(doc.data());
            }

    

    

    

    const getregistradosByDocu = (docuBE) => {
        db.collection('registrados').where("documentoR","==",docuBE).onSnapshot((querySnapshot)=>{
            const docs = [];
            querySnapshot.forEach((doc) => {
                docs.push({...doc.data(), id:doc.id});
            })
            setregistrados(docs)
        });  
        UpdMostrarList({showMe:true})
    }

    
    
    const addOrEditFormReg = async (nomdoc,ObjectR) =>{

        try {

        
            if(IdActualR===''){
        
                await db.collection('registrados').doc(nomdoc).set(ObjectR);
        
                toast('Agregado exitosamente',{
        
                    type: 'success'
        
                })
                }else{
                await db.collection('registrados').doc(IdActualR).update(ObjectR);
        
                toast('Actualizado exitosamente',{
        
                    type: 'info'
        
                })
                IdActualR('');
            }
} catch (error) {
    console.error(error);
}

    };

    const onDelete =async(id) =>{
        if(window.confirm('¿Esta seguro de querer eliminar el usuario?')){
            await db.collection('registrados').doc(id).delete();
            toast('Eliminado con exito',{
                type: 'error',
                autoClose: '2500'
            })
        }
    }

    const getregistrados = () => {
        db.collection('registrados').onSnapshot((querySnapshot)=>{
            const docs = [];
            querySnapshot.forEach((doc) => {
                docs.push({...doc.data(), id:doc.id});
            })
            setregistrados(docs)
        });  
        
    }

    useEffect(()=>{
        getregistrados();

        if(IdActualR === ''){
            
            actualizar_registrado({
            tipopersonaR:'',
            documentoR:props.IdNoEncontrado,
            documentoBR:'',
            nombreR:'',
            fichaR:'',
            areaR:''
        })
        }else{
            getregistradoById(IdActualR);
            console.log(IdActualR);
        }

    },[IdActualR,props.IdNoEncontrado])


    return(
        <>
{
    error.verificar ? <p className="alerta-error">{error.msj}</p> : null
}
<form>
    <h2>Registrar Usuario</h2>
    <label className="labelR">Tipo de persona: </label>
    <select name="tipopersonaR" value={tipopersonaR} onChange={actualizarState} className="u-full-width">
        <option>--Seleccione uno--</option>
        <option>Funcionario</option>
        <option>Aprendiz</option>
        <option>Visitante</option>
    </select>
    
    <label className="labelR">Documento: </label>
    <input
        type="text"
        name="documentoR"
        className="u-full-width"
        placeholder="Ingresar el documento"
        onChange={actualizarState}
        value={documentoR}
        required
        disabled={ IdActualR===''?false:true}
    />

    <label className="labelR">Nombre: </label>
    <input
        type="text"
        name="nombreR"
        className="u-full-width"
        placeholder="Ingresar el nombre"
        required
        onChange={actualizarState}
        value={nombreR}
        
    />
    <label className="labelR">Ficha: </label>
    <input
        type="text"
        name="fichaR"
        className="u-full-width"
        placeholder="Ingresar ficha"
        onChange={actualizarState}
        value={fichaR}
    />
    <label htmlFor="areaRS" className="labelR">Area</label>
  <select className="u-full-width" id="areaRS" name="areaR" value={areaR} onChange={actualizarState}>
  <option id="idfuncionarioR">--Seleccione uno--</option>
    <option id="idTER">TIC y Electronica</option>
    <option id="idManufacturaR">Manufactura</option>
    <option id="idAutomatizacionR">Automatizacion</option>
    <option id="idElectricidadR">Electricidad</option>
    <option id="idAutomotrizR">Automotriz</option>
  </select>
    <button
        type="submit"
        className="u-full-width btn btn-primario btn-block"
        onClick={(e)=>{
            e.preventDefault()
            if(rol === 'Supervisor' && IdActualR===''){
            alert('El supervisor no puede registrar datos')
            }else{
            handleSubmit()
        }
        }}
    >
        {IdActualR === '' ? 'Guardar' : 'Actualizar'}
    </button>

</form>
    <label className="labelR">Documento a buscar: </label>
    <input
        type="text"
        name="documentoBR"
        className="u-full-width"
        placeholder="Ingresar el documento a buscar"
        onChange={actualizarState}
        value={documentoBR}
        required
    />
        <button
        type="submit"
        className="u-full-width btn btn-primario btn-block"
        onClick={()=>{
            if(rol === 'Auxiliar'){
                alert('Como auxiliar no puede listar datos')
            }else{
            if(documentoBR === ''){
            getregistrados()
            UpdMostrarList({showMe:true})
            }else{
            getregistradosByDocu(documentoBR)
            UpdMostrarList({showMe:true})
        }
        }
        }}
        >Listar
        </button>

        {
        MostrarList.showMe?
        <div>

        <button
        type="button"
        className="u-full-width btn-danger"
        onClick={()=>{ UpdMostrarList({showMe:false}) }}
        >
            Ocultar
        </button>

        <table class="table">
            
            {
            ownerWindow().innerWidth >= 778?
                <thead class="thead-dark">
                <tr>
                <th scope="col">Tipo persona</th>
                <th scope="col">Documento</th>
                <th scope="col">Nombre</th>
                <th scope="col">Ficha</th>
                <th scope="col">Area</th>
                <th scope="col">Editar</th>
                <th scope="col">Eliminar</th>
                </tr>
                </thead>
                :null    
            }
            
            <tbody>
            
            {
                
                ownerWindow().innerWidth >= 778?
                registrados.map(
                    registrado =>(
                        <tr>
                            <td>{registrado.tipopersonaR}</td>
                            <td>{registrado.documentoR}</td>
                            <td>{registrado.nombreR}</td>
                            <td>{registrado.fichaR}</td>
                            <td>{registrado.areaR}</td>
                            <td><button type="button" onClick={() => {
                            setIdActualR(registrado.id)
                            }}><i class="fa fa-edit"></i></button></td>
                            <td><button type="button" onClick={() => onDelete(registrado.id)}><i class="fa fa-eraser"></i></button></td>
                        </tr>
                    )
                )
                :null            
            }    
            </tbody>
            </table>

        {
        ownerWindow().innerWidth<777?
        registrados.map(
            registrado => (
            <div className="entrada" key={registrado.id}>
                <p>Tipo persona : <span>{registrado.tipopersonaR}</span></p>
                <p>Documento: <span>{registrado.documentoR}</span></p>
                <p>Nombre: <span>{registrado.nombreR}</span></p>
                <p>Ficha: <span>{registrado.fichaR}</span></p>
                <p>Area: <span>{registrado.areaR}</span></p>
                <button type="button" className="btn btn-primario btn-block" onClick={() => {
                setIdActualR(registrado.id)
                }}>Editar</button>
                <button type="button" className="btn btn-primario btn-block btn-danger" onClick={() => onDelete(registrado.id)}>Eliminar</button>
            </div>
            )
        
        )
        :null
    }
        </div>

        :null
        }

        </>
    )
}

export default CompGDUsuarios