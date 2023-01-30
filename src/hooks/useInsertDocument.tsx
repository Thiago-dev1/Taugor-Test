import { useState, useEffect, useReducer } from 'react'
import { db } from '../firebase/config'
import { collection, addDoc, Timestamp } from 'firebase/firestore'
import { Employee } from '../types/Employee';


export const useInsertDocument = (docCollection: string, uid: string) => {
    const [loading, setLoading] = useState(false)
    const [errorFirebase, setErrorFirebase] = useState('')



    // deal with memory leak
    const [cancelled, setCancelled] = useState(false);

    function checkifIsCancelled() {
        if (cancelled) {
            return
        }
    }

    const insertDocument = async (document: Employee) => {
        checkifIsCancelled()
        setLoading(true)
        let message = ''

        try {
            const newDocument = { ...document, createdAt: Timestamp.now(), updatedAt: Timestamp.now(), active: true, userId: uid };

            const insertedDocument = await addDoc(
                collection(db, docCollection),
                newDocument
            );

            

            const newEmployeeHistory = {
                address: document.address,
                email: document.email,
                phone: document.phone,
                office: document.office,
                salary: document.salary,
                idEmployee: insertedDocument.id}

             await addDoc(
                    collection(db, 'employeeHistory'),
                    newEmployeeHistory
                )
            
            message = 'Cadastrado com sucesso'
            
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

    return { insertDocument, errorFirebase, loading };
};