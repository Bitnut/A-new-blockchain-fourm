'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _enzymeAdapterReact = require('enzyme-adapter-react-15');

var _enzymeAdapterReact2 = _interopRequireDefault(_enzymeAdapterReact);

var _LoadingIndicator = require('app/components/elements/LoadingIndicator');

var _LoadingIndicator2 = _interopRequireDefault(_LoadingIndicator);

var _Icon = require('app/components/elements/Icon');

var _Icon2 = _interopRequireDefault(_Icon);

var _Flag = require('app/components/modules/Flag');

var _Flag2 = _interopRequireDefault(_Flag);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*global describe, it, before, beforeEach, after, afterEach */
(0, _enzyme.configure)({ adapter: new _enzymeAdapterReact2.default() });

describe('Flag', function () {
    var component = _react2.default.createElement(_LoadingIndicator2.default, null);
    var fallback = _react2.default.createElement(_Icon2.default, { name: 'user' });
    var child = _react2.default.createElement(
        'div',
        null,
        ' HELLO WORLD '
    );

    it('should render the children  when the flag prop is true', function () {
        var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_Flag2.default, {
            flagged: true,
            FlagComponent: component,
            Fallback: fallback,
            children: child
        }));
        expect(wrapper.text()).toEqual(' HELLO WORLD ');
    });
    it('should render the FlagComponent  when the flag prop is true and there are no children', function () {
        var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_Flag2.default, {
            flagged: true,
            FlagComponent: component,
            Fallback: fallback
        }));
        expect(wrapper.text()).toEqual('<LoadingIndicator />');
    });

    it('should render null when the flag condition fails and no fallback is provided', function () {
        var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_Flag2.default, { flagged: false, FlagComponent: component }));
        expect(wrapper.html()).toBe(null);
    });

    it('should render the fallback component if the flag condition is false', function () {
        var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_Flag2.default, {
            flagged: false,
            FlagComponent: component,
            Fallback: fallback
        }));
        expect(wrapper.html()).not.toBe(null);
        expect(wrapper.text()).toEqual('<Icon />');
    });

    it('should render children but not FlagComponent if both are provided', function () {
        var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_Flag2.default, {
            flagged: true,
            FlagComponent: component,
            Fallback: fallback,
            children: child
        }));
        // There isn't a good way to check for proptypes errors
        // see https://stackoverflow.com/questions/26124914/how-to-test-react-proptypes-through-jest
        expect(wrapper.text()).toEqual(' HELLO WORLD ');
    });
});
//# sourceMappingURL=Flag.test.js.map