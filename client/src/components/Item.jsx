import React from 'react'
import {assets} from '../assets/data'
import { useNavigate } from 'react-router-dom'

const Item = ({car}) => {    
    const currency = "Rs."
    const navigate = useNavigate()

    // colors to cycle through
    const colors = ["#f5f5f5", "#e0e0e0", "#cfcfcf"];
    //Compute an index from Product._id parseInt fallback to 0 for safety
    const bgColor = colors[parseInt(car._id?.slice(-4) || "0", 15) % colors.length]
  return (
    <div onClick={() => {navigate("/listing/" +car._id); scrollTo(0,0)}}
        className=""
        style={{backgroundColor: bgColor}}
    >
        <h4>{car.title}</h4>
        <div>
            <h5>{car.bodyType}</h5>
        </div>
    </div>
  )
}

export default Item