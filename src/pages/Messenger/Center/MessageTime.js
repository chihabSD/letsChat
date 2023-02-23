import React from 'react'
import moment from 'moment'
import Moment from 'react-moment'
export const MessageTime = ({date}) => {
  return (
    <div className='bottom'>
    {/* <p>{moment(date).format()}</p> */}
    {/* <Moment format="YYYY/MM/DD">{date}</Moment> */}
    <p>{date}</p>
</div>
  )
}

// import React from 'react'

// export const MessageTime = () => {
//   return (
//     <div>
//         <p>Wed 23 Jul</p>
//     </div>
//   )
// }
