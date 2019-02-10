'use strict';

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

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

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _SvgImage = require('app/components/elements/SvgImage');

var _SvgImage2 = _interopRequireDefault(_SvgImage);

var _LoadingIndicator = require('app/components/elements/LoadingIndicator');

var _LoadingIndicator2 = _interopRequireDefault(_LoadingIndicator);

var _PasswordInput = require('app/components/elements/PasswordInput');

var _PasswordInput2 = _interopRequireDefault(_PasswordInput);

var _constants = require('app/redux/constants');

var _constants2 = _interopRequireDefault(_constants);

var _counterpart = require('counterpart');

var _counterpart2 = _interopRequireDefault(_counterpart);

var _Translator = require('app/Translator');

var _client_config = require('app/client_config');

var _ecc = require('@steemit/steem-js/lib/auth/ecc');

var _steemJs = require('@steemit/steem-js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var email_regex = /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$/;

function passwordToOwnerPubKey(account_name, password) {
    var pub_key = void 0;
    try {
        pub_key = _ecc.PrivateKey.fromWif(password);
    } catch (e) {
        pub_key = _ecc.PrivateKey.fromSeed(account_name + 'owner' + password);
    }
    return pub_key.toPublicKey().toString();
}

var RecoverAccountStep1 = (_temp = _class = function (_React$Component) {
    (0, _inherits3.default)(RecoverAccountStep1, _React$Component);

    function RecoverAccountStep1(props) {
        (0, _classCallCheck3.default)(this, RecoverAccountStep1);

        var _this = (0, _possibleConstructorReturn3.default)(this, (RecoverAccountStep1.__proto__ || (0, _getPrototypeOf2.default)(RecoverAccountStep1)).call(this, props));

        _this.state = {
            name: '',
            name_error: '',
            email: '',
            email_error: '',
            error: '',
            progress_status: '',
            password: { value: '', valid: false },
            show_social_login: false,
            email_submitted: false
        };
        _this.onNameChange = _this.onNameChange.bind(_this);
        _this.onEmailChange = _this.onEmailChange.bind(_this);
        _this.onPasswordsChange = _this.onPasswordsChange.bind(_this);
        _this.onSubmit = _this.onSubmit.bind(_this);
        _this.onSubmitEmail = _this.onSubmitEmail.bind(_this);
        return _this;
    }

    (0, _createClass3.default)(RecoverAccountStep1, [{
        key: 'onNameChange',
        value: function onNameChange(e) {
            var name = e.target.value.trim().toLowerCase();
            this.validateAccountName(name);
            this.setState({ name: name, error: '' });
        }
    }, {
        key: 'onEmailChange',
        value: function onEmailChange(e) {
            var email = e.target.value.trim().toLowerCase();
            var email_error = '';
            if (!email_regex.test(email.toLowerCase())) email_error = (0, _counterpart2.default)('recoveraccountstep1_jsx.not_valid');
            this.setState({ email: email, email_error: email_error });
        }
    }, {
        key: 'validateAccountName',
        value: function validateAccountName(name) {
            var _this2 = this;

            if (!name) return;
            _steemJs.api.getAccountsAsync([name]).then(function (res) {
                _this2.setState({
                    name_error: !res || res.length === 0 ? (0, _counterpart2.default)('recoveraccountstep1_jsx.account_name_is_not_found') : ''
                });
                if (res.length) {
                    var _res = (0, _slicedToArray3.default)(res, 1),
                        account = _res[0];
                    // if your last owner key update is prior to July 14th then the old key will not be able to recover


                    var ownerUpdate = /Z$/.test(account.last_owner_update) ? account.last_owner_update : account.last_owner_update + 'Z';
                    var ownerUpdateTime = new Date(ownerUpdate).getTime();
                    var THIRTY_DAYS_AGO = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).getTime();
                    if (ownerUpdateTime < Math.max(THIRTY_DAYS_AGO, _constants2.default.JULY_14_HACK)) _this2.setState({
                        name_error: (0, _counterpart2.default)('recoveraccountstep1_jsx.unable_to_recover_account_not_change_ownership_recently')
                    });
                }
            });
        }
    }, {
        key: 'validateAccountOwner',
        value: function validateAccountOwner(name) {
            var oldOwner = passwordToOwnerPubKey(name, this.state.password.value);
            return _steemJs.api.getOwnerHistoryAsync(name).then(function (history) {
                var res = history.filter(function (a) {
                    var owner = a.previous_owner_authority.key_auths[0][0];
                    return owner === oldOwner;
                });
                return res.length > 0;
            });
        }
    }, {
        key: 'onPasswordsChange',
        value: function onPasswordsChange(_ref) {
            var oldPassword = _ref.oldPassword,
                valid = _ref.valid;

            this.setState({ password: { value: oldPassword, valid: valid }, error: '' });
        }
    }, {
        key: 'onSubmit',
        value: function onSubmit(e) {
            var _this3 = this;

            e.preventDefault();
            this.validateAccountOwner(this.state.name).then(function (result) {
                if (result) {
                    _this3.setState({ show_social_login: true });
                } else _this3.setState({
                    error: (0, _counterpart2.default)('recoveraccountstep1_jsx.password_not_used_in_last_days')
                });
            });
        }
    }, {
        key: 'onSubmitEmail',
        value: function onSubmitEmail(e) {
            var _this4 = this;

            e.preventDefault();
            var _state = this.state,
                name = _state.name,
                password = _state.password;

            var owner_key = passwordToOwnerPubKey(name, password.value);
            fetch('/api/v1/initiate_account_recovery_with_email', {
                method: 'post',
                mode: 'no-cors',
                credentials: 'same-origin',
                headers: {
                    Accept: 'application/json',
                    'Content-type': 'application/json'
                },
                body: (0, _stringify2.default)({
                    csrf: $STM_csrf,
                    contact_email: this.state.email,
                    account_name: name,
                    owner_key: owner_key
                })
            }).then(function (r) {
                return r.json();
            }).then(function (res) {
                if (res.error) {
                    _this4.setState({ email_error: res.error || 'Unknown' });
                } else {
                    if (res.status === 'ok') {
                        _this4.setState({ email_submitted: true });
                    }
                    if (res.status === 'duplicate') {
                        _this4.setState({
                            email_error: (0, _counterpart2.default)('recoveraccountstep1_jsx.request_already_submitted_contact_support', { SUPPORT_EMAIL: _client_config.SUPPORT_EMAIL })
                        });
                    }
                }
            }).catch(function (error) {
                console.error('request_account_recovery server error (2)', error);
                _this4.setState({
                    email_error: error.message ? error.message : error
                });
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _state2 = this.state,
                name = _state2.name,
                name_error = _state2.name_error,
                email = _state2.email,
                email_error = _state2.email_error,
                error = _state2.error,
                progress_status = _state2.progress_status,
                password = _state2.password,
                show_social_login = _state2.show_social_login,
                email_submitted = _state2.email_submitted;

            var owner_key = passwordToOwnerPubKey(name, password.value);
            var valid = name && !name_error && password.valid;
            var submit_btn_class = 'button action' + (!valid ? ' disabled' : '');
            var show_account_and_passwords = !email_submitted && !show_social_login;
            return _react2.default.createElement(
                'div',
                { className: 'RestoreAccount SignUp' },
                show_account_and_passwords && _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                        'div',
                        { className: 'column large-4' },
                        _react2.default.createElement(
                            'h2',
                            null,
                            (0, _counterpart2.default)('navigation.stolen_account_recovery')
                        ),
                        _react2.default.createElement(
                            'p',
                            null,
                            (0, _counterpart2.default)('recoveraccountstep1_jsx.recover_account_intro', { APP_URL: _client_config.APP_DOMAIN, APP_NAME: _client_config.APP_NAME })
                        ),
                        _react2.default.createElement(
                            'form',
                            { onSubmit: this.onSubmit, noValidate: true },
                            _react2.default.createElement(
                                'div',
                                { className: name_error ? 'error' : '' },
                                _react2.default.createElement(
                                    'label',
                                    null,
                                    (0, _counterpart2.default)('g.account_name'),
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
                                    { className: 'error' },
                                    name_error
                                )
                            ),
                            _react2.default.createElement(_PasswordInput2.default, {
                                passwordLabel: (0, _counterpart2.default)('g.recent_password'),
                                onChange: this.onPasswordsChange
                            }),
                            _react2.default.createElement('br', null),
                            _react2.default.createElement(
                                'div',
                                { className: 'error' },
                                error
                            ),
                            progress_status ? _react2.default.createElement(
                                'span',
                                null,
                                _react2.default.createElement(_LoadingIndicator2.default, {
                                    type: 'circle',
                                    inline: true
                                }),
                                ' ',
                                progress_status
                            ) : _react2.default.createElement('input', {
                                disabled: !valid,
                                type: 'submit',
                                className: submit_btn_class,
                                value: (0, _counterpart2.default)('recoveraccountstep1_jsx.begin_recovery')
                            })
                        )
                    )
                ),
                show_social_login && _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                        'div',
                        { className: 'column large-4' },
                        email_submitted ? (0, _counterpart2.default)('recoveraccountstep1_jsx.thanks_for_submitting_request_for_account_recovery', { APP_NAME: _client_config.APP_NAME }) : _react2.default.createElement(
                            'form',
                            { onSubmit: this.onSubmitEmail, noValidate: true },
                            _react2.default.createElement(
                                'p',
                                null,
                                (0, _counterpart2.default)('recoveraccountstep1_jsx.enter_email_toverify_identity')
                            ),
                            _react2.default.createElement(
                                'div',
                                {
                                    className: email_error ? 'column large-4 shrink error' : 'column large-4 shrink'
                                },
                                _react2.default.createElement(
                                    'label',
                                    null,
                                    (0, _counterpart2.default)('g.email'),
                                    _react2.default.createElement('input', {
                                        type: 'text',
                                        name: 'email',
                                        autoComplete: 'off',
                                        onChange: this.onEmailChange,
                                        value: email
                                    })
                                ),
                                _react2.default.createElement(
                                    'p',
                                    { className: 'error' },
                                    email_error
                                ),
                                _react2.default.createElement('input', {
                                    type: 'submit',
                                    disabled: email_error || !email,
                                    className: 'button hollow',
                                    value: (0, _counterpart2.default)('recoveraccountstep1_jsx.continue_with_email')
                                })
                            )
                        )
                    )
                )
            );
        }
    }]);
    return RecoverAccountStep1;
}(_react2.default.Component), _class.propTypes = {}, _temp);


module.exports = {
    path: 'recover_account_step_1',
    component: RecoverAccountStep1
};
//# sourceMappingURL=RecoverAccountStep1.js.map