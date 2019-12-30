const express = require('express');
const router = express.Router({ mergeParams: true });
const refferedController = require("../../controllers/refferals/reffered")
const memberController = require("../../controllers/refferals/member")

router.post('/', refferedController.post)
router.get('/:id', memberController.get)

module.exports = router;
