'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.validate_account_name = validate_account_name;
exports.validate_account_name_with_memo = validate_account_name_with_memo;
exports.validate_memo_field = validate_memo_field;

var _counterpart = require('counterpart');

var _counterpart2 = _interopRequireDefault(_counterpart);

var _BadActorList = require('app/utils/BadActorList');

var _BadActorList2 = _interopRequireDefault(_BadActorList);

var _VerifiedExchangeList = require('app/utils/VerifiedExchangeList');

var _VerifiedExchangeList2 = _interopRequireDefault(_VerifiedExchangeList);

var _ecc = require('@steemit/steem-js/lib/auth/ecc');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function validate_account_name(value) {
    var i = void 0,
        label = void 0,
        len = void 0,
        length = void 0,
        ref = void 0;

    if (!value) {
        return (0, _counterpart2.default)('chainvalidation_js.account_name_should_not_be_empty');
    }
    length = value.length;
    if (length < 3) {
        return (0, _counterpart2.default)('chainvalidation_js.account_name_should_be_longer');
    }
    if (length > 16) {
        return (0, _counterpart2.default)('chainvalidation_js.account_name_should_be_shorter');
    }
    if (_BadActorList2.default.includes(value)) {
        return (0, _counterpart2.default)('chainvalidation_js.badactor');
    }
    ref = value.split('.');
    for (i = 0, len = ref.length; i < len; i++) {
        label = ref[i];
        if (!/^[a-z]/.test(label)) {
            return (0, _counterpart2.default)('chainvalidation_js.each_account_segment_should_start_with_a_letter');
        }
        if (!/^[a-z0-9-]*$/.test(label)) {
            return (0, _counterpart2.default)('chainvalidation_js.each_account_segment_should_have_only_letters_digits_or_dashes');
        }
        if (/--/.test(label)) {
            return (0, _counterpart2.default)('chainvalidation_js.each_account_segment_should_have_only_one_dash_in_a_row');
        }
        if (!/[a-z0-9]$/.test(label)) {
            return (0, _counterpart2.default)('chainvalidation_js.each_account_segment_should_end_with_a_letter_or_digit');
        }
        if (!(label.length >= 3)) {
            return (0, _counterpart2.default)('chainvalidation_js.each_account_segment_should_be_longer');
        }
    }
    return null;
}

/**
 * Do some additional validation for situations where an account name is used along with a memo.
 * Currently only used in the Transfers compoonent.
 *
 * @param {string} name
 * @param {string} memo
 * @returns {null|string} string if there's a validation error
 */
function validate_account_name_with_memo(name, memo) {
    if (_VerifiedExchangeList2.default.includes(name) && !memo) {
        return (0, _counterpart2.default)('chainvalidation_js.verified_exchange_no_memo');
    }
    return validate_account_name(name);
}

function validate_memo_field(value, username, memokey) {
    value = value.split(' ').filter(function (v) {
        return v != '';
    });
    for (var w in value) {
        // Only perform key tests if it might be a key, i.e. it is a long string.
        if (value[w].length >= 39) {
            if (/5[HJK]\w{40,45}/i.test(value[w])) {
                return (0, _counterpart2.default)('chainvalidation_js.memo_has_privatekey');
            }
            if (_ecc.PrivateKey.isWif(value[w])) {
                return (0, _counterpart2.default)('chainvalidation_js.memo_is_privatekey');
            }
            if (memokey === _ecc.PrivateKey.fromSeed(username + 'memo' + value[w]).toPublicKey().toString()) {
                return (0, _counterpart2.default)('chainvalidation_js.memo_is_password');
            }
        }
    }
    return null;
}
//# sourceMappingURL=ChainValidation.js.map