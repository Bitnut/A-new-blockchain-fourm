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

var _class, _temp2;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = require('react-redux');

var _TransactionReducer = require('app/redux/TransactionReducer');

var transactionActions = _interopRequireWildcard(_TransactionReducer);

var _shouldComponentUpdate = require('app/utils/shouldComponentUpdate');

var _shouldComponentUpdate2 = _interopRequireDefault(_shouldComponentUpdate);

var _immutable = require('immutable');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var func = _propTypes2.default.func,
    string = _propTypes2.default.string;

/** Sole consumer for a transaction error of a given type. */

var TransactionError = (_temp2 = _class = function (_React$Component) {
    (0, _inherits3.default)(TransactionError, _React$Component);

    function TransactionError() {
        var _ref;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, TransactionError);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = TransactionError.__proto__ || (0, _getPrototypeOf2.default)(TransactionError)).call.apply(_ref, [this].concat(args))), _this), _this.shouldComponentUpdate = (0, _shouldComponentUpdate2.default)(_this, 'TransactionError'), _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(TransactionError, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            var _props = this.props,
                opType = _props.opType,
                addListener = _props.addListener;

            addListener(opType);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            var _props2 = this.props,
                opType = _props2.opType,
                removeListener = _props2.removeListener;

            removeListener(opType);
        }
    }, {
        key: 'render',
        value: function render() {
            var _props3 = this.props,
                errorKey = _props3.errorKey,
                exception = _props3.exception,
                error = _props3.error;

            var cn = 'error callout alert';
            if (!errorKey && !exception) {
                if (!error) return _react2.default.createElement('span', null);
                return _react2.default.createElement(
                    'span',
                    { className: 'TransactionError' },
                    _react2.default.createElement(
                        'div',
                        { className: cn },
                        error
                    )
                );
            }
            var text = errorKey ? errorKey : exception;
            return _react2.default.createElement(
                'span',
                { className: 'TransactionError' },
                _react2.default.createElement(
                    'div',
                    { className: cn },
                    text
                )
            );
        }
    }]);
    return TransactionError;
}(_react2.default.Component), _class.propTypes = {
    // HTML properties
    opType: string.isRequired,
    error: string, // additional error (optional)

    // Redux connect properties
    addListener: func.isRequired,
    removeListener: func.isRequired,
    errorKey: string,
    exception: string
}, _temp2);
exports.default = (0, _reactRedux.connect)(
// mapStateToProps
function (state, ownProps) {
    var opType = ownProps.opType;

    var error = state.transaction.getIn(['TransactionError', opType]) || (0, _immutable.Map)();

    var _error$toJS = error.toJS(),
        key = _error$toJS.key,
        exception = _error$toJS.exception;

    return (0, _extends3.default)({}, ownProps, {
        errorKey: key,
        exception: exception
    });
},
// mapDispatchToProps
function (dispatch) {
    return {
        addListener: function addListener(opType) {
            dispatch(transactionActions.set({
                key: ['TransactionError', opType + '_listener'],
                value: true
            }));
        },
        removeListener: function removeListener(opType) {
            dispatch(transactionActions.remove({ key: ['TransactionError', opType] }));
            dispatch(transactionActions.remove({
                key: ['TransactionError', opType + '_listener']
            }));
        }
    };
})(TransactionError);
//# sourceMappingURL=TransactionError.js.map