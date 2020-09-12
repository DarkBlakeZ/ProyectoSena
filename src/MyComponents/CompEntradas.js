import React , {useEffect , useState} from 'react';
import CompForm from './ComponentForm';
import {db} from '../firebase';
import { toast } from 'react-toastify';

//import '../includes/boostrap'


const CompListEntradas = () => {

    const [entradas, setEntradas] = useState([]);
    const [registrados, setregistrados] = useState([]);
    const [IdActual, setIdActual] = useState("");
    
    const addOrEditForm = async (nomdoc,ObjectE) =>{

        try {
            if(IdActual===''){
        
                await db.collection('entradas').doc(nomdoc).set(ObjectE);
        
                toast('Agregado exitosamente',{
        
                    type: 'success'
        
                })
                }else{
                await db.collection('entradas').doc(IdActual).update(ObjectE);
        
                toast('Actualizado exitosamente',{
        
                    type: 'info'
        
                })
                IdActual('');
                }
        } catch (error) {
            console.error(error);
        }

        

    };

    const onDelete =async(id) =>{
        if(window.confirm('¿Esta seguro de querer eliminar la entrada?')){
            await db.collection('entradas').doc(id).delete();
            toast('Eliminado con exito',{
                type: 'error',
                autoClose: '2500'
            })
        }
    }

    const getEntradas = () => {
        db.collection('entradas').onSnapshot((querySnapshot)=>{
            const docs = [];
            querySnapshot.forEach((doc) => {
                docs.push({...doc.data(), id:doc.id});
            })
            setEntradas(docs)
        });  
    }

    const getregistradosByDocument = (docu) => {
        db.collection('registrados').doc(docu).onSnapshot((querySnapshot)=>{
            const docs = [];
            querySnapshot.forEach((doc) => {
                docs.push({...doc.data(), id:doc.id});
            })
            setregistrados(docs)
        });  
    }

    

    useEffect(()=>{
        getEntradas();
    },[])


    return(
    <React.Fragment>
        <div>
        <CompForm {...{addOrEditForm,IdActual,entradas,registrados,getregistradosByDocument,setEntradas}}/>
        {entradas.map(
            entrada => (
            <div className="entrada" key={entrada.id}>
                <p>Tipo persona : <span>{entrada.tipopersona}</span></p>
                <p>Documento: <span>{entrada.documento}</span></p>
                <p>Nombre: <span>{entrada.nombre}</span></p>
                <p>Fecha: <span>{entrada.fecha}</span></p>
                <p>Tiempo: <span>{entrada.tiempo}</span></p>
                <p>Placa: <span>{entrada.placa}</span></p>
                <p>Pertenencias: <span>{entrada.pertenencias}</span></p>
                <button type="button" className="btn btn-success" onClick={() => setIdActual(entrada.id)}>Editar</button>
                <button type="button" className="btn btn-danger" onClick={() => onDelete(entrada.id)}>Eliminar</button>
            </div>
            )
            

        )}
        </div>
    </React.Fragment>
)
    }


export default CompListEntradas