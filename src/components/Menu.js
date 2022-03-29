import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Menu.css';

const Menu = () => {
  const [click, setClick] = useState(false);
  const closeMobileMenu = () => setClick(false);
  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link
                to='/authors'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Authors
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/favoriteAuthors'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Favorite Authors
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};
export default Menu;
