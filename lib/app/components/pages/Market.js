'use strict';

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

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
//import Highcharts from 'highcharts';


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRedux = require('react-redux');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _immutable = require('immutable');

var _TransactionReducer = require('app/redux/TransactionReducer');

var transactionActions = _interopRequireWildcard(_TransactionReducer);

var _AppReducer = require('app/redux/AppReducer');

var appActions = _interopRequireWildcard(_AppReducer);

var _MarketReducer = require('app/redux/MarketReducer');

var marketActions = _interopRequireWildcard(_MarketReducer);

var _TransactionError = require('app/components/elements/TransactionError');

var _TransactionError2 = _interopRequireDefault(_TransactionError);

var _DepthChart = require('app/components/elements/DepthChart');

var _DepthChart2 = _interopRequireDefault(_DepthChart);

var _Orderbook = require('app/components/elements/Orderbook');

var _Orderbook2 = _interopRequireDefault(_Orderbook);

var _OrderHistory = require('app/components/elements/OrderHistory');

var _OrderHistory2 = _interopRequireDefault(_OrderHistory);

var _GoogleAd = require('app/components/elements/GoogleAd');

var _GoogleAd2 = _interopRequireDefault(_GoogleAd);

var _MarketClasses = require('app/utils/MarketClasses');

var _MarketUtils = require('app/utils/MarketUtils');

var _counterpart = require('counterpart');

var _counterpart2 = _interopRequireDefault(_counterpart);

var _client_config = require('app/client_config');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Market = (_temp = _class = function (_React$Component) {
    (0, _inherits3.default)(Market, _React$Component);

    function Market(props) {
        (0, _classCallCheck3.default)(this, Market);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Market.__proto__ || (0, _getPrototypeOf2.default)(Market)).call(this, props));

        _this.shouldComponentUpdate = function (nextProps, nextState) {
            if (_this.props.user !== nextProps.user && nextProps.user) {
                _this.props.reload(nextProps.user);
            }

            if (nextState.buy_disabled != _this.state.buy_disabled || nextState.sell_disabled != _this.state.sell_disabled) {
                return true;
            }

            if (nextState.buy_price_warning != _this.state.buy_price_warning || nextState.sell_price_warning != _this.state.sell_price_warning) {
                return true;
            }

            if (nextState.open_orders_sort !== _this.props.open_orders_sort) {
                return true;
            }

            var tc = typeof _this.props.ticker == 'undefined' || _this.props.ticker.latest !== nextProps.ticker.latest || _this.props.ticker.sbd_volume !== nextProps.ticker.sbd_volume;

            var bc = typeof _this.props.orderbook == 'undefined' || _this.props.orderbook['asks'].length != nextProps.orderbook['asks'].length || _this.props.orderbook['bids'].length != nextProps.orderbook['bids'].length;

            var oc = (0, _typeof3.default)(nextProps.open_orders) !== undefined && (typeof _this.props.open_orders == 'undefined' || (0, _stringify2.default)(_this.props.open_orders) != (0, _stringify2.default)(nextProps.open_orders));

            // Update if ticker info changed, order book changed size, or open orders length changed.
            //if(tc || bc || oc) console.log("tc?", tc, "bc?", bc, "oc?", oc)
            return tc || bc || oc;
        };

        _this.buySteem = function (e) {
            e.preventDefault();
            var _this$props = _this.props,
                placeOrder = _this$props.placeOrder,
                user = _this$props.user;

            if (!user) return;
            var amount_to_sell = parseFloat(_reactDom2.default.findDOMNode(_this.refs.buySteem_total).value);
            var min_to_receive = parseFloat(_reactDom2.default.findDOMNode(_this.refs.buySteem_amount).value);
            var price = (amount_to_sell / min_to_receive).toFixed(6);
            var lowest_ask = _this.props.ticker.lowest_ask;

            placeOrder(user, amount_to_sell + ' ' + _client_config.DEBT_TICKER, min_to_receive + ' ' + _client_config.LIQUID_TICKER, '' + _client_config.CURRENCY_SIGN + price + '/' + _client_config.LIQUID_TICKER, !!_this.state.buy_price_warning, lowest_ask, function (msg) {
                _this.props.notify(msg);
                _this.props.reload(user);
            });
        };

        _this.sellSteem = function (e) {
            e.preventDefault();
            var _this$props2 = _this.props,
                placeOrder = _this$props2.placeOrder,
                user = _this$props2.user;

            if (!user) return;
            var min_to_receive = parseFloat(_reactDom2.default.findDOMNode(_this.refs.sellSteem_total).value);
            var amount_to_sell = parseFloat(_reactDom2.default.findDOMNode(_this.refs.sellSteem_amount).value);
            var price = (min_to_receive / amount_to_sell).toFixed(6);
            var highest_bid = _this.props.ticker.highest_bid;

            placeOrder(user, amount_to_sell + ' ' + _client_config.LIQUID_TICKER, min_to_receive + ' ' + _client_config.DEBT_TICKER, '' + _client_config.CURRENCY_SIGN + price + '/' + _client_config.LIQUID_TICKER, !!_this.state.sell_price_warning, highest_bid, function (msg) {
                _this.props.notify(msg);
                _this.props.reload(user);
            });
        };

        _this.cancelOrderClick = function (e, orderid) {
            e.preventDefault();
            var _this$props3 = _this.props,
                cancelOrder = _this$props3.cancelOrder,
                user = _this$props3.user;

            if (!user) return;
            cancelOrder(user, orderid, function (msg) {
                _this.props.notify(msg);
                _this.props.reload(user);
            });
        };

        _this.setFormPrice = function (price) {
            var p = parseFloat(price);

            _this.refs.sellSteem_price.value = p.toFixed(6);
            _this.refs.buySteem_price.value = p.toFixed(6);

            var samount = parseFloat(_this.refs.sellSteem_amount.value);
            if (samount >= 0) _this.refs.sellSteem_total.value = (0, _MarketUtils.roundDown)(p * samount, 3);

            var bamount = parseFloat(_this.refs.buySteem_amount.value);
            if (bamount >= 0) _this.refs.buySteem_total.value = (0, _MarketUtils.roundUp)(p * bamount, 3);

            _this.validateBuySteem();
            _this.validateSellSteem();
        };

        _this.percentDiff = function (marketPrice, userPrice) {
            marketPrice = parseFloat(marketPrice);
            return 100 * (userPrice - marketPrice) / marketPrice;
        };

        _this.validateBuySteem = function () {
            var amount = parseFloat(_this.refs.buySteem_amount.value);
            var price = parseFloat(_this.refs.buySteem_price.value);
            var total = parseFloat(_this.refs.buySteem_total.value);
            var valid = amount > 0 && price > 0 && total > 0;
            var lowest_ask = _this.props.ticker.lowest_ask;

            _this.setState({
                buy_disabled: !valid,
                buy_price_warning: valid && _this.percentDiff(lowest_ask, price) > 15
            });
        };

        _this.validateSellSteem = function () {
            var amount = parseFloat(_this.refs.sellSteem_amount.value);
            var price = parseFloat(_this.refs.sellSteem_price.value);
            var total = parseFloat(_this.refs.sellSteem_total.value);
            var valid = amount > 0 && price > 0 && total > 0;
            var highest_bid = _this.props.ticker.highest_bid;

            _this.setState({
                sell_disabled: !valid,
                sell_price_warning: valid && _this.percentDiff(highest_bid, price) < -15
            });
        };

        _this.handleToggleOpenOrdersSort = function (column) {
            var dataType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'float';

            _this.props.toggleOpenOrdersSort(column, dataType);
        };

        _this.state = {
            buy_disabled: true,
            sell_disabled: true,
            buy_price_warning: false,
            sell_price_warning: false
        };
        return _this;
    }

    (0, _createClass3.default)(Market, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(np) {
            if (!this.props.ticker && np.ticker) {
                var _np$ticker = np.ticker,
                    lowest_ask = _np$ticker.lowest_ask,
                    highest_bid = _np$ticker.highest_bid;

                if (this.refs.buySteem_price) this.refs.buySteem_price.value = parseFloat(lowest_ask).toFixed(6);
                if (this.refs.sellSteem_price) this.refs.sellSteem_price.value = parseFloat(highest_bid).toFixed(6);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var sellSteem = this.sellSteem,
                buySteem = this.buySteem,
                cancelOrderClick = this.cancelOrderClick,
                setFormPrice = this.setFormPrice,
                validateBuySteem = this.validateBuySteem,
                validateSellSteem = this.validateSellSteem,
                handleToggleOpenOrdersSort = this.handleToggleOpenOrdersSort;
            var _state = this.state,
                buy_disabled = _state.buy_disabled,
                sell_disabled = _state.sell_disabled,
                buy_price_warning = _state.buy_price_warning,
                sell_price_warning = _state.sell_price_warning;


            var ticker = {
                latest: 0,
                lowest_ask: 0,
                highest_bid: 0,
                percent_change: 0,
                sbd_volume: 0,
                feed_price: 0
            };

            if (typeof this.props.ticker != 'undefined') {
                var _props$ticker = this.props.ticker,
                    latest = _props$ticker.latest,
                    lowest_ask = _props$ticker.lowest_ask,
                    highest_bid = _props$ticker.highest_bid,
                    percent_change = _props$ticker.percent_change,
                    sbd_volume = _props$ticker.sbd_volume;

                var base = this.props.feed.get('base');
                var quote = this.props.feed.get('quote');
                ticker = {
                    latest: parseFloat(latest),
                    lowest_ask: (0, _MarketUtils.roundUp)(parseFloat(lowest_ask), 6),
                    highest_bid: (0, _MarketUtils.roundDown)(parseFloat(highest_bid), 6),
                    percent_change: parseFloat(percent_change),
                    sbd_volume: parseFloat(sbd_volume),
                    feed_price: parseFloat(base.split(' ')[0]) / parseFloat(quote.split(' ')[0])
                };
            }

            // Take raw orders from API and put them into a format that's clean & useful
            function normalizeOrders(orders) {
                if (typeof orders == 'undefined') return { bids: [], asks: [] };
                return ['bids', 'asks'].reduce(function (out, side) {
                    out[side] = orders[side].map(function (o) {
                        return new _MarketClasses.Order(o, side);
                    });
                    return out;
                }, {});
            }

            function aggOrders(orders) {
                return ['bids', 'asks'].reduce(function (out, side) {
                    var buff = [],
                        last = null;
                    orders[side].map(function (o) {
                        // o.price = (side == 'asks') ? roundUp(o.price, 6) : Math.max(roundDown(o.price, 6), 0.000001)
                        // the following line should be checking o.price == last.price but it appears due to inverted prices from API,
                        //   inverting again causes values to not be properly sorted.
                        if (last !== null && o.getStringPrice() === last.getStringPrice()) {
                            //if(last !== null && o.price == last.price) {
                            buff[buff.length - 1] = buff[buff.length - 1].add(o);
                            // buff[buff.length-1].steem += o.steem
                            // buff[buff.length-1].sbd   += o.sbd
                            // buff[buff.length-1].sbd_depth = o.sbd_depth
                            // buff[buff.length-1].steem_depth = o.steem_depth
                        } else {
                            buff.push(o);
                        }
                        last = o;
                    });

                    out[side] = buff;
                    return out;
                }, {});
            }

            var account = this.props.account ? this.props.account.toJS() : null;
            var orderbook = aggOrders(normalizeOrders(this.props.orderbook));
            var _props = this.props,
                open_orders = _props.open_orders,
                open_orders_sort = _props.open_orders_sort;

            // Logged-in user's open orders

            function open_orders_table(open_orders, open_orders_sort) {
                var rows = open_orders && open_orders.map(function (o) {
                    return _react2.default.createElement(
                        'tr',
                        { key: o.orderid },
                        _react2.default.createElement(
                            'td',
                            null,
                            o.created.replace('T', ' ')
                        ),
                        _react2.default.createElement(
                            'td',
                            null,
                            o.type == 'ask' ? (0, _counterpart2.default)('g.sell') : (0, _counterpart2.default)('g.buy')
                        ),
                        _react2.default.createElement(
                            'td',
                            null,
                            _client_config.CURRENCY_SIGN,
                            o.price.toFixed(6)
                        ),
                        _react2.default.createElement(
                            'td',
                            null,
                            o.steem
                        ),
                        _react2.default.createElement(
                            'td',
                            null,
                            o.sbd.replace('SBD', _client_config.DEBT_TOKEN_SHORT)
                        ),
                        _react2.default.createElement(
                            'td',
                            null,
                            _react2.default.createElement(
                                'a',
                                {
                                    href: '#',
                                    onClick: function onClick(e) {
                                        return cancelOrderClick(e, o.orderid);
                                    }
                                },
                                (0, _counterpart2.default)('g.cancel')
                            )
                        )
                    );
                });

                var activeClass = function activeClass(column) {
                    if (column === open_orders_sort.get('column')) {
                        var dir = open_orders_sort.get('dir') === -1 ? 'desc' : 'asc';
                        return ['activesort', 'activesort--' + dir];
                    }
                    return null;
                };

                return _react2.default.createElement(
                    'table',
                    { className: 'Market__open-orders' },
                    _react2.default.createElement(
                        'thead',
                        null,
                        _react2.default.createElement(
                            'tr',
                            null,
                            _react2.default.createElement(
                                'th',
                                {
                                    className: (0, _classnames2.default)(activeClass('created'), 'sortable'),
                                    onClick: function onClick(e) {
                                        return handleToggleOpenOrdersSort('created', 'string');
                                    }
                                },
                                (0, _counterpart2.default)('market_jsx.date_created')
                            ),
                            _react2.default.createElement(
                                'th',
                                {
                                    className: (0, _classnames2.default)(activeClass('type'), 'sortable'),
                                    onClick: function onClick(e) {
                                        return handleToggleOpenOrdersSort('type', 'string');
                                    }
                                },
                                (0, _counterpart2.default)('g.type')
                            ),
                            _react2.default.createElement(
                                'th',
                                {
                                    className: (0, _classnames2.default)(activeClass('price'), 'sortable'),
                                    onClick: function onClick(e) {
                                        return handleToggleOpenOrdersSort('price');
                                    }
                                },
                                (0, _counterpart2.default)('g.price')
                            ),
                            _react2.default.createElement(
                                'th',
                                {
                                    className: (0, _classnames2.default)(activeClass('for_sale'), 'sortable', 'uppercase'),
                                    onClick: function onClick(e) {
                                        return handleToggleOpenOrdersSort('for_sale');
                                    }
                                },
                                _client_config.LIQUID_TOKEN
                            ),
                            _react2.default.createElement(
                                'th',
                                {
                                    className: (0, _classnames2.default)(activeClass('sbd'), 'sortable'),
                                    onClick: function onClick(e) {
                                        return handleToggleOpenOrdersSort('sbd');
                                    }
                                },
                                _client_config.DEBT_TOKEN_SHORT + ' (' + _client_config.CURRENCY_SIGN + ')'
                            ),
                            _react2.default.createElement(
                                'th',
                                null,
                                (0, _counterpart2.default)('market_jsx.action')
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'tbody',
                        null,
                        rows
                    )
                );
            }

            function trade_history_table(trades) {
                if (!trades || !trades.length) {
                    return [];
                }
                var norm = function norm(trades) {
                    return trades.map(function (t) {
                        return new _MarketClasses.TradeHistory(t);
                    });
                };

                return _react2.default.createElement(_OrderHistory2.default, { history: norm(trades) });
            }

            var pct_change = _react2.default.createElement(
                'span',
                {
                    className: 'Market__ticker-pct-' + (ticker.percent_change < 0 ? 'down' : 'up')
                },
                ticker.percent_change < 0 ? '' : '+',
                ticker.percent_change.toFixed(2),
                '%'
            );

            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                        'div',
                        { className: 'column' },
                        _react2.default.createElement(
                            'ul',
                            { className: 'Market__ticker' },
                            _react2.default.createElement(
                                'li',
                                null,
                                _react2.default.createElement(
                                    'b',
                                    null,
                                    (0, _counterpart2.default)('market_jsx.last_price')
                                ),
                                ' ',
                                _client_config.CURRENCY_SIGN,
                                ticker.latest.toFixed(6),
                                ' (',
                                pct_change,
                                ')'
                            ),
                            _react2.default.createElement(
                                'li',
                                null,
                                _react2.default.createElement(
                                    'b',
                                    null,
                                    (0, _counterpart2.default)('market_jsx.24h_volume')
                                ),
                                ' ',
                                _client_config.CURRENCY_SIGN,
                                ticker.sbd_volume.toFixed(2)
                            ),
                            _react2.default.createElement(
                                'li',
                                null,
                                _react2.default.createElement(
                                    'b',
                                    null,
                                    (0, _counterpart2.default)('g.bid')
                                ),
                                ' ',
                                _client_config.CURRENCY_SIGN,
                                ticker.highest_bid.toFixed(6)
                            ),
                            _react2.default.createElement(
                                'li',
                                null,
                                _react2.default.createElement(
                                    'b',
                                    null,
                                    (0, _counterpart2.default)('g.ask')
                                ),
                                ' ',
                                _client_config.CURRENCY_SIGN,
                                ticker.lowest_ask.toFixed(6)
                            ),
                            ticker.highest_bid > 0 && _react2.default.createElement(
                                'li',
                                null,
                                _react2.default.createElement(
                                    'b',
                                    null,
                                    (0, _counterpart2.default)('market_jsx.spread')
                                ),
                                ' ',
                                (200 * (ticker.lowest_ask - ticker.highest_bid) / (ticker.highest_bid + ticker.lowest_ask)).toFixed(3),
                                '%'
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
                        _react2.default.createElement(_DepthChart2.default, {
                            bids: orderbook.bids,
                            asks: orderbook.asks
                        })
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                        'div',
                        { className: 'column' },
                        _react2.default.createElement(_TransactionError2.default, { opType: 'limit_order_create' })
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                        'div',
                        { className: 'small-12 medium-6 columns' },
                        _react2.default.createElement(
                            'h4',
                            { className: 'buy-color uppercase' },
                            (0, _counterpart2.default)('navigation.buy_LIQUID_TOKEN', {
                                LIQUID_TOKEN: _client_config.LIQUID_TOKEN
                            })
                        ),
                        _react2.default.createElement(
                            'form',
                            { className: 'Market__orderform', onSubmit: buySteem },
                            _react2.default.createElement(
                                'div',
                                { className: 'row' },
                                _react2.default.createElement(
                                    'div',
                                    { className: 'column small-3 large-2' },
                                    _react2.default.createElement(
                                        'label',
                                        null,
                                        (0, _counterpart2.default)('g.price')
                                    )
                                ),
                                _react2.default.createElement(
                                    'div',
                                    { className: 'column small-9 large-8' },
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'input-group' },
                                        _react2.default.createElement('input', {
                                            className: 'input-group-field' + (buy_price_warning ? ' price_warning' : ''),
                                            type: 'text',
                                            ref: 'buySteem_price',
                                            placeholder: '0.0',
                                            onChange: function onChange(e) {
                                                var amount = parseFloat(_this2.refs.buySteem_amount.value);
                                                var price = parseFloat(_this2.refs.buySteem_price.value);
                                                if (amount >= 0 && price >= 0) _this2.refs.buySteem_total.value = (0, _MarketUtils.roundUp)(price * amount, 3);
                                                validateBuySteem();
                                            }
                                        }),
                                        _react2.default.createElement(
                                            'span',
                                            { className: 'input-group-label uppercase' },
                                            _client_config.DEBT_TOKEN_SHORT + '/' + _client_config.LIQUID_TOKEN
                                        )
                                    )
                                )
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'row' },
                                _react2.default.createElement(
                                    'div',
                                    { className: 'column small-3 large-2' },
                                    _react2.default.createElement(
                                        'label',
                                        null,
                                        (0, _counterpart2.default)('g.amount')
                                    )
                                ),
                                _react2.default.createElement(
                                    'div',
                                    { className: 'column small-9 large-8' },
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'input-group' },
                                        _react2.default.createElement('input', {
                                            className: 'input-group-field',
                                            type: 'text',
                                            ref: 'buySteem_amount',
                                            placeholder: '0.0',
                                            onChange: function onChange(e) {
                                                var price = parseFloat(_this2.refs.buySteem_price.value);
                                                var amount = parseFloat(_this2.refs.buySteem_amount.value);
                                                if (price >= 0 && amount >= 0) _this2.refs.buySteem_total.value = (0, _MarketUtils.roundUp)(price * amount, 3);
                                                validateBuySteem();
                                            }
                                        }),
                                        _react2.default.createElement(
                                            'span',
                                            { className: 'input-group-label uppercase' },
                                            ' ',
                                            _client_config.LIQUID_TOKEN
                                        )
                                    )
                                )
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'row' },
                                _react2.default.createElement(
                                    'div',
                                    { className: 'column small-3 large-2' },
                                    _react2.default.createElement(
                                        'label',
                                        null,
                                        (0, _counterpart2.default)('market_jsx.total')
                                    )
                                ),
                                _react2.default.createElement(
                                    'div',
                                    { className: 'column small-9 large-8' },
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'input-group' },
                                        _react2.default.createElement('input', {
                                            className: 'input-group-field',
                                            type: 'text',
                                            ref: 'buySteem_total',
                                            placeholder: '0.0',
                                            onChange: function onChange(e) {
                                                var price = parseFloat(_this2.refs.buySteem_price.value);
                                                var total = parseFloat(_this2.refs.buySteem_total.value);
                                                if (total >= 0 && price >= 0) _this2.refs.buySteem_amount.value = (0, _MarketUtils.roundUp)(total / price, 3);
                                                validateBuySteem();
                                            }
                                        }),
                                        _react2.default.createElement(
                                            'span',
                                            { className: 'input-group-label' },
                                            _client_config.DEBT_TOKEN_SHORT + ' (' + _client_config.CURRENCY_SIGN + ')'
                                        )
                                    )
                                )
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'row' },
                                _react2.default.createElement('div', { className: 'column small-3 large-2' }),
                                _react2.default.createElement(
                                    'div',
                                    { className: 'column small-9 large-8' },
                                    _react2.default.createElement('input', {
                                        disabled: buy_disabled,
                                        type: 'submit',
                                        className: 'button hollow buy-color float-right uppercase',
                                        value: (0, _counterpart2.default)('navigation.buy_LIQUID_TOKEN', { LIQUID_TOKEN: _client_config.LIQUID_TOKEN })
                                    }),
                                    account && _react2.default.createElement(
                                        'div',
                                        null,
                                        _react2.default.createElement(
                                            'small',
                                            null,
                                            _react2.default.createElement(
                                                'a',
                                                {
                                                    href: '#',
                                                    onClick: function onClick(e) {
                                                        e.preventDefault();
                                                        var price = parseFloat(_this2.refs.buySteem_price.value);
                                                        var total = account.sbd_balance.split(' ')[0];
                                                        _this2.refs.buySteem_total.value = total;
                                                        if (price >= 0) _this2.refs.buySteem_amount.value = (0, _MarketUtils.roundDown)(parseFloat(total) / price, 3).toFixed(3);
                                                        validateBuySteem();
                                                    }
                                                },
                                                (0, _counterpart2.default)('market_jsx.available'),
                                                ':'
                                            ),
                                            ' ',
                                            account.sbd_balance.replace('SBD', _client_config.DEBT_TOKEN_SHORT)
                                        )
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        null,
                                        _react2.default.createElement(
                                            'small',
                                            null,
                                            _react2.default.createElement(
                                                'a',
                                                {
                                                    href: '#',
                                                    onClick: function onClick(e) {
                                                        e.preventDefault();
                                                        var amount = parseFloat(_this2.refs.buySteem_amount.value);
                                                        var price = parseFloat(ticker.lowest_ask);
                                                        _this2.refs.buySteem_price.value = ticker.lowest_ask;
                                                        if (amount >= 0) _this2.refs.buySteem_total.value = (0, _MarketUtils.roundUp)(amount * price, 3).toFixed(3);
                                                        validateBuySteem();
                                                    }
                                                },
                                                (0, _counterpart2.default)('market_jsx.lowest_ask'),
                                                ':'
                                            ),
                                            ' ',
                                            ticker.lowest_ask.toFixed(6)
                                        )
                                    )
                                )
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'small-12 medium-6 columns' },
                        _react2.default.createElement(
                            'h4',
                            { className: 'sell-color uppercase' },
                            (0, _counterpart2.default)('navigation.sell_LIQUID_TOKEN', {
                                LIQUID_TOKEN: _client_config.LIQUID_TOKEN
                            })
                        ),
                        _react2.default.createElement(
                            'form',
                            {
                                className: 'Market__orderform',
                                onSubmit: sellSteem
                            },
                            _react2.default.createElement(
                                'div',
                                { className: 'row' },
                                _react2.default.createElement(
                                    'div',
                                    { className: 'column small-3 large-2' },
                                    _react2.default.createElement(
                                        'label',
                                        null,
                                        (0, _counterpart2.default)('g.price')
                                    )
                                ),
                                _react2.default.createElement(
                                    'div',
                                    { className: 'column small-9 large-8' },
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'input-group' },
                                        _react2.default.createElement('input', {
                                            className: 'input-group-field' + (sell_price_warning ? ' price_warning' : ''),
                                            type: 'text',
                                            ref: 'sellSteem_price',
                                            placeholder: '0.0',
                                            onChange: function onChange(e) {
                                                var amount = parseFloat(_this2.refs.sellSteem_amount.value);
                                                var price = parseFloat(_this2.refs.sellSteem_price.value);
                                                if (amount >= 0 && price >= 0) _this2.refs.sellSteem_total.value = (0, _MarketUtils.roundDown)(price * amount, 3);
                                                validateSellSteem();
                                            }
                                        }),
                                        _react2.default.createElement(
                                            'span',
                                            { className: 'input-group-label uppercase' },
                                            _client_config.DEBT_TOKEN_SHORT + '/' + _client_config.LIQUID_TOKEN
                                        )
                                    )
                                )
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'row' },
                                _react2.default.createElement(
                                    'div',
                                    { className: 'column small-3 large-2' },
                                    _react2.default.createElement(
                                        'label',
                                        null,
                                        (0, _counterpart2.default)('g.amount')
                                    )
                                ),
                                _react2.default.createElement(
                                    'div',
                                    { className: 'column small-9 large-8' },
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'input-group' },
                                        _react2.default.createElement('input', {
                                            className: 'input-group-field',
                                            type: 'text',
                                            ref: 'sellSteem_amount',
                                            placeholder: '0.0',
                                            onChange: function onChange(e) {
                                                var price = parseFloat(_this2.refs.sellSteem_price.value);
                                                var amount = parseFloat(_this2.refs.sellSteem_amount.value);
                                                if (price >= 0 && amount >= 0) _this2.refs.sellSteem_total.value = (0, _MarketUtils.roundDown)(price * amount, 3);
                                                validateSellSteem();
                                            }
                                        }),
                                        _react2.default.createElement(
                                            'span',
                                            { className: 'input-group-label uppercase' },
                                            _client_config.LIQUID_TOKEN
                                        )
                                    )
                                )
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'row' },
                                _react2.default.createElement(
                                    'div',
                                    { className: 'column small-3 large-2' },
                                    _react2.default.createElement(
                                        'label',
                                        null,
                                        (0, _counterpart2.default)('market_jsx.total')
                                    )
                                ),
                                _react2.default.createElement(
                                    'div',
                                    { className: 'column small-9 large-8' },
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'input-group' },
                                        _react2.default.createElement('input', {
                                            className: 'input-group-field',
                                            type: 'text',
                                            ref: 'sellSteem_total',
                                            placeholder: '0.0',
                                            onChange: function onChange(e) {
                                                var price = parseFloat(_this2.refs.sellSteem_price.value);
                                                var total = parseFloat(_this2.refs.sellSteem_total.value);
                                                if (price >= 0 && total >= 0) _this2.refs.sellSteem_amount.value = (0, _MarketUtils.roundUp)(total / price, 3);
                                                validateSellSteem();
                                            }
                                        }),
                                        _react2.default.createElement(
                                            'span',
                                            { className: 'input-group-label' },
                                            _client_config.DEBT_TOKEN_SHORT + ' (' + _client_config.CURRENCY_SIGN + ')'
                                        )
                                    )
                                )
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'row' },
                                _react2.default.createElement('div', { className: 'column small-3 large-2' }),
                                _react2.default.createElement(
                                    'div',
                                    { className: 'column small-9 large-8' },
                                    _react2.default.createElement('input', {
                                        disabled: sell_disabled,
                                        type: 'submit',
                                        className: 'button hollow sell-color float-right uppercase',
                                        value: (0, _counterpart2.default)('navigation.sell_LIQUID_TOKEN', { LIQUID_TOKEN: _client_config.LIQUID_TOKEN })
                                    }),
                                    account && _react2.default.createElement(
                                        'div',
                                        null,
                                        _react2.default.createElement(
                                            'small',
                                            null,
                                            _react2.default.createElement(
                                                'a',
                                                {
                                                    href: '#',
                                                    onClick: function onClick(e) {
                                                        e.preventDefault();
                                                        var price = parseFloat(_this2.refs.sellSteem_price.value);
                                                        var amount = account.balance.split(' ')[0];
                                                        _this2.refs.sellSteem_amount.value = amount;
                                                        if (price >= 0) _this2.refs.sellSteem_total.value = (0, _MarketUtils.roundDown)(price * parseFloat(amount), 3);
                                                        validateSellSteem();
                                                    }
                                                },
                                                (0, _counterpart2.default)('market_jsx.available'),
                                                ':'
                                            ),
                                            ' ',
                                            account.balance.replace(_client_config.LIQUID_TICKER, _client_config.LIQUID_TOKEN_UPPERCASE)
                                        )
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        null,
                                        _react2.default.createElement(
                                            'small',
                                            null,
                                            _react2.default.createElement(
                                                'a',
                                                {
                                                    href: '#',
                                                    onClick: function onClick(e) {
                                                        e.preventDefault();
                                                        var amount = parseFloat(_this2.refs.sellSteem_amount.value);
                                                        var price = ticker.highest_bid;
                                                        _this2.refs.sellSteem_price.value = price;
                                                        if (amount >= 0) _this2.refs.sellSteem_total.value = (0, _MarketUtils.roundDown)(parseFloat(price) * amount, 3);
                                                        validateSellSteem();
                                                    }
                                                },
                                                (0, _counterpart2.default)('market_jsx.highest_bid'),
                                                ':'
                                            ),
                                            ' ',
                                            ticker.highest_bid.toFixed(6)
                                        )
                                    )
                                )
                            )
                        )
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'row show-for-medium' },
                    _react2.default.createElement(
                        'div',
                        { className: 'small-12 medium-6 large-4 columns' },
                        _react2.default.createElement(
                            'h4',
                            null,
                            (0, _counterpart2.default)('market_jsx.buy_orders')
                        ),
                        _react2.default.createElement(_Orderbook2.default, {
                            side: 'bids',
                            orders: orderbook.bids,
                            onClick: function onClick(price) {
                                setFormPrice(price);
                            }
                        })
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'small-12 medium-6 large-4 columns' },
                        _react2.default.createElement(
                            'h4',
                            null,
                            (0, _counterpart2.default)('market_jsx.sell_orders')
                        ),
                        _react2.default.createElement(_Orderbook2.default, {
                            side: 'asks',
                            orders: orderbook.asks,
                            onClick: function onClick(price) {
                                setFormPrice(price);
                            }
                        })
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'small-12 large-4 column' },
                        _react2.default.createElement(
                            'h4',
                            null,
                            (0, _counterpart2.default)('market_jsx.trade_history')
                        ),
                        trade_history_table(this.props.history)
                    ),
                    this.props.shouldSeeAds && _react2.default.createElement(
                        'div',
                        { className: 'small-12 large-12 column' },
                        _react2.default.createElement(_GoogleAd2.default, {
                            name: 'market-1',
                            slot: this.props.adSlots['market_1'].slot_id,
                            fullWidthResponsive: 'true',
                            style: { display: 'block' }
                        })
                    )
                ),
                account && _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                        'div',
                        { className: 'column' },
                        _react2.default.createElement(
                            'h4',
                            null,
                            (0, _counterpart2.default)('market_jsx.open_orders')
                        ),
                        open_orders_table(open_orders, open_orders_sort)
                    )
                )
            );
        }
    }]);
    return Market;
}(_react2.default.Component), _class.propTypes = {
    orderbook: _propTypes2.default.object,
    open_orders: _propTypes2.default.array,
    open_orders_sort: _propTypes2.default.instanceOf(_immutable.Map),
    ticker: _propTypes2.default.object,
    // redux PropTypes
    placeOrder: _propTypes2.default.func.isRequired,
    user: _propTypes2.default.string,
    feed: _propTypes2.default.instanceOf(_immutable.Map)
}, _temp);

var DEFAULT_EXPIRE = Math.floor(Date.now() / 1000 + 60 * 60 * 24 * 27); // Market orders with expiration greater than 28 days from current Head Block time will be rejected.
module.exports = {
    path: 'market',
    component: (0, _reactRedux.connect)(function (state) {
        var username = state.user.get('current') ? state.user.get('current').get('username') : null;
        var shouldSeeAds = state.app.getIn(['googleAds', 'shouldSeeAds']);
        var adSlots = state.app.getIn(['googleAds', 'adSlots']).toJS();
        return {
            orderbook: state.market.get('orderbook'),
            open_orders: process.env.BROWSER ? state.market.get('open_orders') : [],
            ticker: state.market.get('ticker'),
            account: state.global.getIn(['accounts', username]),
            history: state.market.get('history'),
            user: username,
            feed: state.global.get('feed_price'),
            open_orders_sort: state.market.get('open_orders_sort'),
            shouldSeeAds: shouldSeeAds,
            adSlots: adSlots
        };
    }, function (dispatch) {
        return {
            notify: function notify(message) {
                dispatch(appActions.addNotification({
                    key: 'mkt_' + Date.now(),
                    message: message,
                    dismissAfter: 5000
                }));
            },
            reload: function reload(username) {
                console.log('Reload market state...');
                dispatch(marketActions.updateMarket({ username: username }));
            },
            cancelOrder: function cancelOrder(owner, orderid, _successCallback) {
                var confirm = (0, _counterpart2.default)('market_jsx.order_cancel_confirm', {
                    order_id: orderid,
                    user: owner
                });
                var successMessage = (0, _counterpart2.default)('market_jsx.order_cancelled', {
                    order_id: orderid
                });
                dispatch(transactionActions.broadcastOperation({
                    type: 'limit_order_cancel',
                    operation: {
                        owner: owner,
                        orderid: orderid /*, __config: {successMessage}*/
                    },
                    confirm: confirm,
                    successCallback: function successCallback() {
                        _successCallback(successMessage);
                    }
                    //successCallback
                }));
            },
            placeOrder: function placeOrder(owner, amount_to_sell, min_to_receive, effectivePrice, priceWarning, marketPrice, _successCallback2) {
                var fill_or_kill = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : false;
                var expiration = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : DEFAULT_EXPIRE;

                // create_order jsc 12345 "1.000 SBD" "100.000 STEEM" true 1467122240 false

                // Padd amounts to 3 decimal places
                amount_to_sell = amount_to_sell.replace(amount_to_sell.split(' ')[0], String(parseFloat(amount_to_sell).toFixed(3)));
                min_to_receive = min_to_receive.replace(min_to_receive.split(' ')[0], String(parseFloat(min_to_receive).toFixed(3)));

                var isSell = amount_to_sell.indexOf(_client_config.LIQUID_TICKER) > 0;
                var confirmStr = isSell ? (0, _counterpart2.default)('market_jsx.sell_amount_for_atleast', {
                    amount_to_sell: amount_to_sell,
                    min_to_receive: min_to_receive,
                    effectivePrice: effectivePrice
                }) : (0, _counterpart2.default)('market_jsx.buy_atleast_amount_for', {
                    amount_to_sell: amount_to_sell,
                    min_to_receive: min_to_receive,
                    effectivePrice: effectivePrice
                });
                var successMessage = (0, _counterpart2.default)('market_jsx.order_placed', {
                    order: confirmStr
                });
                var confirm = confirmStr + '?';
                var warning = null;
                if (priceWarning) {
                    var warning_args = {
                        marketPrice: _client_config.CURRENCY_SIGN + parseFloat(marketPrice).toFixed(4) + '/' + _client_config.LIQUID_TOKEN_UPPERCASE
                    };
                    warning = isSell ? (0, _counterpart2.default)('market_jsx.price_warning_below', warning_args) : (0, _counterpart2.default)('market_jsx.price_warning_above', warning_args);
                }
                var orderid = Math.floor(Date.now() / 1000);
                dispatch(transactionActions.broadcastOperation({
                    type: 'limit_order_create',
                    operation: {
                        owner: owner,
                        amount_to_sell: amount_to_sell,
                        min_to_receive: min_to_receive,
                        fill_or_kill: fill_or_kill,
                        expiration: expiration,
                        orderid: orderid
                    }, //,
                    //__config: {successMessage}},
                    confirm: confirm,
                    warning: warning,
                    successCallback: function successCallback() {
                        _successCallback2(successMessage);
                    }
                }));
            },
            toggleOpenOrdersSort: function toggleOpenOrdersSort(column, dataType) {
                dispatch(marketActions.toggleOpenOrdersSort({ column: column, dataType: dataType }));
            }
        };
    })(Market)
};
//# sourceMappingURL=Market.js.map