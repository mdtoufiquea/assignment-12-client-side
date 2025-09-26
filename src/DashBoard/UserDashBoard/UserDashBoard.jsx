import React from 'react';
import Navbar from '../../Home/Pages/Shared/Navbar';
import Footer from '../../Home/Pages/Shared/Footer';
import { Outlet } from 'react-router';
import UserAside from './UserAside';

const UserDashBoard = () => {
    return (
        <div>
            <div className="flex flex-col min-h-screen">
               
                <Navbar />

                <div className="flex flex-1">
                    <div >
                        <UserAside />
                    </div>
                    <main className="flex-1 p-4">
                        <Outlet />
                    </main>
                </div>
                <Footer />
            </div>

        </div>
    );
};

export default UserDashBoard;