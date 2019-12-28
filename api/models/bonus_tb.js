/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('bonus_tb', {
    'bonus_id': {
      type: DataTypes.INTEGER(9).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      comment: "null"
    }
  }, {
    tableName: 'bonus_tb'
  });
};
