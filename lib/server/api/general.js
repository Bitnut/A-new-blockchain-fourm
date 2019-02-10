'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

exports.default = useGeneralApi;

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _koaBody = require('koa-body');

var _koaBody2 = _interopRequireDefault(_koaBody);

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

var _models = require('db/models');

var _models2 = _interopRequireDefault(_models);

var _find_user = require('db/utils/find_user');

var _find_user2 = _interopRequireDefault(_find_user);

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

var _misc = require('server/utils/misc');

var _coBody = require('co-body');

var _coBody2 = _interopRequireDefault(_coBody);

var _mixpanel = require('mixpanel');

var _mixpanel2 = _interopRequireDefault(_mixpanel);

var _ecc = require('@steemit/steem-js/lib/auth/ecc');

var _steemJs = require('@steemit/steem-js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = /*#__PURE__*/_regenerator2.default.mark(createAccount); // router 在这里！

/*global $STM_Config */


var ACCEPTED_TOS_TAG = 'accepted_tos_20180614';

var mixpanel = _config2.default.get('mixpanel') ? _mixpanel2.default.init(_config2.default.get('mixpanel')) : null;

var _stringval = function _stringval(v) {
    return typeof v === 'string' ? v : (0, _stringify2.default)(v);
};
function logRequest(path, ctx, extra) {
    var d = { ip: (0, _misc.getRemoteIp)(ctx.req) };
    if (ctx.session) {
        if (ctx.session.user) {
            d.user = ctx.session.user;
        }
        if (ctx.session.uid) {
            d.uid = ctx.session.uid;
        }
        if (ctx.session.a) {
            d.account = ctx.session.a;
        }
    }
    if (extra) {
        (0, _keys2.default)(extra).forEach(function (k) {
            var nk = d[k] ? '_' + k : k;
            d[nk] = extra[k];
        });
    }
    var info = (0, _keys2.default)(d).map(function (k) {
        return k + '=' + _stringval(d[k]);
    }).join(' ');
    console.log('-- /' + path + ' --> ' + info);
}

function useGeneralApi(app) {
    var router = (0, _koaRouter2.default)({ prefix: '/api/v1' });
    app.use(router.routes());
    var koaBody = (0, _koaBody2.default)();

    router.post('/accounts_wait', koaBody, /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        var _this = this;

        var params, account, remote_ip, user_id;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        if (!(0, _misc.rateLimitReq)(this, this.req)) {
                            _context.next = 2;
                            break;
                        }

                        return _context.abrupt('return');

                    case 2:
                        params = this.request.body;
                        account = typeof params === 'string' ? JSON.parse(params) : params;
                        remote_ip = (0, _misc.getRemoteIp)(this.req);

                        if ((0, _misc.checkCSRF)(this, account.csrf)) {
                            _context.next = 7;
                            break;
                        }

                        return _context.abrupt('return');

                    case 7:
                        logRequest('accounts_wait', this, { account: account });
                        user_id = this.session.user;

                        try {
                            _models2.default.Account.create((0, _models.escAttrs)({
                                user_id: user_id,
                                name: account.name,
                                owner_key: account.owner_key,
                                active_key: account.active_key,
                                posting_key: account.posting_key,
                                memo_key: account.memo_key,
                                remote_ip: remote_ip,
                                referrer: this.session.r,
                                created: false
                            })).catch(function (error) {
                                console.error("!!! Can't create account wait model in /accounts api", _this.session.uid, error);
                            });
                            if (mixpanel) {
                                mixpanel.track('Signup WaitList', {
                                    distinct_id: this.session.uid,
                                    ip: remote_ip
                                });
                                mixpanel.people.set(this.session.uid, { ip: remote_ip });
                            }
                        } catch (error) {
                            console.error('Error in /accounts_wait', error);
                        }
                        this.body = (0, _stringify2.default)({ status: 'ok' });

                    case 11:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    router.post('/accounts', koaBody, /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
        var params, account, user_id, user, creationHash, remote_ip, same_ip_account, minutes, newCreationHash, account_attrs, existing_account;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        if (!(0, _misc.rateLimitReq)(this, this.req)) {
                            _context2.next = 2;
                            break;
                        }

                        return _context2.abrupt('return');

                    case 2:
                        params = this.request.body;
                        account = typeof params === 'string' ? JSON.parse(params) : params;

                        if ((0, _misc.checkCSRF)(this, account.csrf)) {
                            _context2.next = 6;
                            break;
                        }

                        return _context2.abrupt('return');

                    case 6:
                        logRequest('accounts', this, { account: account });

                        if (!$STM_Config.disable_signups) {
                            _context2.next = 11;
                            break;
                        }

                        this.body = (0, _stringify2.default)({
                            error: 'New signups are temporary disabled.'
                        });
                        this.status = 401;
                        return _context2.abrupt('return');

                    case 11:
                        user_id = this.session.user;

                        if (user_id) {
                            _context2.next = 16;
                            break;
                        }

                        // require user to sign in with identity provider
                        this.body = (0, _stringify2.default)({ error: 'Unauthorized' });
                        this.status = 401;
                        return _context2.abrupt('return');

                    case 16:
                        _context2.prev = 16;
                        _context2.next = 19;
                        return _models2.default.User.findOne({
                            attributes: ['id', 'creation_hash'],
                            where: { id: user_id, account_status: 'approved' }
                        });

                    case 19:
                        user = _context2.sent;

                        if (user) {
                            _context2.next = 22;
                            break;
                        }

                        throw new Error("We can't find your sign up request. You either haven't started your sign up application or weren't approved yet.");

                    case 22:
                        if (!(user.creation_hash !== null)) {
                            _context2.next = 24;
                            break;
                        }

                        throw new Error('An account creation is in progress');

                    case 24:
                        // If not, set this user's creation_hash.
                        // We'll check this later on, just before we create the account on chain.
                        creationHash = _ecc.hash.sha256(_crypto2.default.randomBytes(32)).toString('hex');
                        _context2.next = 27;
                        return user.update({ creation_hash: creationHash });

                    case 27:

                        // disable session/multi account for now

                        // const existing_created_account = yield models.Account.findOne({
                        //     attributes: ['id'],
                        //     where: {user_id, ignored: false, created: true},
                        //     order: 'id DESC'
                        // });
                        // if (existing_created_account) {
                        //     throw new Error("Only one Steem account per user is allowed in order to prevent abuse");
                        // }

                        remote_ip = (0, _misc.getRemoteIp)(this.req);
                        // rate limit account creation to one per IP every 10 minutes

                        _context2.next = 30;
                        return _models2.default.Account.findOne({
                            attributes: ['created_at'],
                            where: { remote_ip: (0, _models.esc)(remote_ip), created: true },
                            order: 'id DESC'
                        });

                    case 30:
                        same_ip_account = _context2.sent;

                        if (!same_ip_account) {
                            _context2.next = 36;
                            break;
                        }

                        minutes = (Date.now() - same_ip_account.created_at) / 60000;

                        if (!(minutes < 10)) {
                            _context2.next = 36;
                            break;
                        }

                        console.log('api /accounts: IP rate limit for user ' + this.session.uid + ' #' + user_id + ', IP ' + remote_ip);
                        throw new Error('Only one Steem account allowed per IP address every 10 minutes');

                    case 36:
                        _context2.next = 38;
                        return _models2.default.sequelize.query('SELECT SQL_NO_CACHE creation_hash FROM users WHERE id = ?', {
                            replacements: [user.id],
                            type: _models2.default.sequelize.QueryTypes.SELECT
                        });

                    case 38:
                        newCreationHash = _context2.sent;

                        if (!(newCreationHash[0].creation_hash !== creationHash)) {
                            _context2.next = 42;
                            break;
                        }

                        console.log({ newCreationHash: newCreationHash, creationHash: creationHash });
                        throw new Error('Creation hash mismatch');

                    case 42:
                        _context2.prev = 42;
                        _context2.next = 45;
                        return createAccount({
                            signingKey: _config2.default.get('registrar.signing_key'),
                            fee: _config2.default.get('registrar.fee'),
                            creator: _config2.default.get('registrar.account'),
                            new_account_name: account.name,
                            delegation: _config2.default.get('registrar.delegation'),
                            owner: account.owner_key,
                            active: account.active_key,
                            posting: account.posting_key,
                            memo: account.memo_key
                        });

                    case 45:
                        _context2.next = 52;
                        break;

                    case 47:
                        _context2.prev = 47;
                        _context2.t0 = _context2['catch'](42);
                        _context2.next = 51;
                        return user.update({ creation_hash: null });

                    case 51:
                        throw new Error('Account creation error, try again.');

                    case 52:

                        console.log('-- create_account_with_keys created -->', this.session.uid, account.name, user.id, account.owner_key);

                        this.body = (0, _stringify2.default)({ status: 'ok' });

                        // update user account status
                        _context2.next = 56;
                        return user.update({ account_status: 'created' });

                    case 56:

                        // update or create account record
                        account_attrs = (0, _models.escAttrs)({
                            user_id: user_id,
                            name: account.name,
                            owner_key: account.owner_key,
                            active_key: account.active_key,
                            posting_key: account.posting_key,
                            memo_key: account.memo_key,
                            remote_ip: remote_ip,
                            referrer: this.session.r,
                            created: true
                        });
                        _context2.next = 59;
                        return _models2.default.Account.findOne({
                            attributes: ['id'],
                            where: { user_id: user_id, name: account.name },
                            order: 'id DESC'
                        });

                    case 59:
                        existing_account = _context2.sent;

                        if (!existing_account) {
                            _context2.next = 65;
                            break;
                        }

                        _context2.next = 63;
                        return existing_account.update(account_attrs);

                    case 63:
                        _context2.next = 67;
                        break;

                    case 65:
                        _context2.next = 67;
                        return _models2.default.Account.create(account_attrs);

                    case 67:
                        if (mixpanel) {
                            mixpanel.track('Signup', {
                                distinct_id: this.session.uid,
                                ip: remote_ip
                            });
                            mixpanel.people.set(this.session.uid, { ip: remote_ip });
                        }
                        _context2.next = 75;
                        break;

                    case 70:
                        _context2.prev = 70;
                        _context2.t1 = _context2['catch'](16);

                        console.error('Error in /accounts api call', this.session.uid, _context2.t1.toString());
                        this.body = (0, _stringify2.default)({ error: _context2.t1.message });
                        this.status = 500;

                    case 75:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, this, [[16, 70], [42, 47]]);
    }));

    /**
     * Provides an endpoint to create user, account, and identity records.
     * Used by faucet.
     *
     * HTTP params:
     *   name
     *   email
     *   owner_key
     *   secret
     */
    router.post('/create_user', koaBody, /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
        var _ref, name, email, owner_key, secret, user, account, identity;

        return _regenerator2.default.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        _ref = typeof this.request.body === 'string' ? JSON.parse(this.request.body) : this.request.body, name = _ref.name, email = _ref.email, owner_key = _ref.owner_key, secret = _ref.secret;

                        if (!(secret !== process.env.CREATE_USER_SECRET)) {
                            _context3.next = 3;
                            break;
                        }

                        throw new Error('invalid secret');

                    case 3:

                        logRequest('create_user', this, { name: name, email: email, owner_key: owner_key });

                        _context3.prev = 4;

                        if (_misc.emailRegex.test(email.toLowerCase())) {
                            _context3.next = 7;
                            break;
                        }

                        throw new Error('not valid email: ' + email);

                    case 7:
                        _context3.next = 9;
                        return _models2.default.User.create({
                            name: (0, _models.esc)(name),
                            email: (0, _models.esc)(email)
                        });

                    case 9:
                        user = _context3.sent;
                        _context3.next = 12;
                        return _models2.default.Account.create({
                            user_id: user.id,
                            name: (0, _models.esc)(name),
                            owner_key: (0, _models.esc)(owner_key)
                        });

                    case 12:
                        account = _context3.sent;
                        _context3.next = 15;
                        return _models2.default.Identity.create({
                            user_id: user.id,
                            name: (0, _models.esc)(name),
                            provider: 'email',
                            verified: true,
                            email: user.email,
                            owner_key: (0, _models.esc)(owner_key)
                        });

                    case 15:
                        identity = _context3.sent;

                        this.body = (0, _stringify2.default)({
                            success: true,
                            user: user,
                            account: account,
                            identity: identity
                        });
                        _context3.next = 24;
                        break;

                    case 19:
                        _context3.prev = 19;
                        _context3.t0 = _context3['catch'](4);

                        console.error('Error in /create_user api call', _context3.t0);
                        this.body = (0, _stringify2.default)({ error: _context3.t0.message });
                        this.status = 500;

                    case 24:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, this, [[4, 19]]);
    }));

    router.post('/update_email', koaBody, /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
        var params, _ref2, csrf, email, user;

        return _regenerator2.default.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        if (!(0, _misc.rateLimitReq)(this, this.req)) {
                            _context4.next = 2;
                            break;
                        }

                        return _context4.abrupt('return');

                    case 2:
                        params = this.request.body;
                        _ref2 = typeof params === 'string' ? JSON.parse(params) : params, csrf = _ref2.csrf, email = _ref2.email;

                        if ((0, _misc.checkCSRF)(this, csrf)) {
                            _context4.next = 6;
                            break;
                        }

                        return _context4.abrupt('return');

                    case 6:
                        logRequest('update_email', this, { email: email });
                        _context4.prev = 7;

                        if (_misc.emailRegex.test(email.toLowerCase())) {
                            _context4.next = 10;
                            break;
                        }

                        throw new Error('not valid email: ' + email);

                    case 10:
                        _context4.next = 12;
                        return (0, _find_user2.default)({
                            user_id: this.session.user,
                            email: (0, _models.esc)(email),
                            uid: this.session.uid
                        });

                    case 12:
                        user = _context4.sent;

                        if (!user) {
                            _context4.next = 19;
                            break;
                        }

                        _context4.next = 16;
                        return _models2.default.User.update({ email: (0, _models.esc)(email), waiting_list: true }, { where: { id: user.id } });

                    case 16:
                        user = _context4.sent;
                        _context4.next = 22;
                        break;

                    case 19:
                        _context4.next = 21;
                        return _models2.default.User.create({
                            email: (0, _models.esc)(email),
                            waiting_list: true
                        });

                    case 21:
                        user = _context4.sent;

                    case 22:
                        this.session.user = user.id;
                        this.body = (0, _stringify2.default)({ status: 'ok' });
                        _context4.next = 31;
                        break;

                    case 26:
                        _context4.prev = 26;
                        _context4.t0 = _context4['catch'](7);

                        console.error('Error in /update_email api call', this.session.uid, _context4.t0);
                        this.body = (0, _stringify2.default)({ error: _context4.t0.message });
                        this.status = 500;

                    case 31:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, this, [[7, 26]]);
    }));

    router.post('/login_account', koaBody, /*#__PURE__*/_regenerator2.default.mark(function _callee5() {
        var _this2 = this;

        var params, _ref3, csrf, account, signatures, db_account, _ref4, _ref5, chainAccount, auth, bufSha, verify, _chainAccount$posting, _chainAccount$posting2, _chainAccount$posting3, posting_pubkey, weight, weight_threshold, remote_ip;

        return _regenerator2.default.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        // if (rateLimitReq(this, this.req)) return;
                        params = this.request.body;
                        _ref3 = typeof params === 'string' ? JSON.parse(params) : params, csrf = _ref3.csrf, account = _ref3.account, signatures = _ref3.signatures;

                        if ((0, _misc.checkCSRF)(this, csrf)) {
                            _context5.next = 4;
                            break;
                        }

                        return _context5.abrupt('return');

                    case 4:

                        // Set auth, to remember if a user is authed on initial login.
                        this.session.auth = true;
                        this.session.save();

                        logRequest('login_account', this, { account: account });
                        _context5.prev = 7;
                        _context5.next = 10;
                        return _models2.default.Account.findOne({
                            attributes: ['user_id'],
                            where: { name: (0, _models.esc)(account) },
                            logging: false
                        });

                    case 10:
                        db_account = _context5.sent;

                        if (db_account) this.session.user = db_account.user_id;

                        if (!signatures) {
                            _context5.next = 23;
                            break;
                        }

                        if (this.session.login_challenge) {
                            _context5.next = 17;
                            break;
                        }

                        console.error('/login_account missing this.session.login_challenge');
                        _context5.next = 23;
                        break;

                    case 17:
                        _context5.next = 19;
                        return _steemJs.api.getAccountsAsync([account]);

                    case 19:
                        _ref4 = _context5.sent;
                        _ref5 = (0, _slicedToArray3.default)(_ref4, 1);
                        chainAccount = _ref5[0];

                        if (!chainAccount) {
                            console.error('/login_account missing blockchain account', account);
                        } else {
                            auth = { posting: false };
                            bufSha = _ecc.hash.sha256((0, _stringify2.default)({ token: this.session.login_challenge }, null, 0));

                            verify = function verify(type, sigHex, pubkey, weight, weight_threshold) {
                                if (!sigHex) return;
                                if (weight !== 1 || weight_threshold !== 1) {
                                    console.error('/login_account login_challenge unsupported ' + type + ' auth configuration: ' + account);
                                } else {
                                    var sig = parseSig(sigHex);
                                    var public_key = _ecc.PublicKey.fromString(pubkey);
                                    var verified = sig.verifyHash(bufSha, public_key);
                                    if (!verified) {
                                        console.error('/login_account verification failed', _this2.session.uid, account, pubkey);
                                    }
                                    auth[type] = verified;
                                }
                            };

                            _chainAccount$posting = chainAccount.posting, _chainAccount$posting2 = (0, _slicedToArray3.default)(_chainAccount$posting.key_auths, 1), _chainAccount$posting3 = (0, _slicedToArray3.default)(_chainAccount$posting2[0], 2), posting_pubkey = _chainAccount$posting3[0], weight = _chainAccount$posting3[1], weight_threshold = _chainAccount$posting.weight_threshold;

                            verify('posting', signatures.posting, posting_pubkey, weight, weight_threshold);
                            if (auth.posting) this.session.a = account;
                        }

                    case 23:

                        this.body = (0, _stringify2.default)({
                            status: 'ok'
                        });
                        remote_ip = (0, _misc.getRemoteIp)(this.req);

                        if (mixpanel) {
                            mixpanel.people.set(this.session.uid, {
                                ip: remote_ip,
                                $ip: remote_ip
                            });
                            mixpanel.people.increment(this.session.uid, 'Logins', 1);
                        }
                        _context5.next = 33;
                        break;

                    case 28:
                        _context5.prev = 28;
                        _context5.t0 = _context5['catch'](7);

                        console.error('Error in /login_account api call', this.session.uid, _context5.t0.message);
                        this.body = (0, _stringify2.default)({
                            error: _context5.t0.message
                        });
                        this.status = 500;

                    case 33:
                    case 'end':
                        return _context5.stop();
                }
            }
        }, _callee5, this, [[7, 28]]);
    }));

    router.post('/logout_account', koaBody, /*#__PURE__*/_regenerator2.default.mark(function _callee6() {
        var params, _ref6, csrf;

        return _regenerator2.default.wrap(function _callee6$(_context6) {
            while (1) {
                switch (_context6.prev = _context6.next) {
                    case 0:
                        // if (rateLimitReq(this, this.req)) return; - logout maybe immediately followed with login_attempt event
                        params = this.request.body;
                        _ref6 = typeof params === 'string' ? JSON.parse(params) : params, csrf = _ref6.csrf;

                        if ((0, _misc.checkCSRF)(this, csrf)) {
                            _context6.next = 4;
                            break;
                        }

                        return _context6.abrupt('return');

                    case 4:
                        this.session.auth = false;
                        logRequest('logout_account', this);
                        try {
                            this.session.a = null;
                            this.body = (0, _stringify2.default)({ status: 'ok' });
                        } catch (error) {
                            console.error('Error in /logout_account api call', this.session.uid, error);
                            this.body = (0, _stringify2.default)({ error: error.message });
                            this.status = 500;
                        }

                    case 7:
                    case 'end':
                        return _context6.stop();
                }
            }
        }, _callee6, this);
    }));

    router.post('/csp_violation', /*#__PURE__*/_regenerator2.default.mark(function _callee7() {
        var params, csp_report, value;
        return _regenerator2.default.wrap(function _callee7$(_context7) {
            while (1) {
                switch (_context7.prev = _context7.next) {
                    case 0:
                        if (!(0, _misc.rateLimitReq)(this, this.req)) {
                            _context7.next = 2;
                            break;
                        }

                        return _context7.abrupt('return');

                    case 2:
                        params = void 0;
                        _context7.prev = 3;
                        _context7.next = 6;
                        return (0, _coBody2.default)(this);

                    case 6:
                        params = _context7.sent;
                        _context7.next = 12;
                        break;

                    case 9:
                        _context7.prev = 9;
                        _context7.t0 = _context7['catch'](3);

                        console.log('-- /csp_violation error -->', _context7.t0);

                    case 12:
                        if (params && params['csp-report']) {
                            csp_report = params['csp-report'];
                            value = csp_report['document-uri'] + ' : ' + csp_report['blocked-uri'];

                            console.log('-- /csp_violation -->', value, '--', this.req.headers['user-agent']);
                        } else {
                            console.log('-- /csp_violation [no csp-report] -->', params, '--', this.req.headers['user-agent']);
                        }
                        this.body = '';

                    case 14:
                    case 'end':
                        return _context7.stop();
                }
            }
        }, _callee7, this, [[3, 9]]);
    }));

    router.post('/save_cords', koaBody, /*#__PURE__*/_regenerator2.default.mark(function _callee8() {
        var params, _ref7, csrf, x, y, user, data;

        return _regenerator2.default.wrap(function _callee8$(_context8) {
            while (1) {
                switch (_context8.prev = _context8.next) {
                    case 0:
                        params = this.request.body;
                        _ref7 = typeof params === 'string' ? JSON.parse(params) : params, csrf = _ref7.csrf, x = _ref7.x, y = _ref7.y;

                        if ((0, _misc.checkCSRF)(this, csrf)) {
                            _context8.next = 4;
                            break;
                        }

                        return _context8.abrupt('return');

                    case 4:
                        _context8.next = 6;
                        return _models2.default.User.findOne({
                            where: { id: this.session.user }
                        });

                    case 6:
                        user = _context8.sent;

                        if (user) {
                            data = user.sign_up_meta ? JSON.parse(user.sign_up_meta) : {};

                            data['button_screen_x'] = x;
                            data['button_screen_y'] = y;
                            data['last_step'] = 3;
                            try {
                                user.update({
                                    sign_up_meta: (0, _stringify2.default)(data)
                                });
                            } catch (error) {
                                console.error('Error in /save_cords api call', this.session.uid, error.message);
                                this.body = (0, _stringify2.default)({ error: error.message });
                                this.status = 500;
                            }
                        }
                        this.body = (0, _stringify2.default)({ status: 'ok' });

                    case 9:
                    case 'end':
                        return _context8.stop();
                }
            }
        }, _callee8, this);
    }));

    router.post('/setUserPreferences', koaBody, /*#__PURE__*/_regenerator2.default.mark(function _callee9() {
        var params, _ref8, csrf, payload, json;

        return _regenerator2.default.wrap(function _callee9$(_context9) {
            while (1) {
                switch (_context9.prev = _context9.next) {
                    case 0:
                        params = this.request.body;
                        _ref8 = typeof params === 'string' ? JSON.parse(params) : params, csrf = _ref8.csrf, payload = _ref8.payload;

                        if ((0, _misc.checkCSRF)(this, csrf)) {
                            _context9.next = 4;
                            break;
                        }

                        return _context9.abrupt('return');

                    case 4:
                        console.log('-- /setUserPreferences -->', this.session.user, this.session.uid, payload);

                        if (this.session.a) {
                            _context9.next = 9;
                            break;
                        }

                        this.body = 'missing logged in account';
                        this.status = 500;
                        return _context9.abrupt('return');

                    case 9:
                        _context9.prev = 9;
                        json = (0, _stringify2.default)(payload);

                        if (!(json.length > 1024)) {
                            _context9.next = 13;
                            break;
                        }

                        throw new Error('the data is too long');

                    case 13:
                        this.session.user_prefs = json;
                        this.body = (0, _stringify2.default)({ status: 'ok' });
                        _context9.next = 22;
                        break;

                    case 17:
                        _context9.prev = 17;
                        _context9.t0 = _context9['catch'](9);

                        console.error('Error in /setUserPreferences api call', this.session.uid, _context9.t0);
                        this.body = (0, _stringify2.default)({ error: _context9.t0.message });
                        this.status = 500;

                    case 22:
                    case 'end':
                        return _context9.stop();
                }
            }
        }, _callee9, this, [[9, 17]]);
    }));

    router.post('/isTosAccepted', koaBody, /*#__PURE__*/_regenerator2.default.mark(function _callee10() {
        var params, _ref9, csrf, res;

        return _regenerator2.default.wrap(function _callee10$(_context10) {
            while (1) {
                switch (_context10.prev = _context10.next) {
                    case 0:
                        params = this.request.body;
                        _ref9 = typeof params === 'string' ? JSON.parse(params) : params, csrf = _ref9.csrf;

                        if ((0, _misc.checkCSRF)(this, csrf)) {
                            _context10.next = 4;
                            break;
                        }

                        return _context10.abrupt('return');

                    case 4:

                        this.body = '{}';
                        this.status = 200;

                        if (this.session.a) {
                            _context10.next = 10;
                            break;
                        }

                        this.body = 'missing username';
                        this.status = 500;
                        return _context10.abrupt('return');

                    case 10:
                        _context10.prev = 10;
                        _context10.next = 13;
                        return _steemJs.api.signedCallAsync('conveyor.get_tags_for_user', [this.session.a], _config2.default.get('conveyor_username'), _config2.default.get('conveyor_posting_wif'));

                    case 13:
                        res = _context10.sent;


                        this.body = (0, _stringify2.default)(res.includes(ACCEPTED_TOS_TAG));
                        _context10.next = 22;
                        break;

                    case 17:
                        _context10.prev = 17;
                        _context10.t0 = _context10['catch'](10);

                        console.error('Error in /isTosAccepted api call', this.session.a, _context10.t0);
                        this.body = (0, _stringify2.default)({ error: _context10.t0.message });
                        this.status = 500;

                    case 22:
                    case 'end':
                        return _context10.stop();
                }
            }
        }, _callee10, this, [[10, 17]]);
    }));

    router.post('/acceptTos', koaBody, /*#__PURE__*/_regenerator2.default.mark(function _callee11() {
        var params, _ref10, csrf;

        return _regenerator2.default.wrap(function _callee11$(_context11) {
            while (1) {
                switch (_context11.prev = _context11.next) {
                    case 0:
                        params = this.request.body;
                        _ref10 = typeof params === 'string' ? JSON.parse(params) : params, csrf = _ref10.csrf;

                        if ((0, _misc.checkCSRF)(this, csrf)) {
                            _context11.next = 4;
                            break;
                        }

                        return _context11.abrupt('return');

                    case 4:
                        if (this.session.a) {
                            _context11.next = 8;
                            break;
                        }

                        this.body = 'missing logged in account';
                        this.status = 500;
                        return _context11.abrupt('return');

                    case 8:
                        _context11.prev = 8;
                        _context11.next = 11;
                        return _steemJs.api.signedCallAsync('conveyor.assign_tag', {
                            uid: this.session.a,
                            tag: ACCEPTED_TOS_TAG
                        }, _config2.default.get('conveyor_username'), _config2.default.get('conveyor_posting_wif'));

                    case 11:
                        this.body = (0, _stringify2.default)({ status: 'ok' });
                        _context11.next = 19;
                        break;

                    case 14:
                        _context11.prev = 14;
                        _context11.t0 = _context11['catch'](8);

                        console.error('Error in /acceptTos api call', this.session.uid, _context11.t0);
                        this.body = (0, _stringify2.default)({ error: _context11.t0.message });
                        this.status = 500;

                    case 19:
                    case 'end':
                        return _context11.stop();
                }
            }
        }, _callee11, this, [[8, 14]]);
    }));
}

/**
 @arg signingKey {string|PrivateKey} - WIF or PrivateKey object
 */
function createAccount(_ref11) {
    var signingKey = _ref11.signingKey,
        fee = _ref11.fee,
        creator = _ref11.creator,
        new_account_name = _ref11.new_account_name,
        _ref11$json_metadata = _ref11.json_metadata,
        json_metadata = _ref11$json_metadata === undefined ? '' : _ref11$json_metadata,
        delegation = _ref11.delegation,
        owner = _ref11.owner,
        active = _ref11.active,
        posting = _ref11.posting,
        memo = _ref11.memo;
    var operations;
    return _regenerator2.default.wrap(function createAccount$(_context12) {
        while (1) {
            switch (_context12.prev = _context12.next) {
                case 0:
                    operations = [['account_create_with_delegation', {
                        fee: fee,
                        creator: creator,
                        new_account_name: new_account_name,
                        json_metadata: json_metadata,
                        delegation: delegation,
                        owner: {
                            weight_threshold: 1,
                            account_auths: [],
                            key_auths: [[owner, 1]]
                        },
                        active: {
                            weight_threshold: 1,
                            account_auths: [],
                            key_auths: [[active, 1]]
                        },
                        posting: {
                            weight_threshold: 1,
                            account_auths: [],
                            key_auths: [[posting, 1]]
                        },
                        memo_key: memo
                    }]];
                    _context12.next = 3;
                    return _steemJs.broadcast.sendAsync({
                        extensions: [],
                        operations: operations
                    }, [signingKey]);

                case 3:
                case 'end':
                    return _context12.stop();
            }
        }
    }, _marked, this);
}

var parseSig = function parseSig(hexSig) {
    try {
        return _ecc.Signature.fromHex(hexSig);
    } catch (e) {
        return null;
    }
};
//# sourceMappingURL=general.js.map