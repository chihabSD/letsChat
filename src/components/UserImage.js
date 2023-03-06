import React from 'react'
export const UserImage = ({style, image}) => {
  return (
    <div className='pic-container' style={{...style}}>
       <img src={`${image}`} />
    </div>
  )
}
