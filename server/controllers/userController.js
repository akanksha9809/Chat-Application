const User = require("../models/User");

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

module.exports = {
  allUsers,
};

/*

Jatin Kushwah7:48 PM
const currentUser = req._id;

        const users = req.query.search
            ? await User.find({
                  username: { $regex: req.query.search, $options: "i" },
                  email: { $regex: req.query.search, $options: "i" },
                  _id: { $ne: currentUser },
              })
            : null;
*/

//req.user._id vs req._id
// async keyword