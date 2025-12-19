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
      <div>
        <div>
          <div>
            <div>
              <img src={assets.star} alt="" width={16} />
              <img src={assets.star} alt="" width={16} />
              <img src={assets.star} alt="" width={16} />
              <img src={assets.star} alt="" width={16} />
              <img src={assets.star} alt="" width={16} />
            </div>
            <p>22 Nov 2025</p>
          </div>
          <p>I had a great experience renting a vehicle from this service. The booking process was easy, the vehicle was clean and well-maintained, and the staff were friendly and helpful. Pricing was reasonable with no hidden charges. Highly recommended for safe and reliable travel.</p>
          <div>
            <img src={assets.user1} alt="userImg" />
            <p> Chanchala Jeewanthi </p>
          </div>
        </div>
      </div>


    </section>
  )
}

export default Testimonial