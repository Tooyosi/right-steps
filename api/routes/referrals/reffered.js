const express = require('express');
const router = express.Router({ mergeParams: true });
const refferedController = require("../../controllers/refferals/reffered")
const memberController = require("../../controllers/refferals/member")
const middleware = require("../../middleware/middleware")

router.post('/', middleware.withAuth, refferedController.post)
router.get('/:id',middleware.withAuth, memberController.get)
router.get('/referral/:id',middleware.withAuth, memberController.referral)

module.exports = router;
