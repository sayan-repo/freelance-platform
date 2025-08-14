'use strict';
// Changed from require() to import
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';

// Changed from module.exports to export default
export default {
  async up(queryInterface, Sequelize) {
    const saltRounds = 10;
    const adminPassword = await bcrypt.hash('adminpass', saltRounds);
    const clientPassword = await bcrypt.hash('clientpass', saltRounds);
    const freelancerPassword = await bcrypt.hash('freelancerpass', saltRounds);
    
    const adminId = 'a1b2c3d4-e5f6-7890-1234-567890abcdef';
    const clientId = 'b2c3d4e5-f6a7-8901-2345-67890abcdef0';
    const freelancerId1 = 'c3d4e5f6-a7b8-9012-3456-7890abcdef01';
    const freelancerId2 = 'd4e5f6a7-b8c9-0123-4567-890abcdef012';

    await queryInterface.bulkInsert('Users', [
      { id: adminId, username: 'admin', email: 'admin@example.com', password: adminPassword, role: 'admin', createdAt: new Date(), updatedAt: new Date() },
      { id: clientId, username: 'TechSolutions', email: 'client@example.com', password: clientPassword, role: 'client', completedProjects: 1, createdAt: new Date(), updatedAt: new Date() },
      { id: freelancerId1, username: 'JaneDev', email: 'jane@example.com', password: freelancerPassword, role: 'freelancer', skills: ['React', 'TypeScript'], rating: 4.9, completedProjects: 15, createdAt: new Date(), updatedAt: new Date() },
      { id: freelancerId2, username: 'MikeDesign', email: 'mike@example.com', password: freelancerPassword, role: 'freelancer', skills: ['Figma', 'UI/UX'], rating: 5.0, completedProjects: 20, createdAt: new Date(), updatedAt: new Date() },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};