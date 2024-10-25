import { store } from '../../app/store'
import { usersApiSlice } from '../users/usersApiSlice';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import {studentsApiSlice} from '../students/studentsApiSlice'

const Prefetch = () => {
    useEffect(() => {
        const students = store.dispatch(studentsApiSlice.endpoints.getStudents.initiate())
        const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate())
       
        
        return () => {
            users.unsubscribe()
            students.unsubscribe()
        }
    }, [])

    return <Outlet />
}
export default Prefetch