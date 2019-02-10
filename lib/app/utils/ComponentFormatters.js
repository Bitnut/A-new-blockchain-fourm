'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.authorNameAndRep = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var authorNameAndRep = exports.authorNameAndRep = function authorNameAndRep(author, authorRepLog10) {
    return _react2.default.createElement(
        'span',
        null,
        _react2.default.createElement(
            'strong',
            null,
            author
        ),
        authorRepLog10 != null && _react2.default.createElement(
            'span',
            { style: { fontWeight: 'normal' } },
            ' (',
            authorRepLog10,
            ')'
        )
    );
};
//# sourceMappingURL=ComponentFormatters.js.map