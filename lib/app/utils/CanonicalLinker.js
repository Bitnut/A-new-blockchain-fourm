'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.makeCanonicalLink = makeCanonicalLink;

var _apps = require('steemscript/apps.json');

var _apps2 = _interopRequireDefault(_apps);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function makeCanonicalLink(d) {
    var canonicalUrl = 'https://steemit.com' + d.link;
    if (d.json_metadata && d.json_metadata.app && typeof d.json_metadata.app !== 'string') {
        return canonicalUrl;
    }
    var hasAppTemplateData = d.json_metadata && d.json_metadata.app && d.category && d.json_metadata.app.split('/').length === 2;
    if (hasAppTemplateData) {
        var app = d.json_metadata.app.split('/')[0];
        var hasAppData = _apps2.default[app] && _apps2.default[app].url_scheme;
        if (hasAppData) {
            canonicalUrl = _apps2.default[app].url_scheme.split('{category}').join(d.category).split('{username}').join(d.author).split('{permlink}').join(d.permlink);
        }
    }
    return canonicalUrl;
}
//# sourceMappingURL=CanonicalLinker.js.map