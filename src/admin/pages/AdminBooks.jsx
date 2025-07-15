import React, { useEffect, useState } from 'react'
import AdminHeader from '../components/AdminHeader'
import Footer from '../../components/Footer'
import AdminSideBar from '../components/AdminSideBar'
import { approveBookApi, getAllBookAdminApi, getAllUsersApi } from '../../../services/allAPi'

function AdminBooks() {
  const [bookListTabStatus, setBookListTabStatus] = useState(true)
  const [usersTabStatus, setUsersTabStatus] = useState(false)

  const [allBooks, setAllBooks] = useState([])

  const [updateApproveStatus, setUpdateAprroveStatus] = useState({})

  const [allUser, setAllUser] = useState([])

  const getAllBooks = async () => {
    const result = await getAllBookAdminApi()
    // console.log(result)
    setAllBooks(result.data)
  }

  const approveBook = async (id) => {
    const result = await approveBookApi(id)
    // console.log(result)
    if (result.status == 200) {
      setUpdateAprroveStatus(result)
    }

  }
  // get all users list

  const getAllUser = async () => {
    const result = await getAllUsersApi()
    // console.log(result)
    setAllUser(result.data)
  }
  console.log(allUser)
  useEffect(() => {
    if (bookListTabStatus == true) {
      getAllBooks()
    }

    if (usersTabStatus == true) {
      getAllUser()
    }

  }, [updateApproveStatus, usersTabStatus, bookListTabStatus])
  return (
    <>
      <AdminHeader />
      <div className="md:grid grid-cols-[1fr_5fr]">
        <div><AdminSideBar /></div>
        {/* heading */}
        <div>
          <h1 className='text-center text-3xl font-semibold mt-10' >All Books</h1>
          {/* tab */}
          <div className='flex justify-center items-center my-10 text-2xl'>
            <p onClick={() => { setBookListTabStatus(true); setUsersTabStatus(false) }} className={bookListTabStatus ? 'px-3 py-2 border-t border-r rounded text-blue-500' : 'px-3 py-2 border-t border-r rounded'}>Book List</p>
            <p onClick={() => { setBookListTabStatus(false); setUsersTabStatus(true) }} className={usersTabStatus ? 'px-3 py-2 border-b  rounded text-blue-500' : 'px-3 py-2 border-b rounded'}>Users</p>
          </div>
          {/* book List */}
          {bookListTabStatus && <div className='md:grid grid-cols-3 md:px-20 px-5 gap-10 mb-10'>

            {allBooks.length > 0 ? allBooks.map((items, index) => (<div key={index} className={items.status == 'sold' ? ' shadow p-2 flex justify-center items-center flex-col md:mb-0 mb-5 opacity-20' : 'shadow p-2 flex justify-center items-center flex-col md:mb-0 mb-5'}>
              <img src={items?.imageUrl} alt="" width={'200px'} height={'200px'} />
              <h1 className='text-blue-500 mt-3'>{items?.title}</h1>
              <p>{items?.author}</p>
              <p className='text-red-500'>max@gmail.com</p>
              {items?.status == 'pending' && <button onClick={() => approveBook(items._id)} className='border bg-green-600 w-full text-white px-3 py-2 rounded mb-3'>Approve</button>}
              {/* Approved name should be same as we set in the backend controller */}
              {items?.status == 'Approved' && <div className='w-full flex justify-md ' ><img src="https://media.istockphoto.com/id/1416145560/vector/green-circle-with-green-tick-flat-ok-sticker-icon-green-check-mark-icon-tick-symbol-in-green.jpg?s=612x612&w=0&k=20&c=Uh3KS7c_o5QmrfisyV-aRzDUNqtAM7QUVJrc8bniVsQ=" style={{ width: '70px', height: '70px' }} /></div>}
            </div>)) : <p>Loading...</p>}


          </div>}
          {/* user tab */}
          {usersTabStatus && <div className='md:grid grid-cols-3 px-5 gap-5'>
            {/* first  */}
            {allUser.length > 0 ? allUser.map((item, index) => (
              <div key={index} className='bg-gray-200 p-4 rounded md:mb-0 mb-5'>
                <p className='text-red-400'>ID:{item?._id}</p>
                <div className='grid grid-cols-[1fr_4fr] mt-5 '>
                  <div className='ms-5'>
                    <img src="https://st4.depositphotos.com/11634452/41441/v/450/depositphotos_414416936-stock-illustration-picture-profile-icon-male-icon.jpg" alt="" width={'200px'} height={'200px'} style={{ borderRadius: '50%' }} />
                  </div>
                  <div className='ms-5'>
                    <h1 className='text-blue-500 text-2xl'>{item?.title}</h1>
                    <p>{item?.email}</p>
                  </div>

                </div>
              </div>
            ))

              : <p>Loading...</p>}


          </div>}
        </div>


      </div>
      <Footer />
    </>
  )
}

export default AdminBooks