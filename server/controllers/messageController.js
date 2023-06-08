const Chat = require("../models/Chat");
const Message = require("../models/Message");
const User = require("../models/User");

const { error, success } = require("../utils/responseWrapper");

const sendMessage = async (req, res) => {
  try {
    const { content, chatId } = req.body;

    if (!content || !chatId) {
      console.log("Invalid data passed into request");
      return res.send(error(400, "Inavalid data passed into request"));
    }
    var message = await Message.create({
      sender: req._id,
      content: content,
      chat: chatId,
    });

    message = await message.populate("sender", "name pic");
    message = await message.populate("chat");
    message = await User.populate(message, {
      path: "chat.users",
      select: "name pic email",
    });

    await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });

    return res.send(success(200, message));
  } catch (e) {
    return res.send(error(500, e.message));
  }
};

/*
const sendMessage = async (req, res) => {
  const { chatId, content } = req.body;

  if (!chatId || !content) {
    return res.send(error(400, "Inavalid data passed into request"));
  }

  var newMessage = {
    sender: req._id,
    content: content,
    chat: chatId,
  };

  try {
    var message = await Message.create(newMessage);
    message = await message.populate("sender", "name pic");
    message = await message.populate("chat");
    message = await User.populate(message, {
      path: "chat.users",
      select: "name pic email ",
    });

    await Chat.findByIdAndUpdate(req.body.chatId, {
      latestMessage: message,
    });
    return res.send(success(200, message));
  } catch (e) {
    return res.send(error(500, e.message));
  }
};*/

module.exports = {
  sendMessage,
};
