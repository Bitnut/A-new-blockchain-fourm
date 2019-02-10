'use strict';

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _reactRedux = require('react-redux');

var _FetchDataSaga = require('app/redux/FetchDataSaga');

var _LoadingIndicator = require('app/components/elements/LoadingIndicator');

var _LoadingIndicator2 = _interopRequireDefault(_LoadingIndicator);

var _SvgImage = require('app/components/elements/SvgImage');

var _SvgImage2 = _interopRequireDefault(_SvgImage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PostWrapper = function (_React$Component) {
    (0, _inherits3.default)(PostWrapper, _React$Component);

    function PostWrapper() {
        (0, _classCallCheck3.default)(this, PostWrapper);

        var _this = (0, _possibleConstructorReturn3.default)(this, (PostWrapper.__proto__ || (0, _getPrototypeOf2.default)(PostWrapper)).call(this));

        _this.state = {
            loading: true
        };
        return _this;
    }

    (0, _createClass3.default)(PostWrapper, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            var _this2 = this;

            var route_params = this.props.routeParams;
            var post = route_params.username + '/' + route_params.slug;
            var dis = this.props.content.get(post);
            if (!dis) {
                this.props.getContent({
                    author: route_params.username,
                    permlink: route_params.slug
                }).then(function (content) {
                    if (content) {
                        _reactRouter.browserHistory.replace('/' + content.category + '/@' + post);
                    }
                }).catch(function () {
                    _this2.setState({ loading: false });
                });
            } else if (dis.get('id') === '0.0.0') {
                // non-existing post
                this.setState({ loading: false });
            } else {
                if (_reactRouter.browserHistory) _reactRouter.browserHistory.replace('/' + dis.get('category') + '/@' + post);
            }
        }
    }, {
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(np, ns) {
            return ns.loading !== this.state.loading;
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                null,
                this.state.loading ? _react2.default.createElement(
                    'center',
                    null,
                    _react2.default.createElement(_LoadingIndicator2.default, { type: 'circle' })
                ) : _react2.default.createElement(
                    'div',
                    { className: 'NotFound float-center' },
                    _react2.default.createElement(
                        'a',
                        { href: '/' },
                        _react2.default.createElement(_SvgImage2.default, { name: '404', width: '640px', height: '480px' })
                    )
                )
            );
        }
    }]);
    return PostWrapper;
}(_react2.default.Component);

var StoreWrapped = (0, _reactRedux.connect)(function (state) {
    return {
        content: state.global.get('content')
    };
}, function (dispatch) {
    return {
        getContent: function getContent(payload) {
            return new _promise2.default(function (resolve, reject) {
                dispatch(_FetchDataSaga.actions.getContent((0, _extends3.default)({}, payload, {
                    resolve: resolve,
                    reject: reject
                })));
            });
        }
    };
})(PostWrapper);

module.exports = {
    path: '/@:username/:slug',
    component: StoreWrapped
};
//# sourceMappingURL=PostPageNoCategory.js.map