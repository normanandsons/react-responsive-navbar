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

    var options = this.props.options;

    if (!options || !options.length) return null;

    return React.createElement(
      React.Fragment,
      null,
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
}(React.Component);

export default DropDown;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kcm9wZG93bi5qc3giXSwibmFtZXMiOlsiUmVhY3QiLCJEcm9wRG93biIsInN0YXRlIiwib3BlbiIsImhhbmRsZUZvY3VzIiwic2V0U3RhdGUiLCJoYW5kbGVDbGljayIsIm9wdGlvbiIsIm9uU2VsZWN0IiwiZHJvcGRvd25Db250YWluZXIiLCJjcmVhdGVSZWYiLCJjb21wb25lbnREaWRVcGRhdGUiLCJwcmV2UHJvcHMiLCJwcmV2U3RhdGUiLCJzbmFwc2hvdCIsImN1cnJlbnQiLCJzZWxlY3RlZCIsInF1ZXJ5U2VsZWN0b3IiLCJzY3JvbGxUb3AiLCJvZmZzZXRUb3AiLCJyZW5kZXIiLCJvcHRpb25zIiwicHJvcHMiLCJsZW5ndGgiLCJjbGFzc05hbWUiLCJtYXAiLCJDbG9zZSIsImNsb3NlIiwicmVzdCIsImlkIiwibmFtZSIsIkNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLE9BQU9BLEtBQVAsTUFBa0IsT0FBbEI7QUFDQTtBQUNBOztJQUVNQyxROzs7Ozs7Ozs7Ozs7d0pBQ0pDLEssR0FBUTtBQUNOQyxZQUFNO0FBREEsSyxRQUlSQyxXLEdBQWMsWUFBTTtBQUNsQixZQUFLQyxRQUFMLENBQWM7QUFDWkYsY0FBTSxDQUFDLE1BQUtELEtBQUwsQ0FBV0M7QUFETixPQUFkO0FBR0QsSyxRQUVERyxXLEdBQWMsVUFBQ0MsTUFBRCxFQUFZO0FBQ3hCLFlBQUtGLFFBQUwsQ0FBYztBQUNaRixjQUFNO0FBRE0sT0FBZDtBQUdBSSxhQUFPQyxRQUFQLElBQW1CRCxPQUFPQyxRQUFQLEVBQW5CO0FBQ0QsSyxRQVdEQyxpQixHQUFvQlQsTUFBTVUsU0FBTixFOzs7cUJBVHBCQyxrQiwrQkFBbUJDLFMsRUFBV0MsUyxFQUFXQyxRLEVBQVU7QUFDakQsUUFBSSxLQUFLWixLQUFMLENBQVdDLElBQVgsSUFBbUIsS0FBS00saUJBQUwsQ0FBdUJNLE9BQTlDLEVBQXVEO0FBQ3JELFVBQU1DLFdBQVcsS0FBS1AsaUJBQUwsQ0FBdUJNLE9BQXZCLENBQStCRSxhQUEvQixDQUE2QyxXQUE3QyxDQUFqQjtBQUNBLFVBQUlELFFBQUosRUFBYztBQUNaLGFBQUtQLGlCQUFMLENBQXVCTSxPQUF2QixDQUErQkcsU0FBL0IsR0FBMkNGLFNBQVNHLFNBQXBEO0FBQ0Q7QUFDRjtBQUNGLEc7O3FCQUlEQyxNLHFCQUFTO0FBQUE7O0FBQUEsUUFDQUMsT0FEQSxHQUNXLEtBQUtDLEtBRGhCLENBQ0FELE9BREE7O0FBRVAsUUFBSSxDQUFDQSxPQUFELElBQVksQ0FBQ0EsUUFBUUUsTUFBekIsRUFBaUMsT0FBTyxJQUFQOztBQUVqQyxXQUNFO0FBQUMsV0FBRCxDQUFPLFFBQVA7QUFBQTtBQUNFO0FBQUE7QUFBQSxVQUFHLFdBQVcsS0FBS0QsS0FBTCxDQUFXRSxTQUF6QixFQUFvQyxTQUFTLEtBQUtwQixXQUFsRDtBQUNFLG1DQUFHLFdBQVUsa0JBQWIsRUFBZ0MsZUFBWSxNQUE1QztBQURGLE9BREY7QUFJRyxXQUFLRixLQUFMLENBQVdDLElBQVgsR0FDQztBQUFBO0FBQUEsVUFBSyxXQUFXLGtCQUFoQixFQUFvQyxLQUFLLEtBQUtNLGlCQUE5QztBQUNHLGFBQUthLEtBQUwsQ0FBV0QsT0FBWCxDQUFtQkksR0FBbkIsQ0FBdUIsVUFBQ2xCLE1BQUQsRUFBWTtBQUFBLGdDQUNVQSxPQUFPYyxPQURqQjtBQUFBLGNBQzFCYixRQUQwQixtQkFDMUJBLFFBRDBCO0FBQUEsY0FDVGtCLEtBRFMsbUJBQ2hCQyxLQURnQjtBQUFBLGNBQ0NDLElBREQ7O0FBRWxDLGlCQUNFO0FBQUE7QUFBQSx1QkFBSyxLQUFLckIsT0FBT3NCLEVBQWpCLElBQXlCRCxJQUF6QixJQUErQixTQUFTO0FBQUEsdUJBQU0sT0FBS3RCLFdBQUwsQ0FBaUJDLE9BQU9jLE9BQXhCLENBQU47QUFBQSxlQUF4QztBQUNHZCxtQkFBT3VCLElBRFY7QUFBQTtBQUNpQko7QUFEakIsV0FERjtBQUtELFNBUEE7QUFESCxPQURELEdBV0c7QUFmTixLQURGO0FBbUJELEc7OztFQXBEb0IxQixNQUFNK0IsUzs7QUF1RDdCLGVBQWU5QixRQUFmIiwiZmlsZSI6ImRyb3Bkb3duLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0Jztcbi8vIGltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG4vLyBpbXBvcnQgY2xhc3NuYW1lcyBmcm9tICdjbGFzc25hbWVzJztcblxuY2xhc3MgRHJvcERvd24gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBzdGF0ZSA9IHtcbiAgICBvcGVuOiBmYWxzZSxcbiAgfTtcblxuICBoYW5kbGVGb2N1cyA9ICgpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIG9wZW46ICF0aGlzLnN0YXRlLm9wZW4sXG4gICAgfSk7XG4gIH07XG5cbiAgaGFuZGxlQ2xpY2sgPSAob3B0aW9uKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBvcGVuOiBmYWxzZSxcbiAgICB9KTtcbiAgICBvcHRpb24ub25TZWxlY3QgJiYgb3B0aW9uLm9uU2VsZWN0KCk7XG4gIH07XG5cbiAgY29tcG9uZW50RGlkVXBkYXRlKHByZXZQcm9wcywgcHJldlN0YXRlLCBzbmFwc2hvdCkge1xuICAgIGlmICh0aGlzLnN0YXRlLm9wZW4gJiYgdGhpcy5kcm9wZG93bkNvbnRhaW5lci5jdXJyZW50KSB7XG4gICAgICBjb25zdCBzZWxlY3RlZCA9IHRoaXMuZHJvcGRvd25Db250YWluZXIuY3VycmVudC5xdWVyeVNlbGVjdG9yKCcuc2VsZWN0ZWQnKTtcbiAgICAgIGlmIChzZWxlY3RlZCkge1xuICAgICAgICB0aGlzLmRyb3Bkb3duQ29udGFpbmVyLmN1cnJlbnQuc2Nyb2xsVG9wID0gc2VsZWN0ZWQub2Zmc2V0VG9wO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGRyb3Bkb3duQ29udGFpbmVyID0gUmVhY3QuY3JlYXRlUmVmKCk7XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtvcHRpb25zfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKCFvcHRpb25zIHx8ICFvcHRpb25zLmxlbmd0aCkgcmV0dXJuIG51bGw7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPFJlYWN0LkZyYWdtZW50PlxuICAgICAgICA8YSBjbGFzc05hbWU9e3RoaXMucHJvcHMuY2xhc3NOYW1lfSBvbkNsaWNrPXt0aGlzLmhhbmRsZUZvY3VzfT5cbiAgICAgICAgICA8aSBjbGFzc05hbWU9XCJmYSBmYS1jYXJldC1kb3duXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCIgLz5cbiAgICAgICAgPC9hPlxuICAgICAgICB7dGhpcy5zdGF0ZS5vcGVuID8gKFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXsnZHJvcGRvd24tb3B0aW9ucyd9IHJlZj17dGhpcy5kcm9wZG93bkNvbnRhaW5lcn0+XG4gICAgICAgICAgICB7dGhpcy5wcm9wcy5vcHRpb25zLm1hcCgob3B0aW9uKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IHsgb25TZWxlY3QsIGNsb3NlOiBDbG9zZSwgLi4ucmVzdCB9ID0gb3B0aW9uLm9wdGlvbnM7XG4gICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGRpdiBrZXk9e29wdGlvbi5pZH0gey4uLnJlc3R9IG9uQ2xpY2s9eygpID0+IHRoaXMuaGFuZGxlQ2xpY2sob3B0aW9uLm9wdGlvbnMpfT5cbiAgICAgICAgICAgICAgICAgIHtvcHRpb24ubmFtZX0ge0Nsb3NlfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSl9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICkgOiBudWxsfVxuICAgICAgPC9SZWFjdC5GcmFnbWVudD5cbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IERyb3BEb3duO1xuIl19