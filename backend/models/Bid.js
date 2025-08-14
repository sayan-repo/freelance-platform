'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Bid extends Model {
    static associate(models) {
      this.belongsTo(models.Project, { foreignKey: 'projectId', as: 'project' });
      this.belongsTo(models.User, { foreignKey: 'freelancerId', as: 'freelancer' });
    }
  }
  Bid.init({
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    amount: { type: DataTypes.FLOAT, allowNull: false },
    proposal: { type: DataTypes.TEXT, allowNull: false },
    deliveryDays: { type: DataTypes.INTEGER, allowNull: false },
    status: { type: DataTypes.ENUM('pending', 'accepted', 'rejected'), defaultValue: 'pending' },
    projectId: { type: DataTypes.UUID, allowNull: false },
    freelancerId: { type: DataTypes.UUID, allowNull: false },
  }, {
    sequelize,
    modelName: 'Bid',
  });
  return Bid;
};