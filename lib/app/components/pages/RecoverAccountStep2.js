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

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = require('react-redux');

var _counterpart = require('counterpart');

var _counterpart2 = _interopRequireDefault(_counterpart);

var _ecc = require('@steemit/steem-js/lib/auth/ecc');

var _steemJs = require('@steemit/steem-js');

var _UserReducer = require('app/redux/UserReducer');

var userActions = _interopRequireWildcard(_UserReducer);

var _TransactionReducer = require('app/redux/TransactionReducer');

var transactionActions = _interopRequireWildcard(_TransactionReducer);

var _GeneratedPasswordInput = require('app/components/elements/GeneratedPasswordInput');

var _GeneratedPasswordInput2 = _interopRequireDefault(_GeneratedPasswordInput);

var _LoadingIndicator = require('app/components/elements/LoadingIndicator');

var _LoadingIndicator2 = _interopRequireDefault(_LoadingIndicator);

var _Callout = require('app/components/elements/Callout');

var _Callout2 = _interopRequireDefault(_Callout);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function passwordToOwnerPubKey(account_name, password) {
    var pub_key = void 0;
    try {
        pub_key = _ecc.PrivateKey.fromWif(password);
    } catch (e) {
        pub_key = _ecc.PrivateKey.fromSeed(account_name + 'owner' + password);
    }
    return pub_key.toPublicKey().toString();
}

var RecoverAccountStep2 = (_temp = _class = function (_React$Component) {
    (0, _inherits3.default)(RecoverAccountStep2, _React$Component);

    function RecoverAccountStep2(props) {
        (0, _classCallCheck3.default)(this, RecoverAccountStep2);

        var _this = (0, _possibleConstructorReturn3.default)(this, (RecoverAccountStep2.__proto__ || (0, _getPrototypeOf2.default)(RecoverAccountStep2)).call(this, props));

        _this.state = {
            name_error: '',
            oldPassword: '',
            newPassword: '',
            valid: false,
            error: '',
            progress_status: '',
            success: false
        };
        _this.onPasswordChange = _this.onPasswordChange.bind(_this);
        _this.oldPasswordChange = _this.oldPasswordChange.bind(_this);
        _this.onSubmit = _this.onSubmit.bind(_this);
        _this.onRecoverFailed = _this.onRecoverFailed.bind(_this);
        _this.onRecoverSuccess = _this.onRecoverSuccess.bind(_this);
        return _this;
    }

    (0, _createClass3.default)(RecoverAccountStep2, [{
        key: 'oldPasswordChange',
        value: function oldPasswordChange(e) {
            var oldPassword = e.target.value.trim();
            this.setState({ oldPassword: oldPassword });
        }
    }, {
        key: 'onPasswordChange',
        value: function onPasswordChange(newPassword, valid) {
            this.setState({ newPassword: newPassword, valid: valid });
        }
    }, {
        key: 'onRecoverFailed',
        value: function onRecoverFailed(error) {
            this.setState({
                error: error.msg || error.toString(),
                progress_status: ''
            });
        }
    }, {
        key: 'onRecoverSuccess',
        value: function onRecoverSuccess() {
            this.setState({ success: true, progress_status: '' });
        }
    }, {
        key: 'checkOldOwner',
        value: function checkOldOwner(name, oldOwner) {
            return _steemJs.api.getOwnerHistoryAsync(name).then(function (history) {
                var res = history.filter(function (a) {
                    var owner = a.previous_owner_authority.key_auths[0][0];
                    return owner === oldOwner;
                });
                return res.length > 0;
            });
        }
    }, {
        key: 'requestAccountRecovery',
        value: function requestAccountRecovery(name, oldPassword, newPassword) {
            var _this2 = this;

            var old_owner_key = passwordToOwnerPubKey(name, oldPassword);
            var new_owner_key = passwordToOwnerPubKey(name, newPassword);
            var new_owner_authority = {
                weight_threshold: 1,
                account_auths: [],
                key_auths: [[new_owner_key, 1]]
            };
            fetch('/api/v1/request_account_recovery', {
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
                    old_owner_key: old_owner_key,
                    new_owner_key: new_owner_key,
                    new_owner_authority: new_owner_authority
                })
            }).then(function (r) {
                return r.json();
            }).then(function (res) {
                if (res.error) {
                    console.error('request_account_recovery server error (1)', res.error);
                    _this2.setState({
                        error: res.error || (0, _counterpart2.default)('g.unknown'),
                        progress_status: ''
                    });
                } else {
                    _this2.setState({
                        error: '',
                        progress_status: (0, _counterpart2.default)('recoveraccountstep1_jsx.recovering_account') + '..'
                    });
                    _this2.props.recoverAccount(name, oldPassword, newPassword, _this2.onRecoverFailed, _this2.onRecoverSuccess);
                }
            }).catch(function (error) {
                console.error('request_account_recovery server error (2)', error);
                _this2.setState({
                    error: error.message ? error.message : error,
                    progress_status: ''
                });
            });
        }
    }, {
        key: 'onSubmit',
        value: function onSubmit(e) {
            var _this3 = this;

            e.preventDefault();
            var _state = this.state,
                oldPassword = _state.oldPassword,
                newPassword = _state.newPassword;

            var name = this.props.account_to_recover;
            var oldOwner = passwordToOwnerPubKey(name, oldPassword);
            this.setState({
                progress_status: (0, _counterpart2.default)('recoveraccountstep1_jsx.checking_account_owner') + '..'
            });
            this.checkOldOwner(name, oldOwner).then(function (res) {
                if (res) {
                    _this3.setState({
                        progress_status: (0, _counterpart2.default)('recoveraccountstep1_jsx.sending_recovery_request') + '..'
                    });
                    _this3.requestAccountRecovery(name, oldPassword, newPassword);
                } else {
                    _this3.setState({
                        error: (0, _counterpart2.default)('recoveraccountstep1_jsx.cant_confirm_account_ownership'),
                        progress_status: ''
                    });
                }
            });
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
                        (0, _counterpart2.default)('g.loading'),
                        '..'
                    )
                );
            }
            var account_to_recover = this.props.account_to_recover;

            if (!account_to_recover) {
                return _react2.default.createElement(
                    _Callout2.default,
                    { type: 'error' },
                    _react2.default.createElement(
                        'span',
                        null,
                        (0, _counterpart2.default)('recoveraccountstep1_jsx.account_recovery_request_not_confirmed')
                    )
                );
            }
            var _state2 = this.state,
                oldPassword = _state2.oldPassword,
                valid = _state2.valid,
                error = _state2.error,
                progress_status = _state2.progress_status,
                name_error = _state2.name_error,
                success = _state2.success;

            var submit_btn_class = 'button action' + (!valid || !oldPassword ? ' disabled' : '');

            var submit = null;
            if (progress_status) {
                submit = _react2.default.createElement(
                    'span',
                    null,
                    _react2.default.createElement(_LoadingIndicator2.default, { type: 'circle', inline: true }),
                    ' ',
                    progress_status
                );
            } else {
                if (success) {
                    // submit = <h4>Congratulations! Your account has been recovered. Please login using your new password.</h4>;
                    window.location = '/login.html#account=' + account_to_recover + '&msg=accountrecovered';
                } else {
                    submit = _react2.default.createElement('input', {
                        disabled: !valid,
                        type: 'submit',
                        className: submit_btn_class,
                        value: 'Submit'
                    });
                }
            }
            var disable_password_input = success || progress_status !== '';

            return _react2.default.createElement(
                'div',
                { className: 'RestoreAccount SignUp' },
                _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                        'div',
                        { className: 'column large-6' },
                        _react2.default.createElement(
                            'h2',
                            null,
                            (0, _counterpart2.default)('recoveraccountstep1_jsx.recover_account')
                        ),
                        _react2.default.createElement(
                            'form',
                            {
                                onSubmit: this.onSubmit,
                                autoComplete: 'off',
                                noValidate: true
                            },
                            _react2.default.createElement(
                                'div',
                                { className: name_error ? 'error' : '' },
                                _react2.default.createElement(
                                    'label',
                                    null,
                                    (0, _counterpart2.default)('g.account_name'),
                                    _react2.default.createElement('input', {
                                        type: 'text',
                                        disabled: 'true',
                                        autoComplete: 'off',
                                        value: account_to_recover
                                    })
                                ),
                                _react2.default.createElement(
                                    'p',
                                    { className: 'help-text' },
                                    name_error
                                )
                            ),
                            _react2.default.createElement('br', null),
                            _react2.default.createElement(
                                'div',
                                null,
                                _react2.default.createElement(
                                    'label',
                                    null,
                                    (0, _counterpart2.default)('postfull_jsx.recent_password'),
                                    _react2.default.createElement('input', {
                                        type: 'password',
                                        disabled: disable_password_input,
                                        autoComplete: 'off',
                                        value: oldPassword,
                                        onChange: this.oldPasswordChange
                                    })
                                )
                            ),
                            _react2.default.createElement('br', null),
                            _react2.default.createElement(_GeneratedPasswordInput2.default, {
                                onChange: this.onPasswordChange,
                                disabled: disable_password_input,
                                showPasswordString: oldPassword.length > 0
                            }),
                            _react2.default.createElement(
                                'div',
                                { className: 'error' },
                                error
                            ),
                            _react2.default.createElement('br', null),
                            submit
                        )
                    )
                )
            );
        }
    }]);
    return RecoverAccountStep2;
}(_react2.default.Component), _class.propTypes = {
    account_to_recover: _propTypes2.default.string,
    recoverAccount: _propTypes2.default.func.isRequired
}, _temp);


module.exports = {
    path: 'recover_account_step_2',
    component: (0, _reactRedux.connect)(function (state) {
        return {
            account_to_recover: state.offchain.get('recover_account')
        };
    }, function (dispatch) {
        return {
            recoverAccount: function recoverAccount(account_to_recover, old_password, new_password, onError, onSuccess) {
                dispatch(transactionActions.recoverAccount({
                    account_to_recover: account_to_recover,
                    old_password: old_password,
                    new_password: new_password,
                    onError: onError,
                    onSuccess: onSuccess
                }));
                dispatch(userActions.logout({ type: 'account_recovery' }));
            }
        };
    })(RecoverAccountStep2)
};
//# sourceMappingURL=RecoverAccountStep2.js.map