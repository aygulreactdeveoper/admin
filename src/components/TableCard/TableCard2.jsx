import React, { useState, useEffect } from 'react'
import { Edit, User, Trash2, Image } from 'react-feather'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function TableCard2({active}) {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [data, setData] = useState([])
    const [succes, setSucces] = useState(false)

    const navigate = useNavigate()
    
    useEffect(()=> {

    const fetchData = async() => {
        const headers = {
        'accept': '*/*',
        'Content-Type': 'application/json',
        };

        try {
            setLoading(true)
            setError('')
            setSucces(false)

            const response = await axios.post('https://sapsargyt.saphasap.com/testmplace/api/resource/withprice', headers)
            setData(response.data.data)
            console.log(response.data.data);
            
            setSucces(true)
            // console.log(data); 

        } catch (err) {
            if (err.response) {
                console.error(err.response.data)
            }

            setError(err.response)

            console.error(err)  

        } finally {

            setLoading(false)
        }
    }
    fetchData()
}, [])


    if (loading) {
        return ( 

            <div> идёт загрузка данных </div>
        )
    }

    if (error) {   
        return (<div>Ошибка</div> )
    }

  return (
    <div>
    <div className={`flex flex-col ${active ? 'ml-64 w-[calc(100%-16rem)]' : 'ml-0 w-full'}`}>
  <div className="-m-1.5 overflow-x-auto">
    <div className='p-1.5 w-full inline-block align-middle'>
      <div className="border rounded-lg divide-y divide-gray-200 dark:border-gray-700 dark:divide-gray-700">
        <div className="py-3 px-4 bg-gray-100">
          <div className="relative max-w-xs">
            <label className="sr-only">Search</label>
            <input type="text" name="hs-table-with-pagination-search" id="hs-table-with-pagination-search" className=" bg-gray-10 py-2 px-3 ps-9 block w-full border-green-300 shadow-sm rounded-lg text-sm focus:z-10 focus:border-green-500 focus:ring-green-500 disabled:opacity-50 disabled:pointer-events-none" placeholder="Search for items" />
            <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-3">
              <svg className="h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            </div>
          </div>
        </div>
        <div className="overflow-hidden">
          <table className="w-full  divide-y divide-gray-200 dark:divide-gray-700 ">
            <thead className="bg--100 dark:bg-gray-700">
              <tr className='bg-gray-100'>
                <th scope="col" className="py-3 px-4 pe-0 ">
                  <div className="flex items-center h-5">
                    <Image id="hs-table-pagination-checkbox-all" className=" rounded text-gray-600 "/>
                  </div>
                </th>
                <th scope="col" className="px-5 py-3 text-start text-xs font-medium text-gray-500 uppercase">ResRegNo</th>
                <th scope="col" className="px-5 py-3 text-start text-xs font-medium text-gray-500 uppercase">ProductName</th>
                <th scope="col" className="px-5 py-3 text-start text-xs font-medium text-gray-500 uppercase">Category</th>
                <th scope="col" className="px-5 py-3 text-start text-xs font-medium text-gray-500 uppercase">Brand</th>
                <th scope="col" className="px-5 py-3 text-start text-xs font-medium text-gray-500 uppercase">Price</th>
                <th scope="col" className="px-5 py-3 text-start text-xs font-medium text-gray-500 uppercase">Description</th>
                <th scope="col" className="px-5 py-3 text-center text-xs font-medium text-gray-500 uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700 ">
              
                    {data.map((dataItem, index)=> {
                        return (
                        <>
                        <tr className='hover:bg-green-30' key={index}>
                            <td className="py-3 ps-4">
                            <div className="flex items-center h-5">
                                <img src={ `https://sapsargyt.saphasap.com/testmplace/${dataItem?.Images[0]?.FilePath + 'R/' + dataItem?.Images[0]?.FileName}`} alt='Add Image' className="border-gray-200 rounded-lg w-12 h-10"/>
                            </div>
                            </td>
                            <td className="px-0 py-4 whitespace-nowrap text-sm text-gray-800 font-medium">{dataItem.ResRegNo}</td>
                            <td className="px-0 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{dataItem.ResName}</td>
                            <td className="px-0 py-4 whitespace-nowrap text-sm text-gray-800 text-center">{dataItem.CatGuid === null ? 'Add Category' : dataItem.CatGuid}</td>
                            <td className="px-0 py-4 whitespace-nowrap text-sm text-gray-800 text-center">{dataItem.BrandGuid === null ? 'Add Brand' : dataItem.BrandGuid}</td>

                            <td className="px-0 py-4 whitespace-nowrap text-sm text-gray-800 text-center">{dataItem.ResourceResPrice[0].ResPriceValue === 0 ? '0 Add Price': dataItem.ResourceResPrice[0].ResPriceValue }</td>
                            <td className="px-0 py-4 whitespace-nowrap text-sm text-gray-800">{dataItem.ResDesc  === '' ? 'Add Description' : dataItem.ResDesc}</td>
                            <td className="px-0 py-3 whitespace-nowrap text-end text-sm font-medium">
                                <button 
                                type="button" 
                                onClick={ () => {succes ? navigate('/edit-card', {state:{data: dataItem}}) : null}}
                                className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-gray-500 p-1 text-gray-600 hover:text-green-800 disabled:opacity-50 disabled:pointer-events-none dark:text--500 dark:hover:text-green-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 mr-4">
                                  <Edit size={20}></Edit>
                                  Edit
                                </button>
                                <button 
                                type="button" 
                                className="inline-flex items-center gap-x-2 p-1 text-sm font-semibold rounded-lg border border-red-500 text-red-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"> 
                                  <Trash2 size={20}/>
                                  Delete
                                </button>
                            </td>
                        </tr>
                        </>
                        )
                    })
                }
            </tbody>
          </table>
        </div>
        <div className="py-1 px-4">
          <nav className=" space-x-1 flex flex-col items-center px-5 py-5 bg-white xs:flex-row xs:justify-between">
            <div className="flex items-center">
            <button type="button" className="p-2.5 inline-flex items-center gap-x-2 text-sm rounded-full text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none">
              <span aria-hidden="true">«</span>
              <span className="sr-only">Previous</span>
            </button>
            <button type="button" className="min-w-[40px] flex justify-center items-center text-gray-800 hover:bg-gray-100 py-2.5 text-sm rounded-full disabled:opacity-50 disabled:pointer-events-none " aria-current="page">1</button>
            <button type="button" className="min-w-[40px] flex justify-center items-center text-gray-800 hover:bg-gray-100 py-2.5 text-sm rounded-full disabled:opacity-50 disabled:pointer-events-none ">2</button>
            <button type="button" className="min-w-[40px] flex justify-center items-center text-gray-800 hover:bg-gray-100 py-2.5 text-sm rounded-full disabled:opacity-50 disabled:pointer-events-none ">3</button>
            <button type="button" className="p-2.5 inline-flex items-center gap-x-2 text-sm rounded-full text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none">
              <span className="sr-only">Next</span>
              <span aria-hidden="true">»</span>
            </button>
            </div>
            </nav>

        </div>
        
      </div>
    </div>
  </div>
</div>
    </div>
  )
}

export default TableCard2