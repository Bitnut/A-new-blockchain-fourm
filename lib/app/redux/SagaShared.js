'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.sharedWatches = undefined;

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

exports.getAccount = getAccount;
exports.getState = getState;
exports.getContent = getContent;

var _immutable = require('immutable');

var _effects = require('redux-saga/effects');

var _counterpart = require('counterpart');

var _counterpart2 = _interopRequireDefault(_counterpart);

var _steemJs = require('@steemit/steem-js');

var _GlobalReducer = require('./GlobalReducer');

var globalActions = _interopRequireWildcard(_GlobalReducer);

var _AppReducer = require('./AppReducer');

var appActions = _interopRequireWildcard(_AppReducer);

var _TransactionReducer = require('./TransactionReducer');

var transactionActions = _interopRequireWildcard(_TransactionReducer);

var _ServerApiClient = require('app/utils/ServerApiClient');

var _steemApi = require('app/utils/steemApi');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = /*#__PURE__*/_regenerator2.default.mark(getAccount),
    _marked2 = /*#__PURE__*/_regenerator2.default.mark(getState),
    _marked3 = /*#__PURE__*/_regenerator2.default.mark(showTransactionErrorNotification),
    _marked4 = /*#__PURE__*/_regenerator2.default.mark(getContent),
    _marked5 = /*#__PURE__*/_regenerator2.default.mark(saveUserPreferences);

var wait = function wait(ms) {
    return new _promise2.default(function (resolve) {
        setTimeout(function () {
            return resolve();
        }, ms);
    });
};

var sharedWatches = exports.sharedWatches = [(0, _effects.takeEvery)(globalActions.GET_STATE, getState), (0, _effects.takeLatest)([appActions.SET_USER_PREFERENCES, appActions.TOGGLE_NIGHTMODE, appActions.TOGGLE_BLOGMODE], saveUserPreferences), (0, _effects.takeEvery)('transaction/ERROR', showTransactionErrorNotification)];

function getAccount(username) {
    var force = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    var account, isLite, _ref, _ref2;

    return _regenerator2.default.wrap(function getAccount$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    _context.next = 2;
                    return (0, _effects.select)(function (state) {
                        return state.global.get('accounts').get(username);
                    });

                case 2:
                    account = _context.sent;


                    // hive never serves `owner` prop (among others)
                    isLite = !!account && !account.get('owner');

                    if (!(!account || force || isLite)) {
                        _context.next = 15;
                        break;
                    }

                    console.log('getAccount: loading', username, 'force?', force, 'lite?', isLite);

                    _context.next = 8;
                    return (0, _effects.call)([_steemJs.api, _steemJs.api.getAccountsAsync], [username]);

                case 8:
                    _ref = _context.sent;
                    _ref2 = (0, _slicedToArray3.default)(_ref, 1);
                    account = _ref2[0];

                    if (!account) {
                        _context.next = 15;
                        break;
                    }

                    account = (0, _immutable.fromJS)(account);
                    _context.next = 15;
                    return (0, _effects.put)(globalActions.receiveAccount({ account: account }));

                case 15:
                    return _context.abrupt('return', account);

                case 16:
                case 'end':
                    return _context.stop();
            }
        }
    }, _marked, this);
}

/** Manual refreshes.  The router is in FetchDataSaga. */
function getState(_ref3) {
    var url = _ref3.payload.url;
    var state;
    return _regenerator2.default.wrap(function getState$(_context2) {
        while (1) {
            switch (_context2.prev = _context2.next) {
                case 0:
                    _context2.prev = 0;
                    _context2.next = 3;
                    return (0, _effects.call)(_steemApi.getStateAsync, url);

                case 3:
                    state = _context2.sent;
                    _context2.next = 6;
                    return (0, _effects.put)(globalActions.receiveState(state));

                case 6:
                    _context2.next = 13;
                    break;

                case 8:
                    _context2.prev = 8;
                    _context2.t0 = _context2['catch'](0);

                    console.error('~~ Saga getState error ~~>', url, _context2.t0);
                    _context2.next = 13;
                    return (0, _effects.put)(appActions.steemApiError(_context2.t0.message));

                case 13:
                case 'end':
                    return _context2.stop();
            }
        }
    }, _marked2, this, [[0, 8]]);
}

function showTransactionErrorNotification() {
    var errors, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _step$value, key, message;

    return _regenerator2.default.wrap(function showTransactionErrorNotification$(_context3) {
        while (1) {
            switch (_context3.prev = _context3.next) {
                case 0:
                    _context3.next = 2;
                    return (0, _effects.select)(function (state) {
                        return state.transaction.get('errors');
                    });

                case 2:
                    errors = _context3.sent;
                    _iteratorNormalCompletion = true;
                    _didIteratorError = false;
                    _iteratorError = undefined;
                    _context3.prev = 6;
                    _iterator = (0, _getIterator3.default)(errors);

                case 8:
                    if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                        _context3.next = 18;
                        break;
                    }

                    _step$value = (0, _slicedToArray3.default)(_step.value, 2), key = _step$value[0], message = _step$value[1];

                    if (!(key !== 'bandwidthError')) {
                        _context3.next = 15;
                        break;
                    }

                    _context3.next = 13;
                    return (0, _effects.put)(appActions.addNotification({ key: key, message: message }));

                case 13:
                    _context3.next = 15;
                    return (0, _effects.put)(transactionActions.deleteError({ key: key }));

                case 15:
                    _iteratorNormalCompletion = true;
                    _context3.next = 8;
                    break;

                case 18:
                    _context3.next = 24;
                    break;

                case 20:
                    _context3.prev = 20;
                    _context3.t0 = _context3['catch'](6);
                    _didIteratorError = true;
                    _iteratorError = _context3.t0;

                case 24:
                    _context3.prev = 24;
                    _context3.prev = 25;

                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }

                case 27:
                    _context3.prev = 27;

                    if (!_didIteratorError) {
                        _context3.next = 30;
                        break;
                    }

                    throw _iteratorError;

                case 30:
                    return _context3.finish(27);

                case 31:
                    return _context3.finish(24);

                case 32:
                case 'end':
                    return _context3.stop();
            }
        }
    }, _marked3, this, [[6, 20, 24, 32], [25,, 27, 31]]);
}

function getContent(_ref4) {
    var author = _ref4.author,
        permlink = _ref4.permlink,
        resolve = _ref4.resolve,
        reject = _ref4.reject;
    var content;
    return _regenerator2.default.wrap(function getContent$(_context4) {
        while (1) {
            switch (_context4.prev = _context4.next) {
                case 0:
                    content = void 0;

                case 1:
                    if (content) {
                        _context4.next = 11;
                        break;
                    }

                    _context4.next = 4;
                    return (0, _effects.call)([_steemJs.api, _steemJs.api.getContentAsync], author, permlink);

                case 4:
                    content = _context4.sent;

                    if (!(content['author'] == '')) {
                        _context4.next = 9;
                        break;
                    }

                    // retry if content not found. #1870
                    content = null;
                    _context4.next = 9;
                    return (0, _effects.call)(wait, 3000);

                case 9:
                    _context4.next = 1;
                    break;

                case 11:
                    _context4.next = 13;
                    return (0, _effects.put)(globalActions.receiveContent({ content: content }));

                case 13:
                    if (resolve && content) {
                        resolve(content);
                    } else if (reject && !content) {
                        reject();
                    }

                case 14:
                case 'end':
                    return _context4.stop();
            }
        }
    }, _marked4, this);
}

/**
 * Save this user's preferences, either directly from the submitted payload or from whatever's saved in the store currently.
 *
 * @param {Object?} params.payload
 */
function saveUserPreferences(_ref5) {
    var payload = _ref5.payload;
    var prefs;
    return _regenerator2.default.wrap(function saveUserPreferences$(_context5) {
        while (1) {
            switch (_context5.prev = _context5.next) {
                case 0:
                    if (!payload) {
                        _context5.next = 3;
                        break;
                    }

                    _context5.next = 3;
                    return (0, _ServerApiClient.setUserPreferences)(payload);

                case 3:
                    _context5.next = 5;
                    return (0, _effects.select)(function (state) {
                        return state.app.get('user_preferences');
                    });

                case 5:
                    prefs = _context5.sent;
                    _context5.next = 8;
                    return (0, _ServerApiClient.setUserPreferences)(prefs.toJS());

                case 8:
                case 'end':
                    return _context5.stop();
            }
        }
    }, _marked5, this);
}
//# sourceMappingURL=SagaShared.js.map