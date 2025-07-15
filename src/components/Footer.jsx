import { faFacebook, faInstagram, faLinkedin, faXTwitter } from '@fortawesome/free-brands-svg-icons'
import { faArrowRight, faHeart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

function Footer() {
    return (
        <>
            <div>
                <div className='md:grid grid-cols-3 bg-blue-950 text-white md:p-10 p-5'>
                    <div className='md:mb-0 mb-5 '>
                        <h1 className='text-2xl'>ABOUT US</h1>
                        <p className='mt-4 text-justify'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut modi, obcaecati atque quam animi mollitia libero quae sint provident nemo dicta iure, molestiae explicabo tenetur amet autem pariatur! Dolorum, maiores.</p>
                    </div>
                    <div className='md:flex justify-center md:mb-0 mb-5' >
                        <div >
                            <h1 className='text-2xl'>NEWSLETTER</h1>
                            <p className='mt-4 text-justify'>Stay updated with our latest trends</p>
                            <div className='flex mt-4'>
                                <input type="text" placeholder='Email Id' className='bg-white p-2 placeholder:text-gray-400' />
                                <button className='bg-amber-400 py-2 px-3 text-black'><FontAwesomeIcon icon={faArrowRight}/></button>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h1 className='text-2xl'>FOLLOW US</h1>
                        <p className='mt-4 text-justify'>Let us be Social</p>
                        <div className='flex gap-4 mt-4'>
                            <FontAwesomeIcon icon={faInstagram} />
                            <FontAwesomeIcon icon={faFacebook}  />
                            <FontAwesomeIcon icon={faXTwitter}  />
                            <FontAwesomeIcon icon={faLinkedin}  />
                        </div>
                    </div>
                    <div>

                    </div>
                </div>
            </div>
            <div className='bg-black p-2 text-center'>
                <p className='text-white '>Copyright &copy;  {new Date().getFullYear()} All rights reserved | This Website made with by <span className='text-amber-300'><FontAwesomeIcon icon={faHeart} className='mx-1' /></span>Luminar</p>

            </div>
        </>
    )
}

export default Footer