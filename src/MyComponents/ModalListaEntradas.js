import React, { useState } from 'react';
import {Button, ModalBody, ModalFooter, Modal} from 'reactstrap';
import {db} from '../firebase';
//import '../includes/boostrap'


const AppM = (props)=>{

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
                props.setEntradas(docs)
            });  
        }

        const getentradasByFecha = (fech1E,fech2E) => {
            
            db.collection('entradas').where("fecha",">=",fech1E).where("fecha","<=",fech2E).onSnapshot((querySnapshot)=>{
                const docs = [];
                querySnapshot.forEach((doc) => {
                    docs.push({...doc.data(), id:doc.id});
                })
                props.setEntradas(docs)
            });  
        }

        const {docu,fech1,fech2} = docuB

        return(
            <>
                <Button 
                className="u-full-width btn btn-success" 
                color="success" 
                onClick={()=>abrirModal()}>Mostrar Lista</Button>

                <Modal isOpen={modal.abierto}>

                        <div className="modal-header">
                        <h5 className="modal-title">Lista</h5>

                        <button 
                        color="success" 
                        type="button" 
                        aria-label="Close" 
                        data-dismiss="modal" 
                        className="close" 
                        onClick={()=>abrirModal()}>
                        <span aria-hidden="true">&times;</span>
                        </button>
                        
                        </div>
                    <ModalBody>
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
                        className="u-full-width btn btn-success"
                        onClick={()=>{ docu === '' ? props.getEntradas() : getentradasByDocu(docu)}}
                        >Buscar
                        </button>
                        <button
                        type="submit"
                        className="u-full-width btn btn-success"
                        onClick={()=>getentradasByFecha(fech1,fech2)}
                        >Buscar por fechas
                        </button>
                    {
                    props.entradas.map(
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
                            <button type="button" className="btn btn-success" onClick={() => {
                                props.setIdActual(entrada.id)
                                abrirModal()
                                }}>Editar</button>
                            <button type="button" className="btn btn-danger" onClick={() => props.onDelete(entrada.id)}>Eliminar</button>
                        </div>
                        )
                    )}
                    </ModalBody>

                    <ModalFooter>
                        Copyright &times;
                    </ModalFooter>
                </Modal>
            </>
        )
    }


export default AppM