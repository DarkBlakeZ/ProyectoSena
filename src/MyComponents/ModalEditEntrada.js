import React, {useState, useEffect} from 'react';
import {ModalBody, ModalFooter, Modal} from 'reactstrap';
import {db} from '../firebase';
import { toast } from 'react-toastify';

const ModalEditEnt = (props) => {

    const [IdEncontrado,setIdEncontrado] = useState({
        verificar:false
    })


    let date = new Date().getDate(); //Current Date
    let month = new Date().getMonth() + 1; //Current Month
    const year = new Date().getFullYear(); //Current Year
    let hour = new Date().getHours();
    let min = new Date().getMinutes();    

    if(hour<10){
        hour = 0+hour.toString()
    }

    if(min<10){
        min = 0+min.toString()
    }

    if(month<10){
        month = 0+month.toString()
    }

    if(date<10){
        date = 0+date.toString()
    }

    let horaAct = hour+':'+min;

    let fechaAct = year+'-'+month+'-'+date
    let fechaActId = year.toString()+month.toString()+date.toString()

//Estado submit del formulario

const handleSubmit = async(e) =>{
    e.preventDefault();
    const doc = await db.collection('entradas').doc(entrada.documento+fechaActId).get();
    
if(props.IdActual===''){
    if(doc.data()!==undefined){
        if(documento+fechaActId === doc.data().documento+fechaActId){
            actualizarError({verificar:true, msj:'la persona con este documento ya ingreso hoy'})
            return;
        }
    } 
}
    if(documento.trim() === '' || nombre.trim()==='' || tipopersona==='' || fecha===''){
        actualizarError({verificar:true, msj:'HAY CAMPOS OBLIGATORIOS(*)'})
        return;
    }
    
    else{
    addOrEditForm(entrada.documento,entrada);
    actualizar_entrada({
        tipopersona:'',
        documento:'',
        nombre:'',
        fecha:fechaAct,
        horaEntrada:horaAct,
        horaSalida:'',
        placa:'',
        pertenencias:''
    });
    actualizarError({verificar:false, msj:null})

}
setIdEncontrado({verificar:false})
}

//alert(date +'/'+ month +'/'+ year)

/*
const [ShowDiv, UpdShowDiv] = useState({
    showMe:true
})

const MostrarDiv = () =>{
    UpdShowDiv({
        showMe:true
    })
}
*/


//State de error

const [error, actualizarError] = useState({
    verificar: false,
    msj:null
})

//Crear state de entrada

const [entrada, actualizar_entrada] = useState({
tipopersona:'',
documento:'',
nombre:'',
fecha:fechaAct,
horaEntrada:horaAct,
horaSalida:'',
placa:'',
pertenencias:''
});


//Funcion para leer todo lo que escribe el usuario

const actualizarState = e => {
    actualizar_entrada({
        ...entrada,
        [e.target.name] : e.target.value

    })
}

const addOrEditForm = async (nomdoc,ObjectE) =>{

    try {
        if(props.IdActual===''){
    
            await db.collection('entradas').doc(nomdoc+fechaActId).set(ObjectE);
    
            toast('Agregado exitosamente',{
    
                type: 'success'
    
            })
            }else{
            await db.collection('entradas').doc(props.IdActual).update(ObjectE);
    
            toast('Actualizado exitosamente',{
    
                type: 'info'
    
            })
            props.abrirModal();
            props.setIdActual('');
            }
    } catch (error) {
        console.error(error);
    }

};


//Extraer los valores

const {tipopersona,documento,nombre,fecha,horaEntrada,horaSalida,placa,pertenencias} = entrada;

//-----

const getEntradaById = async(id) => {
    
    const doc = await db.collection('entradas').doc(id).get();
    actualizar_entrada(doc.data());
        }

useEffect(()=>{

    let date = new Date().getDate(); //Current Date
    let month = new Date().getMonth() + 1; //Current Month
    const year = new Date().getFullYear(); //Current Year
    let hour = new Date().getHours();
    let min = new Date().getMinutes();    

    if(hour<10){
        hour = 0+hour.toString()
    }

    if(min<10){
        min = 0+min.toString()
    }

    if(month<10){
        month = 0+month.toString()
    }

    if(date<10){
        date = 0+date.toString()
    }

    let horaAct = hour+':'+min;

    let fechaAct = year+'-'+month+'-'+date


    if(props.IdActual === ''){
        actualizar_entrada({
        tipopersona:'',
        documento:'',
        nombre:'',
        fecha:fechaAct,
        horaEntrada:horaAct,
        horaSalida:'',
        placa:'',
        pertenencias:''})
    }else{
        getEntradaById(props.IdActual);
        console.log(props.IdActual);
    }

},[props.IdActual])


    return(
        <>
        <Modal isOpen={props.modal.abierto}>
        <div className="modal-header">
            <h5 className="modal-title">Editar</h5>

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
    <div  className="formulario">
    <form>
        <h2>Editar Entrada</h2>
        {
            error.verificar ? <p className="alerta-error">{error.msj}</p> : null
        }   
    <div className="row">

    <label htmlFor="tipopersonas">Tipo de persona(*):</label>
  <select className="u-full-width" id="tipopersonas" name="tipopersona" value={tipopersona} onChange={actualizarState} required>
  <option id="idfuncionario">--Seleccione uno--</option>
    <option id="idfuncionario">Funcionario</option>
    <option id="idaprendiz">Aprendiz</option>
    <option id="idvisitante">Visitante</option>
  </select>
    
  </div>
    {
    props.IdActual === ''?
    <div>
    <label>Documento(*): </label>
    <input
        type="text"
        name="documento"
        className="u-full-width"
        placeholder="Ingresar el documento"
        onChange={actualizarState}
        value={documento}
        required={true}
        disabled={false}
    />
    </div>
    :
    <div>
    <label>Documento(*): </label>
    <input
        type="text"
        name="documento"
        className="u-full-width"
        placeholder="Ingresar el documento"
        onChange={actualizarState}
        value={documento}
        required={true}
        disabled={true}
    />
    </div>
}
 
    <label>Nombre(*): </label>
    <div>
{
    IdEncontrado.verificar === true?
    
    <input
        type="text"
        name="nombre"
        className="u-full-width"
        placeholder="Ingresar el nombre"
        onChange={actualizarState}
        value={nombre}
        required
        disabled
        
    />
    :
    <input
        type="text"
        name="nombre"
        className="u-full-width"
        placeholder="Ingresar el nombre"
        onChange={actualizarState}
        value={nombre}
        required
    />
}
</div>
    
    <label>Fecha: </label>
    <input
        type="date"
        name="fecha"
        className="u-full-width"
        onChange={actualizarState}
        value={fecha}
        disabled
    />
    <label>Hora de entrada: </label>
    <input
        type="time"
        name="horaEntrada"
        className="u-full-width"
        onChange={actualizarState}
        value={horaEntrada}
        disabled={true}
    />
    <label>Hora de salida: </label>
    <input
        type="time"
        name="horaSalida"
        className="u-full-width"
        onChange={actualizarState}
        value={horaSalida}
    />
    <label>Placa: </label>
    <input
        type="text"
        name="placa"
        className="u-full-width"
        placeholder="Ingresar la placa"
        onChange={actualizarState}
        value={placa}
    />
    <label>Pertenencias: </label>
    <textarea
        name="pertenencias"
        className="u-full-width u-full-height"
        placeholder={"-cascos\n-portatil\n-etc"}
        onChange={actualizarState}
        value={pertenencias}
    />
        <button
        type="submit"
        className="u-full-width btn btn-primario btn-block"
        onClick={handleSubmit}
    >
        {props.IdActual === '' ? 'Guardar' : 'Actualizar'}
    </button>

    

</form>

</div>  

        </ModalBody>
        <ModalFooter>

        </ModalFooter>
        </Modal>
        </>
        )
}

export default ModalEditEnt