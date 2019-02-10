'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

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

var _counterpart = require('counterpart');

var _counterpart2 = _interopRequireDefault(_counterpart);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function validatePassword(value, new_password) {
    if (!new_password) return '';
    var length = 32;
    return value && value.length < length ? (0, _counterpart2.default)('g.password_must_be_characters_or_more', { amount: length }) : '';
}

var PasswordInput = (_temp = _class = function (_React$Component) {
    (0, _inherits3.default)(PasswordInput, _React$Component);

    function PasswordInput(props) {
        (0, _classCallCheck3.default)(this, PasswordInput);

        var _this = (0, _possibleConstructorReturn3.default)(this, (PasswordInput.__proto__ || (0, _getPrototypeOf2.default)(PasswordInput)).call(this, props));

        var passwd = { value: '', error: '' };
        _this.state = {
            oldPassword: passwd,
            newPassword: passwd,
            confirmPassword: passwd
        };
        _this.oldPasswordChange = _this.oldPasswordChange.bind(_this);
        _this.newPasswordChange = _this.newPasswordChange.bind(_this);
        _this.confirmPasswordChange = _this.confirmPasswordChange.bind(_this);
        return _this;
    }

    (0, _createClass3.default)(PasswordInput, [{
        key: 'validatePasswords',
        value: function validatePasswords(oldPassword, newPassword, confirmPassword) {
            var valid = oldPassword.value.length > 0 && oldPassword.error === '';
            if (this.props.inputNewPassword) {
                valid = valid && newPassword.value.length > 0 && newPassword.error === '';
            }
            if (this.props.inputConfirmPassword) {
                valid = valid && confirmPassword.value === newPassword.value;
            }
            return valid;
        }
    }, {
        key: 'onChange',
        value: function onChange(value) {
            var _state = this.state,
                oldPassword = _state.oldPassword,
                newPassword = _state.newPassword,
                confirmPassword = _state.confirmPassword;

            if (value.oldPassword) oldPassword = value.oldPassword;
            if (value.newPassword) newPassword = value.newPassword;
            if (value.confirmPassword) confirmPassword = value.confirmPassword;
            var res = {
                oldPassword: oldPassword.value,
                newPassword: newPassword.value,
                confirmPassword: confirmPassword.value
            };
            res.valid = this.validatePasswords(oldPassword, newPassword, confirmPassword);
            this.props.onChange(res);
        }
    }, {
        key: 'oldPasswordChange',
        value: function oldPasswordChange(e) {
            var value = e.target.value.trim();
            var error = validatePassword(value, false);
            var res = { oldPassword: { value: value, error: error } };
            this.setState(res);
            this.onChange(res);
        }
    }, {
        key: 'newPasswordChange',
        value: function newPasswordChange(e) {
            var value = e.target.value.trim();
            var error = validatePassword(value, true);
            var res = { newPassword: { value: value, error: error } };
            if (value !== this.state.confirmPassword.value) {
                res.confirmPassword = this.state.confirmPassword;
                res.confirmPassword.error = (0, _counterpart2.default)('g.passwords_do_not_match');
            }
            this.setState(res);
            this.onChange(res);
        }
    }, {
        key: 'confirmPasswordChange',
        value: function confirmPasswordChange(e) {
            var value = e.target.value.trim();
            var error = '';
            if (value !== this.state.newPassword.value) error = (0, _counterpart2.default)('g.passwords_do_not_match');
            var res = { confirmPassword: { value: value, error: error } };
            this.setState(res);
            this.onChange(res);
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                inputNewPassword = _props.inputNewPassword,
                inputConfirmPassword = _props.inputConfirmPassword,
                disabled = _props.disabled,
                passwordLabel = _props.passwordLabel;
            var _state2 = this.state,
                oldPassword = _state2.oldPassword,
                newPassword = _state2.newPassword,
                confirmPassword = _state2.confirmPassword;

            return _react2.default.createElement(
                'div',
                { className: 'PasswordInput' },
                _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement(
                        'label',
                        null,
                        passwordLabel,
                        _react2.default.createElement('input', {
                            type: 'password',
                            name: 'oldPassword',
                            autoComplete: 'off',
                            onChange: this.oldPasswordChange,
                            value: oldPassword.value,
                            disabled: disabled
                        })
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'error' },
                        oldPassword.error
                    )
                ),
                inputNewPassword && _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement(
                        'label',
                        null,
                        (0, _counterpart2.default)('g.new_password'),
                        _react2.default.createElement('input', {
                            type: 'password',
                            name: 'oldPassword',
                            autoComplete: 'off',
                            onChange: this.newPasswordChange,
                            value: newPassword.value,
                            disabled: disabled
                        })
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'error' },
                        newPassword.error
                    )
                ),
                inputNewPassword && inputConfirmPassword && _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement(
                        'label',
                        null,
                        (0, _counterpart2.default)('g.confirm_password'),
                        _react2.default.createElement('input', {
                            type: 'password',
                            name: 'confirmPassword',
                            autoComplete: 'off',
                            onChange: this.confirmPasswordChange,
                            value: confirmPassword.value,
                            disabled: disabled
                        })
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'error' },
                        confirmPassword.error
                    )
                )
            );
        }
    }]);
    return PasswordInput;
}(_react2.default.Component), _class.propTypes = {
    inputNewPassword: _propTypes2.default.bool,
    inputConfirmPassword: _propTypes2.default.bool,
    disabled: _propTypes2.default.bool,
    onChange: _propTypes2.default.func.isRequired,
    passwordLabel: _propTypes2.default.string.isRequired
}, _temp);
exports.default = PasswordInput;
//# sourceMappingURL=PasswordInput.js.map