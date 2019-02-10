'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

exports.default = useEnterAndConfirmMobilePages;

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _koaBody = require('koa-body');

var _koaBody2 = _interopRequireDefault(_koaBody);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _server = require('react-dom/server');

var _models = require('db/models');

var _models2 = _interopRequireDefault(_models);

var _constants = require('shared/constants');

var _Links = require('app/utils/Links');

var _serverHtml = require('server/server-html');

var _serverHtml2 = _interopRequireDefault(_serverHtml);

var _teleSign = require('server/utils/teleSign');

var _teleSign2 = _interopRequireDefault(_teleSign);

var _CountryCode = require('app/components/elements/CountryCode');

var _CountryCode2 = _interopRequireDefault(_CountryCode);

var _misc = require('server/utils/misc');

var _MiniHeader = require('app/components/modules/MiniHeader');

var _MiniHeader2 = _interopRequireDefault(_MiniHeader);

var _secureRandom = require('secure-random');

var _secureRandom2 = _interopRequireDefault(_secureRandom);

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

var _mixpanel = require('mixpanel');

var _mixpanel2 = _interopRequireDefault(_mixpanel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = /*#__PURE__*/_regenerator2.default.mark(confirmMobileHandler);
// import twilioVerify from "server/utils/twilio";


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

// function mousePosition(e) {
//     // log x/y cords
//     console.log("hereI am man", e);
//     if(e.type === 'mouseenter') {
//         console.log(e.screenX, e.screenY);
//     }
// }

function confirmMobileHandler(e) {
    var params, enterMobileUrl, confirmation_code, user, mid, hours_ago, number_of_created_accounts;
    return _regenerator2.default.wrap(function confirmMobileHandler$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    if ((0, _misc.checkCSRF)(this, this.request.body.csrf)) {
                        _context.next = 2;
                        break;
                    }

                    return _context.abrupt('return');

                case 2:
                    params = (0, _Links.addToParams)({}, this.request.query, _constants.PARAM_VIEW_MODE, [_constants.VIEW_MODE_WHISTLE]);
                    enterMobileUrl = '/enter_mobile' + (0, _Links.makeParams)(params);
                    confirmation_code = this.params && this.params.code ? this.params.code : this.request.body.code;

                    console.log('-- /confirm_mobile -->', this.session.uid, this.session.user, confirmation_code);

                    _context.next = 8;
                    return _models2.default.User.findOne({
                        attributes: ['id', 'account_status'],
                        where: { id: this.session.user }
                    });

                case 8:
                    user = _context.sent;

                    if (user) {
                        _context.next = 13;
                        break;
                    }

                    this.flash = {
                        error: 'User session not found, please make sure you have cookies enabled in your browser for this website'
                    };
                    this.redirect(enterMobileUrl);
                    return _context.abrupt('return');

                case 13:
                    _context.next = 15;
                    return _models2.default.Identity.findOne({
                        where: { user_id: user.id, provider: 'phone', confirmation_code: confirmation_code }
                    });

                case 15:
                    mid = _context.sent;

                    if (mid) {
                        _context.next = 20;
                        break;
                    }

                    this.flash = { error: 'Wrong confirmation code' };
                    this.redirect(enterMobileUrl);
                    return _context.abrupt('return');

                case 20:
                    hours_ago = (Date.now() - mid.updated_at) / 1000.0 / 3600.0;

                    if (!(hours_ago > 24.0)) {
                        _context.next = 26;
                        break;
                    }

                    this.status = 401;
                    this.flash = { error: 'Confirmation code has been expired' };
                    this.redirect(enterMobileUrl);
                    return _context.abrupt('return');

                case 26:
                    _context.next = 28;
                    return _models2.default.sequelize.query('select count(*) as result from identities i join accounts a on a.user_id=i.user_id where i.provider=\'phone\' and i.phone=:phone and a.created=1 and a.ignored<>1', {
                        replacements: { phone: mid.phone },
                        type: _models2.default.sequelize.QueryTypes.SELECT
                    });

                case 28:
                    number_of_created_accounts = _context.sent;

                    if (!(number_of_created_accounts && number_of_created_accounts[0].result > 0)) {
                        _context.next = 34;
                        break;
                    }

                    console.log('-- /confirm_mobile there are created accounts -->', user.id, mid.phone);
                    this.flash = { error: 'This phone number has already been used' };
                    this.redirect(enterMobileUrl);
                    return _context.abrupt('return');

                case 34:
                    _context.next = 36;
                    return mid.update({ provider: 'phone', verified: true });

                case 36:
                    if (!(user.account_status === 'onhold')) {
                        _context.next = 39;
                        break;
                    }

                    _context.next = 39;
                    return user.update({ account_status: 'waiting' });

                case 39:
                    if (mixpanel) mixpanel.track('SignupStepPhone', { distinct_id: this.session.uid });

                    console.log('--/Success phone redirecting user', this.session.user);
                    this.redirect('/approval' + (0, _Links.makeParams)(params));

                case 42:
                case 'end':
                    return _context.stop();
            }
        }
    }, _marked, this);
}

function useEnterAndConfirmMobilePages(app) {
    var router = (0, _koaRouter2.default)();
    app.use(router.routes());
    var koaBody = (0, _koaBody2.default)();

    router.get('/enter_mobile', /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        var params, viewMode, phone, country, body, props;
        return _regenerator2.default.wrap(function _callee$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        console.log('-- /enter_mobile -->', this.session.uid, this.session.user);
                        params = (0, _Links.addToParams)({}, this.request.query, _constants.PARAM_VIEW_MODE, [_constants.VIEW_MODE_WHISTLE]);
                        viewMode = params[_constants.PARAM_VIEW_MODE] ? params[_constants.PARAM_VIEW_MODE] : '';
                        phone = this.query.phone;
                        country = this.query.country;
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
                                        _react2.default.createElement('div', { style: { width: '90%' } })
                                    ),
                                    _react2.default.createElement(
                                        'form',
                                        {
                                            className: 'column',
                                            action: '/submit_mobile' + (0, _Links.makeParams)(params),
                                            method: 'POST'
                                        },
                                        _react2.default.createElement(
                                            'h4',
                                            { className: 'CreateAccount__title' },
                                            'Almost there!'
                                        ),
                                        _react2.default.createElement(
                                            'p',
                                            null,
                                            'We need to send you a quick text. '
                                        ),
                                        _react2.default.createElement(
                                            'p',
                                            null,
                                            'With each Steemit account comes a free initial grant of Steem Power! Phone verification helps cut down on spam accounts.'
                                        ),
                                        _react2.default.createElement(
                                            'p',
                                            null,
                                            _react2.default.createElement(
                                                'em',
                                                null,
                                                'Your phone number will not be used for any other purpose other than account verification and (potentially) account recovery should your account ever be compromised.'
                                            )
                                        ),
                                        _react2.default.createElement('input', {
                                            type: 'hidden',
                                            name: 'csrf',
                                            value: this.csrf
                                        }),
                                        _react2.default.createElement(
                                            'label',
                                            null,
                                            'Country Code',
                                            _react2.default.createElement(_CountryCode2.default, { name: 'country', value: country })
                                        ),
                                        _react2.default.createElement(
                                            'label',
                                            null,
                                            'Phone number',
                                            _react2.default.createElement('input', { type: 'tel', name: 'phone', value: phone })
                                        ),
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'secondary' },
                                            'Examples: 541-754-3010 | 89-636-48018'
                                        ),
                                        _react2.default.createElement('br', null),
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'secondary' },
                                            '* Land lines cannot receive SMS messages'
                                        ),
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'secondary' },
                                            '* Message and data rates may apply'
                                        ),
                                        _react2.default.createElement('br', null),
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'error' },
                                            this.flash.error
                                        ),
                                        _react2.default.createElement('input', {
                                            type: 'submit',
                                            className: 'button',
                                            value: 'Continue'
                                        })
                                    )
                                )
                            )
                        ));
                        props = { body: body, title: 'Phone Number', assets: assets, meta: [] };

                        this.body = '<!DOCTYPE html>' + (0, _server.renderToString)(_react2.default.createElement(_serverHtml2.default, props));
                        if (mixpanel) mixpanel.track('SignupStep2', { distinct_id: this.session.uid });

                    case 9:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee, this);
    }));

    router.post('/submit_mobile', koaBody, /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
        var user_id, country, localPhone, params, viewMode, enterMobileUrl, phone, confirmation_code, mid, seconds_ago, verifyResult, body, props;
        return _regenerator2.default.wrap(function _callee2$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        if ((0, _misc.checkCSRF)(this, this.request.body.csrf)) {
                            _context3.next = 2;
                            break;
                        }

                        return _context3.abrupt('return');

                    case 2:
                        user_id = this.session.user;
                        country = this.request.body.country;
                        localPhone = this.request.body.phone;
                        params = (0, _Links.addToParams)({}, this.request.query, _constants.PARAM_VIEW_MODE, [_constants.VIEW_MODE_WHISTLE]);
                        viewMode = params[_constants.PARAM_VIEW_MODE] ? params[_constants.PARAM_VIEW_MODE] : '';

                        if (user_id) {
                            _context3.next = 11;
                            break;
                        }

                        this.flash = {
                            error: 'Your session has been interrupted, please start over'
                        };
                        this.redirect('/pick_account' + (0, _Links.makeParams)(params));
                        return _context3.abrupt('return');

                    case 11:
                        params.country = country;
                        params.phone = localPhone;

                        enterMobileUrl = '/enter_mobile' + (0, _Links.makeParams)(params);

                        if (!(!country || country === '')) {
                            _context3.next = 18;
                            break;
                        }

                        this.flash = { error: 'Please select a country code' };
                        this.redirect(enterMobileUrl);
                        return _context3.abrupt('return');

                    case 18:
                        if (!(!localPhone || digits(localPhone).length === 0)) {
                            _context3.next = 22;
                            break;
                        }

                        this.flash = { error: 'Please provide a phone number' };
                        this.redirect(enterMobileUrl);
                        return _context3.abrupt('return');

                    case 22:
                        phone = digits(parseInt(country) + localPhone);

                        // const blocked_prefixes = yield models.List.findAll({
                        //     attributes: ["id", "value"],
                        //     where: { kk: "block-phone-prefix" }
                        // });
                        // for (const bp of blocked_prefixes) {
                        //     if (phone.match(new RegExp("^" + bp.value))) {
                        //         this.flash = {
                        //             error: "Unfortunately, we don't yet have support to send SMS to your carrier, please try again later."
                        //         };
                        //         this.redirect("/enter_mobile");
                        //         return;
                        //     }
                        // }

                        confirmation_code = parseInt(_secureRandom2.default.randomBuffer(8).toString('hex'), 16).toString(10).substring(0, 5); // 4 digit code

                        _context3.next = 26;
                        return _models2.default.Identity.findOne({
                            where: { user_id: user_id, provider: 'phone' }
                        });

                    case 26:
                        mid = _context3.sent;

                        if (!mid) {
                            _context3.next = 41;
                            break;
                        }

                        if (!mid.verified) {
                            _context3.next = 36;
                            break;
                        }

                        if (!(mid.phone === phone)) {
                            _context3.next = 34;
                            break;
                        }

                        this.flash = { success: 'Phone number has been verified' };
                        if (mixpanel) mixpanel.track('SignupStep3', {
                            distinct_id: this.session.uid
                        });
                        this.redirect('/approval' + (0, _Links.makeParams)(params));
                        return _context3.abrupt('return');

                    case 34:
                        _context3.next = 36;
                        return mid.update({ verified: false, phone: phone });

                    case 36:
                        seconds_ago = (Date.now() - mid.updated_at) / 1000.0;

                        if (!(seconds_ago < 60)) {
                            _context3.next = 41;
                            break;
                        }

                        this.flash = {
                            error: 'Confirmation was attempted a moment ago. You can attempt verification again in one minute.'
                        };
                        this.redirect(enterMobileUrl);
                        return _context3.abrupt('return');

                    case 41:
                        _context3.next = 43;
                        return (0, _teleSign2.default)({
                            mobile: phone,
                            confirmation_code: confirmation_code,
                            ip: (0, _misc.getRemoteIp)(this.req),
                            ignore_score: true //twilioResult === 'pass'
                        });

                    case 43:
                        verifyResult = _context3.sent;

                        if (!verifyResult.error) {
                            _context3.next = 48;
                            break;
                        }

                        this.flash = { error: verifyResult.error };
                        this.redirect(enterMobileUrl);
                        return _context3.abrupt('return');

                    case 48:

                        phone = verifyResult.phone;

                        if (!mid) {
                            _context3.next = 54;
                            break;
                        }

                        _context3.next = 52;
                        return mid.update({
                            confirmation_code: confirmation_code,
                            phone: phone,
                            score: verifyResult.score
                        });

                    case 52:
                        _context3.next = 57;
                        break;

                    case 54:
                        _context3.next = 56;
                        return _models2.default.Identity.create({
                            provider: 'phone',
                            user_id: user_id,
                            uid: this.session.uid,
                            phone: phone,
                            verified: false,
                            confirmation_code: confirmation_code,
                            score: verifyResult.score
                        });

                    case 56:
                        mid = _context3.sent;

                    case 57:

                        console.log('-- /submit_mobile -->', this.session.uid, this.session.user, phone, mid.id);

                        body = (0, _server.renderToString)(_react2.default.createElement(
                            'div',
                            { className: 'App CreateAccount' },
                            viewMode !== _constants.VIEW_MODE_WHISTLE ? _react2.default.createElement(_MiniHeader2.default, null) : null,
                            _react2.default.createElement('br', null),
                            _react2.default.createElement(
                                'div',
                                { className: 'row', style: { maxWidth: '32rem' } },
                                _react2.default.createElement(
                                    'div',
                                    { className: 'column' },
                                    _react2.default.createElement(
                                        'progress',
                                        { max: '100', value: '90' },
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'progress' },
                                            _react2.default.createElement('div', { style: { width: '90%' } })
                                        )
                                    ),
                                    'Thank you for providing your phone number (',
                                    phone,
                                    ').',
                                    _react2.default.createElement('br', null),
                                    'To continue please enter the SMS code we\'ve sent you.'
                                )
                            ),
                            _react2.default.createElement('br', null),
                            _react2.default.createElement(
                                'div',
                                { className: 'row', style: { maxWidth: '32rem' } },
                                _react2.default.createElement(
                                    'form',
                                    {
                                        className: 'column',
                                        action: '/confirm_mobile' + (0, _Links.makeParams)(params),
                                        method: 'POST'
                                    },
                                    _react2.default.createElement('input', { type: 'hidden', name: 'csrf', value: this.csrf }),
                                    _react2.default.createElement(
                                        'label',
                                        null,
                                        'Confirmation code',
                                        _react2.default.createElement('input', { type: 'text', name: 'code' })
                                    ),
                                    _react2.default.createElement('br', null),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'secondary' },
                                        'Didn\'t receive the verification code?',
                                        ' ',
                                        _react2.default.createElement(
                                            'a',
                                            { href: enterMobileUrl },
                                            'Re-send'
                                        )
                                    ),
                                    _react2.default.createElement('br', null),
                                    _react2.default.createElement('input', {
                                        type: 'submit',
                                        className: 'button',
                                        value: 'Continue'
                                    })
                                )
                            )
                        ));
                        props = { body: body, title: 'Phone Confirmation', assets: assets, meta: [] };

                        this.body = '<!DOCTYPE html>' + (0, _server.renderToString)(_react2.default.createElement(_serverHtml2.default, props));

                    case 61:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee2, this);
    }));

    router.get('/confirm_mobile/:code', confirmMobileHandler);
    router.post('/confirm_mobile', koaBody, confirmMobileHandler);
}

function digits(text) {
    var digitArray = text.match(/\d+/g);
    return digitArray ? digitArray.join('') : '';
}
//# sourceMappingURL=enter_confirm_mobile.js.map