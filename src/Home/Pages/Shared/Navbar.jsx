import React from 'react';
import ScholarX from './ScholarX';
import { Link } from 'react-router';

const Navbar = () => {
    const link = <>
    <Link><li className='md:ml-6 mb-2'>Home</li></Link>
    <Link><li className='md:ml-6 mb-2'>All Scholarship</li></Link>
    <Link> <li className='md:ml-6 mb-2'>User Dashboard</li></Link>
    <Link><li className='md:ml-6 mb-2'>Admin dashboard</li></Link>
    
    </>
    return (
        <div>
            <div className="navbar bg-base-100 shadow-sm">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-gray-400 rounded-box z-1 mt-3 w-52 p-2 shadow font-bold">
        {link}
      </ul>
    </div>
    <ScholarX></ScholarX>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1 font-semibold">
      {link}
    </ul>
  </div>
  <div className="navbar-end">
    <a className="btn">Button</a>
  </div>
</div>
        </div>
    );
};

export default Navbar;