'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.steemitCannotRecoverPasswords = undefined;

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

var _class, _temp2; /* eslint react/prop-types: 0 */


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = require('react-redux');

var _server = require('react-dom/server');

var _GlobalReducer = require('app/redux/GlobalReducer');

var globalActions = _interopRequireWildcard(_GlobalReducer);

var _shouldComponentUpdate = require('app/utils/shouldComponentUpdate');

var _shouldComponentUpdate2 = _interopRequireDefault(_shouldComponentUpdate);

var _Icon = require('app/components/elements/Icon');

var _Icon2 = _interopRequireDefault(_Icon);

var _counterpart = require('counterpart');

var _counterpart2 = _interopRequireDefault(_counterpart);

var _client_config = require('app/client_config');

var _ecc = require('@steemit/steem-js/lib/auth/ecc');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var bool = _propTypes2.default.bool;
var steemitCannotRecoverPasswords = exports.steemitCannotRecoverPasswords = (0, _counterpart2.default)('suggestpassword_jsx.APP_NAME_cannot_recover_passwords_keep_this_page_in_a_secure_location');

var SuggestPassword = (_temp2 = _class = function (_React$Component) {
    (0, _inherits3.default)(SuggestPassword, _React$Component);

    function SuggestPassword() {
        var _ref;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, SuggestPassword);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = SuggestPassword.__proto__ || (0, _getPrototypeOf2.default)(SuggestPassword)).call.apply(_ref, [this].concat(args))), _this), _this.shouldComponentUpdate = (0, _shouldComponentUpdate2.default)(_this, 'SuggestPassword'), _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(SuggestPassword, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            var _props = this.props,
                suggestedPassword = _props.suggestedPassword,
                createSuggestedPassword = _props.createSuggestedPassword;

            if (!suggestedPassword) createSuggestedPassword();
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            var print = this.props.print;

            if (print && !this.printed) {
                this.printed = true;
                window.print();
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var suggestedPassword = this.props.suggestedPassword;

            var render = function render(print) {
                return _react2.default.createElement(
                    'span',
                    { className: 'SuggestPassword' },
                    _react2.default.createElement(_Icon2.default, { name: _client_config.APP_ICON, size: '2x' }),
                    ' ',
                    _client_config.APP_NAME,
                    _react2.default.createElement('hr', null),
                    _react2.default.createElement(
                        'div',
                        null,
                        _react2.default.createElement(
                            'h5',
                            null,
                            print ? (0, _counterpart2.default)('suggestpassword_jsx.APP_NAME_password_backup', { APP_NAME: _client_config.APP_NAME }) : (0, _counterpart2.default)('suggestpassword_jsx.APP_NAME_password_backup_required', { APP_NAME: _client_config.APP_NAME })
                        ),
                        steemitCannotRecoverPasswords
                    ),
                    _react2.default.createElement('br', null),
                    _react2.default.createElement(
                        'div',
                        null,
                        print && _react2.default.createElement(
                            'div',
                            null,
                            _react2.default.createElement(
                                'label',
                                null,
                                (0, _counterpart2.default)('g.username')
                            ),
                            _react2.default.createElement(
                                'div',
                                null,
                                _react2.default.createElement(
                                    'code',
                                    null,
                                    _react2.default.createElement(
                                        'u',
                                        null,
                                        '\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0\xA0'
                                    )
                                )
                            )
                        ),
                        !print && _react2.default.createElement(
                            'div',
                            null,
                            (0, _counterpart2.default)('suggestpassword_jsx.after_printing_write_down_your_user_name'),
                            '.'
                        )
                    ),
                    _react2.default.createElement('br', null),
                    _react2.default.createElement(
                        'div',
                        null,
                        !print && _react2.default.createElement(
                            'a',
                            { onClick: function onClick() {
                                    return openPP(render(true));
                                } },
                            _react2.default.createElement(_Icon2.default, { name: 'printer', size: '3x' }),
                            '\xA0',
                            (0, _counterpart2.default)('g.print'),
                            '\xA0\xA0',
                            _react2.default.createElement('br', null),
                            _react2.default.createElement('br', null)
                        ),
                        _react2.default.createElement(
                            'label',
                            null,
                            (0, _counterpart2.default)('g.password')
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'overflow-ellipsis' },
                            _react2.default.createElement(
                                'code',
                                null,
                                suggestedPassword
                            )
                        )
                    )
                );
            };
            return render();
        }
        // <p>
        //     <label>Password (again)</label>
        //     {print && <br />}
        //     {suggestedPassword && <QRCode text={suggestedPassword} />}
        // </p>

    }]);
    return SuggestPassword;
}(_react2.default.Component), _class.propTypes = {
    print: bool
}, _temp2);

function openPP(el) {
    var yourDOCTYPE = '<!DOCTYPE html>';
    var printPreview = window.open('about:blank', 'print_preview', 'resizable=yes,scrollbars=yes,status=yes');
    var printDocument = printPreview.document;
    printDocument.open();
    printDocument.write('\n        ' + yourDOCTYPE + '\n        <html>\n            ' + (0, _server.renderToString)(el) + '\n            <script>window.print()</script>\n        </html>');
    printDocument.close();
}
exports.default = (0, _reactRedux.connect)(
// mapStateToProps
function (state, ownProps) {
    return (0, _extends3.default)({}, ownProps, {
        suggestedPassword: state.global.get('suggestedPassword')
    });
},
// mapDispatchToProps
function (dispatch) {
    return {
        createSuggestedPassword: function createSuggestedPassword() {
            var PASSWORD_LENGTH = 32;
            var private_key = _ecc.key_utils.get_random_key();
            var suggestedPassword = private_key.toWif().substring(3, 3 + PASSWORD_LENGTH);
            dispatch(globalActions.set({
                key: 'suggestedPassword',
                value: suggestedPassword
            }));
        }
    };
})(SuggestPassword);
//# sourceMappingURL=SuggestPassword.js.map