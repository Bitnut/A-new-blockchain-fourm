'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

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

var _reactRouter = require('react-router');

var _counterpart = require('counterpart');

var _counterpart2 = _interopRequireDefault(_counterpart);

var _immutable = require('immutable');

var _SavingsWithdrawHistory = require('app/components/elements/SavingsWithdrawHistory');

var _SavingsWithdrawHistory2 = _interopRequireDefault(_SavingsWithdrawHistory);

var _TransferHistoryRow = require('app/components/cards/TransferHistoryRow');

var _TransferHistoryRow2 = _interopRequireDefault(_TransferHistoryRow);

var _TransactionError = require('app/components/elements/TransactionError');

var _TransactionError2 = _interopRequireDefault(_TransactionError);

var _TimeAgoWrapper = require('app/components/elements/TimeAgoWrapper');

var _TimeAgoWrapper2 = _interopRequireDefault(_TimeAgoWrapper);

var _StateFunctions = require('app/utils/StateFunctions');

var _WalletSubMenu = require('app/components/elements/WalletSubMenu');

var _WalletSubMenu2 = _interopRequireDefault(_WalletSubMenu);

var _shouldComponentUpdate = require('app/utils/shouldComponentUpdate');

var _shouldComponentUpdate2 = _interopRequireDefault(_shouldComponentUpdate);

var _Tooltip = require('app/components/elements/Tooltip');

var _Tooltip2 = _interopRequireDefault(_Tooltip);

var _Translator = require('app/Translator');

var _client_config = require('app/client_config');

var _TransactionReducer = require('app/redux/TransactionReducer');

var transactionActions = _interopRequireWildcard(_TransactionReducer);

var _GlobalReducer = require('app/redux/GlobalReducer');

var globalActions = _interopRequireWildcard(_GlobalReducer);

var _DropdownMenu = require('app/components/elements/DropdownMenu');

var _DropdownMenu2 = _interopRequireDefault(_DropdownMenu);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint react/prop-types: 0 */
var assetPrecision = 1000;

var UserWallet = function (_React$Component) {
    (0, _inherits3.default)(UserWallet, _React$Component);

    function UserWallet() {
        (0, _classCallCheck3.default)(this, UserWallet);

        var _this = (0, _possibleConstructorReturn3.default)(this, (UserWallet.__proto__ || (0, _getPrototypeOf2.default)(UserWallet)).call(this));

        _this.handleClaimRewards = function (account) {
            _this.setState({ claimInProgress: true }); // disable the claim button
            _this.props.claimRewards(account);
        };

        _this.state = {
            claimInProgress: false
        };
        _this.onShowDepositSteem = function (e) {
            if (e && e.preventDefault) e.preventDefault();
            var name = _this.props.current_user.get('username');
            var new_window = window.open();
            new_window.opener = null;
            new_window.location = 'https://blocktrades.us/?input_coin_type=eth&output_coin_type=steem&receive_address=' + name;
        };
        _this.onShowWithdrawSteem = function (e) {
            e.preventDefault();
            var new_window = window.open();
            new_window.opener = null;
            new_window.location = 'https://blocktrades.us/unregistered_trade/steem/eth';
        };
        _this.onShowDepositPower = function (current_user_name, e) {
            e.preventDefault();
            var new_window = window.open();
            new_window.opener = null;
            new_window.location = 'https://blocktrades.us/?input_coin_type=eth&output_coin_type=steem_power&receive_address=' + current_user_name;
        };
        _this.onShowDepositSBD = function (current_user_name, e) {
            e.preventDefault();
            var new_window = window.open();
            new_window.opener = null;
            new_window.location = 'https://blocktrades.us/?input_coin_type=eth&output_coin_type=sbd&receive_address=' + current_user_name;
        };
        _this.onShowWithdrawSBD = function (e) {
            e.preventDefault();
            var new_window = window.open();
            new_window.opener = null;
            new_window.location = 'https://blocktrades.us/unregistered_trade/sbd/eth';
        };
        _this.shouldComponentUpdate = (0, _shouldComponentUpdate2.default)(_this, 'UserWallet');
        return _this;
    }

    (0, _createClass3.default)(UserWallet, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var onShowDepositSteem = this.onShowDepositSteem,
                onShowWithdrawSteem = this.onShowWithdrawSteem,
                onShowDepositSBD = this.onShowDepositSBD,
                onShowWithdrawSBD = this.onShowWithdrawSBD,
                onShowDepositPower = this.onShowDepositPower;
            var _props = this.props,
                convertToSteem = _props.convertToSteem,
                price_per_steem = _props.price_per_steem,
                savings_withdraws = _props.savings_withdraws,
                account = _props.account,
                current_user = _props.current_user,
                open_orders = _props.open_orders;

            var gprops = this.props.gprops.toJS();

            // do not render if account is not loaded or available
            if (!account) return null;

            // do not render if state appears to contain only lite account info
            if (!account.has('vesting_shares')) return null;

            var vesting_steem = (0, _StateFunctions.vestingSteem)(account.toJS(), gprops);
            var delegated_steem = (0, _StateFunctions.delegatedSteem)(account.toJS(), gprops);

            var isMyAccount = current_user && current_user.get('username') === account.get('name');

            var disabledWarning = false;
            // isMyAccount = false; // false to hide wallet transactions

            var showTransfer = function showTransfer(asset, transferType, e) {
                e.preventDefault();
                _this2.props.showTransfer({
                    to: isMyAccount ? null : account.get('name'),
                    asset: asset,
                    transferType: transferType
                });
            };

            var savings_balance = account.get('savings_balance');
            var savings_sbd_balance = account.get('savings_sbd_balance');

            var powerDown = function powerDown(cancel, e) {
                e.preventDefault();
                var name = account.get('name');
                if (cancel) {
                    var vesting_shares = cancel ? '0.000000 VESTS' : account.get('vesting_shares');
                    _this2.setState({ toggleDivestError: null });
                    var errorCallback = function errorCallback(e2) {
                        _this2.setState({ toggleDivestError: e2.toString() });
                    };
                    var successCallback = function successCallback() {
                        _this2.setState({ toggleDivestError: null });
                    };
                    _this2.props.withdrawVesting({
                        account: name,
                        vesting_shares: vesting_shares,
                        errorCallback: errorCallback,
                        successCallback: successCallback
                    });
                } else {
                    var to_withdraw = account.get('to_withdraw');
                    var withdrawn = account.get('withdrawn');
                    var _vesting_shares = account.get('vesting_shares');
                    var delegated_vesting_shares = account.get('delegated_vesting_shares');
                    _this2.props.showPowerdown({
                        account: name,
                        to_withdraw: to_withdraw,
                        withdrawn: withdrawn,
                        vesting_shares: _vesting_shares,
                        delegated_vesting_shares: delegated_vesting_shares
                    });
                }
            };

            // Sum savings withrawals
            var savings_pending = 0,
                savings_sbd_pending = 0;
            if (savings_withdraws) {
                savings_withdraws.forEach(function (withdraw) {
                    var _withdraw$get$split = withdraw.get('amount').split(' '),
                        _withdraw$get$split2 = (0, _slicedToArray3.default)(_withdraw$get$split, 2),
                        amount = _withdraw$get$split2[0],
                        asset = _withdraw$get$split2[1];

                    if (asset === 'STEEM') savings_pending += parseFloat(amount);else {
                        if (asset === 'SBD') savings_sbd_pending += parseFloat(amount);
                    }
                });
            }

            // Sum conversions
            var conversionValue = 0;
            var currentTime = new Date().getTime();
            var conversions = account.get('other_history', (0, _immutable.List)()).reduce(function (out, item) {
                if (item.getIn([1, 'op', 0], '') !== 'convert') return out;

                var timestamp = new Date(item.getIn([1, 'timestamp'])).getTime();
                var finishTime = timestamp + 86400000 * 3.5; // add 3.5day conversion delay
                if (finishTime < currentTime) return out;

                var amount = parseFloat(item.getIn([1, 'op', 1, 'amount']).replace(' SBD', ''));
                conversionValue += amount;

                return out.concat([_react2.default.createElement(
                    'div',
                    { key: item.get(0) },
                    _react2.default.createElement(
                        _Tooltip2.default,
                        {
                            t: (0, _counterpart2.default)('userwallet_jsx.conversion_complete_tip', {
                                date: new Date(finishTime).toLocaleString()
                            })
                        },
                        _react2.default.createElement(
                            'span',
                            null,
                            '(+',
                            (0, _counterpart2.default)('userwallet_jsx.in_conversion', {
                                amount: (0, _StateFunctions.numberWithCommas)('$' + amount.toFixed(3))
                            }),
                            ')'
                        )
                    )
                )]);
            }, []);

            var balance_steem = parseFloat(account.get('balance').split(' ')[0]);
            var saving_balance_steem = parseFloat(savings_balance.split(' ')[0]);
            var divesting = parseFloat(account.get('vesting_withdraw_rate').split(' ')[0]) > 0.0;
            var sbd_balance = parseFloat(account.get('sbd_balance'));
            var sbd_balance_savings = parseFloat(savings_sbd_balance.split(' ')[0]);
            var sbdOrders = !open_orders || !isMyAccount ? 0 : open_orders.reduce(function (o, order) {
                if (order.sell_price.base.indexOf('SBD') !== -1) {
                    o += order.for_sale;
                }
                return o;
            }, 0) / assetPrecision;

            var steemOrders = !open_orders || !isMyAccount ? 0 : open_orders.reduce(function (o, order) {
                if (order.sell_price.base.indexOf('STEEM') !== -1) {
                    o += order.for_sale;
                }
                return o;
            }, 0) / assetPrecision;

            // set displayed estimated value
            var total_sbd = sbd_balance + sbd_balance_savings + savings_sbd_pending + sbdOrders + conversionValue;
            var total_steem = vesting_steem + balance_steem + saving_balance_steem + savings_pending + steemOrders;
            var total_value = '$' + (0, _StateFunctions.numberWithCommas)((total_steem * price_per_steem + total_sbd).toFixed(2));

            // format spacing on estimated value based on account state
            var estimate_output = _react2.default.createElement(
                'p',
                null,
                total_value
            );
            if (isMyAccount) {
                estimate_output = _react2.default.createElement(
                    'p',
                    null,
                    total_value,
                    '\xA0 \xA0 \xA0'
                );
            }

            /// transfer log
            var idx = 0;
            var transfer_log = account.get('transfer_history').map(function (item) {
                var data = item.getIn([1, 'op', 1]);
                var type = item.getIn([1, 'op', 0]);

                // Filter out rewards
                if (type === 'curation_reward' || type === 'author_reward' || type === 'comment_benefactor_reward') {
                    return null;
                }

                if (data.sbd_payout === '0.000 SBD' && data.vesting_payout === '0.000000 VESTS') return null;
                return _react2.default.createElement(_TransferHistoryRow2.default, {
                    key: idx++,
                    op: item.toJS(),
                    context: account.get('name')
                });
            }).filter(function (el) {
                return !!el;
            }).reverse();

            var steem_menu = [{
                value: (0, _counterpart2.default)('userwallet_jsx.transfer'),
                link: '#',
                onClick: showTransfer.bind(this, 'STEEM', 'Transfer to Account')
            }, {
                value: (0, _counterpart2.default)('userwallet_jsx.transfer_to_savings'),
                link: '#',
                onClick: showTransfer.bind(this, 'STEEM', 'Transfer to Savings')
            }, {
                value: (0, _counterpart2.default)('userwallet_jsx.power_up'),
                link: '#',
                onClick: showTransfer.bind(this, 'VESTS', 'Transfer to Account')
            }];
            var power_menu = [{
                value: (0, _counterpart2.default)('userwallet_jsx.power_down'),
                link: '#',
                onClick: powerDown.bind(this, false)
            }];
            var dollar_menu = [{
                value: (0, _counterpart2.default)('g.transfer'),
                link: '#',
                onClick: showTransfer.bind(this, 'SBD', 'Transfer to Account')
            }, {
                value: (0, _counterpart2.default)('userwallet_jsx.transfer_to_savings'),
                link: '#',
                onClick: showTransfer.bind(this, 'SBD', 'Transfer to Savings')
            }, { value: (0, _counterpart2.default)('userwallet_jsx.market'), link: '/market' }];
            if (isMyAccount) {
                steem_menu.push({
                    value: (0, _counterpart2.default)('g.buy'),
                    link: '#',
                    onClick: onShowDepositSteem.bind(this, current_user.get('username'))
                });
                steem_menu.push({
                    value: (0, _counterpart2.default)('g.sell'),
                    link: '#',
                    onClick: onShowWithdrawSteem
                });
                steem_menu.push({
                    value: (0, _counterpart2.default)('userwallet_jsx.market'),
                    link: '/market'
                });
                power_menu.push({
                    value: (0, _counterpart2.default)('g.buy'),
                    link: '#',
                    onClick: onShowDepositPower.bind(this, current_user.get('username'))
                });
                dollar_menu.push({
                    value: (0, _counterpart2.default)('g.buy'),
                    link: '#',
                    onClick: onShowDepositSBD.bind(this, current_user.get('username'))
                });
                dollar_menu.push({
                    value: (0, _counterpart2.default)('g.sell'),
                    link: '#',
                    onClick: onShowWithdrawSBD
                });
            }
            if (divesting) {
                power_menu.push({
                    value: 'Cancel Power Down',
                    link: '#',
                    onClick: powerDown.bind(this, true)
                });
            }

            var isWithdrawScheduled = new Date(account.get('next_vesting_withdrawal') + 'Z').getTime() > Date.now();

            var steem_balance_str = (0, _StateFunctions.numberWithCommas)(balance_steem.toFixed(3));
            var steem_orders_balance_str = (0, _StateFunctions.numberWithCommas)(steemOrders.toFixed(3));
            var power_balance_str = (0, _StateFunctions.numberWithCommas)(vesting_steem.toFixed(3));
            var received_power_balance_str = (delegated_steem < 0 ? '+' : '') + (0, _StateFunctions.numberWithCommas)((-delegated_steem).toFixed(3));
            var sbd_balance_str = (0, _StateFunctions.numberWithCommas)('$' + sbd_balance.toFixed(3)); // formatDecimal(account.sbd_balance, 3)
            var sbd_orders_balance_str = (0, _StateFunctions.numberWithCommas)('$' + sbdOrders.toFixed(3));
            var savings_balance_str = (0, _StateFunctions.numberWithCommas)(saving_balance_steem.toFixed(3) + ' STEEM');
            var savings_sbd_balance_str = (0, _StateFunctions.numberWithCommas)('$' + sbd_balance_savings.toFixed(3));

            var savings_menu = [{
                value: (0, _counterpart2.default)('userwallet_jsx.withdraw_LIQUID_TOKEN', {
                    LIQUID_TOKEN: _client_config.LIQUID_TOKEN
                }),
                link: '#',
                onClick: showTransfer.bind(this, 'STEEM', 'Savings Withdraw')
            }];
            var savings_sbd_menu = [{
                value: (0, _counterpart2.default)('userwallet_jsx.withdraw_DEBT_TOKENS', {
                    DEBT_TOKENS: _client_config.DEBT_TOKENS
                }),
                link: '#',
                onClick: showTransfer.bind(this, 'SBD', 'Savings Withdraw')
            }];
            // set dynamic secondary wallet values
            var sbdInterest = this.props.sbd_interest / 100;
            var sbdMessage = _react2.default.createElement(
                'span',
                null,
                (0, _counterpart2.default)('userwallet_jsx.tradeable_tokens_transferred')
            );

            var reward_steem = parseFloat(account.get('reward_steem_balance').split(' ')[0]) > 0 ? account.get('reward_steem_balance') : null;
            var reward_sbd = parseFloat(account.get('reward_sbd_balance').split(' ')[0]) > 0 ? account.get('reward_sbd_balance') : null;
            var reward_sp = parseFloat(account.get('reward_vesting_steem').split(' ')[0]) > 0 ? account.get('reward_vesting_steem').replace('STEEM', 'SP') : null;

            var rewards = [];
            if (reward_steem) rewards.push(reward_steem);
            if (reward_sbd) rewards.push(reward_sbd);
            if (reward_sp) rewards.push(reward_sp);

            var rewards_str = void 0;
            switch (rewards.length) {
                case 3:
                    rewards_str = rewards[0] + ', ' + rewards[1] + ' and ' + rewards[2];
                    break;
                case 2:
                    rewards_str = rewards[0] + ' and ' + rewards[1];
                    break;
                case 1:
                    rewards_str = '' + rewards[0];
                    break;
            }

            var claimbox = void 0;
            if (current_user && rewards_str && isMyAccount) {
                claimbox = _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                        'div',
                        { className: 'columns small-12' },
                        _react2.default.createElement(
                            'div',
                            { className: 'UserWallet__claimbox' },
                            _react2.default.createElement(
                                'span',
                                { className: 'UserWallet__claimbox-text' },
                                'Your current rewards: ',
                                rewards_str
                            ),
                            _react2.default.createElement(
                                'button',
                                {
                                    disabled: this.state.claimInProgress,
                                    className: 'button',
                                    onClick: function onClick(e) {
                                        _this2.handleClaimRewards(account);
                                    }
                                },
                                (0, _counterpart2.default)('userwallet_jsx.redeem_rewards')
                            )
                        )
                    )
                );
            }

            return _react2.default.createElement(
                'div',
                { className: 'UserWallet' },
                claimbox,
                _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                        'div',
                        { className: 'columns small-10 medium-12 medium-expand' },
                        isMyAccount ? _react2.default.createElement(_WalletSubMenu2.default, { account_name: account.get('name') }) : _react2.default.createElement(
                            'div',
                            null,
                            _react2.default.createElement('br', null),
                            _react2.default.createElement(
                                'h4',
                                null,
                                (0, _counterpart2.default)('g.balances')
                            ),
                            _react2.default.createElement('br', null)
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'columns shrink' },
                        isMyAccount && _react2.default.createElement(
                            'button',
                            {
                                className: 'UserWallet__buysp button hollow',
                                onClick: onShowDepositSteem
                            },
                            (0, _counterpart2.default)('userwallet_jsx.buy_steem_or_steem_power')
                        )
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'UserWallet__balance row' },
                    _react2.default.createElement(
                        'div',
                        { className: 'column small-12 medium-8' },
                        'STEEM',
                        _react2.default.createElement(_Translator.FormattedHTMLMessage, {
                            className: 'secondary',
                            id: 'tips_js.liquid_token',
                            params: { LIQUID_TOKEN: _client_config.LIQUID_TOKEN, VESTING_TOKEN: _client_config.VESTING_TOKEN }
                        })
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'column small-12 medium-4' },
                        isMyAccount ? _react2.default.createElement(_DropdownMenu2.default, {
                            className: 'Wallet_dropdown',
                            items: steem_menu,
                            el: 'li',
                            selected: steem_balance_str + ' STEEM'
                        }) : steem_balance_str + ' STEEM',
                        steemOrders ? _react2.default.createElement(
                            'div',
                            {
                                style: {
                                    paddingRight: isMyAccount ? '0.85rem' : null
                                }
                            },
                            _react2.default.createElement(
                                _reactRouter.Link,
                                { to: '/market' },
                                _react2.default.createElement(
                                    _Tooltip2.default,
                                    { t: (0, _counterpart2.default)('market_jsx.open_orders') },
                                    '(+',
                                    steem_orders_balance_str,
                                    ' STEEM)'
                                )
                            )
                        ) : null
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'UserWallet__balance row zebra' },
                    _react2.default.createElement(
                        'div',
                        { className: 'column small-12 medium-8' },
                        'STEEM POWER',
                        _react2.default.createElement(_Translator.FormattedHTMLMessage, {
                            className: 'secondary',
                            id: 'tips_js.influence_token'
                        }),
                        delegated_steem != 0 ? _react2.default.createElement(
                            'span',
                            { className: 'secondary' },
                            (0, _counterpart2.default)('tips_js.part_of_your_steem_power_is_currently_delegated', { user_name: account.get('name') })
                        ) : null
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'column small-12 medium-4' },
                        isMyAccount ? _react2.default.createElement(_DropdownMenu2.default, {
                            className: 'Wallet_dropdown',
                            items: power_menu,
                            el: 'li',
                            selected: power_balance_str + ' STEEM'
                        }) : power_balance_str + ' STEEM',
                        delegated_steem != 0 ? _react2.default.createElement(
                            'div',
                            {
                                style: {
                                    paddingRight: isMyAccount ? '0.85rem' : null
                                }
                            },
                            _react2.default.createElement(
                                _Tooltip2.default,
                                { t: 'STEEM POWER delegated to/from this account' },
                                '(',
                                received_power_balance_str,
                                ' STEEM)'
                            )
                        ) : null
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'UserWallet__balance row' },
                    _react2.default.createElement(
                        'div',
                        { className: 'column small-12 medium-8' },
                        'STEEM DOLLARS',
                        _react2.default.createElement(
                            'div',
                            { className: 'secondary' },
                            sbdMessage
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'column small-12 medium-4' },
                        isMyAccount ? _react2.default.createElement(_DropdownMenu2.default, {
                            className: 'Wallet_dropdown',
                            items: dollar_menu,
                            el: 'li',
                            selected: sbd_balance_str
                        }) : sbd_balance_str,
                        sbdOrders ? _react2.default.createElement(
                            'div',
                            {
                                style: {
                                    paddingRight: isMyAccount ? '0.85rem' : null
                                }
                            },
                            _react2.default.createElement(
                                _reactRouter.Link,
                                { to: '/market' },
                                _react2.default.createElement(
                                    _Tooltip2.default,
                                    { t: (0, _counterpart2.default)('market_jsx.open_orders') },
                                    '(+',
                                    sbd_orders_balance_str,
                                    ')'
                                )
                            )
                        ) : null,
                        conversions
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'UserWallet__balance row zebra' },
                    _react2.default.createElement(
                        'div',
                        { className: 'column small-12 medium-8' },
                        (0, _counterpart2.default)('userwallet_jsx.savings'),
                        _react2.default.createElement(
                            'div',
                            { className: 'secondary' },
                            _react2.default.createElement(
                                'span',
                                null,
                                (0, _counterpart2.default)('transfer_jsx.balance_subject_to_3_day_withdraw_waiting_period')
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'column small-12 medium-4' },
                        isMyAccount ? _react2.default.createElement(_DropdownMenu2.default, {
                            className: 'Wallet_dropdown',
                            items: savings_menu,
                            el: 'li',
                            selected: savings_balance_str
                        }) : savings_balance_str,
                        _react2.default.createElement('br', null),
                        isMyAccount ? _react2.default.createElement(_DropdownMenu2.default, {
                            className: 'Wallet_dropdown',
                            items: savings_sbd_menu,
                            el: 'li',
                            selected: savings_sbd_balance_str
                        }) : savings_sbd_balance_str
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'UserWallet__balance row' },
                    _react2.default.createElement(
                        'div',
                        { className: 'column small-12 medium-8' },
                        (0, _counterpart2.default)('userwallet_jsx.estimated_account_value'),
                        _react2.default.createElement(
                            'div',
                            { className: 'secondary' },
                            (0, _counterpart2.default)('tips_js.estimated_value', { LIQUID_TOKEN: _client_config.LIQUID_TOKEN })
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'column small-12 medium-4' },
                        estimate_output
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'UserWallet__balance row' },
                    _react2.default.createElement(
                        'div',
                        { className: 'column small-12' },
                        isWithdrawScheduled && _react2.default.createElement(
                            'span',
                            null,
                            (0, _counterpart2.default)('userwallet_jsx.next_power_down_is_scheduled_to_happen'),
                            '\xA0',
                            ' ',
                            _react2.default.createElement(_TimeAgoWrapper2.default, {
                                date: account.get('next_vesting_withdrawal')
                            }),
                            '.'
                        ),
                        _react2.default.createElement(_TransactionError2.default, { opType: 'withdraw_vesting' })
                    )
                ),
                disabledWarning && _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                        'div',
                        { className: 'column small-12' },
                        _react2.default.createElement(
                            'div',
                            { className: 'callout warning' },
                            (0, _counterpart2.default)('userwallet_jsx.transfers_are_temporary_disabled')
                        )
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
                isMyAccount && _react2.default.createElement(_SavingsWithdrawHistory2.default, null),
                _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                        'div',
                        { className: 'column small-12' },
                        _react2.default.createElement(
                            'h4',
                            null,
                            (0, _counterpart2.default)('userwallet_jsx.history')
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'secondary' },
                            _react2.default.createElement(
                                'span',
                                null,
                                (0, _counterpart2.default)('transfer_jsx.beware_of_spam_and_phishing_links')
                            ),
                            '\xA0',
                            _react2.default.createElement(
                                'span',
                                null,
                                (0, _counterpart2.default)('transfer_jsx.transactions_make_take_a_few_minutes')
                            )
                        ),
                        _react2.default.createElement(
                            'table',
                            null,
                            _react2.default.createElement(
                                'tbody',
                                null,
                                transfer_log
                            )
                        )
                    )
                )
            );
        }
    }]);
    return UserWallet;
}(_react2.default.Component);

exports.default = (0, _reactRedux.connect)(
// mapStateToProps
function (state, ownProps) {
    var price_per_steem = (0, _StateFunctions.pricePerSteem)(state);
    var savings_withdraws = state.user.get('savings_withdraws');
    var gprops = state.global.get('props');
    var sbd_interest = gprops.get('sbd_interest_rate');
    return (0, _extends3.default)({}, ownProps, {
        open_orders: state.market.get('open_orders'),
        price_per_steem: price_per_steem,
        savings_withdraws: savings_withdraws,
        sbd_interest: sbd_interest,
        gprops: gprops
    });
},
// mapDispatchToProps
function (dispatch) {
    return {
        claimRewards: function claimRewards(account) {
            var username = account.get('name');
            var successCallback = function successCallback() {
                dispatch(globalActions.getState({ url: '@' + username + '/transfers' }));
            };

            var operation = {
                account: username,
                reward_steem: account.get('reward_steem_balance'),
                reward_sbd: account.get('reward_sbd_balance'),
                reward_vests: account.get('reward_vesting_balance')
            };

            dispatch(transactionActions.broadcastOperation({
                type: 'claim_reward_balance',
                operation: operation,
                successCallback: successCallback
            }));
        },
        convertToSteem: function convertToSteem(e) {
            //post 2018-01-31 if no calls to this function exist may be safe to remove. Investigate use of ConvertToSteem.jsx
            e.preventDefault();
            var name = 'convertToSteem';
            dispatch(globalActions.showDialog({ name: name }));
        },
        showChangePassword: function showChangePassword(username) {
            var name = 'changePassword';
            dispatch(globalActions.remove({ key: name }));
            dispatch(globalActions.showDialog({ name: name, params: { username: username } }));
        }
    };
})(UserWallet);
//# sourceMappingURL=UserWallet.js.map