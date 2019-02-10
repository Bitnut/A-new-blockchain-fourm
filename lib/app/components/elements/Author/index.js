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

var _class, _temp; /* eslint react/prop-types: 0 */


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _shouldComponentUpdate = require('app/utils/shouldComponentUpdate');

var _shouldComponentUpdate2 = _interopRequireDefault(_shouldComponentUpdate);

var _Icon = require('app/components/elements/Icon');

var _Icon2 = _interopRequireDefault(_Icon);

var _reactRouter = require('react-router');

var _ComponentFormatters = require('app/utils/ComponentFormatters');

var _AuthorDropdown = require('../AuthorDropdown');

var _AuthorDropdown2 = _interopRequireDefault(_AuthorDropdown);

var _Reputation = require('app/components/elements/Reputation');

var _Reputation2 = _interopRequireDefault(_Reputation);

var _NormalizeProfile = require('app/utils/NormalizeProfile');

var _NormalizeProfile2 = _interopRequireDefault(_NormalizeProfile);

var _Overlay = require('react-overlays/lib/Overlay');

var _Overlay2 = _interopRequireDefault(_Overlay);

var _reactRedux = require('react-redux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var string = _propTypes2.default.string,
    bool = _propTypes2.default.bool,
    number = _propTypes2.default.number;


var closers = [];

var fnCloseAll = function fnCloseAll() {
    var close;
    while (close = closers.shift()) {
        close();
    }
};

var Author = (_temp = _class = function (_React$Component) {
    (0, _inherits3.default)(Author, _React$Component);

    function Author() {
        var _ref;

        (0, _classCallCheck3.default)(this, Author);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var _this = (0, _possibleConstructorReturn3.default)(this, (_ref = Author.__proto__ || (0, _getPrototypeOf2.default)(Author)).call.apply(_ref, [this].concat(args)));

        _this.toggle = function (e) {
            if (!(e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                e.stopPropagation();
                var show = !_this.state.show;
                fnCloseAll();
                if (show) {
                    _this.setState({ show: show });
                    closers.push(_this.close);
                }
            }
        };

        _this.close = function () {
            _this.setState({
                show: false
            });
        };

        _this.shouldComponentUpdate = (0, _shouldComponentUpdate2.default)(_this, 'Author');

        _this.state = { show: false };
        _this.toggle = _this.toggle.bind(_this);
        _this.close = _this.close.bind(_this);
        return _this;
    }

    (0, _createClass3.default)(Author, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            if (!this.authorProfileLink) {
                return;
            }
            var node = _reactDom2.default.findDOMNode(this.authorProfileLink);
            if (node.addEventListener) {
                node.addEventListener('click', this.toggle, false);
            } else {
                node.attachEvent('click', this.toggle, false);
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            if (!this.authorProfileLink) {
                return;
            }
            var node = _reactDom2.default.findDOMNode(this.authorProfileLink);
            if (node.removeEventListener) {
                node.removeEventListener('click', this.toggle);
            } else {
                node.detachEvent('click', this.toggle);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                author = _props.author,
                follow = _props.follow,
                mute = _props.mute,
                authorRepLog10 = _props.authorRepLog10; // html

            var username = this.props.username; // redux

            var _ref2 = this.props.account ? (0, _NormalizeProfile2.default)(this.props.account.toJS()) : {},
                name = _ref2.name,
                about = _ref2.about;

            if (!(follow || mute) || username === author) {
                return _react2.default.createElement(
                    'span',
                    {
                        className: 'author',
                        itemProp: 'author',
                        itemScope: true,
                        itemType: 'http://schema.org/Person'
                    },
                    _react2.default.createElement(
                        'strong',
                        null,
                        _react2.default.createElement(
                            _reactRouter.Link,
                            { to: '/@' + author },
                            author
                        )
                    ),
                    ' ',
                    _react2.default.createElement(_Reputation2.default, { value: authorRepLog10 })
                );
            }

            return _react2.default.createElement(
                'span',
                { className: 'Author' },
                _react2.default.createElement(
                    'span',
                    {
                        itemProp: 'author',
                        itemScope: true,
                        itemType: 'http://schema.org/Person'
                    },
                    _react2.default.createElement(
                        'strong',
                        null,
                        _react2.default.createElement(
                            _reactRouter.Link,
                            {
                                className: 'ptc',
                                ref: function ref(link) {
                                    _this2.authorProfileLink = link;
                                },
                                to: '/@' + author
                            },
                            author,
                            ' ',
                            _react2.default.createElement(_Reputation2.default, { value: authorRepLog10 }),
                            _react2.default.createElement(_Icon2.default, { name: 'dropdown-arrow' })
                        )
                    )
                ),
                _react2.default.createElement(
                    _Overlay2.default,
                    {
                        show: this.state.show,
                        onHide: this.close,
                        placement: 'bottom',
                        container: this,
                        target: function target() {
                            return (0, _reactDom.findDOMNode)(_this2.target);
                        },
                        rootClose: true
                    },
                    _react2.default.createElement(_AuthorDropdown2.default, {
                        author: author,
                        follow: follow,
                        mute: mute,
                        authorRepLog10: authorRepLog10,
                        name: name,
                        about: about,
                        username: username
                    })
                )
            );
        }
    }]);
    return Author;
}(_react2.default.Component), _class.propTypes = {
    author: string.isRequired,
    follow: bool,
    mute: bool,
    authorRepLog10: number
}, _class.defaultProps = {
    follow: true,
    mute: true
}, _temp);
exports.default = (0, _reactRedux.connect)(function (state, ownProps) {
    var author = ownProps.author,
        follow = ownProps.follow,
        mute = ownProps.mute,
        authorRepLog10 = ownProps.authorRepLog10;

    var username = state.user.getIn(['current', 'username']);
    var account = state.global.getIn(['accounts', author]);
    return {
        author: author,
        follow: follow,
        mute: mute,
        authorRepLog10: authorRepLog10,
        username: username,
        account: account
    };
})(Author);
//# sourceMappingURL=index.js.map