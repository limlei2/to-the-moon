import React from 'react'
import Search from './Search'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { logout } from '../../store/userSlice';

const LoggedInNavbar = () => {

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="dark:bg-black w-full z-20 top-0 start-0">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src="https://cdn0.iconfinder.com/data/icons/coloricons/50/50X50-02-1024.png" className="h-14" alt="to-the-moon"/>
            <span className="self-center text-3xl font-semibold whitespace-nowrap dark:text-white" style={{fontFamily: 'TypeMachine, sans-serif'}}>to-the-moon</span>
        </Link>
        <div>
          <Search />
        </div>
        <div className="items-center justify-between">
          <ul className="flex flex-row p-4 text-lg space-x-8 dark:bg-black">
            <li>
            <Link to="/dashboard" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Dashboard</Link>
            </li>
            <li>
              <Link to="/portfolio" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Portfolio</Link>
            </li>
          </ul>
        </div>
        <div className="flex">
          <a href="/"><button onClick={handleLogout} type="button" className="border border-white text-white bg-black hover:bg-white hover:text-black transition focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-3xl text-lg px-6 py-2 text-center mx-2">Log Out</button></a>
        </div>
      </div>
    </nav>
  )
}

export default LoggedInNavbar
