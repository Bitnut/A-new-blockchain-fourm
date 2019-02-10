'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

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

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _shouldComponentUpdate = require('app/utils/shouldComponentUpdate');

var _shouldComponentUpdate2 = _interopRequireDefault(_shouldComponentUpdate);

var _reactRedux = require('react-redux');

var _UserReducer = require('app/redux/UserReducer');

var userActions = _interopRequireWildcard(_UserReducer);

var _counterpart = require('counterpart');

var _counterpart2 = _interopRequireDefault(_counterpart);

var _GlobalReducer = require('app/redux/GlobalReducer');

var globalActions = _interopRequireWildcard(_GlobalReducer);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** Display a public key.  Offer to show a private key, but only if it matches the provided public key */
var ShowKey = (_temp = _class = function (_Component) {
    (0, _inherits3.default)(ShowKey, _Component);

    function ShowKey() {
        (0, _classCallCheck3.default)(this, ShowKey);

        var _this = (0, _possibleConstructorReturn3.default)(this, (ShowKey.__proto__ || (0, _getPrototypeOf2.default)(ShowKey)).call(this));

        _this.showQr = function () {
            var _this$state = _this.state,
                show = _this$state.show,
                wif = _this$state.wif;

            _this.props.showQRKey({
                type: _this.props.authType,
                text: show ? wif : _this.props.pubkey,
                isPrivate: show
            });
        };

        _this.state = {};
        _this.shouldComponentUpdate = (0, _shouldComponentUpdate2.default)(_this, 'ShowKey');
        _this.onShow = function () {
            var _this$state2 = _this.state,
                show = _this$state2.show,
                wif = _this$state2.wif;
            var _this$props = _this.props,
                onKey = _this$props.onKey,
                pubkey = _this$props.pubkey;

            _this.setState({ show: !show });
            if (onKey) onKey(!show ? wif : null, pubkey);
        };
        _this.showLogin = function () {
            var _this$props2 = _this.props,
                showLogin = _this$props2.showLogin,
                accountName = _this$props2.accountName,
                authType = _this$props2.authType;

            showLogin({ username: accountName, authType: authType });
        };
        _this.showLogin = _this.showLogin.bind(_this);
        return _this;
    }

    (0, _createClass3.default)(ShowKey, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            this.setWif(this.props, this.state);
            this.setOnKey(this.props, this.state);
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            this.setWif(nextProps);
        }
    }, {
        key: 'componentWillUpdate',
        value: function componentWillUpdate(nextProps, nextState) {
            this.setOnKey(nextProps, nextState);
        }
    }, {
        key: 'setWif',
        value: function setWif(props) {
            var privateKey = props.privateKey,
                pubkey = props.pubkey;

            if (privateKey && pubkey === privateKey.toPublicKey().toString()) {
                var wif = privateKey.toWif();
                this.setState({ wif: wif });
            } else {
                this.setState({ wif: undefined });
            }
        }
    }, {
        key: 'setOnKey',
        value: function setOnKey(nextProps, nextState) {
            var show = nextState.show,
                wif = nextState.wif;
            var onKey = nextProps.onKey,
                pubkey = nextProps.pubkey;

            if (onKey) onKey(show ? wif : null, pubkey);
        }
    }, {
        key: 'render',
        value: function render() {
            var onShow = this.onShow,
                showLogin = this.showLogin,
                _props = this.props,
                pubkey = _props.pubkey,
                cmpProps = _props.cmpProps,
                children = _props.children,
                authType = _props.authType;
            var _state = this.state,
                show = _state.show,
                wif = _state.wif;


            var keyIcon = _react2.default.createElement(
                'span',
                { style: { fontSize: '100%' } },
                (0, _counterpart2.default)('g.hide_private_key')
            );
            // Tooltip is trigggering a setState on unmounted component exception
            var showTip = (0, _counterpart2.default)('g.show_private_key'); //<Tooltip t="Show private key (WIF)">show</Tooltip>

            var keyLink = wif ? _react2.default.createElement(
                'div',
                {
                    style: { marginBottom: 0 },
                    className: 'hollow tiny button slim'
                },
                _react2.default.createElement(
                    'a',
                    { onClick: onShow },
                    show ? keyIcon : showTip
                )
            ) : authType === 'memo' ? null : authType === 'owner' ? null : _react2.default.createElement(
                'div',
                {
                    style: { marginBottom: 0 },
                    className: 'hollow tiny button slim'
                },
                _react2.default.createElement(
                    'a',
                    { onClick: showLogin },
                    (0, _counterpart2.default)('g.login_to_show')
                )
            );

            return _react2.default.createElement(
                'div',
                { className: 'row' },
                _react2.default.createElement(
                    'div',
                    { className: 'column small-12 medium-10' },
                    _react2.default.createElement(
                        'div',
                        {
                            style: {
                                display: 'inline-block',
                                paddingRight: 10,
                                cursor: 'pointer'
                            },
                            onClick: this.showQr
                        },
                        _react2.default.createElement('img', {
                            src: require('app/assets/images/qrcode.png'),
                            height: '40',
                            width: '40'
                        })
                    ),
                    _react2.default.createElement(
                        'span',
                        cmpProps,
                        show ? wif : pubkey
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'column small-12 medium-2 noPrint' },
                    keyLink
                )
            );
        }
    }]);
    return ShowKey;
}(_react.Component), _class.propTypes = {
    // HTML props
    pubkey: _propTypes2.default.string.isRequired,
    authType: _propTypes2.default.string.isRequired,
    accountName: _propTypes2.default.string.isRequired,
    showLogin: _propTypes2.default.func.isRequired,
    privateKey: _propTypes2.default.object,
    cmpProps: _propTypes2.default.object,
    children: _propTypes2.default.object,
    onKey: _propTypes2.default.func
}, _temp);
exports.default = (0, _reactRedux.connect)(function (state, ownProps) {
    return ownProps;
}, function (dispatch) {
    return {
        showLogin: function showLogin(_ref) {
            var username = _ref.username,
                authType = _ref.authType;

            dispatch(userActions.showLogin({ loginDefault: { username: username, authType: authType } }));
        },
        showQRKey: function showQRKey(_ref2) {
            var type = _ref2.type,
                isPrivate = _ref2.isPrivate,
                text = _ref2.text;

            dispatch(globalActions.showDialog({
                name: 'qr_key',
                params: { type: type, isPrivate: isPrivate, text: text }
            }));
        }
    };
})(ShowKey);
//# sourceMappingURL=ShowKey.js.map