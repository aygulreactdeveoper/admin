import React, {useState} from 'react';
import './SideBat.css';
import Dropdown from './Dropdown/Dropdown'; // Make sure this path is correct
import { Link } from 'react-router-dom';
import { User, Home, HelpCircle, LogOut, } from 'react-feather';



const objectListItems = [{
    name: 'HARYTLAR',
    optionName : 'Harytlar',
    options: ['Miweler', 'Gök önümler', 'Guradylan miweler',],
    icon: "ShoppingCart"
}, {
    name: 'KATEGORIALAR',
    optionName : 'Kategorialar',
    options: [ 'Cars', 'Услуги', 'Продукты Питания', ],
    icon: "Layers"
}, {
    name: 'BELLIKLER',
    optionName : 'Bellikler',
    options: ['Новинка', 'Скидка', 'Barcode', 'QR-code' ],
    icon: "Tag"
},]
const categories = [
  {
    id: 'electronics',
    name: 'Электроника',
  },
  {
    id: 'books',
    name: 'Книги',
  },
  {
    id: 'clothing',
    name: 'Одежда',
  },
  {
    id: 'home-goods',
    name: 'Товары для дома',
  },
  {
    id: 'sports',
    name: 'Спорт и Отдых',
  }
];

const justCategory = ['Help', 'HomeDashboard', 'Logout']

function SideBar({intialactive, sideBarFnc}) {


    
    return (
        <div className='big-sidebar'>
            <aside className={`sidebar shadow-lg  transition-all duration-300 + ${intialactive ? 'translate-x-0 duration-500' : '-translate-x-full duration-500'}`}>
                <div className="sidebar-header">
                    <User size={30} className='user-icon'/>
                    <h5 className='admin-panelbar'>Admin panelbar</h5>
                    <button className='close-btn' onClick={sideBarFnc}>&times;</button>
                </div>
                <div className="select-inputs">
                    {objectListItems.map((item, index) => (
                        <Dropdown active={intialactive}
                        icon={item.icon}
                        href={item?.href}
                            key={index} 
                            options={item.options}
                            selectedValue={item.optionName}
                            titleid={item.name}
                        />
                    ))}

                </div>
                <div className='btn-div'>
                    <button className='system-btn'>
                        <div className="header-text">
                            <HelpCircle size={24} className='menu-icon'/>
                            {justCategory[0]}
                        </div>
                    </button>
                    <button className='system-btn'>
                        <div className="header-text">
                            <Link to={'/'} >
                            <Home size={24} className='menu-icon'/>
                            {justCategory[1]}
                            </Link>
                        </div>
                    </button>
                    <button className='system-btn-logout'>
                        <div className="header-text">
                            <Link to={'/login'}>
                            <LogOut size={24} className='menu-icon'/>
                            {justCategory[2]}
                            </Link>
                        </div>
                    </button>
                </div>
            </aside> 
         </div>
    )
}

export default SideBar;

