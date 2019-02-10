'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _counterpart = require('counterpart');

var _counterpart2 = _interopRequireDefault(_counterpart);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SidebarLinks = function SidebarLinks(_ref) {
    var username = _ref.username;
    return _react2.default.createElement(
        'div',
        { className: 'c-sidebar__module' },
        _react2.default.createElement(
            'div',
            { className: 'c-sidebar__header' },
            _react2.default.createElement(
                'h3',
                { className: 'c-sidebar__h3' },
                (0, _counterpart2.default)('g.links')
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
                    { className: 'c-sidebar__list-item', key: 'feed' },
                    _react2.default.createElement(
                        'a',
                        { className: 'c-sidebar__link', href: '/@' + username + '/feed' },
                        (0, _counterpart2.default)('g.my_feed')
                    )
                ),
                _react2.default.createElement(
                    'li',
                    { className: 'c-sidebar__list-item' },
                    _react2.default.createElement(
                        'a',
                        { className: 'c-sidebar__link', href: '/@' + username },
                        (0, _counterpart2.default)('g.my_blog')
                    )
                ),
                _react2.default.createElement(
                    'li',
                    { className: 'c-sidebar__list-item' },
                    _react2.default.createElement(
                        'a',
                        {
                            className: 'c-sidebar__link',
                            href: '/@' + username + '/transfers'
                        },
                        (0, _counterpart2.default)('g.my_wallet')
                    )
                )
            )
        )
    );
};

exports.default = SidebarLinks;
//# sourceMappingURL=SidebarLinks.js.map