const Sequelize = require('sequelize');

// const UserModel = require("../models/user")
const UserModel = require("../models/users");
const BonusModel = require("../models/bonus");
const BonusTypesModel = require("../models/bonus_types");
const MembersModel = require("../models/members");
const AccountModel = require("../models/account");

const sequelize = new Sequelize((process.env.DB_NAME).trim(), (process.env.DB_USER).trim(), (process.env.DB_PASSWORD).trim(), {
    host: process.env.DB_HOST,
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
models.BonusTypes = BonusTypesModel(sequelize, Sequelize)
models.Account = AccountModel(sequelize, Sequelize)
sequelize.sync()
    .then(()=>{
        console.log("Db Connnected")
    })
    .catch((err)=>{
        console.log(err)
    })

module.exports = models;