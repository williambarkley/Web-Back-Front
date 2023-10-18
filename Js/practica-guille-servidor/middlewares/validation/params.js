const { REQUEST } = require("../../types");

exports.validateParams = (params) => {
  return (req, res, next) => {
    return params.every((param) => req.params[param])
      ? next()
      : res.status(REQUEST.BAD_REQUEST).json({ message: "check params" });
  };
};
