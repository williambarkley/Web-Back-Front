const { roles } = require("../../roles");
const { REQUEST } = require("../../types");

exports.checkAccessActionUser = (action) => {
  return async (req, res, next) => {
    try {
      // check read any
      let permission = roles.can(res.locals.user.role)[`${action}Any`]("user");
      //   check read own
      if (!permission.granted) {
        permission = roles.can(res.locals.user.role)[`${action}Own`]("user");
        if (permission.granted) {
          try {
            const userIdparams = req.params.userId;
            const userId = res.locals.userId;

            if (userId != userIdparams) {
              permission = { granted: false };
            }
          } catch (err) {
            res
              .status(REQUEST.INTERNAL_SERVER_ERROR)
              .json({ message: err.message });
          }
        }
      }

      if (permission.granted) {
        next();
      } else {
        res
          .status(REQUEST.FORBIDDEN)
          .json({ message: "you dont have permissions to do this action" });
      }
    } catch (err) {
      res.status(REQUEST.INTERNAL_SERVER_ERROR).json({ message: err.message });
    }
  };
};
