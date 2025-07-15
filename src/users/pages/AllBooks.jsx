import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { Link } from 'react-router-dom'
import { allBooksUserApi } from '../../../services/allAPi'


function AllBooks() {
  // to check whether the user is login or not so use the token from session storage

  const [checkToken, setCheckToken] = useState("")

  const [allBooks, setAllBooks] = useState([])

  // search state
  const [searchKey, setSearchKey] = useState('')

  const [tempArray, setTempArray] = useState([])

  // console.log(searchKey)
  // function to get user submitted book
  const getAllBooks = async (token, searchKey) => {
    const reqHeader = {
      "Authorization": `Bearer ${token}`
    }
    const result = await allBooksUserApi(reqHeader, searchKey)
    // console.log(result)
    setAllBooks(result.data)
    // keeping the data in temporary variable before modifying the page depend upon filter option
    setTempArray(result.data)
  }

  // console.log(allBooks)

  // filter the book depend upon option
  const filter = (filterOptions) => {
    // before modifying the all books depend upon the filter option 
    // we want to keep all book store in one place 
    // because once we set filter option in  the setAllbook() only that option will be available 
    // again we cant modify with different option
    if (filterOptions == 'No Filter') {
      setAllBooks(tempArray)
    } else {
      setAllBooks(tempArray.filter((item) => item.category.toLowerCase() == filterOptions.toLowerCase()))
    }
  }


  //load immediately when user visit the page
  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      // setCheckToken(sessionStorage.getItem('token'))
      // instead of above we have to pass the token to get the user submitted book 
      // so doing like below
      const receivedToken = sessionStorage.getItem("token")
      setCheckToken(receivedToken)
      getAllBooks(receivedToken, searchKey)
    }

  }, [searchKey]) //depend upon the searkey the useEffect again load the page


  return (
    <>
      <Header />

      {/* book collections */}

      {checkToken ? <div>
        <h1 className='text-3xl my-10  text-center'>Collections</h1>
        {/* search bar */}
        <div className='md:grid grid-cols-3 mb-10 px-5'>
          <div></div>
          <div className='flex'>
            <input type="text" onChange={(e) => setSearchKey(e.target.value)} placeholder='Search by title...' className='bg-white p-2 border border-gray-200 w-full' />
            <button className='bg-blue-900 px-4 py-3 text-white hover:bg-blue-950'>Search</button>
          </div>
          <div></div>
        </div>
        <div className='md:grid grid-cols-[1fr_4fr] md:px-10 px-5'>
          <div>
            <div>
              <h1 className='text-2xl font-medium my-4'>Filter</h1>
              <div className='flex my-2' onClick={() => filter('Literary Friction')}>
                <input type="radio" id='Literary Friction' name='filter' />
                <label htmlFor="Literary Friction" className='ms-3'>Literary Friction</label>
              </div>
              <div className='flex my-2' onClick={() => filter('Philosophy')}>
                <input type="radio" id='Philosophy' name='filter' />
                <label htmlFor="Philosophy" className='ms-3'>Philosophy</label>
              </div>
              <div className='flex my-2' onClick={() => filter('Romance')}>
                <input type="radio" id='Romance' name='filter' />
                <label htmlFor="Romance" className='ms-3'>Romance</label>
              </div>
              <div className='flex my-2' onClick={() => filter('Mystery/Thriller')}>
                <input type="radio" id='Mystery/Thriller' name='filter' />
                <label htmlFor="Mystery/Thriller" className='ms-3'>Mystery/Thriller</label>
              </div>
              <div className='flex my-2' onClick={() => filter('Horror')}>
                <input type="radio" id='Horror' name='filter' />
                <label htmlFor="Horror" className='ms-3'>Horror</label>
              </div>
              <div className='flex my-2' onClick={() => filter('Auto Biography')}>
                <input type="radio" id='Auto Biography' name='filter' />
                <label htmlFor="Auto Biography" className='ms-3'>Auto Biography</label>
              </div>
              <div className='flex my-2' onClick={() => filter('Self-Help')}>
                <input type="radio" id='Self-Help' name='filter' />
                <label htmlFor="Self-Help" className='ms-3'>Self-Help</label>
              </div>
              <div className='flex my-2' onClick={() => filter('Politics')}>
                <input type="radio" id='Politics' name='filter' />
                <label htmlFor="Politics" className='ms-3'>Politics</label>
              </div>
              <div className='flex my-2' onClick={() => filter('No Filter')}>
                <input type="radio" id='No Filter' name='filter' />
                <label htmlFor="No Filter" className='ms-3'>No Filter</label>
              </div>
            </div>
          </div>
          {/*  hidden={items.status == 'pending' || items.status == 'sold'} -> hiddenn is a html attribute we are settingt he condition here or else we can set as query in book controller loike status:{
          $ne=''pending' or 'sold'} */}
          <div className='md:grid grid-cols-4'>
            {allBooks?.length > 0 ? allBooks?.map((items, id) => (<div key={id} className='p-3' hidden={items?.status == 'pending' || items?.status == 'sold'}>
              <div className='shadow-md p-3 '>
                <img src={items?.imageUrl} alt="" style={{ width: '300px', height: "300px" }} />
                <div className='flex justify-center flex-col items-center mt-2'>
                  <p className='text-blue-400 '>{items?.author}</p>
                  <h3>{items?.title}</h3>
                  {/* passing the item id so view cheymbo we can see the particular item */}
                  <Link to={`/view-book/${items?._id}`} className='w-full'> <button className='bg-blue-900 w-full p-2 text-white hover:bg-blue-950'>View book</button></Link>
                </div>

              </div>
            </div>))
              : <p>Loading...</p>}



          </div>
        </div>
      </div>

        //  Lock image to display so non login user cant see the the conten t

        : <div className="md:grid grid-cols-3 md:px-10 px-5 my-10">
          <div> </div>
          <div>
            <img src="https://cdn.dribbble.com/users/846207/screenshots/17484538/media/32de5311b18501ff62be3ca5c0724ec2.gif" alt="Lock_image" style={{ width: '100%', height: '400px', borderRadius: '10%' }} />
            <h1 className='text-3xl text-center text-blue-700 mt-10'>Please <Link to={'/login'} className='text-red-600 underline px-2'>Login</Link>  To Explore More...</h1>
          </div>
          <div></div>
        </div>}


      <Footer />
    </>
  )
}

export default AllBooks