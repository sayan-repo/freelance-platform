'use strict';
import { v4 as uuidv4 } from 'uuid';

export default {
  async up(queryInterface, Sequelize) {
    const clientId = 'b2c3d4e5-f6a7-8901-2345-67890abcdef0';
    const freelancerId1 = 'c3d4e5f6-a7b8-9012-3456-7890abcdef01';
    const freelancerId2 = 'd4e5f6a7-b8c9-0123-4567-890abcdef012';

    const project1Id = uuidv4();
    const project2Id = uuidv4();

    await queryInterface.bulkInsert('Projects', [
      { id: project1Id, clientId: clientId, title: 'Build new E-commerce Website', description: 'Modern, responsive e-commerce platform.', budget: 5000, deadline: new Date(), status: 'posted', skills: ['React', 'Node.js'], createdAt: new Date(), updatedAt: new Date() },
      { id: project2Id, clientId: clientId, title: 'Mobile App Landing Page Design', description: 'Sleek and intuitive UI/UX for a new app.', budget: 2500, deadline: new Date(), status: 'in_progress', skills: ['Figma', 'UI/UX'], createdAt: new Date(), updatedAt: new Date() },
    ], {});
    
    await queryInterface.bulkInsert('Bids', [
        { id: uuidv4(), projectId: project1Id, freelancerId: freelancerId1, amount: 4800, proposal: 'I can build this with Next.js.', status: 'pending', deliveryDays: 30, createdAt: new Date(), updatedAt: new Date() },
        { id: uuidv4(), projectId: project2Id, freelancerId: freelancerId2, amount: 2500, proposal: 'I will provide a full design system in Figma.', status: 'accepted', deliveryDays: 14, createdAt: new Date(), updatedAt: new Date() },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Bids', null, {});
    await queryInterface.bulkDelete('Projects', null, {});
  }
};