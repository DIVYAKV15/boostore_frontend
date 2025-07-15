import { faPen, faPenToSquare, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useEffect, useState } from 'react'
import { serverUrl } from '../../../services/serverUrl'
import { toast, ToastContainer } from 'react-toastify'
import { editProfileApi } from '../../../services/allAPi'

import { userProfileUpdateStatusContext } from '../../context/ContextShare'


function EditProfile() {
    const [offCanvaseStatus, setOffCanvaseStatus] = useState(false)
    // to store the details

    const [userDetails, setUserDetails] = useState({
        username: "",
        password: "",
        confirmPassword: "",
        bio: "",
        profile: ""
    })

    // to store the token

    const [token, setToken] = useState("")

    // to store the exisitng profile

    const [existingProfile, setExistingProfile] = useState("")

    // 
    const [preview, setPreview] = useState("")
    // 
    const { setUserProfileUpdateStatus } = useContext(userProfileUpdateStatusContext)

    // console.log(token)

    const handleFileUpload = (e) => {
        setUserDetails({ ...userDetails, profile: e.target.files[0] })
        let url = URL.createObjectURL(e.target.files[0])
        console.log(url)
        setPreview(url)
    }

    const handleReset = () => {
        if (sessionStorage.getItem("token")) {

            const user = JSON.parse(sessionStorage.getItem("existingUser"))
            setUserDetails({
                ...userDetails,
                username: user.username,
                password: user.password,
                confirmPassword: user.password,
                bio: user.bio
            })
            setExistingProfile(user.profile)
        }
        setPreview("")
    }

    // const handleSubmit = () => 
    //     {
    //     const { username, password, bio, confirmPassword } = userDetails
    //     if (!username || !password || !bio || !confirmPassword) {
    //         toast.error('please Fill hte details completely')
    //     } else {
    //         if (password != confirmPassword) {
    //             toast.warning("Password not match")
    //         }
    //     }
    //     else {

    //         const reqHeader = {
    //             "Authorization": `Bearer ${token}`
    //         }
    //            if (preview) {

    //             const reqBody = new FormData()
    //             for (let key in userDetails) {
    //                 if (key != 'confirmPassowrd') {
    //                     reqBody.append(key, userDetails[key])
    //                 }
    //             }
    //             const result = await editProfileApi(reqBody, reqHeader)
    //             console.log(result)
    //             console.log("Saving this into sessionStorage:", result.data);
    //             if (result.status == 200) {
    //                         toast.success('Profile Updated Successfully')
    //                         sessionStorage.setItem('existingUser', JSON.stringify(result.data))
    //                         setAdminProfileUpdateStatus(result)
    //                         //    why stringfy because session storgae value and key both should be string
    //                         // if we didnt set this in session storage when we reset it will come only existing data not the current updated data 
    //                         //   so we are setting in existingUser key ,and the value which we sent from backend
    //                       } else {

    //                         toast.error("SOmething went wrong")

    //                       }

    //         } 
    //         // if no preview-that means no uploaded content
    //         else {
    //             const result = await editProfileApi({ username, password, bio, profile: existingProfile }, reqHeader)
    //             console.log(result)
    //             if (result.status == 200) {
    //                         toast.success('Profile Updated Successfully')
    //                         sessionStorage.setItem('existingUser', JSON.stringify(result.data))
    //                         setAdminProfileUpdateStatus(result)
    //                         //    why stringfy because session storgae value and key both should be string
    //                         // if we didnt set this in session storage when we reset it will come only existing data not the current updated data 
    //                         //   so we are setting in existingUser key ,and the value which we sent from backend
    //                       } else {

    //                         toast.error("SOmething went wrong")

    //                       }
    //         }
    //     }

    // }
    const handleSubmit = async () => {
        const { username, password, confirmPassword, bio, profile } = userDetails
        if (!username || !password || ! confirmPassword || !bio) {
            toast.info('Please add All Details')
        }
        else {
            if (password !=  confirmPassword) {
                toast.warning('Password and confirm password must match')
            }
            else {
                if (preview) {
                    const reqBody = new FormData()
                    for (let key in userDetails) {
                        reqBody.append(key, userDetails[key])
                    }
                    const reqHeader = {
                        "Authorization": `Bearer ${token}`
                    }
                    const result = await editProfileApi(reqBody, reqHeader)
                    console.log(result);
                    if (result.status == 200) {
                        toast.success('profile updated successfully')
                        sessionStorage.setItem("existingUser", JSON.stringify(result.data))
                        handleReset()

                        setUserProfileUpdateStatus(result.data)
                        setOffCanvaseStatus(false)
                    }
                    else {
                        toast.error('something went wrong')
                        handleReset()
                    }

                }
                else {
                    const reqHeader = {
                        "Authorization": `Bearer ${token}`
                    }
                    const result = await editProfileApi({ username, password, profile, bio }, reqHeader)
                    console.log(result);
                    if (result.status == 200) {
                        sessionStorage.setItem("existingUser", JSON.stringify(result.data))
                        toast.success('profile updated successfully')
                        handleReset()
                        setUserProfileUpdateStatus(result.data)
                        setOffCanvaseStatus(false)
                    }
                    else {
                        toast.error('something went wrong')
                        handleReset()
                    }

                }
            }
        }
    }



    // useEffect(() => {
    //     if (sessionStorage.getItem("token")) {
    //         setToken(sessionStorage.getItem("token"))
    //         const user = JSON.parse(sessionStorage.getItem("existingUser"))
    //         setUserDetails({
    //             ...userDetails,
    //             username: user.username,
    //             password: user.password,
    //             confirmPassword: user.password,
    //             bio: user.bio
    //         })
    //         setExistingProfile(user.profile)
    //     }
    // }, [userDetails])
    useEffect(() => {
  if (sessionStorage.getItem("token")) {
    setToken(sessionStorage.getItem("token"));
    const user = JSON.parse(sessionStorage.getItem("existingUser"));

    setUserDetails({
      username: user.username,
      password: user.password,
      confirmPassword: user.password,
      bio: user.bio,
    //   profile: user.profile || ""
    });

    setExistingProfile(user.profile);
  }
}, []); // ✅ run only once on component mount

    return (
        <>

            {/* drawer from tailwind */}
            {offCanvaseStatus &&
                <div className="relative z-10 " aria-labelledby="drawer-title" role="dialog" aria-modal="true">

                    <div className="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>


                    <div className=" h-full   w-100 z-50 fixed bg-white top-0 left-0 shadow-xl">

                        <div className='flex bg-gray-900 p-4 text-white justify-between'>
                            <h1 className='text-2xl'>Edit User Profile</h1>
                            <FontAwesomeIcon icon={faXmark} className='fa-2x' onClick={() => setOffCanvaseStatus(false)} />
                        </div>
                        {/* profile photo */}
                        <div className='my-4 flex justify-center items-center '>
                            <label htmlFor="editUserProfile">
                                <input type="file" id='editUserProfile'
                                    onChange={(e) => handleFileUpload(e)} style={{ display: 'none' }} />
                                {existingProfile == "" ? <img src={preview ? preview : "https://static.vecteezy.com/system/resources/thumbnails/042/156/821/small_2x/user-3d-graphic-illustration-free-png.png"} alt="user_img" style={{ width: '200px', height: '200px', borderRadius: '50%' }} />
                                    :
                                    existingProfile.startsWith("https") ? <img src={preview ? preview : `${existingProfile}`} alt="no_img" style={{ width: '200px', height: '200px', borderRadius: '50%' }} />
                                        :
                                        <img src={preview ? preview : `${serverUrl}/uploads/${existingProfile}`} alt="no_img" style={{ width: '200px', height: '200px', borderRadius: '50%' }} />
                                }
                                <div style={{ marginLeft: "130px", marginTop: '-50px' }}>
                                    <FontAwesomeIcon icon={faPen} className='px-4 py-3 bg-yellow-300 rounded text-white' />
                                </div>
                            </label>
                        </div>
                        {/* input */}
                        <div className='px-4 mt-10'>
                            <div className="mb-3">
                                <input value={userDetails.username} onChange={(e) => setUserDetails({ ...userDetails, username: e.target.value })} type="text" placeholder='UserName' className='p-2 w-full border border-gray-200 bg-white rounded' />
                            </div>
                            {userDetails.password != 'googlepwd' && <div className="mb-3">
                                <input value={userDetails.password} onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })} type="text" placeholder='Password' className='p-2 w-full border border-gray-200 bg-white rounded' />
                            </div>}
                            {userDetails.password != 'googlepwd' && <div className="mb-3">
                                <input value={userDetails.confirmPassword} onChange={(e) => setUserDetails({ ...userDetails, confirmPassword: e.target.value })} type="text" placeholder='Confirm password' className='p-2 w-full border border-gray-200 bg-white rounded' />
                            </div>}
                            <div className="mb-3">
                                <textarea value={userDetails.bio} onChange={(e) => setUserDetails({ ...userDetails, bio: e.target.value })} placeholder='Bio' className='p-2 w-full bg-white border border-gray-200 rounded' rows={6} name="" id=""></textarea>
                            </div>
                            <div className="flex justify-end my-5">
                                <button type='button'
                                    onClick={handleReset}
                                    className='bg-amber-700 text-white px-5 py-3 rounded hover:border hover:border-amber-700 hover:bg-white text-lg'>Reset</button>
                                <button type='button' onClick={handleSubmit} className='bg-green-700 text-white px-5 py-3 rounded hover:border hover:border-green-700 hover:bg-white text-lg ms-4'>Update</button>
                            </div>
                        </div>

                    </div>
                </div>}
            <button onClick={() => setOffCanvaseStatus(true)} className='px-3 py-2 border border-blue-500 rounded  hover:bg-blue-600 text-xl hover:text-white text-blue-500'><FontAwesomeIcon icon={faPenToSquare} className='me-3' />Edit</button>
            <ToastContainer position='top-center' theme='colored' autoClose={2000} />
        </>
    )
}

export default EditProfile