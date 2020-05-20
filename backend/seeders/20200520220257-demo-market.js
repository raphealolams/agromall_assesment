"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Markets",
      [
        {
          name: "Ajah Market",
          description: "we sell food items around ajah Lagos, Nigeria",
          category: "all kind of foods",
          address: "Ajah, Lagos State",
          coordinate: JSON.stringify({
            latitude: "6.464587400000001",
            longitude: "3.5725244",
          }),
          pictures: [
            "https://res.cloudinary.com/ajilore/image/upload/v1558101405/account_maintenance.png",
            "https://res.cloudinary.com/ajilore/image/upload/v1557307153/atm_copy.png",
            "https://res.cloudinary.com/ajilore/image/upload/v1557307154/account_freezing_copy.png",
          ],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Mile 12 Market",
          description: "we sell food items around Mile 12 Lagos, Nigeria",
          category: "all kind of foods",
          address: "Mile 12, Lagos State",
          coordinate: JSON.stringify({
            latitude: "6.601532499999999",
            longitude: "3.3968535",
          }),
          pictures: [
            "https://res.cloudinary.com/ajilore/image/upload/v1558101405/account_maintenance.png",
            "https://res.cloudinary.com/ajilore/image/upload/v1557307153/atm_copy.png",
            "https://res.cloudinary.com/ajilore/image/upload/v1557307154/account_freezing_copy.png",
          ],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Markets", null, {});
  },
};
