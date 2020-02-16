/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('transfers', {
    'transfer_id': {
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
    'transfer_type': {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "null"
    },
    'date': {
      type: DataTypes.DATEONLY,
      allowNull: false,
      comment: "null"
    },
    'amount': {
      type: DataTypes.STRING(11),
      allowNull: false,
      comment: "null"
    },
    'transferred_from': {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "null"
    },
    'transferred_to': {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "null"
    }
  }, {
    tableName: 'transfers'
  });
};
