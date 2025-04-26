import React, { useState } from 'react'
import Search from './Search'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { logout } from '../../store/userSlice';
import Dropdown from './Dropdown';
import { toast } from "react-toastify";
import { MenuIcon, XIcon } from '@heroicons/react/outline';

const LoggedInNavbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
    toast.info("Logged Out")
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="dark:bg-black w-full z-20 top-0 start-0 border-b border-gray-800">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">

        {/* Logo */}
        <Link 
          to="/" 
          className="flex items-center space-x-3 transform transition-all duration-300 ease-in-out hover:scale-110 hover:brightness-125"
        >
          <img src="https://cdn0.iconfinder.com/data/icons/coloricons/50/50X50-02-1024.png" className="h-12 w-12" alt="to-the-moon" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white" style={{ fontFamily: 'TypeMachine, sans-serif' }}>
            to-the-moon
          </span>
        </Link>

        {/* Mobile Menu Button */}
        <div className="flex items-center sm:hidden">
          <button onClick={toggleMenu} className="text-gray-400 hover:text-white focus:outline-none">
            {menuOpen ? <XIcon className="w-8 h-8" /> : <MenuIcon className="w-8 h-8" />}
          </button>
        </div>

        {/* Search Bar */}
        <div className="hidden sm:block sm:w-auto sm:ml-4 transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-md">
          <Search />
        </div>

        {/* Nav Links and Dropdown */}
        <div className={`w-full sm:flex sm:w-auto ${menuOpen ? "block" : "hidden"}`}>
          <ul className="flex flex-col sm:flex-row items-center text-lg space-y-4 sm:space-y-0 sm:space-x-8 dark:bg-black mt-4 sm:mt-0">
            <li>
              <Link
                to="/dashboard"
                onClick={() => setMenuOpen(false)}
                className="block py-2 px-4 text-gray-900 rounded transform transition-all duration-300 ease-in-out hover:scale-110 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/portfolio"
                onClick={() => setMenuOpen(false)}
                className="block py-2 px-4 text-gray-900 rounded transform transition-all duration-300 ease-in-out hover:scale-110 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Portfolio
              </Link>
            </li>
            <li>
                <Dropdown
                  label="Menu"
                  items={[
                    { label: "Profile", href: "/profile" },
                    { label: "Logout", onClick: handleLogout },
                  ]}
                />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default LoggedInNavbar
