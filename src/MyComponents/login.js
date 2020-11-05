import React,{useState} from 'react'
import {db} from '../firebase';
import {Redirect} from 'react-router-dom'


const Complogin = () => {

    const token = sessionStorage.getItem("token")
    let logged = true

    if(token === null){
        logged = false
    }

    const [usuariois, guardarUsuariois] = useState({
        documento:'',
        usuario:'',
        password:'',
        rol:'',
        logged

    })
    

    const {documento,password} = usuariois

    const onChange = e =>{
        guardarUsuariois({
            ...usuariois,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = e =>{
        e.preventDefault();
        db.collection('usuarios').where("documento", "==", documento).where("password", "==", password).onSnapshot((querySnapshot)=>{
            const docs = [];
            querySnapshot.forEach((doc) => {
                docs.push({...doc.data(), id:doc.id});
            })
            console.log(docs[0])
            if(docs[0]!==undefined){
                sessionStorage.setItem("token","asdujhasoufasasd")
                sessionStorage.setItem("nombre",docs[0].nombre)
                sessionStorage.setItem("rol",docs[0].rol)
                guardarUsuariois({
                    ...usuariois,
                    logged:true
                })
            }else{
                alert('Documento y/o Contraseña incorrecto(s)')
                guardarUsuariois({
                    ...usuariois,
                    documento:'',
                    usuario:'',
                    password:'',
                    rol:'',
                    logged:false
                })
            }
        });  
    }

    
    

    return (
        <React.Fragment>

            <div className="form-usuario">
                <div className="contenedor-form sombra-dark">
                    <h1>Iniciar Sesion</h1>
                    <form>
                        <div className="campo-form">
                            <label htmlFor="documento">Documento</label>
                            <input type="text"
                                    id="documento"
                                    name="documento"
                                    placeholder="Tu Documento"
                                    value={documento}
                                    onChange={onChange}
                            />
                        </div>
                        <div className="campo-form">
                            <label htmlFor="password">Password</label>
                            <input type="password"
                                    id="password"
                                    name="password"
                                    placeholder="Tu Password"
                                    value={password}
                                    onChange={onChange}
                            />
                        </div>
                        <div className="campo-form">
                            <input type="submit" className="btn btn-primario btn-block" onClick={onSubmit} value="Iniciar sesion"/>
                        </div>
                        {
                            usuariois.logged ?
                            <Redirect to="/home"/>
                            :
                            null
                        }
                    </form>
                </div>
            </div>

       </React.Fragment>
    )
}

export default Complogin
