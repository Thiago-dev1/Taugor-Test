import { useEffect, useState } from 'react'
import { doc, DocumentData, getDoc} from 'firebase/firestore'
import { db } from '../firebase/config'
import { EmployeeApi } from '../types/EmployeeApi'


export const useFetchDocument = (docCollection: string, id: string) => {
    
    const [employee, setEmployee] = useState<EmployeeApi>({
        address: '',
        admissionDate: '',
        birthDate: '',
        email: '',
        firstName: '',
        gender: '',
        id: '',
        lastName: '',
        office: '',
        phone: '',
        salary: 0,
        sector: '',
        userId: ''
    })
    const [error, setErro] = useState(null)
    const [loading, setLoading] = useState(false)
    const [cancelled, setCancelled] = useState(false)

    async function loadData() {
        if(cancelled) return

        setLoading(true)

        
        try {
            const docRef = await doc(db, docCollection, id)

            const docSnap = await getDoc(docRef)
            console.log(docSnap.data())
            // @ts-ignore
            setEmployee(docSnap.data())
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(true)
        }
    }

    useEffect(() => {

        loadData()

    }, [docCollection, id, cancelled])

    useEffect(() => {
        return () => setCancelled(true)
    }, [])
 
    return { employee, loading, error }
}