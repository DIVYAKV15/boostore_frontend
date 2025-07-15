import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import { googleLoginApi, loginApi, regiserApi } from '../../services/allAPi'
import { GoogleLogin } from '@react-oauth/google'
import { jwtDecode } from "jwt-decode";
// destructuring register
function Auth({ register }) {
  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    password: ""
  })
  // console.log(userDetails);

  // to move one page to another in js we use -> useNavigate
  const navigate = useNavigate()

  // regiester function

  const handleRegister = async () => {
    const { username, email, password } = userDetails
    if (!username || !password || !email) {
      toast.info('please fill the form comnpletely ')
    } else {
      // in backend -> userController whatever the key we are setting there in destrucutring must be the same name here or else
      // key(from that userController):value(from here)
      // or else same name password
      const result = await regiserApi({ username, password, email })
      console.log(result)
      // we can see the data inside response key : data key
      // we can the result to cross check check in mongodb atlas where we can the data has been added or evn we can in the backend where we console the receiving data 
      // this 200 we set in backend
      if (result.status == 200) {
        toast.success("Registration successful")
        // once registration is done then move to login page
        navigate('/login')
        // reset the data
        setUserDetails({
          username: "",
          email: "",
          password: ""
        })
      } else if (result.status == 406) {
        // if already user exist
        toast.warning(result.response.data)
        // no need to navigate just reset
        setUserDetails({
          username: "",
          email: "",
          password: ""
        })
      } else {
        // if any server error just rest the data
        toast.error('something went wrong')
        setUserDetails({
          username: "",
          email: "",
          password: ""
        })
      }
    }
  }

  // login function

  const handleLogin = async () => {
    const { email, password } = userDetails;
    if (!email || !password) {
      toast.info('please enter all the deatils')
    } else {
      const loginResult = await loginApi({ email, password })
      console.log(loginResult)
      if (loginResult.status == 200) {
        toast.success('Successfully Login')
        // storage session to store in browser 
        // we got the data in existimnguser so setting that data 

        sessionStorage.setItem('existingUser', JSON.stringify(loginResult.data.
          existingUser))
        // saving the token  and we can able to see this in existinguser and token in  browser -> session storage
        sessionStorage.setItem('token', loginResult.data.token)
        setUserDetails({
          username: "",
          email: "",
          password: ""
        })
        // if its admin it has to move to admin page
        if (loginResult.data.existingUser.email == 'boostoreadmin@gmail.com') {
          setTimeout(() => {
            navigate('/admin-home')
          }, 2002);
        } else {
          // if we direclty moving to home page we can see the successfully login message as we set that to dispaly for 2s 
          // so we are moving to home page after 2 s
          setTimeout(() => {
            navigate('/')
          }, 2002);
        }


      }
      else if (loginResult.status == 403 || loginResult.status == 406) {
        toast.warning(loginResult.response.data)
        setUserDetails({
          username: "",
          email: "",
          password: ""
        })
      } else {
        toast.error("something went wrong")
        setUserDetails({
          username: "",
          email: "",
          password: ""
        })
      }

    }
  }

  // handle google login 

  const handleGoogleLogin = async (credentialResponse) => {
    // console.log(credentialResponse)
    // to send the userdetails to backend then only the user can access our website 
    // from credentialResponse we receive credential and clientID 
    // so to decode the credential to get the user details
    // we are using one external library - > json decode
    // and install in 
    // and import it 
    // then pass the key from credentialResponse 
    // in the details we can take all the details like username,email,picture ..no password 
    // bcause pwd is handled by google 
    // as password is required to store in db 
    // we are going to save it with dummy pwd in backend
    const details = jwtDecode(credentialResponse.credential)
    console.log(details)
    const result = await googleLoginApi({ username: details.name, email: details.email, password: 'googlepwd', photo: details.picture })
    console.log(result)
    if (result.status == 200) {
      toast.success("Login SUccessfully")
      sessionStorage.setItem("existingUser", JSON.stringify(result.data.
        existingUser))
      sessionStorage.setItem("token", result.data.token)
      setTimeout(() => {
        navigate('/')
      }, 2002);
    } else {
      toast.error('Something went Wrong')
    }
  }


  return (
    <>
      <div id='loginPage' className='flex justify-center items-center flex-col'>
        <h1 className='text-4xl font-bold'>BOOK STORE</h1>
        <div className='md:grid grid-cols-3 w-full mt-10' >
          <div></div>
          {/* form */}
          <div>
            <form className='bg-gray-900 p-10  rounded flex justify-center items-center flex-col '>
              <div className='flex justify-center items-center' style={{ width: '70px', height: '70px', borderRadius: '50%', border: '1px solid  white' }}>
                <FontAwesomeIcon icon={faUser} style={{ color: 'white' }} className='fa-2x' />
              </div>
              {register ? <h1 className=' text-white text-2xl my-4'>Register</h1> :
                <h1 className=' text-white text-2xl mt-4 mb-2'>Login</h1>}
              {register && <div className='mb-3 w-full'>
                <input value={userDetails.username} onChange={(e) => setUserDetails({ ...userDetails, username: e.target.value })} type="text" placeholder='Username..' className='w-full bg-white rounded p-2' />
              </div>}
              <div className='mb-3 w-full'>
                <input value={userDetails.email} onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })} type="text" placeholder='Email Address..' className='bg-white rounded p-2 w-full' />
              </div>
              <div className='mb-3 w-full'>
                <input value={userDetails.password} onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })} type="text" placeholder='Password..' className='bg-white rounded p-2 w-full' />
              </div>

              <div className='my-3 w-full'>

                {register ?
                  <button type='button' onClick={handleRegister} className='bg-green-700 text-white p-2 rounded w-full hover:bg-green-800'>Register</button>
                  :
                  <button type='button' onClick={handleLogin} className='bg-green-700 rounded w-full p-2 text-white hover:bg-green-800'>
                    Login
                  </button>

                }
              </div>
              {/* when register is false */}
              {!register && <div> <p className='text-white'>--------------------------or-------------------------</p>
                <div className='my-3 w-full'>
                  {/* <button className='bg-white rounded w-full p-2 text-black hover:bg-gray-300'>
                    Google Login
                  </button> */}
                  <GoogleLogin
                    onSuccess={credentialResponse => {
                      // console.log(credentialResponse); op:
                      // {credential: 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjhlOGZjOGU1NTZmN2E3Nm…g-byoGEqU4ZnFg7gmhM42g6J7clmt_e5wg20-G6lvSsM2fPlQ', clientId: '518329189710-bulrq0avhu08qvbaklo30go7sr1p5gof.apps.googleusercontent.com', select_by: 'btn_confirm'}

                      //  clientId and credential response (its a token ) so passing this in function

                      handleGoogleLogin(credentialResponse)

                    }}
                    onError={() => {
                      // console.log('Login Failed');
                      toast.error("Login Failed")
                    }}
                  />;
                </div></div>}
              <div className='text-white'>
                {register ?
                  <p>Are you a Already User? <Link to={'/login'} className='text-blue-300 underline ms-2' >Login</Link> </p> :
                  <div> <p>Are you a New User?<Link to={'/register'} className='text-blue-300 underline ms-2'>Register</Link> </p></div>
                }

              </div>
            </form>
          </div>

          <div></div>
        </div>
      </div>
      <ToastContainer position='top-center' theme='colored' autoClose={2000} />
    </>
  )
}

export default Auth
