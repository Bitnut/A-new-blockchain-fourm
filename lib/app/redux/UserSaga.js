'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.userWatches = undefined;

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _objectDestructuringEmpty2 = require('babel-runtime/helpers/objectDestructuringEmpty');

var _objectDestructuringEmpty3 = _interopRequireDefault(_objectDestructuringEmpty2);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _immutable = require('immutable');

var _effects = require('redux-saga/effects');

var _steemJs = require('@steemit/steem-js');

var _ecc = require('@steemit/steem-js/lib/auth/ecc');

var _AuthSaga = require('app/redux/AuthSaga');

var _SagaShared = require('app/redux/SagaShared');

var _UserReducer = require('app/redux/UserReducer');

var userActions = _interopRequireWildcard(_UserReducer);

var _AppReducer = require('app/redux/AppReducer');

var _reactRouter = require('react-router');

var _ServerApiClient = require('app/utils/ServerApiClient');

var _FollowSaga = require('app/redux/FollowSaga');

var _Translator = require('app/Translator');

var _DMCAUserList = require('app/utils/DMCAUserList');

var _DMCAUserList2 = _interopRequireDefault(_DMCAUserList);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = /*#__PURE__*/_regenerator2.default.mark(loadSavingsWithdraw),
    _marked2 = /*#__PURE__*/_regenerator2.default.mark(removeHighSecurityKeys),
    _marked3 = /*#__PURE__*/_regenerator2.default.mark(usernamePasswordLogin),
    _marked4 = /*#__PURE__*/_regenerator2.default.mark(usernamePasswordLogin2),
    _marked5 = /*#__PURE__*/_regenerator2.default.mark(promptTosAcceptance),
    _marked6 = /*#__PURE__*/_regenerator2.default.mark(getFeatureFlags),
    _marked7 = /*#__PURE__*/_regenerator2.default.mark(saveLogin_localStorage),
    _marked8 = /*#__PURE__*/_regenerator2.default.mark(logout),
    _marked9 = /*#__PURE__*/_regenerator2.default.mark(loginError),
    _marked10 = /*#__PURE__*/_regenerator2.default.mark(lookupPreviousOwnerAuthority),
    _marked11 = /*#__PURE__*/_regenerator2.default.mark(uploadImage);

var userWatches = exports.userWatches = [(0, _effects.takeLatest)('@@router/LOCATION_CHANGE', removeHighSecurityKeys), // keep first to remove keys early when a page change happens
(0, _effects.takeLatest)('user/lookupPreviousOwnerAuthority', lookupPreviousOwnerAuthority), (0, _effects.takeLatest)(userActions.USERNAME_PASSWORD_LOGIN, usernamePasswordLogin), (0, _effects.takeLatest)(userActions.SAVE_LOGIN, saveLogin_localStorage), (0, _effects.takeLatest)(userActions.LOGOUT, logout), (0, _effects.takeLatest)(userActions.LOGIN_ERROR, loginError), (0, _effects.takeLatest)(userActions.LOAD_SAVINGS_WITHDRAW, loadSavingsWithdraw), (0, _effects.takeLatest)(userActions.UPLOAD_IMAGE, uploadImage), (0, _effects.takeLatest)(userActions.ACCEPT_TERMS, /*#__PURE__*/_regenerator2.default.mark(function _callee() {
    return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    _context.prev = 0;
                    _context.next = 3;
                    return (0, _effects.call)(_ServerApiClient.acceptTos);

                case 3:
                    _context.next = 7;
                    break;

                case 5:
                    _context.prev = 5;
                    _context.t0 = _context['catch'](0);

                case 7:
                case 'end':
                    return _context.stop();
            }
        }
    }, _callee, this, [[0, 5]]);
})
// TODO: log error to server, conveyor is unavailable
), /*#__PURE__*/_regenerator2.default.mark(function getLatestFeedPrice() {
    var history, feed, last;
    return _regenerator2.default.wrap(function getLatestFeedPrice$(_context2) {
        while (1) {
            switch (_context2.prev = _context2.next) {
                case 0:
                    _context2.prev = 0;
                    _context2.next = 3;
                    return (0, _effects.call)([_steemJs.api, _steemJs.api.getFeedHistoryAsync]);

                case 3:
                    history = _context2.sent;
                    feed = history['price_history'];
                    last = (0, _immutable.fromJS)(feed[feed.length - 1]);
                    _context2.next = 8;
                    return (0, _effects.put)(userActions.setLatestFeedPrice(last));

                case 8:
                    _context2.next = 12;
                    break;

                case 10:
                    _context2.prev = 10;
                    _context2.t0 = _context2['catch'](0);

                case 12:
                case 'end':
                    return _context2.stop();
            }
        }
    }, getLatestFeedPrice, this, [[0, 10]]);
})];

var highSecurityPages = [/\/market/, /\/@.+\/(transfers|permissions|password)/, /\/~witnesses/];

function loadSavingsWithdraw() {
    var username, to, fro, m, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, v, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, _v, withdraws;

    return _regenerator2.default.wrap(function loadSavingsWithdraw$(_context3) {
        while (1) {
            switch (_context3.prev = _context3.next) {
                case 0:
                    _context3.next = 2;
                    return (0, _effects.select)(function (state) {
                        return state.user.getIn(['current', 'username']);
                    });

                case 2:
                    username = _context3.sent;
                    _context3.next = 5;
                    return (0, _effects.call)([_steemJs.api, _steemJs.api.getSavingsWithdrawToAsync], username);

                case 5:
                    to = _context3.sent;
                    _context3.next = 8;
                    return (0, _effects.call)([_steemJs.api, _steemJs.api.getSavingsWithdrawFromAsync], username);

                case 8:
                    fro = _context3.sent;
                    m = {};
                    _iteratorNormalCompletion = true;
                    _didIteratorError = false;
                    _iteratorError = undefined;
                    _context3.prev = 13;

                    for (_iterator = (0, _getIterator3.default)(to); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        v = _step.value;
                        m[v.id] = v;
                    }_context3.next = 21;
                    break;

                case 17:
                    _context3.prev = 17;
                    _context3.t0 = _context3['catch'](13);
                    _didIteratorError = true;
                    _iteratorError = _context3.t0;

                case 21:
                    _context3.prev = 21;
                    _context3.prev = 22;

                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }

                case 24:
                    _context3.prev = 24;

                    if (!_didIteratorError) {
                        _context3.next = 27;
                        break;
                    }

                    throw _iteratorError;

                case 27:
                    return _context3.finish(24);

                case 28:
                    return _context3.finish(21);

                case 29:
                    _iteratorNormalCompletion2 = true;
                    _didIteratorError2 = false;
                    _iteratorError2 = undefined;
                    _context3.prev = 32;
                    for (_iterator2 = (0, _getIterator3.default)(fro); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        _v = _step2.value;
                        m[_v.id] = _v;
                    }_context3.next = 40;
                    break;

                case 36:
                    _context3.prev = 36;
                    _context3.t1 = _context3['catch'](32);
                    _didIteratorError2 = true;
                    _iteratorError2 = _context3.t1;

                case 40:
                    _context3.prev = 40;
                    _context3.prev = 41;

                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }

                case 43:
                    _context3.prev = 43;

                    if (!_didIteratorError2) {
                        _context3.next = 46;
                        break;
                    }

                    throw _iteratorError2;

                case 46:
                    return _context3.finish(43);

                case 47:
                    return _context3.finish(40);

                case 48:
                    withdraws = (0, _immutable.List)((0, _immutable.fromJS)(m).values()).sort(function (a, b) {
                        return strCmp(a.get('complete'), b.get('complete'));
                    });
                    _context3.next = 51;
                    return (0, _effects.put)(userActions.set({
                        key: 'savings_withdraws',
                        value: withdraws
                    }));

                case 51:
                case 'end':
                    return _context3.stop();
            }
        }
    }, _marked, this, [[13, 17, 21, 29], [22,, 24, 28], [32, 36, 40, 48], [41,, 43, 47]]);
}

var strCmp = function strCmp(a, b) {
    return a > b ? 1 : a < b ? -1 : 0;
};

// function* getCurrentAccountWatch() {
//     // yield* takeLatest('user/SHOW_TRANSFER', getCurrentAccount);
// }

function removeHighSecurityKeys(_ref) {
    var pathname = _ref.payload.pathname;
    var highSecurityPage;
    return _regenerator2.default.wrap(function removeHighSecurityKeys$(_context4) {
        while (1) {
            switch (_context4.prev = _context4.next) {
                case 0:
                    highSecurityPage = highSecurityPages.find(function (p) {
                        return p.test(pathname);
                    }) != null;
                    // Let the user keep the active key when going from one high security page to another.  This helps when
                    // the user logins into the Wallet then the Permissions tab appears (it was hidden).  This keeps them
                    // from getting logged out when they click on Permissions (which is really bad because that tab
                    // disappears again).

                    if (highSecurityPage) {
                        _context4.next = 4;
                        break;
                    }

                    _context4.next = 4;
                    return (0, _effects.put)(userActions.removeHighSecurityKeys());

                case 4:
                case 'end':
                    return _context4.stop();
            }
        }
    }, _marked2, this);
}

/**
    @arg {object} action.username - Unless a WIF is provided, this is hashed with the password and key_type to create private keys.
    @arg {object} action.password - Password or WIF private key.  A WIF becomes the posting key, a password can create all three
        key_types: active, owner, posting keys.
*/
function usernamePasswordLogin(action) {
    var current, username;
    return _regenerator2.default.wrap(function usernamePasswordLogin$(_context5) {
        while (1) {
            switch (_context5.prev = _context5.next) {
                case 0:
                    // This is a great place to mess with session-related user state (:
                    // If the user hasn't previously hidden the announcement in this session,
                    // or if the user's browser does not support session storage,
                    // show the announcement.
                    if (typeof sessionStorage === 'undefined' || typeof sessionStorage !== 'undefined' && sessionStorage.getItem('hideAnnouncement') !== 'true') {}
                    // Uncomment to re-enable announcment
                    // TODO: use config to enable/disable
                    // yield put(userActions.showAnnouncement());


                    // Sets 'loading' while the login is taking place.  The key generation can take a while on slow computers.
                    _context5.next = 3;
                    return (0, _effects.call)(usernamePasswordLogin2, action.payload);

                case 3:
                    _context5.next = 5;
                    return (0, _effects.select)(function (state) {
                        return state.user.get('current');
                    });

                case 5:
                    current = _context5.sent;

                    if (!current) {
                        _context5.next = 12;
                        break;
                    }

                    username = current.get('username');
                    _context5.next = 10;
                    return (0, _effects.fork)(_FollowSaga.loadFollows, 'getFollowingAsync', username, 'blog');

                case 10:
                    _context5.next = 12;
                    return (0, _effects.fork)(_FollowSaga.loadFollows, 'getFollowingAsync', username, 'ignore');

                case 12:
                case 'end':
                    return _context5.stop();
            }
        }
    }, _marked3, this);
}

// const isHighSecurityOperations = ['transfer', 'transfer_to_vesting', 'withdraw_vesting',
//     'limit_order_create', 'limit_order_cancel', 'account_update', 'account_witness_vote']

var clean = function clean(value) {
    return value == null || value === '' || /null|undefined/.test(value) ? undefined : value;
};

function usernamePasswordLogin2(_ref2) {
    var username = _ref2.username,
        password = _ref2.password,
        saveLogin = _ref2.saveLogin,
        operationType = _ref2.operationType,
        afterLoginRedirectToWelcome = _ref2.afterLoginRedirectToWelcome;

    var user, loginType, justLoggedIn, feedURL, autopost, memoWif, login_owner_pubkey, login_wif_owner_pubkey, data, _toString$split, _toString$split2, offchain_account, userProvidedRole, _username$split, _username$split2, pathname, highSecurityLogin, isRole, account, private_keys, private_key, authority, hasActiveAuth, accountName, fullAuths, owner_pub_key, generated_type, owner_pubkey, active_pubkey, posting_pubkey, memo_pubkey, offchainData, serverAccount, challengeString, signatures, challenge, bufSha, sign, response, body, adsEnabled, url;

    return _regenerator2.default.wrap(function usernamePasswordLogin2$(_context6) {
        while (1) {
            switch (_context6.prev = _context6.next) {
                case 0:
                    _context6.next = 2;
                    return (0, _effects.select)(function (state) {
                        return state.user;
                    });

                case 2:
                    user = _context6.sent;
                    loginType = user.get('login_type');
                    justLoggedIn = loginType === 'basic';

                    console.log('Login type:', loginType, 'Just logged in?', justLoggedIn, 'username:', username);

                    // login, using saved password
                    feedURL = false;
                    autopost = void 0, memoWif = void 0, login_owner_pubkey = void 0, login_wif_owner_pubkey = void 0;

                    if (!username && !password) {
                        data = localStorage.getItem('autopost2');

                        if (data) {
                            // auto-login with a low security key (like a posting key)
                            autopost = true; // must use simi-colon
                            // The 'password' in this case must be the posting private wif .. See setItme('autopost')
                            _toString$split = new Buffer(data, 'hex').toString().split('\t');
                            _toString$split2 = (0, _slicedToArray3.default)(_toString$split, 4);
                            username = _toString$split2[0];
                            password = _toString$split2[1];
                            memoWif = _toString$split2[2];
                            login_owner_pubkey = _toString$split2[3];

                            memoWif = clean(memoWif);
                            login_owner_pubkey = clean(login_owner_pubkey);
                        }
                    }
                    // no saved password

                    if (!(!username || !password)) {
                        _context6.next = 16;
                        break;
                    }

                    console.log('No saved password');
                    _context6.next = 13;
                    return (0, _effects.select)(function (state) {
                        return state.offchain.get('account');
                    });

                case 13:
                    offchain_account = _context6.sent;

                    if (offchain_account) (0, _ServerApiClient.serverApiLogout)();
                    return _context6.abrupt('return');

                case 16:
                    userProvidedRole = void 0; // login via:  username/owner

                    if (username.indexOf('/') > -1) {
                        _username$split = username.split('/');
                        // "alice/active" will login only with Alices active key

                        _username$split2 = (0, _slicedToArray3.default)(_username$split, 2);
                        username = _username$split2[0];
                        userProvidedRole = _username$split2[1];
                    }

                    _context6.next = 20;
                    return (0, _effects.select)(function (state) {
                        return state.global.get('pathname');
                    });

                case 20:
                    pathname = _context6.sent;
                    highSecurityLogin =
                    // /owner|active/.test(userProvidedRole) ||
                    // isHighSecurityOperations.indexOf(operationType) !== -1 ||
                    highSecurityPages.find(function (p) {
                        return p.test(pathname);
                    }) != null;

                    isRole = function isRole(role, fn) {
                        return !userProvidedRole || role === userProvidedRole ? fn() : undefined;
                    };

                    _context6.next = 25;
                    return (0, _effects.call)(_SagaShared.getAccount, username);

                case 25:
                    account = _context6.sent;

                    if (account) {
                        _context6.next = 31;
                        break;
                    }

                    console.log('No account');
                    _context6.next = 30;
                    return (0, _effects.put)(userActions.loginError({ error: 'Username does not exist' }));

                case 30:
                    return _context6.abrupt('return');

                case 31:
                    if (!(username && _DMCAUserList2.default.includes(username))) {
                        _context6.next = 36;
                        break;
                    }

                    console.log('DMCA list');
                    _context6.next = 35;
                    return (0, _effects.put)(userActions.loginError({ error: (0, _Translator.translate)('terms_violation') }));

                case 35:
                    return _context6.abrupt('return');

                case 36:
                    private_keys = void 0;

                    try {
                        private_key = _ecc.PrivateKey.fromWif(password);

                        login_wif_owner_pubkey = private_key.toPublicKey().toString();
                        private_keys = (0, _immutable.fromJS)({
                            posting_private: isRole('posting', function () {
                                return private_key;
                            }),
                            active_private: isRole('active', function () {
                                return private_key;
                            }),
                            memo_private: private_key
                        });
                    } catch (e) {
                        // Password (non wif)
                        login_owner_pubkey = _ecc.PrivateKey.fromSeed(username + 'owner' + password).toPublicKey().toString();
                        private_keys = (0, _immutable.fromJS)({
                            posting_private: isRole('posting', function () {
                                return _ecc.PrivateKey.fromSeed(username + 'posting' + password);
                            }),
                            active_private: isRole('active', function () {
                                return _ecc.PrivateKey.fromSeed(username + 'active' + password);
                            }),
                            memo_private: _ecc.PrivateKey.fromSeed(username + 'memo' + password)
                        });
                    }
                    if (memoWif) private_keys = private_keys.set('memo_private', _ecc.PrivateKey.fromWif(memoWif));

                    _context6.next = 41;
                    return (0, _effects.call)(_AuthSaga.accountAuthLookup, {
                        payload: {
                            account: account,
                            private_keys: private_keys,
                            highSecurityLogin: highSecurityLogin,
                            login_owner_pubkey: login_owner_pubkey
                        }
                    });

                case 41:
                    _context6.next = 43;
                    return (0, _effects.select)(function (state) {
                        return state.user.getIn(['authority', username]);
                    });

                case 43:
                    authority = _context6.sent;
                    hasActiveAuth = authority.get('active') === 'full';

                    if (highSecurityLogin) {
                        _context6.next = 50;
                        break;
                    }

                    accountName = account.get('name');

                    authority = authority.set('active', 'none');
                    _context6.next = 50;
                    return (0, _effects.put)(userActions.setAuthority({ accountName: accountName, auth: authority }));

                case 50:
                    fullAuths = authority.reduce(function (r, auth, type) {
                        return auth === 'full' ? r.add(type) : r;
                    }, (0, _immutable.Set)());

                    if (fullAuths.size) {
                        _context6.next = 70;
                        break;
                    }

                    console.log('No full auths');
                    localStorage.removeItem('autopost2');
                    owner_pub_key = account.getIn(['owner', 'key_auths', 0, 0]);

                    if (!(login_owner_pubkey === owner_pub_key || login_wif_owner_pubkey === owner_pub_key)) {
                        _context6.next = 60;
                        break;
                    }

                    _context6.next = 58;
                    return (0, _effects.put)(userActions.loginError({ error: 'owner_login_blocked' }));

                case 58:
                    _context6.next = 69;
                    break;

                case 60:
                    if (!(!highSecurityLogin && hasActiveAuth)) {
                        _context6.next = 65;
                        break;
                    }

                    _context6.next = 63;
                    return (0, _effects.put)(userActions.loginError({ error: 'active_login_blocked' }));

                case 63:
                    _context6.next = 69;
                    break;

                case 65:
                    generated_type = password[0] === 'P' && password.length > 40;

                    (0, _ServerApiClient.serverApiRecordEvent)('login_attempt', (0, _stringify2.default)({
                        name: username,
                        login_owner_pubkey: login_owner_pubkey,
                        owner_pub_key: owner_pub_key,
                        generated_type: generated_type
                    }));
                    _context6.next = 69;
                    return (0, _effects.put)(userActions.loginError({ error: 'Incorrect Password' }));

                case 69:
                    return _context6.abrupt('return');

                case 70:
                    if (authority.get('posting') !== 'full') private_keys = private_keys.remove('posting_private');

                    if (!highSecurityLogin || authority.get('active') !== 'full') private_keys = private_keys.remove('active_private');

                    owner_pubkey = account.getIn(['owner', 'key_auths', 0, 0]);
                    active_pubkey = account.getIn(['active', 'key_auths', 0, 0]);
                    posting_pubkey = account.getIn(['posting', 'key_auths', 0, 0]);


                    if (private_keys.get('memo_private') && account.get('memo_key') !== private_keys.get('memo_private').toPublicKey().toString())
                        // provided password did not yield memo key
                        private_keys = private_keys.remove('memo_private');

                    if (highSecurityLogin) {
                        _context6.next = 83;
                        break;
                    }

                    console.log('Not high security login');

                    if (!(posting_pubkey === owner_pubkey || posting_pubkey === active_pubkey)) {
                        _context6.next = 83;
                        break;
                    }

                    _context6.next = 81;
                    return (0, _effects.put)(userActions.loginError({
                        error: 'This login gives owner or active permissions and should not be used here.  Please provide a posting only login.'
                    }));

                case 81:
                    localStorage.removeItem('autopost2');
                    return _context6.abrupt('return');

                case 83:
                    memo_pubkey = private_keys.has('memo_private') ? private_keys.get('memo_private').toPublicKey().toString() : null;


                    if (memo_pubkey === owner_pubkey || memo_pubkey === active_pubkey)
                        // Memo key could be saved in local storage.. In RAM it is not purged upon LOCATION_CHANGE
                        private_keys = private_keys.remove('memo_private');

                    // If user is signing operation by operaion and has no saved login, don't save to RAM

                    if (!(!operationType || saveLogin)) {
                        _context6.next = 91;
                        break;
                    }

                    if (username) feedURL = '/@' + username + '/feed';
                    // Keep the posting key in RAM but only when not signing an operation.
                    // No operation or the user has checked: Keep me logged in...
                    _context6.next = 89;
                    return (0, _effects.put)(userActions.setUser({
                        username: username,
                        private_keys: private_keys,
                        login_owner_pubkey: login_owner_pubkey,
                        vesting_shares: account.get('vesting_shares'),
                        received_vesting_shares: account.get('received_vesting_shares'),
                        delegated_vesting_shares: account.get('delegated_vesting_shares')
                    }));

                case 89:
                    _context6.next = 94;
                    break;

                case 91:
                    if (username) feedURL = '/@' + username + '/feed';
                    _context6.next = 94;
                    return (0, _effects.put)(userActions.setUser({
                        username: username,
                        vesting_shares: account.get('vesting_shares'),
                        received_vesting_shares: account.get('received_vesting_shares'),
                        delegated_vesting_shares: account.get('delegated_vesting_shares')
                    }));

                case 94:
                    if (!(!autopost && saveLogin)) {
                        _context6.next = 97;
                        break;
                    }

                    _context6.next = 97;
                    return (0, _effects.put)(userActions.saveLogin());

                case 97:
                    _context6.prev = 97;
                    _context6.next = 100;
                    return (0, _effects.select)(function (state) {
                        return state.offchain;
                    });

                case 100:
                    offchainData = _context6.sent;
                    serverAccount = offchainData.get('account');
                    challengeString = offchainData.get('login_challenge');

                    if (!(!serverAccount && challengeString)) {
                        _context6.next = 127;
                        break;
                    }

                    console.log('No server account, but challenge string');
                    signatures = {};
                    challenge = { token: challengeString };
                    bufSha = _ecc.hash.sha256((0, _stringify2.default)(challenge, null, 0));

                    sign = function sign(role, d) {
                        console.log('Sign before');
                        if (!d) return;
                        console.log('Sign after');
                        var sig = _ecc.Signature.signBufferSha256(bufSha, d);
                        signatures[role] = sig.toHex();
                    };

                    sign('posting', private_keys.get('posting_private'));
                    // sign('active', private_keys.get('active_private'))

                    console.log('Logging in as', username);
                    _context6.next = 113;
                    return (0, _ServerApiClient.serverApiLogin)(username, signatures);

                case 113:
                    response = _context6.sent;
                    _context6.next = 116;
                    return response.json();

                case 116:
                    body = _context6.sent;

                    if (!justLoggedIn) {
                        _context6.next = 127;
                        break;
                    }

                    _context6.next = 120;
                    return (0, _effects.select)(function (state) {
                        return state.app.getIn(['googleAds', 'enabled']);
                    });

                case 120:
                    adsEnabled = _context6.sent;

                    if (!adsEnabled) {
                        _context6.next = 127;
                        break;
                    }

                    url = new URL(window.location.href);

                    url.searchParams.set('auth', 'true');
                    console.log('New post-login URL', url.toString());
                    window.location.replace(url.toString());
                    return _context6.abrupt('return');

                case 127:
                    _context6.next = 132;
                    break;

                case 129:
                    _context6.prev = 129;
                    _context6.t0 = _context6['catch'](97);

                    // Does not need to be fatal
                    console.error('Server Login Error', _context6.t0);

                case 132:
                    if (!private_keys.get('posting_private')) {
                        _context6.next = 135;
                        break;
                    }

                    _context6.next = 135;
                    return (0, _effects.fork)(getFeatureFlags, username, private_keys.get('posting_private').toString());

                case 135:
                    _context6.next = 137;
                    return (0, _effects.fork)(promptTosAcceptance, username);

                case 137:

                    // Redirect user to the appropriate page after login.
                    if (afterLoginRedirectToWelcome) {
                        console.log('Redirecting to welcome page');
                        _reactRouter.browserHistory.push('/welcome');
                    } else if (feedURL && document.location.pathname === '/') {
                        console.log('Redirecting to feed page', feedURL);
                        _reactRouter.browserHistory.push(feedURL);
                    }

                case 138:
                case 'end':
                    return _context6.stop();
            }
        }
    }, _marked4, this, [[97, 129]]);
}

function promptTosAcceptance(username) {
    var accepted;
    return _regenerator2.default.wrap(function promptTosAcceptance$(_context7) {
        while (1) {
            switch (_context7.prev = _context7.next) {
                case 0:
                    _context7.prev = 0;
                    _context7.next = 3;
                    return (0, _effects.call)(_ServerApiClient.isTosAccepted, username);

                case 3:
                    accepted = _context7.sent;

                    if (accepted) {
                        _context7.next = 7;
                        break;
                    }

                    _context7.next = 7;
                    return (0, _effects.put)(userActions.showTerms());

                case 7:
                    _context7.next = 11;
                    break;

                case 9:
                    _context7.prev = 9;
                    _context7.t0 = _context7['catch'](0);

                case 11:
                case 'end':
                    return _context7.stop();
            }
        }
    }, _marked5, this, [[0, 9]]);
}

function getFeatureFlags(username, posting_private) {
    var flags;
    return _regenerator2.default.wrap(function getFeatureFlags$(_context8) {
        while (1) {
            switch (_context8.prev = _context8.next) {
                case 0:
                    _context8.prev = 0;
                    _context8.next = 3;
                    return (0, _effects.call)([_steemJs.api, _steemJs.api.signedCallAsync], 'conveyor.get_feature_flags', { account: username }, username, posting_private);

                case 3:
                    flags = _context8.sent;
                    _context8.next = 6;
                    return (0, _effects.put)((0, _AppReducer.receiveFeatureFlags)(flags));

                case 6:
                    _context8.next = 10;
                    break;

                case 8:
                    _context8.prev = 8;
                    _context8.t0 = _context8['catch'](0);

                case 10:
                case 'end':
                    return _context8.stop();
            }
        }
    }, _marked6, this, [[0, 8]]);
}

function saveLogin_localStorage() {
    var _ref3, _ref4, username, private_keys, login_owner_pubkey, posting_private, account, postingPubkey, memoKey, memoWif, data;

    return _regenerator2.default.wrap(function saveLogin_localStorage$(_context9) {
        while (1) {
            switch (_context9.prev = _context9.next) {
                case 0:
                    if (process.env.BROWSER) {
                        _context9.next = 3;
                        break;
                    }

                    console.error('Non-browser environment, skipping localstorage');
                    return _context9.abrupt('return');

                case 3:
                    localStorage.removeItem('autopost2');
                    _context9.next = 6;
                    return (0, _effects.select)(function (state) {
                        return [state.user.getIn(['current', 'username']), state.user.getIn(['current', 'private_keys']), state.user.getIn(['current', 'login_owner_pubkey'])];
                    });

                case 6:
                    _ref3 = _context9.sent;
                    _ref4 = (0, _slicedToArray3.default)(_ref3, 3);
                    username = _ref4[0];
                    private_keys = _ref4[1];
                    login_owner_pubkey = _ref4[2];

                    if (username) {
                        _context9.next = 14;
                        break;
                    }

                    console.error('Not logged in');
                    return _context9.abrupt('return');

                case 14:
                    // Save the lowest security key
                    posting_private = private_keys.get('posting_private');

                    if (posting_private) {
                        _context9.next = 18;
                        break;
                    }

                    console.error('No posting key to save?');
                    return _context9.abrupt('return');

                case 18:
                    _context9.next = 20;
                    return (0, _effects.select)(function (state) {
                        return state.global.getIn(['accounts', username]);
                    });

                case 20:
                    account = _context9.sent;

                    if (account) {
                        _context9.next = 24;
                        break;
                    }

                    console.error('Missing global.accounts[' + username + ']');
                    return _context9.abrupt('return');

                case 24:
                    postingPubkey = posting_private.toPublicKey().toString();
                    _context9.prev = 25;

                    account.getIn(['active', 'key_auths']).forEach(function (auth) {
                        if (auth.get(0) === postingPubkey) throw 'Login will not be saved, posting key is the same as active key';
                    });
                    account.getIn(['owner', 'key_auths']).forEach(function (auth) {
                        if (auth.get(0) === postingPubkey) throw 'Login will not be saved, posting key is the same as owner key';
                    });
                    _context9.next = 34;
                    break;

                case 30:
                    _context9.prev = 30;
                    _context9.t0 = _context9['catch'](25);

                    console.error(_context9.t0);
                    return _context9.abrupt('return');

                case 34:
                    memoKey = private_keys.get('memo_private');
                    memoWif = memoKey && memoKey.toWif();
                    data = new Buffer(username + '\t' + posting_private.toWif() + '\t' + (memoWif || '') + '\t' + (login_owner_pubkey || '')).toString('hex');
                    // autopost is a auto login for a low security key (like the posting key)

                    localStorage.setItem('autopost2', data);

                case 38:
                case 'end':
                    return _context9.stop();
            }
        }
    }, _marked7, this, [[25, 30]]);
}

function logout(action) {
    var payload,
        logoutType,
        adsEnabled,
        _args10 = arguments;
    return _regenerator2.default.wrap(function logout$(_context10) {
        while (1) {
            switch (_context10.prev = _context10.next) {
                case 0:
                    payload = (action || {}).payload || {};
                    logoutType = payload.type || 'default';

                    console.log('Logging out', _args10, 'logout type', logoutType);

                    // Just in case it is still showing
                    _context10.next = 5;
                    return (0, _effects.put)(userActions.saveLoginConfirm(false));

                case 5:

                    if (process.env.BROWSER) {
                        localStorage.removeItem('autopost2');
                    }

                    _context10.next = 8;
                    return (0, _ServerApiClient.serverApiLogout)();

                case 8:
                    _context10.next = 10;
                    return (0, _effects.select)(function (state) {
                        return state.app.getIn(['googleAds', 'enabled']);
                    });

                case 10:
                    adsEnabled = _context10.sent;

                    if (logoutType == 'default' && adsEnabled) {
                        window.location.reload();
                    }

                case 12:
                case 'end':
                    return _context10.stop();
            }
        }
    }, _marked8, this);
}

function loginError(_ref5) {
    return _regenerator2.default.wrap(function loginError$(_context11) {
        while (1) {
            switch (_context11.prev = _context11.next) {
                case 0:
                    (0, _objectDestructuringEmpty3.default)(_ref5.payload);

                    (0, _ServerApiClient.serverApiLogout)();

                case 2:
                case 'end':
                    return _context11.stop();
            }
        }
    }, _marked9, this);
}

/**
    If the owner key was changed after the login owner key, this function will find the next owner key history record after the change and store it under user.previous_owner_authority.
*/
function lookupPreviousOwnerAuthority(_ref6) {
    var current, login_owner_pubkey, username, key_auths, owner_history, previous_owner_authority;
    return _regenerator2.default.wrap(function lookupPreviousOwnerAuthority$(_context12) {
        while (1) {
            switch (_context12.prev = _context12.next) {
                case 0:
                    (0, _objectDestructuringEmpty3.default)(_ref6.payload);
                    _context12.next = 3;
                    return (0, _effects.select)(function (state) {
                        return state.user.getIn(['current']);
                    });

                case 3:
                    current = _context12.sent;

                    if (current) {
                        _context12.next = 6;
                        break;
                    }

                    return _context12.abrupt('return');

                case 6:
                    login_owner_pubkey = current.get('login_owner_pubkey');

                    if (login_owner_pubkey) {
                        _context12.next = 9;
                        break;
                    }

                    return _context12.abrupt('return');

                case 9:
                    username = current.get('username');
                    _context12.next = 12;
                    return (0, _effects.select)(function (state) {
                        return state.global.getIn(['accounts', username, 'owner', 'key_auths']);
                    });

                case 12:
                    key_auths = _context12.sent;

                    if (!(key_auths && key_auths.find(function (key) {
                        return key.get(0) === login_owner_pubkey;
                    }))) {
                        _context12.next = 15;
                        break;
                    }

                    return _context12.abrupt('return');

                case 15:
                    _context12.t0 = _immutable.fromJS;
                    _context12.next = 18;
                    return (0, _effects.call)([_steemJs.api, _steemJs.api.getOwnerHistoryAsync], username);

                case 18:
                    _context12.t1 = _context12.sent;
                    owner_history = (0, _context12.t0)(_context12.t1);

                    if (!(owner_history.count() === 0)) {
                        _context12.next = 22;
                        break;
                    }

                    return _context12.abrupt('return');

                case 22:
                    owner_history = owner_history.sort(function (b, a) {
                        //sort decending
                        var aa = a.get('last_valid_time');
                        var bb = b.get('last_valid_time');
                        return aa < bb ? -1 : aa > bb ? 1 : 0;
                    });
                    // console.log('UserSaga ---> owner_history', owner_history.toJS())
                    previous_owner_authority = owner_history.find(function (o) {
                        var auth = o.get('previous_owner_authority');
                        var weight_threshold = auth.get('weight_threshold');
                        var key3 = auth.get('key_auths').find(function (key2) {
                            return key2.get(0) === login_owner_pubkey && key2.get(1) >= weight_threshold;
                        });
                        return key3 ? auth : null;
                    });

                    if (previous_owner_authority) {
                        _context12.next = 27;
                        break;
                    }

                    console.log('UserSaga ---> Login owner does not match owner history');
                    return _context12.abrupt('return');

                case 27:
                    _context12.next = 29;
                    return (0, _effects.put)(userActions.setUser({ previous_owner_authority: previous_owner_authority }));

                case 29:
                case 'end':
                    return _context12.stop();
            }
        }
    }, _marked10, this);
}

function uploadImage(_ref7) {
    var _ref7$payload = _ref7.payload,
        file = _ref7$payload.file,
        dataUrl = _ref7$payload.dataUrl,
        _ref7$payload$filenam = _ref7$payload.filename,
        filename = _ref7$payload$filenam === undefined ? 'image.txt' : _ref7$payload$filenam,
        progress = _ref7$payload.progress;

    var _progress, stateUser, username, d, data, dataBs64, reader, commaIdx, prefix, bufSha, formData, sig, postUrl, xhr;

    return _regenerator2.default.wrap(function uploadImage$(_context13) {
        while (1) {
            switch (_context13.prev = _context13.next) {
                case 0:
                    _progress = progress;

                    progress = function progress(msg) {
                        // console.log('Upload image progress', msg)
                        _progress(msg);
                    };

                    _context13.next = 4;
                    return (0, _effects.select)(function (state) {
                        return state.user;
                    });

                case 4:
                    stateUser = _context13.sent;
                    username = stateUser.getIn(['current', 'username']);
                    d = stateUser.getIn(['current', 'private_keys', 'posting_private']);

                    if (username) {
                        _context13.next = 10;
                        break;
                    }

                    progress({ error: 'Please login first.' });
                    return _context13.abrupt('return');

                case 10:
                    if (d) {
                        _context13.next = 13;
                        break;
                    }

                    progress({ error: 'Login with your posting key' });
                    return _context13.abrupt('return');

                case 13:
                    if (!(!file && !dataUrl)) {
                        _context13.next = 16;
                        break;
                    }

                    console.error('uploadImage required: file or dataUrl');
                    return _context13.abrupt('return');

                case 16:
                    data = void 0, dataBs64 = void 0;

                    if (!file) {
                        _context13.next = 24;
                        break;
                    }

                    // drag and drop
                    reader = new FileReader();
                    _context13.next = 21;
                    return new _promise2.default(function (resolve) {
                        reader.addEventListener('load', function () {
                            var result = new Buffer(reader.result, 'binary');
                            resolve(result);
                        });
                        reader.readAsBinaryString(file);
                    });

                case 21:
                    data = _context13.sent;
                    _context13.next = 27;
                    break;

                case 24:
                    // recover from preview
                    commaIdx = dataUrl.indexOf(',');

                    dataBs64 = dataUrl.substring(commaIdx + 1);
                    data = new Buffer(dataBs64, 'base64');

                case 27:

                    // The challenge needs to be prefixed with a constant (both on the server and checked on the client) to make sure the server can't easily make the client sign a transaction doing something else.
                    prefix = new Buffer('ImageSigningChallenge');
                    bufSha = _ecc.hash.sha256(Buffer.concat([prefix, data]));
                    formData = new FormData();

                    if (file) {
                        formData.append('file', file);
                    } else {
                        // formData.append('file', file, filename) <- Failed to add filename=xxx to Content-Disposition
                        // Can't easily make this look like a file so this relies on the server supporting: filename and filebinary
                        formData.append('filename', filename);
                        formData.append('filebase64', dataBs64);
                    }

                    sig = _ecc.Signature.signBufferSha256(bufSha, d);
                    postUrl = $STM_Config.upload_image + '/' + username + '/' + sig.toHex();
                    xhr = new XMLHttpRequest();

                    xhr.open('POST', postUrl);
                    xhr.onload = function () {
                        console.log(xhr.status, xhr.responseText);
                        var res = JSON.parse(xhr.responseText);
                        var error = res.error;

                        if (error) {
                            progress({ error: 'Error: ' + error });
                            return;
                        }
                        var url = res.url;

                        progress({ url: url });
                    };
                    xhr.onerror = function (error) {
                        console.error(filename, error);
                        progress({ error: 'Unable to contact the server.' });
                    };
                    xhr.upload.onprogress = function (event) {
                        if (event.lengthComputable) {
                            var percent = Math.round(event.loaded / event.total * 100);
                            progress({ message: 'Uploading ' + percent + '%' });
                            // console.log('Upload', percent)
                        }
                    };
                    xhr.send(formData);

                case 39:
                case 'end':
                    return _context13.stop();
            }
        }
    }, _marked11, this);
}

// function* getCurrentAccount() {
//     const current = yield select(state => state.user.get('current'))
//     if (!current) return
//     const [account] = yield call([api, api.getAccountsAsync], [current.get('username')])
//     yield put(g.actions.receiveAccount({ account }))
// }
//# sourceMappingURL=UserSaga.js.map