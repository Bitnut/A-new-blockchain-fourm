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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = require('react-redux');

var _CloseButton = require('app/components/elements/CloseButton');

var _CloseButton2 = _interopRequireDefault(_CloseButton);

var _Reveal = require('app/components/elements/Reveal');

var _Reveal2 = _interopRequireDefault(_Reveal);

var _reactNotification = require('react-notification');

var _immutable = require('immutable');

var _counterpart = require('counterpart');

var _counterpart2 = _interopRequireDefault(_counterpart);

var _UserReducer = require('app/redux/UserReducer');

var userActions = _interopRequireWildcard(_UserReducer);

var _AppReducer = require('app/redux/AppReducer');

var appActions = _interopRequireWildcard(_AppReducer);

var _TransactionReducer = require('app/redux/TransactionReducer');

var transactionActions = _interopRequireWildcard(_TransactionReducer);

var _LoginForm = require('app/components/modules/LoginForm');

var _LoginForm2 = _interopRequireDefault(_LoginForm);

var _ConfirmTransactionForm = require('app/components/modules/ConfirmTransactionForm');

var _ConfirmTransactionForm2 = _interopRequireDefault(_ConfirmTransactionForm);

var _Transfer = require('app/components/modules/Transfer');

var _Transfer2 = _interopRequireDefault(_Transfer);

var _SignUp = require('app/components/modules/SignUp');

var _SignUp2 = _interopRequireDefault(_SignUp);

var _Powerdown = require('app/components/modules/Powerdown');

var _Powerdown2 = _interopRequireDefault(_Powerdown);

var _shouldComponentUpdate = require('app/utils/shouldComponentUpdate');

var _shouldComponentUpdate2 = _interopRequireDefault(_shouldComponentUpdate);

var _TermsAgree = require('app/components/modules/TermsAgree');

var _TermsAgree2 = _interopRequireDefault(_TermsAgree);

var _PostAdvancedSettings = require('app/components/modules/PostAdvancedSettings');

var _PostAdvancedSettings2 = _interopRequireDefault(_PostAdvancedSettings);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Modals = (_temp = _class = function (_React$Component) {
    (0, _inherits3.default)(Modals, _React$Component);

    function Modals() {
        (0, _classCallCheck3.default)(this, Modals);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Modals.__proto__ || (0, _getPrototypeOf2.default)(Modals)).call(this));

        _this.shouldComponentUpdate = (0, _shouldComponentUpdate2.default)(_this, 'Modals');
        return _this;
    }

    (0, _createClass3.default)(Modals, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                show_login_modal = _props.show_login_modal,
                show_confirm_modal = _props.show_confirm_modal,
                show_transfer_modal = _props.show_transfer_modal,
                show_powerdown_modal = _props.show_powerdown_modal,
                show_signup_modal = _props.show_signup_modal,
                show_bandwidth_error_modal = _props.show_bandwidth_error_modal,
                show_post_advanced_settings_modal = _props.show_post_advanced_settings_modal,
                hideLogin = _props.hideLogin,
                hideTransfer = _props.hideTransfer,
                hidePowerdown = _props.hidePowerdown,
                hideConfirm = _props.hideConfirm,
                hideSignUp = _props.hideSignUp,
                show_terms_modal = _props.show_terms_modal,
                notifications = _props.notifications,
                removeNotification = _props.removeNotification,
                hidePromotePost = _props.hidePromotePost,
                show_promote_post_modal = _props.show_promote_post_modal,
                hideBandwidthError = _props.hideBandwidthError,
                hidePostAdvancedSettings = _props.hidePostAdvancedSettings,
                username = _props.username;


            var notifications_array = notifications ? notifications.toArray().map(function (n) {
                n.onClick = function () {
                    return removeNotification(n.key);
                };
                return n;
            }) : [];

            var buySteemPower = function buySteemPower(e) {
                if (e && e.preventDefault) e.preventDefault();
                var new_window = window.open();
                new_window.opener = null;
                new_window.location = 'https://blocktrades.us/?input_coin_type=eth&output_coin_type=steem_power&receive_address=' + username;
            };

            return _react2.default.createElement(
                'div',
                null,
                show_login_modal && _react2.default.createElement(
                    _Reveal2.default,
                    { onHide: hideLogin, show: show_login_modal },
                    _react2.default.createElement(_LoginForm2.default, { onCancel: hideLogin })
                ),
                show_confirm_modal && _react2.default.createElement(
                    _Reveal2.default,
                    { onHide: hideConfirm, show: show_confirm_modal },
                    _react2.default.createElement(_CloseButton2.default, { onClick: hideConfirm }),
                    _react2.default.createElement(_ConfirmTransactionForm2.default, { onCancel: hideConfirm })
                ),
                show_transfer_modal && _react2.default.createElement(
                    _Reveal2.default,
                    { onHide: hideTransfer, show: show_transfer_modal },
                    _react2.default.createElement(_CloseButton2.default, { onClick: hideTransfer }),
                    _react2.default.createElement(_Transfer2.default, null)
                ),
                show_powerdown_modal && _react2.default.createElement(
                    _Reveal2.default,
                    { onHide: hidePowerdown, show: show_powerdown_modal },
                    _react2.default.createElement(_CloseButton2.default, { onClick: hidePowerdown }),
                    _react2.default.createElement(_Powerdown2.default, null)
                ),
                show_signup_modal && _react2.default.createElement(
                    _Reveal2.default,
                    { onHide: hideSignUp, show: show_signup_modal },
                    _react2.default.createElement(_CloseButton2.default, { onClick: hideSignUp }),
                    _react2.default.createElement(_SignUp2.default, null)
                ),
                show_terms_modal && _react2.default.createElement(
                    _Reveal2.default,
                    { show: show_terms_modal },
                    _react2.default.createElement(_TermsAgree2.default, { onCancel: hideLogin })
                ),
                show_bandwidth_error_modal && _react2.default.createElement(
                    _Reveal2.default,
                    {
                        onHide: hideBandwidthError,
                        show: show_bandwidth_error_modal
                    },
                    _react2.default.createElement(
                        'div',
                        null,
                        _react2.default.createElement(_CloseButton2.default, { onClick: hideBandwidthError }),
                        _react2.default.createElement(
                            'h4',
                            null,
                            (0, _counterpart2.default)('modals_jsx.your_transaction_failed')
                        ),
                        _react2.default.createElement('hr', null),
                        _react2.default.createElement(
                            'h5',
                            null,
                            (0, _counterpart2.default)('modals_jsx.out_of_bandwidth_title')
                        ),
                        _react2.default.createElement(
                            'p',
                            null,
                            (0, _counterpart2.default)('modals_jsx.out_of_bandwidth_reason')
                        ),
                        _react2.default.createElement(
                            'p',
                            null,
                            (0, _counterpart2.default)('modals_jsx.out_of_bandwidth_reason_2')
                        ),
                        _react2.default.createElement(
                            'p',
                            null,
                            (0, _counterpart2.default)('modals_jsx.out_of_bandwidth_option_title')
                        ),
                        _react2.default.createElement(
                            'ol',
                            null,
                            _react2.default.createElement(
                                'li',
                                null,
                                (0, _counterpart2.default)('modals_jsx.out_of_bandwidth_option_1')
                            ),
                            _react2.default.createElement(
                                'li',
                                null,
                                (0, _counterpart2.default)('modals_jsx.out_of_bandwidth_option_2')
                            ),
                            _react2.default.createElement(
                                'li',
                                null,
                                (0, _counterpart2.default)('modals_jsx.out_of_bandwidth_option_3')
                            )
                        ),
                        _react2.default.createElement(
                            'button',
                            { className: 'button', onClick: buySteemPower },
                            (0, _counterpart2.default)('g.buy_steem_power')
                        )
                    )
                ),
                show_post_advanced_settings_modal && _react2.default.createElement(
                    _Reveal2.default,
                    {
                        onHide: hidePostAdvancedSettings,
                        show: show_post_advanced_settings_modal ? true : false
                    },
                    _react2.default.createElement(_CloseButton2.default, { onClick: hidePostAdvancedSettings }),
                    _react2.default.createElement(_PostAdvancedSettings2.default, {
                        formId: show_post_advanced_settings_modal
                    })
                ),
                _react2.default.createElement(_reactNotification.NotificationStack, {
                    style: false,
                    notifications: notifications_array,
                    onDismiss: function onDismiss(n) {
                        return removeNotification(n.key);
                    }
                })
            );
        }
    }]);
    return Modals;
}(_react2.default.Component), _class.defaultProps = {
    username: '',
    notifications: undefined,
    removeNotification: function removeNotification() {},
    show_terms_modal: false,
    show_promote_post_modal: false,
    show_signup_modal: false,
    show_bandwidth_error_modal: false,
    show_powerdown_modal: false,
    show_transfer_modal: false,
    show_confirm_modal: false,
    show_login_modal: false,
    show_post_advanced_settings_modal: ''
}, _class.propTypes = {
    show_login_modal: _propTypes2.default.bool,
    show_confirm_modal: _propTypes2.default.bool,
    show_transfer_modal: _propTypes2.default.bool,
    show_powerdown_modal: _propTypes2.default.bool,
    show_bandwidth_error_modal: _propTypes2.default.bool,
    show_signup_modal: _propTypes2.default.bool,
    show_promote_post_modal: _propTypes2.default.bool,
    show_post_advanced_settings_modal: _propTypes2.default.string,
    hideLogin: _propTypes2.default.func.isRequired,
    username: _propTypes2.default.string,
    hideConfirm: _propTypes2.default.func.isRequired,
    hideSignUp: _propTypes2.default.func.isRequired,
    hideTransfer: _propTypes2.default.func.isRequired,
    hidePowerdown: _propTypes2.default.func.isRequired,
    hidePromotePost: _propTypes2.default.func.isRequired,
    hideBandwidthError: _propTypes2.default.func.isRequired,
    hidePostAdvancedSettings: _propTypes2.default.func.isRequired,
    notifications: _propTypes2.default.object,
    show_terms_modal: _propTypes2.default.bool,
    removeNotification: _propTypes2.default.func
}, _temp);
exports.default = (0, _reactRedux.connect)(function (state) {
    return {
        username: state.user.getIn(['current', 'username']),
        show_login_modal: state.user.get('show_login_modal'),
        show_confirm_modal: state.transaction.get('show_confirm_modal'),
        show_transfer_modal: state.user.get('show_transfer_modal'),
        show_powerdown_modal: state.user.get('show_powerdown_modal'),
        show_promote_post_modal: state.user.get('show_promote_post_modal'),
        show_signup_modal: state.user.get('show_signup_modal'),
        notifications: state.app.get('notifications'),
        show_terms_modal: state.user.get('show_terms_modal') && state.routing.locationBeforeTransitions.pathname !== '/tos.html' && state.routing.locationBeforeTransitions.pathname !== '/privacy.html',
        show_bandwidth_error_modal: state.transaction.getIn(['errors', 'bandwidthError']),
        show_post_advanced_settings_modal: state.user.get('show_post_advanced_settings_modal')
    };
}, function (dispatch) {
    return {
        hideLogin: function hideLogin(e) {
            if (e) e.preventDefault();
            dispatch(userActions.hideLogin());
        },
        hideConfirm: function hideConfirm(e) {
            if (e) e.preventDefault();
            dispatch(transactionActions.hideConfirm());
        },
        hideTransfer: function hideTransfer(e) {
            if (e) e.preventDefault();
            dispatch(userActions.hideTransfer());
        },
        hidePowerdown: function hidePowerdown(e) {
            if (e) e.preventDefault();
            dispatch(userActions.hidePowerdown());
        },
        hidePromotePost: function hidePromotePost(e) {
            if (e) e.preventDefault();
            dispatch(userActions.hidePromotePost());
        },
        hideSignUp: function hideSignUp(e) {
            if (e) e.preventDefault();
            dispatch(userActions.hideSignUp());
        },
        hideBandwidthError: function hideBandwidthError(e) {
            if (e) e.preventDefault();
            dispatch(transactionActions.dismissError({ key: 'bandwidthError' }));
        },
        hidePostAdvancedSettings: function hidePostAdvancedSettings(e) {
            if (e) e.preventDefault();
            dispatch(userActions.hidePostAdvancedSettings());
        },
        // example: addNotification: ({key, message}) => dispatch({type: 'ADD_NOTIFICATION', payload: {key, message}}),
        removeNotification: function removeNotification(key) {
            return dispatch(appActions.removeNotification({ key: key }));
        }
    };
})(Modals);
//# sourceMappingURL=Modals.js.map