'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

exports.serverApiLogin = serverApiLogin;
exports.serverApiLogout = serverApiLogout;
exports.serverApiRecordEvent = serverApiRecordEvent;
exports.recordPageView = recordPageView;
exports.saveCords = saveCords;
exports.setUserPreferences = setUserPreferences;
exports.isTosAccepted = isTosAccepted;
exports.acceptTos = acceptTos;

var _steemJs = require('@steemit/steem-js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var request_base = {
    method: 'post',
    mode: 'no-cors',
    credentials: 'same-origin',
    headers: {
        Accept: 'application/json',
        'Content-type': 'application/json'
    }
};

function serverApiLogin(account, signatures) {
    if (!process.env.BROWSER || window.$STM_ServerBusy) return;
    var request = (0, _assign2.default)({}, request_base, {
        body: (0, _stringify2.default)({ account: account, signatures: signatures, csrf: $STM_csrf })
    });
    return fetch('/api/v1/login_account', request);
}

function serverApiLogout() {
    if (!process.env.BROWSER || window.$STM_ServerBusy) return;
    var request = (0, _assign2.default)({}, request_base, {
        body: (0, _stringify2.default)({ csrf: $STM_csrf })
    });
    return fetch('/api/v1/logout_account', request);
}

var last_call = void 0;
function serverApiRecordEvent(type, val) {
    var rate_limit_ms = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 5000;

    if (!process.env.BROWSER || window.$STM_ServerBusy) return;
    if (last_call && new Date() - last_call < rate_limit_ms) return;
    last_call = new Date();
    var value = val && val.stack ? val.toString() + ' | ' + val.stack : val;
    _steemJs.api.call('overseer.collect', { collection: 'event', metadata: { type: type, value: value } }, function (error) {
        // if (error) console.warn('overseer error', error, error.data);
    });
}

var last_page = void 0,
    last_views = void 0,
    last_page_promise = void 0;
function recordPageView(page, referer, account) {
    if (last_page_promise && page === last_page) return last_page_promise;

    if (!process.env.BROWSER) return _promise2.default.resolve(0);
    if (window.ga) {
        // virtual pageview
        window.ga('set', 'page', page);
        window.ga('send', 'pageview');
    }
    last_page_promise = _steemJs.api.callAsync('overseer.pageview', {
        page: page,
        referer: referer,
        account: account
    });
    last_page = page;
    return last_page_promise;
}

function saveCords(x, y) {
    var request = (0, _assign2.default)({}, request_base, {
        body: (0, _stringify2.default)({ csrf: $STM_csrf, x: x, y: y })
    });
    fetch('/api/v1/save_cords', request);
}

function setUserPreferences(payload) {
    if (!process.env.BROWSER || window.$STM_ServerBusy) return _promise2.default.resolve();
    var request = (0, _assign2.default)({}, request_base, {
        body: (0, _stringify2.default)({ csrf: window.$STM_csrf, payload: payload })
    });
    return fetch('/api/v1/setUserPreferences', request);
}

function isTosAccepted() {
    var request = (0, _assign2.default)({}, request_base, {
        body: (0, _stringify2.default)({ csrf: window.$STM_csrf })
    });
    return fetch('/api/v1/isTosAccepted', request).then(function (res) {
        return res.json();
    });
}

function acceptTos() {
    var request = (0, _assign2.default)({}, request_base, {
        body: (0, _stringify2.default)({ csrf: window.$STM_csrf })
    });
    return fetch('/api/v1/acceptTos', request);
}
//# sourceMappingURL=ServerApiClient.js.map