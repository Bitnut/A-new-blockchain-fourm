'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

exports.default = findUser;

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function findByProvider(provider_user_id, resolve) {
    if (!provider_user_id) resolve(null);
    var query = {
        attributes: ['user_id'],
        where: { provider_user_id: provider_user_id }
    };
    _models2.default.Identity.findOne(query).then(function (identity) {
        if (identity) {
            _models2.default.User.findOne({
                attributes: ['id'],
                where: { id: identity.user_id }
            }).then(function (u) {
                return resolve(u);
            });
        } else {
            resolve(null);
        }
    });
}

function findUser(_ref) {
    var user_id = _ref.user_id,
        email = _ref.email,
        uid = _ref.uid,
        provider_user_id = _ref.provider_user_id,
        name = _ref.name;

    console.log('-- findUser  -->', user_id, email, uid, provider_user_id, name);
    return new _promise2.default(function (resolve) {
        var query = void 0;
        var where_or = [];
        if (user_id) where_or.push({ id: user_id });
        if (email) where_or.push({ email: email });
        if (name) where_or.push({ name: name });
        if (uid) where_or.push({ uid: uid });
        if (where_or.length > 0) {
            query = {
                attributes: ['id'],
                where: { $or: where_or }
            };
            console.log('-- findUser query -->', query);
            _models2.default.User.findOne(query).then(function (user) {
                if (user) resolve(user);else {
                    findByProvider(provider_user_id, resolve);
                }
            });
        } else {
            findByProvider(provider_user_id, resolve);
        }
    });
}
//# sourceMappingURL=find_user.js.map