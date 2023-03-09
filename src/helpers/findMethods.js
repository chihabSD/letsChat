// return current user in a conversation
export const findCurrentUserDetails =  (selectedConversation, _id) => {
    return selectedConversation.members.find(user => user.user._id == _id)
  };
  