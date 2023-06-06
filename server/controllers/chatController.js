const Chat = require("../models/Chat");
const User = require("../models/User");
const { error, success } = require("../utils/responseWrapper");

//1:1 chat
const accessChat = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.send(error(400, "UserId param not sent with request"));
    }

    var isChat = await Chat.find({
      isGroupChat: false,
      $and: [
        { users: { $elemMatch: { $eq: req._id } } },
        { users: { $elemMatch: { $eq: userId } } },
      ],
    })
      .populate("users", "-password")
      .populate("latestMessage");

    isChat = await User.populate(isChat, {
      path: "latestMessage.sender",
      select: "name, email",
    });

    if (isChat.length > 0) {
      //already exists
      return res.send(success(200, isChat[0]));
    } else {
      //create
      var chatData = {
        chatName: "sender",
        isGroupChat: false,
        users: [req._id, userId],
      };
      const createdChat = await Chat.create(chatData);
      const fullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password"
      );
      return res.send(success(200, fullChat));
    }
  } catch (e) {
    return res.send(error(500, e.message));
  }
};

const fetchChats = async (req, res) => {
  try {
    Chat.find({ users: { $elemMatch: { $eq: req._id } } })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .then(async (results) => {
        results = await User.populate(results, {
          path: "latestMessage.sender",
          select: "name email",
        });
        return res.send(success(200, results));
      });
  } catch (e) {
    return res.send(error(500, e.message));
  }
};

//group chat
const createGroupChat = async (req, res) => {
  const { name, users } = req.body;
  if (!name || !users) {
    return res.send(error(400, "UserId param not sent with request"));
  }

  const addUsers = JSON.parse(users);

  if (addUsers.length < 2) {
    return res.send(
      error(400, "More than 2 users are required to form a group chat")
    );
  }

  addUsers.push(req.user);

  try {
    const groupChat = await Chat.create({
      chatName: name,
      users: addUsers,
      isGroupChat: true,
      groupAdmin: req.user,
    });

    const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");
    return res.send(success(200, fullGroupChat));
  } catch (e) {
    return res.send(error(500, e.message));
  }
};

const renameGroup = async (req, res) => {
  const { chatId, chatName } = req.body;

  const updatedChat = await Chat.findByIdAndUpdate(
    chatId,
    {
      chatName,
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!updatedChat) {
    return res.send(error(404, "Chat not found"));
  } else {
    return res.send(error(200, updatedChat));
  }
};

const addToGroup = async (req, res) => {
  const { chatId, userId } = req.body;

  const chat = await Chat.findById(chatId)
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!chat) {
    //NULL
    return res.send(error(404, "Chat not found"));
  }

  /*
    
    if (chat.users.includes(userId)) {//values are not being compared correctly
    return res.send(error(400, "User is already in the group"));
    }
  */

  //convert userId to string
  const stringUserId = userId.toString();

  //check if user is already present in the users array
  if (chat.users.some((user) => user._id.toString() === stringUserId)) {
    return res.send(error(400, "User is already in the group"));
  }
  chat.users.push(userId);
  await chat.save();
  return res.send(success(200, chat));
};

const removeFromGroup = async (req, res) => {
    const { chatId, userId } = req.body;

    const chat = await Chat.findById(chatId)
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!chat) {
    //NULL
    return res.send(error(404, "Chat not found"));
  }

  //convert userId to string
  const stringUserId = userId.toString();

  //check if user is already present in the users array
  if (!chat.users.some((user) => user._id.toString() === stringUserId)) {
    return res.send(error(400, "User is not in the group"));
  }

  //remove the user from the users array
  chat.users.pull(userId);
  await chat.save();

  return res.send(success(200, chat));
};

module.exports = {
  accessChat,
  fetchChats,
  createGroupChat,
  renameGroup,
  addToGroup,
  removeFromGroup,
};
