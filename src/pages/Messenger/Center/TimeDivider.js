import React from 'react'
import moment from 'moment'
import Moment from 'react-moment'
export const TimeDivider = ({timeline}) => {

  const dateFormatter = (myDate) => {

      // get from-now for this date
      var fromNow = moment( myDate ).fromNow();
  
      // ensure the date is displayed with today and yesterday
      return moment( myDate ).calendar( null, {
          // when the date is closer, specify custom values
          lastWeek: '[Last] dddd',
          lastDay:  '[Yesterday]',
          sameDay:  '[Today]',
          nextDay:  '[Tomorrow]',
          nextWeek: 'dddd',
          // when the date is further away, use from-now functionality             
          sameElse: function () {
              return "[" + fromNow + "]";
          }
      });
  }

  const calendarStrings = {
    lastDay : '[Yesterday at] LT',
    sameDay : '[Today at] hh:mm',
    nextDay : '[Tomorrow at] LT',
    lastWeek : '[last] dddd [at] LT',
    nextWeek : 'dddd [at] LT',
    sameElse : 'L'
};

  return (
    <div className='time-divider'>
    {/* <p>{moment(date).format()}</p> */}
    
    <p>{dateFormatter(timeline)}</p>
    {/* <Moment calendar={calendarStrings}>
                {date}
            </Moment> */}
    {/* <p>{date}</p> */}
</div>
  )
}

