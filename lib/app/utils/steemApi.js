'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getStateAsync = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var getStateAsync = exports.getStateAsync = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(url) {
        var path, raw, cleansed;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        // strip off query string
                        path = url.split('?')[0];
                        _context.next = 3;
                        return _steemJs.api.getStateAsync(path);

                    case 3:
                        raw = _context.sent;
                        cleansed = (0, _stateCleaner2.default)(raw);
                        return _context.abrupt('return', cleansed);

                    case 6:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function getStateAsync(_x) {
        return _ref.apply(this, arguments);
    };
}();

var _steemJs = require('@steemit/steem-js');

var _stateCleaner = require('app/redux/stateCleaner');

var _stateCleaner2 = _interopRequireDefault(_stateCleaner);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//# sourceMappingURL=steemApi.js.map