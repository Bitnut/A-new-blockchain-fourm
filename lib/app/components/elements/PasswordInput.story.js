'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _react3 = require('@storybook/react');

var _PasswordInput = require('./PasswordInput');

var _PasswordInput2 = _interopRequireDefault(_PasswordInput);

var _decorators = require('decorators');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _react3.storiesOf)('Elements', module).addDecorator(_decorators.Center).add('PasswordInput', function () {
    return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_PasswordInput2.default, {
            passwordLabel: 'Enter New Password',
            onChange: function onChange() {}
        }),
        _react2.default.createElement(_PasswordInput2.default, {
            passwordLabel: 'Confirm Password',
            inputConfirmPassword: true,
            onChange: function onChange() {}
        }),
        _react2.default.createElement(_PasswordInput2.default, {
            passwordLabel: 'Disabled Password',
            inputConfirmPassword: false,
            disabled: true,
            onChange: function onChange() {}
        })
    );
});
//# sourceMappingURL=PasswordInput.story.js.map