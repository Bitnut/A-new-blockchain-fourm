'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

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

var _reactRedux = require('react-redux');

var _SvgImage = require('app/components/elements/SvgImage');

var _SvgImage2 = _interopRequireDefault(_SvgImage);

var _AddToWaitingList = require('app/components/modules/AddToWaitingList');

var _AddToWaitingList2 = _interopRequireDefault(_AddToWaitingList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SignUp = function (_React$Component) {
    (0, _inherits3.default)(SignUp, _React$Component);

    function SignUp() {
        (0, _classCallCheck3.default)(this, SignUp);

        var _this = (0, _possibleConstructorReturn3.default)(this, (SignUp.__proto__ || (0, _getPrototypeOf2.default)(SignUp)).call(this));

        _this.state = { waiting_list: false };
        return _this;
    }

    (0, _createClass3.default)(SignUp, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            if ($STM_Config.read_only_mode) {
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
                                'Due to server maintenance we are running in read only mode. We are sorry for the inconvenience.'
                            )
                        )
                    )
                );
            }

            if (this.props.serverBusy || $STM_Config.disable_signups) {
                return _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                        'div',
                        {
                            className: 'column callout',
                            style: { margin: '20px', padding: '40px' }
                        },
                        _react2.default.createElement(
                            'p',
                            null,
                            'Membership to Steemit.com is now under invitation only because of unexpectedly high sign up rate. Submit your email to get on the waiting list.'
                        ),
                        _react2.default.createElement(_AddToWaitingList2.default, null)
                    )
                );
            }

            return _react2.default.createElement(
                'div',
                { className: 'SignUp' },
                _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                        'div',
                        { className: 'column' },
                        _react2.default.createElement(
                            'h3',
                            null,
                            'Sign Up'
                        ),
                        _react2.default.createElement(
                            'p',
                            null,
                            'Steemit funds each account with over',
                            ' ',
                            this.props.signup_bonus,
                            ' worth of Steem Power; to prevent abuse, we require new users to login via social media.',
                            _react2.default.createElement('br', null),
                            'Your personal information will be kept',
                            ' ',
                            _react2.default.createElement(
                                'a',
                                { href: '/privacy.html', target: '_blank' },
                                'private'
                            ),
                            '.'
                        )
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                        'div',
                        { className: 'column large-4 shrink' },
                        _react2.default.createElement(_SvgImage2.default, { name: 'facebook', width: '64px', height: '64px' })
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'column large-8' },
                        _react2.default.createElement(
                            'a',
                            {
                                href: '/connect/facebook',
                                className: 'button SignUp--fb-button'
                            },
                            'Continue with Facebook'
                        )
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    '\xA0'
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                        'div',
                        { className: 'column large-4 shrink' },
                        _react2.default.createElement(_SvgImage2.default, { name: 'reddit', width: '64px', height: '64px' })
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'column large-8' },
                        _react2.default.createElement(
                            'a',
                            {
                                href: '/connect/reddit',
                                className: 'button SignUp--reddit-button'
                            },
                            'Continue with Reddit'
                        ),
                        _react2.default.createElement('br', null),
                        _react2.default.createElement(
                            'span',
                            { className: 'secondary' },
                            '(requires 5 or more Reddit comment karma)'
                        )
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                        'div',
                        { className: 'column' },
                        _react2.default.createElement('br', null),
                        'Don\'t have a Facebook or Reddit account? ',
                        _react2.default.createElement('br', null),
                        this.state.waiting_list ? _react2.default.createElement(_AddToWaitingList2.default, null) : _react2.default.createElement(
                            'a',
                            {
                                href: '#',
                                onClick: function onClick() {
                                    return _this2.setState({ waiting_list: true });
                                }
                            },
                            _react2.default.createElement(
                                'strong',
                                null,
                                ' ',
                                'Subscribe to get a notification when SMS confirmation is available.'
                            )
                        )
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                        'div',
                        { className: 'column' },
                        _react2.default.createElement('br', null),
                        _react2.default.createElement(
                            'p',
                            { className: 'secondary' },
                            'By verifying your account you agree to the Steemit',
                            ' ',
                            _react2.default.createElement(
                                'a',
                                { href: '/tos.html', target: '_blank' },
                                'terms and conditions'
                            ),
                            '.'
                        )
                    )
                )
            );
        }
    }]);
    return SignUp;
}(_react2.default.Component);

exports.default = (0, _reactRedux.connect)(function (state) {
    return {
        signup_bonus: state.offchain.get('signup_bonus'),
        serverBusy: state.offchain.get('serverBusy')
    };
})(SignUp);
//# sourceMappingURL=SignUp.js.map