'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends3 = require('babel-runtime/helpers/extends');

var _extends4 = _interopRequireDefault(_extends3);

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

var _reactRedux = require('react-redux');

var _counterpart = require('counterpart');

var _counterpart2 = _interopRequireDefault(_counterpart);

var _UserReducer = require('app/redux/UserReducer');

var userActions = _interopRequireWildcard(_UserReducer);

var _FetchDataSaga = require('app/redux/FetchDataSaga');

var _PostSummary = require('app/components/cards/PostSummary');

var _PostSummary2 = _interopRequireDefault(_PostSummary);

var _Post = require('app/components/pages/Post');

var _Post2 = _interopRequireDefault(_Post);

var _LoadingIndicator = require('app/components/elements/LoadingIndicator');

var _LoadingIndicator2 = _interopRequireDefault(_LoadingIndicator);

var _lodash = require('lodash.debounce');

var _lodash2 = _interopRequireDefault(_lodash);

var _CloseButton = require('app/components/elements/CloseButton');

var _CloseButton2 = _interopRequireDefault(_CloseButton);

var _DomUtils = require('app/utils/DomUtils');

var _Icon = require('app/components/elements/Icon');

var _Icon2 = _interopRequireDefault(_Icon);

var _GoogleAd = require('app/components/elements/GoogleAd');

var _GoogleAd2 = _interopRequireDefault(_GoogleAd);

var _shouldComponentUpdate = require('app/utils/shouldComponentUpdate');

var _shouldComponentUpdate2 = _interopRequireDefault(_shouldComponentUpdate);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function topPosition(domElt) {
    if (!domElt) {
        return 0;
    }
    return domElt.offsetTop + topPosition(domElt.offsetParent);
}

var PostsList = (_temp = _class = function (_React$Component) {
    (0, _inherits3.default)(PostsList, _React$Component);

    function PostsList() {
        (0, _classCallCheck3.default)(this, PostsList);

        var _this = (0, _possibleConstructorReturn3.default)(this, (PostsList.__proto__ || (0, _getPrototypeOf2.default)(PostsList)).call(this));

        _this.toggleNegativeReplies = function () {
            _this.setState({
                showNegativeComments: !_this.state.showNegativeComments
            });
        };

        _this.scrollListener = (0, _lodash2.default)(function () {
            var el = window.document.getElementById('posts_list');
            if (!el) return;
            var scrollTop = window.pageYOffset !== undefined ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
            if (topPosition(el) + el.offsetHeight - scrollTop - window.innerHeight < 10) {
                var _this$props = _this.props,
                    loadMore = _this$props.loadMore,
                    posts = _this$props.posts,
                    category = _this$props.category,
                    showResteem = _this$props.showResteem;

                if (loadMore && posts && posts.size) loadMore(posts.last(), category, showResteem);
            }
            // Detect if we're in mobile mode (renders larger preview imgs)
            var mq = window.matchMedia('screen and (max-width: 39.9375em)');
            if (mq.matches) {
                _this.setState({ thumbSize: 'mobile' });
            } else {
                _this.setState({ thumbSize: 'desktop' });
            }
        }, 150);

        _this.state = {
            thumbSize: 'desktop',
            showNegativeComments: false
        };
        _this.scrollListener = _this.scrollListener.bind(_this);
        _this.onBackButton = _this.onBackButton.bind(_this);
        _this.closeOnOutsideClick = _this.closeOnOutsideClick.bind(_this);
        _this.shouldComponentUpdate = (0, _shouldComponentUpdate2.default)(_this, 'PostsList');
        return _this;
    }

    (0, _createClass3.default)(PostsList, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.attachScrollListener();
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.detachScrollListener();
            window.removeEventListener('popstate', this.onBackButton);
            window.removeEventListener('keydown', this.onBackButton);
            var post_overlay = document.getElementById('post_overlay');
            if (post_overlay) post_overlay.removeEventListener('click', this.closeOnOutsideClick);
            document.getElementsByTagName('body')[0].className = '';
        }
    }, {
        key: 'onBackButton',
        value: function onBackButton(e) {
            if ('keyCode' in e && e.keyCode !== 27) return;
            window.removeEventListener('popstate', this.onBackButton);
            window.removeEventListener('keydown', this.onBackButton);
        }
    }, {
        key: 'closeOnOutsideClick',
        value: function closeOnOutsideClick(e) {
            var inside_post = (0, _DomUtils.findParent)(e.target, 'PostsList__post_container');
            if (!inside_post) {
                var inside_top_bar = (0, _DomUtils.findParent)(e.target, 'PostsList__post_top_bar');
                if (!inside_top_bar) {
                    var post_overlay = document.getElementById('post_overlay');
                    if (post_overlay) post_overlay.removeEventListener('click', this.closeOnOutsideClick);
                    this.closePostModal();
                }
            }
        }
    }, {
        key: 'fetchIfNeeded',
        value: function fetchIfNeeded() {
            this.scrollListener();
        }
    }, {
        key: 'attachScrollListener',
        value: function attachScrollListener() {
            window.addEventListener('scroll', this.scrollListener, {
                capture: false,
                passive: true
            });
            window.addEventListener('resize', this.scrollListener, {
                capture: false,
                passive: true
            });
            this.scrollListener();
        }
    }, {
        key: 'detachScrollListener',
        value: function detachScrollListener() {
            window.removeEventListener('scroll', this.scrollListener);
            window.removeEventListener('resize', this.scrollListener);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                posts = _props.posts,
                showPinned = _props.showPinned,
                showResteem = _props.showResteem,
                showSpam = _props.showSpam,
                loading = _props.loading,
                anyPosts = _props.anyPosts,
                pathname = _props.pathname,
                category = _props.category,
                content = _props.content,
                ignore_result = _props.ignore_result,
                account = _props.account,
                username = _props.username,
                nsfwPref = _props.nsfwPref;
            var thumbSize = this.state.thumbSize;

            var postsInfo = [];
            posts.forEach(function (item) {
                var cont = content.get(item);
                if (!cont) {
                    console.error('PostsList --> Missing cont key', item);
                    return;
                }
                var ignore = ignore_result && ignore_result.has(cont.get('author'));
                var hideResteem = !showResteem && account && cont.get('author') != account;
                var hide = cont.getIn(['stats', 'hide']);
                if (!hideResteem && (!(ignore || hide) || showSpam))
                    // rephide
                    postsInfo.push({ item: item, ignore: ignore });
            });

            // Helper functions for determining whether to show pinned posts.
            var isLoggedInOnFeed = username && pathname === '/@' + username + '/feed';
            var isLoggedOutOnTrending = !username && (pathname === '/' || pathname === '/trending');
            var arePinnedPostsVisible = showPinned && (isLoggedInOnFeed || isLoggedOutOnTrending);
            var arePinnedPostsReady = isLoggedInOnFeed ? anyPosts : postsInfo.length > 0;
            var showPinnedPosts = arePinnedPostsVisible && arePinnedPostsReady;

            var pinned = this.props.pinned;
            var renderPinned = function renderPinned(pinnedPosts) {
                return pinnedPosts.map(function (pinnedPost) {
                    var id = pinnedPost.author + '/' + pinnedPost.permlink;
                    var pinnedPostContent = content.get(id);
                    var isSeen = pinnedPostContent.get('seen');
                    return _react2.default.createElement(
                        'li',
                        { key: pinnedPost },
                        _react2.default.createElement(
                            'div',
                            { className: 'PinLabel' },
                            _react2.default.createElement(_Icon2.default, {
                                className: 'PinIcon',
                                name: isSeen ? 'pin-disabled' : 'pin'
                            }),
                            ' ',
                            _react2.default.createElement(
                                'span',
                                { className: 'PinText' },
                                'Pinned Post'
                            )
                        ),
                        _react2.default.createElement(_PostSummary2.default, {
                            account: account,
                            post: id,
                            thumbSize: thumbSize,
                            ignore: false,
                            nsfwPref: nsfwPref
                        })
                    );
                });
            };
            var renderSummary = function renderSummary(items) {
                return items.map(function (item, i) {
                    var every = _this2.props.adSlots['in_feed_1'].every;
                    if (_this2.props.shouldSeeAds && i >= every && i % every === 0) {
                        return _react2.default.createElement(
                            'div',
                            { key: item.item },
                            _react2.default.createElement(
                                'li',
                                null,
                                _react2.default.createElement(_PostSummary2.default, {
                                    account: account,
                                    post: item.item,
                                    thumbSize: thumbSize,
                                    ignore: item.ignore,
                                    nsfwPref: nsfwPref
                                })
                            ),
                            _react2.default.createElement(
                                'li',
                                null,
                                _react2.default.createElement(
                                    'div',
                                    { className: 'articles__summary' },
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'articles__content-block articles__content-block--ad' },
                                        _react2.default.createElement(_GoogleAd2.default, {
                                            name: 'in-feed-1',
                                            format: 'fluid',
                                            slot: _this2.props.adSlots['in_feed_1'].slot_id,
                                            layoutKey: _this2.props.adSlots['in_feed_1'].layout_key,
                                            style: { display: 'block' }
                                        })
                                    )
                                )
                            )
                        );
                    } else {
                        return _react2.default.createElement(
                            'li',
                            { key: item.item },
                            _react2.default.createElement(_PostSummary2.default, {
                                account: account,
                                post: item.item,
                                thumbSize: thumbSize,
                                ignore: item.ignore,
                                nsfwPref: nsfwPref
                            })
                        );
                    }
                });
            };

            return _react2.default.createElement(
                'div',
                { id: 'posts_list', className: 'PostsList' },
                _react2.default.createElement(
                    'ul',
                    {
                        className: 'PostsList__summaries hfeed',
                        itemScope: true,
                        itemType: 'http://schema.org/blogPosts'
                    },
                    showPinnedPosts && renderPinned(pinned),
                    renderSummary(postsInfo)
                ),
                loading && _react2.default.createElement(
                    'center',
                    null,
                    _react2.default.createElement(_LoadingIndicator2.default, {
                        style: { marginBottom: '2rem' },
                        type: 'circle'
                    })
                )
            );
        }
    }]);
    return PostsList;
}(_react2.default.Component), _class.propTypes = {
    posts: _propTypes2.default.object.isRequired,
    loading: _propTypes2.default.bool.isRequired,
    category: _propTypes2.default.string,
    loadMore: _propTypes2.default.func,
    showSpam: _propTypes2.default.bool,
    showResteem: _propTypes2.default.bool,
    fetchState: _propTypes2.default.func.isRequired,
    pathname: _propTypes2.default.string,
    nsfwPref: _propTypes2.default.string.isRequired
}, _class.defaultProps = {
    showSpam: false,
    loading: false
}, _temp);
exports.default = (0, _reactRedux.connect)(function (state, props) {
    var _extends2;

    var pathname = state.app.get('location').pathname;
    var current = state.user.get('current');
    var username = current ? current.get('username') : state.offchain.get('account');
    var content = state.global.get('content');
    var ignore_result = state.global.getIn(['follow', 'getFollowingAsync', username, 'ignore_result']);
    var userPreferences = state.app.get('user_preferences').toJS();
    var nsfwPref = userPreferences.nsfwPref || 'warn';
    var pinned = state.offchain.get('pinned_posts').get('pinned_posts').toJS();
    var shouldSeeAds = state.app.getIn(['googleAds', 'shouldSeeAds']);
    var adSlots = state.app.getIn(['googleAds', 'adSlots']).toJS();
    return (0, _extends4.default)({}, props, (_extends2 = {
        pathname: pathname,
        username: username,
        content: content,
        ignore_result: ignore_result
    }, (0, _defineProperty3.default)(_extends2, 'pathname', pathname), (0, _defineProperty3.default)(_extends2, 'nsfwPref', nsfwPref), (0, _defineProperty3.default)(_extends2, 'pinned', pinned), (0, _defineProperty3.default)(_extends2, 'shouldSeeAds', shouldSeeAds), (0, _defineProperty3.default)(_extends2, 'adSlots', adSlots), _extends2));
}, function (dispatch) {
    return {
        fetchState: function fetchState(pathname) {
            dispatch(_FetchDataSaga.actions.fetchState({ pathname: pathname }));
        },
        removeHighSecurityKeys: function removeHighSecurityKeys() {
            dispatch(userActions.removeHighSecurityKeys());
        }
    };
})(PostsList);
//# sourceMappingURL=PostsList.js.map