'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _react3 = require('@storybook/react');

var _addonKnobs = require('@storybook/addon-knobs');

var _RootReducer = require('app/redux/RootReducer');

var _RootReducer2 = _interopRequireDefault(_RootReducer);

var _immutable = require('immutable');

var _reactRedux = require('react-redux');

var _redux = require('redux');

var _Keys = require('./Keys');

var _Keys2 = _interopRequireDefault(_Keys);

var _decorators = require('decorators');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var store = (0, _redux.createStore)(_RootReducer2.default);

var mockAccount = (0, _immutable.Map)({
    name: 'maitland',
    posting: (0, _immutable.Map)({
        key_auths: [(0, _immutable.List)(['SOMETHING', 'HERE']), (0, _immutable.List)(['ANOTHER THING', 'OVER THERE'])]
    })
});

(0, _react3.storiesOf)('Elements', module).addDecorator(_addonKnobs.withKnobs).addDecorator(_decorators.Center).addDecorator(function (getStory) {
    return _react2.default.createElement(
        _reactRedux.Provider,
        { store: store },
        getStory()
    );
}).add('Keys', function () {
    return _react2.default.createElement(_Keys2.default, { account: mockAccount, authType: 'posting', onKey: function onKey() {} });
});
//# sourceMappingURL=Keys.story.js.map