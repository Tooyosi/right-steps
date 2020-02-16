const express = require('express');
const models = require('../../connections/sequelize')
const { logger } = require('../../loggers/logger')
const nodemailer = require("nodemailer");

let transfer = async (userId, type, date, amount, from, to)=>{
    let result = await models.Transfers.create({
        user_id: userId,
        transfer_type: type,
        date: date,
        amount: amount,
        transferred_from: from,
        transferred_to: to
    })

    return result;
}

module.exports = transfer;