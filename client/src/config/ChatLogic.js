//name
export const getSender = (loggedUser, users) => {
  return users[0]._id == loggedUser._id ? users[1].name : users[0].name;
};

//entire object
export const getSenderFull = (loggedUser, users) => {
  return users[0]._id == loggedUser._id ? users[1] : users[0];
};

export const isSameSender = (messages, msg, ind, loggedUser) => {
  return (
    ind < messages.length - 1 &&
    messages[ind + 1].sender._id !== msg.sender._id &&
    messages[ind].sender._id !== loggedUser._id
  );
};

export const isLastMessage = (messages, ind, userId) => {
  return (
    ind === messages.length - 1 &&
    messages[messages.length - 1].sender._id !== userId &&
    messages[messages.length - 1].sender._id
  );
};

export const isSameSenderMargin = (messages, msg, ind, userId) => {
  if (
    ind < messages.length - 1 &&
    messages[ind + 1].sender._id === msg.sender._id &&
    messages[ind].sender._id !== userId
  )
    return 33;
  else if (
    (ind < messages.length - 1 &&
      messages[ind + 1].sender._id !== msg.sender._id &&
      messages[ind].sender._id !== userId) ||
    (ind === messages.length - 1 && messages[ind].sender._id !== userId)
  )
    return 0;
  else return "auto";
};

export const isSameUser = (messages, msg, ind) => {
  return ind > 0 && messages[ind - 1].sender._id === msg.sender._id;
};
