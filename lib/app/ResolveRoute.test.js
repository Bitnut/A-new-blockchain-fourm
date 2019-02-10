'use strict';

var _ResolveRoute = require('./ResolveRoute');

var _ResolveRoute2 = _interopRequireDefault(_ResolveRoute);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

jest.mock('./utils/GDPRUserList');


describe('routeRegex', function () {
    it('should produce the desired regex patterns', function () {
        var test_cases = [['PostsIndex', /^\/(@[\w\.\d-]+)\/feed\/?$/], ['UserProfile1', /^\/(@[\w\.\d-]+)\/?$/], ['UserProfile2', /^\/(@[\w\.\d-]+)\/(blog|posts|comments|recommended|transfers|curation-rewards|author-rewards|permissions|created|recent-replies|feed|password|followed|followers|settings)\/?$/], ['UserProfile3', /^\/(@[\w\.\d-]+)\/[\w\.\d-]+/], ['CategoryFilters', /^\/(hot|votes|responses|trending|trending30|promoted|cashout|payout|payout_comments|created|active)\/?$/gi], ['PostNoCategory', /^\/(@[\w\.\d-]+)\/([\w\d-]+)/], ['Post', /^\/([\w\d\-\/]+)\/(\@[\w\d\.-]+)\/([\w\d-]+)\/?($|\?)/], ['PostJson', /^\/([\w\d\-\/]+)\/(\@[\w\d\.-]+)\/([\w\d-]+)(\.json)$/], ['UserJson', /^\/(@[\w\.\d-]+)(\.json)$/], ['UserNameJson', /^.*(?=(\.json))/]];

        test_cases.forEach(function (r) {
            expect(_ResolveRoute.routeRegex[r[0]]).toEqual(r[1]);
        });
    });
});

describe('resolveRoute', function () {
    var test_cases = [['/', { page: 'PostsIndex', params: ['trending'] }], ['/about.html', { page: 'About' }], ['/faq.html', { page: 'Faq' }], ['/login.html', { page: 'Login' }], ['/privacy.html', { page: 'Privacy' }], ['/support.html', { page: 'Support' }], ['/tos.html', { page: 'Tos' }], ['/change_password', { page: 'ChangePassword' }], ['/create_account', { page: 'CreateAccount' }], ['/approval', { page: 'Approval' }], ['/pick_account', { page: 'NotFound' }], ['/recover_account_step_1', { page: 'RecoverAccountStep1' }], ['/recover_account_step_2', { page: 'RecoverAccountStep2' }], ['/waiting_list.html', { page: 'WaitingList' }], ['/market', { page: 'Market' }], ['/~witnesses', { page: 'Witnesses' }], ['/submit.html', { page: 'SubmitPost' }], ['/@maitland/feed', { page: 'PostsIndex', params: ['home', '@maitland'] }], ['/@gdpr/feed', { page: 'NotFound' }], ['/@maitland/blog', { page: 'UserProfile', params: ['@maitland', 'blog'] }], ['/@gdpr/blog', { page: 'NotFound' }], ['/@cool/nice345', { page: 'PostNoCategory', params: ['@cool', 'nice345'] }], ['/@gdpr/nice345', { page: 'NotFound' }], ['/ceasar/@salad/circa90', { page: 'Post', params: ['ceasar', '@salad', 'circa90', ''] }], ['/taggy/@gdpr/nice345', { page: 'NotFound' }]];
    test_cases.forEach(function (r) {
        it('should resolve the route for the ' + r[1].page + ' page', function () {
            expect((0, _ResolveRoute2.default)(r[0])).toEqual(r[1]);
        });
    });

    it('should resolve xss test route in development environment', function () {
        expect((0, _ResolveRoute2.default)('/xss/test')).toEqual({ page: 'NotFound' });
        process.env.NODE_ENV = 'development';
        expect((0, _ResolveRoute2.default)('/xss/test')).toEqual({ page: 'XSSTest' });
        delete process.env.NODE_ENV;
    });
    it('should resolve benchmark route in development environment', function () {
        expect((0, _ResolveRoute2.default)('/benchmark')).toEqual({ page: 'NotFound' });
        process.env.OFFLINE_SSR_TEST = true;
        expect((0, _ResolveRoute2.default)('/benchmark')).toEqual({ page: 'Benchmark' });
        delete process.env.OFFLINE_SSR_TEST;
    });
    it('should resolve an unknown route to NotFound', function () {
        expect((0, _ResolveRoute2.default)('/randomness')).toEqual({ page: 'NotFound' });
    });
});
//# sourceMappingURL=ResolveRoute.test.js.map