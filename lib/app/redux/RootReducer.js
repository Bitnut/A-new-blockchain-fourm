'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _immutable = require('immutable');

var _reactRouterRedux = require('react-router-redux');

var _redux = require('redux');

var _reduxForm = require('redux-form');

var _StateFunctions = require('app/utils/StateFunctions');

var _AppReducer = require('./AppReducer');

var _AppReducer2 = _interopRequireDefault(_AppReducer);

var _GlobalReducer = require('./GlobalReducer');

var _GlobalReducer2 = _interopRequireDefault(_GlobalReducer);

var _MarketReducer = require('./MarketReducer');

var _MarketReducer2 = _interopRequireDefault(_MarketReducer);

var _UserReducer = require('./UserReducer');

var _UserReducer2 = _interopRequireDefault(_UserReducer);

var _TransactionReducer = require('./TransactionReducer');

var _TransactionReducer2 = _interopRequireDefault(_TransactionReducer);

var _OffchainReducer = require('./OffchainReducer');

var _OffchainReducer2 = _interopRequireDefault(_OffchainReducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function initReducer(reducer, type) {
    return function (state, action) {
        if (!state) return reducer(state, action);

        // @@redux/INIT server and client init
        if (action.type === '@@redux/INIT' || action.type === '@@INIT') {
            if (!(state instanceof _immutable.Map)) {
                state = (0, _immutable.fromJS)(state);
            }
            if (type === 'global') {
                var content = state.get('content').withMutations(function (c) {
                    c.forEach(function (cc, key) {
                        if (!c.getIn([key, 'stats'])) {
                            // This may have already been set in UniversalRender; if so, then
                            //   active_votes were cleared from server response. In this case it
                            //   is important to not try to recalculate the stats. (#1040)
                            c.setIn([key, 'stats'], (0, _immutable.fromJS)((0, _StateFunctions.contentStats)(cc)));
                        }
                    });
                });
                state = state.set('content', content);
            }
            return state;
        }

        if (action.type === '@@router/LOCATION_CHANGE' && type === 'global') {
            state = state.set('pathname', action.payload.pathname);
            // console.log(action.type, type, action, state.toJS())
        }

        return reducer(state, action);
    };
} // @deprecated, instead use: app/utils/ReactForm.js
exports.default = (0, _redux.combineReducers)({
    global: initReducer(_GlobalReducer2.default, 'global'),
    market: initReducer(_MarketReducer2.default),
    offchain: initReducer(_OffchainReducer2.default),
    user: initReducer(_UserReducer2.default),
    transaction: initReducer(_TransactionReducer2.default),
    discussion: initReducer(function () {
        var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        return state;
    }),
    routing: initReducer(_reactRouterRedux.routerReducer),
    app: initReducer(_AppReducer2.default),
    form: _reduxForm.reducer
});
//# sourceMappingURL=RootReducer.js.map