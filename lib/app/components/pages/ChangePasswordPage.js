'use strict';

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ChangePassword = require('app/components/elements/ChangePassword');

var _ChangePassword2 = _interopRequireDefault(_ChangePassword);

var _counterpart = require('counterpart');

var _counterpart2 = _interopRequireDefault(_counterpart);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ChangePasswordPage = function (_React$Component) {
    (0, _inherits3.default)(ChangePasswordPage, _React$Component);

    function ChangePasswordPage() {
        (0, _classCallCheck3.default)(this, ChangePasswordPage);
        return (0, _possibleConstructorReturn3.default)(this, (ChangePasswordPage.__proto__ || (0, _getPrototypeOf2.default)(ChangePasswordPage)).apply(this, arguments));
    }

    (0, _createClass3.default)(ChangePasswordPage, [{
        key: 'render',
        value: function render() {
            if (!process.env.BROWSER) {
                // don't render this page on the server
                return _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                        'div',
                        { className: 'column' },
                        (0, _counterpart2.default)('g.loading'),
                        '..'
                    )
                );
            }

            return _react2.default.createElement(
                'div',
                { className: 'ChangePasswordPage row' },
                _react2.default.createElement(
                    'div',
                    { className: 'column large-7 small-10' },
                    _react2.default.createElement(
                        'h2',
                        null,
                        (0, _counterpart2.default)('g.change_password')
                    ),
                    _react2.default.createElement(_ChangePassword2.default, null)
                )
            );
        }
    }]);
    return ChangePasswordPage;
}(_react2.default.Component);

module.exports = {
    path: 'change_password',
    component: ChangePasswordPage
};
//# sourceMappingURL=ChangePasswordPage.js.map