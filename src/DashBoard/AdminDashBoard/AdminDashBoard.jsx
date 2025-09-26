import React from 'react';
import Footer from '../../Home/Pages/Shared/Footer';
import { Outlet } from 'react-router';
import Navbar from '../../Home/Pages/Shared/Navbar';
import AdminAside from './AdminAside';

const AdminDashBoard = () => {
    return (
        <div >
        <div className="flex flex-col min-h-screen">

            <Navbar />

            <div className="flex flex-1">
                <div >
                   <AdminAside></AdminAside>
                </div>
                <main className="flex-1 p-4">
                    <Outlet />
                </main>
            </div>
            <Footer />
        </div>

        </div >
    );
};

export default AdminDashBoard;