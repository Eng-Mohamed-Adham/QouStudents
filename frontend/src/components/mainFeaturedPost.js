import React from 'react';
import PropTypes from 'prop-types';

function MainFeaturedPost({ post }) {
  return (
    <div
      className="relative bg-gray-800 text-white h-screen w-screen bg-cover bg-center rounded-lg overflow-hidden"
      style={{ 
        backgroundImage: `url(${post.image})`, 
        backgroundSize: 'cover', // لتغطية الخلفية بالكامل
        backgroundPosition: 'center', // لتوسيط الصورة
        borderRadius: '20px', // إضافة حواف ناعمة
        overflow: 'hidden', // منع تجاوز المحتوى خارج الحدود المستديرة
      }}
      id="about"
    >
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-30 rounded-lg" />

      <div className="container mx-auto px-4 py-8 md:py-16 h-full flex items-center">
        <div className="md:w-1/2 relative bg-opacity-75 p-6 rounded-lg">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">{post.title}</h1>
          <p className="text-lg md:text-xl mb-6">{post.description}</p>
          <a href="#" className="text-blue-400 hover:underline">
            {post.linkText}
          </a>
        </div>
      </div>
    </div>
  );
}

MainFeaturedPost.propTypes = {
  post: PropTypes.shape({
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    imageText: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default MainFeaturedPost;
