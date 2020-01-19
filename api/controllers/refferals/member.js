const models = require('../../connections/sequelize')
const { logger } = require('../../loggers/logger')
module.exports = {
    get: ('/', async (req, res) => {
        let  userId = req.params.id;
        try {
            models.Members.belongsTo(models.Account, { foreignKey: "account_id" })
            models.Members.belongsTo(models.User, { foreignKey: "user_id" })
            let member = await models.Members.findOne({
                where:{
                    user_id: userId
                },
                include: [{
                    model: models.Account,
                },{
                    model: models.User,
                },]
            })
            // let dataToSend = {
            //     balance: balance.dataValues.balance
            // }
            return res.status(200).json(member)
        } catch (error) {
            logger.error(error.toString())
            return res.status(400).json(error.toString())
        }
    }),

    referral: ('/', async (req, res) => {
        let  userId = req.params.id;
        try {
            models.Members.belongsTo(models.User, { foreignKey: "user_id" })
            let member = await models.Members.findOne({
                where:{
                    referral_id: userId
                },
                include: [{
                    model: models.User,
                },]
            })
            return res.status(200).json(member)
        } catch (error) {
            logger.error(error.toString())
            return res.status(400).json(error.toString())
        }
    }),

    put: ('/', async (req, res)=>{
        let {accountName, accountNumber, bankName, userId} = req.body
        try {
            let member = await models.Members.findOne({
                where: {
                    user_id: userId
                }
            })
            if(member !== null){
                let updateObj = {}
                if(accountName !== ''){
                    updateObj.account_name = accountName 
                }
                if(accountNumber !== ''){
                    updateObj.account_number = accountNumber
                }
                
                if(bankName !== ''){
                    updateObj.bank_name = bankName
                }

                let updatedMember = await member.update(updateObj)
                return res.status(200).send(updatedMember)
            }else {
                logger.error('User doesnt exist')
                return res.status(400).send('User doesnt exist')
            }
        } catch (error) {
            
        }
    })
};
