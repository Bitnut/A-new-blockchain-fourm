'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ConfirmTransfer = function ConfirmTransfer(_ref) {
    var operation = _ref.operation;

    var info = (0, _keys2.default)(operation).map(function (k, i) {
        return _react2.default.createElement(
            'div',
            { key: 'transaction-group-' + i, className: 'input-group' },
            _react2.default.createElement(
                'span',
                {
                    key: 'transaction-label-' + i,
                    className: 'input-group-label'
                },
                k
            ),
            _react2.default.createElement('input', {
                className: 'input-group-field',
                type: 'text',
                required: true,
                value: operation[k],
                disabled: true,
                key: 'transaction-input-' + i
            })
        );
    });
    return _react2.default.createElement(
        'div',
        { className: 'info' },
        info
    );
};

ConfirmTransfer.propTypes = {
    operation: _propTypes2.default.shape({
        from: _propTypes2.default.string,
        to: _propTypes2.default.string,
        amount: _propTypes2.default.string
    }).isRequired
};

exports.default = ConfirmTransfer;
//# sourceMappingURL=index.js.map