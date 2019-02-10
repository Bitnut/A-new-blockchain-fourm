'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _counterpart = require('counterpart');

var _counterpart2 = _interopRequireDefault(_counterpart);

var _client_config = require('app/client_config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var email_regex = /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$/;

var AddToWaitingList = function (_React$Component) {
    (0, _inherits3.default)(AddToWaitingList, _React$Component);

    function AddToWaitingList() {
        (0, _classCallCheck3.default)(this, AddToWaitingList);

        var _this = (0, _possibleConstructorReturn3.default)(this, (AddToWaitingList.__proto__ || (0, _getPrototypeOf2.default)(AddToWaitingList)).call(this));

        _this.onSubmit = function (e) {
            e.preventDefault();
            var email = _this.state.email;
            if (!email) return;
            fetch('/api/v1/update_email', {
                method: 'post',
                mode: 'no-cors',
                credentials: 'same-origin',
                headers: {
                    Accept: 'application/json',
                    'Content-type': 'application/json'
                },
                body: (0, _stringify2.default)({ csrf: $STM_csrf, email: email })
            }).then(function (r) {
                return r.json();
            }).then(function (res) {
                if (res.error || res.status !== 'ok') {
                    console.error('CreateAccount server error', res.error);
                } else {
                    // TODO: process errors
                }
                _this.setState({ submitted: true });
            }).catch(function (error) {
                console.error('Caught CreateAccount server error', error);
                _this.setState({ submitted: true });
            });
        };

        _this.state = { email: '', submitted: false, email_error: '' };
        _this.onEmailChange = _this.onEmailChange.bind(_this);
        return _this;
    }

    (0, _createClass3.default)(AddToWaitingList, [{
        key: 'onEmailChange',
        value: function onEmailChange(e) {
            var email = e.target.value.trim().toLowerCase();
            var email_error = '';
            if (!email_regex.test(email.toLowerCase())) email_error = (0, _counterpart2.default)('g.not_valid_email');
            this.setState({ email: email, email_error: email_error });
        }
    }, {
        key: 'render',
        value: function render() {
            var _state = this.state,
                email = _state.email,
                email_error = _state.email_error,
                submitted = _state.submitted;

            if (submitted) {
                return _react2.default.createElement(
                    'div',
                    { className: 'callout success' },
                    (0, _counterpart2.default)('g.thank_you_for_being_an_early_visitor_to_APP_NAME', {
                        APP_NAME: _client_config.APP_NAME
                    })
                );
            }
            return _react2.default.createElement(
                'form',
                { onSubmit: this.onSubmit },
                _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement(
                        'label',
                        null,
                        (0, _counterpart2.default)('g.email'),
                        _react2.default.createElement('input', {
                            ref: 'email',
                            type: 'text',
                            name: 'name',
                            autoComplete: 'off',
                            value: email,
                            onChange: this.onEmailChange
                        })
                    ),
                    _react2.default.createElement(
                        'p',
                        { className: 'error' },
                        email_error
                    )
                ),
                _react2.default.createElement('br', null),
                _react2.default.createElement('input', {
                    type: 'submit',
                    className: 'button secondary',
                    value: (0, _counterpart2.default)('g.submit')
                })
            );
        }
    }]);
    return AddToWaitingList;
}(_react2.default.Component);

exports.default = AddToWaitingList;
//# sourceMappingURL=AddToWaitingList.js.map