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
import { FloatingSelect } from '@opuscapita/react-floating-select';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
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
      updateDimenssions: false,
      lastVisibleItemIndex: -1,
      lastWidth: 0
    }, _this.getMainPartOfId = function () {
      return _this.props.id || 'responsive-navbar';
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
    }, _this.doLineCount = function () {
      var list = _this.props.list;

      return list.some(function (item) {
        return typeof item.name !== 'string';
      });
    }, _this.navbar = function () {
      var list = _this.state.lastVisibleItemIndex >= 0 ? _this.props.list.slice(0, _this.state.lastVisibleItemIndex) : _this.props.list;
      var className = _this.props.showNavItemBorder ? 'responsive-navbar-item inactive-border' : 'responsive-navbar-item no-item-border';
      var items = list.map(function (item, index) {
        return _this.tooltipWrapper(_this.navbarItem(item, index, className), index, item.name);
      });
      var lineCount = _this.doLineCount();
      var navbarStyle = {
        minHeight: _this.props.height
      };
      if (_this.props.height.slice(-2) === 'px' && lineCount) {
        var heightPx = parseInt(_this.props.height.slice(0, -2), 10);
        navbarStyle.lineHeight = heightPx - 4 + 'px';
      }
      return React.createElement(
        'div',
        {
          id: _this.getMainPartOfId() + '-container',
          ref: 'navbarContainer',
          className: 'responsive-navbar-container',
          style: navbarStyle
        },
        items,
        _this.combobox()
      );
    }, _this.combobox = function () {
      var _this$props = _this.props,
          list = _this$props.list,
          onSelect = _this$props.onSelect,
          fontSize = _this$props.fontSize,
          activeKey = _this$props.activeKey,
          fontWeight = _this$props.fontWeight,
          placeholder = _this$props.placeholder,
          showNavItemBorder = _this$props.showNavItemBorder;

      if (_this.state.lastVisibleItemIndex === -1 || _this.state.lastVisibleItemIndex > list.length - 1) {
        // return null if all nav items are visible
        return null;
      }

      // slice nav items list and show invisible items in the combobox
      var navList = _this.state.lastVisibleItemIndex >= 0 ? list.slice(_this.state.lastVisibleItemIndex) : list;
      var items = navList.map(function (item, index) {
        return {
          value: item.href,
          label: item.name,
          id: index,
          ref: 'navitemref' + String(index)
        };
      });
      var lineCountNeeded = _this.doLineCount();
      var customLineCount = lineCountNeeded ? 'line-count' : '';
      var customBorderClass = lineCountNeeded ? 'selected-border line-count' : 'selected-border';
      var customInactiveBorder = lineCountNeeded ? 'inactive-border line-count' : 'inactive-border';
      var inactiveBorder = showNavItemBorder ? customInactiveBorder : customLineCount;
      var borderClass = activeKey >= _this.state.lastVisibleItemIndex ? customBorderClass : inactiveBorder; // eslint-disable-line
      var activeItem = list[activeKey];
      return React.createElement(
        'div',
        {
          id: _this.getMainPartOfId() + '-select',
          className: 'responsive-navbar-select ' + borderClass,
          style: { fontWeight: fontWeight, fontSize: fontSize }
        },
        React.createElement(FloatingSelect, {
          name: 'responsiveNavbarSelect',
          value: activeItem ? activeItem.href : '',
          isClearable: false,
          placeholder: placeholder,
          options: items,
          onChange: function onChange(item) {
            onSelect(item.value);
          },
          inputId: _this.getMainPartOfId() + '-input'
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
    }, this.props.initialUpdateDelay);
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
  id: null,
  onSelect: null,
  showNavItemBorder: false,
  showNavItemTooltip: true,
  tooltipDelay: 2000,
  fontSize: 'inherit',
  fontWeight: 'inherit',
  placeholder: 'more...',
  height: '40px',
  initialUpdateDelay: 200
}, _temp2);
export { ResponsiveNavbar as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yZXNwb25zaXZlLW5hdmJhci5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIlJlYWN0IiwiUHJvcFR5cGVzIiwiUmVhY3RET00iLCJGbG9hdGluZ1NlbGVjdCIsIk92ZXJsYXlUcmlnZ2VyIiwiVG9vbHRpcCIsIlJlc3BvbnNpdmVOYXZiYXIiLCJzdGF0ZSIsInVwZGF0ZURpbWVuc3Npb25zIiwibGFzdFZpc2libGVJdGVtSW5kZXgiLCJsYXN0V2lkdGgiLCJnZXRNYWluUGFydE9mSWQiLCJwcm9wcyIsImlkIiwiaW5kZXhPZkxhc3RWaXNpYmxlTmF2SXRlbSIsImNvbnRhaW5lciIsInJlZnMiLCJuYXZiYXJDb250YWluZXIiLCJjb250YWluZXJXaWR0aCIsImZpbmRET01Ob2RlIiwib2Zmc2V0V2lkdGgiLCJyZW1haW5pbmdXaWR0aCIsImxhc3RWaXNpYmxlIiwiaSIsImxpc3QiLCJsZW5ndGgiLCJpdGVtIiwiU3RyaW5nIiwibm9kZSIsIml0ZW1XaWR0aCIsImhhbmRsZVJlc2l6ZUV2ZW50IiwiZGlmZmVyZW5jZSIsIndpbmRvdyIsImlubmVyV2lkdGgiLCJVUERBVEVfVEhSRVNIT0xEIiwiTWF0aCIsImFicyIsInNldFN0YXRlIiwic2VsZWN0aW9uQ2hhbmdlZCIsInJvdXRlciIsInB1c2giLCJ2YWx1ZSIsInRvb2x0aXBXcmFwcGVyIiwiaW5kZXgiLCJ0b29sdGlwQ29udGVudCIsInRvb2x0aXAiLCJzaG93TmF2SXRlbVRvb2x0aXAiLCJ0b29sdGlwRGVsYXkiLCJuYXZiYXJJdGVtIiwiY2xhc3NOYW1lIiwiYWN0aXZlS2V5IiwiZm9udFdlaWdodCIsImZvbnRTaXplIiwib25TZWxlY3QiLCJocmVmIiwibmFtZSIsImRvTGluZUNvdW50Iiwic29tZSIsIm5hdmJhciIsInNsaWNlIiwic2hvd05hdkl0ZW1Cb3JkZXIiLCJpdGVtcyIsIm1hcCIsImxpbmVDb3VudCIsIm5hdmJhclN0eWxlIiwibWluSGVpZ2h0IiwiaGVpZ2h0IiwiaGVpZ2h0UHgiLCJwYXJzZUludCIsImxpbmVIZWlnaHQiLCJjb21ib2JveCIsInBsYWNlaG9sZGVyIiwibmF2TGlzdCIsImxhYmVsIiwicmVmIiwibGluZUNvdW50TmVlZGVkIiwiY3VzdG9tTGluZUNvdW50IiwiY3VzdG9tQm9yZGVyQ2xhc3MiLCJjdXN0b21JbmFjdGl2ZUJvcmRlciIsImluYWN0aXZlQm9yZGVyIiwiYm9yZGVyQ2xhc3MiLCJhY3RpdmVJdGVtIiwiY29tcG9uZW50RGlkTW91bnQiLCJhZGRFdmVudExpc3RlbmVyIiwic2V0VGltZW91dCIsImluaXRpYWxVcGRhdGVEZWxheSIsImNvbXBvbmVudERpZFVwZGF0ZSIsImNvbXBvbmVudFdpbGxVbm1vdW50IiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsInJlbmRlciIsIlB1cmVDb21wb25lbnQiLCJkZWZhdWx0UHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPQSxLQUFQLE1BQWtCLE9BQWxCO0FBQ0EsT0FBT0MsU0FBUCxNQUFzQixZQUF0QjtBQUNBLE9BQU9DLFFBQVAsTUFBcUIsV0FBckI7QUFDQSxTQUFTQyxjQUFULFFBQStCLG1DQUEvQjtBQUNBLFNBQVNDLGNBQVQsRUFBeUJDLE9BQXpCLFFBQXdDLGlCQUF4QztBQUNBLE9BQU8sMEJBQVA7O0lBRXFCQyxnQjs7Ozs7Ozs7Ozs7O2dLQW1DbkJDLEssR0FBUTtBQUNOQyx5QkFBbUIsS0FEYjtBQUVOQyw0QkFBc0IsQ0FBQyxDQUZqQjtBQUdOQyxpQkFBVztBQUhMLEssUUE4QlJDLGUsR0FBa0I7QUFBQSxhQUFPLE1BQUtDLEtBQUwsQ0FBV0MsRUFBWCxJQUFpQixtQkFBeEI7QUFBQSxLLFFBRWxCQyx5QixHQUE0QixZQUFNO0FBQ2hDLFVBQU1DLFlBQVksTUFBS0MsSUFBTCxDQUFVQyxlQUE1QjtBQUNBLFVBQU1DLGlCQUFpQmhCLFNBQVNpQixXQUFULENBQXFCSixTQUFyQixJQUNyQmIsU0FBU2lCLFdBQVQsQ0FBcUJKLFNBQXJCLEVB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MkJBQW1CLEtBRlA7QUFHWkMsOEJBQXNCLEtBQUtLLHlCQUFMO0FBSFYsT0FBZDtBQUtEO0FBQ0YsRzs7NkJBRUR5RSxvQixtQ0FBdUI7QUFDckJ2RCxXQUFPd0QsbUJBQVAsQ0FBMkIsUUFBM0IsRUFBcUMsS0FBSzFELGlCQUExQztBQUNBRSxXQUFPd0QsbUJBQVAsQ0FBMkIsbUJBQTNCLEVBQWdELEtBQUsxRCxpQkFBckQsRUFGcUIsQ0FFb0Q7QUFDMUUsRzs7NkJBMEpEMkQsTSxxQkFBUztBQUNQLFdBQU8sS0FBSy9CLE1BQUwsRUFBUDtBQUNELEc7OztFQTNOMkMxRCxNQUFNMEYsYSxVQXNCM0NDLFksR0FBZTtBQUNwQjlFLE1BQUksSUFEZ0I7QUFFcEJ3QyxZQUFVLElBRlU7QUFHcEJPLHFCQUFtQixLQUhDO0FBSXBCZCxzQkFBb0IsSUFKQTtBQUtwQkMsZ0JBQWMsSUFMTTtBQU1wQkssWUFBVSxTQU5VO0FBT3BCRCxjQUFZLFNBUFE7QUFRcEJvQixlQUFhLFNBUk87QUFTcEJMLFVBQVEsTUFUWTtBQVVwQm1CLHNCQUFvQjtBQVZBLEM7U0F0QkgvRSxnQiIsImZpbGUiOiJyZXNwb25zaXZlLW5hdmJhci5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSByZWFjdC9uby1hcnJheS1pbmRleC1rZXkgKi9cbi8qIGVzbGludC1kaXNhYmxlIHJlYWN0L25vLXN0cmluZy1yZWZzICovXG4vKiBlc2xpbnQtZGlzYWJsZSByZWFjdC9uby1maW5kLWRvbS1ub2RlICovXG4vKiBlc2xpbnQtZGlzYWJsZSByZWFjdC9wcm9wLXR5cGVzICovXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xuaW1wb3J0IHsgRmxvYXRpbmdTZWxlY3QgfSBmcm9tICdAb3B1c2NhcGl0YS9yZWFjdC1mbG9hdGluZy1zZWxlY3QnO1xuaW1wb3J0IHsgT3ZlcmxheVRyaWdnZXIsIFRvb2x0aXAgfSBmcm9tICdyZWFjdC1ib290c3RyYXAnO1xuaW1wb3J0ICcuL3Jlc3BvbnNpdmUtbmF2YmFyLnNjc3MnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZXNwb25zaXZlTmF2YmFyIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgaWQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgc2hvd05hdkl0ZW1Cb3JkZXI6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dOYXZJdGVtVG9vbHRpcDogUHJvcFR5cGVzLmJvb2wsXG4gICAgdG9vbHRpcERlbGF5OiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIGZvbnRTaXplOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGZvbnRXZWlnaHQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgcGxhY2Vob2xkZXI6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgYWN0aXZlS2V5OiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgbGlzdDogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgIG5hbWU6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgICBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICBQcm9wVHlwZXMubm9kZSxcbiAgICAgIF0pLmlzUmVxdWlyZWQsXG4gICAgICBocmVmOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMubnVtYmVyXSksXG4gICAgfSkpLmlzUmVxdWlyZWQsXG4gICAgb25TZWxlY3Q6IFByb3BUeXBlcy5mdW5jLFxuICAgIGhlaWdodDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBpbml0aWFsVXBkYXRlRGVsYXk6IFByb3BUeXBlcy5udW1iZXIsXG4gIH1cblxuICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgIGlkOiBudWxsLFxuICAgIG9uU2VsZWN0OiBudWxsLFxuICAgIHNob3dOYXZJdGVtQm9yZGVyOiBmYWxzZSxcbiAgICBzaG93TmF2SXRlbVRvb2x0aXA6IHRydWUsXG4gICAgdG9vbHRpcERlbGF5OiAyMDAwLFxuICAgIGZvbnRTaXplOiAnaW5oZXJpdCcsXG4gICAgZm9udFdlaWdodDogJ2luaGVyaXQnLFxuICAgIHBsYWNlaG9sZGVyOiAnbW9yZS4uLicsXG4gICAgaGVpZ2h0OiAnNDBweCcsXG4gICAgaW5pdGlhbFVwZGF0ZURlbGF5OiAyMDAsXG4gIH1cblxuICBzdGF0ZSA9IHtcbiAgICB1cGRhdGVEaW1lbnNzaW9uczogZmFsc2UsXG4gICAgbGFzdFZpc2libGVJdGVtSW5kZXg6IC0xLFxuICAgIGxhc3RXaWR0aDogMCxcbiAgfTtcblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5oYW5kbGVSZXNpemVFdmVudCk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ29yaWVudGF0aW9uY2hhbmdlJywgdGhpcy5oYW5kbGVSZXNpemVFdmVudCk7IC8vIGZvciBtb2JpbGUgc3VwcG9ydFxuICAgIC8vIENvbXBvbmVudCBpcyBub3QgcmVuZGVyZWQgeWV0IGJ5IGJyb3dzZXIgd2hlbiBEaWRNb3VudCBpcyBjYWxsZWRcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuaGFuZGxlUmVzaXplRXZlbnQoKTtcbiAgICB9LCB0aGlzLnByb3BzLmluaXRpYWxVcGRhdGVEZWxheSk7XG4gIH1cblxuICBjb21wb25lbnREaWRVcGRhdGUoKSB7XG4gICAgaWYgKHRoaXMuc3RhdGUudXBkYXRlRGltZW5zc2lvbnMpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIHJlYWN0L25vLWRpZC11cGRhdGUtc2V0LXN0YXRlXG4gICAgICAgIC8vIDJuZCByZW5kZXIgaXMgdHJpZ2dlcmVkIGhlcmUgaW4gcHVycG9zZVxuICAgICAgICB1cGRhdGVEaW1lbnNzaW9uczogZmFsc2UsXG4gICAgICAgIGxhc3RWaXNpYmxlSXRlbUluZGV4OiB0aGlzLmluZGV4T2ZMYXN0VmlzaWJsZU5hdkl0ZW0oKSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLmhhbmRsZVJlc2l6ZUV2ZW50KTtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignb3JpZW50YXRpb25jaGFuZ2UnLCB0aGlzLmhhbmRsZVJlc2l6ZUV2ZW50KTsgLy8gZm9yIG1vYmlsZSBzdXBwb3J0XG4gIH1cblxuICBnZXRNYWluUGFydE9mSWQgPSAoKSA9PiAodGhpcy5wcm9wcy5pZCB8fCAncmVzcG9uc2l2ZS1uYXZiYXInKTtcblxuICBpbmRleE9mTGFzdFZpc2libGVOYXZJdGVtID0gKCkgPT4ge1xuICAgIGNvbnN0IGNvbnRhaW5lciA9IHRoaXMucmVmcy5uYXZiYXJDb250YWluZXI7XG4gICAgY29uc3QgY29udGFpbmVyV2lkdGggPSBSZWFjdERPTS5maW5kRE9NTm9kZShjb250YWluZXIpID9cbiAgICAgIFJlYWN0RE9NLmZpbmRET01Ob2RlKGNvbnRhaW5lcikub2Zmc2V0V2lkdGggOiAwO1xuXG4gICAgbGV0IHJlbWFpbmluZ1dpZHRoID0gY29udGFpbmVyV2lkdGggLSAxOTU7XG5cbiAgICBsZXQgbGFzdFZpc2libGUgPSAxO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5wcm9wcy5saXN0Lmxlbmd0aCAtIDE7IGkgKz0gMSkge1xuICAgICAgY29uc3QgaXRlbSA9IHRoaXMucmVmc1tgbmF2aXRlbXJlZiR7U3RyaW5nKGkpfWBdO1xuICAgICAgY29uc3Qgbm9kZSA9IFJlYWN0RE9NLmZpbmRET01Ob2RlKGl0ZW0pO1xuICAgICAgaWYgKCFub2RlKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY29uc3QgaXRlbVdpZHRoID0gbm9kZS5vZmZzZXRXaWR0aDtcbiAgICAgIHJlbWFpbmluZ1dpZHRoIC09IGl0ZW1XaWR0aDtcbiAgICAgIGlmIChyZW1haW5pbmdXaWR0aCA8IDApIHtcbiAgICAgICAgbGFzdFZpc2libGUgLT0gMTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBsYXN0VmlzaWJsZSArPSAxO1xuICAgIH1cblxuICAgIHJldHVybiBsYXN0VmlzaWJsZTtcbiAgfVxuXG4gIGhhbmRsZVJlc2l6ZUV2ZW50ID0gKCkgPT4ge1xuICAgIGNvbnN0IGRpZmZlcmVuY2UgPSB3aW5kb3cuaW5uZXJXaWR0aCAtIHRoaXMuc3RhdGUubGFzdFdpZHRoO1xuICAgIGNvbnN0IFVQREFURV9USFJFU0hPTEQgPSA1MDtcbiAgICBpZiAoTWF0aC5hYnMoZGlmZmVyZW5jZSkgPiBVUERBVEVfVEhSRVNIT0xEKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgdXBkYXRlRGltZW5zc2lvbnM6IHRydWUsXG4gICAgICAgIGxhc3RXaWR0aDogd2luZG93LmlubmVyV2lkdGgsXG4gICAgICB9KTtcbiAgICB9XG4gIH1cbiAgc2VsZWN0aW9uQ2hhbmdlZCA9IChpdGVtKSA9PiB7XG4gICAgdGhpcy5wcm9wcy5yb3V0ZXIucHVzaChpdGVtLnZhbHVlKTtcbiAgfVxuXG4gIHRvb2x0aXBXcmFwcGVyID0gKG5vZGUsIGluZGV4LCB0b29sdGlwQ29udGVudCkgPT4ge1xuICAgIGNvbnN0IHRvb2x0aXAgPSA8VG9vbHRpcCBpZD1cInRvb2x0aXBcIj57dG9vbHRpcENvbnRlbnR9PC9Ub29sdGlwPjtcbiAgICByZXR1cm4gIXRoaXMucHJvcHMuc2hvd05hdkl0ZW1Ub29sdGlwID8gbm9kZSA6XG4gICAgPE92ZXJsYXlUcmlnZ2VyIHBsYWNlbWVudD1cImJvdHRvbVwiIGtleT17aW5kZXh9IG92ZXJsYXk9e3Rvb2x0aXB9IGRlbGF5U2hvdz17dGhpcy5wcm9wcy50b29sdGlwRGVsYXl9PlxuICAgICAge25vZGV9XG4gICAgPC9PdmVybGF5VHJpZ2dlcj47XG4gIH1cblxuICBuYXZiYXJJdGVtID0gKGl0ZW0sIGluZGV4LCBjbGFzc05hbWUpID0+IChcbiAgICA8YnV0dG9uXG4gICAgICBjbGFzc05hbWU9e2luZGV4ID09PSB0aGlzLnByb3BzLmFjdGl2ZUtleSAmJlxuICAgICAgICBpbmRleCA8PSB0aGlzLnN0YXRlLmxhc3RWaXNpYmxlSXRlbUluZGV4ID9cbiAgICAgICAgYCR7Y2xhc3NOYW1lfSBzZWxlY3RlZC1ib3JkZXJgIDogYCR7Y2xhc3NOYW1lfWB9XG4gICAgICBzdHlsZT17eyBmb250V2VpZ2h0OiB0aGlzLnByb3BzLmZvbnRXZWlnaHQsIGZvbnRTaXplOiB0aGlzLnByb3BzLmZvbnRTaXplIH19XG4gICAgICBpZD17aXRlbS5pZCB8fCBgbmF2aXRlbXJlZiR7U3RyaW5nKGluZGV4KX1gfVxuICAgICAga2V5PXtpdGVtLmlkIHx8IGBuYXZpdGVtcmVmJHtTdHJpbmcoaW5kZXgpfWB9XG4gICAgICByZWY9e2BuYXZpdGVtcmVmJHtTdHJpbmcoaW5kZXgpfWB9XG4gICAgICBvbkNsaWNrPXsoKSA9PiB7IHRoaXMucHJvcHMub25TZWxlY3QoaXRlbS5ocmVmKTsgfX1cbiAgICA+XG4gICAgICA8c3BhbiBjbGFzc05hbWU9XCJyZXNwb25zaXZlLW5hdmJhci1pdGVtLXRleHRcIj57aXRlbS5uYW1lfTwvc3Bhbj5cbiAgICA8L2J1dHRvbj5cbiAgKVxuXG4gIGRvTGluZUNvdW50ID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgbGlzdCB9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gbGlzdC5zb21lKGl0ZW0gPT4gdHlwZW9mIChpdGVtLm5hbWUpICE9PSAnc3RyaW5nJyk7XG4gIH1cblxuICBuYXZiYXIgPSAoKSA9PiB7XG4gICAgY29uc3QgbGlzdCA9IHRoaXMuc3RhdGUubGFzdFZpc2libGVJdGVtSW5kZXggPj0gMCA/XG4gICAgICB0aGlzLnByb3BzLmxpc3Quc2xpY2UoMCwgdGhpcy5zdGF0ZS5sYXN0VmlzaWJsZUl0ZW1JbmRleClcbiAgICAgIDogdGhpcy5wcm9wcy5saXN0O1xuICAgIGNvbnN0IGNsYXNzTmFtZSA9IHRoaXMucHJvcHMuc2hvd05hdkl0ZW1Cb3JkZXIgP1xuICAgICAgJ3Jlc3BvbnNpdmUtbmF2YmFyLWl0ZW0gaW5hY3RpdmUtYm9yZGVyJyA6ICdyZXNwb25zaXZlLW5hdmJhci1pdGVtIG5vLWl0ZW0tYm9yZGVyJztcbiAgICBjb25zdCBpdGVtcyA9IGxpc3QubWFwKChpdGVtLCBpbmRleCkgPT4gKFxuICAgICAgdGhpcy50b29sdGlwV3JhcHBlcih0aGlzLm5hdmJhckl0ZW0oaXRlbSwgaW5kZXgsIGNsYXNzTmFtZSksIGluZGV4LCBpdGVtLm5hbWUpXG4gICAgKSk7XG4gICAgY29uc3QgbGluZUNvdW50ID0gdGhpcy5kb0xpbmVDb3VudCgpO1xuICAgIGNvbnN0IG5hdmJhclN0eWxlID0ge1xuICAgICAgbWluSGVpZ2h0OiB0aGlzLnByb3BzLmhlaWdodCxcbiAgICB9O1xuICAgIGlmICh0aGlzLnByb3BzLmhlaWdodC5zbGljZSgtMikgPT09ICdweCcgJiYgbGluZUNvdW50KSB7XG4gICAgICBjb25zdCBoZWlnaHRQeCA9IHBhcnNlSW50KHRoaXMucHJvcHMuaGVpZ2h0LnNsaWNlKDAsIC0yKSwgMTApO1xuICAgICAgbmF2YmFyU3R5bGUubGluZUhlaWdodCA9IGAkeyhoZWlnaHRQeCAtIDQpfXB4YDtcbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXZcbiAgICAgICAgaWQ9e2Ake3RoaXMuZ2V0TWFpblBhcnRPZklkKCl9LWNvbnRhaW5lcmB9XG4gICAgICAgIHJlZj1cIm5hdmJhckNvbnRhaW5lclwiXG4gICAgICAgIGNsYXNzTmFtZT1cInJlc3BvbnNpdmUtbmF2YmFyLWNvbnRhaW5lclwiXG4gICAgICAgIHN0eWxlPXtuYXZiYXJTdHlsZX1cbiAgICAgID5cbiAgICAgICAge2l0ZW1zfVxuICAgICAgICB7dGhpcy5jb21ib2JveCgpfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxuXG4gIGNvbWJvYm94ID0gKCkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIGxpc3QsXG4gICAgICBvblNlbGVjdCxcbiAgICAgIGZvbnRTaXplLFxuICAgICAgYWN0aXZlS2V5LFxuICAgICAgZm9udFdlaWdodCxcbiAgICAgIHBsYWNlaG9sZGVyLFxuICAgICAgc2hvd05hdkl0ZW1Cb3JkZXIsXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKHRoaXMuc3RhdGUubGFzdFZpc2libGVJdGVtSW5kZXggPT09IC0xIHx8XG4gICAgICAgIHRoaXMuc3RhdGUubGFzdFZpc2libGVJdGVtSW5kZXggPiBsaXN0Lmxlbmd0aCAtIDEpIHtcbiAgICAgIC8vIHJldHVybiBudWxsIGlmIGFsbCBuYXYgaXRlbXMgYXJlIHZpc2libGVcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIC8vIHNsaWNlIG5hdiBpdGVtcyBsaXN0IGFuZCBzaG93IGludmlzaWJsZSBpdGVtcyBpbiB0aGUgY29tYm9ib3hcbiAgICBjb25zdCBuYXZMaXN0ID0gdGhpcy5zdGF0ZS5sYXN0VmlzaWJsZUl0ZW1JbmRleCA+PSAwID9cbiAgICAgIGxpc3Quc2xpY2UodGhpcy5zdGF0ZS5sYXN0VmlzaWJsZUl0ZW1JbmRleCkgOiBsaXN0O1xuICAgIGNvbnN0IGl0ZW1zID0gbmF2TGlzdC5tYXAoKGl0ZW0sIGluZGV4KSA9PlxuICAgICAgKHtcbiAgICAgICAgdmFsdWU6IGl0ZW0uaHJlZixcbiAgICAgICAgbGFiZWw6IGl0ZW0ubmFtZSxcbiAgICAgICAgaWQ6IGluZGV4LFxuICAgICAgICByZWY6IGBuYXZpdGVtcmVmJHtTdHJpbmcoaW5kZXgpfWAsXG4gICAgICB9KSk7XG4gICAgY29uc3QgbGluZUNvdW50TmVlZGVkID0gdGhpcy5kb0xpbmVDb3VudCgpO1xuICAgIGNvbnN0IGN1c3RvbUxpbmVDb3VudCA9IGxpbmVDb3VudE5lZWRlZCA/ICdsaW5lLWNvdW50JyA6ICcnO1xuICAgIGNvbnN0IGN1c3RvbUJvcmRlckNsYXNzID0gbGluZUNvdW50TmVlZGVkID8gJ3NlbGVjdGVkLWJvcmRlciBsaW5lLWNvdW50JyA6ICdzZWxlY3RlZC1ib3JkZXInO1xuICAgIGNvbnN0IGN1c3RvbUluYWN0aXZlQm9yZGVyID0gbGluZUNvdW50TmVlZGVkID8gJ2luYWN0aXZlLWJvcmRlciBsaW5lLWNvdW50JyA6ICdpbmFjdGl2ZS1ib3JkZXInO1xuICAgIGNvbnN0IGluYWN0aXZlQm9yZGVyID0gc2hvd05hdkl0ZW1Cb3JkZXIgPyBjdXN0b21JbmFjdGl2ZUJvcmRlciA6IGN1c3RvbUxpbmVDb3VudDtcbiAgICBjb25zdCBib3JkZXJDbGFzcyA9IGFjdGl2ZUtleSA+PSB0aGlzLnN0YXRlLmxhc3RWaXNpYmxlSXRlbUluZGV4ID8gY3VzdG9tQm9yZGVyQ2xhc3MgOiBpbmFjdGl2ZUJvcmRlcjsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgIGNvbnN0IGFjdGl2ZUl0ZW0gPSBsaXN0W2FjdGl2ZUtleV07XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXZcbiAgICAgICAgaWQ9e2Ake3RoaXMuZ2V0TWFpblBhcnRPZklkKCl9LXNlbGVjdGB9XG4gICAgICAgIGNsYXNzTmFtZT17YHJlc3BvbnNpdmUtbmF2YmFyLXNlbGVjdCAke2JvcmRlckNsYXNzfWB9XG4gICAgICAgIHN0eWxlPXt7IGZvbnRXZWlnaHQsIGZvbnRTaXplIH19XG4gICAgICA+XG4gICAgICAgIDxGbG9hdGluZ1NlbGVjdFxuICAgICAgICAgIG5hbWU9XCJyZXNwb25zaXZlTmF2YmFyU2VsZWN0XCJcbiAgICAgICAgICB2YWx1ZT17YWN0aXZlSXRlbSA/IGFjdGl2ZUl0ZW0uaHJlZiA6ICcnfVxuICAgICAgICAgIGlzQ2xlYXJhYmxlPXtmYWxzZX1cbiAgICAgICAgICBwbGFjZWhvbGRlcj17cGxhY2Vob2xkZXJ9XG4gICAgICAgICAgb3B0aW9ucz17aXRlbXN9XG4gICAgICAgICAgb25DaGFuZ2U9eyhpdGVtKSA9PiB7IG9uU2VsZWN0KGl0ZW0udmFsdWUpOyB9fVxuICAgICAgICAgIGlucHV0SWQ9e2Ake3RoaXMuZ2V0TWFpblBhcnRPZklkKCl9LWlucHV0YH1cbiAgICAgICAgLz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMubmF2YmFyKCk7XG4gIH1cbn1cbiJdfQ==