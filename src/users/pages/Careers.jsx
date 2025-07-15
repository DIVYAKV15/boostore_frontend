import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareArrowUpRight } from '@fortawesome/free-solid-svg-icons/faSquareArrowUpRight'
import { faLocationDot, faXmark } from '@fortawesome/free-solid-svg-icons'
import { addApplicationApi, getAllJobApi } from '../../../services/allAPi'
import { toast, ToastContainer } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
function Careers() {
  const [modalStatus, setModalStatus] = useState(false)
  // for searchKey state
  const [searchKey, setSearchKey] = useState("")
  // to set all the jobs
  const [allJobs, setAllJobs] = useState([])
  //create state to keep the token 
  const [token, setToken] = useState("")
  // state to store the job applying state
  const [applicationDetails, setApplicationDetails] = useState({
    fullname: "",
    qualification: "",
    email: "",
    phone: "",
    coverLetter: "",
    resume: "",
    jobTitle: ""
  })

  // console.log(applicationDetails)

  // get all the job and depend upon the search key too function

  const getAllJob = async (searchKey) => {
    const result = await getAllJobApi(searchKey)
    setAllJobs(result.data)
  }

  // console.log(allJobs)

  // to navigate to one page to another page using useNavigate () hook

  const navigate = useNavigate()

  // add job applying function

  const handleAdd = async () => {

    // why desructuring here so that we can do else if part
    const { fullname, qualification, email, phone, coverLetter, resume } = applicationDetails



    if (!token) {
      console.log(token)
      toast.info('please login to apply for the job')
      navigate('/login')
    } else if (!fullname, !qualification, !email, !phone, !coverLetter, !resume) {
      // console.log('miising')
      toast.info('Please fill the form completely')
    } else {
      const reqHeader = {
        "Authorization": `Bearer ${token}`
      }

      const reqBody = new FormData()

      for (let key in applicationDetails) {
        reqBody.append(key, applicationDetails[key])
      }
      console.log(reqBody)
      const result = await addApplicationApi(reqBody, reqHeader)

      console.log(result)
      if (result.status == 200) {
        toast.success('Application submitted successfully')

      } else if (result.status == 400) {
        toast.warning(result.response.data)

      } else {
        toast.error('Something went wrong')
      }
      handleReset()
      setModalStatus(false)
    }
  }

  // reset function

  const handleReset = () => {
    setApplicationDetails({
      fullname: "",
      qualification: "",
      email: "",
      phone: "",
      coverLetter: "",
      resume: "",
      jobTitle: ""
    })
    // modern browser wont allow to set value to file input box empty directly so using the dom method of js to access the input tag it return the nodelist and we sre nullifyng the nodelist indirectly

    document.getElementById('inputFile').value = ''
  }

  // no need to work all the time only while page load
  useEffect(() => {
    if (sessionStorage.getItem('token')) {
      setToken(sessionStorage.getItem('token'))
    }
  }, [])

  // this has to work every time depend upon the search key 
  // if we give the session storage here every time search key edukumbo session storage edukanda aveshyam illya
  // thats why given seperated
  useEffect(() => {
    getAllJob(searchKey)
  }, [searchKey])

  return (
    <div>
      <Header />
      {/* careers title */}
      <div className="md:grid grid-cols-[1fr_4fr_1fr]  my-10">
        <div></div>
        <div className='p-5'>
          <h1 className='text-3xl text-center my-10'>Careers</h1>
          <p className='text-justify  mt-5 md:text-center'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus ad tempore fugiat quis maxime officiis, illo aliquid quisquam veniam distinctio recusandae temporibus quam tempora aperiam a enim consequuntur nihil architecto.Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus ad tempore fugiat quis maxime officiis, illo aliquid quisquam veniam distinctio recusandae temporibus quam tempora aperiam a enim consequuntur nihil architecto.</p>
        </div>
        <div></div>
      </div>
      {/* Current Openings */}
      <h1 className='md:ms-10 ms-5  my-10 text-2xl'>Current Openings</h1>
      <div className="md:grid grid-cols-3 my-10 ">
        <div></div>
        <div className='flex'>
          <input onChange={(e) => setSearchKey(e.target.value)} type="text" placeholder='Search by title...' className='bg-white p-2 border border-gray-200 w-full ' />
          <button className='bg-blue-900 px-4 py-3 text-white hover:bg-blue-950'>Search</button>
        </div>
        <div></div>
      </div>
      {/* job title */}
      {allJobs.length > 0 ? allJobs.map((items, index) => (<div key={index} className="md:grid grid-cols-[1fr_4fr_1fr]  my-10 overflow-hidden">
        <div></div>
        {/* passing index to keep the key unique */}
        <div className="shadow p-5 rounded">
          <div className='grid grid-cols-[8fr_1fr]'>
            <div>
              <h1 className='text-xl'>{items?.title}</h1>
              <hr className='mt-3 border-gray-300' />
              <h1 className='text-blue-700 mt-3'><FontAwesomeIcon icon={faLocationDot} className='me-2' />
                Location</h1>
              <h1 className='mt-3'>Job type: {items?.jtype}</h1>
              <h1 className='mt-3'>Salary:{items?.salary}</h1>
              <h1 className='mt-3'>Qualification :{items?.qualification}</h1>
              <h1 className='mt-3'>Experience :{items?.experience}</h1>
              <h1 className='mt-3'>Description : {items?.description}</h1>
            </div>
            <div >
              <button className='bg-blue-800 text-white px-3 rounded py-3 ms-4' onClick={() => { setModalStatus(true), setApplicationDetails({ ...applicationDetails, jobTitle: items?.title }) }}>Apply <FontAwesomeIcon icon={faSquareArrowUpRight} className='ms-3' /></button>
            </div>
          </div>
        </div>



        <div></div>

      </div>)) : <p className='text-3xl text-red-600'>No jobs added...</p>}






      {/* modal */}
      {
        modalStatus && <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true" >

          <div className="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex md:min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">

              <div className="relative transform overflow-hidden rounded-md bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl" >
                <div className="bg-white">
                  {/* modal heading */}
                  <div className='bg-gray-900 text-white p-4 flex justify-between items-center'>
                    <p className='text-xl '>Application Form</p>
                    <FontAwesomeIcon icon={faXmark} className='fa-2x' onClick={() => setModalStatus(false)} />
                  </div>
                  {/* modal body */}
                  <div className='p-4'>
                    <div className='md:grid grid-cols-2'>
                      <div className="px-2">
                        <div className="mb-3">
                          <input value={applicationDetails.fullname} onChange={(e) => setApplicationDetails({ ...applicationDetails, fullname: e.target.value })} type="text" placeholder='Full Name' className='p-2 border border-gray-200 w-full rounded' />
                        </div>
                        <div className="mb-3">
                          <input value={applicationDetails.email} onChange={(e) => setApplicationDetails({ ...applicationDetails, email: e.target.value })} type="text" placeholder='Email id' className='p-2 border border-gray-200 w-full rounded' />
                        </div>
                      </div>
                      <div className="px-2">
                        <div className="mb-3">
                          <input value={applicationDetails.qualification} onChange={(e) => setApplicationDetails({ ...applicationDetails, qualification: e.target.value })} type="text" placeholder='Qualification' className='p-2 border border-gray-200 w-full rounded' />
                        </div>
                        <div className="mb-3">
                          <input value={applicationDetails.phone} onChange={(e) => setApplicationDetails({ ...applicationDetails, phone: e.target.value })} type="text" placeholder='Phone' className='p-2 border border-gray-200 w-full rounded' />
                        </div>
                      </div>
                    </div>
                    <div className="px-2 mb-3">
                      <textarea value={applicationDetails.coverLetter} onChange={(e) => setApplicationDetails({ ...applicationDetails, coverLetter: e.target.value })} placeholder='cover letter:' className='p-2 border  border-gray-200 w-full rounded'></textarea>
                    </div>
                    <div className="px-2 mb-3">
                      <label htmlFor="" className='mb-2'>Upload Resume : </label>
                      {/* we cant set value =application .resume it will not be empty when we press the reset button as it is file type  */}
                      <input id='inputFile' onChange={(e) => setApplicationDetails({ ...applicationDetails, resume: e.target.files[0] })} type='file' placeholder='Phone' className=' border  border-gray-200 w-full rounded file:bg-gray-300 file:p-2 file:text-gray-500'></input>
                    </div>

                  </div>
                  {/* modal footer */}
                  <div className="bg-gray-300 px-4 py-3 sm:flex sm:flex-row-reverse  sm:px-6">
                    <button onClick={handleAdd} type="button" className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto">Submit</button>
                    <button onClick={handleReset} type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-yellow-600 px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto">Reset</button>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      }
      <ToastContainer position='top-center' theme='colored' autoClose={2000} />
      <Footer />
    </div>
  )

}
export default Careers