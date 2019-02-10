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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _constants = require('shared/constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Approval = function (_React$Component) {
    (0, _inherits3.default)(Approval, _React$Component);

    function Approval(props) {
        (0, _classCallCheck3.default)(this, Approval);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Approval.__proto__ || (0, _getPrototypeOf2.default)(Approval)).call(this, props));

        _this.state = {
            confirm_email: false
        };
        return _this;
    }

    (0, _createClass3.default)(Approval, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            if (this.props.location.query.confirm_email) {
                this.setState({ confirm_email: true });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            if (process.env.BROWSER && this.props.viewMode === _constants.VIEW_MODE_WHISTLE) {
                window.postMessage(_constants.WHISTLE_SIGNUP_COMPLETE);
            }
            var body = '';
            if (this.state.confirm_email) {
                body = _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement(
                        'h4',
                        null,
                        'Thanks for confirming your email!'
                    ),
                    _react2.default.createElement(
                        'p',
                        null,
                        'After validating your sign up request with us we\'ll look it over for approval. As soon as your turn is up and you\'re approved, you\'ll be sent a link to finalize your account!'
                    ),
                    _react2.default.createElement(
                        'p',
                        null,
                        'You\'ll be among the earliest members of the Steemit community!'
                    )
                );
            } else {
                body = _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement(
                        'h4',
                        null,
                        'Thanks for confirming your phone number!'
                    ),
                    _react2.default.createElement(
                        'p',
                        null,
                        'You\'re a few steps away from getting to the top of the list. Check your email and click the email validation link.'
                    ),
                    _react2.default.createElement(
                        'p',
                        null,
                        'After validating your sign up request with us we\'ll look it over for approval. As soon as your turn is up and you\'re approved, you\'ll be sent a link to finalize your account!'
                    ),
                    _react2.default.createElement(
                        'p',
                        null,
                        'You\'ll be among the earliest members of the Steemit community!'
                    )
                );
            }
            return _react2.default.createElement(
                'div',
                { className: 'row' },
                _react2.default.createElement(
                    'div',
                    {
                        className: 'column',
                        style: { maxWidth: '36rem', margin: '0 auto' }
                    },
                    _react2.default.createElement(
                        'div',
                        null,
                        body
                    )
                )
            );
        }
    }]);
    return Approval;
}(_react2.default.Component);

module.exports = {
    path: 'approval',
    component: (0, _reactRedux.connect)(function (state) {
        return {
            viewMode: state.app.get('viewMode')
        };
    }, function (dispatch) {
        return {};
    })(Approval)
};
//# sourceMappingURL=Approval.js.map