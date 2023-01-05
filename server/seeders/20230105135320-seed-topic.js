'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let data = [{title: "Mojokerto", type: "destination"}, {title: "WishList for Rain Season", type: "open"}]
    data.map(el => {
      el.createdAt = el.updatedAt = new Date()
      return el
    })
    await queryInterface.bulkInsert('Topics', data, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Topics', null, {});
  }
};