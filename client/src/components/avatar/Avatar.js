import React from 'react'
import defaultImg from "../../assets/user.png";
import './Avatar.scss'

function Avatar({src}) {
  return (
    <div className='Avatar'>
         <img src={src ? src : defaultImg} alt="User Avatar" />
    </div>
  )
}

export default Avatar