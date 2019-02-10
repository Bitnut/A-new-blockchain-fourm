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

var _class, _temp;

exports.sortComments = sortComments;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Author = require('app/components/elements/Author');

var _Author2 = _interopRequireDefault(_Author);

var _ReplyEditor = require('app/components/elements/ReplyEditor');

var _ReplyEditor2 = _interopRequireDefault(_ReplyEditor);

var _MarkdownViewer = require('app/components/cards/MarkdownViewer');

var _MarkdownViewer2 = _interopRequireDefault(_MarkdownViewer);

var _shouldComponentUpdate = require('app/utils/shouldComponentUpdate');

var _shouldComponentUpdate2 = _interopRequireDefault(_shouldComponentUpdate);

var _Voting = require('app/components/elements/Voting');

var _Voting2 = _interopRequireDefault(_Voting);

var _reactRedux = require('react-redux');

var _reactRouter = require('react-router');

var _UserReducer = require('app/redux/UserReducer');

var userActions = _interopRequireWildcard(_UserReducer);

var _TimeAgoWrapper = require('app/components/elements/TimeAgoWrapper');

var _TimeAgoWrapper2 = _interopRequireDefault(_TimeAgoWrapper);

var _Userpic = require('app/components/elements/Userpic');

var _Userpic2 = _interopRequireDefault(_Userpic);

var _TransactionReducer = require('app/redux/TransactionReducer');

var transactionActions = _interopRequireWildcard(_TransactionReducer);

var _counterpart = require('counterpart');

var _counterpart2 = _interopRequireDefault(_counterpart);

var _ParsersAndFormatters = require('app/utils/ParsersAndFormatters');

var _bytebuffer = require('bytebuffer');

var _ImageUserBlockList = require('app/utils/ImageUserBlockList');

var _ImageUserBlockList2 = _interopRequireDefault(_ImageUserBlockList);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// returns true if the comment has a 'hide' flag AND has no descendants w/ positive payout
function hideSubtree(cont, c) {
    return cont.getIn([c, 'stats', 'hide']) && !hasPositivePayout(cont, c);
}

function hasPositivePayout(cont, c) {
    var post = cont.get(c);
    if (post.getIn(['stats', 'hasPendingPayout'])) {
        return true;
    }
    if (post.get('replies').find(function (reply) {
        return hasPositivePayout(cont, reply);
    })) {
        return true;
    }
    return false;
}

function sortComments(cont, comments, sort_order) {
    function netNegative(a) {
        return a.get('net_rshares') < 0;
    }
    function totalPayout(a) {
        return (0, _ParsersAndFormatters.parsePayoutAmount)(a.get('pending_payout_value')) + (0, _ParsersAndFormatters.parsePayoutAmount)(a.get('total_payout_value')) + (0, _ParsersAndFormatters.parsePayoutAmount)(a.get('curator_payout_value'));
    }
    function netRshares(a) {
        return _bytebuffer.Long.fromString(String(a.get('net_rshares')));
    }
    function countUpvotes(a) {
        return a.get('active_votes').filter(function (vote) {
            return vote.get('percent') > 0;
        }).size;
    }
    function authorReputation(a) {
        return a.get('author_reputation');
    }

    /** sorts replies by upvotes, age, or payout */
    var sort_orders = {
        votes: function votes(a, b) {
            var aactive = countUpvotes(cont.get(a));
            var bactive = countUpvotes(cont.get(b));
            return bactive - aactive;
        },
        new: function _new(a, b) {
            var acontent = cont.get(a);
            var bcontent = cont.get(b);
            if (netNegative(acontent)) {
                return 1;
            } else if (netNegative(bcontent)) {
                return -1;
            }
            var aactive = Date.parse(acontent.get('created'));
            var bactive = Date.parse(bcontent.get('created'));
            return bactive - aactive;
        },
        trending: function trending(a, b) {
            var acontent = cont.get(a);
            var bcontent = cont.get(b);
            if (netNegative(acontent)) {
                return 1;
            } else if (netNegative(bcontent)) {
                return -1;
            }
            var apayout = totalPayout(acontent);
            var bpayout = totalPayout(bcontent);
            if (apayout !== bpayout) {
                return bpayout - apayout;
            }
            // If SBD payouts were equal, fall back to rshares sorting
            return netRshares(bcontent).compare(netRshares(acontent));
        },
        author_reputation: function author_reputation(a, b) {
            return authorReputation(cont.get(b)) - authorReputation(cont.get(a));
        }
    };
    comments.sort(sort_orders[sort_order]);
}

var CommentImpl = (_temp = _class = function (_React$Component) {
    (0, _inherits3.default)(CommentImpl, _React$Component);

    function CommentImpl() {
        (0, _classCallCheck3.default)(this, CommentImpl);

        var _this = (0, _possibleConstructorReturn3.default)(this, (CommentImpl.__proto__ || (0, _getPrototypeOf2.default)(CommentImpl)).call(this));

        _this.state = { collapsed: false, hide_body: false, highlight: false };
        _this.revealBody = _this.revealBody.bind(_this);
        _this.shouldComponentUpdate = (0, _shouldComponentUpdate2.default)(_this, 'Comment');
        _this.onShowReply = function () {
            var showReply = _this.state.showReply;

            _this.setState({ showReply: !showReply, showEdit: false });
            _this.saveOnShow(!showReply ? 'reply' : null);
        };
        _this.onShowEdit = function () {
            var showEdit = _this.state.showEdit;

            _this.setState({ showEdit: !showEdit, showReply: false });
            _this.saveOnShow(!showEdit ? 'edit' : null);
        };
        _this.saveOnShow = function (type) {
            if (process.env.BROWSER) {
                var cont = _this.props.cont;

                var content = cont.get(_this.props.content);
                var formId = content.get('author') + '/' + content.get('permlink');
                if (type) localStorage.setItem('showEditor-' + formId, (0, _stringify2.default)({ type: type }, null, 0));else {
                    localStorage.removeItem('showEditor-' + formId);
                    localStorage.removeItem('replyEditorData-' + formId + '-reply');
                    localStorage.removeItem('replyEditorData-' + formId + '-edit');
                }
            }
        };
        _this.saveOnShow = _this.saveOnShow.bind(_this);
        _this.onDeletePost = function () {
            var deletePost = _this.props.deletePost;

            var content = _this.props.cont.get(_this.props.content);
            deletePost(content.get('author'), content.get('permlink'));
        };
        _this.toggleCollapsed = _this.toggleCollapsed.bind(_this);
        return _this;
    }

    (0, _createClass3.default)(CommentImpl, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            this.initEditor(this.props);
            this._checkHide(this.props);
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            if (window.location.hash == this.props.anchor_link) {
                this.setState({ highlight: true }); // eslint-disable-line react/no-did-mount-set-state
            }
        }

        /**
         * - `hide` is based on author reputation, and will hide the entire post on initial render.
         * - `hide_body` is true when comment rshares OR author rep is negative.
         *    it hides the comment body (but not the header) until the "reveal comment" link is clicked.
         */

    }, {
        key: '_checkHide',
        value: function _checkHide(props) {
            var content = props.cont.get(props.content);
            if (content) {
                var hide = hideSubtree(props.cont, props.content);
                var gray = content.getIn(['stats', 'gray']);
                if (hide) {
                    var onHide = this.props.onHide;
                    // console.log('Comment --> onHide')

                    if (onHide) onHide();
                }
                this.setState({ hide: hide, hide_body: hide || gray });
            }
        }
    }, {
        key: 'toggleCollapsed',
        value: function toggleCollapsed() {
            this.setState({ collapsed: !this.state.collapsed });
        }
    }, {
        key: 'revealBody',
        value: function revealBody() {
            this.setState({ hide_body: false });
        }
    }, {
        key: 'initEditor',
        value: function initEditor(props) {
            if (this.state.PostReplyEditor) return;
            var cont = this.props.cont;

            var content = cont.get(props.content);
            if (!content) return;
            var post = content.get('author') + '/' + content.get('permlink');
            var PostReplyEditor = (0, _ReplyEditor2.default)(post + '-reply');
            var PostEditEditor = (0, _ReplyEditor2.default)(post + '-edit');
            if (process.env.BROWSER) {
                var formId = post;
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
            this.setState({ PostReplyEditor: PostReplyEditor, PostEditEditor: PostEditEditor });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var cont = this.props.cont;

            var dis = cont.get(this.props.content);

            if (!dis) {
                return _react2.default.createElement(
                    'div',
                    null,
                    (0, _counterpart2.default)('g.loading'),
                    '...'
                );
            }

            // Don't server-side render the comment if it has a certain number of newlines
            if (global['process'] !== undefined && (dis.get('body').match(/\r?\n/g) || '').length > 25) {
                return _react2.default.createElement(
                    'div',
                    null,
                    (0, _counterpart2.default)('g.loading'),
                    '...'
                );
            }

            var comment = dis.toJS();
            if (!comment.stats) {
                console.error('Comment -- missing stats object');
                comment.stats = {};
            }
            var _comment$stats = comment.stats,
                allowDelete = _comment$stats.allowDelete,
                authorRepLog10 = _comment$stats.authorRepLog10,
                gray = _comment$stats.gray;
            var author = comment.author,
                json_metadata = comment.json_metadata;
            var _props = this.props,
                username = _props.username,
                depth = _props.depth,
                anchor_link = _props.anchor_link,
                showNegativeComments = _props.showNegativeComments,
                ignore_list = _props.ignore_list,
                noImage = _props.noImage;
            var onShowReply = this.onShowReply,
                onShowEdit = this.onShowEdit,
                onDeletePost = this.onDeletePost;

            var post = comment.author + '/' + comment.permlink;
            var _state = this.state,
                PostReplyEditor = _state.PostReplyEditor,
                PostEditEditor = _state.PostEditEditor,
                showReply = _state.showReply,
                showEdit = _state.showEdit,
                hide = _state.hide,
                hide_body = _state.hide_body;

            var Editor = showReply ? PostReplyEditor : PostEditEditor;

            var rootComment = this.props.rootComment;

            if (!rootComment && depth === 1) {
                rootComment = comment.parent_author + '/' + comment.parent_permlink;
            }
            var comment_link = '/' + comment.category + '/@' + rootComment + '#@' + comment.author + '/' + comment.permlink;
            var ignore = ignore_list && ignore_list.has(comment.author);

            if (!showNegativeComments && (hide || ignore)) {
                return null;
            }

            var jsonMetadata = null;
            try {
                if (!showReply) jsonMetadata = JSON.parse(json_metadata);
            } catch (error) {}
            // console.error('Invalid json metadata string', json_metadata, 'in post', this.props.content);

            // const get_asset_value = ( asset_str ) => { return parseFloat( asset_str.split(' ')[0] ); }
            // const steem_supply = this.props.global.getIn(['props','current_supply']);

            // hide images if author is in blacklist
            var hideImages = _ImageUserBlockList2.default.includes(author);

            var _isPaidout = comment.cashout_time === '1969-12-31T23:59:59'; // TODO: audit after HF19. #1259
            var showEditOption = username === author;
            var showDeleteOption = username === author && allowDelete && !_isPaidout;
            var showReplyOption = comment.depth < 255;

            var body = null;
            var controls = null;

            if (!this.state.collapsed && !hide_body) {
                body = _react2.default.createElement(_MarkdownViewer2.default, {
                    formId: post + '-viewer',
                    text: comment.body,
                    noImage: noImage || gray,
                    hideImages: hideImages,
                    jsonMetadata: jsonMetadata
                });
                controls = _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement(_Voting2.default, { post: post }),
                    _react2.default.createElement(
                        'span',
                        { className: 'Comment__footer__controls' },
                        showReplyOption && _react2.default.createElement(
                            'a',
                            { onClick: onShowReply },
                            (0, _counterpart2.default)('g.reply')
                        ),
                        ' ',
                        showEditOption && _react2.default.createElement(
                            'a',
                            { onClick: onShowEdit },
                            (0, _counterpart2.default)('g.edit')
                        ),
                        ' ',
                        showDeleteOption && _react2.default.createElement(
                            'a',
                            { onClick: onDeletePost },
                            (0, _counterpart2.default)('g.delete')
                        )
                    )
                );
            }

            var replies = null;
            if (!this.state.collapsed && comment.children > 0) {
                if (depth > 7) {
                    var comment_permlink = '/' + comment.category + '/@' + comment.author + '/' + comment.permlink;
                    replies = _react2.default.createElement(
                        _reactRouter.Link,
                        { to: comment_permlink },
                        'Show ',
                        comment.children,
                        ' more',
                        ' ',
                        comment.children == 1 ? 'reply' : 'replies'
                    );
                } else {
                    replies = comment.replies;
                    sortComments(cont, replies, this.props.sort_order);
                    // When a comment has hidden replies and is collapsed, the reply count is off
                    //console.log("replies:", replies.length, "num_visible:", replies.filter( reply => !cont.get(reply).getIn(['stats', 'hide'])).length)
                    replies = replies.map(function (reply, idx) {
                        return _react2.default.createElement(Comment, {
                            key: idx,
                            content: reply,
                            cont: cont,
                            sort_order: _this2.props.sort_order,
                            depth: depth + 1,
                            rootComment: rootComment,
                            showNegativeComments: showNegativeComments,
                            onHide: _this2.props.onHide
                        });
                    });
                }
            }

            var commentClasses = ['hentry'];
            commentClasses.push('Comment');
            commentClasses.push(this.props.root ? 'root' : 'reply');
            if (hide_body || this.state.collapsed) commentClasses.push('collapsed');

            var innerCommentClass = ignore || gray ? 'downvoted clearfix' : '';
            if (this.state.highlight) innerCommentClass += ' highlighted';

            //console.log(comment);
            var renderedEditor = null;
            if (showReply || showEdit) {
                renderedEditor = _react2.default.createElement(
                    'div',
                    { key: 'editor' },
                    _react2.default.createElement(Editor, (0, _extends3.default)({}, comment, {
                        type: showReply ? 'submit_comment' : 'edit',
                        successCallback: function successCallback() {
                            _this2.setState({
                                showReply: false,
                                showEdit: false
                            });
                            _this2.saveOnShow(null);
                        },
                        onCancel: function onCancel() {
                            _this2.setState({
                                showReply: false,
                                showEdit: false
                            });
                            _this2.saveOnShow(null);
                        },
                        jsonMetadata: jsonMetadata
                    }))
                );
            }

            var depth_indicator = [];
            if (depth > 1) {
                for (var i = 1; i < depth; ++i) {
                    depth_indicator.push(_react2.default.createElement(
                        'div',
                        { key: i, className: 'depth di-' + i },
                        '\xB7'
                    ));
                }
            }

            return _react2.default.createElement(
                'div',
                {
                    className: commentClasses.join(' '),
                    id: anchor_link,
                    itemScope: true,
                    itemType: 'http://schema.org/comment'
                },
                depth_indicator,
                _react2.default.createElement(
                    'div',
                    { className: innerCommentClass },
                    _react2.default.createElement(
                        'div',
                        { className: 'Comment__Userpic show-for-medium' },
                        _react2.default.createElement(_Userpic2.default, { account: comment.author })
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'Comment__header' },
                        _react2.default.createElement(
                            'div',
                            { className: 'Comment__header_collapse' },
                            _react2.default.createElement(_Voting2.default, { post: post, flag: true }),
                            _react2.default.createElement(
                                'a',
                                {
                                    title: (0, _counterpart2.default)('g.collapse_or_expand'),
                                    onClick: this.toggleCollapsed
                                },
                                this.state.collapsed ? '[+]' : '[-]'
                            )
                        ),
                        _react2.default.createElement(
                            'span',
                            { className: 'Comment__header-user' },
                            _react2.default.createElement(
                                'div',
                                { className: 'Comment__Userpic-small' },
                                _react2.default.createElement(_Userpic2.default, { account: comment.author })
                            ),
                            _react2.default.createElement(_Author2.default, {
                                author: comment.author,
                                authorRepLog10: authorRepLog10
                            })
                        ),
                        '\xA0 \xB7 \xA0',
                        _react2.default.createElement(
                            _reactRouter.Link,
                            { to: comment_link, className: 'PlainLink' },
                            _react2.default.createElement(_TimeAgoWrapper2.default, {
                                date: comment.created,
                                className: 'updated'
                            })
                        ),
                        (this.state.collapsed || hide_body) && _react2.default.createElement(_Voting2.default, { post: post, showList: false }),
                        this.state.collapsed && comment.children > 0 && _react2.default.createElement(
                            'span',
                            { className: 'marginLeft1rem' },
                            (0, _counterpart2.default)('g.reply_count', {
                                count: comment.children
                            })
                        ),
                        !this.state.collapsed && hide_body && _react2.default.createElement(
                            'a',
                            {
                                className: 'marginLeft1rem',
                                onClick: this.revealBody
                            },
                            (0, _counterpart2.default)('g.reveal_comment')
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'Comment__body entry-content' },
                        showEdit ? renderedEditor : body
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'Comment__footer' },
                        controls
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'Comment__replies hfeed' },
                    showReply && renderedEditor,
                    replies
                )
            );
        }
    }]);
    return CommentImpl;
}(_react2.default.Component), _class.propTypes = {
    // html props
    cont: _propTypes2.default.object.isRequired,
    content: _propTypes2.default.string.isRequired,
    sort_order: _propTypes2.default.oneOf(['votes', 'new', 'trending', 'author_reputation']).isRequired,
    root: _propTypes2.default.bool,
    showNegativeComments: _propTypes2.default.bool,
    onHide: _propTypes2.default.func,
    noImage: _propTypes2.default.bool,

    // component props (for recursion)
    depth: _propTypes2.default.number,

    // redux props
    username: _propTypes2.default.string,
    rootComment: _propTypes2.default.string,
    anchor_link: _propTypes2.default.string.isRequired,
    deletePost: _propTypes2.default.func.isRequired
}, _class.defaultProps = {
    depth: 1
}, _temp);


var Comment = (0, _reactRedux.connect)(
// mapStateToProps
function (state, ownProps) {
    var content = ownProps.content;


    var username = state.user.getIn(['current', 'username']);
    var ignore_list = username ? state.global.getIn(['follow', 'getFollowingAsync', username, 'ignore_result']) : null;

    return (0, _extends3.default)({}, ownProps, {
        anchor_link: '#@' + content, // Using a hash here is not standard but intentional; see issue #124 for details
        username: username,
        ignore_list: ignore_list
    });
},

// mapDispatchToProps
function (dispatch) {
    return {
        unlock: function unlock() {
            dispatch(userActions.showLogin());
        },
        deletePost: function deletePost(author, permlink) {
            dispatch(transactionActions.broadcastOperation({
                type: 'delete_comment',
                operation: { author: author, permlink: permlink },
                confirm: (0, _counterpart2.default)('g.are_you_sure')
            }));
        }
    };
})(CommentImpl);
exports.default = Comment;
//# sourceMappingURL=Comment.js.map