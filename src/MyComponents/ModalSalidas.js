import React, {Fragment ,useState } from 'react';
import {Button, ModalBody, ModalFooter, Modal} from 'reactstrap';
import {db} from '../firebase';
import { toast } from 'react-toastify';

const ModalSalida = () => {

        const [salidas, setSalidas] = useState([]);

        
    
        const onDelete =async(id) =>{
            if(window.confirm('¿Esta seguro de querer eliminar la entrada?')){
                await db.collection('salidas').doc(id).delete();
                toast('Eliminado con exito',{
                    type: 'error',
                    autoClose: '2500'
                })
            }
        }
    
        const getSalidas = () => {
            db.collection('salidas').onSnapshot((querySnapshot)=>{
                const docs = [];
                querySnapshot.forEach((doc) => {
                    docs.push({...doc.data(), id:doc.id});
                })
                setSalidas(docs)
            });  
        }

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

        

        const getsalidasByDocu = (docuBE) => {
            db.collection('salidas').where("SalidaDocumento","==",docuBE).onSnapshot((querySnapshot)=>{
                const docs = [];
                querySnapshot.forEach((doc) => {
                    docs.push({...doc.data(), id:doc.id});
                })
                setSalidas(docs)
            });  
        }

        const getsalidasByFecha = (fech1E,fech2E) => {
            
            db.collection('salidas').where("SalidaFecha",">=",fech1E).where("SalidaFecha","<=",fech2E).onSnapshot((querySnapshot)=>{
                const docs = [];
                querySnapshot.forEach((doc) => {
                    docs.push({...doc.data(), id:doc.id});
                })
                setSalidas(docs)
            });  
        }

        const {docu,fech1,fech2} = docuB

    return(
        <Fragment>
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
                        onClick={()=>{ docu === '' ? getSalidas() : getsalidasByDocu(docu)}}
                        >Buscar
                        </button>
                        <button
                        type="submit"
                        className="u-full-width btn btn-success"
                        onClick={()=>getsalidasByFecha(fech1,fech2)}
                        >Buscar por fechas
                        </button>
                    {
                    salidas.map(
                        salida => (
                        <div className="entrada" key={salida.id}>
                            <p>Tipo persona : <span>{salida.SalidaTP}</span></p>
                            <p>Documento: <span>{salida.SalidaDocumento}</span></p>
                            <p>Nombre: <span>{salida.SalidaNombre}</span></p>
                            <p>Fecha: <span>{salida.SalidaFecha}</span></p>
                            <p>Hora entrada: <span>{salida.SalidaHoraEntrada}</span></p>
                            <p>Hora Salida: <span>{salida.SalidaHoraSalida}</span></p>
                            <p>Placa: <span>{salida.SalidaPlaca}</span></p>
                            <p>Pertenencias: <span>{salida.SalidaPertenencias}</span></p>
                            <button type="button" className="btn btn-danger" onClick={() => onDelete(salida.id)}>Eliminar</button>
                        </div>
                        )
                    )}
                    </ModalBody>

                    <ModalFooter>
                        Copyright &times;
                    </ModalFooter>
                </Modal>
        </Fragment>
    )
}

export default ModalSalida