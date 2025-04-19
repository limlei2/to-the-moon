import React, { useState, useEffect } from 'react'

import { useSelector } from "react-redux";
import { selectUser } from "../store/userSlice"

import { Link } from 'react-router-dom';

import { fetchHomeData } from '../api/stock-api';

const Home = () => {

  const user = useSelector(selectUser);
  const [stocks, setStocks] = useState([]);


  const fetchStocks = async () => {
    try {
      const result = await fetchHomeData();
      setStocks(result);
      console.log(result);
    } catch(err){
      setStocks({});
      console.log(err);
    }
  }

  useEffect(() => {
    fetchStocks();
  }, [user]);

  if(user){
    return (
      <div className="h-screen bg-black text-white p-12">
        Hi user
      </div>
    )
  } else {
    return (
      <div>
        <div className="min-h-screen bg-gray-900 text-white p-12 flex items-center">
          <div className="w-1/2">
            <h1 className="text-6xl font-bold mb-4" style={{fontFamily: 'TypeMachine, sans-serif'}}>to-the-moon</h1>
            <p className="text-2xl mb-8">
              Your all in one stock tracking app to help your investments skyrocket to the moon!
            </p>
            <p className="mb-4">
              to-the-moon is a free service! Get started now!
            </p>
            <Link to="/register" className="bg-yellow-300 hover:bg-yellow-500 text-blue-900 font-semibold py-2 px-4 rounded-full">
              Get Started
            </Link>
          </div>
          <div className="w-1/2 flex items-center justify-center">
            <img className="h-80" src="null" alt=""/>
          </div>
        </div>
        <div className="bg-[#68a4dc] p-12 flex items-center">
          <div className="w-1/2">
            <h1 className="text-3xl mb-2 text-gray-800" style={{fontFamily: 'TypeMachine, sans-serif'}}>Stay ahead of the game</h1>
            <p className="text-md mb-8 text-black">
            Leverage our advanced machine learning models to gain insights into stock market trends. 
            By tracking the stocks that matter most to you, you can develop a deeper understanding of 
            market dynamics. This tool is designed to assist you in making informed decisions before 
            investing your money, minimizing the potential risks.
            </p>
          </div>
          <div className="w-1/2 flex items-center justify-center">
            <img className="h-80" src="null" alt=""/>
          </div>
        </div>
  
        <div className="bg-[#e0ddcf] text-gray-900 p-12 flex items-center">
          <div className="w-1/2 flex items-center justify-center">
            <img className="h-80" src="null" alt=""/>
          </div>
          <div className="w-1/2">
            <h1 className="text-3xl mb-2" style={{fontFamily: 'TypeMachine, sans-serif'}}>Track all the major stocks, ETFs, and options available to the public</h1>
            <p className="text-md mb-8">
            Our platform connects you to a broad selection of US stocks. We offer nearly real-time 
            data to keep you informed and support your investment decisions. Whether you're monitoring market 
            trends or planning your next move, our tool helps you stay ahead.
            </p>
          </div>
        </div>
      </div>
    )
  }
  
}

export default Home
