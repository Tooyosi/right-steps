const Sequelize = require('sequelize');

// const UserModel = require("../models/user")
const UserModel = require("../models/users");
const BonusModel = require("../models/bonus");
const BonusTypesModel = require("../models/bonus_types");
const MembersModel = require("../models/members");
const AdminMembersModel = require("../models/admin_members");
const AccountModel = require("../models/account");
const RoleModel = require("../models/role");
const DownlinesModel = require("../models/downlines");

const sequelize = require('./connection')

var models = {}
models.User = UserModel(sequelize, Sequelize)
models.Bonus = BonusModel(sequelize, Sequelize)
models.Members = MembersModel(sequelize, Sequelize)
models.AdminMembers = AdminMembersModel(sequelize, Sequelize)
models.BonusTypes = BonusTypesModel(sequelize, Sequelize)
models.Account = AccountModel(sequelize, Sequelize)
models.Role = RoleModel(sequelize, Sequelize)
models.Downlines = DownlinesModel(sequelize, Sequelize)
sequelize.sync()
    .then((res) => {

        console.log("Db Connnected")
    })
    .catch((err) => {
        console.log(err)
    })

module.exports = models;