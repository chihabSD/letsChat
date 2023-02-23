import React from 'react'
import { IMAGE_URL } from '../api/endpoint'
export const UserImage = ({style, image}) => {
  return (
    <div className='pic-container'>
       <img src={`${IMAGE_URL}/${image}`} />
    </div>
  )
}
