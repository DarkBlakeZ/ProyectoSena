import { ownerWindow } from '@material-ui/core';
import React,{useState, useEffect} from 'react'
import { toast } from 'react-toastify';
import {db} from '../firebase';
import ModalEditEnt from './ModalEditEntrada';


const ConsultarEntradas = () => {

    const [entradas, setEntradas] = useState([]);
    
    const [IdActual, setIdActual] = useState("");

    let date = new Date().getDate(); //Current Date
        let month = new Date().getMonth() + 1; //Current Month
        const year = new Date().getFullYear(); //Current Year
        if(month<10){
            month = 0+month.toString()
        }

        if(date<10){
            date = 0+date.toString()
        }
        let fechaAct = year+'-'+month+'-'+date


        const [modal, actualizarModal] = useState({
            abierto: false
        })

        const [docuB, actualizarDocuB] = useState({
            docu:'',
            fech1:'',
            fech2:fechaAct
        })

        const actualizarStateB = e => {
            actualizarDocuB({
                ...docuB,
                [e.target.name] : e.target.value

            })
        }

        const abrirModal=()=>{
            actualizarModal({abierto:!modal.abierto})
        }

        

        const getentradasByDocu = (docuBE) => {
            db.collection('entradas').where("documento","==",docuBE).onSnapshot((querySnapshot)=>{
                const docs = [];
                querySnapshot.forEach((doc) => {
                    docs.push({...doc.data(), id:doc.id});
                })
                setEntradas(docs)
            });  
        }

        const getentradasByFecha = (fech1E,fech2E) => {
            
            db.collection('entradas').where("fecha",">=",fech1E).where("fecha","<=",fech2E).onSnapshot((querySnapshot)=>{
                const docs = [];
                querySnapshot.forEach((doc) => {
                    docs.push({...doc.data(), id:doc.id});
                })
                setEntradas(docs)
            });  
        }

        const {docu,fech1,fech2} = docuB

        const getEntradas = () => {
            db.collection('entradas').onSnapshot((querySnapshot)=>{
                const docs = [];
                querySnapshot.forEach((doc) => {
                    docs.push({...doc.data(), id:doc.id});
                })
                setEntradas(docs)
            });  
        }

        const onDelete =async(id) =>{
            if(window.confirm('¿Esta seguro de querer eliminar la entrada?')){
                await db.collection('entradas').doc(id).delete();
                toast('Eliminado con exito',{
                    type: 'error',
                    autoClose: '2500'
                })
            }
        }

        useEffect(()=>{
            getEntradas();
        },[])


    return(
        <>
            <h2>Consultar Entradas</h2>
            <input type="text"
                        name="docu"
                        placeholder="ingrese documento a buscar"
                        className="u-full-width"
                        onChange={actualizarStateB}
                        value={docu}
                        />
                        <input type="date"
                        name="fech1"
                        className="u-full-width"
                        onChange={actualizarStateB}
                        value={fech1}
                        />
                        <input type="date"
                        name="fech2"
                        className="u-full-width"
                        onChange={actualizarStateB}
                        value={fech2}
                        />
                        <button
                        type="submit"
                        className="u-full-width btn btn-primario btn-block"
                        onClick={()=>{
                            docu===''?
                            getentradasByFecha(fech1,fech2)
                            :
                            getentradasByDocu(docu)
                        }}
                        >Buscar
                        </button>
                            
                            
                            <table class="table">
                            
                            {
                            ownerWindow().innerWidth >= 778?
                                <thead class="thead-dark">
                                <tr>
                                <th scope="col">Tipo persona</th>
                                <th scope="col">Documento</th>
                                <th scope="col">Nombre</th>
                                <th scope="col">Fecha</th>
                                <th scope="col">Hora de Entrada</th>
                                <th scope="col">Placa</th>
                                <th scope="col">Pertenencias</th>
                                <th scope="col">Editar</th>
                                <th scope="col">Eliminar</th>
                                </tr>
                                </thead>
                                :null    
                            }
                            
                            <tbody>
                            
                            {
                                
                                ownerWindow().innerWidth >= 778?
                                entradas.map(
                                    entrada =>(
                                        <tr>
                                            <td>{entrada.tipopersona}</td>
                                            <td>{entrada.documento}</td>
                                            <td>{entrada.nombre}</td>
                                            <td>{entrada.fecha}</td>
                                            <td>{entrada.horaEntrada}</td>
                                            <td>{entrada.placa}</td>
                                            <td>{entrada.pertenencias}</td>
                                            <td><button type="button" onClick={() => {
                                            setIdActual(entrada.id)
                                            abrirModal()
                                            }}><i class="fa fa-edit"></i></button></td>
                                            <td><button type="button" onClick={() => onDelete(entrada.id)}><i class="fa fa-eraser"></i></button></td>
                                        </tr>
                                    )
                                )
                                :null            
                            }    
                            </tbody>
                            </table>
                    {
                    ownerWindow().innerWidth<777?    
                    entradas.map(
                        entrada => (
                        <div className="entrada" key={entrada.id}>
                            <p>Tipo persona : <span>{entrada.tipopersona}</span></p>
                            <p>Documento: <span>{entrada.documento}</span></p>
                            <p>Nombre: <span>{entrada.nombre}</span></p>
                            <p>Fecha: <span>{entrada.fecha}</span></p>
                            <p>Hora entrada: <span>{entrada.horaEntrada}</span></p>
                            <p>Hora Salida: <span>{entrada.horaSalida}</span></p>
                            <p>Placa: <span>{entrada.placa}</span></p>
                            <p>Pertenencias: <span>{entrada.pertenencias}</span></p>
                            <button type="button" className="btn btn-primario btn-block" onClick={() => {
                                setIdActual(entrada.id)
                                abrirModal()
                                }}>Editar</button>
                            <button type="button" className="btn btn-primario btn-block btn-danger" onClick={() => onDelete(entrada.id)}>Eliminar</button>
                        </div>
                        ))
                    : null
                    }

                    <ModalEditEnt {...{IdActual,setIdActual,modal,abrirModal}} />
                    
        </>

    )
}

export default ConsultarEntradas