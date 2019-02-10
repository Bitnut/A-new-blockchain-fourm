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

var _client_config = require('app/client_config');

var _ecc = require('@steemit/steem-js/lib/auth/ecc');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function allChecked(confirmCheckboxes) {
    return confirmCheckboxes.box1 && confirmCheckboxes.box2;
}

var GeneratedPasswordInput = (_temp = _class = function (_React$Component) {
    (0, _inherits3.default)(GeneratedPasswordInput, _React$Component);

    function GeneratedPasswordInput(props) {
        (0, _classCallCheck3.default)(this, GeneratedPasswordInput);

        var _this = (0, _possibleConstructorReturn3.default)(this, (GeneratedPasswordInput.__proto__ || (0, _getPrototypeOf2.default)(GeneratedPasswordInput)).call(this, props));

        _this.state = {
            generatedPassword: props.showPasswordString ? 'P' + _ecc.key_utils.get_random_key().toWif() : null, // Only generate a password if it should be shown already here
            confirmPassword: '',
            confirmPasswordError: '',
            confirmCheckboxes: { box1: false, box2: false }
        };
        _this.confirmPasswordChange = _this.confirmPasswordChange.bind(_this);
        _this.confirmCheckChange = _this.confirmCheckChange.bind(_this);
        return _this;
    }

    (0, _createClass3.default)(GeneratedPasswordInput, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(np) {
            /*
            * By delaying the password generation until the user enters an account
            * name (making showPasswordString = true), we allow more time for
            * entropy collection via the App.jsx mousemove event listener
            */
            if (!this.state.generatedPassword && np.showPasswordString) {
                this.setState({
                    generatedPassword: 'P' + _ecc.key_utils.get_random_key().toWif()
                });
            }
        }
    }, {
        key: 'confirmCheckChange',
        value: function confirmCheckChange(e) {
            var confirmCheckboxes = this.state.confirmCheckboxes;
            confirmCheckboxes[e.target.name] = e.target.checked;
            this.setState({ confirmCheckboxes: confirmCheckboxes });
            var _state = this.state,
                confirmPassword = _state.confirmPassword,
                generatedPassword = _state.generatedPassword;

            this.props.onChange(confirmPassword, confirmPassword && confirmPassword === generatedPassword && allChecked(confirmCheckboxes));
        }
    }, {
        key: 'confirmPasswordChange',
        value: function confirmPasswordChange(e) {
            var confirmPassword = e.target.value.trim();
            var _state2 = this.state,
                generatedPassword = _state2.generatedPassword,
                confirmCheckboxes = _state2.confirmCheckboxes;

            var confirmPasswordError = '';
            if (confirmPassword && confirmPassword !== generatedPassword) confirmPasswordError = (0, _counterpart2.default)('g.passwords_do_not_match');
            this.setState({ confirmPassword: confirmPassword, confirmPasswordError: confirmPasswordError });
            this.props.onChange(confirmPassword, confirmPassword && confirmPassword === generatedPassword && allChecked(confirmCheckboxes));
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                disabled = _props.disabled,
                showPasswordString = _props.showPasswordString;
            var _state3 = this.state,
                generatedPassword = _state3.generatedPassword,
                confirmPassword = _state3.confirmPassword,
                confirmPasswordError = _state3.confirmPasswordError,
                confirmCheckboxes = _state3.confirmCheckboxes;

            return _react2.default.createElement(
                'div',
                { className: 'GeneratedPasswordInput' },
                _react2.default.createElement(
                    'div',
                    { className: 'GeneratedPasswordInput__field' },
                    _react2.default.createElement(
                        'label',
                        { className: 'uppercase' },
                        (0, _counterpart2.default)('g.generated_password'),
                        _react2.default.createElement('br', null),
                        _react2.default.createElement(
                            'code',
                            { className: 'GeneratedPasswordInput__generated_password' },
                            showPasswordString ? generatedPassword : '-'
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'GeneratedPasswordInput__backup_text' },
                            showPasswordString ? (0, _counterpart2.default)('g.backup_password_by_storing_it') : (0, _counterpart2.default)('g.enter_account_show_password')
                        )
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'GeneratedPasswordInput__field' },
                    _react2.default.createElement(
                        'label',
                        { className: 'uppercase' },
                        (0, _counterpart2.default)('g.re_enter_generate_password'),
                        _react2.default.createElement('input', {
                            type: 'password',
                            name: 'confirmPassword',
                            autoComplete: 'off',
                            onChange: this.confirmPasswordChange,
                            value: confirmPassword,
                            disabled: disabled
                        })
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'error' },
                        confirmPasswordError
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'GeneratedPasswordInput__checkboxes' },
                    _react2.default.createElement(
                        'label',
                        null,
                        _react2.default.createElement('input', {
                            type: 'checkbox',
                            name: 'box1',
                            onChange: this.confirmCheckChange,
                            checked: confirmCheckboxes.box1
                        }),
                        (0, _counterpart2.default)('g.understand_that_APP_NAME_cannot_recover_password', { APP_NAME: _client_config.APP_NAME }),
                        '.'
                    ),
                    _react2.default.createElement(
                        'label',
                        null,
                        _react2.default.createElement('input', {
                            type: 'checkbox',
                            name: 'box2',
                            onChange: this.confirmCheckChange,
                            checked: confirmCheckboxes.box2
                        }),
                        (0, _counterpart2.default)('g.i_saved_password'),
                        '.'
                    )
                )
            );
        }
    }]);
    return GeneratedPasswordInput;
}(_react2.default.Component), _class.propTypes = {
    disabled: _propTypes2.default.bool,
    onChange: _propTypes2.default.func.isRequired,
    showPasswordString: _propTypes2.default.bool.isRequired
}, _temp);
exports.default = GeneratedPasswordInput;
//# sourceMappingURL=GeneratedPasswordInput.js.map