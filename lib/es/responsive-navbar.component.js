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
          style: { "minHeight": _this.props.height }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yZXNwb25zaXZlLW5hdmJhci5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIlJlYWN0IiwiUHJvcFR5cGVzIiwiUmVhY3RET00iLCJTZWxlY3QiLCJPdmVybGF5VHJpZ2dlciIsIlRvb2x0aXAiLCJSZXNwb25zaXZlTmF2YmFyIiwic3RhdGUiLCJ1cGRhdGVEaW1lbnNzaW9ucyIsImxhc3RWaXNpYmxlSXRlbUluZGV4IiwibGFzdFdpZHRoIiwiaW5kZXhPZkxhc3RWaXNpYmxlTmF2SXRlbSIsImNvbnRhaW5lciIsInJlZnMiLCJuYXZiYXJDb250YWluZXIiLCJjb250YWluZXJXaWR0aCIsImZpbmRET01Ob2RlIiwib2Zmc2V0V2lkdGgiLCJyZW1haW5pbmdXaWR0aCIsImxhc3RWaXNpYmxlIiwiaSIsInByb3BzIiwibGlzdCIsImxlbmd0aCIsIml0ZW0iLCJTdHJpbmciLCJub2RlIiwiaXRlbVdpZHRoIiwiaGFuZGxlUmVzaXplRXZlbnQiLCJkaWZmZXJlbmNlIiwid2luZG93IiwiaW5uZXJXaWR0aCIsIlVQREFURV9USFJFU0hPTEQiLCJNYXRoIiwiYWJzIiwic2V0U3RhdGUiLCJzZWxlY3Rpb25DaGFuZ2VkIiwicm91dGVyIiwicHVzaCIsInZhbHVlIiwidG9vbHRpcFdyYXBwZXIiLCJpbmRleCIsInRvb2x0aXBDb250ZW50IiwidG9vbHRpcCIsInNob3dOYXZJdGVtVG9vbHRpcCIsInRvb2x0aXBEZWxheSIsIm5hdmJhckl0ZW0iLCJjbGFzc05hbWUiLCJhY3RpdmVLZXkiLCJmb250V2VpZ2h0IiwiZm9udFNpemUiLCJpZCIsIm9uU2VsZWN0IiwiaHJlZiIsIm5hbWUiLCJuYXZiYXIiLCJzbGljZSIsInNob3dOYXZJdGVtQm9yZGVyIiwiaXRlbXMiLCJtYXAiLCJoZWlnaHQiLCJjb21ib2JveCIsImxhYmVsIiwicmVmIiwiaW5hY3RpdmVCb3JkZXIiLCJib3JkZXJDbGFzcyIsImFjdGl2ZUl0ZW0iLCJwbGFjZWhvbGRlciIsImNvbXBvbmVudERpZE1vdW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsInNldFRpbWVvdXQiLCJjb21wb25lbnREaWRVcGRhdGUiLCJjb21wb25lbnRXaWxsVW5tb3VudCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJyZW5kZXIiLCJQdXJlQ29tcG9uZW50IiwiZGVmYXVsdFByb3BzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxPQUFPQSxLQUFQLE1BQWtCLE9BQWxCO0FBQ0EsT0FBT0MsU0FBUCxNQUFzQixZQUF0QjtBQUNBLE9BQU9DLFFBQVAsTUFBcUIsV0FBckI7QUFDQSxPQUFPQyxNQUFQLE1BQW1CLGNBQW5CO0FBQ0EsU0FBU0MsY0FBVCxFQUF5QkMsT0FBekIsUUFBd0MsaUJBQXhDO0FBQ0EsT0FBTyxvQ0FBUDtBQUNBLE9BQU8sMEJBQVA7O0lBRXFCQyxnQjs7Ozs7Ozs7Ozs7O2dLQUVuQkMsSyxHQUFRO0FBQ05DLHlCQUFtQixJQURiO0FBRU5DLDRCQUFzQixDQUFDLENBRmpCO0FBR05DLGlCQUFXO0FBSEwsSyxRQThCUkMseUIsR0FBNEIsWUFBTTtBQUNoQyxVQUFNQyxZQUFZLE1BQUtDLElBQUwsQ0FBVUMsZUFBNUI7QUFDQSxVQUFNQyxpQkFBaUJiLFNBQVNjLFdBQVQsQ0FBcUJKLFNBQXJCLElBQ3JCVixTQUFTYyxXQUFULENBQXFCSixTQUFyQixFQUFnQ0ssV0FEWCxHQUN5QixDQURoRDs7QUFHQSxVQUFJQyxpQkFBaUJILGlCQUFpQixHQUF0Qzs7QUFFQSxVQUFJSSxjQUFjLENBQWxCO0FBQ0EsV0FBSyxJQUFJQyxJQUFJLENBQWIsRUFBZ0JBLElBQUksTUFBS0MsS0FBTCxDQUFXQyxJQUFYLENBQWdCQyxNQUFoQixHQUF5QixDQUE3QyxFQUFnREgsS0FBSyxDQUFyRCxFQUF3RDtBQUN0RCxZQUFNSSxPQUFPLE1BQUtYLElBQUwsZ0JBQXVCWSxPQUFPTCxDQUFQLENBQXZCLENBQWI7QUFDQSxZQUFNTSxPQUFPeEIsU0FBU2MsV0FBVCxDQUFxQlEsSUFBckIs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QjtBQUNyQjFDLFdBQU8yQyxtQkFBUCxDQUEyQixRQUEzQixFQUFxQyxLQUFLN0MsaUJBQTFDO0FBQ0FFLFdBQU8yQyxtQkFBUCxDQUEyQixtQkFBM0IsRUFBZ0QsS0FBSzdDLGlCQUFyRCxFQUZxQixDQUVvRDtBQUMxRSxHOzs2QkFtSUQ4QyxNLHFCQUFTO0FBQ1AsV0FBTyxLQUFLbkIsTUFBTCxFQUFQO0FBQ0QsRzs7O0VBbksyQ3ZELE1BQU0yRSxhOztTQUEvQnJFLGdCOzs7QUFzS3JCQSxpQkFBaUJzRSxZQUFqQixHQUFnQztBQUM5QnhCLFlBQVUsSUFEb0I7QUFFOUJLLHFCQUFtQixLQUZXO0FBRzlCYixzQkFBb0IsSUFIVTtBQUk5QkMsZ0JBQWMsSUFKZ0I7QUFLOUJLLFlBQVUsU0FMb0I7QUFNOUJELGNBQVksU0FOa0I7QUFPOUJrQixlQUFhLFNBUGlCO0FBUTlCUCxVQUFRO0FBUnNCLENBQWhDIiwiZmlsZSI6InJlc3BvbnNpdmUtbmF2YmFyLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIHJlYWN0L25vLWFycmF5LWluZGV4LWtleSAqL1xyXG4vKiBlc2xpbnQtZGlzYWJsZSByZWFjdC9uby1zdHJpbmctcmVmcyAqL1xyXG4vKiBlc2xpbnQtZGlzYWJsZSByZWFjdC9uby1maW5kLWRvbS1ub2RlICovXHJcbi8qIGVzbGludC1kaXNhYmxlIHJlYWN0L3Byb3AtdHlwZXMgKi9cclxuXHJcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XHJcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xyXG5pbXBvcnQgU2VsZWN0IGZyb20gJ3JlYWN0LXNlbGVjdCc7XHJcbmltcG9ydCB7IE92ZXJsYXlUcmlnZ2VyLCBUb29sdGlwIH0gZnJvbSAncmVhY3QtYm9vdHN0cmFwJztcclxuaW1wb3J0ICdyZWFjdC1zZWxlY3QvZGlzdC9yZWFjdC1zZWxlY3QuY3NzJztcclxuaW1wb3J0ICcuL3Jlc3BvbnNpdmUtbmF2YmFyLnNjc3MnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVzcG9uc2l2ZU5hdmJhciBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xyXG5cclxuICBzdGF0ZSA9IHtcclxuICAgIHVwZGF0ZURpbWVuc3Npb25zOiB0cnVlLFxyXG4gICAgbGFzdFZpc2libGVJdGVtSW5kZXg6IC0xLFxyXG4gICAgbGFzdFdpZHRoOiAwLFxyXG4gIH07XHJcblxyXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuaGFuZGxlUmVzaXplRXZlbnQpO1xyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ29yaWVudGF0aW9uY2hhbmdlJywgdGhpcy5oYW5kbGVSZXNpemVFdmVudCk7IC8vIGZvciBtb2JpbGUgc3VwcG9ydFxyXG4gICAgLy8gQ29tcG9uZW50IGlzIG5vdCByZW5kZXJlZCB5ZXQgYnkgYnJvd3NlciB3aGVuIERpZE1vdW50IGlzIGNhbGxlZFxyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIHRoaXMuaGFuZGxlUmVzaXplRXZlbnQoKTtcclxuICAgIH0sIDIwMCk7XHJcbiAgfVxyXG5cclxuICBjb21wb25lbnREaWRVcGRhdGUoKSB7XHJcbiAgICBpZiAodGhpcy5zdGF0ZS51cGRhdGVEaW1lbnNzaW9ucykge1xyXG4gICAgICB0aGlzLnNldFN0YXRlKHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSByZWFjdC9uby1kaWQtdXBkYXRlLXNldC1zdGF0ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgLy8gMm5kIHJlbmRlciBpcyB0cmlnZ2VyZWQgaGVyZSBpbiBwdXJwb3NlXHJcbiAgICAgICAgdXBkYXRlRGltZW5zc2lvbnM6IGZhbHNlLFxyXG4gICAgICAgIGxhc3RWaXNpYmxlSXRlbUluZGV4OiB0aGlzLmluZGV4T2ZMYXN0VmlzaWJsZU5hdkl0ZW0oKSxcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcclxuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLmhhbmRsZVJlc2l6ZUV2ZW50KTtcclxuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdvcmllbnRhdGlvbmNoYW5nZScsIHRoaXMuaGFuZGxlUmVzaXplRXZlbnQpOyAvLyBmb3IgbW9iaWxlIHN1cHBvcnRcclxuICB9XHJcblxyXG4gIGluZGV4T2ZMYXN0VmlzaWJsZU5hdkl0ZW0gPSAoKSA9PiB7XHJcbiAgICBjb25zdCBjb250YWluZXIgPSB0aGlzLnJlZnMubmF2YmFyQ29udGFpbmVyO1xyXG4gICAgY29uc3QgY29udGFpbmVyV2lkdGggPSBSZWFjdERPTS5maW5kRE9NTm9kZShjb250YWluZXIpID9cclxuICAgICAgUmVhY3RET00uZmluZERPTU5vZGUoY29udGFpbmVyKS5vZmZzZXRXaWR0aCA6IDA7XHJcblxyXG4gICAgbGV0IHJlbWFpbmluZ1dpZHRoID0gY29udGFpbmVyV2lkdGggLSAxOTU7XHJcblxyXG4gICAgbGV0IGxhc3RWaXNpYmxlID0gMTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5wcm9wcy5saXN0Lmxlbmd0aCAtIDE7IGkgKz0gMSkge1xyXG4gICAgICBjb25zdCBpdGVtID0gdGhpcy5yZWZzW2BuYXZpdGVtcmVmJHtTdHJpbmcoaSl9YF07XHJcbiAgICAgIGNvbnN0IG5vZGUgPSBSZWFjdERPTS5maW5kRE9NTm9kZShpdGVtKTtcclxuICAgICAgaWYgKCFub2RlKSB7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgY29uc3QgaXRlbVdpZHRoID0gbm9kZS5vZmZzZXRXaWR0aDtcclxuICAgICAgcmVtYWluaW5nV2lkdGggLT0gaXRlbVdpZHRoO1xyXG4gICAgICBpZiAocmVtYWluaW5nV2lkdGggPCAwKSB7XHJcbiAgICAgICAgbGFzdFZpc2libGUgLT0gMTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBsYXN0VmlzaWJsZSArPSAxO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBsYXN0VmlzaWJsZTtcclxuICB9XHJcblxyXG4gIGhhbmRsZVJlc2l6ZUV2ZW50ID0gKCkgPT4ge1xyXG4gICAgY29uc3QgZGlmZmVyZW5jZSA9IHdpbmRvdy5pbm5lcldpZHRoIC0gdGhpcy5zdGF0ZS5sYXN0V2lkdGg7XHJcbiAgICBjb25zdCBVUERBVEVfVEhSRVNIT0xEID0gNTA7XHJcbiAgICBpZiAoTWF0aC5hYnMoZGlmZmVyZW5jZSkgPiBVUERBVEVfVEhSRVNIT0xEKSB7XHJcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgIHVwZGF0ZURpbWVuc3Npb25zOiB0cnVlLFxyXG4gICAgICAgIGxhc3RXaWR0aDogd2luZG93LmlubmVyV2lkdGgsXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuICBzZWxlY3Rpb25DaGFuZ2VkID0gKGl0ZW0pID0+IHtcclxuICAgIHRoaXMucHJvcHMucm91dGVyLnB1c2goaXRlbS52YWx1ZSk7XHJcbiAgfVxyXG5cclxuICB0b29sdGlwV3JhcHBlciA9IChub2RlLCBpbmRleCwgdG9vbHRpcENvbnRlbnQpID0+IHtcclxuICAgIGNvbnN0IHRvb2x0aXAgPSA8VG9vbHRpcCBpZD1cInRvb2x0aXBcIj57dG9vbHRpcENvbnRlbnR9PC9Ub29sdGlwPjtcclxuICAgIHJldHVybiAhdGhpcy5wcm9wcy5zaG93TmF2SXRlbVRvb2x0aXAgPyBub2RlIDpcclxuICAgIDxPdmVybGF5VHJpZ2dlciBwbGFjZW1lbnQ9XCJib3R0b21cIiBrZXk9e2luZGV4fSBvdmVybGF5PXt0b29sdGlwfSBkZWxheVNob3c9e3RoaXMucHJvcHMudG9vbHRpcERlbGF5fT5cclxuICAgICAge25vZGV9XHJcbiAgICA8L092ZXJsYXlUcmlnZ2VyPjtcclxuICB9XHJcblxyXG4gIG5hdmJhckl0ZW0gPSAoaXRlbSwgaW5kZXgsIGNsYXNzTmFtZSkgPT4gKFxyXG4gICAgPGJ1dHRvblxyXG4gICAgICBjbGFzc05hbWU9e2luZGV4ID09PSB0aGlzLnByb3BzLmFjdGl2ZUtleSAmJlxyXG4gICAgICAgIGluZGV4IDw9IHRoaXMuc3RhdGUubGFzdFZpc2libGVJdGVtSW5kZXggP1xyXG4gICAgICAgIGAke2NsYXNzTmFtZX0gc2VsZWN0ZWQtYm9yZGVyYCA6IGAke2NsYXNzTmFtZX1gfVxyXG4gICAgICBzdHlsZT17eyBmb250V2VpZ2h0OiB0aGlzLnByb3BzLmZvbnRXZWlnaHQsIGZvbnRTaXplOiB0aGlzLnByb3BzLmZvbnRTaXplIH19XHJcbiAgICAgIGlkPXtpdGVtLmlkIHx8IGBuYXZpdGVtcmVmJHtTdHJpbmcoaW5kZXgpfWB9XHJcbiAgICAgIGtleT17aXRlbS5pZCB8fCBgbmF2aXRlbXJlZiR7U3RyaW5nKGluZGV4KX1gfVxyXG4gICAgICByZWY9e2BuYXZpdGVtcmVmJHtTdHJpbmcoaW5kZXgpfWB9XHJcbiAgICAgIG9uQ2xpY2s9eygpID0+IHsgdGhpcy5wcm9wcy5vblNlbGVjdChpdGVtLmhyZWYpOyB9fVxyXG4gICAgPlxyXG4gICAgICA8c3BhbiBjbGFzc05hbWU9XCJyZXNwb25zaXZlLW5hdmJhci1pdGVtLXRleHRcIj57aXRlbS5uYW1lfTwvc3Bhbj5cclxuICAgIDwvYnV0dG9uPlxyXG4gIClcclxuXHJcbiAgbmF2YmFyID0gKCkgPT4ge1xyXG4gICAgY29uc3QgbGlzdCA9IHRoaXMuc3RhdGUubGFzdFZpc2libGVJdGVtSW5kZXggPj0gMCA/XHJcbiAgICAgIHRoaXMucHJvcHMubGlzdC5zbGljZSgwLCB0aGlzLnN0YXRlLmxhc3RWaXNpYmxlSXRlbUluZGV4KVxyXG4gICAgICA6IHRoaXMucHJvcHMubGlzdDtcclxuICAgIGNvbnN0IGNsYXNzTmFtZSA9IHRoaXMucHJvcHMuc2hvd05hdkl0ZW1Cb3JkZXIgP1xyXG4gICAgICAncmVzcG9uc2l2ZS1uYXZiYXItaXRlbSBpbmFjdGl2ZS1ib3JkZXInIDogJ3Jlc3BvbnNpdmUtbmF2YmFyLWl0ZW0nO1xyXG4gICAgY29uc3QgaXRlbXMgPSBsaXN0Lm1hcCgoaXRlbSwgaW5kZXgpID0+IChcclxuICAgICAgdGhpcy50b29sdGlwV3JhcHBlcih0aGlzLm5hdmJhckl0ZW0oaXRlbSwgaW5kZXgsIGNsYXNzTmFtZSksIGluZGV4LCBpdGVtLm5hbWUpXHJcbiAgICApKTtcclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8ZGl2XHJcbiAgICAgICAgaWQ9XCJyZXNwb25zaXZlLW5hdmJhci1jb250YWluZXJcIlxyXG4gICAgICAgIHJlZj17J25hdmJhckNvbnRhaW5lcid9XHJcbiAgICAgICAgc3R5bGU9e3sgXCJtaW5IZWlnaHRcIjogdGhpcy5wcm9wcy5oZWlnaHQgfX1cclxuICAgICAgPlxyXG4gICAgICAgIHtpdGVtc31cclxuICAgICAgICB7dGhpcy5jb21ib2JveCgpfVxyXG4gICAgICA8L2Rpdj5cclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBjb21ib2JveCA9ICgpID0+IHtcclxuICAgIGlmICh0aGlzLnN0YXRlLmxhc3RWaXNpYmxlSXRlbUluZGV4ID09PSAtMSB8fFxyXG4gICAgICAgIHRoaXMuc3RhdGUubGFzdFZpc2libGVJdGVtSW5kZXggPiB0aGlzLnByb3BzLmxpc3QubGVuZ3RoIC0gMSkge1xyXG4gICAgICAvLyByZXR1cm4gbnVsbCBpZiBhbGwgbmF2IGl0ZW1zIGFyZSB2aXNpYmxlXHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHNsaWNlIG5hdiBpdGVtcyBsaXN0IGFuZCBzaG93IGludmlzaWJsZSBpdGVtcyBpbiB0aGUgY29tYm9ib3hcclxuICAgIGNvbnN0IGxpc3QgPSB0aGlzLnN0YXRlLmxhc3RWaXNpYmxlSXRlbUluZGV4ID49IDAgP1xyXG4gICAgICB0aGlzLnByb3BzLmxpc3Quc2xpY2UodGhpcy5zdGF0ZS5sYXN0VmlzaWJsZUl0ZW1JbmRleClcclxuICAgICAgOiB0aGlzLnByb3BzLmxpc3Q7XHJcbiAgICBjb25zdCBpdGVtcyA9IGxpc3QubWFwKChpdGVtLCBpbmRleCkgPT5cclxuICAgICAgKHtcclxuICAgICAgICB2YWx1ZTogaXRlbS5ocmVmLFxyXG4gICAgICAgIGxhYmVsOiBpdGVtLm5hbWUsXHJcbiAgICAgICAgaWQ6IGluZGV4LFxyXG4gICAgICAgIHJlZjogYG5hdml0ZW1yZWYke1N0cmluZyhpbmRleCl9YCxcclxuICAgICAgfSksXHJcbiAgICApO1xyXG5cclxuICAgIGNvbnN0IGluYWN0aXZlQm9yZGVyID0gdGhpcy5wcm9wcy5zaG93TmF2SXRlbUJvcmRlciA/ICdpbmFjdGl2ZS1ib3JkZXInIDogJyc7XHJcbiAgICBjb25zdCBib3JkZXJDbGFzcyA9IHRoaXMucHJvcHMuYWN0aXZlS2V5ID49IHRoaXMuc3RhdGUubGFzdFZpc2libGVJdGVtSW5kZXggP1xyXG4gICAgJ3NlbGVjdGVkLWJvcmRlcicgOiBpbmFjdGl2ZUJvcmRlcjtcclxuICAgIGNvbnN0IGFjdGl2ZUl0ZW0gPSB0aGlzLnByb3BzLmxpc3RbdGhpcy5wcm9wcy5hY3RpdmVLZXldO1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgPGRpdlxyXG4gICAgICAgIGlkPVwicmVzcG9uc2l2ZS1uYXZiYXItc2VsZWN0XCJcclxuICAgICAgICBjbGFzc05hbWU9e2JvcmRlckNsYXNzfVxyXG4gICAgICAgIHN0eWxlPXt7IGZvbnRXZWlnaHQ6IHRoaXMucHJvcHMuZm9udFdlaWdodCwgZm9udFNpemU6IHRoaXMucHJvcHMuZm9udFNpemUgfX1cclxuICAgICAgPlxyXG4gICAgICAgIDxTZWxlY3RcclxuICAgICAgICAgIG5hbWU9XCJyZXNwb25zaXZlTmF2YmFyU2VsZWN0XCJcclxuICAgICAgICAgIG11bHRpPXtmYWxzZX1cclxuICAgICAgICAgIHZhbHVlPXthY3RpdmVJdGVtID8gYWN0aXZlSXRlbS5ocmVmIDogJyd9XHJcbiAgICAgICAgICBjbGVhcmFibGU9e2ZhbHNlfVxyXG4gICAgICAgICAgcGxhY2Vob2xkZXI9e3RoaXMucHJvcHMucGxhY2Vob2xkZXJ9XHJcbiAgICAgICAgICBvcHRpb25zPXtpdGVtc31cclxuICAgICAgICAgIG9uQ2hhbmdlPXsoaXRlbSkgPT4geyB0aGlzLnByb3BzLm9uU2VsZWN0KGl0ZW0udmFsdWUpOyB9fVxyXG4gICAgICAgICAgaW5wdXRQcm9wcz17eyBpZDogJ29jUmVzcG9uc2l2ZU5hdmJhclNlbGVjdCcgfX1cclxuICAgICAgICAvPlxyXG4gICAgICA8L2Rpdj5cclxuICAgICk7XHJcbiAgfVxyXG5cclxuICByZW5kZXIoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5uYXZiYXIoKTtcclxuICB9XHJcbn1cclxuXHJcblJlc3BvbnNpdmVOYXZiYXIuZGVmYXVsdFByb3BzID0ge1xyXG4gIG9uU2VsZWN0OiBudWxsLFxyXG4gIHNob3dOYXZJdGVtQm9yZGVyOiBmYWxzZSxcclxuICBzaG93TmF2SXRlbVRvb2x0aXA6IHRydWUsXHJcbiAgdG9vbHRpcERlbGF5OiAyMDAwLFxyXG4gIGZvbnRTaXplOiAnaW5oZXJpdCcsXHJcbiAgZm9udFdlaWdodDogJ2luaGVyaXQnLFxyXG4gIHBsYWNlaG9sZGVyOiAnbW9yZS4uLicsXHJcbiAgaGVpZ2h0OiAnNDBweCcsXHJcbn07XHJcblxyXG5SZXNwb25zaXZlTmF2YmFyLnByb3BUeXBlcyA9IHtcclxuICBzaG93TmF2SXRlbUJvcmRlcjogUHJvcFR5cGVzLmJvb2wsXHJcbiAgc2hvd05hdkl0ZW1Ub29sdGlwOiBQcm9wVHlwZXMuYm9vbCxcclxuICB0b29sdGlwRGVsYXk6IFByb3BUeXBlcy5udW1iZXIsXHJcbiAgZm9udFNpemU6IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgZm9udFdlaWdodDogUHJvcFR5cGVzLnN0cmluZyxcclxuICBwbGFjZWhvbGRlcjogUHJvcFR5cGVzLnN0cmluZyxcclxuICBhY3RpdmVLZXk6IFByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcclxuICBsaXN0OiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuc2hhcGUoe1xyXG4gICAgbmFtZTogUHJvcFR5cGVzLm9uZU9mVHlwZShbXHJcbiAgICAgIFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICAgIFByb3BUeXBlcy5ub2RlLFxyXG4gICAgXSkuaXNSZXF1aXJlZCxcclxuICAgIGhyZWY6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5udW1iZXJdKSxcclxuICB9KSkuaXNSZXF1aXJlZCxcclxuICBvblNlbGVjdDogUHJvcFR5cGVzLmZ1bmMsXHJcbiAgaGVpZ2h0OiBQcm9wVHlwZXMuc3RyaW5nLFxyXG59O1xyXG4iXX0=