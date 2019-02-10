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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reduxForm = require('redux-form');

var _TransactionReducer = require('app/redux/TransactionReducer');

var transactionActions = _interopRequireWildcard(_TransactionReducer);

var _AppReducer = require('app/redux/AppReducer');

var appActions = _interopRequireWildcard(_AppReducer);

var _shouldComponentUpdate = require('app/utils/shouldComponentUpdate');

var _shouldComponentUpdate2 = _interopRequireDefault(_shouldComponentUpdate);

var _TransactionError = require('app/components/elements/TransactionError');

var _TransactionError2 = _interopRequireDefault(_TransactionError);

var _LoadingIndicator = require('app/components/elements/LoadingIndicator');

var _LoadingIndicator2 = _interopRequireDefault(_LoadingIndicator);

var _ReduxForms = require('app/utils/ReduxForms');

var _counterpart = require('counterpart');

var _counterpart2 = _interopRequireDefault(_counterpart);

var _client_config = require('app/client_config');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// @deprecated, instead use: app/utils/ReactForm.js
var ConvertToSteem = function (_React$Component) {
    (0, _inherits3.default)(ConvertToSteem, _React$Component);

    function ConvertToSteem() {
        (0, _classCallCheck3.default)(this, ConvertToSteem);

        var _this = (0, _possibleConstructorReturn3.default)(this, (ConvertToSteem.__proto__ || (0, _getPrototypeOf2.default)(ConvertToSteem)).call(this));

        _this.shouldComponentUpdate = (0, _shouldComponentUpdate2.default)(_this, 'ConvertToSteem');

        _this.dispatchSubmit = function () {
            var _this$props = _this.props,
                convert = _this$props.convert,
                owner = _this$props.owner,
                onClose = _this$props.onClose;
            var amount = _this.props.fields.amount;

            var success = function success() {
                if (onClose) onClose();
                _this.setState({ loading: false });
            };
            var error = function error() {
                _this.setState({ loading: false });
            };
            convert(owner, amount.value, success, error);
            _this.setState({ loading: true });
        };

        _this.state = {};
        return _this;
    }

    (0, _createClass3.default)(ConvertToSteem, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            _reactDom2.default.findDOMNode(this.refs.amt).focus();
        }
    }, {
        key: 'render',
        value: function render() {
            var dispatchSubmit = this.dispatchSubmit;
            var _props = this.props,
                onClose = _props.onClose,
                handleSubmit = _props.handleSubmit,
                submitting = _props.submitting;
            var amount = this.props.fields.amount;
            var loading = this.state.loading;

            return _react2.default.createElement(
                'form',
                {
                    onSubmit: handleSubmit(function (data) {
                        dispatchSubmit(data);
                    })
                },
                _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                        'div',
                        { className: 'small-12 columns' },
                        _react2.default.createElement(
                            'h1',
                            null,
                            (0, _counterpart2.default)('converttosteem_jsx.convert_to_LIQUID_TOKEN', {
                                LIQUID_TOKEN: _client_config.LIQUID_TOKEN
                            })
                        ),
                        _react2.default.createElement(
                            'p',
                            null,
                            (0, _counterpart2.default)('converttosteem_jsx.DEBT_TOKEN_will_be_unavailable', { DEBT_TOKEN: _client_config.DEBT_TOKEN })
                        ),
                        _react2.default.createElement(
                            'p',
                            null,
                            (0, _counterpart2.default)('converttosteem_jsx.your_existing_DEBT_TOKEN_are_liquid_and_transferable', { link: (0, _counterpart2.default)('g.buy_or_sell'), DEBT_TOKEN: _client_config.DEBT_TOKEN })
                        ),
                        _react2.default.createElement(
                            'p',
                            null,
                            (0, _counterpart2.default)('converttosteem_jsx.this_is_a_price_feed_conversion')
                        )
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                        'div',
                        { className: 'small-12 columns' },
                        _react2.default.createElement(
                            'label',
                            null,
                            (0, _counterpart2.default)('g.amount')
                        ),
                        _react2.default.createElement('input', (0, _extends3.default)({
                            type: 'amount',
                            ref: 'amt'
                        }, (0, _ReduxForms.cleanReduxInput)(amount), {
                            autoComplete: 'off',
                            disabled: loading
                        })),
                        '\xA0',
                        _client_config.DEBT_TOKEN,
                        _react2.default.createElement('br', null),
                        _react2.default.createElement(
                            'div',
                            { className: 'error' },
                            amount.touched && amount.error && amount.error,
                            '\xA0'
                        )
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                        'div',
                        { className: 'small-12 columns' },
                        _react2.default.createElement(_TransactionError2.default, { opType: 'convert' }),
                        loading && _react2.default.createElement(
                            'span',
                            null,
                            _react2.default.createElement(_LoadingIndicator2.default, { type: 'circle' })
                        ),
                        _react2.default.createElement('br', null),
                        _react2.default.createElement(
                            'div',
                            null,
                            _react2.default.createElement(
                                'button',
                                {
                                    type: 'submit',
                                    className: 'button',
                                    disabled: loading
                                },
                                (0, _counterpart2.default)('g.convert')
                            ),
                            _react2.default.createElement(
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
                )
            );
        }
    }]);
    return ConvertToSteem;
}(_react2.default.Component); /* eslint react/prop-types: 0 */


exports.default = (0, _reduxForm.reduxForm)({ form: 'convertToSteem', fields: ['amount'] },
// mapStateToProps
function (state, ownProps) {
    var current = state.user.get('current');
    var username = current.get('username');
    var account = state.global.getIn(['accounts', username]);
    var sbd_balance = account.get('sbd_balance');
    var max = sbd_balance.split(' ')[0];
    var validate = function validate(values) {
        return {
            amount: !values.amount ? (0, _counterpart2.default)('g.required') : isNaN(values.amount) || parseFloat(values.amount) <= 0 ? (0, _counterpart2.default)('g.invalid_amount') : parseFloat(values.amount) > parseFloat(max) ? (0, _counterpart2.default)('g.insufficient_balance') : null
        };
    };
    return (0, _extends3.default)({}, ownProps, {
        validate: validate,
        owner: username
    });
},
// mapDispatchToProps
function (dispatch) {
    return {
        convert: function convert(owner, amt, success, error) {
            var amount = [parseFloat(amt).toFixed(3), _client_config.DEBT_TICKER].join(' ');
            var requestid = Math.floor(Date.now() / 1000);
            var conf = (0, _counterpart2.default)('postfull_jsx.in_week_convert_DEBT_TOKEN_to_LIQUID_TOKEN', { amount: amount.split(' ')[0], DEBT_TOKEN: _client_config.DEBT_TOKEN, LIQUID_TOKEN: _client_config.LIQUID_TOKEN });
            dispatch(transactionActions.broadcastOperation({
                type: 'convert',
                operation: { owner: owner, requestid: requestid, amount: amount },
                confirm: conf + '?',
                successCallback: function successCallback() {
                    success();
                    dispatch(appActions.addNotification({
                        key: 'convert_sd_to_steem_' + Date.now(),
                        message: (0, _counterpart2.default)('g.order_placed', { order: conf }),
                        dismissAfter: 5000
                    }));
                },
                errorCallback: function errorCallback() {
                    error();
                }
            }));
        }
    };
})(ConvertToSteem);
//# sourceMappingURL=ConvertToSteem.js.map