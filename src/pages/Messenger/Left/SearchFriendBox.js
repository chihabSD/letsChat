import React from 'react'
import {FaSearch} from "react-icons/fa";
const SearchFriendBox = () => {
  return (
    <div className='searchFriend-container'>
            <FaSearch />
            <input type="text" placeholder='Search or start new chat' />
    </div>
  )
}

export default SearchFriendBox