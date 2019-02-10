'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports._Header_ = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var _reactRouter = require('react-router');

var _reactRedux = require('react-redux');

var _Icon = require('app/components/elements/Icon');

var _Icon2 = _interopRequireDefault(_Icon);

var _ResolveRoute = require('app/ResolveRoute');

var _ResolveRoute2 = _interopRequireDefault(_ResolveRoute);

var _counterpart = require('counterpart');

var _counterpart2 = _interopRequireDefault(_counterpart);

var _client_config = require('app/client_config');

var _SortOrder = require('app/components/elements/SortOrder');

var _SortOrder2 = _interopRequireDefault(_SortOrder);

var _SearchInput = require('app/components/elements/SearchInput');

var _SearchInput2 = _interopRequireDefault(_SearchInput);

var _IconButton = require('app/components/elements/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _DropdownMenu = require('app/components/elements/DropdownMenu');

var _DropdownMenu2 = _interopRequireDefault(_DropdownMenu);

var _UserReducer = require('app/redux/UserReducer');

var userActions = _interopRequireWildcard(_UserReducer);

var _AppReducer = require('app/redux/AppReducer');

var appActions = _interopRequireWildcard(_AppReducer);

var _Userpic = require('app/components/elements/Userpic');

var _Userpic2 = _interopRequireDefault(_Userpic);

var _constants = require('shared/constants');

var _SteemLogo = require('app/components/elements/SteemLogo');

var _SteemLogo2 = _interopRequireDefault(_SteemLogo);

var _NormalizeProfile = require('app/utils/NormalizeProfile');

var _NormalizeProfile2 = _interopRequireDefault(_NormalizeProfile);

var _Announcement = require('app/components/elements/Announcement');

var _Announcement2 = _interopRequireDefault(_Announcement);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Header = (_temp = _class = function (_React$Component) {
    (0, _inherits3.default)(Header, _React$Component);

    function Header() {
        (0, _classCallCheck3.default)(this, Header);
        return (0, _possibleConstructorReturn3.default)(this, (Header.__proto__ || (0, _getPrototypeOf2.default)(Header)).call(this));
    }

    // Conside refactor.
    // I think 'last sort order' is something available through react-router-redux history.
    // Therefore no need to store it in the window global like this.


    (0, _createClass3.default)(Header, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (nextProps.pathname !== this.props.pathname) {
                var route = (0, _ResolveRoute2.default)(nextProps.pathname);
                if (route && route.page === 'PostsIndex' && route.params && route.params.length > 0) {
                    var sort_order = route.params[0] !== 'home' ? route.params[0] : null;
                    if (sort_order) window.last_sort_order = this.last_sort_order = sort_order;
                }
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                category = _props.category,
                order = _props.order,
                pathname = _props.pathname,
                current_account_name = _props.current_account_name,
                username = _props.username,
                showLogin = _props.showLogin,
                logout = _props.logout,
                loggedIn = _props.loggedIn,
                vertical = _props.vertical,
                nightmodeEnabled = _props.nightmodeEnabled,
                toggleNightmode = _props.toggleNightmode,
                userPath = _props.userPath,
                showSidePanel = _props.showSidePanel,
                navigate = _props.navigate,
                account_meta = _props.account_meta;

            /*Set the document.title on each header render.*/

            var route = (0, _ResolveRoute2.default)(pathname);
            var home_account = false;
            var page_title = route.page;

            var sort_order = '';
            var topic = '';
            var page_name = null;
            if (route.page === 'PostsIndex') {
                sort_order = route.params[0];
                if (sort_order === 'home') {
                    page_title = (0, _counterpart2.default)('header_jsx.home');
                    var account_name = route.params[1];
                    if (current_account_name && account_name.indexOf(current_account_name) === 1) home_account = true;
                } else {
                    topic = route.params.length > 1 ? route.params[1] : '';
                    var type = route.params[0] == 'payout_comments' ? 'comments' : 'posts';
                    var prefix = route.params[0];
                    if (prefix == 'created') prefix = 'New';
                    if (prefix == 'payout') prefix = 'Pending payout';
                    if (prefix == 'payout_comments') prefix = 'Pending payout';
                    if (topic !== '') prefix += ' ' + topic;
                    page_title = prefix + ' ' + type;
                }
            } else if (route.page === 'Post') {
                sort_order = '';
                topic = route.params[0];
            } else if (route.page == 'SubmitPost') {
                page_title = (0, _counterpart2.default)('header_jsx.create_a_post');
            } else if (route.page == 'Privacy') {
                page_title = (0, _counterpart2.default)('navigation.privacy_policy');
            } else if (route.page == 'Tos') {
                page_title = (0, _counterpart2.default)('navigation.terms_of_service');
            } else if (route.page == 'ChangePassword') {
                page_title = (0, _counterpart2.default)('header_jsx.change_account_password');
            } else if (route.page == 'CreateAccount') {
                page_title = (0, _counterpart2.default)('header_jsx.create_account');
            } else if (route.page == 'PickAccount') {
                page_title = 'Pick Your New Steemit Account';
            } else if (route.page == 'Approval') {
                page_title = 'Account Confirmation';
            } else if (route.page == 'RecoverAccountStep1' || route.page == 'RecoverAccountStep2') {
                page_title = (0, _counterpart2.default)('header_jsx.stolen_account_recovery');
            } else if (route.page === 'UserProfile') {
                var user_name = route.params[0].slice(1);
                var name = account_meta ? (0, _NormalizeProfile2.default)(account_meta.toJS()).name : null;
                var user_title = name ? name + ' (@' + user_name + ')' : user_name;
                page_title = user_title;
                if (route.params[1] === 'followers') {
                    page_title = (0, _counterpart2.default)('header_jsx.people_following', {
                        username: user_title
                    });
                }
                if (route.params[1] === 'followed') {
                    page_title = (0, _counterpart2.default)('header_jsx.people_followed_by', {
                        username: user_title
                    });
                }
                if (route.params[1] === 'curation-rewards') {
                    page_title = (0, _counterpart2.default)('header_jsx.curation_rewards_by', {
                        username: user_title
                    });
                }
                if (route.params[1] === 'author-rewards') {
                    page_title = (0, _counterpart2.default)('header_jsx.author_rewards_by', {
                        username: user_title
                    });
                }
                if (route.params[1] === 'recent-replies') {
                    page_title = (0, _counterpart2.default)('header_jsx.replies_to', {
                        username: user_title
                    });
                }
                // @user/"posts" is deprecated in favor of "comments" as of oct-2016 (#443)
                if (route.params[1] === 'posts' || route.params[1] === 'comments') {
                    page_title = (0, _counterpart2.default)('header_jsx.comments_by', {
                        username: user_title
                    });
                }
            } else {
                page_name = ''; //page_title = route.page.replace( /([a-z])([A-Z])/g, '$1 $2' ).toLowerCase();
            }

            // Format first letter of all titles and lowercase user name
            if (route.page !== 'UserProfile') {
                page_title = page_title.charAt(0).toUpperCase() + page_title.slice(1);
            }

            if (process.env.BROWSER && route.page !== 'Post' && route.page !== 'PostNoCategory') document.title = page_title + ' — ' + _client_config.APP_NAME;

            var logo_link = (0, _ResolveRoute2.default)(pathname).params && (0, _ResolveRoute2.default)(pathname).params.length > 1 && this.last_sort_order ? '/' + this.last_sort_order : current_account_name ? '/@' + current_account_name + '/feed' : '/';

            //TopRightHeader Stuff
            var defaultNavigate = function defaultNavigate(e) {
                if (e.metaKey || e.ctrlKey) {
                    // prevent breaking anchor tags
                } else {
                    e.preventDefault();
                }
                var a = e.target.nodeName.toLowerCase() === 'a' ? e.target : e.target.parentNode;
                browserHistory.push(a.pathname + a.search + a.hash);
            };

            // Since navigate isn't set, defaultNavigate will always be used.
            var nav = navigate || defaultNavigate;

            var submit_story = $STM_Config.read_only_mode ? null : _react2.default.createElement(
                _reactRouter.Link,
                { to: '/submit.html' },
                _react2.default.createElement(_IconButton2.default, null)
            );

            var feed_link = '/@' + username + '/feed';
            var replies_link = '/@' + username + '/recent-replies';
            var wallet_link = '/@' + username + '/transfers';
            var account_link = '/@' + username;
            var comments_link = '/@' + username + '/comments';
            var reset_password_link = '/@' + username + '/password';
            var settings_link = '/@' + username + '/settings';
            var pathCheck = userPath === '/submit.html' ? true : null;

            var user_menu = [{
                link: feed_link,
                icon: 'home',
                value: (0, _counterpart2.default)('g.feed')
            }, { link: account_link, icon: 'profile', value: (0, _counterpart2.default)('g.blog') }, { link: comments_link, icon: 'replies', value: (0, _counterpart2.default)('g.comments') }, {
                link: replies_link,
                icon: 'reply',
                value: (0, _counterpart2.default)('g.replies')
            }, {
                link: wallet_link,
                icon: 'wallet',
                value: (0, _counterpart2.default)('g.wallet')
            }, {
                link: '#',
                icon: 'eye',
                onClick: toggleNightmode,
                value: (0, _counterpart2.default)('g.toggle_nightmode')
            }, {
                link: reset_password_link,
                icon: 'key',
                value: (0, _counterpart2.default)('g.change_password')
            }, { link: settings_link, icon: 'cog', value: (0, _counterpart2.default)('g.settings') }, loggedIn ? {
                link: '#',
                icon: 'enter',
                onClick: logout,
                value: (0, _counterpart2.default)('g.logout')
            } : { link: '#', onClick: showLogin, value: (0, _counterpart2.default)('g.login') }];
            return _react2.default.createElement(
                'header',
                { className: 'Header' },
                this.props.showAnnouncement && _react2.default.createElement(_Announcement2.default, { onClose: this.props.hideAnnouncement }),
                _react2.default.createElement(
                    'nav',
                    { className: 'row Header__nav' },
                    _react2.default.createElement(
                        'div',
                        { className: 'small-5 large-4 columns Header__logotype' },
                        _react2.default.createElement(
                            _reactRouter.Link,
                            { to: logo_link },
                            _react2.default.createElement(_SteemLogo2.default, null)
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'large-4 columns show-for-large large-centered Header__sort' },
                        _react2.default.createElement(_SortOrder2.default, {
                            sortOrder: order,
                            topic: category === 'feed' ? '' : category,
                            horizontal: true,
                            pathname: pathname
                        })
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'small-7 large-4 columns Header__buttons' },
                        !loggedIn && _react2.default.createElement(
                            'span',
                            { className: 'Header__user-signup show-for-medium' },
                            _react2.default.createElement(
                                'a',
                                {
                                    className: 'Header__login-link',
                                    href: '/login.html',
                                    onClick: showLogin
                                },
                                (0, _counterpart2.default)('g.login')
                            ),
                            _react2.default.createElement(
                                'a',
                                {
                                    className: 'Header__signup-link',
                                    href: _constants.SIGNUP_URL
                                },
                                (0, _counterpart2.default)('g.sign_up')
                            )
                        ),
                        _react2.default.createElement(
                            'span',
                            { className: 'Header__search--desktop' },
                            _react2.default.createElement(_SearchInput2.default, null)
                        ),
                        _react2.default.createElement(
                            'span',
                            { className: 'Header__search' },
                            _react2.default.createElement(
                                'a',
                                { href: '/static/search.html' },
                                _react2.default.createElement(_IconButton2.default, { icon: 'magnifyingGlass' })
                            )
                        ),
                        submit_story,
                        loggedIn && _react2.default.createElement(
                            _DropdownMenu2.default,
                            {
                                className: 'Header__usermenu',
                                items: user_menu,
                                title: username,
                                el: 'span',
                                selected: (0, _counterpart2.default)('g.rewards'),
                                position: 'left'
                            },
                            _react2.default.createElement(
                                'li',
                                { className: 'Header__userpic ' },
                                _react2.default.createElement(
                                    'span',
                                    { title: username },
                                    _react2.default.createElement(_Userpic2.default, { account: username })
                                )
                            )
                        ),
                        _react2.default.createElement(
                            'span',
                            {
                                onClick: showSidePanel,
                                className: 'toggle-menu Header__hamburger'
                            },
                            _react2.default.createElement('span', { className: 'hamburger' })
                        )
                    )
                )
            );
        }
    }]);
    return Header;
}(_react2.default.Component), _class.propTypes = {
    current_account_name: _propTypes2.default.string,
    account_meta: _propTypes2.default.object,
    category: _propTypes2.default.string,
    order: _propTypes2.default.string,
    pathname: _propTypes2.default.string
}, _temp);
exports._Header_ = Header;


var mapStateToProps = function mapStateToProps(state, ownProps) {
    // SSR code split.
    if (!process.env.BROWSER) {
        return {
            username: null,
            loggedIn: false
        };
    }

    var user_profile = void 0;
    var route = (0, _ResolveRoute2.default)(ownProps.pathname);
    if (route.page === 'UserProfile') {
        user_profile = state.global.getIn(['accounts', route.params[0].slice(1)]);
    }

    var userPath = state.routing.locationBeforeTransitions.pathname;
    var username = state.user.getIn(['current', 'username']);
    var loggedIn = !!username;
    var current_account_name = username ? username : state.offchain.get('account');

    return (0, _extends3.default)({
        username: username,
        loggedIn: loggedIn,
        userPath: userPath,
        nightmodeEnabled: state.user.getIn(['user_preferences', 'nightmode']),
        account_meta: user_profile,
        current_account_name: current_account_name,
        showAnnouncement: state.user.get('showAnnouncement')
    }, ownProps);
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
        showLogin: function showLogin(e) {
            if (e) e.preventDefault();
            dispatch(userActions.showLogin({ type: 'basic' }));
        },
        logout: function logout(e) {
            if (e) e.preventDefault();
            dispatch(userActions.logout({ type: 'default' }));
        },
        toggleNightmode: function toggleNightmode(e) {
            if (e) e.preventDefault();
            dispatch(appActions.toggleNightmode());
        },
        showSidePanel: function showSidePanel() {
            dispatch(userActions.showSidePanel());
        },
        hideSidePanel: function hideSidePanel() {
            dispatch(userActions.hideSidePanel());
        },
        hideAnnouncement: function hideAnnouncement() {
            return dispatch(userActions.hideAnnouncement());
        }
    };
};

var connectedHeader = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Header);

exports.default = connectedHeader;
//# sourceMappingURL=index.js.map