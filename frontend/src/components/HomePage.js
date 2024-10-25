import React, { useState } from 'react';
import { FaHome, FaInfoCircle, FaSignInAlt, FaUserPlus, FaBars, FaTimes ,FaRegNewspaper,FaSign,FaUsers} from 'react-icons/fa';
// import Header from './Header';
import MainFeaturedPost from './mainFeaturedPost';
// import Footer from './Footer';

import mainFeaturedPoastImg from "./alkebeer-icon.jpeg";
import { useSendLogoutMutation } from '../features/auth/authApiSlice';
import useAuth from '../hooks/useAuth';


import { TiUserAdd } from "react-icons/ti";
import { MdFeaturedPlayList } from "react-icons/md";
import { PiStudentFill } from "react-icons/pi";
import { RiLogoutBoxFill } from "react-icons/ri";
import { Link, useNavigate } from 'react-router-dom';


export default function HomePage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);


  // Sidebar menu items
  const sidebarItems = [
    { icon: <FaHome />, label: 'الصفحة الرئيسية', link: '/',index:'7' },
    // { icon: <PiStudentFill />, label: 'سجل الطلاب', link: '/student-list',index:'2' },
    {icon:<FaSignInAlt/> , label:'ادخل بردلك اليمين',link:'/login',index:'9'}
  ];

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-900 to-black text-white">

      {/* Main Content */}
      <main className="flex-grow">
        {/* Main Featured Post */}
        <MainFeaturedPost post={{ title: 'المزاريطة تالنت', description: 'ياويلكم يا ريـــس ', image: mainFeaturedPoastImg,imageText:'AlKebeer Awy' }} />

        <div className="relative">
          <button
            onClick={toggleSidebar}
            className="fixed z-50 p-4 text-white bg-gray-800 rounded-full shadow-lg top-4 left-4 hover:bg-gray-700"
          >
            {isSidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>

          <div
            className={`fixed top-0 left-0 h-full bg-gray-800 transition-transform transform ${
              isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
            } w-64 p-6 shadow-lg`}
          >
            <h2 className="text-2xl font-bold mb-6">Menu</h2>
            <ul>
            {sidebarItems.map((item, index) => (
  
  <Link key={item.index} className="flex items-center px-4 py-2 hover:bg-gray-700" to={item.link}>
  <span className="text-xl">{item.icon}</span>
  <span className={`ml-4 ${isSidebarOpen ? 'block' : 'hidden'}`}>{item.label}</span>
</Link>

))}
{

}

          
          
            </ul>
          </div>
        </div>
      </main>

      {/* Footer */}
      {/* <Footer title="Golden Tech Associates" description="Golden Tech Associates is the Best Choice 💙" /> */}
    </div>
  );
}
