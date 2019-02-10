'use strict';

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

require('babel-core/register');

require('babel-polyfill');

require('whatwg-fetch');

var _store = require('store');

var _store2 = _interopRequireDefault(_store);

var _constants = require('shared/constants');

require('./assets/stylesheets/app.scss');

var _JsPlugins = require('app/utils/JsPlugins');

var _JsPlugins2 = _interopRequireDefault(_JsPlugins);

var _iso = require('iso');

var _iso2 = _interopRequireDefault(_iso);

var _UniversalRender = require('shared/UniversalRender');

var _ConsoleExports = require('./utils/ConsoleExports');

var _ConsoleExports2 = _interopRequireDefault(_ConsoleExports);

var _ServerApiClient = require('app/utils/ServerApiClient');

var _steemJs = require('@steemit/steem-js');

var steem = _interopRequireWildcard(_steemJs);

var _Links = require('app/utils/Links');

var _FrontendLogger = require('app/utils/FrontendLogger');

var _FrontendLogger2 = _interopRequireDefault(_FrontendLogger);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* 
* TODO: for 2/4 todo！
*/

window.addEventListener('error', _FrontendLogger2.default);

var CMD_LOG_T = 'log-t';
var CMD_LOG_TOGGLE = 'log-toggle';
var CMD_LOG_O = 'log-on';

try {
    if (process.env.NODE_ENV === 'development') {
        // 开发者模式增加错误报告
        // Adds some object refs to the global window object
        _ConsoleExports2.default.init(window);
    }
} catch (e) {
    console.error(e);
}

function runApp(initial_state) {
    var _this = this;

    console.log('Initial state', initial_state);

    // Remove "auth=true" query string.
    if ((typeof window === 'undefined' ? 'undefined' : (0, _typeof3.default)(window)) !== undefined && window.location.search.match(/[?&]{1}auth=true/)) {
        console.log('Removing temporary query string');
        window.history.replaceState('feed', 'Feed', window.location.pathname);
    }

    var konami = {
        code: 'xyzzy',
        enabled: false
    };
    var buff = konami.code.split('');
    var cmd = function cmd(command) {
        console.log('got command:' + command);
        switch (command) {
            case CMD_LOG_O:
                konami.enabled = false;
            case CMD_LOG_TOGGLE:
            case CMD_LOG_T:
                konami.enabled = !konami.enabled;
                if (konami.enabled) {
                    steem.api.setOptions({ logger: console });
                } else {
                    steem.api.setOptions({ logger: false });
                }
                return 'api logging ' + konami.enabled;
            default:
                return 'That command is not supported.';
        }
        //return 'done';
    };

    var enableKonami = function enableKonami() {
        if (!window.s) {
            console.log('The cupie doll is yours.');
            window.s = function (command) {
                return cmd.call(_this, command);
            };
        }
    };

    window.document.body.onkeypress = function (e) {
        buff.shift();
        buff.push(e.key);
        if (buff.join('') === konami.code) {
            enableKonami();
            cmd(CMD_LOG_T);
        }
    };

    if (window.location.hash.indexOf('#' + konami.code) === 0) {
        enableKonami();
        cmd(CMD_LOG_O);
    }

    var config = initial_state.offchain.config;
    steem.api.setOptions({
        url: config.steemd_connection_client,
        retry: true,
        useAppbaseApi: !!config.steemd_use_appbase
    });
    steem.config.set('address_prefix', config.address_prefix);
    steem.config.set('chain_id', config.chain_id);
    window.$STM_Config = config;
    (0, _JsPlugins2.default)(config);
    if (initial_state.offchain.serverBusy) {
        window.$STM_ServerBusy = true;
    }
    if (initial_state.offchain.csrf) {
        window.$STM_csrf = initial_state.offchain.csrf;
        delete initial_state.offchain.csrf;
    }

    initial_state.app.viewMode = (0, _Links.determineViewMode)(window.location.search);

    var locale = _store2.default.get('language');
    if (locale) initial_state.user.locale = locale;
    initial_state.user.maybeLoggedIn = !!_store2.default.get('autopost2');
    if (initial_state.user.maybeLoggedIn) {
        var username = new Buffer(_store2.default.get('autopost2'), 'hex').toString().split('\t')[0];
        initial_state.user.current = {
            username: username
        };
    }

    var location = '' + window.location.pathname + window.location.search + window.location.hash;

    try {
        (0, _UniversalRender.clientRender)(initial_state);
    } catch (error) {
        console.error(error);
        (0, _ServerApiClient.serverApiRecordEvent)('client_error', error);
    }
}

if (!window.Intl) {
    // FIXME: 这是啥，待研究
    require.ensure(['intl/dist/Intl'], function (require) {
        window.IntlPolyfill = window.Intl = require('intl/dist/Intl');
        require('intl/locale-data/jsonp/en-US.js');
        require('intl/locale-data/jsonp/es.js');
        require('intl/locale-data/jsonp/ru.js');
        require('intl/locale-data/jsonp/fr.js');
        require('intl/locale-data/jsonp/it.js');
        require('intl/locale-data/jsonp/ko.js');
        require('intl/locale-data/jsonp/ja.js');
        _iso2.default.bootstrap(runApp);
    }, 'IntlBundle');
} else {
    _iso2.default.bootstrap(runApp);
}
//# sourceMappingURL=Main.js.map