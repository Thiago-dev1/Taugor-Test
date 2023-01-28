import { useEffect, useState } from 'react'
import { collection, query, orderBy, onSnapshot, where } from 'firebase/firestore'
import { db } from '../firebase/config'
import { async } from '@firebase/util'
import { EmployeeApi } from '../types/EmployeeApi'


export const useFetchDocuments = (docCollection: string, uid: string) => {
    
    const [employees, setEmployees] = useState<EmployeeApi[]>([])
    const [error, setErro] = useState(null)
    const [loading, setLoading] = useState(false)
    const [cancelled, setCancelled] = useState(false)

    async function loadData() {
        if(cancelled) return

        setLoading(true)

        const collectionRef = collection(db, docCollection)
        
        try {
            let q

            // if(uid) {

            //     q = query(collectionRef, where('uid', '==', uid), orderBy('createdAt', 'desc'))
            // } else {
            //     q = query(collectionRef, orderBy('createdAt', 'desc'))
            // } 
            
            q =  query(collection(db, docCollection), where('userId', '==', uid))
            
            console.log(q)

            onSnapshot(q, (querysnapshot) => {
                // @ts-ignore
                setEmployees(querysnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                })))
            })

            // console.log(employees)
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
 
    return { employees, loading, error }
}