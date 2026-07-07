import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { UserDataContext } from '../context/UserContext';

const UserSingup = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userData, setUserData] = useState('')

  const {user, setUser} = React.useContext(UserDataContext)

  const submitHandler = async (e) => {
    e.preventDefault()
    const newUser = {
      fullname:{
        firstname: firstName,
        lastname: lastName
      },
      email: email,
      password: password
    }
    const response = await axios.post(`${import.meta.env.VITE_BASEURL}/users/register`, newUser)

    if(response.status === 201){
      const data = response.data;
      setUser(data.user)
      localStorage.setItem('token', data.token)
      navigate('/home')
    }

    setEmail('')
    setFirstName('')
    setLastName('')
    setPassword('')
  }
  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
        <div>
        <img className='w-16 mb-10' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYQy-OIkA6In0fTvVwZADPmFFibjmszu2A0g&s" alt="" />

    <form onSubmit={(e)=>{
        submitHandler(e)
    }}>

        <h3 className="text-lg font-medium mb-2">What's your name</h3>
        <div className='flex gap-4 mb-6'>
        <input
        required
        className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-lg placeholder:text-base'
        type="text"
        placeholder="First name"
        value={firstName}
        onChange={(e) => {
          setFirstName(e.target.value)
        }}
        />
        <input
        require
        className='bg-[#eeeeee] w-1/2  rounded px-4 py-2 border text-lg placeholder:text-base'
        type="text"
        placeholder="Last name"
        value={lastName}
        onChange={(e) => {
        setLastName(e.target.value)
        }}
        />
        </div>

        <h3 className="text-lg font-medium mb-2">What's your email?</h3>
        <input
        required
        value={email}
        onChange={(e) => {
          setEmail(e.target.value)
        }}
        className='bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
        type="email"
        placeholder="email@example.com"
        />

        <h3 className='text-lg font-medium mb-2'>Enter Password</h3>

        <input
        required
        value={password}
        onChange={(e) => {
          setPassword(e.target.value)
        }}
        className='bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
        type="password"
        placeholder="password"
        />
        <button
        className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base'
        >Create account</button>

    </form>
        <p className='text-center'>Already have a account?<Link to='/login' className='text-blue-600'>Login here</Link></p>
    </div>
        <div>
            <p className='text-xs leading-tight'>
              By proceeding, you consent to get calls, WhatsApp or SMS messages, including
              by automated mean, from UBER and its affiliates to the number provided.
            </p>
        </div>
    </div>
  )
}


export default UserSingup
