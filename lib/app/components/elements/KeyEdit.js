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

var _class, _temp; // @deprecated, instead use: app/utils/ReactForm.js


var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _LoadingIndicator = require('app/components/elements/LoadingIndicator');

var _LoadingIndicator2 = _interopRequireDefault(_LoadingIndicator);

var _reduxForm = require('redux-form');

var _ReduxForms = require('app/utils/ReduxForms');

var _counterpart = require('counterpart');

var _counterpart2 = _interopRequireDefault(_counterpart);

var _ecc = require('@steemit/steem-js/lib/auth/ecc');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var KeyEdit = (_temp = _class = function (_Component) {
    (0, _inherits3.default)(KeyEdit, _Component);

    function KeyEdit() {
        (0, _classCallCheck3.default)(this, KeyEdit);

        var _this = (0, _possibleConstructorReturn3.default)(this, (KeyEdit.__proto__ || (0, _getPrototypeOf2.default)(KeyEdit)).call(this));

        _this.state = {};
        _this.onCancel = function (e) {
            e.preventDefault();
            if (_this.props.onCancel) _this.props.onCancel();
        };
        _this.onCancel = _this.onCancel.bind(_this);

        _this.onKeyChanged = function (data) {
            var _this$props = _this.props,
                onKeyChanged = _this$props.onKeyChanged,
                oldAuth = _this$props.oldAuth;

            return onKeyChanged((0, _extends3.default)({}, data, { oldAuth: oldAuth }));
        };
        _this.onKeyChanged = _this.onKeyChanged.bind(_this);
        return _this;
    }

    (0, _createClass3.default)(KeyEdit, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            setTimeout(function () {
                _this2.refs.key.focus();
            }, 300);
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var _nextProps$fields = nextProps.fields,
                password = _nextProps$fields.password,
                confirm = _nextProps$fields.confirm;

            var isWif = void 0;
            try {
                _ecc.PrivateKey.fromWif(password.value);
                // A WIF has a checksum, it does not need a confirmation
                if (confirm.value !== password.value) confirm.onChange(password.value);
                isWif = true;
            } catch (e) {
                isWif = false;
            }
            this.setState({ isWif: isWif });
        }
    }, {
        key: 'render',
        value: function render() {
            var onCancel = this.onCancel,
                onKeyChanged = this.onKeyChanged,
                _props = this.props,
                authType = _props.authType,
                accountChanged = _props.accountChanged,
                handleSubmit = _props.handleSubmit,
                submitting = _props.submitting,
                error = _props.error,
                _props$fields = _props.fields,
                password = _props$fields.password,
                confirm = _props$fields.confirm,
                isWif = this.state.isWif;

            return _react2.default.createElement(
                'form',
                { onSubmit: handleSubmit(function (data) {
                        return onKeyChanged(data);
                    }) },
                _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                        'div',
                        {
                            className: 'column small-12' + (password.touched && password.error ? ' error' : '')
                        },
                        _react2.default.createElement(
                            'label',
                            null,
                            'Change \u201C',
                            authType,
                            '\u201D Key (Password or WIF)'
                        ),
                        _react2.default.createElement('input', (0, _extends3.default)({
                            ref: 'key',
                            type: 'password'
                        }, (0, _ReduxForms.cleanReduxInput)(password), {
                            placeholder: 'Password or WIF',
                            autoComplete: 'off'
                        })),
                        _react2.default.createElement(
                            'span',
                            { className: 'error' },
                            password.touched && password.error && password.error,
                            '\xA0'
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        {
                            className: 'column small-12' + (confirm.touched && confirm.error ? ' error' : '')
                        },
                        _react2.default.createElement(
                            'label',
                            null,
                            (0, _counterpart2.default)('g.confirm_password')
                        ),
                        _react2.default.createElement('input', (0, _extends3.default)({
                            ref: 'keyConfirm',
                            type: 'password'
                        }, (0, _ReduxForms.cleanReduxInput)(confirm), {
                            disabled: isWif,
                            placeholder: 'Confirm Password',
                            autoComplete: 'off'
                        })),
                        _react2.default.createElement(
                            'div',
                            { className: 'error' },
                            confirm.touched && confirm.error && confirm.error,
                            '\xA0'
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'column small-12' },
                        error && _react2.default.createElement(
                            'div',
                            { className: 'error' },
                            error
                        ),
                        submitting && _react2.default.createElement(_LoadingIndicator2.default, { type: 'circle' }),
                        accountChanged && _react2.default.createElement(
                            'span',
                            null,
                            _react2.default.createElement(
                                'div',
                                { className: 'success' },
                                (0, _counterpart2.default)('g.account_updated')
                            ),
                            _react2.default.createElement('br', null),
                            _react2.default.createElement(
                                'button',
                                {
                                    className: 'button',
                                    type: 'button',
                                    onClick: onCancel
                                },
                                (0, _counterpart2.default)('g.close')
                            )
                        ),
                        !accountChanged && _react2.default.createElement(
                            'span',
                            null,
                            _react2.default.createElement(
                                'button',
                                {
                                    className: 'button',
                                    type: 'submit',
                                    disabled: submitting
                                },
                                (0, _counterpart2.default)('g.save')
                            ),
                            _react2.default.createElement(
                                'button',
                                {
                                    className: 'button',
                                    type: 'button',
                                    disabled: submitting,
                                    onClick: onCancel
                                },
                                (0, _counterpart2.default)('g.cancel')
                            )
                        )
                    )
                )
            );
        }
    }]);
    return KeyEdit;
}(_react.Component), _class.propTypes = {
    // HTML
    authType: _propTypes2.default.string.isRequired,
    onKeyChanged: _propTypes2.default.func.isRequired,
    onCancel: _propTypes2.default.func,
    accountChanged: _propTypes2.default.bool.isRequired,

    // Redux form
    oldAuth: _propTypes2.default.string.isRequired,
    fields: _propTypes2.default.shape({
        password: _propTypes2.default.object.isRequired,
        confirm: _propTypes2.default.object.isRequired
    }),
    handleSubmit: _propTypes2.default.func.isRequired,
    submitting: _propTypes2.default.bool.isRequired,
    error: _propTypes2.default.string
}, _temp);


var keyValidate = function keyValidate(values) {
    return {
        password: !values.password ? (0, _counterpart2.default)('g.required') : values.password.length < 32 ? (0, _counterpart2.default)('g.password_must_be_characters_or_more', { amount: 32 }) : _ecc.PublicKey.fromString(values.password) ? (0, _counterpart2.default)('g.need_password_or_key') : null,
        confirm: values.confirm !== values.password ? (0, _counterpart2.default)('g.passwords_do_not_match') : null
    };
};

exports.default = (0, _reduxForm.reduxForm)(
//config
{ form: 'KeyEdit', fields: ['password', 'confirm'], validate: keyValidate }, function (state, ownProps) {
    var oldAuth = ownProps.oldAuth;

    var private_keys = state.user.getIn(['current', 'private_keys']);
    var privateKey = private_keys && private_keys.find(function (d) {
        return d.toPublicKey().toString() === oldAuth;
    });
    return (0, _extends3.default)({}, ownProps, { privateKey: privateKey, oldAuth: oldAuth });
})(KeyEdit);
//# sourceMappingURL=KeyEdit.js.map