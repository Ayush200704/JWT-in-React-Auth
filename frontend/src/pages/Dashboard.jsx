import React from 'react'
import { useAuth } from '../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate()
  const { name, logout } = useAuth();
  const handleLogout = () => {
    logout();
    console.log("logout successfully")
    navigate("/login")
  }

  return (
    <>
      <h1 className='text-4xl m-5'>DashBoard</h1>
      <h1 className='text-xl m-5'>hello {name}</h1>
      <button
        className='bg-sky-800 m-5 text-xl text-white p-2 rounded-md'
        onClick={handleLogout}
      >logout</button>

    </>
  )
}

export default Dashboard