import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../Header/Header'
import SideBar from '../SideBar/SideBar'

function Layout({activeSideBar, sideBarFnc}) {
  return (
    <div>
        <Header activeSideBar={activeSideBar} sideBarFnc={sideBarFnc}></Header>
        {activeSideBar ? <SideBar  intialactive={activeSideBar} sideBarFnc={sideBarFnc}></SideBar> : ''}
        <Outlet></Outlet>
    </div>
  )
}

export default Layout