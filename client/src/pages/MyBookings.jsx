import React, {useEffect, useState} from 'react'
import { assets, dummyBookingsData } from '../assets/data'
import { useUser } from "@clerk/clerk-react";

const MyBookings = () => {
  const [bookings, setBookings] = useState([])
  const currency = "$"
  const {user} = useUser();

  const getUserBooking = async () => {
    setBookings(dummyBookingsData)
  }

  useEffect(()=> {
    if(user){
      getUserBooking()
    }
  }, [user])
  
  return (
    <div>
      <div>
        {bookings?.map((booking)=>(
          <div key={booking._id}>
            {/* Car List*/}
            <div>
              <div>
                <img src={booking.car.images[0]} alt="" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyBookings