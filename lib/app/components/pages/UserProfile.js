'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _reactRedux = require('react-redux');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _GlobalReducer = require('app/redux/GlobalReducer');

var globalActions = _interopRequireWildcard(_GlobalReducer);

var _TransactionReducer = require('app/redux/TransactionReducer');

var transactionActions = _interopRequireWildcard(_TransactionReducer);

var _UserReducer = require('app/redux/UserReducer');

var userActions = _interopRequireWildcard(_UserReducer);

var _FetchDataSaga = require('app/redux/FetchDataSaga');

var _Icon = require('app/components/elements/Icon');

var _Icon2 = _interopRequireDefault(_Icon);

var _UserKeys = require('app/components/elements/UserKeys');

var _UserKeys2 = _interopRequireDefault(_UserKeys);

var _PasswordReset = require('app/components/elements/PasswordReset');

var _PasswordReset2 = _interopRequireDefault(_PasswordReset);

var _UserWallet = require('app/components/modules/UserWallet');

var _UserWallet2 = _interopRequireDefault(_UserWallet);

var _Settings = require('app/components/modules/Settings');

var _Settings2 = _interopRequireDefault(_Settings);

var _CurationRewards = require('app/components/modules/CurationRewards');

var _CurationRewards2 = _interopRequireDefault(_CurationRewards);

var _AuthorRewards = require('app/components/modules/AuthorRewards');

var _AuthorRewards2 = _interopRequireDefault(_AuthorRewards);

var _UserList = require('app/components/elements/UserList');

var _UserList2 = _interopRequireDefault(_UserList);

var _Follow = require('app/components/elements/Follow');

var _Follow2 = _interopRequireDefault(_Follow);

var _LoadingIndicator = require('app/components/elements/LoadingIndicator');

var _LoadingIndicator2 = _interopRequireDefault(_LoadingIndicator);

var _PostsList = require('app/components/cards/PostsList');

var _PostsList2 = _interopRequireDefault(_PostsList);

var _StateFunctions = require('app/utils/StateFunctions');

var _ParsersAndFormatters = require('app/utils/ParsersAndFormatters.js');

var _Tooltip = require('app/components/elements/Tooltip');

var _Tooltip2 = _interopRequireDefault(_Tooltip);

var _DateJoinWrapper = require('app/components/elements/DateJoinWrapper');

var _DateJoinWrapper2 = _interopRequireDefault(_DateJoinWrapper);

var _counterpart = require('counterpart');

var _counterpart2 = _interopRequireDefault(_counterpart);

var _immutable = require('immutable');

var _WalletSubMenu = require('app/components/elements/WalletSubMenu');

var _WalletSubMenu2 = _interopRequireDefault(_WalletSubMenu);

var _Userpic = require('app/components/elements/Userpic');

var _Userpic2 = _interopRequireDefault(_Userpic);

var _Callout = require('app/components/elements/Callout');

var _Callout2 = _interopRequireDefault(_Callout);

var _NormalizeProfile = require('app/utils/NormalizeProfile');

var _NormalizeProfile2 = _interopRequireDefault(_NormalizeProfile);

var _userIllegalContent = require('app/utils/userIllegalContent');

var _userIllegalContent2 = _interopRequireDefault(_userIllegalContent);

var _ProxifyUrl = require('app/utils/ProxifyUrl');

var _ProxifyUrl2 = _interopRequireDefault(_ProxifyUrl);

var _ArticleLayoutSelector = require('app/components/modules/ArticleLayoutSelector');

var _ArticleLayoutSelector2 = _interopRequireDefault(_ArticleLayoutSelector);

var _SanitizedLink = require('app/components/elements/SanitizedLink');

var _SanitizedLink2 = _interopRequireDefault(_SanitizedLink);

var _DropdownMenu = require('app/components/elements/DropdownMenu');

var _DropdownMenu2 = _interopRequireDefault(_DropdownMenu);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UserProfile = function (_React$Component) {
    (0, _inherits3.default)(UserProfile, _React$Component);

    function UserProfile() {
        (0, _classCallCheck3.default)(this, UserProfile);

        var _this = (0, _possibleConstructorReturn3.default)(this, (UserProfile.__proto__ || (0, _getPrototypeOf2.default)(UserProfile)).call(this));

        _this.toggleShowResteem = function (e) {
            e.preventDefault();
            var newShowResteem = !_this.state.showResteem;
            _this.setState({ showResteem: newShowResteem });
        };

        _this.state = { showResteem: true };
        _this.onPrint = function () {
            window.print();
        };
        _this.loadMore = _this.loadMore.bind(_this);
        return _this;
    }

    (0, _createClass3.default)(UserProfile, [{
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(np, ns) {
            var _props = this.props,
                follow = _props.follow,
                follow_count = _props.follow_count,
                account = _props.account,
                accountname = _props.accountname;


            var followersLoading = false,
                npFollowersLoading = false;
            var followingLoading = false,
                npFollowingLoading = false;

            if (follow) {
                followersLoading = follow.getIn(['getFollowersAsync', accountname, 'blog_loading'], false);
                followingLoading = follow.getIn(['getFollowingAsync', accountname, 'blog_loading'], false);
            }
            if (np.follow) {
                npFollowersLoading = np.follow.getIn(['getFollowersAsync', accountname, 'blog_loading'], false);
                npFollowingLoading = np.follow.getIn(['getFollowingAsync', accountname, 'blog_loading'], false);
            }

            return np.current_user !== this.props.current_user || np.account !== this.props.account || np.wifShown !== this.props.wifShown || np.global_status !== this.props.global_status || npFollowersLoading !== followersLoading && !npFollowersLoading || npFollowingLoading !== followingLoading && !npFollowingLoading || np.loading !== this.props.loading || np.location.pathname !== this.props.location.pathname || np.follow_count !== this.props.follow_count || np.blogmode !== this.props.blogmode || ns.showResteem !== this.state.showResteem;
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.props.clearTransferDefaults();
            this.props.clearPowerdownDefaults();
        }
    }, {
        key: 'loadMore',
        value: function loadMore(last_post, category, showResteem) {
            var accountname = this.props.accountname;


            if (!last_post) return;

            var order = void 0;
            switch (category) {
                case 'feed':
                    order = 'by_feed';
                    break;
                case 'blog':
                    order = 'by_author';
                    break;
                case 'comments':
                    order = 'by_comments';
                    break;
                case 'recent_replies':
                    order = 'by_replies';
                    break;
                default:
                    console.log('unhandled category:', category);
            }

            if ((0, _StateFunctions.isFetchingOrRecentlyUpdated)(this.props.global_status, order, category)) {
                return;
            }

            var postFilter = showResteem ? null : function (value) {
                return value.author === accountname;
            };

            var _last_post$split = last_post.split('/'),
                _last_post$split2 = (0, _slicedToArray3.default)(_last_post$split, 2),
                author = _last_post$split2[0],
                permlink = _last_post$split2[1];

            this.props.requestData({
                author: author,
                permlink: permlink,
                order: order,
                category: category,
                accountname: accountname,
                postFilter: postFilter
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var showResteem = this.state.showResteem,
                _props2 = this.props,
                current_user = _props2.current_user,
                wifShown = _props2.wifShown,
                global_status = _props2.global_status,
                follow = _props2.follow,
                accountname = _props2.accountname,
                onPrint = this.onPrint;

            var username = current_user ? current_user.get('username') : null;

            var section = this.props.routeParams.section;

            if (!section) section = 'blog';

            // Loading status
            var status = global_status ? global_status.getIn([section, 'by_author']) : null;
            var fetching = status && status.fetching || this.props.loading;

            var account = void 0;
            var accountImm = this.props.account;
            if (accountImm) {
                account = accountImm.toJS();
            } else if (fetching) {
                return _react2.default.createElement(
                    'center',
                    null,
                    _react2.default.createElement(_LoadingIndicator2.default, { type: 'circle' })
                );
            } else {
                return _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement(
                        'center',
                        null,
                        (0, _counterpart2.default)('user_profile.unknown_account')
                    )
                );
            }
            var followers = follow && follow.getIn(['getFollowersAsync', accountname]);
            var following = follow && follow.getIn(['getFollowingAsync', accountname]);

            // instantiate following items
            var totalCounts = this.props.follow_count;
            var followerCount = 0;
            var followingCount = 0;

            if (totalCounts && accountname) {
                totalCounts = totalCounts.get(accountname);
                if (totalCounts) {
                    totalCounts = totalCounts.toJS();
                    followerCount = totalCounts.follower_count;
                    followingCount = totalCounts.following_count;
                }
            }

            var rep = (0, _ParsersAndFormatters.repLog10)(account.reputation);

            var isMyAccount = username === account.name;
            var tab_content = null;

            var rewardsClass = '',
                walletClass = '';
            if (section === 'transfers') {
                walletClass = 'active';
                tab_content = _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement(_UserWallet2.default, {
                        account: accountImm,
                        showTransfer: this.props.showTransfer,
                        showPowerdown: this.props.showPowerdown,
                        current_user: current_user,
                        withdrawVesting: this.props.withdrawVesting
                    })
                );
            } else if (section === 'curation-rewards') {
                rewardsClass = 'active';
                tab_content = _react2.default.createElement(_CurationRewards2.default, { account: account });
            } else if (section === 'author-rewards') {
                rewardsClass = 'active';
                tab_content = _react2.default.createElement(_AuthorRewards2.default, { account: account });
            } else if (section === 'followers') {
                if (followers && followers.has('blog_result')) {
                    tab_content = _react2.default.createElement(
                        'div',
                        null,
                        _react2.default.createElement(_UserList2.default, {
                            title: (0, _counterpart2.default)('user_profile.followers'),
                            account: account,
                            users: followers.get('blog_result')
                        })
                    );
                }
            } else if (section === 'followed') {
                if (following && following.has('blog_result')) {
                    tab_content = _react2.default.createElement(_UserList2.default, {
                        title: 'Followed',
                        account: account,
                        users: following.get('blog_result')
                    });
                }
            } else if (section === 'settings') {
                tab_content = _react2.default.createElement(_Settings2.default, { routeParams: this.props.routeParams });
            } else if (section === 'comments') {
                if (account.comments) {
                    var posts = accountImm.get('comments');
                    if (!fetching && posts && !posts.size) {
                        tab_content = _react2.default.createElement(
                            _Callout2.default,
                            null,
                            (0, _counterpart2.default)('user_profile.user_hasnt_made_any_posts_yet', {
                                name: accountname
                            })
                        );
                    } else {
                        tab_content = _react2.default.createElement(_PostsList2.default, {
                            posts: posts,
                            loading: fetching,
                            category: 'comments',
                            loadMore: this.loadMore,
                            showPinned: false,
                            showSpam: true
                        });
                    }
                } else {
                    tab_content = _react2.default.createElement(
                        'center',
                        null,
                        _react2.default.createElement(_LoadingIndicator2.default, { type: 'circle' })
                    );
                }
            } else if (!section || section === 'blog') {
                if (account.blog) {
                    var _posts = accountImm.get('blog');
                    var emptyText = isMyAccount ? _react2.default.createElement(
                        'div',
                        null,
                        (0, _counterpart2.default)('user_profile.looks_like_you_havent_posted_anything_yet'),
                        _react2.default.createElement('br', null),
                        _react2.default.createElement('br', null),
                        _react2.default.createElement(
                            _reactRouter.Link,
                            { to: '/submit.html' },
                            (0, _counterpart2.default)('user_profile.create_a_post')
                        ),
                        _react2.default.createElement('br', null),
                        _react2.default.createElement(
                            _reactRouter.Link,
                            { to: '/trending' },
                            (0, _counterpart2.default)('user_profile.explore_trending_articles')
                        ),
                        _react2.default.createElement('br', null),
                        _react2.default.createElement(
                            _reactRouter.Link,
                            { to: '/welcome' },
                            (0, _counterpart2.default)('user_profile.read_the_quick_start_guide')
                        ),
                        _react2.default.createElement('br', null),
                        _react2.default.createElement(
                            _reactRouter.Link,
                            { to: '/faq.html' },
                            (0, _counterpart2.default)('user_profile.browse_the_faq')
                        ),
                        _react2.default.createElement('br', null)
                    ) : (0, _counterpart2.default)('user_profile.user_hasnt_started_bloggin_yet', {
                        name: accountname
                    });

                    if (!fetching && _posts && !_posts.size) {
                        tab_content = _react2.default.createElement(
                            _Callout2.default,
                            null,
                            emptyText
                        );
                    } else {
                        tab_content = _react2.default.createElement(
                            'div',
                            null,
                            _react2.default.createElement(
                                'a',
                                { href: '#', onClick: this.toggleShowResteem },
                                showResteem ? (0, _counterpart2.default)('user_profile.hide_resteems') : (0, _counterpart2.default)('user_profile.show_all')
                            ),
                            _react2.default.createElement(_PostsList2.default, {
                                account: account.name,
                                posts: _posts,
                                loading: fetching,
                                category: 'blog',
                                loadMore: this.loadMore,
                                showPinned: false,
                                showResteem: showResteem,
                                showSpam: true
                            })
                        );
                    }
                } else {
                    tab_content = _react2.default.createElement(
                        'center',
                        null,
                        _react2.default.createElement(_LoadingIndicator2.default, { type: 'circle' })
                    );
                }
            } else if (section === 'recent-replies') {
                if (account.recent_replies) {
                    var _posts2 = accountImm.get('recent_replies');
                    if (!fetching && _posts2 && !_posts2.size) {
                        tab_content = _react2.default.createElement(
                            _Callout2.default,
                            null,
                            (0, _counterpart2.default)('user_profile.user_hasnt_had_any_replies_yet', {
                                name: accountname
                            }) + '.'
                        );
                    } else {
                        tab_content = _react2.default.createElement(
                            'div',
                            null,
                            _react2.default.createElement(_PostsList2.default, {
                                posts: _posts2,
                                loading: fetching,
                                category: 'recent_replies',
                                loadMore: this.loadMore,
                                showPinned: false,
                                showSpam: false
                            })
                        );
                    }
                } else {
                    tab_content = _react2.default.createElement(
                        'center',
                        null,
                        _react2.default.createElement(_LoadingIndicator2.default, { type: 'circle' })
                    );
                }
            } else if (section === 'permissions' && isMyAccount) {
                walletClass = 'active';
                tab_content = _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement(
                        'div',
                        { className: 'row' },
                        _react2.default.createElement(
                            'div',
                            { className: 'column' },
                            _react2.default.createElement(_WalletSubMenu2.default, { account_name: account.name })
                        )
                    ),
                    _react2.default.createElement('br', null),
                    _react2.default.createElement(_UserKeys2.default, { account: accountImm })
                );
            } else if (section === 'password') {
                walletClass = 'active';
                tab_content = _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement(
                        'div',
                        { className: 'row' },
                        _react2.default.createElement(
                            'div',
                            { className: 'column' },
                            _react2.default.createElement(_WalletSubMenu2.default, { account_name: account.name })
                        )
                    ),
                    _react2.default.createElement('br', null),
                    _react2.default.createElement(_PasswordReset2.default, { account: accountImm })
                );
            } else {}
            //    console.log( "no matches" );


            // detect illegal users
            if (_userIllegalContent2.default.includes(accountname)) {
                tab_content = _react2.default.createElement(
                    'div',
                    null,
                    'Unavailable For Legal Reasons.'
                );
            }

            var page_title = '';
            // Page title

            if (isMyAccount) {
                if (section === 'blog') {
                    page_title = (0, _counterpart2.default)('g.my_blog');
                } else if (section === 'comments') {
                    page_title = (0, _counterpart2.default)('g.my_comments');
                } else if (section === 'recent-replies') {
                    page_title = (0, _counterpart2.default)('g.my_replies');
                } else if (section === 'settings') {
                    page_title = (0, _counterpart2.default)('g.settings');
                } else if (section === 'curation-rewards') {
                    page_title = (0, _counterpart2.default)('g.curation_rewards');
                } else if (section === 'author-rewards') {
                    page_title = (0, _counterpart2.default)('g.author_rewards');
                }
            } else {
                if (section === 'blog') {
                    page_title = (0, _counterpart2.default)('g.blog');
                } else if (section === 'comments') {
                    page_title = (0, _counterpart2.default)('g.comments');
                } else if (section === 'recent-replies') {
                    page_title = (0, _counterpart2.default)('g.replies');
                } else if (section === 'settings') {
                    page_title = (0, _counterpart2.default)('g.settings');
                } else if (section === 'curation-rewards') {
                    page_title = (0, _counterpart2.default)('g.curation_rewards');
                } else if (section === 'author-rewards') {
                    page_title = (0, _counterpart2.default)('g.author_rewards');
                }
            }

            var layoutClass = this.props.blogmode ? 'layout-block' : 'layout-list';

            var blog_header = _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'div',
                    { className: 'articles__header' },
                    _react2.default.createElement(
                        'div',
                        { className: 'articles__header-col' },
                        _react2.default.createElement(
                            'h1',
                            { className: 'articles__h1' },
                            page_title
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'articles__header-col articles__header-col--right' },
                        _react2.default.createElement(_ArticleLayoutSelector2.default, null)
                    )
                ),
                _react2.default.createElement('hr', { className: 'articles__hr' })
            );

            if (!(section === 'transfers' || section === 'permissions' || section === 'password')) {
                tab_content = _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                        'div',
                        {
                            className: (0, _classnames2.default)('UserProfile__tab_content', 'column', layoutClass, section)
                        },
                        _react2.default.createElement(
                            'article',
                            { className: 'articles' },
                            section === 'blog' || 'comments' ? blog_header : null,
                            tab_content
                        )
                    )
                );
            }

            var printLink = null;
            if (section === 'permissions') {
                if (isMyAccount && wifShown) {
                    printLink = _react2.default.createElement(
                        'div',
                        null,
                        _react2.default.createElement(
                            'a',
                            { className: 'float-right noPrint', onClick: onPrint },
                            _react2.default.createElement(_Icon2.default, { name: 'printer' }),
                            '\xA0',
                            (0, _counterpart2.default)('g.print'),
                            '\xA0\xA0'
                        )
                    );
                }
            }

            var rewardsMenu = [{
                link: '/@' + accountname + '/curation-rewards',
                label: (0, _counterpart2.default)('g.curation_rewards'),
                value: (0, _counterpart2.default)('g.curation_rewards')
            }, {
                link: '/@' + accountname + '/author-rewards',
                label: (0, _counterpart2.default)('g.author_rewards'),
                value: (0, _counterpart2.default)('g.author_rewards')
            }];

            var top_menu = _react2.default.createElement(
                'div',
                { className: 'row UserProfile__top-menu' },
                _react2.default.createElement(
                    'div',
                    { className: 'columns small-10 medium-12 medium-expand' },
                    _react2.default.createElement(
                        'ul',
                        { className: 'menu', style: { flexWrap: 'wrap' } },
                        _react2.default.createElement(
                            'li',
                            null,
                            _react2.default.createElement(
                                _reactRouter.Link,
                                {
                                    to: '/@' + accountname,
                                    activeClassName: 'active'
                                },
                                (0, _counterpart2.default)('g.blog')
                            )
                        ),
                        _react2.default.createElement(
                            'li',
                            null,
                            _react2.default.createElement(
                                _reactRouter.Link,
                                {
                                    to: '/@' + accountname + '/comments',
                                    activeClassName: 'active'
                                },
                                (0, _counterpart2.default)('g.comments')
                            )
                        ),
                        _react2.default.createElement(
                            'li',
                            null,
                            _react2.default.createElement(
                                _reactRouter.Link,
                                {
                                    to: '/@' + accountname + '/recent-replies',
                                    activeClassName: 'active'
                                },
                                (0, _counterpart2.default)('g.replies')
                            )
                        ),
                        _react2.default.createElement(_DropdownMenu2.default, {
                            className: rewardsClass,
                            items: rewardsMenu,
                            el: 'li',
                            selected: (0, _counterpart2.default)('g.rewards'),
                            position: 'right'
                        })
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'columns shrink' },
                    _react2.default.createElement(
                        'ul',
                        { className: 'menu', style: { flexWrap: 'wrap' } },
                        _react2.default.createElement(
                            'li',
                            null,
                            _react2.default.createElement(
                                'a',
                                {
                                    href: '/@' + accountname + '/transfers',
                                    className: walletClass,
                                    onClick: function onClick(e) {
                                        e.preventDefault();
                                        _reactRouter.browserHistory.push(e.target.pathname);
                                        return false;
                                    }
                                },
                                (0, _counterpart2.default)('g.wallet')
                            )
                        ),
                        isMyAccount && _react2.default.createElement(
                            'li',
                            null,
                            _react2.default.createElement(
                                _reactRouter.Link,
                                {
                                    to: '/@' + accountname + '/settings',
                                    activeClassName: 'active'
                                },
                                (0, _counterpart2.default)('g.settings')
                            )
                        )
                    )
                )
            );

            var _normalizeProfile = (0, _NormalizeProfile2.default)(account),
                name = _normalizeProfile.name,
                location = _normalizeProfile.location,
                about = _normalizeProfile.about,
                website = _normalizeProfile.website,
                cover_image = _normalizeProfile.cover_image;

            var website_label = website ? website.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '') : null;

            var cover_image_style = {};
            if (cover_image) {
                cover_image_style = {
                    backgroundImage: 'url(' + (0, _ProxifyUrl2.default)(cover_image, '2048x512') + ')'
                };
            }

            return _react2.default.createElement(
                'div',
                { className: 'UserProfile' },
                _react2.default.createElement(
                    'div',
                    { className: 'UserProfile__banner row expanded' },
                    _react2.default.createElement(
                        'div',
                        { className: 'column', style: cover_image_style },
                        _react2.default.createElement(
                            'div',
                            { style: { position: 'relative' } },
                            _react2.default.createElement(
                                'div',
                                { className: 'UserProfile__buttons hide-for-small-only' },
                                _react2.default.createElement(_Follow2.default, {
                                    follower: username,
                                    following: accountname
                                })
                            )
                        ),
                        _react2.default.createElement(
                            'h1',
                            null,
                            _react2.default.createElement(_Userpic2.default, { account: account.name, hideIfDefault: true }),
                            name || account.name,
                            ' ',
                            _react2.default.createElement(
                                _Tooltip2.default,
                                {
                                    t: (0, _counterpart2.default)('user_profile.this_is_users_reputations_score_it_is_based_on_history_of_votes', { name: accountname })
                                },
                                _react2.default.createElement(
                                    'span',
                                    { className: 'UserProfile__rep' },
                                    '(',
                                    rep,
                                    ')'
                                )
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            null,
                            about && _react2.default.createElement(
                                'p',
                                { className: 'UserProfile__bio' },
                                about
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'UserProfile__stats' },
                                _react2.default.createElement(
                                    'span',
                                    null,
                                    _react2.default.createElement(
                                        _reactRouter.Link,
                                        { to: '/@' + accountname + '/followers' },
                                        (0, _counterpart2.default)('user_profile.follower_count', {
                                            count: followerCount
                                        })
                                    )
                                ),
                                _react2.default.createElement(
                                    'span',
                                    null,
                                    _react2.default.createElement(
                                        _reactRouter.Link,
                                        { to: '/@' + accountname },
                                        (0, _counterpart2.default)('user_profile.post_count', {
                                            count: account.post_count || 0
                                        })
                                    )
                                ),
                                _react2.default.createElement(
                                    'span',
                                    null,
                                    _react2.default.createElement(
                                        _reactRouter.Link,
                                        { to: '/@' + accountname + '/followed' },
                                        (0, _counterpart2.default)('user_profile.followed_count', {
                                            count: followingCount
                                        })
                                    )
                                )
                            ),
                            _react2.default.createElement(
                                'p',
                                { className: 'UserProfile__info' },
                                location && _react2.default.createElement(
                                    'span',
                                    null,
                                    _react2.default.createElement(_Icon2.default, { name: 'location' }),
                                    ' ',
                                    location
                                ),
                                website && _react2.default.createElement(
                                    'span',
                                    null,
                                    _react2.default.createElement(_Icon2.default, { name: 'link' }),
                                    ' ',
                                    _react2.default.createElement(_SanitizedLink2.default, {
                                        url: website,
                                        text: website_label
                                    })
                                ),
                                _react2.default.createElement(_Icon2.default, { name: 'calendar' }),
                                ' ',
                                _react2.default.createElement(_DateJoinWrapper2.default, { date: account.created })
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'UserProfile__buttons_mobile show-for-small-only' },
                            _react2.default.createElement(_Follow2.default, {
                                follower: username,
                                following: accountname,
                                what: 'blog'
                            })
                        )
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'UserProfile__top-nav row expanded noPrint' },
                    top_menu
                ),
                _react2.default.createElement(
                    'div',
                    null,
                    printLink
                ),
                _react2.default.createElement(
                    'div',
                    null,
                    tab_content
                )
            );
        }
    }]);
    return UserProfile;
}(_react2.default.Component); /* eslint react/prop-types: 0 */


exports.default = UserProfile;


module.exports = {
    path: '@:accountname(/:section)',
    component: (0, _reactRedux.connect)(function (state, ownProps) {
        var wifShown = state.global.get('UserKeys_wifShown');
        var current_user = state.user.get('current');
        var accountname = ownProps.routeParams.accountname.toLowerCase();

        return {
            discussions: state.global.get('discussion_idx'),
            current_user: current_user,
            wifShown: wifShown,
            loading: state.app.get('loading'),
            global_status: state.global.get('status'),
            accountname: accountname,
            account: state.global.getIn(['accounts', accountname]),
            follow: state.global.get('follow'),
            follow_count: state.global.get('follow_count'),
            blogmode: state.app.getIn(['user_preferences', 'blogmode'])
        };
    }, function (dispatch) {
        return {
            login: function login() {
                dispatch(userActions.showLogin());
            },
            clearTransferDefaults: function clearTransferDefaults() {
                dispatch(userActions.clearTransferDefaults());
            },
            showTransfer: function showTransfer(transferDefaults) {
                dispatch(userActions.setTransferDefaults(transferDefaults));
                dispatch(userActions.showTransfer());
            },
            clearPowerdownDefaults: function clearPowerdownDefaults() {
                dispatch(userActions.clearPowerdownDefaults());
            },
            showPowerdown: function showPowerdown(powerdownDefaults) {
                console.log('power down defaults:', powerdownDefaults);
                dispatch(userActions.setPowerdownDefaults(powerdownDefaults));
                dispatch(userActions.showPowerdown());
            },
            withdrawVesting: function withdrawVesting(_ref) {
                var account = _ref.account,
                    vesting_shares = _ref.vesting_shares,
                    errorCallback = _ref.errorCallback,
                    successCallback = _ref.successCallback;

                var successCallbackWrapper = function successCallbackWrapper() {
                    dispatch(globalActions.getState({ url: '@' + account + '/transfers' }));
                    return successCallback.apply(undefined, arguments);
                };
                dispatch(transactionActions.broadcastOperation({
                    type: 'withdraw_vesting',
                    operation: { account: account, vesting_shares: vesting_shares },
                    errorCallback: errorCallback,
                    successCallback: successCallbackWrapper
                }));
            },
            requestData: function requestData(args) {
                return dispatch(_FetchDataSaga.actions.requestData(args));
            }
        };
    })(UserProfile)
};
//# sourceMappingURL=UserProfile.js.map