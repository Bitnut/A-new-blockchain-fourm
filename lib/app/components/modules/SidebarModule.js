"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SidebarModule = undefined;

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SidebarModule = exports.SidebarModule = function (_React$Component) {
    (0, _inherits3.default)(SidebarModule, _React$Component);

    function SidebarModule() {
        (0, _classCallCheck3.default)(this, SidebarModule);
        return (0, _possibleConstructorReturn3.default)(this, (SidebarModule.__proto__ || (0, _getPrototypeOf2.default)(SidebarModule)).apply(this, arguments));
    }

    (0, _createClass3.default)(SidebarModule, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                { className: "c-sidebar__module" },
                _react2.default.createElement(
                    "div",
                    { className: "c-sidebar__header" },
                    _react2.default.createElement(
                        "h3",
                        { className: "c-sidebar__h3" },
                        "Links React Component"
                    )
                ),
                _react2.default.createElement(
                    "div",
                    { className: "c-sidebar__content" },
                    _react2.default.createElement(
                        "ul",
                        { className: "c-sidebar__list" },
                        _react2.default.createElement(
                            "li",
                            { className: "c-sidebar__list-item" },
                            _react2.default.createElement(
                                "a",
                                { className: "c-sidebar__link", href: "#" },
                                "Test"
                            )
                        )
                    )
                )
            );
        }
    }]);
    return SidebarModule;
}(_react2.default.Component);
//# sourceMappingURL=SidebarModule.js.map