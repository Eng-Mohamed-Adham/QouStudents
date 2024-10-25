import * as React from "react";
import { useNavigate } from "react-router-dom";
import { FaPenToSquare } from "react-icons/fa6";
import { useGetStudentsQuery } from "./studentsApiSlice";
import useAuth from "../../hooks/useAuth";

export default function StudentTable() {
  const {
    data: students,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetStudentsQuery(undefined, {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  const navigate = useNavigate();
  const {isEmployee,isManager,isAdmin} = useAuth();

  let content;

  if (isLoading) {
    content = <p className="text-center text-gray-500">Loading...</p>;
  } else if (isError) {
    content = <p className="text-red-500 text-center">{error?.data?.message || "An error occurred."}</p>;
  } else if (isSuccess && students) {
    const { entities } = students;

    // Function to map student object to table data
    const createData = ({ 
      dateOfCourse, name, course, password, idNumber, midtearm, activity, final, tearm, completed, id ,from
    }) => ({
      dateOfCourse: Array.isArray(dateOfCourse) ? dateOfCourse.join(", ") : dateOfCourse,
      name,
      course: Array.isArray(course) ? course.join(", ") : course,
      password,
      idNumber,
      midtearm,
      activity,
      final,
      tearm,
      completed,
      id,
      from
    });
    const studentRows = Object.values(entities).map(createData);
    const catchHazemStd = studentRows.filter(student => student.from === "Hazem")


    const getTableContent = () => {
      if(isAdmin || isManager) {
        return studentRows
      }else if(isEmployee){
          return catchHazemStd
      }
      return ;
    }
   const TableContent =  getTableContent();

    content = (
      <div className="overflow-x-auto my-8 mx-auto max-w-6xl bg-white shadow-lg rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">ID Number</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Password</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date of Course</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Midterm</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Activity</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Final</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Term</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Completed</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">From</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Edit</th>

            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
              {
                
                TableContent.map((student,index) => (
                  <tr key={student.idNumber || index}>
                  <td className="px-6 py-4 text-right">
                    {student.idNumber}
                  </td>
                  <td className="px-6 py-4 text-right text-sm font-medium text-gray-900">
                    {student.name}
                  </td>
                  <td className="px-6 py-4 text-right text-sm font-medium text-gray-900">
                    {student.password}
                  </td>
                  <td className="px-6 py-4 text-left text-sm text-gray-500">
                    {student.course}
                  </td>
                  <td className="px-6 py-4 text-left text-sm text-gray-500">
                    {student.dateOfCourse}
                  </td>
                  <td className="px-6 py-4 text-left text-sm text-gray-500">
                    {student.midtearm}
                  </td>
                  <td className="px-6 py-4 text-left text-sm text-gray-500">
                    {student.activity}
                  </td>
                  <td className="px-6 py-4 text-left text-sm text-gray-500">
                    {student.final}
                  </td>
                  <td className="px-6 py-4 text-left text-sm text-gray-500">
                    {student.tearm}
                  </td>
                  <td className="px-6 py-4 text-left text-sm text-gray-500">
                    {student.completed ? "Yes" : "No"}
                  </td>
                  <td className="px-6 py-4 text-left text-sm text-gray-500">
                    {student.from}
                  </td>
                  <td className="px-6 py-4 text-left">
                    <button
                      className="text-blue-600 hover:text-blue-800"
                      onClick={() => navigate(`/dash/students/${student.id}`)}
                    >
                      <FaPenToSquare />
                    </button>
                  </td>
                </tr>
                  ))
                
   
                
              }
          </tbody>
        </table>
      </div>
    );
  }

  return content || null;
}
