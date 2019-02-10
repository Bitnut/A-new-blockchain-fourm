'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _StateFunctions = require('app/utils/StateFunctions');

var _DropdownMenu = require('app/components/elements/DropdownMenu');

var _DropdownMenu2 = _interopRequireDefault(_DropdownMenu);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
    var post = _ref.post,
        horizontal = _ref.horizontal,
        single = _ref.single;

    var sort_order = 'trending';
    if (process.env.BROWSER && window.last_sort_order) sort_order = window.last_sort_order;

    if (single) return _react2.default.createElement(
        _reactRouter.Link,
        { to: '/' + sort_order + '/' + post.category },
        post.category
    );

    var json = post.json_metadata;
    var tags = [];

    try {
        if ((typeof json === 'undefined' ? 'undefined' : (0, _typeof3.default)(json)) == 'object') {
            tags = json.tags || [];
        } else {
            tags = json && JSON.parse(json).tags || [];
        }
        if (typeof tags == 'string') tags = tags.split(' ');
        if (!Array.isArray(tags)) {
            tags = [];
        }
    } catch (e) {
        tags = [];
    }

    // Category should always be first.
    tags.unshift(post.category);

    tags = (0, _StateFunctions.filterTags)(tags);

    if (horizontal) {
        // show it as a dropdown in Preview
        var _list = tags.map(function (tag, idx) {
            return _react2.default.createElement(
                _reactRouter.Link,
                { to: '/' + sort_order + '/' + tag, key: idx },
                ' ',
                tag,
                ' '
            );
        });
        return _react2.default.createElement(
            'div',
            { className: 'TagList__horizontal' },
            _list
        );
    }
    if (tags.length == 1) {
        return _react2.default.createElement(
            _reactRouter.Link,
            { to: '/' + sort_order + '/' + tags[0] },
            tags[0]
        );
    }
    var list = tags.map(function (tag) {
        return { value: tag, link: '/' + sort_order + '/' + tag };
    });
    return _react2.default.createElement(_DropdownMenu2.default, {
        selected: ' ' + tags[0],
        className: 'TagList',
        items: list,
        el: 'div'
    });
};
//# sourceMappingURL=TagList.js.map