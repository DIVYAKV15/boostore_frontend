import React, { useEffect, useState } from 'react'
import AdminHeader from '../components/AdminHeader'
import Footer from '../../components/Footer'
import AdminSideBar from '../components/AdminSideBar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faUsers, faUserTie } from '@fortawesome/free-solid-svg-icons'
import { Bar, BarChart, CartesianGrid, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { getAllApplicationApi, getAllBookAdminApi, getAllUsersApi } from '../../../services/allAPi'

function AdminHome() {
    const [noOfBooks, setNoOfBooks] = useState("")
    const [noOfUsers, setNoOfUsers] = useState("")
    const [noOfAppl, setNoOfAppl] = useState("")

    const data = [
        {
            "name": "Page A",
            "uv": 4000,
            "pv": 2400
        },
        {
            "name": "Page B",
            "uv": 3000,
            "pv": 1398
        },
        {
            "name": "Page C",
            "uv": 2000,
            "pv": 9800
        },
        {
            "name": "Page D",
            "uv": 2780,
            "pv": 3908
        },
        {
            "name": "Page E",
            "uv": 1890,
            "pv": 4800
        },
        {
            "name": "Page F",
            "uv": 2390,
            "pv": 3800
        },
        {
            "name": "Page G",
            "uv": 3490,
            "pv": 4300
        }
    ]
    // pie chart data
    const data01 = [
        {
            "name": "Group A",
            "value": 400
        },
        {
            "name": "Group B",
            "value": 300
        },
        {
            "name": "Group C",
            "value": 300
        },
        {
            "name": "Group D",
            "value": 200
        },
        {
            "name": "Group E",
            "value": 278
        },
        {
            "name": "Group F",
            "value": 189
        }
    ];
    const data02 = [
        {
            "name": "Group A",
            "value": 2400
        },
        {
            "name": "Group B",
            "value": 4567
        },
        {
            "name": "Group C",
            "value": 1398
        },
        {
            "name": "Group D",
            "value": 9800
        },
        {
            "name": "Group E",
            "value": 3908
        },
        {
            "name": "Group F",
            "value": 4800
        }
    ];

    const getDetails = async () => {
        const result = await getAllBookAdminApi()
        console.log(result)
        setNoOfBooks(result.data.length)

        const userResult = await getAllUsersApi()
        setNoOfUsers(userResult.data.length)

        const jobappl = await getAllApplicationApi()
        setNoOfAppl(jobappl.data.length)
    }
    useEffect(() => {
        getDetails()
    }, [])
    return (
        <>
            <AdminHeader />

            <div className="md:grid grid-cols-[1fr_5fr]">
                <div><AdminSideBar /></div>

                <div className='p-4'>
                    {/* grid */}
                    <div className="md:grid grid-cols-3 text-white">
                        {/* first  */}
                        <div className=' px-5'>
                            <div className='grid grid-cols-[1fr_3fr] bg-blue-950 rounded p-4'>
                                <div className='flex justify-center items-center'>
                                    <FontAwesomeIcon icon={faBook} className='fa-3x' />
                                </div>
                                <div>
                                    <h1 className='text-2xl'>Total number of books</h1>
                                    <h1 className='text-4xl'>{noOfBooks}</h1>
                                </div>
                            </div>

                        </div>
                        {/* second */}
                        <div className=' px-5 mt-4 md:mt-0'>
                            <div className='grid grid-cols-[1fr_3fr] bg-green-950 rounded p-4'>
                                <div className='flex justify-center items-center'>
                                    <FontAwesomeIcon icon={faUsers} className='fa-3x' />
                                </div>
                                <div>
                                    <h1 className='text-2xl'>Total number of users</h1>
                                    <h1 className='text-4xl'>{noOfUsers}+</h1>
                                </div>
                            </div>

                        </div>
                        {/* third */}
                        <div className=' px-5 mt-4 md:mt-0'>
                            <div className='grid grid-cols-[1fr_3fr] bg-yellow-400 rounded p-4'>
                                <div className='flex justify-center items-center'>
                                    <FontAwesomeIcon icon={faUserTie} className='fa-3x' />
                                </div>
                                <div>
                                    <h1 className='text-2xl'>Total number of Employee</h1>
                                    <h1 className='text-4xl'>{noOfAppl}+</h1>
                                </div>
                            </div>

                        </div>
                    </div>
                    {/* charts */}
                    <div className="md:grid grid-cols-2 px-4 my-10">
                        <div style={{ width: '100%', height: '500px' }} className='px-10'>
                            {/* responsive container used to place the chart in responsive way */}
                            <ResponsiveContainer width='100%' height='100%' >
                                {/* barchart ->type of chart used if its piechart then we will write the piechart
                                and data is attribute and data varaible whatever the data we want to  see in our page we will keep it in data */}
                                {/* data which holds the data to be displayed */}
                                <BarChart data={data}>
                                    {/* represent bg dotted line  3- px width 3 gap*/}
                                    <CartesianGrid strokeDasharray="3 3" />
                                    {/* x axis ->name il ula value display in x axis */}
                                    <XAxis dataKey="name" />
                                    {/* y axis - automatically arranged based on data */}
                                    <YAxis />
                                    {/* while we hover on the pie chart we can see the content in square thats the tooltip 
                                    without tooltip while hovering the bg gray and data will not be shown   
                                    */}
                                    <Tooltip />
                                    {/* to fetch the data while hovering */}
                                    <Legend />
                                    {/* first bar data is pv key il store cheytha value which has purple color 
                                    bar - datakey -data to display 
                                    fill -color of the bar */}
                                    <Bar dataKey="pv" fill="#8884d8" />
                                    <Bar dataKey="uv" fill="#82ca9d" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                        <div tyle={{ width: '100%', height: '500px' }} className='px-10'>
                            <ResponsiveContainer width='100%' height='100%' >
                                <PieChart >
                                    <Pie data={data01} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={50} fill="#8884d8" />
                                    <Pie data={data02} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#82ca9d" label />
                                </PieChart>
                            </ResponsiveContainer>

                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default AdminHome