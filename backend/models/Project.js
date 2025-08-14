'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Project extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'clientId', as: 'client' });
      this.hasMany(models.Bid, { foreignKey: 'projectId', as: 'bids' });
      this.hasOne(models.Dispute, { foreignKey: 'projectId', as: 'dispute' });
    }
  }
  Project.init({
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    budget: { type: DataTypes.FLOAT, allowNull: false },
    deadline: { type: DataTypes.DATE, allowNull: false },
    status: { type: DataTypes.ENUM('draft', 'posted', 'in_progress', 'completed', 'disputed'), defaultValue: 'posted' },
    skills: DataTypes.ARRAY(DataTypes.STRING),
    clientId: { type: DataTypes.UUID, allowNull: false },
  }, {
    sequelize,
    modelName: 'Project',
  });
  return Project;
};