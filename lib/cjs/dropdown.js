'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp2;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DropDown = (_temp2 = _class = function (_React$Component) {
  _inherits(DropDown, _React$Component);

  function DropDown() {
    var _temp, _this, _ret;

    _classCallCheck(this, DropDown);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.state = {
      open: false
    }, _this.handleFocus = function () {
      _this.setState({
        open: !_this.state.open
      });
    }, _this.handleClick = function (option) {
      _this.setState({
        open: false
      });
      option.onSelect && option.onSelect();
    }, _this.dropdownContainer = _react2.default.createRef(), _temp), _possibleConstructorReturn(_this, _ret);
  }

  DropDown.prototype.componentDidUpdate = function componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.open && this.dropdownContainer.current) {
      var selected = this.dropdownContainer.current.querySelector('.selected');
      if (selected) {
        this.dropdownContainer.current.scrollTop = selected.offsetTop;
      }
    }
  };

  DropDown.prototype.render = function render() {
    var _this2 = this;

    var _props = this.props,
        options = _props.options,
        activeInList = _props.activeInList;

    if (!options || !options.length) return null;

    return _react2.default.createElement(
      _react2.default.Fragment,
      null,
      activeInList,
      _react2.default.createElement(
        'a',
        { className: this.props.className, onClick: this.handleFocus },
        _react2.default.createElement('i', { className: 'fa fa-caret-down', 'aria-hidden': 'true' })
      ),
      this.state.open ? _react2.default.createElement(
        'div',
        { className: 'dropdown-options', ref: this.dropdownContainer },
        this.props.options.map(function (option) {
          var _option$options = option.options,
              onSelect = _option$options.onSelect,
              Close = _option$options.close,
              rest = _objectWithoutProperties(_option$options, ['onSelect', 'close']);

          return _react2.default.createElement(
            'div',
            _extends({ key: option.id }, rest, { onClick: function onClick() {
                return _this2.handleClick(option.options);
              } }),
            option.name,
            ' ',
            Close
          );
        })
      ) : null
    );
  };

  return DropDown;
}(_react2.default.Component), _class.PropTypes = {
  activeInList: _propTypes2.default.object,
  value: _propTypes2.default.object,
  options: _propTypes2.default.array
}, _temp2);
exports.default = DropDown;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kcm9wZG93bi5qc3giXSwibmFtZXMiOlsiRHJvcERvd24iLCJzdGF0ZSIsIm9wZW4iLCJoYW5kbGVGb2N1cyIsInNldFN0YXRlIiwiaGFuZGxlQ2xpY2siLCJvcHRpb24iLCJvblNlbGVjdCIsImRyb3Bkb3duQ29udGFpbmVyIiwiUmVhY3QiLCJjcmVhdGVSZWYiLCJjb21wb25lbnREaWRVcGRhdGUiLCJwcmV2UHJvcHMiLCJwcmV2U3RhdGUiLCJzbmFwc2hvdCIsImN1cnJlbnQiLCJzZWxlY3RlZCIsInF1ZXJ5U2VsZWN0b3IiLCJzY3JvbGxUb3AiLCJvZmZzZXRUb3AiLCJyZW5kZXIiLCJwcm9wcyIsIm9wdGlvbnMiLCJhY3RpdmVJbkxpc3QiLCJsZW5ndGgiLCJjbGFzc05hbWUiLCJtYXAiLCJDbG9zZSIsImNsb3NlIiwicmVzdCIsImlkIiwibmFtZSIsIkNvbXBvbmVudCIsIlByb3BUeXBlcyIsIm9iamVjdCIsInZhbHVlIiwiYXJyYXkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7SUFFTUEsUTs7Ozs7Ozs7Ozs7O3dKQU9KQyxLLEdBQVE7QUFDTkMsWUFBTTtBQURBLEssUUFJUkMsVyxHQUFjLFlBQU07QUFDbEIsWUFBS0MsUUFBTCxDQUFjO0FBQ1pGLGNBQU0sQ0FBQyxNQUFLRCxLQUFMLENBQVdDO0FBRE4sT0FBZDtBQUdELEssUUFFREcsVyxHQUFjLFVBQUNDLE1BQUQsRUFBWTtBQUN4QixZQUFLRixRQUFMLENBQWM7QUFDWkYsY0FBTTtBQURNLE9BQWQ7QUFHQUksYUFBT0MsUUFBUCxJQUFtQkQsT0FBT0MsUUFBUCxFQUFuQjtBQUNELEssUUFXREMsaUIsR0FBb0JDLGdCQUFNQyxTQUFOLEU7OztxQkFUcEJDLGtCLCtCQUFtQkMsUyxFQUFXQyxTLEVBQVdDLFEsRUFBVTtBQUNqRCxRQUFJLEtBQUtiLEtBQUwsQ0FBV0MsSUFBWCxJQUFtQixLQUFLTSxpQkFBTCxDQUF1Qk8sT0FBOUMsRUFBdUQ7QUFDckQsVUFBTUMsV0FBVyxLQUFLUixpQkFBTCxDQUF1Qk8sT0FBdkIsQ0FBK0JFLGFBQS9CLENBQTZDLFdBQTdDLENBQWpCO0FBQ0EsVUFBSUQsUUFBSixFQUFjO0FBQ1osYUFBS1IsaUJBQUwsQ0FBdUJPLE9BQXZCLENBQStCRyxTQUEvQixHQUEyQ0YsU0FBU0csU0FBcEQ7QUFDRDtBQUNGO0FBQ0YsRzs7cUJBSURDLE0scUJBQVM7QUFBQTs7QUFBQSxpQkFDeUIsS0FBS0MsS0FEOUI7QUFBQSxRQUNBQyxPQURBLFVBQ0FBLE9BREE7QUFBQSxRQUNTQyxZQURULFVBQ1NBLFlBRFQ7O0FBRVAsUUFBSSxDQUFDRCxPQUFELElBQVksQ0FBQ0EsUUFBUUUsTUFBekIsRUFBaUMsT0FBTyxJQUFQOztBQUVqQyxXQUNFO0FBQUMscUJBQUQsQ0FBTyxRQUFQO0FBQUE7QUFDR0Qsa0JBREg7QUFFRTtBQUFBO0FBQUEsVUFBRyxXQUFXLEtBQUtGLEtBQUwsQ0FBV0ksU0FBekIsRUFBb0MsU0FBUyxLQUFLdEIsV0FBbEQ7QUFDRSw2Q0FBRyxXQUFVLGtCQUFiLEVBQWdDLGVBQVksTUFBNUM7QUFERixPQUZGO0FBS0csV0FBS0YsS0FBTCxDQUFXQyxJQUFYLEdBQ0M7QUFBQTtBQUFBLFVBQUssV0FBVyxrQkFBaEIsRUFBb0MsS0FBSyxLQUFLTSxpQkFBOUM7QUFDRyxhQUFLYSxLQUFMLENBQVdDLE9BQVgsQ0FBbUJJLEdBQW5CLENBQXVCLFVBQUNwQixNQUFELEVBQVk7QUFBQSxnQ0FDVUEsT0FBT2dCLE9BRGpCO0FBQUEsY0FDMUJmLFFBRDBCLG1CQUMxQkEsUUFEMEI7QUFBQSxjQUNUb0IsS0FEUyxtQkFDaEJDLEtBRGdCO0FBQUEsY0FDQ0MsSUFERDs7QUFFbEMsaUJBQ0U7QUFBQTtBQUFBLHVCQUFLLEtBQUt2QixPQUFPd0IsRUFBakIsSUFBeUJELElBQXpCLElBQStCLFNBQVM7QUFBQSx1QkFBTSxPQUFLeEIsV0FBTCxDQUFpQkMsT0FBT2dCLE9BQXhCLENBQU47QUFBQSxlQUF4QztBQUNHaEIsbUJBQU95QixJQURWO0FBQUE7QUFDaUJKO0FBRGpCLFdBREY7QUFLRCxTQVBBO0FBREgsT0FERCxHQVdHO0FBaEJOLEtBREY7QUFvQkQsRzs7O0VBM0RvQmxCLGdCQUFNdUIsUyxVQUNwQkMsUyxHQUFZO0FBQ2pCVixnQkFBY1Usb0JBQVVDLE1BRFA7QUFFakJDLFNBQU9GLG9CQUFVQyxNQUZBO0FBR2pCWixXQUFTVyxvQkFBVUc7QUFIRixDO2tCQTZETnBDLFEiLCJmaWxlIjoiZHJvcGRvd24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcblxuY2xhc3MgRHJvcERvd24gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBzdGF0aWMgUHJvcFR5cGVzID0ge1xuICAgIGFjdGl2ZUluTGlzdDogUHJvcFR5cGVzLm9iamVjdCxcbiAgICB2YWx1ZTogUHJvcFR5cGVzLm9iamVjdCxcbiAgICBvcHRpb25zOiBQcm9wVHlwZXMuYXJyYXlcbiAgfTtcblxuICBzdGF0ZSA9IHtcbiAgICBvcGVuOiBmYWxzZSxcbiAgfTtcblxuICBoYW5kbGVGb2N1cyA9ICgpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIG9wZW46ICF0aGlzLnN0YXRlLm9wZW4sXG4gICAgfSk7XG4gIH07XG5cbiAgaGFuZGxlQ2xpY2sgPSAob3B0aW9uKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBvcGVuOiBmYWxzZSxcbiAgICB9KTtcbiAgICBvcHRpb24ub25TZWxlY3QgJiYgb3B0aW9uLm9uU2VsZWN0KCk7XG4gIH07XG5cbiAgY29tcG9uZW50RGlkVXBkYXRlKHByZXZQcm9wcywgcHJldlN0YXRlLCBzbmFwc2hvdCkge1xuICAgIGlmICh0aGlzLnN0YXRlLm9wZW4gJiYgdGhpcy5kcm9wZG93bkNvbnRhaW5lci5jdXJyZW50KSB7XG4gICAgICBjb25zdCBzZWxlY3RlZCA9IHRoaXMuZHJvcGRvd25Db250YWluZXIuY3VycmVudC5xdWVyeVNlbGVjdG9yKCcuc2VsZWN0ZWQnKTtcbiAgICAgIGlmIChzZWxlY3RlZCkge1xuICAgICAgICB0aGlzLmRyb3Bkb3duQ29udGFpbmVyLmN1cnJlbnQuc2Nyb2xsVG9wID0gc2VsZWN0ZWQub2Zmc2V0VG9wO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGRyb3Bkb3duQ29udGFpbmVyID0gUmVhY3QuY3JlYXRlUmVmKCk7XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtvcHRpb25zLCBhY3RpdmVJbkxpc3R9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAoIW9wdGlvbnMgfHwgIW9wdGlvbnMubGVuZ3RoKSByZXR1cm4gbnVsbDtcblxuICAgIHJldHVybiAoXG4gICAgICA8UmVhY3QuRnJhZ21lbnQ+XG4gICAgICAgIHthY3RpdmVJbkxpc3R9XG4gICAgICAgIDxhIGNsYXNzTmFtZT17dGhpcy5wcm9wcy5jbGFzc05hbWV9IG9uQ2xpY2s9e3RoaXMuaGFuZGxlRm9jdXN9PlxuICAgICAgICAgIDxpIGNsYXNzTmFtZT1cImZhIGZhLWNhcmV0LWRvd25cIiBhcmlhLWhpZGRlbj1cInRydWVcIiAvPlxuICAgICAgICA8L2E+XG4gICAgICAgIHt0aGlzLnN0YXRlLm9wZW4gPyAoXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9eydkcm9wZG93bi1vcHRpb25zJ30gcmVmPXt0aGlzLmRyb3Bkb3duQ29udGFpbmVyfT5cbiAgICAgICAgICAgIHt0aGlzLnByb3BzLm9wdGlvbnMubWFwKChvcHRpb24pID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgeyBvblNlbGVjdCwgY2xvc2U6IENsb3NlLCAuLi5yZXN0IH0gPSBvcHRpb24ub3B0aW9ucztcbiAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8ZGl2IGtleT17b3B0aW9uLmlkfSB7Li4ucmVzdH0gb25DbGljaz17KCkgPT4gdGhpcy5oYW5kbGVDbGljayhvcHRpb24ub3B0aW9ucyl9PlxuICAgICAgICAgICAgICAgICAge29wdGlvbi5uYW1lfSB7Q2xvc2V9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9KX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKSA6IG51bGx9XG4gICAgICA8L1JlYWN0LkZyYWdtZW50PlxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgRHJvcERvd247XG4iXX0=