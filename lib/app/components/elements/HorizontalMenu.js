'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

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

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRouter = require('react-router');

var _Icon = require('app/components/elements/Icon');

var _Icon2 = _interopRequireDefault(_Icon);

var _counterpart = require('counterpart');

var _counterpart2 = _interopRequireDefault(_counterpart);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HorizontalMenu = (_temp = _class = function (_React$Component) {
    (0, _inherits3.default)(HorizontalMenu, _React$Component);

    function HorizontalMenu() {
        (0, _classCallCheck3.default)(this, HorizontalMenu);
        return (0, _possibleConstructorReturn3.default)(this, (HorizontalMenu.__proto__ || (0, _getPrototypeOf2.default)(HorizontalMenu)).apply(this, arguments));
    }

    (0, _createClass3.default)(HorizontalMenu, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                items = _props.items,
                title = _props.title,
                className = _props.className,
                hideValue = _props.hideValue,
                includeSearch = _props.includeSearch;

            return _react2.default.createElement(
                'ul',
                {
                    className: 'HorizontalMenu menu' + (className ? ' ' + className : '')
                },
                title && _react2.default.createElement(
                    'li',
                    { className: 'title' },
                    title
                ),
                items.map(function (i) {
                    if (i.value === hideValue) return null;
                    return _react2.default.createElement(
                        'li',
                        { key: i.value, className: i.active ? 'active' : '' },
                        i.link ? _react2.default.createElement(
                            _reactRouter.Link,
                            { to: i.link, onClick: i.onClick },
                            i.icon && _react2.default.createElement(_Icon2.default, { name: i.icon }),
                            i.label ? i.label : i.value
                        ) : _react2.default.createElement(
                            'span',
                            null,
                            i.icon && _react2.default.createElement(_Icon2.default, { name: i.icon }),
                            i.label ? i.label : i.value
                        )
                    );
                })
            );
        }
    }]);
    return HorizontalMenu;
}(_react2.default.Component), _class.propTypes = {
    items: _propTypes2.default.arrayOf(_propTypes2.default.object).isRequired,
    title: _propTypes2.default.string,
    className: _propTypes2.default.string,
    hideValue: _propTypes2.default.string,
    includeSearch: _propTypes2.default.bool
}, _temp);
exports.default = HorizontalMenu;
//# sourceMappingURL=HorizontalMenu.js.map