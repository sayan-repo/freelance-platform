'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Dispute extends Model {
    static associate(models) {
      this.belongsTo(models.Project, { foreignKey: 'projectId', as: 'project' });
      this.belongsTo(models.User, { foreignKey: 'initiatorId', as: 'initiator' });
      this.belongsTo(models.User, { foreignKey: 'arbitratorId', as: 'arbitrator' });
    }
  }
  Dispute.init({
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    reason: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    status: { type: DataTypes.ENUM('open', 'in_review', 'resolved', 'rejected'), defaultValue: 'open' },
    resolution: DataTypes.TEXT,
    projectId: { type: DataTypes.UUID, allowNull: false },
    initiatorId: { type: DataTypes.UUID, allowNull: false },
    arbitratorId: { type: DataTypes.UUID, allowNull: true },
  }, {
    sequelize,
    modelName: 'Dispute',
  });
  return Dispute;
};