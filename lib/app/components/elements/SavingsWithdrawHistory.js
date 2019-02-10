'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

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

var _TransactionReducer = require('app/redux/TransactionReducer');

var transactionActions = _interopRequireWildcard(_TransactionReducer);

var _GlobalReducer = require('app/redux/GlobalReducer');

var globalActions = _interopRequireWildcard(_GlobalReducer);

var _UserReducer = require('app/redux/UserReducer');

var userActions = _interopRequireWildcard(_UserReducer);

var _shouldComponentUpdate = require('app/utils/shouldComponentUpdate');

var _shouldComponentUpdate2 = _interopRequireDefault(_shouldComponentUpdate);

var _LoadingIndicator = require('app/components/elements/LoadingIndicator');

var _LoadingIndicator2 = _interopRequireDefault(_LoadingIndicator);

var _TimeAgoWrapper = require('app/components/elements/TimeAgoWrapper');

var _TimeAgoWrapper2 = _interopRequireDefault(_TimeAgoWrapper);

var _Memo = require('app/components/elements/Memo');

var _Memo2 = _interopRequireDefault(_Memo);

var _reactRedux = require('react-redux');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SavingsWithdrawHistory = function (_React$Component) {
    (0, _inherits3.default)(SavingsWithdrawHistory, _React$Component);

    function SavingsWithdrawHistory() {
        (0, _classCallCheck3.default)(this, SavingsWithdrawHistory);

        var _this = (0, _possibleConstructorReturn3.default)(this, (SavingsWithdrawHistory.__proto__ || (0, _getPrototypeOf2.default)(SavingsWithdrawHistory)).call(this));

        _this.state = {};
        _this.shouldComponentUpdate = (0, _shouldComponentUpdate2.default)(_this, 'SavingsWithdrawHistory');
        return _this;
    }

    (0, _createClass3.default)(SavingsWithdrawHistory, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            this.loadHistory();
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            this.loadHistory(false, nextProps);
        }
    }, {
        key: 'loadHistory',
        value: function loadHistory() {
            var force = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
            var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.props;
            var savings_withdraws = props.savings_withdraws;
            var loadHistory = props.loadHistory,
                username = props.username;

            if ((force || !savings_withdraws) && username) loadHistory(username);
        }
    }, {
        key: 'initActions',
        value: function initActions() {
            var _this2 = this;

            var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;
            var savings_withdraws = props.savings_withdraws;

            savings_withdraws.forEach(function (withdraw) {
                var fro = withdraw.get('from');
                var request_id = withdraw.get('request_id');
                _this2['cancel_' + request_id] = function () {
                    var cancelWithdraw = props.cancelWithdraw;

                    _this2.setState((0, _defineProperty3.default)({}, 'loading_' + request_id, true));
                    var success = function success() {
                        _this2.loadHistory();
                        _this2.setState((0, _defineProperty3.default)({}, 'loading_' + request_id, false));
                    };
                    var fail = function fail() {
                        _this2.setState((0, _defineProperty3.default)({}, 'loading_' + request_id, false));
                    };
                    cancelWithdraw(fro, request_id, success, fail);
                };
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var savings_withdraws = this.props.savings_withdraws;

            if (!savings_withdraws || !savings_withdraws.count()) return null;
            this.initActions();
            var idx = 0;
            var rows = savings_withdraws.map(function (withdraw) {
                var _withdraw$toJS = withdraw.toJS(),
                    complete = _withdraw$toJS.complete,
                    amount = _withdraw$toJS.amount,
                    to = _withdraw$toJS.to,
                    from = _withdraw$toJS.from,
                    memo = _withdraw$toJS.memo,
                    request_id = _withdraw$toJS.request_id;

                var dest = to === from ? (0, _counterpart2.default)('savingswithdrawhistory_jsx.to', { to: to }) : (0, _counterpart2.default)('savingswithdrawhistory_jsx.from_to', { from: from, to: to });
                var loading = _this3.state['loading_' + request_id];
                return _react2.default.createElement(
                    'tr',
                    { key: idx++ },
                    _react2.default.createElement(
                        'td',
                        null,
                        _react2.default.createElement(_TimeAgoWrapper2.default, { date: complete })
                    ),
                    _react2.default.createElement(
                        'td',
                        null,
                        (0, _counterpart2.default)('savingswithdrawhistory_jsx.withdraw', { amount: amount }),
                        ' ',
                        dest,
                        '\xA0',
                        !loading && _react2.default.createElement(
                            'span',
                            null,
                            '(',
                            _react2.default.createElement(
                                'a',
                                { onClick: _this3['cancel_' + request_id] },
                                (0, _counterpart2.default)('g.cancel')
                            ),
                            ')'
                        ),
                        loading && _react2.default.createElement(
                            'span',
                            null,
                            _react2.default.createElement(_LoadingIndicator2.default, { type: 'circle' })
                        )
                    ),
                    _react2.default.createElement(
                        'td',
                        null,
                        _react2.default.createElement(_Memo2.default, { text: memo })
                    )
                );
            });
            return _react2.default.createElement(
                'div',
                { className: 'SavingsWithdrawHistory' },
                _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                        'div',
                        { className: 'column small-12' },
                        _react2.default.createElement(
                            'h4',
                            null,
                            (0, _counterpart2.default)('savingswithdrawhistory_jsx.pending_savings_withdrawals')
                        ),
                        _react2.default.createElement(
                            'table',
                            null,
                            _react2.default.createElement(
                                'tbody',
                                null,
                                rows
                            )
                        )
                    )
                )
            );
        }
    }]);
    return SavingsWithdrawHistory;
}(_react2.default.Component); /* eslint react/prop-types: 0 */


exports.default = (0, _reactRedux.connect)(function (state, ownProps) {
    var username = state.user.getIn(['current', 'username']);
    var savings_withdraws = state.user.get('savings_withdraws');
    return (0, _extends3.default)({}, ownProps, {
        username: username,
        savings_withdraws: savings_withdraws
    });
}, function (dispatch) {
    return {
        loadHistory: function loadHistory() {
            return dispatch(userActions.loadSavingsWithdraw({}));
        },
        cancelWithdraw: function cancelWithdraw(fro, request_id, success, errorCallback) {
            var confirm = (0, _counterpart2.default)('savingswithdrawhistory_jsx.cancel_this_withdraw_request');
            var successCallback = function successCallback() {
                // refresh transfer history
                dispatch(globalActions.getState({ url: '@' + fro + '/transfers' }));
                success();
            };
            dispatch(transactionActions.broadcastOperation({
                type: 'cancel_transfer_from_savings',
                operation: { from: fro, request_id: request_id },
                confirm: confirm,
                successCallback: successCallback,
                errorCallback: errorCallback
            }));
        }
    };
})(SavingsWithdrawHistory);
//# sourceMappingURL=SavingsWithdrawHistory.js.map