import React, { useEffect, useState } from 'react';
import { FaHome, FaInfoCircle, FaSignInAlt, FaUserPlus, FaBars, FaTimes } from 'react-icons/fa';
// import Header from './Header';
import MainFeaturedPost from './mainFeaturedPost';
// import Footer from './Footer';

// import mainFeaturedPoastImg from "./alkebeer-icon.jpeg";
import img1 from './13.jpg'


export default function Welcome() {
 



  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Header Section */}
      {/* <Header title="Golden Tech Associates" sections={[]} /> */}

      {/* Main Content */}
      <main className="flex-grow">
        {/* Main Featured Post */}
        <MainFeaturedPost post={{ title: 'المزاريــطة ', description: 'اهلين بيـــك يا ولـــد أبووووي', image: img1,imageText:'AlKebeer Awy' }} />
     
      </main>

    </div>
  );
}
