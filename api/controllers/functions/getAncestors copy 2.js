const models = require('../../connections/sequelize');
const getDownlines = require('./getDownlines')
const notificationCreate = require('./createNotification')
const updateAccount = require('./updateAccount')
const dateValue = require('./dateValue')
const uuidv1 = require('uuid/v1');
const awardTypes = require('./awardTypes')
let sendMail = require('./sendMail')
let transferCreate = require('./createTransfer')
let ancestors = async (id, stage) => {
    let members
    members = await models.Members.findOne({
        where: {
            user_id: id
        },
        include: [{
            model: models.Members,
            as: 'ancestors',

        }, {
            model: models.User,
            as: 'attributes',
            attributes: ['firstname', 'lastname', 'username']

        }],
    })



    let newStage = (base) => {
        let multi = Math.pow(2, base);
        let calcNo = (2 * multi)
        let result = calcNo - 1
        return result
    }

    let notificationAndAccount = async (id, message, bonus, date) => {
        let newNotification = await notificationCreate(id, message, date)
        let ancestorAccount = await models.Account.findOne({
            where: {
                user_id: id
            }
        })
        let newBalance = bonus + Number(ancestorAccount.dataValues.balance)

        let updateAncestorAccount = await updateAccount(ancestorAccount, newBalance, date)

    }

    let updateStage = async (ancestor, parent, n, a) => {
        let reference = uuidv1();

        if (a == n) {
            return a
        } else if (parent.children !== undefined && parent.children.length == 2) {
            // a++;
            // console.log(parent.attributes.username, parent.children.length)
            let newAncestorStage, bonusAmount;
            // console.log('first')
            // check the depth and assign the appropriate stages
            if (parent.children[1].children !== undefined && parent.children[1].children.length == 2 && parent.children[0].children != undefined && parent.children[0].children.length == 2) {

                let child1 = parent.children[0]
                let child2 = parent.children[1]
                if (parent.current_stage == 1) {
                    if ((child1.current_stage > 1 && child2.current_stage > 1) || (child1.current_stage == 1 && child2.current_stage > 1) || (child1.current_stage > 1 && child2.current_stage == 1) || (child1.current_stage == 1 && child2.current_stage == 1)) {
                        let parentId, moveUp

                        // check if registered by admin
                        let registeredUpline = await models.User.findOne({
                            where: {
                                user_id: parent.dataValues.upline_id
                            }
                        })
                        if (registeredUpline.role_id == 1) {
                            parentId = null
                            // if admin, allow to move up
                            moveUp = true

                        } else {
                            if (parent.parentMember_id != null) {
                                let stage2upline = await models.Stage2.findOne({
                                    where: {
                                        member_id: parent.parentMember_id ? parent.parentMember_id : 0
                                    }
                                })
                                if (stage2upline != null) {
                                    moveUp = true

                                    parentId = stage2upline.stage_2_id
                                } else {
                                    
                                    // if upline hasnt moved, dont allow to move up
                                    moveUp = false
                                }
                            } else {
                                parentId = null
                                moveUp = false

                            }
                        }
                        try {
                            if (moveUp == true) {
                                let newStage2 = await models.Stage2.create({
                                    member_id: parent.member_id,
                                    user_id: parent.user_id,
                                    upline_id: parent.upline_id,
                                    parentId: parentId,
                                    parentStage_2_id: parentId,
                                    current_stage: 2
                                })

                                newAncestorStage = 2;
                                bonusAmount = 10;
                            }
                        } catch (error) {
                        }
                    }
                }
                // what im doing here is checking if the fourth level is defined and has two downlines

                if (newAncestorStage !== undefined) {
                    let stageAward
                    let awardNotification
                    let awards
                    let awardNotificationCreate
                    let awardObj = {
                        user_id: parent.user_id,
                        status: 'Pending',
                        date: dateValue
                    }
                    let updatedUserTable = await models.User.findOne({
                        where: {
                            user_id: parent.user_id
                        }
                    })
                    switch (newAncestorStage) {
                        case 3:
                            // completed stage 2
                            stageAward = await awardTypes(2);
                            let randomId = Math.floor((Math.random() * stageAward.length) + 1);
                            awardObj.award_type_id = randomId
                            let id
                            stageAward.forEach(award => {
                                if (randomId == award.award_type_id) {
                                    id = award
                                }
                            })
                            awardNotification = `Congratulations, you have received award of ${id.name} for completing stage ${(Number(newAncestorStage) - 1)}.`
                            // create new award
                            awards = await models.Awards.create(awardObj);

                            // add notification for award
                            awardNotificationCreate = await notificationCreate(parent.user_id, awardNotification, dateValue);

                            break;
                        case 4:
                            // complete stage 3
                            stageAward = await awardTypes(3);
                            awardObj.award_type_id = stageAward[0].award_type_id
                            awardNotification = `Congratulations, you have received award of ${stageAward[0].name} for completing stage ${(Number(newAncestorStage) - 1)}.`
                            // create new award
                            awards = await models.Awards.create(awardObj);

                            // add notification for award
                            awardNotificationCreate = await notificationCreate(parent.user_id, awardNotification, dateValue);

                            break;
                        case 5:
                            // complete stage 4
                            stageAward = await awardTypes(4);
                            awardObj.award_type_id = stageAward[0].award_type_id
                            awardNotification = `Congratulations, you have received award of ${stageAward[0].name} for completing stage ${(Number(newAncestorStage) - 1)}.`
                            // create new award
                            awards = await models.Awards.create(awardObj);

                            // add notification for award
                            awardNotificationCreate = await notificationCreate(parent.user_id, awardNotification, dateValue);

                            break;
                        case 6:
                            // complete stage 5
                            stageAward = await awardTypes(5);
                            awardObj.award_type_id = stageAward[0].award_type_id
                            awardNotification = `Congratulations, you have received award of ${stageAward[0].name} for completing stage ${(Number(newAncestorStage) - 1)}.`
                            // create new award
                            awards = await models.Awards.create(awardObj);
                            let updatedUserTable = await models.User.findOne({
                                where: {
                                    user_id: parent.user_id
                                }
                            })
                            await updatedUserTable.update({
                                isCompleted: 1
                            })
                            // add notification for award
                            awardNotificationCreate = await notificationCreate(parent.user_id, awardNotification, dateValue);

                            break;
                    }

                    let updateParent = await parent.update({
                        current_stage: newAncestorStage
                    })
                    let parentNotification = await notificationAndAccount(parent.user_id, `Congratulations, You have been upgraded to stage ${newAncestorStage} and received a bonus of $${bonusAmount}`, bonusAmount, dateValue)

                    let ancestorUpline = await models.Members.findOne({
                        where: {
                            user_id: parent.upline_id
                        }
                    })
                    let ancestorBonus = await models.Bonus.create({
                        user_id: parent.user_id,
                        bonus_type_id: 2,
                        amount: bonusAmount,
                        date: dateValue
                    })

                    await transferCreate(updatedUserTable.user_id, `Stage ${newAncestorStage} Matrix bonus`, dateValue, bonusAmount, 'Right Steps', `${updatedUserTable.firstname} ${updatedUserTable.lastname}`)

                    if (ancestorUpline !== null) {
                        let uplineBonus = (bonusAmount * 0.1)
                        let ancestorUplineBonus = await models.Bonus.create({
                            user_id: ancestorUpline.user_id,
                            bonus_type_id: 3,
                            amount: uplineBonus,
                            date: dateValue
                        })
                        let parentUplineNotification = await notificationAndAccount(ancestorUpline.user_id, `Congratulations, You have received a bonus of $${uplineBonus} for the upgrade of your downline ${parent.attributes.username} to stage ${newAncestorStage}`, uplineBonus, dateValue)
                        await transferCreate(ancestorUpline.user_id, `${updatedUserTable.firstname} ${updatedUserTable.lastname}'s stage ${newAncestorStage} matching Bonus`, dateValue, uplineBonus, 'Right Steps', `${updatedUserTable.firstname} ${updatedUserTable.lastname}`)

                    }
                    console.log(parent.attributes.username, "here")
                    return updateStage(parent, updateParent, n, a++)

                }
            }
            a++
            // console.log(a)
            for (let i = 0; i < parent.children.length; i++) {


                // a++;

                // console.log(`depth is ${a} ${i} ${parent.attributes.firstname}`)

                // console.log(parent.children[1].dataValues.children)
                let stage = newStage((Number(parent.children[i].current_stage) + 1))
                updateStage(ancestor, parent.children[i], stage, a)
            }
        } else {
            return a
        }

    }

    let updateStage2 = async (ancestor, parent, n, a) => {
        let reference = uuidv1();

        if (a == n) {
            return a
        } else if (parent.children !== undefined && parent.children.length == 2) {
            // a++;
            // console.log(parent.attributes.username, parent.children.length)
            let newAncestorStage, bonusAmount;

            // check the depth and assign the appropriate stages
            if (parent.children[1].children !== undefined && parent.children[1].children.length == 2 && parent.children[0].children != undefined && parent.children[0].children.length == 2) {
                let child1 = parent.children[0]
                let child2 = parent.children[1]

                // return console.log(parent.children[1].children[1].children[1])
                // what im doing here is checking if the fourth level is defined and has two downlines
                if (parent.children[1].children[1] !== undefined
                    && parent.children[0].children[0].children !== undefined
                    && parent.children[0].children[1].children !== undefined
                    && parent.children[1].children[0].children !== undefined
                    && parent.children[1].children[1].children !== undefined
                    && parent.children[0].children[0].children.length == 2
                    && parent.children[0].children[1].children.length == 2
                    && parent.children[1].children[0].children.length == 2
                    && parent.children[1].children[1].children.length == 2
                    && parent.children[1].children[1].children[1].children !== undefined
                    && parent.children[0].children[0].children[0].children !== undefined
                    && parent.children[0].children[1].children[0].children !== undefined
                    && parent.children[1].children[0].children[0].children !== undefined
                    && parent.children[1].children[1].children[0].children !== undefined
                    && parent.children[1].children[0].children[1].children !== undefined
                    && parent.children[1].children[1].children[1].children.length == 2
                    && parent.children[0].children[0].children[0].children.length == 2
                    && parent.children[0].children[1].children[0].children.length == 2
                    && parent.children[1].children[0].children[0].children.length == 2
                    && parent.children[1].children[1].children[0].children.length == 2
                    && parent.children[1].children[0].children[1].children.length == 2
                    && parent.children[1].children[1].children[1].children[1] !== undefined
                    && parent.children[1].children[1].children[1].children[0] !== undefined
                    && parent.children[1].children[1].children[0].children[1] !== undefined
                    && parent.children[1].children[0].children[1].children[1] !== undefined
                    && parent.children[0].children[1].children[1].children[1] !== undefined
                    && parent.children[0].children[1].children[0].children[1] !== undefined
                    && parent.children[1].children[1].children[1].children[1].children !== undefined
                    && parent.children[1].children[1].children[1].children[0].children !== undefined
                    && parent.children[1].children[1].children[0].children[1].children !== undefined
                    && parent.children[1].children[0].children[1].children[1].children !== undefined
                    && parent.children[0].children[1].children[1].children[1].children !== undefined
                    && parent.children[0].children[1].children[0].children[1].children !== undefined
                    && parent.children[1].children[1].children[1].children[1].children !== undefined
                    && parent.children[0].children[1].children[0].children[1].children.length == 2
                    && parent.children[1].children[1].children[1].children[1].children.length == 2
                    && parent.children[1].children[1].children[1].children[0].children.length == 2
                    && parent.children[1].children[1].children[0].children[1].children.length == 2
                    && parent.children[1].children[0].children[1].children[1].children.length == 2
                    && parent.children[0].children[1].children[1].children[1].children.length == 2
                    && parent.children[1].children[1].children[1].children[1].children.length == 2
                    && parent.children[1].children[1].children[1].children.length == 2
                    && parent.children[0].children[0].children[0].children.length == 2
                    && parent.children[0].children[0].children[0].children[0].children != undefined
                    && parent.children[0].children[0].children[0].children[0].children.length == 2
                    && parent.children[1].children[1].children[1].children[1].children.length == 2
                ) {
                    if (parent.current_stage == 2) {
                        if ((child1.current_stage > 1 && child2.current_stage > 1) || (child1.current_stage == 2 && child2.current_stage == 2) || (child1.current_stage >= 2 && child2.current_stage == 2) || (child1.current_stage == 2 && child2.current_stage >= 2)) {
                            let parentId, moveUp
                            // check if registered by admin
                            let registeredUpline = await models.User.findOne({
                                where: {
                                    user_id: parent.dataValues.upline_id
                                }
                            })
                            if (registeredUpline.role_id == 1) {
                                parentId = null
                                // if admin, allow to move up
                                moveUp = true

                            } else {

                                if (parent.dataValues.parentStage_2_id != null) {
                                    let stage3upline = await models.Stage3.findOne({
                                        where: {
                                            member_id: parent.dataValues.member_id
                                        }
                                    })

                                    if (stage3upline != null) {
                                        parentId = stage3upline.dataValues.stage_3_id
                                        moveUp = true
                                    } else {
                                        // if upline hasnt moved, dont allow to move up
                                        moveUp = false
                                    }
                                } else {
                                    parentId = null
                                    moveUp = false

                                }

                            }
                            if (moveUp == true) {
                                try {
                                    let newStage3 = await models.Stage3.create({
                                        member_id: parent.dataValues.member_id,
                                        user_id: parent.dataValues.user_id,
                                        upline_id: parent.dataValues.upline_id,
                                        parentId: parentId,
                                        parentStage_3_id: parentId,
                                        current_stage: 3
                                    })
                                } catch (error) {
                                }
                                newAncestorStage = 3;
                                bonusAmount = 1000;
                            }
                        }
                    } else if (parent.current_stage == 3) {
                        if ((child1.current_stage > 1 && child2.current_stage > 1) || (child1.current_stage > 2 && child2.current_stage > 2) || (child1.current_stage == 3 && child2.current_stage == 3) || (child1.current_stage >= 3 && child2.current_stage == 3) || (child1.current_stage == 3 && child2.current_stage >= 3)) {
                            let parentId, moveUp
                            // check if registered by admin
                            let registeredUpline = await models.User.findOne({
                                where: {
                                    user_id: parent.dataValues.upline_id
                                }
                            })
                            if (registeredUpline.role_id == 1) {
                                parentId = null
                                // if admin, allow to move up
                                moveUp = true

                            } else {
                                if (parent.dataValues.parentStage_4_id != null) {
                                    let stage4upline = await models.Stage4.findOne({
                                        where: {
                                            member_id: parent.dataValues.member_id
                                        }
                                    })
                                    if (stage4upline != null) {
                                        parentId = stage4upline.dataValues.stage_4_id
                                        moveUp = true

                                    } else {
                                        moveUp = false
                                    }
                                } else {
                                    parentId = null
                                    moveUp = false

                                }

                            }

                            if (moveUp == true) {
                                try {
                                    let newStage4 = await models.Stage4.create({
                                        member_id: parent.dataValues.member_id,
                                        user_id: parent.dataValues.user_id,
                                        upline_id: parent.dataValues.upline_id,
                                        parentId: parentId,
                                        parentStage_4_id: parentId,
                                        current_stage: 4
                                    })
                                } catch (error) {
                                }
                                newAncestorStage = 4;
                                bonusAmount = 3000;
                            }
                        }
                    } else if (parent.current_stage == 4) {
                        if ((child1.current_stage > 1 && child2.current_stage > 1) || (child1.current_stage > 2 && child2.current_stage > 2) || (child1.current_stage > 3 && child2.current_stage > 3) || (child1.current_stage == 4 && child2.current_stage == 4) || (child1.current_stage >= 4 && child2.current_stage == 4) || (child1.current_stage == 4 && child2.current_stage >= 4)) {
                            let parentId, moveUp
                            // check if registered by admin
                            let registeredUpline = await models.User.findOne({
                                where: {
                                    user_id: parent.dataValues.upline_id
                                }
                            })
                            if (registeredUpline.role_id == 1) {
                                parentId = null
                                // if admin, allow to move up
                                moveUp = true

                            } else {
                                if (parent.dataValues.parentStage_5_id != null) {
                                    let stage4upline = await models.Stage5.findOne({
                                        where: {
                                            member_id: parent.dataValues.member_id
                                        }
                                    })

                                    if (stage4upline != null) {
                                        parentId = stage4upline.dataValues.stage_5_id
                                        moveUp = true

                                    } else {
                                        moveUp = false
                                    }
                                } else {
                                    parentId = null
                                    moveUp = false
                                }

                            }

                            if (moveUp == true) {
                                try {
                                    let newStage5 = await models.Stage5.create({
                                        member_id: parent.dataValues.member_id,
                                        user_id: parent.dataValues.user_id,
                                        upline_id: parent.dataValues.upline_id,
                                        parentId: parentId,
                                        parentStage_5_id: parentId,
                                        current_stage: 5
                                    })
                                } catch (error) {
                                }
                                newAncestorStage = 5;
                                bonusAmount = 6000;
                            }
                        }
                    } else if (parent.current_stage == 5) {
                        if ((child1.current_stage == 5 && child2.current_stage == 5) || (child1.current_stage >= 5 && child2.current_stage == 5) || (child1.current_stage == 5 && child2.current_stage >= 5)) {
                            newAncestorStage = 6;
                            bonusAmount = 12000;
                        }
                    } else {
                        newAncestorStage = undefined
                    }
                }

                if (newAncestorStage !== undefined) {
                    let stageAward
                    let awardNotification
                    let awards
                    let awardNotificationCreate
                    let awardObj = {
                        user_id: parent.user_id,
                        status: 'Pending',
                        date: dateValue
                    }
                    let updatedUserTable = await models.User.findOne({
                        where: {
                            user_id: parent.user_id
                        }
                    })
                    switch (newAncestorStage) {
                        case 3:
                            // completed stage 2
                            stageAward = await awardTypes(2);
                            let randomId = Math.floor((Math.random() * stageAward.length) + 1);
                            awardObj.award_type_id = randomId
                            let id
                            stageAward.forEach(award => {
                                if (randomId == award.award_type_id) {
                                    id = award
                                }
                            })
                            awardNotification = `Congratulations, you have received award of ${id.name} for completing stage ${(Number(newAncestorStage) - 1)}.`
                            // create new award
                            awards = await models.Awards.create(awardObj);

                            // add notification for award
                            awardNotificationCreate = await notificationCreate(parent.user_id, awardNotification, dateValue);

                            break;
                        case 4:
                            // complete stage 3
                            stageAward = await awardTypes(3);
                            awardObj.award_type_id = stageAward[0].award_type_id
                            awardNotification = `Congratulations, you have received award of ${stageAward[0].name} for completing stage ${(Number(newAncestorStage) - 1)}.`
                            // create new award
                            awards = await models.Awards.create(awardObj);

                            // add notification for award
                            awardNotificationCreate = await notificationCreate(parent.user_id, awardNotification, dateValue);

                            break;
                        case 5:
                            // complete stage 4
                            stageAward = await awardTypes(4);
                            awardObj.award_type_id = stageAward[0].award_type_id
                            awardNotification = `Congratulations, you have received award of ${stageAward[0].name} for completing stage ${(Number(newAncestorStage) - 1)}.`
                            // create new award
                            awards = await models.Awards.create(awardObj);

                            // add notification for award
                            awardNotificationCreate = await notificationCreate(parent.user_id, awardNotification, dateValue);

                            break;
                        case 6:
                            // complete stage 5
                            stageAward = await awardTypes(5);
                            awardObj.award_type_id = stageAward[0].award_type_id
                            awardNotification = `Congratulations, you have received award of ${stageAward[0].name} for completing stage ${(Number(newAncestorStage) - 1)}.`
                            // create new award
                            awards = await models.Awards.create(awardObj);

                            await updatedUserTable.update({
                                isCompleted: 1
                            })
                            // add notification for award
                            awardNotificationCreate = await notificationCreate(parent.user_id, awardNotification, dateValue);

                            break;
                    }

                    let updateParent = await parent.update({
                        current_stage: newAncestorStage
                    })
                    let updateMemberParent = await models.Members.findOne({
                        where: {
                            member_id: parent.member_id
                        }
                    })

                    updateMemberParent.update({
                        current_stage: newAncestorStage
                    })
                    let parentNotification = await notificationAndAccount(parent.user_id, `Congratulations, You have been upgraded to stage ${newAncestorStage} and received a bonus of $${bonusAmount}`, bonusAmount, dateValue)

                    let ancestorUpline = await models.Members.findOne({
                        where: {
                            user_id: parent.upline_id
                        }
                    })
                    let ancestorBonus = await models.Bonus.create({
                        user_id: parent.user_id,
                        bonus_type_id: 2,
                        amount: bonusAmount,
                        date: dateValue
                    })
                    await transferCreate(updatedUserTable.user_id, `Stage ${newAncestorStage} Matrix bonus`, dateValue, bonusAmount, 'Right Steps', `${updatedUserTable.firstname} ${updatedUserTable.lastname}`)

                    if (ancestorUpline !== null) {
                        let uplineBonus = (bonusAmount * 0.1)
                        let ancestorUplineBonus = await models.Bonus.create({
                            user_id: ancestorUpline.user_id,
                            bonus_type_id: 3,
                            amount: uplineBonus,
                            date: dateValue
                        })
                        let parentUplineNotification = await notificationAndAccount(ancestorUpline.user_id, `Congratulations, You have received a bonus of $${uplineBonus} for the upgrade of your downline ${parent.attributes.username} to stage ${newAncestorStage}`, uplineBonus, dateValue)
                        await transferCreate(ancestorUpline.user_id, `${updatedUserTable.firstname} ${updatedUserTable.lastname}'s stage ${newAncestorStage} matching Bonus`, dateValue, uplineBonus, 'Right Steps', `${updatedUserTable.firstname} ${updatedUserTable.lastname}`)

                    }
                    await sendMail(updatedUserTable.email_address, 'Right Steps', 'Stage Completed', `Congratulations, you've completed stage ${(newAncestorStage - 1)} and earned a bonus of $${bonusAmount}`)
                    return updateStage(parent, updateParent, n, a++)

                }
            }
            a++
            // console.log(a)
            for (let i = 0; i < parent.children.length; i++) {


                // a++;

                // console.log(`depth is ${a} ${i} ${parent.attributes.firstname}`)

                // console.log(parent.children[1].dataValues.children)
                let stage = newStage((Number(parent.children[i].current_stage) + 1))
                updateStage(ancestor, parent.children[i], stage, a)
            }
        } else {
            return a
        }

    }
    // console.log(dn[0])
    let updates = []
    if (members !== null) {
        for (let i = members.ancestors.length - 1; i >= 0; i--) {
            let downline = await getDownlines(members.ancestors[i].user_id)
            let stage = newStage((Number(downline.current_stage) + 1))
            let update
            if (Number(downline.current_stage) < 2) {
                update = await updateStage(downline, downline, stage, 0)
            } else {
                update = await updateStage2(downline, downline, stage, 0)

            }
            updates.push(downline)
        }
        // for (let i = members.ancestors.length - 1; i >= 0; i--) {
        //     let downline = await getDownlines(members.ancestors[i].user_id)
        //     let stage = newStage((Number(downline.current_stage) + 1))
        //     let update
        //     if (Number(downline.current_stage) < 2) {
        //         update = await updateStage(downline, downline, stage, 0)
        //     } else {
        //         update = await updateStage2(downline, downline, stage, 0)

        //     }
        //     // updates.push(update)
        // }
        // console.log(updates)
    }
    return members


}

module.exports = ancestors