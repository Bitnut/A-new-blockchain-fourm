'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.pinnedPosts = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var pinnedPosts = exports.pinnedPosts = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        var postData, loadedPostData, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, url, _url$split$1$split, _url$split$1$split2, username, postId, post, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, notice, _notice$permalink$spl, _notice$permalink$spl2, _post;

        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        console.info('Loading pinned posts');

                        _context.next = 3;
                        return loadPinnedPosts();

                    case 3:
                        postData = _context.sent;
                        loadedPostData = {
                            pinned_posts: [],
                            notices: []
                        };
                        _iteratorNormalCompletion = true;
                        _didIteratorError = false;
                        _iteratorError = undefined;
                        _context.prev = 8;
                        _iterator = (0, _getIterator3.default)(postData.pinned_posts);

                    case 10:
                        if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                            _context.next = 21;
                            break;
                        }

                        url = _step.value;
                        _url$split$1$split = url.split('@')[1].split('/'), _url$split$1$split2 = (0, _slicedToArray3.default)(_url$split$1$split, 2), username = _url$split$1$split2[0], postId = _url$split$1$split2[1];
                        _context.next = 15;
                        return steem.api.getContentAsync(username, postId);

                    case 15:
                        post = _context.sent;

                        post.pinned = true;
                        loadedPostData.pinned_posts.push(post);

                    case 18:
                        _iteratorNormalCompletion = true;
                        _context.next = 10;
                        break;

                    case 21:
                        _context.next = 27;
                        break;

                    case 23:
                        _context.prev = 23;
                        _context.t0 = _context['catch'](8);
                        _didIteratorError = true;
                        _iteratorError = _context.t0;

                    case 27:
                        _context.prev = 27;
                        _context.prev = 28;

                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }

                    case 30:
                        _context.prev = 30;

                        if (!_didIteratorError) {
                            _context.next = 33;
                            break;
                        }

                        throw _iteratorError;

                    case 33:
                        return _context.finish(30);

                    case 34:
                        return _context.finish(27);

                    case 35:
                        _iteratorNormalCompletion2 = true;
                        _didIteratorError2 = false;
                        _iteratorError2 = undefined;
                        _context.prev = 38;
                        _iterator2 = (0, _getIterator3.default)(postData.notices);

                    case 40:
                        if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                            _context.next = 54;
                            break;
                        }

                        notice = _step2.value;

                        if (!notice.permalink) {
                            _context.next = 50;
                            break;
                        }

                        _notice$permalink$spl = notice.permalink.split('@')[1].split('/'), _notice$permalink$spl2 = (0, _slicedToArray3.default)(_notice$permalink$spl, 2), username = _notice$permalink$spl2[0], postId = _notice$permalink$spl2[1];
                        _context.next = 46;
                        return steem.api.getContentAsync(username, postId);

                    case 46:
                        _post = _context.sent;

                        loadedPostData.notices.push((0, _assign2.default)({}, notice, _post));
                        _context.next = 51;
                        break;

                    case 50:
                        loadedPostData.notices.push(notice);

                    case 51:
                        _iteratorNormalCompletion2 = true;
                        _context.next = 40;
                        break;

                    case 54:
                        _context.next = 60;
                        break;

                    case 56:
                        _context.prev = 56;
                        _context.t1 = _context['catch'](38);
                        _didIteratorError2 = true;
                        _iteratorError2 = _context.t1;

                    case 60:
                        _context.prev = 60;
                        _context.prev = 61;

                        if (!_iteratorNormalCompletion2 && _iterator2.return) {
                            _iterator2.return();
                        }

                    case 63:
                        _context.prev = 63;

                        if (!_didIteratorError2) {
                            _context.next = 66;
                            break;
                        }

                        throw _iteratorError2;

                    case 66:
                        return _context.finish(63);

                    case 67:
                        return _context.finish(60);

                    case 68:

                        console.info('Loaded pinned posts');

                        return _context.abrupt('return', loadedPostData);

                    case 70:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this, [[8, 23, 27, 35], [28,, 30, 34], [38, 56, 60, 68], [61,, 63, 67]]);
    }));

    return function pinnedPosts() {
        return _ref.apply(this, arguments);
    };
}();

var _config = require('config');

var config = _interopRequireWildcard(_config);

var _https = require('https');

var https = _interopRequireWildcard(_https);

var _steemJs = require('@steemit/steem-js');

var steem = _interopRequireWildcard(_steemJs);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function loadPinnedPosts() {
    return new _promise2.default(function (resolve, reject) {
        var emptyPinnedPosts = {
            pinned_posts: [],
            notices: []
        };

        if (!config.pinned_posts_url) {
            resolve(emptyPinnedPosts);
        }

        var request = https.get(config.pinned_posts_url, function (resp) {
            var data = '';
            resp.on('data', function (chunk) {
                data += chunk;
            });
            resp.on('end', function () {
                var json = JSON.parse(data);
                console.info('Received pinned posts payload', json);
                if (json === Object(json)) {
                    resolve(json);
                }
            });
        });

        request.on('error', function (e) {
            console.error('Could not load pinned posts', e);
            resolve(emptyPinnedPosts);
        });
    });
}
//# sourceMappingURL=PinnedPosts.js.map