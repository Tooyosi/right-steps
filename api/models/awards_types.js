/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('awards_types', {
    'award_type_id': {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      primaryKey: true,
      comment: "null",
      autoIncrement: true
    },
    'stage': {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      comment: "null"
    },
    'name': {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "null"
    }
  }, {
    tableName: 'awards_types'
  });
};
