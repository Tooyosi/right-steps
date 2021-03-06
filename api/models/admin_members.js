/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('admin_members', {
    'member_id': {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      primaryKey: true,
      comment: "null",
      autoIncrement: true
    },
    'user_id': {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      comment: "null",
      references: {
        model: 'users',
        key: 'user_id'
      }
    },
    'current_stage': {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      comment: "null"
    },
    'account_name': {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "null"
    },
    'account_number': {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "null"
    },
    'bank_name': {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "null"
    },
    'referral_id': {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "null",
      unique: true
    },
    'account_id': {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      comment: "null",
      references: {
        model: 'account',
        key: 'account_id'
      }
    }
  }, {
    tableName: 'admin_members'
  });
};
