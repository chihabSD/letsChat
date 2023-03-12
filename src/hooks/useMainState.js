import { useEffect, useRef, useState } from "react";
import { useRedux } from "./useRedux";
const useMain = () => {
  const { loadingConversation, dispatch, selectedConversation, newMessageAdd } =
    useRedux();
  const ref = useRef(null);
  const scrollRef = useRef();
  const [replyTo, setReplyTo] = useState(null);
  const [isReply, setReply] = useState(false);
  const [message, setMessage] = useState("");
  const [showEmojiBox, setShowEmojiBox] = useState(false); // control emoji box
  const [toggleRight, setToggleRight] = useState(false);
  const [filled, setFilled] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [rightSideToggled, setRightSideToggled] = useState(false);
  const [activeUsers, setActiveUsers] = useState([]);

  
  const toggleRightSide = () => {
    setRightSideToggled((p) => !p);
  };

  const toggleIsReply = () => {
    setReply((p) => !p);
    setReplyTo(null);
  };

  const handleSelectedReply = (msg) => {
    setReplyTo(msg);
    setReply(true);
    console.log("main replty to", replyTo, msg);
  };

  const selectedEmoji = (emoji) => {
    setMessage(`${message}` + emoji.emoji);
  };

  const handleMessageInput = (e) => {
    setMessage(e.target.value);
  };
  // toggle emoji box
  const toggleEmojiBox = () => {
    setShowEmojiBox((prev) => !prev);
  };

  // handle outside click
  const handleOutsideClick = (type) => {
    if (type === "emojibox") {
      setShowEmojiBox(false);
    }
  };
  // toggle right
  const handleToggleRight = () => {
    setToggleRight((prev) => !prev);
  };

  useEffect(() => {
    if (filled < 100 && isRunning) {
      setTimeout(() => setFilled((prev) => (prev += 2)), 50);
    }
  }, [filled, isRunning]);

  useEffect(() => {
    if (loadingConversation) {
      setIsRunning(true);
    }
  }, [loadingConversation]);

  const scrollDown = () => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  };

  useEffect(() => {
    if (newMessageAdd) {
      scrollRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
      setReplyTo(null);
    }
  }, [newMessageAdd]);

  useEffect(() => {
    if (selectedConversation) {
      setTimeout(() => {
        scrollDown();
      }, 1500);
    }
  }, [selectedConversation]);

  useEffect(() => {
    setTimeout(() => {
      scrollDown();
    }, 1500);
  }, []);

  return {
    filled,
    setIsRunning,
    message,
    setMessage,
    showEmojiBox,
    handleMessageInput,
    setShowEmojiBox,
    toggleEmojiBox,
    handleOutsideClick,
    ref,
    handleToggleRight,
    selectedEmoji,
    toggleRight,
    handleSelectedReply,
    replyTo,
    isReply,
    setReply,
    setReplyTo,
    toggleIsReply,
    scrollRef,
    toggleRightSide, rightSideToggled, activeUsers, setActiveUsers
  };
};

export { useMain };
