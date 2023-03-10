import React from "react";

export const useModal = () => {
  // Image preview modal
  const [newConversationVisible, setNewConversationVisible] = React.useState(false);
  const [newGroup, setNewGroup] = React.useState(false);
  const [imagePreviewVisible, setImagePreviewVisible] = React.useState(false);
  const [messageReactionVisible, setMessageReactionVisible] =
    React.useState(false);
  const toggleNewGroup = () => setNewGroup((p) => !p);
  const toggleNewConversation = () => setNewConversationVisible((p) => !p);
  const toggleImagePreview = () => setImagePreviewVisible((p) => !p);
  const toggleMessageReactions = () => setMessageReactionVisible((p) => !p);
  return {
    imagePreviewVisible,
    toggleImagePreview,
    messageReactionVisible,
    toggleMessageReactions,
    toggleNewConversation, newConversationVisible, toggleNewGroup, newGroup
  };
};
