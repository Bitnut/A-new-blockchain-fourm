'use strict';

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactIntl = require('react-intl');

var _reactRedux = require('react-redux');

var _redux = require('redux');

var _enzyme = require('enzyme');

var _enzymeAdapterReact = require('enzyme-adapter-react-15');

var _enzymeAdapterReact2 = _interopRequireDefault(_enzymeAdapterReact);

var _immutable = require('immutable');

var _reactTestRenderer = require('react-test-renderer');

var _reactTestRenderer2 = _interopRequireDefault(_reactTestRenderer);

var _RootReducer = require('app/redux/RootReducer');

var _RootReducer2 = _interopRequireDefault(_RootReducer);

var _Voting = require('./Voting');

var _Voting2 = _interopRequireDefault(_Voting);

var _reduxMockStore = require('redux-mock-store');

var _reduxMockStore2 = _interopRequireDefault(_reduxMockStore);

var _mockLocalStorage = require('mock-local-storage');

var _mockLocalStorage2 = _interopRequireDefault(_mockLocalStorage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

global.window = {};

window.localStorage = global.localStorage;

(0, _enzyme.configure)({ adapter: new _enzymeAdapterReact2.default() });

var mockGlobal = (0, _immutable.Map)({
    props: (0, _immutable.Map)({ sbd_print_rate: 99 }),
    feed_price: (0, _immutable.Map)({
        base: '5 SBD',
        quote: '10 STEEM'
    }),
    content: (0, _immutable.Map)({
        test: (0, _immutable.Map)({
            author: 'Jane Doe',
            permlink: 'zip',
            active_votes: (0, _immutable.Map)({}),
            stats: {
                total_votes: 1
            },
            max_accepted_payout: '999999 SBD',
            percent_steem_dollars: 0,
            pending_payout_value: '10 SBD',
            cashout_time: '2018-03-30T10:00:00Z',
            pending_payout_sbd: 99
        })
    })
});

var mockUser = (0, _immutable.Map)({ current: (0, _immutable.Map)({ username: 'Janice' }) });

var voteTestObj = (0, _immutable.fromJS)({
    stats: {
        total_votes: 1
    },
    max_accepted_payout: '999999 SBD',
    percent_steem_dollars: 0,
    pending_payout_value: '10 SBD',
    cashout_time: '2018-03-30T10:00:00Z'
});

describe('Voting', function () {
    it('should render nothing if flag prop is true and user is not logged in.', function () {
        var mockStore = (0, _reduxMockStore2.default)()({
            global: (0, _immutable.Map)({}),
            market: {},
            offchain: {},
            user: {},
            transaction: {},
            discussion: {},
            routing: {},
            app: {}
        });
        var wrapped = (0, _enzyme.shallow)(_react2.default.createElement(_Voting2.default, {
            post: 'test',
            flag: true,
            vote: function vote(w, p) {},
            post_obj: voteTestObj,
            price_per_steem: 1,
            sbd_print_rate: 10000,
            store: mockStore
        })).dive();
        expect(wrapped.isEmptyRender()).toEqual(true);
    });

    it('should render flag if user is logged in and flag prop is true.', function () {
        var mockStore = (0, _reduxMockStore2.default)()({
            global: mockGlobal,
            market: {},
            offchain: {},
            user: mockUser,
            transaction: {},
            discussion: {},
            routing: {},
            app: {}
        });
        var wrapped = (0, _enzyme.shallow)(_react2.default.createElement(_Voting2.default, {
            post: 'test',
            flag: true,
            vote: function vote(w, p) {},
            post_obj: voteTestObj,
            price_per_steem: 1,
            sbd_print_rate: 10000,
            store: mockStore
        })).dive();
        expect(wrapped.find('.Voting').length).toEqual(1);
        expect(wrapped.find('Dropdown').html()).toContain('<span href="#" title="Flag" id="downvote_button" class="flag">');
    });

    it('should change state.weight and state.showWeight as expected when flag is clicked', function () {
        var mockStore = (0, _reduxMockStore2.default)()({
            global: mockGlobal,
            market: {},
            offchain: {},
            user: mockUser,
            transaction: {},
            discussion: {},
            routing: {},
            app: {}
        });
        var wrapped = (0, _enzyme.shallow)(_react2.default.createElement(_Voting2.default, {
            post: 'test',
            flag: true,
            vote: function vote(w, p) {},
            post_obj: voteTestObj,
            price_per_steem: 1,
            sbd_print_rate: 10000,
            store: mockStore
        })).dive();
        wrapped.setState({ weight: 666, showWeight: false });
        expect(wrapped.find('Dropdown').dive().find('#downvote_button').length).toEqual(1);
        wrapped.find('Dropdown').dive().find('#downvote_button').simulate('click');
        expect(wrapped.state().weight).toEqual(666);
        expect(wrapped.state().showWeight).toEqual(true);
    });

    it('should not dispatch an action when flag is clicked and myVote is 0.', function () {
        var mockStore = (0, _reduxMockStore2.default)()({
            global: mockGlobal,
            market: {},
            offchain: {},
            user: mockUser,
            transaction: {},
            discussion: {},
            routing: {},
            app: {}
        });
        var wrapped = (0, _enzyme.shallow)(_react2.default.createElement(_Voting2.default, {
            post: 'test',
            flag: true,
            vote: function vote(w, p) {},
            post_obj: voteTestObj,
            price_per_steem: 1,
            sbd_print_rate: 10000,
            store: mockStore
        })).dive();
        wrapped.setState({ myVote: 0 });
        wrapped.find('Dropdown').dive().find('#downvote_button').simulate('click');
        expect(mockStore.getActions()).toEqual([]);
    });

    it('should dispatch an action when flag is clicked and myVote is negative', function () {
        var mockStore = (0, _reduxMockStore2.default)()({
            global: mockGlobal,
            market: {},
            offchain: {},
            user: mockUser,
            transaction: {},
            discussion: {},
            routing: {},
            app: {}
        });
        var wrapped = (0, _enzyme.shallow)(_react2.default.createElement(_Voting2.default, {
            post: 'test',
            flag: true,
            vote: function vote(w, p) {},
            post_obj: voteTestObj,
            price_per_steem: 1,
            sbd_print_rate: 10000,
            store: mockStore
        })).dive();
        wrapped.setState({ myVote: -666 });
        wrapped.find('#revoke_downvote_button').simulate('click');
        expect(mockStore.getActions()[0].type).toEqual('transaction/BROADCAST_OPERATION');
        expect(mockStore.getActions()[0].payload.operation.weight).toEqual(0);
        expect(mockStore.getActions()[0].payload.operation.voter).toEqual('Janice');
    });

    it('should render upvote and should not render flag if user is logged in and flag prop is false.', function () {
        var mockStore = (0, _reduxMockStore2.default)()({
            global: mockGlobal,
            market: {},
            offchain: {},
            user: mockUser,
            transaction: {},
            discussion: {},
            routing: {},
            app: {}
        });
        var wrapped = (0, _enzyme.shallow)(_react2.default.createElement(_Voting2.default, {
            post: 'test',
            flag: false,
            vote: function vote(w, p) {},
            post_obj: voteTestObj,
            price_per_steem: 1,
            sbd_print_rate: 10000,
            store: mockStore
        })).dive();
        expect(wrapped.find('.flag').length).toEqual(0);
        expect(wrapped.find('.upvote').length).toEqual(1);
    });

    it('should dispatch an action with payload when upvote button is clicked.', function () {
        var mockStore = (0, _reduxMockStore2.default)()({
            global: mockGlobal,
            market: {},
            offchain: {},
            user: mockUser,
            transaction: {},
            discussion: {},
            routing: {},
            app: {}
        });
        var wrapped = (0, _enzyme.shallow)(_react2.default.createElement(_Voting2.default, {
            post: 'test',
            flag: false,
            vote: function vote(w, p) {},
            post_obj: voteTestObj,
            price_per_steem: 1,
            sbd_print_rate: 10000,
            store: mockStore
        })).dive();
        wrapped.find('#upvote_button').simulate('click');
        expect(mockStore.getActions()[0].type).toEqual('transaction/BROADCAST_OPERATION');
        expect(mockStore.getActions()[0].payload.operation.weight).toEqual(10000);
        expect(mockStore.getActions()[0].payload.operation.voter).toEqual('Janice');
    });

    it('should show all SP if percent_steem_dollars is 0', function () {
        var post_obj = (0, _immutable.fromJS)({
            stats: {
                total_votes: 1
            },
            max_accepted_payout: '999999 SBD',
            percent_steem_dollars: 0,
            pending_payout_value: '10 SBD',
            cashout_time: '2018-03-30T10:00:00Z'
        });
        var store = (0, _redux.createStore)(_RootReducer2.default);
        var component = _reactTestRenderer2.default.create(_react2.default.createElement(
            _reactRedux.Provider,
            { store: store },
            _react2.default.createElement(
                _reactIntl.IntlProvider,
                { locale: 'en' },
                _react2.default.createElement(_Voting2.default, {
                    post: 'Test post',
                    vote: function vote(w, p) {},
                    post_obj: post_obj,
                    price_per_steem: 1,
                    sbd_print_rate: 10000
                })
            )
        ));
        expect((0, _stringify2.default)(component.toJSON())).toContain('(0.00 SBD, 10.00 SP)');
    });

    it('should omit liquid steem if print rate is 10000', function () {
        var store = (0, _redux.createStore)(_RootReducer2.default);
        var post_obj = (0, _immutable.fromJS)({
            stats: {
                total_votes: 1
            },
            max_accepted_payout: '999999 SBD',
            percent_steem_dollars: 10000,
            pending_payout_value: '10 SBD',
            cashout_time: '2018-03-30T10:00:00Z'
        });
        var component = _reactTestRenderer2.default.create(_react2.default.createElement(
            _reactRedux.Provider,
            { store: store },
            _react2.default.createElement(
                _reactIntl.IntlProvider,
                { locale: 'en' },
                _react2.default.createElement(_Voting2.default, {
                    post: 'Test post',
                    vote: function vote(w, p) {},
                    post_obj: post_obj,
                    price_per_steem: 1,
                    sbd_print_rate: 10000
                })
            )
        ));
        expect((0, _stringify2.default)(component.toJSON())).toContain('(5.00 SBD, 5.00 SP)');
    });

    it('should show liquid steem if print rate is < 10000', function () {
        var post_obj = (0, _immutable.fromJS)({
            stats: {
                total_votes: 1
            },
            max_accepted_payout: '999999 SBD',
            percent_steem_dollars: 10000,
            pending_payout_value: '10 SBD',
            cashout_time: '2018-03-30T10:00:00Z'
        });
        var store = (0, _redux.createStore)(_RootReducer2.default);
        var component = _reactTestRenderer2.default.create(_react2.default.createElement(
            _reactRedux.Provider,
            { store: store },
            _react2.default.createElement(
                _reactIntl.IntlProvider,
                { locale: 'en' },
                _react2.default.createElement(_Voting2.default, {
                    post: 'Test post',
                    vote: function vote(w, p) {},
                    post_obj: post_obj,
                    price_per_steem: 1,
                    sbd_print_rate: 5000
                })
            )
        ));
        expect((0, _stringify2.default)(component.toJSON())).toContain('(2.50 SBD, 2.50 STEEM, 5.00 SP)');
    });
});
//# sourceMappingURL=Voting.test.js.map