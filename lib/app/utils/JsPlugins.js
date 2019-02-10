'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = init;
// 3rd party plugins

function init(config) {
    if (config.google_analytics_id) {
        (function (i, s, o, g, r, a, m) {
            i['GoogleAnalyticsObject'] = r;
            i[r] = i[r] || function () {
                (i[r].q = i[r].q || []).push(arguments);
            }, i[r].l = 1 * new Date();
            a = s.createElement(o), m = s.getElementsByTagName(o)[0];
            a.async = 1;
            a.src = g;
            m.parentNode.insertBefore(a, m);
        })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');
        ga('create', {
            trackingId: config.google_analytics_id,
            cookieDomain: 'auto',
            sampleRate: 5
        });
    }
}
//# sourceMappingURL=JsPlugins.js.map