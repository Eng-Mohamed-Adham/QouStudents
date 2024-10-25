import { Route, Routes } from 'react-router';
import './App.css';
import PersistLogin from './features/auth/PersistLogin';
import RequireAuth from './features/auth/RequireAuth';
import Prefetch from './features/auth/Prefetch';
import { ROLES } from './config/roles';
import Layout from './components/Layout';
import HomePage from './components/HomePage';
import DashLayout from './components/dashLayout';
import Login from './components/Login';
import Welcome from './components/welcome';
import UsersTable from './features/users/userTable';
import EditUser from './features/users/editUser';
import NewUserForm from './features/users/newUserForm';
import EditStudent from './features/students/editStudent';
import StudentTable from './features/students/studentTable';
import NewStudentForm from './features/students/newStudentForm';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Don't forget to import the CSS for Toastify

function App() {
  return (
    <>
      {/* تأكد من وضع ToastContainer هنا بحيث يظهر على كل الصفحات */}
      <ToastContainer 
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <Routes>
        <Route path='/login' element={<Login />} />

        <Route path='/' element={<Layout />}>
          {/* Public Routes */}
          <Route index element={<HomePage />} />

          {/* Protected Routes */}
          <Route element={<PersistLogin />}>
            <Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}>
              <Route element={<Prefetch />}>
                <Route path='dash' element={<DashLayout />}>
                  <Route index element={<Welcome />} />

                  <Route path='students'>
                    <Route index element={<StudentTable />} />
                    <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
                      <Route path=':id' element={<EditStudent />} />
                      <Route path='new-student' element={<NewStudentForm />} />
                    </Route>
                  </Route>

                  <Route element={<RequireAuth allowedRoles={[ROLES.Manager, ROLES.Admin]} />}>
                    <Route path='users'>
                      <Route index element={<UsersTable />} />
                      <Route path=':id' element={<EditUser />} />
                      <Route path='new-user' element={<NewUserForm />} />
                    </Route>
                  </Route>
                </Route>
              </Route>
            </Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
