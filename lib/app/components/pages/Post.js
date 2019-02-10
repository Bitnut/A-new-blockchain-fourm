'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

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
// import ReactMarkdown from 'react-markdown';

// import { Link } from 'react-router';


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Comment = require('app/components/cards/Comment');

var _Comment2 = _interopRequireDefault(_Comment);

var _PostFull = require('app/components/cards/PostFull');

var _PostFull2 = _interopRequireDefault(_PostFull);

var _reactRedux = require('react-redux');

var _DropdownMenu = require('app/components/elements/DropdownMenu');

var _DropdownMenu2 = _interopRequireDefault(_DropdownMenu);

var _GoogleAd = require('app/components/elements/GoogleAd');

var _GoogleAd2 = _interopRequireDefault(_GoogleAd);

var _immutable = require('immutable');

var _counterpart = require('counterpart');

var _counterpart2 = _interopRequireDefault(_counterpart);

var _shouldComponentUpdate = require('app/utils/shouldComponentUpdate');

var _shouldComponentUpdate2 = _interopRequireDefault(_shouldComponentUpdate);

var _ServerApiClient = require('app/utils/ServerApiClient');

var _client_config = require('app/client_config');

var _constants = require('shared/constants');

var _UserUtil = require('app/utils/UserUtil');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Post = (_temp = _class = function (_React$Component) {
    (0, _inherits3.default)(Post, _React$Component);

    function Post() {
        (0, _classCallCheck3.default)(this, Post);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Post.__proto__ || (0, _getPrototypeOf2.default)(Post)).call(this));

        _this.toggleNegativeReplies = function (e) {
            _this.setState({
                showNegativeComments: !_this.state.showNegativeComments
            });
            e.preventDefault();
        };

        _this.onHideComment = function () {
            _this.setState({ commentHidden: true });
        };

        _this.showAnywayClick = function () {
            _this.setState({ showAnyway: true });
        };

        _this.state = {
            showNegativeComments: false
        };
        _this.showSignUp = function () {
            (0, _ServerApiClient.serverApiRecordEvent)('SignUp', 'Post Promo');
            window.location = _constants.SIGNUP_URL;
        };
        return _this;
    }

    (0, _createClass3.default)(Post, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var showSignUp = this.showSignUp;
            var _props = this.props,
                content = _props.content,
                sortOrder = _props.sortOrder;
            var _state = this.state,
                showNegativeComments = _state.showNegativeComments,
                commentHidden = _state.commentHidden,
                showAnyway = _state.showAnyway;

            var post = this.props.post;
            if (!post) {
                var route_params = this.props.routeParams;
                post = route_params.username + '/' + route_params.slug;
            }
            var dis = content.get(post);

            if (!dis) return null;

            // A post should be hidden if it is not pinned, is not told to "show
            // anyway", and is designated "gray".
            var pinned = dis.get('pinned');
            if (!pinned && !showAnyway) {
                var _dis$get$toJS = dis.get('stats').toJS(),
                    gray = _dis$get$toJS.gray;

                if (gray) {
                    return _react2.default.createElement(
                        'div',
                        { className: 'Post' },
                        _react2.default.createElement(
                            'div',
                            { className: 'row' },
                            _react2.default.createElement(
                                'div',
                                { className: 'column' },
                                _react2.default.createElement(
                                    'div',
                                    { className: 'PostFull' },
                                    _react2.default.createElement(
                                        'p',
                                        { onClick: this.showAnywayClick },
                                        (0, _counterpart2.default)('promote_post_jsx.this_post_was_hidden_due_to_low_ratings'),
                                        '.',
                                        ' ',
                                        _react2.default.createElement(
                                            'button',
                                            {
                                                style: { marginBottom: 0 },
                                                className: 'button hollow tiny float-right',
                                                onClick: this.showAnywayClick
                                            },
                                            (0, _counterpart2.default)('g.show')
                                        )
                                    )
                                )
                            )
                        )
                    );
                }
            }

            var replies = dis.get('replies').toJS();

            (0, _Comment.sortComments)(content, replies, sortOrder);

            // Don't render too many comments on server-side
            var commentLimit = 100;
            if (global['process'] !== undefined && replies.length > commentLimit) {
                console.log('Too many comments, ' + (replies.length - commentLimit) + ' omitted.');
                replies = replies.slice(0, commentLimit);
            }

            var positiveComments = replies.map(function (reply) {
                return _react2.default.createElement(_Comment2.default, {
                    root: true,
                    key: post + reply,
                    content: reply,
                    cont: content,
                    sort_order: sortOrder,
                    showNegativeComments: showNegativeComments,
                    onHide: _this2.onHideComment
                });
            });

            var negativeGroup = commentHidden && _react2.default.createElement(
                'div',
                { className: 'hentry Comment root Comment__negative_group' },
                _react2.default.createElement(
                    'p',
                    null,
                    showNegativeComments ? (0, _counterpart2.default)('post_jsx.now_showing_comments_with_low_ratings') : (0, _counterpart2.default)('post_jsx.comments_were_hidden_due_to_low_ratings'),
                    '.',
                    ' ',
                    _react2.default.createElement(
                        'button',
                        {
                            className: 'button hollow tiny float-right',
                            onClick: function onClick(e) {
                                return _this2.toggleNegativeReplies(e);
                            }
                        },
                        showNegativeComments ? (0, _counterpart2.default)('g.hide') : (0, _counterpart2.default)('g.show')
                    )
                )
            );

            var sort_orders = ['trending', 'votes', 'new', 'author_reputation'];
            var sort_labels = [(0, _counterpart2.default)('post_jsx.comment_sort_order.trending'), (0, _counterpart2.default)('post_jsx.comment_sort_order.votes'), (0, _counterpart2.default)('post_jsx.comment_sort_order.age'), (0, _counterpart2.default)('post_jsx.comment_sort_order.reputation')];
            var sort_menu = [];
            var sort_label = void 0;
            var selflink = '/' + dis.get('category') + '/@' + post;
            for (var o = 0; o < sort_orders.length; ++o) {
                if (sort_orders[o] == sortOrder) sort_label = sort_labels[o];
                sort_menu.push({
                    value: sort_orders[o],
                    label: sort_labels[o],
                    link: selflink + '?sort=' + sort_orders[o] + '#comments'
                });
            }
            var emptyPost = dis.get('created') === '1970-01-01T00:00:00' && dis.get('body') === '';
            if (emptyPost) return _react2.default.createElement(
                'center',
                null,
                _react2.default.createElement(
                    'div',
                    { className: 'NotFound float-center' },
                    _react2.default.createElement(
                        'div',
                        null,
                        _react2.default.createElement(
                            'h4',
                            { className: 'NotFound__header' },
                            'Sorry! This page doesnt exist.'
                        ),
                        _react2.default.createElement(
                            'p',
                            null,
                            'Not to worry. You can head back to',
                            ' ',
                            _react2.default.createElement(
                                'a',
                                { style: { fontWeight: 800 }, href: '/' },
                                'our homepage'
                            ),
                            ', or check out some great posts.'
                        ),
                        _react2.default.createElement(
                            'ul',
                            { className: 'NotFound__menu' },
                            _react2.default.createElement(
                                'li',
                                null,
                                _react2.default.createElement(
                                    'a',
                                    { href: '/created' },
                                    'new posts'
                                )
                            ),
                            _react2.default.createElement(
                                'li',
                                null,
                                _react2.default.createElement(
                                    'a',
                                    { href: '/hot' },
                                    'hot posts'
                                )
                            ),
                            _react2.default.createElement(
                                'li',
                                null,
                                _react2.default.createElement(
                                    'a',
                                    { href: '/trending' },
                                    'trending posts'
                                )
                            ),
                            _react2.default.createElement(
                                'li',
                                null,
                                _react2.default.createElement(
                                    'a',
                                    { href: '/promoted' },
                                    'promoted posts'
                                )
                            ),
                            _react2.default.createElement(
                                'li',
                                null,
                                _react2.default.createElement(
                                    'a',
                                    { href: '/active' },
                                    'active posts'
                                )
                            )
                        )
                    )
                )
            );

            return _react2.default.createElement(
                'div',
                { className: 'Post' },
                _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                        'div',
                        { className: 'column' },
                        _react2.default.createElement(_PostFull2.default, { post: post, cont: content })
                    )
                ),
                !(0, _UserUtil.isLoggedIn)() && _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                        'div',
                        { className: 'column' },
                        _react2.default.createElement(
                            'div',
                            { className: 'Post__promo' },
                            (0, _counterpart2.default)('g.next_7_strings_single_block.authors_get_paid_when_people_like_you_upvote_their_post'),
                            '.',
                            _react2.default.createElement('br', null),
                            (0, _counterpart2.default)('g.next_7_strings_single_block.if_you_enjoyed_what_you_read_earn_amount'),
                            _react2.default.createElement('br', null),
                            _react2.default.createElement(
                                'button',
                                {
                                    type: 'button',
                                    className: 'button e-btn',
                                    onClick: showSignUp
                                },
                                (0, _counterpart2.default)('loginform_jsx.sign_up_get_steem')
                            )
                        )
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { id: '#comments', className: 'Post_comments row hfeed' },
                    _react2.default.createElement(
                        'div',
                        { className: 'column large-12' },
                        _react2.default.createElement(
                            'div',
                            { className: 'Post_comments__content' },
                            positiveComments.length ? _react2.default.createElement(
                                'div',
                                { className: 'Post__comments_sort_order float-right' },
                                (0, _counterpart2.default)('post_jsx.sort_order'),
                                ': \xA0',
                                _react2.default.createElement(_DropdownMenu2.default, {
                                    items: sort_menu,
                                    el: 'li',
                                    selected: sort_label,
                                    position: 'left'
                                })
                            ) : null,
                            positiveComments,
                            negativeGroup
                        )
                    )
                ),
                this.props.shouldSeeAds ? _react2.default.createElement(
                    'div',
                    { className: 'Post_footer__ad' },
                    _react2.default.createElement(_GoogleAd2.default, {
                        name: 'post-footer-1',
                        format: 'auto',
                        slot: this.props.adSlots['post_footer_1'].slot_id,
                        style: { display: 'block' },
                        fullWidthResponsive: 'true'
                    })
                ) : null
            );
        }
    }]);
    return Post;
}(_react2.default.Component), _class.propTypes = {
    content: _propTypes2.default.object.isRequired,
    post: _propTypes2.default.string,
    routeParams: _propTypes2.default.object,
    sortOrder: _propTypes2.default.string
}, _temp);


var emptySet = (0, _immutable.Set)();

exports.default = (0, _reactRedux.connect)(function (state, ownProps) {
    var current_user = state.user.get('current');
    var ignoring = void 0;
    if (current_user) {
        var key = ['follow', 'getFollowingAsync', current_user.get('username'), 'ignore_result'];
        ignoring = state.global.getIn(key, emptySet);
    }
    return {
        content: state.global.get('content'),
        ignoring: ignoring,
        sortOrder: ownProps.router.getCurrentLocation().query.sort || 'trending',
        shouldSeeAds: state.app.getIn(['googleAds', 'shouldSeeAds']),
        adSlots: state.app.getIn(['googleAds', 'adSlots']).toJS()
    };
})(Post);
//# sourceMappingURL=Post.js.map