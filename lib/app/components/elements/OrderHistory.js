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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _OrderhistoryRow = require('./OrderhistoryRow');

var _OrderhistoryRow2 = _interopRequireDefault(_OrderhistoryRow);

var _counterpart = require('counterpart');

var _counterpart2 = _interopRequireDefault(_counterpart);

var _client_config = require('app/client_config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var OrderHistory = function (_React$Component) {
    (0, _inherits3.default)(OrderHistory, _React$Component);

    function OrderHistory() {
        (0, _classCallCheck3.default)(this, OrderHistory);

        var _this = (0, _possibleConstructorReturn3.default)(this, (OrderHistory.__proto__ || (0, _getPrototypeOf2.default)(OrderHistory)).call(this));

        _this.state = {
            historyIndex: 0,
            animate: false
        };
        return _this;
    }

    (0, _createClass3.default)(OrderHistory, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            setTimeout(function () {
                _this2.setState({
                    animate: true
                });
            }, 2000);
        }
    }, {
        key: 'renderHistoryRows',
        value: function renderHistoryRows(history, buy) {
            var _this3 = this;

            if (!history.length) {
                return null;
            }

            var historyIndex = this.state.historyIndex;


            return history.map(function (order, index) {
                if (index >= historyIndex && index < historyIndex + 10) {
                    return _react2.default.createElement(_OrderhistoryRow2.default, {
                        key: order.date.getTime() + order.getStringPrice() + order.getStringSBD(),
                        index: index,
                        order: order,
                        animate: _this3.state.animate
                    });
                }
            }).filter(function (a) {
                return !!a;
            });
        }
    }, {
        key: '_setHistoryPage',
        value: function _setHistoryPage(back) {
            var _this4 = this;

            var newState = {};
            var newIndex = this.state.historyIndex + (back ? 10 : -10);
            newState.historyIndex = Math.min(Math.max(0, newIndex), this.props.history.length - 10);

            // Disable animations while paging
            if (newIndex !== this.state.historyIndex) {
                newState.animate = false;
            }
            // Reenable animatons after paging complete
            this.setState(newState, function () {
                _this4.setState({ animate: true });
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var history = this.props.history;
            var historyIndex = this.state.historyIndex;


            return _react2.default.createElement(
                'section',
                null,
                _react2.default.createElement(
                    'table',
                    { className: 'Market__trade-history' },
                    _react2.default.createElement(
                        'thead',
                        null,
                        _react2.default.createElement(
                            'tr',
                            null,
                            _react2.default.createElement(
                                'th',
                                null,
                                (0, _counterpart2.default)('g.date')
                            ),
                            _react2.default.createElement(
                                'th',
                                null,
                                (0, _counterpart2.default)('g.price')
                            ),
                            _react2.default.createElement(
                                'th',
                                null,
                                _client_config.LIQUID_TOKEN
                            ),
                            _react2.default.createElement(
                                'th',
                                null,
                                _client_config.DEBT_TOKEN_SHORT + ' (' + _client_config.CURRENCY_SIGN + ')'
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'tbody',
                        null,
                        this.renderHistoryRows(history)
                    )
                ),
                _react2.default.createElement(
                    'nav',
                    null,
                    _react2.default.createElement(
                        'ul',
                        { className: 'pager' },
                        _react2.default.createElement(
                            'li',
                            null,
                            _react2.default.createElement(
                                'div',
                                {
                                    className: 'button tiny hollow float-left ' + (historyIndex === 0 ? ' disabled' : ''),
                                    onClick: this._setHistoryPage.bind(this, false),
                                    'aria-label': 'Previous'
                                },
                                _react2.default.createElement(
                                    'span',
                                    { 'aria-hidden': 'true' },
                                    '\u2190 ',
                                    (0, _counterpart2.default)('g.newer')
                                )
                            )
                        ),
                        _react2.default.createElement(
                            'li',
                            null,
                            _react2.default.createElement(
                                'div',
                                {
                                    className: 'button tiny hollow float-right ' + (historyIndex >= history.length - 10 ? ' disabled' : ''),
                                    onClick: this._setHistoryPage.bind(this, true),
                                    'aria-label': 'Next'
                                },
                                _react2.default.createElement(
                                    'span',
                                    { 'aria-hidden': 'true' },
                                    (0, _counterpart2.default)('g.older'),
                                    ' \u2192'
                                )
                            )
                        )
                    )
                )
            );
        }
    }]);
    return OrderHistory;
}(_react2.default.Component);

exports.default = OrderHistory;
//# sourceMappingURL=OrderHistory.js.map