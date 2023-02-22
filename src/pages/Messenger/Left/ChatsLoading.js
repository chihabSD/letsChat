import React from 'react'
import { Oval } from 'react-loader-spinner'

const ChatsLoading = () => {
  return (
    <div className='chat loading-chat'>
         <Oval
                        height={40}
                        width={80}
                        color="#fff"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                        ariaLabel="oval-loading"
                        secondaryColor="#4fa94d"
                        strokeWidth={2}
                        strokeWidthSecondary={2}
                      />
        <p>Please wait</p>
    </div>
  )
}

export default ChatsLoading