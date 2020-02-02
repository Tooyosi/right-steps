/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('awards', {
    'award_id': {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      primaryKey: true,
      comment: "null",
      autoIncrement: true
    },
    'award_type_id': {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      comment: "null",
      references: {
        model: 'awards_types',
        key: 'award_type_id'
      }
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
    'status': {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "null"
    },
    'date': {
      type: DataTypes.DATEONLY,
      allowNull: false,
      comment: "null"
    }
  }, {
    tableName: 'awards'
  });
};
