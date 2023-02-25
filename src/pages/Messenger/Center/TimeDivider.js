import React from 'react'
import moment from 'moment'
import Moment from 'react-moment'
export const TimeDivider = ({date}) => {
  return (
    <div className='time-divider'>
    {/* <p>{moment(date).format()}</p> */}
    
    
    <p>{date}</p>
</div>
  )
}

