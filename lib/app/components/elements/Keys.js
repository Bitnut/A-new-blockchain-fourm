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

var _class, _temp; /* eslint react/prop-types: 0 */


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _immutable = require('immutable');

var _reactRedux = require('react-redux');

var _GlobalReducer = require('app/redux/GlobalReducer');

var globalActions = _interopRequireWildcard(_GlobalReducer);

var _ShowKey = require('app/components/elements/ShowKey');

var _ShowKey2 = _interopRequireDefault(_ShowKey);

var _counterpart = require('counterpart');

var _counterpart2 = _interopRequireDefault(_counterpart);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Keys = (_temp = _class = function (_Component) {
    (0, _inherits3.default)(Keys, _Component);

    function Keys() {
        (0, _classCallCheck3.default)(this, Keys);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Keys.__proto__ || (0, _getPrototypeOf2.default)(Keys)).call(this));

        _this.showChangePassword = function (pubkey) {
            var _this$props = _this.props,
                account = _this$props.account,
                authType = _this$props.authType;

            _this.props.showChangePassword(account.get('name'), authType, pubkey);
        };

        _this.state = {};
        return _this;
    }

    (0, _createClass3.default)(Keys, [{
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps, nextState) {
            return this.props.auth !== nextProps.auth || this.props.authType !== nextProps.authType || this.props.authLogin !== nextProps.authLogin || this.props.account !== nextProps.account || this.state !== nextState;
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                account = _props.account,
                authType = _props.authType,
                privateKeys = _props.privateKeys,
                onKey = _props.onKey;

            var pubkeys = void 0;
            if (authType === 'memo') {
                pubkeys = (0, _immutable.List)([account.get('memo_key')]);
            } else {
                var authority = account.get(authType);
                var authorities = authority.get('key_auths');
                pubkeys = authorities.map(function (a) {
                    return a.get(0);
                });
            }
            var rowClass = 'hoverBackground';
            var idx = 0;
            var tt_auth_type = void 0;
            switch (authType.toLowerCase()) {
                case 'owner':
                    tt_auth_type = (0, _counterpart2.default)('g.owner');
                    break;
                case 'active':
                    tt_auth_type = (0, _counterpart2.default)('g.active');
                    break;
                case 'posting':
                    tt_auth_type = (0, _counterpart2.default)('g.posting');
                    break;
                case 'memo':
                    tt_auth_type = (0, _counterpart2.default)('g.memo');
                    break;
                default:
                    tt_auth_type = authType;
            }
            var auths = pubkeys.map(function (pubkey) {
                return _react2.default.createElement(
                    'div',
                    { key: idx++ },
                    _react2.default.createElement(
                        'div',
                        { className: 'row' },
                        _react2.default.createElement(
                            'div',
                            { className: 'column small-12' },
                            _react2.default.createElement(
                                'span',
                                { className: rowClass },
                                _react2.default.createElement(_ShowKey2.default, {
                                    pubkey: pubkey,
                                    privateKey: privateKeys.get(authType + '_private'),
                                    cmpProps: { className: rowClass },
                                    authType: authType,
                                    accountName: account.get('name'),
                                    onKey: onKey
                                })
                            )
                        )
                    )
                );
            });
            return _react2.default.createElement(
                'span',
                null,
                _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                        'div',
                        { className: 'column small-12' },
                        _react2.default.createElement(
                            'label',
                            null,
                            tt_auth_type
                        ),
                        auths
                    )
                )
            );
        }
    }]);
    return Keys;
}(_react.Component), _class.propTypes = {
    // HTML
    account: _propTypes2.default.object.isRequired, // immutable Map
    authType: _propTypes2.default.oneOf(['posting', 'active', 'owner', 'memo'])
}, _temp);


var emptyMap = (0, _immutable.Map)();

exports.default = (0, _reactRedux.connect)(function (state, ownProps) {
    var account = ownProps.account;

    var accountName = account.get('name');
    var current = state.user.get('current');
    var username = current && current.get('username');
    var isMyAccount = username === accountName;
    var authLogin = isMyAccount ? { username: username, password: current.get('password') } : null;
    var privateKeys = void 0;
    if (current) privateKeys = current.get('private_keys'); // not bound to one account

    if (!privateKeys) privateKeys = emptyMap;

    var auth = state.user.getIn(['authority', accountName]);
    return (0, _extends3.default)({}, ownProps, { auth: auth, authLogin: authLogin, privateKeys: privateKeys });
}, function (dispatch) {
    return {
        showChangePassword: function showChangePassword(username, authType, priorAuthKey) {
            var name = 'changePassword';
            dispatch(globalActions.remove({ key: name }));
            dispatch(globalActions.showDialog({
                name: name,
                params: { username: username, authType: authType, priorAuthKey: priorAuthKey }
            }));
        }
    };
})(Keys);
//# sourceMappingURL=Keys.js.map