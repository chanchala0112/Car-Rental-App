import React from 'react'
import Hero from '../components/Hero.jsx'
import About from '../components/About.jsx'
import FeaturedCars from '../components/FeaturedCars.jsx'
import Testimonial from '../components/Testimonial.jsx'
import Banner from '../components/Banner.jsx'

const Home = () => {
  return (
    <>
    <Hero />
    <About />
    <FeaturedCars />
    <Banner />
    <Testimonial />
    </>
  )
}

export default Home