import React from 'react'

const Navbar = () => {
  return (
    <nav className="dark:bg-black w-full z-20 top-0 start-0">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src="https://cdn0.iconfinder.com/data/icons/coloricons/50/50X50-02-1024.png" className="h-14" alt="to-the-moon"/>
            <span className="self-center text-3xl font-semibold whitespace-nowrap dark:text-white">to-the-moon</span>
        </a>
        
        <div className="items-center justify-between">
          <ul className="flex flex-row p-4 text-md space-x-8 dark:bg-black">
            <li>
            <a href="#" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Home</a>
            </li>
            <li>
              <a href="#" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">About</a>
            </li>
            <li>
              <a href="#" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Services</a>
            </li>
            <li>
              <a href="#" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Contact</a>
            </li>
          </ul>
        </div>
        <div className="flex">
          <a href="/login"><button type="button" className="border border-white text-white bg-black hover:bg-white hover:text-black transition focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-3xl text-md px-6 py-2 text-center mx-2">Login</button></a>
          <a href="/register"><button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-3xl text-md px-6 py-2 text-center mx-2">Register</button></a>
        </div>
        
      </div>
    </nav>
  )
}

export default Navbar
