'use strict';

module.exports = {
    up: function up(queryInterface, Sequelize) {
        queryInterface.removeIndex('accounts', ['name']);
        queryInterface.addIndex('accounts', ['name']);
    },

    down: function down(queryInterface, Sequelize) {}
};
//# sourceMappingURL=20170511160822-not_unique_account_names.js.map