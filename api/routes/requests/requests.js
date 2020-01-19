const express = require('express');
const router = express.Router({ mergeParams: true });
const requestController = require("../../controllers/requests/requests")
const middleware = require("../../middleware/middleware")

router.post('/',middleware.withAuth,  requestController.addRequest)
router.get('/', middleware.withAuth, requestController.getAllRequests)
router.put('/', middleware.withAuth, requestController.approveRequest)


module.exports = router;
