import React from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { Link } from 'react-router-dom'

function PaymentFail() {
  return (
<>
<Header/>
 <div className="md:grid grid-cols-2 py-20 md:px-40  px-10 justify-center items-center">
                <div>
                    <h1 className='text-5xl text-red-600'>Sorry ! Your Payment is Unsucessful</h1>
                    <p className='mt-10 font-semibold'> We Apologies for the inconveience causes and we appreciate tyour visit to bookstore</p>
                    < Link to={'/all-books'}> <button className='bg-blue-600 text-white px-4 py-3 mt-10 hover:border hover:border-blue-600 hover:bg-white hover:text-blue-600'>Explore More Books</button></Link>
                </div>
                <div className='md:mt-0 mt-10'>
                    <img src="https://cdn.dribbble.com/userupload/23003310/file/original-6396208ee0571627a9e2e9987dcc1974.gif" alt="payment-fail-image"  className='w-3xl' />
                </div>
            </div>
            <Footer/>
</>
  )
}

export default PaymentFail