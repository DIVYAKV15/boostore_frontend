import React from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLocationDot, faPaperPlane, faPhone, } from '@fortawesome/free-solid-svg-icons'

function Contact() {
  return (
    <>
      <Header />
      <div className='flex justify-center items-center flex-col md:mx-15 mx-2 my-2 md:my-10 overflow-hidden' >
        <h1 className='font-bold text-3xl mb-5'>Contact Us</h1>
        <p className='md:ms-20 ms-3 md:me-20 me-5 text-justify text-xl'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed qui numquam repellendus saepe porro amet cum quae, autem esse ad adipisci quod consequatur, quas id tenetur neque atque quibusdam? Dolores! Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam rem dolorem cumque amet facere, nulla fuga sapiente ratione voluptatum harum in iste laboriosam quod, aperiam inventore praesentium eos voluptates velit? Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet odit hic nesciunt eum necessitatibus inventore ratione dolor, minus fuga voluptatum saepe asperiores ducimus! Eligendi perspiciatis minima quibusdam minus iure dolores.</p>
      </div>
      {/* location ,address */}
      <div className='md:grid grid-cols-3 md:px-40 mx-30 my-15 '>
        <div className='flex md:mb-0 mb-3'>
          <div className='flex justify-center items-center bg-gray-300 me-3' style={{ width: '30px', height: '30px', borderRadius: '50%' }}><FontAwesomeIcon icon={faLocationDot} />
          </div>
          <p>123 Main Street, Apt 4B,<br></br>
            Anytown, CA 91234</p>
        </div>
        <div className='flex md:mb-0 mb-3'>
          <div className='flex justify-center items-center bg-gray-300 me-3' style={{ width: '30px', height: '30px', borderRadius: '50%' }}>
            <FontAwesomeIcon icon={faPhone} /></div>
          <p>+91 098765432</p>
        </div>
        <div className='flex md:mb-0 mb-3'>
          <div className='flex justify-center items-center bg-gray-300 me-3 p-2' style={{ width: '30px', height: '30px', borderRadius: '50%' }}>
            <FontAwesomeIcon icon={faEnvelope} /></div>
          <p>Bookstore@gmail.com</p>
        </div>
      </div>
      {/* form and map */}
      <div className="md:grid grid-cols-2 md:px-50 px-5 my-5">

        <div>
          <form action="" className='bg-gray-300 w-full  p-4 shadow '>

            <h3 className='text-2xl text-center my-4'>Send me message</h3>
            <div className='mb-3'>

              <input type="text" placeholder='Name' className='placeholder-gray-400
              bg-white w-full p-2 rounded'  /></div>
            <div className='mb-3'>

              <input type="text" placeholder='Email Id' className='placeholder-gray-400
              bg-white w-full p-2 rounded'  />
            </div>
            <div className='mb-3'>
              <textarea name="Message" id="" placeholder='Message' className='placeholder-gray-400
              bg-white w-full p-2 rounded'  rows="4" cols="50"  ></textarea>
            </div>
            <div className='mb-3'>
              <button className='w-full bg-black text-white py-3 text-xl px-3'>Send <FontAwesomeIcon icon={faPaperPlane} /></button>
            </div>
          </form>



        </div>

        <div className=' md:ms-10 ms-0 '>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28899.862104272313!2d55.11114055183148!3d25.11936453376806!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f1529c2653b15%3A0x3dcabcae764a3e16!2sPalm%20Jumeirah!5e0!3m2!1sen!2sae!4v1749443849620!5m2!1sen!2sae" width="100%" height="400" style={{ border: '0' }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>

      </div >
      <Footer />
    </>
  )
}

export default Contact