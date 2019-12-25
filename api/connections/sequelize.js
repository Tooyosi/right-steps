const Sequelize = require('sequelize');

const UserModel = require("../models/user")

const sequelize = new Sequelize('right_steps', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
});

var models = {}
models.User = UserModel(sequelize, Sequelize)

sequelize.sync()
    .then(()=>{
        console.log("Db Connnected")
    })

module.exports = models;