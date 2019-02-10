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

var _shouldComponentUpdate = require('app/utils/shouldComponentUpdate');

var _shouldComponentUpdate2 = _interopRequireDefault(_shouldComponentUpdate);

var _GlobalReducer = require('app/redux/GlobalReducer');

var _GlobalReducer2 = _interopRequireDefault(_GlobalReducer);

var _reactRedux = require('react-redux');

var _ChangePassword = require('app/components/elements/ChangePassword');

var _ChangePassword2 = _interopRequireDefault(_ChangePassword);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PasswordReset = (_temp = _class = function (_Component) {
    (0, _inherits3.default)(PasswordReset, _Component);

    function PasswordReset() {
        (0, _classCallCheck3.default)(this, PasswordReset);

        var _this = (0, _possibleConstructorReturn3.default)(this, (PasswordReset.__proto__ || (0, _getPrototypeOf2.default)(PasswordReset)).call(this));

        _this.shouldComponentUpdate = (0, _shouldComponentUpdate2.default)(_this, 'PasswordReset');
        return _this;
    }

    (0, _createClass3.default)(PasswordReset, [{
        key: 'render',
        value: function render() {
            var accountName = this.props.accountName;


            return _react2.default.createElement(
                'div',
                { className: 'row' },
                _react2.default.createElement(
                    'div',
                    { className: 'column large-6 small-12' },
                    _react2.default.createElement(_ChangePassword2.default, { username: accountName })
                )
            );
        }
    }]);
    return PasswordReset;
}(_react.Component), _class.propTypes = {
    // HTML
    account: _propTypes2.default.object.isRequired,
    // Redux
    isMyAccount: _propTypes2.default.bool.isRequired,
    accountName: _propTypes2.default.string.isRequired
}, _temp);
exports.default = (0, _reactRedux.connect)(function (state, ownProps) {
    var account = ownProps.account;

    var accountName = account.get('name');
    var current = state.user.get('current');
    var username = current && current.get('username');
    var isMyAccount = username === accountName;
    return (0, _extends3.default)({}, ownProps, { isMyAccount: isMyAccount, accountName: accountName });
}, function (dispatch) {
    return {};
})(PasswordReset);
//# sourceMappingURL=PasswordReset.js.map