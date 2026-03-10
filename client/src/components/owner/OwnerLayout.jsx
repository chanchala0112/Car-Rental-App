import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const OwnerLayout = () => {
    return (
        <div className="flex h-screen bg-slate-50 overflow-hidden">
            {/* Sidebar - fixed width on desktop */}
            <Sidebar />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col overflow-y-auto">
                <main className="flex-1 p-6 lg:p-10">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default OwnerLayout;
