'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.numberWithCommas = undefined;

var _sign = require('babel-runtime/core-js/math/sign');

var _sign2 = _interopRequireDefault(_sign);

var _map = require('babel-runtime/core-js/map');

var _map2 = _interopRequireDefault(_map);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

exports.vestsToSpf = vestsToSpf;
exports.vestsToSp = vestsToSp;
exports.spToVestsf = spToVestsf;
exports.spToVests = spToVests;
exports.vestingSteem = vestingSteem;
exports.delegatedSteem = delegatedSteem;
exports.assetFloat = assetFloat;
exports.isFetchingOrRecentlyUpdated = isFetchingOrRecentlyUpdated;
exports.contentStats = contentStats;
exports.filterTags = filterTags;
exports.pricePerSteem = pricePerSteem;

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _constants = require('app/redux/constants');

var _constants2 = _interopRequireDefault(_constants);

var _ParsersAndFormatters = require('app/utils/ParsersAndFormatters');

var _bytebuffer = require('bytebuffer');

var _client_config = require('app/client_config');

var _immutable = require('immutable');

var _steemJs = require('@steemit/steem-js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var numberWithCommas = exports.numberWithCommas = function numberWithCommas(x) {
    return x.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

function vestsToSpf(state, vesting_shares) {
    var global = state.global;

    var vests = vesting_shares;
    if (typeof vesting_shares === 'string') {
        vests = assetFloat(vesting_shares, _client_config.VEST_TICKER);
    }
    var total_vests = assetFloat(global.getIn(['props', 'total_vesting_shares']), _client_config.VEST_TICKER);
    var total_vest_steem = assetFloat(global.getIn(['props', 'total_vesting_fund_steem']), _client_config.LIQUID_TICKER);
    return total_vest_steem * (vests / total_vests);
}

function vestsToSp(state, vesting_shares) {
    return vestsToSpf(state, vesting_shares).toFixed(3);
}

function spToVestsf(state, steem_power) {
    var global = state.global;

    var power = steem_power;
    if (typeof power === 'string') {
        power = assetFloat(power, _client_config.LIQUID_TICKER);
    }
    var total_vests = assetFloat(global.getIn(['props', 'total_vesting_shares']), _client_config.VEST_TICKER);
    var total_vest_steem = assetFloat(global.getIn(['props', 'total_vesting_fund_steem']), _client_config.LIQUID_TICKER);
    return steem_power / total_vest_steem * total_vests;
}

function spToVests(state, vesting_shares) {
    return spToVestsf(state, vesting_shares).toFixed(6);
}

function vestingSteem(account, gprops) {
    var vests = parseFloat(account.vesting_shares.split(' ')[0]);
    var total_vests = parseFloat(gprops.total_vesting_shares.split(' ')[0]);
    var total_vest_steem = parseFloat(gprops.total_vesting_fund_steem.split(' ')[0]);
    var vesting_steemf = total_vest_steem * (vests / total_vests);
    return vesting_steemf;
}

// How much STEEM this account has delegated out (minus received).
function delegatedSteem(account, gprops) {
    var delegated_vests = parseFloat(account.delegated_vesting_shares.split(' ')[0]);
    var received_vests = parseFloat(account.received_vesting_shares.split(' ')[0]);
    var vests = delegated_vests - received_vests;
    var total_vests = parseFloat(gprops.total_vesting_shares.split(' ')[0]);
    var total_vest_steem = parseFloat(gprops.total_vesting_fund_steem.split(' ')[0]);
    var vesting_steemf = total_vest_steem * (vests / total_vests);
    return vesting_steemf;
}

function assetFloat(str, asset) {
    try {
        _assert2.default.equal(typeof str === 'undefined' ? 'undefined' : (0, _typeof3.default)(str), 'string');
        _assert2.default.equal(typeof asset === 'undefined' ? 'undefined' : (0, _typeof3.default)(asset), 'string');
        (0, _assert2.default)(new RegExp('^\\d+(\\.\\d+)? ' + asset + '$').test(str), 'Asset should be formatted like 99.99 ' + asset + ': ' + str);
        return parseFloat(str.split(' ')[0]);
    } catch (e) {
        console.log(e);
        return undefined;
    }
}

function isFetchingOrRecentlyUpdated(global_status, order, category) {
    var status = global_status ? global_status.getIn([category || '', order]) : null;
    if (!status) return false;
    if (status.fetching) return true;
    if (status.last_fetch) {
        var res = new Date() - status.last_fetch < _constants2.default.FETCH_DATA_EXPIRE_SEC * 1000;
        return res;
    }
    return false;
}

function contentStats(content) {
    if (!content) return {};
    if (!(content instanceof _map2.default)) content = (0, _immutable.fromJS)(content);

    var net_rshares_adj = _bytebuffer.Long.ZERO;
    var neg_rshares = _bytebuffer.Long.ZERO;
    var total_votes = 0;
    var up_votes = 0;

    // TODO: breaks if content has no active_votes attribute.

    content.get('active_votes').forEach(function (v) {
        var sign = (0, _sign2.default)(v.get('percent'));
        if (sign === 0) return;
        total_votes += 1;
        if (sign > 0) up_votes += 1;

        var rshares = String(v.get('rshares'));

        // For flag weight: count total neg rshares
        if (sign < 0) {
            neg_rshares = neg_rshares.add(rshares);
        }

        // For graying: sum up total rshares from voters with non-neg reputation.
        if (String(v.get('reputation')).substring(0, 1) !== '-') {
            // And also ignore tiny downvotes (9 digits or less)
            if (!(rshares.substring(0, 1) === '-' && rshares.length < 11)) {
                net_rshares_adj = net_rshares_adj.add(rshares);
            }
        }
    });

    // take negative rshares, divide by 2, truncate 10 digits (plus neg sign), count digits.
    // creates a cheap log10, stake-based flag weight. 1 = approx $400 of downvoting stake; 2 = $4,000; etc
    var flagWeight = Math.max(String(neg_rshares.div(2)).length - 11, 0);

    // post must have non-trivial negative rshares to be grayed out. (more than 10 digits)
    var grayThreshold = -9999999999;
    var meetsGrayThreshold = net_rshares_adj.compare(grayThreshold) < 0;

    // to be eligible for deletion, a comment must have non-positive rshares and no replies
    var hasPositiveRshares = _bytebuffer.Long.fromString(String(content.get('net_rshares'))).gt(_bytebuffer.Long.ZERO);
    var allowDelete = !hasPositiveRshares && content.get('children') === 0;
    var hasPendingPayout = (0, _ParsersAndFormatters.parsePayoutAmount)(content.get('pending_payout_value')) >= 0.02;
    var authorRepLog10 = (0, _ParsersAndFormatters.repLog10)(content.get('author_reputation'));

    var gray = !hasPendingPayout && (authorRepLog10 < 1 || meetsGrayThreshold);
    var hide = !hasPendingPayout && authorRepLog10 < 0; // rephide

    // Combine tags+category to check nsfw status
    var json = content.get('json_metadata');
    var tags = [];
    try {
        tags = json && JSON.parse(json).tags || [];
        if (typeof tags == 'string') {
            tags = [tags];
        }
        if (!Array.isArray(tags)) {
            tags = [];
        }
    } catch (e) {
        tags = [];
    }
    tags.push(content.get('category'));
    tags = filterTags(tags);
    var isNsfw = tags.filter(function (tag) {
        return tag && tag.match(/^nsfw$/i);
    }).length > 0;

    return {
        hide: hide,
        gray: gray,
        authorRepLog10: authorRepLog10,
        allowDelete: allowDelete,
        isNsfw: isNsfw,
        flagWeight: flagWeight,
        total_votes: total_votes,
        up_votes: up_votes,
        hasPendingPayout: hasPendingPayout
    };
}

function filterTags(tags) {
    return tags.filter(function (tag) {
        return typeof tag === 'string';
    }).filter(function (value, index, self) {
        return value && self.indexOf(value) === index;
    });
}

function pricePerSteem(state) {
    var feed_price = state.user.get('latest_feed_price', state.global.get('feed_price'));
    if (feed_price && feed_price.has('base') && feed_price.has('quote')) {
        return _steemJs.formatter.pricePerSteem(feed_price.toJS());
    }
    return undefined;
}
//# sourceMappingURL=StateFunctions.js.map