import * as React from "react";
import { useGetUsersQuery } from "./usersApiSlice";
import { useNavigate } from "react-router-dom";
import { FaPenToSquare } from "react-icons/fa6";


export default function UsersTable() {
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery(undefined, {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  const navigate = useNavigate();
  let content;

  if (isLoading) content = <p className="text-center text-gray-500">Loading...</p>;

  if (isError) {
    content = <p className="text-red-500 text-center">{error?.data?.message}</p>;
  }

  if (isSuccess && users) {
    const { entities } = users;

    // Function to map user object to table data
    const createData = ({  roles, name, image,password ,id}) => ({
     
      roles,
      name,
      image,
      password,
      id
    });

    const userRows = Object.values(entities).map(createData);
    content = (
      <div className="overflow-x-auto my-8 mx-auto max-w-6xl bg-white shadow-lg rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Roles</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Edit</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {userRows.map((user,index) => (
              <tr key={user.id}>
                <td className="px-6 py-4 text-right">
                  <img
                    className="w-12 h-12 rounded-full"
                    src={user.image}
                    alt={user.name}
                  />
                </td>
                <td className="px-6 py-4 text-right text-sm font-medium text-gray-900">
                  {user.name}
                </td>
                <td className="px-6 py-4 text-left text-sm text-gray-500">
                  {user.roles.join(", ")}
                </td>
                <td className="px-6 py-4 text-left">
                  <button
                    className="text-blue-600 hover:text-blue-800"
                    onClick={() => navigate(`/dash/users/${user.id}`)}
                  >
                    <FaPenToSquare />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return content || null;
}
