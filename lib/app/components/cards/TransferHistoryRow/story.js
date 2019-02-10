'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _react3 = require('@storybook/react');

var _addonKnobs = require('@storybook/addon-knobs');

var _reactIntl = require('react-intl');

var _reactRedux = require('react-redux');

var _redux = require('redux');

var _RootReducer = require('app/redux/RootReducer');

var _RootReducer2 = _interopRequireDefault(_RootReducer);

var _GlobalReducer = require('app/redux/GlobalReducer');

var _get_state = require('../../../../../api_mockdata/get_state');

var _get_state2 = _interopRequireDefault(_get_state);

var _ = require('./');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var store = (0, _redux.createStore)(_RootReducer2.default);

// Load some fake blockchain state.
// This component relies on many parts of the state tree - messy & hard to test!
store.dispatch((0, _GlobalReducer.receiveState)(_get_state2.default));

(0, _react3.storiesOf)('Cards', module).addDecorator(_addonKnobs.withKnobs).addDecorator(function (getStory) {
    return _react2.default.createElement(
        _reactRedux.Provider,
        { store: store },
        getStory()
    );
}).add('TransferHistoryRow', function () {
    return _react2.default.createElement(
        _reactIntl.IntlProvider,
        { locale: 'en' },
        _react2.default.createElement(
            'table',
            null,
            _react2.default.createElement(
                'tbody',
                null,
                _react2.default.createElement(_2.default, {
                    key: 1,
                    op: [{
                        op: ['array one element one', 'array one element two']
                    }, {
                        op: [(0, _addonKnobs.select)('transaction type', ['transfer', 'transfer_to_vesting', 'transfer_to_savings', 'transfer_from_savings', 'cancel_transfer_from_savings', 'withdraw_vesting', 'curation_reward', 'author_reward', 'claim_reward_balance', 'interest', 'fill_convert_request', 'fill_order', 'comment_benefactor_reward', 'something_completely_different'], 'transfer_to_vesting'), {
                            amount: (0, _addonKnobs.number)('amount', 138.69) + ' STEEM',
                            to: (0, _addonKnobs.select)('to user (affects transfer_to_vesting)', ['userA', 'userB', 'userC'], 'userA'),
                            from: (0, _addonKnobs.select)('from user (affects transfer_to_vesting)', ['userA', 'userB', 'userC'], 'userA'),
                            vesting_shares: (0, _addonKnobs.text)('vesting_shares (affects withdraw_vesting)', '0.000000') + ' VESTS',
                            reward_vests: (0, _addonKnobs.text)('reward_vests', '1.1') + ' VESTS',
                            reward: (0, _addonKnobs.text)('reward', '1.1') + ' VESTS',
                            vesting_payout: (0, _addonKnobs.text)('vesting_payout', '123.12') + ' VESTS',
                            request_id: '142857',
                            comment_author: 'comment author',
                            comment_permlink: 'comment permlink',
                            sbd_payout: (0, _addonKnobs.text)('sbd_payout', '0.000') + ' SBD',
                            steem_payout: (0, _addonKnobs.text)('steem_payout', '0.000') + ' STEEM',
                            author: 'author',
                            permlink: 'permlink',
                            reward_steem: (0, _addonKnobs.text)('reward_steem', '1.234') + ' STEEM',
                            reward_sbd: (0, _addonKnobs.text)('reward_sbd', '3.456') + ' SBD',
                            interest: 1.234,
                            amount_in: 1.234,
                            amount_out: 1.234,
                            open_owner: (0, _addonKnobs.select)('open_owner user', ['userA', 'userB', 'userC']),
                            open_pays: 'open_pays amount',
                            current_pays: 'current_pays amount',
                            memo: 'memo here'
                        }],
                        timestamp: (0, _addonKnobs.date)('date', new Date('1 Jul 2016'))
                    }],
                    context: (0, _addonKnobs.select)('context user', ['userA', 'userB', 'userC'], 'userA')
                })
            )
        )
    );
});
//# sourceMappingURL=story.js.map