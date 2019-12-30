const express = require('express');
const router = express.Router({ mergeParams: true });
const balanceController = require("../../controllers/refferals/member")


router.get('/:id', balanceController.get)

module.exports = router;
