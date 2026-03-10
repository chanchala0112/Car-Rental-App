import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { dummyCars, assets } from '../assets/data';

const BookingForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [car, setCar] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('card');

    // Extract dates from CarDetails page routing state
    const pickUpDate = location.state?.pickUpDate || null;
    const dropOffDate = location.state?.dropOffDate || null;

    useEffect(() => {
        // Scroll to top
        window.scrollTo(0, 0);

        // If accessed directly without picking dates, return to Car Details
        if (!pickUpDate || !dropOffDate) {
            navigate(`/listing/${id}`);
            return;
        }

        // Load car data
        if (dummyCars && dummyCars.length > 0) {
            const foundCar = dummyCars.find((c) => c._id === id);
            if (foundCar) {
                setCar(foundCar);
            } else {
                navigate('/listing');
            }
        }
    }, [id, pickUpDate, dropOffDate, navigate]);

    // Calculate days in a simple way
    const calculateDays = () => {
        if (!pickUpDate || !dropOffDate) return 1;
        const start = new Date(pickUpDate);
        const end = new Date(dropOffDate);
        const diffTime = Math.abs(end - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays === 0 ? 1 : diffDays; // minimum 1 day
    };

    const days = calculateDays();
    const basePrice = car ? car.price.rent : 0;
    const totalPrice = basePrice * days;
    const tax = Math.round(totalPrice * 0.1); // 10% tax
    const finalPrice = totalPrice + tax;

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Prepare booking data
        const newBooking = {
            _id: Date.now().toString(),
            user: {
                firstName: e.target[0].value,
                lastName: e.target[1].value,
                email: e.target[2].value,
                phone: e.target[3].value,
                licenseNumber: e.target[4].value,
            },
            car: car,
            agency: car.agency,
            pickUpDate: pickUpDate,
            dropOffDate: dropOffDate,
            totalPrice: finalPrice,
            status: 'pending',
            paymentMethod: paymentMethod === 'card' ? 'Stripe' : 'Pay at Pick-up',
            isPaid: paymentMethod === 'card',
            createdAt: new Date().toISOString(),
        };

        // Simulate booking API call
        setTimeout(() => {
            // Save to LocalStorage
            const storedBookings = JSON.parse(localStorage.getItem("allBookings") || "[]");
            localStorage.setItem("allBookings", JSON.stringify([...storedBookings, newBooking]));

            setIsSubmitting(false);
            setSuccess(true);

            // Redirect to My Bookings after 3 seconds
            setTimeout(() => {
                navigate('/my-bookings');
            }, 3000);
        }, 1500);
    };

    // Helper date formatter for summary
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    if (!car) return null;

    return (
        <section className="pt-24 pb-16 min-h-[80vh] bg-slate-50/50">
            <div className="max-padd-container relative">
                <div className="flex flex-col mb-8">
                    <h2 className="text-3xl font-bold text-slate-800">Complete Your Booking</h2>
                    <p className="text-gray-500 mt-2">Please provide your details to finalize the reservation.</p>
                </div>

                <div className="flex flex-col-reverse lg:flex-row gap-8 lg:gap-12">

                    {/* Left Column: Booking Form */}
                    <div className="w-full lg:w-2/3 bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden">

                        {/* Success Overlay */}
                        {success && (
                            <div className="absolute inset-0 z-20 bg-green-500 flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-300">
                                <div className="w-20 h-20 bg-white rounded-full flexCenter mb-6">
                                    <span className="text-4xl text-green-500">✓</span>
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2">Booking Successful!</h3>
                                <p className="text-green-100 mb-8 max-w-sm">Your reservation has been confirmed. We have sent the details to your email.</p>
                                <div className="w-6 h-6 border-2 border-white/40 border-t-white animate-spin rounded-full"></div>
                                <p className="text-sm text-green-100 mt-3 relative top-3">Redirecting to your bookings...</p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="flex flex-col gap-8 relative z-10 w-full">

                            {/* Personal Details */}
                            <div>
                                <h4 className="text-xl font-bold text-slate-800 mb-5 pb-3 border-b border-slate-100">1. Personal Details</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-semibold text-slate-700">First Name <span className="text-red-500">*</span></label>
                                        <input type="text" placeholder="John" className="bg-slate-50 border border-slate-200 p-3 rounded-xl outline-none focus:border-amber-500 block w-full" required />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-semibold text-slate-700">Last Name <span className="text-red-500">*</span></label>
                                        <input type="text" placeholder="Doe" className="bg-slate-50 border border-slate-200 p-3 rounded-xl outline-none focus:border-amber-500 block w-full" required />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-semibold text-slate-700">Email Address <span className="text-red-500">*</span></label>
                                        <input type="email" placeholder="john@example.com" className="bg-slate-50 border border-slate-200 p-3 rounded-xl outline-none focus:border-amber-500 block w-full" required />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-semibold text-slate-700">Phone Number <span className="text-red-500">*</span></label>
                                        <input type="tel" placeholder="+1 (555) 000-0000" className="bg-slate-50 border border-slate-200 p-3 rounded-xl outline-none focus:border-amber-500 block w-full" required />
                                    </div>
                                </div>
                            </div>

                            {/* Driving License */}
                            <div>
                                <h4 className="text-xl font-bold text-slate-800 mb-5 pb-3 border-b border-slate-100">2. Driving Details</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-semibold text-slate-700">License Number <span className="text-red-500">*</span></label>
                                        <input type="text" placeholder="XXXXXXXXX" className="bg-slate-50 border border-slate-200 p-3 rounded-xl outline-none focus:border-amber-500 block w-full" required />
                                    </div>
                                    <div className="flex flex-col justify-end">
                                        <label className="flex items-center gap-3 bg-slate-50 border border-slate-200 p-3 rounded-xl cursor-pointer hover:bg-slate-100 transition-colors w-full">
                                            <input type="checkbox" className="w-5 h-5 accent-amber-500" required />
                                            <span className="text-sm text-slate-700 font-medium">I confirm I am over 21 years old</span>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            {/* Payment Info */}
                            <div>
                                <h4 className="text-xl font-bold text-slate-800 mb-5 pb-3 border-b border-slate-100">3. Payment Option</h4>
                                <div className="flex flex-col gap-4 w-full">
                                    <label className={`flex items-start gap-4 p-4 rounded-xl cursor-pointer w-full transition-all duration-300 ${paymentMethod === 'card' ? 'border-2 border-amber-500 bg-amber-50' : 'border border-slate-200 hover:bg-slate-50'}`}>
                                        <input type="radio" name="payment" value="card" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} className="w-5 h-5 mt-0.5 accent-amber-600 flex-shrink-0" />
                                        <div className="w-full">
                                            <span className="block font-bold text-slate-900 mb-1">Pay with Card now</span>
                                            <span className="text-sm text-slate-600 block mb-4">Fastest and most secure way using Stripe or PayPal.</span>

                                            {/* Credit Card Fields */}
                                            {paymentMethod === 'card' && (
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pt-4 border-t border-amber-200/60 animate-in fade-in slide-in-from-top-4 duration-300">
                                                    <div className="flex flex-col gap-2 md:col-span-2">
                                                        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Cardholder Name</label>
                                                        <input type="text" placeholder="John Doe" className="bg-white border border-slate-300 p-2.5 flex-1 rounded-lg outline-none focus:border-amber-500 block w-full" required />
                                                    </div>
                                                    <div className="flex flex-col gap-2 md:col-span-2">
                                                        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Card Number</label>
                                                        <input type="text" placeholder="0000 0000 0000 0000" maxLength="19" className="bg-white border border-slate-300 p-2.5 rounded-lg outline-none focus:border-amber-500 block w-full font-mono" required />
                                                    </div>
                                                    <div className="flex flex-col gap-2">
                                                        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Expiry Date</label>
                                                        <input type="text" placeholder="MM/YY" maxLength="5" className="bg-white border border-slate-300 p-2.5 rounded-lg outline-none focus:border-amber-500 block w-full font-mono" required />
                                                    </div>
                                                    <div className="flex flex-col gap-2">
                                                        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">CVV</label>
                                                        <input type="text" placeholder="123" maxLength="4" className="bg-white border border-slate-300 p-2.5 rounded-lg outline-none focus:border-amber-500 block w-full font-mono" required />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </label>
                                    <label className={`flex items-start gap-4 p-4 rounded-xl cursor-pointer w-full transition-all duration-300 ${paymentMethod === 'pickup' ? 'border-2 border-amber-500 bg-amber-50' : 'border border-slate-200 hover:bg-slate-50'}`}>
                                        <input type="radio" name="payment" value="pickup" checked={paymentMethod === 'pickup'} onChange={() => setPaymentMethod('pickup')} className="w-5 h-5 mt-0.5 accent-amber-600 flex-shrink-0" />
                                        <div>
                                            <span className="block font-bold text-slate-900 mb-1">Pay at Pick-up</span>
                                            <span className="text-sm text-slate-600 block">Reserve now, pay when you collect the vehicle.</span>
                                        </div>
                                    </label>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`bg-slate-900 border border-slate-900 text-white rounded-xl py-4 mt-4 w-full text-lg font-semibold flexCenter gap-2 hover:bg-slate-800 transition-all duration-300 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}>
                                {isSubmitting ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        Processing Booking...
                                    </>
                                ) : (
                                    "Complete Booking"
                                )}
                            </button>
                        </form>
                    </div>

                    {/* Right Column: Order Summary */}
                    <div className="w-full lg:w-1/3">
                        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 sticky top-24">
                            <h3 className="text-xl font-bold text-slate-800 mb-6">Reservation Summary</h3>

                            {/* Car Snapshot */}
                            <div className="flex flex-col gap-4 mb-6 pb-6 border-b border-slate-100">
                                <div className="w-full h-40 bg-slate-100 rounded-xl overflow-hidden relative">
                                    <img src={car.images[0]} alt={car.title} className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-slate-900">{car.title}</h4>
                                    <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                                        <img src={assets.pin} alt="location" className="w-3 h-3 grayscale" />
                                        {car.agency.name} • {car.agency.city}
                                    </p>
                                </div>
                            </div>

                            {/* Booking Dates */}
                            <div className="grid grid-cols-2 gap-4 mb-6 pb-6 border-b border-slate-100">
                                <div className="flex flex-col">
                                    <span className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Pick-up</span>
                                    <span className="text-sm font-semibold text-slate-800">{formatDate(pickUpDate)}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Drop-off</span>
                                    <span className="text-sm font-semibold text-slate-800">{formatDate(dropOffDate)}</span>
                                </div>
                            </div>

                            {/* Price Breakdown */}
                            <div className="flex flex-col gap-3 mb-6">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-slate-600">Rental fee (Rs.{basePrice} x {days} days)</span>
                                    <span className="font-semibold text-slate-800">Rs.{totalPrice.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-slate-600">Taxes & Fees</span>
                                    <span className="font-semibold text-slate-800">Rs.{tax.toLocaleString()}</span>
                                </div>
                            </div>

                            <div className="flex justify-between items-end pt-4 border-t-2 border-slate-100 border-dashed">
                                <span className="font-bold text-slate-900">Total Price</span>
                                <span className="text-2xl font-black text-black">Rs.{finalPrice.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default BookingForm;
