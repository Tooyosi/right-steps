const models = require('../../connections/sequelize');
const getDownlines = require('./getDownlines')
const notificationCreate = require('../functions/createNotification')
const updateAccount = require('../functions/updateAccount')
const dateValue = require('../functions/dateValue')
const uuidv1 = require('uuid/v1');
const awardTypes = require('./awardTypes')
let ancestors = async (id) => {
    const members = await models.Members.findOne({
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

            // check the depth and assign the appropriate stages
            if (parent.children[1].children !== undefined && parent.children[1].children.length == 2) {

                let child1 = parent.children[0]
                let child2 = parent.children[1]

                if (parent.current_stage == 1) {
                    if ((child1.current_stage == 1 && child2.current_stage == 1)) {


                        newAncestorStage = 2;
                        bonusAmount = 10;
                    }
                } else if (parent.current_stage == 2) {
                    if ((child1.current_stage == 2 && child2.current_stage == 2) || (child1.current_stage >= 2 && child2.current_stage == 2) || (child1.current_stage == 2 && child2.current_stage >= 2)) {

                        newAncestorStage = 3;
                        bonusAmount = 1000;
                    }
                } else if (parent.current_stage == 3) {
                    if ((child1.current_stage == 3 && child2.current_stage == 3) || (child1.current_stage >= 3 && child2.current_stage == 3) || (child1.current_stage == 3 && child2.current_stage >= 3)) {

                        newAncestorStage = 4;
                        bonusAmount = 3000;
                    }
                } else if (parent.current_stage == 4) {
                    if ((child1.current_stage == 4 && child2.current_stage == 4) || (child1.current_stage >= 4 && child2.current_stage == 4) || (child1.current_stage == 4 && child2.current_stage >= 4)) {
                        newAncestorStage = 5;
                        bonusAmount = 6000;

                    }
                } else if (parent.current_stage == 5) {
                    if ((child1.current_stage == 5 && child2.current_stage == 5) || (child1.current_stage >= 5 && child2.current_stage == 5) || (child1.current_stage == 5 && child2.current_stage >= 5)) {
                        newAncestorStage = 6;
                        bonusAmount = 12000;
                    }
                } else {
                    newAncestorStage = undefined
                }


                //  if ((child1.current_stage == 1 && child2.current_stage == 1) || (child1.current_stage >= 1 && child2.current_stage == 1) || (child1.current_stage == 1  && child2.current_stage >= 1) ) {
                //     if (parent.current_stage == 1) {
                //         console.log('first level', parent.attributes.username, " one ", child1.current_stage, " two ", child2.current_stage)

                //         // console.log('1', parent.attributes.username, " 1 ", child1.current_stage, " 2 ", child2.current_stage)
                //         // console.log(parent.children[0].attributes.username, " ", parent.children[1].attributes.username)

                //         newAncestorStage = 2;
                //         bonusAmount = 10;
                //     }
                // } else if ((child1.current_stage == 2 && child2.current_stage == 2) || (child1.current_stage >= 2 && child2.current_stage == 2) || (child1.current_stage == 2 && child2.current_stage >= 2)) {
                //         // console.log('2', parent.attributes.username)
                //     if (parent.current_stage == 2) {
                //         console.log('2', parent.attributes.username, 'inside if')

                //         newAncestorStage = 3;
                //         bonusAmount = 1000;
                //     }
                // } else if ((child1.current_stage == 3 && child2.current_stage == 3) || (child1.current_stage >= 3 && child2.current_stage == 3) || (child1.current_stage == 3 && child2.current_stage >= 3)) {
                //     console.log('kkk')
                //     if (parent.current_stage == 3 || parent.current_stage == 2 || parent.current_stage == 1) {
                //         console.log('3', parent.attributes.username, 'inside if')
                //         newAncestorStage = 4;
                //         bonusAmount = 3000;

                //     }
                //     // console.log('3', n , parent.attributes.firstname)

                // } else if ((child1.current_stage == 4 && child2.current_stage == 4) || (child1.current_stage >= 4 && child2.current_stage == 4) || (child1.current_stage == 4 && child2.current_stage >= 4)) {
                //     console.log('kkk')
                //     if (parent.current_stage == 4) {
                //         console.log('4',  'inside if')
                //         newAncestorStage = 5;
                //         bonusAmount = 6000;

                //     }
                // } else if ((child1.current_stage == 5 && child2.current_stage == 5) || (child1.current_stage >= 5 && child2.current_stage == 5) || (child1.current_stage == 5 && child2.current_stage >= 5)) {
                //     if (parent.current_stage == 5) {
                //         console.log('5',  'inside if')
                //         newAncestorStage = 6;
                //         bonusAmount = 12000;
                //     }
                // } else {
                //     newAncestorStage = undefined
                // }
                // switch (a) {
                //     case 2:

                //         if (ancestor.current_stage == 1) {
                //             // newAncestorStage = 2;
                //             // bonusAmount = 10;
                //         }
                //         break;
                //     // case 3:
                //     //     console.log('case 3')
                //     //     if (ancestor.current_stage == 2) {
                //     //         // console.log(ancestor.user_id)
                //     //         newAncestorStage = 3;
                //     //         bonusAmount = 1000;

                //     //     }
                //     //     break;
                //     // case 4:
                //     if (ancestor.current_stage == 3) {
                //         newAncestorStage = 4;
                //         bonusAmount = 3000;

                //     }
                //     break;
                // case 5:
                //     if (ancestor.current_stage == 4) {
                //         newAncestorStage = 5;
                //         bonusAmount = 6000;

                //     }
                //     break;
                // case 6:
                //     if (parent.current_stage == 5) {
                //         newAncestorStage = 6;
                //         bonusAmount = 12000;

                //     }
                //     break;
                //     default:
                //         newAncestorStage = undefined;
                //         break;
                // }
                if (newAncestorStage !== undefined) {
                    console.log(newAncestorStage, 'dont show twice')
                    let stageAward
                    let awardNotification
                    let awards
                    let awardNotificationCreate
                    let awardObj = {
                        user_id: parent.user_id,
                        status: 'Pending',
                        date: dateValue
                    }
                    switch (newAncestorStage) {
                        case 3:
                            // completed stage 2
                            stageAward = await awardTypes(2);
                            let randomId = Math.floor((Math.random() * stageAward.length) + 1);
                            awardObj.award_type_id = randomId
                            let id
                            stageAward.forEach(award=>{
                                if(randomId == award.award_type_id){
                                    id= award
                                }
                            })
                            awardNotification = `Congratulations, you have received award of ${id.name} for completing stage ${newAncestorStage}.`
                            // create new award
                            awards = await models.Awards.create(awardObj);

                            // add notification for award
                            awardNotificationCreate = await notificationCreate(parent.user_id, awardNotification, dateValue);

                            break;
                        case 4:
                            // complete stage 3
                            stageAward = await awardTypes(3);
                            awardObj.award_type_id = stageAward[0].award_type_id
                            awardNotification = `Congratulations, you have received award of ${stageAward[0].name} for completing stage ${newAncestorStage}.`
                            // create new award
                            awards = await models.Awards.create(awardObj);

                            // add notification for award
                            awardNotificationCreate = await notificationCreate(parent.user_id, awardNotification, dateValue);

                            break;
                        case 5:
                            // complete stage 4
                            stageAward = await awardTypes(4);
                            awardObj.award_type_id = stageAward[0].award_type_id
                            awardNotification = `Congratulations, you have received award of ${stageAward[0].name} for completing stage ${newAncestorStage}.`
                            // create new award
                            awards = await models.Awards.create(awardObj);

                            // add notification for award
                            awardNotificationCreate = await notificationCreate(parent.user_id, awardNotification, dateValue);

                            break;
                        case 6:
                            // complete stage 5
                            stageAward = await awardTypes(5);
                            awardObj.award_type_id = stageAward[0].award_type_id
                            awardNotification = `Congratulations, you have received award of ${stageAward[0].name} for completing stage ${newAncestorStage}.`
                            // create new award
                            awards = await models.Awards.create(awardObj);

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



                    if (ancestorUpline !== null) {
                        let uplineBonus = (bonusAmount * 0.1)
                        let ancestorUplineBonus = await models.Bonus.create({
                            user_id: ancestorUpline.user_id,
                            bonus_type_id: 3,
                            amount: uplineBonus,
                            date: dateValue
                        })
                        let parentUplineNotification = await notificationAndAccount(ancestorUpline.user_id, `Congratulations, You have received a bonus of $${uplineBonus} for the upgrade of your downline ${parent.attributes.username} to stage ${newAncestorStage}`, uplineBonus, dateValue)

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
    // console.log(dn[0])
    let updates = []
    if (members !== null) {
        for (let i = members.ancestors.length - 1; i >= 0; i--) {
            let downline = await getDownlines(members.ancestors[i].user_id)
            let stage = newStage((Number(downline.current_stage) + 1))
            let update = await updateStage(downline, downline, stage, 0)
            updates.push(update)
        }
        for (let i = members.ancestors.length - 1; i >= 0; i--) {
            let downline = await getDownlines(members.ancestors[i].user_id)
            let stage = newStage((Number(downline.current_stage) + 1))
            let update = await updateStage(downline, downline, stage, 0)
            updates.push(update)
        }
        // console.log(updates)
    }
    return members


}

module.exports = ancestors