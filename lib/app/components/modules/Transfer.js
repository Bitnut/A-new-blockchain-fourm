'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _ReactForm = require('app/utils/ReactForm');

var _ReactForm2 = _interopRequireDefault(_ReactForm);

var _immutable = require('immutable');

var _reactAutocomplete = require('react-autocomplete');

var _reactAutocomplete2 = _interopRequireDefault(_reactAutocomplete);

var _counterpart = require('counterpart');

var _counterpart2 = _interopRequireDefault(_counterpart);

var _TransactionReducer = require('app/redux/TransactionReducer');

var transactionActions = _interopRequireWildcard(_TransactionReducer);

var _UserReducer = require('app/redux/UserReducer');

var userActions = _interopRequireWildcard(_UserReducer);

var _GlobalReducer = require('app/redux/GlobalReducer');

var globalActions = _interopRequireWildcard(_GlobalReducer);

var _LoadingIndicator = require('app/components/elements/LoadingIndicator');

var _LoadingIndicator2 = _interopRequireDefault(_LoadingIndicator);

var _ConfirmTransfer = require('app/components/elements/ConfirmTransfer');

var _ConfirmTransfer2 = _interopRequireDefault(_ConfirmTransfer);

var _BrowserTests = require('app/utils/BrowserTests');

var _BrowserTests2 = _interopRequireDefault(_BrowserTests);

var _ChainValidation = require('app/utils/ChainValidation');

var _ParsersAndFormatters = require('app/utils/ParsersAndFormatters');

var _client_config = require('app/client_config');

var _reactRedux = require('react-redux');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** Warning .. This is used for Power UP too. */
var TransferForm = (_temp = _class = function (_Component) {
    (0, _inherits3.default)(TransferForm, _Component);

    function TransferForm(props) {
        (0, _classCallCheck3.default)(this, TransferForm);

        var _this = (0, _possibleConstructorReturn3.default)(this, (TransferForm.__proto__ || (0, _getPrototypeOf2.default)(TransferForm)).call(this));

        _this.onAdvanced = function (e) {
            e.preventDefault(); // prevent form submission!!
            var username = _this.props.currentUser.get('username');
            _this.state.to.props.onChange(username);
            // setTimeout(() => {ReactDOM.findDOMNode(this.refs.amount).focus()}, 300)
            _this.setState({ advanced: !_this.state.advanced });
        };

        _this.clearError = function () {
            _this.setState({ trxError: undefined });
        };

        _this.errorCallback = function (estr) {
            _this.setState({ trxError: estr, loading: false });
        };

        _this.assetBalanceClick = function (e) {
            e.preventDefault();
            // Convert '9.999 STEEM' to 9.999
            _this.state.amount.props.onChange(_this.balanceValue().split(' ')[0]);
        };

        _this.onChangeTo = function (value) {
            _this.state.to.props.onChange(value.toLowerCase().trim());
            _this.setState({
                to: (0, _extends3.default)({}, _this.state.to, { value: value.toLowerCase().trim() })
            });
        };

        var transferToSelf = props.transferToSelf;

        _this.state = {
            advanced: !transferToSelf,
            transferTo: false,
            autocompleteUsers: []
        };
        _this.initForm(props);
        return _this;
    }

    (0, _createClass3.default)(TransferForm, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            setTimeout(function () {
                var advanced = _this2.state.advanced;

                if (advanced) _this2.to.focus();else _reactDom2.default.findDOMNode(_this2.refs.amount).focus();
            }, 300);

            (0, _BrowserTests2.default)();

            this.buildTransferAutocomplete();
        }
    }, {
        key: 'buildTransferAutocomplete',
        value: function buildTransferAutocomplete() {
            // Get names for the recent account transfers
            var labelPreviousTransfers = (0, _counterpart2.default)('transfer_jsx.autocomplete_previous_transfers');
            var labelFollowingUser = (0, _counterpart2.default)('transfer_jsx.autocomplete_user_following');

            var transferToLog = this.props.currentAccount.get('transfer_history').reduce(function (acc, cur) {
                if (cur.getIn([1, 'op', 0]) === 'transfer') {
                    var username = cur.getIn([1, 'op', 1, 'to']);
                    var numTransfers = acc.get(username) ? acc.get(username).numTransfers + 1 : 1;
                    return acc.set(username, {
                        username: username,
                        label: numTransfers + ' ' + labelPreviousTransfers,
                        numTransfers: numTransfers
                    });
                }
                return acc;
            }, (0, _immutable.Map)()).remove(this.props.currentUser.get('username'));

            // Build a combined list of users you follow & have previously transferred to,
            // and sort it by 1. desc the number of previous transfers 2. username asc.
            this.setState({
                autocompleteUsers: this.props.following.toOrderedMap().map(function (username) {
                    return {
                        username: username,
                        label: labelFollowingUser,
                        numTransfers: 0
                    };
                }).merge(transferToLog).sortBy(null, function (a, b) {
                    //prioritize sorting by number of transfers
                    if (a.numTransfers > b.numTransfers) {
                        return -1;
                    }
                    if (b.numTransfers > a.numTransfers) {
                        return 1;
                    }
                    //if transfer number is the same, sort by username
                    if (a.username > b.username) {
                        return 1;
                    }
                    if (b.username > a.username) {
                        return -1;
                    }
                    return 0;
                }).toArray()
            });
        }
    }, {
        key: 'matchAutocompleteUser',
        value: function matchAutocompleteUser(item, value) {
            return item.username.toLowerCase().indexOf(value.toLowerCase()) > -1;
        }
    }, {
        key: 'initForm',
        value: function initForm(props) {
            var transferType = props.initialValues.transferType;

            var insufficientFunds = function insufficientFunds(asset, amount) {
                var currentAccount = props.currentAccount;

                var isWithdraw = transferType && transferType === 'Savings Withdraw';
                var balanceValue = !asset || asset === 'STEEM' ? isWithdraw ? currentAccount.get('savings_balance') : currentAccount.get('balance') : asset === 'SBD' ? isWithdraw ? currentAccount.get('savings_sbd_balance') : currentAccount.get('sbd_balance') : null;
                if (!balanceValue) return false;
                var balance = balanceValue.split(' ')[0];
                return parseFloat(amount) > parseFloat(balance);
            };
            var toVesting = props.toVesting;

            var fields = toVesting ? ['to', 'amount'] : ['to', 'amount', 'asset'];
            if (!toVesting && transferType !== 'Transfer to Savings' && transferType !== 'Savings Withdraw') fields.push('memo');
            (0, _ReactForm2.default)({
                name: 'transfer',
                instance: this,
                fields: fields,
                initialValues: props.initialValues,
                validation: function validation(values) {
                    return {
                        to: !values.to ? (0, _counterpart2.default)('g.required') : (0, _ChainValidation.validate_account_name_with_memo)(values.to, values.memo),
                        amount: !values.amount ? 'Required' : !/^\d+(\.\d+)?$/.test(values.amount) ? (0, _counterpart2.default)('transfer_jsx.amount_is_in_form') : insufficientFunds(values.asset, values.amount) ? (0, _counterpart2.default)('transfer_jsx.insufficient_funds') : (0, _ParsersAndFormatters.countDecimals)(values.amount) > 3 ? (0, _counterpart2.default)('transfer_jsx.use_only_3_digits_of_precison') : null,
                        asset: props.toVesting ? null : !values.asset ? (0, _counterpart2.default)('g.required') : null,
                        memo: values.memo ? (0, _ChainValidation.validate_memo_field)(values.memo, props.currentUser.get('username'), props.currentAccount.get('memo_key')) : values.memo && !_BrowserTests.browserTests.memo_encryption && /^#/.test(values.memo) ? 'Encrypted memos are temporarily unavailable (issue #98)' : null
                    };
                }
            });
        }
    }, {
        key: 'balanceValue',
        value: function balanceValue() {
            var transferType = this.props.initialValues.transferType;
            var currentAccount = this.props.currentAccount;
            var asset = this.state.asset;

            var isWithdraw = transferType && transferType === 'Savings Withdraw';
            return !asset || asset.value === 'STEEM' ? isWithdraw ? currentAccount.get('savings_balance') : currentAccount.get('balance') : asset.value === 'SBD' ? isWithdraw ? currentAccount.get('savings_sbd_balance') : currentAccount.get('sbd_balance') : null;
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var transferTips = {
                'Transfer to Account': (0, _counterpart2.default)('transfer_jsx.move_funds_to_another_account', { APP_NAME: _client_config.APP_NAME }),
                'Transfer to Savings': (0, _counterpart2.default)('transfer_jsx.protect_funds_by_requiring_a_3_day_withdraw_waiting_period'),
                'Savings Withdraw': (0, _counterpart2.default)('transfer_jsx.withdraw_funds_after_the_required_3_day_waiting_period')
            };
            var powerTip3 = (0, _counterpart2.default)('tips_js.converted_VESTING_TOKEN_can_be_sent_to_yourself_but_can_not_transfer_again', { LIQUID_TOKEN: _client_config.LIQUID_TOKEN, VESTING_TOKEN: _client_config.VESTING_TOKEN });
            var _state = this.state,
                to = _state.to,
                amount = _state.amount,
                asset = _state.asset,
                memo = _state.memo;
            var _state2 = this.state,
                loading = _state2.loading,
                trxError = _state2.trxError,
                advanced = _state2.advanced;
            var _props = this.props,
                currentUser = _props.currentUser,
                currentAccount = _props.currentAccount,
                toVesting = _props.toVesting,
                transferToSelf = _props.transferToSelf,
                dispatchSubmit = _props.dispatchSubmit;
            var transferType = this.props.initialValues.transferType;
            var _state$transfer = this.state.transfer,
                submitting = _state$transfer.submitting,
                valid = _state$transfer.valid,
                handleSubmit = _state$transfer.handleSubmit;
            // const isMemoPrivate = memo && /^#/.test(memo.value); -- private memos are not supported yet

            var isMemoPrivate = false;

            var form = _react2.default.createElement(
                'form',
                {
                    onSubmit: handleSubmit(function (_ref) {
                        var data = _ref.data;

                        _this3.setState({ loading: true });
                        dispatchSubmit((0, _extends3.default)({}, data, {
                            errorCallback: _this3.errorCallback,
                            currentUser: currentUser,
                            toVesting: toVesting,
                            transferType: transferType
                        }));
                    }),
                    onChange: this.clearError
                },
                toVesting && _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                        'div',
                        { className: 'column small-12' },
                        _react2.default.createElement(
                            'p',
                            null,
                            (0, _counterpart2.default)('tips_js.influence_token')
                        ),
                        _react2.default.createElement(
                            'p',
                            null,
                            (0, _counterpart2.default)('tips_js.non_transferable', {
                                LIQUID_TOKEN: _client_config.LIQUID_TOKEN,
                                VESTING_TOKEN: _client_config.VESTING_TOKEN
                            })
                        )
                    )
                ),
                !toVesting && _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement(
                        'div',
                        { className: 'row' },
                        _react2.default.createElement(
                            'div',
                            { className: 'column small-12' },
                            transferTips[transferType]
                        )
                    ),
                    _react2.default.createElement('br', null)
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                        'div',
                        { className: 'column small-2', style: { paddingTop: 5 } },
                        (0, _counterpart2.default)('transfer_jsx.from')
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'column small-10' },
                        _react2.default.createElement(
                            'div',
                            {
                                className: 'input-group',
                                style: { marginBottom: '1.25rem' }
                            },
                            _react2.default.createElement(
                                'span',
                                { className: 'input-group-label' },
                                '@'
                            ),
                            _react2.default.createElement('input', {
                                className: 'input-group-field bold',
                                type: 'text',
                                disabled: true,
                                value: currentUser.get('username')
                            })
                        )
                    )
                ),
                advanced && _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                        'div',
                        {
                            className: 'column small-2',
                            style: { paddingTop: 5 }
                        },
                        (0, _counterpart2.default)('transfer_jsx.to')
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'column small-10' },
                        _react2.default.createElement(
                            'div',
                            {
                                className: 'input-group',
                                style: { marginBottom: '1.25rem' }
                            },
                            _react2.default.createElement(
                                'span',
                                { className: 'input-group-label' },
                                '@'
                            ),
                            _react2.default.createElement(_reactAutocomplete2.default, {
                                wrapperStyle: {
                                    display: 'inline-block',
                                    width: '100%'
                                },
                                inputProps: {
                                    type: 'text',
                                    className: 'input-group-field',
                                    autoComplete: 'off',
                                    autoCorrect: 'off',
                                    autoCapitalize: 'off',
                                    spellCheck: 'false',
                                    disabled: loading
                                },
                                renderMenu: function renderMenu(items) {
                                    return _react2.default.createElement('div', {
                                        className: 'react-autocomplete-input',
                                        children: items
                                    });
                                },
                                ref: function ref(el) {
                                    return _this3.to = el;
                                },
                                getItemValue: function getItemValue(item) {
                                    return item.username;
                                },
                                items: this.state.autocompleteUsers,
                                shouldItemRender: this.matchAutocompleteUser,
                                renderItem: function renderItem(item, isHighlighted) {
                                    return _react2.default.createElement(
                                        'div',
                                        {
                                            className: isHighlighted ? 'active' : ''
                                        },
                                        item.username + ' (' + item.label + ')'
                                    );
                                },
                                value: this.state.to.value || '',
                                onChange: function onChange(e) {
                                    _this3.setState({
                                        to: (0, _extends3.default)({}, _this3.state.to, {
                                            touched: true,
                                            value: e.target.value
                                        })
                                    });
                                },
                                onSelect: function onSelect(val) {
                                    return _this3.setState({
                                        to: (0, _extends3.default)({}, _this3.state.to, {
                                            value: val
                                        })
                                    });
                                }
                            })
                        ),
                        to.touched && to.error ? _react2.default.createElement(
                            'div',
                            { className: 'error' },
                            to.error,
                            '\xA0'
                        ) : _react2.default.createElement(
                            'p',
                            null,
                            toVesting && powerTip3
                        )
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                        'div',
                        { className: 'column small-2', style: { paddingTop: 5 } },
                        (0, _counterpart2.default)('g.amount')
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'column small-10' },
                        _react2.default.createElement(
                            'div',
                            {
                                className: 'input-group',
                                style: { marginBottom: 5 }
                            },
                            _react2.default.createElement('input', (0, _extends3.default)({
                                type: 'text',
                                placeholder: (0, _counterpart2.default)('g.amount')
                            }, amount.props, {
                                ref: 'amount',
                                autoComplete: 'off',
                                autoCorrect: 'off',
                                autoCapitalize: 'off',
                                spellCheck: 'false',
                                disabled: loading
                            })),
                            asset && _react2.default.createElement(
                                'span',
                                {
                                    className: 'input-group-label',
                                    style: { paddingLeft: 0, paddingRight: 0 }
                                },
                                _react2.default.createElement(
                                    'select',
                                    (0, _extends3.default)({}, asset.props, {
                                        placeholder: (0, _counterpart2.default)('transfer_jsx.asset'),
                                        disabled: loading,
                                        style: {
                                            minWidth: '5rem',
                                            height: 'inherit',
                                            backgroundColor: 'transparent',
                                            border: 'none'
                                        }
                                    }),
                                    _react2.default.createElement(
                                        'option',
                                        { value: 'STEEM' },
                                        'STEEM'
                                    ),
                                    _react2.default.createElement(
                                        'option',
                                        { value: 'SBD' },
                                        'SBD'
                                    )
                                )
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { style: { marginBottom: '0.6rem' } },
                            _react2.default.createElement(AssetBalance, {
                                balanceValue: this.balanceValue(),
                                onClick: this.assetBalanceClick
                            })
                        ),
                        asset && asset.touched && asset.error || amount.touched && amount.error ? _react2.default.createElement(
                            'div',
                            { className: 'error' },
                            asset && asset.touched && asset.error && asset.error,
                            '\xA0',
                            amount.touched && amount.error && amount.error,
                            '\xA0'
                        ) : null
                    )
                ),
                memo && _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                        'div',
                        {
                            className: 'column small-2',
                            style: { paddingTop: 33 }
                        },
                        (0, _counterpart2.default)('g.memo')
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'column small-10' },
                        _react2.default.createElement(
                            'small',
                            null,
                            isMemoPrivate ? (0, _counterpart2.default)('transfer_jsx.this_memo_is_private') : (0, _counterpart2.default)('transfer_jsx.this_memo_is_public')
                        ),
                        _react2.default.createElement('input', (0, _extends3.default)({
                            type: 'text',
                            placeholder: (0, _counterpart2.default)('g.memo')
                        }, memo.props, {
                            ref: 'memo',
                            autoComplete: 'on',
                            autoCorrect: 'off',
                            autoCapitalize: 'off',
                            spellCheck: 'false',
                            disabled: loading
                        })),
                        _react2.default.createElement(
                            'div',
                            { className: 'error' },
                            memo.touched && memo.error && memo.error,
                            '\xA0'
                        )
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                        'div',
                        { className: 'column' },
                        loading && _react2.default.createElement(
                            'span',
                            null,
                            _react2.default.createElement(_LoadingIndicator2.default, { type: 'circle' }),
                            _react2.default.createElement('br', null)
                        ),
                        !loading && _react2.default.createElement(
                            'span',
                            null,
                            trxError && _react2.default.createElement(
                                'div',
                                { className: 'error' },
                                trxError
                            ),
                            _react2.default.createElement(
                                'button',
                                {
                                    type: 'submit',
                                    disabled: submitting || !valid,
                                    className: 'button'
                                },
                                toVesting ? (0, _counterpart2.default)('g.power_up') : (0, _counterpart2.default)('g.next')
                            ),
                            transferToSelf && _react2.default.createElement(
                                'button',
                                {
                                    className: 'button hollow no-border',
                                    disabled: submitting,
                                    onClick: this.onAdvanced
                                },
                                advanced ? (0, _counterpart2.default)('g.basic') : (0, _counterpart2.default)('g.advanced')
                            )
                        )
                    )
                )
            );
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                        'h3',
                        { className: 'column' },
                        toVesting ? (0, _counterpart2.default)('transfer_jsx.convert_to_VESTING_TOKEN', {
                            VESTING_TOKEN: _client_config.VESTING_TOKEN
                        }) : transferType
                    )
                ),
                form
            );
        }
    }]);
    return TransferForm;
}(_react.Component), _class.propTypes = {
    // redux
    currentUser: _propTypes2.default.object.isRequired,
    toVesting: _propTypes2.default.bool.isRequired,
    currentAccount: _propTypes2.default.object.isRequired,
    following: _propTypes2.default.object.isRequired
}, _temp);


var AssetBalance = function AssetBalance(_ref2) {
    var onClick = _ref2.onClick,
        balanceValue = _ref2.balanceValue;
    return _react2.default.createElement(
        'a',
        {
            onClick: onClick,
            style: { borderBottom: '#A09F9F 1px dotted', cursor: 'pointer' }
        },
        (0, _counterpart2.default)('g.balance', { balanceValue: balanceValue })
    );
};

exports.default = (0, _reactRedux.connect)(
// mapStateToProps
function (state, ownProps) {
    var initialValues = state.user.get('transfer_defaults', (0, _immutable.Map)()).toJS();
    var toVesting = initialValues.asset === 'VESTS';
    var currentUser = state.user.getIn(['current']);
    var currentAccount = state.global.getIn(['accounts', currentUser.get('username')]);

    if (!toVesting && !initialValues.transferType) initialValues.transferType = 'Transfer to Account';

    var transferToSelf = toVesting || /Transfer to Savings|Savings Withdraw/.test(initialValues.transferType);
    if (transferToSelf && !initialValues.to) initialValues.to = currentUser.get('username');

    if (initialValues.to !== currentUser.get('username')) transferToSelf = false; // don't hide the to field

    return (0, _extends3.default)({}, ownProps, {
        currentUser: currentUser,
        currentAccount: currentAccount,
        toVesting: toVesting,
        transferToSelf: transferToSelf,
        following: state.global.getIn(['follow', 'getFollowingAsync', currentUser.get('username'), 'blog_result']),
        initialValues: initialValues
    });
},

// mapDispatchToProps
function (dispatch) {
    return {
        dispatchSubmit: function dispatchSubmit(_ref3) {
            var to = _ref3.to,
                amount = _ref3.amount,
                asset = _ref3.asset,
                memo = _ref3.memo,
                transferType = _ref3.transferType,
                toVesting = _ref3.toVesting,
                currentUser = _ref3.currentUser,
                errorCallback = _ref3.errorCallback;

            if (!toVesting && !/Transfer to Account|Transfer to Savings|Savings Withdraw/.test(transferType)) throw new Error('Invalid transfer params: toVesting ' + toVesting + ', transferType ' + transferType);

            var username = currentUser.get('username');
            var successCallback = function successCallback() {
                // refresh transfer history
                dispatch(globalActions.getState({ url: '@' + username + '/transfers' }));
                if (/Savings Withdraw/.test(transferType)) {
                    dispatch(userActions.loadSavingsWithdraw({}));
                }
                dispatch(userActions.hideTransfer());
            };
            var asset2 = toVesting ? 'STEEM' : asset;
            var operation = {
                from: username,
                to: to,
                amount: parseFloat(amount, 10).toFixed(3) + ' ' + asset2,
                memo: toVesting ? undefined : memo ? memo : ''
            };
            var confirm = function confirm() {
                return _react2.default.createElement(_ConfirmTransfer2.default, { operation: operation });
            };
            if (transferType === 'Savings Withdraw') operation.request_id = Math.floor(Date.now() / 1000 % 4294967295);
            dispatch(transactionActions.broadcastOperation({
                type: toVesting ? 'transfer_to_vesting' : transferType === 'Transfer to Account' ? 'transfer' : transferType === 'Transfer to Savings' ? 'transfer_to_savings' : transferType === 'Savings Withdraw' ? 'transfer_from_savings' : null,
                operation: operation,
                successCallback: successCallback,
                errorCallback: errorCallback,
                confirm: confirm
            }));
        }
    };
})(TransferForm);
//# sourceMappingURL=Transfer.js.map