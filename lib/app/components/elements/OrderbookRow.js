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

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var OrderRow = (_temp = _class = function (_React$Component) {
    (0, _inherits3.default)(OrderRow, _React$Component);

    function OrderRow(props) {
        (0, _classCallCheck3.default)(this, OrderRow);

        var _this = (0, _possibleConstructorReturn3.default)(this, (OrderRow.__proto__ || (0, _getPrototypeOf2.default)(OrderRow)).call(this));

        _this.state = {
            animate: props.animate && props.index !== 9,
            rowIndex: props.index
        };

        _this.timeout = null;
        return _this;
    }

    (0, _createClass3.default)(OrderRow, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            if (this.state.animate) {
                this._clearAnimate();
            }
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (this.state.rowIndex !== nextProps.index) {
                return this.setState({
                    rowIndex: nextProps.index
                });
            }

            if (!this.props.order.equals(nextProps.order)) {
                return this.setState({ animate: true }, this._clearAnimate);
            }
        }
    }, {
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps, nextState) {
            return !this.props.order.equals(nextProps.order) || this.props.total !== nextProps.total || this.state.animate !== nextState.animate;
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            clearTimeout(this.timeout);
        }
    }, {
        key: '_clearAnimate',
        value: function _clearAnimate() {
            var _this2 = this;

            setTimeout(function () {
                _this2.setState({
                    animate: false
                });
            }, 1000);
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                order = _props.order,
                side = _props.side,
                total = _props.total;

            var bid = side === 'bids';

            var totalTD = _react2.default.createElement(
                'td',
                null,
                total.toFixed(3)
            );
            var sbd = _react2.default.createElement(
                'td',
                null,
                order.getStringSBD()
            );
            var steem = _react2.default.createElement(
                'td',
                null,
                order.getStringSteem()
            );
            var price = _react2.default.createElement(
                'td',
                null,
                _react2.default.createElement(
                    'strong',
                    null,
                    order.getStringPrice()
                )
            );

            return _react2.default.createElement(
                'tr',
                {
                    onClick: this.props.onClick.bind(this, order.price),
                    className: this.state.animate ? 'animate' : ''
                },
                bid ? totalTD : price,
                bid ? sbd : steem,
                bid ? steem : sbd,
                bid ? price : totalTD
            );
        }
    }]);
    return OrderRow;
}(_react2.default.Component), _class.propTypes = {
    order: _propTypes2.default.object,
    side: _propTypes2.default.string,
    index: _propTypes2.default.number,
    total: _propTypes2.default.number,
    animate: _propTypes2.default.bool
}, _temp);
exports.default = OrderRow;
//# sourceMappingURL=OrderbookRow.js.map