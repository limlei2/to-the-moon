import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Link } from 'react-router-dom';
import axios from "axios";

const Register = () => {
  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); 

  const navigate = useNavigate();

  async function submit(e) {
      e.preventDefault();
      try {
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/users/register`, { fName, lName, email, password });
        console.log(response);
        if (response.status === 201) {
          alert('Account created successfully! Redirecting you to login')
          navigate('/login');
          setFName("");
          setLName("");
          setEmail("");
          setPassword("");
        } else if (response.status === 401){
          alert('Invalid email or password');
        } else {
          alert('Internal Server Error')
        }
      } catch (error) {
        setError(error.response ? error.response.data.message : 'An error occurred during registration.');
        console.error('Error during login:', error);
        setPassword("");
      }

  }

  return (
        <div className="bg-black text-white min-h-screen flex items-center justify-center">
            <div className="bg-gray-900 shadow-lg rounded p-8 w-full max-w-md">
                <div>
                    <h1 className="text-white text-2xl font-semibold" style={{fontFamily: 'TypeMachine, sans-serif'}}>Register</h1>
                    <h2 className="mt-2 text-white">Create an account to get started!</h2>
                </div>
                <form className="mt-6 space-y-6" onSubmit={submit}>
                    <p>
                        <label className="block text-white">First Name</label>
                        <input type="text" placeholder="First Name" required
                            className="mt-2 block w-full rounded-md border-gray-600 bg-gray-700 focus:ring-indigo-500 focus:border-indigo-500 p-2.5 text-sm"
                            value={fName}
                            onChange={(e) => setFName(e.target.value)}
                        />
                    </p>
                    <p>
                        <label className="block text-white">Last Name</label>
                        <input type="text" placeholder="Last Name" required
                            className="mt-2 block w-full rounded-md border-gray-600 bg-gray-700 focus:ring-indigo-500 focus:border-indigo-500 p-2.5 text-sm"
                            value={lName}
                            onChange={(e) => setLName(e.target.value)}
                        />
                    </p>
                    <p>
                        <label className="block text-white">Email Address</label>
                        <input type="email" placeholder="name@example.com" required
                            className="mt-2 block w-full rounded-md border-gray-600 bg-gray-700 focus:ring-indigo-500 focus:border-indigo-500 p-2.5 text-sm"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </p>
                    <p>
                        <label className="block text-white">Password</label>
                        <input type="password" placeholder="password" required
                            className="mt-2 block w-full rounded-md border-gray-600 bg-gray-700 focus:ring-indigo-500 focus:border-indigo-500 p-2.5 text-sm"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </p>
                    <p>
                        <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md 
                          shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Register
                        </button>
                    </p>
                    {error && (
                        <div className="mt-4 bg-red-500 text-white p-2 rounded animate-pulse">
                            {error}
                        </div>
                    )}
                </form>
                <p className="mt-6 text-sm text-white">
                    Already registered? <Link to="/login" className="text-indigo-400 hover:text-indigo-300">Login here</Link>
                </p>
            </div>
        </div>
    );
}

export default Register
