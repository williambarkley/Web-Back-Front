const { UserModel } = require("../../models");
const { REQUEST } = require("../../types");

exports.getUsersByCity = async (req, res) => {
  try {
    const { city } = req.params;

    console.log(city);

    const users = await UserModel.find({ city: city });

    res.json({ users });
  } catch (err) {
    res.status(REQUEST.INTERNAL_SERVER_ERROR).json({ message: err.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = UserModel.findById(userId);

    res.json({ user });
  } catch (err) {
    res.status(REQUEST.INTERNAL_SERVER_ERROR).json({ message: err.message });
  }
};

exports.deleteUserById = async (req, res) => {
  try {
    const { userId } = req.params;

    await UserModel.findByIdAndDelete(userId.toString().trim());

    res.json({ message: `${userId} was deleted` });
  } catch (err) {
    res.status(REQUEST.INTERNAL_SERVER_ERROR).json({ message: err.message });
  }
};
