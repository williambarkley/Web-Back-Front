const { REQUEST, USER_ROLE } = require("../../types");
const bcrypt = require("bcrypt");
const User = require("../../models/User");
const jwt = require("jsonwebtoken");

async function hashPassword(password) {
  return await bcrypt.hash(password, 10);
}

async function validatePassword(plainPassword, hashedPassword) {
  return await bcrypt.compare(plainPassword, hashedPassword);
}

exports.register = async (req, res) => {
  const {
    name,
    age,
    gender,
    email,
    password,
    role,
    city,
    interests,
    allowReceiveInfo,
  } = req.body;
  try {
    const hashedPassword = await hashPassword(password);

    const newUser = new User({
      name,
      age,
      gender,
      email,
      password: hashedPassword,
      role: role || USER_ROLE,
      city,
      interests,
      allowReceiveInfo,
    });
    const accessToken = jwt.sign(
      { userId: newUser._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );
    newUser.accessToken = accessToken;
    await newUser.save();

    res.status(REQUEST.CREATED).json({ accessToken });
  } catch (err) {
    res.status(REQUEST.INTERNAL_SERVER_ERROR).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      email,
    });

    const validPassword = await validatePassword(password, user.password);
    if (!validPassword)
      res
        .status(REQUEST.NOT_FOUND)
        .json({ message: "Wrong email or password" });

    const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    await User.findByIdAndUpdate(user._id, { accessToken });

    res.json({ accessToken });
  } catch (err) {
    res.status(REQUEST.INTERNAL_SERVER_ERROR).json({ message: err.message });
  }
};
