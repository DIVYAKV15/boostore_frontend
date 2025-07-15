import { faPowerOff } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function AdminHeader() {
    const navigate = useNavigate()

    // Logout function
    
    const handleLogout = () => {
        sessionStorage.removeItem("existingUser")
        sessionStorage.removeItem("token")
        navigate('/')

    }
    return (
        <>
            <nav className='px-4 py-3 flex'>



                <div className='flex  items-center'>
                    <img src="https://img.freepik.com/premium-vector/books_733786-119.jpg?semt=ais_hybrid&w=740" alt="Book_img" style={{ width: '60px', height: '60px' }} />
                    <h1 className='text-3xl hidden md:flex font-bold ms-2'>Book Store</h1>
                </div>
                <div className='ms-auto'>
                    <button type='button' onClick={handleLogout} className='border rounded px-4 py-3'><FontAwesomeIcon icon={faPowerOff} className='me-3' />Logout</button>
                </div>

            </nav>
            <div className='bg-gray-900 p-3 w-full text-center text-2xl text-white '>
                <p>Welcome,Admin! <br></br>You're all set to manage and monitor the system.Let's go to work!</p>
            </div>
        </>
    )
}

export default AdminHeader