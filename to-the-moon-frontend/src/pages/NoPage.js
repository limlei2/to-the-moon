import React from 'react';
import { Link } from 'react-router-dom';

const NoPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-8 text-gray-400">Oops! The page you're looking for doesn't exist.</p>
      <Link 
        to="/" 
        className="px-6 py-3 bg-blue-600 rounded-2xl hover:bg-blue-700 transition"
      >
        Return Home
      </Link>
    </div>
  );
};

export default NoPage;
