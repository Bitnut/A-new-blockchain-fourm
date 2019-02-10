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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _TransferHistoryRow = require('app/components/cards/TransferHistoryRow');

var _TransferHistoryRow2 = _interopRequireDefault(_TransferHistoryRow);

var _StateFunctions = require('app/utils/StateFunctions');

var _counterpart = require('counterpart');

var _counterpart2 = _interopRequireDefault(_counterpart);

var _client_config = require('app/client_config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint react/prop-types: 0 */
var CurationRewards = function (_React$Component) {
    (0, _inherits3.default)(CurationRewards, _React$Component);

    function CurationRewards() {
        (0, _classCallCheck3.default)(this, CurationRewards);

        var _this = (0, _possibleConstructorReturn3.default)(this, (CurationRewards.__proto__ || (0, _getPrototypeOf2.default)(CurationRewards)).call(this));

        _this.state = { historyIndex: 0 };
        _this.onShowDeposit = function () {
            _this.setState({ showDeposit: !_this.state.showDeposit });
        };
        _this.onShowDepositSteem = function () {
            _this.setState({
                showDeposit: !_this.state.showDeposit,
                depositType: _client_config.LIQUID_TICKER
            });
        };
        _this.onShowDepositPower = function () {
            _this.setState({
                showDeposit: !_this.state.showDeposit,
                depositType: _client_config.VEST_TICKER
            });
        };
        // this.onShowDeposit = this.onShowDeposit.bind(this)
        return _this;
    }

    (0, _createClass3.default)(CurationRewards, [{
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps, nextState) {
            return nextProps.transfer_history.length !== this.props.transfer_history.length || nextState.historyIndex !== this.state.historyIndex;
        }
    }, {
        key: '_setHistoryPage',
        value: function _setHistoryPage(back) {
            var newIndex = this.state.historyIndex + (back ? 10 : -10);
            this.setState({ historyIndex: Math.max(0, newIndex) });
        }
    }, {
        key: 'render',
        value: function render() {
            var historyIndex = this.state.historyIndex;
            var _props = this.props,
                transfer_history = _props.transfer_history,
                account_name = _props.account_name;

            /// transfer log

            var rewards24 = 0,
                rewardsWeek = 0,
                totalRewards = 0;
            var today = new Date();
            var oneDay = 86400 * 1000;
            var yesterday = new Date(today.getTime() - oneDay).getTime();
            var lastWeek = new Date(today.getTime() - 7 * oneDay).getTime();

            var firstDate = void 0,
                finalDate = void 0;
            var curation_log = transfer_history.map(function (item, index) {
                // Filter out rewards
                if (item[1].op[0] === 'curation_reward') {
                    if (!finalDate) {
                        finalDate = new Date(item[1].timestamp).getTime();
                    }
                    firstDate = new Date(item[1].timestamp).getTime();
                    var vest = (0, _StateFunctions.assetFloat)(item[1].op[1].reward, _client_config.VEST_TICKER);
                    if (new Date(item[1].timestamp).getTime() > yesterday) {
                        rewards24 += vest;
                        rewardsWeek += vest;
                    } else if (new Date(item[1].timestamp).getTime() > lastWeek) {
                        rewardsWeek += vest;
                    }
                    totalRewards += vest;
                    return _react2.default.createElement(_TransferHistoryRow2.default, {
                        key: index,
                        op: item,
                        context: account_name
                    });
                }
                return null;
            }).filter(function (el) {
                return !!el;
            });
            var currentIndex = -1;
            var curationLength = curation_log.length;
            var daysOfCuration = (firstDate - finalDate) / oneDay || 1;
            var averageCuration = !daysOfCuration ? 0 : totalRewards / daysOfCuration;
            var hasFullWeek = daysOfCuration >= 7;
            var limitedIndex = Math.min(historyIndex, curationLength - 10);
            curation_log = curation_log.reverse().filter(function () {
                currentIndex++;
                return currentIndex >= limitedIndex && currentIndex < limitedIndex + 10;
            });

            var navButtons = _react2.default.createElement(
                'nav',
                null,
                _react2.default.createElement(
                    'ul',
                    { className: 'pager' },
                    _react2.default.createElement(
                        'li',
                        null,
                        _react2.default.createElement(
                            'div',
                            {
                                className: 'button tiny hollow float-left ' + (historyIndex === 0 ? ' disabled' : ''),
                                onClick: this._setHistoryPage.bind(this, false),
                                'aria-label': 'Previous'
                            },
                            _react2.default.createElement(
                                'span',
                                { 'aria-hidden': 'true' },
                                '\u2190 ',
                                (0, _counterpart2.default)('g.newer')
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'li',
                        null,
                        _react2.default.createElement(
                            'div',
                            {
                                className: 'button tiny hollow float-right ' + (historyIndex >= curationLength - 10 ? ' disabled' : ''),
                                onClick: historyIndex >= curationLength - 10 ? null : this._setHistoryPage.bind(this, true),
                                'aria-label': 'Next'
                            },
                            _react2.default.createElement(
                                'span',
                                { 'aria-hidden': 'true' },
                                (0, _counterpart2.default)('g.older'),
                                ' \u2192'
                            )
                        )
                    )
                )
            );

            return _react2.default.createElement(
                'div',
                { className: 'UserWallet' },
                _react2.default.createElement(
                    'div',
                    { className: 'UserWallet__balance UserReward__row row' },
                    _react2.default.createElement(
                        'div',
                        { className: 'column small-12 medium-8' },
                        (0, _counterpart2.default)('curationrewards_jsx.estimated_curation_rewards_last_week'),
                        ':'
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'column small-12 medium-4' },
                        (0, _StateFunctions.numberWithCommas)((0, _StateFunctions.vestsToSp)(this.props.state, rewardsWeek + ' ' + _client_config.VEST_TICKER)) + ' ' + _client_config.VESTING_TOKEN
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                        'div',
                        { className: 'column small-12' },
                        _react2.default.createElement('hr', null)
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                        'div',
                        { className: 'column small-12' },
                        _react2.default.createElement(
                            'h4',
                            null,
                            (0, _counterpart2.default)('curationrewards_jsx.curation_rewards_history')
                        ),
                        _react2.default.createElement(
                            'table',
                            null,
                            _react2.default.createElement(
                                'tbody',
                                null,
                                curation_log
                            )
                        ),
                        navButtons
                    )
                )
            );
        }
    }]);
    return CurationRewards;
}(_react2.default.Component);

exports.default = (0, _reactRedux.connect)(
// mapStateToProps
function (state, ownProps) {
    var account = ownProps.account;

    return {
        state: state,
        account_name: account.name,
        transfer_history: account.transfer_history || []
    };
})(CurationRewards);
//# sourceMappingURL=CurationRewards.js.map