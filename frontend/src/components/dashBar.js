import { useState } from "react";
import useAuth from "../hooks/useAuth";
import { useSendLogoutMutation } from '../features/auth/authApiSlice';


import { Link, Outlet, useNavigate } from 'react-router-dom';

import MainFeaturedPost from './mainFeaturedPost';
import mainFeaturedPostImg from "./alkebeer-icon.jpeg";
import { FaBars, FaChevronLeft, FaHome, FaRegNewspaper, FaSignInAlt, FaUser } from "react-icons/fa";
import { TiUserAdd } from "react-icons/ti";
import { MdFeaturedPlayList } from "react-icons/md";
import { PiStudent, PiStudentFill } from "react-icons/pi";
import { RiLogoutBoxLine } from "react-icons/ri";

function IconButton({ onClick, children }) {
  return (
    <button onClick={onClick} className="p-2 text-white hover:text-gray-400">
      {children}
    </button>
  );
}

const DashBar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [sendLogout] = useSendLogoutMutation();
  const { isEmployee, isAdmin, isManager } = useAuth();


  // Handle logout functionality
  const handleLogout = async () => {
    await sendLogout();
    navigate('/');
  };

  const sidebarOfEmployee = [
    { icon: <FaHome />, label: 'الصفحة الرئيسية', link: '/dash',index:'1' },
    { icon: <PiStudentFill />, label: 'سجل الطلاب', link: '/dash/students/',index:'2' },
  ];

  const sideBarOfAdmin = [
    { icon: <FaHome />, label: 'الصفحة الرئيسية', link: '/dash' ,index:'3'},
    { icon: <FaRegNewspaper />, label: 'اضافة طالب', link: '/dash/students/new-student',index:'4' },
    { icon: <TiUserAdd />, label: 'اضافة مستخدم', link: '/dash/users/new-user',index:'5' },
    { icon: <MdFeaturedPlayList />, label: 'سجل الطلاب', link: '/dash/students',index:'6' },
    { icon: <FaUser />, label: 'سجل المستخدمين', link: '/dash/users' },
  ];


const sidebarOfManager = [
  { icon: <FaHome />, label: 'الصفحة الرئيسية', link: '/dash',index:'7' },
  { icon: <PiStudent />, label: 'سجل الطلاب', link: '/dash/students',index:'8' },
  // {icon:<FaSignInAlt/> , label:'أٌمرق',link:'/login',index:'9'}
];

  // Determine sidebar content based on user role
  const getSidebarContent = () => {
    if (isAdmin  ) {
      return sideBarOfAdmin;
    } else if (isEmployee) {
      return sidebarOfEmployee;
    }else if(isManager ){
      return sidebarOfManager
    }
  };

  const sidebarContent = getSidebarContent();


  const ToggleSidebar = () => {
    setOpen(!open);
  };


  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className={`bg-gray-900 text-white transition-all duration-300 ease-in-out ${open ? 'w-60' : 'w-16'} h-full`}>
        <div className="flex items-center justify-between p-4">
          <IconButton onClick={ToggleSidebar}>
            {open ? <FaChevronLeft /> : <FaBars />}
          </IconButton>
        </div>
        <ul className="space-y-4">
        {sidebarContent.map((item, index) => (
  
  <Link key={index} className="flex items-center px-4 py-2 hover:bg-gray-700" to={item.link}>
  <span className="text-xl">{item.icon}</span>
  <span className={`ml-4 ${open ? 'block' : 'hidden'}`}>{item.label}</span>
</Link>

))}
{
(isAdmin  || isManager) && 
<li className="flex items-center px-4 py-2 hover:bg-gray-700">
<span className="text-xl">
  <RiLogoutBoxLine />
</span>

<button onClick={handleLogout} className={`ml-4 ${open ? 'block' : 'hidden'}`}>
  الباب يفوت دحش
</button>
</li>
||
(isEmployee) &&
<Link to='/login' className="flex items-center px-4 py-2 hover:bg-gray-700">
<span className="text-xl"><FaSignInAlt /></span>
<span className={`ml-4 ${open ? 'block' : 'hidden'}`}>ادخل بردلك اليمين</span>
</Link> 
}
        
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4">
  
        
        <main>
          <Outlet />
        </main>
        
      </div>
    </div>
  );
};

export default DashBar;
