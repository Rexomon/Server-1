const express = require("express");
const router = express();
const Controller = require("../Controller");
// respond with "hello world" when a GET request is made to the homepage
router.post("/users/register", Controller.userRegister);

router.post("/users/login", Controller.userLogin);

router.get("/isers/data", Controller.UserData);
module.exports = router;
