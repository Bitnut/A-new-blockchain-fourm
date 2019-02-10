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

var _reactRedux = require('react-redux');

var _Link = require('app/components/elements/Link');

var _Link2 = _interopRequireDefault(_Link);

var _GlobalReducer = require('app/redux/GlobalReducer');

var globalActions = _interopRequireWildcard(_GlobalReducer);

var _Links = require('app/utils/Links');

var _Links2 = _interopRequireDefault(_Links);

var _counterpart = require('counterpart');

var _counterpart2 = _interopRequireDefault(_counterpart);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** @deprecated */
var CardView = (_temp = _class = function (_React$Component) {
    (0, _inherits3.default)(CardView, _React$Component);

    function CardView() {
        (0, _classCallCheck3.default)(this, CardView);

        var _this = (0, _possibleConstructorReturn3.default)(this, (CardView.__proto__ || (0, _getPrototypeOf2.default)(CardView)).call(this));

        _this.onCloseImage = function (e) {
            e.preventDefault();
            var _this$props = _this.props,
                formId = _this$props.formId,
                clearMetaElement = _this$props.clearMetaElement;

            clearMetaElement(formId, 'image');
        };
        _this.onCloseDescription = function (e) {
            e.preventDefault();
            var _this$props2 = _this.props,
                formId = _this$props2.formId,
                clearMetaElement = _this$props2.clearMetaElement;

            clearMetaElement(formId, 'description');
        };
        return _this;
    }

    (0, _createClass3.default)(CardView, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                metaLinkData = _props.metaLinkData,
                canEdit = _props.canEdit;

            if (!metaLinkData) return _react2.default.createElement('span', null);
            var link = metaLinkData.link,
                image = metaLinkData.image,
                description = metaLinkData.description,
                alt = metaLinkData.alt;
            // http://postimg.org/image/kbefrpbe9/

            if (!image && !description) return _react2.default.createElement('span', null);
            // youTubeImages have their own preview
            var youTubeImage = _Links2.default.youTube.test(link);
            return _react2.default.createElement(
                'span',
                { className: 'Card' },
                image && !youTubeImage && _react2.default.createElement(
                    'div',
                    null,
                    canEdit && _react2.default.createElement(
                        'div',
                        null,
                        '(',
                        _react2.default.createElement(
                            'a',
                            { onClick: this.onCloseImage },
                            (0, _counterpart2.default)('g.remove')
                        ),
                        ')',
                        _react2.default.createElement('br', null)
                    ),
                    _react2.default.createElement(
                        _Link2.default,
                        { href: link },
                        _react2.default.createElement('img', { src: image, alt: alt })
                    )
                ),
                description && _react2.default.createElement(
                    'div',
                    null,
                    canEdit && _react2.default.createElement(
                        'span',
                        null,
                        '(',
                        _react2.default.createElement(
                            'a',
                            { onClick: this.onCloseDescription },
                            (0, _counterpart2.default)('g.remove')
                        ),
                        ')'
                    ),
                    _react2.default.createElement(
                        _Link2.default,
                        { href: link },
                        _react2.default.createElement(
                            'blockquote',
                            null,
                            description
                        )
                    )
                )
            );
        }
    }]);
    return CardView;
}(_react2.default.Component), _class.propTypes = {
    // HTML properties
    formId: _propTypes2.default.string,
    canEdit: _propTypes2.default.bool,

    // redux or html
    metaLinkData: _propTypes2.default.object,

    // redux
    clearMetaElement: _propTypes2.default.func
}, _class.defaultProps = {
    canEdit: false
}, _temp);
exports.default = (0, _reactRedux.connect)(function (state, ownProps) {
    // const {text} = ownProps
    var formId = ownProps.formId;
    var metaLinkData = state.global.getIn(['metaLinkData', formId]);
    return (0, _extends3.default)({ metaLinkData: metaLinkData }, ownProps);
}, function (dispatch) {
    return {
        clearMetaElement: function clearMetaElement(formId, element) {
            dispatch(globalActions.clearMetaElement({ formId: formId, element: element }));
        }
    };
})(CardView);
//# sourceMappingURL=CardView.js.map