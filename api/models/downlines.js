/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('downlines', {
    'downline_id': {
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
      },
      unique: true
    },
    'left_leg_id': {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      comment: "null",
      references: {
        model: 'users',
        key: 'user_id'
      },
      unique: true
    },
    'right_leg_id': {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      comment: "null",
      references: {
        model: 'users',
        key: 'user_id'
      },
      unique: true
    }
  }, {
    tableName: 'downlines'
  });
};
