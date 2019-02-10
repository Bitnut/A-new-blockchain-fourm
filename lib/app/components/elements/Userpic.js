'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.avatarSize = exports.SIZE_LARGE = exports.SIZE_MED = exports.SIZE_SMALL = undefined;

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

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = require('react-redux');

var _shouldComponentUpdate = require('app/utils/shouldComponentUpdate');

var _shouldComponentUpdate2 = _interopRequireDefault(_shouldComponentUpdate);

var _ProxifyUrl = require('app/utils/ProxifyUrl');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SIZE_SMALL = exports.SIZE_SMALL = 'small';
var SIZE_MED = exports.SIZE_MED = 'medium';
var SIZE_LARGE = exports.SIZE_LARGE = 'large';

var sizeList = [SIZE_SMALL, SIZE_MED, SIZE_LARGE];

var avatarSize = exports.avatarSize = {
    small: SIZE_SMALL,
    medium: SIZE_MED,
    large: SIZE_LARGE
};

var Userpic = function (_Component) {
    (0, _inherits3.default)(Userpic, _Component);

    function Userpic() {
        var _ref;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, Userpic);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Userpic.__proto__ || (0, _getPrototypeOf2.default)(Userpic)).call.apply(_ref, [this].concat(args))), _this), _this.shouldComponentUpdate = (0, _shouldComponentUpdate2.default)(_this, 'Userpic'), _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(Userpic, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                account = _props.account,
                json_metadata = _props.json_metadata,
                size = _props.size;

            var hideIfDefault = this.props.hideIfDefault || false;
            var avSize = size && sizeList.indexOf(size) > -1 ? '/' + size : '';

            // try to extract image url from users metaData
            if (hideIfDefault) {
                try {
                    var md = JSON.parse(json_metadata);
                    if (!/^(https?:)\/\//.test(md.profile.profile_image)) {
                        return null;
                    }
                } catch (e) {
                    return null;
                }
            }

            var style = {
                backgroundImage: 'url(' + (0, _ProxifyUrl.imageProxy)() + ('u/' + account + '/avatar' + avSize + ')')
            };

            return _react2.default.createElement('div', { className: 'Userpic', style: style });
        }
    }]);
    return Userpic;
}(_react.Component);

Userpic.propTypes = {
    account: _propTypes2.default.string.isRequired
};

exports.default = (0, _reactRedux.connect)(function (state, ownProps) {
    var account = ownProps.account,
        hideIfDefault = ownProps.hideIfDefault;

    return {
        account: account,
        json_metadata: state.global.getIn(['accounts', account, 'json_metadata']),
        hideIfDefault: hideIfDefault
    };
})(Userpic);
//# sourceMappingURL=Userpic.js.map