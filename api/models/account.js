/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('account', {
    'account_id': {
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
    'balance': {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "null"
    },
    'date_updated': {
      type: DataTypes.DATE,
      allowNull: false,
      comment: "null"
    }
  }, {
    tableName: 'account'
  });
};
