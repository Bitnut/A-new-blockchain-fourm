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

var _reactRouter = require('react-router');

var _TimeAgoWrapper = require('app/components/elements/TimeAgoWrapper');

var _TimeAgoWrapper2 = _interopRequireDefault(_TimeAgoWrapper);

var _Icon = require('app/components/elements/Icon');

var _Icon2 = _interopRequireDefault(_Icon);

var _reactRedux = require('react-redux');

var _UserReducer = require('app/redux/UserReducer');

var userActions = _interopRequireWildcard(_UserReducer);

var _Reblog = require('app/components/elements/Reblog');

var _Reblog2 = _interopRequireDefault(_Reblog);

var _Voting = require('app/components/elements/Voting');

var _Voting2 = _interopRequireDefault(_Voting);

var _Accessors = require('app/utils/Accessors');

var _ExtractContent = require('app/utils/ExtractContent');

var _ExtractContent2 = _interopRequireDefault(_ExtractContent);

var _VotesAndComments = require('app/components/elements/VotesAndComments');

var _VotesAndComments2 = _interopRequireDefault(_VotesAndComments);

var _immutable = require('immutable');

var _Author = require('app/components/elements/Author');

var _Author2 = _interopRequireDefault(_Author);

var _TagList = require('app/components/elements/TagList');

var _TagList2 = _interopRequireDefault(_TagList);

var _UserNames = require('app/components/elements/UserNames');

var _UserNames2 = _interopRequireDefault(_UserNames);

var _counterpart = require('counterpart');

var _counterpart2 = _interopRequireDefault(_counterpart);

var _ImageUserBlockList = require('app/utils/ImageUserBlockList');

var _ImageUserBlockList2 = _interopRequireDefault(_ImageUserBlockList);

var _ProxifyUrl = require('app/utils/ProxifyUrl');

var _ProxifyUrl2 = _interopRequireDefault(_ProxifyUrl);

var _Userpic = require('app/components/elements/Userpic');

var _Userpic2 = _interopRequireDefault(_Userpic);

var _constants = require('shared/constants');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PostSummary = (_temp = _class = function (_React$Component) {
    (0, _inherits3.default)(PostSummary, _React$Component);

    function PostSummary() {
        (0, _classCallCheck3.default)(this, PostSummary);

        var _this = (0, _possibleConstructorReturn3.default)(this, (PostSummary.__proto__ || (0, _getPrototypeOf2.default)(PostSummary)).call(this));

        _this.state = { revealNsfw: false };
        _this.onRevealNsfw = _this.onRevealNsfw.bind(_this);
        return _this;
    }

    (0, _createClass3.default)(PostSummary, [{
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(props, state) {
            return props.thumbSize !== this.props.thumbSize || props.pending_payout !== this.props.pending_payout || props.total_payout !== this.props.total_payout || props.username !== this.props.username || props.nsfwPref !== this.props.nsfwPref || props.blogmode !== this.props.blogmode || state.revealNsfw !== this.state.revealNsfw;
        }
    }, {
        key: 'onRevealNsfw',
        value: function onRevealNsfw(e) {
            e.preventDefault();
            this.setState({ revealNsfw: true });
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                thumbSize = _props.thumbSize,
                ignore = _props.ignore;
            var _props2 = this.props,
                post = _props2.post,
                content = _props2.content;
            var account = this.props.account;

            if (!content) return null;

            var reblogged_by = void 0;
            if (content.get('reblogged_by') && content.get('reblogged_by').size > 0) {
                reblogged_by = content.get('reblogged_by').toJS();
            }

            if (reblogged_by) {
                reblogged_by = _react2.default.createElement(
                    'div',
                    { className: 'articles__resteem' },
                    _react2.default.createElement(
                        'p',
                        { className: 'articles__resteem-text' },
                        _react2.default.createElement(
                            'span',
                            { className: 'articles__resteem-icon' },
                            _react2.default.createElement(_Icon2.default, { name: 'reblog' })
                        ),
                        _react2.default.createElement(_UserNames2.default, { names: reblogged_by }),
                        ' ',
                        (0, _counterpart2.default)('postsummary_jsx.resteemed')
                    )
                );
            }

            // 'account' is the current blog being viewed, if applicable.
            if (account && account != content.get('author')) {
                reblogged_by = _react2.default.createElement(
                    'div',
                    { className: 'articles__resteem' },
                    _react2.default.createElement(
                        'p',
                        { className: 'articles__resteem-text' },
                        _react2.default.createElement(
                            'span',
                            { className: 'articles__resteem-icon' },
                            _react2.default.createElement(_Icon2.default, { name: 'reblog' })
                        ),
                        (0, _counterpart2.default)('postsummary_jsx.resteemed')
                    )
                );
            }

            var _content$get$toJS = content.get('stats', (0, _immutable.Map)()).toJS(),
                gray = _content$get$toJS.gray,
                authorRepLog10 = _content$get$toJS.authorRepLog10,
                flagWeight = _content$get$toJS.flagWeight,
                isNsfw = _content$get$toJS.isNsfw;

            var pinned = content.get('pinned');
            var p = (0, _ExtractContent2.default)(_Accessors.immutableAccessor, content);
            var desc = p.desc;

            var archived = content.get('cashout_time') === '1969-12-31T23:59:59'; // TODO: audit after HF17. #1259
            var full_power = content.get('percent_steem_dollars') === 0;

            var post_url = void 0;
            var title_text = void 0;
            var comments_url = void 0;

            if (content.get('depth') > 0) {
                title_text = (0, _counterpart2.default)('g.re_to', { topic: content.get('root_title') });
                post_url = '/' + content.get('category') + '/@' + content.get('author') + '/' + content.get('permlink');
                comments_url = p.link + '#comments';
            } else {
                title_text = p.title;
                post_url = p.link;
                comments_url = post_url + '#comments';
            }

            var content_body = _react2.default.createElement(
                'div',
                { className: 'PostSummary__body entry-content' },
                _react2.default.createElement(
                    _reactRouter.Link,
                    { to: post_url },
                    desc
                )
            );
            var content_title = _react2.default.createElement(
                'h2',
                { className: 'articles__h2 entry-title' },
                _react2.default.createElement(
                    _reactRouter.Link,
                    { to: post_url },
                    isNsfw && _react2.default.createElement(
                        'span',
                        { className: 'nsfw-flag' },
                        'nsfw'
                    ),
                    title_text
                )
            );

            // author and category
            var author_category = _react2.default.createElement(
                'span',
                { className: 'vcard' },
                _react2.default.createElement(_Userpic2.default, { account: p.author }),
                _react2.default.createElement(_Author2.default, {
                    author: p.author,
                    authorRepLog10: authorRepLog10,
                    follow: false,
                    mute: false
                }),
                ' ',
                (0, _counterpart2.default)('g.in'),
                ' ',
                _react2.default.createElement(_TagList2.default, { post: p, single: true }),
                '\xA0\u2022\xA0',
                _react2.default.createElement(
                    _reactRouter.Link,
                    { to: post_url },
                    _react2.default.createElement(_TimeAgoWrapper2.default, { date: p.created, className: 'updated' })
                )
            );

            // New Post Summary heading
            var summary_header = _react2.default.createElement(
                'div',
                { className: 'articles__summary-header' },
                _react2.default.createElement(
                    'div',
                    { className: 'user' },
                    !isNsfw ? _react2.default.createElement(
                        'div',
                        { className: 'user__col user__col--left' },
                        _react2.default.createElement(
                            'a',
                            { className: 'user__link', href: '/@' + p.author },
                            _react2.default.createElement(_Userpic2.default, {
                                account: p.author,
                                size: _Userpic.avatarSize.small
                            })
                        )
                    ) : null,
                    _react2.default.createElement(
                        'div',
                        { className: 'user__col user__col--right' },
                        _react2.default.createElement(
                            'span',
                            { className: 'user__name' },
                            _react2.default.createElement(_Author2.default, {
                                author: p.author,
                                authorRepLog10: authorRepLog10,
                                follow: false,
                                mute: false
                            })
                        ),
                        _react2.default.createElement(
                            'span',
                            { className: 'articles__tag-link' },
                            (0, _counterpart2.default)('g.in'),
                            '\xA0',
                            _react2.default.createElement(_TagList2.default, { post: p, single: true }),
                            '\xA0\u2022\xA0'
                        ),
                        _react2.default.createElement(
                            _reactRouter.Link,
                            { className: 'timestamp__link', to: post_url },
                            _react2.default.createElement(
                                'span',
                                { className: 'timestamp__time' },
                                _react2.default.createElement(_TimeAgoWrapper2.default, {
                                    date: p.created,
                                    className: 'updated'
                                })
                            ),
                            full_power && _react2.default.createElement(
                                'span',
                                {
                                    className: 'articles__icon-100',
                                    title: (0, _counterpart2.default)('g.powered_up_100')
                                },
                                _react2.default.createElement(_Icon2.default, { name: 'steempower' })
                            )
                        )
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'articles__flag clearfix' },
                    _react2.default.createElement(_Voting2.default, { post: post, flag: true })
                )
            );

            var content_footer = _react2.default.createElement(
                'div',
                { className: 'PostSummary__footer' },
                _react2.default.createElement(_Voting2.default, { post: post, showList: false }),
                _react2.default.createElement(_VotesAndComments2.default, { post: post, commentsLink: comments_url }),
                _react2.default.createElement(
                    'span',
                    { className: 'PostSummary__time_author_category' },
                    !archived && _react2.default.createElement(_Reblog2.default, {
                        author: p.author,
                        permlink: p.permlink,
                        parent_author: p.parent_author
                    }),
                    _react2.default.createElement(
                        'span',
                        { className: 'show-for-medium' },
                        author_category
                    )
                )
            );

            var summary_footer = _react2.default.createElement(
                'div',
                { className: 'articles__summary-footer' },
                _react2.default.createElement(_Voting2.default, { post: post, showList: false }),
                _react2.default.createElement(_VotesAndComments2.default, { post: post, commentsLink: comments_url }),
                _react2.default.createElement(
                    'span',
                    { className: 'PostSummary__time_author_category' },
                    !archived && _react2.default.createElement(_Reblog2.default, {
                        author: p.author,
                        permlink: p.permlink,
                        parent_author: p.parent_author
                    })
                )
            );

            var _props3 = this.props,
                nsfwPref = _props3.nsfwPref,
                username = _props3.username;
            var revealNsfw = this.state.revealNsfw;


            if (isNsfw) {
                if (nsfwPref === 'hide') {
                    // user wishes to hide these posts entirely
                    return null;
                } else if (nsfwPref === 'warn' && !revealNsfw) {
                    // user wishes to be warned, and has not revealed this post
                    return _react2.default.createElement(
                        'article',
                        {
                            className: 'PostSummary hentry',
                            itemScope: true,
                            itemType: 'http://schema.org/blogPost'
                        },
                        _react2.default.createElement(
                            'div',
                            { className: 'PostSummary__nsfw-warning' },
                            summary_header,
                            _react2.default.createElement(
                                'span',
                                { className: 'nsfw-flag' },
                                'nsfw'
                            ),
                            '\xA0\xA0',
                            _react2.default.createElement(
                                'span',
                                {
                                    className: 'ptc',
                                    role: 'button',
                                    onClick: this.onRevealNsfw
                                },
                                _react2.default.createElement(
                                    'a',
                                    null,
                                    (0, _counterpart2.default)('postsummary_jsx.reveal_it')
                                )
                            ),
                            ' ',
                            (0, _counterpart2.default)('g.or') + ' ',
                            username ? _react2.default.createElement(
                                'span',
                                null,
                                (0, _counterpart2.default)('postsummary_jsx.adjust_your'),
                                ' ',
                                _react2.default.createElement(
                                    _reactRouter.Link,
                                    { to: '/@' + username + '/settings' },
                                    (0, _counterpart2.default)('postsummary_jsx.display_preferences')
                                ),
                                '.'
                            ) : _react2.default.createElement(
                                'span',
                                null,
                                _react2.default.createElement(
                                    'a',
                                    { href: _constants.SIGNUP_URL },
                                    (0, _counterpart2.default)('postsummary_jsx.create_an_account')
                                ),
                                ' ',
                                (0, _counterpart2.default)('postsummary_jsx.to_save_your_preferences'),
                                '.'
                            ),
                            summary_footer
                        )
                    );
                }
            }

            var userBlacklisted = _ImageUserBlockList2.default.includes(p.author);

            var thumb = null;
            if (!gray && p.image_link && !userBlacklisted) {
                // on mobile, we always use blog layout style -- there's no toggler
                // on desktop, we offer a choice of either blog or list
                // if blogmode is false, output an image with a srcset
                // which has the 256x512 for whatever the large breakpoint is where the list layout is used
                // and the 640 for lower than that

                var blogSize = (0, _ProxifyUrl2.default)(p.image_link, '640x480').replace(/ /g, '%20');

                if (this.props.blogmode) {
                    thumb = _react2.default.createElement(
                        'span',
                        { className: 'articles__feature-img-container' },
                        _react2.default.createElement('img', { className: 'articles__feature-img', src: blogSize })
                    );
                } else {
                    var listSize = (0, _ProxifyUrl2.default)(p.image_link, '256x512').replace(/ /g, '%20');

                    thumb = _react2.default.createElement(
                        'span',
                        { className: 'articles__feature-img-container' },
                        _react2.default.createElement(
                            'picture',
                            { className: 'articles__feature-img' },
                            _react2.default.createElement('source', {
                                srcSet: listSize,
                                media: '(min-width: 1000px)'
                            }),
                            _react2.default.createElement('img', { srcSet: blogSize })
                        )
                    );
                }
            }

            // A post is hidden if it's marked "gray" or "ignore" and it's not
            // pinned.
            var commentClasses = [];
            if (!pinned && (gray || ignore)) commentClasses.push('downvoted'); // rephide

            return _react2.default.createElement(
                'div',
                { className: 'articles__summary' },
                reblogged_by,
                summary_header,
                _react2.default.createElement(
                    'div',
                    {
                        className: 'articles__content hentry' + (thumb ? ' with-image ' : ' ') + commentClasses.join(' '),
                        itemScope: true,
                        itemType: 'http://schema.org/blogPost'
                    },
                    thumb ? _react2.default.createElement(
                        'div',
                        { className: 'articles__content-block articles__content-block--img' },
                        _react2.default.createElement(
                            _reactRouter.Link,
                            { className: 'articles__link', to: post_url },
                            thumb
                        )
                    ) : null,
                    _react2.default.createElement(
                        'div',
                        { className: 'articles__content-block articles__content-block--text' },
                        content_title,
                        content_body,
                        this.props.blogmode ? null : summary_footer
                    ),
                    this.props.blogmode ? summary_footer : null
                )
            );
        }
    }]);
    return PostSummary;
}(_react2.default.Component), _class.propTypes = {
    post: _propTypes2.default.string.isRequired,
    pending_payout: _propTypes2.default.string.isRequired,
    total_payout: _propTypes2.default.string.isRequired,
    content: _propTypes2.default.object.isRequired,
    thumbSize: _propTypes2.default.string,
    nsfwPref: _propTypes2.default.string
}, _temp);
exports.default = (0, _reactRedux.connect)(function (state, props) {
    var post = props.post;

    var content = state.global.get('content').get(post);
    var pending_payout = 0;
    var total_payout = 0;
    if (content) {
        pending_payout = content.get('pending_payout_value');
        total_payout = content.get('total_payout_value');
    }
    return {
        post: post,
        content: content,
        pending_payout: pending_payout ? pending_payout.toString() : pending_payout,
        total_payout: total_payout ? total_payout.toString() : total_payout,
        username: state.user.getIn(['current', 'username']) || state.offchain.get('account'),
        blogmode: state.app.getIn(['user_preferences', 'blogmode'])
    };
}, function (dispatch) {
    return {
        dispatchSubmit: function dispatchSubmit(data) {
            dispatch(userActions.usernamePasswordLogin((0, _extends3.default)({}, data)));
        },
        clearError: function clearError() {
            dispatch(userActions.loginError({ error: null }));
        }
    };
})(PostSummary);
//# sourceMappingURL=PostSummary.js.map