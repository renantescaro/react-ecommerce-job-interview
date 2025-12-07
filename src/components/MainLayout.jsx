import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

function MainLayout() {
    return (
        <div>
            <Navbar />

            <div className="container-fluid p-4">
                <Outlet />
            </div>
        </div>
    );
}

export default MainLayout;
