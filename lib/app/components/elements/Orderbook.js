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

var _OrderbookRow = require('./OrderbookRow');

var _OrderbookRow2 = _interopRequireDefault(_OrderbookRow);

var _counterpart = require('counterpart');

var _counterpart2 = _interopRequireDefault(_counterpart);

var _client_config = require('app/client_config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Orderbook = function (_React$Component) {
    (0, _inherits3.default)(Orderbook, _React$Component);

    function Orderbook() {
        (0, _classCallCheck3.default)(this, Orderbook);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Orderbook.__proto__ || (0, _getPrototypeOf2.default)(Orderbook)).call(this));

        _this.state = {
            buyIndex: 0,
            sellIndex: 0,
            animate: false
        };
        return _this;
    }

    (0, _createClass3.default)(Orderbook, [{
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
        key: '_setBuySellPage',
        value: function _setBuySellPage(back) {
            var _this3 = this;

            var indexKey = this.props.side === 'bids' ? 'buyIndex' : 'sellIndex';

            var newIndex = this.state[indexKey] + (back ? 10 : -10);

            newIndex = Math.min(Math.max(0, newIndex), this.props.orders.length - 10);

            var newState = {};
            newState[indexKey] = newIndex;
            // Disable animations while paging
            if (newIndex !== this.state[indexKey]) {
                newState.animate = false;
            }
            // Reenable animatons after paging complete
            this.setState(newState, function () {
                _this3.setState({ animate: true });
            });
        }
    }, {
        key: 'renderBuySellHeader',
        value: function renderBuySellHeader() {
            var buy = this.props.side === 'bids';

            return _react2.default.createElement(
                'thead',
                null,
                _react2.default.createElement(
                    'tr',
                    null,
                    _react2.default.createElement(
                        'th',
                        null,
                        buy ? (0, _counterpart2.default)('market_jsx.total_DEBT_TOKEN_SHORT_CURRENCY_SIGN', { DEBT_TOKEN_SHORT: _client_config.DEBT_TOKEN_SHORT, CURRENCY_SIGN: _client_config.CURRENCY_SIGN }) : (0, _counterpart2.default)('g.price')
                    ),
                    _react2.default.createElement(
                        'th',
                        null,
                        buy ? _client_config.DEBT_TOKEN_SHORT + ' (' + _client_config.CURRENCY_SIGN + ')' : _client_config.LIQUID_TOKEN
                    ),
                    _react2.default.createElement(
                        'th',
                        null,
                        buy ? _client_config.LIQUID_TOKEN : _client_config.DEBT_TOKEN_SHORT + ' (' + _client_config.CURRENCY_SIGN + ')'
                    ),
                    _react2.default.createElement(
                        'th',
                        null,
                        buy ? (0, _counterpart2.default)('g.price') : (0, _counterpart2.default)('market_jsx.total_DEBT_TOKEN_SHORT_CURRENCY_SIGN', { DEBT_TOKEN_SHORT: _client_config.DEBT_TOKEN_SHORT, CURRENCY_SIGN: _client_config.CURRENCY_SIGN })
                    )
                )
            );
        }
    }, {
        key: 'renderOrdersRows',
        value: function renderOrdersRows() {
            var _this4 = this;

            var _props = this.props,
                orders = _props.orders,
                side = _props.side;

            var buy = side === 'bids';

            if (!orders.length) {
                return null;
            }
            var _state = this.state,
                buyIndex = _state.buyIndex,
                sellIndex = _state.sellIndex;


            var total = 0;
            return orders.map(function (order, index) {
                total += order.getSBDAmount();
                if (index >= (buy ? buyIndex : sellIndex) && index < (buy ? buyIndex : sellIndex) + 10) {
                    return _react2.default.createElement(_OrderbookRow2.default, {
                        onClick: _this4.props.onClick,
                        animate: _this4.state.animate,
                        key: side + order.getStringSBD() + order.getStringPrice(),
                        index: index,
                        order: order,
                        side: side,
                        total: total
                    });
                }
                return null;
            }).filter(function (a) {
                return !!a;
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var orders = this.props.orders;

            var buy = this.props.side === 'bids';
            var _state2 = this.state,
                buyIndex = _state2.buyIndex,
                sellIndex = _state2.sellIndex;


            var currentIndex = buy ? buyIndex : sellIndex;

            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'table',
                    { className: 'Market__orderbook' },
                    this.renderBuySellHeader(),
                    _react2.default.createElement(
                        'tbody',
                        null,
                        this.renderOrdersRows()
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
                                    className: 'button tiny hollow ' + (buy ? 'float-left' : 'float-left') + (currentIndex === 0 ? ' disabled' : ''),
                                    onClick: this._setBuySellPage.bind(this, false),
                                    'aria-label': 'Previous'
                                },
                                _react2.default.createElement(
                                    'span',
                                    { 'aria-hidden': 'true' },
                                    '\u2190',
                                    ' ',
                                    buy ? (0, _counterpart2.default)('market_jsx.higher') : (0, _counterpart2.default)('market_jsx.lower')
                                )
                            )
                        ),
                        _react2.default.createElement(
                            'li',
                            null,
                            _react2.default.createElement(
                                'div',
                                {
                                    className: 'button tiny hollow ' + (buy ? 'float-right' : 'float-right') + (currentIndex >= orders.length - 10 ? ' disabled' : ''),
                                    onClick: this._setBuySellPage.bind(this, true),
                                    'aria-label': 'Next'
                                },
                                _react2.default.createElement(
                                    'span',
                                    { 'aria-hidden': 'true' },
                                    buy ? (0, _counterpart2.default)('market_jsx.lower') : (0, _counterpart2.default)('market_jsx.higher'),
                                    ' ',
                                    '\u2192'
                                )
                            )
                        )
                    )
                )
            );
        }
    }]);
    return Orderbook;
}(_react2.default.Component);

exports.default = Orderbook;
//# sourceMappingURL=Orderbook.js.map