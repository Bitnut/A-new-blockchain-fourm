'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.default = useAccountRecoveryApi;

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _koaBody = require('koa-body');

var _koaBody2 = _interopRequireDefault(_koaBody);

var _models = require('db/models');

var _models2 = _interopRequireDefault(_models);

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

var _misc = require('server/utils/misc');

var _steemJs = require('@steemit/steem-js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = /*#__PURE__*/_regenerator2.default.mark(requestAccountRecovery);

function useAccountRecoveryApi(app) {
    var router = (0, _koaRouter2.default)();
    app.use(router.routes());
    var koaBody = (0, _koaBody2.default)();

    router.post('/initiate_account_recovery', koaBody, /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        var params, attrs, request;
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

                        params = typeof params === 'string' ? JSON.parse(params) : params;

                        if ((0, _misc.checkCSRF)(this, params.csrf)) {
                            _context.next = 6;
                            break;
                        }

                        return _context.abrupt('return');

                    case 6:
                        console.log('-- /initiate_account_recovery -->', this.session.uid, params);
                        this.session.recover_account = null;

                        if (params.account_name) {
                            _context.next = 12;
                            break;
                        }

                        this.status = 500;
                        this.body = 'please provide account name';
                        return _context.abrupt('return');

                    case 12:
                        attrs = (0, _extends3.default)({ uid: this.session.uid, status: 'open' }, params);

                        attrs.remote_ip = (0, _misc.getRemoteIp)(this.req);
                        _context.next = 16;
                        return _models2.default.AccountRecoveryRequest.create((0, _models.escAttrs)(attrs));

                    case 16:
                        request = _context.sent;

                        console.log('-- /initiate_account_recovery request id -->', this.session.uid, request.id);
                        this.session.arec = request.id;
                        this.redirect('/connect/' + params.provider);

                    case 20:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    router.get('/account_recovery_confirmation/:code', /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
        var code, arec;
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
                        code = this.params.code;

                        if (code) {
                            _context2.next = 5;
                            break;
                        }

                        return _context2.abrupt('return', this.throw('no confirmation code', 404));

                    case 5:
                        _context2.next = 7;
                        return _models2.default.AccountRecoveryRequest.findOne({
                            attributes: ['id', 'account_name', 'owner_key'],
                            where: { validation_code: (0, _models.esc)(code) },
                            order: 'id desc'
                        });

                    case 7:
                        arec = _context2.sent;

                        if (arec) {
                            this.session.arec = arec.id;
                            console.log('-- /account_recovery_confirmation -->', this.session.uid, arec.id, arec.account_name, arec.owner_key);
                            this.redirect('/recover_account_step_2');
                        } else {
                            console.log('-- /account_recovery_confirmation code not found -->', this.session.uid, code);
                            this.throw('wrong confirmation code', 404);
                            this.session.arec = null;
                        }
                        this.body = code;

                    case 10:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, this);
    }));

    router.post('/api/v1/request_account_recovery', koaBody, /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
        var params, account_recovery_record, recovery_account, signing_key, _params, new_owner_authority, old_owner_key, new_owner_key, attrs;

        return _regenerator2.default.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        if (!(0, _misc.rateLimitReq)(this, this.req)) {
                            _context3.next = 2;
                            break;
                        }

                        return _context3.abrupt('return');

                    case 2:
                        params = this.request.body;

                        params = typeof params === 'string' ? JSON.parse(params) : params;

                        if ((0, _misc.checkCSRF)(this, params.csrf)) {
                            _context3.next = 6;
                            break;
                        }

                        return _context3.abrupt('return');

                    case 6:
                        _context3.prev = 6;

                        if (this.session.arec) {
                            _context3.next = 12;
                            break;
                        }

                        console.log('-- /request_account_recovery --> this.session.arec is empty', this.session.uid);
                        this.body = (0, _stringify2.default)({ error: 'Unauthorized' });
                        this.status = 401;
                        return _context3.abrupt('return');

                    case 12:
                        _context3.next = 14;
                        return _models2.default.AccountRecoveryRequest.findOne({
                            attributes: ['id', 'account_name', 'provider', 'status'],
                            where: { id: this.session.arec }
                        });

                    case 14:
                        account_recovery_record = _context3.sent;

                        if (!(!account_recovery_record || account_recovery_record.account_name !== params.name)) {
                            _context3.next = 20;
                            break;
                        }

                        console.log('-- /request_account_recovery --> no arec found or wrong name', this.session.uid, params.name);
                        this.body = (0, _stringify2.default)({ error: 'Unauthorized' });
                        this.status = 401;
                        return _context3.abrupt('return');

                    case 20:
                        if (!(account_recovery_record.status !== 'confirmed')) {
                            _context3.next = 25;
                            break;
                        }

                        console.log('-- /request_account_recovery --> no arec found or wrong name', this.session.uid, params.name);
                        this.body = (0, _stringify2.default)({ error: 'Unauthorized' });
                        this.status = 401;
                        return _context3.abrupt('return');

                    case 25:
                        recovery_account = _config2.default.get('registrar.account');
                        signing_key = _config2.default.get('registrar.signing_key');
                        _params = params, new_owner_authority = _params.new_owner_authority, old_owner_key = _params.old_owner_key, new_owner_key = _params.new_owner_key;
                        _context3.next = 30;
                        return requestAccountRecovery({
                            signing_key: signing_key,
                            account_to_recover: params.name,
                            recovery_account: recovery_account,
                            new_owner_authority: new_owner_authority
                        });

                    case 30:
                        console.log('-- /request_account_recovery completed -->', this.session.uid, this.session.user, params.name, old_owner_key, new_owner_key);

                        attrs = {
                            old_owner_key: (0, _models.esc)(old_owner_key),
                            new_owner_key: (0, _models.esc)(new_owner_key),
                            request_submitted_at: new Date()
                        };

                        account_recovery_record.update(attrs);

                        this.body = (0, _stringify2.default)({ status: 'ok' });
                        _context3.next = 41;
                        break;

                    case 36:
                        _context3.prev = 36;
                        _context3.t0 = _context3['catch'](6);

                        console.error('Error in /request_account_recovery api call', this.session.uid, this.session.user, _context3.t0.toString(), _context3.t0.stack);
                        this.body = (0, _stringify2.default)({ error: _context3.t0.message });
                        this.status = 500;

                    case 41:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, this, [[6, 36]]);
    }));

    router.post('/api/v1/initiate_account_recovery_with_email', koaBody, /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
        var params, _ref, csrf, contact_email, account_name, owner_key, arec, attrs, request;

        return _regenerator2.default.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        params = this.request.body;
                        _ref = typeof params === 'string' ? JSON.parse(params) : params, csrf = _ref.csrf, contact_email = _ref.contact_email, account_name = _ref.account_name, owner_key = _ref.owner_key;

                        if ((0, _misc.checkCSRF)(this, csrf)) {
                            _context4.next = 4;
                            break;
                        }

                        return _context4.abrupt('return');

                    case 4:
                        console.log('-- /initiate_account_recovery_with_email -->', this.session.uid, contact_email, account_name, owner_key);

                        if (!(!account_name || !contact_email || !owner_key)) {
                            _context4.next = 8;
                            break;
                        }

                        this.body = (0, _stringify2.default)({ status: 'error' });
                        return _context4.abrupt('return');

                    case 8:
                        _context4.next = 10;
                        return _models2.default.AccountRecoveryRequest.findOne({
                            attributes: ['id'],
                            where: (0, _models.escAttrs)({ account_name: account_name, contact_email: contact_email })
                        });

                    case 10:
                        arec = _context4.sent;

                        if (!arec) {
                            _context4.next = 14;
                            break;
                        }

                        this.body = (0, _stringify2.default)({ status: 'duplicate' });
                        return _context4.abrupt('return');

                    case 14:
                        attrs = {
                            uid: this.session.uid,
                            status: 'open',
                            contact_email: contact_email,
                            account_name: account_name,
                            owner_key: owner_key,
                            provider: 'email'
                        };

                        attrs.remote_ip = (0, _misc.getRemoteIp)(this.req);
                        _context4.next = 18;
                        return _models2.default.AccountRecoveryRequest.create((0, _models.escAttrs)(attrs));

                    case 18:
                        request = _context4.sent;

                        console.log('-- initiate_account_recovery_with_email  -->', this.session.uid, request.id, account_name, owner_key);
                        this.body = (0, _stringify2.default)({ status: 'ok' });

                    case 21:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, this);
    }));
}

function requestAccountRecovery(_ref2) {
    var recovery_account = _ref2.recovery_account,
        account_to_recover = _ref2.account_to_recover,
        new_owner_authority = _ref2.new_owner_authority,
        signing_key = _ref2.signing_key;
    var operations;
    return _regenerator2.default.wrap(function requestAccountRecovery$(_context5) {
        while (1) {
            switch (_context5.prev = _context5.next) {
                case 0:
                    operations = [['request_account_recovery', {
                        recovery_account: recovery_account,
                        account_to_recover: account_to_recover,
                        new_owner_authority: new_owner_authority
                    }]];
                    _context5.next = 3;
                    return _steemJs.broadcast.sendAsync({ extensions: [], operations: operations }, [signing_key]);

                case 3:
                case 'end':
                    return _context5.stop();
            }
        }
    }, _marked, this);
}
//# sourceMappingURL=account_recovery.js.map