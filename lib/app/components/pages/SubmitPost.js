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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _ReplyEditor = require('app/components/elements/ReplyEditor');

var _ReplyEditor2 = _interopRequireDefault(_ReplyEditor);

var _constants = require('shared/constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var formId = _constants.SUBMIT_FORM_ID;
// const richTextEditor = process.env.BROWSER ? require('react-rte-image').default : null;
// const SubmitReplyEditor = ReplyEditor(formId, richTextEditor);
var SubmitReplyEditor = (0, _ReplyEditor2.default)(formId);

var SubmitPost = function (_React$Component) {
    (0, _inherits3.default)(SubmitPost, _React$Component);

    // static propTypes = {
    //     routeParams: PropTypes.object.isRequired,
    // }
    function SubmitPost() {
        (0, _classCallCheck3.default)(this, SubmitPost);

        var _this = (0, _possibleConstructorReturn3.default)(this, (SubmitPost.__proto__ || (0, _getPrototypeOf2.default)(SubmitPost)).call(this));

        _this.success = function () /*operation*/{
            // const { category } = operation
            localStorage.removeItem('replyEditorData-' + formId);
            _reactRouter.browserHistory.push('/created'); //'/category/' + category)
        };
        return _this;
    }

    (0, _createClass3.default)(SubmitPost, [{
        key: 'render',
        value: function render() {
            var success = this.success;

            return _react2.default.createElement(
                'div',
                { className: 'SubmitPost' },
                _react2.default.createElement(SubmitReplyEditor, {
                    type: 'submit_story',
                    successCallback: success
                })
            );
        }
    }]);
    return SubmitPost;
}(_react2.default.Component);

module.exports = {
    path: 'submit.html',
    component: SubmitPost // connect(state => ({ global: state.global }))(SubmitPost)
};
//# sourceMappingURL=SubmitPost.js.map