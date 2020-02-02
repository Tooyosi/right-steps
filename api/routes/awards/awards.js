const express = require('express');
const router = express.Router({ mergeParams: true });
const awardController = require("../../controllers/awards/awards")
const middleware = require("../../middleware/middleware")

router.get('/', middleware.withAuth, awardController.getAllAwards)
router.put('/', middleware.withAuth, awardController.approveAward)


module.exports = router;
