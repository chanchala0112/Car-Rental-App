import React, {useEffectEvent, useState} from 'react'
import { Link, useLocation } from 'react-router-dom'
import {assets} from "../assets/data"
import Navbar from './Navbar'

const Header = () => {
    const [menuOpened, setmenuOpened] = useState(false);
    const [active, setActive] = useState(false);
    const [showSearch, setShowSearch] = useState(false);    
    const location = useLocation();

    const isHomePage = location.pathname.endsWith('/');
  return (
    <header className={`${active ? "bg-white shadow-sm py-2" : "py-3"} ${!isHomePage && "bg-white"} fixed top-0 w-full left-0 right-0 z-50 transition-all duration-200`}>
        <div className='max-padd-container'>
            {/* CONTAINER */}
            <div className='flex flex-1' >
            {/* LOGO */}
            <div>
                <Link to={"/"} >
                <img src={assets.logoImg} alt="logoImg" width={88} className="h-7" />
                <span className='text-textColor uppercase text-xs font-extrabold tracking-[6px] relative bottom-1'> Shachith Rent House</span>
                </Link>
            </div>
        {/* Navbar */}
        <Navbar />
        { /* Buttons & Searchbar & profile */}
        <div>
            {/* Searchbar */}
            <div>
                {/* Input */}
                    <div>
                        <input type="text" placeholder='Type here...' />
                    </div>
                    {/* Toggle Button */}
                    <div>
                        <img src={assets.search} alt="" />
                    </div>
                </div>
                {/* Menu Toggle */}
                {menuOpened ? (
                    <img
                    src={assets.close}
                    alt="" className={`lg:hidden cursor-pointer text-x1`} /> 
                ):(
                    <img
                    src={assets.menu}
                    alt="" className={`lg:hidden cursor-pointer text-x1`} />
                )}
            </div>
        </div>
    </div>
  </header>
  )
}

export default Header