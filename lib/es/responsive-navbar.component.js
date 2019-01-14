var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* eslint-disable react/no-find-dom-node */
import React from 'react';
import PropTypes from 'prop-types';
import { FloatingSelect } from '@opuscapita/react-floating-select';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { debounce } from 'debounce';

import './responsive-navbar.scss';

var ResponsiveNavbar = (_temp = _class = function (_React$PureComponent) {
  _inherits(ResponsiveNavbar, _React$PureComponent);

  function ResponsiveNavbar(props) {
    _classCallCheck(this, ResponsiveNavbar);

    var _this = _possibleConstructorReturn(this, _React$PureComponent.call(this, props));

    _this.state = {
      isSelectVisible: false,
      lastVisibleItemIndex: -2
    };

    _this.getLastVisibleItemIndex = function () {
      var navBarWidth = _this.navbarContainerRef ? _this.navbarContainerRef.offsetWidth : 0;
      var selectWidth = _this.selectContainerRef ? _this.selectContainerRef.offsetWidth : 0;
      var componentLeftWidth = _this.componentLeftContainerRef ? _this.componentLeftContainerRef.offsetWidth : 0; // eslint-disable-line
      var componentRightWidth = _this.componentRightContainerRef ? _this.componentRightContainerRef.offsetWidth : 0; // eslint-disable-line

      var remainingWidth = navBarWidth - selectWidth - componentLeftWidth - componentRightWidth;
      var lastVisible = 0;

      for (var i = 0; i < _this.props.list.length; i += 1) {
        remainingWidth -= _this.itemWidths[i];
        if (remainingWidth < 0) {
          lastVisible -= 1;
          break;
        }
        lastVisible += 1;
      }

      return lastVisible;
    };

    _this.refreshLastVisibleItem = function () {
      var lastVisibleItemIndex = _this.getLastVisibleItemIndex();
      if (_this.state.lastVisibleItemIndex !== lastVisibleItemIndex) {
        _this.setState({
          isSelectVisible: _this.props.list.length > lastVisibleItemIndex + 1,
          lastVisibleItemIndex: lastVisibleItemIndex
        });
      }
    };

    _this.tooltipWrapper = function (node, index, tooltipContent) {
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
    };

    _this.handleOnChange = function (_ref) {
      var value = _ref.value;

      _this.props.onSelect(value);
    };

    _this.handleOnClick = function (href) {
      return function () {
        _this.props.onSelect(href);
      };
    };

    _this.navbarItem = function (item, index, className) {
      var _this$props = _this.props,
          activeKey = _this$props.activeKey,
          fontWeight = _this$props.fontWeight,
          fontSize = _this$props.fontSize,
          height = _this$props.height;

      return React.createElement(
        'button',
        {
          className: index === activeKey ? className + ' selected-border' : '' + className,
          style: { fontWeight: fontWeight, fontSize: fontSize, minHeight: height },
          id: item.id || 'navItem' + String(index),
          key: item.id || 'navitem' + String(index),
          onClick: _this.handleOnClick(item.href),
          ref: function ref(r) {
            if (r && !_this.itemWidths[index]) _this.itemWidths[index] = r.offsetWidth;
          }
        },
        React.createElement(
          'span',
          { className: 'responsive-navbar-item-text' },
          item.name
        )
      );
    };

    _this.doLineCount = function () {
      var list = _this.props.list;

      return list.some(function (item) {
        return typeof item.name !== 'string';
      });
    };

    _this.navbar = function () {
      var _this$props2 = _this.props,
          id = _this$props2.id,
          className = _this$props2.className,
          list = _this$props2.list,
          showNavItemBorder = _this$props2.showNavItemBorder,
          height = _this$props2.height;

      var visibleList = _this.state.lastVisibleItemIndex > -2 ? list.slice(0, _this.state.lastVisibleItemIndex + 1) : list;
      var itemClassName = showNavItemBorder ? 'responsive-navbar-item inactive-border' : 'responsive-navbar-item no-item-border';
      var items = visibleList.map(function (item, index) {
        return _this.tooltipWrapper(_this.navbarItem(item, index, itemClassName), index, item.name);
      });
      var lineCount = _this.doLineCount();
      var navbarStyle = {
        minHeight: height
      };
      if (height.slice(-2) === 'px' && lineCount) {
        var heightPx = parseInt(height.slice(0, -2), 10);
        navbarStyle.lineHeight = heightPx - 4 + 'px';
      }
      return React.createElement(
        'div',
        {
          id: id + '-container',
          ref: function ref(r) {
            _this.navbarContainerRef = r;
          },
          className: 'responsive-navbar-container ' + className,
          style: navbarStyle
        },
        items,
        _this.combobox(),
        _this.componentLeft(),
        _this.componentRight()
      );
    };

    _this.combobox = function () {
      var _this$props3 = _this.props,
          id = _this$props3.id,
          list = _this$props3.list,
          fontSize = _this$props3.fontSize,
          activeKey = _this$props3.activeKey,
          fontWeight = _this$props3.fontWeight,
          placeholder = _this$props3.placeholder,
          showNavItemBorder = _this$props3.showNavItemBorder;

      if (!_this.state.isSelectVisible) {
        // return null if all nav items are visible
        return null;
      }

      // slice nav items list and show invisible items in the combobox
      var navList = _this.state.lastVisibleItemIndex > -2 ? list.slice(_this.state.lastVisibleItemIndex + 1) : list;
      var selectOptions = navList.map(function (item) {
        return {
          value: item.href,
          label: item.name
        };
      });
      var lineCountNeeded = _this.doLineCount();
      var customLineCount = lineCountNeeded ? 'line-count' : '';
      var customBorderClass = lineCountNeeded ? 'selected-border line-count' : 'selected-border';
      var customInactiveBorder = lineCountNeeded ? 'inactive-border line-count' : 'inactive-border';
      var inactiveBorder = showNavItemBorder ? customInactiveBorder : customLineCount;
      var borderClass = activeKey >= _this.state.lastVisibleItemIndex + 1 ? customBorderClass : inactiveBorder; // eslint-disable-line
      var activeItem = list[activeKey];
      return React.createElement(
        'div',
        {
          id: id + '-select',
          className: 'responsive-navbar-select ' + borderClass,
          style: { fontWeight: fontWeight, fontSize: fontSize },
          ref: function ref(r) {
            _this.selectContainerRef = r;
          }
        },
        React.createElement(FloatingSelect, {
          name: id + '-select-component',
          value: activeItem ? activeItem.href : '',
          isClearable: false,
          placeholder: placeholder,
          options: selectOptions,
          onChange: _this.handleOnChange
        })
      );
    };

    _this.componentLeft = function () {
      var componentLeft = _this.props.componentLeft;

      if (!componentLeft) return null;
      return React.createElement(
        'div',
        {
          className: 'responsive-navbar-container-left',
          ref: function ref(r) {
            _this.componentLeftContainerRef = r;
          }
        },
        componentLeft
      );
    };

    _this.componentRight = function () {
      var componentRight = _this.props.componentRight;

      if (!componentRight) return null;
      return React.createElement(
        'div',
        {
          className: 'responsive-navbar-container-right',
          ref: function ref(r) {
            _this.componentRightContainerRef = r;
          }
        },
        componentRight
      );
    };

    _this.itemWidths = []; // store item widths here, they don't change
    return _this;
  }

  ResponsiveNavbar.prototype.componentDidMount = function componentDidMount() {
    window.addEventListener('resize', debounce(this.refreshLastVisibleItem));
    window.addEventListener('orientationchange', this.refreshLastVisibleItem); // for mobile support
    this.refreshLastVisibleItem();
  };

  ResponsiveNavbar.prototype.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
    // Refresh visible items if values change
    if (this.state.isSelectVisible !== prevState.isSelectVisible || this.state.lastVisibleItemIndex !== prevState.lastVisibleItemIndex) {
      this.refreshLastVisibleItem();
    }
  };

  ResponsiveNavbar.prototype.componentWillUnmount = function componentWillUnmount() {
    window.removeEventListener('resize', debounce(this.refreshLastVisibleItem));
    window.removeEventListener('orientationchange', this.refreshLastVisibleItem); // for mobile support
  };

  // Handle react-select onChange


  // Handle navbar onClick


  // Render navbar item


  // Render navbar


  // Render combobox, when all items do not fit


  // Render custom left side component


  // Render custom right side component


  ResponsiveNavbar.prototype.render = function render() {
    return this.navbar();
  };

  return ResponsiveNavbar;
}(React.PureComponent), _class.defaultProps = {
  id: 'responsive-navbar',
  className: '',
  onSelect: function onSelect() {},
  showNavItemBorder: false,
  showNavItemTooltip: true,
  tooltipDelay: 2000,
  fontSize: 'inherit',
  fontWeight: 'inherit',
  placeholder: 'more...',
  height: '40px',
  componentLeft: null,
  componentRight: null
}, _temp);
export { ResponsiveNavbar as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yZXNwb25zaXZlLW5hdmJhci5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIlJlYWN0IiwiUHJvcFR5cGVzIiwiRmxvYXRpbmdTZWxlY3QiLCJPdmVybGF5VHJpZ2dlciIsIlRvb2x0aXAiLCJkZWJvdW5jZSIsIlJlc3BvbnNpdmVOYXZiYXIiLCJwcm9wcyIsInN0YXRlIiwiaXNTZWxlY3RWaXNpYmxlIiwibGFzdFZpc2libGVJdGVtSW5kZXgiLCJnZXRMYXN0VmlzaWJsZUl0ZW1JbmRleCIsIm5hdkJhcldpZHRoIiwibmF2YmFyQ29udGFpbmVyUmVmIiwib2Zmc2V0V2lkdGgiLCJzZWxlY3RXaWR0aCIsInNlbGVjdENvbnRhaW5lclJlZiIsImNvbXBvbmVudExlZnRXaWR0aCIsImNvbXBvbmVudExlZnRDb250YWluZXJSZWYiLCJjb21wb25lbnRSaWdodFdpZHRoIiwiY29tcG9uZW50UmlnaHRDb250YWluZXJSZWYiLCJyZW1haW5pbmdXaWR0aCIsImxhc3RWaXNpYmxlIiwiaSIsImxpc3QiLCJsZW5ndGgiLCJpdGVtV2lkdGhzIiwicmVmcmVzaExhc3RWaXNpYmxlSXRlbSIsInNldFN0YXRlIiwidG9vbHRpcFdyYXBwZXIiLCJub2RlIiwiaW5kZXgiLCJ0b29sdGlwQ29udGVudCIsInRvb2x0aXAiLCJzaG93TmF2SXRlbVRvb2x0aXAiLCJ0b29sdGlwRGVsYXkiLCJoYW5kbGVPbkNoYW5nZSIsInZhbHVlIiwib25TZWxlY3QiLCJoYW5kbGVPbkNsaWNrIiwiaHJlZiIsIm5hdmJhckl0ZW0iLCJpdGVtIiwiY2xhc3NOYW1lIiwiYWN0aXZlS2V5IiwiZm9udFdlaWdodCIsImZvbnRTaXplIiwiaGVpZ2h0IiwibWluSGVpZ2h0IiwiaWQiLCJTdHJpbmciLCJyIiwibmFtZSIsImRvTGluZUNvdW50Iiwic29tZSIsIm5hdmJhciIsInNob3dOYXZJdGVtQm9yZGVyIiwidmlzaWJsZUxpc3QiLCJzbGljZSIsIml0ZW1DbGFzc05hbWUiLCJpdGVtcyIsIm1hcCIsImxpbmVDb3VudCIsIm5hdmJhclN0eWxlIiwiaGVpZ2h0UHgiLCJwYXJzZUludCIsImxpbmVIZWlnaHQiLCJjb21ib2JveCIsImNvbXBvbmVudExlZnQiLCJjb21wb25lbnRSaWdodCIsInBsYWNlaG9sZGVyIiwibmF2TGlzdCIsInNlbGVjdE9wdGlvbnMiLCJsYWJlbCIsImxpbmVDb3VudE5lZWRlZCIsImN1c3RvbUxpbmVDb3VudCIsImN1c3RvbUJvcmRlckNsYXNzIiwiY3VzdG9tSW5hY3RpdmVCb3JkZXIiLCJpbmFjdGl2ZUJvcmRlciIsImJvcmRlckNsYXNzIiwiYWN0aXZlSXRlbSIsImNvbXBvbmVudERpZE1vdW50Iiwid2luZG93IiwiYWRkRXZlbnRMaXN0ZW5lciIsImNvbXBvbmVudERpZFVwZGF0ZSIsInByZXZQcm9wcyIsInByZXZTdGF0ZSIsImNvbXBvbmVudFdpbGxVbm1vdW50IiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsInJlbmRlciIsIlB1cmVDb21wb25lbnQiLCJkZWZhdWx0UHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7QUFDQSxPQUFPQSxLQUFQLE1BQWtCLE9BQWxCO0FBQ0EsT0FBT0MsU0FBUCxNQUFzQixZQUF0QjtBQUNBLFNBQVNDLGNBQVQsUUFBK0IsbUNBQS9CO0FBQ0EsU0FBU0MsY0FBVCxFQUF5QkMsT0FBekIsUUFBd0MsaUJBQXhDO0FBQ0EsU0FBU0MsUUFBVCxRQUF5QixVQUF6Qjs7QUFFQSxPQUFPLDBCQUFQOztJQUVxQkMsZ0I7OztBQXVDbkIsNEJBQVlDLEtBQVosRUFBbUI7QUFBQTs7QUFBQSxpREFDakIsZ0NBQU1BLEtBQU4sQ0FEaUI7O0FBQUEsVUFLbkJDLEtBTG1CLEdBS1g7QUFDTkMsdUJBQWlCLEtBRFg7QUFFTkMsNEJBQXNCLENBQUM7QUFGakIsS0FMVzs7QUFBQSxVQStCbkJDLHVCQS9CbUIsR0ErQk8sWUFBTTtBQUM5QixVQUFNQyxjQUFjLE1BQUtDLGtCQUFMLEdBQTBCLE1BQUtBLGtCQUFMLENBQXdCQyxXQUFsRCxH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Ozs2QkFFRHlELGtCLCtCQUFtQkMsUyxFQUFXQyxTLEVBQVc7QUFDdkM7QUFDQSxRQUNFLEtBQUs5RSxLQUFMLENBQVdDLGVBQVgsS0FBK0I2RSxVQUFVN0UsZUFBekMsSUFDQSxLQUFLRCxLQUFMLENBQVdFLG9CQUFYLEtBQW9DNEUsVUFBVTVFLG9CQUZoRCxFQUdFO0FBQ0EsV0FBS2lCLHNCQUFMO0FBQ0Q7QUFDRixHOzs2QkFFRDRELG9CLG1DQUF1QjtBQUNyQkwsV0FBT00sbUJBQVAsQ0FBMkIsUUFBM0IsRUFBcUNuRixTQUFTLEtBQUtzQixzQkFBZCxDQUFyQztBQUNBdUQsV0FBT00sbUJBQVAsQ0FBMkIsbUJBQTNCLEVBQWdELEtBQUs3RCxzQkFBckQsRUFGcUIsQ0FFeUQ7QUFDL0UsRzs7QUF5Q0Q7OztBQUtBOzs7QUFLQTs7O0FBNkJBOzs7QUF5Q0E7OztBQWlEQTs7O0FBY0E7Ozs2QkFjQThELE0scUJBQVM7QUFDUCxXQUFPLEtBQUtsQyxNQUFMLEVBQVA7QUFDRCxHOzs7RUE1UTJDdkQsTUFBTTBGLGEsVUF3QjNDQyxZLEdBQWU7QUFDcEIxQyxNQUFJLG1CQURnQjtBQUVwQk4sYUFBVyxFQUZTO0FBR3BCTCxZQUFVLG9CQUFNLENBQUUsQ0FIRTtBQUlwQmtCLHFCQUFtQixLQUpDO0FBS3BCdEIsc0JBQW9CLElBTEE7QUFNcEJDLGdCQUFjLElBTk07QUFPcEJXLFlBQVUsU0FQVTtBQVFwQkQsY0FBWSxTQVJRO0FBU3BCeUIsZUFBYSxTQVRPO0FBVXBCdkIsVUFBUSxNQVZZO0FBV3BCcUIsaUJBQWUsSUFYSztBQVlwQkMsa0JBQWdCO0FBWkksQztTQXhCSC9ELGdCIiwiZmlsZSI6InJlc3BvbnNpdmUtbmF2YmFyLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIHJlYWN0L25vLWZpbmQtZG9tLW5vZGUgKi9cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgRmxvYXRpbmdTZWxlY3QgfSBmcm9tICdAb3B1c2NhcGl0YS9yZWFjdC1mbG9hdGluZy1zZWxlY3QnO1xuaW1wb3J0IHsgT3ZlcmxheVRyaWdnZXIsIFRvb2x0aXAgfSBmcm9tICdyZWFjdC1ib290c3RyYXAnO1xuaW1wb3J0IHsgZGVib3VuY2UgfSBmcm9tICdkZWJvdW5jZSc7XG5cbmltcG9ydCAnLi9yZXNwb25zaXZlLW5hdmJhci5zY3NzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVzcG9uc2l2ZU5hdmJhciBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIGlkOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGNsYXNzTmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBzaG93TmF2SXRlbUJvcmRlcjogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd05hdkl0ZW1Ub29sdGlwOiBQcm9wVHlwZXMuYm9vbCxcbiAgICB0b29sdGlwRGVsYXk6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgZm9udFNpemU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgZm9udFdlaWdodDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBwbGFjZWhvbGRlcjogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBhY3RpdmVLZXk6IFByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcbiAgICBsaXN0OiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgbmFtZTogUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICAgIFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgIFByb3BUeXBlcy5ub2RlLFxuICAgICAgXSkuaXNSZXF1aXJlZCxcbiAgICAgIGhyZWY6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5udW1iZXJdKSxcbiAgICB9KSkuaXNSZXF1aXJlZCxcbiAgICBvblNlbGVjdDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgaGVpZ2h0OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGNvbXBvbmVudExlZnQ6IFByb3BUeXBlcy5ub2RlLFxuICAgIGNvbXBvbmVudFJpZ2h0OiBQcm9wVHlwZXMubm9kZSxcbiAgfVxuXG4gIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgaWQ6ICdyZXNwb25zaXZlLW5hdmJhcicsXG4gICAgY2xhc3NOYW1lOiAnJyxcbiAgICBvblNlbGVjdDogKCkgPT4ge30sXG4gICAgc2hvd05hdkl0ZW1Cb3JkZXI6IGZhbHNlLFxuICAgIHNob3dOYXZJdGVtVG9vbHRpcDogdHJ1ZSxcbiAgICB0b29sdGlwRGVsYXk6IDIwMDAsXG4gICAgZm9udFNpemU6ICdpbmhlcml0JyxcbiAgICBmb250V2VpZ2h0OiAnaW5oZXJpdCcsXG4gICAgcGxhY2Vob2xkZXI6ICdtb3JlLi4uJyxcbiAgICBoZWlnaHQ6ICc0MHB4JyxcbiAgICBjb21wb25lbnRMZWZ0OiBudWxsLFxuICAgIGNvbXBvbmVudFJpZ2h0OiBudWxsLFxuICB9XG5cbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5pdGVtV2lkdGhzID0gW107IC8vIHN0b3JlIGl0ZW0gd2lkdGhzIGhlcmUsIHRoZXkgZG9uJ3QgY2hhbmdlXG4gIH1cblxuICBzdGF0ZSA9IHtcbiAgICBpc1NlbGVjdFZpc2libGU6IGZhbHNlLFxuICAgIGxhc3RWaXNpYmxlSXRlbUluZGV4OiAtMixcbiAgfTtcblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgZGVib3VuY2UodGhpcy5yZWZyZXNoTGFzdFZpc2libGVJdGVtKSk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ29yaWVudGF0aW9uY2hhbmdlJywgdGhpcy5yZWZyZXNoTGFzdFZpc2libGVJdGVtKTsgLy8gZm9yIG1vYmlsZSBzdXBwb3J0XG4gICAgdGhpcy5yZWZyZXNoTGFzdFZpc2libGVJdGVtKCk7XG4gIH1cblxuICBjb21wb25lbnREaWRVcGRhdGUocHJldlByb3BzLCBwcmV2U3RhdGUpIHtcbiAgICAvLyBSZWZyZXNoIHZpc2libGUgaXRlbXMgaWYgdmFsdWVzIGNoYW5nZVxuICAgIGlmIChcbiAgICAgIHRoaXMuc3RhdGUuaXNTZWxlY3RWaXNpYmxlICE9PSBwcmV2U3RhdGUuaXNTZWxlY3RWaXNpYmxlIHx8XG4gICAgICB0aGlzLnN0YXRlLmxhc3RWaXNpYmxlSXRlbUluZGV4ICE9PSBwcmV2U3RhdGUubGFzdFZpc2libGVJdGVtSW5kZXhcbiAgICApIHtcbiAgICAgIHRoaXMucmVmcmVzaExhc3RWaXNpYmxlSXRlbSgpO1xuICAgIH1cbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCBkZWJvdW5jZSh0aGlzLnJlZnJlc2hMYXN0VmlzaWJsZUl0ZW0pKTtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignb3JpZW50YXRpb25jaGFuZ2UnLCB0aGlzLnJlZnJlc2hMYXN0VmlzaWJsZUl0ZW0pOyAvLyBmb3IgbW9iaWxlIHN1cHBvcnRcbiAgfVxuXG4gIGdldExhc3RWaXNpYmxlSXRlbUluZGV4ID0gKCkgPT4ge1xuICAgIGNvbnN0IG5hdkJhcldpZHRoID0gdGhpcy5uYXZiYXJDb250YWluZXJSZWYgPyB0aGlzLm5hdmJhckNvbnRhaW5lclJlZi5vZmZzZXRXaWR0aCA6IDA7XG4gICAgY29uc3Qgc2VsZWN0V2lkdGggPSB0aGlzLnNlbGVjdENvbnRhaW5lclJlZiA/IHRoaXMuc2VsZWN0Q29udGFpbmVyUmVmLm9mZnNldFdpZHRoIDogMDtcbiAgICBjb25zdCBjb21wb25lbnRMZWZ0V2lkdGggPSB0aGlzLmNvbXBvbmVudExlZnRDb250YWluZXJSZWYgPyB0aGlzLmNvbXBvbmVudExlZnRDb250YWluZXJSZWYub2Zmc2V0V2lkdGggOiAwOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgY29uc3QgY29tcG9uZW50UmlnaHRXaWR0aCA9IHRoaXMuY29tcG9uZW50UmlnaHRDb250YWluZXJSZWYgPyB0aGlzLmNvbXBvbmVudFJpZ2h0Q29udGFpbmVyUmVmLm9mZnNldFdpZHRoIDogMDsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuXG4gICAgbGV0IHJlbWFpbmluZ1dpZHRoID0gbmF2QmFyV2lkdGggLSBzZWxlY3RXaWR0aCAtIGNvbXBvbmVudExlZnRXaWR0aCAtIGNvbXBvbmVudFJpZ2h0V2lkdGg7XG4gICAgbGV0IGxhc3RWaXNpYmxlID0gMDtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5wcm9wcy5saXN0Lmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICByZW1haW5pbmdXaWR0aCAtPSB0aGlzLml0ZW1XaWR0aHNbaV07XG4gICAgICBpZiAocmVtYWluaW5nV2lkdGggPCAwKSB7XG4gICAgICAgIGxhc3RWaXNpYmxlIC09IDE7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgbGFzdFZpc2libGUgKz0gMTtcbiAgICB9XG5cbiAgICByZXR1cm4gbGFzdFZpc2libGU7XG4gIH1cblxuICByZWZyZXNoTGFzdFZpc2libGVJdGVtID0gKCkgPT4ge1xuICAgIGNvbnN0IGxhc3RWaXNpYmxlSXRlbUluZGV4ID0gdGhpcy5nZXRMYXN0VmlzaWJsZUl0ZW1JbmRleCgpO1xuICAgIGlmICh0aGlzLnN0YXRlLmxhc3RWaXNpYmxlSXRlbUluZGV4ICE9PSBsYXN0VmlzaWJsZUl0ZW1JbmRleCkge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIGlzU2VsZWN0VmlzaWJsZTogdGhpcy5wcm9wcy5saXN0Lmxlbmd0aCA+IChsYXN0VmlzaWJsZUl0ZW1JbmRleCArIDEpLFxuICAgICAgICBsYXN0VmlzaWJsZUl0ZW1JbmRleCxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHRvb2x0aXBXcmFwcGVyID0gKG5vZGUsIGluZGV4LCB0b29sdGlwQ29udGVudCkgPT4ge1xuICAgIGNvbnN0IHRvb2x0aXAgPSA8VG9vbHRpcCBpZD1cInRvb2x0aXBcIj57dG9vbHRpcENvbnRlbnR9PC9Ub29sdGlwPjtcbiAgICByZXR1cm4gIXRoaXMucHJvcHMuc2hvd05hdkl0ZW1Ub29sdGlwID8gbm9kZSA6XG4gICAgPE92ZXJsYXlUcmlnZ2VyIHBsYWNlbWVudD1cImJvdHRvbVwiIGtleT17aW5kZXh9IG92ZXJsYXk9e3Rvb2x0aXB9IGRlbGF5U2hvdz17dGhpcy5wcm9wcy50b29sdGlwRGVsYXl9PlxuICAgICAge25vZGV9XG4gICAgPC9PdmVybGF5VHJpZ2dlcj47XG4gIH1cblxuICAvLyBIYW5kbGUgcmVhY3Qtc2VsZWN0IG9uQ2hhbmdlXG4gIGhhbmRsZU9uQ2hhbmdlID0gKHsgdmFsdWUgfSkgPT4ge1xuICAgIHRoaXMucHJvcHMub25TZWxlY3QodmFsdWUpO1xuICB9XG5cbiAgLy8gSGFuZGxlIG5hdmJhciBvbkNsaWNrXG4gIGhhbmRsZU9uQ2xpY2sgPSBocmVmID0+ICgpID0+IHtcbiAgICB0aGlzLnByb3BzLm9uU2VsZWN0KGhyZWYpO1xuICB9XG5cbiAgLy8gUmVuZGVyIG5hdmJhciBpdGVtXG4gIG5hdmJhckl0ZW0gPSAoaXRlbSwgaW5kZXgsIGNsYXNzTmFtZSkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIGFjdGl2ZUtleSxcbiAgICAgIGZvbnRXZWlnaHQsXG4gICAgICBmb250U2l6ZSxcbiAgICAgIGhlaWdodCxcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gKFxuICAgICAgPGJ1dHRvblxuICAgICAgICBjbGFzc05hbWU9e2luZGV4ID09PSBhY3RpdmVLZXkgPyBgJHtjbGFzc05hbWV9IHNlbGVjdGVkLWJvcmRlcmAgOiBgJHtjbGFzc05hbWV9YH1cbiAgICAgICAgc3R5bGU9e3sgZm9udFdlaWdodCwgZm9udFNpemUsIG1pbkhlaWdodDogaGVpZ2h0IH19XG4gICAgICAgIGlkPXtpdGVtLmlkIHx8IGBuYXZJdGVtJHtTdHJpbmcoaW5kZXgpfWB9XG4gICAgICAgIGtleT17aXRlbS5pZCB8fCBgbmF2aXRlbSR7U3RyaW5nKGluZGV4KX1gfVxuICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZU9uQ2xpY2soaXRlbS5ocmVmKX1cbiAgICAgICAgcmVmPXsocikgPT4ge1xuICAgICAgICAgIGlmIChyICYmICF0aGlzLml0ZW1XaWR0aHNbaW5kZXhdKSB0aGlzLml0ZW1XaWR0aHNbaW5kZXhdID0gci5vZmZzZXRXaWR0aDtcbiAgICAgICAgfX1cbiAgICAgID5cbiAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicmVzcG9uc2l2ZS1uYXZiYXItaXRlbS10ZXh0XCI+e2l0ZW0ubmFtZX08L3NwYW4+XG4gICAgICA8L2J1dHRvbj5cbiAgICApO1xuICB9XG5cbiAgZG9MaW5lQ291bnQgPSAoKSA9PiB7XG4gICAgY29uc3QgeyBsaXN0IH0gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiBsaXN0LnNvbWUoaXRlbSA9PiB0eXBlb2YgKGl0ZW0ubmFtZSkgIT09ICdzdHJpbmcnKTtcbiAgfVxuXG4gIC8vIFJlbmRlciBuYXZiYXJcbiAgbmF2YmFyID0gKCkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIGlkLFxuICAgICAgY2xhc3NOYW1lLFxuICAgICAgbGlzdCxcbiAgICAgIHNob3dOYXZJdGVtQm9yZGVyLFxuICAgICAgaGVpZ2h0LFxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHZpc2libGVMaXN0ID0gdGhpcy5zdGF0ZS5sYXN0VmlzaWJsZUl0ZW1JbmRleCA+IC0yID9cbiAgICAgIGxpc3Quc2xpY2UoMCwgdGhpcy5zdGF0ZS5sYXN0VmlzaWJsZUl0ZW1JbmRleCArIDEpIDpcbiAgICAgIGxpc3Q7XG4gICAgY29uc3QgaXRlbUNsYXNzTmFtZSA9IHNob3dOYXZJdGVtQm9yZGVyID9cbiAgICAgICdyZXNwb25zaXZlLW5hdmJhci1pdGVtIGluYWN0aXZlLWJvcmRlcicgOlxuICAgICAgJ3Jlc3BvbnNpdmUtbmF2YmFyLWl0ZW0gbm8taXRlbS1ib3JkZXInO1xuICAgIGNvbnN0IGl0ZW1zID0gdmlzaWJsZUxpc3QubWFwKChpdGVtLCBpbmRleCkgPT4gKFxuICAgICAgdGhpcy50b29sdGlwV3JhcHBlcih0aGlzLm5hdmJhckl0ZW0oaXRlbSwgaW5kZXgsIGl0ZW1DbGFzc05hbWUpLCBpbmRleCwgaXRlbS5uYW1lKVxuICAgICkpO1xuICAgIGNvbnN0IGxpbmVDb3VudCA9IHRoaXMuZG9MaW5lQ291bnQoKTtcbiAgICBjb25zdCBuYXZiYXJTdHlsZSA9IHtcbiAgICAgIG1pbkhlaWdodDogaGVpZ2h0LFxuICAgIH07XG4gICAgaWYgKGhlaWdodC5zbGljZSgtMikgPT09ICdweCcgJiYgbGluZUNvdW50KSB7XG4gICAgICBjb25zdCBoZWlnaHRQeCA9IHBhcnNlSW50KGhlaWdodC5zbGljZSgwLCAtMiksIDEwKTtcbiAgICAgIG5hdmJhclN0eWxlLmxpbmVIZWlnaHQgPSBgJHsoaGVpZ2h0UHggLSA0KX1weGA7XG4gICAgfVxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2XG4gICAgICAgIGlkPXtgJHtpZH0tY29udGFpbmVyYH1cbiAgICAgICAgcmVmPXsocikgPT4geyB0aGlzLm5hdmJhckNvbnRhaW5lclJlZiA9IHI7IH19XG4gICAgICAgIGNsYXNzTmFtZT17YHJlc3BvbnNpdmUtbmF2YmFyLWNvbnRhaW5lciAke2NsYXNzTmFtZX1gfVxuICAgICAgICBzdHlsZT17bmF2YmFyU3R5bGV9XG4gICAgICA+XG4gICAgICAgIHtpdGVtc31cbiAgICAgICAge3RoaXMuY29tYm9ib3goKX1cbiAgICAgICAge3RoaXMuY29tcG9uZW50TGVmdCgpfVxuICAgICAgICB7dGhpcy5jb21wb25lbnRSaWdodCgpfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxuXG4gIC8vIFJlbmRlciBjb21ib2JveCwgd2hlbiBhbGwgaXRlbXMgZG8gbm90IGZpdFxuICBjb21ib2JveCA9ICgpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBpZCxcbiAgICAgIGxpc3QsXG4gICAgICBmb250U2l6ZSxcbiAgICAgIGFjdGl2ZUtleSxcbiAgICAgIGZvbnRXZWlnaHQsXG4gICAgICBwbGFjZWhvbGRlcixcbiAgICAgIHNob3dOYXZJdGVtQm9yZGVyLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIGlmICghdGhpcy5zdGF0ZS5pc1NlbGVjdFZpc2libGUpIHtcbiAgICAgIC8vIHJldHVybiBudWxsIGlmIGFsbCBuYXYgaXRlbXMgYXJlIHZpc2libGVcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIC8vIHNsaWNlIG5hdiBpdGVtcyBsaXN0IGFuZCBzaG93IGludmlzaWJsZSBpdGVtcyBpbiB0aGUgY29tYm9ib3hcbiAgICBjb25zdCBuYXZMaXN0ID0gdGhpcy5zdGF0ZS5sYXN0VmlzaWJsZUl0ZW1JbmRleCA+IC0yID9cbiAgICAgIGxpc3Quc2xpY2UodGhpcy5zdGF0ZS5sYXN0VmlzaWJsZUl0ZW1JbmRleCArIDEpIDogbGlzdDtcbiAgICBjb25zdCBzZWxlY3RPcHRpb25zID0gbmF2TGlzdC5tYXAoaXRlbSA9PiAoe1xuICAgICAgdmFsdWU6IGl0ZW0uaHJlZixcbiAgICAgIGxhYmVsOiBpdGVtLm5hbWUsXG4gICAgfSkpO1xuICAgIGNvbnN0IGxpbmVDb3VudE5lZWRlZCA9IHRoaXMuZG9MaW5lQ291bnQoKTtcbiAgICBjb25zdCBjdXN0b21MaW5lQ291bnQgPSBsaW5lQ291bnROZWVkZWQgPyAnbGluZS1jb3VudCcgOiAnJztcbiAgICBjb25zdCBjdXN0b21Cb3JkZXJDbGFzcyA9IGxpbmVDb3VudE5lZWRlZCA/ICdzZWxlY3RlZC1ib3JkZXIgbGluZS1jb3VudCcgOiAnc2VsZWN0ZWQtYm9yZGVyJztcbiAgICBjb25zdCBjdXN0b21JbmFjdGl2ZUJvcmRlciA9IGxpbmVDb3VudE5lZWRlZCA/ICdpbmFjdGl2ZS1ib3JkZXIgbGluZS1jb3VudCcgOiAnaW5hY3RpdmUtYm9yZGVyJztcbiAgICBjb25zdCBpbmFjdGl2ZUJvcmRlciA9IHNob3dOYXZJdGVtQm9yZGVyID8gY3VzdG9tSW5hY3RpdmVCb3JkZXIgOiBjdXN0b21MaW5lQ291bnQ7XG4gICAgY29uc3QgYm9yZGVyQ2xhc3MgPSBhY3RpdmVLZXkgPj0gKHRoaXMuc3RhdGUubGFzdFZpc2libGVJdGVtSW5kZXggKyAxKSA/IGN1c3RvbUJvcmRlckNsYXNzIDogaW5hY3RpdmVCb3JkZXI7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICBjb25zdCBhY3RpdmVJdGVtID0gbGlzdFthY3RpdmVLZXldO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2XG4gICAgICAgIGlkPXtgJHtpZH0tc2VsZWN0YH1cbiAgICAgICAgY2xhc3NOYW1lPXtgcmVzcG9uc2l2ZS1uYXZiYXItc2VsZWN0ICR7Ym9yZGVyQ2xhc3N9YH1cbiAgICAgICAgc3R5bGU9e3sgZm9udFdlaWdodCwgZm9udFNpemUgfX1cbiAgICAgICAgcmVmPXsocikgPT4geyB0aGlzLnNlbGVjdENvbnRhaW5lclJlZiA9IHI7IH19XG4gICAgICA+XG4gICAgICAgIDxGbG9hdGluZ1NlbGVjdFxuICAgICAgICAgIG5hbWU9e2Ake2lkfS1zZWxlY3QtY29tcG9uZW50YH1cbiAgICAgICAgICB2YWx1ZT17YWN0aXZlSXRlbSA/IGFjdGl2ZUl0ZW0uaHJlZiA6ICcnfVxuICAgICAgICAgIGlzQ2xlYXJhYmxlPXtmYWxzZX1cbiAgICAgICAgICBwbGFjZWhvbGRlcj17cGxhY2Vob2xkZXJ9XG4gICAgICAgICAgb3B0aW9ucz17c2VsZWN0T3B0aW9uc31cbiAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVPbkNoYW5nZX1cbiAgICAgICAgLz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cblxuICAvLyBSZW5kZXIgY3VzdG9tIGxlZnQgc2lkZSBjb21wb25lbnRcbiAgY29tcG9uZW50TGVmdCA9ICgpID0+IHtcbiAgICBjb25zdCB7IGNvbXBvbmVudExlZnQgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKCFjb21wb25lbnRMZWZ0KSByZXR1cm4gbnVsbDtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdlxuICAgICAgICBjbGFzc05hbWU9XCJyZXNwb25zaXZlLW5hdmJhci1jb250YWluZXItbGVmdFwiXG4gICAgICAgIHJlZj17KHIpID0+IHsgdGhpcy5jb21wb25lbnRMZWZ0Q29udGFpbmVyUmVmID0gcjsgfX1cbiAgICAgID5cbiAgICAgICAgeyBjb21wb25lbnRMZWZ0IH1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cblxuICAvLyBSZW5kZXIgY3VzdG9tIHJpZ2h0IHNpZGUgY29tcG9uZW50XG4gIGNvbXBvbmVudFJpZ2h0ID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgY29tcG9uZW50UmlnaHQgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKCFjb21wb25lbnRSaWdodCkgcmV0dXJuIG51bGw7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3NOYW1lPVwicmVzcG9uc2l2ZS1uYXZiYXItY29udGFpbmVyLXJpZ2h0XCJcbiAgICAgICAgcmVmPXsocikgPT4geyB0aGlzLmNvbXBvbmVudFJpZ2h0Q29udGFpbmVyUmVmID0gcjsgfX1cbiAgICAgID5cbiAgICAgICAgeyBjb21wb25lbnRSaWdodCB9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiB0aGlzLm5hdmJhcigpO1xuICB9XG59XG4iXX0=