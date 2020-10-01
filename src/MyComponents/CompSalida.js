import React , {useEffect , useState} from 'react';
import CompFormSalida from './ComponentSalida';
import {db} from '../firebase';
import { toast } from 'react-toastify';
//import AppM from './ModalListasalidas';


//import '../includes/boostrap'


const CompSalida = () => {

    const [salidas, setsalidas] = useState([]);
    
    const addSal = async (nomdoc,ObjectE) =>{

        try {
                await db.collection('salidas').doc(nomdoc).set(ObjectE);
        
                toast('Salida registrada Exitosamente',{
        
                    type: 'success'
        
                })
                
        } catch (error) {
            console.error(error);
        }

        

    };

    const getsalidas = () => {
        db.collection('salidas').onSnapshot((querySnapshot)=>{
            const docs = [];
            querySnapshot.forEach((doc) => {
                docs.push({...doc.data(), id:doc.id});
            })
            setsalidas(docs)
        });  
    }

    useEffect(()=>{
        getsalidas();
    },[])


    return(
    <React.Fragment>
        <div>
        <CompFormSalida {...{addSal,salidas,setsalidas}}/>
        
        
        </div>
    </React.Fragment>
)
    }

    //<AppMSalida {...{salidas,setsalidas, getsalidas}} />

export default CompSalida