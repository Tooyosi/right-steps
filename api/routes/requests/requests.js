const express = require('express');
const router = express.Router({ mergeParams: true });
const requestController = require("../../controllers/requests/requests")
const middleware = require("../../middleware/middleware")
const multer = require('multer') 

// make this reusable for profile pictures
const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, './uploads/requests')
    },
    filename: function(req, file, cb){
        cb(null, Date.now() + file.originalname)
    }
})

const fileFilter = (req, file, cb)=>{
    if(file.mimetype === "image/jpeg" || file.mimetype === "image/png" || file.mimetype === "image/jpg"){
        cb(null, true)
    } else {
        cb(null, false)
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 500000
    },
    fileFilter: fileFilter
})
router.post('/',  requestController.addRequest)
router.get('/',  requestController.getAllRequests)
router.put('/',  requestController.approveRequest)


module.exports = router;
