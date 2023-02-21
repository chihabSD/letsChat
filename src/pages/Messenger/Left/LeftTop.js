import React from 'react'
import {IMAGE_URL} from '../../../api/endpoint'
// import { IMAGE_URL } from '../api/endpoint'
// BiDotsVertical
import {FaEllipsisV} from "react-icons/fa";
import { useRedux } from '../../../hooks/useRedux';
export const LeftTop = () => {
 const {account:{username, _id , image}} = useRedux()
  return (
    <div className='leftTop-container'>
        <div className="userimage">
            <img src={`${IMAGE_URL}/${image}`}/>
        </div>
        <div className="usermenu">
        <p>{_id}</p>
        <FaEllipsisV />
        </div>
    </div>
  )
}
