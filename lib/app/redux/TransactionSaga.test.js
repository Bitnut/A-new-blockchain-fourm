'use strict';

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _effects = require('redux-saga/effects');

var _steemJs = require('@steemit/steem-js');

var _steemJs2 = _interopRequireDefault(_steemJs);

var _utils = require('redux-saga/utils');

var _TransactionReducer = require('app/redux/TransactionReducer');

var transactionActions = _interopRequireWildcard(_TransactionReducer);

var _TransactionSaga = require('./TransactionSaga');

var _client_config = require('app/client_config');

var _enzyme = require('enzyme');

var _enzymeAdapterReact = require('enzyme-adapter-react-15');

var _enzymeAdapterReact2 = _interopRequireDefault(_enzymeAdapterReact);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* global describe, it, before, beforeEach, after, afterEach */

(0, _enzyme.configure)({ adapter: new _enzymeAdapterReact2.default() });

var operation = {
    type: 'comment',
    author: 'Alice',
    body: "The Body is a pretty long chunck of text that represents the user's voice, it seems they have much to say, and this is one place where they can do that.",
    category: 'hi',
    json_metadata: {
        tags: ['hi'],
        app: 'steemit/0.1',
        format: 'markdown'
    },
    parent_author: 'candide',
    parent_permlink: 'cool',
    title: 'test',
    __config: {},
    errorCallback: function errorCallback() {
        return '';
    },
    successCallback: function successCallback() {
        return '';
    },
    memo: '#testing'
};

var username = 'Beatrice';

describe('TransactionSaga', function () {
    describe('watch user actions and trigger appropriate saga', function () {
        var gen = _TransactionSaga.transactionWatches;
        it('should call the broadcastOperation saga with every transactionActions.BROADCAST_OPERATION action', function () {
            expect(gen).toEqual([(0, _effects.takeEvery)(transactionActions.BROADCAST_OPERATION, _TransactionSaga.broadcastOperation), (0, _effects.takeEvery)(transactionActions.UPDATE_AUTHORITIES, _TransactionSaga.updateAuthorities), (0, _effects.takeEvery)(transactionActions.UPDATE_META, _TransactionSaga.updateMeta), (0, _effects.takeEvery)(transactionActions.RECOVER_ACCOUNT, _TransactionSaga.recoverAccount)]);
        });
    });

    describe('recoverAccount', function () {
        var gen = (0, _utils.cloneableGenerator)(_TransactionSaga.recoverAccount)({
            payload: {
                account_to_recover: 'one',
                old_password: 'two34567',
                new_password: 'two34567',
                onError: function onError() {
                    return 'error!';
                },
                onSuccess: function onSuccess() {
                    return 'success!';
                }
            }
        });
        it('should call getAccountsAsync with account_to_recover username as argument', function () {
            var actual = gen.next([{ id: 123, name: 'one' }]).value;
            var mockCall = (0, _effects.call)([_steemJs.api, _steemJs.api.getAccountsAsync], ['one']);
            expect(actual).toEqual(mockCall);
        });
        it('should call sendAsync with recover_account operation', function () {
            var actual = gen.next([{ id: 123, name: 'one' }]).value;
            var mockCall = _steemJs.broadcast.sendAsync({
                extensions: [],
                operations: [['recover_account', {
                    account_to_recover: 'one',
                    new_owner_authority: 'idk',
                    recent_owner_authority: 'something'
                }]]
            }, ['123', '345']);
            expect(actual).toEqual(mockCall);
        });
        it('should call sendAsync with account_update operation', function () {
            var actual = gen.next().value;
            var mockCall = _steemJs.broadcast.sendAsync({
                extensions: [],
                operations: [['account_update', {
                    account_to_recover: 'one',
                    new_owner_authority: 'idk',
                    recent_owner_authority: 'something',

                    account: 'one',
                    active: {
                        weight_threshold: 1,
                        account_auths: [],
                        key_auths: [['newactive', 1]]
                    },
                    posting: {
                        weight_threshold: 1,
                        account_auths: [],
                        key_auths: [['newposting', 1]]
                    },
                    memo_key: 'newmemo'
                }]]
            }, ['newownerprivate']);
            expect(actual).toEqual(mockCall);
        });
        it('should call getWithdrawRoutes with account name and outgoing as parameters', function () {
            var noAutoVests = gen.clone();
            var actual = noAutoVests.next().value;
            var mockCall = (0, _effects.call)([_steemJs.api, _steemJs.api.getWithdrawRoutes], ['one', 'outgoing']);
            expect(actual).toEqual(mockCall);
            var done = noAutoVests.next().done;
            expect(done).toBe(true);
        });
        it('should call getWithdrawRoutes with account name and outgoing as parameters, and be done if none are found', function () {
            var noAutoVests = gen.clone();
            var actual = noAutoVests.next().value;
            var mockCall = (0, _effects.call)([_steemJs.api, _steemJs.api.getWithdrawRoutes], ['one', 'outgoing']);
            expect(actual).toEqual(mockCall);
            var done = noAutoVests.next().done;
            expect(done).toBe(true);
        });
        it('should call getWithdrawRoutes with account name and outgoing as parameters, and reset all outgoing auto vesting routes to 0.', function () {
            var withAutoVests = gen.clone();
            withAutoVests.next([{ from_account: 'one', to_account: 'two' }]).value;
            var actual = withAutoVests.next([{ from_account: 'one', to_account: 'two' }]).value;
            var mockCall = (0, _effects.all)([(0, _effects.call)([_steemJs.broadcast, _steemJs.broadcast.setWithdrawVestingRoute], ['STM7UbRctdfcdBU6rMBEX5yPjWaR68xmq6buCkotR7RVEJHYWt1Jb', 'one', 'two', 0, true])]);
            expect(actual).toEqual(mockCall);
        });
    });

    describe('createPatch', function () {
        it('should return undefined if empty arguments are passed', function () {
            var actual = (0, _TransactionSaga.createPatch)('', '');
            expect(actual).toEqual(undefined);
        });
        it('should return the patch that reconciles two different strings', function () {
            var testString = 'there is something interesting going on here that I do not fully understand it is seemingly complex but it is actually quite simple';
            var actual = (0, _TransactionSaga.createPatch)(testString, testString + 'ILU');
            expect(actual).toEqual('@@ -120,12 +120,15 @@\n quite simple\n+ILU\n');
        });
    });

    describe('preBroadcast_transfer', function () {
        var operationSansMemo = (0, _extends3.default)({}, operation, {
            memo: undefined
        });
        var arg = { operation: operationSansMemo };
        it('should return select object if it has a memo attribute with string value starting with #', function () {
            var genR = (0, _TransactionSaga.preBroadcast_transfer)({ operation: operation });
            var actual = genR.next().value;
            var expected = (0, _effects.select)(function (state) {
                return state.user.getIn(['current', 'private_keys', 'memo_private']);
            });
            expect((0, _keys2.default)(actual)).toEqual(['@@redux-saga/IO', 'SELECT']);
        });
        it('should return the operation unchanged if it has no memo attribute', function () {
            var gen = (0, _TransactionSaga.preBroadcast_transfer)(arg);
            var actual = gen.next().value;
            expect(actual).toEqual(operationSansMemo);
        });
    });

    describe('createPermlink', function () {
        var gen = (0, _TransactionSaga.createPermlink)(operation.title, operation.author, operation.parent_author, operation.parent_permlink);
        it('should call the api to get a permlink if the title is valid', function () {
            var actual = gen.next().value;
            var mockCall = (0, _effects.call)([_steemJs.api, _steemJs.api.getContentAsync], operation.author, operation.title);
            expect(actual).toEqual(mockCall);
        });
        it('should return a string containing the transformed data from the api', function () {
            var permlink = gen.next({ body: 'test' }).value;
            expect(permlink.indexOf('test') > -1).toEqual(true); // TODO: cannot deep equal due to date stamp at runtime.
        });
        it('should generate own permlink, independent of api if title is empty', function () {
            var gen2 = (0, _TransactionSaga.createPermlink)('', operation.author, operation.parent_author, operation.parent_permlink);
            var actual = gen2.next().value;
            expect(actual.indexOf('re-' + operation.parent_author + '-' + operation.parent_permlink + '-') > -1).toEqual(true); // TODO: cannot deep equal due to random hash at runtime.
        });
    });

    describe('preBroadcast_comment', function () {
        var gen = (0, _TransactionSaga.preBroadcast_comment)({ operation: operation, username: username });

        it('should call createPermlink', function () {
            var permlink = gen.next(operation.title, operation.author, operation.parent_author, operation.parent_permlink).value;
            var actual = permlink.next().value;
            var expected = (0, _effects.call)([_steemJs.api, _steemJs.api.getContentAsync], operation.author, operation.title);
            expect(expected).toEqual(actual);
        });
        it('should return the comment options array.', function () {
            var actual = gen.next('mock-permlink-123').value;
            var expected = [['comment', {
                author: operation.author,
                category: operation.category,
                errorCallback: operation.errorCallback,
                successCallback: operation.successCallback,
                parent_author: operation.parent_author,
                parent_permlink: operation.parent_permlink,
                type: operation.type,
                __config: operation.__config,
                memo: operation.memo,
                permlink: 'mock-permlink-123',
                json_metadata: (0, _stringify2.default)(operation.json_metadata),
                title: new Buffer((operation.title || '').trim(), 'utf-8'),
                body: new Buffer(operation.body, 'utf-8') // TODO: new Buffer is deprecated, prefer Buffer.from()
            }]];
            expect(actual).toEqual(expected);
        });
        it('should return a patch as body value if patch is smaller than body.', function () {
            var originalBod = operation.body + 'minor difference';
            operation.__config.originalBody = originalBod;
            gen = (0, _TransactionSaga.preBroadcast_comment)({ operation: operation, username: username });
            gen.next(operation.title, operation.author, operation.parent_author, operation.parent_permlink);
            var actual = gen.next('mock-permlink-123').value;
            var expected = Buffer.from((0, _TransactionSaga.createPatch)(originalBod, operation.body), 'utf-8');
            expect(actual[0][1].body).toEqual(expected);
        });
        it('should return body as body value if patch is larger than body.', function () {
            var originalBod = 'major difference';
            operation.__config.originalBody = originalBod;
            gen = (0, _TransactionSaga.preBroadcast_comment)({ operation: operation, username: username });
            gen.next(operation.title, operation.author, operation.parent_author, operation.parent_permlink);
            var actual = gen.next('mock-permlink-123').value;
            var expected = Buffer.from(operation.body, 'utf-8');
            expect(actual[0][1].body).toEqual(expected, 'utf-8');
        });
    });
});
//# sourceMappingURL=TransactionSaga.test.js.map