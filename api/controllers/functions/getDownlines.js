const models = require('../../connections/sequelize');

const members = async (id)=>{
    const result = await models.Members.findOne({
        where: {
            user_id: id
        },
        include: [{
            model: models.Members,
            as: 'descendents',
            hierarchy: true,
            include: [{
                model: models.User,
                as: 'attributes',
                attributes: ['firstname', 'lastname', 'username']
            }]
        }, {
            model: models.User,
            as: 'attributes',
            attributes: ['firstname', 'lastname', 'username']

        }],
    })
    return result;
}

module.exports = members;