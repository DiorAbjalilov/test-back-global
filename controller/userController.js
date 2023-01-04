const User = require("../models/user");
const UserActive = require("../models/activeUsers");
// for register controller function
const signUp = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const isUser = await User.find({ username });
    if (isUser.length) {
      res.json({ success: false, message: "bu username band" });
    } else {
      const newUser = new User({ username, email, password });
      newUser.save();
      res.json({ success: true, message: "siz ro'yxatdan o'tdingiz" });
    }
  } catch (error) {
    console.log("ERROR registering", error);
  }
};

// for login controller function
const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const findUser = await User.findOne({ username }).select(["+password"]);
    const isMatch = await findUser.matchPassword(password);
    if (findUser.username && isMatch) {
      const isActive = await UserActive.findOne({ id: findUser._id });
      if (isActive) {
        res.json({ success: false, message: "user active" });
      } else {
        const newActiveUser = new UserActive({
          id: findUser._id,
        });
        await newActiveUser.save();
        res.json({
          success: true,
          message: "user ro'yxatdan o'tgan",
          data: findUser,
        });
      }
    } else {
      res.json({
        success: false,
        message: "user ro'yxatdan o'tmagan",
      });
    }
  } catch (error) {
    console.log("Error login", error);
  }
};

const logout = async (req, res) => {
  try {
    const { id } = req.query;
    await UserActive.findOneAndRemove({ id });
    res.json({ success: true, message: "user logout" });
  } catch (error) {
    console.log("Error logout", error);
  }
};

module.exports = { signUp, login, logout };
