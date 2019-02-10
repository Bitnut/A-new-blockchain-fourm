'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

exports.fetchFollowCount = fetchFollowCount;
exports.loadFollows = loadFollows;

var _immutable = require('immutable');

var _effects = require('redux-saga/effects');

var _steemJs = require('@steemit/steem-js');

var _GlobalReducer = require('app/redux/GlobalReducer');

var globalActions = _interopRequireWildcard(_GlobalReducer);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = /*#__PURE__*/_regenerator2.default.mark(fetchFollowCount),
    _marked2 = /*#__PURE__*/_regenerator2.default.mark(loadFollows),
    _marked3 = /*#__PURE__*/_regenerator2.default.mark(loadFollowsLoop);

/**
    This loadFollows both 'blog' and 'ignore'
*/

//fetch for follow/following count
function fetchFollowCount(account) {
    var counts;
    return _regenerator2.default.wrap(function fetchFollowCount$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    _context.next = 2;
                    return (0, _effects.call)([_steemJs.api, _steemJs.api.getFollowCountAsync], account);

                case 2:
                    counts = _context.sent;
                    _context.next = 5;
                    return (0, _effects.put)(globalActions.update({
                        key: ['follow_count', account],
                        updater: function updater(m) {
                            return m.mergeDeep({
                                follower_count: counts.follower_count,
                                following_count: counts.following_count
                            });
                        }
                    }));

                case 5:
                case 'end':
                    return _context.stop();
            }
        }
    }, _marked, this);
}

// Test limit with 2 (not 1, infinate looping)
function loadFollows(method, account, type) {
    var force = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    var hasResult;
    return _regenerator2.default.wrap(function loadFollows$(_context2) {
        while (1) {
            switch (_context2.prev = _context2.next) {
                case 0:
                    _context2.next = 2;
                    return (0, _effects.select)(function (state) {
                        return state.global.getIn(['follow', method, account, type + '_loading']);
                    });

                case 2:
                    if (!_context2.sent) {
                        _context2.next = 4;
                        break;
                    }

                    return _context2.abrupt('return');

                case 4:
                    if (force) {
                        _context2.next = 10;
                        break;
                    }

                    _context2.next = 7;
                    return (0, _effects.select)(function (state) {
                        return state.global.hasIn(['follow', method, account, type + '_result']);
                    });

                case 7:
                    hasResult = _context2.sent;

                    if (!hasResult) {
                        _context2.next = 10;
                        break;
                    }

                    return _context2.abrupt('return');

                case 10:
                    _context2.next = 12;
                    return (0, _effects.put)(globalActions.update({
                        key: ['follow', method, account],
                        notSet: (0, _immutable.Map)(),
                        updater: function updater(m) {
                            return m.set(type + '_loading', true);
                        }
                    }));

                case 12:
                    _context2.next = 14;
                    return loadFollowsLoop(method, account, type);

                case 14:
                case 'end':
                    return _context2.stop();
            }
        }
    }, _marked2, this);
}

function loadFollowsLoop(method, account, type) {
    var start = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
    var limit = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1000;
    var res, cnt, lastAccountName;
    return _regenerator2.default.wrap(function loadFollowsLoop$(_context3) {
        while (1) {
            switch (_context3.prev = _context3.next) {
                case 0:
                    _context3.t0 = _immutable.fromJS;
                    _context3.next = 3;
                    return _steemJs.api[method](account, start, type, limit);

                case 3:
                    _context3.t1 = _context3.sent;
                    res = (0, _context3.t0)(_context3.t1);

                    // console.log('res.toJS()', res.toJS())

                    cnt = 0;
                    lastAccountName = null;
                    _context3.next = 9;
                    return (0, _effects.put)(globalActions.update({
                        key: ['follow_inprogress', method, account],
                        notSet: (0, _immutable.Map)(),
                        updater: function updater(m) {
                            m = m.asMutable();
                            res.forEach(function (value) {
                                cnt += 1;

                                var whatList = value.get('what');
                                var accountNameKey = method === 'getFollowingAsync' ? 'following' : 'follower';
                                var accountName = lastAccountName = value.get(accountNameKey);
                                whatList.forEach(function (what) {
                                    //currently this is always true: what === type
                                    m.update(what, (0, _immutable.OrderedSet)(), function (s) {
                                        return s.add(accountName);
                                    });
                                });
                            });
                            return m.asImmutable();
                        }
                    }));

                case 9:
                    if (!(cnt === limit)) {
                        _context3.next = 14;
                        break;
                    }

                    _context3.next = 12;
                    return (0, _effects.call)(loadFollowsLoop, method, account, type, lastAccountName);

                case 12:
                    _context3.next = 16;
                    break;

                case 14:
                    _context3.next = 16;
                    return (0, _effects.put)(globalActions.update({
                        key: [],
                        updater: function updater(m) {
                            m = m.asMutable();

                            var result = m.getIn(['follow_inprogress', method, account, type], (0, _immutable.OrderedSet)());
                            m.deleteIn(['follow_inprogress', method, account, type]);
                            m.updateIn(['follow', method, account], (0, _immutable.Map)(), function (mm) {
                                var _mm$merge;

                                return mm.merge((_mm$merge = {}, (0, _defineProperty3.default)(_mm$merge, type + '_count', result.size), (0, _defineProperty3.default)(_mm$merge, type + '_result', result.reverse()), (0, _defineProperty3.default)(_mm$merge, type + '_loading', false), _mm$merge));
                            });
                            return m.asImmutable();
                        }
                    }));

                case 16:
                case 'end':
                    return _context3.stop();
            }
        }
    }, _marked3, this);
}
//# sourceMappingURL=FollowSaga.js.map