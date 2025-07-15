import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faPlus } from '@fortawesome/free-solid-svg-icons'
import EditProfile from '../components/EditProfile'
import { toast, ToastContainer } from 'react-toastify'
import { addBookAPi, deleteBookApi, getAllUserAddedBooksApi, getAllUserPurchasedBooksApi } from '../../../services/allAPi'
import { serverUrl } from '../../../services/serverUrl'
import { userProfileUpdateStatusContext } from '../../context/ContextShare'
import { useContext } from 'react'

function Profile() {
  const [sellStatus, setSellStatus] = useState(true);
  const [bookStatus, setBookStatus] = useState(false);
  const [purchaseStatus, setPurchaseStatus] = useState(false);
  const [userAddedBooks, setUserAddedBooks] = useState([])

  const [userPurchasedBooks, setUserPurchasedBooks] = useState([])


  const [deleteStatus, setDeleteStatus] = useState({})
  // to store the data of book in backend for that we want to access the data from input 
  //so setting the state for that 

  const [bookDetails, setBookDetails] = useState({
    title: "",
    author: "",
    publisher: "",
    language: "",
    noOfPages: "",
    isbn: "",
    imageUrl: "",
    category: "",
    price: "",
    dprice: "",
    abstract: "",
    uploadImages: [] //becasue we want to add many imgaes of book

  })

  // to check whether we can add the data 
  // console.log(bookDetails)

  // to keep the recent  uploaded image url in preview
  const [preview, setPreview] = useState("")


  // all uploaded image when we click the + button

  const [allUploadImage, setAllUploadImage] = useState([])

  // to accessing the token from sessionStorage
  const [token, setToken] = useState("")

  // to store the userDetails only we need username and profile 
  const [userProfile, setUserProfile] = useState({
    username: "",
    bio: "",
    profile: ""
  })

  // 
  const { userProfileUpdateStatus } = useContext(userProfileUpdateStatusContext)


  // when the type is text then we can get the value in e.target.value
  // whereas type=file then to access the file e.target.files
  // when we call e.target we can access entire input but when we need to access the value of input then we have to use e.target.value or files depend upon the type
  const handleUpload = (e) => {
    //  press cheytha event il ula target il ula files
    // console.log(e.target.files)
    const fileArray = bookDetails.uploadImages
    // 0 th index il aanu ela files um indaavua
    fileArray.push(e.target.files[0])
    setBookDetails({ ...bookDetails, uploadImages: fileArray })
    // to see the files as url use -> URL.createObjectUrl()
    // to convert file into url
    // file is an object we cant give the object in img src we need url to give in img 
    // so converting the file into url and then setting the url into img to display
    const url = URL.createObjectURL(e.target.files[0])
    //console.log('url'+url) //we get url of the image
    setPreview(url) //as we are setitng the url in setPreview
    // console.log('preview' + preview) //we get url of the images
    let images = allUploadImage //now images has array of imgaes //access the state and store it in variable 
    // images is an array so pushing all the url in images
    images.push(url)
    // and setting it in state
    setAllUploadImage(images)
    // console.log(allUploadImage)
  }

  // to handle reset
  const handleReset = () => {
    setBookDetails({
      title: "",
      author: "",
      publisher: "",
      language: "",
      noOfPages: "",
      isbn: "",
      imageUrl: "",
      category: "",
      price: "",
      dprice: "",
      abstract: "",
      uploadImages: []
    }),
      setAllUploadImage([]),

      setPreview("")
  }

  // to submit
  const handleSubmit = async () => {
    // first we have to ensure we have all the values
    // so lets destrucutre from bookDetails
    const { title, author, publisher, language,
      noOfPages,
      isbn,
      imageUrl,
      category,
      price,
      dprice,
      abstract,
      uploadImages } = bookDetails
    // just check we received it so console and check
    // console.log(title, author, publisher, language,
    //   noOfPages,
    //   isbn,
    //   imageUrl,
    //   category,
    //   price,
    //   dprice,
    //   abstract,
    //   uploadImages)

    if (!title || !author || !publisher || !language || !noOfPages || !isbn || !imageUrl || !category || !price || !dprice || !abstract, uploadImages.length == 0) {
      toast.info('please completer the form properly')
    }
    else {
      // if there is uploaded content the data  should be send as form data
      // that means system nn uploaded  cheythadhu uploaded content  its not available it internet so if other wants to see the images which we uploaded from our system then we have to handle it in different way
      // 1) create an object for the formdata class
      const reqBody = new FormData()
      // then append the key,value one by one 
      // reqBody.append("title", bookDetails.title);
      // reqBody.append("author", bookDetails.author);
      // reqBody.append("price", bookDetails.price);
      // or using loop
      for (let key in bookDetails) {
        // explicit the uploadImages because that where we have the url so have to handle seperately
        // if key uploadImages  alenkil
        // as upload imgaes is a array we have many content in that so have to access one by one by loop so will do it seperately
        if (key !== 'uploadImages') {
          reqBody.append(key, bookDetails[key])
        } else {
          bookDetails.uploadImages.map((item) => {
            reqBody.append("uploadImages", item)
          })
        }
      }
      //console.log(reqBody) //op FormData - big object - can clearly see in the backend

      // create reqHeader because we can only pass the token in header
      // "Bearer" is a keyword used in the Authorization header to indicate that the token is a bearer token, meaning the client possessing the token is authorized to access the resource the client dont need any other credentials
      // The bearer schema, or bearer authentication, is an HTTP authentication scheme where a client presents a token (a "bearer token") to a server to access protected resources. The name implies that "access is given to the bearer of this token". It's a way to grant access based on possession of a token, similar to how a concert ticket grants access to the bearer. Bearer tokens are commonly used in OAuth 2.0 and JWT (JSON Web Token) for API authentication and authorization
      const reqHeader = {
        "Authorization": `Bearer ${token}`
      }
      const result = await addBookAPi(reqBody, reqHeader)
      // console.log(result)
      if (result.status == 200) {
        toast.success('Book added successfully')
        // handleReset()

      } else if (result.status == 401) {
        toast.warning('Book Already exist')

      } else {
        toast.error('Something Went wrong')
      }
      handleReset()
    }
  }

  // get user added book

  const getAllUserAddedBooks = async (token) => {
    const reqHeader = {
      "Authorization": `Bearer ${token}`
    }
    const result = await getAllUserAddedBooksApi(reqHeader)
    console.log(result)
    setUserAddedBooks(result.data)
    console.log(userAddedBooks)
  }

  // get user purchased book

  const getAllUserPurchasedBooks = async (token) => {

    const reqHeader = {
      "Authorization": `Bearer ${token}`
    }
    const result = await getAllUserPurchasedBooksApi(reqHeader)
    // console.log('userPurchasedBooks Result is', result)
    setUserPurchasedBooks(result.data)
    console.log('userPurchasedBooks', userPurchasedBooks)
  }

  // delete a book method

  const deleteAbook = async (id) => {
    const result = await deleteBookApi(id)
    console.log(result)
    if (result.status == 200) {
      setDeleteStatus(result)
    }
  }

  // to  Add book info
  // to ensure the login person only should send the book info 
  // so to ensure that token can be use
  // as we already have token in sessionStorage so accessing it from there.. 
  // whenever user using the book component then this dependecy should  work thats why we are giving it in useEffect
  // useEffect(() => {
  // const tok = sessionStorage.getItem("token");

  // if (tok) {
  //   setToken(tok);
  //   if (sessionStorage.getItem("token")) {
  //     setToken(sessionStorage.getItem("token"))
  //     const tok = sessionStorage.getItem("token")
  //     setToken(tok)
  // instead of tok==true or bookStatus==true
  //     if (bookStatus) {
  //       getAllUserAddedBooks(tok)
  //     }
  //     else if (purchaseStatus) {
  //       getAllUserPurchasedBooks(tok)
  //     }
  //     else {
  //       console.log('something went wrong')
  //     }
  //   }

  // }, [bookStatus, purchaseStatus, deleteStatus])

  useEffect(() => {
    const tok = sessionStorage.getItem("token")

    if (tok) {
      setToken(tok)

      if (bookStatus) {
        getAllUserAddedBooks(tok)
      } else if (purchaseStatus) {
        getAllUserPurchasedBooks(tok)
      } else {
        console.log('something went wrong')
      }
    }
  }, [bookStatus, deleteStatus,purchaseStatus])

  // to access the user details in profile page
  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      const user = JSON.parse(sessionStorage.getItem("existingUser"))
      setUserProfile({
        username: user.username,
        bio: user.bio,
        profile: user.profile
      })
    }
  }, [userProfileUpdateStatus])



  return (
    <>
      <Header />
      {/* profile pic */}
      <div className=' bg-gray-900  ' style={{ height: '200px' }}></div>
      <div className='bg-black p-3  flex justify-center items-center' style={{ width: '230px', height: '230px', borderRadius: '50%', marginLeft: '70px', marginTop: '-130px' }}>
        <img src={userProfile.profile == "" ? "https://static.vecteezy.com/system/resources/thumbnails/042/156/821/small_2x/user-3d-graphic-illustration-free-png.png" : userProfile.profile.startsWith('https') ? userProfile.profile : `${serverUrl}/uploads/${userProfile.profile}}`} alt="" style={{ width: '200px', height: '200px', borderRadius: '50%' }} />
      </div>
      {/* Name and edit */}
      <div className='my-5 md:px-20 px-10 flex justify-between'>
        <div className='flex items-center justify-center'>
          <h1 className='text-3xl'>{userProfile.username}</h1>
          <FontAwesomeIcon icon={faCircleCheck} className='ms-3 text-blue-400 mt-2' />
        </div>
        <EditProfile />
      </div>
      <p className='text-justify md:px-20 px-5 my-5 text-lg'>{userProfile.bio == "" ? "Hey...GIve your bio" : userProfile.bio} </p>
      {/* tab section */}
      <div className='md:px-40 px-5 mb-10'>
        <div className="flex justify-center items-center text-xl">
          <p onClick={() => { setSellStatus(true); setBookStatus(false); setPurchaseStatus(false) }} className={sellStatus ? ' cursor-pointer px-4 py-3 text-blue-500  border-gray-300 border-l border-t border-r  rounded' : 'px-4 py-3  border-gray-300 border-b rounded'}>Sell Book</p>
          <p onClick={() => { setSellStatus(false); setBookStatus(true); setPurchaseStatus(false) }} className={bookStatus ? ' cursor-pointer px-4 py-3 text-blue-500  border-gray-300 border-l border-t border-r  rounded' : 'px-4 py-3  border-gray-300 border-b rounded'}>Book Status</p>
          <p onClick={() => { setSellStatus(false); setBookStatus(false); setPurchaseStatus(true) }} className={purchaseStatus ? 'cursor-pointer px-4 py-3 text-blue-500 border-gray-300 border-l border-t border-r  rounded' : 'px-4 py-3  border-gray-300 border-b rounded'}>Purchase History</p>
        </div>
        {/* sell book section */}
        {sellStatus && <div className='md:p-10'>
          <div className='bg-gray-300 md:p-5 rounded overflow-hidden'>
            <h1 className='text-center text-4xl font-medium'>Book Details</h1>
            <div className="md:grid grid-cols-2">
              {/* first div */}
              <div className='md:my-10 px-2'>
                <div className="mb-3">
                  <input type="text" value={bookDetails.title} onChange={(e) => setBookDetails({ ...bookDetails, title: e.target.value })} placeholder='Title' className='p-2 bg-white rounded w-full' />
                </div>
                <div className="mb-3">
                  <input type="text" value={bookDetails.author} onChange={(e) => setBookDetails({ ...bookDetails, author: e.target.value })} placeholder='Author' className='p-2 bg-white rounded w-full' />
                </div>
                <div className="mb-3">
                  <input type="text" value={bookDetails.noOfPages} onChange={(e) => setBookDetails({ ...bookDetails, noOfPages: e.target.value })} placeholder='No.Of.Pages' className='p-2 bg-white rounded w-full' />
                </div>
                <div className="mb-3">
                  <input type="text" value={bookDetails.imageUrl} onChange={(e) => setBookDetails({ ...bookDetails, imageUrl: e.target.value })} placeholder='Image Url' className='p-2 bg-white rounded w-full' />
                </div>
                <div className="mb-3">
                  <input type="text" value={bookDetails.price} onChange={(e) => setBookDetails({ ...bookDetails, price: e.target.value })} placeholder='Price' className='p-2 bg-white rounded w-full' />
                </div>
                <div className="mb-3">
                  <input type="text" value={bookDetails.dprice} onChange={(e) => setBookDetails({ ...bookDetails, dprice: e.target.value })} placeholder='Discounted Price' className='p-2 bg-white rounded w-full' />
                </div>
                <div className="mb-3">
                  <textarea name="" value={bookDetails.abstract} onChange={(e) => setBookDetails({ ...bookDetails, abstract: e.target.value })} id="" placeholder='Abstract:' rows={'8'} className='p-2 bg-white rounded w-full'></textarea>
                </div>
              </div>
              {/* second div */}
              <div className='md:px-2 px-1 md:my-10'>
                <div className="mb-3">
                  <input type="text" value={bookDetails.publisher} onChange={(e) => setBookDetails({ ...bookDetails, publisher: e.target.value })} placeholder='Publisher' className='p-2 bg-white rounded w-full' />
                </div>
                <div className="mb-3">
                  <input type="text" value={bookDetails.language} onChange={(e) => setBookDetails({ ...bookDetails, language: e.target.value })} placeholder='Language' className='p-2 bg-white rounded w-full' />
                </div>
                <div className="mb-3">
                  <input type="text" value={bookDetails.isbn} onChange={(e) => setBookDetails({ ...bookDetails, isbn: e.target.value })} placeholder='ISBN' className='p-2 bg-white rounded w-full' />
                </div>
                <div className="mb-3">
                  <input type="text" placeholder='Category' value={bookDetails.category} onChange={(e) => setBookDetails({ ...bookDetails, category: e.target.value })} className='p-2 bg-white rounded w-full' />
                </div>
                {/* to upload file -> type :file 
                to connect input and label use for and id but in reacts its a html For */}
                <div className='flex justify-center items-center mt-10 flex-col'>
                  {/* label and input are connected cia htmlFor and id attribute and we gave display none for input  */}
                  {/* so when we clcik the label we can access the input vice versa */}
                  {/* if preview is not present then default upload image shouls hdow */}
                  {!preview ? <label htmlFor="upload_book_image">
                    <input type="file" id='upload_book_image' style={{ display: 'none' }} onChange={(e) => handleUpload(e)} />
                    <img src="https://www.freeiconspng.com/uploads/upload-icon-3.png" alt="" style={{ height: '200px', width: '200px' }} />
                  </label> : <img src={preview} alt="" style={{ height: '200px', width: '200px' }} />}
                  {/* or whatever the image we uploaded it has to show here */}


                  {/* to show the uploaded images */}
                  {/* if preview first image is uploaded then only it show the + sign and images */}
                  {preview && <div className='mt-10 flex items-center'>
                    {
                      allUploadImage.map((items, id) => (
                        <img key={id} src={items} alt="" style={{ width: '100px', height: '100px' }} className='mx-2' />
                      ))
                    }

                    {/* when user click the + icon pop up has to come ti upload file thats why we give it in label */}
                    {/* when the + button clciked we have to upload the image */}
                    {/* only we need to upload 3 images so fater 3 imgaes + button shoul not be seen */}
                    {allUploadImage.length < 3 && <label htmlFor="upload_book_image">
                      <input type="file" onChange={(e) => handleUpload(e)} id='upload_book_image' style={{ display: 'none' }} />
                      <FontAwesomeIcon icon={faPlus} className='p-2 shadow-lg bg-gray-300 border border-white ms-4' />
                    </label>}

                  </div>}
                </div>

              </div>
            </div>
            <div className="flex justify-end">
              <button className='bg-amber-700 text-white px-5 py-3 rounded hover:border hover:border-amber-700 hover:bg-white text-lg hover:text-amber-700' onClick={handleReset}>Reset</button>
              <button className='bg-green-700 text-white px-5 py-3 rounded hover:border hover:border-green-700 hover:bg-white ms-4 text-lg hover:text-green-700' onClick={handleSubmit}>Submit</button>
            </div>
          </div>
        </div>}
        {/* boot status section */}
        {bookStatus && <div className='md:p-10  my-20 shadow'>
          {userAddedBooks.length > 0 ? userAddedBooks.map((items, index) => (<div key={index} className=' p-5'>
            <div className="md:grid grid-cols-[3fr_1fr] md:p-10 bg-gray-200 mb-10" >
              <div className=''>
                <h1 className='text-2xl'>{items.title}</h1>
                <p>{items.author}</p>
                <h3>$ {items.dprice}</h3>
                <p>{items.abstract}</p>
                <div className="flex">
                  {items?.status == 'pending' ? <img src="https://previews.123rf.com/images/newdesignillustrations/newdesignillustrations1811/newdesignillustrations181115287/127557450-decision-pending-stamp-seal-watermark-with-distress-style-blue-vector-rubber-print-of-decision.jpg" alt="" style={{ width: '100px', height: '100px' }} />
                    : items?.status == 'Approved' ?
                      <img src="https://c8.alamy.com/comp/ERDFRB/vector-illustration-of-green-approved-stamp-concept-ERDFRB.jpg" alt="" style={{ width: '100px', height: '100px' }} /> :
                      <img src="https://cdn-icons-png.flaticon.com/512/6188/6188726.png" alt="" style={{ width: '100px', height: '100px' }} />}
                </div>

              </div>

              <div className='flex items-end  flex-col'>

                <img src={items?.imageUrl
                } alt="book_image" style={{ width: '200px', height: '200px' }} />

                <button type='button' onClick={() => deleteAbook(items._id)} className='bg-red-500 auto rounded text-center text-white px-5 py-2 mt-10 ' >Delete</button>
              </div>
            </div>



          </div>))


            :
            // {/* no books added  */}
            <div className='flex justify-center items-center flex-col mt-20'>
              <img src="https://cdn.pixabay.com/animation/2023/06/05/13/36/13-36-27-162_512.gif" alt="" style={{ width: '100px', height: '100px' }} />
              <p className='text-red-400 mt-10 text-2xl' >No Books Added Yet...</p>
            </div>}



        </div>}
        {/* purchase history section */}
        {purchaseStatus && <div className='md:p-10  my-20 shadow'>
          {userPurchasedBooks.length > 0 ?
            userPurchasedBooks.map((items, index) => (
              <div key={index} className=' p-5'>
                <div className="md:grid grid-cols-[3fr_1fr] md:p-10 bg-gray-200 mb-10" >
                  <div className=''>
                    <h1 className='text-2xl'>{items?.title}</h1>
                    <p>{items?.author}</p>
                    <h3>${items?.dprice}</h3>
                    <p>{items?.abstract}</p>

                  </div>
                  <div className='flex md:items-end items-center  flex-col'>
                    <img src={items?.imageUrl} alt="book_image" style={{ width: '200px', height: '200px' }} />

                  </div>
                </div>
                {/* no books added  */}

              </div>
            ))


            : <div className='flex justify-center items-center flex-col mt-20'>
              <img src="https://cdn.pixabay.com/animation/2023/06/05/13/36/13-36-27-162_512.gif" alt="" style={{ width: '100px', height: '100px' }} />
              <p className='text-red-400 mt-10 text-2xl' >No Books Purchased Yet...</p>
            </div>}
        </div>

        }
      </div >
      <ToastContainer position='top-center' theme='colored' autoClose={2000} />
      <Footer />
    </>
  )
}

export default Profile