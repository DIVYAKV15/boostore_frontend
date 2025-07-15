import React, { useEffect, useState } from 'react'
import AdminHeader from '../components/AdminHeader'
import Footer from '../../components/Footer'
import AdminSideBar from '../components/AdminSideBar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose, faLocationDot, faTrash } from '@fortawesome/free-solid-svg-icons'
import { toast, ToastContainer } from 'react-toastify'
import { addJobApi, deleteAJobApi, getAllApplicationApi, getAllJobApi } from '../../../services/allAPi'
import { Link } from 'react-router-dom'
import { serverUrl } from '../../../services/serverUrl'
function AdminCareers() {
  const [postTabStatus, setPostTabStatus] = useState(true)
  const [viewTabStatus, setViewTabStatus] = useState(false)
  const [modalStatus, setModalStatus] = useState(false)

  const [addJob, setAddJob] = useState({
    title: "",
    location: "",
    jtype: "",
    salary: "",
    qualification: "",
    experience: "",
    description: ""

  })
  console.log(addJob)

  const [allJob, setAllJob] = useState([])
  // to update the page with added job state
  const [addJobStatus, setAddJobStatus] = useState([])

  // search key state
  const [searchKey, setSearchKey] = useState("")

  // to update the page with delete job state
  const [deleteJobStatus, setDeleteJobStatus] = useState([])

  // to keep the applied job so to visible in viewJob 

  const [viewApplication, setViewApplication] = useState([])


  // job add submit function

  const handleSubmit = async () => {
    const { title, location, jtype, salary, qualification, experience, description } = addJob
    // console.log(title, location, jtype, salary, qualification, experience, description)
    if (!title || !location || !jtype || !salary || !qualification || !experience || !description) {
      toast.info('Please fill the form completely')
    } else {
      const result = await addJobApi(addJob)
      // console.log(result)

      if (result.status == 200) {
        toast.success('Added Successfully')
        handleReset()
        setModalStatus(false)
        setAddJobStatus(result)//so when the admin add job it should reflect immediately on the page so keeping that result in state whenever the status is 200 then add that state in useEffect dependency
      } else if (result.status == 400) {
        toast.warning(result.response.data)
        handleReset()
      } else {
        toast.error('something went wrong')
        handleReset()
        setModalStatus(false)
      }


    }
  }

  // reset function
  const handleReset = () => {
    setAddJob({
      title: "",
      location: "",
      jtype: "",
      salary: "",
      qualification: "",
      experience: "",
      description: ""
    })
  }


  // get all jobs

  const getAllJob = async (searchKey) => {
    const result = await getAllJobApi(searchKey)
    // console.log(result)
    setAllJob(result.data)
  }

  // delete job 

  const deleteJob = async (id) => {
    const result = await deleteAJobApi(id)
    console.log(result)
    if (result.status == 200) {
      toast.info('Deleted a job Details')
      setDeleteJobStatus(result)
    } else {
      toast.error('something went wrong')
    }
  }
  // console.log(allJob)

  // get all applied job application 
  const getAllApplication = async () => {
    const result = await getAllApplicationApi();

    // console.log(result)
    if (result.status == 200) {
      setViewApplication(result.data)
    }

  }
  // console.log('the applied job is', viewApplication)
  useEffect(() => {
    getAllJob(searchKey);
    // only when the admin click the job applied tab it has to fetch 
    if (viewTabStatus) {
      getAllApplication()
    }
  }, [addJobStatus, searchKey, deleteJobStatus, viewTabStatus])


  return (
    <> <AdminHeader />
      <div className="md:grid grid-cols-[1fr_5fr]">
        <div><AdminSideBar /></div>

        <main>

          <h1 className='text-center text-3xl font-semibold mt-10'>
            Careers
          </h1>
          {/* tab */}
          <div className='flex justify-center items-center text-xl mt-10'>
            <p onClick={() => { setPostTabStatus(true); setViewTabStatus(false) }} className={postTabStatus ? 'cursor-pointer  border-t border-r px-4 py-2 border-gray-700 rounded text-blue-400' : 'cursor-pointer  border-t border-r px-4 py-2 border-gray-700 rounded'}>Job Post</p>
            <p onClick={() => { setPostTabStatus(false); setViewTabStatus(true) }} className={viewTabStatus ? 'cursor-pointer border-b  px-4 py-2 border-gray-700 rounded text-blue-400' : 'cursor-pointer border-b  px-4 py-2 border-gray-700 rounded'}>View Applicant</p>
          </div>
          {postTabStatus && <div className='md:px-30 px-5 mt-20'>
            <div className='flex justify-between'>
              <div className='flex'>
                <input onChange={(e) => setSearchKey(e.target.value)} type="text" placeholder='Job Title' className='w-full border bg-white px-5 py-2 border-gray-300 ' />
                <button className='bg-green-600 text-white px-3'>Search</button>
              </div>
              <button onClick={() => setModalStatus(true)} className='bg-blue-500 text-white px-3'>Add Job</button>
            </div>
            {/* job title card */}



            {allJob.length > 0 ? allJob.map((items, index) => (
              <div key={index} className='border border-gray-100 md:p-20  p-5 md:mt-20 my-5 shadow'>
                <div className="md:grid grid-cols-[8fr_1fr]">
                  <div>
                    <h1 className='text-2xl '>{items.title}</h1>
                    <hr className='mt-3  border-gray-300' />
                    <p className='mt-5'><FontAwesomeIcon icon={faLocationDot} className='me-3 text-blue-300' />{items.location}</p>
                    <p className='mt-5'>Job type :  {items.jtype}</p>
                    <p className='mt-5'>Salary : {items.salary}</p>
                    <p className='mt-5'>Qualification : {items.qualification}</p>
                    <p className='mt-5'> Experience : {items.experience} years</p>
                    <p className='mt-5'>Description : {items.description}</p>
                  </div>
                  <div>
                    <button onClick={() => deleteJob(items._id)} className='bg-red-500 text-white px-3 rounded py-2 hover:border hover:border-red-500 hover:bg-white hover:text-red-500 md:mt-0 mt-10'>Delete <FontAwesomeIcon icon={faTrash} className='ms-3' /></button>
                  </div>
                </div>
              </div>
            ))

              : <p className='text-center text-3xl text-red-600 mt-30'>No job added..</p>}
          </div>}
          {/* job applicant*/}
          {viewTabStatus && <div className='md:px-30 px-5 mt-20'>
            <div className='flex justify-between'>
              <div className='flex'>
                <input type="text" placeholder='Job Title' className='w-full border bg-white px-5  py-2 border-gray-300' />
                <button className='bg-green-600 text-white px-3'>Search</button>
              </div>

            </div>

            <div>
              {viewApplication?.length > 0 ?
                <table className='w-full my-10 px-10'>
                  <thead>


                    <tr>
                      <th className='border bg-blue-500 border-gray-200  text-white py-3'>Sl:No</th>
                      <th className='border bg-blue-500 border-gray-200  text-white'>Job title</th>
                      <th className='border bg-blue-500 border-gray-200  text-white'>Name</th>
                      <th className='border bg-blue-500 border-gray-200  text-white'>Email</th>
                      <th className='border bg-blue-500 border-gray-200  text-white'>Qualification</th>
                      <th className='border bg-blue-500 border-gray-200  text-white'>Phone</th>
                      <th className='border bg-blue-500 border-gray-200  text-white'>Cover Letter</th>
                      <th className='border bg-blue-500 border-gray-200 text-white'>Resume</th>
                    </tr>
                  </thead>
                  <tbody >
                    {/* fetching data from mongodb backend so the key name should be same so check twice not the front end key */}
                    {viewApplication.map((items, index) => (<tr key={index} >
                      <td className='border border-gray-200 text-center text-black'>{index + 1}</td>
                      <td className='border border-gray-200 text-center text-black py-10'>{items?.jobTitle}</td>
                      <td className='border border-gray-200 text-center text-black py-10'>{items?.name}</td>
                      <td className='border border-gray-200 text-center text-black py-10'>{items?.qualification}</td>
                      <td className='border border-gray-200 text-center text-black py-10'>{items?.email}</td>
                      <td className='border border-gray-200 text-center text-black py-10'>{items?.phone}</td>
                      <td className='border border-gray-200 text-center text-black py-10'>{items?.coverLetter}</td>
                      <td className='border border-gray-200 text-center text-black py-20'><Link to={`${serverUrl}/pdfUpload/${items?.resume}`} className='text-blue-400 underline' target='_black'>resume</Link></td>
                    </tr>))}
                  </tbody>
                </table> :
                <p className='text-2xl font-semibold text-red-500 my-20'>No Application...</p>}
            </div>
          </div>}
          {/* modal */}

          {modalStatus && <div className="relative z-10" aria-labelledby="dialog-title" role="dialog" aria-modal="true">

            <div className="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">

                <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  {/* modal heading */}
                  <div className='bg-blue-950 text-white p-4 flex justify-between '>
                    <p className='text-xl'>Application Form</p>
                    <FontAwesomeIcon onClick={() => setModalStatus(false)} icon={faClose} className='fa-2x' />
                  </div>
                  {/* modal body */}
                  <div>
                    <div className="grid grid-cols-2 mt-10 px-10">
                      <div className='' >
                        <div className="mb-3">
                          <input type="text" value={addJob.title} onChange={(e) => setAddJob({ ...addJob, title: e.target.value })} placeholder='Job Title' className='w-full border border-gray-300 p-2 rounded' />
                        </div>
                        <div className="mb-3">
                          <input type="text" value={addJob.location} onChange={(e) => setAddJob({ ...addJob, location: e.target.value })} placeholder='Location' className='w-full border border-gray-300 p-2 rounded' />
                        </div>
                        <div className="mb-3">
                          <input type="text" value={addJob.jtype} onChange={(e) => setAddJob({ ...addJob, jtype: e.target.value })} placeholder='Job Type' className='w-full border border-gray-300 p-2 rounded' />
                        </div>



                      </div>

                      <div className='ms-2'>
                        <div className="mb-3">
                          <input type="text" value={addJob.qualification} onChange={(e) => setAddJob({ ...addJob, qualification: e.target.value })} placeholder='Qualification' className='w-full border border-gray-300 p-2 rounded' />
                        </div>
                        <div className="mb-3">
                          <input type="text" value={addJob.experience} onChange={(e) => setAddJob({ ...addJob, experience: e.target.value })} placeholder='Experience' className='w-full border border-gray-300 p-2 rounded' />
                        </div>
                        <div className="mb-3">
                          <input type="text" value={addJob.salary} onChange={(e) => setAddJob({ ...addJob, salary: e.target.value })} placeholder='Salary' className='w-full border border-gray-300 p-2 rounded' />
                        </div>
                      </div>
                    </div>
                    <div className="mb-3 px-10">
                      <textarea name="" id="" value={addJob.description} onChange={(e) => setAddJob({ ...addJob, description: e.target.value })} placeholder='Job Description' rows={5} className='w-full border border-gray-300 p-2 rounded'></textarea>
                    </div>
                  </div>
                  {/* footer */}
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button type="button" onClick={handleReset} className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto">Reset </button>
                    <button type="button" onClick={handleSubmit} className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto">Apply</button>
                  </div>
                </div>
              </div>
            </div>
          </div>}
        </main >
      </div >
      <Footer />
      <ToastContainer position='top-center' theme='colored' autoClose={2000} />
    </>
  )
}

export default AdminCareers