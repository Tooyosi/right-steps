const models = require('../../connections/sequelize');

const members = async (id) => {
    let result
    result = await models.Members.findOne({
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
    switch (result.dataValues.current_stage) {
        case 2:
            result = await models.Stage2.findOne({
                where: {
                    user_id: id
                },
                include: [{
                    model: models.Stage2,
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
            break;
        case 3:
            result = await models.Stage3.findOne({
                where: {
                    user_id: id
                },
                include: [{
                    model: models.Stage3,
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
            break;
        case 4:
            result = await models.Stage4.findOne({
                where: {
                    user_id: id
                },
                include: [{
                    model: models.Stage4,
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
            break;
        case 5:
            result = await models.Stage5.findOne({
                where: {
                    user_id: id
                },
                include: [{
                    model: models.Stage5,
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
            break;
    }
    return result;
}

module.exports = members;