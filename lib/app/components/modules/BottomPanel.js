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

var _CloseButton = require('app/components/elements/CloseButton');

var _CloseButton2 = _interopRequireDefault(_CloseButton);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BottomPanel = (_temp = _class = function (_React$Component) {
    (0, _inherits3.default)(BottomPanel, _React$Component);

    function BottomPanel() {
        (0, _classCallCheck3.default)(this, BottomPanel);
        return (0, _possibleConstructorReturn3.default)(this, (BottomPanel.__proto__ || (0, _getPrototypeOf2.default)(BottomPanel)).apply(this, arguments));
    }

    (0, _createClass3.default)(BottomPanel, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (nextProps.visible) {
                document.addEventListener('click', this.props.hide);
            } else {
                document.removeEventListener('click', this.props.hide);
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            document.removeEventListener('click', this.props.hide);
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                children = _props.children,
                visible = _props.visible,
                hide = _props.hide;

            return _react2.default.createElement(
                'div',
                { className: 'BottomPanel' },
                _react2.default.createElement(
                    'div',
                    { className: visible ? 'visible ' : '' },
                    _react2.default.createElement(_CloseButton2.default, { onClick: hide }),
                    children
                )
            );
        }
    }]);
    return BottomPanel;
}(_react2.default.Component), _class.propTypes = {
    children: _propTypes2.default.object,
    visible: _propTypes2.default.bool,
    hide: _propTypes2.default.func.isRequired
}, _temp);
exports.default = BottomPanel;
//# sourceMappingURL=BottomPanel.js.map