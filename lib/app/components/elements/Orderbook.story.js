'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _react3 = require('@storybook/react');

var _addonKnobs = require('@storybook/addon-knobs');

var _Orderbook = require('./Orderbook');

var _Orderbook2 = _interopRequireDefault(_Orderbook);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var selectOptions = ['error', 'default'];

var mockOrder = {
    getSBDAmount: function getSBDAmount() {
        return 999;
    },
    getStringSBD: function getStringSBD() {
        return 'nine hundred and ninety nine';
    },
    getStringSteem: function getStringSteem() {
        return 'two hundred steem';
    },
    getStringPrice: function getStringPrice() {
        return '55';
    },
    equals: function equals() {
        return 55;
    }
};

var mockOrder2 = {
    getSBDAmount: function getSBDAmount() {
        return 111;
    },
    getStringSBD: function getStringSBD() {
        return 'one hundred and eleven';
    },
    getStringSteem: function getStringSteem() {
        return 'one steem';
    },
    getStringPrice: function getStringPrice() {
        return '55';
    },
    equals: function equals() {
        return 55;
    }
};

(0, _react3.storiesOf)('Elements', module).addDecorator(_addonKnobs.withKnobs).add('Orderbook', function () {
    return _react2.default.createElement(_Orderbook2.default, {
        side: 'bids',
        orders: [mockOrder, mockOrder2],
        onClick: function onClick(price) {
            setFormPrice(price);
        }
    });
});
//# sourceMappingURL=Orderbook.story.js.map