/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user_admintb', {
    'admin_id': {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      comment: "null"
    },
    'firstname': {
      type: DataTypes.STRING(100),
      allowNull: false,
      comment: "null"
    },
    'lastname': {
      type: DataTypes.STRING(100),
      allowNull: false,
      comment: "null"
    }
  }, {
    tableName: 'user_admintb'
  });
};
