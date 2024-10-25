import { useReducer, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaSave, FaTrashAlt, FaPlus, FaMinus } from "react-icons/fa";
import { useAddNewStudentMutation } from "./studentsApiSlice";
import Toastify from 'toastify-js';
// استيراد ملف الصوت
import sound1 from '../../components/sound2.mp3';  // قم بتعديل المسار بناءً على مكان ملف الصوت
import sound2 from '../../components/sound3.mp3'


// Reducer to manage form state
const formReducer = (state, action) => {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    case "ADD_COURSE_PAIR":
      return { ...state, coursePairs: [...state.coursePairs, { course: "", date: "" }] };
    case "REMOVE_COURSE_PAIR":
      return { ...state, coursePairs: state.coursePairs.filter((_, i) => i !== action.index) };
    case "RESET":
      return action.initialState;
    default:
      return state;
  }
};

const NewStudentForm = () => {
  const initialState = {
    name: "",
    password: "",
    coursePairs: [{ course: "", date: "" }],
    midtearm: "",
    activity: "",
    final: "",
    tearm: "",
    completed: "",
    idNumber: "",
    from: ""
  };

  const [state, dispatch] = useReducer(formReducer, initialState);
  const [addNewStudent, { isLoading, isSuccess, isError }] = useAddNewStudentMutation();
  const navigate = useNavigate();

  // Reset form and navigate on success
  useEffect(() => {
    if (isSuccess) {
      Toastify({ text: "Student added successfully!", duration: 3000, backgroundColor: "green" }).showToast();
      dispatch({ type: "RESET", initialState });
      navigate("/dash/students");
    }
    if (isError) {
      Toastify({ text: "Failed to add student!", duration: 3000, backgroundColor: "red" }).showToast();
    }
  }, [isSuccess, isError, navigate]);
   // دالة لتشغيل الصوت
   const playSound = (audioFile) => {
    const audio = new Audio(audioFile);
    audio.play();
  };

  // Handlers for input changes
  const onFieldChanged = (field) => (e) => dispatch({ type: "SET_FIELD", field, value: e.target.value });
  const onCoursePairChanged = (index, key, value) => {
    const updatedPairs = [...state.coursePairs];
    updatedPairs[index][key] = value;
    dispatch({ type: "SET_FIELD", field: "coursePairs", value: updatedPairs });
  };

  // Submit handler
  const onSaveStudentClicked = async () => {
    const courses = state.coursePairs.map((pair) => pair.course);
    const dates = state.coursePairs.map((pair) => pair.date);
    if (canSave) {
      await addNewStudent({
        name: state.name,
        password: state.password,
        course: courses,
        dateOfCourse: dates,
        midtearm: state.midtearm,
        activity: state.activity,
        final: state.final,
        tearm: state.tearm,
        completed: state.completed,
        idNumber: state.idNumber,
        from:state.from
      });
      playSound(sound1)
      Toastify({ text: "Succsessfuly...", duration: 3000, backgroundColor: "green" }).showToast();

    } else {
      Toastify({ text: "Please fill all required fields.", duration: 3000, backgroundColor: "red" }).showToast();
    }
  };

  // Validate if the form can be submitted
  const canSave = [state.name, state.coursePairs.length > 0, state.idNumber].every(Boolean) && !isLoading;

  return (
    <div className="max-w-2xl mx-auto mt-16 p-8 bg-white shadow-lg rounded-lg">
      <h3 className="text-3xl font-semibold text-center mb-6">New Student</h3>

      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          id="name"
          placeholder="Student Name"
          value={state.name}
          onChange={onFieldChanged("name")}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          id="password"
          placeholder="Password (Optional)"
          value={state.password}
          onChange={onFieldChanged("password")}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {state.coursePairs.map((pair, index) => (
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
                onClick={() => dispatch({ type: "REMOVE_COURSE_PAIR", index })}
                className="p-2 text-red-600 hover:text-red-800"
              >
                <FaMinus />
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={() => dispatch({ type: "ADD_COURSE_PAIR" })}
          className="flex items-center justify-center p-2 mt-2 text-green-600 hover:text-green-800"
        >
          <FaPlus className="mr-1" /> Add Another Course
        </button>

        <input
          type="text"
          id="midtearm"
          placeholder="Midterm Score"
          value={state.midtearm}
          onChange={onFieldChanged("midtearm")}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          id="activity"
          placeholder="Activity Score"
          value={state.activity}
          onChange={onFieldChanged("activity")}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          id="final"
          placeholder="Final Score"
          value={state.final}
          onChange={onFieldChanged("final")}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          id="tearm"
          placeholder="Term"
          value={state.tearm}
          onChange={onFieldChanged("tearm")}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          id="completed"
          placeholder="Completion Status"
          value={state.completed}
          onChange={onFieldChanged("completed")}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="number"
          id="idNumber"
          placeholder="Number (ID)"
          value={state.idNumber}
          onChange={onFieldChanged("idNumber")}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
         <input
          type="text"
          id="From"
          placeholder="From"
          value={state.from}
          onChange={onFieldChanged("from")}
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
      </form>
    </div>
  );
};

export default NewStudentForm;
