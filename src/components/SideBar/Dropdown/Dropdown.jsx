// Dropdown/Dropdown.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Menu, Package, Layers, Tag , List, ShoppingCart} from 'react-feather';

function Dropdown({ options, titleid, selectedValue: initialSelectedValue, icon }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(initialSelectedValue || options[0] || 'Select an option');

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedValue(option);
    setIsOpen(false);
  };

  return (<>
    <div className="titleid">{titleid}</div>
    <div className="dropdown-container">
      <div className="dropdown-header" onClick={handleToggle}>
        <div className="header-text">

        { icon === 'ShoppingCart' ? (<ShoppingCart className='menu-icon' size={24}/>) : ''}
        { icon === 'Tag' ? (<Tag className='menu-icon' size={24}/>) : ''}
        { icon === 'Layers' ?( <Layers className='menu-icon' size={24}/>) : ''}
          
          {selectedValue}
          
        </div>
      </div>

      {isOpen && (
        <ul className="dropdown-list">
          {options.map((option, index) => (
            <Link to='/category' key={index}>
            <li key={index} onClick={() => handleOptionClick(option)}>
              {option}
            </li>
            </Link>
          ))}
        </ul>
      )}

    </div>
    </>
  );
}

export default Dropdown;