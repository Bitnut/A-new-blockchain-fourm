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

var _HelpContent = require('app/components/elements/HelpContent');

var _HelpContent2 = _interopRequireDefault(_HelpContent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Tos = function (_React$Component) {
    (0, _inherits3.default)(Tos, _React$Component);

    function Tos() {
        (0, _classCallCheck3.default)(this, Tos);
        return (0, _possibleConstructorReturn3.default)(this, (Tos.__proto__ || (0, _getPrototypeOf2.default)(Tos)).apply(this, arguments));
    }

    (0, _createClass3.default)(Tos, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'row' },
                _react2.default.createElement(
                    'div',
                    { className: 'column large-8 medium-10 small-12' },
                    _react2.default.createElement(_HelpContent2.default, { path: 'tos', title: 'Terms of Service' })
                )
            );
        }
    }]);
    return Tos;
}(_react2.default.Component);

module.exports = {
    component: Tos,
    path: 'tos.html'
};
//# sourceMappingURL=Tos.js.map