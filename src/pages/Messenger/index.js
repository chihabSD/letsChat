import React from 'react'
import MainLayOut from '../../Layouts/MainLayOut'
import Center from './Center'
import Left from './Left'
import Right from './Right'

const MessengerUI = () => {
  const currentUser = {name:'chihabelddine', email:'adam@gmail.com'}
  return (
    <MainLayOut>
        <Left  currentUser={currentUser}/>
        <Center  currentUser={currentUser}/>
        <Right currentUser={currentUser}/>
    </MainLayOut>
  )
}

export default MessengerUI