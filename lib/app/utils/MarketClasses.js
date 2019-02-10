'use strict';

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _MarketUtils = require('./MarketUtils');

var _client_config = require('app/client_config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var precision = 1000;

var Order = function () {
    function Order(order, side) {
        (0, _classCallCheck3.default)(this, Order);

        this.side = side;
        this.price = parseFloat(order.real_price);
        this.price = side === 'asks' ? (0, _MarketUtils.roundUp)(this.price, 6) : Math.max((0, _MarketUtils.roundDown)(this.price, 6), 0.000001);
        this.stringPrice = this.price.toFixed(6);
        this.steem = parseInt(order.steem, 10);
        this.sbd = parseInt(order.sbd, 10);
        this.date = order.created;
    }

    (0, _createClass3.default)(Order, [{
        key: 'getSteemAmount',
        value: function getSteemAmount() {
            return this.steem / precision;
        }
    }, {
        key: 'getStringSteem',
        value: function getStringSteem() {
            return this.getSteemAmount().toFixed(3);
        }
    }, {
        key: 'getPrice',
        value: function getPrice() {
            return this.price;
        }
    }, {
        key: 'getStringPrice',
        value: function getStringPrice() {
            return this.stringPrice;
        }
    }, {
        key: 'getStringSBD',
        value: function getStringSBD() {
            return this.getSBDAmount().toFixed(3);
        }
    }, {
        key: 'getSBDAmount',
        value: function getSBDAmount() {
            return this.sbd / precision;
        }
    }, {
        key: 'add',
        value: function add(order) {
            return new Order({
                real_price: this.price,
                steem: this.steem + order.steem,
                sbd: this.sbd + order.sbd,
                date: this.date
            }, this.type);
        }
    }, {
        key: 'equals',
        value: function equals(order) {
            return this.getStringSBD() === order.getStringSBD() && this.getStringSteem() === order.getStringSteem() && this.getStringPrice() === order.getStringPrice();
        }
    }]);
    return Order;
}();

var TradeHistory = function () {
    function TradeHistory(fill) {
        (0, _classCallCheck3.default)(this, TradeHistory);

        // Norm date (FF bug)
        var zdate = fill.date;
        if (!/Z$/.test(zdate)) zdate = zdate + 'Z';

        this.date = new Date(zdate);
        this.type = fill.current_pays.indexOf(_client_config.DEBT_TICKER) !== -1 ? 'bid' : 'ask';
        this.color = this.type == 'bid' ? 'buy-color' : 'sell-color';
        if (this.type === 'bid') {
            this.sbd = parseFloat(fill.current_pays.split(' ' + _client_config.DEBT_TICKER)[0]);
            this.steem = parseFloat(fill.open_pays.split(' ' + _client_config.LIQUID_TICKER)[0]);
        } else {
            this.sbd = parseFloat(fill.open_pays.split(' ' + _client_config.DEBT_TICKER)[0]);
            this.steem = parseFloat(fill.current_pays.split(' ' + _client_config.LIQUID_TICKER)[0]);
        }

        this.price = this.sbd / this.steem;
        this.price = this.type === 'ask' ? (0, _MarketUtils.roundUp)(this.price, 6) : Math.max((0, _MarketUtils.roundDown)(this.price, 6), 0.000001);
        this.stringPrice = this.price.toFixed(6);
    }

    (0, _createClass3.default)(TradeHistory, [{
        key: 'getSteemAmount',
        value: function getSteemAmount() {
            return this.steem;
        }
    }, {
        key: 'getStringSteem',
        value: function getStringSteem() {
            return this.getSteemAmount().toFixed(3);
        }
    }, {
        key: 'getSBDAmount',
        value: function getSBDAmount() {
            return this.sbd;
        }
    }, {
        key: 'getStringSBD',
        value: function getStringSBD() {
            return this.getSBDAmount().toFixed(3);
        }
    }, {
        key: 'getPrice',
        value: function getPrice() {
            return this.price;
        }
    }, {
        key: 'getStringPrice',
        value: function getStringPrice() {
            return this.stringPrice;
        }
    }, {
        key: 'equals',
        value: function equals(order) {
            return this.getStringSBD() === order.getStringSBD() && this.getStringSteem() === order.getStringSteem() && this.getStringPrice() === order.getStringPrice();
        }
    }]);
    return TradeHistory;
}();

module.exports = {
    Order: Order,
    TradeHistory: TradeHistory
};
//# sourceMappingURL=MarketClasses.js.map