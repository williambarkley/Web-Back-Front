const AccessControl = require("accesscontrol");
const ac = new AccessControl();

const {
  ADMIN_ROLE,
  MERCHANT_ROLE,
  USER_ROLE,
  PUBLIC_ROLE,
} = require("./types");

exports.roles = (function () {
  ac.grant(PUBLIC_ROLE).readAny("merchant").readAny("webpage");

  ac.grant(USER_ROLE)
    .extend("anonymous-user")
    .updateOwn("user")
    .deleteOwn("user")
    .updateAny("webpage", ["score", "review"]);

  ac.grant(MERCHANT_ROLE)
    .updateOwn("merchant")
    .deleteOwn("merchant")
    .createAny("webpage")
    .updateOwn("webpage")
    .deleteOwn("webpage")
    .readAny("user");

  ac.grant(ADMIN_ROLE)
    .createAny("merchant")
    .updateAny("merchant")
    .readAny("merchant")
    .deleteAny("merchant");

  return ac;
})();
