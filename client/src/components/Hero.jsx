import React from 'react'
import { assets, cities } from "../assets/data";

const Hero = () => {
  return (
    <section className='bg-primary'>

        {/* CCONTAINER */}
        <div className='max-padd-container relative flex justify-end mx-auto flex-col gap-9 py-6 py-32 z-10'>
            {/* CONTACT */}
            <div className='flexCenter flex-col gap-y-6'>
                <div className='text-center flex-col gap-y-6'>
                            <h1 className='capitalize leading tight'>Explore{" "}<span className='bg-gradient-to-r from-solid to to-white pl-1 rounded-md'>
                                {" "}
                                Premium vehicles.{" "}</span> 
                                {" "}  Exciting destinations. Endless journeys - book your perfect ride today
                        </h1>
                </div>
                {/* Search booking form */}
                <form className='bg-white text-gray-500 rounded-md md:rounded-full px-6 md:pl-12 py-4  flex flex-col md:flex-row gap-4 lg:gap-x-8 max-w-md md:max-w-4xl ring-1 ring-slate-900/5  relative'>

                    <div className='flex flex-col w-full'>
                        <div className='flex items-center gap-2'>
                            <img src={assets.pin} alt="pinIcon" width={20} />
                            <label htmlFor="destinationInput">Destination</label>
                        </div>
                        <input 
                            list='destinations' 
                            id="destinationInput" 
                            type="text" 
                            className=" rounded border border-green-200 px-3 py-1.5 mt-1.5 text-sm outline-none capitalize" placeholder="Type here" 
                            required 
                        />

                        <datalist id='destinations'>
                            {cities.map((city, index) => (
                                <option  value={city} key={index} />
                            ))}
                        </datalist>
                    </div>

                    <div className='flex flex-col w-full'>
                        <div className='flex items-center gap-2'>
                            <img src={assets.calendar} alt="calendarIcon" width={20} />
                            <label htmlFor="pickUp">Pick Up</label>
                        </div>
                        <input 
                            id="pickUp" 
                            type="date" 
                            className=" rounded border border-green-200 px-3 py-1.5 mt-1.5 text-sm outline-none" />
                    </div>

                    <div className='flex flex-col w-full'>
                        <div className='flex items-center gap-2'>
                            <img src={assets.calendar} alt="calendarIcon" />
                            <label htmlFor="dropOff">Drop Off</label>
                        </div>
                        <input 
                            id="dropOff" 
                            type="date" 
                            className=" rounded border border-green-200 px-3 py-1.5 mt-1.5 text-sm outline-none" />
                    </div>

                    <button tupe="submit" className='flexCenter gap-1 rounded-md md:rounded-full bg-solid text-white py-2 md:py-5 px-8 my-auto max-md:w-full max-md:py-1 cursor-pointer' >
                        <img src={assets.search} alt="" width={20} className='invert' />
                        <span>Search</span>
                    </button>
                </form>
            </div>
            <div className="flexCenter">
                <img src={assets.bg} alt="bgImg" className='w-full md:w-[77%]' />
            </div>
        </div>

    </section>
  )
}

export default Hero