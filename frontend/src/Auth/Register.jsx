import React, { useState } from 'react'
import {Link, useNavigate } from 'react-router-dom'
import axios from "axios"

const Register = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    })
    const [error, setError] = useState("")
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setError("")

        if(data.password != data.confirmPassword){
            setError("password do not match")
            return;
        }
        axios
            .post("http://localhost:5000/api/auth/signup", data)
            .then(res => {
                if (res.status === 200) {
                    console.log(res.data.status)
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
                <h1 className='text-4xl my-4'>Register</h1>
                <div className='flex flex-col border-2 border-sky-600 w-[600px] p-4 mx-auto rounded-lg'>
                    {error && <p className='text-red-500'>{error}</p>}
                    <form onSubmit={handleSubmit}>
                        <div className='my-4'>
                            <label className='text-xl text-gray-500 m-4'>Username: </label>
                            <input
                                type='text'
                                className='border-2 border-sky-600 rounded-lg text-black w-full px-4 py-2'
                                name="name"
                                value={data.name}
                                onChange={handleChange}
                            />
                        </div>
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
                        <div className='my-4'>
                            <label className='text-xl text-gray-500 m-4'>Confirm Password: </label>
                            <input
                                type='password'
                                className='border-2 border-sky-600 rounded-lg text-black w-full px-4 py-2'
                                name='confirmPassword'
                                value={data.confirmPassword}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='flex justify-center my-4'>
                            <button
                                type='submit'
                                className='bg-sky-800 text-xl text-white p-2 rounded-md'
                            >Sign up</button>
                            <Link to="/login" className='bg-sky-800 text-xl text-white p-2 mx-2 rounded-md'><button 
                            type='submit'>Login</button></Link>
                        </div>
                    </form>
                </div>
            </div >
        </>
    )
}

export default Register



