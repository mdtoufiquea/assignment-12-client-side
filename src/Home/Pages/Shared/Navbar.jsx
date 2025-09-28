import React, { useContext } from 'react';
import ScholarX from './ScholarX';
import { Link, useNavigate, } from 'react-router';
import { AuthContext } from '../../../Contexts/AuthContexts/AuthContext';
import Swal from 'sweetalert2';

const Navbar = () => {
  const { user, loading, logout } = useContext(AuthContext)
  const navigate = useNavigate();
  if (loading) {
    return <span className="loading loading-spinner loading-xl"></span>
  }

  const handleLogout = () => {
    logout()
      .then(() => {

        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Logged out successfully!',
          showConfirmButton: false,
          timer: 1500
        });

        navigate("/")

      }).catch(error => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.message
        });
      })
  }

  const link = <>
    <Link to='/'><li  className='md:ml-6 mb-2 cursor-pointer'>Home</li></Link>

    <Link><li  className='md:ml-6 mb-2 cursor-pointer'>All Scholarship</li></Link>

    <li
      className='md:ml-6 mb-2 cursor-pointer'
      onClick={() => {
        if (user) {
          navigate("/user-dashboard"); 
        } else {
          navigate("/login"); 
        }
      }}
    >
      User Dashboard
    </li>

    <li  className='md:ml-6 mb-2 cursor-pointer' onClick={() => {
      if (user?.role === "admin") navigate("/admin-DashBoard");
      else Swal.fire({
        icon: "error",
        title: "Access Denied",
        text: "You are not Admin",
        timer: 2000,
        showConfirmButton: false
      });
    }}>Admin Dashboard</li>

    <li  className='md:ml-6 mb-2 cursor-pointer' onClick={() => {
      if (user?.role === "moderator") navigate("/moderator-dashBoard");
      else Swal.fire({
        icon: "warning",
        title: "Access Denied",
        text: "Your are not Moderator",
        timer: 2000,
        showConfirmButton: false
      });
    }}>Moderator Dashboard</li>

  </>
  return (
    <div>
      <div className="navbar bg-fuchsia-100 shadow-sm sticky top-0 z-50">
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
          {
            user && <div className='flex'>
              <p className="hidden md:hidden lg:block my-auto text-xl font-semibold mr-5">{user.displayName}</p>
              <img className='rounded-full w-8 h-8 md:mr-3 mr-1 border-b-gray-950 border-1' src={user.photoURL} alt="" />
            </div>
          }
          {
            user ? <button onClick={handleLogout} className="btn bg-black text-white">Logout</button> : <Link to='/login' className="btn bg-black text-white"> <button>Login</button> </Link>
          }
        </div>





      </div>
    </div>
  );
};

export default Navbar;