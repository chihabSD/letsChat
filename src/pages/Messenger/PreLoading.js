import React from 'react'
import MainLayoutLoading from '../../Layouts/MainLayoutLoading'

const PreLoading = ({filled}) => {
  return (
    <MainLayoutLoading>
    <h3> Loading Chats </h3>
    <div className="progressbar">
      <div
        style={{
          height: "100%",
          width: `${filled}%`,
          backgroundColor: "#a66cff",
          transition: "width 0.5s",
        }}
      ></div>
    </div>
    <div className="progressPercent">{filled}%</div>
  </MainLayoutLoading>
  )
}

export default PreLoading