import React from 'react'
import { BsArrowLeft } from 'react-icons/bs'
import { useRedux } from '../../../hooks/useRedux'
import { _toggleRightSide } from '../../../redux/reducers/toggler'

export const Header = ({selectedConversation}) => {
    const {dispatch, rightSideToggled,  account:{_id}} = useRedux()
  return (

    <div className="chat-header">
          {selectedConversation.users.map((user) => {
              if (user._id !== _id) return user.username;
            })}

<div className="chat-header-right">
          <div onClick={() => dispatch(_toggleRightSide())}>
            {rightSideToggled && (
              <div className="expand-toggle">
                <BsArrowLeft size={25} />
              </div>
            )}
          </div>
        </div>
        
      </div>


 
  )
}
