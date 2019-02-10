'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _counterpart = require('counterpart');

var _counterpart2 = _interopRequireDefault(_counterpart);

var _reactRouter = require('react-router');

var _NativeSelect = require('app/components/elements/NativeSelect');

var _NativeSelect2 = _interopRequireDefault(_NativeSelect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SortOrder = function SortOrder(_ref) {
    var topic = _ref.topic,
        sortOrder = _ref.sortOrder,
        horizontal = _ref.horizontal,
        pathname = _ref.pathname;

    /*
     * We do not sort the user feed by anything other than 'new'.
     * So don't make links to it from the SortOrder component.
     * Instead fall back to the 'all tags' route when a user attempts to sort from a feed page.
     * If a user lands on the 'feed' page and the sort order is displayed (e.g. a mobile user) 
     * display the active sort as 'new'.
     */
    var tag = topic;
    var sort = sortOrder;

    if (topic === 'feed') {
        tag = '';
        sort = 'created';
    }

    // If we are at the homepage, the sort order is 'trending'
    if (pathname === '/') {
        tag = '';
        sort = 'trending';
    }

    var makeRoute = function makeRoute(tag, sort) {
        return tag ? '/' + sort.value + '/' + tag : '/' + sort.value;
    };

    var handleChange = function handleChange(tag) {
        return function (sort) {
            _reactRouter.browserHistory.replace(makeRoute(tag, sort));
        };
    };

    var sorts = function sorts(tag) {
        return [{
            value: 'trending',
            label: (0, _counterpart2.default)('main_menu.trending'),
            link: '/trending/' + tag
        }, {
            value: 'created',
            label: (0, _counterpart2.default)('g.new'),
            link: '/created/' + tag
        }, {
            value: 'hot',
            label: (0, _counterpart2.default)('main_menu.hot'),
            link: '/hot/' + tag
        }, {
            value: 'promoted',
            label: (0, _counterpart2.default)('g.promoted'),
            link: '/promoted/' + tag
        }];
    };

    return horizontal ? _react2.default.createElement(
        'ul',
        { className: 'nav__block-list' },
        sorts(tag).map(function (i) {
            return _react2.default.createElement(
                'li',
                {
                    key: i.value,
                    className: 'nav__block-list-item ' + (i.value === sort ? 'nav__block-list-item--active' : '')
                },
                _react2.default.createElement(
                    _reactRouter.Link,
                    { to: i.link },
                    i.label
                )
            );
        })
    ) : _react2.default.createElement(_NativeSelect2.default, {
        currentlySelected: sort,
        options: sorts(tag),
        onChange: handleChange(tag)
    });
};

SortOrder.propTypes = {
    topic: _propTypes2.default.string,
    sortOrder: _propTypes2.default.string,
    horizontal: _propTypes2.default.bool,
    pathname: _propTypes2.default.string
};

SortOrder.defaultProps = {
    horizontal: false,
    topic: '',
    sortOrder: '',
    pathname: ''
};

exports.default = SortOrder;
//# sourceMappingURL=index.js.map