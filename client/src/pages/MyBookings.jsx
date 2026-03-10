import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { assets, dummyBookingsData } from '../assets/data'
import { useUser, SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";

const MyBookings = () => {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const currency = "Rs."
  const { user } = useUser();

  const getUserBooking = async () => {
    setLoading(true)
    setTimeout(() => {
      const localBookings = JSON.parse(localStorage.getItem("allBookings") || "[]");

      // Merge: take all from local, then add dummy ones if they aren't already represented in local (by ID)
      const allBookings = [
        ...localBookings,
        ...dummyBookingsData.filter(db => !localBookings.some(lb => lb._id === db._id))
      ];

      // Sort by date (newest first)
      const sortedBookings = allBookings.sort((a, b) =>
        new Date(b.createdAt || b.pickUpDate) - new Date(a.createdAt || a.pickUpDate)
      );

      // Simple filtering for current user demo
      const userBookings = sortedBookings; // In a real app we'd filter by user ID/email

      setBookings(userBookings);
      setLoading(false)
    }, 800)
  }

  useEffect(() => {
    if (user) {
      getUserBooking()
    }
  }, [user])

  // Helper date formatter
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  return (
    <section className="max-padd-container pt-28 pb-16">
      <div className="flex flex-col gap-y-4 mb-10">
        <h2 className="h2 text-3xl font-bold">My Bookings</h2>
        <p className="text-gray-500">View and manage all your past and upcoming car reservations.</p>
      </div>

      <SignedOut>
        <div className="flexCenter flex-col gap-4 min-h-[40vh] bg-slate-50 rounded-2xl border border-slate-100 p-8 text-center">
          <img src={assets.user} alt="Login required" className="w-16 h-16 opacity-50 mb-2" />
          <h3 className="h3">Please Log In</h3>
          <p className="text-gray-500 mb-4">You need to log in to view your bookings.</p>
          <SignInButton mode="modal">
            <button className="btn-dark rounded-full">Sign In</button>
          </SignInButton>
        </div>
      </SignedOut>

      <SignedIn>
        {loading ? (
          <div className="flexCenter flex-col gap-4 min-h-[40vh] bg-slate-50 rounded-2xl border border-slate-100 p-8 text-center">
            <div className="w-10 h-10 border-4 border-slate-200 border-t-black rounded-full animate-spin"></div>
            <p className="text-gray-500">Loading your bookings...</p>
          </div>
        ) : bookings?.length === 0 ? (
          <div className="flexCenter flex-col gap-4 min-h-[40vh] bg-slate-50 rounded-2xl border border-slate-100 p-8 text-center">
            <img src={assets.car} alt="No bookings" className="w-16 h-16 opacity-50 mb-2" />
            <h3 className="h3">No Bookings Yet</h3>
            <p className="text-gray-500 mb-4">You haven't rented any cars yet.</p>
            <Link to="/listing" className="btn-dark rounded-full">Explore Cars</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {bookings?.map((booking) => (
              <div key={booking._id} className="flex flex-col sm:flex-row gap-6 bg-white border border-slate-200 p-4 sm:p-5 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">

                {/* Car Image section */}
                <div className="w-full sm:w-[220px] h-[160px] bg-[#f5f5f5] rounded-xl overflow-hidden flex-shrink-0 relative">
                  {/* Status Badge */}
                  <span className={`absolute top-3 left-3 px-3 py-1 text-xs font-semibold rounded-full capitalize
                      ${booking.status === 'pending' ? 'bg-orange-100 text-orange-600'
                      : booking.status === 'completed' ? 'bg-green-100 text-green-600'
                        : 'bg-red-100 text-red-600'}`}>
                    {booking.status}
                  </span>
                  <img
                    src={booking.car.images[0]}
                    alt={booking.car.title}
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>

                {/* Booking Details */}
                <div className="flex flex-col flex-1 justify-between">
                  <div>
                    <div className="flex flex-col mb-1">
                      <div className="flex justify-between items-start">
                        <h3 className="text-xl font-bold text-gray-800 line-clamp-1">{booking.car.title}</h3>
                        <span className="text-xs text-gray-400 font-mono bg-slate-100 px-2 py-1 rounded">ID: {booking._id.substring(booking._id.length - 8).toUpperCase()}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <p className="text-sm text-gray-500 flex items-center gap-1">
                        <img src={assets.pin} alt="location" className="w-3 h-3 grayscale" />
                        {booking.agency.name} • {booking.agency.city}
                      </p>
                      <p className="text-sm text-gray-500 flex items-center gap-1 border-l border-slate-200 pl-3">
                        <img src={assets.seats} alt="seats" className="w-3 h-3 grayscale" />
                        {booking.car.specs.seats} Seats
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4 pb-4 border-b border-slate-100">
                      <div className="flex flex-col">
                        <span className="text-xs text-gray-400 font-medium">Pick-up</span>
                        <span className="text-sm font-semibold text-gray-700">{formatDate(booking.pickUpDate)}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs text-gray-400 font-medium">Drop-off</span>
                        <span className="text-sm font-semibold text-gray-700">{formatDate(booking.dropOffDate)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Payment Details */}
                  <div className="flex justify-between items-end mt-2">
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-400 font-medium mb-1">Payment Method</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm border border-slate-200 bg-slate-50 px-2 py-1 rounded inline-block w-fit">
                          {booking.paymentMethod}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded font-semibold ${booking.isPaid ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                          {booking.isPaid ? 'Paid' : 'Unpaid'}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-gray-400 font-medium block">Total Price</span>
                      <span className="text-2xl font-bold text-black">{currency}{booking.totalPrice}</span>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}
      </SignedIn>
    </section>
  )
}

export default MyBookings