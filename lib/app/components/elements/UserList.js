'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

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

var _UserListRow = require('app/components/cards/UserListRow');

var _UserListRow2 = _interopRequireDefault(_UserListRow);

var _counterpart = require('counterpart');

var _counterpart2 = _interopRequireDefault(_counterpart);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PER_PAGE = 50; /* eslint react/prop-types: 0 */

var UserList = function (_React$Component) {
    (0, _inherits3.default)(UserList, _React$Component);

    function UserList() {
        (0, _classCallCheck3.default)(this, UserList);

        var _this = (0, _possibleConstructorReturn3.default)(this, (UserList.__proto__ || (0, _getPrototypeOf2.default)(UserList)).call(this));

        _this._setHistoryPagePrevious = function () {
            var newIndex = _this.state.historyIndex - PER_PAGE;
            _this.setState({ historyIndex: Math.max(0, newIndex) });
        };

        _this._setHistoryPageNext = function () {
            var newIndex = _this.state.historyIndex + PER_PAGE;
            _this.setState({ historyIndex: Math.max(0, newIndex) });
        };

        _this.state = { historyIndex: 0 };
        return _this;
    }

    (0, _createClass3.default)(UserList, [{
        key: 'render',
        value: function render() {
            var historyIndex = this.state.historyIndex;

            var users = this.props.users;
            var title = this.props.title;

            var idx = 0;
            var user_list = users.map(function (user) {
                return _react2.default.createElement(_UserListRow2.default, { user: user, key: idx++ });
            });
            user_list = user_list.toArray();

            var currentIndex = -1;
            var usersLength = users.size;
            var limitedIndex = Math.min(historyIndex, usersLength - PER_PAGE);
            user_list = user_list.reverse().filter(function () {
                currentIndex++;
                return currentIndex >= limitedIndex && currentIndex < limitedIndex + PER_PAGE;
            });

            var navButtons = _react2.default.createElement(
                'nav',
                null,
                _react2.default.createElement(
                    'ul',
                    { className: 'pager' },
                    _react2.default.createElement(
                        'li',
                        null,
                        _react2.default.createElement(
                            'div',
                            {
                                className: 'button tiny hollow float-left ' + (historyIndex === 0 ? ' disabled' : ''),
                                onClick: this._setHistoryPagePrevious,
                                'aria-label': (0, _counterpart2.default)('g.previous')
                            },
                            _react2.default.createElement(
                                'span',
                                { 'aria-hidden': 'true' },
                                '\u2190 ',
                                (0, _counterpart2.default)('g.previous')
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'li',
                        null,
                        _react2.default.createElement(
                            'div',
                            {
                                className: 'button tiny hollow float-right ' + (historyIndex >= usersLength - PER_PAGE ? ' disabled' : ''),
                                onClick: historyIndex >= usersLength - PER_PAGE ? null : this._setHistoryPageNext,
                                'aria-label': (0, _counterpart2.default)('g.next')
                            },
                            _react2.default.createElement(
                                'span',
                                { 'aria-hidden': 'true' },
                                (0, _counterpart2.default)('g.next'),
                                ' \u2192'
                            )
                        )
                    )
                )
            );

            return _react2.default.createElement(
                'div',
                { className: 'UserList' },
                _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                        'div',
                        { className: 'column small-12' },
                        _react2.default.createElement(
                            'h3',
                            null,
                            title
                        ),
                        navButtons,
                        _react2.default.createElement(
                            'table',
                            null,
                            _react2.default.createElement(
                                'tbody',
                                null,
                                user_list
                            )
                        ),
                        navButtons
                    )
                )
            );
        }
    }]);
    return UserList;
}(_react2.default.Component);

exports.default = UserList;
//# sourceMappingURL=UserList.js.map