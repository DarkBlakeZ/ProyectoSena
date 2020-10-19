import React , {useEffect , useState} from 'react';
import CompForm from './ComponentForm';
import {db} from '../firebase';
import { toast } from 'react-toastify';
import AppM from './ModalListaEntradas';


//import '../includes/boostrap'


const CompListEntradas = () => {

    const [entradas, setEntradas] = useState([]);
    const [registrados, setregistrados] = useState([]);
    const [IdActual, setIdActual] = useState("");
    
    let date = new Date().getDate(); //Current Date
    let month = new Date().getMonth() + 1; //Current Month
    const year = new Date().getFullYear(); //Current Year

    if(month<10){
        month = 0+month.toString()
    }

    if(date<10){
        date = 0+date.toString()
    }

    let fechaActId = year.toString()+month.toString()+date.toString()

    const addOrEditForm = async (nomdoc,ObjectE) =>{

        try {
            if(IdActual===''){
        
                await db.collection('entradas').doc(nomdoc+fechaActId).set(ObjectE);
        
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
        <CompForm {...{addOrEditForm,IdActual,setIdActual,entradas,registrados,getregistradosByDocument,setEntradas}}/>
        <AppM {...{entradas, onDelete, setIdActual,setEntradas, getEntradas}} />
        
        </div>
    </React.Fragment>
)
    }


export default CompListEntradas