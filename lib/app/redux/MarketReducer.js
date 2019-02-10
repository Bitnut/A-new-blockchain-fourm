'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.toggleOpenOrdersSort = exports.updateMarket = exports.appendTradeHistory = exports.receiveTradeHistory = exports.receiveOpenOrders = exports.receiveTicker = exports.receiveOrderbook = exports.UPDATE_MARKET = undefined;

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.default = reducer;

var _immutable = require('immutable');

var _MarketUtils = require('app/utils/MarketUtils');

var _client_config = require('app/client_config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Action constants
var RECEIVE_ORDERBOOK = 'market/RECEIVE_ORDERBOOK';
var RECEIVE_TICKER = 'market/RECEIVE_TICKER';
var RECEIVE_OPEN_ORDERS = 'market/RECEIVE_OPEN_ORDERS';
var RECEIVE_TRADE_HISTORY = 'market/RECEIVE_TRADE_HISTORY';
var APPEND_TRADE_HISTORY = 'market/APPEND_TRADE_HISTORY';
var TOGGLE_OPEN_ORDERS_SORT = 'market/TOGGLE_OPEN_ORDERS_SORT';
// Saga-related
var UPDATE_MARKET = exports.UPDATE_MARKET = 'market/UPDATE_MARKET';

var defaultState = (0, _immutable.Map)({
    status: {},
    open_orders_sort: (0, _immutable.Map)({
        column: 'created',
        dataType: 'string',
        dir: 1
    })
});

function reducer() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultState;
    var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var payload = typeof action.payload !== 'undefined' ? action.payload : null;

    switch (action.type) {
        case RECEIVE_ORDERBOOK:
            return state.set('orderbook', payload);

        case RECEIVE_TICKER:
            return state.set('ticker', payload);

        case RECEIVE_OPEN_ORDERS:
            // Store normalized data right in redux, and apply current sort.
            var _state$get$toJS = state.get('open_orders_sort').toJS(),
                dir = _state$get$toJS.dir,
                column = _state$get$toJS.column,
                dataType = _state$get$toJS.dataType;

            var getValue = dataType === 'string' ? function (v) {
                return v;
            } : parseFloat;

            var open_orders = action.payload.map(function (o) {
                var type = o.sell_price.base.indexOf(_client_config.LIQUID_TICKER) > 0 ? 'ask' : 'bid';
                var sbd = type == 'bid' ? o.sell_price.base : o.sell_price.quote;
                var steem = type == 'ask' ? o.sell_price.base : o.sell_price.quote;
                return (0, _extends3.default)({}, o, {
                    type: type,
                    price: parseFloat(sbd) / parseFloat(steem),
                    steem: steem,
                    sbd: sbd
                });
            }).sort((0, _MarketUtils.createOrderSorter)(getValue, column, dir));

            return state.set('open_orders', open_orders);

        case RECEIVE_TRADE_HISTORY:
            return state.set('history', payload);

        case APPEND_TRADE_HISTORY:
            return state.set('history', [].concat((0, _toConsumableArray3.default)(payload), (0, _toConsumableArray3.default)(state.get('history'))));

        case TOGGLE_OPEN_ORDERS_SORT:
            var toggledColumn = action.payload.column || 'created';
            var toggledDataType = action.payload.dataType || 'float';

            var toggledDir = -state.get('open_orders_sort').get('dir');

            var toggledGetValue = toggledDataType === 'string' ? function (v) {
                return v;
            } : parseFloat;

            var sortedState = state.set('open_orders', state.get('open_orders').sort((0, _MarketUtils.createOrderSorter)(toggledGetValue, toggledColumn, toggledDir)));

            return sortedState.set('open_orders_sort', (0, _immutable.Map)({
                column: toggledColumn,
                dataType: toggledDir,
                dir: toggledDir
            }));

        default:
            return state;
    }
}

// Action creators
var receiveOrderbook = exports.receiveOrderbook = function receiveOrderbook(payload) {
    return {
        type: RECEIVE_ORDERBOOK,
        payload: payload
    };
};

var receiveTicker = exports.receiveTicker = function receiveTicker(payload) {
    return {
        type: RECEIVE_TICKER,
        payload: payload
    };
};

var receiveOpenOrders = exports.receiveOpenOrders = function receiveOpenOrders(payload) {
    return {
        type: RECEIVE_OPEN_ORDERS,
        payload: payload
    };
};

var receiveTradeHistory = exports.receiveTradeHistory = function receiveTradeHistory(payload) {
    return {
        type: RECEIVE_TRADE_HISTORY,
        payload: payload
    };
};

var appendTradeHistory = exports.appendTradeHistory = function appendTradeHistory(payload) {
    return {
        type: APPEND_TRADE_HISTORY,
        payload: payload
    };
};

var updateMarket = exports.updateMarket = function updateMarket(payload) {
    return {
        type: UPDATE_MARKET,
        payload: payload
    };
};

var toggleOpenOrdersSort = exports.toggleOpenOrdersSort = function toggleOpenOrdersSort(payload) {
    return {
        type: TOGGLE_OPEN_ORDERS_SORT,
        payload: payload
    };
};
//# sourceMappingURL=MarketReducer.js.map