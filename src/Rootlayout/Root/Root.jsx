import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../../Home/Pages/Shared/Navbar';
import Footer from '../../Home/Pages/Shared/Footer';

const Root = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Root;