import React from 'react'
import { GrClose } from 'react-icons/gr'
import { useRedux } from '../hooks/useRedux'
import { _toggleMessageImagePrview } from '../redux/reducers/toggler'
const MessageImagePreview = () => {
 const {    dispatch} =    useRedux()
  return (
    <div className="image-preview">
    <div className="image-preview-modal">
      <div className="modal-side left">
        <div>
          <div className="icon" onClick={() => dispatch(_toggleMessageImagePrview())}>

          <GrClose  size={19}/>
          </div>
        </div>
      </div>
      <div className="image-content">
        
        <img
          src="https://res.cloudinary.com/doodo0tre/image/upload/v1677491265/letsChat/Screenshot_2023-02-22_at_22.10.46_hlkjjm.png"
          alt=""
        />
      </div>

      <div className="modal-side">
        {/* <div>Rights</div> */}
      </div>
    </div>
  </div>
  )
}

export default MessageImagePreview