let models = require('../../connections/sequelize')

module.exports = async (stage) =>{
    let awardType = await models.AwardTypes.findAll({
        where: {
            stage: stage
        }
    })

    return awardType;
}