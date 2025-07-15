import { faFacebook, faInstagram, faXTwitter } from '@fortawesome/free-brands-svg-icons'
import { faBars, faUser } from '@fortawesome/free-solid-svg-icons'
import { faPowerOff } from '@fortawesome/free-solid-svg-icons/faPowerOff'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { serverUrl } from '../../services/serverUrl'
import { userProfileUpdateStatusContext } from '../context/ContextShare'
import { useContext } from 'react'


function Header() {
    // initally it will false when user click the bar button it will become true
    const [clickStatus, setClickStatus] = useState(false)

    // when user clcik the profile dropdwn should appear
    const [dropDownStatus, setDropDownStatus] = useState(false)

    // page load aavum bo token yae kitanam
    const [accessToken, setAccessedToken] = useState("")

    // to access the userDetails here 
    const [userProfile, setUserProfile] = useState("")

    const navigate = useNavigate()

    // 
    const { userProfileUpdateStatus } = useContext(userProfileUpdateStatusContext)
    console.log(userProfile)

    const handleLogout = () => {
        sessionStorage.removeItem("existingUser")
        sessionStorage.removeItem("token")
        alert("Logout Successfully")
        navigate('/')
    }



    useEffect(() => {
        // if token availabel in session storage 
        if (sessionStorage.getItem("token")) {
            // then keep that acccessed token in setAccessedToken 
            setAccessedToken(sessionStorage.getItem("token"))
            setUserProfile(JSON.parse(sessionStorage.getItem('existingUser')).profile)
        }
    }, [userProfileUpdateStatus])

    // console.log(userProfile)


    return (
        <>
            <div className='p-3 flex justify-between items-center'>
                <div className='flex items-center'>
                    <img src="https://img.freepik.com/premium-vector/books_733786-119.jpg?semt=ais_hybrid&w=740" alt="Book_img" style={{ width: '60px', height: '60px' }} />

                </div>
                <h1 className='text-xl md:hidden flex font-bold ms-3'>BOOK STORE</h1>
                <div className='ms-20'>
                    <h1 className='text-3xl hidden md:flex font-bold'>BOOK STORE</h1>
                </div>


                {/* icons */}
                <div className='flex items-center' >
                    <div className='md:flex hidden'>
                        <FontAwesomeIcon icon={faInstagram} className='mx-2' />
                        <FontAwesomeIcon icon={faFacebook} className='mx-2' />
                        <FontAwesomeIcon icon={faXTwitter} className='mx-2' />
                    </div>
                    <div className='md:flex hidden'>
                        {!accessToken ? <Link to={'/login'}> <button className='ms-5 px-4 py-3 border border-black rounded cursor-pointer' ><FontAwesomeIcon icon={faUser} className='me-2' />Login</button></Link>
                            : <div className="relative inline-block text-left">
                                <div>
                                    <button onClick={() => setDropDownStatus(!dropDownStatus)} type="button" className="inline-flex w-full justify-center gap-x-1.5 rounded-md px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs  " id="menu-button" aria-expanded="true" aria-haspopup="true">
                                        <img src={userProfile == "" ? "https://static.vecteezy.com/system/resources/thumbnails/042/156/821/small_2x/user-3d-graphic-illustration-free-png.png" : userProfile.startsWith('https') ? userProfile : `${serverUrl}/uploads/${userProfile}}`} alt="user_icon" style={{ width: '50px', height: '50px' }} referrerPolicy='no-referrer' />

                                    </button>
                                </div>


                                {dropDownStatus && <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-hidden" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                                    <div className="py-1" role="none">

                                        <Link to={'/profile'}><a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="menu-item-0"><FontAwesomeIcon icon={{ faUser }} />Profile</a></Link>
                                        <a onClick={handleLogout} href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="menu-item-0"><FontAwesomeIcon icon={faPowerOff} /> LogOut</a>

                                    </div>
                                </div>}
                            </div>}
                    </div>
                </div>
            </div>
            <nav className='bg-gray-900 p-3 '>
                <div className='flex md:hidden justify-between items-center'>
                    <FontAwesomeIcon icon={faBars} style={{ color: 'white' }} onClick={() => setClickStatus(!clickStatus)} className='cursor-pointer' />
                    {/* if token is not there then it show login button or else profile button */}
                    {!accessToken ? <Link to={'/login'}> <button className='ms-5 px-4 py-3 border border-white  text-white rounded' ><FontAwesomeIcon icon={faUser} className='me-2' />Login</button></Link>
                        : <div className="relative inline-block text-left">
                            <div>
                                <button onClick={() => setDropDownStatus(!dropDownStatus)} type="button" className="inline-flex w-full justify-center gap-x-1.5 rounded-md  px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs " id="menu-button" aria-expanded="true" aria-haspopup="true">
                                    <img
                                        src={userProfile == "" ? "https://static.vecteezy.com/system/resources/thumbnails/042/156/821/small_2x/user-3d-graphic-illustration-free-png.png" : userProfile.startsWith('https') ? userProfile : `${serverUrl}/uploads/${userProfile}}`

                                            // userProfile
                                            //     ? userProfile.startsWith('https')?userProfile
                                            //     :{serverUrl/uploads/${userProfile}}` "https://static.vecteezy.com/system/resources/thumbnails/042/156/821/small_2x/user-3d-graphic-illustration-free-png.png":`$
                                        }
                                        alt="user_icon" referrerPolicy='no-referrer'
                                        style={{ width: '50px', height: '50px', borderRadius: '50%' }}
                                    />
                                    {/* no-referrer */}
                                    {/* <svg className="-mr-1 size-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                                    <path fill-rule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                                </svg> */}
                                </button>
                            </div>


                            {dropDownStatus && <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-hidden" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                                <div className="py-1" role="none">

                                    <Link to={'/profile'}><a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="menu-item-0"><FontAwesomeIcon icon={{ faUser }} />Profile</a></Link>
                                    <a onClick={handleLogout} href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="menu-item-0"><FontAwesomeIcon icon={faPowerOff} /> LogOut</a>

                                </div>
                            </div>}
                        </div>}
                </div>
                {/* md:it will show as flex but in small screen it will be hidden depend upon the user clcik it will show  */}
                <ul className={clickStatus ? '  text-white' : 'text-white md:flex hidden justify-center me-10 mt-4 md:mt-0'}>
                    <Link to={'/'}>
                        <li className='px-3'>Home</li></Link>
                    <Link to={'/all-books'}>
                        <li className='px-3'>Book</li>
                    </Link>
                    <Link to={'/careers'}><li className='px-3'>Careers</li></Link>
                    <Link to={'/contact'}>
                        <li className='px-3'>Contact</li></Link>
                </ul>

            </nav>

        </>
    )
}

export default Header
