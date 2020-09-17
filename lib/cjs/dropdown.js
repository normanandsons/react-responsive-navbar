"use strict";

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// import PropTypes from 'prop-types';
// import classnames from 'classnames';

var DropDown = function (_React$Component) {
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
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  DropDown.prototype.render = function render() {
    var _this2 = this;

    return _react2.default.createElement(
      _react2.default.Fragment,
      null,
      _react2.default.createElement(
        "a",
        { className: this.props.className, onClick: this.handleFocus },
        _react2.default.createElement("i", { className: "fa fa-caret-down", "aria-hidden": "true" })
      ),
      this.state.open ? _react2.default.createElement(
        "div",
        { className: 'dropdown-options' },
        this.props.options.map(function (option) {
          var _option$options = option.options,
              onSelect = _option$options.onSelect,
              Close = _option$options.close,
              rest = _objectWithoutProperties(_option$options, ["onSelect", "close"]);

          return _react2.default.createElement(
            "div",
            _extends({ key: option.id }, rest, { onClick: function onClick() {
                return _this2.handleClick(option.options);
              } }),
            option.name,
            " ",
            Close
          );
        })
      ) : null
    );
  };

  return DropDown;
}(_react2.default.Component);

exports.default = DropDown;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kcm9wZG93bi5qc3giXSwibmFtZXMiOlsiRHJvcERvd24iLCJzdGF0ZSIsIm9wZW4iLCJoYW5kbGVGb2N1cyIsInNldFN0YXRlIiwiaGFuZGxlQ2xpY2siLCJvcHRpb24iLCJvblNlbGVjdCIsInJlbmRlciIsInByb3BzIiwiY2xhc3NOYW1lIiwib3B0aW9ucyIsIm1hcCIsIkNsb3NlIiwiY2xvc2UiLCJyZXN0IiwiaWQiLCJuYW1lIiwiUmVhY3QiLCJDb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7OztBQUNBO0FBQ0E7O0lBRU1BLFE7Ozs7Ozs7Ozs7Ozt3SkFDSkMsSyxHQUFRO0FBQ05DLFlBQU07QUFEQSxLLFFBSVJDLFcsR0FBYyxZQUFNO0FBQ2xCLFlBQUtDLFFBQUwsQ0FBYztBQUNaRixjQUFNLENBQUMsTUFBS0QsS0FBTCxDQUFXQztBQUROLE9BQWQ7QUFHRCxLLFFBRURHLFcsR0FBYyxVQUFDQyxNQUFELEVBQVk7QUFDeEIsWUFBS0YsUUFBTCxDQUFjO0FBQ1pGLGNBQU07QUFETSxPQUFkO0FBR0FJLGFBQU9DLFFBQVAsSUFBbUJELE9BQU9DLFFBQVAsRUFBbkI7QUFDRCxLOzs7cUJBRURDLE0scUJBQVM7QUFBQTs7QUFDUCxXQUNFO0FBQUMscUJBQUQsQ0FBTyxRQUFQO0FBQUE7QUFDRTtBQUFBO0FBQUEsVUFBRyxXQUFXLEtBQUtDLEtBQUwsQ0FBV0MsU0FBekIsRUFBb0MsU0FBUyxLQUFLUCxXQUFsRDtBQUNFLDZDQUFHLFdBQVUsa0JBQWIsRUFBZ0MsZUFBWSxNQUE1QztBQURGLE9BREY7QUFJRyxXQUFLRixLQUFMLENBQVdDLElBQVgsR0FDQztBQUFBO0FBQUEsVUFBSyxXQUFXLGtCQUFoQjtBQUNHLGFBQUtPLEtBQUwsQ0FBV0UsT0FBWCxDQUFtQkMsR0FBbkIsQ0FBdUIsVUFBQ04sTUFBRCxFQUFZO0FBQUEsZ0NBQ1VBLE9BQU9LLE9BRGpCO0FBQUEsY0FDMUJKLFFBRDBCLG1CQUMxQkEsUUFEMEI7QUFBQSxjQUNUTSxLQURTLG1CQUNoQkMsS0FEZ0I7QUFBQSxjQUNDQyxJQUREOztBQUVsQyxpQkFDRTtBQUFBO0FBQUEsdUJBQUssS0FBS1QsT0FBT1UsRUFBakIsSUFBeUJELElBQXpCLElBQStCLFNBQVM7QUFBQSx1QkFBTSxPQUFLVixXQUFMLENBQWlCQyxPQUFPSyxPQUF4QixDQUFOO0FBQUEsZUFBeEM7QUFDR0wsbUJBQU9XLElBRFY7QUFBQTtBQUNpQko7QUFEakIsV0FERjtBQUtELFNBUEE7QUFESCxPQURELEdBV0c7QUFmTixLQURGO0FBbUJELEc7OztFQXRDb0JLLGdCQUFNQyxTOztrQkF5Q2RuQixRIiwiZmlsZSI6ImRyb3Bkb3duLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0Jztcbi8vIGltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG4vLyBpbXBvcnQgY2xhc3NuYW1lcyBmcm9tICdjbGFzc25hbWVzJztcblxuY2xhc3MgRHJvcERvd24gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBzdGF0ZSA9IHtcbiAgICBvcGVuOiBmYWxzZSxcbiAgfTtcblxuICBoYW5kbGVGb2N1cyA9ICgpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIG9wZW46ICF0aGlzLnN0YXRlLm9wZW4sXG4gICAgfSk7XG4gIH07XG5cbiAgaGFuZGxlQ2xpY2sgPSAob3B0aW9uKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBvcGVuOiBmYWxzZSxcbiAgICB9KTtcbiAgICBvcHRpb24ub25TZWxlY3QgJiYgb3B0aW9uLm9uU2VsZWN0KCk7XG4gIH07XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8UmVhY3QuRnJhZ21lbnQ+XG4gICAgICAgIDxhIGNsYXNzTmFtZT17dGhpcy5wcm9wcy5jbGFzc05hbWV9IG9uQ2xpY2s9e3RoaXMuaGFuZGxlRm9jdXN9PlxuICAgICAgICAgIDxpIGNsYXNzTmFtZT1cImZhIGZhLWNhcmV0LWRvd25cIiBhcmlhLWhpZGRlbj1cInRydWVcIiAvPlxuICAgICAgICA8L2E+XG4gICAgICAgIHt0aGlzLnN0YXRlLm9wZW4gPyAoXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9eydkcm9wZG93bi1vcHRpb25zJ30+XG4gICAgICAgICAgICB7dGhpcy5wcm9wcy5vcHRpb25zLm1hcCgob3B0aW9uKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IHsgb25TZWxlY3QsIGNsb3NlOiBDbG9zZSwgLi4ucmVzdCB9ID0gb3B0aW9uLm9wdGlvbnM7XG4gICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGRpdiBrZXk9e29wdGlvbi5pZH0gey4uLnJlc3R9IG9uQ2xpY2s9eygpID0+IHRoaXMuaGFuZGxlQ2xpY2sob3B0aW9uLm9wdGlvbnMpfT5cbiAgICAgICAgICAgICAgICAgIHtvcHRpb24ubmFtZX0ge0Nsb3NlfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSl9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICkgOiBudWxsfVxuICAgICAgPC9SZWFjdC5GcmFnbWVudD5cbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IERyb3BEb3duO1xuIl19