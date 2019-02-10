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

var _DomUtils = require('app/utils/DomUtils');

var _dropdown = require('react-foundation-components/lib/global/dropdown');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FoundationDropdown = (_temp = _class = function (_React$Component) {
    (0, _inherits3.default)(FoundationDropdown, _React$Component);

    function FoundationDropdown(props) {
        (0, _classCallCheck3.default)(this, FoundationDropdown);

        var _this = (0, _possibleConstructorReturn3.default)(this, (FoundationDropdown.__proto__ || (0, _getPrototypeOf2.default)(FoundationDropdown)).call(this, props));

        _this.state = { show: props.show };
        _this.closeOnOutsideClick = _this.closeOnOutsideClick.bind(_this);
        return _this;
    }

    (0, _createClass3.default)(FoundationDropdown, [{
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps, prevState) {
            var show = this.state.show;
            if (show !== prevState.show) {
                if (show) document.body.addEventListener('mousedown', this.closeOnOutsideClick);else document.body.removeEventListener('mousedown', this.closeOnOutsideClick);
            }
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(newProps) {
            if (newProps.show !== this.props.show && newProps.show !== this.state.show) {
                this.setState({ show: newProps.show });
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            document.body.removeEventListener('mousedown', this.closeOnOutsideClick);
        }
    }, {
        key: 'closeOnOutsideClick',
        value: function closeOnOutsideClick(e) {
            var inside_dropdown = (0, _DomUtils.findParent)(e.target, 'FoundationDropdown');
            // console.log('-- closeOnOutsideClick -->', e.target, inside_dropdown);
            if (!inside_dropdown) {
                this.setState({ show: false });
                if (this.props.onHide) this.props.onHide();
            }
        }
    }, {
        key: 'render',
        value: function render() {
            if (!this.state.show) return null;
            var className = this.props.className;

            return _react2.default.createElement(
                _dropdown.Dropdown,
                { className: 'FoundationDropdown ' + className },
                this.props.children
            );
        }
    }]);
    return FoundationDropdown;
}(_react2.default.Component), _class.propTypes = {
    show: _propTypes2.default.bool.isRequired,
    className: _propTypes2.default.string,
    children: _propTypes2.default.any,
    onHide: _propTypes2.default.func
}, _temp);
exports.default = FoundationDropdown;
//# sourceMappingURL=FoundationDropdown.js.map