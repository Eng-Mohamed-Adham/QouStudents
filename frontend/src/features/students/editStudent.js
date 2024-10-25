import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectStudentById } from './studentsApiSlice'
import EditStudentForm from './editStudentForm'

const EditStudent = () => {
    const { id } = useParams()

    const student = useSelector(state => selectStudentById(state, id))

    const content = student ? <EditStudentForm student={student} /> : <p>Loading...</p>

    return content
}
export default EditStudent