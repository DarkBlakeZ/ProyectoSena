import React, { useState } from 'react';
import {Button, ModalBody, ModalFooter, Modal} from 'reactstrap';
import {db} from '../firebase';
//import '../includes/boostrap'


const AppMR = (props)=>{


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

        

        const getregistradosByDocu = (docuBE) => {
            db.collection('registrados').where("documentoR","==",docuBE).onSnapshot((querySnapshot)=>{
                const docs = [];
                querySnapshot.forEach((doc) => {
                    docs.push({...doc.data(), id:doc.id});
                })
                props.setregistrados(docs)
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
                        onClick={()=>{ docu === '' ? props.getregistrados() : getregistradosByDocu(docu)}}
                        >Buscar
                        </button>
                        {props.registrados.map(
                            registrado => (
                            <div className="entrada" key={registrado.id}>
                                <p>Tipo persona : <span>{registrado.tipopersonaR}</span></p>
                                <p>Documento: <span>{registrado.documentoR}</span></p>
                                <p>Nombre: <span>{registrado.nombreR}</span></p>
                                <p>Ficha: <span>{registrado.fichaR}</span></p>
                                <p>Area: <span>{registrado.areaR}</span></p>
                                <button type="button" className="btn btn-success" onClick={() => {
                                props.setIdActual(registrado.id)
                                abrirModal()
                                }}>Editar</button>
                                <button type="button" className="btn btn-danger" onClick={() => props.onDelete(registrado.id)}>Eliminar</button>
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


export default AppMR