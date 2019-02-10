'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 *
 * @returns {boolean}
 */
var isLoggedIn = exports.isLoggedIn = function isLoggedIn() {
    return typeof localStorage !== 'undefined' && !!localStorage.getItem('autopost2');
};

exports.default = {
    isLoggedIn: isLoggedIn
};
//# sourceMappingURL=UserUtil.js.map