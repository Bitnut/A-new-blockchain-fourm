'use strict';

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

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

var _steemJs = require('@steemit/steem-js');

var _LoadingIndicator = require('app/components/elements/LoadingIndicator');

var _LoadingIndicator2 = _interopRequireDefault(_LoadingIndicator);

var _ecc = require('@steemit/steem-js/lib/auth/ecc');

var _UserReducer = require('app/redux/UserReducer');

var userActions = _interopRequireWildcard(_UserReducer);

var _ChainValidation = require('app/utils/ChainValidation');

var _BrowserTests = require('app/utils/BrowserTests');

var _BrowserTests2 = _interopRequireDefault(_BrowserTests);

var _GeneratedPasswordInput = require('app/components/elements/GeneratedPasswordInput');

var _GeneratedPasswordInput2 = _interopRequireDefault(_GeneratedPasswordInput);

var _ServerApiClient = require('app/utils/ServerApiClient');

var _constants = require('shared/constants');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CreateAccount = (_temp = _class = function (_React$Component) {
    (0, _inherits3.default)(CreateAccount, _React$Component);

    function CreateAccount(props) {
        (0, _classCallCheck3.default)(this, CreateAccount);

        var _this = (0, _possibleConstructorReturn3.default)(this, (CreateAccount.__proto__ || (0, _getPrototypeOf2.default)(CreateAccount)).call(this, props));

        _this.state = {
            name: '',
            password: '',
            password_valid: '',
            name_error: '',
            server_error: '',
            loading: false,
            cryptographyFailure: false,
            showRules: false,
            showPass: false,
            account_has_keys_warning: false // remove this after May 20th
            // user_name_picked: this.props.offchainUser.getIn(["name"])
        };
        _this.onSubmit = _this.onSubmit.bind(_this);
        _this.onNameChange = _this.onNameChange.bind(_this);
        _this.onPasswordChange = _this.onPasswordChange.bind(_this);
        _this.preventDoubleClick = _this.preventDoubleClick.bind(_this);
        return _this;
    }

    (0, _createClass3.default)(CreateAccount, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var newState = { showPass: true };
            var cryptoTestResult = (0, _BrowserTests2.default)();
            if (cryptoTestResult !== undefined) {
                console.error('CreateAccount - cryptoTestResult: ', cryptoTestResult);
                newState.cryptographyFailure = true;
            } else {
                newState.showPass = true;
            }
            // let's find out if there is pre-approved not created account name
            var offchainAccount = this.props.offchainUser ? this.props.offchainUser.get('account') : null;
            if (offchainAccount) {
                newState.name = offchainAccount;
                this.validateAccountName(offchainAccount);
                // remove below after May 20th
                if (this.props.offchainUser.get('account_has_keys')) {
                    newState.account_has_keys_warning = true;
                }
            }
            this.props.showTerms();
            this.setState(newState);
        }
    }, {
        key: 'mousePosition',
        value: function mousePosition(e) {
            // log x/y cords
            console.log('--> mouse position --', e.type, e.screenX, e.screenY);
            if (e.type === 'click') {
                (0, _ServerApiClient.saveCords)(e.screenX, e.screenY);
            }
        }
    }, {
        key: 'onSubmit',
        value: function onSubmit(e) {
            var _this2 = this;

            e.preventDefault();
            this.setState({ server_error: '', loading: true });
            var _state = this.state,
                password = _state.password,
                password_valid = _state.password_valid;

            var name = this.state.name;
            if (!password || !password_valid) return;

            var public_keys = void 0;
            try {
                var pk = _ecc.PrivateKey.fromWif(password);
                public_keys = [1, 2, 3, 4].map(function () {
                    return pk.toPublicKey().toString();
                });
            } catch (error) {
                public_keys = ['owner', 'active', 'posting', 'memo'].map(function (role) {
                    var pk = _ecc.PrivateKey.fromSeed('' + name + role + password);
                    return pk.toPublicKey().toString();
                });
            }

            // createAccount
            fetch('/api/v1/accounts', {
                method: 'post',
                mode: 'no-cors',
                credentials: 'same-origin',
                headers: {
                    Accept: 'application/json',
                    'Content-type': 'application/json'
                },
                body: (0, _stringify2.default)({
                    csrf: $STM_csrf,
                    name: name,
                    owner_key: public_keys[0],
                    active_key: public_keys[1],
                    posting_key: public_keys[2],
                    memo_key: public_keys[3]
                })
            }).then(function (r) {
                return r.json();
            }).then(function (res) {
                if (res.error || res.status !== 'ok') {
                    console.error('CreateAccount server error', res.error);
                    _this2.setState({
                        server_error: res.error || 'Unknown server error',
                        loading: false
                    });
                } else {
                    window.location = '/login.html#account=' + name + '&msg=accountcreated';
                }
            }).catch(function (error) {
                console.error('Caught CreateAccount server error', error);
                _this2.setState({
                    server_error: error.message ? error.message : error,
                    loading: false
                });
            });
        }
    }, {
        key: 'onPasswordChange',
        value: function onPasswordChange(password, password_valid) {
            this.setState({ password: password, password_valid: password_valid });
        }
    }, {
        key: 'preventDoubleClick',
        value: function preventDoubleClick() {
            // return false;
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
            var _this3 = this;

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
                promise.then(function (error) {
                    return _this3.setState({ name_error: error });
                }).catch(function () {
                    return _this3.setState({
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
            var _this4 = this;

            if (!process.env.BROWSER) {
                // don't render this page on the server - it will not work until rendered in browser
                return _react2.default.createElement(
                    'div',
                    { className: 'CreateAccount row ' },
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

            var _state2 = this.state,
                name = _state2.name,
                password_valid = _state2.password_valid,
                name_error = _state2.name_error,
                server_error = _state2.server_error,
                loading = _state2.loading,
                cryptographyFailure = _state2.cryptographyFailure,
                showRules = _state2.showRules;
            var _props = this.props,
                loggedIn = _props.loggedIn,
                logout = _props.logout,
                serverBusy = _props.serverBusy;

            var submit_btn_disabled = loading || !password_valid;
            var submit_btn_class = 'button action' + (submit_btn_disabled ? ' disabled' : '');

            var account_status = this.props.offchainUser ? this.props.offchainUser.get('account_status') : null;

            if (serverBusy || $STM_Config.disable_signups) {
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
                                'Membership to Steemit.com is now under invitation only because of unexpectedly high sign up rate.'
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
                        _react2.default.createElement('br', null),
                        _react2.default.createElement(
                            'div',
                            { className: 'callout alert' },
                            _react2.default.createElement(
                                'h4',
                                null,
                                'Cryptography test failed'
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
                                'are well tested and known to work with steemit.com.'
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
                        _react2.default.createElement('br', null),
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
                                'before you can create another account.'
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

            if (account_status !== 'approved') {
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
                                'It looks like your sign up request is not approved yet or you already created an account.',
                                _react2.default.createElement('br', null),
                                'Please try again later or contact',
                                ' ',
                                _react2.default.createElement(
                                    'a',
                                    { href: 'mailto:support@steemit.com' },
                                    'support@steemit.com'
                                ),
                                ' ',
                                'for the status of your request.',
                                _react2.default.createElement('br', null),
                                'If you didn\'t submit your sign up application yet, ',
                                _react2.default.createElement(
                                    'a',
                                    { href: _constants.SIGNUP_URL },
                                    'apply now'
                                ),
                                '!'
                            )
                        )
                    )
                );
            }

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
                            'Couldn\'t create account. Server returned the following error:'
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
                        { className: 'column' },
                        _react2.default.createElement(
                            'h4',
                            null,
                            'Please read the Steemit Rules and fill in the form below to create your Steemit account'
                        ),
                        showRules ? _react2.default.createElement(
                            'div',
                            { className: 'CreateAccount__rules' },
                            _react2.default.createElement(
                                'p',
                                null,
                                'The first rule of Steemit is: Do not lose your password.',
                                _react2.default.createElement('br', null),
                                'The second rule of Steemit is: Do',
                                ' ',
                                _react2.default.createElement(
                                    'strong',
                                    null,
                                    'not'
                                ),
                                ' lose your password.',
                                _react2.default.createElement('br', null),
                                'The third rule of Steemit is: We cannot recover your password, or your account if you lose your password.',
                                _react2.default.createElement('br', null),
                                'The forth rule: Do not tell anyone your password.',
                                _react2.default.createElement('br', null),
                                'The fifth rule: Always back up your password.',
                                _react2.default.createElement('br', null),
                                _react2.default.createElement('br', null),
                                'Seriously, we are, for technical reasons, entirely unable to gain access to an account without knowing the password. Steemit is a new model, entirely unlike other sites on the Internet. It\'s not simply policy:',
                                ' ',
                                _react2.default.createElement(
                                    'strong',
                                    null,
                                    'We cannot recover your account or password if you lose it.'
                                ),
                                _react2.default.createElement('br', null),
                                'Print out your password or write it down in a safe place.'
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'text-center' },
                                _react2.default.createElement(
                                    'a',
                                    {
                                        className: 'CreateAccount__rules-button',
                                        href: '#',
                                        onClick: function onClick() {
                                            return _this4.setState({ showRules: false });
                                        }
                                    },
                                    _react2.default.createElement(
                                        'span',
                                        {
                                            style: {
                                                display: 'inline-block',
                                                transform: 'rotate(-90deg)'
                                            }
                                        },
                                        '\xBB'
                                    )
                                )
                            ),
                            _react2.default.createElement('hr', null)
                        ) : _react2.default.createElement(
                            'div',
                            { className: 'text-center' },
                            _react2.default.createElement(
                                'a',
                                {
                                    className: 'CreateAccount__rules-button',
                                    href: '#',
                                    onClick: function onClick() {
                                        return _this4.setState({ showRules: true });
                                    }
                                },
                                'Steemit Rules \xA0 \xBB'
                            )
                        ),
                        _react2.default.createElement('br', null),
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
                                    'ACCOUNT NAME',
                                    _react2.default.createElement('input', {
                                        type: 'text',
                                        name: 'name',
                                        autoComplete: 'off',
                                        onChange: this.onNameChange,
                                        value: name
                                    })
                                ),
                                _react2.default.createElement(
                                    'p',
                                    null,
                                    name_error
                                )
                            ),
                            // TODO: remove this after May 20th
                            this.state.account_has_keys_warning && _react2.default.createElement(
                                'div',
                                { className: 'warning' },
                                'Please note: due to recent security changes if you chosen a password before during signup, this one below will override it \u2014 this is the one you need to save.'
                            ),
                            _react2.default.createElement(_GeneratedPasswordInput2.default, {
                                onChange: this.onPasswordChange,
                                disabled: loading,
                                showPasswordString: this.state.showPass
                            }),
                            _react2.default.createElement('br', null),
                            next_step && _react2.default.createElement(
                                'div',
                                null,
                                next_step,
                                _react2.default.createElement('br', null)
                            ),
                            _react2.default.createElement(
                                'noscript',
                                null,
                                _react2.default.createElement(
                                    'div',
                                    { className: 'callout alert' },
                                    _react2.default.createElement(
                                        'p',
                                        null,
                                        'This form requires javascript to be enabled in your browser'
                                    )
                                )
                            ),
                            loading && _react2.default.createElement(_LoadingIndicator2.default, { type: 'circle' }),
                            _react2.default.createElement('input', {
                                disabled: submit_btn_disabled,
                                type: 'submit',
                                className: submit_btn_class,
                                onClick: this.mousePosition,
                                value: 'Create Account'
                            })
                        )
                    )
                )
            );
        }
    }]);
    return CreateAccount;
}(_react2.default.Component), _class.propTypes = {
    loginUser: _propTypes2.default.func.isRequired,
    serverBusy: _propTypes2.default.bool
}, _temp);


module.exports = {
    path: 'create_account',
    component: (0, _reactRedux.connect)(function (state) {
        return {
            loggedIn: !!state.user.get('current'),
            offchainUser: state.offchain.get('user'),
            serverBusy: state.offchain.get('serverBusy'),
            suggestedPassword: state.global.get('suggestedPassword')
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
                dispatch(userActions.logout({ type: 'account_create' }));
            },
            showTerms: function showTerms(e) {
                if (e) e.preventDefault();
                dispatch(userActions.showTerms());
            }
        };
    })(CreateAccount)
};
//# sourceMappingURL=CreateAccount.js.map