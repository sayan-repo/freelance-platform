'use strict';
export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Projects', {
      // ... content remains the same
      id: { allowNull: false, primaryKey: true, type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4 },
      title: { type: Sequelize.STRING, allowNull: false },
      description: { type: Sequelize.TEXT, allowNull: false },
      budget: { type: Sequelize.FLOAT, allowNull: false },
      deadline: { type: Sequelize.DATE, allowNull: false },
      status: { type: Sequelize.ENUM('draft', 'posted', 'in_progress', 'completed', 'disputed'), defaultValue: 'posted' },
      skills: { type: Sequelize.ARRAY(Sequelize.STRING) },
      clientId: { type: Sequelize.UUID, allowNull: false, references: { model: 'Users', key: 'id' }, onUpdate: 'CASCADE', onDelete: 'CASCADE' },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Projects');
  },
};