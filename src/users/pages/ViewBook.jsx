import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBackward, faCamera, faEye, faXmark } from '@fortawesome/free-solid-svg-icons'
import { Link, useParams } from 'react-router-dom'
import { makePaymentApi, viewBookApi } from '../../../services/allAPi'
import { serverUrl } from '../../../services/serverUrl'
import { loadStripe } from '@stripe/stripe-js';
function ViewBook() {
  const [modalStatus, setModalStatus] = useState(false)

  // to view the book
  const [viewBook, setviewBook] = useState({})

  // to keep the token from session storage

  const [token, setToken] = useState("")
  // to access the path to get the individual view book id -> path website url
  const { id } = useParams()
  console.log(id); //op:685cc180862d134c1c44099c

  const getViewBookDetails = async (id) => {
    // console.log('the id is '+ id)

    const result = await viewBookApi(id)
    // if (result.status === 200) {
    // console.log('hi', result)
    // console.log('data', result.data)
    // 
    // setviewBook(result.data)
    setviewBook(result.data[0])
    // }


  }
  console.log('the viewbook', viewBook)

  // when the user click buy this method should call 
  const makePayment = async () => {
    // we can see the enite book in viewbook
    console.log(viewBook)
    // same we gave in backend so give the same key as we destructure there
    const reqBody = {
      bookDetails: viewBook
    }

    const reqHeader = {
      "Authorization": `Bearer ${token}`
    }

    const result = await makePaymentApi(reqBody, reqHeader)
    console.log("Full API response:", result);
    console.log("data:", result.data);
    //from backend
    const sessionId = result.data.sessionId
    // console.log(sessionIdFromBackend)
    console.log(sessionId)
    // stripe object instance to load the stripe page in frontend
    // copy the public key from stripe website after login we get it
    const stripe = await loadStripe('pk_test_51RkgXjR8Cdp76XoHGsCcNEgMgCgWSRcfGACcR0gbYJRkM7dmqbKBL05zuYZznNWNEhRZKGnMJQstl5rDf0PxIRQU00098zAUso');
    // depends upon the id we receive from backend we have to redirect to page 
    // so to redirect we use stripe.redirectToCheckout

    const response = await stripe.redirectToCheckout({
      sessionId: sessionId
    })
    // incase any error from backend(response) we are going to show alert
    if (response.error) {
      alert("Something went wrong")
    }
  }


  useEffect(() => {
    getViewBookDetails(id)
    if (sessionStorage.getItem("token")) {
      setToken(sessionStorage.getItem("token"))
    }

  }, [])

  return (
    <div>
      <Header />
      {/* modal */}
      {modalStatus && <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true" >

        <div className="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex md:min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">

            <div className="relative transform overflow-hidden rounded-md bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-4xl" >
              <div className="bg-white">
                <div className='bg-gray-900 text-white p-4 flex justify-between items-center'>
                  <p className='text-xl '>Book Photos</p>
                  <FontAwesomeIcon icon={faXmark} className='fa-2x' onClick={() => setModalStatus(false)} />
                </div>
                <div className='p-4'>
                  <h1 className='text-blue-400 mb-4'><FontAwesomeIcon icon={faCamera} className='me-3' />Camera Click of the Book in tha Hand of the seller</h1>
                  {/* to set atleast 3 imgaes */}
                  {/* the uploads name is we export the image folder from backend names there as uploads and inside the uploadImages -> the images are in filename key  */}
                  <div className='md:flex '>
                    {viewBook?.uploadImages?.map((item) => (<img src={`${serverUrl}/uploads/${item.filename}`} alt="Book_image" style={{ width: '300px ', height: '300px' }} className='mx-2 mt-2 md:mt-0' />))}

                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>}
      {/* main */}
      <div className='p-5' >
        <div className='md:p-20 p-5 md:grid grid-cols-[1fr_3fr] w-full ' style={{ border: '1px solid black' }}>
          <div>
            <img src={viewBook?.imageUrl} alt="book_image" />
          </div>
          <div className='px-5'>
            <div className='flex justify-end'>
              <FontAwesomeIcon icon={faEye} onClick={() => setModalStatus(true)} />
            </div>
            <h1 className='text-center text-2xl font-bold md:mt-10 mt-5'>{viewBook?.title}</h1>
            <h6 className='text-center'>{viewBook.author}</h6>

            <div className='md:flex justify-between  p-2 md:p-10 ms-20'>
              <div className=''>
                <h4>Publisher : {viewBook?.publisher}</h4>
                <h4>Seller Mail : maxwell@gmail.com</h4>
              </div>
              <div className='me-10'>
                <h4>Language :{viewBook?.language}</h4>
                <h4>Real Price : ${viewBook?.price}</h4>
              </div>
              <div className='me-10'>
                <h4>No.of.pages :{viewBook?.noOfPages} </h4>
                <h4>ISBN :{viewBook?.isbn}</h4>
              </div>
            </div>

            <p className='md:ms-20 text-justify'>{viewBook?.abstract}</p>


            <div className='flex justify-end mt-10'>
              <Link><button className='bg-violet-400 px-7 py-2 text-white hover:bg-white hover:border hover:border-violet-400 hover:text-violet-400 me-5'><FontAwesomeIcon icon={faBackward} className='me-2' />Back</button></Link>
              <Link><button type='button' onClick={makePayment} className='bg-green-800 px-7 py-2 text-white hover:bg-white hover:text-green-800 hover:border hover:border-green-800'>Buy $ {viewBook?.dprice}</button></Link>
            </div>

          </div>
        </div>

      </div>
      <Footer />
    </div>
  )
}

export default ViewBook