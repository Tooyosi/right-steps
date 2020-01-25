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
const NotificatiosnModel = require("../models/notifications");
const RequestModel = require("../models/requests");
const AwardsModel = require("../models/awards");
const AwardsTypeModel = require("../models/awards_types");

const sequelize = require('./connection')

var models = {}
models.User = UserModel(sequelize, Sequelize)
models.Bonus = BonusModel(sequelize, Sequelize)
models.Members = MembersModel(sequelize, Sequelize)
models.AdminMembers = AdminMembersModel(sequelize, Sequelize)
models.BonusTypes = BonusTypesModel(sequelize, Sequelize)
models.Account = AccountModel(sequelize, Sequelize)
models.Role = RoleModel(sequelize, Sequelize)
models.Notifications = NotificatiosnModel(sequelize, Sequelize)
models.Downlines = DownlinesModel(sequelize, Sequelize)
models.Requests = RequestModel(sequelize, Sequelize);
models.Awards = AwardsModel(sequelize, Sequelize);
models.AwardTypes = AwardsTypeModel(sequelize, Sequelize)

// associations
models.Requests.belongsTo(models.User, { foreignKey: "user_id", as: "requester", })
models.Awards.belongsTo(models.AwardTypes, { foreignKey: "award_type_id", as: "type", })

models.Members.belongsTo(models.User, { foreignKey: "user_id", as: "attributes", })
models.Downlines.belongsTo(models.User, { foreignKey: "right_leg_id", as: "right_leg", })
models.Downlines.belongsTo(models.User, { foreignKey: "left_leg_id", as: "left_leg", })
// onDelete: 'CASCADE',
//       foreignKey: 'parent',
//       as: 'children'
// models.Members.hasMany(models.Members, {
//     onDelete: 'CASCADE',
//     foreignKey: 'upline_id',
//     as: 'children'
//   });
models.Members.isHierarchy();
models.Members.sync().then((res)=>{
    // console.log(res)
});

sequelize.sync()
    .then((res) => {

        console.log("Db Connnected")
    })
    .catch((err) => {
        console.log(err)
    })

module.exports = models;