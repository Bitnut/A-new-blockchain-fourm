'use strict';

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//数据库部分
var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');
var basename = path.basename(module.filename);
var env = process.env.NODE_ENV || 'development';
var config = require('config');
var db = {};

var sequelize = new Sequelize(config.get('database_url'));

fs.readdirSync(__dirname).filter(function (file) {
    return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js';
}).forEach(function (file) {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
});

(0, _keys2.default)(db).forEach(function (modelName) {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

if (env === 'development') {
    // in dev, sync all table schema automatically for convenience
    sequelize.sync();
}

function esc(value) {
    var max_length = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 256;

    if (!value) return '';
    if (typeof value === 'number') return value;
    if (typeof value === 'boolean') return value;
    if (typeof value !== 'string') return '(object)';
    var res = value.substring(0, max_length - max_length * 0.2).replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, function (char) {
        switch (char) {
            case '\0':
                return '\\0';
            case '\x08':
                return '\\b';
            case '\x09':
                return '\\t';
            case '\x1a':
                return '\\z';
            case '\n':
                return '\\n';
            case '\r':
                return '\\r';
            // case '\'':
            // case "'":
            // case '"':
            // case '\\':
            // case '%':
            //     return '\\' + char; // prepends a backslash to backslash, percent, and double/single quotes
        }
        return '-';
    });
    return res.length < max_length ? res : '-';
}

db.esc = esc;

db.escAttrs = function (attrs) {
    var res = {};
    (0, _keys2.default)(attrs).forEach(function (key) {
        return res[key] = esc(attrs[key]);
    });
    return res;
};

module.exports = db;
//# sourceMappingURL=index.js.map