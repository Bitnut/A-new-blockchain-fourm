'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

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

var _SvgImage = require('app/components/elements/SvgImage');

var _SvgImage2 = _interopRequireDefault(_SvgImage);

var _Translator = require('app/Translator');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mailchimp_form = '\n<!-- Begin MailChimp Signup Form -->\n<div id="mc_embed_signup text-center">\n<form action="//steemit.us13.list-manage.com/subscribe/post?u=66efbe94e8b1cf5f44ef6aac5&amp;id=3f204846eb" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate medium-5 large-5 small-6 columns center" novalidate>\n    <div id="mc_embed_signup_scroll">\n\n<div class="mc-field-group">\n  <input type="email" value="" name="EMAIL" class="required email" id="mce-EMAIL" placeholder="Email me when it is ready">\n</div>\n  <div id="mce-responses" class="clear">\n    <div class="response" id="mce-error-response" style="display:none"></div>\n    <div class="response" id="mce-success-response" style="display:none"></div>\n  </div>    <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->\n    <div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_66efbe94e8b1cf5f44ef6aac5_3f204846eb" tabindex="-1" value=""></div>\n    <div class="clear text-center"><input type="submit" value="SUBMIT" name="subscribe" id="mc-embedded-subscribe" class="button action"></div>\n    </div>\n</form>\n</div>\n<script type=\'text/javascript\' src=\'//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js\'></script><script type=\'text/javascript\'>(function($) {window.fnames = new Array(); window.ftypes = new Array();fnames[0]=\'EMAIL\';ftypes[0]=\'email\';fnames[1]=\'FNAME\';ftypes[1]=\'text\';fnames[2]=\'LNAME\';ftypes[2]=\'text\';}(jQuery));var $mcj = jQuery.noConflict(true);</script>\n<!--End mc_embed_signup-->\n';

var Index = function (_React$Component) {
    (0, _inherits3.default)(Index, _React$Component);

    function Index(params) {
        (0, _classCallCheck3.default)(this, Index);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Index.__proto__ || (0, _getPrototypeOf2.default)(Index)).call(this, params));

        _this.state = {
            submitted: false,
            error: ''
        };
        return _this;
    }

    //onSubmit(e) {
    //    e.preventDefault();
    //    const email = e.target.elements.email.value;
    //    console.log('-- Index.onSubmit -->', email);
    //}

    (0, _createClass3.default)(Index, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'Index' },
                _react2.default.createElement(
                    'div',
                    { className: 'text-center' },
                    _react2.default.createElement(_SvgImage2.default, { name: 'steemit', width: '480px', height: '240px' })
                ),
                _react2.default.createElement(
                    'h1',
                    { className: 'center text-center' },
                    (0, _Translator.translateHtml)('APP_NAME_is_a_social_media_platform_where_everyone_gets_paid_for_creating_and_curating_content'),
                    '.'
                ),
                _react2.default.createElement('br', null),
                _react2.default.createElement('br', null)
            );
        }
    }]);
    return Index;
}(_react2.default.Component);

exports.default = Index;
//# sourceMappingURL=Index.js.map