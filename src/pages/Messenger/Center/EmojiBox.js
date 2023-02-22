import React from 'react'
import { FaSearch } from 'react-icons/fa'
import { emojis } from '../../../data'
const EmojiBox = () => {
  return (
    <div className='emoji-box-container'>
        <div className="emojiheader-container">
        <div className="emojiheader-container-search">
            <FaSearch size={20} color="grey"/>
            <input type="text" placeholder='search for an emoji' />
        </div>
        </div>
        <div className='emoji-contents'>

        {emojis.map(emoji =><div className='emojiIcon'>{emoji.emoji}</div>)}
        </div>
    </div>
  )
}

export default EmojiBox