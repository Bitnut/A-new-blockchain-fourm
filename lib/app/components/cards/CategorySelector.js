'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var _class, _temp;

exports.validateCategory = validateCategory;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = require('react-redux');

var _shouldComponentUpdate = require('app/utils/shouldComponentUpdate');

var _shouldComponentUpdate2 = _interopRequireDefault(_shouldComponentUpdate);

var _ReduxForms = require('app/utils/ReduxForms');

var _counterpart = require('counterpart');

var _counterpart2 = _interopRequireDefault(_counterpart);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CategorySelector = (_temp = _class = function (_React$Component) {
    (0, _inherits3.default)(CategorySelector, _React$Component);

    function CategorySelector() {
        (0, _classCallCheck3.default)(this, CategorySelector);

        var _this = (0, _possibleConstructorReturn3.default)(this, (CategorySelector.__proto__ || (0, _getPrototypeOf2.default)(CategorySelector)).call(this));

        _this.state = { createCategory: true };
        _this.shouldComponentUpdate = (0, _shouldComponentUpdate2.default)(_this, 'CategorySelector');
        _this.categoryCreateToggle = function (e) {
            e.preventDefault();
            _this.props.onChange();
            _this.setState({ createCategory: !_this.state.createCategory });
            setTimeout(function () {
                return _this.refs.categoryRef.focus();
            }, 300);
        };
        _this.categorySelectOnChange = function (e) {
            e.preventDefault();
            var value = e.target.value;
            var onBlur = _this.props.onBlur; // call onBlur to trigger validation immediately

            if (value === 'new') {
                _this.setState({ createCategory: true });
                setTimeout(function () {
                    if (onBlur) onBlur();
                    _this.refs.categoryRef.focus();
                }, 300);
            } else _this.props.onChange(e);
        };
        return _this;
    }

    (0, _createClass3.default)(CategorySelector, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                trending = _props.trending,
                tabIndex = _props.tabIndex,
                disabled = _props.disabled;

            var categories = trending.slice(0, 11).filterNot(function (c) {
                return validateCategory(c);
            });
            var createCategory = this.state.createCategory;


            var categoryOptions = categories.map(function (c, idx) {
                return _react2.default.createElement(
                    'option',
                    { value: c, key: idx },
                    c
                );
            });

            var impProps = (0, _extends3.default)({}, this.props);
            var categoryInput = _react2.default.createElement('input', (0, _extends3.default)({
                type: 'text'
            }, (0, _ReduxForms.cleanReduxInput)(impProps), {
                ref: 'categoryRef',
                tabIndex: tabIndex,
                disabled: disabled,
                autoCapitalize: 'none'
            }));

            var categorySelect = _react2.default.createElement(
                'select',
                (0, _extends3.default)({}, (0, _ReduxForms.cleanReduxInput)(this.props), {
                    onChange: this.categorySelectOnChange,
                    ref: 'categoryRef',
                    tabIndex: tabIndex,
                    disabled: disabled
                }),
                _react2.default.createElement(
                    'option',
                    { value: '' },
                    (0, _counterpart2.default)('category_selector_jsx.select_a_tag'),
                    '...'
                ),
                categoryOptions,
                _react2.default.createElement(
                    'option',
                    { value: 'new' },
                    this.props.placeholder
                )
            );
            return _react2.default.createElement(
                'span',
                null,
                createCategory ? categoryInput : categorySelect
            );
        }
    }]);
    return CategorySelector;
}(_react2.default.Component), _class.propTypes = {
    // HTML props
    id: _propTypes2.default.string, // DOM id for active component (focusing, etc...)
    autoComplete: _propTypes2.default.string,
    placeholder: _propTypes2.default.string,
    onChange: _propTypes2.default.func.isRequired,
    onBlur: _propTypes2.default.func.isRequired,
    isEdit: _propTypes2.default.bool,
    disabled: _propTypes2.default.bool,
    value: _propTypes2.default.string,
    tabIndex: _propTypes2.default.number,

    // redux connect (overwrite in HTML)
    trending: _propTypes2.default.object.isRequired // Immutable.List
}, _class.defaultProps = {
    autoComplete: 'on',
    id: 'CategorySelectorId',
    isEdit: false
}, _temp);
function validateCategory(category) {
    var required = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    if (!category || category.trim() === '') return required ? (0, _counterpart2.default)('g.required') : null;
    var cats = category.trim().split(' ');
    return (
        // !category || category.trim() === '' ? 'Required' :
        cats.length > 5 ? (0, _counterpart2.default)('category_selector_jsx.use_limited_amount_of_categories', {
            amount: 5
        }) : cats.find(function (c) {
            return c.length > 24;
        }) ? (0, _counterpart2.default)('category_selector_jsx.maximum_tag_length_is_24_characters') : cats.find(function (c) {
            return c.split('-').length > 2;
        }) ? (0, _counterpart2.default)('category_selector_jsx.use_one_dash') : cats.find(function (c) {
            return c.indexOf(',') >= 0;
        }) ? (0, _counterpart2.default)('category_selector_jsx.use_spaces_to_separate_tags') : cats.find(function (c) {
            return (/[A-Z]/.test(c)
            );
        }) ? (0, _counterpart2.default)('category_selector_jsx.use_only_lowercase_letters') : cats.find(function (c) {
            return !/^[a-z0-9-#]+$/.test(c);
        }) ? (0, _counterpart2.default)('category_selector_jsx.use_only_allowed_characters') : cats.find(function (c) {
            return !/^[a-z-#]/.test(c);
        }) ? (0, _counterpart2.default)('category_selector_jsx.must_start_with_a_letter') : cats.find(function (c) {
            return !/[a-z0-9]$/.test(c);
        }) ? (0, _counterpart2.default)('category_selector_jsx.must_end_with_a_letter_or_number') : null
    );
}
exports.default = (0, _reactRedux.connect)(function (state, ownProps) {
    var trending = state.global.getIn(['tag_idx', 'trending']);
    // apply translations
    // they are used here because default prop can't acces intl property
    var placeholder = (0, _counterpart2.default)('category_selector_jsx.tag_your_story');
    return (0, _extends3.default)({ trending: trending, placeholder: placeholder }, ownProps);
})(CategorySelector);
//# sourceMappingURL=CategorySelector.js.map