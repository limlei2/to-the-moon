import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectUser } from '../store/userSlice';

const Profile = () => {
    const [fName, setFName] = useState('');
    const [lName, setLName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const user = useSelector(selectUser)

    useEffect(() => {
        const fetchUser = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/users/${user.id}`, {
            headers: { Authorization: `Bearer ${user.token}` }
            });
            const { fName, lName, email } = res.data;
            setFName(fName);
            setLName(lName);
            setEmail(email);
        } catch (err) {
            setError('Could not fetch user.');
        }
        };

        fetchUser();
    }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    const payload = {
      fName,
      lName,
      email,
    };
    
    if (password) {
      payload.password = password;
    }
    try {
        const res = await axios.patch(`${process.env.REACT_APP_BACKEND_URL}/api/users/${user.id}`, payload, 
          {
            headers: { Authorization: `Bearer ${user.token}` }
          });
          setMessage("Profile updated successfully.");
          setPassword('');
          setConfirmPassword('');
    } catch (err) {
      setError('Update failed.');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white px-36 py-12">
      <h2 className="text-3xl font-bold mb-8">Profile</h2>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-lg">
        <div className="flex flex-row">
          <div>
            <label className="block mb-1 text-sm font-medium">First Name</label>
            <input
              type="text"
              name="fName"
              value={fName}
              onChange={(e) => setFName(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Last Name</label>
            <input
              type="text"
              name="lName"
              value={lName}
              onChange={(e) => setLName(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">New Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Leave blank to keep current password"
            className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label className="block mb-1 text-sm font-medium">Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Re-enter new password"
            className={`w-full bg-zinc-900 border rounded-lg px-4 py-2 ${
              password && confirmPassword && password !== confirmPassword
                ? 'border-red-500'
                : 'border-zinc-700'
            }`}
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 transition-colors px-6 py-2 rounded-lg font-semibold"
        >
          Update Account
        </button>

        {message && <p className="text-green-400">{message}</p>}
        {error && <p className="text-red-400">{error}</p>}
      </form>
    </div>
  );
};

export default Profile;
