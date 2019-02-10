"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SidebarStats = function SidebarStats(_ref) {
    var steemPower = _ref.steemPower,
        followers = _ref.followers,
        reputation = _ref.reputation;
    return _react2.default.createElement(
        "div",
        { className: "c-sidebar__module" },
        _react2.default.createElement(
            "div",
            { className: "c-sidebar__header" },
            _react2.default.createElement(
                "h3",
                { className: "c-sidebar__h3" },
                "Stats"
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
                        "span",
                        { className: "c-sidebar__label" },
                        "Steem Power"
                    ),
                    _react2.default.createElement(
                        "span",
                        { className: "c-sidebar__score" },
                        steemPower
                    )
                ),
                _react2.default.createElement(
                    "li",
                    { className: "c-sidebar__list-item" },
                    _react2.default.createElement(
                        "span",
                        { className: "c-sidebar__label" },
                        "Followers"
                    ),
                    _react2.default.createElement(
                        "span",
                        { className: "c-sidebar__score" },
                        followers
                    )
                ),
                _react2.default.createElement(
                    "li",
                    { className: "c-sidebar__list-item" },
                    _react2.default.createElement(
                        "span",
                        { className: "c-sidebar__label" },
                        "Reputation"
                    ),
                    _react2.default.createElement(
                        "span",
                        { className: "c-sidebar__score" },
                        reputation
                    )
                )
            )
        )
    );
};

exports.default = SidebarStats;
//# sourceMappingURL=SidebarStats.js.map