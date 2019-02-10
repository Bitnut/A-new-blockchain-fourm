'use strict';

module.exports = {
    up: function up(queryInterface, Sequelize) {
        queryInterface.addColumn('users', 'waiting_list', Sequelize.BOOLEAN);
        queryInterface.addColumn('users', 'remote_ip', Sequelize.STRING);
    },

    down: function down(queryInterface, Sequelize) {
        queryInterface.removeColumn('users', 'waiting_list');
        queryInterface.removeColumn('users', 'remote_ip');
    }
};
//# sourceMappingURL=20160519211043-users-waiting-list.js.map//FIXME:这里好像有bug没有修复的