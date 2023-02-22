import { useRef, useState } from "react";
const useMain = () => {
    const ref = useRef(null)
  const [message, setMessage] = useState("");
  const [showEmojiBox, setShowEmojiBox] = useState(false); // control emoji box
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [toggleRight, setToggleRight] = useState(false);

    
  

  
  const handleMessageInput = (e) => {
    setMessage(e.target.value);
    // console.log('message from hook', message);
  };
  // toggle emoji box
  const toggleEmojiBox = () => {
    setShowEmojiBox((prev) => !prev);
  };

  // handle outside click
  const handleOutsideClick = (type) => {
    if(type === 'emojibox'){
        setShowEmojiBox(false)
    }
  };
// toggle right
  const handleToggleRight = () => {
    setToggleRight(prev => !prev)
  } 
  return {
    message,
    setMessage,
    showEmojiBox,
    handleMessageInput, 
    setShowEmojiBox, 
    toggleEmojiBox,
    handleOutsideClick,
    ref, handleToggleRight, toggleRight
  };
};

export { useMain };
