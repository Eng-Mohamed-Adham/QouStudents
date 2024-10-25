import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaSave, FaTrashAlt, FaPlus, FaMinus } from "react-icons/fa";
import { useDeleteStudentMutation, useUpdateStudentMutation } from "./studentsApiSlice";

// استيراد ملف الصوت
import sound1 from '../../components/sound2.mp3';  // قم بتعديل المسار بناءً على مكان ملف الصوت
import sound2 from '../../components/sound3.mp3'


const EditStudentForm = ({ student }) => {
  const [updateStudent, { isLoading, isSuccess, isError }] = useUpdateStudentMutation();
  const [deleteStudent, { isSuccess: isDelSuccess, isError: isDelError }] = useDeleteStudentMutation();
  const navigate = useNavigate();

  // State variables for each field
  const [name, setName] = useState(student.name || "");
  const [password, setPassword] = useState(student.password || "");
  const [coursePairs, setCoursePairs] = useState(
    student.course?.map((courseItem, index) => ({ course: courseItem, date: student.dateOfCourse[index] })) || [
      { course: "", date: "" },
    ]
  );
  const [midtearm, setMidtearm] = useState(student.midtearm || "");
  const [activity, setActivity] = useState(student.activity || "");
  const [final, setFinal] = useState(student.final || "");
  const [tearm, setTearm] = useState(student.tearm || "");
  const [completed, setCompleted] = useState(student.completed || "");
  const [idNumber, setIdnumber] = useState(student.idNumber || "");
  const [from,setFrom] = useState(student.from || "")
  useEffect(() => {
    if (isSuccess || isDelSuccess) {
      // Reset form and navigate back after successful operation
      resetForm();
      navigate("/dash/students");
    }
  }, [isSuccess, isDelSuccess, navigate]);

  const resetForm = () => {
    setName("");
    setPassword("");
    setCoursePairs([{ course: "", date: "" }]);
    setMidtearm("");
    setActivity("");
    setFinal("");
    setTearm("");
    setCompleted("");
    setIdnumber("");
  };

  // Handlers for input changes
  const onNameChanged = (e) => setName(e.target.value);
  const onPasswordChanged = (e) => setPassword(e.target.value);
  const onMidtearmChanged = (e) => setMidtearm(e.target.value);
  const onActivityChanged = (e) => setActivity(e.target.value);
  const onFinalChanged = (e) => setFinal(e.target.value);
  const onTearmChanged = (e) => setTearm(e.target.value);
  const onCompletedChanged = (e) => setCompleted(e.target.value);
  const onIdnumberChanged = (e) => setIdnumber(e.target.value);
  const onFromChange = (e) => setFrom(e.target.value)

  const onCoursePairChanged = (index, key, value) => {
    const updatedPairs = [...coursePairs];
    updatedPairs[index][key] = value;
    setCoursePairs(updatedPairs);
  };

  const addCoursePair = () => {
    setCoursePairs([...coursePairs, { course: "", date: "" }]);
  };

  const removeCoursePair = (index) => {
    const updatedPairs = coursePairs.filter((_, i) => i !== index);
    setCoursePairs(updatedPairs);
  };
    // دالة لتشغيل الصوت
    const playSound = (audioFile) => {
      const audio = new Audio(audioFile);
      audio.play();
    };

  // Submit handler
  const onSaveStudentClicked = async () => {
    const courses = coursePairs.map((pair) => pair.course);
    const dates = coursePairs.map((pair) => pair.date);

    if (!student.id) {
        console.error("Student ID is missing!");
        return;
    }

    await updateStudent({
        id: student.id,
        name,
        password,
        course: courses,
        dateOfCourse: dates,
        midtearm,
        activity,
        final,
        tearm,
        idNumber,
        from
    });
    playSound(sound1);  // تشغيل صوت النجاح

};


  // Delete handler
  const onDeleteStudentClicked = async () => {
    await deleteStudent({ id: student.id });
    playSound(sound2);  // تشغيل صوت النجاح

  };

  // Validate if the form can be submitted
  const canSave =
    [name, tearm, idNumber].every(Boolean) &&
    coursePairs.length > 0 && 
    !isLoading;

  return (
    <div className="max-w-2xl mx-auto mt-16 p-8 bg-white shadow-lg rounded-lg">
      <h3 className="text-3xl font-semibold text-center mb-6">Edit Student</h3>

      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          id="name"
          placeholder="Student Name"
          value={name}
          onChange={onNameChanged}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="password"
          id="password"
          placeholder="Password (Optional)"
          value={password}
          onChange={onPasswordChanged}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {coursePairs.map((pair, index) => (
          <div key={index} className="flex space-x-2">
            <input
              type="text"
              placeholder="Course"
              value={pair.course}
              onChange={(e) => onCoursePairChanged(index, "course", e.target.value)}
              className="w-1/2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Date of Course"
              value={pair.date}
              onChange={(e) => onCoursePairChanged(index, "date", e.target.value)}
              className="w-1/2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {index > 0 && (
              <button
                type="button"
                onClick={() => removeCoursePair(index)}
                className="p-2 text-red-600 hover:text-red-800"
              >
                <FaMinus />
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={addCoursePair}
          className="flex items-center justify-center p-2 mt-2 text-green-600 hover:text-green-800"
        >
          <FaPlus className="mr-1" /> Add Another Course
        </button>

        <input
          type="text"
          id="midtearm"
          placeholder="Midtearm Score"
          value={midtearm}
          onChange={onMidtearmChanged}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          id="activity"
          placeholder="Activity Score"
          value={activity}
          onChange={onActivityChanged}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          id="final"
          placeholder="Final Score"
          value={final}
          onChange={onFinalChanged}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          id="tearm"
          placeholder="Tearm"
          value={tearm}
          onChange={onTearmChanged}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          id="completed"
          placeholder="Completion Status"
          value={completed}
          onChange={onCompletedChanged}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="number"
          id="idnumber"
          placeholder="Number (ID)"
          value={idNumber}
          onChange={onIdnumberChanged}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
         <input
          type="text"
          id="From"
          placeholder="From"
          value={from}
          onChange={onFromChange}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          onClick={onSaveStudentClicked}
          disabled={!canSave}
          className={`w-full p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition focus:outline-none ${
            !canSave ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <FaSave className="inline-block mr-2" /> Save
        </button>

        <button
          type="button"
          onClick={onDeleteStudentClicked}
          className="w-full p-3 mt-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition focus:outline-none"
        >
          <FaTrashAlt className="inline-block mr-2" /> Delete
        </button>
      </form>
    </div>
  );
};

export default EditStudentForm;
