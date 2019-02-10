'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.recoverAccount = exports.remove = exports.set = exports.dismissError = exports.deleteError = exports.error = exports.updateMeta = exports.updateAuthorities = exports.broadcastOperation = exports.hideConfirm = exports.confirmOperation = exports.RECOVER_ACCOUNT = exports.UPDATE_META = exports.UPDATE_AUTHORITIES = exports.BROADCAST_OPERATION = undefined;

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

exports.default = reducer;

var _immutable = require('immutable');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Action constants
var CONFIRM_OPERATION = 'transaction/CONFIRM_OPERATION';
var HIDE_CONFIRM = 'transaction/HIDE_CONFIRM';
var BROADCAST_OPERATION = exports.BROADCAST_OPERATION = 'transaction/BROADCAST_OPERATION';
var UPDATE_AUTHORITIES = exports.UPDATE_AUTHORITIES = 'transaction/UPDATE_AUTHORITIES';
var UPDATE_META = exports.UPDATE_META = 'transaction/UPDATE_META';
var ERROR = 'transaction/ERROR'; // Has a watcher in SagaShared
var DELETE_ERROR = 'transaction/DELETE_ERROR';
var DISMISS_ERROR = 'transaction/DISMISS_ERROR';
var SET = 'transaction/SET';
var REMOVE = 'transaction/REMOVE';
// Saga-related
var RECOVER_ACCOUNT = exports.RECOVER_ACCOUNT = 'transaction/RECOVER_ACCOUNT';
var defaultState = (0, _immutable.fromJS)({
    operations: [],
    status: { key: '', error: false, busy: false },
    errors: {
        bandwidthError: false
    }
});

function reducer() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultState;
    var action = arguments[1];

    var payload = action.payload;

    switch (action.type) {
        case CONFIRM_OPERATION:
            {
                var operation = (0, _immutable.fromJS)(payload.operation);
                var confirm = payload.confirm;
                var warning = payload.warning;
                return state.merge({
                    show_confirm_modal: true,
                    confirmBroadcastOperation: operation,
                    confirmErrorCallback: payload.errorCallback,
                    confirm: confirm,
                    warning: warning
                });
            }

        case HIDE_CONFIRM:
            return state.merge({
                show_confirm_modal: false,
                confirmBroadcastOperation: undefined,
                confirm: undefined
            });

        case BROADCAST_OPERATION:
            // See TransactionSaga.js
            return state;

        case UPDATE_AUTHORITIES:
            return state;

        case UPDATE_META:
            return state;

        case ERROR:
            {
                var _ret = function () {
                    var operations = payload.operations,
                        error = payload.error,
                        errorCallback = payload.errorCallback;


                    var errorStr = error.toString();
                    var errorKey = 'Transaction broadcast error.';
                    var _iteratorNormalCompletion = true;
                    var _didIteratorError = false;
                    var _iteratorError = undefined;

                    try {
                        for (var _iterator = (0, _getIterator3.default)(operations), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                            var _step$value = (0, _slicedToArray3.default)(_step.value, 1),
                                type /*, operation*/ = _step$value[0];

                            switch (type) {
                                case 'vote':
                                    if (/uniqueness constraint/.test(errorStr)) {
                                        errorKey = 'You already voted for this post';
                                        console.error('You already voted for this post.');
                                    }
                                    if (/Voting weight is too small/.test(errorStr)) {
                                        errorKey = 'Voting weight is too small';
                                        errorStr = 'Voting weight is too small, please accumulate more voting power or steem power.';
                                    }
                                    break;
                                case 'comment':
                                    if (/You may only post once per minute/.test(errorStr)) {
                                        errorKey = 'You may only post once per minute.';
                                    } else if (errorStr === 'Testing, fake error') errorKey = 'Testing, fake error';
                                    break;
                                case 'transfer':
                                    if (/get_balance/.test(errorStr)) {
                                        errorKey = 'Insufficient balance.';
                                    }
                                    break;
                                case 'withdraw_vesting':
                                    if (/Account registered by another account requires 10x account creation fee worth of Steem Power/.test(errorStr)) errorKey = 'Account requires 10x the account creation fee in Steem Power (approximately 30 SP) before it can power down.';
                                    break;
                                default:
                                    break;
                            }
                            if (state.hasIn(['TransactionError', type + '_listener'])) {
                                state = state.setIn(['TransactionError', type], (0, _immutable.fromJS)({ key: errorKey, exception: errorStr }));
                            } else {
                                if (error.message) {
                                    // TODO: This reformatting could be better, in most cases, errorKey and errorString end up being similar if not identical.
                                    // Depends on FC_ASSERT formatting
                                    // https://github.com/steemit/steemit.com/issues/222
                                    var err_lines = error.message.split('\n');
                                    if (err_lines.length > 2) {
                                        errorKey = err_lines[1];
                                        var txt = errorKey.split(': ');
                                        if (txt.length && txt[txt.length - 1].trim() !== '') {
                                            errorKey = errorStr = txt[txt.length - 1];
                                        } else errorStr = 'Transaction failed: ' + err_lines[1];
                                    }
                                }
                                // TODO: This would perhaps be better expressed as a Case, Switch statement.
                                // TODO: The precise reason for why this clipping needs to happen is unclear.
                                if (errorStr.length > 200) errorStr = errorStr.substring(0, 200);
                                // Catch for unknown key better error handling
                                if (/unknown key: /.test(errorKey)) {
                                    errorKey = "Steem account doesn't exist.";
                                    errorStr = "Transaction failed: Steem account doesn't exist.";
                                }
                                // Catch for invalid active authority
                                if (/Missing Active Authority /.test(errorKey)) {
                                    errorKey = 'Not your valid active key.';
                                    errorStr = 'Transaction failed: Not your valid active key.';
                                }
                                // TODO: refactor this so that the keys are consistent and sane, i.e. do not include user name in error key.
                                state = state.update('errors', function (errors) {
                                    return errors ? errors.set(errorKey, errorStr) : (0, _immutable.Map)((0, _defineProperty3.default)({}, errorKey, errorStr));
                                });
                                // Sane error key for the bandwidth error.
                                if (errorKey.includes('bandwidth') || errorStr.includes('bandwidth') || errorStr.includes('RC') // Error key for HF-20 insufficient RC error, #3001.
                                ) {
                                        state = state.setIn(['errors', 'bandwidthError'], true);
                                    }
                            }
                        }
                    } catch (err) {
                        _didIteratorError = true;
                        _iteratorError = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion && _iterator.return) {
                                _iterator.return();
                            }
                        } finally {
                            if (_didIteratorError) {
                                throw _iteratorError;
                            }
                        }
                    }

                    if (errorCallback) {
                        errorCallback(errorKey);
                    } else {
                        throw new Error('PANIC: no callback registered to handle error ' + errorKey);
                    }

                    return {
                        v: state
                    };
                }();

                if ((typeof _ret === 'undefined' ? 'undefined' : (0, _typeof3.default)(_ret)) === "object") return _ret.v;
            }

        case DELETE_ERROR:
            return state.deleteIn(['errors', payload.key]);

        case DISMISS_ERROR:
            return state.setIn(['errors', payload.key], false);

        case SET:
            return state.setIn(Array.isArray(payload.key) ? payload.key : [payload.key], (0, _immutable.fromJS)(payload.value));

        case REMOVE:
            return state.removeIn(Array.isArray(payload.key) ? payload.key : [payload.key]);

        default:
            return state;
    }
}

// Action creators
var confirmOperation = exports.confirmOperation = function confirmOperation(payload) {
    return {
        type: CONFIRM_OPERATION,
        payload: payload
    };
};

var hideConfirm = exports.hideConfirm = function hideConfirm(payload) {
    return {
        type: HIDE_CONFIRM,
        payload: payload
    };
};

var broadcastOperation = exports.broadcastOperation = function broadcastOperation(payload) {
    return {
        type: BROADCAST_OPERATION,
        payload: payload
    };
};

var updateAuthorities = exports.updateAuthorities = function updateAuthorities(payload) {
    return {
        type: UPDATE_AUTHORITIES,
        payload: payload
    };
};

var updateMeta = exports.updateMeta = function updateMeta(payload) {
    return {
        type: UPDATE_META,
        payload: payload
    };
};

var error = exports.error = function error(payload) {
    return {
        type: ERROR,
        payload: payload
    };
};

var deleteError = exports.deleteError = function deleteError(payload) {
    return {
        type: DELETE_ERROR,
        payload: payload
    };
};

var dismissError = exports.dismissError = function dismissError(payload) {
    return {
        type: DISMISS_ERROR,
        payload: payload
    };
};

var set = exports.set = function set(payload) {
    return {
        type: SET,
        payload: payload
    };
};

var remove = exports.remove = function remove(payload) {
    return {
        type: REMOVE,
        payload: payload
    };
};

var recoverAccount = exports.recoverAccount = function recoverAccount(payload) {
    return {
        type: RECOVER_ACCOUNT,
        payload: payload
    };
};
//# sourceMappingURL=TransactionReducer.js.map