'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = sendEmail;

var _sendgrid = require('sendgrid');

var _sendgrid2 = _interopRequireDefault(_sendgrid);

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sg = (0, _sendgrid2.default)(_config2.default.get('sendgrid.key'));

function sendEmail(template, to, params) {
    var from = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

    if (process.env.NODE_ENV !== 'production') {
        console.log('mail: to <' + to + '>, from <' + from + '>, template ' + template + ' (not sent due to not production env)');
        return;
    }
    var tmpl_id = _config2.default.get('sendgrid.templates')[template];
    if (!tmpl_id) throw new Error('can\'t find template ' + template);

    var request = sg.emptyRequest({
        method: 'POST',
        path: '/v3/mail/send',
        body: {
            template_id: tmpl_id,
            personalizations: [{
                to: [{ email: to }],
                substitutions: params
            }],
            from: { email: from || _config2.default.get('sendgrid.from') }
        }
    });

    sg.API(request).then(function (response) {
        console.log('sent \'' + template + '\' email to \'' + to + '\'', response.statusCode);
    }).catch(function (error) {
        console.error('failed to send \'' + template + '\' email to \'' + to + '\'', error);
    });
}
//# sourceMappingURL=sendEmail.js.map