'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Flag = function Flag(_ref) {
    var flagged = _ref.flagged,
        FlagComponent = _ref.FlagComponent,
        _ref$Fallback = _ref.Fallback,
        Fallback = _ref$Fallback === undefined ? null : _ref$Fallback,
        children = _ref.children;

    if (flagged && children) return (0, _extends3.default)({}, children);else return flagged ? FlagComponent : Fallback;
};

Flag.propTypes = {
    flagged: _propTypes2.default.bool.isRequired,
    FlagComponent: function FlagComponent(props, propName, componentName) {
        // First ensure it is a React element
        _propTypes2.default.checkPropTypes({ FlagComponent: _propTypes2.default.element }, props, 'FlagComponent', 'Flag');
        // Also issue a warning if children are also supplied
        if (props[propName] && props.children) {
            return new Error('Supplied both a FlagComponent and children to Flag; rendering children!');
        }
    },
    Fallback: _propTypes2.default.element
};

exports.default = Flag;
//# sourceMappingURL=index.js.map