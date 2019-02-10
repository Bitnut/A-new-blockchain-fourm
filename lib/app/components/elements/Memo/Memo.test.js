'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _enzymeAdapterReact = require('enzyme-adapter-react-15');

var _enzymeAdapterReact2 = _interopRequireDefault(_enzymeAdapterReact);

var _index = require('./index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _enzyme.configure)({ adapter: new _enzymeAdapterReact2.default() });

describe('Memo', function () {
    it('should return an empty span if no text is provided', function () {
        var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_index.Memo, { fromNegativeRepUser: false }));
        expect(wrapper.html()).toEqual('<span></span>');
    });

    it('should render a plain ol memo', function () {
        var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_index.Memo, { fromNegativeRepUser: false, text: 'hi dude' }));
        expect(wrapper.html()).toEqual('<span class="Memo">hi dude</span>');
    });

    it('should deal with a memo from a user with bad reputation', function () {
        var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_index.Memo, { fromNegativeRepUser: true, text: 'sorry charlie' }));

        expect(wrapper.html()).toEqual('<span class="Memo Memo--fromNegativeRepUser"><div class="from-negative-rep-user-warning"><div class="from-negative-rep-user-caution">missing translation: en.transferhistoryrow_jsx.from_negative_rep_user_caution</div><div class="from-negative-rep-user-explained">missing translation: en.transferhistoryrow_jsx.from_negative_rep_user_explained</div><div class="ptc from-negative-rep-user-reveal-memo" role="button">missing translation: en.transferhistoryrow_jsx.from_negative_rep_user_reveal_memo</div></div></span>');

        wrapper.find('div.ptc').simulate('click', { preventDefault: function preventDefault() {
                return true;
            } });
        expect(wrapper.html()).toEqual('<span class="Memo Memo--fromNegativeRepUser">sorry charlie</span>');
    });
});
//# sourceMappingURL=Memo.test.js.map