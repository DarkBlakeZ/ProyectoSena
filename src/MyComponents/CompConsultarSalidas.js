import { ownerWindow } from '@material-ui/core';
import React,{useState, useEffect} from 'react'
import { toast } from 'react-toastify';
import {db} from '../firebase';

const ConsultarSalidas = () => {
    const [salidas, setsalidas] = useState([]);

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


        

        const getsalidasByDocu = (docuBE) => {
            db.collection('salidas').where("SalidaDocumento","==",docuBE).onSnapshot((querySnapshot)=>{
                const docs = [];
                querySnapshot.forEach((doc) => {
                    docs.push({...doc.data(), id:doc.id});
                })
                setsalidas(docs)
            });  
        }

        const getsalidasByFecha = (fech1E,fech2E) => {
            
            db.collection('salidas').where("SalidaFecha",">=",fech1E).where("SalidaFecha","<=",fech2E).onSnapshot((querySnapshot)=>{
                const docs = [];
                querySnapshot.forEach((doc) => {
                    docs.push({...doc.data(), id:doc.id});
                })
                setsalidas(docs)
            });  
        }

        const {docu,fech1,fech2} = docuB

        const getsalidas = () => {
            db.collection('salidas').onSnapshot((querySnapshot)=>{
                const docs = [];
                querySnapshot.forEach((doc) => {
                    docs.push({...doc.data(), id:doc.id});
                })
                setsalidas(docs)
            });  
        }

        const onDelete =async(id) =>{
            if(window.confirm('¿Esta seguro de querer eliminar la salida?')){
                await db.collection('salidas').doc(id).delete();
                toast('Eliminado con exito',{
                    type: 'error',
                    autoClose: '2500'
                })
            }
        }

        useEffect(()=>{
            getsalidas();
        },[])


    return(
        <>
            <h2>Consultar salidas</h2>
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
                            getsalidasByFecha(fech1,fech2)
                            :
                            getsalidasByDocu(docu)
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
                                <th scope="col">Hora de entrada</th>
                                <th scope="col">Hora de salida</th>
                                <th scope="col">Placa</th>
                                <th scope="col">Pertenencias</th>
                                <th scope="col">Eliminar</th>
                                </tr>
                                </thead>
                                :null    
                            }
                            
                            <tbody>
                            
                            {
                                
                                ownerWindow().innerWidth >= 778?
                                salidas.map(
                                    salida =>(
                                        <tr>
                                            <td>{salida.SalidaTP}</td>
                                            <td>{salida.SalidaDocumento}</td>
                                            <td>{salida.SalidaNombre}</td>
                                            <td>{salida.SalidaFecha}</td>
                                            <td>{salida.SalidaHoraEntrada}</td>
                                            <td>{salida.SalidaHoraSalida}</td>
                                            <td>{salida.SalidaPlaca}</td>
                                            <td>{salida.SalidaPertenencias}</td>
                                            <td><button type="button" onClick={() => onDelete(salida.id)}><i class="fa fa-eraser"></i></button></td>
                                        </tr>
                                    )
                                )
                                :null            
                            }    
                            </tbody>
                            </table>
                    {
                    ownerWindow().innerWidth<777?    
                    salidas.map(
                        salida => (
                        <div className="salida" key={salida.id}>
                            <p>Tipo persona : <span>{salida.SalidaTP}</span></p>
                            <p>Documento: <span>{salida.SalidaDocumento}</span></p>
                            <p>Nombre: <span>{salida.SalidaNombre}</span></p>
                            <p>Fecha: <span>{salida.SalidaFecha}</span></p>
                            <p>Hora Entrada: <span>{salida.SalidaHoraEntrada}</span></p>
                            <p>Hora Salida: <span>{salida.SalidaHoraSalida}</span></p>
                            <p>Placa: <span>{salida.SalidaPlaca}</span></p>
                            <p>Pertenencias: <span>{salida.SalidaPertenencias}</span></p>
                            <button type="button" className="btn btn-primario btn-block btn-danger" onClick={() => onDelete(salida.id)}>Eliminar</button>
                        </div>
                        ))
                    : null
                    }
                    
        </>

    )
}

export default ConsultarSalidas