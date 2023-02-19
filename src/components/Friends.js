import React from 'react';
import ProfileImage from './ProfileImage';

const Friends = ({image, username}) => {
  return (
       <div className='friend'>
            <div className='friend-image'>
                 <div className='image'>
                 {/* <img src={image} alt='' /> */}
                 <ProfileImage image={image}/>
                 </div>
            </div>

            <div className='friend-name-seen'>
                 <div className='friend-name'>
                      <h4>{username}</h4>
                 </div>

            </div>

       </div>
  )
};

export default Friends;