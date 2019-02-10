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

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HelpTip = (_temp = _class = function (_React$Component) {
    (0, _inherits3.default)(HelpTip, _React$Component);

    function HelpTip(props) {
        (0, _classCallCheck3.default)(this, HelpTip);

        var _this = (0, _possibleConstructorReturn3.default)(this, (HelpTip.__proto__ || (0, _getPrototypeOf2.default)(HelpTip)).call(this, props));

        _this.show = function () {
            return _this.setVisibility(true);
        };

        _this.hide = function () {
            return _this.setVisibility(false);
        };

        _this.setVisibility = function (visible) {
            _this.setState({
                visible: visible
            });
        };

        _this.handleTouch = function () {
            _this.show();
            _this.assignOutsideTouchHandler();
        };

        _this.assignOutsideTouchHandler = function () {
            var handler = function handler(e) {
                var currentNode = e.target;
                var componentNode = _reactDom2.default.findDOMNode(_this.refs.instance);
                while (currentNode.parentNode) {
                    if (currentNode === componentNode) return;
                    currentNode = currentNode.parentNode;
                }
                if (currentNode !== document) return;
                _this.hide();
                document.removeEventListener('touchstart', handler);
            };
            document.addEventListener('touchstart', handler);
        };

        _this.state = {
            visible: false
        };
        return _this;
    }

    (0, _createClass3.default)(HelpTip, [{
        key: 'render',
        value: function render() {
            var props = this.props,
                state = this.state,
                show = this.show,
                hide = this.hide,
                handleTouch = this.handleTouch;

            return _react2.default.createElement(
                'div',
                {
                    onMouseEnter: show,
                    onMouseLeave: hide,
                    onTouchStart: handleTouch,
                    ref: 'helptip',
                    className: 'helptip'
                },
                _react2.default.createElement(
                    'span',
                    { className: 'helptip__target' },
                    props.children
                ),
                state.visible && _react2.default.createElement(
                    'div',
                    { ref: 'helptip', className: 'helptip__box' },
                    _react2.default.createElement(
                        'div',
                        {
                            ref: 'helptip-content',
                            className: 'helptip__box-content'
                        },
                        props.content
                    )
                )
            );
        }
    }]);
    return HelpTip;
}(_react2.default.Component), _class.propTypes = {
    children: _propTypes2.default.any.isRequired,
    content: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.array]).isRequired
}, _temp);
exports.default = HelpTip;
//# sourceMappingURL=index.js.map