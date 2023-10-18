const express = require("express");
const router = express.Router();

const merchants = require("./merchants");
const webpages = require("./webpages");
const users = require("./users");
const auth = require("./auth");

// router.use("/auth", auth);
router.use("/merchants", merchants);
router.use("/webpages", webpages);
router.use("/users", users);

module.exports = router;
