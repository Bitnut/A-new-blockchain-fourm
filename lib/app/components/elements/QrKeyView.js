'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactQr = require('react-qr');

var _reactQr2 = _interopRequireDefault(_reactQr);

var _counterpart = require('counterpart');

var _counterpart2 = _interopRequireDefault(_counterpart);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
    var type = _ref.type,
        text = _ref.text,
        isPrivate = _ref.isPrivate,
        onClose = _ref.onClose;

    return _react2.default.createElement(
        'div',
        { className: 'text-center Dialog__qr_viewer' },
        _react2.default.createElement(
            'h3',
            null,
            isPrivate ? (0, _counterpart2.default)('userkeys_jsx.private_something_key', { key: type }) : (0, _counterpart2.default)('userkeys_jsx.public_something_key', { key: type }),
            ':'
        ),
        _react2.default.createElement('br', null),
        _react2.default.createElement(_reactQr2.default, { text: text }),
        _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement('br', null),
            _react2.default.createElement(
                'button',
                {
                    type: 'button',
                    className: 'button hollow',
                    onClick: onClose
                },
                (0, _counterpart2.default)('g.close')
            )
        )
    );
};
//# sourceMappingURL=QrKeyView.js.map