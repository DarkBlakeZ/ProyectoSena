import React, { useState, useEffect} from 'react';
import {db} from '../firebase';

const CompFormReg = (props) =>{

        //Estado submit del formulario

        const handleSubmit = e =>{
            e.preventDefault();
            props.addOrEditFormReg(registrado.documentoR,registrado);
            actualizar_registrado({
                tipopersonaR:'',
                documentoR:'',
                nombreR:'',
                fichaR:'',
                areaR:''
            });
        }

        //Crear state de registrado

        const [registrado, actualizar_registrado] = useState({
            tipopersonaR:'',
            documentoR:'',
            nombreR:'',
            fichaR:'',
            areaR:''
        });
        
        //Funcion para leer todo lo que escribe el usuario

        const actualizarState = e => {
            actualizar_registrado({
                ...registrado,
                [e.target.name] : e.target.value

            })
        }

        //Extraer los valores
        
        const {documentoR,nombreR,fichaR,areaR} = registrado;


        //-----

        const getregistradoById = async(id) => {
            
            const doc = await db.collection('registrados').doc(id).get();
            actualizar_registrado(doc.data());
                }

        const BuscarDocumento = async(docu) =>{
            const doc = await db.collection('registrados').doc(docu).get();
            const NewNom = doc.data().nombreR
            actualizar_registrado({
                nombreR: NewNom
                });
        }

        useEffect(()=>{

            if(props.IdActual === ''){
                actualizar_registrado({
                tipopersonaR:'',
                documentoR:'',
                nombreR:'',
                fichaR:'',
                areaR:''
            })
            }else{
                getregistradoById(props.IdActual);
                console.log(props.IdActual);
            }

        },[props.IdActual])

        return(

        <React.Fragment>

<h2>Insertar Usuario</h2>

<form
    onSubmit={handleSubmit}
    
>
    <div className="row">
    <label htmlFor="tipopersonaR">Tipo de persona</label>
  <select className="u-full-width" id="tipopersonaR" name="tipopersonaR" onChange={actualizarState}>
  <option id="idfuncionario" name="tipopersonaR" value={""}>--Seleccione uno--</option>
    <option id="idfuncionario" name="tipopersonaR" value={"funcionario"}>Funcionario</option>
    <option id="idaprendiz" name="tipopersonaR" value={"aprendiz"}>Aprendiz</option>
    <option id="idvisitante" name="tipopersonaR" value={"visitante"}>Visitante</option>
  </select>
    </div>
    <label>Documento: </label>
    <input
        type="text"
        name="documentoR"
        className="u-full-width"
        placeholder="Ingresar el documento"
        onChange={actualizarState}
        value={documentoR}
    />
    <label>Nombre: </label>
    <input
        type="text"
        name="nombreR"
        className="u-full-width"
        placeholder="Ingresar el nombre"
        onChange={actualizarState}
        value={nombreR}
    />
    <label>Ficha: </label>
    <input
        type="text"
        name="fichaR"
        className="u-full-width"
        onChange={actualizarState}
        value={fichaR}
    />
    <label>Area: </label>
    <input
        type="text"
        name="areaR"
        className="u-full-width"
        onChange={actualizarState}
        value={areaR}
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
        onClick={()=>BuscarDocumento(registrado.documentoR)}
    >
        Buscar
    </button>
        </React.Fragment>

      ) 
      
    }


  export default CompFormReg;