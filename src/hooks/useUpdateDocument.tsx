import { useState, useEffect, useReducer } from 'react'
import { db } from '../firebase/config'
import { collection, addDoc, Timestamp, doc, updateDoc } from 'firebase/firestore'
import { Employee } from '../types/Employee';


export const useUpdateDocument = (docCollection: string) => {
    const [loading, setLoading] = useState(false)
    const [errorFirebase, setErrorFirebase] = useState('')



    // deal with memory leak
    const [cancelled, setCancelled] = useState(false);

    function checkifIsCancelled() {
        if (cancelled) {
            return
        }
    }

    const updateDocument = async (data: any, id: string) => {
        checkifIsCancelled()
        setLoading(true)
        let message


        try {
            const docRef = await doc(db, docCollection, id)

            console.log(data, id)


            // @ts-ignore
            const updatedDocument = await updateDoc(docRef, data)
            
            const newEmployeeHistory = {...data, idEmployee: id}



            if (data.active == false) {
                const t = await addDoc(
                    collection(db, 'employeeHistory'),
                    newEmployeeHistory
                )

            }

            message = 'Atualizado com sucesso'
            
            return message
            
        } catch (error) {
            // @ts-ignore
            setErrorFirebase(error.message)
            return errorFirebase
        }
        setLoading(false)
    };

    useEffect(() => {
        return () => setCancelled(true);
    }, []);

    return { updateDocument, errorFirebase, loading };
};