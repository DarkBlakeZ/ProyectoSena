import React, {Fragment, useState} from 'react'
import {db} from '../firebase'

const CompFormSalida = () => {

    

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
    const actualizarState = e => {
        setDSalida({
            ...DSalida,
            [e.target.name] : e.target.value

        })
    }
    
    const handleSubmitSal = (e) =>{
        e.preventDefault()
    }

    const {SalidaTP,SalidaDocumento,SalidaNombre,SalidaFecha,SalidaHoraEntrada,SalidaHoraSalida,SalidaPlaca,SalidaPertenencias} = DSalida

    const BuscarDocumentoSalida = async(docu) =>{
        const doc = await db.collection('entradas').doc(docu).get();
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
            alert('error')
        }
    }


    return(
    <Fragment>
    
    <form>
    <div className="box">
    <h2>Registrar Salida</h2>
        <label htmlFor="salidaTPS">Tipo Persona:</label>
        <select disabled className="u-full-width" name="SalidaTP" id="salidaTPS" value={SalidaTP} onChange={actualizarState}>
            <option>--Seleccione uno--</option>
            <option>Funcionario</option>
            <option>Aprendiz</option>
            <option>Visitante</option>
        </select>
        <label htmlFor=""></label>
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
        className="u-full-width button-primary"
        onClick={(e)=>{
            e.preventDefault()
            BuscarDocumentoSalida(SalidaDocumento)
        }}
    >Buscar
    </button>
    
    <label>Nombre(*): </label>
    <input
        type="text"
        name="SalidaNombre"
        className="u-full-width"
        placeholder="Ingresar el nombre"
        onChange={actualizarState}
        value={SalidaNombre}
        disabled
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
        className="u-full-width button-primary"
        onClick={handleSubmitSal}
    >
        Registrar
    </button>
    </div>
    </form>
            
        </Fragment>
    )
}

export default CompFormSalida