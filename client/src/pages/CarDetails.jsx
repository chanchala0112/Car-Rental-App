import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from "react-router-dom"
import { assets, dummyCars, dummyBookingsData } from '../assets/data'
import CarImages from '../components/CarImages'


const CarDetails = () => {
  const [first, setfirst] = useState(null)
  const [car, setCar] = useState(null)
  const { id } = useParams()
  const [pickUpDate, setpickUpDate] = useState(null)
  const [dropOffDate, setdropOffDate] = useState(null)
  const [isAvailable, setIsAvailable] = useState(false)
  const [isChecking, setIsChecking] = useState(false)
  const [dateError, setDateError] = useState("")
  const [bookingSuccess, setBookingSuccess] = useState(false)
  const currency = "Rs."
  const navigate = useNavigate()

  useEffect(() => {
    const localCars = JSON.parse(localStorage.getItem("ownerCars") || "[]");
    const allCars = [...dummyCars, ...localCars];

    if (allCars.length > 0) {
      const foundCar = allCars.find(c => c._id === id)
      if (foundCar) {
        // Ensure agency data exists for local cars (defaults if missing)
        if (!foundCar.agency) {
          foundCar.agency = {
            name: "Premium Rentals",
            contact: "011 234 5678",
            email: "bookings@rentroo.com",
            owner: { image: assets.userImg || assets.user },
            city: foundCar.city || "Colombo"
          };
        }
        setCar(foundCar)
      }
    }
  }, [id])

  // Handle the Check / Book form submission
  const handleBookingProcess = (e) => {
    e.preventDefault();
    setDateError("");

    if (!pickUpDate || !dropOffDate) return;

    if (!isAvailable) {
      // State 1: Checking availability
      setIsChecking(true);
      setTimeout(() => {
        setIsChecking(false);

        // Double Booking Prevention
        const isCarBooked = dummyBookingsData.some(booking =>
          booking.car._id === id &&
          (booking.status === 'pending' || booking.status === 'completed')
        );

        if (isCarBooked) {
          setDateError("Sorry, this car is already booked for these dates.");
          setIsAvailable(false);
        } else {
          setIsAvailable(true);
        }
      }, 1500); // Simulate network latency
    } else {
      // State 2: Proceeding to Checkout
      navigate(`/book/${id}`, {
        state: { pickUpDate, dropOffDate }
      });
    }
  };

  // Reset availability if dates change
  useEffect(() => {
    setIsAvailable(false);
    setDateError("");
  }, [pickUpDate, dropOffDate]);

  return (
    car && (
      <div className='bg-primary'>
        <div className='max-padd-container px-6 pt-2 pb-16'>
          {/* CONTAINER */}
          <div className='flex flex-col md:flex-row gap-6 mt-16'>
            {/* INFO - LEFT SIDE */}
            <div className='flex-[5] bg-white p-5 rounded-xl my-4'>
              <p className="flexStart gap-x-2">
                <img src={assets} alt="" width={19} />
                <span>{car.address}</span>
              </p>
              <div className='flex justify-between flex-col sm:flex-row sm:items-end mt-3'>
                <h3>{car.title}</h3>
                <h4>{currency}{car.price.sale} | {currency}{car.price.rent}.00/day</h4>
              </div>
              {/* Balannnamethna */}
              <div className='flex justify-between items-start my-1'>
                <h4 className='text-solid'>{car.bodyType}</h4>
                <div className='flex items-baseline gap-2 relative top-1.5'>
                  <h4 className='relative bottom-0.5 text-black'>5.0</h4>
                  <img src={assets.star} alt="starIcon" width={18} />
                  <img src={assets.star} alt="starIcon" width={18} />
                  <img src={assets.star} alt="starIcon" width={18} />
                  <img src={assets.star} alt="starIcon" width={18} />
                  <img src={assets.star} alt="starIcon" width={18} />
                </div>
              </div>
              <div className='flex gap-x-4 mt-3'>
                <p className='flexCenter gap-x-2 border-r border-slate-900/50 pr-4 font-[500]'>
                  <img src={assets.transmission} alt="" width={19} />
                  {car.specs.transmission}
                </p>
                <p className='flexCenter gap-x-2 border-r border-slate-900/50 px-4 font-[500]'>
                  <img src={assets.seats} alt="" width={19} />
                  {car.specs.seats}
                </p>
                <p className='flexCenter gap-x-2 border-r border-slate-900/50 px-4 font-[500]'>
                  <img src={assets.fuelType} alt="" width={19} />
                  {car.specs.fuelType}
                </p>
                <p className='flexCenter gap-x-2 border-r border-slate-900/50 px-4 font-[500]'>
                  <img src={assets.odometer} alt="" width={19} />
                  {car.odometer}
                </p>
              </div>
              <div className='mt-6'>
                <h4 className='mt-4 mb-1'>Car Details</h4>
                <p className='mb-4'>{car.description}</p>
              </div>
              <h4 className='mt-6 mb-2'>Features</h4>
              <div className='flex gap-3 flex-wrap'>
                {car.features.map((feature) => (
                  <p key={feature} className='p-3 py-1 rounded-lg bg-primary'>{feature}</p>
                ))}
              </div>

              {/* FORM / Check Availability */}
              <form onSubmit={handleBookingProcess} className='text-gray-500 bg-primary rounded-lg px-6 py-4 flex flex-col lg:flex-row gap-4 max-w-md lg:max-w-full ring-1 ring-slate-900/5 relative mt-10 overflow-hidden'>

                <div className='flex flex-col w-full z-10'>
                  <div className='flex items-center gap-2'>
                    <img src={assets.calendar} alt="calendarIcon" width={20} />
                    <label htmlFor="pickUpDate">Pick Up</label>
                  </div>
                  <input type="date" onChange={(e) => setpickUpDate(e.target.value)} min={new Date().toISOString().split("T"[0])}
                    id="pickUpDate"
                    className='rounded bg-white border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none'
                  />
                </div>

                <div className='flex flex-col w-full'>
                  <div className='flex items-center gap-2'>
                    <img src={assets.calendar} alt="calendarIcon" width={20} />
                    <label htmlFor="dropOffDate">Drop Off</label>
                  </div>
                  <input type="date" onChange={(e) => setdropOffDate(e.target.value)} min={pickUpDate}
                    id="dropOffDate"
                    disabled={!pickUpDate}
                    className='rounded bg-white border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none'
                  />
                </div>

                {/* Rent Summary Display */}
                {pickUpDate && dropOffDate && (
                  <div className="flex flex-col w-full bg-white/50 p-3 rounded-xl border border-slate-900/5 animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="flexBetween text-xs mb-1">
                      <span className="text-slate-500">Days:</span>
                      <span className="font-bold text-slate-800">
                        {Math.ceil(Math.abs(new Date(dropOffDate) - new Date(pickUpDate)) / (1000 * 60 * 60 * 24)) || 1} Days
                      </span>
                    </div>
                    <div className="flexBetween text-sm">
                      <span className="text-slate-500 font-medium">Total:</span>
                      <span className="font-black text-black">
                        {currency}{(car.price.rent * (Math.ceil(Math.abs(new Date(dropOffDate) - new Date(pickUpDate)) / (1000 * 60 * 60 * 24)) || 1)).toLocaleString()}
                      </span>
                    </div>
                  </div>
                )}

                {/* Error Message */}
                {dateError && (
                  <div className="bg-red-50 text-red-600 w-full text-sm p-3 rounded-lg border border-red-100 flex items-center gap-2 mt-4 ml-2 mr-2">
                    <span>⚠️</span> {dateError}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={!pickUpDate || !dropOffDate || isChecking}
                  className={`flexCenter gap-2 rounded-md min-w-44 text-white font-medium transition-all
                    ${isAvailable ? 'bg-green-600 hover:bg-green-700' : 'btn-solid'}
                    ${(!pickUpDate || !dropOffDate || isChecking) ? 'opacity-70 cursor-not-allowed' : ''}
                  `}>

                  {isChecking ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    !isAvailable && <img src={assets.search} alt="searchIcon" width={20} className='invert' />
                  )}

                  <span>
                    {isChecking ? "Checking..." : isAvailable ? "Confirm Booking" : "Check Dates"}
                  </span>
                </button>
              </form>
              {/* Contact Agency */}
              <div className='p-6 bg-primary rounded-xl mt-10 max-w-sm'>
                <h4 className='mb-3'> For Buying Contact</h4>
                <div className='text-sm sm:w-80 divide-y divide-gray-500/30 ring-1 ring-slate-900/10 rounded'>
                  <div className='flex items-start justify-between p-3'>
                    <div>
                      <div className='flex items-center space-x-2'>
                        <h5>{car.agency.name}</h5>
                        <p className='bg-yellow-500/20 px-2 py-0.5 rounded-full text-xs text-yellow-600 border border-yellow-500/30'>Agency</p>
                      </div>
                      <p>Agency Office</p>
                    </div>
                    <img src={car.agency.owner.image} alt="" className='h-10 w-10 rounded-full' />
                  </div>

                  <div className="flexStart gap-2 p-1 5">
                    <div className='bg-yellow-500/20 p-1 rounded-full border-yellow-yellow-500/30'>
                      <img src={assets.phone} alt="" width={14} />
                    </div>
                    <p>{car.agency.contact}</p>
                  </div>

                  <div className="flexStart gap-2 p-1 5">
                    <div className='bg-yellow-500/20 p-1 rounded-full border-yellow-yellow-500/30'>
                      <img src={assets.mail} alt="" width={14} />
                    </div>
                    <p>{car.agency.email}</p>
                  </div>
                  <div className='flex items-center divide-x divide-gray-500/30'>
                    <button className='flex items-center justify-center gap-2 w-1/2 py-3 cursor-pointer'>
                      <img src={assets.mail} alt="" />
                      Send Email
                    </button>

                    <button className='flex items-center justify-center gap-2 w-1/2 py-3 cursor-pointer'>
                      <img src={assets.phone} alt="" />
                      Call Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* IMAGES - RIGHT SIDE */}
            <div className='flex flex-[4] w-full bg-white p-4 rounded-xl my-4'>
              <CarImages car={car} />

            </div>

          </div>
        </div >
      </div >
    )
  )
}

export default CarDetails