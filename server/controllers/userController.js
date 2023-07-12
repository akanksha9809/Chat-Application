const User = require("../models/User");
const { error, success } = require("../utils/responseWrapper");

// get=> /user?search=piyush
const allUsers = async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find(keyword).find({ _id: { $ne: req._id } });
  res.send(users);
};

// get => /getLoggedUser
const getLoggedUser = async (req, res) => {
  try {
    const userId = req._id;
    const loggedUser = await User.findById(userId);
    return res.send(success(200, loggedUser));
  } catch (e) {
    return res.send(error(500, e.message));
  }
};

module.exports = {
  allUsers,
  getLoggedUser,
};
