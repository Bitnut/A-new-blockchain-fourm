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

var _TimeAgoWrapper = require('app/components/elements/TimeAgoWrapper');

var _TimeAgoWrapper2 = _interopRequireDefault(_TimeAgoWrapper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var React = require('react');

var OrderhistoryRow = function (_React$Component) {
    (0, _inherits3.default)(OrderhistoryRow, _React$Component);

    function OrderhistoryRow(props) {
        (0, _classCallCheck3.default)(this, OrderhistoryRow);

        var _this = (0, _possibleConstructorReturn3.default)(this, (OrderhistoryRow.__proto__ || (0, _getPrototypeOf2.default)(OrderhistoryRow)).call(this));

        _this.state = {
            animate: props.animate && props.index !== 9,
            rowIndex: props.index
        };

        _this.timeout = null;
        return _this;
    }

    (0, _createClass3.default)(OrderhistoryRow, [{
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

            // if (this.props.index === 0) {
            //     console.log("*******\n", nextProps.order.getSBDAmount(), this.props.order.getSBDAmount());
            //     console.log(nextProps.order.getSteemAmount(), this.props.order.getSteemAmount());
            //     console.log(nextProps.order.getPrice(), this.props.order.getPrice());
            // }
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            if (this.state.animate) {
                this._clearAnimate();
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            clearTimeout(this.timeout);
        }
    }, {
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps, nextState) {
            return !this.props.order.equals(nextProps.order) || this.props.total !== nextProps.total || this.state.animate !== nextState.animate;
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                order = _props.order,
                buy = _props.buy,
                total = _props.total;


            var className = this.state.animate ? 'animate ' : '';

            return React.createElement(
                'tr',
                { className: className },
                React.createElement(
                    'td',
                    null,
                    React.createElement(_TimeAgoWrapper2.default, { date: order.date })
                ),
                React.createElement(
                    'td',
                    { className: order.color },
                    order.getStringPrice()
                ),
                React.createElement(
                    'td',
                    null,
                    order.getSteemAmount().toFixed(3)
                ),
                React.createElement(
                    'td',
                    null,
                    order.getSBDAmount().toFixed(3)
                )
            );
        }
    }]);
    return OrderhistoryRow;
}(React.Component);

exports.default = OrderhistoryRow;
//# sourceMappingURL=OrderhistoryRow.js.map