const models = require('../../connections/sequelize')
const connection = require('../../connections/connection')
const { logger } = require('../../loggers/logger')
module.exports = {
    get: ('/', async (req, res) => {
        let i = 0;

        const fetchDownlines = async (id) => {
            let member = await models.Downlines.findOne({
                where: {
                    user_id: id
                },
                include: [ {
                    model: models.User,
                    required: false,
                    as: "left_leg"
                },{
                    model: models.User,
                    // to print values where one parameter is null
                    required: false,
                    as: "right_leg"
                },]
            })
            let obj = {}
            if (member !== null && member.left_leg !== null) {
                // for (let i ; i < 5; i++) {

                //     let leftMember = await fetchDownlines(member.left_leg.user_id)
                //     member.left = leftMember;
                //     let newMember = member;
                //     i++;
                //     console.log (leftMember, "herrrr")
                // }
                // let arrayLoop = new Array(5); 
                // arrayLoop.forEach( async (element) => {
                //     let leftMember = await fetchDownlines(member.left_leg.user_id)
                //     member.left = leftMember;
                //     let newMember = member;
                //     i++;
                //     console.log (leftMember, "herrrr")
                // });
                // if (i == 1) {
                //     return member
                // } else {
                //     let leftMember = await fetchDownlines(member.left_leg.user_id)
                //     member.left = leftMember;
                //     let newMember = member;
                //     i++;
                //     console.log(leftMember, "here")
                //     return (leftMember)
                // }

            }
            return member

        }
        let userId = req.params.id;
        try {
            let resToSend = {
                result: await fetchDownlines(userId)
            };
            for (i; i < 5; i++) {
                if (i == 4) {
                    // console.log(result, "here")
                    return res.status(200).json(resToSend)
                } else {
                    if (resToSend.result.left_leg !== null) {
                        resToSend.result.dataValues.left_leg.dataValues['members'] = await fetchDownlines(resToSend.result.left_leg.user_id)
                        if (resToSend.result.right_leg !== null) {
                            resToSend.result.dataValues.right_leg.dataValues['members'] = await fetchDownlines(resToSend.result.right_leg.user_id)
                            // console.log(resToSend.result.dataValues.right_leg.dataValues.right_members)
                            console.log(resToSend.result.right_leg.user_id)
                            
                        }
                    }else if (resToSend.result.right_leg !== null) {
                        resToSend.result.dataValues.right_leg.dataValues['members'] = await fetchDownlines(resToSend.result.right_leg.user_id)
                        if (resToSend.result.left_leg !== null) {
                            resToSend.result.dataValues.left_leg.dataValues['members'] = await fetchDownlines(resToSend.result.left_leg.user_id)
                            
                        }
                    }
                }
            }

        } catch (error) {
            console.log(error)
            logger.error(error.toString())
            return res.status(400).json(error.toString())
        }
    }),

    notificationsPost: ('/', async (req, res)=>{
        let {userId, date} = req.body;
        let whereObj = {
            user_id: userId
        };
        if (date !== "") {   
                
            whereObj.date = date

        }
        try {
            let userNotification = await models.Notifications.findAll({
                where: whereObj
            })
            
            return res.status(200).json(userNotification)
        } catch (error) {
            logger.error(error.toString())
            return res.status(400).json(error.toString())
        }
        
    })
};
