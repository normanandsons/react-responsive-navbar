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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yZXNwb25zaXZlLW5hdmJhci5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIlJlYWN0IiwiUHJvcFR5cGVzIiwiUmVhY3RET00iLCJTZWxlY3QiLCJPdmVybGF5VHJpZ2dlciIsIlRvb2x0aXAiLCJSZXNwb25zaXZlTmF2YmFyIiwic3RhdGUiLCJ1cGRhdGVEaW1lbnNzaW9ucyIsImxhc3RWaXNpYmxlSXRlbUluZGV4IiwibGFzdFdpZHRoIiwiaW5kZXhPZkxhc3RWaXNpYmxlTmF2SXRlbSIsImNvbnRhaW5lciIsInJlZnMiLCJuYXZiYXJDb250YWluZXIiLCJjb250YWluZXJXaWR0aCIsImZpbmRET01Ob2RlIiwib2Zmc2V0V2lkdGgiLCJyZW1haW5pbmdXaWR0aCIsImxhc3RWaXNpYmxlIiwiaSIsInByb3BzIiwibGlzdCIsImxlbmd0aCIsIml0ZW0iLCJTdHJpbmciLCJub2RlIiwiaXRlbVdpZHRoIiwiaGFuZGxlUmVzaXplRXZlbnQiLCJkaWZmZXJlbmNlIiwid2luZG93IiwiaW5uZXJXaWR0aCIsIlVQREFURV9USFJFU0hPTEQiLCJNYXRoIiwiYWJzIiwic2V0U3RhdGUiLCJzZWxlY3Rpb25DaGFuZ2VkIiwicm91dGVyIiwicHVzaCIsInZhbHVlIiwidG9vbHRpcFdyYXBwZXIiLCJpbmRleCIsInRvb2x0aXBDb250ZW50IiwidG9vbHRpcCIsInNob3dOYXZJdGVtVG9vbHRpcCIsInRvb2x0aXBEZWxheSIsIm5hdmJhckl0ZW0iLCJjbGFzc05hbWUiLCJhY3RpdmVLZXkiLCJmb250V2VpZ2h0IiwiZm9udFNpemUiLCJpZCIsIm9uU2VsZWN0IiwiaHJlZiIsIm5hbWUiLCJuYXZiYXIiLCJzbGljZSIsInNob3dOYXZJdGVtQm9yZGVyIiwiaXRlbXMiLCJtYXAiLCJuYXZiYXJTdHlsZSIsIm1pbkhlaWdodCIsImhlaWdodCIsImhlaWdodFB4IiwicGFyc2VJbnQiLCJsaW5lSGVpZ2h0IiwiY29tYm9ib3giLCJsYWJlbCIsInJlZiIsImluYWN0aXZlQm9yZGVyIiwiYm9yZGVyQ2xhc3MiLCJhY3RpdmVJdGVtIiwicGxhY2Vob2xkZXIiLCJjb21wb25lbnREaWRNb3VudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJzZXRUaW1lb3V0IiwiY29tcG9uZW50RGlkVXBkYXRlIiwiY29tcG9uZW50V2lsbFVubW91bnQiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwicmVuZGVyIiwiUHVyZUNvbXBvbmVudCIsImRlZmF1bHRQcm9wcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU9BLEtBQVAsTUFBa0IsT0FBbEI7QUFDQSxPQUFPQyxTQUFQLE1BQXNCLFlBQXRCO0FBQ0EsT0FBT0MsUUFBUCxNQUFxQixXQUFyQjtBQUNBLE9BQU9DLE1BQVAsTUFBbUIsY0FBbkI7QUFDQSxTQUFTQyxjQUFULEVBQXlCQyxPQUF6QixRQUF3QyxpQkFBeEM7QUFDQSxPQUFPLG9DQUFQO0FBQ0EsT0FBTywwQkFBUDs7SUFFcUJDLGdCOzs7Ozs7Ozs7Ozs7Z0tBK0JuQkMsSyxHQUFRO0FBQ05DLHlCQUFtQixJQURiO0FBRU5DLDRCQUFzQixDQUFDLENBRmpCO0FBR05DLGlCQUFXO0FBSEwsSyxRQThCUkMseUIsR0FBNEIsWUFBTTtBQUNoQyxVQUFNQyxZQUFZLE1BQUtDLElBQUwsQ0FBVUMsZUFBNUI7QUFDQSxVQUFNQyxpQkFBaUJiLFNBQVNjLFdBQVQsQ0FBcUJKLFNBQXJCLElBQ3JCVixTQUFTYyxXQUFULENBQXFCSixTQUFyQixFQUFnQ0ssV0FEWCxHQUN5QixDQURoRDs7QUFHQSxVQUFJQyxpQkFBaUJILGlCQUFpQixHQUF0Qzs7QUFFQSxVQUFJSSxjQUFjLENBQWxCO0FBQ0EsV0FBSyxJQUFJQyxJQUFJLENBQWIsRUFBZ0JBLElBQUksTUFBS0MsS0FBTCxDQUFXQyxJQUFYLENBQWdCQyxNQUFoQixHQUF5QixDQUE3QyxFQUFnREgsS0FBSyxDQUFyRCxFQUF3RDtBQUN0RCxZQUFNSSxPQUFPLE1BQUtYLElBQUwsZ0JBQXVCWSxP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LEtBQUs5QyxpQkFBdkM7QUFDQUUsV0FBTzRDLGdCQUFQLENBQXdCLG1CQUF4QixFQUE2QyxLQUFLOUMsaUJBQWxELEVBRmtCLENBRW9EO0FBQ3RFO0FBQ0ErQyxlQUFXLFlBQU07QUFDZixhQUFLL0MsaUJBQUw7QUFDRCxLQUZELEVBRUcsR0FGSDtBQUdELEc7OzZCQUVEZ0Qsa0IsaUNBQXFCO0FBQ25CLFFBQUksS0FBS3JFLEtBQUwsQ0FBV0MsaUJBQWYsRUFBa0M7QUFDaEMsV0FBSzJCLFFBQUwsQ0FBYyxFQUFFO0FBQ2Q7QUFDQTNCLDJCQUFtQixLQUZQO0FBR1pDLDhCQUFzQixLQUFLRSx5QkFBTDtBQUhWLE9BQWQ7QUFLRDtBQUNGLEc7OzZCQUVEa0Usb0IsbUNBQXVCO0FBQ3JCL0MsV0FBT2dELG1CQUFQLENBQTJCLFFBQTNCLEVBQXFDLEtBQUtsRCxpQkFBMUM7QUFDQUUsV0FBT2dELG1CQUFQLENBQTJCLG1CQUEzQixFQUFnRCxLQUFLbEQsaUJBQXJELEVBRnFCLENBRW9EO0FBQzFFLEc7OzZCQXdJRG1ELE0scUJBQVM7QUFDUCxXQUFPLEtBQUt4QixNQUFMLEVBQVA7QUFDRCxHOzs7RUFyTTJDdkQsTUFBTWdGLGEsVUFDM0NDLFksR0FBZTtBQUNwQjdCLFlBQVUsSUFEVTtBQUVwQksscUJBQW1CLEtBRkM7QUFHcEJiLHNCQUFvQixJQUhBO0FBSXBCQyxnQkFBYyxJQUpNO0FBS3BCSyxZQUFVLFNBTFU7QUFNcEJELGNBQVksU0FOUTtBQU9wQnVCLGVBQWEsU0FQTztBQVFwQlYsVUFBUTtBQVJZLEM7U0FESHhELGdCIiwiZmlsZSI6InJlc3BvbnNpdmUtbmF2YmFyLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIHJlYWN0L25vLWFycmF5LWluZGV4LWtleSAqL1xyXG4vKiBlc2xpbnQtZGlzYWJsZSByZWFjdC9uby1zdHJpbmctcmVmcyAqL1xyXG4vKiBlc2xpbnQtZGlzYWJsZSByZWFjdC9uby1maW5kLWRvbS1ub2RlICovXHJcbi8qIGVzbGludC1kaXNhYmxlIHJlYWN0L3Byb3AtdHlwZXMgKi9cclxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcclxuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XHJcbmltcG9ydCBTZWxlY3QgZnJvbSAncmVhY3Qtc2VsZWN0JztcclxuaW1wb3J0IHsgT3ZlcmxheVRyaWdnZXIsIFRvb2x0aXAgfSBmcm9tICdyZWFjdC1ib290c3RyYXAnO1xyXG5pbXBvcnQgJ3JlYWN0LXNlbGVjdC9kaXN0L3JlYWN0LXNlbGVjdC5jc3MnO1xyXG5pbXBvcnQgJy4vcmVzcG9uc2l2ZS1uYXZiYXIuc2Nzcyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZXNwb25zaXZlTmF2YmFyIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XHJcbiAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcclxuICAgIG9uU2VsZWN0OiBudWxsLFxyXG4gICAgc2hvd05hdkl0ZW1Cb3JkZXI6IGZhbHNlLFxyXG4gICAgc2hvd05hdkl0ZW1Ub29sdGlwOiB0cnVlLFxyXG4gICAgdG9vbHRpcERlbGF5OiAyMDAwLFxyXG4gICAgZm9udFNpemU6ICdpbmhlcml0JyxcclxuICAgIGZvbnRXZWlnaHQ6ICdpbmhlcml0JyxcclxuICAgIHBsYWNlaG9sZGVyOiAnbW9yZS4uLicsXHJcbiAgICBoZWlnaHQ6ICc0MHB4JyxcclxuICB9XHJcblxyXG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XHJcbiAgICBzaG93TmF2SXRlbUJvcmRlcjogUHJvcFR5cGVzLmJvb2wsXHJcbiAgICBzaG93TmF2SXRlbVRvb2x0aXA6IFByb3BUeXBlcy5ib29sLFxyXG4gICAgdG9vbHRpcERlbGF5OiBQcm9wVHlwZXMubnVtYmVyLFxyXG4gICAgZm9udFNpemU6IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICBmb250V2VpZ2h0OiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgcGxhY2Vob2xkZXI6IFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICBhY3RpdmVLZXk6IFByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcclxuICAgIGxpc3Q6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5zaGFwZSh7XHJcbiAgICAgIG5hbWU6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xyXG4gICAgICAgIFByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICAgICAgUHJvcFR5cGVzLm5vZGUsXHJcbiAgICAgIF0pLmlzUmVxdWlyZWQsXHJcbiAgICAgIGhyZWY6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5udW1iZXJdKSxcclxuICAgIH0pKS5pc1JlcXVpcmVkLFxyXG4gICAgb25TZWxlY3Q6IFByb3BUeXBlcy5mdW5jLFxyXG4gICAgaGVpZ2h0OiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gIH1cclxuXHJcbiAgc3RhdGUgPSB7XHJcbiAgICB1cGRhdGVEaW1lbnNzaW9uczogdHJ1ZSxcclxuICAgIGxhc3RWaXNpYmxlSXRlbUluZGV4OiAtMSxcclxuICAgIGxhc3RXaWR0aDogMCxcclxuICB9O1xyXG5cclxuICBjb21wb25lbnREaWRNb3VudCgpIHtcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLmhhbmRsZVJlc2l6ZUV2ZW50KTtcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdvcmllbnRhdGlvbmNoYW5nZScsIHRoaXMuaGFuZGxlUmVzaXplRXZlbnQpOyAvLyBmb3IgbW9iaWxlIHN1cHBvcnRcclxuICAgIC8vIENvbXBvbmVudCBpcyBub3QgcmVuZGVyZWQgeWV0IGJ5IGJyb3dzZXIgd2hlbiBEaWRNb3VudCBpcyBjYWxsZWRcclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICB0aGlzLmhhbmRsZVJlc2l6ZUV2ZW50KCk7XHJcbiAgICB9LCAyMDApO1xyXG4gIH1cclxuXHJcbiAgY29tcG9uZW50RGlkVXBkYXRlKCkge1xyXG4gICAgaWYgKHRoaXMuc3RhdGUudXBkYXRlRGltZW5zc2lvbnMpIHtcclxuICAgICAgdGhpcy5zZXRTdGF0ZSh7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgcmVhY3Qvbm8tZGlkLXVwZGF0ZS1zZXQtc3RhdGVcclxuICAgICAgICAvLyAybmQgcmVuZGVyIGlzIHRyaWdnZXJlZCBoZXJlIGluIHB1cnBvc2VcclxuICAgICAgICB1cGRhdGVEaW1lbnNzaW9uczogZmFsc2UsXHJcbiAgICAgICAgbGFzdFZpc2libGVJdGVtSW5kZXg6IHRoaXMuaW5kZXhPZkxhc3RWaXNpYmxlTmF2SXRlbSgpLFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xyXG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuaGFuZGxlUmVzaXplRXZlbnQpO1xyXG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ29yaWVudGF0aW9uY2hhbmdlJywgdGhpcy5oYW5kbGVSZXNpemVFdmVudCk7IC8vIGZvciBtb2JpbGUgc3VwcG9ydFxyXG4gIH1cclxuXHJcbiAgaW5kZXhPZkxhc3RWaXNpYmxlTmF2SXRlbSA9ICgpID0+IHtcclxuICAgIGNvbnN0IGNvbnRhaW5lciA9IHRoaXMucmVmcy5uYXZiYXJDb250YWluZXI7XHJcbiAgICBjb25zdCBjb250YWluZXJXaWR0aCA9IFJlYWN0RE9NLmZpbmRET01Ob2RlKGNvbnRhaW5lcikgP1xyXG4gICAgICBSZWFjdERPTS5maW5kRE9NTm9kZShjb250YWluZXIpLm9mZnNldFdpZHRoIDogMDtcclxuXHJcbiAgICBsZXQgcmVtYWluaW5nV2lkdGggPSBjb250YWluZXJXaWR0aCAtIDE5NTtcclxuXHJcbiAgICBsZXQgbGFzdFZpc2libGUgPSAxO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnByb3BzLmxpc3QubGVuZ3RoIC0gMTsgaSArPSAxKSB7XHJcbiAgICAgIGNvbnN0IGl0ZW0gPSB0aGlzLnJlZnNbYG5hdml0ZW1yZWYke1N0cmluZyhpKX1gXTtcclxuICAgICAgY29uc3Qgbm9kZSA9IFJlYWN0RE9NLmZpbmRET01Ob2RlKGl0ZW0pO1xyXG4gICAgICBpZiAoIW5vZGUpIHtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBjb25zdCBpdGVtV2lkdGggPSBub2RlLm9mZnNldFdpZHRoO1xyXG4gICAgICByZW1haW5pbmdXaWR0aCAtPSBpdGVtV2lkdGg7XHJcbiAgICAgIGlmIChyZW1haW5pbmdXaWR0aCA8IDApIHtcclxuICAgICAgICBsYXN0VmlzaWJsZSAtPSAxO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGxhc3RWaXNpYmxlICs9IDE7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGxhc3RWaXNpYmxlO1xyXG4gIH1cclxuXHJcbiAgaGFuZGxlUmVzaXplRXZlbnQgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBkaWZmZXJlbmNlID0gd2luZG93LmlubmVyV2lkdGggLSB0aGlzLnN0YXRlLmxhc3RXaWR0aDtcclxuICAgIGNvbnN0IFVQREFURV9USFJFU0hPTEQgPSA1MDtcclxuICAgIGlmIChNYXRoLmFicyhkaWZmZXJlbmNlKSA+IFVQREFURV9USFJFU0hPTEQpIHtcclxuICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgdXBkYXRlRGltZW5zc2lvbnM6IHRydWUsXHJcbiAgICAgICAgbGFzdFdpZHRoOiB3aW5kb3cuaW5uZXJXaWR0aCxcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHNlbGVjdGlvbkNoYW5nZWQgPSAoaXRlbSkgPT4ge1xyXG4gICAgdGhpcy5wcm9wcy5yb3V0ZXIucHVzaChpdGVtLnZhbHVlKTtcclxuICB9XHJcblxyXG4gIHRvb2x0aXBXcmFwcGVyID0gKG5vZGUsIGluZGV4LCB0b29sdGlwQ29udGVudCkgPT4ge1xyXG4gICAgY29uc3QgdG9vbHRpcCA9IDxUb29sdGlwIGlkPVwidG9vbHRpcFwiPnt0b29sdGlwQ29udGVudH08L1Rvb2x0aXA+O1xyXG4gICAgcmV0dXJuICF0aGlzLnByb3BzLnNob3dOYXZJdGVtVG9vbHRpcCA/IG5vZGUgOlxyXG4gICAgPE92ZXJsYXlUcmlnZ2VyIHBsYWNlbWVudD1cImJvdHRvbVwiIGtleT17aW5kZXh9IG92ZXJsYXk9e3Rvb2x0aXB9IGRlbGF5U2hvdz17dGhpcy5wcm9wcy50b29sdGlwRGVsYXl9PlxyXG4gICAgICB7bm9kZX1cclxuICAgIDwvT3ZlcmxheVRyaWdnZXI+O1xyXG4gIH1cclxuXHJcbiAgbmF2YmFySXRlbSA9IChpdGVtLCBpbmRleCwgY2xhc3NOYW1lKSA9PiAoXHJcbiAgICA8YnV0dG9uXHJcbiAgICAgIGNsYXNzTmFtZT17aW5kZXggPT09IHRoaXMucHJvcHMuYWN0aXZlS2V5ICYmXHJcbiAgICAgICAgaW5kZXggPD0gdGhpcy5zdGF0ZS5sYXN0VmlzaWJsZUl0ZW1JbmRleCA/XHJcbiAgICAgICAgYCR7Y2xhc3NOYW1lfSBzZWxlY3RlZC1ib3JkZXJgIDogYCR7Y2xhc3NOYW1lfWB9XHJcbiAgICAgIHN0eWxlPXt7IGZvbnRXZWlnaHQ6IHRoaXMucHJvcHMuZm9udFdlaWdodCwgZm9udFNpemU6IHRoaXMucHJvcHMuZm9udFNpemUgfX1cclxuICAgICAgaWQ9e2l0ZW0uaWQgfHwgYG5hdml0ZW1yZWYke1N0cmluZyhpbmRleCl9YH1cclxuICAgICAga2V5PXtpdGVtLmlkIHx8IGBuYXZpdGVtcmVmJHtTdHJpbmcoaW5kZXgpfWB9XHJcbiAgICAgIHJlZj17YG5hdml0ZW1yZWYke1N0cmluZyhpbmRleCl9YH1cclxuICAgICAgb25DbGljaz17KCkgPT4geyB0aGlzLnByb3BzLm9uU2VsZWN0KGl0ZW0uaHJlZik7IH19XHJcbiAgICA+XHJcbiAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInJlc3BvbnNpdmUtbmF2YmFyLWl0ZW0tdGV4dFwiPntpdGVtLm5hbWV9PC9zcGFuPlxyXG4gICAgPC9idXR0b24+XHJcbiAgKVxyXG5cclxuICBuYXZiYXIgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBsaXN0ID0gdGhpcy5zdGF0ZS5sYXN0VmlzaWJsZUl0ZW1JbmRleCA+PSAwID9cclxuICAgICAgdGhpcy5wcm9wcy5saXN0LnNsaWNlKDAsIHRoaXMuc3RhdGUubGFzdFZpc2libGVJdGVtSW5kZXgpXHJcbiAgICAgIDogdGhpcy5wcm9wcy5saXN0O1xyXG4gICAgY29uc3QgY2xhc3NOYW1lID0gdGhpcy5wcm9wcy5zaG93TmF2SXRlbUJvcmRlciA/XHJcbiAgICAgICdyZXNwb25zaXZlLW5hdmJhci1pdGVtIGluYWN0aXZlLWJvcmRlcicgOiAncmVzcG9uc2l2ZS1uYXZiYXItaXRlbSc7XHJcbiAgICBjb25zdCBpdGVtcyA9IGxpc3QubWFwKChpdGVtLCBpbmRleCkgPT4gKFxyXG4gICAgICB0aGlzLnRvb2x0aXBXcmFwcGVyKHRoaXMubmF2YmFySXRlbShpdGVtLCBpbmRleCwgY2xhc3NOYW1lKSwgaW5kZXgsIGl0ZW0ubmFtZSlcclxuICAgICkpO1xyXG4gICAgY29uc3QgbmF2YmFyU3R5bGUgPSB7XHJcbiAgICAgIG1pbkhlaWdodDogdGhpcy5wcm9wcy5oZWlnaHQsXHJcbiAgICB9O1xyXG4gICAgaWYgKHRoaXMucHJvcHMuaGVpZ2h0LnNsaWNlKC0yKSA9PT0gJ3B4Jykge1xyXG4gICAgICBjb25zdCBoZWlnaHRQeCA9IHBhcnNlSW50KHRoaXMucHJvcHMuaGVpZ2h0LnNsaWNlKDAsIC0yKSwgMTApO1xyXG4gICAgICBuYXZiYXJTdHlsZS5saW5lSGVpZ2h0ID0gYCR7KGhlaWdodFB4IC0gNCl9cHhgO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIChcclxuICAgICAgPGRpdlxyXG4gICAgICAgIGlkPVwicmVzcG9uc2l2ZS1uYXZiYXItY29udGFpbmVyXCJcclxuICAgICAgICByZWY9XCJuYXZiYXJDb250YWluZXJcIlxyXG4gICAgICAgIHN0eWxlPXtuYXZiYXJTdHlsZX1cclxuICAgICAgPlxyXG4gICAgICAgIHtpdGVtc31cclxuICAgICAgICB7dGhpcy5jb21ib2JveCgpfVxyXG4gICAgICA8L2Rpdj5cclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBjb21ib2JveCA9ICgpID0+IHtcclxuICAgIGlmICh0aGlzLnN0YXRlLmxhc3RWaXNpYmxlSXRlbUluZGV4ID09PSAtMSB8fFxyXG4gICAgICAgIHRoaXMuc3RhdGUubGFzdFZpc2libGVJdGVtSW5kZXggPiB0aGlzLnByb3BzLmxpc3QubGVuZ3RoIC0gMSkge1xyXG4gICAgICAvLyByZXR1cm4gbnVsbCBpZiBhbGwgbmF2IGl0ZW1zIGFyZSB2aXNpYmxlXHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHNsaWNlIG5hdiBpdGVtcyBsaXN0IGFuZCBzaG93IGludmlzaWJsZSBpdGVtcyBpbiB0aGUgY29tYm9ib3hcclxuICAgIGNvbnN0IGxpc3QgPSB0aGlzLnN0YXRlLmxhc3RWaXNpYmxlSXRlbUluZGV4ID49IDAgP1xyXG4gICAgICB0aGlzLnByb3BzLmxpc3Quc2xpY2UodGhpcy5zdGF0ZS5sYXN0VmlzaWJsZUl0ZW1JbmRleClcclxuICAgICAgOiB0aGlzLnByb3BzLmxpc3Q7XHJcbiAgICBjb25zdCBpdGVtcyA9IGxpc3QubWFwKChpdGVtLCBpbmRleCkgPT5cclxuICAgICAgKHtcclxuICAgICAgICB2YWx1ZTogaXRlbS5ocmVmLFxyXG4gICAgICAgIGxhYmVsOiBpdGVtLm5hbWUsXHJcbiAgICAgICAgaWQ6IGluZGV4LFxyXG4gICAgICAgIHJlZjogYG5hdml0ZW1yZWYke1N0cmluZyhpbmRleCl9YCxcclxuICAgICAgfSkpO1xyXG5cclxuICAgIGNvbnN0IGluYWN0aXZlQm9yZGVyID0gdGhpcy5wcm9wcy5zaG93TmF2SXRlbUJvcmRlciA/ICdpbmFjdGl2ZS1ib3JkZXInIDogJyc7XHJcbiAgICBjb25zdCBib3JkZXJDbGFzcyA9IHRoaXMucHJvcHMuYWN0aXZlS2V5ID49IHRoaXMuc3RhdGUubGFzdFZpc2libGVJdGVtSW5kZXggP1xyXG4gICAgICAnc2VsZWN0ZWQtYm9yZGVyJyA6IGluYWN0aXZlQm9yZGVyO1xyXG4gICAgY29uc3QgYWN0aXZlSXRlbSA9IHRoaXMucHJvcHMubGlzdFt0aGlzLnByb3BzLmFjdGl2ZUtleV07XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8ZGl2XHJcbiAgICAgICAgaWQ9XCJyZXNwb25zaXZlLW5hdmJhci1zZWxlY3RcIlxyXG4gICAgICAgIGNsYXNzTmFtZT17Ym9yZGVyQ2xhc3N9XHJcbiAgICAgICAgc3R5bGU9e3sgZm9udFdlaWdodDogdGhpcy5wcm9wcy5mb250V2VpZ2h0LCBmb250U2l6ZTogdGhpcy5wcm9wcy5mb250U2l6ZSB9fVxyXG4gICAgICA+XHJcbiAgICAgICAgPFNlbGVjdFxyXG4gICAgICAgICAgbmFtZT1cInJlc3BvbnNpdmVOYXZiYXJTZWxlY3RcIlxyXG4gICAgICAgICAgbXVsdGk9e2ZhbHNlfVxyXG4gICAgICAgICAgdmFsdWU9e2FjdGl2ZUl0ZW0gPyBhY3RpdmVJdGVtLmhyZWYgOiAnJ31cclxuICAgICAgICAgIGNsZWFyYWJsZT17ZmFsc2V9XHJcbiAgICAgICAgICBwbGFjZWhvbGRlcj17dGhpcy5wcm9wcy5wbGFjZWhvbGRlcn1cclxuICAgICAgICAgIG9wdGlvbnM9e2l0ZW1zfVxyXG4gICAgICAgICAgb25DaGFuZ2U9eyhpdGVtKSA9PiB7IHRoaXMucHJvcHMub25TZWxlY3QoaXRlbS52YWx1ZSk7IH19XHJcbiAgICAgICAgICBpbnB1dFByb3BzPXt7IGlkOiAnb2NSZXNwb25zaXZlTmF2YmFyU2VsZWN0JyB9fVxyXG4gICAgICAgIC8+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHJlbmRlcigpIHtcclxuICAgIHJldHVybiB0aGlzLm5hdmJhcigpO1xyXG4gIH1cclxufVxyXG5cclxuIl19