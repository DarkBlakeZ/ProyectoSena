import React , {useEffect , useState} from 'react';
import CompFormReg from './ComponentFormReg';
import {db} from '../firebase';
import { toast } from 'react-toastify';
import AppMR from './ModalListaRegistrados';

//import '../includes/boostrap'


const CompListRegistrados = () => {

    const [registrados, setregistrados] = useState([]);
    const [IdActual, setIdActual] = useState("");
    
    const addOrEditFormReg = async (nomdoc,ObjectR) =>{

        try {

        
            if(IdActual===''){
        
                await db.collection('registrados').doc(nomdoc).set(ObjectR);
        
                toast('Agregado exitosamente',{
        
                    type: 'success'
        
                })
                }else{
                await db.collection('registrados').doc(IdActual).update(ObjectR);
        
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
        if(window.confirm('¿Esta seguro de querer eliminar el usuario?')){
            await db.collection('registrados').doc(id).delete();
            toast('Eliminado con exito',{
                type: 'error',
                autoClose: '2500'
            })
        }
    }

    const getregistrados = () => {
        db.collection('registrados').onSnapshot((querySnapshot)=>{
            const docs = [];
            querySnapshot.forEach((doc) => {
                docs.push({...doc.data(), id:doc.id});
            })
            setregistrados(docs)
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
        getregistrados();
    },[])


    return(
    <React.Fragment>
        <div>
        <CompFormReg {...{addOrEditFormReg,IdActual,registrados,getregistradosByDocument,setregistrados}}/>
        <AppMR {...{registrados, onDelete, setIdActual,setregistrados, getregistrados}} />
        
        </div>
    </React.Fragment>
)
    }


export default CompListRegistrados