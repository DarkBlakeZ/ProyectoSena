import React, { useState, useEffect} from 'react';
import {db} from '../firebase';

const CompForm = (props) =>{

        //Estado submit del formulario

        const handleSubmit = e =>{
            e.preventDefault();
            if(documento.trim() === '' || nombre.trim()==='' || tipopersona==='' || fecha.trim()===''){
                actualizarError(true)
                return;
            }else{
            props.addOrEditForm(entrada.documento,entrada);
            actualizar_entrada({
                tipopersona:'',
                documento:'',
                nombre:'',
                fecha:'',
                tiempo:'',
                placa:'',
                pertenencias:''
            });
            actualizarError(false);

        }

        }

        const [error, actualizarError] = useState(false)

        //Crear state de entrada

        const [entrada, actualizar_entrada] = useState({
        tipopersona:'',
        documento:'',
        nombre:'',
        fecha:'',
        tiempo:'',
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
        
        const {tipopersona,documento,nombre,fecha,tiempo,placa,pertenencias} = entrada;


        //-----

        const getEntradaById = async(id) => {
            
            const doc = await db.collection('entradas').doc(id).get();
            actualizar_entrada(doc.data());
                }

        const BuscarDocumentoE = async(docu) =>{
            const doc = await db.collection('registrados').doc(docu).get();
            if(doc.data()!== ''){
            const NewNom = doc.data().nombreR
            console.log(doc)
            actualizar_entrada({
                nombre: NewNom
                });
            }else{
                alert('No Existe')
                return
            }
        }

        useEffect(()=>{

            if(props.IdActual === ''){
                actualizar_entrada({
                tipopersona:'',
                documento:'',
                nombre:'',
                fecha:'',
                tiempo:'',
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
    error ? <p className="alerta-error">Ahi campos obligatorios (*)</p> : null
}

<form>
    <div className="row">
    <label htmlFor="tipopersonas">Tipo de persona(*):</label>
  <select className="u-full-width" id="tipopersonas" name="tipopersona" onChange={actualizarState} required>
  <option id="idfuncionario" name="tipopersona" value={""}>--Seleccione uno--</option>
    <option id="idfuncionario" name="tipopersona" value={"funcionario"}>Funcionario</option>
    <option id="idaprendiz" name="tipopersona" value={"aprendiz"}>Aprendiz</option>
    <option id="idvisitante" name="tipopersona" value={"visitante"}>Visitante</option>
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
    <label>Tiempo: </label>
    <input
        type="time"
        name="tiempo"
        className="u-full-width"
        onChange={actualizarState}
        value={tiempo}
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