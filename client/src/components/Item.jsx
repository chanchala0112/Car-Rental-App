import React from 'react'
import { assets } from '../assets/data' 
import { useNavigate } from 'react-router-dom'

const Item = ({car}) => {    
    const currency = "Rs."
    const navigate = useNavigate()

    // colors to cycle through
    const colors = ["#f5f5f5", "#f0f9fd", "#fcf6ed"];
    //Compute an index from Product._id parseInt fallback to 0 for safety
    const bgColor = colors[parseInt(car._id?.slice(-4) || "0", 16) % colors.length]
  return (
    <div onClick={() => {navigate("/listing/" +car._id); scrollTo(0,0)}}
      className=""
      style={{backgroundColor: bgColor}}
    >
        <h4>{car.title}</h4>
        <div>
            <h5>{car.bodyType}</h5>
            <div>
              {currency}{car.price.sale} | {currency}{car.price.rent}.00 
              <span className="text-xs">/day</span>
            </div>
        </div>
        {/*Image*/}
        <div className="relative py-6 ">
        <img src={car.images[0]} alt={car.title} />
        </div>
        {/*Info*/}
        <div>
          <p>
            <img src={assets.transmission} alt="" width={19} />
            {car.specs.transmission}
          </p>
        </div>
    </div>
    
  )
}

export default Item