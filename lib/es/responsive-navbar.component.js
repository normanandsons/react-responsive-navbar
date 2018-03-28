function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* eslint-disable react/no-array-index-key */
/* eslint-disable react/no-string-refs */
/* eslint-disable react/no-find-dom-node */
/* eslint-disable react/prop-types */

import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import Select from 'react-select';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import 'react-select/dist/react-select.css';
import './responsive-navbar.scss';

var ResponsiveNavbar = function (_React$PureComponent) {
  _inherits(ResponsiveNavbar, _React$PureComponent);

  function ResponsiveNavbar() {
    var _temp, _this, _ret;

    _classCallCheck(this, ResponsiveNavbar);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args))), _this), _this.state = {
      updateDimenssions: true,
      lastVisibleItemIndex: -1,
      lastWidth: 0
    }, _this.indexOfLastVisibleNavItem = function () {
      var container = _this.refs.navbarContainer;
      var containerWidth = ReactDOM.findDOMNode(container) ? ReactDOM.findDOMNode(container).offsetWidth : 0;

      var remainingWidth = containerWidth - 195;

      var lastVisible = 1;
      for (var i = 0; i < _this.props.list.length - 1; i += 1) {
        var item = _this.refs['navitemref' + String(i)];
        var node = ReactDOM.findDOMNode(item);
        if (!node) {
          break;
        }
        var itemWidth = node.offsetWidth;
        remainingWidth -= itemWidth;
        if (remainingWidth < 0) {
          lastVisible -= 1;
          break;
        }
        lastVisible += 1;
      }

      return lastVisible;
    }, _this.handleResizeEvent = function () {
      var difference = window.innerWidth - _this.state.lastWidth;
      var UPDATE_THRESHOLD = 50;
      if (Math.abs(difference) > UPDATE_THRESHOLD) {
        _this.setState({
          updateDimenssions: true,
          lastWidth: window.innerWidth
        });
      }
    }, _this.selectionChanged = function (item) {
      _this.props.router.push(item.value);
    }, _this.tooltipWrapper = function (node, index, tooltipContent) {
      var tooltip = React.createElement(
        Tooltip,
        { id: 'tooltip' },
        tooltipContent
      );
      return !_this.props.showNavItemTooltip ? node : React.createElement(
        OverlayTrigger,
        { placement: 'bottom', key: index, overlay: tooltip, delayShow: _this.props.tooltipDelay },
        node
      );
    }, _this.navbarItem = function (item, index, className) {
      return React.createElement(
        'button',
        {
          className: index === _this.props.activeKey && index <= _this.state.lastVisibleItemIndex ? className + ' selected-border' : '' + className,
          style: { fontWeight: _this.props.fontWeight, fontSize: _this.props.fontSize },
          id: item.id || 'navitemref' + String(index),
          key: item.id || 'navitemref' + String(index),
          ref: 'navitemref' + String(index),
          onClick: function onClick() {
            _this.props.onSelect(item.href);
          }
        },
        React.createElement(
          'span',
          { className: 'responsive-navbar-item-text' },
          item.name
        )
      );
    }, _this.navbar = function () {
      var list = _this.state.lastVisibleItemIndex >= 0 ? _this.props.list.slice(0, _this.state.lastVisibleItemIndex) : _this.props.list;
      var className = _this.props.showNavItemBorder ? 'responsive-navbar-item inactive-border' : 'responsive-navbar-item';
      var items = list.map(function (item, index) {
        return _this.tooltipWrapper(_this.navbarItem(item, index, className), index, item.name);
      });

      return React.createElement(
        'div',
        {
          id: 'responsive-navbar-container',
          ref: 'navbarContainer',
          style: { minHeight: _this.props.height }
        },
        items,
        _this.combobox()
      );
    }, _this.combobox = function () {
      if (_this.state.lastVisibleItemIndex === -1 || _this.state.lastVisibleItemIndex > _this.props.list.length - 1) {
        // return null if all nav items are visible
        return null;
      }

      // slice nav items list and show invisible items in the combobox
      var list = _this.state.lastVisibleItemIndex >= 0 ? _this.props.list.slice(_this.state.lastVisibleItemIndex) : _this.props.list;
      var items = list.map(function (item, index) {
        return {
          value: item.href,
          label: item.name,
          id: index,
          ref: 'navitemref' + String(index)
        };
      });

      var inactiveBorder = _this.props.showNavItemBorder ? 'inactive-border' : '';
      var borderClass = _this.props.activeKey >= _this.state.lastVisibleItemIndex ? 'selected-border' : inactiveBorder;
      var activeItem = _this.props.list[_this.props.activeKey];
      return React.createElement(
        'div',
        {
          id: 'responsive-navbar-select',
          className: borderClass,
          style: { fontWeight: _this.props.fontWeight, fontSize: _this.props.fontSize }
        },
        React.createElement(Select, {
          name: 'responsiveNavbarSelect',
          multi: false,
          value: activeItem ? activeItem.href : '',
          clearable: false,
          placeholder: _this.props.placeholder,
          options: items,
          onChange: function onChange(item) {
            _this.props.onSelect(item.value);
          },
          inputProps: { id: 'ocResponsiveNavbarSelect' }
        })
      );
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  ResponsiveNavbar.prototype.componentDidMount = function componentDidMount() {
    var _this2 = this;

    window.addEventListener('resize', this.handleResizeEvent);
    window.addEventListener('orientationchange', this.handleResizeEvent); // for mobile support
    // Component is not rendered yet by browser when DidMount is called
    setTimeout(function () {
      _this2.handleResizeEvent();
    }, 200);
  };

  ResponsiveNavbar.prototype.componentDidUpdate = function componentDidUpdate() {
    if (this.state.updateDimenssions) {
      this.setState({ // eslint-disable-line react/no-did-update-set-state
        // 2nd render is triggered here in purpose
        updateDimenssions: false,
        lastVisibleItemIndex: this.indexOfLastVisibleNavItem()
      });
    }
  };

  ResponsiveNavbar.prototype.componentWillUnmount = function componentWillUnmount() {
    window.removeEventListener('resize', this.handleResizeEvent);
    window.removeEventListener('orientationchange', this.handleResizeEvent); // for mobile support
  };

  ResponsiveNavbar.prototype.render = function render() {
    return this.navbar();
  };

  return ResponsiveNavbar;
}(React.PureComponent);

export { ResponsiveNavbar as default };


ResponsiveNavbar.defaultProps = {
  onSelect: null,
  showNavItemBorder: false,
  showNavItemTooltip: true,
  tooltipDelay: 2000,
  fontSize: 'inherit',
  fontWeight: 'inherit',
  placeholder: 'more...',
  height: '40px'
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yZXNwb25zaXZlLW5hdmJhci5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIlJlYWN0IiwiUHJvcFR5cGVzIiwiUmVhY3RET00iLCJTZWxlY3QiLCJPdmVybGF5VHJpZ2dlciIsIlRvb2x0aXAiLCJSZXNwb25zaXZlTmF2YmFyIiwic3RhdGUiLCJ1cGRhdGVEaW1lbnNzaW9ucyIsImxhc3RWaXNpYmxlSXRlbUluZGV4IiwibGFzdFdpZHRoIiwiaW5kZXhPZkxhc3RWaXNpYmxlTmF2SXRlbSIsImNvbnRhaW5lciIsInJlZnMiLCJuYXZiYXJDb250YWluZXIiLCJjb250YWluZXJXaWR0aCIsImZpbmRET01Ob2RlIiwib2Zmc2V0V2lkdGgiLCJyZW1haW5pbmdXaWR0aCIsImxhc3RWaXNpYmxlIiwiaSIsInByb3BzIiwibGlzdCIsImxlbmd0aCIsIml0ZW0iLCJTdHJpbmciLCJub2RlIiwiaXRlbVdpZHRoIiwiaGFuZGxlUmVzaXplRXZlbnQiLCJkaWZmZXJlbmNlIiwid2luZG93IiwiaW5uZXJXaWR0aCIsIlVQREFURV9USFJFU0hPTEQiLCJNYXRoIiwiYWJzIiwic2V0U3RhdGUiLCJzZWxlY3Rpb25DaGFuZ2VkIiwicm91dGVyIiwicHVzaCIsInZhbHVlIiwidG9vbHRpcFdyYXBwZXIiLCJpbmRleCIsInRvb2x0aXBDb250ZW50IiwidG9vbHRpcCIsInNob3dOYXZJdGVtVG9vbHRpcCIsInRvb2x0aXBEZWxheSIsIm5hdmJhckl0ZW0iLCJjbGFzc05hbWUiLCJhY3RpdmVLZXkiLCJmb250V2VpZ2h0IiwiZm9udFNpemUiLCJpZCIsIm9uU2VsZWN0IiwiaHJlZiIsIm5hbWUiLCJuYXZiYXIiLCJzbGljZSIsInNob3dOYXZJdGVtQm9yZGVyIiwiaXRlbXMiLCJtYXAiLCJtaW5IZWlnaHQiLCJoZWlnaHQiLCJjb21ib2JveCIsImxhYmVsIiwicmVmIiwiaW5hY3RpdmVCb3JkZXIiLCJib3JkZXJDbGFzcyIsImFjdGl2ZUl0ZW0iLCJwbGFjZWhvbGRlciIsImNvbXBvbmVudERpZE1vdW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsInNldFRpbWVvdXQiLCJjb21wb25lbnREaWRVcGRhdGUiLCJjb21wb25lbnRXaWxsVW5tb3VudCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJyZW5kZXIiLCJQdXJlQ29tcG9uZW50IiwiZGVmYXVsdFByb3BzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxPQUFPQSxLQUFQLE1BQWtCLE9BQWxCO0FBQ0EsT0FBT0MsU0FBUCxNQUFzQixZQUF0QjtBQUNBLE9BQU9DLFFBQVAsTUFBcUIsV0FBckI7QUFDQSxPQUFPQyxNQUFQLE1BQW1CLGNBQW5CO0FBQ0EsU0FBU0MsY0FBVCxFQUF5QkMsT0FBekIsUUFBd0MsaUJBQXhDO0FBQ0EsT0FBTyxvQ0FBUDtBQUNBLE9BQU8sMEJBQVA7O0lBRXFCQyxnQjs7Ozs7Ozs7Ozs7O2dLQUNuQkMsSyxHQUFRO0FBQ05DLHlCQUFtQixJQURiO0FBRU5DLDRCQUFzQixDQUFDLENBRmpCO0FBR05DLGlCQUFXO0FBSEwsSyxRQThCUkMseUIsR0FBNEIsWUFBTTtBQUNoQyxVQUFNQyxZQUFZLE1BQUtDLElBQUwsQ0FBVUMsZUFBNUI7QUFDQSxVQUFNQyxpQkFBaUJiLFNBQVNjLFdBQVQsQ0FBcUJKLFNBQXJCLElBQ3JCVixTQUFTYyxXQUFULENBQXFCSixTQUFyQixFQUFnQ0ssV0FEWCxHQUN5QixDQURoRDs7QUFHQSxVQUFJQyxpQkFBaUJILGlCQUFpQixHQUF0Qzs7QUFFQSxVQUFJSSxjQUFjLENBQWxCO0FBQ0EsV0FBSyxJQUFJQyxJQUFJLENBQWIsRUFBZ0JBLElBQUksTUFBS0MsS0FBTCxDQUFXQyxJQUFYLENBQWdCQyxNQUFoQixHQUF5QixDQUE3QyxFQUFnREgsS0FBSyxDQUFyRCxFQUF3RDtBQUN0RCxZQUFNSSxPQUFPLE1BQUtYLElBQUwsZ0JBQXVCWSxPQUFPTCxDQUFQLENBQXZCLENBQWI7QUFDQSxZQUFNTSxPQUFPeEIsU0FBU2MsV0FBVCxD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RUQ4RCxvQixtQ0FBdUI7QUFDckIzQyxXQUFPNEMsbUJBQVAsQ0FBMkIsUUFBM0IsRUFBcUMsS0FBSzlDLGlCQUExQztBQUNBRSxXQUFPNEMsbUJBQVAsQ0FBMkIsbUJBQTNCLEVBQWdELEtBQUs5QyxpQkFBckQsRUFGcUIsQ0FFb0Q7QUFDMUUsRzs7NkJBa0lEK0MsTSxxQkFBUztBQUNQLFdBQU8sS0FBS3BCLE1BQUwsRUFBUDtBQUNELEc7OztFQWpLMkN2RCxNQUFNNEUsYTs7U0FBL0J0RSxnQjs7O0FBb0tyQkEsaUJBQWlCdUUsWUFBakIsR0FBZ0M7QUFDOUJ6QixZQUFVLElBRG9CO0FBRTlCSyxxQkFBbUIsS0FGVztBQUc5QmIsc0JBQW9CLElBSFU7QUFJOUJDLGdCQUFjLElBSmdCO0FBSzlCSyxZQUFVLFNBTG9CO0FBTTlCRCxjQUFZLFNBTmtCO0FBTzlCbUIsZUFBYSxTQVBpQjtBQVE5QlAsVUFBUTtBQVJzQixDQUFoQyIsImZpbGUiOiJyZXNwb25zaXZlLW5hdmJhci5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSByZWFjdC9uby1hcnJheS1pbmRleC1rZXkgKi9cbi8qIGVzbGludC1kaXNhYmxlIHJlYWN0L25vLXN0cmluZy1yZWZzICovXG4vKiBlc2xpbnQtZGlzYWJsZSByZWFjdC9uby1maW5kLWRvbS1ub2RlICovXG4vKiBlc2xpbnQtZGlzYWJsZSByZWFjdC9wcm9wLXR5cGVzICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XG5pbXBvcnQgU2VsZWN0IGZyb20gJ3JlYWN0LXNlbGVjdCc7XG5pbXBvcnQgeyBPdmVybGF5VHJpZ2dlciwgVG9vbHRpcCB9IGZyb20gJ3JlYWN0LWJvb3RzdHJhcCc7XG5pbXBvcnQgJ3JlYWN0LXNlbGVjdC9kaXN0L3JlYWN0LXNlbGVjdC5jc3MnO1xuaW1wb3J0ICcuL3Jlc3BvbnNpdmUtbmF2YmFyLnNjc3MnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZXNwb25zaXZlTmF2YmFyIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gIHN0YXRlID0ge1xuICAgIHVwZGF0ZURpbWVuc3Npb25zOiB0cnVlLFxuICAgIGxhc3RWaXNpYmxlSXRlbUluZGV4OiAtMSxcbiAgICBsYXN0V2lkdGg6IDAsXG4gIH07XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuaGFuZGxlUmVzaXplRXZlbnQpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdvcmllbnRhdGlvbmNoYW5nZScsIHRoaXMuaGFuZGxlUmVzaXplRXZlbnQpOyAvLyBmb3IgbW9iaWxlIHN1cHBvcnRcbiAgICAvLyBDb21wb25lbnQgaXMgbm90IHJlbmRlcmVkIHlldCBieSBicm93c2VyIHdoZW4gRGlkTW91bnQgaXMgY2FsbGVkXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLmhhbmRsZVJlc2l6ZUV2ZW50KCk7XG4gICAgfSwgMjAwKTtcbiAgfVxuXG4gIGNvbXBvbmVudERpZFVwZGF0ZSgpIHtcbiAgICBpZiAodGhpcy5zdGF0ZS51cGRhdGVEaW1lbnNzaW9ucykge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgcmVhY3Qvbm8tZGlkLXVwZGF0ZS1zZXQtc3RhdGVcbiAgICAgICAgLy8gMm5kIHJlbmRlciBpcyB0cmlnZ2VyZWQgaGVyZSBpbiBwdXJwb3NlXG4gICAgICAgIHVwZGF0ZURpbWVuc3Npb25zOiBmYWxzZSxcbiAgICAgICAgbGFzdFZpc2libGVJdGVtSW5kZXg6IHRoaXMuaW5kZXhPZkxhc3RWaXNpYmxlTmF2SXRlbSgpLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuaGFuZGxlUmVzaXplRXZlbnQpO1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdvcmllbnRhdGlvbmNoYW5nZScsIHRoaXMuaGFuZGxlUmVzaXplRXZlbnQpOyAvLyBmb3IgbW9iaWxlIHN1cHBvcnRcbiAgfVxuXG4gIGluZGV4T2ZMYXN0VmlzaWJsZU5hdkl0ZW0gPSAoKSA9PiB7XG4gICAgY29uc3QgY29udGFpbmVyID0gdGhpcy5yZWZzLm5hdmJhckNvbnRhaW5lcjtcbiAgICBjb25zdCBjb250YWluZXJXaWR0aCA9IFJlYWN0RE9NLmZpbmRET01Ob2RlKGNvbnRhaW5lcikgP1xuICAgICAgUmVhY3RET00uZmluZERPTU5vZGUoY29udGFpbmVyKS5vZmZzZXRXaWR0aCA6IDA7XG5cbiAgICBsZXQgcmVtYWluaW5nV2lkdGggPSBjb250YWluZXJXaWR0aCAtIDE5NTtcblxuICAgIGxldCBsYXN0VmlzaWJsZSA9IDE7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnByb3BzLmxpc3QubGVuZ3RoIC0gMTsgaSArPSAxKSB7XG4gICAgICBjb25zdCBpdGVtID0gdGhpcy5yZWZzW2BuYXZpdGVtcmVmJHtTdHJpbmcoaSl9YF07XG4gICAgICBjb25zdCBub2RlID0gUmVhY3RET00uZmluZERPTU5vZGUoaXRlbSk7XG4gICAgICBpZiAoIW5vZGUpIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjb25zdCBpdGVtV2lkdGggPSBub2RlLm9mZnNldFdpZHRoO1xuICAgICAgcmVtYWluaW5nV2lkdGggLT0gaXRlbVdpZHRoO1xuICAgICAgaWYgKHJlbWFpbmluZ1dpZHRoIDwgMCkge1xuICAgICAgICBsYXN0VmlzaWJsZSAtPSAxO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGxhc3RWaXNpYmxlICs9IDE7XG4gICAgfVxuXG4gICAgcmV0dXJuIGxhc3RWaXNpYmxlO1xuICB9XG5cbiAgaGFuZGxlUmVzaXplRXZlbnQgPSAoKSA9PiB7XG4gICAgY29uc3QgZGlmZmVyZW5jZSA9IHdpbmRvdy5pbm5lcldpZHRoIC0gdGhpcy5zdGF0ZS5sYXN0V2lkdGg7XG4gICAgY29uc3QgVVBEQVRFX1RIUkVTSE9MRCA9IDUwO1xuICAgIGlmIChNYXRoLmFicyhkaWZmZXJlbmNlKSA+IFVQREFURV9USFJFU0hPTEQpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICB1cGRhdGVEaW1lbnNzaW9uczogdHJ1ZSxcbiAgICAgICAgbGFzdFdpZHRoOiB3aW5kb3cuaW5uZXJXaWR0aCxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuICBzZWxlY3Rpb25DaGFuZ2VkID0gKGl0ZW0pID0+IHtcbiAgICB0aGlzLnByb3BzLnJvdXRlci5wdXNoKGl0ZW0udmFsdWUpO1xuICB9XG5cbiAgdG9vbHRpcFdyYXBwZXIgPSAobm9kZSwgaW5kZXgsIHRvb2x0aXBDb250ZW50KSA9PiB7XG4gICAgY29uc3QgdG9vbHRpcCA9IDxUb29sdGlwIGlkPVwidG9vbHRpcFwiPnt0b29sdGlwQ29udGVudH08L1Rvb2x0aXA+O1xuICAgIHJldHVybiAhdGhpcy5wcm9wcy5zaG93TmF2SXRlbVRvb2x0aXAgPyBub2RlIDpcbiAgICA8T3ZlcmxheVRyaWdnZXIgcGxhY2VtZW50PVwiYm90dG9tXCIga2V5PXtpbmRleH0gb3ZlcmxheT17dG9vbHRpcH0gZGVsYXlTaG93PXt0aGlzLnByb3BzLnRvb2x0aXBEZWxheX0+XG4gICAgICB7bm9kZX1cbiAgICA8L092ZXJsYXlUcmlnZ2VyPjtcbiAgfVxuXG4gIG5hdmJhckl0ZW0gPSAoaXRlbSwgaW5kZXgsIGNsYXNzTmFtZSkgPT4gKFxuICAgIDxidXR0b25cbiAgICAgIGNsYXNzTmFtZT17aW5kZXggPT09IHRoaXMucHJvcHMuYWN0aXZlS2V5ICYmXG4gICAgICAgIGluZGV4IDw9IHRoaXMuc3RhdGUubGFzdFZpc2libGVJdGVtSW5kZXggP1xuICAgICAgICBgJHtjbGFzc05hbWV9IHNlbGVjdGVkLWJvcmRlcmAgOiBgJHtjbGFzc05hbWV9YH1cbiAgICAgIHN0eWxlPXt7IGZvbnRXZWlnaHQ6IHRoaXMucHJvcHMuZm9udFdlaWdodCwgZm9udFNpemU6IHRoaXMucHJvcHMuZm9udFNpemUgfX1cbiAgICAgIGlkPXtpdGVtLmlkIHx8IGBuYXZpdGVtcmVmJHtTdHJpbmcoaW5kZXgpfWB9XG4gICAgICBrZXk9e2l0ZW0uaWQgfHwgYG5hdml0ZW1yZWYke1N0cmluZyhpbmRleCl9YH1cbiAgICAgIHJlZj17YG5hdml0ZW1yZWYke1N0cmluZyhpbmRleCl9YH1cbiAgICAgIG9uQ2xpY2s9eygpID0+IHsgdGhpcy5wcm9wcy5vblNlbGVjdChpdGVtLmhyZWYpOyB9fVxuICAgID5cbiAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInJlc3BvbnNpdmUtbmF2YmFyLWl0ZW0tdGV4dFwiPntpdGVtLm5hbWV9PC9zcGFuPlxuICAgIDwvYnV0dG9uPlxuICApXG5cbiAgbmF2YmFyID0gKCkgPT4ge1xuICAgIGNvbnN0IGxpc3QgPSB0aGlzLnN0YXRlLmxhc3RWaXNpYmxlSXRlbUluZGV4ID49IDAgP1xuICAgICAgdGhpcy5wcm9wcy5saXN0LnNsaWNlKDAsIHRoaXMuc3RhdGUubGFzdFZpc2libGVJdGVtSW5kZXgpXG4gICAgICA6IHRoaXMucHJvcHMubGlzdDtcbiAgICBjb25zdCBjbGFzc05hbWUgPSB0aGlzLnByb3BzLnNob3dOYXZJdGVtQm9yZGVyID9cbiAgICAgICdyZXNwb25zaXZlLW5hdmJhci1pdGVtIGluYWN0aXZlLWJvcmRlcicgOiAncmVzcG9uc2l2ZS1uYXZiYXItaXRlbSc7XG4gICAgY29uc3QgaXRlbXMgPSBsaXN0Lm1hcCgoaXRlbSwgaW5kZXgpID0+IChcbiAgICAgIHRoaXMudG9vbHRpcFdyYXBwZXIodGhpcy5uYXZiYXJJdGVtKGl0ZW0sIGluZGV4LCBjbGFzc05hbWUpLCBpbmRleCwgaXRlbS5uYW1lKVxuICAgICkpO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXZcbiAgICAgICAgaWQ9XCJyZXNwb25zaXZlLW5hdmJhci1jb250YWluZXJcIlxuICAgICAgICByZWY9XCJuYXZiYXJDb250YWluZXJcIlxuICAgICAgICBzdHlsZT17eyBtaW5IZWlnaHQ6IHRoaXMucHJvcHMuaGVpZ2h0IH19XG4gICAgICA+XG4gICAgICAgIHtpdGVtc31cbiAgICAgICAge3RoaXMuY29tYm9ib3goKX1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cblxuICBjb21ib2JveCA9ICgpID0+IHtcbiAgICBpZiAodGhpcy5zdGF0ZS5sYXN0VmlzaWJsZUl0ZW1JbmRleCA9PT0gLTEgfHxcbiAgICAgICAgdGhpcy5zdGF0ZS5sYXN0VmlzaWJsZUl0ZW1JbmRleCA+IHRoaXMucHJvcHMubGlzdC5sZW5ndGggLSAxKSB7XG4gICAgICAvLyByZXR1cm4gbnVsbCBpZiBhbGwgbmF2IGl0ZW1zIGFyZSB2aXNpYmxlXG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICAvLyBzbGljZSBuYXYgaXRlbXMgbGlzdCBhbmQgc2hvdyBpbnZpc2libGUgaXRlbXMgaW4gdGhlIGNvbWJvYm94XG4gICAgY29uc3QgbGlzdCA9IHRoaXMuc3RhdGUubGFzdFZpc2libGVJdGVtSW5kZXggPj0gMCA/XG4gICAgICB0aGlzLnByb3BzLmxpc3Quc2xpY2UodGhpcy5zdGF0ZS5sYXN0VmlzaWJsZUl0ZW1JbmRleClcbiAgICAgIDogdGhpcy5wcm9wcy5saXN0O1xuICAgIGNvbnN0IGl0ZW1zID0gbGlzdC5tYXAoKGl0ZW0sIGluZGV4KSA9PlxuICAgICAgKHtcbiAgICAgICAgdmFsdWU6IGl0ZW0uaHJlZixcbiAgICAgICAgbGFiZWw6IGl0ZW0ubmFtZSxcbiAgICAgICAgaWQ6IGluZGV4LFxuICAgICAgICByZWY6IGBuYXZpdGVtcmVmJHtTdHJpbmcoaW5kZXgpfWAsXG4gICAgICB9KSk7XG5cbiAgICBjb25zdCBpbmFjdGl2ZUJvcmRlciA9IHRoaXMucHJvcHMuc2hvd05hdkl0ZW1Cb3JkZXIgPyAnaW5hY3RpdmUtYm9yZGVyJyA6ICcnO1xuICAgIGNvbnN0IGJvcmRlckNsYXNzID0gdGhpcy5wcm9wcy5hY3RpdmVLZXkgPj0gdGhpcy5zdGF0ZS5sYXN0VmlzaWJsZUl0ZW1JbmRleCA/XG4gICAgICAnc2VsZWN0ZWQtYm9yZGVyJyA6IGluYWN0aXZlQm9yZGVyO1xuICAgIGNvbnN0IGFjdGl2ZUl0ZW0gPSB0aGlzLnByb3BzLmxpc3RbdGhpcy5wcm9wcy5hY3RpdmVLZXldO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2XG4gICAgICAgIGlkPVwicmVzcG9uc2l2ZS1uYXZiYXItc2VsZWN0XCJcbiAgICAgICAgY2xhc3NOYW1lPXtib3JkZXJDbGFzc31cbiAgICAgICAgc3R5bGU9e3sgZm9udFdlaWdodDogdGhpcy5wcm9wcy5mb250V2VpZ2h0LCBmb250U2l6ZTogdGhpcy5wcm9wcy5mb250U2l6ZSB9fVxuICAgICAgPlxuICAgICAgICA8U2VsZWN0XG4gICAgICAgICAgbmFtZT1cInJlc3BvbnNpdmVOYXZiYXJTZWxlY3RcIlxuICAgICAgICAgIG11bHRpPXtmYWxzZX1cbiAgICAgICAgICB2YWx1ZT17YWN0aXZlSXRlbSA/IGFjdGl2ZUl0ZW0uaHJlZiA6ICcnfVxuICAgICAgICAgIGNsZWFyYWJsZT17ZmFsc2V9XG4gICAgICAgICAgcGxhY2Vob2xkZXI9e3RoaXMucHJvcHMucGxhY2Vob2xkZXJ9XG4gICAgICAgICAgb3B0aW9ucz17aXRlbXN9XG4gICAgICAgICAgb25DaGFuZ2U9eyhpdGVtKSA9PiB7IHRoaXMucHJvcHMub25TZWxlY3QoaXRlbS52YWx1ZSk7IH19XG4gICAgICAgICAgaW5wdXRQcm9wcz17eyBpZDogJ29jUmVzcG9uc2l2ZU5hdmJhclNlbGVjdCcgfX1cbiAgICAgICAgLz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMubmF2YmFyKCk7XG4gIH1cbn1cblxuUmVzcG9uc2l2ZU5hdmJhci5kZWZhdWx0UHJvcHMgPSB7XG4gIG9uU2VsZWN0OiBudWxsLFxuICBzaG93TmF2SXRlbUJvcmRlcjogZmFsc2UsXG4gIHNob3dOYXZJdGVtVG9vbHRpcDogdHJ1ZSxcbiAgdG9vbHRpcERlbGF5OiAyMDAwLFxuICBmb250U2l6ZTogJ2luaGVyaXQnLFxuICBmb250V2VpZ2h0OiAnaW5oZXJpdCcsXG4gIHBsYWNlaG9sZGVyOiAnbW9yZS4uLicsXG4gIGhlaWdodDogJzQwcHgnLFxufTtcblxuUmVzcG9uc2l2ZU5hdmJhci5wcm9wVHlwZXMgPSB7XG4gIHNob3dOYXZJdGVtQm9yZGVyOiBQcm9wVHlwZXMuYm9vbCxcbiAgc2hvd05hdkl0ZW1Ub29sdGlwOiBQcm9wVHlwZXMuYm9vbCxcbiAgdG9vbHRpcERlbGF5OiBQcm9wVHlwZXMubnVtYmVyLFxuICBmb250U2l6ZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgZm9udFdlaWdodDogUHJvcFR5cGVzLnN0cmluZyxcbiAgcGxhY2Vob2xkZXI6IFByb3BUeXBlcy5zdHJpbmcsXG4gIGFjdGl2ZUtleTogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuICBsaXN0OiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuc2hhcGUoe1xuICAgIG5hbWU6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgIFByb3BUeXBlcy5ub2RlLFxuICAgIF0pLmlzUmVxdWlyZWQsXG4gICAgaHJlZjogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLm51bWJlcl0pLFxuICB9KSkuaXNSZXF1aXJlZCxcbiAgb25TZWxlY3Q6IFByb3BUeXBlcy5mdW5jLFxuICBoZWlnaHQ6IFByb3BUeXBlcy5zdHJpbmcsXG59O1xuIl19