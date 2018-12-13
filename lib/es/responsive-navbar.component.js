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
      var componentRightWidth = _this.componentRightContainerRef ? _this.componentRightContainerRef.offsetWidth : 0; // eslint-disable-line

      var remainingWidth = navBarWidth - selectWidth - componentRightWidth;
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
  componentRight: null
}, _temp);
export { ResponsiveNavbar as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yZXNwb25zaXZlLW5hdmJhci5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIlJlYWN0IiwiUHJvcFR5cGVzIiwiRmxvYXRpbmdTZWxlY3QiLCJPdmVybGF5VHJpZ2dlciIsIlRvb2x0aXAiLCJkZWJvdW5jZSIsIlJlc3BvbnNpdmVOYXZiYXIiLCJwcm9wcyIsInN0YXRlIiwiaXNTZWxlY3RWaXNpYmxlIiwibGFzdFZpc2libGVJdGVtSW5kZXgiLCJnZXRMYXN0VmlzaWJsZUl0ZW1JbmRleCIsIm5hdkJhcldpZHRoIiwibmF2YmFyQ29udGFpbmVyUmVmIiwib2Zmc2V0V2lkdGgiLCJzZWxlY3RXaWR0aCIsInNlbGVjdENvbnRhaW5lclJlZiIsImNvbXBvbmVudFJpZ2h0V2lkdGgiLCJjb21wb25lbnRSaWdodENvbnRhaW5lclJlZiIsInJlbWFpbmluZ1dpZHRoIiwibGFzdFZpc2libGUiLCJpIiwibGlzdCIsImxlbmd0aCIsIml0ZW1XaWR0aHMiLCJyZWZyZXNoTGFzdFZpc2libGVJdGVtIiwic2V0U3RhdGUiLCJ0b29sdGlwV3JhcHBlciIsIm5vZGUiLCJpbmRleCIsInRvb2x0aXBDb250ZW50IiwidG9vbHRpcCIsInNob3dOYXZJdGVtVG9vbHRpcCIsInRvb2x0aXBEZWxheSIsImhhbmRsZU9uQ2hhbmdlIiwidmFsdWUiLCJvblNlbGVjdCIsImhhbmRsZU9uQ2xpY2siLCJocmVmIiwibmF2YmFySXRlbSIsIml0ZW0iLCJjbGFzc05hbWUiLCJhY3RpdmVLZXkiLCJmb250V2VpZ2h0IiwiZm9udFNpemUiLCJoZWlnaHQiLCJtaW5IZWlnaHQiLCJpZCIsIlN0cmluZyIsInIiLCJuYW1lIiwiZG9MaW5lQ291bnQiLCJzb21lIiwibmF2YmFyIiwic2hvd05hdkl0ZW1Cb3JkZXIiLCJ2aXNpYmxlTGlzdCIsInNsaWNlIiwiaXRlbUNsYXNzTmFtZSIsIml0ZW1zIiwibWFwIiwibGluZUNvdW50IiwibmF2YmFyU3R5bGUiLCJoZWlnaHRQeCIsInBhcnNlSW50IiwibGluZUhlaWdodCIsImNvbWJvYm94IiwiY29tcG9uZW50UmlnaHQiLCJwbGFjZWhvbGRlciIsIm5hdkxpc3QiLCJzZWxlY3RPcHRpb25zIiwibGFiZWwiLCJsaW5lQ291bnROZWVkZWQiLCJjdXN0b21MaW5lQ291bnQiLCJjdXN0b21Cb3JkZXJDbGFzcyIsImN1c3RvbUluYWN0aXZlQm9yZGVyIiwiaW5hY3RpdmVCb3JkZXIiLCJib3JkZXJDbGFzcyIsImFjdGl2ZUl0ZW0iLCJjb21wb25lbnREaWRNb3VudCIsIndpbmRvdyIsImFkZEV2ZW50TGlzdGVuZXIiLCJjb21wb25lbnREaWRVcGRhdGUiLCJwcmV2UHJvcHMiLCJwcmV2U3RhdGUiLCJjb21wb25lbnRXaWxsVW5tb3VudCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJyZW5kZXIiLCJQdXJlQ29tcG9uZW50IiwiZGVmYXVsdFByb3BzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBO0FBQ0EsT0FBT0EsS0FBUCxNQUFrQixPQUFsQjtBQUNBLE9BQU9DLFNBQVAsTUFBc0IsWUFBdEI7QUFDQSxTQUFTQyxjQUFULFFBQStCLG1DQUEvQjtBQUNBLFNBQVNDLGNBQVQsRUFBeUJDLE9BQXpCLFFBQXdDLGlCQUF4QztBQUNBLFNBQVNDLFFBQVQsUUFBeUIsVUFBekI7O0FBRUEsT0FBTywwQkFBUDs7SUFFcUJDLGdCOzs7QUFxQ25CLDRCQUFZQyxLQUFaLEVBQW1CO0FBQUE7O0FBQUEsaURBQ2pCLGdDQUFNQSxLQUFOLENBRGlCOztBQUFBLFVBS25CQyxLQUxtQixHQUtYO0FBQ05DLHVCQUFpQixLQURYO0FBRU5DLDRCQUFzQixDQUFDO0FBRmpCLEtBTFc7O0FBQUEsVUErQm5CQyx1QkEvQm1CLEdBK0JPLFlBQU07QUFDOUIsVUFBTUMsY0FBYyxNQUFLQyxrQkFBTCxHQUEwQixNQUFLQSxrQkFBTCxDQUF3QkMsV0FBbEQsR0FBZ0UsQ0FBcEY7QUFDQSxVQUFNQyxjQUFjLE1BQUtDLGtCQUFMLEdBQTBCLE1BQUtBLGtCQUFMLENBQXdCRixX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RixhLFVBdUIzQ0MsWSxHQUFlO0FBQ3BCekMsTUFBSSxtQkFEZ0I7QUFFcEJOLGFBQVcsRUFGUztBQUdwQkwsWUFBVSxvQkFBTSxDQUFFLENBSEU7QUFJcEJrQixxQkFBbUIsS0FKQztBQUtwQnRCLHNCQUFvQixJQUxBO0FBTXBCQyxnQkFBYyxJQU5NO0FBT3BCVyxZQUFVLFNBUFU7QUFRcEJELGNBQVksU0FSUTtBQVNwQndCLGVBQWEsU0FUTztBQVVwQnRCLFVBQVEsTUFWWTtBQVdwQnFCLGtCQUFnQjtBQVhJLEM7U0F2Qkg1RCxnQiIsImZpbGUiOiJyZXNwb25zaXZlLW5hdmJhci5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSByZWFjdC9uby1maW5kLWRvbS1ub2RlICovXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IEZsb2F0aW5nU2VsZWN0IH0gZnJvbSAnQG9wdXNjYXBpdGEvcmVhY3QtZmxvYXRpbmctc2VsZWN0JztcbmltcG9ydCB7IE92ZXJsYXlUcmlnZ2VyLCBUb29sdGlwIH0gZnJvbSAncmVhY3QtYm9vdHN0cmFwJztcbmltcG9ydCB7IGRlYm91bmNlIH0gZnJvbSAnZGVib3VuY2UnO1xuXG5pbXBvcnQgJy4vcmVzcG9uc2l2ZS1uYXZiYXIuc2Nzcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlc3BvbnNpdmVOYXZiYXIgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBpZDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBjbGFzc05hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgc2hvd05hdkl0ZW1Cb3JkZXI6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dOYXZJdGVtVG9vbHRpcDogUHJvcFR5cGVzLmJvb2wsXG4gICAgdG9vbHRpcERlbGF5OiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIGZvbnRTaXplOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGZvbnRXZWlnaHQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgcGxhY2Vob2xkZXI6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgYWN0aXZlS2V5OiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgbGlzdDogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgIG5hbWU6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgICBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICBQcm9wVHlwZXMubm9kZSxcbiAgICAgIF0pLmlzUmVxdWlyZWQsXG4gICAgICBocmVmOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMubnVtYmVyXSksXG4gICAgfSkpLmlzUmVxdWlyZWQsXG4gICAgb25TZWxlY3Q6IFByb3BUeXBlcy5mdW5jLFxuICAgIGhlaWdodDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBjb21wb25lbnRSaWdodDogUHJvcFR5cGVzLm5vZGUsXG4gIH1cblxuICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgIGlkOiAncmVzcG9uc2l2ZS1uYXZiYXInLFxuICAgIGNsYXNzTmFtZTogJycsXG4gICAgb25TZWxlY3Q6ICgpID0+IHt9LFxuICAgIHNob3dOYXZJdGVtQm9yZGVyOiBmYWxzZSxcbiAgICBzaG93TmF2SXRlbVRvb2x0aXA6IHRydWUsXG4gICAgdG9vbHRpcERlbGF5OiAyMDAwLFxuICAgIGZvbnRTaXplOiAnaW5oZXJpdCcsXG4gICAgZm9udFdlaWdodDogJ2luaGVyaXQnLFxuICAgIHBsYWNlaG9sZGVyOiAnbW9yZS4uLicsXG4gICAgaGVpZ2h0OiAnNDBweCcsXG4gICAgY29tcG9uZW50UmlnaHQ6IG51bGwsXG4gIH1cblxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLml0ZW1XaWR0aHMgPSBbXTsgLy8gc3RvcmUgaXRlbSB3aWR0aHMgaGVyZSwgdGhleSBkb24ndCBjaGFuZ2VcbiAgfVxuXG4gIHN0YXRlID0ge1xuICAgIGlzU2VsZWN0VmlzaWJsZTogZmFsc2UsXG4gICAgbGFzdFZpc2libGVJdGVtSW5kZXg6IC0yLFxuICB9O1xuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBkZWJvdW5jZSh0aGlzLnJlZnJlc2hMYXN0VmlzaWJsZUl0ZW0pKTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignb3JpZW50YXRpb25jaGFuZ2UnLCB0aGlzLnJlZnJlc2hMYXN0VmlzaWJsZUl0ZW0pOyAvLyBmb3IgbW9iaWxlIHN1cHBvcnRcbiAgICB0aGlzLnJlZnJlc2hMYXN0VmlzaWJsZUl0ZW0oKTtcbiAgfVxuXG4gIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHMsIHByZXZTdGF0ZSkge1xuICAgIC8vIFJlZnJlc2ggdmlzaWJsZSBpdGVtcyBpZiB2YWx1ZXMgY2hhbmdlXG4gICAgaWYgKFxuICAgICAgdGhpcy5zdGF0ZS5pc1NlbGVjdFZpc2libGUgIT09IHByZXZTdGF0ZS5pc1NlbGVjdFZpc2libGUgfHxcbiAgICAgIHRoaXMuc3RhdGUubGFzdFZpc2libGVJdGVtSW5kZXggIT09IHByZXZTdGF0ZS5sYXN0VmlzaWJsZUl0ZW1JbmRleFxuICAgICkge1xuICAgICAgdGhpcy5yZWZyZXNoTGFzdFZpc2libGVJdGVtKCk7XG4gICAgfVxuICB9XG5cbiAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGRlYm91bmNlKHRoaXMucmVmcmVzaExhc3RWaXNpYmxlSXRlbSkpO1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdvcmllbnRhdGlvbmNoYW5nZScsIHRoaXMucmVmcmVzaExhc3RWaXNpYmxlSXRlbSk7IC8vIGZvciBtb2JpbGUgc3VwcG9ydFxuICB9XG5cbiAgZ2V0TGFzdFZpc2libGVJdGVtSW5kZXggPSAoKSA9PiB7XG4gICAgY29uc3QgbmF2QmFyV2lkdGggPSB0aGlzLm5hdmJhckNvbnRhaW5lclJlZiA/IHRoaXMubmF2YmFyQ29udGFpbmVyUmVmLm9mZnNldFdpZHRoIDogMDtcbiAgICBjb25zdCBzZWxlY3RXaWR0aCA9IHRoaXMuc2VsZWN0Q29udGFpbmVyUmVmID8gdGhpcy5zZWxlY3RDb250YWluZXJSZWYub2Zmc2V0V2lkdGggOiAwO1xuICAgIGNvbnN0IGNvbXBvbmVudFJpZ2h0V2lkdGggPSB0aGlzLmNvbXBvbmVudFJpZ2h0Q29udGFpbmVyUmVmID8gdGhpcy5jb21wb25lbnRSaWdodENvbnRhaW5lclJlZi5vZmZzZXRXaWR0aCA6IDA7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcblxuICAgIGxldCByZW1haW5pbmdXaWR0aCA9IG5hdkJhcldpZHRoIC0gc2VsZWN0V2lkdGggLSBjb21wb25lbnRSaWdodFdpZHRoO1xuICAgIGxldCBsYXN0VmlzaWJsZSA9IDA7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucHJvcHMubGlzdC5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgcmVtYWluaW5nV2lkdGggLT0gdGhpcy5pdGVtV2lkdGhzW2ldO1xuICAgICAgaWYgKHJlbWFpbmluZ1dpZHRoIDwgMCkge1xuICAgICAgICBsYXN0VmlzaWJsZSAtPSAxO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGxhc3RWaXNpYmxlICs9IDE7XG4gICAgfVxuXG4gICAgcmV0dXJuIGxhc3RWaXNpYmxlO1xuICB9XG5cbiAgcmVmcmVzaExhc3RWaXNpYmxlSXRlbSA9ICgpID0+IHtcbiAgICBjb25zdCBsYXN0VmlzaWJsZUl0ZW1JbmRleCA9IHRoaXMuZ2V0TGFzdFZpc2libGVJdGVtSW5kZXgoKTtcbiAgICBpZiAodGhpcy5zdGF0ZS5sYXN0VmlzaWJsZUl0ZW1JbmRleCAhPT0gbGFzdFZpc2libGVJdGVtSW5kZXgpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBpc1NlbGVjdFZpc2libGU6IHRoaXMucHJvcHMubGlzdC5sZW5ndGggPiAobGFzdFZpc2libGVJdGVtSW5kZXggKyAxKSxcbiAgICAgICAgbGFzdFZpc2libGVJdGVtSW5kZXgsXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICB0b29sdGlwV3JhcHBlciA9IChub2RlLCBpbmRleCwgdG9vbHRpcENvbnRlbnQpID0+IHtcbiAgICBjb25zdCB0b29sdGlwID0gPFRvb2x0aXAgaWQ9XCJ0b29sdGlwXCI+e3Rvb2x0aXBDb250ZW50fTwvVG9vbHRpcD47XG4gICAgcmV0dXJuICF0aGlzLnByb3BzLnNob3dOYXZJdGVtVG9vbHRpcCA/IG5vZGUgOlxuICAgIDxPdmVybGF5VHJpZ2dlciBwbGFjZW1lbnQ9XCJib3R0b21cIiBrZXk9e2luZGV4fSBvdmVybGF5PXt0b29sdGlwfSBkZWxheVNob3c9e3RoaXMucHJvcHMudG9vbHRpcERlbGF5fT5cbiAgICAgIHtub2RlfVxuICAgIDwvT3ZlcmxheVRyaWdnZXI+O1xuICB9XG5cbiAgLy8gSGFuZGxlIHJlYWN0LXNlbGVjdCBvbkNoYW5nZVxuICBoYW5kbGVPbkNoYW5nZSA9ICh7IHZhbHVlIH0pID0+IHtcbiAgICB0aGlzLnByb3BzLm9uU2VsZWN0KHZhbHVlKTtcbiAgfVxuXG4gIC8vIEhhbmRsZSBuYXZiYXIgb25DbGlja1xuICBoYW5kbGVPbkNsaWNrID0gaHJlZiA9PiAoKSA9PiB7XG4gICAgdGhpcy5wcm9wcy5vblNlbGVjdChocmVmKTtcbiAgfVxuXG4gIC8vIFJlbmRlciBuYXZiYXIgaXRlbVxuICBuYXZiYXJJdGVtID0gKGl0ZW0sIGluZGV4LCBjbGFzc05hbWUpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBhY3RpdmVLZXksXG4gICAgICBmb250V2VpZ2h0LFxuICAgICAgZm9udFNpemUsXG4gICAgICBoZWlnaHQsXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgcmV0dXJuIChcbiAgICAgIDxidXR0b25cbiAgICAgICAgY2xhc3NOYW1lPXtpbmRleCA9PT0gYWN0aXZlS2V5ID8gYCR7Y2xhc3NOYW1lfSBzZWxlY3RlZC1ib3JkZXJgIDogYCR7Y2xhc3NOYW1lfWB9XG4gICAgICAgIHN0eWxlPXt7IGZvbnRXZWlnaHQsIGZvbnRTaXplLCBtaW5IZWlnaHQ6IGhlaWdodCB9fVxuICAgICAgICBpZD17aXRlbS5pZCB8fCBgbmF2SXRlbSR7U3RyaW5nKGluZGV4KX1gfVxuICAgICAgICBrZXk9e2l0ZW0uaWQgfHwgYG5hdml0ZW0ke1N0cmluZyhpbmRleCl9YH1cbiAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVPbkNsaWNrKGl0ZW0uaHJlZil9XG4gICAgICAgIHJlZj17KHIpID0+IHtcbiAgICAgICAgICBpZiAociAmJiAhdGhpcy5pdGVtV2lkdGhzW2luZGV4XSkgdGhpcy5pdGVtV2lkdGhzW2luZGV4XSA9IHIub2Zmc2V0V2lkdGg7XG4gICAgICAgIH19XG4gICAgICA+XG4gICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInJlc3BvbnNpdmUtbmF2YmFyLWl0ZW0tdGV4dFwiPntpdGVtLm5hbWV9PC9zcGFuPlxuICAgICAgPC9idXR0b24+XG4gICAgKTtcbiAgfVxuXG4gIGRvTGluZUNvdW50ID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgbGlzdCB9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gbGlzdC5zb21lKGl0ZW0gPT4gdHlwZW9mIChpdGVtLm5hbWUpICE9PSAnc3RyaW5nJyk7XG4gIH1cblxuICAvLyBSZW5kZXIgbmF2YmFyXG4gIG5hdmJhciA9ICgpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBpZCxcbiAgICAgIGNsYXNzTmFtZSxcbiAgICAgIGxpc3QsXG4gICAgICBzaG93TmF2SXRlbUJvcmRlcixcbiAgICAgIGhlaWdodCxcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB2aXNpYmxlTGlzdCA9IHRoaXMuc3RhdGUubGFzdFZpc2libGVJdGVtSW5kZXggPiAtMiA/XG4gICAgICBsaXN0LnNsaWNlKDAsIHRoaXMuc3RhdGUubGFzdFZpc2libGVJdGVtSW5kZXggKyAxKSA6XG4gICAgICBsaXN0O1xuICAgIGNvbnN0IGl0ZW1DbGFzc05hbWUgPSBzaG93TmF2SXRlbUJvcmRlciA/XG4gICAgICAncmVzcG9uc2l2ZS1uYXZiYXItaXRlbSBpbmFjdGl2ZS1ib3JkZXInIDpcbiAgICAgICdyZXNwb25zaXZlLW5hdmJhci1pdGVtIG5vLWl0ZW0tYm9yZGVyJztcbiAgICBjb25zdCBpdGVtcyA9IHZpc2libGVMaXN0Lm1hcCgoaXRlbSwgaW5kZXgpID0+IChcbiAgICAgIHRoaXMudG9vbHRpcFdyYXBwZXIodGhpcy5uYXZiYXJJdGVtKGl0ZW0sIGluZGV4LCBpdGVtQ2xhc3NOYW1lKSwgaW5kZXgsIGl0ZW0ubmFtZSlcbiAgICApKTtcbiAgICBjb25zdCBsaW5lQ291bnQgPSB0aGlzLmRvTGluZUNvdW50KCk7XG4gICAgY29uc3QgbmF2YmFyU3R5bGUgPSB7XG4gICAgICBtaW5IZWlnaHQ6IGhlaWdodCxcbiAgICB9O1xuICAgIGlmIChoZWlnaHQuc2xpY2UoLTIpID09PSAncHgnICYmIGxpbmVDb3VudCkge1xuICAgICAgY29uc3QgaGVpZ2h0UHggPSBwYXJzZUludChoZWlnaHQuc2xpY2UoMCwgLTIpLCAxMCk7XG4gICAgICBuYXZiYXJTdHlsZS5saW5lSGVpZ2h0ID0gYCR7KGhlaWdodFB4IC0gNCl9cHhgO1xuICAgIH1cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdlxuICAgICAgICBpZD17YCR7aWR9LWNvbnRhaW5lcmB9XG4gICAgICAgIHJlZj17KHIpID0+IHsgdGhpcy5uYXZiYXJDb250YWluZXJSZWYgPSByOyB9fVxuICAgICAgICBjbGFzc05hbWU9e2ByZXNwb25zaXZlLW5hdmJhci1jb250YWluZXIgJHtjbGFzc05hbWV9YH1cbiAgICAgICAgc3R5bGU9e25hdmJhclN0eWxlfVxuICAgICAgPlxuICAgICAgICB7aXRlbXN9XG4gICAgICAgIHt0aGlzLmNvbWJvYm94KCl9XG4gICAgICAgIHt0aGlzLmNvbXBvbmVudFJpZ2h0KCl9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG5cbiAgLy8gUmVuZGVyIGNvbWJvYm94LCB3aGVuIGFsbCBpdGVtcyBkbyBub3QgZml0XG4gIGNvbWJvYm94ID0gKCkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIGlkLFxuICAgICAgbGlzdCxcbiAgICAgIGZvbnRTaXplLFxuICAgICAgYWN0aXZlS2V5LFxuICAgICAgZm9udFdlaWdodCxcbiAgICAgIHBsYWNlaG9sZGVyLFxuICAgICAgc2hvd05hdkl0ZW1Cb3JkZXIsXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKCF0aGlzLnN0YXRlLmlzU2VsZWN0VmlzaWJsZSkge1xuICAgICAgLy8gcmV0dXJuIG51bGwgaWYgYWxsIG5hdiBpdGVtcyBhcmUgdmlzaWJsZVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgLy8gc2xpY2UgbmF2IGl0ZW1zIGxpc3QgYW5kIHNob3cgaW52aXNpYmxlIGl0ZW1zIGluIHRoZSBjb21ib2JveFxuICAgIGNvbnN0IG5hdkxpc3QgPSB0aGlzLnN0YXRlLmxhc3RWaXNpYmxlSXRlbUluZGV4ID4gLTIgP1xuICAgICAgbGlzdC5zbGljZSh0aGlzLnN0YXRlLmxhc3RWaXNpYmxlSXRlbUluZGV4ICsgMSkgOiBsaXN0O1xuICAgIGNvbnN0IHNlbGVjdE9wdGlvbnMgPSBuYXZMaXN0Lm1hcChpdGVtID0+ICh7XG4gICAgICB2YWx1ZTogaXRlbS5ocmVmLFxuICAgICAgbGFiZWw6IGl0ZW0ubmFtZSxcbiAgICB9KSk7XG4gICAgY29uc3QgbGluZUNvdW50TmVlZGVkID0gdGhpcy5kb0xpbmVDb3VudCgpO1xuICAgIGNvbnN0IGN1c3RvbUxpbmVDb3VudCA9IGxpbmVDb3VudE5lZWRlZCA/ICdsaW5lLWNvdW50JyA6ICcnO1xuICAgIGNvbnN0IGN1c3RvbUJvcmRlckNsYXNzID0gbGluZUNvdW50TmVlZGVkID8gJ3NlbGVjdGVkLWJvcmRlciBsaW5lLWNvdW50JyA6ICdzZWxlY3RlZC1ib3JkZXInO1xuICAgIGNvbnN0IGN1c3RvbUluYWN0aXZlQm9yZGVyID0gbGluZUNvdW50TmVlZGVkID8gJ2luYWN0aXZlLWJvcmRlciBsaW5lLWNvdW50JyA6ICdpbmFjdGl2ZS1ib3JkZXInO1xuICAgIGNvbnN0IGluYWN0aXZlQm9yZGVyID0gc2hvd05hdkl0ZW1Cb3JkZXIgPyBjdXN0b21JbmFjdGl2ZUJvcmRlciA6IGN1c3RvbUxpbmVDb3VudDtcbiAgICBjb25zdCBib3JkZXJDbGFzcyA9IGFjdGl2ZUtleSA+PSAodGhpcy5zdGF0ZS5sYXN0VmlzaWJsZUl0ZW1JbmRleCArIDEpID8gY3VzdG9tQm9yZGVyQ2xhc3MgOiBpbmFjdGl2ZUJvcmRlcjsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgIGNvbnN0IGFjdGl2ZUl0ZW0gPSBsaXN0W2FjdGl2ZUtleV07XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXZcbiAgICAgICAgaWQ9e2Ake2lkfS1zZWxlY3RgfVxuICAgICAgICBjbGFzc05hbWU9e2ByZXNwb25zaXZlLW5hdmJhci1zZWxlY3QgJHtib3JkZXJDbGFzc31gfVxuICAgICAgICBzdHlsZT17eyBmb250V2VpZ2h0LCBmb250U2l6ZSB9fVxuICAgICAgICByZWY9eyhyKSA9PiB7IHRoaXMuc2VsZWN0Q29udGFpbmVyUmVmID0gcjsgfX1cbiAgICAgID5cbiAgICAgICAgPEZsb2F0aW5nU2VsZWN0XG4gICAgICAgICAgbmFtZT17YCR7aWR9LXNlbGVjdC1jb21wb25lbnRgfVxuICAgICAgICAgIHZhbHVlPXthY3RpdmVJdGVtID8gYWN0aXZlSXRlbS5ocmVmIDogJyd9XG4gICAgICAgICAgaXNDbGVhcmFibGU9e2ZhbHNlfVxuICAgICAgICAgIHBsYWNlaG9sZGVyPXtwbGFjZWhvbGRlcn1cbiAgICAgICAgICBvcHRpb25zPXtzZWxlY3RPcHRpb25zfVxuICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZU9uQ2hhbmdlfVxuICAgICAgICAvPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxuXG4gIC8vIFJlbmRlciBjdXN0b20gcmlnaHQgc2lkZSBjb21wb25lbnRcbiAgY29tcG9uZW50UmlnaHQgPSAoKSA9PiB7XG4gICAgY29uc3QgeyBjb21wb25lbnRSaWdodCB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAoIWNvbXBvbmVudFJpZ2h0KSByZXR1cm4gbnVsbDtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdlxuICAgICAgICBjbGFzc05hbWU9XCJyZXNwb25zaXZlLW5hdmJhci1jb250YWluZXItcmlnaHRcIlxuICAgICAgICByZWY9eyhyKSA9PiB7IHRoaXMuY29tcG9uZW50UmlnaHRDb250YWluZXJSZWYgPSByOyB9fVxuICAgICAgPlxuICAgICAgICB7IGNvbXBvbmVudFJpZ2h0IH1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMubmF2YmFyKCk7XG4gIH1cbn1cbiJdfQ==