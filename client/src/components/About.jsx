import React from 'react'
import Title from './Title'
import {assets} from '../assets/data'

const About = () => {
  return (
    <section className='max-padd-container py:16 xl:py-28 !pt-36'>
        {/* CONTAINER*/}
        <div className='flex items-center flex-col lg:flex-row gap-14'>
            {/* INFO - LEFT SIDE */}
            <div className="flex-[5]">
               < Title 
                title1={"Your Trusted Real Estate Partner"}
                title2={"Helping You Every Step of the the Way"}
                paraStyles={"hidden"}
               />
               <p className="mb-10 mt-5"> Find reliable car with trasparent pricing, verified inspections, flexible pickup and delivery options, and 24/7 customer support foe a smooth rental or bying expirience.</p>

            <div className='grid gap-6 md:grid-cols-2'>
                <div className='p-4 rounded-xl bg-primary'>
                    <h5>Wide Vehicle Section</h5>
                    <p className='text-sm mt-2'>We offer a large range of vehicles to match every need — from small cars for daily travel to luxury SUVs and vans for long trips. Whether you're traveling alone or with a group, you can easily find the perfect ride that fits your budget and comfort.</p>
                </div>

                <div className='p-4 rounded-xl bg-primaryOne'>
                    <h5>Quick Service</h5>
                    <p className='text-sm mt-2'>Our booking process is fast, simple, and hassle-free. With just a few clicks, you can choose your vehicle, confirm availability, and hit the road. No long waiting times — we make sure your rental experience is smooth and speedy.</p>
                </div>

                <div className='p-4 rounded-xl bg-primaryTwo'>
                    <h5>Transparent Pricing</h5>
                    <p className='text-sm mt-2'>We believe in honest and clear pricing. All rates are shown upfront with no hidden fees. You'll always know exactly what you're paying for, so you can plan your trip with confidence and peace of mind.</p>
                </div>

                <div className='p-4 rounded-xl bg-primaryThree'>
                    <h5>24/7 Support</h5>
                    <p className='text-sm mt-2'>Our support team is available anytime, day or night. Whether you need help with booking, guidance on vehicle pickup, or roadside assistance, we're always here to support you.</p>
                </div>
            </div>
            </div>
            {/* INFO - RIGHT SIDE */}
            <div className="flex-[4] flex gap-7">
                <div className="relative flex justify-end mb-8">
                    <img src={assets.about1} alt="aboutImg" className='rounded-2xl' />
                </div>

                <div className="relative flex justify-end mt-8">
                    <img src={assets.about2} alt="aboutImg" className='rounded-2xl' />
                </div>
            </div>
        </div>
        
    </section>
  )
}

export default About