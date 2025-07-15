import React from 'react'

function PageNotFound() {
    return (
        <div className='grid grid-cols-3 w-full h-screen'>
            <div></div>
            <div className='flex justify-center  items-center flex-col'>
                <img src="https://t3.ftcdn.net/jpg/02/29/46/30/360_F_229463039_B4KwKD6ifdRV8G5S0sqrzBrAfHNzpReq.jpg" alt=""  className='w-full mb-5'/>
                <div className='text-center '>
                    <p>Oh NO!</p>
                    <h1 className='text-5xl mt-3'>Looks Like You're Lost</h1>
                    <p className='mt-3 text-xl'>The page you are looking for is not available</p>
                </div>
                <button className='mt-5 bg-blue-900 text-white px-4 py-3 hover:bg-white hover:border
                hover:border-blue-900 hover:text-blue-900 text-xl' >Back Home</button>
            </div>
            <div></div>
        </div>
    )
}

export default PageNotFound