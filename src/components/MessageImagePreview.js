import React from 'react'
import { GrClose } from 'react-icons/gr'
import { useRedux } from '../hooks/useRedux'
import { _toggleMessageImagePrview } from '../redux/reducers/toggler'
const MessageImagePreview = () => {
 const {  imagePreview,   dispatch} =    useRedux()
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
          src={imagePreview.imageUrl}
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