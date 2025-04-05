import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="dark:bg-black w-full z-20 top-0 start-0">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src="https://cdn0.iconfinder.com/data/icons/coloricons/50/50X50-02-1024.png" className="h-14" alt="to-the-moon"/>
            <span className="self-center text-3xl font-semibold whitespace-nowrap dark:text-white" style={{fontFamily: 'TypeMachine, sans-serif'}}>to-the-moon</span>
        </a>

        <div className="flex">
          <Link to="/login"><button type="button" className="border border-white text-white bg-black hover:bg-white hover:text-black transition focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-3xl text-md px-6 py-2 text-center mx-2">Login</button></Link>
          <Link to="/register"><button type="button" className="text-white bg-indigo-600 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-3xl text-md px-6 py-2 text-center mx-2">Get Started</button></Link>
        </div>
        
      </div>
    </nav>
  )
}

export default Navbar
