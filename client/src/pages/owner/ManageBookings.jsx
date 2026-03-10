import React, { useState, useEffect } from "react";
import { dummyBookingsData } from "../../assets/data";

const ManageBookings = () => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const localBookings = JSON.parse(localStorage.getItem("allBookings") || "[]");
        // Merge: take all from local, then add dummy ones if they aren't already represented in local (by ID)
        const all = [
            ...localBookings,
            ...dummyBookingsData.filter(db => !localBookings.some(lb => lb._id === db._id))
        ].sort((a, b) =>
            new Date(b.createdAt || b.pickUpDate) - new Date(a.createdAt || a.pickUpDate)
        );
        setBookings(all);
    }, []);

    const updateStatus = (id, newStatus) => {
        // Find the booking to update (could be in local or dummy)
        const bookingToUpdate = bookings.find(b => b._id === id);
        if (!bookingToUpdate) return;

        const updatedBooking = { ...bookingToUpdate, status: newStatus };

        // Update local state
        const updatedBookings = bookings.map(b => b._id === id ? updatedBooking : b);
        setBookings(updatedBookings);

        // Update localStorage
        const localBookings = JSON.parse(localStorage.getItem("allBookings") || "[]");
        const existsInLocal = localBookings.some(b => b._id === id);

        let updatedLocal;
        if (existsInLocal) {
            updatedLocal = localBookings.map(b => b._id === id ? updatedBooking : b);
        } else {
            // "Promote" dummy booking to localStorage
            updatedLocal = [...localBookings, updatedBooking];
        }

        localStorage.setItem("allBookings", JSON.stringify(updatedLocal));
    };

    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        return new Date(dateString).toLocaleDateString(undefined, {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    return (
        <div className="flex flex-col gap-8 pb-10">
            <div>
                <h1 className="text-3xl font-bold text-slate-800">Manage Bookings</h1>
                <p className="text-slate-500 mt-2">Track customer reservations and update their status.</p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50 text-xs uppercase tracking-wider text-slate-500 border-b border-slate-100">
                                <th className="p-4 font-bold">Booking Info</th>
                                <th className="p-4 font-bold">Customer</th>
                                <th className="p-4 font-bold">Dates</th>
                                <th className="p-4 font-bold">Amount</th>
                                <th className="p-4 font-bold">Status</th>
                                <th className="p-4 font-bold text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {bookings.map((booking) => (
                                <tr key={booking._id} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-10 rounded-lg overflow-hidden bg-slate-100 border border-slate-200">
                                                <img src={booking.car.images[0]} alt="" className="w-full h-full object-cover" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-slate-800">{booking.car.title}</p>
                                                <p className="text-[10px] text-slate-400 font-mono">#{booking._id.substring(0, 8).toUpperCase()}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-semibold text-slate-700">
                                                {booking.user?.firstName ? `${booking.user.firstName} ${booking.user.lastName}` : "Clerk User"}
                                            </span>
                                            <span className="text-xs text-slate-400">{booking.user?.email || "N/A"}</span>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="text-xs text-slate-600">
                                            <p><span className="font-bold text-slate-400">IN:</span> {formatDate(booking.pickUpDate)}</p>
                                            <p><span className="font-bold text-slate-400">OUT:</span> {formatDate(booking.dropOffDate)}</p>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <span className="text-sm font-bold text-slate-900">Rs.{booking.totalPrice?.toLocaleString() || (booking.amount || 0).toLocaleString()}</span>
                                    </td>
                                    <td className="p-4">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${booking.status === 'completed' ? 'bg-emerald-100 text-emerald-700' :
                                            booking.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                                                'bg-red-100 text-red-700'
                                            }`}>
                                            {booking.status}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center justify-center gap-2">
                                            <select
                                                value={booking.status}
                                                onChange={(e) => updateStatus(booking._id, e.target.value)}
                                                className="bg-slate-50 border border-slate-200 text-xs font-bold rounded-lg px-2 py-1.5 outline-none focus:border-amber-500"
                                            >
                                                <option value="pending">Pending</option>
                                                <option value="completed">Completed</option>
                                                <option value="cancelled">Cancelled</option>
                                            </select>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageBookings;
