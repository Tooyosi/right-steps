const express = require('express');
const router = express.Router({ mergeParams: true });
const userController = require("../../controllers/user/userController")
const memberController = require("../../controllers/refferals/member")
const middleware = require("../../middleware/middleware")

router.get('/:id', userController.get)

module.exports = router;
