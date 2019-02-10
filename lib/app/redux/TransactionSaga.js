'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.transactionWatches = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.preBroadcast_transfer = preBroadcast_transfer;
exports.broadcastOperation = broadcastOperation;
exports.preBroadcast_comment = preBroadcast_comment;
exports.createPermlink = createPermlink;
exports.createPatch = createPatch;
exports.recoverAccount = recoverAccount;
exports.updateAuthorities = updateAuthorities;
exports.updateMeta = updateMeta;

var _effects = require('redux-saga/effects');

var _immutable = require('immutable');

var _counterpart = require('counterpart');

var _counterpart2 = _interopRequireDefault(_counterpart);

var _speakingurl = require('speakingurl');

var _speakingurl2 = _interopRequireDefault(_speakingurl);

var _bs = require('bs58');

var _bs2 = _interopRequireDefault(_bs);

var _secureRandom = require('secure-random');

var _secureRandom2 = _interopRequireDefault(_secureRandom);

var _ecc = require('@steemit/steem-js/lib/auth/ecc');

var _steemJs = require('@steemit/steem-js');

var _SagaShared = require('app/redux/SagaShared');

var _AuthSaga = require('app/redux/AuthSaga');

var _AppReducer = require('app/redux/AppReducer');

var appActions = _interopRequireWildcard(_AppReducer);

var _GlobalReducer = require('app/redux/GlobalReducer');

var globalActions = _interopRequireWildcard(_GlobalReducer);

var _TransactionReducer = require('app/redux/TransactionReducer');

var transactionActions = _interopRequireWildcard(_TransactionReducer);

var _UserReducer = require('app/redux/UserReducer');

var userActions = _interopRequireWildcard(_UserReducer);

var _client_config = require('app/client_config');

var _ServerApiClient = require('app/utils/ServerApiClient');

var _diffMatchPatch = require('diff-match-patch');

var _diffMatchPatch2 = _interopRequireDefault(_diffMatchPatch);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = /*#__PURE__*/_regenerator2.default.mark(preBroadcast_transfer),
    _marked2 = /*#__PURE__*/_regenerator2.default.mark(preBroadcast_vote),
    _marked3 = /*#__PURE__*/_regenerator2.default.mark(preBroadcast_account_witness_vote),
    _marked4 = /*#__PURE__*/_regenerator2.default.mark(error_account_witness_vote),
    _marked5 = /*#__PURE__*/_regenerator2.default.mark(broadcastOperation),
    _marked6 = /*#__PURE__*/_regenerator2.default.mark(broadcastPayload),
    _marked7 = /*#__PURE__*/_regenerator2.default.mark(accepted_comment),
    _marked8 = /*#__PURE__*/_regenerator2.default.mark(accepted_custom_json),
    _marked9 = /*#__PURE__*/_regenerator2.default.mark(accepted_delete_comment),
    _marked10 = /*#__PURE__*/_regenerator2.default.mark(accepted_vote),
    _marked11 = /*#__PURE__*/_regenerator2.default.mark(accepted_account_witness_vote),
    _marked12 = /*#__PURE__*/_regenerator2.default.mark(accepted_withdraw_vesting),
    _marked13 = /*#__PURE__*/_regenerator2.default.mark(accepted_account_update),
    _marked14 = /*#__PURE__*/_regenerator2.default.mark(preBroadcast_comment),
    _marked15 = /*#__PURE__*/_regenerator2.default.mark(createPermlink),
    _marked16 = /*#__PURE__*/_regenerator2.default.mark(error_custom_json),
    _marked17 = /*#__PURE__*/_regenerator2.default.mark(error_vote),
    _marked18 = /*#__PURE__*/_regenerator2.default.mark(recoverAccount),
    _marked19 = /*#__PURE__*/_regenerator2.default.mark(updateAuthorities),
    _marked20 = /*#__PURE__*/_regenerator2.default.mark(updateMeta);

var transactionWatches = exports.transactionWatches = [(0, _effects.takeEvery)(transactionActions.BROADCAST_OPERATION, broadcastOperation), (0, _effects.takeEvery)(transactionActions.UPDATE_AUTHORITIES, updateAuthorities), (0, _effects.takeEvery)(transactionActions.UPDATE_META, updateMeta), (0, _effects.takeEvery)(transactionActions.RECOVER_ACCOUNT, recoverAccount)];

var hook = {
    preBroadcast_comment: preBroadcast_comment,
    preBroadcast_transfer: preBroadcast_transfer,
    preBroadcast_vote: preBroadcast_vote,
    preBroadcast_account_witness_vote: preBroadcast_account_witness_vote,
    error_vote: error_vote,
    error_custom_json: error_custom_json,
    // error_account_update,
    error_account_witness_vote: error_account_witness_vote,
    accepted_comment: accepted_comment,
    accepted_custom_json: accepted_custom_json,
    accepted_delete_comment: accepted_delete_comment,
    accepted_account_witness_vote: accepted_account_witness_vote,
    accepted_vote: accepted_vote,
    accepted_account_update: accepted_account_update,
    accepted_withdraw_vesting: accepted_withdraw_vesting
};

function preBroadcast_transfer(_ref) {
    var operation = _ref.operation;
    var memoStr, memo_private, account, memo_key;
    return _regenerator2.default.wrap(function preBroadcast_transfer$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    memoStr = operation.memo;

                    if (!memoStr) {
                        _context.next = 18;
                        break;
                    }

                    memoStr = toStringUtf8(memoStr);
                    memoStr = memoStr.trim();

                    if (!/^#/.test(memoStr)) {
                        _context.next = 18;
                        break;
                    }

                    _context.next = 7;
                    return (0, _effects.select)(function (state) {
                        return state.user.getIn(['current', 'private_keys', 'memo_private']);
                    });

                case 7:
                    memo_private = _context.sent;

                    if (memo_private) {
                        _context.next = 10;
                        break;
                    }

                    throw new Error('Unable to encrypt memo, missing memo private key');

                case 10:
                    _context.next = 12;
                    return (0, _effects.call)(_SagaShared.getAccount, operation.to);

                case 12:
                    account = _context.sent;

                    if (account) {
                        _context.next = 15;
                        break;
                    }

                    throw new Error('Unknown to account ' + operation.to);

                case 15:
                    memo_key = account.get('memo_key');

                    memoStr = _steemJs.memo.encode(memo_private, memo_key, memoStr);
                    operation.memo = memoStr;

                case 18:
                    return _context.abrupt('return', operation);

                case 19:
                case 'end':
                    return _context.stop();
            }
        }
    }, _marked, this);
}
var toStringUtf8 = function toStringUtf8(o) {
    return o ? Buffer.isBuffer(o) ? o.toString('utf-8') : o.toString() : o;
};

function preBroadcast_vote(_ref2) {
    var operation = _ref2.operation,
        username = _ref2.username;
    var voter, author, permlink, weight;
    return _regenerator2.default.wrap(function preBroadcast_vote$(_context2) {
        while (1) {
            switch (_context2.prev = _context2.next) {
                case 0:
                    if (!operation.voter) operation.voter = username;
                    voter = operation.voter, author = operation.author, permlink = operation.permlink, weight = operation.weight;
                    // give immediate feedback

                    _context2.next = 4;
                    return (0, _effects.put)(globalActions.set({
                        key: 'transaction_vote_active_' + author + '_' + permlink,
                        value: true
                    }));

                case 4:
                    _context2.next = 6;
                    return (0, _effects.put)(globalActions.voted({ username: voter, author: author, permlink: permlink, weight: weight }));

                case 6:
                    return _context2.abrupt('return', operation);

                case 7:
                case 'end':
                    return _context2.stop();
            }
        }
    }, _marked2, this);
}
function preBroadcast_account_witness_vote(_ref3) {
    var operation = _ref3.operation,
        username = _ref3.username;
    var account, witness, approve;
    return _regenerator2.default.wrap(function preBroadcast_account_witness_vote$(_context3) {
        while (1) {
            switch (_context3.prev = _context3.next) {
                case 0:
                    if (!operation.account) operation.account = username;
                    account = operation.account, witness = operation.witness, approve = operation.approve;
                    // give immediate feedback

                    _context3.next = 4;
                    return (0, _effects.put)(globalActions.addActiveWitnessVote({
                        account: account,
                        witness: witness
                    }));

                case 4:
                    return _context3.abrupt('return', operation);

                case 5:
                case 'end':
                    return _context3.stop();
            }
        }
    }, _marked3, this);
}

function error_account_witness_vote(_ref4) {
    var _ref4$operation = _ref4.operation,
        account = _ref4$operation.account,
        witness = _ref4$operation.witness,
        approve = _ref4$operation.approve;
    return _regenerator2.default.wrap(function error_account_witness_vote$(_context4) {
        while (1) {
            switch (_context4.prev = _context4.next) {
                case 0:
                    _context4.next = 2;
                    return (0, _effects.put)(globalActions.updateAccountWitnessVote({
                        account: account,
                        witness: witness,
                        approve: !approve
                    }));

                case 2:
                case 'end':
                    return _context4.stop();
            }
        }
    }, _marked4, this);
}

/** Keys, username, and password are not needed for the initial call.  This will check the login and may trigger an action to prompt for the password / key. */
function broadcastOperation(_ref5) {
    var _ref5$payload = _ref5.payload,
        type = _ref5$payload.type,
        operation = _ref5$payload.operation,
        confirm = _ref5$payload.confirm,
        warning = _ref5$payload.warning,
        keys = _ref5$payload.keys,
        username = _ref5$payload.username,
        password = _ref5$payload.password,
        successCallback = _ref5$payload.successCallback,
        errorCallback = _ref5$payload.errorCallback,
        allowPostUnsafe = _ref5$payload.allowPostUnsafe;

    var operationParam, conf, payload, _confirm, _warning, checkbox, signingKey, eventType, page;

    return _regenerator2.default.wrap(function broadcastOperation$(_context5) {
        while (1) {
            switch (_context5.prev = _context5.next) {
                case 0:
                    operationParam = {
                        type: type,
                        operation: operation,
                        keys: keys,
                        username: username,
                        password: password,
                        successCallback: successCallback,
                        errorCallback: errorCallback,
                        allowPostUnsafe: allowPostUnsafe
                    };
                    conf = typeof confirm === 'function' ? confirm() : confirm;

                    if (!conf) {
                        _context5.next = 6;
                        break;
                    }

                    _context5.next = 5;
                    return (0, _effects.put)(transactionActions.confirmOperation({
                        confirm: confirm,
                        warning: warning,
                        operation: operationParam,
                        errorCallback: errorCallback
                    }));

                case 5:
                    return _context5.abrupt('return');

                case 6:
                    payload = {
                        operations: [[type, operation]],
                        keys: keys,
                        username: username,
                        successCallback: successCallback,
                        errorCallback: errorCallback
                    };

                    if (!(!allowPostUnsafe && hasPrivateKeys(payload))) {
                        _context5.next = 15;
                        break;
                    }

                    _confirm = (0, _counterpart2.default)('g.post_key_warning.confirm');
                    _warning = (0, _counterpart2.default)('g.post_key_warning.warning');
                    checkbox = (0, _counterpart2.default)('g.post_key_warning.checkbox');

                    operationParam.allowPostUnsafe = true;
                    _context5.next = 14;
                    return (0, _effects.put)(transactionActions.confirmOperation({
                        confirm: _confirm,
                        warning: _warning,
                        checkbox: checkbox,
                        operation: operationParam,
                        errorCallback: errorCallback
                    }));

                case 14:
                    return _context5.abrupt('return');

                case 15:
                    _context5.prev = 15;

                    if (!(!keys || keys.length === 0)) {
                        _context5.next = 29;
                        break;
                    }

                    payload.keys = [];
                    // user may already be logged in, or just enterend a signing passowrd or wif
                    _context5.next = 20;
                    return (0, _effects.call)(_AuthSaga.findSigningKey, {
                        opType: type,
                        username: username,
                        password: password
                    });

                case 20:
                    signingKey = _context5.sent;

                    if (!signingKey) {
                        _context5.next = 25;
                        break;
                    }

                    payload.keys.push(signingKey);
                    _context5.next = 29;
                    break;

                case 25:
                    if (password) {
                        _context5.next = 29;
                        break;
                    }

                    _context5.next = 28;
                    return (0, _effects.put)(userActions.showLogin({
                        operation: {
                            type: type,
                            operation: operation,
                            username: username,
                            successCallback: successCallback,
                            errorCallback: errorCallback,
                            saveLogin: true
                        }
                    }));

                case 28:
                    return _context5.abrupt('return');

                case 29:
                    _context5.next = 31;
                    return (0, _effects.call)(broadcastPayload, { payload: payload });

                case 31:
                    eventType = type.replace(/^([a-z])/, function (g) {
                        return g.toUpperCase();
                    }).replace(/_([a-z])/g, function (g) {
                        return g[1].toUpperCase();
                    });

                    if (eventType === 'Comment' && !operation.parent_author) eventType = 'Post';
                    page = eventType === 'Vote' ? '@' + operation.author + '/' + operation.permlink : '';

                    (0, _ServerApiClient.serverApiRecordEvent)(eventType, page);
                    _context5.next = 41;
                    break;

                case 37:
                    _context5.prev = 37;
                    _context5.t0 = _context5['catch'](15);

                    console.error('TransactionSage', _context5.t0);
                    if (errorCallback) errorCallback(_context5.t0.toString());

                case 41:
                case 'end':
                    return _context5.stop();
            }
        }
    }, _marked5, this, [[15, 37]]);
}

function hasPrivateKeys(payload) {
    var blob = (0, _stringify2.default)(payload.operations);
    var m = void 0,
        re = /P?(5[123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{50})/g;
    while (true) {
        m = re.exec(blob);
        if (m) {
            try {
                _ecc.PrivateKey.fromWif(m[1]); // performs the base58check
                return true;
            } catch (e) {}
        } else {
            break;
        }
    }
    return false;
}

function broadcastPayload(_ref6) {
    var _ref6$payload = _ref6.payload,
        operations = _ref6$payload.operations,
        keys = _ref6$payload.keys,
        username = _ref6$payload.username,
        successCallback = _ref6$payload.successCallback,
        errorCallback = _ref6$payload.errorCallback;

    var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _step$value, type, newOps, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, _step2$value, operation, op, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, _o, broadcastedEvent, _iteratorNormalCompletion5, _didIteratorError5, _iteratorError5, _iterator5, _step5, _step5$value, config, _iteratorNormalCompletion6, _didIteratorError6, _iteratorError6, _iterator6, _step6, _step6$value;

    return _regenerator2.default.wrap(function broadcastPayload$(_context6) {
        while (1) {
            switch (_context6.prev = _context6.next) {
                case 0:
                    if (!$STM_Config.read_only_mode) {
                        _context6.next = 2;
                        break;
                    }

                    return _context6.abrupt('return');

                case 2:
                    _iteratorNormalCompletion = true;
                    _didIteratorError = false;
                    _iteratorError = undefined;
                    _context6.prev = 5;
                    _iterator = (0, _getIterator3.default)(operations);

                case 7:
                    if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                        _context6.next = 14;
                        break;
                    }

                    _step$value = (0, _slicedToArray3.default)(_step.value, 1), type = _step$value[0];
                    _context6.next = 11;
                    return (0, _effects.put)(transactionActions.remove({ key: ['TransactionError', type] }));

                case 11:
                    _iteratorNormalCompletion = true;
                    _context6.next = 7;
                    break;

                case 14:
                    _context6.next = 20;
                    break;

                case 16:
                    _context6.prev = 16;
                    _context6.t0 = _context6['catch'](5);
                    _didIteratorError = true;
                    _iteratorError = _context6.t0;

                case 20:
                    _context6.prev = 20;
                    _context6.prev = 21;

                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }

                case 23:
                    _context6.prev = 23;

                    if (!_didIteratorError) {
                        _context6.next = 26;
                        break;
                    }

                    throw _iteratorError;

                case 26:
                    return _context6.finish(23);

                case 27:
                    return _context6.finish(20);

                case 28:
                    newOps = [];
                    _iteratorNormalCompletion2 = true;
                    _didIteratorError2 = false;
                    _iteratorError2 = undefined;
                    _context6.prev = 32;
                    _iterator2 = (0, _getIterator3.default)(operations);

                case 34:
                    if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                        _context6.next = 69;
                        break;
                    }

                    _step2$value = (0, _slicedToArray3.default)(_step2.value, 2), type = _step2$value[0], operation = _step2$value[1];

                    if (!hook['preBroadcast_' + type]) {
                        _context6.next = 65;
                        break;
                    }

                    _context6.next = 39;
                    return (0, _effects.call)(hook['preBroadcast_' + type], {
                        operation: operation,
                        username: username
                    });

                case 39:
                    op = _context6.sent;

                    if (!Array.isArray(op)) {
                        _context6.next = 62;
                        break;
                    }

                    _iteratorNormalCompletion3 = true;
                    _didIteratorError3 = false;
                    _iteratorError3 = undefined;
                    _context6.prev = 44;
                    for (_iterator3 = (0, _getIterator3.default)(op); !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                        _o = _step3.value;
                        newOps.push(_o);
                    }_context6.next = 52;
                    break;

                case 48:
                    _context6.prev = 48;
                    _context6.t1 = _context6['catch'](44);
                    _didIteratorError3 = true;
                    _iteratorError3 = _context6.t1;

                case 52:
                    _context6.prev = 52;
                    _context6.prev = 53;

                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
                        _iterator3.return();
                    }

                case 55:
                    _context6.prev = 55;

                    if (!_didIteratorError3) {
                        _context6.next = 58;
                        break;
                    }

                    throw _iteratorError3;

                case 58:
                    return _context6.finish(55);

                case 59:
                    return _context6.finish(52);

                case 60:
                    _context6.next = 63;
                    break;

                case 62:
                    newOps.push([type, op]);

                case 63:
                    _context6.next = 66;
                    break;

                case 65:
                    newOps.push([type, operation]);

                case 66:
                    _iteratorNormalCompletion2 = true;
                    _context6.next = 34;
                    break;

                case 69:
                    _context6.next = 75;
                    break;

                case 71:
                    _context6.prev = 71;
                    _context6.t2 = _context6['catch'](32);
                    _didIteratorError2 = true;
                    _iteratorError2 = _context6.t2;

                case 75:
                    _context6.prev = 75;
                    _context6.prev = 76;

                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }

                case 78:
                    _context6.prev = 78;

                    if (!_didIteratorError2) {
                        _context6.next = 81;
                        break;
                    }

                    throw _iteratorError2;

                case 81:
                    return _context6.finish(78);

                case 82:
                    return _context6.finish(75);

                case 83:
                    operations = newOps;

                    // status: broadcasting
                    broadcastedEvent = function broadcastedEvent() {
                        var _iteratorNormalCompletion4 = true;
                        var _didIteratorError4 = false;
                        var _iteratorError4 = undefined;

                        try {
                            for (var _iterator4 = (0, _getIterator3.default)(operations), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                                var _step4$value = (0, _slicedToArray3.default)(_step4.value, 2),
                                    type = _step4$value[0],
                                    operation = _step4$value[1];

                                if (hook['broadcasted_' + type]) {
                                    try {
                                        hook['broadcasted_' + type]({ operation: operation });
                                    } catch (error) {
                                        console.error(error);
                                    }
                                }
                            }
                        } catch (err) {
                            _didIteratorError4 = true;
                            _iteratorError4 = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion4 && _iterator4.return) {
                                    _iterator4.return();
                                }
                            } finally {
                                if (_didIteratorError4) {
                                    throw _iteratorError4;
                                }
                            }
                        }
                    };

                    _context6.prev = 85;
                    _context6.next = 88;
                    return new _promise2.default(function (resolve, reject) {
                        // Bump transaction (for live UI testing).. Put 0 in now (no effect),
                        // to enable browser's autocomplete and help prevent typos.
                        var env = process.env;
                        var bump = env.BROWSER ? parseInt(localStorage.getItem('bump') || 0) : 0;
                        if (env.BROWSER && bump === 1) {
                            // for testing
                            console.log('TransactionSaga bump(no broadcast) and reject', (0, _stringify2.default)(operations, null, 2));
                            setTimeout(function () {
                                reject(new Error('Testing, fake error'));
                            }, 2000);
                        } else if (env.BROWSER && bump === 2) {
                            // also for testing
                            console.log('TransactionSaga bump(no broadcast) and resolve', (0, _stringify2.default)(operations, null, 2));
                            setTimeout(function () {
                                resolve();
                                broadcastedEvent();
                            }, 2000);
                        } else {
                            _steemJs.broadcast.send({ extensions: [], operations: operations }, keys, function (err) {
                                if (err) {
                                    console.error(err);
                                    reject(err);
                                } else {
                                    broadcastedEvent();
                                    resolve();
                                }
                            });
                        }
                    });

                case 88:
                    // status: accepted
                    _iteratorNormalCompletion5 = true;
                    _didIteratorError5 = false;
                    _iteratorError5 = undefined;
                    _context6.prev = 91;
                    _iterator5 = (0, _getIterator3.default)(operations);

                case 93:
                    if (_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done) {
                        _context6.next = 111;
                        break;
                    }

                    _step5$value = (0, _slicedToArray3.default)(_step5.value, 2), type = _step5$value[0], operation = _step5$value[1];

                    if (!hook['accepted_' + type]) {
                        _context6.next = 104;
                        break;
                    }

                    _context6.prev = 96;
                    _context6.next = 99;
                    return (0, _effects.call)(hook['accepted_' + type], { operation: operation });

                case 99:
                    _context6.next = 104;
                    break;

                case 101:
                    _context6.prev = 101;
                    _context6.t3 = _context6['catch'](96);

                    console.error(_context6.t3);

                case 104:
                    config = operation.__config;

                    if (!(config && config.successMessage)) {
                        _context6.next = 108;
                        break;
                    }

                    _context6.next = 108;
                    return (0, _effects.put)(appActions.addNotification({
                        key: 'trx_' + Date.now(),
                        message: config.successMessage,
                        dismissAfter: 5000
                    }));

                case 108:
                    _iteratorNormalCompletion5 = true;
                    _context6.next = 93;
                    break;

                case 111:
                    _context6.next = 117;
                    break;

                case 113:
                    _context6.prev = 113;
                    _context6.t4 = _context6['catch'](91);
                    _didIteratorError5 = true;
                    _iteratorError5 = _context6.t4;

                case 117:
                    _context6.prev = 117;
                    _context6.prev = 118;

                    if (!_iteratorNormalCompletion5 && _iterator5.return) {
                        _iterator5.return();
                    }

                case 120:
                    _context6.prev = 120;

                    if (!_didIteratorError5) {
                        _context6.next = 123;
                        break;
                    }

                    throw _iteratorError5;

                case 123:
                    return _context6.finish(120);

                case 124:
                    return _context6.finish(117);

                case 125:
                    if (successCallback) try {
                        successCallback();
                    } catch (error) {
                        console.error(error);
                    }
                    _context6.next = 166;
                    break;

                case 128:
                    _context6.prev = 128;
                    _context6.t5 = _context6['catch'](85);

                    console.error('TransactionSaga\tbroadcastPayload', _context6.t5);
                    // status: error
                    _context6.next = 133;
                    return (0, _effects.put)(transactionActions.error({ operations: operations, error: _context6.t5, errorCallback: errorCallback }));

                case 133:
                    _iteratorNormalCompletion6 = true;
                    _didIteratorError6 = false;
                    _iteratorError6 = undefined;
                    _context6.prev = 136;
                    _iterator6 = (0, _getIterator3.default)(operations);

                case 138:
                    if (_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done) {
                        _context6.next = 152;
                        break;
                    }

                    _step6$value = (0, _slicedToArray3.default)(_step6.value, 2), type = _step6$value[0], operation = _step6$value[1];

                    if (!hook['error_' + type]) {
                        _context6.next = 149;
                        break;
                    }

                    _context6.prev = 141;
                    _context6.next = 144;
                    return (0, _effects.call)(hook['error_' + type], { operation: operation });

                case 144:
                    _context6.next = 149;
                    break;

                case 146:
                    _context6.prev = 146;
                    _context6.t6 = _context6['catch'](141);

                    console.error(_context6.t6);

                case 149:
                    _iteratorNormalCompletion6 = true;
                    _context6.next = 138;
                    break;

                case 152:
                    _context6.next = 158;
                    break;

                case 154:
                    _context6.prev = 154;
                    _context6.t7 = _context6['catch'](136);
                    _didIteratorError6 = true;
                    _iteratorError6 = _context6.t7;

                case 158:
                    _context6.prev = 158;
                    _context6.prev = 159;

                    if (!_iteratorNormalCompletion6 && _iterator6.return) {
                        _iterator6.return();
                    }

                case 161:
                    _context6.prev = 161;

                    if (!_didIteratorError6) {
                        _context6.next = 164;
                        break;
                    }

                    throw _iteratorError6;

                case 164:
                    return _context6.finish(161);

                case 165:
                    return _context6.finish(158);

                case 166:
                case 'end':
                    return _context6.stop();
            }
        }
    }, _marked6, this, [[5, 16, 20, 28], [21,, 23, 27], [32, 71, 75, 83], [44, 48, 52, 60], [53,, 55, 59], [76,, 78, 82], [85, 128], [91, 113, 117, 125], [96, 101], [118,, 120, 124], [136, 154, 158, 166], [141, 146], [159,, 161, 165]]);
}

function accepted_comment(_ref7) {
    var operation = _ref7.operation;
    var author, permlink;
    return _regenerator2.default.wrap(function accepted_comment$(_context7) {
        while (1) {
            switch (_context7.prev = _context7.next) {
                case 0:
                    author = operation.author, permlink = operation.permlink;
                    // update again with new $$ amount from the steemd node

                    _context7.next = 3;
                    return (0, _effects.call)(_SagaShared.getContent, { author: author, permlink: permlink });

                case 3:
                    _context7.next = 5;
                    return (0, _effects.put)(globalActions.linkReply(operation));

                case 5:
                case 'end':
                    return _context7.stop();
            }
        }
    }, _marked7, this);
}

function updateFollowState(action, following, state) {
    if (action == null) {
        state = state.update('blog_result', (0, _immutable.Set)(), function (r) {
            return r.delete(following);
        });
        state = state.update('ignore_result', (0, _immutable.Set)(), function (r) {
            return r.delete(following);
        });
    } else if (action === 'blog') {
        state = state.update('blog_result', (0, _immutable.Set)(), function (r) {
            return r.add(following);
        });
        state = state.update('ignore_result', (0, _immutable.Set)(), function (r) {
            return r.delete(following);
        });
    } else if (action === 'ignore') {
        state = state.update('ignore_result', (0, _immutable.Set)(), function (r) {
            return r.add(following);
        });
        state = state.update('blog_result', (0, _immutable.Set)(), function (r) {
            return r.delete(following);
        });
    }
    state = state.set('blog_count', state.get('blog_result', (0, _immutable.Set)()).size);
    state = state.set('ignore_count', state.get('ignore_result', (0, _immutable.Set)()).size);
    return state;
}

function accepted_custom_json(_ref8) {
    var operation = _ref8.operation;

    var json, _json$, follower, following, _json$$what, action;

    return _regenerator2.default.wrap(function accepted_custom_json$(_context8) {
        while (1) {
            switch (_context8.prev = _context8.next) {
                case 0:
                    json = JSON.parse(operation.json);

                    if (!(operation.id === 'follow')) {
                        _context8.next = 13;
                        break;
                    }

                    console.log(operation);
                    _context8.prev = 3;

                    if (!(json[0] === 'follow')) {
                        _context8.next = 8;
                        break;
                    }

                    _json$ = json[1], follower = _json$.follower, following = _json$.following, _json$$what = (0, _slicedToArray3.default)(_json$.what, 1), action = _json$$what[0];
                    _context8.next = 8;
                    return (0, _effects.put)(globalActions.update({
                        key: ['follow', 'getFollowingAsync', follower],
                        notSet: (0, _immutable.Map)(),
                        updater: function updater(m) {
                            return updateFollowState(action, following, m);
                        }
                    }));

                case 8:
                    _context8.next = 13;
                    break;

                case 10:
                    _context8.prev = 10;
                    _context8.t0 = _context8['catch'](3);

                    console.error('TransactionSaga unrecognized follow custom_json format', operation.json);

                case 13:
                    return _context8.abrupt('return', operation);

                case 14:
                case 'end':
                    return _context8.stop();
            }
        }
    }, _marked8, this, [[3, 10]]);
}

function accepted_delete_comment(_ref9) {
    var operation = _ref9.operation;
    return _regenerator2.default.wrap(function accepted_delete_comment$(_context9) {
        while (1) {
            switch (_context9.prev = _context9.next) {
                case 0:
                    _context9.next = 2;
                    return (0, _effects.put)(globalActions.deleteContent(operation));

                case 2:
                case 'end':
                    return _context9.stop();
            }
        }
    }, _marked9, this);
}

function accepted_vote(_ref10) {
    var _ref10$operation = _ref10.operation,
        author = _ref10$operation.author,
        permlink = _ref10$operation.permlink,
        weight = _ref10$operation.weight;
    return _regenerator2.default.wrap(function accepted_vote$(_context10) {
        while (1) {
            switch (_context10.prev = _context10.next) {
                case 0:
                    console.log('Vote accepted, weight', weight, 'on', author + '/' + permlink, 'weight');
                    // update again with new $$ amount from the steemd node
                    _context10.next = 3;
                    return (0, _effects.put)(globalActions.remove({
                        key: 'transaction_vote_active_' + author + '_' + permlink
                    }));

                case 3:
                    _context10.next = 5;
                    return (0, _effects.call)(_SagaShared.getContent, { author: author, permlink: permlink });

                case 5:
                case 'end':
                    return _context10.stop();
            }
        }
    }, _marked10, this);
}

function accepted_account_witness_vote(_ref11) {
    var _ref11$operation = _ref11.operation,
        account = _ref11$operation.account,
        witness = _ref11$operation.witness,
        approve = _ref11$operation.approve;
    return _regenerator2.default.wrap(function accepted_account_witness_vote$(_context11) {
        while (1) {
            switch (_context11.prev = _context11.next) {
                case 0:
                    _context11.next = 2;
                    return (0, _effects.put)(globalActions.updateAccountWitnessVote({ account: account, witness: witness, approve: approve }));

                case 2:
                    _context11.next = 4;
                    return (0, _effects.put)(globalActions.removeActiveWitnessVote({
                        account: account,
                        witness: witness
                    }));

                case 4:
                case 'end':
                    return _context11.stop();
            }
        }
    }, _marked11, this);
}

function accepted_withdraw_vesting(_ref12) {
    var operation = _ref12.operation;

    var _ref13, _ref14, account;

    return _regenerator2.default.wrap(function accepted_withdraw_vesting$(_context12) {
        while (1) {
            switch (_context12.prev = _context12.next) {
                case 0:
                    _context12.next = 2;
                    return (0, _effects.call)([_steemJs.api, _steemJs.api.getAccountsAsync], [operation.account]);

                case 2:
                    _ref13 = _context12.sent;
                    _ref14 = (0, _slicedToArray3.default)(_ref13, 1);
                    account = _ref14[0];

                    account = (0, _immutable.fromJS)(account);
                    _context12.next = 8;
                    return (0, _effects.put)(globalActions.receiveAccount({ account: account }));

                case 8:
                case 'end':
                    return _context12.stop();
            }
        }
    }, _marked12, this);
}

function accepted_account_update(_ref15) {
    var operation = _ref15.operation;

    var _ref16, _ref17, account;

    return _regenerator2.default.wrap(function accepted_account_update$(_context13) {
        while (1) {
            switch (_context13.prev = _context13.next) {
                case 0:
                    _context13.next = 2;
                    return (0, _effects.call)([_steemJs.api, _steemJs.api.getAccountsAsync], [operation.account]);

                case 2:
                    _ref16 = _context13.sent;
                    _ref17 = (0, _slicedToArray3.default)(_ref16, 1);
                    account = _ref17[0];

                    account = (0, _immutable.fromJS)(account);
                    _context13.next = 8;
                    return (0, _effects.put)(globalActions.receiveAccount({ account: account }));

                case 8:
                case 'end':
                    return _context13.stop();
            }
        }
    }, _marked13, this);
}

// TODO remove soon, this was replaced by the UserKeys edit running usernamePasswordLogin (on dialog close)
// function* error_account_update({operation}) {
//     const {account} = operation
//     const stateUser = yield select(state => state.user)
//     const username = stateUser.getIn(['current', 'username'])
//     if (username === account) {
//         const pending_private_key = stateUser.getIn(['current', 'pending_private_key'])
//         if (pending_private_key) {
//             // remove pending key
//             const update = { pending_private_key: undefined }
//             yield put(user.actions.setUser(update))
//         }
//     }
// }

// function* preBroadcast_account_witness_vote({operation, username}) {
// }
function preBroadcast_comment(_ref18) {
    var operation = _ref18.operation,
        username = _ref18.username;

    var permlink, author, _operation$__config, originalBody, comment_options, _operation$parent_aut, parent_author, _operation$parent_per, parent_permlink, title, body, body2, patch, md, json_metadata, op, comment_op, _comment_options$max_, max_accepted_payout, _comment_options$perc, percent_steem_dollars, _comment_options$allo, allow_votes, _comment_options$allo2, allow_curation_rewards;

    return _regenerator2.default.wrap(function preBroadcast_comment$(_context14) {
        while (1) {
            switch (_context14.prev = _context14.next) {
                case 0:
                    if (!operation.author) operation.author = username;
                    permlink = operation.permlink;
                    author = operation.author, _operation$__config = operation.__config, originalBody = _operation$__config.originalBody, comment_options = _operation$__config.comment_options;
                    _operation$parent_aut = operation.parent_author, parent_author = _operation$parent_aut === undefined ? '' : _operation$parent_aut, _operation$parent_per = operation.parent_permlink, parent_permlink = _operation$parent_per === undefined ? operation.category : _operation$parent_per;
                    title = operation.title;
                    body = operation.body;


                    body = body.trim();

                    // TODO Slightly smaller blockchain comments: if body === json_metadata.steem.link && Object.keys(steem).length > 1 remove steem.link ..This requires an adjust of get_state and the API refresh of the comment to put the steem.link back if Object.keys(steem).length >= 1

                    body2 = void 0;

                    if (originalBody) {
                        patch = createPatch(originalBody, body);
                        // Putting body into buffer will expand Unicode characters into their true length

                        if (patch && patch.length < new Buffer(body, 'utf-8').length) body2 = patch;
                    }
                    if (!body2) body2 = body;

                    if (permlink) {
                        _context14.next = 14;
                        break;
                    }

                    _context14.next = 13;
                    return createPermlink(title, author, parent_author, parent_permlink);

                case 13:
                    permlink = _context14.sent;

                case 14:
                    md = operation.json_metadata;
                    json_metadata = typeof md === 'string' ? md : (0, _stringify2.default)(md);
                    op = (0, _extends3.default)({}, operation, {
                        permlink: permlink.toLowerCase(),
                        parent_author: parent_author,
                        parent_permlink: parent_permlink,
                        json_metadata: json_metadata,
                        title: new Buffer((operation.title || '').trim(), 'utf-8'),
                        body: new Buffer(body2, 'utf-8')
                    });
                    comment_op = [['comment', op]];

                    // comment_options must come directly after comment

                    if (comment_options) {
                        _comment_options$max_ = comment_options.max_accepted_payout, max_accepted_payout = _comment_options$max_ === undefined ? ['1000000.000', _client_config.DEBT_TICKER].join(' ') : _comment_options$max_, _comment_options$perc = comment_options.percent_steem_dollars, percent_steem_dollars = _comment_options$perc === undefined ? 10000 : _comment_options$perc, _comment_options$allo = comment_options.allow_votes, allow_votes = _comment_options$allo === undefined ? true : _comment_options$allo, _comment_options$allo2 = comment_options.allow_curation_rewards, allow_curation_rewards = _comment_options$allo2 === undefined ? true : _comment_options$allo2;

                        comment_op.push(['comment_options', {
                            author: author,
                            permlink: permlink,
                            max_accepted_payout: max_accepted_payout,
                            percent_steem_dollars: percent_steem_dollars,
                            allow_votes: allow_votes,
                            allow_curation_rewards: allow_curation_rewards,
                            extensions: comment_options.extensions ? comment_options.extensions : []
                        }]);
                    }

                    return _context14.abrupt('return', comment_op);

                case 20:
                case 'end':
                    return _context14.stop();
            }
        }
    }, _marked14, this);
}

function createPermlink(title, author, parent_author, parent_permlink) {
    var permlink, s, slugState, prefix, timeStr;
    return _regenerator2.default.wrap(function createPermlink$(_context15) {
        while (1) {
            switch (_context15.prev = _context15.next) {
                case 0:
                    permlink = void 0;

                    if (!(title && title.trim() !== '')) {
                        _context15.next = 12;
                        break;
                    }

                    s = slug(title);

                    if (s === '') {
                        s = _bs2.default.encode(_secureRandom2.default.randomBuffer(4));
                    }
                    // ensure the permlink(slug) is unique
                    _context15.next = 6;
                    return (0, _effects.call)([_steemJs.api, _steemJs.api.getContentAsync], author, s);

                case 6:
                    slugState = _context15.sent;
                    prefix = void 0;

                    if (slugState.body !== '') {
                        // make sure slug is unique
                        prefix = _bs2.default.encode(_secureRandom2.default.randomBuffer(4)) + '-';
                    } else {
                        prefix = '';
                    }
                    permlink = prefix + s;
                    _context15.next = 15;
                    break;

                case 12:
                    // comments: re-parentauthor-parentpermlink-time
                    timeStr = new Date().toISOString().replace(/[^a-zA-Z0-9]+/g, '');

                    parent_permlink = parent_permlink.replace(/(-\d{8}t\d{9}z)/g, '');
                    permlink = 're-' + parent_author + '-' + parent_permlink + '-' + timeStr;

                case 15:
                    if (permlink.length > 255) {
                        // STEEMIT_MAX_PERMLINK_LENGTH
                        permlink = permlink.substring(permlink.length - 255, permlink.length);
                    }
                    // only letters numbers and dashes shall survive
                    permlink = permlink.toLowerCase().replace(/[^a-z0-9-]+/g, '');
                    return _context15.abrupt('return', permlink);

                case 18:
                case 'end':
                    return _context15.stop();
            }
        }
    }, _marked15, this);
}

var dmp = new _diffMatchPatch2.default();

function createPatch(text1, text2) {
    if (!text1 && text1 === '') return undefined;
    var patches = dmp.patch_make(text1, text2);
    var patch = dmp.patch_toText(patches);
    return patch;
}

function error_custom_json(_ref19) {
    var _ref19$operation = _ref19.operation,
        id = _ref19$operation.id,
        required_posting_auths = _ref19$operation.required_posting_auths;
    var follower;
    return _regenerator2.default.wrap(function error_custom_json$(_context16) {
        while (1) {
            switch (_context16.prev = _context16.next) {
                case 0:
                    if (!(id === 'follow')) {
                        _context16.next = 4;
                        break;
                    }

                    follower = required_posting_auths[0];
                    _context16.next = 4;
                    return (0, _effects.put)(globalActions.update({
                        key: ['follow', 'getFollowingAsync', follower, 'loading'],
                        updater: function updater() {
                            return null;
                        }
                    }));

                case 4:
                case 'end':
                    return _context16.stop();
            }
        }
    }, _marked16, this);
}

function error_vote(_ref20) {
    var _ref20$operation = _ref20.operation,
        author = _ref20$operation.author,
        permlink = _ref20$operation.permlink;
    return _regenerator2.default.wrap(function error_vote$(_context17) {
        while (1) {
            switch (_context17.prev = _context17.next) {
                case 0:
                    _context17.next = 2;
                    return (0, _effects.put)(globalActions.remove({
                        key: 'transaction_vote_active_' + author + '_' + permlink
                    }));

                case 2:
                    _context17.next = 4;
                    return (0, _effects.call)(_SagaShared.getContent, { author: author, permlink: permlink });

                case 4:
                case 'end':
                    return _context17.stop();
            }
        }
    }, _marked17, this);
}

// function* error_comment({operation}) {
//     // Rollback an immediate UI update (the transaction had an error)
//     yield put(g.actions.deleteContent(operation))
//     const {author, permlink, parent_author, parent_permlink} = operation
//     yield call(getContent, {author, permlink})
//     if (parent_author !== '' && parent_permlink !== '') {
//         yield call(getContent, {parent_author, parent_permlink})
//     }
// }

function slug(text) {
    return (0, _speakingurl2.default)(text.replace(/[<>]/g, ''), { truncate: 128 });
    //const shorten = txt => {
    //    let t = ''
    //    let words = 0
    //    const txt2 = txt.replace(/ +/g, ' ') // only 1 space in a row
    //    for (let i = 0; i < txt2.length; i++) {
    //        const ch = txt2.charAt(i)
    //        if (ch === '.' && i !== 0) {
    //            if(i === txt2.length - 1)
    //                break
    //            // If it looks like the end of a sentence
    //            if(txt2.charAt(i + 1) === ' ')
    //                break
    //        }
    //        if (ch === ' ' || ch === '\n') {
    //            words++
    //            if (words === 15) break
    //            if (i > 100) break
    //        }
    //        t += ch
    //    }
    //    return t
    //}
    //return shorten(text)
    //    .replace(/\n/g, ' ')
    //    .replace(/[ \.]/g, '-')
    //    .replace(/[^a-zA-Z0-9-_]+/g, '') // only letters and numbers _ and -
    //    .replace(/--/g, '-')
    //    .toLowerCase()
}

var pwPubkey = function pwPubkey(name, pw, role) {
    return _steemJs.auth.wifToPublic(_steemJs.auth.toWif(name, pw.trim(), role));
};

function recoverAccount(_ref21) {
    var _ref21$payload = _ref21.payload,
        account_to_recover = _ref21$payload.account_to_recover,
        old_password = _ref21$payload.old_password,
        new_password = _ref21$payload.new_password,
        onError = _ref21$payload.onError,
        onSuccess = _ref21$payload.onSuccess;

    var _ref22, _ref23, account, oldOwnerPrivate, oldOwner, newOwnerPrivate, newOwner, newActive, newPosting, newMemo, new_owner_authority, recent_owner_authority, json_metadata, outgoingAutoVestingRoutes;

    return _regenerator2.default.wrap(function recoverAccount$(_context18) {
        while (1) {
            switch (_context18.prev = _context18.next) {
                case 0:
                    _context18.next = 2;
                    return (0, _effects.call)([_steemJs.api, _steemJs.api.getAccountsAsync], [account_to_recover]);

                case 2:
                    _ref22 = _context18.sent;
                    _ref23 = (0, _slicedToArray3.default)(_ref22, 1);
                    account = _ref23[0];

                    if (account) {
                        _context18.next = 8;
                        break;
                    }

                    onError('Unknown account ' + account);
                    return _context18.abrupt('return');

                case 8:
                    if (!_steemJs.auth.isWif(new_password)) {
                        _context18.next = 11;
                        break;
                    }

                    onError('Your new password should not be a WIF');
                    return _context18.abrupt('return');

                case 11:
                    if (!_steemJs.auth.isPubkey(new_password)) {
                        _context18.next = 14;
                        break;
                    }

                    onError('Your new password should not be a Public Key');
                    return _context18.abrupt('return');

                case 14:
                    oldOwnerPrivate = _steemJs.auth.isWif(old_password) ? old_password : _steemJs.auth.toWif(account_to_recover, old_password, 'owner');
                    oldOwner = _steemJs.auth.wifToPublic(oldOwnerPrivate);
                    newOwnerPrivate = _steemJs.auth.toWif(account_to_recover, new_password.trim(), 'owner');
                    newOwner = _steemJs.auth.wifToPublic(newOwnerPrivate);
                    newActive = pwPubkey(account_to_recover, new_password.trim(), 'active');
                    newPosting = pwPubkey(account_to_recover, new_password.trim(), 'posting');
                    newMemo = pwPubkey(account_to_recover, new_password.trim(), 'memo');
                    new_owner_authority = {
                        weight_threshold: 1,
                        account_auths: [],
                        key_auths: [[newOwner, 1]]
                    };
                    recent_owner_authority = {
                        weight_threshold: 1,
                        account_auths: [],
                        key_auths: [[oldOwner, 1]]
                    };
                    _context18.prev = 23;
                    _context18.next = 26;
                    return _steemJs.broadcast.sendAsync({
                        extensions: [],
                        operations: [['recover_account', {
                            account_to_recover: account_to_recover,
                            new_owner_authority: new_owner_authority,
                            recent_owner_authority: recent_owner_authority
                        }]]
                    }, [oldOwnerPrivate, newOwnerPrivate]);

                case 26:

                    // change password
                    // change password probably requires a separate transaction (single trx has not been tested)
                    json_metadata = account.json_metadata;
                    // TODO: Investigate wrapping in a redux-saga call fn, so it can be tested!

                    _context18.next = 29;
                    return _steemJs.broadcast.sendAsync({
                        extensions: [],
                        operations: [['account_update', {
                            account: account.name,
                            active: {
                                weight_threshold: 1,
                                account_auths: [],
                                key_auths: [[newActive, 1]]
                            },
                            posting: {
                                weight_threshold: 1,
                                account_auths: [],
                                key_auths: [[newPosting, 1]]
                            },
                            memo_key: newMemo,
                            json_metadata: json_metadata
                        }]]
                    }, [newOwnerPrivate]);

                case 29:
                    _context18.next = 31;
                    return (0, _effects.call)([_steemJs.api, _steemJs.api.getWithdrawRoutes], [account.name, 'outgoing']);

                case 31:
                    outgoingAutoVestingRoutes = _context18.sent;

                    if (!(outgoingAutoVestingRoutes && outgoingAutoVestingRoutes.length > 0)) {
                        _context18.next = 35;
                        break;
                    }

                    _context18.next = 35;
                    return (0, _effects.all)(outgoingAutoVestingRoutes.map(function (ovr) {
                        return (0, _effects.call)([_steemJs.broadcast, _steemJs.broadcast.setWithdrawVestingRoute], [newActive, ovr.from_account, ovr.to_account, 0, true]);
                    }));

                case 35:
                    if (onSuccess) onSuccess();
                    _context18.next = 42;
                    break;

                case 38:
                    _context18.prev = 38;
                    _context18.t0 = _context18['catch'](23);

                    console.error('Recover account', _context18.t0);
                    if (onError) onError(_context18.t0);

                case 42:
                case 'end':
                    return _context18.stop();
            }
        }
    }, _marked18, this, [[23, 38]]);
}

/** auths must start with most powerful key: owner for example */
// const twofaAccount = 'steem'
function updateAuthorities(_ref24) {
    var _ref24$payload = _ref24.payload,
        accountName = _ref24$payload.accountName,
        signingKey = _ref24$payload.signingKey,
        auths = _ref24$payload.auths,
        twofa = _ref24$payload.twofa,
        onSuccess = _ref24$payload.onSuccess,
        onError = _ref24$payload.onError;

    var _ref25, _ref26, account, ops2, oldPrivate, addAuth, _iteratorNormalCompletion7, _didIteratorError7, _iteratorError7, _iterator7, _step7, _auth2, key, _auth, memo_key, json_metadata, payload;

    return _regenerator2.default.wrap(function updateAuthorities$(_context19) {
        while (1) {
            switch (_context19.prev = _context19.next) {
                case 0:
                    _context19.next = 2;
                    return (0, _effects.call)([_steemJs.api, _steemJs.api.getAccountsAsync], [accountName]);

                case 2:
                    _ref25 = _context19.sent;
                    _ref26 = (0, _slicedToArray3.default)(_ref25, 1);
                    account = _ref26[0];

                    if (account) {
                        _context19.next = 8;
                        break;
                    }

                    onError('Account not found');
                    return _context19.abrupt('return');

                case 8:
                    // const signingPubkey = signingKey ? signingKey.toPublicKey() : null
                    ops2 = {};
                    oldPrivate = void 0;

                    addAuth = function addAuth(authType, oldAuth, newAuth) {
                        var oldAuthPubkey = void 0,
                            oldPrivateAuth = void 0;
                        try {
                            oldPrivateAuth = _ecc.PrivateKey.fromWif(oldAuth);
                            oldAuthPubkey = oldPrivateAuth.toPublic().toString();
                        } catch (e) {
                            try {
                                oldAuthPubkey = _ecc.PublicKey.fromStringOrThrow(oldAuth).toString();
                            } catch (e2) {
                                //
                            }
                        }
                        if (!oldAuthPubkey) {
                            if (!oldAuth) {
                                onError('Missing old key, not sure what to replace');
                                console.error('Missing old key, not sure what to replace');
                                return false;
                            }
                            oldPrivateAuth = _ecc.PrivateKey.fromSeed(accountName + authType + oldAuth);
                            oldAuthPubkey = oldPrivateAuth.toPublicKey().toString();
                        }
                        if (authType === 'owner' && !oldPrivate) oldPrivate = oldPrivateAuth;else if (authType === 'active' && !oldPrivate) oldPrivate = oldPrivateAuth;else if (authType === 'posting' && !oldPrivate) oldPrivate = oldPrivateAuth;

                        var newPrivate = void 0,
                            newAuthPubkey = void 0;
                        try {
                            newPrivate = _ecc.PrivateKey.fromWif(newAuth);
                            newAuthPubkey = newPrivate.toPublicKey().toString();
                        } catch (e) {
                            newPrivate = _ecc.PrivateKey.fromSeed(accountName + authType + newAuth);
                            newAuthPubkey = newPrivate.toPublicKey().toString();
                        }
                        // if (oldAuthPubkey === newAuthPubkey) {
                        //     onError('This is the same key')
                        //     return false
                        // }
                        var authority = void 0;
                        if (authType === 'memo') {
                            account.memo_key = newAuthPubkey;
                        } else {
                            authority = (0, _immutable.fromJS)(account[authType]).toJS();
                            authority.key_auths = [];
                            authority.key_auths.push([newAuthPubkey, authority.weight_threshold]);
                            // const key_auths = authority.key_auths
                            // let found
                            // for (let i = 0; i < key_auths.length; i++) {
                            //     if (key_auths[i][0] === oldAuthPubkey) {
                            //         key_auths[i][0] = newAuthPubkey
                            //         found = true
                            //         break
                            //     }
                            // }
                            // if (!found) {
                            // key_auths.push([newAuthPubkey, authority.weight_threshold])
                            //     console.log(`Could not find an ${authType} key to update, adding instead`)
                            // }

                            // Add twofaAccount with full authority
                            // if(twofa && authType === 'owner') {
                            //     let account_auths = fromJS(authority.account_auths)
                            //     if(!account_auths.find(v => v.get(0) === twofaAccount)) {
                            //         account_auths = account_auths.push(fromJS([twofaAccount, authority.weight_threshold]))
                            //     }
                            //     authority.account_auths = account_auths.toJS()
                            // }
                        }
                        ops2[authType] = authority ? authority : account[authType];
                        return true;
                    };

                    _iteratorNormalCompletion7 = true;
                    _didIteratorError7 = false;
                    _iteratorError7 = undefined;
                    _context19.prev = 14;
                    _iterator7 = (0, _getIterator3.default)(auths);

                case 16:
                    if (_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done) {
                        _context19.next = 23;
                        break;
                    }

                    _auth2 = _step7.value;

                    if (addAuth(_auth2.authType, _auth2.oldAuth, _auth2.newAuth)) {
                        _context19.next = 20;
                        break;
                    }

                    return _context19.abrupt('return');

                case 20:
                    _iteratorNormalCompletion7 = true;
                    _context19.next = 16;
                    break;

                case 23:
                    _context19.next = 29;
                    break;

                case 25:
                    _context19.prev = 25;
                    _context19.t0 = _context19['catch'](14);
                    _didIteratorError7 = true;
                    _iteratorError7 = _context19.t0;

                case 29:
                    _context19.prev = 29;
                    _context19.prev = 30;

                    if (!_iteratorNormalCompletion7 && _iterator7.return) {
                        _iterator7.return();
                    }

                case 32:
                    _context19.prev = 32;

                    if (!_didIteratorError7) {
                        _context19.next = 35;
                        break;
                    }

                    throw _iteratorError7;

                case 35:
                    return _context19.finish(32);

                case 36:
                    return _context19.finish(29);

                case 37:
                    key = oldPrivate;

                    if (!key) {
                        try {
                            key = _ecc.PrivateKey.fromWif(signingKey);
                        } catch (e2) {
                            // probably updating a memo .. see if we got an active or owner
                            _auth = function _auth(authType) {
                                var priv = _ecc.PrivateKey.fromSeed(accountName + authType + signingKey);
                                var pubkey = priv.toPublicKey().toString();
                                var authority = account[authType];
                                var key_auths = authority.key_auths;
                                for (var i = 0; i < key_auths.length; i++) {
                                    if (key_auths[i][0] === pubkey) {
                                        return priv;
                                    }
                                }
                                return null;
                            };

                            key = _auth('active');
                            if (!key) key = _auth('owner');
                        }
                    }

                    if (key) {
                        _context19.next = 42;
                        break;
                    }

                    onError('Incorrect Password');
                    throw new Error('Trying to update a memo without a signing key?');

                case 42:
                    memo_key = account.memo_key, json_metadata = account.json_metadata;
                    payload = {
                        type: 'account_update',
                        operation: (0, _extends3.default)({
                            account: account.name
                        }, ops2, {
                            memo_key: memo_key,
                            json_metadata: json_metadata
                        }),
                        keys: [key],
                        successCallback: onSuccess,
                        errorCallback: onError
                    };
                    // console.log('sign key.toPublicKey().toString()', key.toPublicKey().toString())
                    // console.log('payload', payload)

                    _context19.next = 46;
                    return (0, _effects.call)(broadcastOperation, { payload: payload });

                case 46:
                case 'end':
                    return _context19.stop();
            }
        }
    }, _marked19, this, [[14, 25, 29, 37], [30,, 32, 36]]);
}

/** auths must start with most powerful key: owner for example */
// const twofaAccount = 'steem'
function updateMeta(params) {
    var _params$payload$opera, meta, account_name, signingKey, onSuccess, onError, _ref27, _ref28, account, operations;

    return _regenerator2.default.wrap(function updateMeta$(_context20) {
        while (1) {
            switch (_context20.prev = _context20.next) {
                case 0:
                    // console.log('params', params)
                    _params$payload$opera = params.payload.operation, meta = _params$payload$opera.meta, account_name = _params$payload$opera.account_name, signingKey = _params$payload$opera.signingKey, onSuccess = _params$payload$opera.onSuccess, onError = _params$payload$opera.onError;

                    console.log('meta', meta);
                    console.log('account_name', account_name);
                    // Be sure this account is up-to-date (other required fields are sent in the update)
                    _context20.next = 5;
                    return (0, _effects.call)([_steemJs.api, _steemJs.api.getAccountsAsync], [account_name]);

                case 5:
                    _ref27 = _context20.sent;
                    _ref28 = (0, _slicedToArray3.default)(_ref27, 1);
                    account = _ref28[0];

                    if (account) {
                        _context20.next = 11;
                        break;
                    }

                    onError('Account not found');
                    return _context20.abrupt('return');

                case 11:
                    if (signingKey) {
                        _context20.next = 14;
                        break;
                    }

                    onError('Incorrect Password');
                    throw new Error('Have to pass owner key in order to change meta');

                case 14:
                    _context20.prev = 14;

                    console.log('account.name', account.name);
                    operations = ['update_account_meta', {
                        account_name: account.name,
                        json_meta: (0, _stringify2.default)(meta)
                    }];
                    _context20.next = 19;
                    return _steemJs.broadcast.sendAsync({ extensions: [], operations: operations }, [signingKey]);

                case 19:
                    if (onSuccess) onSuccess();
                    // console.log('sign key.toPublicKey().toString()', key.toPublicKey().toString())
                    // console.log('payload', payload)
                    _context20.next = 26;
                    break;

                case 22:
                    _context20.prev = 22;
                    _context20.t0 = _context20['catch'](14);

                    console.error('Update meta', _context20.t0);
                    if (onError) onError(_context20.t0);

                case 26:
                case 'end':
                    return _context20.stop();
            }
        }
    }, _marked20, this, [[14, 22]]);
}
//# sourceMappingURL=TransactionSaga.js.map