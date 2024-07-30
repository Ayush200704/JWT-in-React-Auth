import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
import { useAuth } from '../context/AuthContext.jsx'

const Login = () => {
    const navigate = useNavigate();
    const { setToken, setName } = useAuth();
    const [data, setData] = useState({
        email: "",
        password: ""
    })
    const [error, setError] = useState("");
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        axios
            .post("http://localhost:5000/api/auth/login", data)
            .then(res => {
                if (res.status === 200) {
                    console.log("login successfully")
                    setToken(res.data.token)
                    setName(res.data.name)
                    navigate("/")
                } else {
                    console.log(`error code: ${res.data.code}`)
                    setToken(null)
                    setError(res.data.message)
                    navigate("/login")
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }
    return (
        <>
            < div className='p-4' >
                <h1 className='text-4xl my-4'>Login</h1>
                <div className='flex flex-col border-2 border-sky-600 w-[600px] p-4 mx-auto rounded-lg'>
                    {error && <p className='text-red-500'>{error}</p>}
                    <form onSubmit={handleSubmit}>
                        <div className='my-4'>
                            <label className='text-xl text-gray-500 m-4'>Email: </label>
                            <input
                                type='text'
                                className='border-2 border-sky-600 rounded-lg text-black w-full px-4 py-2'
                                name='email'
                                value={data.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='my-4'>
                            <label className='text-xl text-gray-500 m-4'>Password: </label>
                            <input
                                type='password'
                                className='border-2 border-sky-600 rounded-lg text-black w-full px-4 py-2'
                                name='password'
                                value={data.password}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='flex justify-center my-4'>
                            <button
                                type='submit'
                                className='bg-sky-800 text-xl text-white p-2 rounded-md'
                            >Login</button>
                            <Link to="/signup" className='bg-sky-800 text-xl text-white p-2 mx-2 rounded-md'><button 
                            type='submit'>Sign up</button></Link>
                        </div>
                    </form>
                </div>
            </div >
        </>
    )
}

export default Login