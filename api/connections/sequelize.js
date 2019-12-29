const Sequelize = require('sequelize');

// const UserModel = require("../models/user")
const UserModel = require("../models/users");
const BonusModel = require("../models/bonus_tb");
const MembersModel = require("../models/members");

const sequelize = new Sequelize('right_steps', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
    define: {
        timestamps: false
    }
});

var models = {}
models.User = UserModel(sequelize, Sequelize)
models.Bonus = BonusModel(sequelize, Sequelize)
models.Members = MembersModel(sequelize, Sequelize)

sequelize.sync()
    .then(()=>{
        console.log("Db Connnected")
    })

module.exports = models;