/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user', {
    'id': {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      primaryKey: true,
       
      autoIncrement: true
    },
    'name': {
      type: DataTypes.STRING(255),
      allowNull: false,
       
    },
    'username': {
      type: DataTypes.STRING(20),
      allowNull: false,
       
      unique: true
    },
    'email': {
      type: DataTypes.STRING(255),
      allowNull: false,
       
    },
    'gender': {
      type: DataTypes.STRING(255),
      allowNull: false,
       
    },
    'dob': {
      type: DataTypes.DATEONLY,
      allowNull: false,
       
    },
    'country': {
      type: DataTypes.STRING(255),
      allowNull: false,
       
    },
    'state': {
      type: DataTypes.STRING(255),
      allowNull: false,
       
    },
    'password': {
      type: DataTypes.STRING(255),
      allowNull: false,
       
    },
    'sponsor_id': {
      type: DataTypes.INTEGER(11),
      allowNull: true,
       
      references: {
        model: 'user',
        key: 'id'
      }
    },
    'image': {
      type: DataTypes.STRING(255),
      allowNull: true,
       
    },
    'createdAt': {
      type: DataTypes.DATEONLY,
      allowNull: false,
       
    },
    'updatedAt': {
      type: DataTypes.DATEONLY,
      allowNull: true,
       
    }
  }, {
    tableName: 'user'
  });
};
