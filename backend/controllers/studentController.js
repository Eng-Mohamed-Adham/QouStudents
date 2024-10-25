const Student = require('../models/students')
const asyncHandler = require('express-async-handler')

//@desc Get all students
//@route GET /students
//@access Private
const getStudents = asyncHandler(async (req, res) => {
  const students = await Student.find().lean();

  // التحقق إذا لم يتم العثور على أي طالب
  if (!students || students.length === 0) {
      return res.status(404).json({ message: 'No students found' });
  }

  // إرجاع قائمة الطلاب إذا تم العثور عليهم
  res.status(200).json(students);
});


//@desc Create a New Student
//@route Post /student/new
//@access Private
const addNewStudent = asyncHandler(async (req, res) => {
  const { name, password, idNumber, course, dateOfCourse, midtearm, activity, final, tearm,from } = req.body;

  console.log(name, password, idNumber, course, dateOfCourse, midtearm, activity, final, tearm);

  // Confirm Data
  if (!name || !password || !idNumber || !Array.isArray(course) || !course.length || !tearm) {
    return res.status(400).json({ message: 'All fields are required...!' });
  }

  // Check if the student is already registered
  const existingStudent = await Student.findOne({ name }).lean().exec();

  if (existingStudent) {
    // Check if the student is already registered in the same term
    const isDuplicateTearm = existingStudent.tearm === tearm;

    if (isDuplicateTearm) {
      return res.status(400).json({ message: 'Duplicated student in the same term. Please try again with new student :)' });
    } else {
      // Student exists but in a different term, allow creation
      console.log(`Student with ID ${idNumber} already exists, but in a different term.`);
    }
  }

  // Create new student object
  const userObject = { name, password, idNumber, course, dateOfCourse, midtearm, activity, final, tearm,from };

  // Create the new student in the database
  const student = await Student.create(userObject);

  if (student) {
    return res.status(201).json({ message: `New student ${name} created` });
  } else {
    res.status(400).json({ message: 'Invalid student data received' });
  }
});

//@desc Update a student 
//@route PATCH /student
//@access Private
const updateStudent = asyncHandler(async (req, res) => {
  const { name, password, idNumber, course, dateOfCourse, midtearm, activity, final, tearm, id,from } = req.body;

  // Confirm all required data is present
  if (!name || !password || !idNumber || !course?.length || !id) {
      return res.status(400).json({ message: 'All fields are required, including ID!' });
  }

  // Check if the student exists
  const student = await Student.findById(id).exec(); // Use findById instead of findOne

  if (!student) {
      return res.status(404).json({ message: 'Student not found' }); // 404 is more appropriate here
  }

  // Update the student's fields
  student.name = name;
  student.password = password;
  student.idNumber = idNumber;
  student.course = course;
  student.dateOfCourse = dateOfCourse;
  student.midtearm = midtearm;
  student.activity = activity;
  student.final = final;
  student.tearm = tearm;
  student.from = from
  const updatedStudent = await student.save();

  res.json({ message: `${updatedStudent.name} updated successfully` });
});



//@desc Delete a student 
//@route DELETE /users
//@access Private
const deleteStudent = asyncHandler(async (req, res) => {
  const { id } = req.body;

  // Confirm the student ID is provided
  if (!id) {
      return res.status(400).json({ message: 'Student ID is required' });
  }

  // Check if the student exists
  const student = await Student.findById(id).lean().exec(); // استخدام id بشكل مباشر

  if (!student) {
      return res.status(404).json({ message: 'Student not found' });
  }

  

  // Proceed with deleting the student
  await Student.deleteOne({ _id: id }); // تمرير المعرف بشكل صحيح هنا

  res.status(204).json({ message: `Student with ID ${id} deleted successfully` });
});


module.exports = {
    getStudents,
    addNewStudent,
    updateStudent,
    deleteStudent
}