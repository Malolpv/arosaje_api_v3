'use strict';
const {
  Model
} = require('sequelize');
const plant = require('./plant');
module.exports = (sequelize, DataTypes) => {
  class Advice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Plant, {foreignKey: 'plant_id', onDelete: 'CASCADE'})
      this.belongsTo(models.User, {foreignKey: 'user_id', onDelete: 'SET_NULL'})
    }
  }
  Advice.init({
    content: { 
      type: DataTypes.STRING,
      allowNull:false
    },
    plant_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    user_id: {
      type:DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Advice',
  });
  return Advice;
};