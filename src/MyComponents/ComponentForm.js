import React, { useState, useEffect} from 'react';
import {db} from '../firebase';

const CompForm = (props) =>{

        //Estado submit del formulario

        const handleSubmit = e =>{
            e.preventDefault();
            props.addOrEditForm(entrada);
            actualizar_entrada({
                tipopersona:'',
                documento:'',
                nombre:'',
                fecha:'',
                tiempo:'',
                placa:'',
                pertenencias:''
            });
        }

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
        
        const {documento,nombre,fecha,tiempo,placa,pertenencias} = entrada;


        //-----

        const getEntradaById = async(id) => {
            
            const doc = await db.collection('entradas').doc(id).get();
            actualizar_entrada(doc.data());
                }
        
        const getEntradaByDocument = async(docu) => {
            await db.collection('registrados').where("documento","==",docu).onSnapshot((querySnapshot)=>{
                const docs = [];
                querySnapshot.forEach((doc) => {
                    docs.push({...doc.data(), id:doc.id});
                })
                props.setregistrados(docs)
            });  
        }

        const BuscarPorDocumento = async(docu) =>{
            await getEntradaByDocument(docu) 
            actualizar_entrada({
                nombre: props.registrados[0].nombre
            })
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

<form
    //onSubmit={handleSubmit}
    
>
    <div className="row">
    <label for="tipopersonas">Tipo de persona</label>
  <select class="u-full-width" id="tipopersonas" name="tipopersona" onChange={actualizarState}>
  <option id="idfuncionario" name="tipopersona" value={"No se especifico"}>--Seleccione uno--</option>
    <option id="idfuncionario" name="tipopersona" value={"funcionario"}>Funcionario</option>
    <option id="idaprendiz" name="tipopersona" value={"aprendiz"}>Aprendiz</option>
    <option id="idvisitante" name="tipopersona" value={"visitante"}>Visitante</option>
  </select>
    </div>
    <label>Documento: </label>
    <input
        type="text"
        name="documento"
        className="u-full-width"
        placeholder="Ingresar el documento"
        onChange={actualizarState}
        value={documento}
    />
    <label>Nombre: </label>
    <input
        type="text"
        name="nombre"
        className="u-full-width"
        placeholder="Ingresar el nombre"
        onChange={actualizarState}
        value={nombre}
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
    >
        {props.IdActual === '' ? 'Guardar' : 'Actualizar'}
    </button>

</form>

    <button
        type="submit"
        className="u-full-width button-primary"
        onClick={()=>BuscarPorDocumento(entrada.documento)}
    >
        Buscar
    </button>
        </React.Fragment>

      ) 
      
    }


  export default CompForm;