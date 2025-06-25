import React, {useState}from 'react';
import { Sidebar, Search, LogOut, Lock, User, Settings, File, Sun, Sunset, HelpCircle, Menu } from 'react-feather';


function Header({activeSideBar, sideBarFnc}) {
  const [activeLight, setActiveLight] = useState(false)
  const [activeSearch, setActiveSearch] = useState(false)
  const [activeSettings, setActiveSettings] = useState(false)

  function toogleLight(){
    setActiveLight(!activeLight)
  }
  function toogleSearch(){
    setActiveSearch(!activeSearch)
  }
  function toogleSettings(){
    setActiveSettings(!activeSettings)
  }



  
  return (
    <>
    <header className={` bg-white  py-3 px-4 sm:px-6 lg:px-8 flex items-center justify-between  ${activeSideBar ? 'ml-64 w-[calc(100%-16rem)]' : 'ml-0 w-full'} `}>
      <div className="flex items-center space-x-4">
        <button  className=" text-gray-600 hover:text-gray-900 focus:outline-none" onClick={sideBarFnc}>
          <Menu size={24} />
        </button>

      </div>

      <div className="flex items-center space-x-4">
        <div className="relative">
          <button 
            className="text-gray-600 hover:text-gray-900 focus:outline-none p-1 rounded-full hover:bg-gray-100" onClick={toogleSearch}>
            <Search size={20} />
          </button>
          <div className={`absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg z-10 ${!activeSearch ? 'hidden' :  '' }`}>
            <form className="p-2">
              <input 
                type="search" 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                placeholder="Search here..." 
              />
            </form>
          </div>
        </div>
        <div className="relative">
          <button 
            className="text-gray-600 hover:text-gray-900 focus:outline-none p-1 rounded-full hover:bg-gray-100"
            onClick={toogleLight}
          >
            <Sun size={20} />
          </button>
          <div className={`absolute right-0 mt-2 w-36 bg-white rounded-md shadow-lg z-10 ${activeLight ? '' : 'hidden'}`}>
            <a href="#!" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => layout_change('dark')}>
              <Sunset size={16} className="mr-2" />
              <span>Dark</span>
            </a>
            <a href="#!" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => layout_change('light')}>
              <Sun size={16} className="mr-2" />
              <span>Light</span>
            </a>
            <a href="#!" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => layout_change_default()}>
              <File size={16} className="mr-2" />
              <span>Default</span>
            </a>
          </div>
        </div>

        {/* User Menu */}
        
        <div className="relative">
          <button 
            className="text-gray-600 hover:text-gray-900 focus:outline-none p-1 rounded-full hover:bg-gray-100"
            onClick={toogleSettings}
          >
            <Settings size={20} />
          </button>
          <div className={`absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 ${activeSettings ? '' : ' hidden'} `}>
            <a href="#!" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              <User size={16} className="mr-2" />
              <span>My Account</span>
            </a>
            <a href="#!" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              <Settings size={16} className="mr-2" />
              <span>Settings</span>
            </a>
            <a href="#!" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              <HelpCircle size={16} className="mr-2" />
              <span>Support</span>
            </a>
            <hr className="my-1 border-gray-200" /> 
            <a href="#!" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              <Lock size={16} className="mr-2" />
              <span>Lock Screen</span>
            </a>
            <a href="#!" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              <LogOut size={16} className="mr-2" />
              <span>Logout</span>
            </a>
          </div>
        </div>
      </div>
    </header>

    
    
    </>
  );
}

export default Header;