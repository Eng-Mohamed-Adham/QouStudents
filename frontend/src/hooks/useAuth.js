import { useSelector } from 'react-redux';
import { selectCurrentToken } from '../features/auth/authSlice';
import {jwtDecode} from 'jwt-decode'

const useAuth  = ()=> {
    const token = useSelector(selectCurrentToken)
    let isManager = false
    let isAdmin = false
    let isEmployee = true

    if(token) {
        const decoded = jwtDecode(token)
        const {name, roles} = decoded.UserInfo

        isManager = roles.includes('Manager')
        isAdmin = roles.includes('Admin')

        if(isManager) isEmployee ="Manager"
        if(isAdmin) isEmployee = "Admin"
        return {name, roles, isEmployee, isManager, isAdmin}

    }

    return {name:'' , roles:[], isManager, isAdmin,isEmployee}
}

export default useAuth

