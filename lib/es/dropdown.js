var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
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

    return React.createElement(
      React.Fragment,
      null,
      React.createElement(
        "a",
        { className: this.props.className, onClick: this.handleFocus },
        React.createElement("i", { className: "fa fa-caret-down", "aria-hidden": "true" })
      ),
      this.state.open ? React.createElement(
        "div",
        { className: 'dropdown-options' },
        this.props.options.map(function (option) {
          var _option$options = option.options,
              onSelect = _option$options.onSelect,
              Close = _option$options.close,
              rest = _objectWithoutProperties(_option$options, ["onSelect", "close"]);

          return React.createElement(
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
}(React.Component);

export default DropDown;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kcm9wZG93bi5qc3giXSwibmFtZXMiOlsiUmVhY3QiLCJEcm9wRG93biIsInN0YXRlIiwib3BlbiIsImhhbmRsZUZvY3VzIiwic2V0U3RhdGUiLCJoYW5kbGVDbGljayIsIm9wdGlvbiIsIm9uU2VsZWN0IiwicmVuZGVyIiwicHJvcHMiLCJjbGFzc05hbWUiLCJvcHRpb25zIiwibWFwIiwiQ2xvc2UiLCJjbG9zZSIsInJlc3QiLCJpZCIsIm5hbWUiLCJDb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxPQUFPQSxLQUFQLE1BQWtCLE9BQWxCO0FBQ0E7QUFDQTs7SUFFTUMsUTs7Ozs7Ozs7Ozs7O3dKQUNKQyxLLEdBQVE7QUFDTkMsWUFBTTtBQURBLEssUUFJUkMsVyxHQUFjLFlBQU07QUFDbEIsWUFBS0MsUUFBTCxDQUFjO0FBQ1pGLGNBQU0sQ0FBQyxNQUFLRCxLQUFMLENBQVdDO0FBRE4sT0FBZDtBQUdELEssUUFFREcsVyxHQUFjLFVBQUNDLE1BQUQsRUFBWTtBQUN4QixZQUFLRixRQUFMLENBQWM7QUFDWkYsY0FBTTtBQURNLE9BQWQ7QUFHQUksYUFBT0MsUUFBUCxJQUFtQkQsT0FBT0MsUUFBUCxFQUFuQjtBQUNELEs7OztxQkFFREMsTSxxQkFBUztBQUFBOztBQUNQLFdBQ0U7QUFBQyxXQUFELENBQU8sUUFBUDtBQUFBO0FBQ0U7QUFBQTtBQUFBLFVBQUcsV0FBVyxLQUFLQyxLQUFMLENBQVdDLFNBQXpCLEVBQW9DLFNBQVMsS0FBS1AsV0FBbEQ7QUFDRSxtQ0FBRyxXQUFVLGtCQUFiLEVBQWdDLGVBQVksTUFBNUM7QUFERixPQURGO0FBSUcsV0FBS0YsS0FBTCxDQUFXQyxJQUFYLEdBQ0M7QUFBQTtBQUFBLFVBQUssV0FBVyxrQkFBaEI7QUFDRyxhQUFLTyxLQUFMLENBQVdFLE9BQVgsQ0FBbUJDLEdBQW5CLENBQXVCLFVBQUNOLE1BQUQsRUFBWTtBQUFBLGdDQUNVQSxPQUFPSyxPQURqQjtBQUFBLGNBQzFCSixRQUQwQixtQkFDMUJBLFFBRDBCO0FBQUEsY0FDVE0sS0FEUyxtQkFDaEJDLEtBRGdCO0FBQUEsY0FDQ0MsSUFERDs7QUFFbEMsaUJBQ0U7QUFBQTtBQUFBLHVCQUFLLEtBQUtULE9BQU9VLEVBQWpCLElBQXlCRCxJQUF6QixJQUErQixTQUFTO0FBQUEsdUJBQU0sT0FBS1YsV0FBTCxDQUFpQkMsT0FBT0ssT0FBeEIsQ0FBTjtBQUFBLGVBQXhDO0FBQ0dMLG1CQUFPVyxJQURWO0FBQUE7QUFDaUJKO0FBRGpCLFdBREY7QUFLRCxTQVBBO0FBREgsT0FERCxHQVdHO0FBZk4sS0FERjtBQW1CRCxHOzs7RUF0Q29CZCxNQUFNbUIsUzs7QUF5QzdCLGVBQWVsQixRQUFmIiwiZmlsZSI6ImRyb3Bkb3duLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0Jztcbi8vIGltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG4vLyBpbXBvcnQgY2xhc3NuYW1lcyBmcm9tICdjbGFzc25hbWVzJztcblxuY2xhc3MgRHJvcERvd24gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBzdGF0ZSA9IHtcbiAgICBvcGVuOiBmYWxzZSxcbiAgfTtcblxuICBoYW5kbGVGb2N1cyA9ICgpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIG9wZW46ICF0aGlzLnN0YXRlLm9wZW4sXG4gICAgfSk7XG4gIH07XG5cbiAgaGFuZGxlQ2xpY2sgPSAob3B0aW9uKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBvcGVuOiBmYWxzZSxcbiAgICB9KTtcbiAgICBvcHRpb24ub25TZWxlY3QgJiYgb3B0aW9uLm9uU2VsZWN0KCk7XG4gIH07XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8UmVhY3QuRnJhZ21lbnQ+XG4gICAgICAgIDxhIGNsYXNzTmFtZT17dGhpcy5wcm9wcy5jbGFzc05hbWV9IG9uQ2xpY2s9e3RoaXMuaGFuZGxlRm9jdXN9PlxuICAgICAgICAgIDxpIGNsYXNzTmFtZT1cImZhIGZhLWNhcmV0LWRvd25cIiBhcmlhLWhpZGRlbj1cInRydWVcIiAvPlxuICAgICAgICA8L2E+XG4gICAgICAgIHt0aGlzLnN0YXRlLm9wZW4gPyAoXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9eydkcm9wZG93bi1vcHRpb25zJ30+XG4gICAgICAgICAgICB7dGhpcy5wcm9wcy5vcHRpb25zLm1hcCgob3B0aW9uKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IHsgb25TZWxlY3QsIGNsb3NlOiBDbG9zZSwgLi4ucmVzdCB9ID0gb3B0aW9uLm9wdGlvbnM7XG4gICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGRpdiBrZXk9e29wdGlvbi5pZH0gey4uLnJlc3R9IG9uQ2xpY2s9eygpID0+IHRoaXMuaGFuZGxlQ2xpY2sob3B0aW9uLm9wdGlvbnMpfT5cbiAgICAgICAgICAgICAgICAgIHtvcHRpb24ubmFtZX0ge0Nsb3NlfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSl9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICkgOiBudWxsfVxuICAgICAgPC9SZWFjdC5GcmFnbWVudD5cbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IERyb3BEb3duO1xuIl19