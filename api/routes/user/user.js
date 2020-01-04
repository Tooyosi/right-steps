const express = require('express');
const router = express.Router({ mergeParams: true });
const userController = require("../../controllers/user/userController")
const memberController = require("../../controllers/refferals/member")
const middleware = require("../../middleware/middleware")

router.get('/:id', userController.get)
router.post('/notifications', middleware.withAuth, userController.notificationsPost)

module.exports = router;
