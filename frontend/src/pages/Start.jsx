import React from 'react'
import { Link } from 'react-router-dom';

const Start = () => {
    return (
        <div>
            <div className='bg-cover justify-end bg-bottom bg-[url(https://images.unsplash.com/photo-1619059558110-c45be64b73ae?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHRyYWZmaWMlMjBsaWdodHN8ZW58MHx8MHx8fDA%3D)] h-screen pt-8 flex  flex-col w-full'>
                <img className='w-16 absolute left-5 top-5' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
                    <div className='bg-white pb-7 py-4 px-4'>
                    <h2 className='text-[40px] font-bold'>Get Started with Uber</h2>
                    <Link to="/login" className='flex items-center justify-center w-full bg-black text-white py-3 rounded-lg mt-5'>Continue</Link>
                </div>
            </div>
        </div>
    )
}

export default Start
