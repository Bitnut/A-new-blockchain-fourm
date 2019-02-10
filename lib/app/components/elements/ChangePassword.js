'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

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

var _class, _temp; /* eslint react/prop-types: 0 */


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _counterpart = require('counterpart');

var _counterpart2 = _interopRequireDefault(_counterpart);

var _ecc = require('@steemit/steem-js/lib/auth/ecc');

var _steemJs = require('@steemit/steem-js');

var _TransactionReducer = require('app/redux/TransactionReducer');

var transactionActions = _interopRequireWildcard(_TransactionReducer);

var _AppReducer = require('app/redux/AppReducer');

var appActions = _interopRequireWildcard(_AppReducer);

var _LoadingIndicator = require('app/components/elements/LoadingIndicator');

var _LoadingIndicator2 = _interopRequireDefault(_LoadingIndicator);

var _ChainValidation = require('app/utils/ChainValidation');

var _ReduxForms = require('app/utils/ReduxForms');

var _client_config = require('app/client_config');

var _reduxForm = require('redux-form');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var string = _propTypes2.default.string,
    oneOf = _propTypes2.default.oneOf;
var ChangePassword = (_temp = _class = function (_React$Component) {
    (0, _inherits3.default)(ChangePassword, _React$Component);

    function ChangePassword(props) {
        (0, _classCallCheck3.default)(this, ChangePassword);

        var _this = (0, _possibleConstructorReturn3.default)(this, (ChangePassword.__proto__ || (0, _getPrototypeOf2.default)(ChangePassword)).call(this, props));

        _this.dispatchSubmit = function () {
            var _this$props = _this.props,
                changePassword = _this$props.changePassword,
                authType = _this$props.authType,
                priorAuthKey = _this$props.priorAuthKey;
            var _this$props2 = _this.props,
                resetForm = _this$props2.resetForm,
                notify = _this$props2.notify;
            var _this$props$fields = _this.props.fields,
                password = _this$props$fields.password,
                twofa = _this$props$fields.twofa;

            var accountName = _this.state.accountName;
            var success = function success() {
                _this.setState({ loading: false, error: null });
                var onClose = _this.props.onClose;

                if (onClose) onClose();
                if (resetForm) resetForm();
                notify('Password Updated');
                window.location = '/login.html#account=' + accountName + '&msg=passwordupdated';
            };
            var error = function error(e) {
                _this.setState({ loading: false, error: e });
            };
            _this.setState({ loading: true, error: null });
            changePassword(accountName, authType, priorAuthKey, password.value, twofa.value, success, error);
        };

        _this.state = {
            accountName: props.username,
            nameError: '',
            generated: false
        };
        _this.onNameChange = _this.onNameChange.bind(_this);
        _this.generateWif = _this.generateWif.bind(_this);
        return _this;
    }

    (0, _createClass3.default)(ChangePassword, [{
        key: 'componentWillMount',
        value: function componentWillMount() {}
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            newWif = null;
        }
    }, {
        key: 'generateWif',
        value: function generateWif(e) {
            newWif = 'P' + _ecc.key_utils.get_random_key().toWif();
            this.setState({ generated: true });
        }
    }, {
        key: 'validateAccountName',
        value: function validateAccountName(name) {
            var _this2 = this;

            var nameError = '';
            var promise = void 0;
            if (name.length > 0) {
                nameError = (0, _ChainValidation.validate_account_name)(name);
                if (!nameError) {
                    promise = _steemJs.api.getAccountsAsync([name]).then(function (res) {
                        return !(res && res.length > 0) ? (0, _counterpart2.default)('g.account_not_found') : '';
                    });
                }
            }
            if (promise) {
                promise.then(function (nameError) {
                    return _this2.setState({ nameError: nameError });
                }).catch(function () {
                    return _this2.setState({
                        nameError: "Account name can't be verified right now due to server failure. Please try again later."
                    });
                });
            } else {
                this.setState({ nameError: nameError });
            }
        }
    }, {
        key: 'onNameChange',
        value: function onNameChange(e) {
            var accountName = e.target.value.trim().toLowerCase();
            this.validateAccountName(accountName);
            this.setState({ accountName: accountName });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            if (!process.env.BROWSER) {
                // don't render this page on the server
                return _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                        'div',
                        { className: 'column' },
                        (0, _counterpart2.default)('g.loading'),
                        '..'
                    )
                );
            }
            var _state = this.state,
                generated = _state.generated,
                loading = _state.loading,
                error = _state.error;
            var _props = this.props,
                username = _props.username,
                authType = _props.authType,
                priorAuthKey = _props.priorAuthKey;
            var _props2 = this.props,
                handleSubmit = _props2.handleSubmit,
                submitting = _props2.submitting,
                onClose = _props2.onClose; // form stuff

            var _props$fields = this.props.fields,
                password = _props$fields.password,
                confirmPassword = _props$fields.confirmPassword,
                confirmCheck = _props$fields.confirmCheck,
                confirmSaved = _props$fields.confirmSaved;


            if (authType && !priorAuthKey) console.error('Missing priorAuthKey');

            var error2 = /Missing Owner Authority/.test(error) ? _react2.default.createElement(
                'span',
                null,
                (0, _counterpart2.default)('g.this_is_wrong_password'),
                '. ',
                (0, _counterpart2.default)('g.do_you_need_to') + ' ',
                _react2.default.createElement(
                    'a',
                    { href: '/recover_account_step_1' },
                    (0, _counterpart2.default)('g.recover_your_account')
                ),
                '?'
            ) : error;

            var _state2 = this.state,
                accountName = _state2.accountName,
                nameError = _state2.nameError;

            var readOnlyAccountName = username && username.length > 0;

            return _react2.default.createElement(
                'span',
                { className: 'ChangePassword' },
                _react2.default.createElement(
                    'form',
                    {
                        onSubmit: handleSubmit(function () {
                            _this3.dispatchSubmit();
                        })
                    },
                    username && _react2.default.createElement(
                        'h4',
                        null,
                        (0, _counterpart2.default)('g.reset_usernames_password', { username: username })
                    ),
                    authType ? _react2.default.createElement(
                        'p',
                        null,
                        (0, _counterpart2.default)('g.this_will_update_usernames_authtype_key', {
                            username: username,
                            authType: authType
                        })
                    ) : _react2.default.createElement(
                        'div',
                        { className: 'ChangePassword__rules' },
                        _react2.default.createElement('hr', null),
                        _react2.default.createElement(
                            'p',
                            null,
                            (0, _counterpart2.default)('g.the_rules_of_APP_NAME.one', {
                                APP_NAME: _client_config.APP_NAME
                            }),
                            _react2.default.createElement('br', null),
                            (0, _counterpart2.default)('g.the_rules_of_APP_NAME.second', {
                                APP_NAME: _client_config.APP_NAME
                            }),
                            _react2.default.createElement('br', null),
                            (0, _counterpart2.default)('g.the_rules_of_APP_NAME.third', {
                                APP_NAME: _client_config.APP_NAME
                            }),
                            _react2.default.createElement('br', null),
                            (0, _counterpart2.default)('g.the_rules_of_APP_NAME.fourth'),
                            _react2.default.createElement('br', null),
                            (0, _counterpart2.default)('g.the_rules_of_APP_NAME.fifth'),
                            _react2.default.createElement('br', null),
                            (0, _counterpart2.default)('g.the_rules_of_APP_NAME.sixth'),
                            _react2.default.createElement('br', null),
                            (0, _counterpart2.default)('g.the_rules_of_APP_NAME.seventh')
                        ),
                        _react2.default.createElement('hr', null)
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: nameError ? 'error' : '' },
                        _react2.default.createElement(
                            'label',
                            null,
                            (0, _counterpart2.default)('g.account_name'),
                            _react2.default.createElement('input', {
                                type: 'text',
                                disabled: readOnlyAccountName,
                                autoComplete: 'off',
                                value: accountName,
                                onChange: this.onNameChange
                            })
                        ),
                        _react2.default.createElement(
                            'p',
                            { className: 'help-text' },
                            nameError
                        )
                    ),
                    _react2.default.createElement('br', null),
                    _react2.default.createElement(
                        'label',
                        null,
                        _react2.default.createElement(
                            'div',
                            { className: 'float-right' },
                            _react2.default.createElement(
                                'a',
                                { href: '/recover_account_step_1' },
                                (0, _counterpart2.default)('g.recover_password')
                            )
                        ),
                        (0, _counterpart2.default)('g.current_password'),
                        _react2.default.createElement('br', null),
                        _react2.default.createElement('input', (0, _extends3.default)({}, (0, _ReduxForms.cleanReduxInput)(password), {
                            type: 'password',
                            disabled: loading
                        }))
                    ),
                    password.touched && password.error && _react2.default.createElement(
                        'div',
                        { className: 'error' },
                        password.error
                    ),
                    _react2.default.createElement('br', null),
                    _react2.default.createElement(
                        'label',
                        null,
                        (0, _counterpart2.default)('g.generated_password') + ' ',
                        ' ',
                        _react2.default.createElement(
                            'span',
                            { className: 'secondary' },
                            '(',
                            (0, _counterpart2.default)('g.new'),
                            ')'
                        ),
                        _react2.default.createElement('br', null)
                    ),
                    generated && _react2.default.createElement(
                        'span',
                        null,
                        _react2.default.createElement(
                            'div',
                            null,
                            _react2.default.createElement(
                                'div',
                                { className: 'overflow-ellipsis' },
                                _react2.default.createElement(
                                    'code',
                                    {
                                        style: {
                                            display: 'block',
                                            padding: '0.2rem 0.5rem',
                                            background: 'white',
                                            color: '#c7254e',
                                            wordWrap: 'break-word',
                                            fontSize: '100%',
                                            textAlign: 'center'
                                        }
                                    },
                                    newWif
                                )
                            )
                        ),
                        _react2.default.createElement(
                            'label',
                            { className: 'ChangePassword__backup_text' },
                            (0, _counterpart2.default)('g.backup_password_by_storing_it'),
                            '.'
                        )
                    ) || _react2.default.createElement(
                        'button',
                        {
                            type: 'button',
                            className: 'button hollow',
                            onClick: this.generateWif
                        },
                        (0, _counterpart2.default)('g.click_to_generate_password')
                    ),
                    _react2.default.createElement('br', null),
                    _react2.default.createElement(
                        'label',
                        null,
                        (0, _counterpart2.default)('g.re_enter_generate_password'),
                        _react2.default.createElement('br', null),
                        _react2.default.createElement('input', (0, _extends3.default)({}, (0, _ReduxForms.cleanReduxInput)(confirmPassword), {
                            type: 'password',
                            disabled: loading
                        }))
                    ),
                    confirmPassword.touched && confirmPassword.error && _react2.default.createElement(
                        'div',
                        { className: 'error' },
                        confirmPassword.error
                    ),
                    _react2.default.createElement('br', null),
                    _react2.default.createElement(
                        'label',
                        null,
                        _react2.default.createElement('input', (0, _extends3.default)({}, (0, _ReduxForms.cleanReduxInput)(confirmCheck), {
                            type: 'checkbox'
                        })),
                        ' ',
                        (0, _counterpart2.default)('g.understand_that_APP_NAME_cannot_recover_password', { APP_NAME: _client_config.APP_NAME })
                    ),
                    confirmCheck.touched && confirmCheck.error && _react2.default.createElement(
                        'div',
                        { className: 'error' },
                        confirmCheck.error
                    ),
                    _react2.default.createElement(
                        'label',
                        null,
                        _react2.default.createElement('input', (0, _extends3.default)({}, (0, _ReduxForms.cleanReduxInput)(confirmSaved), {
                            type: 'checkbox'
                        })),
                        (0, _counterpart2.default)('g.i_saved_password')
                    ),
                    confirmSaved.touched && confirmSaved.error && _react2.default.createElement(
                        'div',
                        { className: 'error' },
                        confirmSaved.error
                    ),
                    _react2.default.createElement('br', null),
                    loading && _react2.default.createElement(
                        'div',
                        null,
                        _react2.default.createElement(_LoadingIndicator2.default, { type: 'circle' })
                    ),
                    !loading && _react2.default.createElement(
                        'div',
                        { className: 'ChangePassword__btn-container' },
                        _react2.default.createElement(
                            'div',
                            { className: 'error' },
                            error2
                        ),
                        _react2.default.createElement(
                            'button',
                            {
                                type: 'submit',
                                className: 'button',
                                disabled: loading
                            },
                            (0, _counterpart2.default)('g.update_password')
                        ),
                        onClose && _react2.default.createElement(
                            'button',
                            {
                                type: 'button',
                                disabled: submitting,
                                className: 'button hollow float-right',
                                onClick: onClose
                            },
                            (0, _counterpart2.default)('g.cancel')
                        )
                    )
                )
            );
            // {enable2fa && <p>
            //     <h4>Enable Steemit Account Recovery</h4>
            //     <input type="checkbox" {...twofa} />
            //     {twofa.touched && twofa.error && <div className="error">{twofa.error}</div>}
            //     <br />
            //     <p>
            //         This feature will add a Steemit account as an additional owner on your account.  This is a service that can be used by yourself and Steemit to recover your account should it get compromised or you loose your password.
            //     </p>
            //     <small><a href="//@steemit" target="_blank">@Steemit</a></small>
            // </p>}
            // <br />
        }
    }]);
    return ChangePassword;
}(_react2.default.Component), _class.propTypes = {
    // HTML properties
    username: string,
    defaultPassword: string,
    authType: oneOf(['posting', 'active', 'owner', 'memo']), // null for all
    priorAuthKey: string // Required pubkey if authType is given
}, _temp);


var newWif = null;
var keyValidate = function keyValidate(values) {
    return {
        password: !values.password ? (0, _counterpart2.default)('g.required') : _ecc.PublicKey.fromString(values.password) ? (0, _counterpart2.default)('g.you_need_private_password_or_key_not_a_public_key') : null,
        confirmPassword: !values.confirmPassword ? (0, _counterpart2.default)('g.required') : values.confirmPassword.trim() !== newWif ? (0, _counterpart2.default)('g.passwords_do_not_match') : null,
        confirmCheck: !values.confirmCheck ? (0, _counterpart2.default)('g.required') : null,
        confirmSaved: !values.confirmSaved ? (0, _counterpart2.default)('g.required') : null
    };
};

// @deprecated, instead use: app/utils/ReactForm.js
exports.default = (0, _reduxForm.reduxForm)({
    form: 'changePassword',
    fields: ['password', 'confirmPassword', 'confirmCheck', 'confirmSaved', 'twofa']
},
// mapStateToProps
function (state, ownProps) {
    var authType = ownProps.authType;

    var enable2fa = authType == null;
    return (0, _extends3.default)({}, ownProps, {
        enable2fa: enable2fa,
        validate: keyValidate,
        initialValues: { twofa: false, password: ownProps.defaultPassword }
    });
},
// mapDispatchToProps
function (dispatch) {
    return {
        changePassword: function changePassword(accountName, authType, priorAuthKey, password) {
            var twofa = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
            var success = arguments[5];
            var error = arguments[6];

            var ph = function ph(role) {
                return _ecc.PrivateKey.fromSeed('' + accountName + role + newWif).toWif();
            };
            var auths = authType ? [{ authType: authType, oldAuth: priorAuthKey, newAuth: newWif }] : [{
                authType: 'owner',
                oldAuth: password,
                newAuth: ph('owner', newWif)
            }, {
                authType: 'active',
                oldAuth: password,
                newAuth: ph('active', newWif)
            }, {
                authType: 'posting',
                oldAuth: password,
                newAuth: ph('posting', newWif)
            }, {
                authType: 'memo',
                oldAuth: password,
                newAuth: ph('memo', newWif)
            }];
            dispatch(transactionActions.updateAuthorities({
                twofa: twofa,
                // signingKey provides the password if it was not provided in auths
                signingKey: authType ? password : null,
                accountName: accountName,
                auths: auths,
                onSuccess: success,
                onError: error
                // notifySuccess: 'Change password success'
            }));
        },
        notify: function notify(message) {
            dispatch(appActions.addNotification({
                key: 'chpwd_' + Date.now(),
                message: message,
                dismissAfter: 5000
            }));
        }
    };
})(ChangePassword);
//# sourceMappingURL=ChangePassword.js.map