'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.default = verify;

var _nodeFetch = require('node-fetch');

var _nodeFetch2 = _interopRequireDefault(_nodeFetch);

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

var _secureRandom = require('secure-random');

var _secureRandom2 = _interopRequireDefault(_secureRandom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = /*#__PURE__*/_regenerator2.default.mark(verify);

var customer_id = _config2.default.get('telesign.customer_id');

var api_key = '';

if (_config2.default.get('telesign.rest_api_key')) {
    api_key = new Buffer(_config2.default.get('telesign.rest_api_key'), 'base64');
}

var use_case_code = 'BACS'; // Use Case: avoid bulk attack and spammers

// Testing, always blocked: 1-310-555-0100

/** @return {object} - {reference_id} or {error} */
function verify(_ref) {
    var mobile = _ref.mobile,
        confirmation_code = _ref.confirmation_code,
        ip = _ref.ip,
        ignore_score = _ref.ignore_score;

    var result, _result$risk, recommendation, score, phone, sms, _ref2, reference_id;

    return _regenerator2.default.wrap(function verify$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    _context.prev = 0;
                    _context.next = 3;
                    return getScore(mobile);

                case 3:
                    result = _context.sent;
                    _result$risk = result.risk, recommendation = _result$risk.recommendation, score = _result$risk.score;
                    phone = mobile;
                    // if (!ignore_score && recommendation !== 'allow') {

                    if (!(!ignore_score && (!score || score > 600))) {
                        _context.next = 9;
                        break;
                    }

                    console.log('TeleSign did not allow phone ' + mobile + ' ip ' + ip + '. TeleSign responded: ' + recommendation);
                    return _context.abrupt('return', {
                        error: 'Unable to verify your phone number. Please try a different phone number.',
                        score: score
                    });

                case 9:
                    if (result.numbering && result.numbering.cleansing && result.numbering.cleansing.sms) {
                        sms = result.numbering.cleansing.sms;

                        phone = sms.country_code + sms.phone_number;
                    }
                    _context.next = 12;
                    return verifySms({
                        mobile: mobile,
                        confirmation_code: confirmation_code,
                        ip: ip
                    });

                case 12:
                    _ref2 = _context.sent;
                    reference_id = _ref2.reference_id;
                    return _context.abrupt('return', { reference_id: reference_id, score: score, phone: phone });

                case 17:
                    _context.prev = 17;
                    _context.t0 = _context['catch'](0);

                    console.log('-- verify score error -->', _context.t0);
                    return _context.abrupt('return', { error: 'Unable to verify phone, please try again later.' });

                case 21:
                case 'end':
                    return _context.stop();
            }
        }
    }, _marked, this, [[0, 17]]);
}

function getScore(mobile) {
    var fields = urlencode({
        ucid: use_case_code
    });
    var resource = '/v1/phoneid/score/' + mobile.match(/\d+/g).join('');
    var method = 'GET';
    return (0, _nodeFetch2.default)('https://rest-ww.telesign.com' + resource + '?' + fields, {
        method: method,
        headers: authHeaders({ resource: resource, method: method })
    }).then(function (r) {
        return r.json();
    }).catch(function (error) {
        console.error('ERROR: Phone ' + mobile + ' score exception', (0, _stringify2.default)(error, null, 0));
        return _promise2.default.reject(error);
    }).then(function (response) {
        var status = response.status;

        if (status.code === 300) {
            // Transaction successfully completed
            console.log('Phone ' + mobile + ' score', (0, _stringify2.default)(response, null, 0));
            return _promise2.default.resolve(response);
        }
        console.error('ERROR: Phone ' + mobile + ' score', (0, _stringify2.default)(response, null, 0));
        return _promise2.default.reject(response);
    });
}

function verifySms(_ref3) {
    var mobile = _ref3.mobile,
        confirmation_code = _ref3.confirmation_code,
        ip = _ref3.ip;

    // https://developer.telesign.com/v2.0/docs/rest_api-verify-sms
    var f = {
        phone_number: mobile,
        language: 'en-US',
        ucid: use_case_code,
        verify_code: confirmation_code,
        template: '$$CODE$$ is your Steemit confirmation code'
    };
    if (ip) f.originating_ip = ip;
    var fields = urlencode(f);
    // console.log('fields', fields) // logspam

    var resource = '/v1/verify/sms';
    var method = 'POST';
    return (0, _nodeFetch2.default)('https://rest.telesign.com' + resource, {
        method: method,
        body: fields,
        headers: authHeaders({ resource: resource, method: method, fields: fields })
    }).then(function (r) {
        return r.json();
    }).catch(function (error) {
        console.error('ERROR: SMS failed to ' + mobile + ' code ' + confirmation_code + ' req ip ' + ip + ' exception', (0, _stringify2.default)(error, null, 0));
        return _promise2.default.reject(error);
    }).then(function (response) {
        var status = response.status;

        if (status.code === 290) {
            // Message in progress
            console.log('Sent SMS to ' + mobile + ' code ' + confirmation_code, (0, _stringify2.default)(response, null, 0));
            return _promise2.default.resolve(response);
        }
        console.error('ERROR: SMS failed to ' + mobile + ' code ' + confirmation_code + ':', (0, _stringify2.default)(response, null, 0));
        return _promise2.default.reject(response);
    });
}

/**
    @arg {string} resource `/v1/verify/AEBC93B5898342F790E4E19FED41A7DA`
    @arg {string} method [GET|POST|PUT]
    @arg {string} fields url query string
*/
function authHeaders(_ref4) {
    var resource = _ref4.resource,
        fields = _ref4.fields,
        _ref4$method = _ref4.method,
        method = _ref4$method === undefined ? 'GET' : _ref4$method;

    var auth_method = 'HMAC-SHA256';
    var currDate = new Date().toUTCString();
    var nonce = parseInt(_secureRandom2.default.randomBuffer(8).toString('hex'), 16).toString(36);

    var content_type = '';
    if (/POST|PUT/.test(method)) content_type = 'application/x-www-form-urlencoded';

    var strToSign = method + '\n' + content_type + '\n\nx-ts-auth-method:' + auth_method + '\nx-ts-date:' + currDate + '\nx-ts-nonce:' + nonce;

    if (fields) {
        strToSign += '\n' + fields;
    }
    strToSign += '\n' + resource;

    // console.log('strToSign', strToSign) // logspam
    var sig = _crypto2.default.createHmac('sha256', api_key).update(strToSign, 'utf8').digest('base64');

    var headers = {
        Authorization: 'TSA ' + customer_id + ':' + sig,
        'Content-Type': content_type,
        'x-ts-date': currDate,
        'x-ts-auth-method': auth_method,
        'x-ts-nonce': nonce
    };
    return headers;
}

var urlencode = function urlencode(json) {
    return (0, _keys2.default)(json).map(function (key) {
        return encodeURI(key) + '=' + encodeURI(json[key]);
    }).join('&');
};
//# sourceMappingURL=teleSign.js.map