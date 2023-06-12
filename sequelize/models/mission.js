'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Mission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Garden, {foreignKey: 'garden_id', onDelete: 'CASCADE'})
      this.belongsTo(models.User, {foreignKey: 'gardener_id', onDelete: 'CASCADE'})
    }
  }
  Mission.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    start_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    end_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    gardener_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    garden_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Mission',
  });
  return Mission;
};