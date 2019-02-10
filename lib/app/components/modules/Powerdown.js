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

var _reactRedux = require('react-redux');

var _reactRangeslider = require('react-rangeslider');

var _reactRangeslider2 = _interopRequireDefault(_reactRangeslider);

var _counterpart = require('counterpart');

var _counterpart2 = _interopRequireDefault(_counterpart);

var _ReactForm = require('app/utils/ReactForm');

var _ReactForm2 = _interopRequireDefault(_ReactForm);

var _GlobalReducer = require('app/redux/GlobalReducer');

var globalActions = _interopRequireWildcard(_GlobalReducer);

var _TransactionReducer = require('app/redux/TransactionReducer');

var transactionActions = _interopRequireWildcard(_TransactionReducer);

var _UserReducer = require('app/redux/UserReducer');

var userActions = _interopRequireWildcard(_UserReducer);

var _client_config = require('app/client_config');

var _StateFunctions = require('app/utils/StateFunctions');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Powerdown = function (_React$Component) {
    (0, _inherits3.default)(Powerdown, _React$Component);

    function Powerdown(props, context) {
        (0, _classCallCheck3.default)(this, Powerdown);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Powerdown.__proto__ || (0, _getPrototypeOf2.default)(Powerdown)).call(this, props, context));

        var new_withdraw = void 0;
        if (props.to_withdraw - props.withdrawn > 0) {
            new_withdraw = props.to_withdraw - props.withdrawn;
        } else {
            // Set the default withrawal amount to (available - 5 STEEM)
            // This should be removed post hf20
            new_withdraw = Math.max(0, props.available_shares - (0, _StateFunctions.spToVestsf)(props.state, 5.001));
        }
        _this.state = {
            broadcasting: false,
            manual_entry: false,
            new_withdraw: new_withdraw
        };
        return _this;
    }

    (0, _createClass3.default)(Powerdown, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _state = this.state,
                broadcasting = _state.broadcasting,
                new_withdraw = _state.new_withdraw,
                manual_entry = _state.manual_entry;
            var _props = this.props,
                account = _props.account,
                available_shares = _props.available_shares,
                withdrawn = _props.withdrawn,
                to_withdraw = _props.to_withdraw,
                vesting_shares = _props.vesting_shares,
                delegated_vesting_shares = _props.delegated_vesting_shares;

            var formatSp = function formatSp(amount) {
                return (0, _StateFunctions.numberWithCommas)((0, _StateFunctions.vestsToSp)(_this2.props.state, amount));
            };
            var sliderChange = function sliderChange(value) {
                _this2.setState({ new_withdraw: value, manual_entry: false });
            };
            var inputChange = function inputChange(event) {
                event.preventDefault();
                var value = (0, _StateFunctions.spToVestsf)(_this2.props.state, parseFloat(event.target.value.replace(/,/g, '')));
                if (!isFinite(value)) {
                    value = new_withdraw;
                }
                _this2.setState({
                    new_withdraw: value,
                    manual_entry: event.target.value
                });
            };
            var powerDown = function powerDown(event) {
                event.preventDefault();
                _this2.setState({ broadcasting: true, error_message: undefined });
                var successCallback = _this2.props.successCallback;
                var errorCallback = function errorCallback(error) {
                    _this2.setState({
                        broadcasting: false,
                        error_message: String(error)
                    });
                };
                // workaround bad math in react-rangeslider
                var withdraw = new_withdraw;
                if (withdraw > vesting_shares - delegated_vesting_shares) {
                    withdraw = vesting_shares - delegated_vesting_shares;
                }
                var vesting_shares = withdraw.toFixed(6) + ' ' + _client_config.VEST_TICKER;
                _this2.props.withdrawVesting({
                    account: account,
                    vesting_shares: vesting_shares,
                    errorCallback: errorCallback,
                    successCallback: successCallback
                });
            };

            var notes = [];
            if (to_withdraw - withdrawn > 0) {
                var AMOUNT = formatSp(to_withdraw);
                var WITHDRAWN = formatSp(withdrawn);
                notes.push(_react2.default.createElement(
                    'li',
                    { key: 'already_power_down' },
                    (0, _counterpart2.default)('powerdown_jsx.already_power_down', {
                        AMOUNT: AMOUNT,
                        WITHDRAWN: WITHDRAWN,
                        LIQUID_TICKER: _client_config.LIQUID_TICKER
                    })
                ));
            }
            if (delegated_vesting_shares !== 0) {
                var _AMOUNT = formatSp(delegated_vesting_shares);
                notes.push(_react2.default.createElement(
                    'li',
                    { key: 'delegating' },
                    (0, _counterpart2.default)('powerdown_jsx.delegating', { AMOUNT: _AMOUNT, LIQUID_TICKER: _client_config.LIQUID_TICKER })
                ));
            }
            if (notes.length === 0) {
                var _AMOUNT2 = (0, _StateFunctions.vestsToSpf)(this.props.state, new_withdraw) / 13;
                _AMOUNT2 = _AMOUNT2.toFixed(_AMOUNT2 >= 10 ? 0 : 1);
                notes.push(_react2.default.createElement(
                    'li',
                    { key: 'per_week' },
                    (0, _counterpart2.default)('powerdown_jsx.per_week', { AMOUNT: _AMOUNT2, LIQUID_TICKER: _client_config.LIQUID_TICKER })
                ));
            }
            // NOTE: remove this post hf20
            if (new_withdraw > vesting_shares - delegated_vesting_shares - (0, _StateFunctions.spToVestsf)(this.props.state, 5)) {
                var _AMOUNT3 = 5;
                notes.push(_react2.default.createElement(
                    'li',
                    { key: 'warning', className: 'warning' },
                    (0, _counterpart2.default)('powerdown_jsx.warning', { AMOUNT: _AMOUNT3, VESTING_TOKEN: _client_config.VESTING_TOKEN })
                ));
            }

            if (this.state.error_message) {
                var MESSAGE = this.state.error_message;
                notes.push(_react2.default.createElement(
                    'li',
                    { key: 'error', className: 'error' },
                    (0, _counterpart2.default)('powerdown_jsx.error', { MESSAGE: MESSAGE })
                ));
            }

            return _react2.default.createElement(
                'div',
                { className: 'PowerdownModal' },
                _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                        'h3',
                        { className: 'column' },
                        (0, _counterpart2.default)('powerdown_jsx.power_down'),
                        ' ',
                        broadcasting
                    )
                ),
                _react2.default.createElement(_reactRangeslider2.default, {
                    value: new_withdraw,
                    step: 0.000001,
                    max: vesting_shares - delegated_vesting_shares,
                    format: formatSp,
                    onChange: sliderChange
                }),
                _react2.default.createElement(
                    'p',
                    { className: 'powerdown-amount' },
                    (0, _counterpart2.default)('powerdown_jsx.amount'),
                    _react2.default.createElement('br', null),
                    _react2.default.createElement('input', {
                        value: manual_entry ? manual_entry : formatSp(new_withdraw),
                        onChange: inputChange,
                        autoCorrect: false
                    }),
                    _client_config.LIQUID_TICKER
                ),
                _react2.default.createElement(
                    'ul',
                    { className: 'powerdown-notes' },
                    notes
                ),
                _react2.default.createElement(
                    'button',
                    {
                        type: 'submit',
                        className: 'button',
                        onClick: powerDown,
                        disabled: broadcasting
                    },
                    (0, _counterpart2.default)('powerdown_jsx.power_down')
                )
            );
        }
    }]);
    return Powerdown;
}(_react2.default.Component);

exports.default = (0, _reactRedux.connect)(
// mapStateToProps
function (state, ownProps) {
    var values = state.user.get('powerdown_defaults');
    var account = values.get('account');
    var to_withdraw = parseFloat(values.get('to_withdraw')) / 1e6;
    var withdrawn = parseFloat(values.get('withdrawn')) / 1e6;
    var vesting_shares = (0, _StateFunctions.assetFloat)(values.get('vesting_shares'), _client_config.VEST_TICKER);
    var delegated_vesting_shares = (0, _StateFunctions.assetFloat)(values.get('delegated_vesting_shares'), _client_config.VEST_TICKER);
    var available_shares = vesting_shares - to_withdraw - withdrawn - delegated_vesting_shares;

    return (0, _extends3.default)({}, ownProps, {
        account: account,
        available_shares: available_shares,
        delegated_vesting_shares: delegated_vesting_shares,
        state: state,
        to_withdraw: to_withdraw,
        vesting_shares: vesting_shares,
        withdrawn: withdrawn
    });
},
// mapDispatchToProps
function (dispatch) {
    return {
        successCallback: function successCallback() {
            dispatch(userActions.hidePowerdown());
        },
        powerDown: function powerDown(e) {
            e.preventDefault();
            var name = 'powerDown';
            dispatch(globalActions.showDialog({ name: name }));
        },
        withdrawVesting: function withdrawVesting(_ref) {
            var account = _ref.account,
                vesting_shares = _ref.vesting_shares,
                errorCallback = _ref.errorCallback,
                successCallback = _ref.successCallback;

            var successCallbackWrapper = function successCallbackWrapper() {
                dispatch(globalActions.getState({ url: '@' + account + '/transfers' }));
                return successCallback.apply(undefined, arguments);
            };
            dispatch(transactionActions.broadcastOperation({
                type: 'withdraw_vesting',
                operation: { account: account, vesting_shares: vesting_shares },
                errorCallback: errorCallback,
                successCallback: successCallbackWrapper
            }));
        }
    };
})(Powerdown);
//# sourceMappingURL=Powerdown.js.map