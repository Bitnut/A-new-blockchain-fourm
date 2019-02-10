'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

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

var _TransactionReducer = require('app/redux/TransactionReducer');

var transactionActions = _interopRequireWildcard(_TransactionReducer);

var _GlobalReducer = require('app/redux/GlobalReducer');

var globalActions = _interopRequireWildcard(_GlobalReducer);

var _Voting = require('app/components/elements/Voting');

var _Voting2 = _interopRequireDefault(_Voting);

var _Reblog = require('app/components/elements/Reblog');

var _Reblog2 = _interopRequireDefault(_Reblog);

var _MarkdownViewer = require('app/components/cards/MarkdownViewer');

var _MarkdownViewer2 = _interopRequireDefault(_MarkdownViewer);

var _ReplyEditor = require('app/components/elements/ReplyEditor');

var _ReplyEditor2 = _interopRequireDefault(_ReplyEditor);

var _Accessors = require('app/utils/Accessors');

var _ExtractContent = require('app/utils/ExtractContent');

var _ExtractContent2 = _interopRequireDefault(_ExtractContent);

var _TagList = require('app/components/elements/TagList');

var _TagList2 = _interopRequireDefault(_TagList);

var _Author = require('app/components/elements/Author');

var _Author2 = _interopRequireDefault(_Author);

var _ParsersAndFormatters = require('app/utils/ParsersAndFormatters');

var _DMCAList = require('app/utils/DMCAList');

var _DMCAList2 = _interopRequireDefault(_DMCAList);

var _PageViewsCounter = require('app/components/elements/PageViewsCounter');

var _PageViewsCounter2 = _interopRequireDefault(_PageViewsCounter);

var _ShareMenu = require('app/components/elements/ShareMenu');

var _ShareMenu2 = _interopRequireDefault(_ShareMenu);

var _ServerApiClient = require('app/utils/ServerApiClient');

var _Userpic = require('app/components/elements/Userpic');

var _Userpic2 = _interopRequireDefault(_Userpic);

var _client_config = require('app/client_config');

var _counterpart = require('counterpart');

var _counterpart2 = _interopRequireDefault(_counterpart);

var _userIllegalContent = require('app/utils/userIllegalContent');

var _userIllegalContent2 = _interopRequireDefault(_userIllegalContent);

var _ImageUserBlockList = require('app/utils/ImageUserBlockList');

var _ImageUserBlockList2 = _interopRequireDefault(_ImageUserBlockList);

var _LoadingIndicator = require('app/components/elements/LoadingIndicator');

var _LoadingIndicator2 = _interopRequireDefault(_LoadingIndicator);

var _GoogleAd = require('app/components/elements/GoogleAd');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function TimeAuthorCategory(_ref) {
    var content = _ref.content,
        authorRepLog10 = _ref.authorRepLog10,
        showTags = _ref.showTags;

    return _react2.default.createElement(
        'span',
        { className: 'PostFull__time_author_category vcard' },
        _react2.default.createElement(_Icon2.default, { name: 'clock', className: 'space-right' }),
        _react2.default.createElement(_TimeAgoWrapper2.default, { date: content.created, className: 'updated' }),
        ' ',
        (0, _counterpart2.default)('g.by'),
        ' ',
        _react2.default.createElement(_Author2.default, { author: content.author, authorRepLog10: authorRepLog10 }),
        showTags && _react2.default.createElement(
            'span',
            null,
            ' ',
            (0, _counterpart2.default)('g.in'),
            ' ',
            _react2.default.createElement(_TagList2.default, { post: content, single: true })
        )
    );
}

function TimeAuthorCategoryLarge(_ref2) {
    var content = _ref2.content,
        authorRepLog10 = _ref2.authorRepLog10;

    return _react2.default.createElement(
        'span',
        { className: 'PostFull__time_author_category_large vcard' },
        _react2.default.createElement(_Userpic2.default, { account: content.author }),
        _react2.default.createElement(
            'div',
            { className: 'right-side' },
            _react2.default.createElement(_Author2.default, {
                author: content.author,
                authorRepLog10: authorRepLog10
            }),
            _react2.default.createElement(
                'span',
                null,
                ' ',
                (0, _counterpart2.default)('g.in'),
                ' ',
                _react2.default.createElement(_TagList2.default, { post: content, single: true })
            ),
            ' ',
            '\u2022\xA0',
            ' ',
            _react2.default.createElement(_TimeAgoWrapper2.default, { date: content.created, className: 'updated' })
        )
    );
}

var PostFull = (_temp = _class = function (_React$Component) {
    (0, _inherits3.default)(PostFull, _React$Component);

    function PostFull() {
        (0, _classCallCheck3.default)(this, PostFull);

        var _this = (0, _possibleConstructorReturn3.default)(this, (PostFull.__proto__ || (0, _getPrototypeOf2.default)(PostFull)).call(this));

        _this.showPromotePost = function () {
            var post_content = _this.props.cont.get(_this.props.post);
            if (!post_content) return;
            var author = post_content.get('author');
            var permlink = post_content.get('permlink');
            _this.props.showPromotePost(author, permlink);
        };

        _this.showExplorePost = function () {
            var permlink = _this.share_params.link;
            _this.props.showExplorePost(permlink);
        };

        _this.state = {};
        _this.fbShare = _this.fbShare.bind(_this);
        _this.twitterShare = _this.twitterShare.bind(_this);
        _this.redditShare = _this.redditShare.bind(_this);
        _this.linkedInShare = _this.linkedInShare.bind(_this);
        _this.showExplorePost = _this.showExplorePost.bind(_this);
        _this.onShowReply = function () {
            var _this$state = _this.state,
                showReply = _this$state.showReply,
                formId = _this$state.formId;

            _this.setState({ showReply: !showReply, showEdit: false });
            saveOnShow(formId, !showReply ? 'reply' : null);
        };
        _this.onShowEdit = function () {
            var _this$state2 = _this.state,
                showEdit = _this$state2.showEdit,
                formId = _this$state2.formId;

            _this.setState({ showEdit: !showEdit, showReply: false });
            saveOnShow(formId, !showEdit ? 'edit' : null);
        };
        _this.onDeletePost = function () {
            var deletePost = _this.props.deletePost;

            var content = _this.props.cont.get(_this.props.post);
            deletePost(content.get('author'), content.get('permlink'));
        };
        return _this;
    }

    (0, _createClass3.default)(PostFull, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            var post = this.props.post;

            var formId = 'postFull-' + post;
            this.setState({
                formId: formId,
                PostFullReplyEditor: (0, _ReplyEditor2.default)(formId + '-reply'),
                PostFullEditEditor: (0, _ReplyEditor2.default)(formId + '-edit')
            });
            if (process.env.BROWSER) {
                var showEditor = localStorage.getItem('showEditor-' + formId);
                if (showEditor) {
                    showEditor = JSON.parse(showEditor);
                    if (showEditor.type === 'reply') {
                        this.setState({ showReply: true });
                    }
                    if (showEditor.type === 'edit') {
                        this.setState({ showEdit: true });
                    }
                }
            }
        }
    }, {
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps, nextState) {
            var _this2 = this;

            var names = 'cont, post, username'.split(', ');
            return names.findIndex(function (name) {
                return _this2.props[name] !== nextProps[name];
            }) !== -1 || this.state !== nextState;
        }
    }, {
        key: 'fbShare',
        value: function fbShare(e) {
            var href = this.share_params.url;
            e.preventDefault();
            window.open('https://www.facebook.com/sharer/sharer.php?u=' + href, 'fbshare', 'width=600, height=400, scrollbars=no');
            (0, _ServerApiClient.serverApiRecordEvent)('FbShare', this.share_params.link);
        }
    }, {
        key: 'twitterShare',
        value: function twitterShare(e) {
            (0, _ServerApiClient.serverApiRecordEvent)('TwitterShare', this.share_params.link);
            e.preventDefault();
            var winWidth = 640;
            var winHeight = 320;
            var winTop = screen.height / 2 - winWidth / 2;
            var winLeft = screen.width / 2 - winHeight / 2;
            var s = this.share_params;
            var q = 'text=' + encodeURIComponent(s.title) + '&url=' + encodeURIComponent(s.url);
            window.open('http://twitter.com/share?' + q, 'Share', 'top=' + winTop + ',left=' + winLeft + ',toolbar=0,status=0,width=' + winWidth + ',height=' + winHeight);
        }
    }, {
        key: 'redditShare',
        value: function redditShare(e) {
            (0, _ServerApiClient.serverApiRecordEvent)('RedditShare', this.share_params.link);
            e.preventDefault();
            var s = this.share_params;
            var q = 'title=' + encodeURIComponent(s.title) + '&url=' + encodeURIComponent(s.url);
            window.open('https://www.reddit.com/submit?' + q, 'Share');
        }
    }, {
        key: 'linkedInShare',
        value: function linkedInShare(e) {
            (0, _ServerApiClient.serverApiRecordEvent)('LinkedInShare', this.share_params.link);
            e.preventDefault();
            var winWidth = 720;
            var winHeight = 480;
            var winTop = screen.height / 2 - winWidth / 2;
            var winLeft = screen.width / 2 - winHeight / 2;
            var s = this.share_params;
            var q = 'title=' + encodeURIComponent(s.title) + '&url=' + encodeURIComponent(s.url) + '&source=Steemit&mini=true';
            window.open('https://www.linkedin.com/shareArticle?' + q, 'Share', 'top=' + winTop + ',left=' + winLeft + ',toolbar=0,status=0,width=' + winWidth + ',height=' + winHeight);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var _props = this.props,
                username = _props.username,
                post = _props.post,
                _state = this.state,
                PostFullReplyEditor = _state.PostFullReplyEditor,
                PostFullEditEditor = _state.PostFullEditEditor,
                formId = _state.formId,
                showReply = _state.showReply,
                showEdit = _state.showEdit,
                onShowReply = this.onShowReply,
                onShowEdit = this.onShowEdit,
                onDeletePost = this.onDeletePost;

            var post_content = this.props.cont.get(this.props.post);
            if (!post_content) return null;
            var p = (0, _ExtractContent2.default)(_Accessors.immutableAccessor, post_content);
            var content = post_content.toJS();
            var author = content.author,
                permlink = content.permlink,
                parent_author = content.parent_author,
                parent_permlink = content.parent_permlink;

            var jsonMetadata = this.state.showReply ? null : p.json_metadata;
            // let author_link = '/@' + content.author;
            var link = '/@' + content.author + '/' + content.permlink;
            if (content.category) link = '/' + content.category + link;

            var category = content.category,
                title = content.title,
                body = content.body;

            if (process.env.BROWSER && title) document.title = title + ' — ' + _client_config.APP_NAME;

            var content_body = content.body;
            var url = '/' + category + '/@' + author + '/' + permlink;
            var bDMCAStop = _DMCAList2.default.includes(url);
            var bIllegalContentUser = _userIllegalContent2.default.includes(content.author);
            if (bDMCAStop) {
                content_body = (0, _counterpart2.default)('postfull_jsx.this_post_is_not_available_due_to_a_copyright_claim');
            }
            // detect illegal users
            if (bIllegalContentUser) {
                content_body = 'Not available for legal reasons.';
            }

            var bShowLoading = !bIllegalContentUser && !bDMCAStop && content.body.length < content.body_length;

            // hide images if user is on blacklist
            var hideImages = _ImageUserBlockList2.default.includes(content.author);

            var replyParams = {
                author: author,
                permlink: permlink,
                parent_author: parent_author,
                parent_permlink: parent_permlink,
                category: category,
                title: title,
                body: body
            };

            this.share_params = {
                link: link,
                url: 'https://' + _client_config.APP_DOMAIN + link,
                title: title + ' — ' + _client_config.APP_NAME,
                desc: p.desc
            };

            var share_menu = [{
                link: '#',
                onClick: this.fbShare,
                value: 'Facebook',
                title: (0, _counterpart2.default)('postfull_jsx.share_on_facebook'),
                icon: 'facebook'
            }, {
                link: '#',
                onClick: this.twitterShare,
                value: 'Twitter',
                title: (0, _counterpart2.default)('postfull_jsx.share_on_twitter'),
                icon: 'twitter'
            }, {
                link: '#',
                onClick: this.redditShare,
                value: 'Reddit',
                title: (0, _counterpart2.default)('postfull_jsx.share_on_reddit'),
                icon: 'reddit'
            }, {
                link: '#',
                onClick: this.linkedInShare,
                value: 'LinkedIn',
                title: (0, _counterpart2.default)('postfull_jsx.share_on_linkedin'),
                icon: 'linkedin'
            }];

            var Editor = this.state.showReply ? PostFullReplyEditor : PostFullEditEditor;
            var renderedEditor = null;
            if (showReply || showEdit) {
                renderedEditor = _react2.default.createElement(
                    'div',
                    { key: 'editor' },
                    _react2.default.createElement(Editor, (0, _extends3.default)({}, replyParams, {
                        type: this.state.showReply ? 'submit_comment' : 'edit',
                        successCallback: function successCallback() {
                            _this3.setState({
                                showReply: false,
                                showEdit: false
                            });
                            saveOnShow(formId, null);
                        },
                        onCancel: function onCancel() {
                            _this3.setState({
                                showReply: false,
                                showEdit: false
                            });
                            saveOnShow(formId, null);
                        },
                        jsonMetadata: jsonMetadata
                    }))
                );
            }
            var pending_payout = (0, _ParsersAndFormatters.parsePayoutAmount)(content.pending_payout_value);
            var total_payout = (0, _ParsersAndFormatters.parsePayoutAmount)(content.total_payout_value);
            var high_quality_post = pending_payout + total_payout > 10.0;
            var full_power = post_content.get('percent_steem_dollars') === 0;

            var post_header = _react2.default.createElement(
                'h1',
                { className: 'entry-title' },
                content.title,
                full_power && _react2.default.createElement(
                    'span',
                    { title: (0, _counterpart2.default)('g.powered_up_100') },
                    _react2.default.createElement(_Icon2.default, { name: 'steempower' })
                )
            );
            if (content.depth > 0) {
                var parent_link = '/' + content.category + '/@' + content.parent_author + '/' + content.parent_permlink;
                var direct_parent_link = void 0;
                if (content.depth > 1) {
                    direct_parent_link = _react2.default.createElement(
                        'li',
                        null,
                        _react2.default.createElement(
                            _reactRouter.Link,
                            { to: parent_link },
                            (0, _counterpart2.default)('postfull_jsx.view_the_direct_parent')
                        )
                    );
                }
                post_header = _react2.default.createElement(
                    'div',
                    { className: 'callout' },
                    _react2.default.createElement(
                        'h3',
                        { className: 'entry-title' },
                        (0, _counterpart2.default)('g.re'),
                        ': ',
                        content.root_title
                    ),
                    _react2.default.createElement(
                        'h5',
                        null,
                        (0, _counterpart2.default)('postfull_jsx.you_are_viewing_a_single_comments_thread_from'),
                        ':'
                    ),
                    _react2.default.createElement(
                        'p',
                        null,
                        content.root_title
                    ),
                    _react2.default.createElement(
                        'ul',
                        null,
                        _react2.default.createElement(
                            'li',
                            null,
                            _react2.default.createElement(
                                _reactRouter.Link,
                                { to: content.url },
                                (0, _counterpart2.default)('postfull_jsx.view_the_full_context')
                            )
                        ),
                        direct_parent_link
                    )
                );
            }

            var _isPaidout = post_content.get('cashout_time') === '1969-12-31T23:59:59'; // TODO: audit after HF19. #1259
            var showReblog = !_isPaidout;
            var showPromote = username && !_isPaidout && post_content.get('depth') == 0;
            var showReplyOption = post_content.get('depth') < 255;
            var showEditOption = username === author;
            var showDeleteOption = username === author && content.stats.allowDelete && !_isPaidout;

            var authorRepLog10 = (0, _ParsersAndFormatters.repLog10)(content.author_reputation);
            var isPreViewCount = Date.parse(post_content.get('created')) < 1480723200000; // check if post was created before view-count tracking began (2016-12-03)
            var contentBody = void 0;

            if (bShowLoading) {
                contentBody = _react2.default.createElement(_LoadingIndicator2.default, { type: 'circle-strong' });
            } else {
                contentBody = _react2.default.createElement(_MarkdownViewer2.default, {
                    formId: formId + '-viewer',
                    text: content_body,
                    jsonMetadata: jsonMetadata,
                    large: true,
                    highQualityPost: high_quality_post,
                    noImage: content.stats.gray,
                    hideImages: hideImages
                });
            }

            return _react2.default.createElement(
                'article',
                {
                    className: 'PostFull hentry',
                    itemScope: true,
                    itemType: 'http://schema.org/Blog'
                },
                showEdit ? renderedEditor : _react2.default.createElement(
                    'span',
                    null,
                    _react2.default.createElement(
                        'div',
                        { className: 'float-right' },
                        _react2.default.createElement(_Voting2.default, { post: post, flag: true })
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'PostFull__header' },
                        post_header,
                        _react2.default.createElement(TimeAuthorCategoryLarge, {
                            content: content,
                            authorRepLog10: authorRepLog10
                        })
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'PostFull__body entry-content' },
                        contentBody
                    )
                ),
                showPromote && _react2.default.createElement(
                    'button',
                    {
                        className: 'Promote__button float-right button hollow tiny',
                        onClick: this.showPromotePost
                    },
                    (0, _counterpart2.default)('g.promote')
                ),
                _react2.default.createElement(_TagList2.default, { post: content, horizontal: true }),
                _react2.default.createElement(
                    'div',
                    { className: 'PostFull__footer row' },
                    _react2.default.createElement(
                        'div',
                        { className: 'columns medium-12 large-5' },
                        _react2.default.createElement(TimeAuthorCategory, {
                            content: content,
                            authorRepLog10: authorRepLog10
                        })
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'columns medium-12 large-2 ' },
                        _react2.default.createElement(_Voting2.default, { post: post })
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'RightShare__Menu small-11 medium-12 large-5 columns' },
                        showReblog && _react2.default.createElement(_Reblog2.default, { author: author, permlink: permlink }),
                        _react2.default.createElement(
                            'span',
                            { className: 'PostFull__reply' },
                            showReplyOption && _react2.default.createElement(
                                'a',
                                { onClick: onShowReply },
                                (0, _counterpart2.default)('g.reply')
                            ),
                            ' ',
                            showEditOption && !showEdit && _react2.default.createElement(
                                'a',
                                { onClick: onShowEdit },
                                (0, _counterpart2.default)('g.edit')
                            ),
                            ' ',
                            showDeleteOption && !showReply && _react2.default.createElement(
                                'a',
                                { onClick: onDeletePost },
                                (0, _counterpart2.default)('g.delete')
                            )
                        ),
                        _react2.default.createElement(
                            'span',
                            { className: 'PostFull__responses' },
                            _react2.default.createElement(
                                _reactRouter.Link,
                                {
                                    to: link,
                                    title: (0, _counterpart2.default)('g.responses', {
                                        count: content.children
                                    })
                                },
                                _react2.default.createElement(_Icon2.default, {
                                    name: 'chatboxes',
                                    className: 'space-right'
                                }),
                                content.children
                            )
                        ),
                        _react2.default.createElement(
                            'span',
                            { className: 'PostFull__views' },
                            _react2.default.createElement(_PageViewsCounter2.default, {
                                hidden: false,
                                sinceDate: isPreViewCount ? 'Dec 2016' : null
                            })
                        ),
                        _react2.default.createElement(_ShareMenu2.default, { menu: share_menu }),
                        _react2.default.createElement(
                            'button',
                            {
                                className: 'explore-post',
                                title: (0, _counterpart2.default)('g.share_this_post'),
                                onClick: this.showExplorePost
                            },
                            _react2.default.createElement(_Icon2.default, { name: 'link', className: 'chain-right' })
                        )
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                        'div',
                        { className: 'column large-8 medium-10 small-12' },
                        showReply && renderedEditor
                    )
                )
            );
        }
    }]);
    return PostFull;
}(_react2.default.Component), _class.propTypes = {
    // html props
    /* Show extra options (component is being viewed alone) */
    cont: _propTypes2.default.object.isRequired,
    post: _propTypes2.default.string.isRequired,

    // connector props
    username: _propTypes2.default.string,
    unlock: _propTypes2.default.func.isRequired,
    deletePost: _propTypes2.default.func.isRequired,
    showPromotePost: _propTypes2.default.func.isRequired,
    showExplorePost: _propTypes2.default.func.isRequired
}, _temp);
exports.default = (0, _reactRedux.connect)(
// mapStateToProps
function (state, ownProps) {
    return (0, _extends3.default)({}, ownProps, {
        username: state.user.getIn(['current', 'username'])
    });
},

// mapDispatchToProps
function (dispatch) {
    return {
        dispatchSubmit: function dispatchSubmit(data) {
            dispatch(userActions.usernamePasswordLogin((0, _extends3.default)({}, data)));
        },
        clearError: function clearError() {
            dispatch(userActions.loginError({ error: null }));
        },
        unlock: function unlock() {
            dispatch(userActions.showLogin());
        },
        deletePost: function deletePost(author, permlink) {
            dispatch(transactionActions.broadcastOperation({
                type: 'delete_comment',
                operation: { author: author, permlink: permlink },
                confirm: (0, _counterpart2.default)('g.are_you_sure')
            }));
        },
        showPromotePost: function showPromotePost(author, permlink) {
            dispatch(globalActions.showDialog({
                name: 'promotePost',
                params: { author: author, permlink: permlink }
            }));
        },
        showExplorePost: function showExplorePost(permlink) {
            dispatch(globalActions.showDialog({
                name: 'explorePost',
                params: { permlink: permlink }
            }));
        }
    };
})(PostFull);


var saveOnShow = function saveOnShow(formId, type) {
    if (process.env.BROWSER) {
        if (type) localStorage.setItem('showEditor-' + formId, (0, _stringify2.default)({ type: type }, null, 0));else {
            // console.log('del formId', formId)
            localStorage.removeItem('showEditor-' + formId);
            localStorage.removeItem('replyEditorData-' + formId + '-reply');
            localStorage.removeItem('replyEditorData-' + formId + '-edit');
        }
    }
};
//# sourceMappingURL=PostFull.js.map