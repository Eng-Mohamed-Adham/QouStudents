const express = require('express')
const router = express.Router()
const studentsConteroller = require('../controllers/studentController')
const verifyJWT = require('../middlewares/verifyJWT')

router.use(verifyJWT)



router.route('/')
.get(studentsConteroller.getStudents)
.post(studentsConteroller.addNewStudent)
.patch(studentsConteroller.updateStudent)
.delete(studentsConteroller.deleteStudent)



module.exports = router