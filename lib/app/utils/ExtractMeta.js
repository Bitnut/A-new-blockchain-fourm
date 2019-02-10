'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = extractMeta;

var _ExtractContent = require('app/utils/ExtractContent');

var _ExtractContent2 = _interopRequireDefault(_ExtractContent);

var _Accessors = require('app/utils/Accessors');

var _NormalizeProfile = require('app/utils/NormalizeProfile');

var _NormalizeProfile2 = _interopRequireDefault(_NormalizeProfile);

var _CanonicalLinker = require('app/utils/CanonicalLinker.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var site_desc = 'Steemit is a social media platform where everyone gets paid for creating and curating content. It leverages a robust digital points system (Steem) for digital rewards.';

function addSiteMeta(metas) {
    metas.push({ title: 'Steemit' });
    metas.push({ name: 'description', content: site_desc });
    metas.push({ property: 'og:type', content: 'website' });
    metas.push({ property: 'og:site_name', content: 'Steemit' });
    metas.push({ property: 'og:title', content: 'Steemit' });
    metas.push({ property: 'og:description', content: site_desc });
    metas.push({
        property: 'og:image',
        content: 'https://steemit.com/images/steemit.png'
    });
    metas.push({ property: 'fb:app_id', content: $STM_Config.fb_app });
    metas.push({ name: 'twitter:card', content: 'summary' });
    metas.push({ name: 'twitter:site', content: '@steemit' });
    metas.push({ name: 'twitter:title', content: '#Steemit' });
    metas.push({ name: 'twitter:description', site_desc: site_desc });
    metas.push({
        name: 'twitter:image',
        content: 'https://steemit.com/images/steemit.png'
    });
}

function extractMeta(chain_data, rp) {
    var metas = [];
    if (rp.username && rp.slug) {
        // post
        var post = rp.username + '/' + rp.slug;
        var content = chain_data.content[post];
        var author = chain_data.accounts[rp.username];
        var profile = (0, _NormalizeProfile2.default)(author);
        if (content && content.id !== '0.0.0') {
            // API currently returns 'false' data with id 0.0.0 for posts that do not exist
            var d = (0, _ExtractContent2.default)(_Accessors.objAccessor, content, false);
            var url = 'https://steemit.com' + d.link;
            var canonicalUrl = (0, _CanonicalLinker.makeCanonicalLink)(d);
            var title = d.title + ' — Steemit';
            var desc = d.desc + ' by ' + d.author;
            var image = d.image_link || profile.profile_image;
            var category = d.category,
                created = d.created;

            // Standard meta

            metas.push({ title: title });
            metas.push({ canonical: canonicalUrl });
            metas.push({ name: 'description', content: desc });

            // Open Graph data
            metas.push({ name: 'og:title', content: title });
            metas.push({ name: 'og:type', content: 'article' });
            metas.push({ name: 'og:url', content: url });
            metas.push({
                name: 'og:image',
                content: image || 'https://steemit.com/images/steemit.png'
            });
            metas.push({ name: 'og:description', content: desc });
            metas.push({ name: 'og:site_name', content: 'Steemit' });
            metas.push({ name: 'fb:app_id', content: $STM_Config.fb_app });
            metas.push({ name: 'article:tag', content: category });
            metas.push({
                name: 'article:published_time',
                content: created
            });

            // Twitter card data
            metas.push({
                name: 'twitter:card',
                content: image ? 'summary_large_image' : 'summary'
            });
            metas.push({ name: 'twitter:site', content: '@steemit' });
            metas.push({ name: 'twitter:title', content: title });
            metas.push({ name: 'twitter:description', content: desc });
            metas.push({
                name: 'twitter:image',
                content: image || 'https://steemit.com/images/steemit-twshare-2.png'
            });
        } else {
            addSiteMeta(metas);
        }
    } else if (rp.accountname) {
        // user profile root
        var account = chain_data.accounts[rp.accountname];

        var _normalizeProfile = (0, _NormalizeProfile2.default)(account),
            name = _normalizeProfile.name,
            about = _normalizeProfile.about,
            profile_image = _normalizeProfile.profile_image;

        if (name == null) name = account.name;
        if (about == null) about = 'Join thousands on steemit who share, post and earn rewards.';
        if (profile_image == null) profile_image = 'https://steemit.com/images/steemit-twshare-2.png';
        // Set profile tags
        var _title = '@' + account.name;
        var _desc = 'The latest posts from ' + name + '. Follow me at @' + account.name + '. ' + about;
        var _image = profile_image;

        // Standard meta
        metas.push({ name: 'description', content: _desc });

        // Twitter card data
        metas.push({ name: 'twitter:card', content: 'summary' });
        metas.push({ name: 'twitter:site', content: '@steemit' });
        metas.push({ name: 'twitter:title', content: _title });
        metas.push({ name: 'twitter:description', content: _desc });
        metas.push({ name: 'twitter:image', content: _image });
    } else {
        // site
        addSiteMeta(metas);
    }
    return metas;
}
//# sourceMappingURL=ExtractMeta.js.map