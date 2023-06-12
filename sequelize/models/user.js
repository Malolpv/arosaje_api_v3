'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Garden, {foreignKey: 'user_id', onDelete: 'CASCADE'})
      this.hasMany(models.Advice, {foreignKey: 'user_id', onDelete: 'SET_NULL'})
      this.hasMany(models.Mission, {foreignKey: 'gardener_id', onDelete: 'SET_NULL'})
      this.hasMany(models.Picture, {foreignKey: 'user_id', onDelete: 'SET_NULL'})
    }
  }
  User.init({
    pseudo: {
      type: DataTypes.STRING,
      allowNull:false
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull:false
    },
    password: { 
      type: DataTypes.STRING,
      allowNull:false
    },
    is_botaniste: {
      type: DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};