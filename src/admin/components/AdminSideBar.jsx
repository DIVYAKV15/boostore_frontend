import { faBagShopping, faBars, faBook, faGear } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { serverUrl } from '../../../services/serverUrl'
import { useContext } from 'react'
import { adminProfileUpdateStatusContext } from '../../context/ContextShare'

function AdminSideBar() {
    // when the user choose the option we have to naviagate to that page 
    // so to move one page to another page in js 
    // we use useNavigate hook whereas in JSX we use link
    const navigate = useNavigate()
    // doubt:as we are redirecting the component in single component or else it will not needed
    // when the user check the radio option when it admin home then the option button is shown in blue color whereas when it loading in new components like admin_book,careers,setting there also admin side bar is there so it will re render again so for other option its not showing the blue color
    const [homeCheckedStatus, setHomeCheckedStatus] = useState(false);
    const [bookCheckedStatus, setBookCheckedStatus] = useState(false);
    const [careersCheckedStatus, setCareersCheckedStatus] = useState(false);
    const [settingsCheckedStatus, setSettingsCheckedStatus] = useState(false);
    // to keep the data from the existing user
    const [details, setDetails] = useState({
        profile: "",
        username: ""
    })
    const filter = (options) => {
        // we can directly set the setHomeCheckedStatus data here because admin side bar is in all the page so it will reload again it wnot show the selected option in highlighted( blue color)
        if (options == 'home') {
            navigate('/admin-home')
        } else if (options == 'book') {
            navigate('/admin-books')
        } else if (options == 'careers') {
            navigate('/admin-careers')
        } else if (options == 'settings') {
            navigate('/admin-setting')
        } else {
            navigate('*')
        }
    }

    // use the state 
    const { adminProfileUpdateStatus } = useContext(adminProfileUpdateStatusContext)
    // add the stae in the dependency 
    // as it is a state we can add as dependency
    useEffect(() => {
        if (sessionStorage.getItem("token")) {

            let user = JSON.parse(sessionStorage.getItem("existingUser"))
            // in the existing user we have all the username,profile,bio,password key and value so taking it from there
            setDetails({ profile: user?.profile, username: user?.username })
        }
    }, [adminProfileUpdateStatus])


    useEffect(() => {
        // console.log(location.pathname)//opt:admin-home by accessing the pathname we are going to change the state so the option can be seen in highlighted
        if (location.pathname == '/admin-home') {
            setHomeCheckedStatus(true);
        } else if (location.pathname == '/admin-books') {
            setBookCheckedStatus(true);
        }
        else if (location.pathname == '/admin-careers') {
            setCareersCheckedStatus(true);
        }
        else if (location.pathname == '/admin-setting') {
            setSettingsCheckedStatus(true);
        }
    }, [])
    return (
        <>
            <div className='bg-gray-200 w-full md:h-screen flex items-center flex-col'>
                <div className="my-10">
                    <img src={details.profile == "" ? "https://static.vecteezy.com/system/resources/thumbnails/042/156/821/small_2x/user-3d-graphic-illustration-free-png.png" : `${serverUrl}/uploads/${details.profile}`} alt="user_img" style={{ width: '170px', height: '170px', borderRadius: '50%' }} />

                </div>
                <h1 className='text-2xl mb-10'>{details.username}</h1>
                {/* radio options -> and grouping the radio button by using name attribute so at a time only one radio button can be selected */}
                {/* to avoid this error : give readOnly in input fielsAdminSideBar.jsx:55 You provided a `checked` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultChecked`. Otherwise, set either `onChange` or `readOnly` */}
                <div className='mb-10'>
                    <div className="mb-4" onClick={() => filter('home')}>
                        <input type="radio" id='home' className='me-3' name='path' readOnly checked={homeCheckedStatus} />
                        <label htmlFor="home"><FontAwesomeIcon icon={faBars} className='me-3' /> Home</label>
                    </div>
                    <div className="mb-4" onClick={() => filter('book')}>
                        <input type="radio" id='home' className='me-3' name='path' readOnly checked={bookCheckedStatus} />
                        <label htmlFor="home"><FontAwesomeIcon icon={faBook} className='me-3' /> Books</label>
                    </div>
                    <div className="mb-4" onClick={() => filter('careers')}>
                        <input type="radio" id='home' className='me-3' name='path' readOnly checked={careersCheckedStatus} />
                        <label htmlFor="home"><FontAwesomeIcon icon={faBagShopping} className='me-3' /> Careers</label>
                    </div>
                    <div className="mb-4" onClick={() => filter('settings')}>
                        <input type="radio" id='home' className='me-3' name='path' readOnly checked={settingsCheckedStatus} />
                        <label htmlFor="home"><FontAwesomeIcon icon={faGear} className='me-3' /> Settings</label>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminSideBar