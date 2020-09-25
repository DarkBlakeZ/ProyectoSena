import React, { useState, useEffect} from 'react';
//import DatePicker from 'react-datepicker';
import {db} from '../firebase';
//import "react-datepicker/dist/react-datepicker.css";

const CompForm = (props) =>{

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

        //Estado submit del formulario

        const handleSubmit = async(e) =>{
            e.preventDefault();
            const doc = await db.collection('entradas').doc(entrada.documento).get();
            
        if(props.IdActual===''){
            if(doc.data()!==undefined){
                if(documento === doc.data().documento){
                    actualizarError({verificar:true, msj:'la persona con este documento ya ingreso'})
                    return;
                }
            }
        }
            if(documento.trim() === '' || nombre.trim()==='' || tipopersona==='' || fecha===''){
                actualizarError({verificar:true, msj:'Ahi campos obligatorios(*)'})
                return;
            }
            
            else{
            props.addOrEditForm(entrada.documento,entrada);
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

        //Extraer los valores
        
        const {tipopersona,documento,nombre,fecha,horaEntrada,horaSalida,placa,pertenencias} = entrada;

        //-----

        const getEntradaById = async(id) => {
            
            const doc = await db.collection('entradas').doc(id).get();
            actualizar_entrada(doc.data());
                }

        const BuscarDocumentoE = async(docu) =>{
            const doc = await db.collection('registrados').doc(docu).get();
            if(doc.data()!== '' && doc.data() !== undefined){
            const NewNom = doc.data().nombreR
            const NewTP = doc.data().tipopersonaR
            console.log(doc)
            actualizar_entrada({
                tipopersona: NewTP,
                documento: docu,
                nombre: NewNom
                });
            }else{
                alert('No Existe')
                return
            }
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

        <React.Fragment>

<h2>Insertar ingreso</h2>

{
    error.verificar ? <p className="alerta-error">{error.msj}</p> : null
}

<form >
    
    <div className="row">
    <label htmlFor="tipopersonas">Tipo de persona(*):</label>
  <select className="u-full-width" id="tipopersonas" name="tipopersona" value={tipopersona} onChange={actualizarState} required>
  <option id="idfuncionario">--Seleccione uno--</option>
    <option id="idfuncionario">Funcionario</option>
    <option id="idaprendiz">Aprendiz</option>
    <option id="idvisitante">Visitante</option>
  </select>
    </div>

    <div className="box">
    <label>Documento(*): </label>
    <input
        type="text"
        name="documento"
        className="u-full-width"
        placeholder="Ingresar el documento"
        onChange={actualizarState}
        value={documento}
        required
    />
    <button
        type="submit"
        className="u-full-width button-primary"
        onClick={()=>BuscarDocumentoE(entrada.documento)}
    >Buscar
    </button>
    

    </div>
    <label>Nombre(*): </label>
    <input
        type="text"
        name="nombre"
        className="u-full-width"
        placeholder="Ingresar el nombre"
        onChange={actualizarState}
        value={nombre}
        required
    />
    <label>Fecha: </label>
    <input
        type="date"
        name="fecha"
        className="u-full-width"
        onChange={actualizarState}
        value={fecha}
    />
    <label>Hora de entrada: </label>
    <input
        type="time"
        name="horaEntrada"
        className="u-full-width"
        onChange={actualizarState}
        value={horaEntrada}
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
        placeholder={"-cascos \n-portatil\n-etc"}
        onChange={actualizarState}
        value={pertenencias}
    />
    <button
        type="submit"
        className="u-full-width button-primary"
        onClick={handleSubmit}
    >
        {props.IdActual === '' ? 'Guardar' : 'Actualizar'}
    </button>

</form>

    
        </React.Fragment>

      ) 
      
    }


  export default CompForm;