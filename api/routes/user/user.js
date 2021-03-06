const express = require('express');
const router = express.Router({ mergeParams: true });
const userController = require("../../controllers/user/userController")
const memberController = require("../../controllers/refferals/member")
const middleware = require("../../middleware/middleware")
const ancestors = require('../../controllers/functions/getAncestors')

router.get('/:id', middleware.withAuth, userController.get)
router.put('/:id/changePassword', middleware.withAuth, userController.changePassword)
router.put('/', middleware.withAuth, userController.put)
router.get('/bonus/:id',middleware.withAuth, userController.bonus)
router.get('/ancestor/:id', async (req, res)=>{
    let ancest = await ancestors(req.params.id)
    res.send(ancest)
})
router.post('/notifications', middleware.withAuth, userController.notificationsPost)
router.get('/search/:searchTerm', middleware.withAuth, userController.search)
router.get('/transfer/:userId', middleware.withAuth, userController.getTransfers)
router.post('/transfer/:userId', middleware.withAuth, userController.transfer)

module.exports = router;
