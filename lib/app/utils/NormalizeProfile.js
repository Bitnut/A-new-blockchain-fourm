'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

exports.default = normalizeProfile;

var _Links = require('app/utils/Links');

var _Links2 = _interopRequireDefault(_Links);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function truncate(str, len) {
    if (str) {
        str = str.trim();
        if (str.length > len) {
            str = str.substring(0, len - 1) + '...';
        }
    }
    return str;
}

/**
 * Enforce profile data length & format standards.
 */
function normalizeProfile(account) {
    if (!account) return {};

    // Parse
    var profile = {};
    if (account.json_metadata) {
        try {
            var md = JSON.parse(account.json_metadata);
            if (md.profile) {
                profile = md.profile;
            }
            if (!((typeof profile === 'undefined' ? 'undefined' : (0, _typeof3.default)(profile)) == 'object')) {
                console.error('Expecting object in account.json_metadata.profile:', profile);
                profile = {};
            }
        } catch (e) {
            console.error('Invalid json metadata string', account.json_metadata, 'in account', account.name);
        }
    }

    // Read & normalize
    var _profile = profile,
        name = _profile.name,
        about = _profile.about,
        location = _profile.location,
        website = _profile.website,
        profile_image = _profile.profile_image,
        cover_image = _profile.cover_image;


    name = truncate(name, 20);
    about = truncate(about, 160);
    location = truncate(location, 30);

    if (/^@/.test(name)) name = null;
    if (website && website.length > 100) website = null;
    if (website && website.indexOf('http') === -1) {
        website = 'http://' + website;
    }
    if (website) {
        // enforce that the url regex matches, and fully
        var m = website.match(_Links2.default.any);
        if (!m || m[0] !== website) {
            website = null;
        }
    }

    if (profile_image && !/^https?:\/\//.test(profile_image)) profile_image = null;
    if (cover_image && !/^https?:\/\//.test(cover_image)) cover_image = null;

    return {
        name: name,
        about: about,
        location: location,
        website: website,
        profile_image: profile_image,
        cover_image: cover_image
    };
}
//# sourceMappingURL=NormalizeProfile.js.map