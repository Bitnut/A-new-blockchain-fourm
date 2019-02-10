'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getState = exports.removeActiveWitnessVote = exports.addActiveWitnessVote = exports.hideDialog = exports.showDialog = exports.fetchJsonResult = exports.fetchJson = exports.clearMetaElement = exports.clearMeta = exports.setMetaData = exports.update = exports.remove = exports.set = exports.receiveMeta = exports.requestMeta = exports.receiveRecentPosts = exports.receiveData = exports.fetchingData = exports.voted = exports.deleteContent = exports.updateAccountWitnessProxy = exports.updateAccountWitnessVote = exports.linkReply = exports.receiveContent = exports.receiveComment = exports.syncPinnedPosts = exports.receiveAccounts = exports.receiveAccount = exports.receiveState = exports.setCollapsed = exports.GET_STATE = exports.defaultState = exports.emptyContentMap = undefined;
exports.default = reducer;

var _immutable = require('immutable');

var _EmptyState = require('app/redux/EmptyState');

var _StateFunctions = require('app/utils/StateFunctions');

var _constants = require('./constants');

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var emptyContentMap = exports.emptyContentMap = (0, _immutable.Map)(_EmptyState.emptyContent);

var defaultState = exports.defaultState = (0, _immutable.Map)({
    status: {}
});

// Action constants
var SET_COLLAPSED = 'global/SET_COLLAPSED';
var RECEIVE_STATE = 'global/RECEIVE_STATE';
var RECEIVE_ACCOUNT = 'global/RECEIVE_ACCOUNT';
var RECEIVE_ACCOUNTS = 'global/RECEIVE_ACCOUNTS';
var SYNC_PINNED_POSTS = 'global/SYNC_PINNED_POSTS';
var RECEIVE_COMMENT = 'global/RECEIVE_COMMENT';
var RECEIVE_CONTENT = 'global/RECEIVE_CONTENT';
var LINK_REPLY = 'global/LINK_REPLY';
var UPDATE_ACCOUNT_WITNESS_VOTE = 'global/UPDATE_ACCOUNT_WITNESS_VOTE';
var UPDATE_ACCOUNT_WITNESS_PROXY = 'global/UPDATE_ACCOUNT_WITNESS_PROXY';
var DELETE_CONTENT = 'global/DELETE_CONTENT';
var VOTED = 'global/VOTED';
var FETCHING_DATA = 'global/FETCHING_DATA';
var RECEIVE_DATA = 'global/RECEIVE_DATA';
var RECEIVE_RECENT_POSTS = 'global/RECEIVE_RECENT_POSTS';
var REQUEST_META = 'global/REQUEST_META';
var RECEIVE_META = 'global/RECEIVE_META';
var SET = 'global/SET';
var REMOVE = 'global/REMOVE';
var UPDATE = 'global/UPDATE';
var SET_META_DATA = 'global/SET_META_DATA';
var CLEAR_META = 'global/CLEAR_META';
var CLEAR_META_ELEMENT = 'global/CLEAR_META_ELEMENT';
var FETCH_JSON = 'global/FETCH_JSON';
var FETCH_JSON_RESULT = 'global/FETCH_JSON_RESULT';
var SHOW_DIALOG = 'global/SHOW_DIALOG';
var HIDE_DIALOG = 'global/HIDE_DIALOG';
var ADD_ACTIVE_WITNESS_VOTE = 'global/ADD_ACTIVE_WITNESS_VOTE';
var REMOVE_ACTIVE_WITNESS_VOTE = 'global/REMOVE_ACTIVE_WITNESS_VOTE';
// Saga-related:
var GET_STATE = exports.GET_STATE = 'global/GET_STATE';

/**
 * Transfrom nested JS object to appropriate immutable collection.
 *
 * @param {Object} account
 */

var transformAccount = function transformAccount(account) {
    return (0, _immutable.fromJS)(account, function (key, value) {
        if (key === 'witness_votes') return value.toSet();
        var isIndexed = _immutable.Iterable.isIndexed(value);
        return isIndexed ? value.toList() : value.toOrderedMap();
    });
};

/**
 * Merging accounts: A get_state will provide a very full account but a get_accounts will provide a smaller version this makes sure we don't overwrite
 *
 * @param {Immutable.Map} state
 * @param {Immutable.Map} account
 *
 */

var mergeAccounts = function mergeAccounts(state, account) {
    return state.updateIn(['accounts', account.get('name')], (0, _immutable.Map)(), function (a) {
        return a.mergeDeep(account);
    });
};

function reducer() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultState;
    var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var payload = action.payload;

    switch (action.type) {
        case SET_COLLAPSED:
            {
                return state.withMutations(function (map) {
                    map.updateIn(['content', payload.post], function (value) {
                        return value.merge((0, _immutable.Map)({ collapsed: payload.collapsed }));
                    });
                });
            }

        case RECEIVE_STATE:
            {
                var new_state = (0, _immutable.fromJS)(payload);
                if (new_state.has('content')) {
                    var content = new_state.get('content').withMutations(function (c) {
                        c.forEach(function (cc, key) {
                            cc = emptyContentMap.mergeDeep(cc);
                            var stats = (0, _immutable.fromJS)((0, _StateFunctions.contentStats)(cc));
                            c.setIn([key, 'stats'], stats);
                        });
                    });
                    new_state = new_state.set('content', content);
                }
                return state.mergeDeep(new_state);
            }

        case RECEIVE_ACCOUNT:
            {
                var account = transformAccount(payload.account);
                return mergeAccounts(state, account);
            }

        case RECEIVE_ACCOUNTS:
            {
                return payload.accounts.reduce(function (acc, curr) {
                    var transformed = transformAccount(curr);
                    return mergeAccounts(acc, transformed);
                }, state);
            }

        // Interleave pinned posts into the map of posts.
        case SYNC_PINNED_POSTS:
            {
                return payload.pinnedPosts.reduce(function (acc, pinnedPost) {
                    var author = pinnedPost.get('author');
                    var permlink = pinnedPost.get('permlink');
                    return state.updateIn(['content', author + '/' + permlink], (0, _immutable.Map)(), function (p) {
                        return p.mergeDeep(pinnedPost);
                    });
                }, state);
            }

        case RECEIVE_COMMENT:
            {
                var _payload$op = payload.op,
                    author = _payload$op.author,
                    permlink = _payload$op.permlink,
                    _payload$op$parent_au = _payload$op.parent_author,
                    parent_author = _payload$op$parent_au === undefined ? '' : _payload$op$parent_au,
                    _payload$op$parent_pe = _payload$op.parent_permlink,
                    parent_permlink = _payload$op$parent_pe === undefined ? '' : _payload$op$parent_pe,
                    _payload$op$title = _payload$op.title,
                    title = _payload$op$title === undefined ? '' : _payload$op$title,
                    body = _payload$op.body;

                var key = author + '/' + permlink;
                var updatedState = state.updateIn(['content', key], (0, _immutable.Map)(_EmptyState.emptyContent), function (r) {
                    return r.merge({
                        author: author,
                        permlink: permlink,
                        parent_author: parent_author,
                        parent_permlink: parent_permlink,
                        title: title.toString('utf-8'),
                        body: body.toString('utf-8')
                    });
                });
                if (parent_author !== '' && parent_permlink !== '') {
                    var parent_key = parent_author + '/' + parent_permlink;
                    updatedState = updatedState.updateIn(['content', parent_key, 'replies'], (0, _immutable.List)(), function (r) {
                        return r.insert(0, key);
                    });
                    var children = updatedState.getIn(['content', parent_key, 'replies'], (0, _immutable.List)()).size;
                    updatedState = updatedState.updateIn(['content', parent_key, 'children'], 0, function () {
                        return children;
                    });
                }
                return updatedState;
            }

        case RECEIVE_CONTENT:
            {
                var _content = (0, _immutable.fromJS)(payload.content);
                var _key = _content.get('author') + '/' + _content.get('permlink');
                return state.updateIn(['content', _key], (0, _immutable.Map)(), function (c) {
                    c = emptyContentMap.mergeDeep(c);
                    c = c.delete('active_votes');
                    c = c.mergeDeep(_content);
                    c = c.set('stats', (0, _immutable.fromJS)((0, _StateFunctions.contentStats)(c)));
                    return c;
                });
            }

        case LINK_REPLY:
            {
                var _author = payload.author,
                    _permlink = payload.permlink,
                    _payload$parent_autho = payload.parent_author,
                    _parent_author = _payload$parent_autho === undefined ? '' : _payload$parent_autho,
                    _payload$parent_perml = payload.parent_permlink,
                    _parent_permlink = _payload$parent_perml === undefined ? '' : _payload$parent_perml;

                if (_parent_author === '' || _parent_permlink === '') return state;
                var _key2 = _author + '/' + _permlink;
                var _parent_key = _parent_author + '/' + _parent_permlink;
                // Add key if not exist
                var _updatedState = state.updateIn(['content', _parent_key, 'replies'], (0, _immutable.List)(), function (l) {
                    return l.findIndex(function (i) {
                        return i === _key2;
                    }) === -1 ? l.push(_key2) : l;
                });
                var _children = _updatedState.getIn(['content', _parent_key, 'replies'], (0, _immutable.List)()).size;
                _updatedState = _updatedState.updateIn(['content', _parent_key, 'children'], 0, function () {
                    return _children;
                });
                return _updatedState;
            }

        case UPDATE_ACCOUNT_WITNESS_VOTE:
            {
                var _account = payload.account,
                    witness = payload.witness,
                    approve = payload.approve;

                return state.updateIn(['accounts', _account, 'witness_votes'], (0, _immutable.Set)(), function (votes) {
                    return approve ? (0, _immutable.Set)(votes).add(witness) : (0, _immutable.Set)(votes).remove(witness);
                });
            }

        case UPDATE_ACCOUNT_WITNESS_PROXY:
            {
                var _account2 = payload.account,
                    proxy = payload.proxy;

                return state.setIn(['accounts', _account2, 'proxy'], proxy);
            }

        case DELETE_CONTENT:
            {
                var _author2 = payload.author,
                    _permlink2 = payload.permlink;

                var _key3 = _author2 + '/' + _permlink2;
                var _content2 = state.getIn(['content', _key3]);
                var _parent_author2 = _content2.get('parent_author') || '';
                var _parent_permlink2 = _content2.get('parent_permlink') || '';
                var _updatedState2 = state.deleteIn(['content', _key3]);
                if (_parent_author2 !== '' && _parent_permlink2 !== '') {
                    var _parent_key2 = _parent_author2 + '/' + _parent_permlink2;
                    _updatedState2 = _updatedState2.updateIn(['content', _parent_key2, 'replies'], (0, _immutable.List)(), function (r) {
                        return r.filter(function (i) {
                            return i !== _key3;
                        });
                    });
                }
                return _updatedState2;
            }

        case VOTED:
            {
                var username = payload.username,
                    _author3 = payload.author,
                    _permlink3 = payload.permlink,
                    weight = payload.weight;

                var _key4 = ['content', _author3 + '/' + _permlink3, 'active_votes'];
                var active_votes = state.getIn(_key4, (0, _immutable.List)());
                var idx = active_votes.findIndex(function (v) {
                    return v.get('voter') === username;
                });
                // steemd flips weight into percent
                if (idx === -1) {
                    active_votes = active_votes.push((0, _immutable.Map)({ voter: username, percent: weight }));
                } else {
                    active_votes = active_votes.set(idx, (0, _immutable.Map)({ voter: username, percent: weight }));
                }
                state.setIn(_key4, active_votes);
                return state;
            }

        case FETCHING_DATA:
            {
                var order = payload.order,
                    category = payload.category;

                var _new_state = state.updateIn(['status', category || '', order], function () {
                    return { fetching: true };
                });
                return _new_state;
            }

        case RECEIVE_DATA:
            {
                var data = payload.data,
                    _order = payload.order,
                    _category = payload.category,
                    accountname = payload.accountname,
                    fetching = payload.fetching,
                    endOfData = payload.endOfData;

                var _new_state2 = void 0;
                if (_order === 'by_author' || _order === 'by_feed' || _order === 'by_comments' || _order === 'by_replies') {
                    // category is either "blog", "feed", "comments", or "recent_replies" (respectively) -- and all posts are keyed under current profile
                    var _key5 = ['accounts', accountname, _category];
                    _new_state2 = state.updateIn(_key5, (0, _immutable.List)(), function (list) {
                        return list.withMutations(function (posts) {
                            data.forEach(function (value) {
                                var key2 = value.author + '/' + value.permlink;
                                if (!posts.includes(key2)) posts.push(key2);
                            });
                        });
                    });
                } else {
                    _new_state2 = state.updateIn(['discussion_idx', _category || '', _order], function (list) {
                        return list.withMutations(function (posts) {
                            data.forEach(function (value) {
                                var entry = value.author + '/' + value.permlink;
                                if (!posts.includes(entry)) posts.push(entry);
                            });
                        });
                    });
                }
                _new_state2 = _new_state2.updateIn(['content'], function (content) {
                    return content.withMutations(function (map) {
                        data.forEach(function (value) {
                            var key = value.author + '/' + value.permlink;
                            value = (0, _immutable.fromJS)(value);
                            value = value.set('stats', (0, _immutable.fromJS)((0, _StateFunctions.contentStats)(value)));
                            map.set(key, value);
                        });
                    });
                });
                _new_state2 = _new_state2.updateIn(['status', _category || '', _order], function () {
                    if (endOfData) {
                        return { fetching: fetching, last_fetch: new Date() };
                    }
                    return { fetching: fetching };
                });
                return _new_state2;
            }
        case RECEIVE_RECENT_POSTS:
            {
                var _data = payload.data;

                var _new_state3 = state.updateIn(['discussion_idx', '', 'created'], function (list) {
                    if (!list) list = (0, _immutable.List)();
                    return list.withMutations(function (posts) {
                        _data.forEach(function (value) {
                            var entry = value.author + '/' + value.permlink;
                            if (!posts.includes(entry)) posts.unshift(entry);
                        });
                    });
                });
                _new_state3 = _new_state3.updateIn(['content'], function (content) {
                    return content.withMutations(function (map) {
                        _data.forEach(function (value) {
                            var key = value.author + '/' + value.permlink;
                            if (!map.has(key)) {
                                value = (0, _immutable.fromJS)(value);
                                value = value.set('stats', (0, _immutable.fromJS)((0, _StateFunctions.contentStats)(value)));

                                map.set(key, value);
                            }
                        });
                    });
                });
                return _new_state3;
            }

        case REQUEST_META:
            {
                var id = payload.id,
                    link = payload.link;

                return state.setIn(['metaLinkData', id], (0, _immutable.Map)({ link: link }));
            }

        case RECEIVE_META:
            {
                var _id = payload.id,
                    meta = payload.meta;

                return state.updateIn(['metaLinkData', _id], function (data) {
                    return data.merge(meta);
                });
            }

        case SET:
            {
                var _key6 = payload.key,
                    value = payload.value;

                var key_array = Array.isArray(_key6) ? _key6 : [_key6];
                return state.setIn(key_array, (0, _immutable.fromJS)(value));
            }

        case REMOVE:
            {
                var _key7 = Array.isArray(payload.key) ? payload.key : [payload.key];
                return state.removeIn(_key7);
            }

        case UPDATE:
            {
                var _key8 = payload.key,
                    _payload$notSet = payload.notSet,
                    notSet = _payload$notSet === undefined ? (0, _immutable.Map)() : _payload$notSet,
                    updater = payload.updater;

                return state.updateIn(_key8, notSet, updater);
            }

        case SET_META_DATA:
            {
                var _id2 = payload.id,
                    _meta = payload.meta;

                return state.setIn(['metaLinkData', _id2], (0, _immutable.fromJS)(_meta));
            }

        case CLEAR_META:
            {
                return state.deleteIn(['metaLinkData', payload.id]);
            }

        case CLEAR_META_ELEMENT:
            {
                var formId = payload.formId,
                    element = payload.element;

                return state.updateIn(['metaLinkData', formId], function (data) {
                    return data.remove(element);
                });
            }

        case FETCH_JSON:
            {
                return state;
            }

        case FETCH_JSON_RESULT:
            {
                var _id3 = payload.id,
                    result = payload.result,
                    error = payload.error;

                return state.set(_id3, (0, _immutable.fromJS)({ result: result, error: error }));
            }

        case SHOW_DIALOG:
            {
                var name = payload.name,
                    _payload$params = payload.params,
                    params = _payload$params === undefined ? {} : _payload$params;

                return state.update('active_dialogs', (0, _immutable.Map)(), function (d) {
                    return d.set(name, (0, _immutable.fromJS)({ params: params }));
                });
            }

        case HIDE_DIALOG:
            {
                return state.update('active_dialogs', function (d) {
                    return d.delete(payload.name);
                });
            }

        case ADD_ACTIVE_WITNESS_VOTE:
            {
                return state.update('transaction_witness_vote_active_' + payload.account, (0, _immutable.Set)(), function (s) {
                    return s.add(payload.witness);
                });
            }

        case REMOVE_ACTIVE_WITNESS_VOTE:
            {
                return state.update('transaction_witness_vote_active_' + payload.account, function (s) {
                    return s.delete(payload.witness);
                });
            }

        default:
            return state;
    }
}

// Action creators

var setCollapsed = exports.setCollapsed = function setCollapsed(payload) {
    return {
        type: SET_COLLAPSED,
        payload: payload
    };
};

var receiveState = exports.receiveState = function receiveState(payload) {
    return {
        type: RECEIVE_STATE,
        payload: payload
    };
};

var receiveAccount = exports.receiveAccount = function receiveAccount(payload) {
    return {
        type: RECEIVE_ACCOUNT,
        payload: payload
    };
};

var receiveAccounts = exports.receiveAccounts = function receiveAccounts(payload) {
    return {
        type: RECEIVE_ACCOUNTS,
        payload: payload
    };
};

var syncPinnedPosts = exports.syncPinnedPosts = function syncPinnedPosts(payload) {
    return {
        type: SYNC_PINNED_POSTS,
        payload: payload
    };
};

var receiveComment = exports.receiveComment = function receiveComment(payload) {
    return {
        type: RECEIVE_COMMENT,
        payload: payload
    };
};

var receiveContent = exports.receiveContent = function receiveContent(payload) {
    return {
        type: RECEIVE_CONTENT,
        payload: payload
    };
};

var linkReply = exports.linkReply = function linkReply(payload) {
    return {
        type: LINK_REPLY,
        payload: payload
    };
};

var updateAccountWitnessVote = exports.updateAccountWitnessVote = function updateAccountWitnessVote(payload) {
    return {
        type: UPDATE_ACCOUNT_WITNESS_VOTE,
        payload: payload
    };
};

var updateAccountWitnessProxy = exports.updateAccountWitnessProxy = function updateAccountWitnessProxy(payload) {
    return {
        type: UPDATE_ACCOUNT_WITNESS_PROXY,
        payload: payload
    };
};

var deleteContent = exports.deleteContent = function deleteContent(payload) {
    return {
        type: DELETE_CONTENT,
        payload: payload
    };
};

var voted = exports.voted = function voted(payload) {
    return {
        type: VOTED,
        payload: payload
    };
};

var fetchingData = exports.fetchingData = function fetchingData(payload) {
    return {
        type: FETCHING_DATA,
        payload: payload
    };
};

var receiveData = exports.receiveData = function receiveData(payload) {
    return {
        type: RECEIVE_DATA,
        payload: payload
    };
};

var receiveRecentPosts = exports.receiveRecentPosts = function receiveRecentPosts(payload) {
    return {
        type: RECEIVE_RECENT_POSTS,
        payload: payload
    };
};

var requestMeta = exports.requestMeta = function requestMeta(payload) {
    return {
        type: REQUEST_META,
        payload: payload
    };
};

var receiveMeta = exports.receiveMeta = function receiveMeta(payload) {
    return {
        type: RECEIVE_META,
        payload: payload
    };
};

// TODO: Find a better name for this
var set = exports.set = function set(payload) {
    return {
        type: SET,
        payload: payload
    };
};

var remove = exports.remove = function remove(payload) {
    return {
        type: REMOVE,
        payload: payload
    };
};

var update = exports.update = function update(payload) {
    return {
        type: UPDATE,
        payload: payload
    };
};

var setMetaData = exports.setMetaData = function setMetaData(payload) {
    return {
        type: SET_META_DATA,
        payload: payload
    };
};

var clearMeta = exports.clearMeta = function clearMeta(payload) {
    return {
        type: CLEAR_META,
        payload: payload
    };
};

var clearMetaElement = exports.clearMetaElement = function clearMetaElement(payload) {
    return {
        type: CLEAR_META_ELEMENT,
        payload: payload
    };
};

var fetchJson = exports.fetchJson = function fetchJson(payload) {
    return {
        type: FETCH_JSON,
        payload: payload
    };
};

var fetchJsonResult = exports.fetchJsonResult = function fetchJsonResult(payload) {
    return {
        type: FETCH_JSON_RESULT,
        payload: payload
    };
};

var showDialog = exports.showDialog = function showDialog(payload) {
    return {
        type: SHOW_DIALOG,
        payload: payload
    };
};

var hideDialog = exports.hideDialog = function hideDialog(payload) {
    return {
        type: HIDE_DIALOG,
        payload: payload
    };
};

var addActiveWitnessVote = exports.addActiveWitnessVote = function addActiveWitnessVote(payload) {
    return {
        type: ADD_ACTIVE_WITNESS_VOTE,
        payload: payload
    };
};

var removeActiveWitnessVote = exports.removeActiveWitnessVote = function removeActiveWitnessVote(payload) {
    return {
        type: REMOVE_ACTIVE_WITNESS_VOTE,
        payload: payload
    };
};

var getState = exports.getState = function getState(payload) {
    return {
        type: GET_STATE,
        payload: payload
    };
};
//# sourceMappingURL=GlobalReducer.js.map