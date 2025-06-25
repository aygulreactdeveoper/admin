import React, { useState } from 'react'
import { Home } from 'react-feather'
import EditPage from '../../components/EditCard/EditPage'


function HomePage({activeSideBar, sideBarFnc}) {

  return (
    <>
    <main className={`justify-center items-center flex text-6xl align-center mt-20 ml-20 ${activeSideBar ? 'ml-64 w-[calc(100%-16rem)]' : 'ml-0 w-full'}`}> welcome to the Home
      <p><Home size={300} className=' p-7'></Home></p>
    </main>
    </>

  )
}

export default HomePage