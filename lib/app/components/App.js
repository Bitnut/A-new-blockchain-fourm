'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

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

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = require('react-redux');

var _AppPropTypes = require('app/utils/AppPropTypes');

var _AppPropTypes2 = _interopRequireDefault(_AppPropTypes);

var _Header = require('app/components/modules/Header');

var _Header2 = _interopRequireDefault(_Header);

var _UserReducer = require('app/redux/UserReducer');

var userActions = _interopRequireWildcard(_UserReducer);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _ConnectedSidePanel = require('app/components/modules/ConnectedSidePanel');

var _ConnectedSidePanel2 = _interopRequireDefault(_ConnectedSidePanel);

var _CloseButton = require('app/components/elements/CloseButton');

var _CloseButton2 = _interopRequireDefault(_CloseButton);

var _Dialogs = require('app/components/modules/Dialogs');

var _Dialogs2 = _interopRequireDefault(_Dialogs);

var _Modals = require('app/components/modules/Modals');

var _Modals2 = _interopRequireDefault(_Modals);

var _WelcomePanel = require('app/components/elements/WelcomePanel');

var _WelcomePanel2 = _interopRequireDefault(_WelcomePanel);

var _MiniHeader = require('app/components/modules/MiniHeader');

var _MiniHeader2 = _interopRequireDefault(_MiniHeader);

var _counterpart = require('counterpart');

var _counterpart2 = _interopRequireDefault(_counterpart);

var _PageViewsCounter = require('app/components/elements/PageViewsCounter');

var _PageViewsCounter2 = _interopRequireDefault(_PageViewsCounter);

var _ServerApiClient = require('app/utils/ServerApiClient');

var _ecc = require('@steemit/steem-js/lib/auth/ecc');

var _ResolveRoute = require('app/ResolveRoute');

var _ResolveRoute2 = _interopRequireDefault(_ResolveRoute);

var _constants = require('shared/constants');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pageRequiresEntropy = function pageRequiresEntropy(path) {
    var _resolveRoute = (0, _ResolveRoute2.default)(path),
        page = _resolveRoute.page;

    var entropyPages = ['ChangePassword', 'RecoverAccountStep1', 'RecoverAccountStep2', 'UserProfile', 'CreateAccount'];
    /* Returns true if that page requires the entropy collection listener */
    return entropyPages.indexOf(page) !== -1;
};

var App = function (_React$Component) {
    (0, _inherits3.default)(App, _React$Component);

    function App(props) {
        (0, _classCallCheck3.default)(this, App);

        // TODO: put both of these and associated toggles into Redux Store.
        var _this = (0, _possibleConstructorReturn3.default)(this, (App.__proto__ || (0, _getPrototypeOf2.default)(App)).call(this, props));

        _this.setShowBannerFalse = function () {
            _this.setState({ showBanner: false });
        };

        _this.onEntropyEvent = function (e) {
            if (e.type === 'mousemove') _ecc.key_utils.addEntropy(e.pageX, e.pageY, e.screenX, e.screenY);else console.log('onEntropyEvent Unknown', e.type, e);
        };

        _this.signUp = function () {
            (0, _ServerApiClient.serverApiRecordEvent)('Sign up', 'Hero banner');
        };

        _this.learnMore = function () {
            (0, _ServerApiClient.serverApiRecordEvent)('Learn more', 'Hero banner');
        };

        _this.state = {
            showCallout: true,
            showBanner: true
        };
        _this.listenerActive = null;
        return _this;
    }

    (0, _createClass3.default)(App, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            if (process.env.BROWSER) localStorage.removeItem('autopost'); // July 14 '16 compromise, renamed to autopost2
            this.props.loginUser();
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            if (pageRequiresEntropy(this.props.pathname)) {
                this._addEntropyCollector();
            }
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(np) {
            // Add listener if the next page requires entropy and the current page didn't
            if (pageRequiresEntropy(np.pathname) && !pageRequiresEntropy(this.props.pathname)) {
                this._addEntropyCollector();
            } else if (!pageRequiresEntropy(np.pathname)) {
                // Remove if next page does not require entropy
                this._removeEntropyCollector();
            }
        }
    }, {
        key: '_addEntropyCollector',
        value: function _addEntropyCollector() {
            if (!this.listenerActive && this.refs.App_root) {
                this.refs.App_root.addEventListener('mousemove', this.onEntropyEvent, { capture: false, passive: true });
                this.listenerActive = true;
            }
        }
    }, {
        key: '_removeEntropyCollector',
        value: function _removeEntropyCollector() {
            if (this.listenerActive && this.refs.App_root) {
                this.refs.App_root.removeEventListener('mousemove', this.onEntropyEvent);
                this.listenerActive = null;
            }
        }
    }, {
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps, nextState) {
            var _props = this.props,
                pathname = _props.pathname,
                new_visitor = _props.new_visitor,
                nightmodeEnabled = _props.nightmodeEnabled,
                showAnnouncement = _props.showAnnouncement;

            var n = nextProps;
            return pathname !== n.pathname || new_visitor !== n.new_visitor || this.state.showBanner !== nextState.showBanner || this.state.showCallout !== nextState.showCallout || nightmodeEnabled !== n.nightmodeEnabled || showAnnouncement !== n.showAnnouncement;
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props2 = this.props,
                params = _props2.params,
                children = _props2.children,
                new_visitor = _props2.new_visitor,
                nightmodeEnabled = _props2.nightmodeEnabled,
                viewMode = _props2.viewMode,
                pathname = _props2.pathname,
                category = _props2.category,
                order = _props2.order;


            var miniHeader = pathname === '/create_account' || pathname === '/pick_account';

            var whistleView = viewMode === _constants.VIEW_MODE_WHISTLE;
            var headerHidden = whistleView;
            var params_keys = (0, _keys2.default)(params);
            var ip = pathname === '/' || params_keys.length === 2 && params_keys[0] === 'order' && params_keys[1] === 'category';
            var alert = this.props.error;
            var callout = null;
            if (this.state.showCallout && alert) {
                callout = _react2.default.createElement(
                    'div',
                    { className: 'App__announcement row' },
                    _react2.default.createElement(
                        'div',
                        { className: 'column' },
                        _react2.default.createElement(
                            'div',
                            { className: (0, _classnames2.default)('callout', { alert: alert }) },
                            _react2.default.createElement(_CloseButton2.default, {
                                onClick: function onClick() {
                                    return _this2.setState({ showCallout: false });
                                }
                            }),
                            _react2.default.createElement(
                                'p',
                                null,
                                alert
                            )
                        )
                    )
                );
            } else if (false && ip && this.state.showCallout) {
                callout = _react2.default.createElement(
                    'div',
                    { className: 'App__announcement row' },
                    _react2.default.createElement(
                        'div',
                        { className: 'column' },
                        _react2.default.createElement(
                            'div',
                            {
                                className: (0, _classnames2.default)('callout success', { alert: alert }, { warning: warning }, { success: success })
                            },
                            _react2.default.createElement(_CloseButton2.default, {
                                onClick: function onClick() {
                                    return _this2.setState({ showCallout: false });
                                }
                            }),
                            _react2.default.createElement(
                                'ul',
                                null,
                                _react2.default.createElement(
                                    'li',
                                    null,
                                    '/*',
                                    _react2.default.createElement(
                                        'a',
                                        { href: 'https://steemit.com/steemit/@steemitblog/steemit-com-is-now-open-source' },
                                        '...STORY TEXT...'
                                    ),
                                    '*/'
                                )
                            )
                        )
                    )
                );
            }
            if ($STM_Config.read_only_mode && this.state.showCallout) {
                callout = _react2.default.createElement(
                    'div',
                    { className: 'App__announcement row' },
                    _react2.default.createElement(
                        'div',
                        { className: 'column' },
                        _react2.default.createElement(
                            'div',
                            {
                                className: (0, _classnames2.default)('callout warning', { alert: alert }, { warning: warning }, { success: success })
                            },
                            _react2.default.createElement(_CloseButton2.default, {
                                onClick: function onClick() {
                                    return _this2.setState({ showCallout: false });
                                }
                            }),
                            _react2.default.createElement(
                                'p',
                                null,
                                (0, _counterpart2.default)('g.read_only_mode')
                            )
                        )
                    )
                );
            }

            var themeClass = nightmodeEnabled ? ' theme-dark' : ' theme-light';

            return _react2.default.createElement(
                'div',
                {
                    className: (0, _classnames2.default)('App', themeClass, {
                        'index-page': ip,
                        'mini-header': miniHeader,
                        'whistle-view': whistleView,
                        withAnnouncement: this.props.showAnnouncement
                    }),
                    ref: 'App_root'
                },
                _react2.default.createElement(_ConnectedSidePanel2.default, { alignment: 'right' }),
                headerHidden ? null : miniHeader ? _react2.default.createElement(_MiniHeader2.default, null) : _react2.default.createElement(_Header2.default, {
                    pathname: pathname,
                    category: category,
                    order: order
                }),
                _react2.default.createElement(
                    'div',
                    { className: 'App__content' },
                    process.env.BROWSER && ip && new_visitor && this.state.showBanner ? _react2.default.createElement(_WelcomePanel2.default, {
                        setShowBannerFalse: this.setShowBannerFalse
                    }) : null,
                    callout,
                    children
                ),
                _react2.default.createElement(_Dialogs2.default, null),
                _react2.default.createElement(_Modals2.default, null),
                _react2.default.createElement(_PageViewsCounter2.default, null)
            );
        }
    }]);
    return App;
}(_react2.default.Component);

App.propTypes = {
    error: _propTypes2.default.string,
    children: _AppPropTypes2.default.Children,
    pathname: _propTypes2.default.string,
    category: _propTypes2.default.string,
    order: _propTypes2.default.string,
    loginUser: _propTypes2.default.func.isRequired
};

exports.default = (0, _reactRedux.connect)(function (state, ownProps) {
    var current_user = state.user.get('current');
    var current_account_name = current_user ? current_user.get('username') : state.offchain.get('account');

    return {
        viewMode: state.app.get('viewMode'),
        error: state.app.get('error'),
        new_visitor: !state.user.get('current') && !state.offchain.get('user') && !state.offchain.get('account') && state.offchain.get('new_visit'),

        nightmodeEnabled: state.app.getIn(['user_preferences', 'nightmode']),
        pathname: ownProps.location.pathname,
        order: ownProps.params.order,
        category: ownProps.params.category,
        showAnnouncement: state.user.get('showAnnouncement')
    };
}, function (dispatch) {
    return {
        loginUser: function loginUser() {
            return dispatch(userActions.usernamePasswordLogin({}));
        }
    };
})(App);
//# sourceMappingURL=App.js.map