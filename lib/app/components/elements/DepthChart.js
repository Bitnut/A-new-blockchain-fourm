'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _counterpart = require('counterpart');

var _counterpart2 = _interopRequireDefault(_counterpart);

var _client_config = require('app/client_config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import Highcharts from 'highcharts';
var ReactHighcharts = require('react-highcharts/dist/ReactHighstock');


//Highstock does not play well with decimal x values, so we need to
// multiply the x values by a constant factor and divide by this factor for
// display purposes (tooltip, x-axis)
var power = 100;
var precision = 1000;

function orderEqual(a, b) {
    return a.price === b.price && a.steem === b.steem && a.sbd === b.sbd;
}

function ordersEqual(a, b) {
    if (a.length !== b.length) {
        return false;
    }

    for (var key in a) {
        if (!(key in b) || !orderEqual(a[key], b[key])) {
            return false;
        }
    }

    for (var _key in b) {
        if (!(_key in a) || !orderEqual(a[_key], b[_key])) {
            return false;
        }
    }

    return true;
}

var DepthChart = (_temp = _class = function (_React$Component) {
    (0, _inherits3.default)(DepthChart, _React$Component);

    function DepthChart() {
        (0, _classCallCheck3.default)(this, DepthChart);
        return (0, _possibleConstructorReturn3.default)(this, (DepthChart.__proto__ || (0, _getPrototypeOf2.default)(DepthChart)).apply(this, arguments));
    }

    (0, _createClass3.default)(DepthChart, [{
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps) {
            // Don't update if the orders are the same as last time
            if (ordersEqual(nextProps.bids, this.props.bids) && ordersEqual(nextProps.asks, this.props.asks)) {
                return false;
            }

            // Use HighCharts api once the chart has been initialized
            if (this.refs.depthChart) {
                // Only use the HighCharts api when both bids and asks already exist
                var chart = this.refs.depthChart.getChart();
                if (chart && 'series' in chart && chart.series.length === 2) {
                    var _generateBidAsk = generateBidAsk(nextProps.bids, nextProps.asks),
                        bids = _generateBidAsk.bids,
                        asks = _generateBidAsk.asks;

                    var _getMinMax = getMinMax(bids, asks),
                        min = _getMinMax.min,
                        max = _getMinMax.max;

                    chart.series[0].setData(bids);
                    chart.series[1].setData(asks);
                    chart.xAxis[0].setExtremes(min, max);
                    return false;
                }
            }
            return true;
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                bids = _props.bids,
                asks = _props.asks;

            if (!bids.length && !asks.length) {
                return null;
            }
            var depth_chart_config = generateDepthChart(bids, asks);
            return _react2.default.createElement(
                'div',
                { className: 'DepthChart' },
                _react2.default.createElement(ReactHighcharts, { ref: 'depthChart', config: depth_chart_config })
            );
        }
    }]);
    return DepthChart;
}(_react2.default.Component), _class.propTypes = {
    bids: _propTypes2.default.array,
    asks: _propTypes2.default.array
}, _temp);
exports.default = DepthChart;


function generateBidAsk(bidsArray, asksArray) {
    // Input raw orders (from TOP of order book DOWN), output grouped depth
    function aggregateOrders(orders) {
        if (typeof orders == 'undefined') {
            return [];
        }

        var ttl = 0;
        return orders.map(function (o) {
            ttl += o.sbd;
            return [o.price * power, ttl];
        }).sort(function (a, b) {
            // Sort here to make sure arrays are in the right direction for HighCharts
            return a[0] - b[0];
        });
    }

    var bids = aggregateOrders(bidsArray);
    // Insert a 0 entry to make sure the chart is centered properly
    bids.unshift([0, bids[0][1]]);

    var asks = aggregateOrders(asksArray);
    // Insert a final entry to make sure the chart is centered properly
    asks.push([asks[asks.length - 1][0] * 4, asks[asks.length - 1][1]]);

    return { bids: bids, asks: asks };
}

function getMinMax(bids, asks) {
    var highestBid = bids.length ? bids[bids.length - 1][0] : 0;
    var lowestAsk = asks.length ? asks[0][0] : 1;

    var middle = (highestBid + lowestAsk) / 2;

    return {
        min: Math.max(middle * 0.65, bids[0][0]),
        max: Math.min(middle * 1.35, asks[asks.length - 1][0])
    };
}

function generateDepthChart(bidsArray, asksArray) {
    var _generateBidAsk2 = generateBidAsk(bidsArray, asksArray),
        bids = _generateBidAsk2.bids,
        asks = _generateBidAsk2.asks;

    var series = [];

    var _getMinMax2 = getMinMax(bids, asks),
        min = _getMinMax2.min,
        max = _getMinMax2.max;

    if (process.env.BROWSER) {
        if (bids[0]) {
            series.push({
                step: 'right',
                name: (0, _counterpart2.default)('g.bid'),
                color: 'rgba(0,150,0,1.0)',
                fillColor: 'rgba(0,150,0,0.2)',
                tooltip: { valueSuffix: ' ' + _client_config.LIQUID_TICKER },
                data: bids
            });
        }
        if (asks[0]) {
            series.push({
                step: 'left',
                name: (0, _counterpart2.default)('g.ask'),
                color: 'rgba(150,0,0,1.0)',
                fillColor: 'rgba(150,0,0,0.2)',
                tooltip: { valueSuffix: ' ' + _client_config.LIQUID_TICKER },
                data: asks
            });
        }
    }

    var depth_chart_config = {
        title: { text: null },
        subtitle: { text: null },
        chart: { type: 'area', zoomType: 'x' },
        xAxis: {
            min: min,
            max: max,
            labels: {
                formatter: function formatter() {
                    return this.value / power;
                }
            },
            ordinal: false,
            lineColor: '#000000',
            title: {
                text: null
            }
        },
        yAxis: {
            title: { text: null },
            lineWidth: 2,
            labels: {
                align: 'left',
                formatter: function formatter() {
                    var value = this.value / precision;
                    return '$' + (value > 1e6 ? (value / 1e6).toFixed(3) + 'M' : value > 10000 ? (value / 1e3).toFixed(0) + 'k' : value);
                }
            },
            gridLineWidth: 1
        },
        legend: { enabled: false },
        credits: {
            enabled: false
        },
        rangeSelector: {
            enabled: false
        },
        navigator: {
            enabled: false
        },
        scrollbar: {
            enabled: false
        },
        dataGrouping: {
            enabled: false
        },
        tooltip: {
            shared: false,
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            formatter: function formatter() {
                return '<span>' + (0, _counterpart2.default)('g.price') + ': ' + (this.x / power).toFixed(6) + ' ' + _client_config.CURRENCY_SIGN + '/' + _client_config.LIQUID_TOKEN_UPPERCASE + '</span><br/><span>\u25CF</span>' + this.series.name + ': <b>' + (this.y / 1000).toFixed(3) + ' ' + _client_config.DEBT_TOKEN_SHORT + ' ' + '(' + _client_config.CURRENCY_SIGN + ')</b>';
            },

            style: {
                color: '#FFFFFF'
            }
        },
        plotOptions: { series: { animation: false } },
        series: series
    };
    //------------------------------
    return depth_chart_config;
}
//# sourceMappingURL=DepthChart.js.map