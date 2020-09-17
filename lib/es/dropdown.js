var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp2;

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import PropTypes from 'prop-types';

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
    }, _this.dropdownContainer = React.createRef(), _temp), _possibleConstructorReturn(_this, _ret);
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

    return React.createElement(
      React.Fragment,
      null,
      activeInList,
      React.createElement(
        'a',
        { className: this.props.className, onClick: this.handleFocus },
        React.createElement('i', { className: 'fa fa-caret-down', 'aria-hidden': 'true' })
      ),
      this.state.open ? React.createElement(
        'div',
        { className: 'dropdown-options', ref: this.dropdownContainer },
        this.props.options.map(function (option) {
          var _option$options = option.options,
              onSelect = _option$options.onSelect,
              Close = _option$options.close,
              rest = _objectWithoutProperties(_option$options, ['onSelect', 'close']);

          return React.createElement(
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
}(React.Component), _class.PropTypes = {
  activeInList: PropTypes.object,
  value: PropTypes.object,
  options: PropTypes.array
}, _temp2);


export default DropDown;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kcm9wZG93bi5qc3giXSwibmFtZXMiOlsiUmVhY3QiLCJQcm9wVHlwZXMiLCJEcm9wRG93biIsInN0YXRlIiwib3BlbiIsImhhbmRsZUZvY3VzIiwic2V0U3RhdGUiLCJoYW5kbGVDbGljayIsIm9wdGlvbiIsIm9uU2VsZWN0IiwiZHJvcGRvd25Db250YWluZXIiLCJjcmVhdGVSZWYiLCJjb21wb25lbnREaWRVcGRhdGUiLCJwcmV2UHJvcHMiLCJwcmV2U3RhdGUiLCJzbmFwc2hvdCIsImN1cnJlbnQiLCJzZWxlY3RlZCIsInF1ZXJ5U2VsZWN0b3IiLCJzY3JvbGxUb3AiLCJvZmZzZXRUb3AiLCJyZW5kZXIiLCJwcm9wcyIsIm9wdGlvbnMiLCJhY3RpdmVJbkxpc3QiLCJsZW5ndGgiLCJjbGFzc05hbWUiLCJtYXAiLCJDbG9zZSIsImNsb3NlIiwicmVzdCIsImlkIiwibmFtZSIsIkNvbXBvbmVudCIsIm9iamVjdCIsInZhbHVlIiwiYXJyYXkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLE9BQU9BLEtBQVAsTUFBa0IsT0FBbEI7QUFDQSxPQUFPQyxTQUFQLE1BQXNCLFlBQXRCOztJQUVNQyxROzs7Ozs7Ozs7Ozs7d0pBT0pDLEssR0FBUTtBQUNOQyxZQUFNO0FBREEsSyxRQUlSQyxXLEdBQWMsWUFBTTtBQUNsQixZQUFLQyxRQUFMLENBQWM7QUFDWkYsY0FBTSxDQUFDLE1BQUtELEtBQUwsQ0FBV0M7QUFETixPQUFkO0FBR0QsSyxRQUVERyxXLEdBQWMsVUFBQ0MsTUFBRCxFQUFZO0FBQ3hCLFlBQUtGLFFBQUwsQ0FBYztBQUNaRixjQUFNO0FBRE0sT0FBZDtBQUdBSSxhQUFPQyxRQUFQLElBQW1CRCxPQUFPQyxRQUFQLEVBQW5CO0FBQ0QsSyxRQVdEQyxpQixHQUFvQlYsTUFBTVcsU0FBTixFOzs7cUJBVHBCQyxrQiwrQkFBbUJDLFMsRUFBV0MsUyxFQUFXQyxRLEVBQVU7QUFDakQsUUFBSSxLQUFLWixLQUFMLENBQVdDLElBQVgsSUFBbUIsS0FBS00saUJBQUwsQ0FBdUJNLE9BQTlDLEVBQXVEO0FBQ3JELFVBQU1DLFdBQVcsS0FBS1AsaUJBQUwsQ0FBdUJNLE9BQXZCLENBQStCRSxhQUEvQixDQUE2QyxXQUE3QyxDQUFqQjtBQUNBLFVBQUlELFFBQUosRUFBYztBQUNaLGFBQUtQLGlCQUFMLENBQXVCTSxPQUF2QixDQUErQkcsU0FBL0IsR0FBMkNGLFNBQVNHLFNBQXBEO0FBQ0Q7QUFDRjtBQUNGLEc7O3FCQUlEQyxNLHFCQUFTO0FBQUE7O0FBQUEsaUJBQ3lCLEtBQUtDLEtBRDlCO0FBQUEsUUFDQUMsT0FEQSxVQUNBQSxPQURBO0FBQUEsUUFDU0MsWUFEVCxVQUNTQSxZQURUOztBQUVQLFFBQUksQ0FBQ0QsT0FBRCxJQUFZLENBQUNBLFFBQVFFLE1BQXpCLEVBQWlDLE9BQU8sSUFBUDs7QUFFakMsV0FDRTtBQUFDLFdBQUQsQ0FBTyxRQUFQO0FBQUE7QUFDR0Qsa0JBREg7QUFFRTtBQUFBO0FBQUEsVUFBRyxXQUFXLEtBQUtGLEtBQUwsQ0FBV0ksU0FBekIsRUFBb0MsU0FBUyxLQUFLckIsV0FBbEQ7QUFDRSxtQ0FBRyxXQUFVLGtCQUFiLEVBQWdDLGVBQVksTUFBNUM7QUFERixPQUZGO0FBS0csV0FBS0YsS0FBTCxDQUFXQyxJQUFYLEdBQ0M7QUFBQTtBQUFBLFVBQUssV0FBVyxrQkFBaEIsRUFBb0MsS0FBSyxLQUFLTSxpQkFBOUM7QUFDRyxhQUFLWSxLQUFMLENBQVdDLE9BQVgsQ0FBbUJJLEdBQW5CLENBQXVCLFVBQUNuQixNQUFELEVBQVk7QUFBQSxnQ0FDVUEsT0FBT2UsT0FEakI7QUFBQSxjQUMxQmQsUUFEMEIsbUJBQzFCQSxRQUQwQjtBQUFBLGNBQ1RtQixLQURTLG1CQUNoQkMsS0FEZ0I7QUFBQSxjQUNDQyxJQUREOztBQUVsQyxpQkFDRTtBQUFBO0FBQUEsdUJBQUssS0FBS3RCLE9BQU91QixFQUFqQixJQUF5QkQsSUFBekIsSUFBK0IsU0FBUztBQUFBLHVCQUFNLE9BQUt2QixXQUFMLENBQWlCQyxPQUFPZSxPQUF4QixDQUFOO0FBQUEsZUFBeEM7QUFDR2YsbUJBQU93QixJQURWO0FBQUE7QUFDaUJKO0FBRGpCLFdBREY7QUFLRCxTQVBBO0FBREgsT0FERCxHQVdHO0FBaEJOLEtBREY7QUFvQkQsRzs7O0VBM0RvQjVCLE1BQU1pQyxTLFVBQ3BCaEMsUyxHQUFZO0FBQ2pCdUIsZ0JBQWN2QixVQUFVaUMsTUFEUDtBQUVqQkMsU0FBT2xDLFVBQVVpQyxNQUZBO0FBR2pCWCxXQUFTdEIsVUFBVW1DO0FBSEYsQzs7O0FBNkRyQixlQUFlbEMsUUFBZiIsImZpbGUiOiJkcm9wZG93bi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuXG5jbGFzcyBEcm9wRG93biBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHN0YXRpYyBQcm9wVHlwZXMgPSB7XG4gICAgYWN0aXZlSW5MaXN0OiBQcm9wVHlwZXMub2JqZWN0LFxuICAgIHZhbHVlOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgIG9wdGlvbnM6IFByb3BUeXBlcy5hcnJheVxuICB9O1xuXG4gIHN0YXRlID0ge1xuICAgIG9wZW46IGZhbHNlLFxuICB9O1xuXG4gIGhhbmRsZUZvY3VzID0gKCkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgb3BlbjogIXRoaXMuc3RhdGUub3BlbixcbiAgICB9KTtcbiAgfTtcblxuICBoYW5kbGVDbGljayA9IChvcHRpb24pID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIG9wZW46IGZhbHNlLFxuICAgIH0pO1xuICAgIG9wdGlvbi5vblNlbGVjdCAmJiBvcHRpb24ub25TZWxlY3QoKTtcbiAgfTtcblxuICBjb21wb25lbnREaWRVcGRhdGUocHJldlByb3BzLCBwcmV2U3RhdGUsIHNuYXBzaG90KSB7XG4gICAgaWYgKHRoaXMuc3RhdGUub3BlbiAmJiB0aGlzLmRyb3Bkb3duQ29udGFpbmVyLmN1cnJlbnQpIHtcbiAgICAgIGNvbnN0IHNlbGVjdGVkID0gdGhpcy5kcm9wZG93bkNvbnRhaW5lci5jdXJyZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZWxlY3RlZCcpO1xuICAgICAgaWYgKHNlbGVjdGVkKSB7XG4gICAgICAgIHRoaXMuZHJvcGRvd25Db250YWluZXIuY3VycmVudC5zY3JvbGxUb3AgPSBzZWxlY3RlZC5vZmZzZXRUb3A7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZHJvcGRvd25Db250YWluZXIgPSBSZWFjdC5jcmVhdGVSZWYoKTtcblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge29wdGlvbnMsIGFjdGl2ZUluTGlzdH0gPSB0aGlzLnByb3BzO1xuICAgIGlmICghb3B0aW9ucyB8fCAhb3B0aW9ucy5sZW5ndGgpIHJldHVybiBudWxsO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxSZWFjdC5GcmFnbWVudD5cbiAgICAgICAge2FjdGl2ZUluTGlzdH1cbiAgICAgICAgPGEgY2xhc3NOYW1lPXt0aGlzLnByb3BzLmNsYXNzTmFtZX0gb25DbGljaz17dGhpcy5oYW5kbGVGb2N1c30+XG4gICAgICAgICAgPGkgY2xhc3NOYW1lPVwiZmEgZmEtY2FyZXQtZG93blwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiIC8+XG4gICAgICAgIDwvYT5cbiAgICAgICAge3RoaXMuc3RhdGUub3BlbiA/IChcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17J2Ryb3Bkb3duLW9wdGlvbnMnfSByZWY9e3RoaXMuZHJvcGRvd25Db250YWluZXJ9PlxuICAgICAgICAgICAge3RoaXMucHJvcHMub3B0aW9ucy5tYXAoKG9wdGlvbikgPT4ge1xuICAgICAgICAgICAgICBjb25zdCB7IG9uU2VsZWN0LCBjbG9zZTogQ2xvc2UsIC4uLnJlc3QgfSA9IG9wdGlvbi5vcHRpb25zO1xuICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXYga2V5PXtvcHRpb24uaWR9IHsuLi5yZXN0fSBvbkNsaWNrPXsoKSA9PiB0aGlzLmhhbmRsZUNsaWNrKG9wdGlvbi5vcHRpb25zKX0+XG4gICAgICAgICAgICAgICAgICB7b3B0aW9uLm5hbWV9IHtDbG9zZX1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0pfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApIDogbnVsbH1cbiAgICAgIDwvUmVhY3QuRnJhZ21lbnQ+XG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBEcm9wRG93bjtcbiJdfQ==