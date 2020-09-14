import React, { useState } from 'react';
import {Button, ModalBody, ModalFooter, Modal} from 'reactstrap';
import {db} from '../firebase';
//import '../includes/boostrap'


const AppM = (props)=>{


        const [modal, actualizarModal] = useState({
            abierto: false
        })

        const [docuB, actualizarDocuB] = useState({
            docu:''
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

        const {docu} = docuB

        return(
            <>
                <Button 
                className="u-full-width button-primary" 
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
                        className="u-full-width button-primary"
                        onChange={actualizarStateB}
                        value={docu}
                        />
                        <button
                        type="submit"
                        className="u-full-width button-primary"
                        onClick={()=>{ docu === '' ? props.getEntradas() : getentradasByDocu(docu)}}
                        >Buscar
                        </button>
                    {
                    props.entradas.map(
                        entrada => (
                        <div className="entrada" key={entrada.id}>
                            <p>Tipo persona : <span>{entrada.tipopersona}</span></p>
                            <p>Documento: <span>{entrada.documento}</span></p>
                            <p>Nombre: <span>{entrada.nombre}</span></p>
                            <p>Fecha: <span>{entrada.fecha}</span></p>
                            <p>Tiempo: <span>{entrada.tiempo}</span></p>
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