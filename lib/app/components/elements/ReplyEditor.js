'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

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

var _ReactForm = require('app/utils/ReactForm');

var _ReactForm2 = _interopRequireDefault(_ReactForm);

var _TransactionReducer = require('app/redux/TransactionReducer');

var transactionActions = _interopRequireWildcard(_TransactionReducer);

var _UserReducer = require('app/redux/UserReducer');

var userActions = _interopRequireWildcard(_UserReducer);

var _MarkdownViewer = require('app/components/cards/MarkdownViewer');

var _MarkdownViewer2 = _interopRequireDefault(_MarkdownViewer);

var _CategorySelector = require('app/components/cards/CategorySelector');

var _CategorySelector2 = _interopRequireDefault(_CategorySelector);

var _LoadingIndicator = require('app/components/elements/LoadingIndicator');

var _LoadingIndicator2 = _interopRequireDefault(_LoadingIndicator);

var _shouldComponentUpdate = require('app/utils/shouldComponentUpdate');

var _shouldComponentUpdate2 = _interopRequireDefault(_shouldComponentUpdate);

var _Tooltip = require('app/components/elements/Tooltip');

var _Tooltip2 = _interopRequireDefault(_Tooltip);

var _SanitizeConfig = require('app/utils/SanitizeConfig');

var _SanitizeConfig2 = _interopRequireDefault(_SanitizeConfig);

var _sanitizeHtml = require('sanitize-html');

var _sanitizeHtml2 = _interopRequireDefault(_sanitizeHtml);

var _HtmlReady = require('shared/HtmlReady');

var _HtmlReady2 = _interopRequireDefault(_HtmlReady);

var _GlobalReducer = require('app/redux/GlobalReducer');

var globalActions = _interopRequireWildcard(_GlobalReducer);

var _immutable = require('immutable');

var _remarkable = require('remarkable');

var _remarkable2 = _interopRequireDefault(_remarkable);

var _reactDropzone = require('react-dropzone');

var _reactDropzone2 = _interopRequireDefault(_reactDropzone);

var _counterpart = require('counterpart');

var _counterpart2 = _interopRequireDefault(_counterpart);

var _reactRedux = require('react-redux');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var remarkable = new _remarkable2.default({ html: true, linkify: false, breaks: true });

var RTE_DEFAULT = false;

var ReplyEditor = (_temp = _class = function (_React$Component) {
    (0, _inherits3.default)(ReplyEditor, _React$Component);

    function ReplyEditor(props) {
        (0, _classCallCheck3.default)(this, ReplyEditor);

        var _this = (0, _possibleConstructorReturn3.default)(this, (ReplyEditor.__proto__ || (0, _getPrototypeOf2.default)(ReplyEditor)).call(this));

        _this.shouldComponentUpdate = (0, _shouldComponentUpdate2.default)(_this, 'ReplyEditor');

        _this.onTitleChange = function (e) {
            var value = e.target.value;
            // TODO block links in title (they do not make good permlinks)
            var hasMarkdown = /(?:\*[\w\s]*\*|\#[\w\s]*\#|_[\w\s]*_|~[\w\s]*~|\]\s*\(|\]\s*\[)/.test(value);
            _this.setState({
                titleWarn: hasMarkdown ? (0, _counterpart2.default)('reply_editor.markdown_not_supported') : ''
            });
            var title = _this.state.title;

            title.props.onChange(e);
        };

        _this.onCancel = function (e) {
            if (e) e.preventDefault();
            var _this$props = _this.props,
                formId = _this$props.formId,
                onCancel = _this$props.onCancel,
                defaultPayoutType = _this$props.defaultPayoutType;
            var _this$state = _this.state,
                replyForm = _this$state.replyForm,
                body = _this$state.body;

            if (!body.value || confirm((0, _counterpart2.default)('reply_editor.are_you_sure_you_want_to_clear_this_form'))) {
                replyForm.resetForm();
                _this.setState({
                    rte_value: stateFromHtml(_this.props.richTextEditor)
                });
                _this.setState({ progress: {} });
                _this.props.setPayoutType(formId, defaultPayoutType);
                if (onCancel) onCancel(e);
            }
        };

        _this.onChange = function (rte_value) {
            _this.setState({ rte_value: rte_value });
            var html = stateToHtml(rte_value);
            var body = _this.state.body;

            if (body.value !== html) body.props.onChange(html);
        };

        _this.toggleRte = function (e) {
            e.preventDefault();
            var state = { rte: !_this.state.rte };
            if (state.rte) {
                var body = _this.state.body;

                state.rte_value = isHtmlTest(body.value) ? stateFromHtml(_this.props.richTextEditor, body.value) : stateFromMarkdown(_this.props.richTextEditor, body.value);
            }
            _this.setState(state);
            localStorage.setItem('replyEditorData-rte', !_this.state.rte);
        };

        _this.showAdvancedSettings = function (e) {
            e.preventDefault();
            _this.props.setPayoutType(_this.props.formId, _this.props.payoutType);
            _this.props.showAdvancedSettings(_this.props.formId);
        };

        _this.onDrop = function (acceptedFiles, rejectedFiles) {
            if (!acceptedFiles.length) {
                if (rejectedFiles.length) {
                    _this.setState({
                        progress: { error: 'Please insert only image files.' }
                    });
                    console.log('onDrop Rejected files: ', rejectedFiles);
                }
                return;
            }
            var file = acceptedFiles[0];
            _this.upload(file, file.name);
        };

        _this.onOpenClick = function () {
            _this.dropzone.open();
        };

        _this.onPasteCapture = function (e) {
            try {
                if (e.clipboardData) {
                    var _iteratorNormalCompletion = true;
                    var _didIteratorError = false;
                    var _iteratorError = undefined;

                    try {
                        for (var _iterator = (0, _getIterator3.default)(e.clipboardData.items), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                            var item = _step.value;

                            if (item.kind === 'file' && /^image\//.test(item.type)) {
                                var blob = item.getAsFile();
                                _this.upload(blob);
                            }
                        }
                    } catch (err) {
                        _didIteratorError = true;
                        _iteratorError = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion && _iterator.return) {
                                _iterator.return();
                            }
                        } finally {
                            if (_didIteratorError) {
                                throw _iteratorError;
                            }
                        }
                    }
                } else {
                    // http://joelb.me/blog/2011/code-snippet-accessing-clipboard-images-with-javascript/
                    // contenteditable element that catches all pasted data
                    _this.setState({ noClipboardData: true });
                }
            } catch (error) {
                console.error('Error analyzing clipboard event', error);
            }
        };

        _this.upload = function (file) {
            var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
            var uploadImage = _this.props.uploadImage;

            _this.setState({
                progress: { message: (0, _counterpart2.default)('reply_editor.uploading') }
            });
            uploadImage(file, function (progress) {
                if (progress.url) {
                    _this.setState({ progress: {} });
                    var url = progress.url;

                    var image_md = '![' + name + '](' + url + ')';
                    var body = _this.state.body;
                    var _this$refs$postRef = _this.refs.postRef,
                        selectionStart = _this$refs$postRef.selectionStart,
                        selectionEnd = _this$refs$postRef.selectionEnd;

                    body.props.onChange(body.value.substring(0, selectionStart) + image_md + body.value.substring(selectionEnd, body.value.length));
                } else {
                    _this.setState({ progress: progress });
                }
                setTimeout(function () {
                    _this.setState({ progress: {} });
                }, 4000); // clear message
            });
        };

        _this.state = { progress: {} };
        _this.initForm(props);
        return _this;
    }

    (0, _createClass3.default)(ReplyEditor, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            var _props = this.props,
                setMetaData = _props.setMetaData,
                formId = _props.formId,
                jsonMetadata = _props.jsonMetadata;

            setMetaData(formId, jsonMetadata);

            if (process.env.BROWSER) {
                // Check for rte editor preference
                var rte = this.props.isStory && JSON.parse(localStorage.getItem('replyEditorData-rte') || RTE_DEFAULT);
                var raw = null;

                // Process initial body value (if this is an edit)
                var body = this.state.body;

                if (body.value) {
                    raw = body.value;
                }

                // Check for draft data
                var draft = localStorage.getItem('replyEditorData-' + formId);
                if (draft) {
                    draft = JSON.parse(draft);
                    var _state = this.state,
                        category = _state.category,
                        title = _state.title;

                    if (category) category.props.onChange(draft.category);
                    if (title) title.props.onChange(draft.title);
                    if (draft.payoutType) this.props.setPayoutType(formId, draft.payoutType);
                    raw = draft.body;
                }

                // If we have an initial body, check if it's html or markdown
                if (raw) {
                    rte = isHtmlTest(raw);
                }

                // console.log("initial reply body:", raw || '(empty)')
                body.props.onChange(raw);
                this.setState({
                    rte: rte,
                    rte_value: rte ? stateFromHtml(this.props.richTextEditor, raw) : null
                });
            }
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            setTimeout(function () {
                if (_this2.props.isStory) _this2.refs.titleRef.focus();else if (_this2.refs.postRef) _this2.refs.postRef.focus();else if (_this2.refs.rte) _this2.refs.rte._focus();
            }, 300);
        }
    }, {
        key: 'componentWillUpdate',
        value: function componentWillUpdate(nextProps, nextState) {
            var _this3 = this;

            if (process.env.BROWSER) {
                var ts = this.state;
                var ns = nextState;
                var tp = this.props;
                var np = nextProps;

                // Save curent draft to localStorage
                if (ts.body.value !== ns.body.value || ns.category && ts.category.value !== ns.category.value || ns.title && ts.title.value !== ns.title.value || np.payoutType !== tp.payoutType) {
                    // also prevents saving after parent deletes this information
                    var formId = np.formId,
                        payoutType = np.payoutType;
                    var category = ns.category,
                        title = ns.title,
                        body = ns.body;

                    var data = {
                        formId: formId,
                        title: title ? title.value : undefined,
                        category: category ? category.value : undefined,
                        body: body.value,
                        payoutType: payoutType
                    };

                    clearTimeout(saveEditorTimeout);
                    saveEditorTimeout = setTimeout(function () {
                        // console.log('save formId', formId, body.value)
                        localStorage.setItem('replyEditorData-' + formId, (0, _stringify2.default)(data, null, 0));
                        _this3.showDraftSaved();
                    }, 500);
                }
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            var _props2 = this.props,
                clearMetaData = _props2.clearMetaData,
                formId = _props2.formId;

            clearMetaData(formId);
        }
    }, {
        key: 'initForm',
        value: function initForm(props) {
            var isStory = props.isStory,
                type = props.type,
                fields = props.fields;

            var isEdit = type === 'edit';
            var maxKb = isStory ? 65 : 16;
            (0, _ReactForm2.default)({
                fields: fields,
                instance: this,
                name: 'replyForm',
                initialValues: props.initialValues,
                validation: function validation(values) {
                    return {
                        title: isStory && (!values.title || values.title.trim() === '' ? (0, _counterpart2.default)('g.required') : values.title.length > 255 ? (0, _counterpart2.default)('reply_editor.shorten_title') : null),
                        category: isStory && (0, _CategorySelector.validateCategory)(values.category, !isEdit),
                        body: !values.body ? (0, _counterpart2.default)('g.required') : values.body.length > maxKb * 1024 ? (0, _counterpart2.default)('reply_editor.exceeds_maximum_length', { maxKb: maxKb }) : null
                    };
                }
            });
        }

        // As rte_editor is updated, keep the (invisible) 'body' field in sync.

    }, {
        key: 'showDraftSaved',
        value: function showDraftSaved() {
            var draft = this.refs.draft;

            draft.className = 'ReplyEditor__draft';
            void draft.offsetWidth; // reset animation
            draft.className = 'ReplyEditor__draft ReplyEditor__draft-saved';
        }
    }, {
        key: 'render',
        value: function render() {
            var _this4 = this;

            var originalPost = {
                category: this.props.category,
                body: this.props.body
            };
            var onCancel = this.onCancel,
                onTitleChange = this.onTitleChange;
            var _state2 = this.state,
                title = _state2.title,
                category = _state2.category,
                body = _state2.body;
            var _props3 = this.props,
                reply = _props3.reply,
                username = _props3.username,
                isStory = _props3.isStory,
                formId = _props3.formId,
                noImage = _props3.noImage,
                author = _props3.author,
                permlink = _props3.permlink,
                parent_author = _props3.parent_author,
                parent_permlink = _props3.parent_permlink,
                type = _props3.type,
                jsonMetadata = _props3.jsonMetadata,
                state = _props3.state,
                successCallback = _props3.successCallback,
                defaultPayoutType = _props3.defaultPayoutType,
                payoutType = _props3.payoutType;
            var _state$replyForm = this.state.replyForm,
                submitting = _state$replyForm.submitting,
                valid = _state$replyForm.valid,
                handleSubmit = _state$replyForm.handleSubmit;
            var _state3 = this.state,
                postError = _state3.postError,
                titleWarn = _state3.titleWarn,
                rte = _state3.rte;
            var _state4 = this.state,
                progress = _state4.progress,
                noClipboardData = _state4.noClipboardData;

            var disabled = submitting || !valid;
            var loading = submitting || this.state.loading;

            var errorCallback = function errorCallback(estr) {
                _this4.setState({ postError: estr, loading: false });
            };
            var successCallbackWrapper = function successCallbackWrapper() {
                for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                    args[_key] = arguments[_key];
                }

                _this4.setState({ loading: false });
                _this4.props.setPayoutType(formId, defaultPayoutType);
                if (successCallback) successCallback(args);
            };
            var isEdit = type === 'edit';
            var isHtml = rte || isHtmlTest(body.value);
            var replyParams = {
                author: author,
                permlink: permlink,
                parent_author: parent_author,
                parent_permlink: parent_permlink,
                type: type,
                state: state,
                originalPost: originalPost,
                isHtml: isHtml,
                isStory: isStory,
                jsonMetadata: jsonMetadata,
                payoutType: payoutType,
                successCallback: successCallbackWrapper,
                errorCallback: errorCallback
            };
            var postLabel = username ? _react2.default.createElement(
                _Tooltip2.default,
                { t: (0, _counterpart2.default)('g.post_as_user', { username: username }) },
                (0, _counterpart2.default)('g.post')
            ) : (0, _counterpart2.default)('g.post');
            var hasTitleError = title && title.touched && title.error;
            var titleError = null;
            // The Required title error (triggered onBlur) can shift the form making it hard to click on things..
            if (hasTitleError && (title.error !== (0, _counterpart2.default)('g.required') || body.value !== '') || titleWarn) {
                titleError = _react2.default.createElement(
                    'div',
                    { className: hasTitleError ? 'error' : 'warning' },
                    hasTitleError ? title.error : titleWarn,
                    '\xA0'
                );
            }

            // TODO: remove all references to these vframe classes. Removed from css and no longer needed.
            var vframe_class = isStory ? 'vframe' : '';
            var vframe_section_class = isStory ? 'vframe__section' : '';
            var vframe_section_shrink_class = isStory ? 'vframe__section--shrink' : '';
            var RichTextEditor = this.props.richTextEditor;

            return _react2.default.createElement(
                'div',
                { className: 'ReplyEditor row' },
                _react2.default.createElement(
                    'div',
                    { className: 'column small-12' },
                    _react2.default.createElement(
                        'div',
                        {
                            ref: 'draft',
                            className: 'ReplyEditor__draft ReplyEditor__draft-hide'
                        },
                        (0, _counterpart2.default)('reply_editor.draft_saved')
                    ),
                    _react2.default.createElement(
                        'form',
                        {
                            className: vframe_class,
                            onSubmit: handleSubmit(function (_ref) {
                                var data = _ref.data;

                                var startLoadingIndicator = function startLoadingIndicator() {
                                    return _this4.setState({
                                        loading: true,
                                        postError: undefined
                                    });
                                };
                                reply((0, _extends3.default)({}, data, replyParams, {
                                    startLoadingIndicator: startLoadingIndicator
                                }));
                            }),
                            onChange: function onChange() {
                                _this4.setState({ postError: null });
                            }
                        },
                        _react2.default.createElement(
                            'div',
                            { className: vframe_section_shrink_class },
                            isStory && _react2.default.createElement(
                                'span',
                                null,
                                _react2.default.createElement('input', (0, _extends3.default)({
                                    type: 'text',
                                    className: 'ReplyEditor__title',
                                    onChange: onTitleChange,
                                    disabled: loading,
                                    placeholder: (0, _counterpart2.default)('reply_editor.title'),
                                    autoComplete: 'off',
                                    ref: 'titleRef',
                                    tabIndex: 1
                                }, title.props)),
                                _react2.default.createElement(
                                    'div',
                                    {
                                        className: 'float-right secondary',
                                        style: { marginRight: '1rem' }
                                    },
                                    rte && _react2.default.createElement(
                                        'a',
                                        {
                                            href: '#',
                                            onClick: this.toggleRte
                                        },
                                        body.value ? 'Raw HTML' : 'Markdown'
                                    ),
                                    !rte && (isHtml || !body.value) && _react2.default.createElement(
                                        'a',
                                        {
                                            href: '#',
                                            onClick: this.toggleRte
                                        },
                                        (0, _counterpart2.default)('reply_editor.editor')
                                    )
                                ),
                                titleError
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            {
                                className: 'ReplyEditor__body ' + (rte ? 'rte ' + vframe_section_class : vframe_section_shrink_class)
                            },
                            process.env.BROWSER && rte ? _react2.default.createElement(RichTextEditor, {
                                ref: 'rte',
                                readOnly: loading,
                                value: this.state.rte_value,
                                onChange: this.onChange,
                                onBlur: body.onBlur,
                                tabIndex: 2
                            }) : _react2.default.createElement(
                                'span',
                                null,
                                _react2.default.createElement(
                                    _reactDropzone2.default,
                                    {
                                        onDrop: this.onDrop,
                                        className: type === 'submit_story' ? 'dropzone' : 'none',
                                        disableClick: true,
                                        multiple: false,
                                        accept: 'image/*',
                                        ref: function ref(node) {
                                            _this4.dropzone = node;
                                        }
                                    },
                                    _react2.default.createElement('textarea', (0, _extends3.default)({}, body.props, {
                                        ref: 'postRef',
                                        onPasteCapture: this.onPasteCapture,
                                        className: type === 'submit_story' ? 'upload-enabled' : '',
                                        disabled: loading,
                                        rows: isStory ? 10 : 3,
                                        placeholder: isStory ? (0, _counterpart2.default)('g.write_your_story') : (0, _counterpart2.default)('g.reply'),
                                        autoComplete: 'off',
                                        tabIndex: 2
                                    }))
                                ),
                                _react2.default.createElement(
                                    'p',
                                    { className: 'drag-and-drop' },
                                    (0, _counterpart2.default)('reply_editor.insert_images_by_dragging_dropping'),
                                    noClipboardData ? '' : (0, _counterpart2.default)('reply_editor.pasting_from_the_clipboard'),
                                    (0, _counterpart2.default)('reply_editor.or_by'),
                                    ' ',
                                    _react2.default.createElement(
                                        'a',
                                        { onClick: this.onOpenClick },
                                        (0, _counterpart2.default)('reply_editor.selecting_them')
                                    ),
                                    '.'
                                ),
                                progress.message && _react2.default.createElement(
                                    'div',
                                    { className: 'info' },
                                    progress.message
                                ),
                                progress.error && _react2.default.createElement(
                                    'div',
                                    { className: 'error' },
                                    (0, _counterpart2.default)('reply_editor.image_upload'),
                                    ' :',
                                    ' ',
                                    progress.error
                                )
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: vframe_section_shrink_class },
                            _react2.default.createElement(
                                'div',
                                { className: 'error' },
                                body.touched && body.error && body.error !== 'Required' && body.error
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            {
                                className: vframe_section_shrink_class,
                                style: { marginTop: '0.5rem' }
                            },
                            isStory && _react2.default.createElement(
                                'span',
                                null,
                                _react2.default.createElement(_CategorySelector2.default, (0, _extends3.default)({}, category.props, {
                                    disabled: loading,
                                    isEdit: isEdit,
                                    tabIndex: 3
                                })),
                                _react2.default.createElement(
                                    'div',
                                    { className: 'error' },
                                    (category.touched || category.value) && category.error,
                                    '\xA0'
                                )
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: vframe_section_shrink_class },
                            isStory && !isEdit && _react2.default.createElement(
                                'div',
                                { className: 'ReplyEditor__options' },
                                _react2.default.createElement(
                                    'div',
                                    null,
                                    _react2.default.createElement(
                                        'div',
                                        null,
                                        (0, _counterpart2.default)('g.rewards'),
                                        ': ',
                                        this.props.payoutType == '0%' && (0, _counterpart2.default)('reply_editor.decline_payout'),
                                        this.props.payoutType == '50%' && (0, _counterpart2.default)('reply_editor.default_50_50'),
                                        this.props.payoutType == '100%' && (0, _counterpart2.default)('reply_editor.power_up_100')
                                    ),
                                    _react2.default.createElement(
                                        'a',
                                        {
                                            href: '#',
                                            onClick: this.showAdvancedSettings
                                        },
                                        (0, _counterpart2.default)('reply_editor.advanced_settings')
                                    ),
                                    ' ',
                                    _react2.default.createElement('br', null),
                                    '\xA0'
                                )
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: vframe_section_shrink_class },
                            postError && _react2.default.createElement(
                                'div',
                                { className: 'error' },
                                postError
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: vframe_section_shrink_class },
                            !loading && _react2.default.createElement(
                                'button',
                                {
                                    type: 'submit',
                                    className: 'button',
                                    disabled: disabled,
                                    tabIndex: 4
                                },
                                isEdit ? (0, _counterpart2.default)('reply_editor.update_post') : postLabel
                            ),
                            loading && _react2.default.createElement(
                                'span',
                                null,
                                _react2.default.createElement('br', null),
                                _react2.default.createElement(_LoadingIndicator2.default, { type: 'circle' })
                            ),
                            '\xA0',
                            ' ',
                            !loading && this.props.onCancel && _react2.default.createElement(
                                'button',
                                {
                                    type: 'button',
                                    className: 'secondary hollow button no-border',
                                    tabIndex: 5,
                                    onClick: onCancel
                                },
                                (0, _counterpart2.default)('g.cancel')
                            ),
                            !loading && !this.props.onCancel && _react2.default.createElement(
                                'button',
                                {
                                    className: 'button hollow no-border',
                                    tabIndex: 5,
                                    disabled: submitting,
                                    onClick: onCancel
                                },
                                (0, _counterpart2.default)('g.clear')
                            ),
                            !isStory && !isEdit && this.props.payoutType != '50%' && _react2.default.createElement(
                                'div',
                                { className: 'ReplyEditor__options float-right text-right' },
                                (0, _counterpart2.default)('g.rewards'),
                                ': ',
                                this.props.payoutType == '0%' && (0, _counterpart2.default)('reply_editor.decline_payout'),
                                this.props.payoutType == '100%' && (0, _counterpart2.default)('reply_editor.power_up_100'),
                                '. ',
                                _react2.default.createElement(
                                    'a',
                                    { href: '/@' + username + '/settings' },
                                    'Update settings'
                                )
                            )
                        ),
                        !loading && !rte && body.value && _react2.default.createElement(
                            'div',
                            {
                                className: 'Preview ' + vframe_section_shrink_class
                            },
                            !isHtml && _react2.default.createElement(
                                'div',
                                { className: 'float-right' },
                                _react2.default.createElement(
                                    'a',
                                    {
                                        target: '_blank',
                                        href: 'https://guides.github.com/features/mastering-markdown/',
                                        rel: 'noopener noreferrer'
                                    },
                                    (0, _counterpart2.default)('reply_editor.markdown_styling_guide')
                                )
                            ),
                            _react2.default.createElement(
                                'h6',
                                null,
                                (0, _counterpart2.default)('g.preview')
                            ),
                            _react2.default.createElement(_MarkdownViewer2.default, {
                                text: body.value,
                                jsonMetadata: jsonMetadata,
                                large: isStory,
                                noImage: noImage
                            })
                        )
                    )
                )
            );
        }
    }]);
    return ReplyEditor;
}(_react2.default.Component), _class.propTypes = {
    // html component attributes
    formId: _propTypes2.default.string.isRequired, // unique form id for each editor
    type: _propTypes2.default.oneOf(['submit_story', 'submit_comment', 'edit']),
    successCallback: _propTypes2.default.func, // indicator that the editor is done and can be hidden
    onCancel: _propTypes2.default.func, // hide editor when cancel button clicked

    author: _propTypes2.default.string, // empty or string for top-level post
    permlink: _propTypes2.default.string, // new or existing category (default calculated from title)
    parent_author: _propTypes2.default.string, // empty or string for top-level post
    parent_permlink: _propTypes2.default.string, // new or existing category
    jsonMetadata: _propTypes2.default.object, // An existing comment has its own meta data
    category: _propTypes2.default.string, // initial value
    title: _propTypes2.default.string, // initial value
    body: _propTypes2.default.string, // initial value
    richTextEditor: _propTypes2.default.func,
    defaultPayoutType: _propTypes2.default.string,
    payoutType: _propTypes2.default.string
}, _class.defaultProps = {
    isStory: false,
    author: '',
    parent_author: '',
    parent_permlink: '',
    type: 'submit_comment'
}, _temp);


var saveEditorTimeout = void 0;

// removes <html></html> wrapper if exists
function stripHtmlWrapper(text) {
    var m = text.match(/<html>\n*([\S\s]+?)?\n*<\/html>/m);
    return m && m.length === 2 ? m[1] : text;
}

// See also MarkdownViewer render
var isHtmlTest = function isHtmlTest(text) {
    return (/^<html>/.test(text)
    );
};

function stateToHtml(state) {
    var html = state.toString('html');
    if (html === '<p></p>') html = '';
    if (html === '<p><br></p>') html = '';
    if (html == '') return '';
    return '<html>\n' + html + '\n</html>';
}

function stateFromHtml(RichTextEditor) {
    var html = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    if (!RichTextEditor) return null;
    if (html) html = stripHtmlWrapper(html);
    if (html && html.trim() == '') html = null;
    return html ? RichTextEditor.createValueFromString(html, 'html') : RichTextEditor.createEmptyValue();
}

function stateFromMarkdown(RichTextEditor, markdown) {
    var html = void 0;
    if (markdown && markdown.trim() !== '') {
        html = remarkable.render(markdown);
        html = (0, _HtmlReady2.default)(html).html; // TODO: option to disable youtube conversion, @-links, img proxy
        //html = htmlclean(html) // normalize whitespace
        console.log('markdown converted to:', html);
    }
    return stateFromHtml(RichTextEditor, html);
}

var richTextEditor = process.env.BROWSER ? require('react-rte-image').default : null;

exports.default = function (formId) {
    return (0, _reactRedux.connect)(
    // mapStateToProps
    function (state, ownProps) {
        var username = state.user.getIn(['current', 'username']);
        var fields = ['body'];
        var type = ownProps.type,
            parent_author = ownProps.parent_author,
            jsonMetadata = ownProps.jsonMetadata;

        var isEdit = type === 'edit';
        var isStory = /submit_story/.test(type) || isEdit && parent_author === '';
        if (isStory) fields.push('title');
        if (isStory) fields.push('category');

        var category = ownProps.category,
            title = ownProps.title,
            body = ownProps.body;

        if (/submit_/.test(type)) title = body = '';
        if (isStory && jsonMetadata && jsonMetadata.tags) {
            category = (0, _immutable.Set)([category].concat((0, _toConsumableArray3.default)(jsonMetadata.tags))).join(' ');
        }

        var defaultPayoutType = state.app.getIn(['user_preferences', isStory ? 'defaultBlogPayout' : 'defaultCommentPayout'], '50%');
        var payoutType = state.user.getIn(['current', 'post', formId, 'payoutType']);
        if (!payoutType) {
            payoutType = defaultPayoutType;
        }

        var ret = (0, _extends3.default)({}, ownProps, {
            fields: fields,
            isStory: isStory,
            username: username,
            defaultPayoutType: defaultPayoutType,
            payoutType: payoutType,
            initialValues: { title: title, body: body, category: category },
            state: state,
            formId: formId,
            richTextEditor: richTextEditor
        });
        return ret;
    },

    // mapDispatchToProps
    function (dispatch) {
        return {
            clearMetaData: function clearMetaData(id) {
                dispatch(globalActions.clearMeta({ id: id }));
            },
            setMetaData: function setMetaData(id, jsonMetadata) {
                dispatch(globalActions.setMetaData({
                    id: id,
                    meta: jsonMetadata ? jsonMetadata.steem : null
                }));
            },
            uploadImage: function uploadImage(file, progress) {
                return dispatch(userActions.uploadImage({ file: file, progress: progress }));
            },
            showAdvancedSettings: function showAdvancedSettings(formId) {
                return dispatch(userActions.showPostAdvancedSettings({ formId: formId }));
            },
            setPayoutType: function setPayoutType(formId, payoutType) {
                return dispatch(userActions.set({
                    key: ['current', 'post', formId, 'payoutType'],
                    value: payoutType
                }));
            },
            reply: function reply(_ref2) {
                var category = _ref2.category,
                    title = _ref2.title,
                    body = _ref2.body,
                    author = _ref2.author,
                    permlink = _ref2.permlink,
                    parent_author = _ref2.parent_author,
                    parent_permlink = _ref2.parent_permlink,
                    isHtml = _ref2.isHtml,
                    isStory = _ref2.isStory,
                    type = _ref2.type,
                    originalPost = _ref2.originalPost,
                    _ref2$payoutType = _ref2.payoutType,
                    payoutType = _ref2$payoutType === undefined ? '50%' : _ref2$payoutType,
                    state = _ref2.state,
                    jsonMetadata = _ref2.jsonMetadata,
                    successCallback = _ref2.successCallback,
                    errorCallback = _ref2.errorCallback,
                    startLoadingIndicator = _ref2.startLoadingIndicator;

                // const post = state.global.getIn(['content', author + '/' + permlink])
                var username = state.user.getIn(['current', 'username']);

                var isEdit = type === 'edit';
                var isNew = /^submit_/.test(type);

                // Wire up the current and parent props for either an Edit or a Submit (new post)
                //'submit_story', 'submit_comment', 'edit'
                var linkProps = isNew ? {
                    // submit new
                    parent_author: author,
                    parent_permlink: permlink,
                    author: username
                    // permlink,  assigned in TransactionSaga
                } : // edit existing
                isEdit ? { author: author, permlink: permlink, parent_author: parent_author, parent_permlink: parent_permlink } : null;

                if (!linkProps) throw new Error('Unknown type: ' + type);

                // If this is an HTML post, it MUST begin and end with the tag
                if (isHtml && !body.match(/^<html>[\s\S]*<\/html>$/)) {
                    errorCallback('HTML posts must begin with <html> and end with </html>');
                    return;
                }

                var rtags = void 0;
                {
                    var html = isHtml ? body : remarkable.render(body);
                    rtags = (0, _HtmlReady2.default)(html, { mutate: false });
                }

                _SanitizeConfig.allowedTags.forEach(function (tag) {
                    rtags.htmltags.delete(tag);
                });
                if (isHtml) rtags.htmltags.delete('html'); // html tag allowed only in HTML mode
                if (rtags.htmltags.size) {
                    errorCallback('Please remove the following HTML elements from your post: ' + Array.apply(undefined, (0, _toConsumableArray3.default)(rtags.htmltags)).map(function (tag) {
                        return '<' + tag + '>';
                    }).join(', '));
                    return;
                }

                var formCategories = (0, _immutable.Set)(category ? category.trim().replace(/#/g, '').split(/ +/) : []);
                var rootCategory = originalPost && originalPost.category ? originalPost.category : formCategories.first();
                var allCategories = (0, _immutable.Set)([].concat((0, _toConsumableArray3.default)(formCategories.toJS())));
                if (/^[-a-z\d]+$/.test(rootCategory)) allCategories = allCategories.add(rootCategory);

                var postHashtags = [].concat((0, _toConsumableArray3.default)(rtags.hashtags));
                while (allCategories.size < 5 && postHashtags.length > 0) {
                    allCategories = allCategories.add(postHashtags.shift());
                }

                // merge
                var meta = isEdit ? jsonMetadata : {};
                if (allCategories.size) meta.tags = allCategories.toJS();else delete meta.tags;
                if (rtags.usertags.size) meta.users = rtags.usertags;else delete meta.users;
                if (rtags.images.size) meta.image = rtags.images;else delete meta.image;
                if (rtags.links.size) meta.links = rtags.links;else delete meta.links;

                meta.app = 'steemit/0.1';
                if (isStory) {
                    meta.format = isHtml ? 'html' : 'markdown';
                }

                // if(Object.keys(json_metadata.steem).length === 0) json_metadata = {}// keep json_metadata minimal
                var sanitizeErrors = [];
                (0, _sanitizeHtml2.default)(body, (0, _SanitizeConfig2.default)({ sanitizeErrors: sanitizeErrors }));
                if (sanitizeErrors.length) {
                    errorCallback(sanitizeErrors.join('.  '));
                    return;
                }

                if (meta.tags.length > 5) {
                    var includingCategory = isEdit ? (0, _counterpart2.default)('reply_editor.including_the_category', {
                        rootCategory: rootCategory
                    }) : '';
                    errorCallback((0, _counterpart2.default)('reply_editor.use_limited_amount_of_tags', {
                        tagsLength: meta.tags.length,
                        includingCategory: includingCategory
                    }));
                    return;
                }

                startLoadingIndicator();

                var originalBody = isEdit ? originalPost.body : null;
                var __config = { originalBody: originalBody };
                // Avoid changing payout option during edits #735
                if (!isEdit) {
                    switch (payoutType) {
                        case '0%':
                            // decline payout
                            __config.comment_options = {
                                max_accepted_payout: '0.000 SBD'
                            };
                            break;
                        case '100%':
                            // 100% steem power payout
                            __config.comment_options = {
                                percent_steem_dollars: 0 // 10000 === 100% (of 50%)
                            };
                            break;
                        default: // 50% steem power, 50% sd+steem
                    }
                }

                var operation = (0, _extends3.default)({}, linkProps, {
                    category: rootCategory,
                    title: title,
                    body: body,
                    json_metadata: meta,
                    __config: __config
                });
                dispatch(transactionActions.broadcastOperation({
                    type: 'comment',
                    operation: operation,
                    errorCallback: errorCallback,
                    successCallback: successCallback
                }));
            }
        };
    })(ReplyEditor);
};
//# sourceMappingURL=ReplyEditor.js.map