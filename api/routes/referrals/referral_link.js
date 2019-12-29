const express = require('express');
const router = express.Router({ mergeParams: true });
const referralLinkController = require("../../controllers/refferals/referral_link")


router.post('/', referralLinkController.post)

module.exports = router;
