/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('requests', {
    'request_id': {
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
    'trans_reference': {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "null"
    },
    'request_type': {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "null"
    },
    'proof': {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "null"
    },
    'status': {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "null"
    },
    'amount': {
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
    tableName: 'requests'
  });
};
