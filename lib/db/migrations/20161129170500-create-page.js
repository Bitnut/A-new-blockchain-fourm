'use strict';

module.exports = {
    up: function up(queryInterface, Sequelize) {
        return queryInterface.createTable('pages', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            permlink: { type: Sequelize.STRING(256) },
            views: { type: Sequelize.INTEGER },
            created_at: {
                allowNull: false,
                type: Sequelize.DATE
            }
        }).then(function () {
            queryInterface.addIndex('pages', ['permlink'], {
                indicesType: 'UNIQUE'
            });
        });
    },
    down: function down(queryInterface, Sequelize) {
        return queryInterface.dropTable('pages');
    }
};
//# sourceMappingURL=20161129170500-create-page.js.map