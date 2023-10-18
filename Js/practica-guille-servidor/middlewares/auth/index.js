const { REQUEST } = require("../../types");
const roles = require("../../roles");
const User = require("../../models/User");

exports.checkLoggedIn = async (req, res, next) => {
  try {
    const user = await User.findById(res.locals.userId);
    if (!user) {
      return res.status(REQUEST.UNAUTHORIZED).json({ message: "need auth" });
    }

    res.locals.user = user;
    next();
  } catch (error) {
    res.redirect("/");
  }
};
