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

var _DropdownMenu = require('app/components/elements/DropdownMenu');

var _DropdownMenu2 = _interopRequireDefault(_DropdownMenu);

var _Icon = require('app/components/elements/Icon');

var _Icon2 = _interopRequireDefault(_Icon);

var _UserReducer = require('app/redux/UserReducer');

var userActions = _interopRequireWildcard(_UserReducer);

var _AppReducer = require('app/redux/AppReducer');

var appActions = _interopRequireWildcard(_AppReducer);

var _Userpic = require('app/components/elements/Userpic');

var _Userpic2 = _interopRequireDefault(_Userpic);

var _LoadingIndicator = require('app/components/elements/LoadingIndicator');

var _LoadingIndicator2 = _interopRequireDefault(_LoadingIndicator);

var _constants = require('shared/constants');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultNavigate = function defaultNavigate(e) {
    if (e.metaKey || e.ctrlKey) {
        // prevent breaking anchor tags
    } else {
        e.preventDefault();
    }
    var a = e.target.nodeName.toLowerCase() === 'a' ? e.target : e.target.parentNode;
    _reactRouter.browserHistory.push(a.pathname + a.search + a.hash);
};

function TopRightMenu(_ref) {
    var username = _ref.username,
        showLogin = _ref.showLogin,
        logout = _ref.logout,
        loggedIn = _ref.loggedIn,
        vertical = _ref.vertical,
        navigate = _ref.navigate,
        toggleOffCanvasMenu = _ref.toggleOffCanvasMenu,
        probablyLoggedIn = _ref.probablyLoggedIn,
        nightmodeEnabled = _ref.nightmodeEnabled,
        toggleNightmode = _ref.toggleNightmode,
        userPath = _ref.userPath;

    var mcn = 'menu' + (vertical ? ' vertical show-for-small-only' : '');
    var mcl = vertical ? '' : ' sub-menu';
    var lcn = vertical ? '' : 'show-for-medium';
    var nav = navigate || defaultNavigate;
    var submit_story = $STM_Config.read_only_mode ? null : _react2.default.createElement(
        'li',
        { className: lcn + ' submit-story' + (vertical ? ' last' : '') },
        _react2.default.createElement(
            'a',
            { href: '/submit.html', onClick: nav },
            (0, _counterpart2.default)('g.submit_a_story')
        )
    );
    var submit_icon = $STM_Config.read_only_mode ? null : _react2.default.createElement(
        'li',
        { className: 'show-for-small-only' },
        _react2.default.createElement(
            _reactRouter.Link,
            { to: '/submit.html' },
            _react2.default.createElement(_Icon2.default, { name: 'pencil2' })
        )
    );
    var feed_link = '/@' + username + '/feed';
    var replies_link = '/@' + username + '/recent-replies';
    var wallet_link = '/@' + username + '/transfers';
    var account_link = '/@' + username;
    var comments_link = '/@' + username + '/comments';
    var reset_password_link = '/@' + username + '/password';
    var settings_link = '/@' + username + '/settings';
    var pathCheck = userPath === '/submit.html' ? true : null;
    if (loggedIn) {
        // change back to if(username) after bug fix:  Clicking on Login does not cause drop-down to close #TEMP!
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
            'ul',
            { className: mcn + mcl },
            !pathCheck ? submit_story : null,
            !vertical && submit_icon,
            !vertical && _react2.default.createElement(
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
            toggleOffCanvasMenu && _react2.default.createElement(
                'li',
                { className: 'toggle-menu Header__hamburger' },
                _react2.default.createElement(
                    'a',
                    { href: '#', onClick: toggleOffCanvasMenu },
                    _react2.default.createElement('span', { className: 'hamburger' })
                )
            )
        );
    }
    if (probablyLoggedIn) {
        return _react2.default.createElement(
            'ul',
            { className: mcn + mcl },
            _react2.default.createElement(
                'li',
                { className: lcn, style: { paddingTop: 0, paddingBottom: 0 } },
                _react2.default.createElement(_LoadingIndicator2.default, { type: 'circle', inline: true })
            ),
            toggleOffCanvasMenu && _react2.default.createElement(
                'li',
                { className: 'toggle-menu Header__hamburger' },
                _react2.default.createElement(
                    'a',
                    { href: '#', onClick: toggleOffCanvasMenu },
                    _react2.default.createElement('span', { className: 'hamburger' })
                )
            )
        );
    }
    return _react2.default.createElement(
        'ul',
        { className: mcn + mcl },
        _react2.default.createElement(
            'li',
            { className: lcn },
            _react2.default.createElement(
                'a',
                { href: _constants.SIGNUP_URL },
                (0, _counterpart2.default)('g.sign_up')
            )
        ),
        _react2.default.createElement(
            'li',
            { className: lcn },
            _react2.default.createElement(
                'a',
                { href: '/login.html', onClick: showLogin },
                (0, _counterpart2.default)('g.login')
            )
        ),
        submit_story,
        !vertical && submit_icon,
        toggleOffCanvasMenu && _react2.default.createElement(
            'li',
            { className: 'toggle-menu Header__hamburger' },
            _react2.default.createElement(
                'a',
                { href: '#', onClick: toggleOffCanvasMenu },
                _react2.default.createElement('span', { className: 'hamburger' })
            )
        )
    );
}

TopRightMenu.propTypes = {
    username: _react2.default.PropTypes.string,
    loggedIn: _react2.default.PropTypes.bool,
    probablyLoggedIn: _react2.default.PropTypes.bool,
    showLogin: _react2.default.PropTypes.func.isRequired,
    logout: _react2.default.PropTypes.func.isRequired,
    vertical: _react2.default.PropTypes.bool,
    navigate: _react2.default.PropTypes.func,
    toggleOffCanvasMenu: _react2.default.PropTypes.func,
    nightmodeEnabled: _react2.default.PropTypes.bool,
    toggleNightmode: _react2.default.PropTypes.func
};

exports.default = (0, _reactRedux.connect)(function (state) {
    if (!process.env.BROWSER) {
        return {
            username: null,
            loggedIn: false,
            probablyLoggedIn: !!state.offchain.get('account')
        };
    }
    var userPath = state.routing.locationBeforeTransitions.pathname;
    var username = state.user.getIn(['current', 'username']);
    var loggedIn = !!username;
    return {
        username: username,
        loggedIn: loggedIn,
        userPath: userPath,
        probablyLoggedIn: false,
        nightmodeEnabled: state.user.getIn(['user_preferences', 'nightmode'])
    };
}, function (dispatch) {
    return {
        showLogin: function showLogin(e) {
            if (e) e.preventDefault();
            dispatch(userActions.showLogin());
        },
        logout: function logout(e) {
            if (e) e.preventDefault();
            dispatch(userActions.logout({ type: 'default' }));
        },
        toggleNightmode: function toggleNightmode(e) {
            if (e) e.preventDefault();
            dispatch(appActions.toggleNightmode());
        }
    };
})(TopRightMenu);
//# sourceMappingURL=TopRightMenu.js.map