/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user', {
    'id': {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      primaryKey: true,
      comment: "null",
      autoIncrement: true
    },
    'name': {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "null"
    },
    'username': {
      type: DataTypes.STRING(20),
      allowNull: false,
      comment: "null",
      unique: true
    },
    'email': {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "null"
    },
    'gender': {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "null"
    },
    'dob': {
      type: DataTypes.DATEONLY,
      allowNull: false,
      comment: "null"
    },
    'country': {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "null"
    },
    'state': {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "null"
    },
    'password': {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "null"
    },
    'sponsor_id': {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      comment: "null",
      references: {
        model: 'user',
        key: 'id'
      }
    },
    'image': {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "null"
    },
    'createdAt': {
      type: DataTypes.DATEONLY,
      allowNull: false,
      comment: "null"
    },
    'updatedAt': {
      type: DataTypes.DATEONLY,
      allowNull: true,
      comment: "null"
    }
  }, {
    tableName: 'user'
  });
};
