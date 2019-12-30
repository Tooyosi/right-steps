/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('bonus_types', {
    'bonus_type_id': {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      primaryKey: true,
      comment: "null",
      autoIncrement: true
    },
    'name': {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      comment: "null"
    }
  }, {
    tableName: 'bonus_types'
  });
};
