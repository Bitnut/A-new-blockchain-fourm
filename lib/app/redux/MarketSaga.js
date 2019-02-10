'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.marketWatches = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

exports.fetchMarket = fetchMarket;
exports.fetchOpenOrders = fetchOpenOrders;
exports.reloadMarket = reloadMarket;

var _effects = require('redux-saga/effects');

var _steemJs = require('@steemit/steem-js');

var _MarketReducer = require('./MarketReducer');

var marketActions = _interopRequireWildcard(_MarketReducer);

var _AppReducer = require('./AppReducer');

var appActions = _interopRequireWildcard(_AppReducer);

var _UserReducer = require('./UserReducer');

var userActions = _interopRequireWildcard(_UserReducer);

var _SagaShared = require('./SagaShared');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = /*#__PURE__*/_regenerator2.default.mark(fetchMarket),
    _marked2 = /*#__PURE__*/_regenerator2.default.mark(fetchOpenOrders),
    _marked3 = /*#__PURE__*/_regenerator2.default.mark(reloadMarket);

var marketWatches = exports.marketWatches = [(0, _effects.takeLatest)(userActions.SET_USER, fetchOpenOrders), (0, _effects.takeLatest)('@@router/LOCATION_CHANGE', fetchMarket), (0, _effects.takeLatest)(marketActions.UPDATE_MARKET, reloadMarket)];

var wait = function wait(ms) {
    return new _promise2.default(function (resolve) {
        setTimeout(function () {
            return resolve();
        }, ms);
    });
};

var polling = false;
var active_user = null;
var last_trade = null;

function fetchMarket(location_change_action) {
    var pathname, state, trades, start, state3;
    return _regenerator2.default.wrap(function fetchMarket$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    pathname = location_change_action.payload.pathname;

                    if (!(pathname && pathname != '/market')) {
                        _context.next = 4;
                        break;
                    }

                    polling = false;
                    return _context.abrupt('return');

                case 4:
                    if (!(polling == true)) {
                        _context.next = 6;
                        break;
                    }

                    return _context.abrupt('return');

                case 6:
                    polling = true;

                case 7:
                    if (!polling) {
                        _context.next = 47;
                        break;
                    }

                    _context.prev = 8;
                    _context.next = 11;
                    return (0, _effects.call)([_steemJs.api, _steemJs.api.getOrderBookAsync], 500);

                case 11:
                    state = _context.sent;
                    _context.next = 14;
                    return (0, _effects.put)(marketActions.receiveOrderbook(state));

                case 14:
                    trades = void 0;

                    if (!(last_trade == null)) {
                        _context.next = 23;
                        break;
                    }

                    _context.next = 18;
                    return (0, _effects.call)([_steemJs.api, _steemJs.api.getRecentTradesAsync], 25);

                case 18:
                    trades = _context.sent;
                    _context.next = 21;
                    return (0, _effects.put)(marketActions.receiveTradeHistory(trades));

                case 21:
                    _context.next = 30;
                    break;

                case 23:
                    start = last_trade.toISOString().slice(0, -5);
                    _context.next = 26;
                    return (0, _effects.call)([_steemJs.api, _steemJs.api.getTradeHistoryAsync], start, '1969-12-31T23:59:59', 1000);

                case 26:
                    trades = _context.sent;

                    trades = trades.reverse();
                    _context.next = 30;
                    return (0, _effects.put)(marketActions.appendTradeHistory(trades));

                case 30:
                    if (trades.length > 0) {
                        last_trade = new Date(new Date(Date.parse(trades[0]['date'])).getTime() + 1000);
                    }

                    _context.next = 33;
                    return (0, _effects.call)([_steemJs.api, _steemJs.api.getTickerAsync]);

                case 33:
                    state3 = _context.sent;
                    _context.next = 36;
                    return (0, _effects.put)(marketActions.receiveTicker(state3));

                case 36:
                    _context.next = 43;
                    break;

                case 38:
                    _context.prev = 38;
                    _context.t0 = _context['catch'](8);

                    console.error('~~ Saga fetchMarket error ~~>', _context.t0);
                    _context.next = 43;
                    return (0, _effects.put)(appActions.steemApiError(_context.t0.message));

                case 43:
                    _context.next = 45;
                    return (0, _effects.call)(wait, 3000);

                case 45:
                    _context.next = 7;
                    break;

                case 47:
                case 'end':
                    return _context.stop();
            }
        }
    }, _marked, this, [[8, 38]]);
}

function fetchOpenOrders(set_user_action) {
    var username, state;
    return _regenerator2.default.wrap(function fetchOpenOrders$(_context2) {
        while (1) {
            switch (_context2.prev = _context2.next) {
                case 0:
                    username = set_user_action.payload.username;
                    _context2.prev = 1;
                    _context2.next = 4;
                    return (0, _effects.call)([_steemJs.api, _steemJs.api.getOpenOrdersAsync], username);

                case 4:
                    state = _context2.sent;
                    _context2.next = 7;
                    return (0, _effects.put)(marketActions.receiveOpenOrders(state));

                case 7:
                    _context2.next = 9;
                    return (0, _effects.call)(_SagaShared.getAccount, username, true);

                case 9:
                    _context2.next = 16;
                    break;

                case 11:
                    _context2.prev = 11;
                    _context2.t0 = _context2['catch'](1);

                    console.error('~~ Saga fetchOpenOrders error ~~>', _context2.t0);
                    _context2.next = 16;
                    return (0, _effects.put)(appActions.steemApiError(_context2.t0.message));

                case 16:
                case 'end':
                    return _context2.stop();
            }
        }
    }, _marked2, this, [[1, 11]]);
}

function reloadMarket(reload_action) {
    return _regenerator2.default.wrap(function reloadMarket$(_context3) {
        while (1) {
            switch (_context3.prev = _context3.next) {
                case 0:
                    _context3.next = 2;
                    return fetchMarket(reload_action);

                case 2:
                    _context3.next = 4;
                    return fetchOpenOrders(reload_action);

                case 4:
                case 'end':
                    return _context3.stop();
            }
        }
    }, _marked3, this);
}
//# sourceMappingURL=MarketSaga.js.map