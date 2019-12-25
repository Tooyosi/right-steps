const express = require('express');
const router = express.Router({ mergeParams: true });
const registerController = require("../controllers/registerController")


router.post('/', registerController.post)

module.exports = router;
