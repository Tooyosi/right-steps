const express = require('express');
const router = express.Router({ mergeParams: true });
const referralLinkController = require("../../controllers/refferals/referral_link")
const middleware = require("../../middleware/middleware")

router.get('/:id',middleware.withAuth, referralLinkController.get)

module.exports = router;
