import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import { homebookApi } from '../../services/allAPi'


function LandingPage() {
  const [allHomeBook, setAllHomeBook] = useState([])
  const getAllHomeBooks = async () => {
    const result = await homebookApi()
    //console.log(result)  //op: lots of key in that our data will be in data key
    //console.log(result.data) //to see exactly our data 
    setAllHomeBook(result.data)
  }
  console.log(allHomeBook)
  useEffect(() => {
    getAllHomeBooks()
  }, [])
  return (
    <div>
      <Header />
      <div style={{ backgroundColor: 'gray', width: '100%' }}>


        <div className=' bg-cover bg-center h-96 w-ful  flex justify-center items-center flex-col '
          style={{ backgroundImage: "url('https://static.vecteezy.com/system/resources/previews/030/503/504/non_2x/lots-of-books-on-the-table-in-front-of-the-library-shelves-generative-ai-photo.jpg')" }}>
          <div >
            <h1 className='text-5xl  text-white'>Wonderful Gifts</h1>
            <p className='text-justify  ms-5 p-2 text-white'>Give your family and friends a book</p>
            <div className='flex justify-center items-center'>
              <div className='flex  w-full'>
                <input type="text" placeholder='Search Books' className='bg-white rounded  py-1 placeholder-gray-400 w-full text-black px-4' />

                <FontAwesomeIcon icon={faMagnifyingGlass} style={{ marginTop: '10px', marginLeft: '-30px' }} className='text-blue-800' />

              </div>
            </div>
          </div>
        </div>
      </div>
      {/* book section */}

      <div className='flex justify-center flex-col items-center'>
        <h1 className=' mt-5 text-xl'>NEW ARRIVALS</h1>
        <h3 className=' font-bold text-2xl'>Explore Our Latest Collection</h3>
        <div className='md:grid grid-cols-4 p-10 gap-5 ms-20 me-20  mb-5'>

          {allHomeBook.length > 0 ? allHomeBook.map((items) => (<div className='shadow p-2 flex justify-center flex-col items-center'>
            <img src={items.imageUrl} alt="" style={{ width: '300px', height: "300px" }} />
            <p className='text-blue-400 mt-2'>{items.author}</p>
            <p>{items.title}</p>
            <p>${items.price}</p>
          </div>)) :

            <p>Loading...</p>}
        </div>

        <Link to={'/all-books'}><button className='border text-white bg-blue-950 p-3 mb-5 hover:border hover:border-blue-500 hover:bg-white'>Explore More</button></Link>
      </div>
      {/* if data is not coming it should shows  */}

      {/* about section */}


      <div className='flex justify-center items-center px-5 md:px-40 mb-10'>


        <div className='md:grid  grid-cols-2 gap-4'>

          <div>
            <div className='flex justify-center items-center flex-col mt-10'>

              <h1>FEATURED AUTHORS</h1>
              <p className=' text-2xl'>Captivates with every word</p>
            </div>

            <p className='mt-6 text-justify'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe quaerat harum, dolorum totam natus maxime officiis repudiandae alias dolore aliquam adipisci velit aliquid odio temporibus aspernatur debitis reiciendis voluptatum praesentium.Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe quaerat harum, dolorum totam natus maxime officiis repudiandae alias dolore aliquam adipisci velit aliquid odio temporibus aspernatur debitis reiciendis voluptatum praesentium.</p>
            <p className='text-justify'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat placeat deserunt explicabo ipsa, odit delectus porro alias sapiente ad! Delectus repellendus molestiae laborum, consequatur possimus veritatis tempore optio adipisci vel!Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe quaerat harum, dolorum totam natus maxime officiis repudiandae alias dolore aliquam adipisci velit aliquid odio temporibus aspernatur debitis reiciendis voluptatum praesentium.</p>

          </div>
          <div className='mt-10'>
            <img src="https://thumbs.dreamstime.com/b/portrait-male-african-american-professional-possibly-business-executive-corporate-ceo-finance-attorney-lawyer-sales-stylish-155546880.jpg" alt="" />
          </div>

        </div>
      </div>
      <div>

      </div>
      <Footer />
    </div>


  )
}

export default LandingPage