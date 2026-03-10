import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { dummyCars, dummyBookingsData } from "../../assets/data";

const Dashboard = () => {
    const [allBookings, setAllBookings] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const localBookings = JSON.parse(localStorage.getItem("allBookings") || "[]");
        const merged = [
            ...localBookings,
            ...dummyBookingsData.filter(db => !localBookings.some(lb => lb._id === db._id))
        ].sort((a, b) => new Date(b.createdAt || b.pickUpDate) - new Date(a.createdAt || a.pickUpDate));
        setAllBookings(merged);

        const dummyList = [
            { id: 1, name: "Amila Perera", email: "amila@example.com", joined: "2023-10-15", status: "Active" },
            { id: 2, name: "Kasun Jayasuriya", email: "kasun@example.com", joined: "2023-10-12", status: "Active" },
            { id: 3, name: "Nimal Siriwardena", email: "nimal@example.com", joined: "2023-10-10", status: "Inactive" },
            { id: 4, name: "Sunil Perera", email: "sunil@example.com", joined: "2023-10-08", status: "Active" },
        ];
        const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
        setUsers([...dummyList, ...registeredUsers]);
    }, []);

    const updateStatus = (id, newStatus) => {
        const bookingToUpdate = allBookings.find(b => b._id === id);
        if (!bookingToUpdate) return;

        const updatedBooking = { ...bookingToUpdate, status: newStatus };
        const updatedAll = allBookings.map(b => b._id === id ? updatedBooking : b);
        setAllBookings(updatedAll);

        const localBookings = JSON.parse(localStorage.getItem("allBookings") || "[]");
        const existsInLocal = localBookings.some(b => b._id === id);
        let updatedLocal = existsInLocal
            ? localBookings.map(b => b._id === id ? updatedBooking : b)
            : [...localBookings, updatedBooking];

        localStorage.setItem("allBookings", JSON.stringify(updatedLocal));
    };


    const totalCars = dummyCars.length + JSON.parse(localStorage.getItem("ownerCars") || "[]").length;

    // Revenue from completed bookings
    const totalRevenue = allBookings
        .filter(b => b.status === "completed")
        .reduce((sum, b) => sum + (Number(b.totalPrice) || Number(b.amount) || 0), 0);

    const pendingBookings = allBookings.filter(b => b.status === "pending").length;
    const totalUsersCount = 1240 + JSON.parse(localStorage.getItem('registeredUsers') || '[]').length;


    return (
        <div className="flex flex-col gap-8 pb-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800">Dashboard Overview</h1>
                    <p className="text-slate-500 mt-2">Manage your fleet and monitor business performance.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => { localStorage.removeItem('ownerToken'); window.location.reload(); }}
                        className="bg-white px-4 py-2 rounded-xl border border-red-100 text-sm font-semibold text-red-500 shadow-sm hover:bg-red-50 transition-all"
                    >
                        Sign Out
                    </button>
                    <div className="bg-white px-4 py-2 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 shadow-sm">
                        Last 30 Days
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Total Cars */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col gap-2 relative overflow-hidden group hover:shadow-md transition-all duration-300">
                    <div className="absolute -right-2 -top-2 w-16 h-16 bg-blue-500/5 rounded-full transform group-hover:scale-150 transition-transform duration-500"></div>
                    <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-xl flexCenter text-xl mb-2 shadow-inner">🚗</div>
                    <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Total Fleet</p>
                    <div className="flex items-end gap-2">
                        <h3 className="text-3xl font-bold text-slate-900">{totalCars}</h3>
                        <span className="text-green-500 text-xs font-bold mb-1">+2 new</span>
                    </div>
                </div>

                {/* Total Revenue */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col gap-2 relative overflow-hidden group hover:shadow-md transition-all duration-300">
                    <div className="absolute -right-2 -top-2 w-16 h-16 bg-green-500/5 rounded-full transform group-hover:scale-150 transition-transform duration-500"></div>
                    <div className="w-12 h-12 bg-green-50 text-green-500 rounded-xl flexCenter text-xl mb-2 shadow-inner">💰</div>
                    <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Net Revenue</p>
                    <div className="flex items-end gap-2">
                        <h3 className="text-3xl font-bold text-slate-900">Rs.{totalRevenue.toLocaleString()}</h3>
                        <span className="text-green-500 text-xs font-bold mb-1">↑ 12%</span>
                    </div>
                </div>

                {/* Total Users */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col gap-2 relative overflow-hidden group hover:shadow-md transition-all duration-300">
                    <div className="absolute -right-2 -top-2 w-16 h-16 bg-amber-500/5 rounded-full transform group-hover:scale-150 transition-transform duration-500"></div>
                    <div className="w-12 h-12 bg-amber-50 text-amber-500 rounded-xl flexCenter text-xl mb-2 shadow-inner">👥</div>
                    <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Total Users</p>
                    <div className="flex items-end gap-2">
                        <h3 className="text-3xl font-bold text-slate-900">{totalUsersCount.toLocaleString()}</h3>
                        <span className="text-amber-500 text-xs font-bold mb-1">+42 today</span>
                    </div>
                </div>

                {/* Pending Bookings */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col gap-2 relative overflow-hidden group hover:shadow-md transition-all duration-300">
                    <div className="absolute -right-2 -top-2 w-16 h-16 bg-red-500/5 rounded-full transform group-hover:scale-150 transition-transform duration-500"></div>
                    <div className="w-12 h-12 bg-red-50 text-red-500 rounded-xl flexCenter text-xl mb-2 shadow-inner">⏳</div>
                    <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Pending Tasks</p>
                    <div className="flex items-end gap-2">
                        <h3 className="text-3xl font-bold text-slate-900">{pendingBookings}</h3>
                        <span className="text-red-500 text-xs font-bold mb-1">Needs Action</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* Recent Bookings Table - Left Side (Lg) */}
                <div className="xl:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                    <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-6 bg-amber-500 rounded-full"></div>
                            <h2 className="text-xl font-bold text-slate-800">Recent Bookings</h2>
                        </div>
                        <Link to="/owner/list-car" className="text-sm font-semibold text-amber-600 hover:text-amber-700 bg-amber-50 px-3 py-1.5 rounded-lg transition-colors">View All →</Link>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50/50 text-xs uppercase tracking-wider text-slate-500 border-b border-slate-100">
                                    <th className="p-4 font-semibold">Booking ID</th>
                                    <th className="p-4 font-semibold">Car</th>
                                    <th className="p-4 font-semibold">Status</th>
                                    <th className="p-4 font-semibold text-right">Amount</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {allBookings.slice(0, 5).map((booking) => (
                                    <tr key={booking._id} className="hover:bg-slate-50/50 transition-colors group">
                                        <td className="p-4 text-xs font-mono font-medium text-slate-400">#{booking._id.toUpperCase().substring(0, 8)}</td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-lg overflow-hidden bg-slate-100 border border-slate-200 shadow-sm">
                                                    <img src={booking.car.images[0]} alt={booking.car.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                                                </div>
                                                <span className="text-sm font-bold text-slate-800 line-clamp-1">{booking.car.title}</span>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <select
                                                value={booking.status}
                                                onChange={(e) => updateStatus(booking._id, e.target.value)}
                                                className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider outline-none cursor-pointer ${booking.status === 'completed'
                                                    ? 'bg-emerald-100 text-emerald-700'
                                                    : booking.status === 'pending' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                                                    }`}>
                                                <option value="pending">Pending</option>
                                                <option value="completed">Completed</option>
                                                <option value="cancelled">Cancelled</option>
                                            </select>
                                        </td>
                                        <td className="p-4 text-sm font-black text-slate-900 text-right">
                                            Rs.{(booking.totalPrice || booking.amount || 0).toLocaleString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Recent Users Section - Right Side (Lg) */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                    <div className="p-6 border-b border-slate-100 flex items-center gap-3">
                        <div className="w-2 h-6 bg-blue-500 rounded-full"></div>
                        <h2 className="text-xl font-bold text-slate-800">New Users</h2>
                    </div>

                    <div className="divide-y divide-slate-50">
                        {users.slice(-5).reverse().map((user) => (
                            <div key={user.id} className="p-5 flex items-center justify-between hover:bg-slate-50 transition-colors group cursor-pointer">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 font-bold border border-slate-200">
                                        {user.name.charAt(0)}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-bold text-slate-800 group-hover:text-blue-600 transition-colors uppercase tracking-tight">{user.name}</span>
                                        <span className="text-[10px] text-slate-400">{user.email}</span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="text-[10px] text-slate-400 block">{user.joined}</span>
                                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${user.status === 'Active' ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-500'}`}>{user.status}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="p-4 bg-slate-50/50 border-t border-slate-100">
                        <Link to="/owner/manage-users" className="block w-full text-center py-2.5 text-xs font-bold text-slate-600 hover:text-slate-900 transition-all border border-slate-200 rounded-xl bg-white shadow-sm">
                            Manage All Users
                        </Link>
                    </div>
                </div>
            </div>

            {/* Additional Details Section */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-3xl text-white shadow-xl relative overflow-hidden">
                <div className="absolute right-0 top-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl"></div>
                <div className="relative z-10">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="max-w-md">
                            <h2 className="text-2xl font-bold mb-2">Automated Business Reports</h2>
                            <p className="text-slate-400 text-sm">Our system generates monthly performance summaries of your fleet. Download your latest analytics report to see trends.</p>
                        </div>
                        <button
                            onClick={() => {
                                const reportData = "Date,Total Revenue,Total Users,Pending Tasks\n2023-10-21,Rs.250000,1240,5";
                                const blob = new Blob([reportData], { type: 'text/csv' });
                                const url = window.URL.createObjectURL(blob);
                                const a = document.createElement('a');
                                a.href = url;
                                a.download = 'business-report.csv';
                                a.click();
                                window.URL.revokeObjectURL(url);
                            }}
                            className="bg-amber-500 hover:bg-amber-600 text-slate-900 px-8 py-3 rounded-2xl font-black text-sm transition-all shadow-lg shadow-amber-500/20 whitespace-nowrap"
                        >
                            DOWNLOAD MARCH REPORT (.CSV)
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;