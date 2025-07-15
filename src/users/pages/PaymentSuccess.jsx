import React from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { Link } from 'react-router-dom'

function PaymentSuccess() {
    return (
        <>
            <Header />
            <div className="md:grid grid-cols-2 py-20 md:px-40 px-10 justify-center items-center">
                <div>
                    <h1 className='md:text-5xl text-2xl text-blue-700'>CONGRATULATIONS</h1>
                    <p className='mt-10 font-semibold'> Thank you for shopping with Bookstore..Hope you have  a good time with us</p>
                    < Link to={'/all-books'}> <button className='bg-blue-600 text-white px-4 py-3 mt-10 hover:border hover:border-blue-600 hover:bg-white hover:text-blue-600'>Explore More Books</button></Link>
                </div>
                <div className='md:mt-0 mt-10'>
                    <img src="https://i.pinimg.com/originals/32/b6/f2/32b6f2aeeb2d21c5a29382721cdc67f7.gif" alt="payment-success-image" className='w-3/4' />
                </div>
            </div>
            <Footer />
        </>
    )
}

export default PaymentSuccess