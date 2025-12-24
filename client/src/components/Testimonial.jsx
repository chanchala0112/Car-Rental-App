import React from 'react'
import Title from './Title'
import {assets} from "../assets/data";

const Testimonial = () => {
  return (
    <section className='max-padd-container py-16 xl:py-32'>
      <Title
        title1={"What People Says"}
        title2={"Don't Take Our Word For It"}
        titleStyles={"mb-10"}
        para={"Here waht our users say about us. We're always looking for ways to improve. If you have a positive experience with us, leave a review."}
      />

      {/*CONTAINER*/}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
        <div className='bg-primary w-full space-y-4 p-3 rounded-md text-gray-500 text-sm'>
          <div className='flexBetween'>
            <div className='flex gap-1'>
              <img src={assets.star} alt="" width={16} />
              <img src={assets.star} alt="" width={16} />
              <img src={assets.star} alt="" width={16} />
              <img src={assets.star} alt="" width={16} />
              <img src={assets.star} alt="" width={16} />
            </div>
            <p>22 Nov 2025</p>
          </div>
          <p>I had a great experience renting a vehicle from this service. The booking process was easy, the vehicle was clean and well-maintained, and the staff were friendly and helpful. Pricing was reasonable with no hidden charges. Highly recommended for safe and reliable travel.</p>
          <div className='flex items-center gap-2'>
            <img src={assets.user1} alt="userImg" className='h-8 w-8 rounded-full'/>
            <p className='text-gray-800 font-medium'> Chanchala Jeewanthi </p>
          </div>
        </div>

        <div className='bg-primary w-full space-y-4 p-3 rounded-md text-gray-500 text-sm'>
          <div className='flexBetween'>
            <div className='flex gap-1'>
              <img src={assets.star} alt="" width={16} />
              <img src={assets.star} alt="" width={16} />
              <img src={assets.star} alt="" width={16} />
              <img src={assets.star} alt="" width={16} />
              <img src={assets.star} alt="" width={16} />
            </div>
            <p>22 Nov 2025</p>
          </div>
          <p>The vehicle was in excellent condition and very comfortable to drive. Pickup and return were smooth, and customer service was very professional. Definitely a reliable rental service.</p>
          <div className='flex items-center gap-2'>
            <img src={assets.user2} alt="userImg" className='h-8 w-8 rounded-full'/>
            <p className='text-gray-800 font-medium'> Chenura Maheshika </p>
          </div>
        </div>

        <div className='bg-primary w-full space-y-4 p-3 rounded-md text-gray-500 text-sm'>
          <div className='flexBetween'>
            <div className='flex gap-1'>
              <img src={assets.star} alt="" width={16} />
              <img src={assets.star} alt="" width={16} />
              <img src={assets.star} alt="" width={16} />
              <img src={assets.star} alt="" width={16} />
              <img src={assets.star} alt="" width={16} />
            </div>
            <p>22 Nov 2025</p>
          </div>
          <p>We rented a vehicle for a family trip, and it was perfect. Spacious, clean, and fuel-efficient. The staff explained everything clearly. Great experience overall.</p>
          <div className='flex items-center gap-2'>
            <img src={assets.user3} alt="userImg" className='h-8 w-8 rounded-full'/>
            <p className='text-gray-800 font-medium'> Mayuri Anushika </p>
          </div>
        </div>
      </div>


    </section>
  )
}

export default Testimonial