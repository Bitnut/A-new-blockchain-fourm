'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

exports.default = verify;

var _twilio = require('twilio');

var _twilio2 = _interopRequireDefault(_twilio);

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var accountSid = _config2.default.get('twilio.account_sid');
var authToken = _config2.default.get('twilio.auth_token');
var client = void 0;

function checkEligibility(phone) {
    // US, Canada +1
    // France +33
    // Spain +34
    // Italy +39
    // UK +44
    // Sweden +46
    // Germany +49
    // Mexico +52
    // Australia +61
    // Phillipines +63
    // Singapore +65
    // Turkey +90
    // Hong Kong +852
    // Israel +972

    var _arr = ['1', '33', '34', '39', '44', '46', '49', '52', '61', '63', '65', '90', '852', '972'];
    for (var _i = 0; _i < _arr.length; _i++) {
        var prefix = _arr[_i];
        if (phone.startsWith(prefix)) return true;
    }
    return false;
}

function verify(phone) {
    if (!client) client = new _twilio2.default.LookupsClient(accountSid, authToken);
    return new _promise2.default(function (resolve) {
        if (!checkEligibility(phone)) {
            resolve('na');
            return;
        }
        client.phoneNumbers(phone).get({
            type: 'carrier',
            addOns: 'whitepages_pro_phone_rep'
        }, function (error, result) {
            if (error) {
                if (error.code === 20404) {
                    console.log('Twilio phone not found ', phone);
                    resolve('block');
                } else {
                    console.error('Twilio error', (0, _stringify2.default)(error, null, 2));
                    resolve('error');
                }
            } else {
                if (result.addOns && result.addOns.results && result.addOns.results.whitepages_pro_phone_rep && result.addOns.results.whitepages_pro_phone_rep.result && result.addOns.results.whitepages_pro_phone_rep.result.results && result.addOns.results.whitepages_pro_phone_rep.result.results[0] && result.addOns.results.whitepages_pro_phone_rep.result.results[0].reputation && result.addOns.results.whitepages_pro_phone_rep.result.results[0].reputation.level) {
                    var reputation_level = result.addOns.results.whitepages_pro_phone_rep.result.results[0].reputation.level;
                    console.log('Twilio reputation level ', phone, reputation_level);
                    resolve(reputation_level < 3 ? 'pass' : 'block');
                } else {
                    console.error('Twilio result does not contain reputation level:', (0, _stringify2.default)(result, null, 2));
                    resolve('error');
                }
            }
        });
    });
}
//# sourceMappingURL=twilio.js.map