'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

exports.default = useEnterAndConfirmEmailPages;

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _koaBody = require('koa-body');

var _koaBody2 = _interopRequireDefault(_koaBody);

var _coRequest = require('co-request');

var _coRequest2 = _interopRequireDefault(_coRequest);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _server = require('react-dom/server');

var _models = require('db/models');

var _models2 = _interopRequireDefault(_models);

var _constants = require('shared/constants');

var _Links = require('app/utils/Links');

var _serverHtml = require('../server-html');

var _serverHtml2 = _interopRequireDefault(_serverHtml);

var _sendEmail = require('../sendEmail');

var _sendEmail2 = _interopRequireDefault(_sendEmail);

var _misc = require('server/utils/misc');

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

var _MiniHeader = require('app/components/modules/MiniHeader');

var _MiniHeader2 = _interopRequireDefault(_MiniHeader);

var _secureRandom = require('secure-random');

var _secureRandom2 = _interopRequireDefault(_secureRandom);

var _mixpanel = require('mixpanel');

var _mixpanel2 = _interopRequireDefault(_mixpanel);

var _steemJs = require('@steemit/steem-js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = /*#__PURE__*/_regenerator2.default.mark(confirmEmailHandler),
    _marked2 = /*#__PURE__*/_regenerator2.default.mark(checkRecaptcha);

var path = require('path');
var ROOT = path.join(__dirname, '../../..');

// FIXME copy paste code, refactor mixpanel out
var mixpanel = null;
if (_config2.default.has('mixpanel') && _config2.default.get('mixpanel')) {
    mixpanel = _mixpanel2.default.init(_config2.default.get('mixpanel'));
}

var assets_file = ROOT + '/tmp/webpack-stats-dev.json';
if (process.env.NODE_ENV === 'production') {
    assets_file = ROOT + '/tmp/webpack-stats-prod.json';
}

var assets = (0, _assign2.default)({}, require(assets_file), { script: [] });

assets.script.push('https://www.google.com/recaptcha/api.js');
assets.script.push('/enter_email/submit_form.js');

function confirmEmailHandler() {
    var confirmation_code, eid, hours_ago, number_of_created_accounts, eid_phone;
    return _regenerator2.default.wrap(function confirmEmailHandler$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    confirmation_code = this.params && this.params.code ? this.params.code : this.request.body.code;

                    console.log('-- /confirm_email -->', this.session.uid, this.session.user, confirmation_code);
                    _context.next = 4;
                    return _models2.default.Identity.findOne({
                        where: { confirmation_code: confirmation_code, provider: 'email' }
                    });

                case 4:
                    eid = _context.sent;

                    if (eid) {
                        _context.next = 10;
                        break;
                    }

                    console.log('confirmation code not found', this.session.uid, this.session.user, confirmation_code);
                    this.status = 401;
                    this.body = 'confirmation code not found';
                    return _context.abrupt('return');

                case 10:
                    if (!eid.email_verified) {
                        _context.next = 15;
                        break;
                    }

                    this.session.user = eid.user_id; // session recovery (user changed browsers)
                    this.flash = { success: 'Email has already been verified' };
                    this.redirect('/approval?confirm_email=true');
                    return _context.abrupt('return');

                case 15:
                    hours_ago = (Date.now() - eid.updated_at) / 1000.0 / 3600.0;

                    if (!(hours_ago > 24.0 * 10)) {
                        _context.next = 21;
                        break;
                    }

                    eid.destroy();
                    this.status = 401;
                    this.body = '<!DOCTYPE html>Confirmation code expired.  Please <a href="/enter_email">re-submit</a> your email for verification.';
                    return _context.abrupt('return');

                case 21:
                    _context.next = 23;
                    return _models2.default.sequelize.query('select count(*) as result from identities i join accounts a on a.user_id=i.user_id where i.provider=\'email\' and i.email=:email and a.created=1 and a.ignored<>1', {
                        replacements: { email: eid.email },
                        type: _models2.default.sequelize.QueryTypes.SELECT
                    });

                case 23:
                    number_of_created_accounts = _context.sent;

                    if (!(number_of_created_accounts && number_of_created_accounts[0].result > 0)) {
                        _context.next = 29;
                        break;
                    }

                    console.log('-- /confirm_email email has already been used -->', this.session.uid, eid.email);
                    this.flash = { error: 'This email has already been used' };
                    this.redirect('/pick_account');
                    return _context.abrupt('return');

                case 29:

                    this.session.user = eid.user_id;
                    _context.next = 32;
                    return eid.update({
                        verified: true
                    });

                case 32:
                    _context.next = 34;
                    return _models2.default.User.update({ email: eid.email }, {
                        where: { id: eid.user_id }
                    });

                case 34:
                    _context.next = 36;
                    return _models2.default.User.update({ account_status: 'waiting' }, {
                        where: { id: eid.user_id, account_status: 'onhold' }
                    });

                case 36:
                    if (mixpanel) mixpanel.track('SignupStepConfirmEmail', {
                        distinct_id: this.session.uid
                    });

                    _context.next = 39;
                    return _models2.default.Identity.findOne({
                        where: { user_id: eid.user_id, provider: 'phone', verified: true }
                    });

                case 39:
                    eid_phone = _context.sent;


                    if (eid_phone) {
                        // this.flash = { success: "Thanks for confirming your email!" };
                        this.redirect('/approval?confirm_email=true');
                    } else {
                        this.flash = {
                            success: 'Thanks for confirming your email. Your phone needs to be confirmed before proceeding.'
                        };
                        this.redirect('/enter_mobile');
                    }

                    // check if the phone is confirmed then redirect to create account - this is useful when we invite users and send them the link
                    // const mid = yield models.Identity.findOne({
                    //     attributes: ["verified"],
                    //     where: { user_id: eid.user_id, provider: "phone" },
                    //     order: "id DESC"
                    // });
                    // if (mid && mid.verified) {
                    //     this.redirect("/create_account");
                    // } else {
                    //     this.redirect("/enter_mobile");
                    // }

                case 41:
                case 'end':
                    return _context.stop();
            }
        }
    }, _marked, this);
}

function useEnterAndConfirmEmailPages(app) {
    var router = (0, _koaRouter2.default)();
    app.use(router.routes());
    var koaBody = (0, _koaBody2.default)();
    var rc_site_key = _config2.default.get('recaptcha.site_key');

    router.get('/start/:code', /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        var code, eid, user, there_is_created_account, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, a, check_account_res, account_created;

        return _regenerator2.default.wrap(function _callee$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        code = this.params.code;
                        _context2.next = 3;
                        return _models2.default.Identity.findOne({
                            attributes: ['id', 'user_id', 'verified'],
                            where: { provider: 'email', confirmation_code: code }
                        });

                    case 3:
                        eid = _context2.sent;

                        if (!eid) {
                            _context2.next = 10;
                            break;
                        }

                        _context2.next = 7;
                        return _models2.default.User.findOne({
                            attributes: ['id', 'account_status'],
                            where: { id: eid.user_id },
                            include: [{
                                model: _models2.default.Account,
                                attributes: ['id', 'name', 'ignored', 'created']
                            }]
                        });

                    case 7:
                        _context2.t0 = _context2.sent;
                        _context2.next = 11;
                        break;

                    case 10:
                        _context2.t0 = null;

                    case 11:
                        user = _context2.t0;

                        if (!(eid && user)) {
                            _context2.next = 62;
                            break;
                        }

                        // set session based on confirmation code(user from diff device, etc)
                        this.session.user = user.id;
                        if (user.uid) this.session.uid = user.uid;
                        console.log('-- checking incoming start request -->', this.session.uid, this.session.user);

                        if (eid.verified) {
                            _context2.next = 19;
                            break;
                        }

                        _context2.next = 19;
                        return eid.update({ verified: true });

                    case 19:
                        if (!(user.account_status === 'approved')) {
                            _context2.next = 24;
                            break;
                        }

                        console.log('-- approved account for -->', this.session.uid, this.session.user);
                        this.redirect('/create_account');
                        _context2.next = 60;
                        break;

                    case 24:
                        if (!(user.account_status === 'created')) {
                            _context2.next = 59;
                            break;
                        }

                        // check if account is really created onchain
                        there_is_created_account = false;
                        _iteratorNormalCompletion = true;
                        _didIteratorError = false;
                        _iteratorError = undefined;
                        _context2.prev = 29;
                        _iterator = (0, _getIterator3.default)(user.Accounts);

                    case 31:
                        if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                            _context2.next = 42;
                            break;
                        }

                        a = _step.value;
                        _context2.next = 35;
                        return _steemJs.api.getAccountsAsync([a.name]);

                    case 35:
                        check_account_res = _context2.sent;
                        account_created = check_account_res && check_account_res.length > 0;

                        if (account_created && !a.ignored) there_is_created_account = true;
                        if (!account_created && a.created) {
                            console.log('-- found ghost account -->', this.session.uid, this.session.user, a.name);
                            a.update({ created: false });
                        }

                    case 39:
                        _iteratorNormalCompletion = true;
                        _context2.next = 31;
                        break;

                    case 42:
                        _context2.next = 48;
                        break;

                    case 44:
                        _context2.prev = 44;
                        _context2.t1 = _context2['catch'](29);
                        _didIteratorError = true;
                        _iteratorError = _context2.t1;

                    case 48:
                        _context2.prev = 48;
                        _context2.prev = 49;

                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }

                    case 51:
                        _context2.prev = 51;

                        if (!_didIteratorError) {
                            _context2.next = 54;
                            break;
                        }

                        throw _iteratorError;

                    case 54:
                        return _context2.finish(51);

                    case 55:
                        return _context2.finish(48);

                    case 56:
                        if (there_is_created_account) {
                            // user clicked expired link - already created account
                            this.flash = {
                                alert: 'Your account has already been created.'
                            };
                            this.redirect('/login.html');
                        } else {
                            user.update({ account_status: 'approved' });
                            console.log('-- approved account (ghost) for -->', this.session.uid, this.session.user);
                            this.redirect('/create_account');
                        }
                        _context2.next = 60;
                        break;

                    case 59:
                        if (user.account_status === 'waiting') {
                            this.flash = {
                                error: 'Your account has not been approved yet.'
                            };
                            this.redirect('/');
                        } else {
                            this.flash = { error: 'Issue with your sign up status.' };
                            this.redirect('/');
                        }

                    case 60:
                        _context2.next = 64;
                        break;

                    case 62:
                        // no matching identity found redirect
                        this.flash = {
                            error: 'This is not a valid sign up code. Please click the link in your welcome email.'
                        };
                        this.redirect('/');

                    case 64:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee, this, [[29, 44, 48, 56], [49,, 51, 55]]);
    }));

    router.get('/enter_email', /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
        var params, viewMode, picked_account_name, check_account_res, default_email, body, props;
        return _regenerator2.default.wrap(function _callee2$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        console.log('-- /enter_email -->', this.session.uid, this.session.user, this.request.query.account);
                        params = (0, _Links.addToParams)({}, this.request.query, _constants.PARAM_VIEW_MODE, [_constants.VIEW_MODE_WHISTLE]);
                        viewMode = params[_constants.PARAM_VIEW_MODE] ? params[_constants.PARAM_VIEW_MODE] : '';
                        picked_account_name = this.session.picked_account_name = this.request.query.account;

                        if (picked_account_name) {
                            _context3.next = 8;
                            break;
                        }

                        this.flash = { error: 'Please select your account name' };
                        this.redirect('/pick_account' + (0, _Links.makeParams)(params));
                        return _context3.abrupt('return');

                    case 8:
                        _context3.next = 10;
                        return _steemJs.api.getAccountsAsync([picked_account_name]);

                    case 10:
                        check_account_res = _context3.sent;

                        if (!(check_account_res && check_account_res.length > 0)) {
                            _context3.next = 15;
                            break;
                        }

                        this.flash = {
                            error: picked_account_name + ' is already taken, please try another name'
                        };
                        this.redirect('/pick_account' + (0, _Links.makeParams)(params));
                        return _context3.abrupt('return');

                    case 15:
                        default_email = '';

                        if (this.request.query && this.request.query.email) default_email = this.request.query.email;
                        body = (0, _server.renderToString)(_react2.default.createElement(
                            'div',
                            { className: 'App CreateAccount' },
                            viewMode !== _constants.VIEW_MODE_WHISTLE ? _react2.default.createElement(_MiniHeader2.default, null) : null,
                            _react2.default.createElement('br', null),
                            _react2.default.createElement(
                                'div',
                                {
                                    className: 'row CreateAccount__step',
                                    style: { maxWidth: '32rem' }
                                },
                                _react2.default.createElement(
                                    'div',
                                    { className: 'column' },
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'progress' },
                                        _react2.default.createElement(
                                            'span',
                                            { style: { width: '50%' } },
                                            'Progress: 50%'
                                        )
                                    ),
                                    _react2.default.createElement(
                                        'form',
                                        {
                                            id: 'submit_email',
                                            action: '/submit_email' + (0, _Links.makeParams)(params),
                                            method: 'POST'
                                        },
                                        _react2.default.createElement(
                                            'h4',
                                            { className: 'CreateAccount__title' },
                                            'Your email address, please'
                                        ),
                                        _react2.default.createElement(
                                            'p',
                                            null,
                                            'We use this to contact you and verify account ownership if this account is ever compromised. We\'ll send a confirmation link, so please use a valid email.'
                                        ),
                                        _react2.default.createElement('input', {
                                            type: 'hidden',
                                            name: 'csrf',
                                            value: this.csrf
                                        }),
                                        _react2.default.createElement('input', {
                                            type: 'hidden',
                                            name: 'account',
                                            value: picked_account_name
                                        }),
                                        _react2.default.createElement(
                                            'label',
                                            null,
                                            'Email',
                                            _react2.default.createElement('input', {
                                                type: 'email',
                                                name: 'email',
                                                defaultValue: default_email
                                            })
                                        ),
                                        _react2.default.createElement('br', null),
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'error' },
                                            this.flash.error
                                        ),
                                        rc_site_key ? _react2.default.createElement(
                                            'button',
                                            {
                                                className: 'button g-recaptcha',
                                                'data-sitekey': rc_site_key,
                                                'data-callback': 'submit_email_form'
                                            },
                                            'CONTINUE'
                                        ) : _react2.default.createElement('input', {
                                            type: 'submit',
                                            className: 'button',
                                            value: 'Continue'
                                        })
                                    )
                                )
                            )
                        ));
                        props = { body: body, title: 'Email Address', assets: assets, meta: [] };

                        this.body = '<!DOCTYPE html>' + (0, _server.renderToString)(_react2.default.createElement(_serverHtml2.default, props));
                        if (mixpanel) mixpanel.track('SignupStepEmail', {
                            distinct_id: this.session.uid
                        });

                    case 21:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee2, this);
    }));

    router.post('/submit_email', koaBody, /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
        var params, _request$body, email, account, parsed_email, old_uid, user, confirmation_code, existing_account;

        return _regenerator2.default.wrap(function _callee3$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        if ((0, _misc.checkCSRF)(this, this.request.body.csrf)) {
                            _context4.next = 2;
                            break;
                        }

                        return _context4.abrupt('return');

                    case 2:
                        params = (0, _Links.addToParams)({}, this.request.query, _constants.PARAM_VIEW_MODE, [_constants.VIEW_MODE_WHISTLE]);
                        _request$body = this.request.body, email = _request$body.email, account = _request$body.account;

                        console.log('-- /submit_email -->', this.session.uid, email, account, this.request.query[_constants.PARAM_VIEW_MODE]);

                        if (email) {
                            _context4.next = 9;
                            break;
                        }

                        this.flash = { error: 'Please provide an email address' };
                        this.redirect('/enter_email?account=' + account + (0, _Links.makeParams)(params, '&'));
                        return _context4.abrupt('return');

                    case 9:
                        email = params.email = email.trim().toLowerCase();
                        account = params.account = account.trim().toLowerCase();

                        //recaptcha

                        if (!_config2.default.get('recaptcha.site_key')) {
                            _context4.next = 19;
                            break;
                        }

                        _context4.next = 14;
                        return checkRecaptcha(this);

                    case 14:
                        if (_context4.sent) {
                            _context4.next = 19;
                            break;
                        }

                        console.log('-- /submit_email captcha verification failed -->', this.session.uid, email, this.req.connection.remoteAddress);
                        this.flash = {
                            error: 'Failed captcha verification, please try again'
                        };
                        this.redirect('/enter_email' + (0, _Links.makeParams)(params));
                        return _context4.abrupt('return');

                    case 19:
                        parsed_email = email.match(/^.+\@.*?([\w\d-]+\.\w+)$/);

                        if (!(!parsed_email || parsed_email.length < 2)) {
                            _context4.next = 25;
                            break;
                        }

                        console.log('-- /submit_email not valid email -->', this.session.uid, email);
                        this.flash = { error: 'Not valid email address' };
                        this.redirect('/enter_email' + (0, _Links.makeParams)(params));
                        return _context4.abrupt('return');

                    case 25:
                        _context4.prev = 25;

                        // create user, use new uid
                        old_uid = this.session.uid;

                        this.session.uid = _secureRandom2.default.randomBuffer(13).toString('hex');
                        _context4.next = 30;
                        return _models2.default.User.create({
                            uid: this.session.uid,
                            remote_ip: (0, _misc.getRemoteIp)(this.request.req),
                            sign_up_meta: (0, _stringify2.default)({ last_step: 2 }),
                            account_status: 'waiting'
                        });

                    case 30:
                        user = _context4.sent;

                        this.session.user = user.id;
                        console.log('-- /submit_email created new user -->', old_uid, this.session.uid, user.id);

                        _context4.next = 35;
                        return _models2.default.UserAttribute.create({
                            user_id: user.id,
                            value: this.session.r,
                            type_of: 'referer'
                        });

                    case 35:
                        confirmation_code = _secureRandom2.default.randomBuffer(13).toString('hex');
                        // create identity

                        _context4.next = 38;
                        return _models2.default.Identity.create({
                            user_id: user.id,
                            provider: 'email',
                            verified: false,
                            email: email,
                            confirmation_code: confirmation_code
                        });

                    case 38:

                        console.log('-- /submit_email ->', this.session.uid, this.session.user, email, confirmation_code);

                        (0, _sendEmail2.default)('confirm_email', email, { confirmation_code: confirmation_code });

                        if (!account) {
                            _context4.next = 47;
                            break;
                        }

                        _context4.next = 43;
                        return _models2.default.Account.findOne({
                            attributes: ['id'],
                            where: { user_id: user.id, name: account },
                            order: 'id DESC'
                        });

                    case 43:
                        existing_account = _context4.sent;

                        if (existing_account) {
                            _context4.next = 47;
                            break;
                        }

                        _context4.next = 47;
                        return _models2.default.Account.create({
                            user_id: user.id,
                            name: account,
                            remote_ip: (0, _misc.getRemoteIp)(this.request.req)
                        });

                    case 47:
                        _context4.next = 54;
                        break;

                    case 49:
                        _context4.prev = 49;
                        _context4.t0 = _context4['catch'](25);

                        this.flash = { error: 'Internal Server Error' };
                        this.redirect('/enter_email' + +(0, _Links.makeParams)(params));
                        console.error('Error in /submit_email :', this.session.uid, _context4.t0.toString());

                    case 54:

                        // redirect to phone verification
                        this.redirect('/enter_mobile' + (0, _Links.makeParams)(params));

                    case 55:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee3, this, [[25, 49]]);
    }));

    router.get('/confirm_email/:code', confirmEmailHandler);
    router.post('/confirm_email', koaBody, confirmEmailHandler);
    router.get('/enter_email/submit_form.js', /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
        return _regenerator2.default.wrap(function _callee4$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        this.type = 'application/javascript';
                        this.body = "function submit_email_form(){document.getElementById('submit_email').submit()}";

                    case 2:
                    case 'end':
                        return _context5.stop();
                }
            }
        }, _callee4, this);
    }));
}

function checkRecaptcha(ctx) {
    var recaptcha, verificationUrl, captcha_failed, recaptcha_res, body;
    return _regenerator2.default.wrap(function checkRecaptcha$(_context6) {
        while (1) {
            switch (_context6.prev = _context6.next) {
                case 0:
                    if (!(process.env.NODE_ENV !== 'production')) {
                        _context6.next = 2;
                        break;
                    }

                    return _context6.abrupt('return', true);

                case 2:
                    recaptcha = ctx.request.body['g-recaptcha-response'];
                    verificationUrl = 'https://www.google.com/recaptcha/api/siteverify?secret=' + _config2.default.get('recaptcha.secret_key') + '&response=' + recaptcha + '&remoteip=' + ctx.req.connection.remoteAddress;
                    captcha_failed = void 0;
                    _context6.prev = 5;
                    _context6.next = 8;
                    return (0, _coRequest2.default)(verificationUrl);

                case 8:
                    recaptcha_res = _context6.sent;
                    body = JSON.parse(recaptcha_res.body);

                    captcha_failed = !body.success;
                    _context6.next = 17;
                    break;

                case 13:
                    _context6.prev = 13;
                    _context6.t0 = _context6['catch'](5);

                    captcha_failed = true;
                    console.error('-- /submit_email recaptcha request failed -->', verificationUrl, _context6.t0);

                case 17:
                    return _context6.abrupt('return', !captcha_failed);

                case 18:
                case 'end':
                    return _context6.stop();
            }
        }
    }, _marked2, this, [[5, 13]]);
}
//# sourceMappingURL=enter_confirm_email.js.map