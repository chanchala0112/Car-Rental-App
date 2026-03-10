import React from 'react';
import { NavLink, Link } from 'react-router-dom';

const navLinks = [
    { name: 'Dashboard', path: '/owner/dashboard', icon: '📊' },
    { name: 'Manage Users', path: '/owner/manage-users', icon: '👥' },
    { name: 'Manage Bookings', path: '/owner/manage-bookings', icon: '📅' },
    { name: 'Add Car', path: '/owner/add-car', icon: '➕' },
    { name: 'List Cars', path: '/owner/list-car', icon: '🚗' },
];

const Sidebar = () => {
    return (
        <aside className="w-64 bg-white border-r border-slate-200 hidden lg:flex flex-col shadow-sm">
            <div className="p-6 border-b border-slate-200">
                <Link to="/" className="text-xl font-bold flex items-center gap-2">
                    <span className="bg-amber-500 text-white w-8 h-8 flex items-center justify-center rounded-lg">CR</span>
                    <span className="text-slate-800">Owner Panel</span>
                </Link>
            </div>

            <nav className="flex-1 p-4 flex flex-col gap-2">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 px-2">Menu</p>
                {navLinks.map((link) => (
                    <NavLink
                        key={link.name}
                        to={link.path}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive
                                ? 'bg-amber-50 text-amber-600 font-semibold shadow-sm border border-amber-100'
                                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 border border-transparent'
                            }`
                        }
                    >
                        <span className="text-lg">{link.icon}</span>
                        {link.name}
                    </NavLink>
                ))}
            </nav>

            <div className="p-4 border-t border-slate-200">
                <Link
                    to="/"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-all border border-transparent"
                >
                    <span className="text-lg">⬅️</span>
                    Back to Main Site
                </Link>
            </div>
        </aside>
    );
};

export default Sidebar;