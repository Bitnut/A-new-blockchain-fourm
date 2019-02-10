'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

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

var _TimeAgoWrapper = require('app/components/elements/TimeAgoWrapper');

var _TimeAgoWrapper2 = _interopRequireDefault(_TimeAgoWrapper);

var _Memo = require('app/components/elements/Memo');

var _Memo2 = _interopRequireDefault(_Memo);

var _StateFunctions = require('app/utils/StateFunctions');

var _counterpart = require('counterpart');

var _counterpart2 = _interopRequireDefault(_counterpart);

var _GDPRUserList = require('app/utils/GDPRUserList');

var _GDPRUserList2 = _interopRequireDefault(_GDPRUserList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import Icon from 'app/components/elements/Icon';
var TransferHistoryRow = function (_React$Component) {
    (0, _inherits3.default)(TransferHistoryRow, _React$Component);

    function TransferHistoryRow() {
        (0, _classCallCheck3.default)(this, TransferHistoryRow);
        return (0, _possibleConstructorReturn3.default)(this, (TransferHistoryRow.__proto__ || (0, _getPrototypeOf2.default)(TransferHistoryRow)).apply(this, arguments));
    }

    (0, _createClass3.default)(TransferHistoryRow, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                op = _props.op,
                context = _props.context,
                curation_reward = _props.curation_reward,
                author_reward = _props.author_reward,
                benefactor_reward = _props.benefactor_reward,
                powerdown_vests = _props.powerdown_vests,
                reward_vests = _props.reward_vests;
            // context -> account perspective

            var type = op[1].op[0];
            var data = op[1].op[1];

            /*  all transfers involve up to 2 accounts, context and 1 other. */
            var message = '';

            var description_start = '';
            var other_account = null;
            var description_end = '';

            if (type === 'transfer_to_vesting') {
                var amount = data.amount.split(' ')[0];

                if (data.from === context) {
                    if (data.to === '') {
                        message = (0, _counterpart2.default)('transferhistoryrow_jsx.transfer_to_vesting.from_self.no_to', { amount: amount });
                        // tt('g.transfer') + amount + tt('g.to') + 'STEEM POWER';
                    } else {
                        message = _react2.default.createElement(
                            'span',
                            null,
                            (0, _counterpart2.default)('transferhistoryrow_jsx.transfer_to_vesting.from_self.to_someone', { amount: amount }),
                            otherAccountLink(data.to)
                        );
                        // tt('g.transfer') + amount + ' STEEM POWER' + tt('g.to');
                    }
                } else if (data.to === context) {
                    message = _react2.default.createElement(
                        'span',
                        null,
                        (0, _counterpart2.default)('transferhistoryrow_jsx.transfer_to_vesting.to_self', { amount: amount }),
                        otherAccountLink(data.from)
                    );
                    // tt('g.receive') + amount + ' STEEM POWER' + tt('g.from');
                } else {
                    message = _react2.default.createElement(
                        'span',
                        null,
                        (0, _counterpart2.default)('transferhistoryrow_jsx.transfer_to_vesting.from_user_to_user', {
                            amount: amount,
                            from: data.from
                        }),
                        otherAccountLink(data.to)
                    );
                    // tt('g.transfer') + amount + ' STEEM POWER' + tt('g.from') +data.from + tt('g.to');
                }
            } else if (/^transfer$|^transfer_to_savings$|^transfer_from_savings$/.test(type)) {
                // transfer_to_savings
                var fromWhere = type === 'transfer_to_savings' ? 'to_savings' : type === 'transfer_from_savings' ? 'from_savings' : 'not_savings';

                if (data.from === context) {
                    // Semi-bad behavior - passing `type` to translation engine -- @todo better somehow?
                    // type can be to_savings, from_savings, or not_savings
                    // Also we can't pass React elements (link to other account) so its order is fixed :()
                    message = _react2.default.createElement(
                        'span',
                        null,
                        (0, _counterpart2.default)(['transferhistoryrow_jsx', 'transfer', 'from_self', fromWhere], { amount: data.amount }),
                        otherAccountLink(data.to),
                        data.request_id && (0, _counterpart2.default)('transferhistoryrow_jsx.request_id', {
                            request_id: data.request_id
                        })
                    );
                    // tt('g.transfer') + `${fromWhere} ${data.amount}` + tt('g.to');
                } else if (data.to === context) {
                    message = _react2.default.createElement(
                        'span',
                        null,
                        (0, _counterpart2.default)(['transferhistoryrow_jsx', 'transfer', 'to_self', fromWhere], { amount: data.amount }),
                        otherAccountLink(data.from),
                        data.request_id && (0, _counterpart2.default)('transferhistoryrow_jsx.request_id', {
                            request_id: data.request_id
                        })
                    );
                    // tt('g.receive') + `${fromWhere} ${data.amount}` + tt('g.from');
                } else {
                    // Removing the `from` link from this one -- only one user is linked anyways.
                    message = _react2.default.createElement(
                        'span',
                        null,
                        (0, _counterpart2.default)(['transferhistoryrow_jsx', 'transfer', 'to_someone_from_someone', fromWhere], {
                            amount: data.amount,
                            from: data.from,
                            to: data.to
                        }),
                        data.request_id && ' ' + (0, _counterpart2.default)('transferhistoryrow_jsx.request_id', {
                            request_id: data.request_id
                        })
                    );
                    // tt('g.transfer') + `${fromWhere} ${data.amount}` + tt('g.from');
                    //other_account = data.from;
                    //description_end += tt('g.to') + data.to;
                }
            } else if (type === 'cancel_transfer_from_savings') {
                message = (0, _counterpart2.default)('transferhistoryrow_jsx.cancel_transfer_from_savings', {
                    request_id: data.request_id
                });
                // `${tt('transferhistoryrow_jsx.cancel_transfer_from_savings')} (${tt('g.request')} ${data.request_id})`;
            } else if (type === 'withdraw_vesting') {
                if (data.vesting_shares === '0.000000 VESTS') message = (0, _counterpart2.default)('transferhistoryrow_jsx.stop_power_down');else message = (0, _counterpart2.default)('transferhistoryrow_jsx.withdraw_vesting', {
                    powerdown_vests: powerdown_vests
                });
                // tt('transferhistoryrow_jsx.start_power_down_of') + ' ' + powerdown_vests + ' STEEM';
            } else if (type === 'curation_reward') {
                var linkToComment = data.comment_author + '/' + data.comment_permlink;
                message = _react2.default.createElement(
                    'span',
                    null,
                    (0, _counterpart2.default)('transferhistoryrow_jsx.curation_reward', {
                        curation_reward: curation_reward
                    }),
                    otherAccountLink(linkToComment)
                );
                // `${curation_reward} STEEM POWER` + tt('g.for');
            } else if (type === 'author_reward') {
                var steem_payout = '';
                if (data.steem_payout !== '0.000 STEEM') steem_payout = ', ' + data.steem_payout;
                message = _react2.default.createElement(
                    'span',
                    null,
                    (0, _counterpart2.default)('transferhistoryrow_jsx.author_reward', {
                        author_reward: author_reward,
                        steem_payout: steem_payout,
                        sbd_payout: data.sbd_payout
                    }),
                    otherAccountLink(data.author + '/' + data.permlink)
                );
                // `${data.sbd_payout}${steem_payout}, ${tt( 'g.and' )} ${author_reward} STEEM POWER ${tt('g.for')}`;
            } else if (type === 'claim_reward_balance') {
                var rewards = [];
                if (parseFloat(data.reward_steem.split(' ')[0]) > 0) rewards.push(data.reward_steem);
                if (parseFloat(data.reward_sbd.split(' ')[0]) > 0) rewards.push(data.reward_sbd);
                if (parseFloat(data.reward_vests.split(' ')[0]) > 0) rewards.push(reward_vests + ' STEEM POWER');

                switch (rewards.length) {
                    case 3:
                        message = (0, _counterpart2.default)('transferhistoryrow_jsx.claim_reward_balance.three_rewards', {
                            first_reward: rewards[0],
                            second_reward: rewards[1],
                            third_reward: rewards[2]
                        });
                        // `${rewards[0]}, ${rewards[1]} and ${ rewards[2] }`;
                        break;
                    case 2:
                        message = (0, _counterpart2.default)('transferhistoryrow_jsx.claim_reward_balance.two_rewards', { first_reward: rewards[0], second_reward: rewards[1] });
                        // `${rewards[0]} and ${rewards[1]}`;
                        break;
                    case 1:
                        message = (0, _counterpart2.default)('transferhistoryrow_jsx.claim_reward_balance.one_reward', { reward: rewards[0] });
                        // `${rewards[0]}`;
                        break;
                }
            } else if (type === 'interest') {
                message = (0, _counterpart2.default)('transferhistoryrow_jsx.interest', {
                    interest: data.interest
                });
                // `${tt( 'transferhistoryrow_jsx.receive_interest_of' )} ${data.interest}`;
            } else if (type === 'fill_convert_request') {
                message = (0, _counterpart2.default)('transferhistoryrow_jsx.fill_convert_request', {
                    amount_in: data.amount_in,
                    amount_out: data.amount_out
                });
                // `Fill convert request: ${data.amount_in} for ${ data.amount_out }`;
            } else if (type === 'fill_order') {
                if (data.open_owner == context) {
                    // my order was filled by data.current_owner
                    message = (0, _counterpart2.default)('transferhistoryrow_jsx.fill_order.filled_by_current_owner', {
                        open_pays: data.open_pays,
                        current_pays: data.current_pays
                    });
                    // `Paid ${data.open_pays} for ${  data.current_pays }`
                } else {
                    // data.open_owner filled my order
                    message = (0, _counterpart2.default)('transferhistoryrow_jsx.fill_order.open_owner_filled_my_order', {
                        open_pays: data.open_pays,
                        current_pays: data.current_pays
                    });
                    // `Paid ${data.current_pays} for ${ data.open_pays }`;
                }
            } else if (type === 'comment_benefactor_reward') {
                message = (0, _counterpart2.default)('transferhistoryrow_jsx.comment_benefactor_reward', {
                    benefactor_reward: benefactor_reward,
                    author: data.author,
                    permlink: data.permlink
                });
                // `${benefactor_reward} STEEM POWER for ${ data.author }/${data.permlink}`;
            } else {
                message = (0, _stringify2.default)((0, _extends3.default)({ type: type }, data), null, 2);
            }
            // <Icon name="clock" className="space-right" />
            return _react2.default.createElement(
                'tr',
                { key: op[0], className: 'Trans' },
                _react2.default.createElement(
                    'td',
                    null,
                    _react2.default.createElement(_TimeAgoWrapper2.default, { date: op[1].timestamp })
                ),
                _react2.default.createElement(
                    'td',
                    {
                        className: 'TransferHistoryRow__text',
                        style: { maxWidth: '40rem' }
                    },
                    message
                ),
                _react2.default.createElement(
                    'td',
                    {
                        className: 'show-for-medium',
                        style: { maxWidth: '40rem', wordWrap: 'break-word' }
                    },
                    _react2.default.createElement(_Memo2.default, { text: data.memo, username: context })
                )
            );
        }
    }]);
    return TransferHistoryRow;
}(_react2.default.Component);

var otherAccountLink = function otherAccountLink(username) {
    return _GDPRUserList2.default.includes(username) ? _react2.default.createElement(
        'span',
        null,
        username
    ) : _react2.default.createElement(
        _reactRouter.Link,
        { to: '/@' + username },
        username
    );
};

exports.default = (0, _reactRedux.connect)(
// mapStateToProps
function (state, ownProps) {
    var op = ownProps.op;
    var type = op[1].op[0];
    var data = op[1].op[1];
    var powerdown_vests = type === 'withdraw_vesting' ? (0, _StateFunctions.numberWithCommas)((0, _StateFunctions.vestsToSp)(state, data.vesting_shares)) : undefined;
    var reward_vests = type === 'claim_reward_balance' ? (0, _StateFunctions.numberWithCommas)((0, _StateFunctions.vestsToSp)(state, data.reward_vests)) : undefined;
    var curation_reward = type === 'curation_reward' ? (0, _StateFunctions.numberWithCommas)((0, _StateFunctions.vestsToSp)(state, data.reward)) : undefined;
    var author_reward = type === 'author_reward' ? (0, _StateFunctions.numberWithCommas)((0, _StateFunctions.vestsToSp)(state, data.vesting_payout)) : undefined;
    var benefactor_reward = type === 'comment_benefactor_reward' ? (0, _StateFunctions.numberWithCommas)((0, _StateFunctions.vestsToSp)(state, data.reward)) : undefined;
    return (0, _extends3.default)({}, ownProps, {
        curation_reward: curation_reward,
        author_reward: author_reward,
        benefactor_reward: benefactor_reward,
        powerdown_vests: powerdown_vests,
        reward_vests: reward_vests
    });
})(TransferHistoryRow);
//# sourceMappingURL=index.js.map