import { useEffect, useState } from 'react'
import { collection, query, orderBy, onSnapshot, where } from 'firebase/firestore'
import { db } from '../firebase/config'
import { async } from '@firebase/util'
import { EmployeeApi } from '../types/EmployeeApi'


export const useFetchDocuments = (docCollection: string, uid: string) => {
    
    const [documents, setDocuments] = useState<EmployeeApi[]>([])
    const [error, setErro] = useState(null)
    const [loading, setLoading] = useState(false)
    const [cancelled, setCancelled] = useState(false)

    async function loadData() {
        if(cancelled) return

        setLoading(true)

        const collectionRef = collection(db, docCollection)
        
        try {
            let q
            
            if (docCollection == 'employees') {
                q =  query(collection(db, docCollection), where('userId', '==', uid))
                q = query(collection(db, docCollection), where('active', '==', true))
            } else {
                q =  query(collection(db, docCollection), where('idEmployee', '==', uid))
            }
            
            onSnapshot(q, (querysnapshot) => {
                // @ts-ignore
                setDocuments(querysnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                })))
            })

            setLoading(false)

        } catch (error) {
            // @ts-ignore
            setErro(error.message)
            setLoading(false)
        }
    }

    useEffect(() => {

        loadData()

    }, [docCollection, uid, cancelled])

    useEffect(() => {
        return () => setCancelled(true)
    }, [])
 
    return { documents, loading, error }
}