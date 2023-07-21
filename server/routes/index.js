const express = require("express");
const router = express();
const Controller = require("../Controller/index");

// respond with "hello world" when a GET request is made to the homepage
router.post(`/register`, Controller.userRegister);

router.post(`/login`, Controller.userLogin);

router.get(`/userdata`, Controller.userData);
module.exports = router;
