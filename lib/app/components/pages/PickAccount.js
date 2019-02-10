'use strict';

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
/*global $STM_csrf, $STM_Config */


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = require('react-redux');

var _reactRouter = require('react-router');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _steemJs = require('@steemit/steem-js');

var _UserReducer = require('app/redux/UserReducer');

var userActions = _interopRequireWildcard(_UserReducer);

var _ChainValidation = require('app/utils/ChainValidation');

var _BrowserTests = require('app/utils/BrowserTests');

var _BrowserTests2 = _interopRequireDefault(_BrowserTests);

var _constants = require('shared/constants');

var _Links = require('app/utils/Links');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PickAccount = (_temp = _class = function (_React$Component) {
    (0, _inherits3.default)(PickAccount, _React$Component);

    function PickAccount(props) {
        (0, _classCallCheck3.default)(this, PickAccount);

        var _this = (0, _possibleConstructorReturn3.default)(this, (PickAccount.__proto__ || (0, _getPrototypeOf2.default)(PickAccount)).call(this, props));

        _this.state = {
            name: '',
            password: '',
            password_valid: '',
            name_error: '',
            server_error: '',
            loading: false,
            cryptographyFailure: false,
            showRules: false,
            subheader_hidden: true
        };
        _this.onSubmit = _this.onSubmit.bind(_this);
        _this.onNameChange = _this.onNameChange.bind(_this);
        _this.onPasswordChange = _this.onPasswordChange.bind(_this);
        return _this;
    }

    (0, _createClass3.default)(PickAccount, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var cryptoTestResult = (0, _BrowserTests2.default)();
            if (cryptoTestResult !== undefined) {
                console.error('CreateAccount - cryptoTestResult: ', cryptoTestResult);
                this.setState({ cryptographyFailure: true }); // TODO: do not use setState in componentDidMount
            }
        }
    }, {
        key: 'onSubmit',
        value: function onSubmit(e) {
            e.preventDefault();
            this.setState({ server_error: '', loading: true });
            var name = this.state.name;

            if (!name) return;
            var params = { account: name };
            if (this.props.viewMode) {
                params[_constants.PARAM_VIEW_MODE] = this.props.viewMode;
            }
            window.location = '/enter_email' + (0, _Links.makeParams)(params);
        }
    }, {
        key: 'onPasswordChange',
        value: function onPasswordChange(password, password_valid) {
            this.setState({ password: password, password_valid: password_valid });
        }
    }, {
        key: 'onNameChange',
        value: function onNameChange(e) {
            var name = e.target.value.trim().toLowerCase();
            this.validateAccountName(name);
            this.setState({ name: name });
        }
    }, {
        key: 'validateAccountName',
        value: function validateAccountName(name) {
            var _this2 = this;

            var name_error = '';
            var promise = void 0;
            if (name.length > 0) {
                name_error = (0, _ChainValidation.validate_account_name)(name);
                if (!name_error) {
                    this.setState({ name_error: '' });
                    promise = _steemJs.api.getAccountsAsync([name]).then(function (res) {
                        return res && res.length > 0 ? 'Account name is not available' : '';
                    });
                }
            }
            if (promise) {
                promise.then(function (name_error) {
                    return _this2.setState({ name_error: name_error });
                }).catch(function () {
                    return _this2.setState({
                        name_error: "Account name can't be verified right now due to server failure. Please try again later."
                    });
                });
            } else {
                this.setState({ name_error: name_error });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            if (!process.env.BROWSER) {
                // don't render this page on the server
                return _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                        'div',
                        { className: 'column' },
                        _react2.default.createElement(
                            'p',
                            { className: 'text-center' },
                            'LOADING..'
                        )
                    )
                );
            }

            var _state = this.state,
                name = _state.name,
                name_error = _state.name_error,
                server_error = _state.server_error,
                loading = _state.loading,
                cryptographyFailure = _state.cryptographyFailure;
            var _props = this.props,
                loggedIn = _props.loggedIn,
                logout = _props.logout,
                offchainUser = _props.offchainUser,
                serverBusy = _props.serverBusy;

            var submit_btn_disabled = loading || !name || name_error;
            var submit_btn_class = (0, _classnames2.default)('button action', {
                disabled: submit_btn_disabled
            });
            var account_status = offchainUser ? offchainUser.get('account_status') : null;

            if (serverBusy || $STM_Config.disable_signups) {
                return _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                        'div',
                        { className: 'column' },
                        _react2.default.createElement(
                            'div',
                            { className: 'callout alert' },
                            _react2.default.createElement(
                                'p',
                                null,
                                'The creation of new accounts is temporarily disabled.'
                            )
                        )
                    )
                );
            }
            if (cryptographyFailure) {
                return _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                        'div',
                        { className: 'column' },
                        _react2.default.createElement(
                            'div',
                            { className: 'callout alert' },
                            _react2.default.createElement(
                                'h4',
                                null,
                                'Browser Out of Date'
                            ),
                            _react2.default.createElement(
                                'p',
                                null,
                                'We will be unable to create your Steem account with this browser.'
                            ),
                            _react2.default.createElement(
                                'p',
                                null,
                                'The latest versions of',
                                ' ',
                                _react2.default.createElement(
                                    'a',
                                    { href: 'https://www.google.com/chrome/' },
                                    'Chrome'
                                ),
                                ' ',
                                'and',
                                ' ',
                                _react2.default.createElement(
                                    'a',
                                    { href: 'https://www.mozilla.org/en-US/firefox/new/' },
                                    'Firefox'
                                ),
                                'are well-tested and known to work well with steemit.com.'
                            )
                        )
                    )
                );
            }

            if (loggedIn) {
                return _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                        'div',
                        { className: 'column' },
                        _react2.default.createElement(
                            'div',
                            { className: 'callout alert' },
                            _react2.default.createElement(
                                'p',
                                null,
                                'You need to',
                                ' ',
                                _react2.default.createElement(
                                    'a',
                                    { href: '#', onClick: logout },
                                    'Logout'
                                ),
                                ' ',
                                'before you can create an additional account.'
                            ),
                            _react2.default.createElement(
                                'p',
                                null,
                                'Please note that Steemit can only register one account per verified user.'
                            )
                        )
                    )
                );
            }

            if (account_status === 'waiting') {
                return _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                        'div',
                        { className: 'column' },
                        _react2.default.createElement('br', null),
                        _react2.default.createElement(
                            'div',
                            { className: 'callout alert' },
                            _react2.default.createElement(
                                'p',
                                null,
                                'Your sign up request is being processed and you will receive an email from us when it is ready.'
                            ),
                            _react2.default.createElement(
                                'p',
                                null,
                                'Signup requests can take up to 7 days to be processed, but usually complete in a day or two.'
                            )
                        )
                    )
                );
            }

            if (account_status === 'approved') {
                return _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                        'div',
                        { className: 'column' },
                        _react2.default.createElement('br', null),
                        _react2.default.createElement(
                            'div',
                            { className: 'callout success' },
                            _react2.default.createElement(
                                'p',
                                null,
                                'Congratulations! Your sign up request has been approved.'
                            ),
                            _react2.default.createElement(
                                'p',
                                null,
                                _react2.default.createElement(
                                    _reactRouter.Link,
                                    { to: '/create_account' },
                                    'Let\'s get your account created!'
                                )
                            )
                        )
                    )
                );
            }

            // const existingUserAccount = offchainUser.get('account');
            // if (existingUserAccount) {
            //     return <div className="row">
            //         <div className="column">
            //             <div className="callout alert">
            //                 <p>Our records indicate that you already have steem account: <strong>{existingUserAccount}</strong></p>
            //                 <p>In order to prevent abuse Steemit can only register one account per verified user.</p>
            //                 <p>You can either <a href="/login.html">login</a> to your existing account
            //                     or <a href="mailto:support@steemit.com">send us email</a> if you need a new account.</p>
            //             </div>
            //         </div>
            //     </div>;
            // }

            var next_step = null;
            if (server_error) {
                if (server_error === 'Email address is not confirmed') {
                    next_step = _react2.default.createElement(
                        'div',
                        { className: 'callout alert' },
                        _react2.default.createElement(
                            'a',
                            { href: '/enter_email' },
                            'Please verify your email address'
                        )
                    );
                } else if (server_error === 'Phone number is not confirmed') {
                    next_step = _react2.default.createElement(
                        'div',
                        { className: 'callout alert' },
                        _react2.default.createElement(
                            'a',
                            { href: '/enter_mobile' },
                            'Please verify your phone number'
                        )
                    );
                } else {
                    next_step = _react2.default.createElement(
                        'div',
                        { className: 'callout alert' },
                        _react2.default.createElement(
                            'h5',
                            null,
                            'Couldn\'t create account. The server returned the following error:'
                        ),
                        _react2.default.createElement(
                            'p',
                            null,
                            server_error
                        )
                    );
                }
            }

            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'div',
                    { className: 'CreateAccount row' },
                    _react2.default.createElement(
                        'div',
                        {
                            className: 'column',
                            style: { maxWidth: '36rem', margin: '0 auto' }
                        },
                        _react2.default.createElement('br', null),
                        _react2.default.createElement(
                            'div',
                            { className: 'progress' },
                            _react2.default.createElement('div', { style: { width: '10%' } })
                        ),
                        _react2.default.createElement('br', null),
                        _react2.default.createElement(
                            'h4',
                            { className: 'CreateAccount__title' },
                            'Welcome to Steemit'
                        ),
                        _react2.default.createElement(
                            'div',
                            null,
                            _react2.default.createElement(
                                'p',
                                null,
                                'Your account name is how you will be known on steemit.com.',
                                _react2.default.createElement('br', null)
                            )
                        ),
                        _react2.default.createElement(
                            'form',
                            {
                                onSubmit: this.onSubmit,
                                autoComplete: 'off',
                                noValidate: true,
                                method: 'post'
                            },
                            _react2.default.createElement(
                                'div',
                                { className: name_error ? 'error' : '' },
                                _react2.default.createElement(
                                    'label',
                                    null,
                                    'ACCOUNT NAME'
                                ),
                                _react2.default.createElement('input', {
                                    type: 'text',
                                    name: 'name',
                                    autoComplete: 'off',
                                    onChange: this.onNameChange,
                                    value: name,
                                    placeholder: 'Name...'
                                }),
                                _react2.default.createElement(
                                    'p',
                                    null,
                                    name_error
                                )
                            ),
                            _react2.default.createElement('input', {
                                disabled: submit_btn_disabled,
                                type: 'submit',
                                className: submit_btn_class,
                                value: 'Continue'
                            })
                        ),
                        _react2.default.createElement('br', null),
                        _react2.default.createElement(
                            'p',
                            { className: 'secondary whistle-hidden' },
                            'Got an account? ',
                            _react2.default.createElement(
                                _reactRouter.Link,
                                { to: '/login.html' },
                                'Login'
                            )
                        )
                    )
                )
            );
        }
    }]);
    return PickAccount;
}(_react2.default.Component), _class.propTypes = {
    loginUser: _propTypes2.default.func.isRequired,
    serverBusy: _propTypes2.default.bool
}, _temp);


module.exports = {
    path: 'pick_account',
    component: (0, _reactRedux.connect)(function (state) {
        return {
            viewMode: state.app.get('viewMode'),
            loggedIn: !!state.user.get('current'),
            offchainUser: state.offchain.get('user'),
            serverBusy: state.offchain.get('serverBusy')
        };
    }, function (dispatch) {
        return {
            loginUser: function loginUser(username, password) {
                return dispatch(userActions.usernamePasswordLogin({
                    username: username,
                    password: password,
                    saveLogin: true
                }));
            },
            logout: function logout(e) {
                if (e) e.preventDefault();
                dispatch(userActions.logout({ type: 'account_choose' }));
            }
        };
    })(PickAccount)
};
//# sourceMappingURL=PickAccount.js.map