'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _reactRedux = require('react-redux');

var _counterpart = require('counterpart');

var _counterpart2 = _interopRequireDefault(_counterpart);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _NativeSelect = require('app/components/elements/NativeSelect');

var _NativeSelect2 = _interopRequireDefault(_NativeSelect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Topics = function Topics(_ref) {
    var order = _ref.order,
        current = _ref.current,
        compact = _ref.compact,
        className = _ref.className,
        username = _ref.username,
        categories = _ref.categories;

    var handleChange = function handleChange(selectedOption) {
        _reactRouter.browserHistory.push(selectedOption.value);
    };

    var currentlySelected = function currentlySelected(currentTag, username) {
        var currentOrder = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

        var opts = {
            feed: '/@' + username + '/feed',
            tagOnly: '/trending/' + currentTag,
            orderOnly: '/' + currentOrder,
            tagWithOrder: '/' + currentOrder + '/' + currentTag,
            default: '/trending'
        };
        if (currentTag === 'feed') return opts['feed'];
        if (currentTag && currentOrder) return opts['tagWithOrder'];
        if (!currentTag && currentOrder) return opts['orderOnly'];
        if (currentTag && !currentOrder) return opts['tagOnly'];
        return opts['default'];
    };

    if (compact) {
        var extras = function extras(username) {
            var ex = {
                allTags: function allTags(order) {
                    return {
                        value: '/' + order,
                        label: '' + (0, _counterpart2.default)('g.all_tags_mobile')
                    };
                },
                myFeed: function myFeed(name) {
                    return {
                        value: '/@' + name + '/feed',
                        label: '' + (0, _counterpart2.default)('g.my_feed')
                    };
                }
            };
            return username ? [ex.allTags(order), ex.myFeed(username)] : [ex.allTags(order)];
        };

        var opts = extras(username).concat(categories.map(function (cat) {
            var link = order ? '/' + order + '/' + cat : '/' + cat;
            return { value: link, label: cat };
        }).toJS());

        return _react2.default.createElement(_NativeSelect2.default, {
            currentlySelected: currentlySelected(current, username, order),
            options: opts,
            onChange: handleChange
        });
    } else {
        var categoriesLinks = categories.map(function (cat) {
            var link = order ? '/' + order + '/' + cat : '/hot/' + cat;
            return _react2.default.createElement(
                'li',
                { className: 'c-sidebar__list-item', key: cat },
                _react2.default.createElement(
                    _reactRouter.Link,
                    {
                        to: link,
                        className: 'c-sidebar__link',
                        activeClassName: 'active'
                    },
                    cat
                )
            );
        });
        return _react2.default.createElement(
            'div',
            { className: 'c-sidebar__module' },
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
                            'div',
                            { className: 'c-sidebar__header' },
                            _react2.default.createElement(
                                _reactRouter.Link,
                                {
                                    to: '/' + order,
                                    className: 'c-sidebar__link',
                                    activeClassName: 'active'
                                },
                                (0, _counterpart2.default)('g.all_tags')
                            )
                        )
                    ),
                    categoriesLinks,
                    _react2.default.createElement(
                        'li',
                        { className: 'c-sidebar__link' },
                        _react2.default.createElement(
                            _reactRouter.Link,
                            {
                                className: 'c-sidebar__link c-sidebar__link--emphasis',
                                to: '/tags'
                            },
                            (0, _counterpart2.default)('g.show_more_topics'),
                            '..'
                        )
                    )
                )
            )
        );
    }
};

Topics.propTypes = {
    categories: _propTypes2.default.object.isRequired,
    order: _propTypes2.default.string.isRequired,
    current: _propTypes2.default.string,
    compact: _propTypes2.default.bool.isRequired
};

Topics.defaultProps = {
    current: ''
};

exports.default = Topics;
//# sourceMappingURL=Topics.js.map