'use strict';

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

var _reactRedux = require('react-redux');

var _reactRouter = require('react-router');

var _Links = require('app/utils/Links');

var _Links2 = _interopRequireDefault(_Links);

var _Icon = require('app/components/elements/Icon');

var _Icon2 = _interopRequireDefault(_Icon);

var _TransactionReducer = require('app/redux/TransactionReducer');

var transactionActions = _interopRequireWildcard(_TransactionReducer);

var _bytebuffer = require('bytebuffer');

var _bytebuffer2 = _interopRequireDefault(_bytebuffer);

var _immutable = require('immutable');

var _GlobalReducer = require('app/redux/GlobalReducer');

var globalActions = _interopRequireWildcard(_GlobalReducer);

var _counterpart = require('counterpart');

var _counterpart2 = _interopRequireDefault(_counterpart);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Long = _bytebuffer2.default.Long;
var string = _propTypes2.default.string,
    func = _propTypes2.default.func,
    object = _propTypes2.default.object;


var DISABLED_SIGNING_KEY = 'STM1111111111111111111111111111111114T1Anm';

function _blockGap(head_block, last_block) {
    if (!last_block || last_block < 1) return 'forever';
    var secs = (head_block - last_block) * 3;
    if (secs < 120) return 'recently';
    var mins = Math.floor(secs / 60);
    if (mins < 120) return mins + ' mins ago';
    var hrs = Math.floor(mins / 60);
    if (hrs < 48) return hrs + ' hrs ago';
    var days = Math.floor(hrs / 24);
    if (days < 14) return days + ' days ago';
    var weeks = Math.floor(days / 7);
    if (weeks < 104) return weeks + ' weeks ago';
}

var Witnesses = (_temp = _class = function (_React$Component) {
    (0, _inherits3.default)(Witnesses, _React$Component);

    function Witnesses() {
        (0, _classCallCheck3.default)(this, Witnesses);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Witnesses.__proto__ || (0, _getPrototypeOf2.default)(Witnesses)).call(this));

        _this.state = { customUsername: '', proxy: '', proxyFailed: false };
        _this.accountWitnessVote = function (accountName, approve, e) {
            e.preventDefault();
            var _this$props = _this.props,
                username = _this$props.username,
                accountWitnessVote = _this$props.accountWitnessVote;

            _this.setState({ customUsername: '' });
            accountWitnessVote(username, accountName, approve);
        };
        _this.onWitnessChange = function (e) {
            var customUsername = e.target.value;
            _this.setState({ customUsername: customUsername });
            // Force update to ensure witness vote appears
            _this.forceUpdate();
        };
        _this.accountWitnessProxy = function (e) {
            e.preventDefault();
            var _this$props2 = _this.props,
                username = _this$props2.username,
                accountWitnessProxy = _this$props2.accountWitnessProxy;

            accountWitnessProxy(username, _this.state.proxy, function (state) {
                _this.setState(state);
            });
        };
        return _this;
    }

    (0, _createClass3.default)(Witnesses, [{
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(np, ns) {
            return !(0, _immutable.is)(np.witness_votes, this.props.witness_votes) || !(0, _immutable.is)(np.witnessVotesInProgress, this.props.witnessVotesInProgress) || np.witnesses !== this.props.witnesses || np.current_proxy !== this.props.current_proxy || np.username !== this.props.username || ns.customUsername !== this.state.customUsername || ns.proxy !== this.state.proxy || ns.proxyFailed !== this.state.proxyFailed;
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                witness_votes = _props.witness_votes,
                witnessVotesInProgress = _props.witnessVotesInProgress,
                current_proxy = _props.current_proxy,
                head_block = _props.head_block,
                _state = this.state,
                customUsername = _state.customUsername,
                proxy = _state.proxy,
                accountWitnessVote = this.accountWitnessVote,
                accountWitnessProxy = this.accountWitnessProxy,
                onWitnessChange = this.onWitnessChange;

            var sorted_witnesses = this.props.witnesses.sort(function (a, b) {
                return Long.fromString(String(b.get('votes'))).subtract(Long.fromString(String(a.get('votes'))).toString());
            });
            var witness_vote_count = 30;
            var rank = 1;

            var witnesses = sorted_witnesses.map(function (item) {
                var owner = item.get('owner');
                var thread = item.get('url');
                var myVote = witness_votes ? witness_votes.has(owner) : null;
                var signingKey = item.get('signing_key');
                var isDisabled = signingKey == DISABLED_SIGNING_KEY;
                var lastBlock = item.get('last_confirmed_block_num');
                var votingActive = witnessVotesInProgress.has(owner);
                var classUp = 'Voting__button Voting__button-up' + (myVote === true ? ' Voting__button--upvoted' : '') + (votingActive ? ' votingUp' : '');
                var up = _react2.default.createElement(_Icon2.default, {
                    name: votingActive ? 'empty' : 'chevron-up-circle',
                    className: 'upvote'
                });

                var witness_thread = '';
                if (thread) {
                    if (_Links2.default.remote.test(thread)) {
                        witness_thread = _react2.default.createElement(
                            'a',
                            { href: thread },
                            (0, _counterpart2.default)('witnesses_jsx.external_site'),
                            '\xA0',
                            _react2.default.createElement(_Icon2.default, { name: 'extlink' })
                        );
                    } else {
                        witness_thread = _react2.default.createElement(
                            _reactRouter.Link,
                            { to: thread },
                            (0, _counterpart2.default)('witnesses_jsx.witness_thread')
                        );
                    }
                }

                var ownerStyle = isDisabled ? { textDecoration: 'line-through', color: '#AAA' } : {};

                return _react2.default.createElement(
                    'tr',
                    { key: owner },
                    _react2.default.createElement(
                        'td',
                        { width: '75' },
                        rank < 10 && '0',
                        rank++,
                        '\xA0\xA0',
                        _react2.default.createElement(
                            'span',
                            { className: classUp },
                            votingActive ? up : _react2.default.createElement(
                                'a',
                                {
                                    href: '#',
                                    onClick: accountWitnessVote.bind(_this2, owner, !myVote),
                                    title: (0, _counterpart2.default)('g.vote')
                                },
                                up
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'td',
                        null,
                        _react2.default.createElement(
                            _reactRouter.Link,
                            { to: '/@' + owner, style: ownerStyle },
                            owner
                        ),
                        isDisabled && _react2.default.createElement(
                            'small',
                            null,
                            ' ',
                            '(',
                            (0, _counterpart2.default)('witnesses_jsx.disabled'),
                            ' ',
                            _blockGap(head_block, lastBlock),
                            ')'
                        )
                    ),
                    _react2.default.createElement(
                        'td',
                        null,
                        witness_thread
                    )
                );
            });

            var addl_witnesses = false;
            if (witness_votes) {
                witness_vote_count -= witness_votes.size;
                addl_witnesses = witness_votes.union(witnessVotesInProgress).filter(function (item) {
                    return !sorted_witnesses.has(item);
                }).map(function (item) {
                    var votingActive = witnessVotesInProgress.has(item);
                    var classUp = 'Voting__button Voting__button-up' + (votingActive ? ' votingUp' : ' Voting__button--upvoted');
                    var up = _react2.default.createElement(_Icon2.default, {
                        name: votingActive ? 'empty' : 'chevron-up-circle',
                        className: 'upvote'
                    });
                    return _react2.default.createElement(
                        'div',
                        { className: 'row', key: item },
                        _react2.default.createElement(
                            'div',
                            { className: 'column small-12' },
                            _react2.default.createElement(
                                'span',
                                null,
                                _react2.default.createElement(
                                    'span',
                                    { className: classUp },
                                    votingActive ? up : _react2.default.createElement(
                                        'a',
                                        {
                                            href: '#',
                                            onClick: accountWitnessVote.bind(_this2, item, false),
                                            title: (0, _counterpart2.default)('g.vote')
                                        },
                                        up
                                    ),
                                    '\xA0'
                                )
                            ),
                            _react2.default.createElement(
                                _reactRouter.Link,
                                { to: '/@' + item },
                                item
                            )
                        )
                    );
                }).toArray();
            }

            return _react2.default.createElement(
                'div',
                { className: 'Witnesses' },
                _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                        'div',
                        { className: 'column' },
                        _react2.default.createElement(
                            'h2',
                            null,
                            (0, _counterpart2.default)('witnesses_jsx.top_witnesses')
                        ),
                        current_proxy && current_proxy.length ? null : _react2.default.createElement(
                            'p',
                            null,
                            _react2.default.createElement(
                                'strong',
                                null,
                                (0, _counterpart2.default)('witnesses_jsx.you_have_votes_remaining', { count: witness_vote_count }),
                                '.'
                            ),
                            ' ',
                            (0, _counterpart2.default)('witnesses_jsx.you_can_vote_for_maximum_of_witnesses'),
                            '.'
                        )
                    )
                ),
                current_proxy ? null : _react2.default.createElement(
                    'div',
                    { className: 'row small-collapse' },
                    _react2.default.createElement(
                        'div',
                        { className: 'column' },
                        _react2.default.createElement(
                            'table',
                            null,
                            _react2.default.createElement(
                                'thead',
                                null,
                                _react2.default.createElement(
                                    'tr',
                                    null,
                                    _react2.default.createElement('th', null),
                                    _react2.default.createElement(
                                        'th',
                                        null,
                                        (0, _counterpart2.default)('witnesses_jsx.witness')
                                    ),
                                    _react2.default.createElement(
                                        'th',
                                        null,
                                        (0, _counterpart2.default)('witnesses_jsx.information')
                                    )
                                )
                            ),
                            _react2.default.createElement(
                                'tbody',
                                null,
                                witnesses.toArray()
                            )
                        )
                    )
                ),
                current_proxy ? null : _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                        'div',
                        { className: 'column' },
                        _react2.default.createElement(
                            'p',
                            null,
                            (0, _counterpart2.default)('witnesses_jsx.if_you_want_to_vote_outside_of_top_enter_account_name'),
                            '.'
                        ),
                        _react2.default.createElement(
                            'form',
                            null,
                            _react2.default.createElement(
                                'div',
                                { className: 'input-group' },
                                _react2.default.createElement(
                                    'span',
                                    { className: 'input-group-label' },
                                    '@'
                                ),
                                _react2.default.createElement('input', {
                                    className: 'input-group-field',
                                    type: 'text',
                                    style: {
                                        float: 'left',
                                        width: '75%',
                                        maxWidth: '20rem'
                                    },
                                    value: customUsername,
                                    onChange: onWitnessChange
                                }),
                                _react2.default.createElement(
                                    'div',
                                    { className: 'input-group-button' },
                                    _react2.default.createElement(
                                        'button',
                                        {
                                            className: 'button',
                                            onClick: accountWitnessVote.bind(this, customUsername, !(witness_votes ? witness_votes.has(customUsername) : null))
                                        },
                                        (0, _counterpart2.default)('g.vote')
                                    )
                                )
                            )
                        ),
                        _react2.default.createElement('br', null),
                        addl_witnesses,
                        _react2.default.createElement('br', null),
                        _react2.default.createElement('br', null)
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                        'div',
                        { className: 'column' },
                        _react2.default.createElement(
                            'p',
                            null,
                            current_proxy ? (0, _counterpart2.default)('witnesses_jsx.witness_set') : (0, _counterpart2.default)('witnesses_jsx.set_witness_proxy')
                        ),
                        current_proxy ? _react2.default.createElement(
                            'div',
                            null,
                            _react2.default.createElement(
                                'div',
                                { style: { paddingBottom: 10 } },
                                (0, _counterpart2.default)('witnesses_jsx.witness_proxy_current'),
                                ':',
                                ' ',
                                _react2.default.createElement(
                                    'strong',
                                    null,
                                    current_proxy
                                )
                            ),
                            _react2.default.createElement(
                                'form',
                                null,
                                _react2.default.createElement(
                                    'div',
                                    { className: 'input-group' },
                                    _react2.default.createElement('input', {
                                        className: 'input-group-field bold',
                                        disabled: true,
                                        type: 'text',
                                        style: {
                                            float: 'left',
                                            width: '75%',
                                            maxWidth: '20rem'
                                        },
                                        value: current_proxy
                                    }),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'input-group-button' },
                                        _react2.default.createElement(
                                            'button',
                                            {
                                                style: { marginBottom: 0 },
                                                className: 'button',
                                                onClick: accountWitnessProxy
                                            },
                                            (0, _counterpart2.default)('witnesses_jsx.witness_proxy_clear')
                                        )
                                    )
                                )
                            )
                        ) : _react2.default.createElement(
                            'form',
                            null,
                            _react2.default.createElement(
                                'div',
                                { className: 'input-group' },
                                _react2.default.createElement(
                                    'span',
                                    { className: 'input-group-label' },
                                    '@'
                                ),
                                _react2.default.createElement('input', {
                                    className: 'input-group-field bold',
                                    type: 'text',
                                    style: {
                                        float: 'left',
                                        width: '75%',
                                        maxWidth: '20rem'
                                    },
                                    value: proxy,
                                    onChange: function onChange(e) {
                                        _this2.setState({
                                            proxy: e.target.value
                                        });
                                    }
                                }),
                                _react2.default.createElement(
                                    'div',
                                    { className: 'input-group-button' },
                                    _react2.default.createElement(
                                        'button',
                                        {
                                            style: { marginBottom: 0 },
                                            className: 'button',
                                            onClick: accountWitnessProxy
                                        },
                                        (0, _counterpart2.default)('witnesses_jsx.witness_proxy_set')
                                    )
                                )
                            )
                        ),
                        this.state.proxyFailed && _react2.default.createElement(
                            'p',
                            { className: 'error' },
                            (0, _counterpart2.default)('witnesses_jsx.proxy_update_error'),
                            '.'
                        ),
                        _react2.default.createElement('br', null)
                    )
                )
            );
        }
    }]);
    return Witnesses;
}(_react2.default.Component), _class.propTypes = {
    // HTML properties

    // Redux connect properties
    witnesses: object.isRequired,
    accountWitnessVote: func.isRequired,
    username: string,
    witness_votes: object
}, _temp);


module.exports = {
    path: '/~witnesses(/:witness)',
    component: (0, _reactRedux.connect)(function (state) {
        var current_user = state.user.get('current');
        var username = current_user && current_user.get('username');
        var current_account = current_user && state.global.getIn(['accounts', username]);
        var witness_votes = current_account && current_account.get('witness_votes').toSet();
        var current_proxy = current_account && current_account.get('proxy');
        var witnesses = state.global.get('witnesses', (0, _immutable.List)());
        var witnessVotesInProgress = state.global.get('transaction_witness_vote_active_' + username, (0, _immutable.Set)());
        return {
            head_block: state.global.getIn(['props', 'head_block_number']),
            witnesses: witnesses,
            username: username,
            witness_votes: witness_votes,
            witnessVotesInProgress: witnessVotesInProgress,
            current_proxy: current_proxy
        };
    }, function (dispatch) {
        return {
            accountWitnessVote: function accountWitnessVote(username, witness, approve) {
                dispatch(transactionActions.broadcastOperation({
                    type: 'account_witness_vote',
                    operation: { account: username, witness: witness, approve: approve }
                }));
            },
            accountWitnessProxy: function accountWitnessProxy(account, proxy, stateCallback) {
                dispatch(transactionActions.broadcastOperation({
                    type: 'account_witness_proxy',
                    operation: { account: account, proxy: proxy },
                    confirm: proxy.length ? 'Set proxy to: ' + proxy : 'You are about to remove your proxy.',
                    successCallback: function successCallback() {
                        dispatch(globalActions.updateAccountWitnessProxy({
                            account: account,
                            proxy: proxy
                        }));
                        stateCallback({
                            proxyFailed: false,
                            proxy: ''
                        });
                    },
                    errorCallback: function errorCallback(e) {
                        console.log('error:', e);
                        stateCallback({ proxyFailed: true });
                    }
                }));
            }
        };
    })(Witnesses)
};
//# sourceMappingURL=Witnesses.js.map