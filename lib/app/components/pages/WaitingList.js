'use strict';

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _AddToWaitingList = require('app/components/modules/AddToWaitingList');

var _AddToWaitingList2 = _interopRequireDefault(_AddToWaitingList);

var _counterpart = require('counterpart');

var _counterpart2 = _interopRequireDefault(_counterpart);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var WaitingList = function (_React$Component) {
    (0, _inherits3.default)(WaitingList, _React$Component);

    function WaitingList() {
        (0, _classCallCheck3.default)(this, WaitingList);
        return (0, _possibleConstructorReturn3.default)(this, (WaitingList.__proto__ || (0, _getPrototypeOf2.default)(WaitingList)).apply(this, arguments));
    }

    (0, _createClass3.default)(WaitingList, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'row' },
                _react2.default.createElement(
                    'div',
                    { className: 'column large-4 medium-6 small-12' },
                    _react2.default.createElement(
                        'p',
                        null,
                        (0, _counterpart2.default)('g.sorry_your_reddit_account_doesnt_have_enough_karma')
                    ),
                    _react2.default.createElement(_AddToWaitingList2.default, null),
                    _react2.default.createElement('br', null),
                    _react2.default.createElement('hr', null),
                    _react2.default.createElement(
                        'p',
                        null,
                        (0, _counterpart2.default)('g.or_click_the_button_below_to_register_with_facebook')
                    ),
                    _react2.default.createElement(
                        'a',
                        {
                            href: '/connect/facebook',
                            className: 'button SignUp--fb-button'
                        },
                        (0, _counterpart2.default)('g.register_with_facebook')
                    )
                )
            );
        }
    }]);
    return WaitingList;
}(_react2.default.Component);

module.exports = {
    path: 'waiting_list.html',
    component: WaitingList
};
//# sourceMappingURL=WaitingList.js.map