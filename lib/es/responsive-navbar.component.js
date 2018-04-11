var _class, _temp2;

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

var ResponsiveNavbar = (_temp2 = _class = function (_React$PureComponent) {
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
      var navbarStyle = {
        minHeight: _this.props.height
      };
      if (_this.props.height.slice(-2) === 'px') {
        var heightPx = parseInt(_this.props.height.slice(0, -2), 10);
        navbarStyle.lineHeight = heightPx - 4 + 'px';
      }
      return React.createElement(
        'div',
        {
          id: 'responsive-navbar-container',
          ref: 'navbarContainer',
          style: navbarStyle
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
}(React.PureComponent), _class.defaultProps = {
  onSelect: null,
  showNavItemBorder: false,
  showNavItemTooltip: true,
  tooltipDelay: 2000,
  fontSize: 'inherit',
  fontWeight: 'inherit',
  placeholder: 'more...',
  height: '40px'
}, _temp2);
export { ResponsiveNavbar as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yZXNwb25zaXZlLW5hdmJhci5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIlJlYWN0IiwiUHJvcFR5cGVzIiwiUmVhY3RET00iLCJTZWxlY3QiLCJPdmVybGF5VHJpZ2dlciIsIlRvb2x0aXAiLCJSZXNwb25zaXZlTmF2YmFyIiwic3RhdGUiLCJ1cGRhdGVEaW1lbnNzaW9ucyIsImxhc3RWaXNpYmxlSXRlbUluZGV4IiwibGFzdFdpZHRoIiwiaW5kZXhPZkxhc3RWaXNpYmxlTmF2SXRlbSIsImNvbnRhaW5lciIsInJlZnMiLCJuYXZiYXJDb250YWluZXIiLCJjb250YWluZXJXaWR0aCIsImZpbmRET01Ob2RlIiwib2Zmc2V0V2lkdGgiLCJyZW1haW5pbmdXaWR0aCIsImxhc3RWaXNpYmxlIiwiaSIsInByb3BzIiwibGlzdCIsImxlbmd0aCIsIml0ZW0iLCJTdHJpbmciLCJub2RlIiwiaXRlbVdpZHRoIiwiaGFuZGxlUmVzaXplRXZlbnQiLCJkaWZmZXJlbmNlIiwid2luZG93IiwiaW5uZXJXaWR0aCIsIlVQREFURV9USFJFU0hPTEQiLCJNYXRoIiwiYWJzIiwic2V0U3RhdGUiLCJzZWxlY3Rpb25DaGFuZ2VkIiwicm91dGVyIiwicHVzaCIsInZhbHVlIiwidG9vbHRpcFdyYXBwZXIiLCJpbmRleCIsInRvb2x0aXBDb250ZW50IiwidG9vbHRpcCIsInNob3dOYXZJdGVtVG9vbHRpcCIsInRvb2x0aXBEZWxheSIsIm5hdmJhckl0ZW0iLCJjbGFzc05hbWUiLCJhY3RpdmVLZXkiLCJmb250V2VpZ2h0IiwiZm9udFNpemUiLCJpZCIsIm9uU2VsZWN0IiwiaHJlZiIsIm5hbWUiLCJuYXZiYXIiLCJzbGljZSIsInNob3dOYXZJdGVtQm9yZGVyIiwiaXRlbXMiLCJtYXAiLCJuYXZiYXJTdHlsZSIsIm1pbkhlaWdodCIsImhlaWdodCIsImhlaWdodFB4IiwicGFyc2VJbnQiLCJsaW5lSGVpZ2h0IiwiY29tYm9ib3giLCJsYWJlbCIsInJlZiIsImluYWN0aXZlQm9yZGVyIiwiYm9yZGVyQ2xhc3MiLCJhY3RpdmVJdGVtIiwicGxhY2Vob2xkZXIiLCJjb21wb25lbnREaWRNb3VudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJzZXRUaW1lb3V0IiwiY29tcG9uZW50RGlkVXBkYXRlIiwiY29tcG9uZW50V2lsbFVubW91bnQiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwicmVuZGVyIiwiUHVyZUNvbXBvbmVudCIsImRlZmF1bHRQcm9wcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU9BLEtBQVAsTUFBa0IsT0FBbEI7QUFDQSxPQUFPQyxTQUFQLE1BQXNCLFlBQXRCO0FBQ0EsT0FBT0MsUUFBUCxNQUFxQixXQUFyQjtBQUNBLE9BQU9DLE1BQVAsTUFBbUIsY0FBbkI7QUFDQSxTQUFTQyxjQUFULEVBQXlCQyxPQUF6QixRQUF3QyxpQkFBeEM7QUFDQSxPQUFPLG9DQUFQO0FBQ0EsT0FBTywwQkFBUDs7SUFFcUJDLGdCOzs7Ozs7Ozs7Ozs7Z0tBK0JuQkMsSyxHQUFRO0FBQ05DLHlCQUFtQixJQURiO0FBRU5DLDRCQUFzQixDQUFDLENBRmpCO0FBR05DLGlCQUFXO0FBSEwsSyxRQThCUkMseUIsR0FBNEIsWUFBTTtBQUNoQyxVQUFNQyxZQUFZLE1BQUtDLElBQUwsQ0FBVUMsZUFBNUI7QUFDQSxVQUFNQyxpQkFBaUJiLFNBQVNjLFdBQVQsQ0FBcUJKLFNBQXJCLElBQ3JCVixTQUFTYyxXQUFULENBQXFCSixTQUFyQixFQUFnQ0ssV0FEWCxHQUN5QixDQURoRDs7QUFHQSxVQUFJQyxpQkFBaUJILGlCQUFpQixHQUF0Qzs7QUFFQSxVQUFJSSxjQUFjLENBQWxCO0FBQ0EsV0FBSyxJQUFJQyxJQUFJLENBQWIsRUFBZ0JBLElBQUksTUFBS0MsS0FBTCxDQUFXQyxJQUFYLENBQWdCQyxNQUFoQixHQUF5QixDQUE3QyxFQUFnREgsS0FBSyxDQUFyRCxFQUF3RDtBQUN0RCxZQUFNSSxPQUFPLE1BQUtYLElBQUwsZ0JBQXVCWSxP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LEtBQUs5QyxpQkFBdkM7QUFDQUUsV0FBTzRDLGdCQUFQLENBQXdCLG1CQUF4QixFQUE2QyxLQUFLOUMsaUJBQWxELEVBRmtCLENBRW9EO0FBQ3RFO0FBQ0ErQyxlQUFXLFlBQU07QUFDZixhQUFLL0MsaUJBQUw7QUFDRCxLQUZELEVBRUcsR0FGSDtBQUdELEc7OzZCQUVEZ0Qsa0IsaUNBQXFCO0FBQ25CLFFBQUksS0FBS3JFLEtBQUwsQ0FBV0MsaUJBQWYsRUFBa0M7QUFDaEMsV0FBSzJCLFFBQUwsQ0FBYyxFQUFFO0FBQ2Q7QUFDQTNCLDJCQUFtQixLQUZQO0FBR1pDLDhCQUFzQixLQUFLRSx5QkFBTDtBQUhWLE9BQWQ7QUFLRDtBQUNGLEc7OzZCQUVEa0Usb0IsbUNBQXVCO0FBQ3JCL0MsV0FBT2dELG1CQUFQLENBQTJCLFFBQTNCLEVBQXFDLEtBQUtsRCxpQkFBMUM7QUFDQUUsV0FBT2dELG1CQUFQLENBQTJCLG1CQUEzQixFQUFnRCxLQUFLbEQsaUJBQXJELEVBRnFCLENBRW9EO0FBQzFFLEc7OzZCQXdJRG1ELE0scUJBQVM7QUFDUCxXQUFPLEtBQUt4QixNQUFMLEVBQVA7QUFDRCxHOzs7RUFyTTJDdkQsTUFBTWdGLGEsVUFDM0NDLFksR0FBZTtBQUNwQjdCLFlBQVUsSUFEVTtBQUVwQksscUJBQW1CLEtBRkM7QUFHcEJiLHNCQUFvQixJQUhBO0FBSXBCQyxnQkFBYyxJQUpNO0FBS3BCSyxZQUFVLFNBTFU7QUFNcEJELGNBQVksU0FOUTtBQU9wQnVCLGVBQWEsU0FQTztBQVFwQlYsVUFBUTtBQVJZLEM7U0FESHhELGdCIiwiZmlsZSI6InJlc3BvbnNpdmUtbmF2YmFyLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIHJlYWN0L25vLWFycmF5LWluZGV4LWtleSAqL1xuLyogZXNsaW50LWRpc2FibGUgcmVhY3Qvbm8tc3RyaW5nLXJlZnMgKi9cbi8qIGVzbGludC1kaXNhYmxlIHJlYWN0L25vLWZpbmQtZG9tLW5vZGUgKi9cbi8qIGVzbGludC1kaXNhYmxlIHJlYWN0L3Byb3AtdHlwZXMgKi9cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XG5pbXBvcnQgU2VsZWN0IGZyb20gJ3JlYWN0LXNlbGVjdCc7XG5pbXBvcnQgeyBPdmVybGF5VHJpZ2dlciwgVG9vbHRpcCB9IGZyb20gJ3JlYWN0LWJvb3RzdHJhcCc7XG5pbXBvcnQgJ3JlYWN0LXNlbGVjdC9kaXN0L3JlYWN0LXNlbGVjdC5jc3MnO1xuaW1wb3J0ICcuL3Jlc3BvbnNpdmUtbmF2YmFyLnNjc3MnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZXNwb25zaXZlTmF2YmFyIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgb25TZWxlY3Q6IG51bGwsXG4gICAgc2hvd05hdkl0ZW1Cb3JkZXI6IGZhbHNlLFxuICAgIHNob3dOYXZJdGVtVG9vbHRpcDogdHJ1ZSxcbiAgICB0b29sdGlwRGVsYXk6IDIwMDAsXG4gICAgZm9udFNpemU6ICdpbmhlcml0JyxcbiAgICBmb250V2VpZ2h0OiAnaW5oZXJpdCcsXG4gICAgcGxhY2Vob2xkZXI6ICdtb3JlLi4uJyxcbiAgICBoZWlnaHQ6ICc0MHB4JyxcbiAgfVxuXG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgc2hvd05hdkl0ZW1Cb3JkZXI6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dOYXZJdGVtVG9vbHRpcDogUHJvcFR5cGVzLmJvb2wsXG4gICAgdG9vbHRpcERlbGF5OiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIGZvbnRTaXplOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGZvbnRXZWlnaHQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgcGxhY2Vob2xkZXI6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgYWN0aXZlS2V5OiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgbGlzdDogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgIG5hbWU6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgICBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICBQcm9wVHlwZXMubm9kZSxcbiAgICAgIF0pLmlzUmVxdWlyZWQsXG4gICAgICBocmVmOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMubnVtYmVyXSksXG4gICAgfSkpLmlzUmVxdWlyZWQsXG4gICAgb25TZWxlY3Q6IFByb3BUeXBlcy5mdW5jLFxuICAgIGhlaWdodDogUHJvcFR5cGVzLnN0cmluZyxcbiAgfVxuXG4gIHN0YXRlID0ge1xuICAgIHVwZGF0ZURpbWVuc3Npb25zOiB0cnVlLFxuICAgIGxhc3RWaXNpYmxlSXRlbUluZGV4OiAtMSxcbiAgICBsYXN0V2lkdGg6IDAsXG4gIH07XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuaGFuZGxlUmVzaXplRXZlbnQpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdvcmllbnRhdGlvbmNoYW5nZScsIHRoaXMuaGFuZGxlUmVzaXplRXZlbnQpOyAvLyBmb3IgbW9iaWxlIHN1cHBvcnRcbiAgICAvLyBDb21wb25lbnQgaXMgbm90IHJlbmRlcmVkIHlldCBieSBicm93c2VyIHdoZW4gRGlkTW91bnQgaXMgY2FsbGVkXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLmhhbmRsZVJlc2l6ZUV2ZW50KCk7XG4gICAgfSwgMjAwKTtcbiAgfVxuXG4gIGNvbXBvbmVudERpZFVwZGF0ZSgpIHtcbiAgICBpZiAodGhpcy5zdGF0ZS51cGRhdGVEaW1lbnNzaW9ucykge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgcmVhY3Qvbm8tZGlkLXVwZGF0ZS1zZXQtc3RhdGVcbiAgICAgICAgLy8gMm5kIHJlbmRlciBpcyB0cmlnZ2VyZWQgaGVyZSBpbiBwdXJwb3NlXG4gICAgICAgIHVwZGF0ZURpbWVuc3Npb25zOiBmYWxzZSxcbiAgICAgICAgbGFzdFZpc2libGVJdGVtSW5kZXg6IHRoaXMuaW5kZXhPZkxhc3RWaXNpYmxlTmF2SXRlbSgpLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuaGFuZGxlUmVzaXplRXZlbnQpO1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdvcmllbnRhdGlvbmNoYW5nZScsIHRoaXMuaGFuZGxlUmVzaXplRXZlbnQpOyAvLyBmb3IgbW9iaWxlIHN1cHBvcnRcbiAgfVxuXG4gIGluZGV4T2ZMYXN0VmlzaWJsZU5hdkl0ZW0gPSAoKSA9PiB7XG4gICAgY29uc3QgY29udGFpbmVyID0gdGhpcy5yZWZzLm5hdmJhckNvbnRhaW5lcjtcbiAgICBjb25zdCBjb250YWluZXJXaWR0aCA9IFJlYWN0RE9NLmZpbmRET01Ob2RlKGNvbnRhaW5lcikgP1xuICAgICAgUmVhY3RET00uZmluZERPTU5vZGUoY29udGFpbmVyKS5vZmZzZXRXaWR0aCA6IDA7XG5cbiAgICBsZXQgcmVtYWluaW5nV2lkdGggPSBjb250YWluZXJXaWR0aCAtIDE5NTtcblxuICAgIGxldCBsYXN0VmlzaWJsZSA9IDE7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnByb3BzLmxpc3QubGVuZ3RoIC0gMTsgaSArPSAxKSB7XG4gICAgICBjb25zdCBpdGVtID0gdGhpcy5yZWZzW2BuYXZpdGVtcmVmJHtTdHJpbmcoaSl9YF07XG4gICAgICBjb25zdCBub2RlID0gUmVhY3RET00uZmluZERPTU5vZGUoaXRlbSk7XG4gICAgICBpZiAoIW5vZGUpIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjb25zdCBpdGVtV2lkdGggPSBub2RlLm9mZnNldFdpZHRoO1xuICAgICAgcmVtYWluaW5nV2lkdGggLT0gaXRlbVdpZHRoO1xuICAgICAgaWYgKHJlbWFpbmluZ1dpZHRoIDwgMCkge1xuICAgICAgICBsYXN0VmlzaWJsZSAtPSAxO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGxhc3RWaXNpYmxlICs9IDE7XG4gICAgfVxuXG4gICAgcmV0dXJuIGxhc3RWaXNpYmxlO1xuICB9XG5cbiAgaGFuZGxlUmVzaXplRXZlbnQgPSAoKSA9PiB7XG4gICAgY29uc3QgZGlmZmVyZW5jZSA9IHdpbmRvdy5pbm5lcldpZHRoIC0gdGhpcy5zdGF0ZS5sYXN0V2lkdGg7XG4gICAgY29uc3QgVVBEQVRFX1RIUkVTSE9MRCA9IDUwO1xuICAgIGlmIChNYXRoLmFicyhkaWZmZXJlbmNlKSA+IFVQREFURV9USFJFU0hPTEQpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICB1cGRhdGVEaW1lbnNzaW9uczogdHJ1ZSxcbiAgICAgICAgbGFzdFdpZHRoOiB3aW5kb3cuaW5uZXJXaWR0aCxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuICBzZWxlY3Rpb25DaGFuZ2VkID0gKGl0ZW0pID0+IHtcbiAgICB0aGlzLnByb3BzLnJvdXRlci5wdXNoKGl0ZW0udmFsdWUpO1xuICB9XG5cbiAgdG9vbHRpcFdyYXBwZXIgPSAobm9kZSwgaW5kZXgsIHRvb2x0aXBDb250ZW50KSA9PiB7XG4gICAgY29uc3QgdG9vbHRpcCA9IDxUb29sdGlwIGlkPVwidG9vbHRpcFwiPnt0b29sdGlwQ29udGVudH08L1Rvb2x0aXA+O1xuICAgIHJldHVybiAhdGhpcy5wcm9wcy5zaG93TmF2SXRlbVRvb2x0aXAgPyBub2RlIDpcbiAgICA8T3ZlcmxheVRyaWdnZXIgcGxhY2VtZW50PVwiYm90dG9tXCIga2V5PXtpbmRleH0gb3ZlcmxheT17dG9vbHRpcH0gZGVsYXlTaG93PXt0aGlzLnByb3BzLnRvb2x0aXBEZWxheX0+XG4gICAgICB7bm9kZX1cbiAgICA8L092ZXJsYXlUcmlnZ2VyPjtcbiAgfVxuXG4gIG5hdmJhckl0ZW0gPSAoaXRlbSwgaW5kZXgsIGNsYXNzTmFtZSkgPT4gKFxuICAgIDxidXR0b25cbiAgICAgIGNsYXNzTmFtZT17aW5kZXggPT09IHRoaXMucHJvcHMuYWN0aXZlS2V5ICYmXG4gICAgICAgIGluZGV4IDw9IHRoaXMuc3RhdGUubGFzdFZpc2libGVJdGVtSW5kZXggP1xuICAgICAgICBgJHtjbGFzc05hbWV9IHNlbGVjdGVkLWJvcmRlcmAgOiBgJHtjbGFzc05hbWV9YH1cbiAgICAgIHN0eWxlPXt7IGZvbnRXZWlnaHQ6IHRoaXMucHJvcHMuZm9udFdlaWdodCwgZm9udFNpemU6IHRoaXMucHJvcHMuZm9udFNpemUgfX1cbiAgICAgIGlkPXtpdGVtLmlkIHx8IGBuYXZpdGVtcmVmJHtTdHJpbmcoaW5kZXgpfWB9XG4gICAgICBrZXk9e2l0ZW0uaWQgfHwgYG5hdml0ZW1yZWYke1N0cmluZyhpbmRleCl9YH1cbiAgICAgIHJlZj17YG5hdml0ZW1yZWYke1N0cmluZyhpbmRleCl9YH1cbiAgICAgIG9uQ2xpY2s9eygpID0+IHsgdGhpcy5wcm9wcy5vblNlbGVjdChpdGVtLmhyZWYpOyB9fVxuICAgID5cbiAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInJlc3BvbnNpdmUtbmF2YmFyLWl0ZW0tdGV4dFwiPntpdGVtLm5hbWV9PC9zcGFuPlxuICAgIDwvYnV0dG9uPlxuICApXG5cbiAgbmF2YmFyID0gKCkgPT4ge1xuICAgIGNvbnN0IGxpc3QgPSB0aGlzLnN0YXRlLmxhc3RWaXNpYmxlSXRlbUluZGV4ID49IDAgP1xuICAgICAgdGhpcy5wcm9wcy5saXN0LnNsaWNlKDAsIHRoaXMuc3RhdGUubGFzdFZpc2libGVJdGVtSW5kZXgpXG4gICAgICA6IHRoaXMucHJvcHMubGlzdDtcbiAgICBjb25zdCBjbGFzc05hbWUgPSB0aGlzLnByb3BzLnNob3dOYXZJdGVtQm9yZGVyID9cbiAgICAgICdyZXNwb25zaXZlLW5hdmJhci1pdGVtIGluYWN0aXZlLWJvcmRlcicgOiAncmVzcG9uc2l2ZS1uYXZiYXItaXRlbSc7XG4gICAgY29uc3QgaXRlbXMgPSBsaXN0Lm1hcCgoaXRlbSwgaW5kZXgpID0+IChcbiAgICAgIHRoaXMudG9vbHRpcFdyYXBwZXIodGhpcy5uYXZiYXJJdGVtKGl0ZW0sIGluZGV4LCBjbGFzc05hbWUpLCBpbmRleCwgaXRlbS5uYW1lKVxuICAgICkpO1xuICAgIGNvbnN0IG5hdmJhclN0eWxlID0ge1xuICAgICAgbWluSGVpZ2h0OiB0aGlzLnByb3BzLmhlaWdodCxcbiAgICB9O1xuICAgIGlmICh0aGlzLnByb3BzLmhlaWdodC5zbGljZSgtMikgPT09ICdweCcpIHtcbiAgICAgIGNvbnN0IGhlaWdodFB4ID0gcGFyc2VJbnQodGhpcy5wcm9wcy5oZWlnaHQuc2xpY2UoMCwgLTIpLCAxMCk7XG4gICAgICBuYXZiYXJTdHlsZS5saW5lSGVpZ2h0ID0gYCR7KGhlaWdodFB4IC0gNCl9cHhgO1xuICAgIH1cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdlxuICAgICAgICBpZD1cInJlc3BvbnNpdmUtbmF2YmFyLWNvbnRhaW5lclwiXG4gICAgICAgIHJlZj1cIm5hdmJhckNvbnRhaW5lclwiXG4gICAgICAgIHN0eWxlPXtuYXZiYXJTdHlsZX1cbiAgICAgID5cbiAgICAgICAge2l0ZW1zfVxuICAgICAgICB7dGhpcy5jb21ib2JveCgpfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxuXG4gIGNvbWJvYm94ID0gKCkgPT4ge1xuICAgIGlmICh0aGlzLnN0YXRlLmxhc3RWaXNpYmxlSXRlbUluZGV4ID09PSAtMSB8fFxuICAgICAgICB0aGlzLnN0YXRlLmxhc3RWaXNpYmxlSXRlbUluZGV4ID4gdGhpcy5wcm9wcy5saXN0Lmxlbmd0aCAtIDEpIHtcbiAgICAgIC8vIHJldHVybiBudWxsIGlmIGFsbCBuYXYgaXRlbXMgYXJlIHZpc2libGVcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIC8vIHNsaWNlIG5hdiBpdGVtcyBsaXN0IGFuZCBzaG93IGludmlzaWJsZSBpdGVtcyBpbiB0aGUgY29tYm9ib3hcbiAgICBjb25zdCBsaXN0ID0gdGhpcy5zdGF0ZS5sYXN0VmlzaWJsZUl0ZW1JbmRleCA+PSAwID9cbiAgICAgIHRoaXMucHJvcHMubGlzdC5zbGljZSh0aGlzLnN0YXRlLmxhc3RWaXNpYmxlSXRlbUluZGV4KVxuICAgICAgOiB0aGlzLnByb3BzLmxpc3Q7XG4gICAgY29uc3QgaXRlbXMgPSBsaXN0Lm1hcCgoaXRlbSwgaW5kZXgpID0+XG4gICAgICAoe1xuICAgICAgICB2YWx1ZTogaXRlbS5ocmVmLFxuICAgICAgICBsYWJlbDogaXRlbS5uYW1lLFxuICAgICAgICBpZDogaW5kZXgsXG4gICAgICAgIHJlZjogYG5hdml0ZW1yZWYke1N0cmluZyhpbmRleCl9YCxcbiAgICAgIH0pKTtcblxuICAgIGNvbnN0IGluYWN0aXZlQm9yZGVyID0gdGhpcy5wcm9wcy5zaG93TmF2SXRlbUJvcmRlciA/ICdpbmFjdGl2ZS1ib3JkZXInIDogJyc7XG4gICAgY29uc3QgYm9yZGVyQ2xhc3MgPSB0aGlzLnByb3BzLmFjdGl2ZUtleSA+PSB0aGlzLnN0YXRlLmxhc3RWaXNpYmxlSXRlbUluZGV4ID9cbiAgICAgICdzZWxlY3RlZC1ib3JkZXInIDogaW5hY3RpdmVCb3JkZXI7XG4gICAgY29uc3QgYWN0aXZlSXRlbSA9IHRoaXMucHJvcHMubGlzdFt0aGlzLnByb3BzLmFjdGl2ZUtleV07XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXZcbiAgICAgICAgaWQ9XCJyZXNwb25zaXZlLW5hdmJhci1zZWxlY3RcIlxuICAgICAgICBjbGFzc05hbWU9e2JvcmRlckNsYXNzfVxuICAgICAgICBzdHlsZT17eyBmb250V2VpZ2h0OiB0aGlzLnByb3BzLmZvbnRXZWlnaHQsIGZvbnRTaXplOiB0aGlzLnByb3BzLmZvbnRTaXplIH19XG4gICAgICA+XG4gICAgICAgIDxTZWxlY3RcbiAgICAgICAgICBuYW1lPVwicmVzcG9uc2l2ZU5hdmJhclNlbGVjdFwiXG4gICAgICAgICAgbXVsdGk9e2ZhbHNlfVxuICAgICAgICAgIHZhbHVlPXthY3RpdmVJdGVtID8gYWN0aXZlSXRlbS5ocmVmIDogJyd9XG4gICAgICAgICAgY2xlYXJhYmxlPXtmYWxzZX1cbiAgICAgICAgICBwbGFjZWhvbGRlcj17dGhpcy5wcm9wcy5wbGFjZWhvbGRlcn1cbiAgICAgICAgICBvcHRpb25zPXtpdGVtc31cbiAgICAgICAgICBvbkNoYW5nZT17KGl0ZW0pID0+IHsgdGhpcy5wcm9wcy5vblNlbGVjdChpdGVtLnZhbHVlKTsgfX1cbiAgICAgICAgICBpbnB1dFByb3BzPXt7IGlkOiAnb2NSZXNwb25zaXZlTmF2YmFyU2VsZWN0JyB9fVxuICAgICAgICAvPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gdGhpcy5uYXZiYXIoKTtcbiAgfVxufVxuXG4iXX0=