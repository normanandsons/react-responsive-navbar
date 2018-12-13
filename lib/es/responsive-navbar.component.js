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
      return React.createElement(
        'button',
        {
          className: index === _this.props.activeKey ? className + ' selected-border' : '' + className,
          style: { fontWeight: _this.props.fontWeight, fontSize: _this.props.fontSize },
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
      var _this$props = _this.props,
          id = _this$props.id,
          className = _this$props.className,
          list = _this$props.list,
          showNavItemBorder = _this$props.showNavItemBorder,
          height = _this$props.height;

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
      var _this$props2 = _this.props,
          id = _this$props2.id,
          list = _this$props2.list,
          fontSize = _this$props2.fontSize,
          activeKey = _this$props2.activeKey,
          fontWeight = _this$props2.fontWeight,
          placeholder = _this$props2.placeholder,
          showNavItemBorder = _this$props2.showNavItemBorder;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yZXNwb25zaXZlLW5hdmJhci5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIlJlYWN0IiwiUHJvcFR5cGVzIiwiRmxvYXRpbmdTZWxlY3QiLCJPdmVybGF5VHJpZ2dlciIsIlRvb2x0aXAiLCJkZWJvdW5jZSIsIlJlc3BvbnNpdmVOYXZiYXIiLCJwcm9wcyIsInN0YXRlIiwiaXNTZWxlY3RWaXNpYmxlIiwibGFzdFZpc2libGVJdGVtSW5kZXgiLCJnZXRMYXN0VmlzaWJsZUl0ZW1JbmRleCIsIm5hdkJhcldpZHRoIiwibmF2YmFyQ29udGFpbmVyUmVmIiwib2Zmc2V0V2lkdGgiLCJzZWxlY3RXaWR0aCIsInNlbGVjdENvbnRhaW5lclJlZiIsImNvbXBvbmVudFJpZ2h0V2lkdGgiLCJjb21wb25lbnRSaWdodENvbnRhaW5lclJlZiIsInJlbWFpbmluZ1dpZHRoIiwibGFzdFZpc2libGUiLCJpIiwibGlzdCIsImxlbmd0aCIsIml0ZW1XaWR0aHMiLCJyZWZyZXNoTGFzdFZpc2libGVJdGVtIiwic2V0U3RhdGUiLCJ0b29sdGlwV3JhcHBlciIsIm5vZGUiLCJpbmRleCIsInRvb2x0aXBDb250ZW50IiwidG9vbHRpcCIsInNob3dOYXZJdGVtVG9vbHRpcCIsInRvb2x0aXBEZWxheSIsImhhbmRsZU9uQ2hhbmdlIiwidmFsdWUiLCJvblNlbGVjdCIsImhhbmRsZU9uQ2xpY2siLCJocmVmIiwibmF2YmFySXRlbSIsIml0ZW0iLCJjbGFzc05hbWUiLCJhY3RpdmVLZXkiLCJmb250V2VpZ2h0IiwiZm9udFNpemUiLCJpZCIsIlN0cmluZyIsInIiLCJuYW1lIiwiZG9MaW5lQ291bnQiLCJzb21lIiwibmF2YmFyIiwic2hvd05hdkl0ZW1Cb3JkZXIiLCJoZWlnaHQiLCJ2aXNpYmxlTGlzdCIsInNsaWNlIiwiaXRlbUNsYXNzTmFtZSIsIml0ZW1zIiwibWFwIiwibGluZUNvdW50IiwibmF2YmFyU3R5bGUiLCJtaW5IZWlnaHQiLCJoZWlnaHRQeCIsInBhcnNlSW50IiwibGluZUhlaWdodCIsImNvbWJvYm94IiwiY29tcG9uZW50UmlnaHQiLCJwbGFjZWhvbGRlciIsIm5hdkxpc3QiLCJzZWxlY3RPcHRpb25zIiwibGFiZWwiLCJsaW5lQ291bnROZWVkZWQiLCJjdXN0b21MaW5lQ291bnQiLCJjdXN0b21Cb3JkZXJDbGFzcyIsImN1c3RvbUluYWN0aXZlQm9yZGVyIiwiaW5hY3RpdmVCb3JkZXIiLCJib3JkZXJDbGFzcyIsImFjdGl2ZUl0ZW0iLCJjb21wb25lbnREaWRNb3VudCIsIndpbmRvdyIsImFkZEV2ZW50TGlzdGVuZXIiLCJjb21wb25lbnREaWRVcGRhdGUiLCJwcmV2UHJvcHMiLCJwcmV2U3RhdGUiLCJjb21wb25lbnRXaWxsVW5tb3VudCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJyZW5kZXIiLCJQdXJlQ29tcG9uZW50IiwiZGVmYXVsdFByb3BzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBO0FBQ0EsT0FBT0EsS0FBUCxNQUFrQixPQUFsQjtBQUNBLE9BQU9DLFNBQVAsTUFBc0IsWUFBdEI7QUFDQSxTQUFTQyxjQUFULFFBQStCLG1DQUEvQjtBQUNBLFNBQVNDLGNBQVQsRUFBeUJDLE9BQXpCLFFBQXdDLGlCQUF4QztBQUNBLFNBQVNDLFFBQVQsUUFBeUIsVUFBekI7O0FBRUEsT0FBTywwQkFBUDs7SUFFcUJDLGdCOzs7QUFxQ25CLDRCQUFZQyxLQUFaLEVBQW1CO0FBQUE7O0FBQUEsaURBQ2pCLGdDQUFNQSxLQUFOLENBRGlCOztBQUFBLFVBS25CQyxLQUxtQixHQUtYO0FBQ05DLHVCQUFpQixLQURYO0FBRU5DLDRCQUFzQixDQUFDO0FBRmpCLEtBTFc7O0FBQUEsVUErQm5CQyx1QkEvQm1CLEdBK0JPLFlBQU07QUFDOUIsVUFBTUMsY0FBYyxNQUFLQyxrQkFBTCxHQUEwQixNQUFLQSxrQkFBTCxDQUF3QkMsV0FBbEQsR0FBZ0UsQ0FBcEY7QUFDQSxVQUFNQyxjQUFjLE1BQUtDLGtCQUFMLEdBQTBCLE1BQUtBLGtCQUFMLENBQXdCRixX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b0IsSUFMQTtBQU1wQkMsZ0JBQWMsSUFOTTtBQU9wQlcsWUFBVSxTQVBVO0FBUXBCRCxjQUFZLFNBUlE7QUFTcEJ3QixlQUFhLFNBVE87QUFVcEJkLFVBQVEsTUFWWTtBQVdwQmEsa0JBQWdCO0FBWEksQztTQXZCSDVELGdCIiwiZmlsZSI6InJlc3BvbnNpdmUtbmF2YmFyLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIHJlYWN0L25vLWZpbmQtZG9tLW5vZGUgKi9cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgRmxvYXRpbmdTZWxlY3QgfSBmcm9tICdAb3B1c2NhcGl0YS9yZWFjdC1mbG9hdGluZy1zZWxlY3QnO1xuaW1wb3J0IHsgT3ZlcmxheVRyaWdnZXIsIFRvb2x0aXAgfSBmcm9tICdyZWFjdC1ib290c3RyYXAnO1xuaW1wb3J0IHsgZGVib3VuY2UgfSBmcm9tICdkZWJvdW5jZSc7XG5cbmltcG9ydCAnLi9yZXNwb25zaXZlLW5hdmJhci5zY3NzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVzcG9uc2l2ZU5hdmJhciBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIGlkOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGNsYXNzTmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBzaG93TmF2SXRlbUJvcmRlcjogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd05hdkl0ZW1Ub29sdGlwOiBQcm9wVHlwZXMuYm9vbCxcbiAgICB0b29sdGlwRGVsYXk6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgZm9udFNpemU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgZm9udFdlaWdodDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBwbGFjZWhvbGRlcjogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBhY3RpdmVLZXk6IFByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcbiAgICBsaXN0OiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgbmFtZTogUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICAgIFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgIFByb3BUeXBlcy5ub2RlLFxuICAgICAgXSkuaXNSZXF1aXJlZCxcbiAgICAgIGhyZWY6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5udW1iZXJdKSxcbiAgICB9KSkuaXNSZXF1aXJlZCxcbiAgICBvblNlbGVjdDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgaGVpZ2h0OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGNvbXBvbmVudFJpZ2h0OiBQcm9wVHlwZXMubm9kZSxcbiAgfVxuXG4gIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgaWQ6ICdyZXNwb25zaXZlLW5hdmJhcicsXG4gICAgY2xhc3NOYW1lOiAnJyxcbiAgICBvblNlbGVjdDogKCkgPT4ge30sXG4gICAgc2hvd05hdkl0ZW1Cb3JkZXI6IGZhbHNlLFxuICAgIHNob3dOYXZJdGVtVG9vbHRpcDogdHJ1ZSxcbiAgICB0b29sdGlwRGVsYXk6IDIwMDAsXG4gICAgZm9udFNpemU6ICdpbmhlcml0JyxcbiAgICBmb250V2VpZ2h0OiAnaW5oZXJpdCcsXG4gICAgcGxhY2Vob2xkZXI6ICdtb3JlLi4uJyxcbiAgICBoZWlnaHQ6ICc0MHB4JyxcbiAgICBjb21wb25lbnRSaWdodDogbnVsbCxcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuaXRlbVdpZHRocyA9IFtdOyAvLyBzdG9yZSBpdGVtIHdpZHRocyBoZXJlLCB0aGV5IGRvbid0IGNoYW5nZVxuICB9XG5cbiAgc3RhdGUgPSB7XG4gICAgaXNTZWxlY3RWaXNpYmxlOiBmYWxzZSxcbiAgICBsYXN0VmlzaWJsZUl0ZW1JbmRleDogLTIsXG4gIH07XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGRlYm91bmNlKHRoaXMucmVmcmVzaExhc3RWaXNpYmxlSXRlbSkpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdvcmllbnRhdGlvbmNoYW5nZScsIHRoaXMucmVmcmVzaExhc3RWaXNpYmxlSXRlbSk7IC8vIGZvciBtb2JpbGUgc3VwcG9ydFxuICAgIHRoaXMucmVmcmVzaExhc3RWaXNpYmxlSXRlbSgpO1xuICB9XG5cbiAgY29tcG9uZW50RGlkVXBkYXRlKHByZXZQcm9wcywgcHJldlN0YXRlKSB7XG4gICAgLy8gUmVmcmVzaCB2aXNpYmxlIGl0ZW1zIGlmIHZhbHVlcyBjaGFuZ2VcbiAgICBpZiAoXG4gICAgICB0aGlzLnN0YXRlLmlzU2VsZWN0VmlzaWJsZSAhPT0gcHJldlN0YXRlLmlzU2VsZWN0VmlzaWJsZSB8fFxuICAgICAgdGhpcy5zdGF0ZS5sYXN0VmlzaWJsZUl0ZW1JbmRleCAhPT0gcHJldlN0YXRlLmxhc3RWaXNpYmxlSXRlbUluZGV4XG4gICAgKSB7XG4gICAgICB0aGlzLnJlZnJlc2hMYXN0VmlzaWJsZUl0ZW0oKTtcbiAgICB9XG4gIH1cblxuICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgZGVib3VuY2UodGhpcy5yZWZyZXNoTGFzdFZpc2libGVJdGVtKSk7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ29yaWVudGF0aW9uY2hhbmdlJywgdGhpcy5yZWZyZXNoTGFzdFZpc2libGVJdGVtKTsgLy8gZm9yIG1vYmlsZSBzdXBwb3J0XG4gIH1cblxuICBnZXRMYXN0VmlzaWJsZUl0ZW1JbmRleCA9ICgpID0+IHtcbiAgICBjb25zdCBuYXZCYXJXaWR0aCA9IHRoaXMubmF2YmFyQ29udGFpbmVyUmVmID8gdGhpcy5uYXZiYXJDb250YWluZXJSZWYub2Zmc2V0V2lkdGggOiAwO1xuICAgIGNvbnN0IHNlbGVjdFdpZHRoID0gdGhpcy5zZWxlY3RDb250YWluZXJSZWYgPyB0aGlzLnNlbGVjdENvbnRhaW5lclJlZi5vZmZzZXRXaWR0aCA6IDA7XG4gICAgY29uc3QgY29tcG9uZW50UmlnaHRXaWR0aCA9IHRoaXMuY29tcG9uZW50UmlnaHRDb250YWluZXJSZWYgPyB0aGlzLmNvbXBvbmVudFJpZ2h0Q29udGFpbmVyUmVmLm9mZnNldFdpZHRoIDogMDsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuXG4gICAgbGV0IHJlbWFpbmluZ1dpZHRoID0gbmF2QmFyV2lkdGggLSBzZWxlY3RXaWR0aCAtIGNvbXBvbmVudFJpZ2h0V2lkdGg7XG4gICAgbGV0IGxhc3RWaXNpYmxlID0gMDtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5wcm9wcy5saXN0Lmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICByZW1haW5pbmdXaWR0aCAtPSB0aGlzLml0ZW1XaWR0aHNbaV07XG4gICAgICBpZiAocmVtYWluaW5nV2lkdGggPCAwKSB7XG4gICAgICAgIGxhc3RWaXNpYmxlIC09IDE7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgbGFzdFZpc2libGUgKz0gMTtcbiAgICB9XG5cbiAgICByZXR1cm4gbGFzdFZpc2libGU7XG4gIH1cblxuICByZWZyZXNoTGFzdFZpc2libGVJdGVtID0gKCkgPT4ge1xuICAgIGNvbnN0IGxhc3RWaXNpYmxlSXRlbUluZGV4ID0gdGhpcy5nZXRMYXN0VmlzaWJsZUl0ZW1JbmRleCgpO1xuICAgIGlmICh0aGlzLnN0YXRlLmxhc3RWaXNpYmxlSXRlbUluZGV4ICE9PSBsYXN0VmlzaWJsZUl0ZW1JbmRleCkge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIGlzU2VsZWN0VmlzaWJsZTogdGhpcy5wcm9wcy5saXN0Lmxlbmd0aCA+IChsYXN0VmlzaWJsZUl0ZW1JbmRleCArIDEpLFxuICAgICAgICBsYXN0VmlzaWJsZUl0ZW1JbmRleCxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHRvb2x0aXBXcmFwcGVyID0gKG5vZGUsIGluZGV4LCB0b29sdGlwQ29udGVudCkgPT4ge1xuICAgIGNvbnN0IHRvb2x0aXAgPSA8VG9vbHRpcCBpZD1cInRvb2x0aXBcIj57dG9vbHRpcENvbnRlbnR9PC9Ub29sdGlwPjtcbiAgICByZXR1cm4gIXRoaXMucHJvcHMuc2hvd05hdkl0ZW1Ub29sdGlwID8gbm9kZSA6XG4gICAgPE92ZXJsYXlUcmlnZ2VyIHBsYWNlbWVudD1cImJvdHRvbVwiIGtleT17aW5kZXh9IG92ZXJsYXk9e3Rvb2x0aXB9IGRlbGF5U2hvdz17dGhpcy5wcm9wcy50b29sdGlwRGVsYXl9PlxuICAgICAge25vZGV9XG4gICAgPC9PdmVybGF5VHJpZ2dlcj47XG4gIH1cblxuICAvLyBIYW5kbGUgcmVhY3Qtc2VsZWN0IG9uQ2hhbmdlXG4gIGhhbmRsZU9uQ2hhbmdlID0gKHsgdmFsdWUgfSkgPT4ge1xuICAgIHRoaXMucHJvcHMub25TZWxlY3QodmFsdWUpO1xuICB9XG5cbiAgLy8gSGFuZGxlIG5hdmJhciBvbkNsaWNrXG4gIGhhbmRsZU9uQ2xpY2sgPSBocmVmID0+ICgpID0+IHtcbiAgICB0aGlzLnByb3BzLm9uU2VsZWN0KGhyZWYpO1xuICB9XG5cbiAgLy8gUmVuZGVyIG5hdmJhciBpdGVtXG4gIG5hdmJhckl0ZW0gPSAoaXRlbSwgaW5kZXgsIGNsYXNzTmFtZSkgPT4gKFxuICAgIDxidXR0b25cbiAgICAgIGNsYXNzTmFtZT17aW5kZXggPT09IHRoaXMucHJvcHMuYWN0aXZlS2V5ID8gYCR7Y2xhc3NOYW1lfSBzZWxlY3RlZC1ib3JkZXJgIDogYCR7Y2xhc3NOYW1lfWB9XG4gICAgICBzdHlsZT17eyBmb250V2VpZ2h0OiB0aGlzLnByb3BzLmZvbnRXZWlnaHQsIGZvbnRTaXplOiB0aGlzLnByb3BzLmZvbnRTaXplIH19XG4gICAgICBpZD17aXRlbS5pZCB8fCBgbmF2SXRlbSR7U3RyaW5nKGluZGV4KX1gfVxuICAgICAga2V5PXtpdGVtLmlkIHx8IGBuYXZpdGVtJHtTdHJpbmcoaW5kZXgpfWB9XG4gICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZU9uQ2xpY2soaXRlbS5ocmVmKX1cbiAgICAgIHJlZj17KHIpID0+IHtcbiAgICAgICAgaWYgKHIgJiYgIXRoaXMuaXRlbVdpZHRoc1tpbmRleF0pIHRoaXMuaXRlbVdpZHRoc1tpbmRleF0gPSByLm9mZnNldFdpZHRoO1xuICAgICAgfX1cbiAgICA+XG4gICAgICA8c3BhbiBjbGFzc05hbWU9XCJyZXNwb25zaXZlLW5hdmJhci1pdGVtLXRleHRcIj57aXRlbS5uYW1lfTwvc3Bhbj5cbiAgICA8L2J1dHRvbj5cbiAgKVxuXG4gIGRvTGluZUNvdW50ID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgbGlzdCB9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gbGlzdC5zb21lKGl0ZW0gPT4gdHlwZW9mIChpdGVtLm5hbWUpICE9PSAnc3RyaW5nJyk7XG4gIH1cblxuICAvLyBSZW5kZXIgbmF2YmFyXG4gIG5hdmJhciA9ICgpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBpZCxcbiAgICAgIGNsYXNzTmFtZSxcbiAgICAgIGxpc3QsXG4gICAgICBzaG93TmF2SXRlbUJvcmRlcixcbiAgICAgIGhlaWdodCxcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB2aXNpYmxlTGlzdCA9IHRoaXMuc3RhdGUubGFzdFZpc2libGVJdGVtSW5kZXggPiAtMiA/XG4gICAgICBsaXN0LnNsaWNlKDAsIHRoaXMuc3RhdGUubGFzdFZpc2libGVJdGVtSW5kZXggKyAxKSA6XG4gICAgICBsaXN0O1xuICAgIGNvbnN0IGl0ZW1DbGFzc05hbWUgPSBzaG93TmF2SXRlbUJvcmRlciA/XG4gICAgICAncmVzcG9uc2l2ZS1uYXZiYXItaXRlbSBpbmFjdGl2ZS1ib3JkZXInIDpcbiAgICAgICdyZXNwb25zaXZlLW5hdmJhci1pdGVtIG5vLWl0ZW0tYm9yZGVyJztcbiAgICBjb25zdCBpdGVtcyA9IHZpc2libGVMaXN0Lm1hcCgoaXRlbSwgaW5kZXgpID0+IChcbiAgICAgIHRoaXMudG9vbHRpcFdyYXBwZXIodGhpcy5uYXZiYXJJdGVtKGl0ZW0sIGluZGV4LCBpdGVtQ2xhc3NOYW1lKSwgaW5kZXgsIGl0ZW0ubmFtZSlcbiAgICApKTtcbiAgICBjb25zdCBsaW5lQ291bnQgPSB0aGlzLmRvTGluZUNvdW50KCk7XG4gICAgY29uc3QgbmF2YmFyU3R5bGUgPSB7XG4gICAgICBtaW5IZWlnaHQ6IGhlaWdodCxcbiAgICB9O1xuICAgIGlmIChoZWlnaHQuc2xpY2UoLTIpID09PSAncHgnICYmIGxpbmVDb3VudCkge1xuICAgICAgY29uc3QgaGVpZ2h0UHggPSBwYXJzZUludChoZWlnaHQuc2xpY2UoMCwgLTIpLCAxMCk7XG4gICAgICBuYXZiYXJTdHlsZS5saW5lSGVpZ2h0ID0gYCR7KGhlaWdodFB4IC0gNCl9cHhgO1xuICAgIH1cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdlxuICAgICAgICBpZD17YCR7aWR9LWNvbnRhaW5lcmB9XG4gICAgICAgIHJlZj17KHIpID0+IHsgdGhpcy5uYXZiYXJDb250YWluZXJSZWYgPSByOyB9fVxuICAgICAgICBjbGFzc05hbWU9e2ByZXNwb25zaXZlLW5hdmJhci1jb250YWluZXIgJHtjbGFzc05hbWV9YH1cbiAgICAgICAgc3R5bGU9e25hdmJhclN0eWxlfVxuICAgICAgPlxuICAgICAgICB7aXRlbXN9XG4gICAgICAgIHt0aGlzLmNvbWJvYm94KCl9XG4gICAgICAgIHt0aGlzLmNvbXBvbmVudFJpZ2h0KCl9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG5cbiAgLy8gUmVuZGVyIGNvbWJvYm94LCB3aGVuIGFsbCBpdGVtcyBkbyBub3QgZml0XG4gIGNvbWJvYm94ID0gKCkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIGlkLFxuICAgICAgbGlzdCxcbiAgICAgIGZvbnRTaXplLFxuICAgICAgYWN0aXZlS2V5LFxuICAgICAgZm9udFdlaWdodCxcbiAgICAgIHBsYWNlaG9sZGVyLFxuICAgICAgc2hvd05hdkl0ZW1Cb3JkZXIsXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKCF0aGlzLnN0YXRlLmlzU2VsZWN0VmlzaWJsZSkge1xuICAgICAgLy8gcmV0dXJuIG51bGwgaWYgYWxsIG5hdiBpdGVtcyBhcmUgdmlzaWJsZVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgLy8gc2xpY2UgbmF2IGl0ZW1zIGxpc3QgYW5kIHNob3cgaW52aXNpYmxlIGl0ZW1zIGluIHRoZSBjb21ib2JveFxuICAgIGNvbnN0IG5hdkxpc3QgPSB0aGlzLnN0YXRlLmxhc3RWaXNpYmxlSXRlbUluZGV4ID4gLTIgP1xuICAgICAgbGlzdC5zbGljZSh0aGlzLnN0YXRlLmxhc3RWaXNpYmxlSXRlbUluZGV4ICsgMSkgOiBsaXN0O1xuICAgIGNvbnN0IHNlbGVjdE9wdGlvbnMgPSBuYXZMaXN0Lm1hcChpdGVtID0+ICh7XG4gICAgICB2YWx1ZTogaXRlbS5ocmVmLFxuICAgICAgbGFiZWw6IGl0ZW0ubmFtZSxcbiAgICB9KSk7XG4gICAgY29uc3QgbGluZUNvdW50TmVlZGVkID0gdGhpcy5kb0xpbmVDb3VudCgpO1xuICAgIGNvbnN0IGN1c3RvbUxpbmVDb3VudCA9IGxpbmVDb3VudE5lZWRlZCA/ICdsaW5lLWNvdW50JyA6ICcnO1xuICAgIGNvbnN0IGN1c3RvbUJvcmRlckNsYXNzID0gbGluZUNvdW50TmVlZGVkID8gJ3NlbGVjdGVkLWJvcmRlciBsaW5lLWNvdW50JyA6ICdzZWxlY3RlZC1ib3JkZXInO1xuICAgIGNvbnN0IGN1c3RvbUluYWN0aXZlQm9yZGVyID0gbGluZUNvdW50TmVlZGVkID8gJ2luYWN0aXZlLWJvcmRlciBsaW5lLWNvdW50JyA6ICdpbmFjdGl2ZS1ib3JkZXInO1xuICAgIGNvbnN0IGluYWN0aXZlQm9yZGVyID0gc2hvd05hdkl0ZW1Cb3JkZXIgPyBjdXN0b21JbmFjdGl2ZUJvcmRlciA6IGN1c3RvbUxpbmVDb3VudDtcbiAgICBjb25zdCBib3JkZXJDbGFzcyA9IGFjdGl2ZUtleSA+PSAodGhpcy5zdGF0ZS5sYXN0VmlzaWJsZUl0ZW1JbmRleCArIDEpID8gY3VzdG9tQm9yZGVyQ2xhc3MgOiBpbmFjdGl2ZUJvcmRlcjsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgIGNvbnN0IGFjdGl2ZUl0ZW0gPSBsaXN0W2FjdGl2ZUtleV07XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXZcbiAgICAgICAgaWQ9e2Ake2lkfS1zZWxlY3RgfVxuICAgICAgICBjbGFzc05hbWU9e2ByZXNwb25zaXZlLW5hdmJhci1zZWxlY3QgJHtib3JkZXJDbGFzc31gfVxuICAgICAgICBzdHlsZT17eyBmb250V2VpZ2h0LCBmb250U2l6ZSB9fVxuICAgICAgICByZWY9eyhyKSA9PiB7IHRoaXMuc2VsZWN0Q29udGFpbmVyUmVmID0gcjsgfX1cbiAgICAgID5cbiAgICAgICAgPEZsb2F0aW5nU2VsZWN0XG4gICAgICAgICAgbmFtZT17YCR7aWR9LXNlbGVjdC1jb21wb25lbnRgfVxuICAgICAgICAgIHZhbHVlPXthY3RpdmVJdGVtID8gYWN0aXZlSXRlbS5ocmVmIDogJyd9XG4gICAgICAgICAgaXNDbGVhcmFibGU9e2ZhbHNlfVxuICAgICAgICAgIHBsYWNlaG9sZGVyPXtwbGFjZWhvbGRlcn1cbiAgICAgICAgICBvcHRpb25zPXtzZWxlY3RPcHRpb25zfVxuICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZU9uQ2hhbmdlfVxuICAgICAgICAvPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxuXG4gIC8vIFJlbmRlciBjdXN0b20gcmlnaHQgc2lkZSBjb21wb25lbnRcbiAgY29tcG9uZW50UmlnaHQgPSAoKSA9PiB7XG4gICAgY29uc3QgeyBjb21wb25lbnRSaWdodCB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAoIWNvbXBvbmVudFJpZ2h0KSByZXR1cm4gbnVsbDtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdlxuICAgICAgICBjbGFzc05hbWU9XCJyZXNwb25zaXZlLW5hdmJhci1jb250YWluZXItcmlnaHRcIlxuICAgICAgICByZWY9eyhyKSA9PiB7IHRoaXMuY29tcG9uZW50UmlnaHRDb250YWluZXJSZWYgPSByOyB9fVxuICAgICAgPlxuICAgICAgICB7IGNvbXBvbmVudFJpZ2h0IH1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMubmF2YmFyKCk7XG4gIH1cbn1cbiJdfQ==