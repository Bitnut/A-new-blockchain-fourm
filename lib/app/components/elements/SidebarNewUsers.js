'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _constants = require('shared/constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SidebarNewUsers = function SidebarNewUsers() {
    return _react2.default.createElement(
        'div',
        { className: 'c-sidebar__module' },
        _react2.default.createElement(
            'div',
            { className: 'c-sidebar__header' },
            _react2.default.createElement(
                'h3',
                { className: 'c-sidebar__h3' },
                'New to Steemit?'
            )
        ),
        _react2.default.createElement(
            'div',
            { className: 'c-sidebar__content' },
            _react2.default.createElement(
                'ul',
                { className: 'c-sidebar__list' },
                _react2.default.createElement(
                    'li',
                    { className: 'c-sidebar__list-item' },
                    _react2.default.createElement(
                        'a',
                        { className: 'c-sidebar__link', href: '/welcome' },
                        'Quick start guide'
                    )
                ),
                _react2.default.createElement(
                    'li',
                    { className: 'c-sidebar__list-item' },
                    _react2.default.createElement(
                        'a',
                        { className: 'c-sidebar__link', href: 'https://steem.io' },
                        'The blockchain'
                    )
                ),
                _react2.default.createElement(
                    'li',
                    { className: 'c-sidebar__list-item' },
                    _react2.default.createElement(
                        'a',
                        { className: 'c-sidebar__link', href: '/faq.html' },
                        'FAQs'
                    )
                ),
                _react2.default.createElement(
                    'li',
                    { className: 'c-sidebar__list-item' },
                    _react2.default.createElement(
                        'a',
                        { className: 'c-sidebar__link', href: _constants.SIGNUP_URL },
                        'Sign up'
                    )
                )
            )
        )
    );
};

exports.default = SidebarNewUsers;
//# sourceMappingURL=SidebarNewUsers.js.map