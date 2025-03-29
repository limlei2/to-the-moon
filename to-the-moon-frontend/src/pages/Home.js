import React, { useState } from 'react'

import { useSelector } from "react-redux";
import { selectUser } from "../store/userSlice"

const Home = () => {

  const user = useSelector(selectUser);

  return (
    <div>
      {user?(
        <h1>Hello User</h1>
      ):(
        <h1>Hello Random</h1>
      )}
    </div>
  )
}

export default Home
