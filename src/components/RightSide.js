import React from 'react'
import { FaPhoneAlt,FaVideo,FaRocketchat } from "react-icons/fa";
import FriendInfo from './FriendInfo';
import Message from './Message';
import MessageSend from './MessageSend';
const RightSide = ({image}) => {
  return (
    <div className='col-9'>
    <div className='right-side'>
    <input type="checkbox" id='dot' />
         <div className='row'>
              <div className='col-8'>
  <div className='message-send-show'>
       <div className='header'>
            <div className='image-name'>
                 <div className='image'>
                 <img src={image} alt='' />

                 </div>
                 <div className='name'>
                      <h3> Kazi Ariyan </h3>
                 </div>
            </div>

  <div className='icons'>
<div className='icon'>
  <FaPhoneAlt/>
</div>

<div className='icon'>
  <FaVideo/>
</div>

<div className='icon'>
  {/* <FaRocketchat/> */}
  <label htmlFor='dot'> <FaRocketchat/> </label>  
</div>

</div>

 </div>
 <Message />
 <MessageSend />
     </div>
              </div>  

         <div className='col-4'>
            User About Page 
            <FriendInfo />
       </div>  


         </div>
    </div>
</div>
  )
}

export default RightSide