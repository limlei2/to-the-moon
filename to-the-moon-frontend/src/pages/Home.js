import React, { useState } from 'react'

import { useSelector } from "react-redux";
import { selectUser } from "../store/userSlice"

import { Link } from 'react-router-dom';

const Home = () => {

  const user = useSelector(selectUser);

  return (
    <div className="min-h-screen bg-black text-white">
    <div className="bg-blue-900 text-white p-12 flex items-center">
      <div className="w-1/2">
        <h1 className="text-4xl font-bold mb-4">Stock Market Tracker</h1>
        <p className="text-2xl mb-8">
          Your all in one stock tracking app to help your investments skyrocket to the moon
        </p>
        <p className="mb-4">
          to-the-moon is a free service! Get started now!
        </p>
        <Link to="/register" className="bg-yellow-300 hover:bg-yellow-400 text-blue-900 font-semibold py-2 px-4 rounded-full">
          Get Started
        </Link>
      </div>
      <div className="w-1/2 flex items-center justify-center">
        <img className="h-80" src=""/>
      </div>
    </div>

    </div>
  )
}

export default Home
