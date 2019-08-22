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

    _this.handleResize = function () {
      return debounce(_this.refreshLastVisibleItem);
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
    window.addEventListener('resize', this.handleResize);
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
    window.removeEventListener('resize', this.handleResize);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yZXNwb25zaXZlLW5hdmJhci5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIlJlYWN0IiwiUHJvcFR5cGVzIiwiRmxvYXRpbmdTZWxlY3QiLCJPdmVybGF5VHJpZ2dlciIsIlRvb2x0aXAiLCJkZWJvdW5jZSIsIlJlc3BvbnNpdmVOYXZiYXIiLCJwcm9wcyIsInN0YXRlIiwiaXNTZWxlY3RWaXNpYmxlIiwibGFzdFZpc2libGVJdGVtSW5kZXgiLCJnZXRMYXN0VmlzaWJsZUl0ZW1JbmRleCIsIm5hdkJhcldpZHRoIiwibmF2YmFyQ29udGFpbmVyUmVmIiwib2Zmc2V0V2lkdGgiLCJzZWxlY3RXaWR0aCIsInNlbGVjdENvbnRhaW5lclJlZiIsImNvbXBvbmVudExlZnRXaWR0aCIsImNvbXBvbmVudExlZnRDb250YWluZXJSZWYiLCJjb21wb25lbnRSaWdodFdpZHRoIiwiY29tcG9uZW50UmlnaHRDb250YWluZXJSZWYiLCJyZW1haW5pbmdXaWR0aCIsImxhc3RWaXNpYmxlIiwiaSIsImxpc3QiLCJsZW5ndGgiLCJpdGVtV2lkdGhzIiwiaGFuZGxlUmVzaXplIiwicmVmcmVzaExhc3RWaXNpYmxlSXRlbSIsInNldFN0YXRlIiwidG9vbHRpcFdyYXBwZXIiLCJub2RlIiwiaW5kZXgiLCJ0b29sdGlwQ29udGVudCIsInRvb2x0aXAiLCJzaG93TmF2SXRlbVRvb2x0aXAiLCJ0b29sdGlwRGVsYXkiLCJoYW5kbGVPbkNoYW5nZSIsInZhbHVlIiwib25TZWxlY3QiLCJoYW5kbGVPbkNsaWNrIiwiaHJlZiIsIm5hdmJhckl0ZW0iLCJpdGVtIiwiY2xhc3NOYW1lIiwiYWN0aXZlS2V5IiwiZm9udFdlaWdodCIsImZvbnRTaXplIiwiaGVpZ2h0IiwibWluSGVpZ2h0IiwiaWQiLCJTdHJpbmciLCJyIiwibmFtZSIsImRvTGluZUNvdW50Iiwic29tZSIsIm5hdmJhciIsInNob3dOYXZJdGVtQm9yZGVyIiwidmlzaWJsZUxpc3QiLCJzbGljZSIsIml0ZW1DbGFzc05hbWUiLCJpdGVtcyIsIm1hcCIsImxpbmVDb3VudCIsIm5hdmJhclN0eWxlIiwiaGVpZ2h0UHgiLCJwYXJzZUludCIsImxpbmVIZWlnaHQiLCJjb21ib2JveCIsImNvbXBvbmVudExlZnQiLCJjb21wb25lbnRSaWdodCIsInBsYWNlaG9sZGVyIiwibmF2TGlzdCIsInNlbGVjdE9wdGlvbnMiLCJsYWJlbCIsImxpbmVDb3VudE5lZWRlZCIsImN1c3RvbUxpbmVDb3VudCIsImN1c3RvbUJvcmRlckNsYXNzIiwiY3VzdG9tSW5hY3RpdmVCb3JkZXIiLCJpbmFjdGl2ZUJvcmRlciIsImJvcmRlckNsYXNzIiwiYWN0aXZlSXRlbSIsImNvbXBvbmVudERpZE1vdW50Iiwid2luZG93IiwiYWRkRXZlbnRMaXN0ZW5lciIsImNvbXBvbmVudERpZFVwZGF0ZSIsInByZXZQcm9wcyIsInByZXZTdGF0ZSIsImNvbXBvbmVudFdpbGxVbm1vdW50IiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsInJlbmRlciIsIlB1cmVDb21wb25lbnQiLCJkZWZhdWx0UHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7QUFDQSxPQUFPQSxLQUFQLE1BQWtCLE9BQWxCO0FBQ0EsT0FBT0MsU0FBUCxNQUFzQixZQUF0QjtBQUNBLFNBQVNDLGNBQVQsUUFBK0IsbUNBQS9CO0FBQ0EsU0FBU0MsY0FBVCxFQUF5QkMsT0FBekIsUUFBd0MsaUJBQXhDO0FBQ0EsU0FBU0MsUUFBVCxRQUF5QixVQUF6Qjs7QUFFQSxPQUFPLDBCQUFQOztJQUVxQkMsZ0I7OztBQXVDbkIsNEJBQVlDLEtBQVosRUFBbUI7QUFBQTs7QUFBQSxpREFDakIsZ0NBQU1BLEtBQU4sQ0FEaUI7O0FBQUEsVUFLbkJDLEtBTG1CLEdBS1g7QUFDTkMsdUJBQWlCLEtBRFg7QUFFTkMsNEJBQXNCLENBQUM7QUFGakIsS0FMVzs7QUFBQSxVQStCbkJDLHVCQS9CbUIsR0ErQk8sWUFBTTtBQUM5QixVQUFNQyxjQUFjLE1BQUtDLGtCQUFMLEdBQTBCLE1BQUtBLGtCQUFM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Z0JBQVAsQ0FBd0IsbUJBQXhCLEVBQTZDLEtBQUt4RCxzQkFBbEQsRUFGa0IsQ0FFeUQ7QUFDM0UsU0FBS0Esc0JBQUw7QUFDRCxHOzs2QkFFRHlELGtCLCtCQUFtQkMsUyxFQUFXQyxTLEVBQVc7QUFDdkM7QUFDQSxRQUNFLEtBQUsvRSxLQUFMLENBQVdDLGVBQVgsS0FBK0I4RSxVQUFVOUUsZUFBekMsSUFDQSxLQUFLRCxLQUFMLENBQVdFLG9CQUFYLEtBQW9DNkUsVUFBVTdFLG9CQUZoRCxFQUdFO0FBQ0EsV0FBS2tCLHNCQUFMO0FBQ0Q7QUFDRixHOzs2QkFFRDRELG9CLG1DQUF1QjtBQUNyQkwsV0FBT00sbUJBQVAsQ0FBMkIsUUFBM0IsRUFBcUMsS0FBSzlELFlBQTFDO0FBQ0F3RCxXQUFPTSxtQkFBUCxDQUEyQixtQkFBM0IsRUFBZ0QsS0FBSzdELHNCQUFyRCxFQUZxQixDQUV5RDtBQUMvRSxHOztBQTJDRDs7O0FBS0E7OztBQUtBOzs7QUE2QkE7OztBQXlDQTs7O0FBaURBOzs7QUFjQTs7OzZCQWNBOEQsTSxxQkFBUztBQUNQLFdBQU8sS0FBS2xDLE1BQUwsRUFBUDtBQUNELEc7OztFQTlRMkN4RCxNQUFNMkYsYSxVQXdCM0NDLFksR0FBZTtBQUNwQjFDLE1BQUksbUJBRGdCO0FBRXBCTixhQUFXLEVBRlM7QUFHcEJMLFlBQVUsb0JBQU0sQ0FBRSxDQUhFO0FBSXBCa0IscUJBQW1CLEtBSkM7QUFLcEJ0QixzQkFBb0IsSUFMQTtBQU1wQkMsZ0JBQWMsSUFOTTtBQU9wQlcsWUFBVSxTQVBVO0FBUXBCRCxjQUFZLFNBUlE7QUFTcEJ5QixlQUFhLFNBVE87QUFVcEJ2QixVQUFRLE1BVlk7QUFXcEJxQixpQkFBZSxJQVhLO0FBWXBCQyxrQkFBZ0I7QUFaSSxDO1NBeEJIaEUsZ0IiLCJmaWxlIjoicmVzcG9uc2l2ZS1uYXZiYXIuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgcmVhY3Qvbm8tZmluZC1kb20tbm9kZSAqL1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBGbG9hdGluZ1NlbGVjdCB9IGZyb20gJ0BvcHVzY2FwaXRhL3JlYWN0LWZsb2F0aW5nLXNlbGVjdCc7XG5pbXBvcnQgeyBPdmVybGF5VHJpZ2dlciwgVG9vbHRpcCB9IGZyb20gJ3JlYWN0LWJvb3RzdHJhcCc7XG5pbXBvcnQgeyBkZWJvdW5jZSB9IGZyb20gJ2RlYm91bmNlJztcblxuaW1wb3J0ICcuL3Jlc3BvbnNpdmUtbmF2YmFyLnNjc3MnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZXNwb25zaXZlTmF2YmFyIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgaWQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgY2xhc3NOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHNob3dOYXZJdGVtQm9yZGVyOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93TmF2SXRlbVRvb2x0aXA6IFByb3BUeXBlcy5ib29sLFxuICAgIHRvb2x0aXBEZWxheTogUHJvcFR5cGVzLm51bWJlcixcbiAgICBmb250U2l6ZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBmb250V2VpZ2h0OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHBsYWNlaG9sZGVyOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGFjdGl2ZUtleTogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuICAgIGxpc3Q6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICBuYW1lOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgICAgUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgUHJvcFR5cGVzLm5vZGUsXG4gICAgICBdKS5pc1JlcXVpcmVkLFxuICAgICAgaHJlZjogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLm51bWJlcl0pLFxuICAgIH0pKS5pc1JlcXVpcmVkLFxuICAgIG9uU2VsZWN0OiBQcm9wVHlwZXMuZnVuYyxcbiAgICBoZWlnaHQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgY29tcG9uZW50TGVmdDogUHJvcFR5cGVzLm5vZGUsXG4gICAgY29tcG9uZW50UmlnaHQ6IFByb3BUeXBlcy5ub2RlLFxuICB9XG5cbiAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICBpZDogJ3Jlc3BvbnNpdmUtbmF2YmFyJyxcbiAgICBjbGFzc05hbWU6ICcnLFxuICAgIG9uU2VsZWN0OiAoKSA9PiB7fSxcbiAgICBzaG93TmF2SXRlbUJvcmRlcjogZmFsc2UsXG4gICAgc2hvd05hdkl0ZW1Ub29sdGlwOiB0cnVlLFxuICAgIHRvb2x0aXBEZWxheTogMjAwMCxcbiAgICBmb250U2l6ZTogJ2luaGVyaXQnLFxuICAgIGZvbnRXZWlnaHQ6ICdpbmhlcml0JyxcbiAgICBwbGFjZWhvbGRlcjogJ21vcmUuLi4nLFxuICAgIGhlaWdodDogJzQwcHgnLFxuICAgIGNvbXBvbmVudExlZnQ6IG51bGwsXG4gICAgY29tcG9uZW50UmlnaHQ6IG51bGwsXG4gIH1cblxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLml0ZW1XaWR0aHMgPSBbXTsgLy8gc3RvcmUgaXRlbSB3aWR0aHMgaGVyZSwgdGhleSBkb24ndCBjaGFuZ2VcbiAgfVxuXG4gIHN0YXRlID0ge1xuICAgIGlzU2VsZWN0VmlzaWJsZTogZmFsc2UsXG4gICAgbGFzdFZpc2libGVJdGVtSW5kZXg6IC0yLFxuICB9O1xuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLmhhbmRsZVJlc2l6ZSk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ29yaWVudGF0aW9uY2hhbmdlJywgdGhpcy5yZWZyZXNoTGFzdFZpc2libGVJdGVtKTsgLy8gZm9yIG1vYmlsZSBzdXBwb3J0XG4gICAgdGhpcy5yZWZyZXNoTGFzdFZpc2libGVJdGVtKCk7XG4gIH1cblxuICBjb21wb25lbnREaWRVcGRhdGUocHJldlByb3BzLCBwcmV2U3RhdGUpIHtcbiAgICAvLyBSZWZyZXNoIHZpc2libGUgaXRlbXMgaWYgdmFsdWVzIGNoYW5nZVxuICAgIGlmIChcbiAgICAgIHRoaXMuc3RhdGUuaXNTZWxlY3RWaXNpYmxlICE9PSBwcmV2U3RhdGUuaXNTZWxlY3RWaXNpYmxlIHx8XG4gICAgICB0aGlzLnN0YXRlLmxhc3RWaXNpYmxlSXRlbUluZGV4ICE9PSBwcmV2U3RhdGUubGFzdFZpc2libGVJdGVtSW5kZXhcbiAgICApIHtcbiAgICAgIHRoaXMucmVmcmVzaExhc3RWaXNpYmxlSXRlbSgpO1xuICAgIH1cbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLmhhbmRsZVJlc2l6ZSk7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ29yaWVudGF0aW9uY2hhbmdlJywgdGhpcy5yZWZyZXNoTGFzdFZpc2libGVJdGVtKTsgLy8gZm9yIG1vYmlsZSBzdXBwb3J0XG4gIH1cblxuICBnZXRMYXN0VmlzaWJsZUl0ZW1JbmRleCA9ICgpID0+IHtcbiAgICBjb25zdCBuYXZCYXJXaWR0aCA9IHRoaXMubmF2YmFyQ29udGFpbmVyUmVmID8gdGhpcy5uYXZiYXJDb250YWluZXJSZWYub2Zmc2V0V2lkdGggOiAwO1xuICAgIGNvbnN0IHNlbGVjdFdpZHRoID0gdGhpcy5zZWxlY3RDb250YWluZXJSZWYgPyB0aGlzLnNlbGVjdENvbnRhaW5lclJlZi5vZmZzZXRXaWR0aCA6IDA7XG4gICAgY29uc3QgY29tcG9uZW50TGVmdFdpZHRoID0gdGhpcy5jb21wb25lbnRMZWZ0Q29udGFpbmVyUmVmID8gdGhpcy5jb21wb25lbnRMZWZ0Q29udGFpbmVyUmVmLm9mZnNldFdpZHRoIDogMDsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgIGNvbnN0IGNvbXBvbmVudFJpZ2h0V2lkdGggPSB0aGlzLmNvbXBvbmVudFJpZ2h0Q29udGFpbmVyUmVmID8gdGhpcy5jb21wb25lbnRSaWdodENvbnRhaW5lclJlZi5vZmZzZXRXaWR0aCA6IDA7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcblxuICAgIGxldCByZW1haW5pbmdXaWR0aCA9IG5hdkJhcldpZHRoIC0gc2VsZWN0V2lkdGggLSBjb21wb25lbnRMZWZ0V2lkdGggLSBjb21wb25lbnRSaWdodFdpZHRoO1xuICAgIGxldCBsYXN0VmlzaWJsZSA9IDA7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucHJvcHMubGlzdC5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgcmVtYWluaW5nV2lkdGggLT0gdGhpcy5pdGVtV2lkdGhzW2ldO1xuICAgICAgaWYgKHJlbWFpbmluZ1dpZHRoIDwgMCkge1xuICAgICAgICBsYXN0VmlzaWJsZSAtPSAxO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGxhc3RWaXNpYmxlICs9IDE7XG4gICAgfVxuXG4gICAgcmV0dXJuIGxhc3RWaXNpYmxlO1xuICB9XG5cbiAgaGFuZGxlUmVzaXplID0gKCkgPT4gZGVib3VuY2UodGhpcy5yZWZyZXNoTGFzdFZpc2libGVJdGVtKTtcblxuICByZWZyZXNoTGFzdFZpc2libGVJdGVtID0gKCkgPT4ge1xuICAgIGNvbnN0IGxhc3RWaXNpYmxlSXRlbUluZGV4ID0gdGhpcy5nZXRMYXN0VmlzaWJsZUl0ZW1JbmRleCgpO1xuICAgIGlmICh0aGlzLnN0YXRlLmxhc3RWaXNpYmxlSXRlbUluZGV4ICE9PSBsYXN0VmlzaWJsZUl0ZW1JbmRleCkge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIGlzU2VsZWN0VmlzaWJsZTogdGhpcy5wcm9wcy5saXN0Lmxlbmd0aCA+IChsYXN0VmlzaWJsZUl0ZW1JbmRleCArIDEpLFxuICAgICAgICBsYXN0VmlzaWJsZUl0ZW1JbmRleCxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHRvb2x0aXBXcmFwcGVyID0gKG5vZGUsIGluZGV4LCB0b29sdGlwQ29udGVudCkgPT4ge1xuICAgIGNvbnN0IHRvb2x0aXAgPSA8VG9vbHRpcCBpZD1cInRvb2x0aXBcIj57dG9vbHRpcENvbnRlbnR9PC9Ub29sdGlwPjtcbiAgICByZXR1cm4gIXRoaXMucHJvcHMuc2hvd05hdkl0ZW1Ub29sdGlwID8gbm9kZSA6XG4gICAgPE92ZXJsYXlUcmlnZ2VyIHBsYWNlbWVudD1cImJvdHRvbVwiIGtleT17aW5kZXh9IG92ZXJsYXk9e3Rvb2x0aXB9IGRlbGF5U2hvdz17dGhpcy5wcm9wcy50b29sdGlwRGVsYXl9PlxuICAgICAge25vZGV9XG4gICAgPC9PdmVybGF5VHJpZ2dlcj47XG4gIH1cblxuICAvLyBIYW5kbGUgcmVhY3Qtc2VsZWN0IG9uQ2hhbmdlXG4gIGhhbmRsZU9uQ2hhbmdlID0gKHsgdmFsdWUgfSkgPT4ge1xuICAgIHRoaXMucHJvcHMub25TZWxlY3QodmFsdWUpO1xuICB9XG5cbiAgLy8gSGFuZGxlIG5hdmJhciBvbkNsaWNrXG4gIGhhbmRsZU9uQ2xpY2sgPSBocmVmID0+ICgpID0+IHtcbiAgICB0aGlzLnByb3BzLm9uU2VsZWN0KGhyZWYpO1xuICB9XG5cbiAgLy8gUmVuZGVyIG5hdmJhciBpdGVtXG4gIG5hdmJhckl0ZW0gPSAoaXRlbSwgaW5kZXgsIGNsYXNzTmFtZSkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIGFjdGl2ZUtleSxcbiAgICAgIGZvbnRXZWlnaHQsXG4gICAgICBmb250U2l6ZSxcbiAgICAgIGhlaWdodCxcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gKFxuICAgICAgPGJ1dHRvblxuICAgICAgICBjbGFzc05hbWU9e2luZGV4ID09PSBhY3RpdmVLZXkgPyBgJHtjbGFzc05hbWV9IHNlbGVjdGVkLWJvcmRlcmAgOiBgJHtjbGFzc05hbWV9YH1cbiAgICAgICAgc3R5bGU9e3sgZm9udFdlaWdodCwgZm9udFNpemUsIG1pbkhlaWdodDogaGVpZ2h0IH19XG4gICAgICAgIGlkPXtpdGVtLmlkIHx8IGBuYXZJdGVtJHtTdHJpbmcoaW5kZXgpfWB9XG4gICAgICAgIGtleT17aXRlbS5pZCB8fCBgbmF2aXRlbSR7U3RyaW5nKGluZGV4KX1gfVxuICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZU9uQ2xpY2soaXRlbS5ocmVmKX1cbiAgICAgICAgcmVmPXsocikgPT4ge1xuICAgICAgICAgIGlmIChyICYmICF0aGlzLml0ZW1XaWR0aHNbaW5kZXhdKSB0aGlzLml0ZW1XaWR0aHNbaW5kZXhdID0gci5vZmZzZXRXaWR0aDtcbiAgICAgICAgfX1cbiAgICAgID5cbiAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicmVzcG9uc2l2ZS1uYXZiYXItaXRlbS10ZXh0XCI+e2l0ZW0ubmFtZX08L3NwYW4+XG4gICAgICA8L2J1dHRvbj5cbiAgICApO1xuICB9XG5cbiAgZG9MaW5lQ291bnQgPSAoKSA9PiB7XG4gICAgY29uc3QgeyBsaXN0IH0gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiBsaXN0LnNvbWUoaXRlbSA9PiB0eXBlb2YgKGl0ZW0ubmFtZSkgIT09ICdzdHJpbmcnKTtcbiAgfVxuXG4gIC8vIFJlbmRlciBuYXZiYXJcbiAgbmF2YmFyID0gKCkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIGlkLFxuICAgICAgY2xhc3NOYW1lLFxuICAgICAgbGlzdCxcbiAgICAgIHNob3dOYXZJdGVtQm9yZGVyLFxuICAgICAgaGVpZ2h0LFxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHZpc2libGVMaXN0ID0gdGhpcy5zdGF0ZS5sYXN0VmlzaWJsZUl0ZW1JbmRleCA+IC0yID9cbiAgICAgIGxpc3Quc2xpY2UoMCwgdGhpcy5zdGF0ZS5sYXN0VmlzaWJsZUl0ZW1JbmRleCArIDEpIDpcbiAgICAgIGxpc3Q7XG4gICAgY29uc3QgaXRlbUNsYXNzTmFtZSA9IHNob3dOYXZJdGVtQm9yZGVyID9cbiAgICAgICdyZXNwb25zaXZlLW5hdmJhci1pdGVtIGluYWN0aXZlLWJvcmRlcicgOlxuICAgICAgJ3Jlc3BvbnNpdmUtbmF2YmFyLWl0ZW0gbm8taXRlbS1ib3JkZXInO1xuICAgIGNvbnN0IGl0ZW1zID0gdmlzaWJsZUxpc3QubWFwKChpdGVtLCBpbmRleCkgPT4gKFxuICAgICAgdGhpcy50b29sdGlwV3JhcHBlcih0aGlzLm5hdmJhckl0ZW0oaXRlbSwgaW5kZXgsIGl0ZW1DbGFzc05hbWUpLCBpbmRleCwgaXRlbS5uYW1lKVxuICAgICkpO1xuICAgIGNvbnN0IGxpbmVDb3VudCA9IHRoaXMuZG9MaW5lQ291bnQoKTtcbiAgICBjb25zdCBuYXZiYXJTdHlsZSA9IHtcbiAgICAgIG1pbkhlaWdodDogaGVpZ2h0LFxuICAgIH07XG4gICAgaWYgKGhlaWdodC5zbGljZSgtMikgPT09ICdweCcgJiYgbGluZUNvdW50KSB7XG4gICAgICBjb25zdCBoZWlnaHRQeCA9IHBhcnNlSW50KGhlaWdodC5zbGljZSgwLCAtMiksIDEwKTtcbiAgICAgIG5hdmJhclN0eWxlLmxpbmVIZWlnaHQgPSBgJHsoaGVpZ2h0UHggLSA0KX1weGA7XG4gICAgfVxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2XG4gICAgICAgIGlkPXtgJHtpZH0tY29udGFpbmVyYH1cbiAgICAgICAgcmVmPXsocikgPT4geyB0aGlzLm5hdmJhckNvbnRhaW5lclJlZiA9IHI7IH19XG4gICAgICAgIGNsYXNzTmFtZT17YHJlc3BvbnNpdmUtbmF2YmFyLWNvbnRhaW5lciAke2NsYXNzTmFtZX1gfVxuICAgICAgICBzdHlsZT17bmF2YmFyU3R5bGV9XG4gICAgICA+XG4gICAgICAgIHtpdGVtc31cbiAgICAgICAge3RoaXMuY29tYm9ib3goKX1cbiAgICAgICAge3RoaXMuY29tcG9uZW50TGVmdCgpfVxuICAgICAgICB7dGhpcy5jb21wb25lbnRSaWdodCgpfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxuXG4gIC8vIFJlbmRlciBjb21ib2JveCwgd2hlbiBhbGwgaXRlbXMgZG8gbm90IGZpdFxuICBjb21ib2JveCA9ICgpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBpZCxcbiAgICAgIGxpc3QsXG4gICAgICBmb250U2l6ZSxcbiAgICAgIGFjdGl2ZUtleSxcbiAgICAgIGZvbnRXZWlnaHQsXG4gICAgICBwbGFjZWhvbGRlcixcbiAgICAgIHNob3dOYXZJdGVtQm9yZGVyLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIGlmICghdGhpcy5zdGF0ZS5pc1NlbGVjdFZpc2libGUpIHtcbiAgICAgIC8vIHJldHVybiBudWxsIGlmIGFsbCBuYXYgaXRlbXMgYXJlIHZpc2libGVcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIC8vIHNsaWNlIG5hdiBpdGVtcyBsaXN0IGFuZCBzaG93IGludmlzaWJsZSBpdGVtcyBpbiB0aGUgY29tYm9ib3hcbiAgICBjb25zdCBuYXZMaXN0ID0gdGhpcy5zdGF0ZS5sYXN0VmlzaWJsZUl0ZW1JbmRleCA+IC0yID9cbiAgICAgIGxpc3Quc2xpY2UodGhpcy5zdGF0ZS5sYXN0VmlzaWJsZUl0ZW1JbmRleCArIDEpIDogbGlzdDtcbiAgICBjb25zdCBzZWxlY3RPcHRpb25zID0gbmF2TGlzdC5tYXAoaXRlbSA9PiAoe1xuICAgICAgdmFsdWU6IGl0ZW0uaHJlZixcbiAgICAgIGxhYmVsOiBpdGVtLm5hbWUsXG4gICAgfSkpO1xuICAgIGNvbnN0IGxpbmVDb3VudE5lZWRlZCA9IHRoaXMuZG9MaW5lQ291bnQoKTtcbiAgICBjb25zdCBjdXN0b21MaW5lQ291bnQgPSBsaW5lQ291bnROZWVkZWQgPyAnbGluZS1jb3VudCcgOiAnJztcbiAgICBjb25zdCBjdXN0b21Cb3JkZXJDbGFzcyA9IGxpbmVDb3VudE5lZWRlZCA/ICdzZWxlY3RlZC1ib3JkZXIgbGluZS1jb3VudCcgOiAnc2VsZWN0ZWQtYm9yZGVyJztcbiAgICBjb25zdCBjdXN0b21JbmFjdGl2ZUJvcmRlciA9IGxpbmVDb3VudE5lZWRlZCA/ICdpbmFjdGl2ZS1ib3JkZXIgbGluZS1jb3VudCcgOiAnaW5hY3RpdmUtYm9yZGVyJztcbiAgICBjb25zdCBpbmFjdGl2ZUJvcmRlciA9IHNob3dOYXZJdGVtQm9yZGVyID8gY3VzdG9tSW5hY3RpdmVCb3JkZXIgOiBjdXN0b21MaW5lQ291bnQ7XG4gICAgY29uc3QgYm9yZGVyQ2xhc3MgPSBhY3RpdmVLZXkgPj0gKHRoaXMuc3RhdGUubGFzdFZpc2libGVJdGVtSW5kZXggKyAxKSA/IGN1c3RvbUJvcmRlckNsYXNzIDogaW5hY3RpdmVCb3JkZXI7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICBjb25zdCBhY3RpdmVJdGVtID0gbGlzdFthY3RpdmVLZXldO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2XG4gICAgICAgIGlkPXtgJHtpZH0tc2VsZWN0YH1cbiAgICAgICAgY2xhc3NOYW1lPXtgcmVzcG9uc2l2ZS1uYXZiYXItc2VsZWN0ICR7Ym9yZGVyQ2xhc3N9YH1cbiAgICAgICAgc3R5bGU9e3sgZm9udFdlaWdodCwgZm9udFNpemUgfX1cbiAgICAgICAgcmVmPXsocikgPT4geyB0aGlzLnNlbGVjdENvbnRhaW5lclJlZiA9IHI7IH19XG4gICAgICA+XG4gICAgICAgIDxGbG9hdGluZ1NlbGVjdFxuICAgICAgICAgIG5hbWU9e2Ake2lkfS1zZWxlY3QtY29tcG9uZW50YH1cbiAgICAgICAgICB2YWx1ZT17YWN0aXZlSXRlbSA/IGFjdGl2ZUl0ZW0uaHJlZiA6ICcnfVxuICAgICAgICAgIGlzQ2xlYXJhYmxlPXtmYWxzZX1cbiAgICAgICAgICBwbGFjZWhvbGRlcj17cGxhY2Vob2xkZXJ9XG4gICAgICAgICAgb3B0aW9ucz17c2VsZWN0T3B0aW9uc31cbiAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVPbkNoYW5nZX1cbiAgICAgICAgLz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cblxuICAvLyBSZW5kZXIgY3VzdG9tIGxlZnQgc2lkZSBjb21wb25lbnRcbiAgY29tcG9uZW50TGVmdCA9ICgpID0+IHtcbiAgICBjb25zdCB7IGNvbXBvbmVudExlZnQgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKCFjb21wb25lbnRMZWZ0KSByZXR1cm4gbnVsbDtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdlxuICAgICAgICBjbGFzc05hbWU9XCJyZXNwb25zaXZlLW5hdmJhci1jb250YWluZXItbGVmdFwiXG4gICAgICAgIHJlZj17KHIpID0+IHsgdGhpcy5jb21wb25lbnRMZWZ0Q29udGFpbmVyUmVmID0gcjsgfX1cbiAgICAgID5cbiAgICAgICAgeyBjb21wb25lbnRMZWZ0IH1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cblxuICAvLyBSZW5kZXIgY3VzdG9tIHJpZ2h0IHNpZGUgY29tcG9uZW50XG4gIGNvbXBvbmVudFJpZ2h0ID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgY29tcG9uZW50UmlnaHQgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKCFjb21wb25lbnRSaWdodCkgcmV0dXJuIG51bGw7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3NOYW1lPVwicmVzcG9uc2l2ZS1uYXZiYXItY29udGFpbmVyLXJpZ2h0XCJcbiAgICAgICAgcmVmPXsocikgPT4geyB0aGlzLmNvbXBvbmVudFJpZ2h0Q29udGFpbmVyUmVmID0gcjsgfX1cbiAgICAgID5cbiAgICAgICAgeyBjb21wb25lbnRSaWdodCB9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiB0aGlzLm5hdmJhcigpO1xuICB9XG59XG4iXX0=