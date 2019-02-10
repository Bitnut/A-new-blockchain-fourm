'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

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

var _reactQr = require('react-qr');

var _reactQr2 = _interopRequireDefault(_reactQr);

var _counterpart = require('counterpart');

var _counterpart2 = _interopRequireDefault(_counterpart);

var _shouldComponentUpdate = require('app/utils/shouldComponentUpdate');

var _shouldComponentUpdate2 = _interopRequireDefault(_shouldComponentUpdate);

var _Keys = require('app/components/elements/Keys');

var _Keys2 = _interopRequireDefault(_Keys);

var _GlobalReducer = require('app/redux/GlobalReducer');

var globalActions = _interopRequireWildcard(_GlobalReducer);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var keyTypes = ['Posting', 'Active', 'Owner', 'Memo'];

var UserKeys = (_temp = _class = function (_Component) {
    (0, _inherits3.default)(UserKeys, _Component);

    function UserKeys() {
        (0, _classCallCheck3.default)(this, UserKeys);

        var _this = (0, _possibleConstructorReturn3.default)(this, (UserKeys.__proto__ || (0, _getPrototypeOf2.default)(UserKeys)).call(this));

        _this.showChangePassword = function () {
            _this.props.showChangePassword(_this.props.accountName);
        };

        _this.shouldComponentUpdate = (0, _shouldComponentUpdate2.default)(_this, 'UserKeys');
        _this.state = {};
        _this.onKey = {};
        keyTypes.forEach(function (key) {
            _this.onKey[key] = function (wif, pubkey) {
                _this.setState((0, _defineProperty3.default)({}, key, { wif: wif, pubkey: pubkey }));
            };
        });
        return _this;
    }

    (0, _createClass3.default)(UserKeys, [{
        key: 'componentWillUpdate',
        value: function componentWillUpdate(nextProps, nextState) {
            var wifShown = nextProps.wifShown,
                setWifShown = nextProps.setWifShown;

            var hasWif = false;
            keyTypes.forEach(function (key) {
                var keyObj = nextState[key];
                if (keyObj && keyObj.wif) hasWif = true;
            });
            if (wifShown !== hasWif) setWifShown(hasWif);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                account = _props.account,
                isMyAccount = _props.isMyAccount;
            var onKey = this.onKey;

            var idx = 0;
            var wifQrs = !isMyAccount ? null : keyTypes.map(function (key) {
                var keyObj = _this2.state[key];
                if (!keyObj) return null;
                return _react2.default.createElement(
                    'span',
                    { key: idx++ },
                    _react2.default.createElement('hr', null),
                    _react2.default.createElement(
                        'div',
                        { className: 'row' },
                        _react2.default.createElement(
                            'div',
                            { className: 'column small-2' },
                            _react2.default.createElement(
                                'label',
                                null,
                                (0, _counterpart2.default)('userkeys_jsx.public')
                            ),
                            _react2.default.createElement(_reactQr2.default, { text: keyObj.pubkey })
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'column small-8' },
                            _react2.default.createElement(
                                'label',
                                null,
                                (0, _counterpart2.default)('userkeys_jsx.public_something_key', {
                                    key: key
                                })
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'overflow-ellipsis' },
                                _react2.default.createElement(
                                    'code',
                                    null,
                                    _react2.default.createElement(
                                        'small',
                                        null,
                                        keyObj.pubkey
                                    )
                                )
                            ),
                            keyObj.wif && _react2.default.createElement(
                                'div',
                                null,
                                _react2.default.createElement(
                                    'label',
                                    null,
                                    (0, _counterpart2.default)('userkeys_jsx.private_something_key', { key: key })
                                ),
                                _react2.default.createElement(
                                    'div',
                                    { className: 'overflow-ellipsis' },
                                    _react2.default.createElement(
                                        'code',
                                        null,
                                        _react2.default.createElement(
                                            'small',
                                            null,
                                            keyObj.wif
                                        )
                                    )
                                )
                            )
                        ),
                        keyObj.wif && _react2.default.createElement(
                            'div',
                            { className: 'column small-2' },
                            _react2.default.createElement(
                                'label',
                                null,
                                (0, _counterpart2.default)('userkeys_jsx.private')
                            ),
                            _react2.default.createElement(_reactQr2.default, { text: keyObj.wif })
                        )
                    )
                );
            });
            return _react2.default.createElement(
                'div',
                { className: 'UserKeys row' },
                _react2.default.createElement(
                    'div',
                    { style: { paddingBottom: 10 }, className: 'column small-12' },
                    _react2.default.createElement(_Keys2.default, {
                        account: account,
                        authType: 'posting',
                        onKey: onKey.Posting
                    }),
                    _react2.default.createElement(
                        'span',
                        { className: 'secondary' },
                        (0, _counterpart2.default)('userkeys_jsx.posting_key_is_required_it_should_be_different')
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { style: { paddingBottom: 10 }, className: 'column small-12' },
                    _react2.default.createElement(_Keys2.default, {
                        account: account,
                        authType: 'active',
                        onKey: onKey.Active
                    }),
                    _react2.default.createElement(
                        'span',
                        { className: 'secondary' },
                        (0, _counterpart2.default)('userkeys_jsx.the_active_key_is_used_to_make_transfers_and_place_orders')
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { style: { paddingBottom: 10 }, className: 'column small-12' },
                    _react2.default.createElement(_Keys2.default, {
                        account: account,
                        authType: 'owner',
                        onKey: onKey.Owner
                    }),
                    _react2.default.createElement(
                        'span',
                        { className: 'secondary' },
                        (0, _counterpart2.default)('userkeys_jsx.the_owner_key_is_required_to_change_other_keys'),
                        _react2.default.createElement('br', null),
                        (0, _counterpart2.default)('userkeys_jsx.the_private_key_or_password_should_be_kept_offline')
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { style: { paddingBottom: 10 }, className: 'column small-12' },
                    _react2.default.createElement(_Keys2.default, {
                        account: account,
                        authType: 'memo',
                        onKey: onKey.Memo
                    }),
                    _react2.default.createElement(
                        'span',
                        { className: 'secondary' },
                        (0, _counterpart2.default)('userkeys_jsx.the_memo_key_is_used_to_create_and_read_memos')
                    )
                )
            );
        }
    }]);
    return UserKeys;
}(_react.Component), _class.propTypes = {
    // HTML
    account: _propTypes2.default.object.isRequired,
    // Redux
    isMyAccount: _propTypes2.default.bool.isRequired,
    wifShown: _propTypes2.default.bool,
    setWifShown: _propTypes2.default.func.isRequired,
    accountName: _propTypes2.default.string.isRequired,
    showChangePassword: _propTypes2.default.func.isRequired
}, _temp);
exports.default = (0, _reactRedux.connect)(function (state, ownProps) {
    var account = ownProps.account;

    var accountName = account.get('name');
    var current = state.user.get('current');
    var username = current && current.get('username');
    var isMyAccount = username === accountName;
    var wifShown = state.global.get('UserKeys_wifShown');
    return (0, _extends3.default)({}, ownProps, { isMyAccount: isMyAccount, wifShown: wifShown, accountName: accountName });
}, function (dispatch) {
    return {
        setWifShown: function setWifShown(shown) {
            dispatch(globalActions.receiveState({ UserKeys_wifShown: shown }));
        },
        showChangePassword: function showChangePassword(username) {
            var name = 'changePassword';
            dispatch(globalActions.remove({ key: name }));
            dispatch(globalActions.showDialog({ name: name, params: { username: username } }));
        }
    };
})(UserKeys);
//# sourceMappingURL=UserKeys.js.map