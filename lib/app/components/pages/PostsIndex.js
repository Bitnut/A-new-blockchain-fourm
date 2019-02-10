'use strict';

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

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

var _class, _temp; /* eslint react/prop-types: 0 */

// import SidebarStats from 'app/components/elements/SidebarStats';


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = require('react-redux');

var _reactRouter = require('react-router');

var _counterpart = require('counterpart');

var _counterpart2 = _interopRequireDefault(_counterpart);

var _immutable = require('immutable');

var _FetchDataSaga = require('app/redux/FetchDataSaga');

var _constants = require('app/redux/constants');

var _constants2 = _interopRequireDefault(_constants);

var _shouldComponentUpdate = require('app/utils/shouldComponentUpdate');

var _shouldComponentUpdate2 = _interopRequireDefault(_shouldComponentUpdate);

var _PostsList = require('app/components/cards/PostsList');

var _PostsList2 = _interopRequireDefault(_PostsList);

var _StateFunctions = require('app/utils/StateFunctions');

var _Callout = require('app/components/elements/Callout');

var _Callout2 = _interopRequireDefault(_Callout);

var _SidebarLinks = require('app/components/elements/SidebarLinks');

var _SidebarLinks2 = _interopRequireDefault(_SidebarLinks);

var _SidebarNewUsers = require('app/components/elements/SidebarNewUsers');

var _SidebarNewUsers2 = _interopRequireDefault(_SidebarNewUsers);

var _Notices = require('app/components/elements/Notices');

var _Notices2 = _interopRequireDefault(_Notices);

var _GoogleAd = require('app/components/elements/GoogleAd');

var _GoogleAd2 = _interopRequireDefault(_GoogleAd);

var _ArticleLayoutSelector = require('app/components/modules/ArticleLayoutSelector');

var _ArticleLayoutSelector2 = _interopRequireDefault(_ArticleLayoutSelector);

var _Topics = require('./Topics');

var _Topics2 = _interopRequireDefault(_Topics);

var _SortOrder = require('app/components/elements/SortOrder');

var _SortOrder2 = _interopRequireDefault(_SortOrder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PostsIndex = (_temp = _class = function (_React$Component) {
    (0, _inherits3.default)(PostsIndex, _React$Component);

    function PostsIndex() {
        (0, _classCallCheck3.default)(this, PostsIndex);

        var _this = (0, _possibleConstructorReturn3.default)(this, (PostsIndex.__proto__ || (0, _getPrototypeOf2.default)(PostsIndex)).call(this));

        _this.onShowSpam = function () {
            _this.setState({ showSpam: !_this.state.showSpam });
        };

        _this.state = {};
        _this.loadMore = _this.loadMore.bind(_this);
        _this.shouldComponentUpdate = (0, _shouldComponentUpdate2.default)(_this, 'PostsIndex');
        return _this;
    }

    (0, _createClass3.default)(PostsIndex, [{
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps) {
            if (window.innerHeight && window.innerHeight > 3000 && prevProps.discussions !== this.props.discussions) {
                this.refs.list.fetchIfNeeded();
            }
        }
    }, {
        key: 'getPosts',
        value: function getPosts(order, category) {
            var topic_discussions = this.props.discussions.get(category || '');
            if (!topic_discussions) return null;
            return topic_discussions.get(order);
        }
    }, {
        key: 'loadMore',
        value: function loadMore(last_post) {
            if (!last_post) return;
            var _props$routeParams = this.props.routeParams,
                accountname = _props$routeParams.accountname,
                category = _props$routeParams.category,
                _props$routeParams$or = _props$routeParams.order,
                order = _props$routeParams$or === undefined ? _constants2.default.DEFAULT_SORT_ORDER : _props$routeParams$or;

            if (category === 'feed') {
                accountname = order.slice(1);
                order = 'by_feed';
            }
            if ((0, _StateFunctions.isFetchingOrRecentlyUpdated)(this.props.status, order, category)) return;

            var _last_post$split = last_post.split('/'),
                _last_post$split2 = (0, _slicedToArray3.default)(_last_post$split, 2),
                author = _last_post$split2[0],
                permlink = _last_post$split2[1];

            this.props.requestData({
                author: author,
                permlink: permlink,
                order: order,
                category: category,
                accountname: accountname
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _props$routeParams2 = this.props.routeParams,
                category = _props$routeParams2.category,
                _props$routeParams2$o = _props$routeParams2.order,
                order = _props$routeParams2$o === undefined ? _constants2.default.DEFAULT_SORT_ORDER : _props$routeParams2$o;
            var _props = this.props,
                categories = _props.categories,
                pinned = _props.pinned;


            var topics_order = order;
            var posts = [];
            var account_name = '';
            var emptyText = '';
            if (category === 'feed') {
                account_name = order.slice(1);
                order = 'by_feed';
                topics_order = 'trending';
                posts = this.props.accounts.getIn([account_name, 'feed']);
                var isMyAccount = this.props.username === account_name;
                if (isMyAccount) {
                    emptyText = _react2.default.createElement(
                        'div',
                        null,
                        (0, _counterpart2.default)('posts_index.empty_feed_1'),
                        '.',
                        _react2.default.createElement('br', null),
                        _react2.default.createElement('br', null),
                        (0, _counterpart2.default)('posts_index.empty_feed_2'),
                        '.',
                        _react2.default.createElement('br', null),
                        _react2.default.createElement('br', null),
                        _react2.default.createElement(
                            _reactRouter.Link,
                            { to: '/trending' },
                            (0, _counterpart2.default)('posts_index.empty_feed_3')
                        ),
                        _react2.default.createElement('br', null),
                        _react2.default.createElement(
                            _reactRouter.Link,
                            { to: '/welcome' },
                            (0, _counterpart2.default)('posts_index.empty_feed_4')
                        ),
                        _react2.default.createElement('br', null),
                        _react2.default.createElement(
                            _reactRouter.Link,
                            { to: '/faq.html' },
                            (0, _counterpart2.default)('posts_index.empty_feed_5')
                        ),
                        _react2.default.createElement('br', null)
                    );
                } else {
                    emptyText = _react2.default.createElement(
                        'div',
                        null,
                        (0, _counterpart2.default)('user_profile.user_hasnt_followed_anything_yet', {
                            name: account_name
                        })
                    );
                }
            } else {
                posts = this.getPosts(order, category);
                if (posts && posts.size === 0) {
                    emptyText = _react2.default.createElement(
                        'div',
                        null,
                        'No ' + topics_order + (category ? ' #' + category : '') + ' posts found'
                    );
                }
            }

            var status = this.props.status ? this.props.status.getIn([category || '', order]) : null;
            var fetching = status && status.fetching || this.props.loading;
            var showSpam = this.state.showSpam;

            // If we're at one of the four sort order routes without a tag filter,
            // use the translated string for that sort order, f.ex "trending"
            //
            // If you click on a tag while you're in a sort order route,
            // the title should be the translated string for that sort order
            // plus the tag string, f.ex "trending: blog"
            //
            // Logged-in:
            // At homepage (@user/feed) say "My feed"

            var page_title = 'Posts'; // sensible default here?
            if (category === 'feed') {
                if (account_name === this.props.username) page_title = (0, _counterpart2.default)('posts_index.my_feed');else page_title = (0, _counterpart2.default)('posts_index.accountnames_feed', {
                    account_name: account_name
                });
            } else {
                switch (topics_order) {
                    case 'trending':
                        // cribbed from Header.jsx where it's repeated 2x already :P
                        page_title = (0, _counterpart2.default)('main_menu.trending');
                        break;
                    case 'created':
                        page_title = (0, _counterpart2.default)('g.new');
                        break;
                    case 'hot':
                        page_title = (0, _counterpart2.default)('main_menu.hot');
                        break;
                    case 'promoted':
                        page_title = (0, _counterpart2.default)('g.promoted');
                        break;
                }
                if (typeof category !== 'undefined') {
                    page_title = page_title + ': ' + category; // maybe todo: localize the colon?
                } else {
                    page_title = page_title + ': ' + (0, _counterpart2.default)('g.all_tags');
                }
            }
            var layoutClass = this.props.blogmode ? ' layout-block' : ' layout-list';
            return _react2.default.createElement(
                'div',
                {
                    className: 'PostsIndex row' + (fetching ? ' fetching' : '') + layoutClass
                },
                _react2.default.createElement(
                    'article',
                    { className: 'articles' },
                    _react2.default.createElement(
                        'div',
                        { className: 'articles__header row' },
                        _react2.default.createElement(
                            'div',
                            { className: 'small-6 medium-6 large-6 column' },
                            _react2.default.createElement(
                                'h1',
                                { className: 'articles__h1 show-for-mq-large articles__h1--no-wrap' },
                                page_title
                            ),
                            _react2.default.createElement(
                                'span',
                                { className: 'hide-for-mq-large articles__header-select' },
                                _react2.default.createElement(_Topics2.default, {
                                    username: this.props.username,
                                    order: topics_order,
                                    current: category,
                                    categories: categories,
                                    compact: true
                                })
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'small-6 medium-5 large-5 column hide-for-large articles__header-select' },
                            _react2.default.createElement(_SortOrder2.default, {
                                sortOrder: this.props.sortOrder,
                                topic: this.props.topic,
                                horizontal: false
                            })
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'medium-1 show-for-mq-medium column' },
                            _react2.default.createElement(_ArticleLayoutSelector2.default, null)
                        )
                    ),
                    _react2.default.createElement('hr', { className: 'articles__hr' }),
                    !fetching && posts && !posts.size && pinned && !pinned.size ? _react2.default.createElement(
                        _Callout2.default,
                        null,
                        emptyText
                    ) : _react2.default.createElement(_PostsList2.default, {
                        ref: 'list',
                        posts: posts ? posts : (0, _immutable.List)(),
                        loading: fetching,
                        anyPosts: true,
                        category: category,
                        loadMore: this.loadMore,
                        showPinned: true,
                        showSpam: showSpam
                    })
                ),
                _react2.default.createElement(
                    'aside',
                    { className: 'c-sidebar c-sidebar--right' },
                    this.props.isBrowser && !this.props.maybeLoggedIn && !this.props.username ? _react2.default.createElement(_SidebarNewUsers2.default, null) : this.props.isBrowser && _react2.default.createElement(
                        'div',
                        null,
                        _react2.default.createElement(_SidebarLinks2.default, { username: this.props.username })
                    ),
                    _react2.default.createElement(_Notices2.default, { notices: this.props.notices }),
                    this.props.shouldSeeAds ? _react2.default.createElement(
                        'div',
                        { className: 'c-sidebar__module' },
                        _react2.default.createElement(
                            'div',
                            { className: 'c-sidebar__content sidebar-ad' },
                            _react2.default.createElement(_GoogleAd2.default, {
                                name: 'sidebar-1',
                                slot: this.props.adSlots['sidebar_1'].slot_id,
                                style: { width: '160px', height: '600px' }
                            })
                        )
                    ) : null
                ),
                _react2.default.createElement(
                    'aside',
                    { className: 'c-sidebar c-sidebar--left' },
                    _react2.default.createElement(_Topics2.default, {
                        order: topics_order,
                        current: category,
                        compact: false,
                        username: this.props.username,
                        categories: categories
                    }),
                    _react2.default.createElement(
                        'small',
                        null,
                        _react2.default.createElement(
                            'a',
                            {
                                className: 'c-sidebar__more-link',
                                onClick: this.onShowSpam
                            },
                            showSpam ? (0, _counterpart2.default)('g.next_3_strings_together.show_less') : (0, _counterpart2.default)('g.next_3_strings_together.show_more')
                        ),
                        ' ' + (0, _counterpart2.default)('g.next_3_strings_together.value_posts')
                    )
                )
            );
        }
    }]);
    return PostsIndex;
}(_react2.default.Component), _class.propTypes = {
    discussions: _propTypes2.default.object,
    accounts: _propTypes2.default.object,
    status: _propTypes2.default.object,
    routeParams: _propTypes2.default.object,
    requestData: _propTypes2.default.func,
    loading: _propTypes2.default.bool,
    username: _propTypes2.default.string,
    blogmode: _propTypes2.default.bool,
    categories: _propTypes2.default.object
}, _class.defaultProps = {
    showSpam: false
}, _temp);


module.exports = {
    path: ':order(/:category)',
    component: (0, _reactRedux.connect)(function (state, ownProps) {
        return {
            discussions: state.global.get('discussion_idx'),
            status: state.global.get('status'),
            loading: state.app.get('loading'),
            accounts: state.global.get('accounts'),
            username: state.user.getIn(['current', 'username']) || state.offchain.get('account'),
            blogmode: state.app.getIn(['user_preferences', 'blogmode']),
            sortOrder: ownProps.params.order,
            topic: ownProps.params.category,
            categories: state.global.getIn(['tag_idx', 'trending']).take(50),
            pinned: state.offchain.get('pinned_posts'),
            maybeLoggedIn: state.user.get('maybeLoggedIn'),
            isBrowser: process.env.BROWSER,
            notices: state.offchain.get('pinned_posts').get('notices').toJS(),
            shouldSeeAds: state.app.getIn(['googleAds', 'shouldSeeAds']),
            adSlots: state.app.getIn(['googleAds', 'adSlots']).toJS()
        };
    }, function (dispatch) {
        return {
            requestData: function requestData(args) {
                return dispatch(_FetchDataSaga.actions.requestData(args));
            }
        };
    })(PostsIndex)
};
//# sourceMappingURL=PostsIndex.js.map