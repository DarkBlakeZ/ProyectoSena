import React, { useState, useEffect } from 'react';
import {ModalBody, ModalFooter, Modal} from 'reactstrap';
import {db} from '../firebase';
import { toast } from 'react-toastify';

const AppMRU = (props) => {

    const [registrados, setregistrados] = useState([]);
    const [IdActualR, setIdActualR] = useState("");
    const [MostrarList, UpdMostrarList] = useState({
        showMe:false
    })

    //Crear state de registrado

    const [registrado, actualizar_registrado] = useState({
        tipopersonaR:'',
        documentoR:'',
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
    
    const {tipopersonaR,documentoR,nombreR,fichaR,areaR} = registrado;

    //Estado submit del formulario

    const handleSubmit = async(e) =>{
        e.preventDefault();
        const doc = await db.collection('registrados').doc(registrado.documentoR).get();
        
        if(documentoR.trim() === '' || nombreR.trim()==='' || tipopersonaR==='' || areaR.trim()===''){
            actualizarError({verificar:true, msj:'HAY CAMPOS OBLIGATORIOS(*)'})
            return;
        }
        if(IdActualR===''){
        if(doc.data()!==undefined){
        if(documentoR === doc.data().documentoR){
            actualizarError({verificar:true, msj:'El Documento ya existe'})
            return;
        }
        }
        }else{
        addOrEditFormReg(registrado.documentoR,registrado);
        actualizar_registrado({
            tipopersonaR:'',
            documentoR:'', 
            nombreR:'',
            fichaR:'',
            areaR:''
        });
        actualizarError({verificar:false, msj:null})
    }
    }

    

    //Campos obligatorios



    //-----

    const getregistradoById = async(id) => {
        
        const doc = await db.collection('registrados').doc(id).get();
        actualizar_registrado(doc.data());
            }

    useEffect(()=>{
        getregistrados();

        if(IdActualR === ''){
            actualizar_registrado({
            tipopersonaR:'',
            documentoR:'',
            nombreR:'',
            fichaR:'',
            areaR:''
        })
        }else{
            getregistradoById(IdActualR);
            console.log(IdActualR);
        }

    },[IdActualR])

    

    

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


    return(
        <>
            <Modal isOpen={props.modal.abierto}>

                    <div className="modal-header">
                    <h5 className="modal-title">Usuarios</h5>

                    <button 
                    color="success" 
                    type="button" 
                    aria-label="Close" 
                    data-dismiss="modal" 
                    className="close" 
                    onClick={()=>props.abrirModal()}>
                    <span aria-hidden="true">&times;</span>
                    </button>
                    
                    </div>
                <ModalBody>
{
    error.verificar ? <p className="alerta-error">{error.msj}</p> : null
}
<form
    onSubmit={handleSubmit}
    
>
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
        className="u-full-width button-primary"
    >
        {IdActualR === '' ? 'Guardar' : 'Actualizar'}
    </button>

</form>
        <button
        type="submit"
        className="u-full-width button-primary"
        onClick={()=>{
            if(documentoR === ''){
            getregistrados()
            UpdMostrarList({showMe:true})
            }else{
            getregistradosByDocu(documentoR)
            UpdMostrarList({showMe:true})
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

        {registrados.map(
            registrado => (
            <div className="entrada" key={registrado.id}>
                <p>Tipo persona : <span>{registrado.tipopersonaR}</span></p>
                <p>Documento: <span>{registrado.documentoR}</span></p>
                <p>Nombre: <span>{registrado.nombreR}</span></p>
                <p>Ficha: <span>{registrado.fichaR}</span></p>
                <p>Area: <span>{registrado.areaR}</span></p>
                <button type="button" className="btn btn-success" onClick={() => {
                setIdActualR(registrado.id)
                }}>Editar</button>
                <button type="button" className="btn btn-danger" onClick={() => onDelete(registrado.id)}>Eliminar</button>
            </div>
            )
            

        )}
        </div>

        :null
        }

                </ModalBody>

                <ModalFooter>
                    Copyright &times;
                </ModalFooter>
            </Modal>
        </>
    )
}

export default AppMRU