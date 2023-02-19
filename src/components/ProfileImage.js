import React from 'react'
import { IMAGE_URL } from '../api/endpoint'

const ProfileImage = ({image}) => {
  return (
    <img src={`${IMAGE_URL}/${image}`} alt="" />
  )
}

export default ProfileImage