const express = require('express');
const router = express.Router({ mergeParams: true });
const forgotController = require("../../controllers/forgotpassword/forgotPassword")

router.post('/', forgotController.post)


module.exports = router;
