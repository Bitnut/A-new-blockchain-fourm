'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _sign = require('babel-runtime/core-js/math/sign');

var _sign2 = _interopRequireDefault(_sign);

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

var _reactRangeslider = require('react-rangeslider');

var _reactRangeslider2 = _interopRequireDefault(_reactRangeslider);

var _counterpart = require('counterpart');

var _counterpart2 = _interopRequireDefault(_counterpart);

var _CloseButton = require('app/components/elements/CloseButton');

var _CloseButton2 = _interopRequireDefault(_CloseButton);

var _TransactionReducer = require('app/redux/TransactionReducer');

var transactionActions = _interopRequireWildcard(_TransactionReducer);

var _Icon = require('app/components/elements/Icon');

var _Icon2 = _interopRequireDefault(_Icon);

var _client_config = require('app/client_config');

var _FormattedAsset = require('app/components/elements/FormattedAsset');

var _FormattedAsset2 = _interopRequireDefault(_FormattedAsset);

var _StateFunctions = require('app/utils/StateFunctions');

var _shouldComponentUpdate = require('app/utils/shouldComponentUpdate');

var _shouldComponentUpdate2 = _interopRequireDefault(_shouldComponentUpdate);

var _ParsersAndFormatters = require('app/utils/ParsersAndFormatters');

var _DropdownMenu = require('app/components/elements/DropdownMenu');

var _DropdownMenu2 = _interopRequireDefault(_DropdownMenu);

var _TimeAgoWrapper = require('app/components/elements/TimeAgoWrapper');

var _TimeAgoWrapper2 = _interopRequireDefault(_TimeAgoWrapper);

var _Dropdown = require('app/components/elements/Dropdown');

var _Dropdown2 = _interopRequireDefault(_Dropdown);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ABOUT_FLAG = _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
        'p',
        null,
        (0, _counterpart2.default)('voting_jsx.flagging_post_can_remove_rewards_the_flag_should_be_used_for_the_following')
    ),
    _react2.default.createElement(
        'ul',
        null,
        _react2.default.createElement(
            'li',
            null,
            (0, _counterpart2.default)('voting_jsx.disagreement_on_rewards')
        ),
        _react2.default.createElement(
            'li',
            null,
            (0, _counterpart2.default)('voting_jsx.fraud_or_plagiarism')
        ),
        _react2.default.createElement(
            'li',
            null,
            (0, _counterpart2.default)('voting_jsx.hate_speech_or_internet_trolling')
        ),
        _react2.default.createElement(
            'li',
            null,
            (0, _counterpart2.default)('voting_jsx.intentional_miss_categorized_content_or_spam')
        )
    )
);

var MAX_VOTES_DISPLAY = 20;
var VOTE_WEIGHT_DROPDOWN_THRESHOLD = 1.0 * 1000.0 * 1000.0;
var SBD_PRINT_RATE_MAX = 10000;
var MAX_WEIGHT = 10000;

var Voting = (_temp = _class = function (_React$Component) {
    (0, _inherits3.default)(Voting, _React$Component);

    function Voting(props) {
        (0, _classCallCheck3.default)(this, Voting);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Voting.__proto__ || (0, _getPrototypeOf2.default)(Voting)).call(this, props));

        _this.state = {
            showWeight: false,
            myVote: null,
            sliderWeight: {
                up: MAX_WEIGHT,
                down: MAX_WEIGHT
            }
        };

        _this.voteUp = function (e) {
            e && e.preventDefault();
            _this.voteUpOrDown(true);
        };
        _this.voteDown = function (e) {
            e && e.preventDefault();
            _this.voteUpOrDown(false);
        };
        _this.voteUpOrDown = function (up) {
            if (_this.props.voting) return;
            _this.setState({ votingUp: up, votingDown: !up });
            if (_this.state.showWeight) _this.setState({ showWeight: false });
            var myVote = _this.state.myVote;
            var _this$props = _this.props,
                author = _this$props.author,
                permlink = _this$props.permlink,
                username = _this$props.username,
                is_comment = _this$props.is_comment;


            var weight = void 0;
            if (myVote > 0 || myVote < 0) {
                // if there is a current vote, we're clearing it
                weight = 0;
            } else if (_this.props.enable_slider) {
                // if slider is enabled, read its value
                weight = up ? _this.state.sliderWeight.up : -_this.state.sliderWeight.down;
            } else {
                // otherwise, use max power
                weight = up ? MAX_WEIGHT : -MAX_WEIGHT;
            }

            var isFlag = _this.props.flag ? true : null;
            _this.props.vote(weight, {
                author: author,
                permlink: permlink,
                username: username,
                myVote: myVote,
                isFlag: isFlag
            });
        };

        _this.handleWeightChange = function (up) {
            return function (weight) {
                var w = void 0;
                if (up) {
                    w = {
                        up: weight,
                        down: _this.state.sliderWeight.down
                    };
                } else {
                    w = {
                        up: _this.state.sliderWeight.up,
                        down: weight
                    };
                }
                _this.setState({ sliderWeight: w });
            };
        };

        _this.storeSliderWeight = function (up) {
            return function () {
                var _this$props2 = _this.props,
                    username = _this$props2.username,
                    is_comment = _this$props2.is_comment;

                var weight = up ? _this.state.sliderWeight.up : _this.state.sliderWeight.down;
                localStorage.setItem('voteWeight' + (up ? '' : 'Down') + '-' + username + (is_comment ? '-comment' : ''), weight);
            };
        };
        _this.readSliderWeight = function () {
            var _this$props3 = _this.props,
                username = _this$props3.username,
                enable_slider = _this$props3.enable_slider,
                is_comment = _this$props3.is_comment;

            if (enable_slider) {
                var sliderWeightUp = Number(localStorage.getItem('voteWeight' + '-' + username + (is_comment ? '-comment' : '')));
                var sliderWeightDown = Number(localStorage.getItem('voteWeight' + 'Down' + '-' + username + (is_comment ? '-comment' : '')));
                _this.setState({
                    sliderWeight: {
                        up: sliderWeightUp ? sliderWeightUp : MAX_WEIGHT,
                        down: sliderWeightDown ? sliderWeightDown : MAX_WEIGHT
                    }
                });
            }
        };

        _this.toggleWeightUp = function (e) {
            e.preventDefault();
            _this.toggleWeightUpOrDown(true);
        };

        _this.toggleWeightDown = function (e) {
            e && e.preventDefault();
            _this.toggleWeightUpOrDown(false);
        };

        _this.toggleWeightUpOrDown = function (up) {
            _this.setState({ showWeight: !_this.state.showWeight });
        };
        _this.shouldComponentUpdate = (0, _shouldComponentUpdate2.default)(_this, 'Voting');
        return _this;
    }

    (0, _createClass3.default)(Voting, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            var _props = this.props,
                username = _props.username,
                active_votes = _props.active_votes;

            this._checkMyVote(username, active_votes);
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var username = nextProps.username,
                active_votes = nextProps.active_votes;

            this._checkMyVote(username, active_votes);
        }
    }, {
        key: '_checkMyVote',
        value: function _checkMyVote(username, active_votes) {
            if (username && active_votes) {
                var vote = active_votes.find(function (el) {
                    return el.get('voter') === username;
                });
                // weight warning, the API may send a string or a number (when zero)
                if (vote) this.setState({
                    myVote: parseInt(vote.get('percent') || 0, 10)
                });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props2 = this.props,
                active_votes = _props2.active_votes,
                showList = _props2.showList,
                voting = _props2.voting,
                flag = _props2.flag,
                enable_slider = _props2.enable_slider,
                is_comment = _props2.is_comment,
                post_obj = _props2.post_obj,
                price_per_steem = _props2.price_per_steem,
                sbd_print_rate = _props2.sbd_print_rate,
                username = _props2.username;
            var _state = this.state,
                votingUp = _state.votingUp,
                votingDown = _state.votingDown,
                showWeight = _state.showWeight,
                myVote = _state.myVote;

            if (flag && !username) return null;

            var votingUpActive = voting && votingUp;
            var votingDownActive = voting && votingDown;

            var slider = function slider(up) {
                var b = up ? _this2.state.sliderWeight.up : _this2.state.sliderWeight.down;
                var s = up ? '' : '-';
                return _react2.default.createElement(
                    'span',
                    null,
                    _react2.default.createElement(
                        'div',
                        { className: 'weight-display' },
                        s + b / 100,
                        '%'
                    ),
                    _react2.default.createElement(_reactRangeslider2.default, {
                        min: 100,
                        max: MAX_WEIGHT,
                        step: 100,
                        value: b,
                        onChange: _this2.handleWeightChange(up),
                        onChangeComplete: _this2.storeSliderWeight(up),
                        tooltip: false
                    })
                );
            };

            if (flag) {
                var down = _react2.default.createElement(_Icon2.default, {
                    name: votingDownActive ? 'empty' : myVote < 0 ? 'flag2' : 'flag1',
                    className: 'flag'
                });
                var classDown = 'Voting__button Voting__button-down' + (myVote < 0 ? ' Voting__button--downvoted' : '') + (votingDownActive ? ' votingDown' : '');
                var flagWeight = post_obj.getIn(['stats', 'flagWeight']);
                // myVote === current vote

                var invokeFlag = _react2.default.createElement(
                    'span',
                    {
                        href: '#',
                        onClick: this.toggleWeightDown,
                        title: 'Flag',
                        id: 'downvote_button',
                        className: 'flag'
                    },
                    down
                );

                var revokeFlag = _react2.default.createElement(
                    'a',
                    {
                        href: '#',
                        onClick: this.voteDown,
                        title: 'Flag',
                        className: 'flag',
                        id: 'revoke_downvote_button'
                    },
                    down
                );

                var _dropdown = _react2.default.createElement(
                    _Dropdown2.default,
                    {
                        show: showWeight,
                        onHide: function onHide() {
                            return _this2.setState({ showWeight: false });
                        },
                        onShow: function onShow() {
                            _this2.setState({ showWeight: true });
                            _this2.readSliderWeight();
                        },
                        title: invokeFlag,
                        position: 'left'
                    },
                    _react2.default.createElement(
                        'div',
                        { className: 'Voting__adjust_weight_down' },
                        (myVote == null || myVote === 0) && enable_slider && _react2.default.createElement(
                            'div',
                            { className: 'weight-container' },
                            slider(false)
                        ),
                        _react2.default.createElement(_CloseButton2.default, {
                            onClick: function onClick() {
                                return _this2.setState({ showWeight: false });
                            }
                        }),
                        _react2.default.createElement(
                            'div',
                            { className: 'clear Voting__about-flag' },
                            ABOUT_FLAG,
                            _react2.default.createElement(
                                'span',
                                {
                                    href: '#',
                                    onClick: this.voteDown,
                                    className: 'button outline',
                                    title: 'Flag'
                                },
                                'Flag'
                            )
                        )
                    )
                );

                var _flag = myVote === null || myVote === 0 ? _dropdown : revokeFlag;
                return _react2.default.createElement(
                    'span',
                    { className: 'Voting' },
                    _react2.default.createElement(
                        'span',
                        { className: classDown },
                        flagWeight > 0 && _react2.default.createElement(
                            'span',
                            { className: 'Voting__button-downvotes' },
                            '•'.repeat(flagWeight)
                        ),
                        _flag
                    )
                );
            }

            var total_votes = post_obj.getIn(['stats', 'total_votes']);

            var cashout_time = post_obj.get('cashout_time');
            var max_payout = (0, _ParsersAndFormatters.parsePayoutAmount)(post_obj.get('max_accepted_payout'));
            var pending_payout = (0, _ParsersAndFormatters.parsePayoutAmount)(post_obj.get('pending_payout_value'));
            var percent_steem_dollars = post_obj.get('percent_steem_dollars') / 20000;
            var pending_payout_sbd = pending_payout * percent_steem_dollars;
            var pending_payout_sp = (pending_payout - pending_payout_sbd) / price_per_steem;
            var pending_payout_printed_sbd = pending_payout_sbd * (sbd_print_rate / SBD_PRINT_RATE_MAX);
            var pending_payout_printed_steem = (pending_payout_sbd - pending_payout_printed_sbd) / price_per_steem;

            var promoted = (0, _ParsersAndFormatters.parsePayoutAmount)(post_obj.get('promoted'));
            var total_author_payout = (0, _ParsersAndFormatters.parsePayoutAmount)(post_obj.get('total_payout_value'));
            var total_curator_payout = (0, _ParsersAndFormatters.parsePayoutAmount)(post_obj.get('curator_payout_value'));

            var payout = pending_payout + total_author_payout + total_curator_payout;
            if (payout < 0.0) payout = 0.0;
            if (payout > max_payout) payout = max_payout;
            var payout_limit_hit = payout >= max_payout;
            // Show pending payout amount for declined payment posts
            if (max_payout === 0) payout = pending_payout;
            var up = _react2.default.createElement(_Icon2.default, {
                name: votingUpActive ? 'empty' : 'chevron-up-circle',
                className: 'upvote'
            });
            var classUp = 'Voting__button Voting__button-up' + (myVote > 0 ? ' Voting__button--upvoted' : '') + (votingUpActive ? ' votingUp' : '');

            // There is an "active cashout" if: (a) there is a pending payout, OR (b) there is a valid cashout_time AND it's NOT a comment with 0 votes.
            var cashout_active = pending_payout > 0 || cashout_time.indexOf('1969') !== 0 && !(is_comment && total_votes == 0);
            var payoutItems = [];

            if (cashout_active) {
                payoutItems.push({
                    value: (0, _counterpart2.default)('voting_jsx.pending_payout', {
                        value: (0, _ParsersAndFormatters.formatDecimal)(pending_payout).join('')
                    })
                });
                if (max_payout > 0) {
                    payoutItems.push({
                        value: '(' + (0, _ParsersAndFormatters.formatDecimal)(pending_payout_printed_sbd).join('') + ' ' + _client_config.DEBT_TOKEN_SHORT + ', ' + (sbd_print_rate != SBD_PRINT_RATE_MAX ? (0, _ParsersAndFormatters.formatDecimal)(pending_payout_printed_steem).join('') + ' ' + _client_config.LIQUID_TOKEN_UPPERCASE + ', ' : '') + (0, _ParsersAndFormatters.formatDecimal)(pending_payout_sp).join('') + ' ' + _client_config.INVEST_TOKEN_SHORT + ')'
                    });
                }
                payoutItems.push({ value: _react2.default.createElement(_TimeAgoWrapper2.default, { date: cashout_time }) });
            }

            if (max_payout == 0) {
                payoutItems.push({ value: (0, _counterpart2.default)('voting_jsx.payout_declined') });
            } else if (max_payout < 1000000) {
                payoutItems.push({
                    value: (0, _counterpart2.default)('voting_jsx.max_accepted_payout', {
                        value: (0, _ParsersAndFormatters.formatDecimal)(max_payout).join('')
                    })
                });
            }
            if (promoted > 0) {
                payoutItems.push({
                    value: (0, _counterpart2.default)('voting_jsx.promotion_cost', {
                        value: (0, _ParsersAndFormatters.formatDecimal)(promoted).join('')
                    })
                });
            }
            if (total_author_payout > 0) {
                payoutItems.push({
                    value: (0, _counterpart2.default)('voting_jsx.past_payouts', {
                        value: (0, _ParsersAndFormatters.formatDecimal)(total_author_payout + total_curator_payout).join('')
                    })
                });
                payoutItems.push({
                    value: (0, _counterpart2.default)('voting_jsx.past_payouts_author', {
                        value: (0, _ParsersAndFormatters.formatDecimal)(total_author_payout).join('')
                    })
                });
                payoutItems.push({
                    value: (0, _counterpart2.default)('voting_jsx.past_payouts_curators', {
                        value: (0, _ParsersAndFormatters.formatDecimal)(total_curator_payout).join('')
                    })
                });
            }
            var payoutEl = _react2.default.createElement(
                _DropdownMenu2.default,
                { el: 'div', items: payoutItems },
                _react2.default.createElement(
                    'span',
                    { style: payout_limit_hit ? { opacity: '0.5' } : {} },
                    _react2.default.createElement(_FormattedAsset2.default, {
                        amount: payout,
                        asset: '$',
                        classname: max_payout === 0 ? 'strikethrough' : ''
                    }),
                    payoutItems.length > 0 && _react2.default.createElement(_Icon2.default, { name: 'dropdown-arrow' })
                )
            );

            var voters_list = null;
            if (showList && total_votes > 0 && active_votes) {
                var avotes = active_votes.toJS();
                avotes.sort(function (a, b) {
                    return Math.abs(parseInt(a.rshares)) > Math.abs(parseInt(b.rshares)) ? -1 : 1;
                });
                var voters = [];
                for (var v = 0; v < avotes.length && voters.length < MAX_VOTES_DISPLAY; ++v) {
                    var _avotes$v = avotes[v],
                        percent = _avotes$v.percent,
                        voter = _avotes$v.voter;

                    var sign = (0, _sign2.default)(percent);
                    if (sign === 0) continue;
                    voters.push({
                        value: (sign > 0 ? '+ ' : '- ') + voter,
                        link: '/@' + voter
                    });
                }
                if (total_votes > voters.length) {
                    voters.push({
                        value: _react2.default.createElement(
                            'span',
                            null,
                            '\u2026',
                            ' ',
                            (0, _counterpart2.default)('voting_jsx.and_more', {
                                count: total_votes - voters.length
                            })
                        )
                    });
                }
                voters_list = _react2.default.createElement(_DropdownMenu2.default, {
                    selected: (0, _counterpart2.default)('voting_jsx.votes_plural', {
                        count: total_votes
                    }),
                    className: 'Voting__voters_list',
                    items: voters,
                    el: 'div'
                });
            }

            var voteUpClick = this.voteUp;
            var dropdown = null;
            var voteChevron = votingUpActive ? up : _react2.default.createElement(
                'a',
                {
                    href: '#',
                    onClick: voteUpClick,
                    title: myVote > 0 ? (0, _counterpart2.default)('g.remove_vote') : (0, _counterpart2.default)('g.upvote'),
                    id: 'upvote_button'
                },
                up
            );
            if (myVote <= 0 && enable_slider) {
                voteUpClick = this.toggleWeightUp;
                voteChevron = null;
                // Vote weight adjust
                dropdown = _react2.default.createElement(
                    _Dropdown2.default,
                    {
                        show: showWeight,
                        onHide: function onHide() {
                            return _this2.setState({ showWeight: false });
                        },
                        onShow: function onShow() {
                            _this2.setState({ showWeight: true });
                            _this2.readSliderWeight();
                        },
                        title: up
                    },
                    _react2.default.createElement(
                        'div',
                        { className: 'Voting__adjust_weight' },
                        votingUpActive ? _react2.default.createElement(
                            'a',
                            {
                                href: '#',
                                onClick: function onClick() {
                                    return null;
                                },
                                className: 'confirm_weight',
                                title: (0, _counterpart2.default)('g.upvote')
                            },
                            _react2.default.createElement(_Icon2.default, { size: '2x', name: 'empty' })
                        ) : _react2.default.createElement(
                            'a',
                            {
                                href: '#',
                                onClick: this.voteUp,
                                className: 'confirm_weight',
                                title: (0, _counterpart2.default)('g.upvote')
                            },
                            _react2.default.createElement(_Icon2.default, { size: '2x', name: 'chevron-up-circle' })
                        ),
                        slider(true),
                        _react2.default.createElement(_CloseButton2.default, {
                            className: 'Voting__adjust_weight_close',
                            onClick: function onClick() {
                                return _this2.setState({ showWeight: false });
                            }
                        })
                    )
                );
            }
            return _react2.default.createElement(
                'span',
                { className: 'Voting' },
                _react2.default.createElement(
                    'span',
                    { className: 'Voting__inner' },
                    _react2.default.createElement(
                        'span',
                        { className: classUp },
                        voteChevron,
                        dropdown
                    ),
                    payoutEl
                ),
                voters_list
            );
        }
    }]);
    return Voting;
}(_react2.default.Component), _class.propTypes = {
    // HTML properties
    post: _propTypes2.default.string.isRequired,
    flag: _propTypes2.default.bool,
    showList: _propTypes2.default.bool,

    // Redux connect properties
    vote: _propTypes2.default.func.isRequired,
    author: _propTypes2.default.string, // post was deleted
    permlink: _propTypes2.default.string,
    username: _propTypes2.default.string,
    is_comment: _propTypes2.default.bool,
    active_votes: _propTypes2.default.object,
    loggedin: _propTypes2.default.bool,
    post_obj: _propTypes2.default.object,
    enable_slider: _propTypes2.default.bool,
    voting: _propTypes2.default.bool,
    price_per_steem: _propTypes2.default.number,
    sbd_print_rate: _propTypes2.default.number
}, _class.defaultProps = {
    showList: true,
    flag: false
}, _temp);
exports.default = (0, _reactRedux.connect)(
// mapStateToProps
function (state, ownProps) {
    var post = state.global.getIn(['content', ownProps.post]);
    if (!post) return ownProps;
    var author = post.get('author');
    var permlink = post.get('permlink');
    var active_votes = post.get('active_votes');
    var is_comment = post.get('parent_author') !== '';

    var current_account = state.user.get('current');
    var username = current_account ? current_account.get('username') : null;
    var vesting_shares = current_account ? current_account.get('vesting_shares') : 0.0;
    var delegated_vesting_shares = current_account ? current_account.get('delegated_vesting_shares') : 0.0;
    var received_vesting_shares = current_account ? current_account.get('received_vesting_shares') : 0.0;
    var net_vesting_shares = vesting_shares - delegated_vesting_shares + received_vesting_shares;
    var voting = state.global.get('transaction_vote_active_' + author + '_' + permlink);
    var price_per_steem = (0, _StateFunctions.pricePerSteem)(state);
    var sbd_print_rate = state.global.getIn(['props', 'sbd_print_rate']);
    var enable_slider = net_vesting_shares > VOTE_WEIGHT_DROPDOWN_THRESHOLD;

    return {
        post: ownProps.post,
        flag: ownProps.flag,
        showList: ownProps.showList,
        author: author,
        permlink: permlink,
        username: username,
        active_votes: active_votes,
        enable_slider: enable_slider,
        is_comment: is_comment,
        post_obj: post,
        loggedin: username != null,
        voting: voting,
        price_per_steem: price_per_steem,
        sbd_print_rate: sbd_print_rate
    };
},

// mapDispatchToProps
function (dispatch) {
    return {
        vote: function vote(weight, _ref) {
            var author = _ref.author,
                permlink = _ref.permlink,
                username = _ref.username,
                myVote = _ref.myVote,
                isFlag = _ref.isFlag;

            var confirm = function confirm() {
                if (myVote == null) return null;
                if (weight === 0) return isFlag ? (0, _counterpart2.default)('voting_jsx.removing_your_vote') : (0, _counterpart2.default)('voting_jsx.removing_your_vote_will_reset_curation_rewards_for_this_post');
                if (weight > 0) return isFlag ? (0, _counterpart2.default)('voting_jsx.changing_to_an_upvote') : (0, _counterpart2.default)('voting_jsx.changing_to_an_upvote_will_reset_curation_rewards_for_this_post');
                if (weight < 0) return isFlag ? (0, _counterpart2.default)('voting_jsx.changing_to_a_downvote') : (0, _counterpart2.default)('voting_jsx.changing_to_a_downvote_will_reset_curation_rewards_for_this_post');
                return null;
            };
            dispatch(transactionActions.broadcastOperation({
                type: 'vote',
                operation: {
                    voter: username,
                    author: author,
                    permlink: permlink,
                    weight: weight,
                    __config: {
                        title: weight < 0 ? (0, _counterpart2.default)('voting_jsx.confirm_flag') : null
                    }
                },
                confirm: confirm,
                errorCallback: function errorCallback(errorKey) {
                    console.log('Transaction Error:' + errorKey);
                }
            }));
        }
    };
})(Voting);
//# sourceMappingURL=Voting.js.map