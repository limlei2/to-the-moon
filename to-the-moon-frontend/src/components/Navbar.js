import React from 'react'

const Navbar = () => {
  return (
    <div className="flex flex-row">
        <h1>Logo</h1>
        <ul>
          <li>
            <a href="/home">Home</a>
          </li>
          <li>
            <a href="/home">About Us</a>
          </li>
        </ul>
        <button>Login</button>
        <button>Create Account</button>
    </div>
    
  )
}

export default Navbar
