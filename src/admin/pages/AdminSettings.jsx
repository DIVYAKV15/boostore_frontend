import React, { useEffect, useState } from 'react'
import AdminHeader from '../components/AdminHeader'
import Footer from '../../components/Footer'
import AdminSideBar from '../components/AdminSideBar'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { serverUrl } from '../../../services/serverUrl'
import { toast, ToastContainer } from 'react-toastify'
import { editProfileApi } from '../../../services/allAPi'
import { useContext } from 'react'
import { adminProfileUpdateStatusContext } from '../../context/ContextShare'

function AdminSettings() {

  const [token, setToken] = useState("")

  // we didnt give email because if token available then email available
  // when user cam to edit we have to show the previously set the details

  const [adminDetails, setAdminDetails] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    profile: ""
  })

  //  the existing admin upload the image 

  const [existingProfile, setExistingProfile] = useState("")

  // to view the uploded content preview

  const [preview, setPreview] = useState("")

  console.log(adminDetails)
  // -can able to see the admin details

  // state change cheyyan illa state nae destrcuture cheythu eduka 

  const{setAdminProfileUpdateStatus}=useContext(adminProfileUpdateStatusContext)


  // to keep the file in the state
  const handleFileUpload = (e) => {
    setAdminDetails({ ...adminDetails, profile: e.target.files[0] })
    // adminDetails.profile
    if (e.target.files[0] != "") {

      const url = URL.createObjectURL(e.target.files[0])
      setPreview(url)
    }
  }
  // console.log(preview) will get the link so we cans wet in imag src=''

  const handleReset = () => {
    // when the reset button click it has to go to previous details of the user/admin like previously stored data
    if (sessionStorage.getItem("token")) {
      let user = JSON.parse(sessionStorage.getItem("existingUser"))
      // exsiting user nte details edudhu vaikanam
      setAdminDetails({ ...adminDetails, username: user.username, password: user.password, confirmPassword: user.password })
      setExistingProfile(user.profile)
    }
    // then preview reset cheyanam 
    setPreview("")
  }
  const handleSubmit = async () => {
    // why we didnt destrucutre the profile because profile(user upload the image) is not mandatory field  ..user may or may not upload the image
    const { username, password, confirmPassword } = adminDetails
    if (!username || !password || !confirmPassword) {
      toast.info('Please fill the form completely')
    } else {
      if (password != confirmPassword) {
        toast.warning("Password dont match")
      } else {
        const reqHeader = {
          "Authorization": `Bearer ${token}`
        }
        // only when we have uploaded content
        if (preview) {
          // uploaded content undenkil formdata aitu send cheynam 
          // so first formDAta class edudhu vachu
          const reqBody = new FormData()
          // in operator returns the key of adminDetails
          for (let key in adminDetails) {
            if (key != 'confirmPassowrd') {
              reqBody.append(key, adminDetails[key])
            }
          }
          // bio destrucute cheytha object il illya so thats why appending as seperate
          reqBody.append('bio', "")
          const result = await editProfileApi(reqBody, reqHeader)
          console.log(result)
          console.log("Saving this into sessionStorage:", result.data);
          console.log("Type of result.data:", typeof result.data);
          if (result.status == 200) {
            toast.success('Profile Updated Successfully')
            sessionStorage.setItem('existingUser', JSON.stringify(result.data))
            setAdminProfileUpdateStatus(result)
            //    why stringfy because session storgae value and key both should be string
            // if we didnt set this in session storage when we reset it will come only existing data not the current updated data 
            //   so we are setting in existingUser key ,and the value which we sent from backend
          } else {

            toast.error("SOmething went wrong")

          }
        }
        else {
          // if no uploded img then no need to give the reqBody directly here so giving each and everything seperately
          const result = await editProfileApi({ username, password, profile: existingProfile, bio: "" }, reqHeader)
          console.log(result)
          if (result.status == 200) {
            toast.success('Profile Updated Successfully')
            sessionStorage.setItem('existingUser', JSON.stringify(result.data))
            setAdminProfileUpdateStatus(result)
            //    why stringfy because session storgae value and key both should be string
            // if we didnt set this in session storage when we reset it will come only existing data not the current updated data 
            //   so we are setting in existingUser key ,and the value which we sent from backend
          } else {

            toast.error("SOmething went wrong")

          }
        }
      }
    }
  }


  // why we give this in useEffect when admin clcik the setting page the details has to be visible 
  // useEffect(() => {
  //   if (sessionStorage.getItem("token")) {
  //     let tok = sessionStorage.getItem("token")
  //     setToken(tok)
      // this existingUser key is from sessionStorage 
      // keep the existingUser in user variable
  //     const user = JSON.parse(sessionStorage.getItem('existingUser'))
      // const user=sessionStorage.getItem('existingUser')

  //     setAdminDetails({ ...adminDetails, username: user.username, password: user.password, confirmPassword: user.password })
  //     setExistingProfile(user.profile)
  //   }
  // }, [])
  useEffect(() => {
  const token = sessionStorage.getItem("token");
  const userData = sessionStorage.getItem("existingUser");

  if (token && userData) {
    setToken(token);

    try {
      const user = JSON.parse(userData); // ✅ This is now safe

      setAdminDetails({
        username: user.username,
        password: user.password,
        confirmPassword: user.password,
      });

      setExistingProfile(user.profile);
    } catch (error) {
      console.error("❌ Failed to parse userData:", error);
      console.log("Stored value was:", userData);

      // Optionally clear it to prevent future crashes
      sessionStorage.removeItem("existingUser");
    }
  }
}, []);


  return (
    <>
      <AdminHeader />
      <div className="md:grid grid-cols-[1fr_5fr]">
        <div><AdminSideBar /></div>

        <div className='p-4'>
          <h1 className='text-3xl text-center font-semibold my-10'>Settings</h1>
          {/* grid */}
          <div className="md:grid grid-cols-2 mt-10">
            {/* first */}
            <div className='md:px-20 px-5'>
              <p className='text-justify '>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae ex, sed est iusto adipisci optio eaque voluptas consequuntur! Accusamus, commodi error recusandae vitae velit a nesciunt officia debitis voluptatem cumque!
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae ex, sed est iusto adipisci optio eaque voluptas consequuntur! Accusamus, commodi error recusandae vitae velit a nesciunt officia debitis voluptatem cumque!
              </p>
              <p className='mt-10 text-justify'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae ex, sed est iusto adipisci optio eaque voluptas consequuntur! Accusamus, commodi error recusandae vitae velit a nesciunt officia debitis voluptatem cumque!
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae ex, sed est iusto adipisci optio eaque voluptas consequuntur! Accusamus, commodi error recusandae vitae velit a nesciunt officia debitis voluptatem cumque!Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae ex, sed est iusto adipisci optio eaque voluptas consequuntur! Accusamus, commodi error recusandae vitae velit a nesciunt officia debitis voluptatem cumque!Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae ex, sed est iusto adipisci optio eaque voluptas consequuntur! Accusamus, commodi error recusandae vitae velit a nesciunt officia debitis voluptatem cumque!
              </p>
            </div>
            {/* second  */}
            <div className='md:px-10 px-5 '>
              <form className=' bg-blue-100 md:p-10 p-5 rounded my-10 md:my-0' action="">
                <div className='flex justify-center items-center my-10'>
                  <label htmlFor="editUserProfile">
                    <input type="file" id='editUserProfile' onChange={(e) => handleFileUpload(e)} style={{ display: 'none' }} />
                    {existingProfile == "" ? <img src={preview ? preview : "https://static.vecteezy.com/system/resources/thumbnails/042/156/821/small_2x/user-3d-graphic-illustration-free-png.png"} alt="user_img" style={{ width: '150px', height: '150px', borderRadius: '50%' }} /> :
                      <img src={preview ? preview : `${serverUrl}/uploads/${existingProfile}`} alt="user_img" style={{ width: '150px', height: '150px', borderRadius: '50%' }} />}
                    <div style={{ marginLeft: "130px", marginTop: '-50px' }}>
                      <FontAwesomeIcon icon={faPen} className='px-4 py-3 bg-yellow-400 rounded text-white' />
                    </div>
                  </label>
                </div>
                <div className="mb-3">
                  <input type="text" value={adminDetails.username} onChange={(e) => setAdminDetails({ ...adminDetails, username: e.target.value })} placeholder='Username' className='bg-white rounded w-full p-2' />
                </div>
                <div className="mb-3">
                  <input type="text" value={adminDetails.password} onChange={(e) => setAdminDetails({ ...adminDetails, password: e.target.value })} placeholder='Password' className='bg-white rounded w-full p-2' />
                </div>
                <div className="mb-3">
                  <input type="text" value={adminDetails.confirmPassword} onChange={(e) => setAdminDetails({ ...adminDetails, confirmPassword: e.target.value })} placeholder='Confirm Password' className='bg-white rounded w-full p-2' />
                </div>
                <div className="flex justify-between mt-10">
                  <button type='button' onClick={handleReset} className='bg-amber-600 p-4 w-1/2 text-white rounded hover:border hover:border-amber-600 hover:bg-white hover:text-amber-600'>Reset</button>
                  <button type='button' onClick={handleSubmit} className='bg-green-600 p-4 w-1/2 text-white rounded hover:border hover:border-green-600 hover:bg-white hover:text-green-600 ms-2'>Submit</button>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position='top-center' theme='colored' autoClose={2000} />
      <Footer />
    </>
  )
}

export default AdminSettings