'use strict';
// Changed from module.exports to export default
export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      // ... content remains the same
      id: { allowNull: false, primaryKey: true, type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4 },
      username: { type: Sequelize.STRING, allowNull: false, unique: true },
      email: { type: Sequelize.STRING, allowNull: false, unique: true },
      password: { type: Sequelize.STRING, allowNull: false },
      role: { type: Sequelize.ENUM('client', 'freelancer', 'admin'), defaultValue: 'freelancer' },
      bio: { type: Sequelize.TEXT },
      skills: { type: Sequelize.ARRAY(Sequelize.STRING) },
      rating: { type: Sequelize.FLOAT, defaultValue: 0.0 },
      completedProjects: { type: Sequelize.INTEGER, defaultValue: 0 },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  },
};