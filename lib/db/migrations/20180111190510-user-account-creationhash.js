'use strict';

module.exports = {
    up: function up(queryInterface, Sequelize) {
        queryInterface.addColumn('users', 'creation_hash', Sequelize.STRING);
    },

    down: function down(queryInterface, Sequelize) {
        queryInterface.removeColumn('users', 'creation_hash');
    }
};
//# sourceMappingURL=20180111190510-user-account-creationhash.js.map