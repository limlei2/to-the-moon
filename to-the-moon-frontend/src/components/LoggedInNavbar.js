import React from 'react'

const LoggedInNavbar = () => {
  return (
    <div>
        <h1>Logo</h1>
        <ul>
          <li>
            <a href="/home">Home</a>
          </li>
          <li>
            <a href="/home">Dashboard</a>
          </li>
          <li>
            <a href="/login">Portfolio</a>
          </li>
        </ul>
        <button>Sign Out</button>
    </div>
  )
}

export default LoggedInNavbar
