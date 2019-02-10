'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _counterpart = require('counterpart');

var _counterpart2 = _interopRequireDefault(_counterpart);

var _CloseButton = require('app/components/elements/CloseButton');

var _CloseButton2 = _interopRequireDefault(_CloseButton);

var _Icon = require('app/components/elements/Icon');

var _Icon2 = _interopRequireDefault(_Icon);

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SidePanel = function SidePanel(_ref) {
    var alignment = _ref.alignment,
        visible = _ref.visible,
        hideSidePanel = _ref.hideSidePanel,
        username = _ref.username;

    if (process.env.BROWSER) {
        visible && document.addEventListener('click', hideSidePanel);
        !visible && document.removeEventListener('click', hideSidePanel);
    }

    var loggedIn = username === undefined ? 'show-for-small-only' : 'SidePanel__hide-signup';

    var makeExternalLink = function makeExternalLink(i, ix, arr) {
        var cn = ix === arr.length - 1 ? 'last' : null;
        return _react2.default.createElement(
            'li',
            { key: i.value, className: cn },
            _react2.default.createElement(
                'a',
                {
                    href: i.link,
                    target: i.internal ? null : '_blank',
                    rel: 'noopener noreferrer'
                },
                i.label,
                '\xA0',
                _react2.default.createElement(_Icon2.default, { name: 'extlink' })
            )
        );
    };

    var makeInternalLink = function makeInternalLink(i, ix, arr) {
        var cn = ix === arr.length - 1 ? 'last' : null;
        return _react2.default.createElement(
            'li',
            { key: i.value, className: cn },
            _react2.default.createElement(
                _reactRouter.Link,
                { to: i.link },
                i.label
            )
        );
    };

    var sidePanelLinks = {
        internal: [{
            value: 'welcome',
            label: (0, _counterpart2.default)('navigation.welcome'),
            link: '/welcome'
        }, {
            value: 'faq',
            label: (0, _counterpart2.default)('navigation.faq'),
            link: '/faq.html'
        }, {
            value: 'tags',
            label: (0, _counterpart2.default)('navigation.explore'),
            link: '/tags'
        }, {
            value: 'market',
            label: (0, _counterpart2.default)('navigation.currency_market'),
            link: '/market'
        }, {
            value: 'recover_account_step_1',
            label: (0, _counterpart2.default)('navigation.stolen_account_recovery'),
            link: '/recover_account_step_1'
        }, {
            value: 'change_password',
            label: (0, _counterpart2.default)('navigation.change_account_password'),
            link: '/change_password'
        }, {
            value: 'vote_for_witnesses',
            label: (0, _counterpart2.default)('navigation.vote_for_witnesses'),
            link: '/~witnesses'
        }],
        exchanges: [{
            value: 'blocktrades',
            label: 'Blocktrades',
            link: username ? 'https://blocktrades.us/?input_coin_type=eth&output_coin_type=steem&receive_address=' + username : 'https://blocktrades.us/?input_coin_type=eth&output_coin_type=steem'
        }, {
            value: 'gopax',
            label: 'GOPAX',
            link: 'https://www.gopax.co.kr/exchange/steem-krw/'
        }],
        external: [{
            value: 'chat',
            label: (0, _counterpart2.default)('navigation.chat'),
            link: 'https://steem.chat/home'
        }, {
            value: 'jobs',
            label: (0, _counterpart2.default)('navigation.jobs'),
            link: 'https://jobs.lever.co/steemit'
        }, {
            value: 'tools',
            label: (0, _counterpart2.default)('navigation.app_center'),
            link: 'https://steemprojects.com/'
        }, {
            value: 'business',
            label: (0, _counterpart2.default)('navigation.business_center'),
            link: 'https://steemeconomy.com/'
        }, {
            value: 'api_docs',
            label: (0, _counterpart2.default)('navigation.api_docs'),
            link: 'https://developers.steem.io/'
        }],
        organizational: [{
            value: 'bluepaper',
            label: (0, _counterpart2.default)('navigation.bluepaper'),
            link: 'https://steem.io/steem-bluepaper.pdf'
        }, {
            value: 'smt_whitepaper',
            label: (0, _counterpart2.default)('navigation.smt_whitepaper'),
            link: 'https://smt.steem.io/'
        }, {
            value: 'whitepaper',
            label: (0, _counterpart2.default)('navigation.whitepaper'),
            link: 'https://steem.io/SteemWhitePaper.pdf'
        }, {
            value: 'about',
            label: (0, _counterpart2.default)('navigation.about'),
            link: '/about.html',
            internal: true
        }],
        legal: [{
            value: 'privacy',
            label: (0, _counterpart2.default)('navigation.privacy_policy'),
            link: '/privacy.html'
        }, {
            value: 'tos',
            label: (0, _counterpart2.default)('navigation.terms_of_service'),
            link: '/tos.html'
        }],
        extras: [{
            value: 'login',
            label: (0, _counterpart2.default)('g.sign_in'),
            link: '/login.html'
        }, {
            value: 'signup',
            label: (0, _counterpart2.default)('g.sign_up'),
            link: 'https://signup.steemit.com'
        }, {
            value: 'post',
            label: (0, _counterpart2.default)('g.post'),
            link: '/submit.html'
        }]
    };

    return _react2.default.createElement(
        'div',
        { className: 'SidePanel' },
        _react2.default.createElement(
            'div',
            { className: (visible ? 'visible ' : '') + alignment },
            _react2.default.createElement(_CloseButton2.default, { onClick: hideSidePanel }),
            _react2.default.createElement(
                'ul',
                { className: 'vertical menu ' + loggedIn },
                makeInternalLink(sidePanelLinks['extras'][0], 0, sidePanelLinks['extras']),
                makeExternalLink(sidePanelLinks['extras'][1], 1, sidePanelLinks['extras']),
                makeInternalLink(sidePanelLinks['extras'][2], 2, sidePanelLinks['extras'])
            ),
            _react2.default.createElement(
                'ul',
                { className: 'vertical menu' },
                sidePanelLinks['internal'].map(makeInternalLink)
            ),
            _react2.default.createElement(
                'ul',
                { className: 'vertical menu' },
                _react2.default.createElement(
                    'li',
                    null,
                    _react2.default.createElement(
                        'a',
                        { className: 'menu-section' },
                        (0, _counterpart2.default)('navigation.third_party_exchanges')
                    )
                ),
                sidePanelLinks['exchanges'].map(makeExternalLink)
            ),
            _react2.default.createElement(
                'ul',
                { className: 'vertical menu' },
                sidePanelLinks['external'].map(makeExternalLink)
            ),
            _react2.default.createElement(
                'ul',
                { className: 'vertical menu' },
                sidePanelLinks['organizational'].map(makeExternalLink)
            ),
            _react2.default.createElement(
                'ul',
                { className: 'vertical menu' },
                sidePanelLinks['legal'].map(makeInternalLink)
            )
        )
    );
};

SidePanel.propTypes = {
    alignment: _propTypes2.default.oneOf(['left', 'right']).isRequired,
    visible: _propTypes2.default.bool.isRequired,
    hideSidePanel: _propTypes2.default.func.isRequired,
    username: _propTypes2.default.string
};

SidePanel.defaultProps = {
    username: undefined
};

exports.default = SidePanel;
//# sourceMappingURL=index.js.map