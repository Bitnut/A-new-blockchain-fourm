'use strict';

var _immutable = require('immutable');

var _MarketReducer = require('./MarketReducer');

var _MarketReducer2 = _interopRequireDefault(_MarketReducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var someOpenOrders = [{
    id: 1127826,
    created: '2017-12-04T23:54:09',
    expiration: '1969-12-31T23:59:59',
    seller: 'bnchdrff',
    orderid: 1512431634,
    for_sale: 3000,
    sell_price: {
        base: '3.000 STEEM',
        quote: '1.998 SBD'
    },
    real_price: '0',
    rewarded: false
}, {
    id: 1127827,
    created: '2017-12-04T23:54:54',
    expiration: '1969-12-31T23:59:59',
    seller: 'bnchdrff',
    orderid: 1512431689,
    for_sale: 7000,
    sell_price: {
        base: '7.000 STEEM',
        quote: '4.578 SBD'
    },
    real_price: '0',
    rewarded: false
}, {
    id: 1127832,
    created: '2017-12-04T23:57:18',
    expiration: '1969-12-31T23:59:59',
    seller: 'bnchdrff',
    orderid: 1512431835,
    for_sale: 3000,
    sell_price: {
        base: '3.000 STEEM',
        quote: '1.953 SBD'
    },
    real_price: '0',
    rewarded: false
}, {
    id: 1131478,
    created: '2017-12-05T16:42:00',
    expiration: '1969-12-31T23:59:59',
    seller: 'bnchdrff',
    orderid: 1512492109,
    for_sale: 507,
    sell_price: {
        base: '0.507 SBD',
        quote: '1.000 STEEM'
    },
    real_price: '0',
    rewarded: false
}, {
    id: 1131479,
    created: '2017-12-05T16:42:27',
    expiration: '1969-12-31T23:59:59',
    seller: 'bnchdrff',
    orderid: 1512492144,
    for_sale: 507,
    sell_price: {
        base: '0.507 SBD',
        quote: '1.000 STEEM'
    },
    real_price: '0',
    rewarded: false
}];

var toggleSortByPrice = {
    column: 'price',
    dataType: 'float'
};

describe('market reducer', function () {
    it('should provide a nice initial state', function () {
        var initial = (0, _MarketReducer2.default)();

        expect(initial.get('open_orders_sort')).toEqual((0, _immutable.Map)({
            column: 'created',
            dataType: 'string',
            dir: 1
        }));

        expect(initial.get('status')).toEqual({});
    });

    it('should receive open orders', function () {
        var initial = (0, _MarketReducer2.default)();

        var withOrders = (0, _MarketReducer2.default)(initial, (0, _MarketReducer.receiveOpenOrders)(someOpenOrders));

        var orders = withOrders.get('open_orders');

        expect(orders[0].price).toBe(0.666);
        expect(orders[0].sbd).toBe('1.998 SBD');
        expect(orders[1].type).toBe('ask');
        expect(orders[2].price).toBe(0.651);
        expect(orders[2].sbd).toBe('1.953 SBD');
        expect(orders[3].type).toBe('bid');
        expect(orders[3].type).toBe('bid');
    });

    it('should sort open orders', function () {
        var withOrders = (0, _MarketReducer2.default)(undefined, (0, _MarketReducer.receiveOpenOrders)(someOpenOrders));

        var byPriceDesc = (0, _MarketReducer2.default)(withOrders, (0, _MarketReducer.toggleOpenOrdersSort)(toggleSortByPrice));
        var byPriceAsc = (0, _MarketReducer2.default)(byPriceDesc, (0, _MarketReducer.toggleOpenOrdersSort)(toggleSortByPrice));

        var orders = byPriceAsc.get('open_orders');

        expect(orders[0].price).toBe(0.507);
        expect(orders[4].price).toBe(0.666);
    });
});
//# sourceMappingURL=MarketReducer.test.js.map