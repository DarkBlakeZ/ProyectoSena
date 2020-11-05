import React, {useState} from 'react'
import {db} from '../firebase';
import { toast } from 'react-toastify';

const CompGUsu = () => {

    let rolSession = sessionStorage.getItem("rol")

    const [UsuarioR, setUsuario] = useState({
        documento:'',
        nombre:'',
        password:'',
        rol:'',
    })

    const onChange = (e) =>{
        e.preventDefault()
        setUsuario({
            ...UsuarioR,
            [e.target.name] : e.target.value
        })
    }

    const {documento,nombre,password,rol} = UsuarioR

    const addUsu = async (docu,usu) =>{

        try{
  
        await db.collection('usuarios').doc(docu).set(usu);

        toast('Agregado exitosamente',{

            type: 'success'

        })
    }catch(error){
        alert(error)
    }
        }

    const handleSubmit = (e) => {
        e.preventDefault()
        addUsu(documento,UsuarioR)
    }

    return(
        <>
        <form>
        <label>Rol: </label>
        <select name="rol" value={rol} onChange={onChange} className="u-full-width">
            <option>--Seleccione uno--</option>
            <option>Administrador</option>
            <option>Auxiliar</option>
            <option>Supervisor</option>
        </select>
        <label>Documento: </label>
        <input
            type="text"
            name="documento"
            className="u-full-width"
            placeholder="Ingresar el documento"
            value={documento}
            onChange={onChange}
            required
        />
        <label>Nombre: </label>
        <input
            type="text"
            name="nombre"
            className="u-full-width"
            placeholder="Ingresar el nombre"
            value={nombre}
            onChange={onChange}
        />
        <label>Contraseña: </label>
        <input
            type="text"
            name="password"
            className="u-full-width"
            placeholder="Ingresar contraseña"
            value={password}
            onChange={onChange}
        />
        <button
            type="submit"
            className="u-full-width btn btn-primario btn-block"
            onClick={()=>
                rolSession==="Administrador"?
                handleSubmit
                :
                alert("Solo el administrador puede registrar usuarios")
            }
        >
            Registrar
        </button>
        </form>
        </>
    )
}

export default CompGUsu