const express = require('express');
const router = express.Router({ mergeParams: true });
const refferedController = require("../../controllers/refferals/reffered")


router.post('/', refferedController.post)

module.exports = router;
