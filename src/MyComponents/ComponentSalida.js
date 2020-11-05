import React, {Fragment, useState} from 'react'
import {db} from '../firebase'
import { toast } from 'react-toastify';
import { Redirect } from 'react-router-dom';

const CompFormSalida = () => {

    let rol = sessionStorage.getItem('rol')

    const [DSalida,setDSalida] = useState({
        SalidaTP:'',
        SalidaDocumento:'',
        SalidaNombre:'',
        SalidaFecha:'',
        SalidaHoraEntrada:'',
        SalidaHoraSalida:'',
        SalidaPlaca:'',
        SalidaPertenencias:''
    })

    const [MostrarS,setMostrarS] = useState({
        showMe:false
    })

    const actualizarState = e => {
        setDSalida({
            ...DSalida,
            [e.target.name] : e.target.value

        })
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

    let fechaActId = year.toString()+month.toString()+date.toString()
    

    const addSalida = async (nomdoc,ObjectE) =>{
        try {
            
                await db.collection('salidas').doc(nomdoc+fechaActId).set(ObjectE);
        
                toast('Agregado exitosamente',{
        
                    type: 'success'
        
                })
                
        } catch (error) {
            console.error(error);
        }

    };
    
    const {SalidaTP,SalidaDocumento,SalidaNombre,SalidaFecha,SalidaHoraEntrada,SalidaHoraSalida,SalidaPlaca,SalidaPertenencias} = DSalida

    const handleSubmitSal = (e) =>{
        e.preventDefault()
        addSalida(SalidaDocumento,DSalida)
        setDSalida({
            SalidaTP:'',
            SalidaDocumento:'',
            SalidaNombre:'',
            SalidaFecha:'',
            SalidaHoraEntrada:'',
            SalidaHoraSalida:'',
            SalidaPlaca:'',
            SalidaPertenencias:''
        })
    }

    

    

    const BuscarDocumentoSalida = async(docu) =>{

        let fechaActId = year.toString()+month.toString()+date.toString()
        const doc = await db.collection('entradas').doc(docu+fechaActId).get();
        
        if(doc.data()!== '' && doc.data() !== undefined){
        let hour = new Date().getHours();
        let min = new Date().getMinutes();    

        if(hour<10){
            hour = 0+hour.toString()
        }

        if(min<10){
            min = 0+min.toString()
        }
        let horaAct = hour+':'+min;
        const NewNom = doc.data().nombre
        const NewTP = doc.data().tipopersona
        const NewFecha = doc.data().fecha
        const NewHE = doc.data().horaEntrada
        const NewPlaca = doc.data().placa
        const NewPertenencias = doc.data().pertenencias
        setDSalida({
            SalidaTP: NewTP,
            SalidaDocumento: docu,
            SalidaNombre: NewNom,
            SalidaFecha:NewFecha,
            SalidaHoraEntrada:NewHE,
            SalidaHoraSalida:horaAct,
            SalidaPlaca:NewPlaca,
            SalidaPertenencias:NewPertenencias
            });
        }else{
            alert('No existe ninguna entrada con este documento el dia de hoy')
        }
    }


    return(
    <Fragment>
    {
        rol === 'Supervisor'?
        (
        alert('El Supervisor solo puede editar y eliminar registros'),
        <Redirect to='/consultas' />
        )
        :
        null
    }
    <div  className="formulario">
    <form>
    <div className="box">
    <h2>Registrar Salida</h2>

    <label>Documento(*): </label>
    <input
        type="text"
        name="SalidaDocumento"
        className="u-full-width"
        placeholder="Ingresar el documento"
        onChange={actualizarState}
        value={SalidaDocumento}
        required='true'
    />
    <button
        type="submit"
        className="u-full-width btn btn-primario btn-block"
        onClick={(e)=>{
        if(SalidaDocumento!==''){
            e.preventDefault()
            BuscarDocumentoSalida(SalidaDocumento)
            setMostrarS({showMe:true})
        }else{
            setMostrarS({showMe:false})
        }
        }}
    >Buscar
    </button>
    {
    MostrarS.showMe?
    <div>
    <label htmlFor="salidaTPS">Tipo Persona:</label>
    <select disabled className="u-full-width" name="SalidaTP" id="salidaTPS" value={SalidaTP} onChange={actualizarState}>
        <option>--Seleccione uno--</option>
        <option>Funcionario</option>
        <option>Aprendiz</option>
        <option>Visitante</option>
    </select>

    <label>Nombre(*): </label>
    <input
        type="text"
        name="SalidaNombre"
        className="u-full-width"
        placeholder="Ingresar el nombre"
        onChange={actualizarState}
        value={SalidaNombre}
        disabled="false"
    />
    <label>Fecha: </label>
    <input
        type="date"
        name="SalidaFecha"
        className="u-full-width"
        onChange={actualizarState}
        value={SalidaFecha}
        disabled
    />
    <label>Hora de entrada: </label>
    <input
        type="time"
        name="SalidaHoraEntrada"
        className="u-full-width"
        onChange={actualizarState}
        value={SalidaHoraEntrada}
        disabled
    />
    <label>Hora de salida: </label>
    <input
        type="time"
        name="SalidaHoraSalida"
        className="u-full-width"
        onChange={actualizarState}
        value={SalidaHoraSalida}
        disabled
    />
    <label>Placa: </label>
    <input
        type="text"
        name="SalidaPlaca"
        className="u-full-width"
        placeholder="Ingresar la placa"
        onChange={actualizarState}
        value={SalidaPlaca}
        disabled
    />
    <label>Pertenencias: </label>
    <textarea
        name="SalidaPertenencias"
        className="u-full-width u-full-height"
        placeholder={"-cascos \n-portatil\n-etc"}
        onChange={actualizarState}
        value={SalidaPertenencias}
        disabled
    />
    <button
        type="submit"
        className="u-full-width btn btn-primario btn-block"
        onClick={handleSubmitSal}
    >
        Registrar
    </button>
    </div>
    :null
    }
    </div>
    </form>
    </div>        


        </Fragment>
    )
}

export default CompFormSalida