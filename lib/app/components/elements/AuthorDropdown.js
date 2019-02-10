'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRouter = require('react-router');

var _Userpic = require('app/components/elements/Userpic');

var _Userpic2 = _interopRequireDefault(_Userpic);

var _Follow = require('app/components/elements/Follow');

var _Follow2 = _interopRequireDefault(_Follow);

var _Reputation = require('app/components/elements/Reputation');

var _Reputation2 = _interopRequireDefault(_Reputation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AuthorDropdown = function AuthorDropdown(props) {
    var author_link = _react2.default.createElement(
        'span',
        {
            className: 'author',
            itemProp: 'author',
            itemScope: true,
            itemType: 'http://schema.org/Person'
        },
        _react2.default.createElement(
            _reactRouter.Link,
            { to: '/@' + props.author },
            _react2.default.createElement(
                'strong',
                null,
                props.author
            )
        ),
        ' ',
        _react2.default.createElement(_Reputation2.default, { value: props.authorRepLog10 })
    );
    if (!(props.follow || props.mute) || props.username === props.author) {
        return author_link;
    } else {
        return _react2.default.createElement(
            'div',
            { className: 'Author__container' },
            _react2.default.createElement(
                'div',
                { className: 'Author__dropdown' },
                _react2.default.createElement(
                    _reactRouter.Link,
                    { to: '/@' + props.author },
                    _react2.default.createElement(_Userpic2.default, { account: props.author })
                ),
                _react2.default.createElement(
                    _reactRouter.Link,
                    { to: '/@' + props.author, className: 'Author__name' },
                    props.name
                ),
                _react2.default.createElement(
                    _reactRouter.Link,
                    { to: '/@' + props.author, className: 'Author__username' },
                    '@',
                    props.author
                ),
                _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement(_Follow2.default, {
                        className: 'float-right',
                        follower: props.username,
                        following: props.author,
                        what: 'blog',
                        showFollow: props.follow,
                        showMute: props.mute
                    })
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'Author__bio' },
                    props.about
                )
            )
        );
    }
};

exports.default = AuthorDropdown;


AuthorDropdown.propTypes = {};
AuthorDropdown.defaultProps = {};
//# sourceMappingURL=AuthorDropdown.js.map