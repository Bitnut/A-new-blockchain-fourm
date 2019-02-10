'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _AppReducer = require('app/redux/AppReducer');

var _Flag = require('app/components/modules/Flag');

var _Flag2 = _interopRequireDefault(_Flag);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapStateToProps = function mapStateToProps(state, ownProps) {
    return (0, _extends3.default)({
        flagged: _AppReducer.selectors.getFeatureFlag(state.app, ownProps.flag)
    }, ownProps);
};

var ConnectedFlag = (0, _reactRedux.connect)(mapStateToProps)(_Flag2.default);

exports.default = ConnectedFlag;
//# sourceMappingURL=index.js.map