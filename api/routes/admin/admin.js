const express = require('express');
const router = express.Router({ mergeParams: true });
const adminController = require("../../controllers/admin/admin")
const middleware = require("../../middleware/middleware")

router.post('/register', adminController.post)
router.get('/members/:id', adminController.get)
router.get('/referral/:id', adminController.referral)

module.exports = router;
