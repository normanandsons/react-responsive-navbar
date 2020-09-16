var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* eslint-disable react/no-find-dom-node */
import React from 'react';
import PropTypes from 'prop-types';
import { FloatingSelect } from '@opuscapita/react-floating-select';
import { debounce } from 'debounce';

// import './responsive-navbar.scss';

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
      return debounce(_this.refreshLastVisibleItem(), 300);
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

    _this.handleOnChange = function (value) {
      _this.props.onSelect(value);
    };

    _this.handleOnClick = function (href, index) {
      return function () {
        _this.props.onSelect(href, index);
      };
    };

    _this.navbarItem = function (item, index, className) {
      var _this$props = _this.props,
          activeKey = _this$props.activeKey,
          fontWeight = _this$props.fontWeight,
          fontSize = _this$props.fontSize,
          height = _this$props.height,
          allowClose = _this$props.allowClose,
          onClose = _this$props.onClose,
          navRenderer = _this$props.navRenderer;


      if (navRenderer) {
        return navRenderer(item, index, className, activeKey === index);
      }

      // resolve activeKeyIndex
      let activeKeyIndex = activeKey;
      if ((typeof activeKey === 'undefined' ? 'undefined' : _typeof(activeKey)) === 'object') {
        activeKeyIndex = _this.activeItemIndex(activeKey);
      }
      return React.createElement(
        'button',
        {
          className: index === activeKeyIndex ? className + ' selected' : '' + className,
          style: { fontWeight: fontWeight, fontSize: fontSize, minHeight: height },
          id: item.id || 'navItem' + String(index),
          key: item.id || 'navitem' + String(index),
          onClick: _this.handleOnClick(item.href, index),
          ref: function ref(r) {
            if (r && !_this.itemWidths[index]) _this.itemWidths[index] = r.offsetWidth;
          }
        },
        React.createElement(
          'span',
          { className: 'responsive-navbar-item-text' },
          item.name,
          allowClose && React.createElement('i', { tabIndex: index + 1, role: 'button', className: 'fa fa-times', onClick: function onClick() {
              return onClose(item.href, index);
            } })
        )
      );
    };

    _this.doLineCount = function () {
      var list = _this.props.list;

      return list.some(function (item) {
        return typeof item.name !== 'string';
      });
    };

    _this.resolveActiveItemFromOptions = function (selectOptions) {
      var activeKey = _this.props.activeKey;

      var activeItem = selectOptions.find(function (opts) {
        return opts.value === activeKey;
      });
      if (!activeItem) {
        activeItem = selectOptions.find(function (opts) {
          return opts.value === activeKey.value;
        });
      }
      return activeItem;
    };

    _this.activeItemIndex = function (activeItem) {
      var list = _this.props.list;

      if (!activeItem) return null;
      return list.findIndex(function (item) {
        return item.href === activeItem.value;
      });
    };

    _this.combobox = function () {
      var _this$props2 = _this.props,
          id = _this$props2.id,
          list = _this$props2.list,
          fontSize = _this$props2.fontSize,
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
      var customBorderClass = lineCountNeeded ? 'selected line-count' : 'selected';
      var customInactiveBorder = lineCountNeeded ? 'inactive line-count' : 'inactive';
      var inactiveBorder = showNavItemBorder ? customInactiveBorder : customLineCount;
      // Resolve activeItem
      var activeItem = _this.resolveActiveItemFromOptions(selectOptions);
      var activeItemIndex = _this.activeItemIndex(activeItem);
      var borderClass = activeItemIndex >= _this.state.lastVisibleItemIndex + 1 ? customBorderClass : inactiveBorder; // eslint-disable-line

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
          value: activeItem || '',
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


  // Render combobox, when all items do not fit


  // Render custom left side component


  // Render custom right side component


  ResponsiveNavbar.prototype.render = function render() {
    var _this2 = this;

    var _props = this.props,
        id = _props.id,
        className = _props.className,
        list = _props.list,
        showNavItemBorder = _props.showNavItemBorder,
        height = _props.height;

    var visibleList = this.state.lastVisibleItemIndex > -2 ? list.slice(0, this.state.lastVisibleItemIndex + 1) : list;
    var itemClassName = showNavItemBorder ? 'responsive-navbar-item inactive-border' : 'responsive-navbar-item no-item-border';
    var items = visibleList.map(function (item, index) {
      return _this2.navbarItem(item, index, itemClassName);
    });
    var lineCount = this.doLineCount();
    var navbarStyle = {
      minHeight: height,
      maxHeight: height
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
          _this2.navbarContainerRef = r;
        },
        className: 'responsive-navbar-container ' + className,
        style: navbarStyle
      },
      items,
      this.combobox(),
      this.componentLeft(),
      this.componentRight()
    );
  };

  return ResponsiveNavbar;
}(React.PureComponent), _class.defaultProps = {
  id: 'responsive-navbar',
  className: '',
  onSelect: function onSelect() {},
  onClose: function onClose() {},
  allowClose: false,
  showNavItemBorder: false,
  fontSize: 'inherit',
  fontWeight: 'inherit',
  placeholder: 'more...',
  height: 30,
  componentLeft: null,
  componentRight: null
}, _temp);
export { ResponsiveNavbar as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yZXNwb25zaXZlLW5hdmJhci5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIlJlYWN0IiwiUHJvcFR5cGVzIiwiRmxvYXRpbmdTZWxlY3QiLCJkZWJvdW5jZSIsIlJlc3BvbnNpdmVOYXZiYXIiLCJwcm9wcyIsInN0YXRlIiwiaXNTZWxlY3RWaXNpYmxlIiwibGFzdFZpc2libGVJdGVtSW5kZXgiLCJnZXRMYXN0VmlzaWJsZUl0ZW1JbmRleCIsIm5hdkJhcldpZHRoIiwibmF2YmFyQ29udGFpbmVyUmVmIiwib2Zmc2V0V2lkdGgiLCJzZWxlY3RXaWR0aCIsInNlbGVjdENvbnRhaW5lclJlZiIsImNvbXBvbmVudExlZnRXaWR0aCIsImNvbXBvbmVudExlZnRDb250YWluZXJSZWYiLCJjb21wb25lbnRSaWdodFdpZHRoIiwiY29tcG9uZW50UmlnaHRDb250YWluZXJSZWYiLCJyZW1haW5pbmdXaWR0aCIsImxhc3RWaXNpYmxlIiwiaSIsImxpc3QiLCJsZW5ndGgiLCJpdGVtV2lkdGhzIiwiaGFuZGxlUmVzaXplIiwicmVmcmVzaExhc3RWaXNpYmxlSXRlbSIsInNldFN0YXRlIiwiaGFuZGxlT25DaGFuZ2UiLCJ2YWx1ZSIsIm9uU2VsZWN0IiwiaGFuZGxlT25DbGljayIsImhyZWYiLCJpbmRleCIsIm5hdmJhckl0ZW0iLCJpdGVtIiwiY2xhc3NOYW1lIiwiYWN0aXZlS2V5IiwiZm9udFdlaWdodCIsImZvbnRTaXplIiwiaGVpZ2h0IiwiYWxsb3dDbG9zZSIsIm9uQ2xvc2UiLCJuYXZSZW5kZXJlciIsImFjdGl2ZUtleUluZGV4IiwiYWN0aXZlSXRlbUluZGV4IiwibWluSGVpZ2h0IiwiaWQiLCJTdHJpbmciLCJyIiwibmFtZSIsImRvTGluZUNvdW50Iiwic29tZSIsInJlc29sdmVBY3RpdmVJdGVtRnJvbU9wdGlvbnMiLCJzZWxlY3RPcHRpb25zIiwiYWN0aXZlSXRlbSIsImZpbmQiLCJvcHRzIiwiZmluZEluZGV4IiwiY29tYm9ib3giLCJwbGFjZWhvbGRlciIsInNob3dOYXZJdGVtQm9yZGVyIiwibmF2TGlzdCIsInNsaWNlIiwibWFwIiwibGFiZWwiLCJsaW5lQ291bnROZWVkZWQiLCJjdXN0b21MaW5lQ291bnQiLCJjdXN0b21Cb3JkZXJDbGFzcyIsImN1c3RvbUluYWN0aXZlQm9yZGVyIiwiaW5hY3RpdmVCb3JkZXIiLCJib3JkZXJDbGFzcyIsImNvbXBvbmVudExlZnQiLCJjb21wb25lbnRSaWdodCIsImNvbXBvbmVudERpZE1vdW50Iiwid2luZG93IiwiYWRkRXZlbnRMaXN0ZW5lciIsImNvbXBvbmVudERpZFVwZGF0ZSIsInByZXZQcm9wcyIsInByZXZTdGF0ZSIsImNvbXBvbmVudFdpbGxVbm1vdW50IiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsInJlbmRlciIsInZpc2libGVMaXN0IiwiaXRlbUNsYXNzTmFtZSIsIml0ZW1zIiwibGluZUNvdW50IiwibmF2YmFyU3R5bGUiLCJtYXhIZWlnaHQiLCJoZWlnaHRQeCIsInBhcnNlSW50IiwibGluZUhlaWdodCIsIlB1cmVDb21wb25lbnQiLCJkZWZhdWx0UHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTtBQUNBLE9BQU9BLEtBQVAsTUFBa0IsT0FBbEI7QUFDQSxPQUFPQyxTQUFQLE1BQXNCLFlBQXRCO0FBQ0EsU0FBU0MsY0FBVCxRQUErQixtQ0FBL0I7QUFDQSxTQUFTQyxRQUFULFFBQXlCLFVBQXpCOztBQUVBOztJQUVxQkMsZ0I7OztBQXVDbkIsNEJBQVlDLEtBQVosRUFBbUI7QUFBQTs7QUFBQSxpREFDakIsZ0NBQU1BLEtBQU4sQ0FEaUI7O0FBQUEsVUFLbkJDLEtBTG1CLEdBS1g7QUFDTkMsdUJBQWlCLEtBRFg7QUFFTkMsNEJBQXNCLENBQUM7QUFGakIsS0FMVzs7QUFBQSxVQTRCbkJDLHVCQTVCbUIsR0E0Qk8sWUFBTTtBQUM5QixVQUFNQyxjQUFjLE1BQUtDLGtCQUFMLEdBQTBCLE1BQUtBLGtCQUFMLENBQXdCQyxXQUFsRCxHQUFnRSxDQUFwRjtBQUNBLFVB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QixDQUFDLENBQWpCLENBQVQsRUFBOEIsRUFBOUIsQ0FBakI7QUFDQXdCLGtCQUFZSSxVQUFaLEdBQTRCRixXQUFXLENBQXZDO0FBQ0Q7QUFDRCxXQUNFO0FBQUE7QUFBQTtBQUNFLFlBQU8xQyxFQUFQLGVBREY7QUFFRSxhQUFLLGFBQUNFLENBQUQsRUFBTztBQUNWLGlCQUFLdEMsa0JBQUwsR0FBMEJzQyxDQUExQjtBQUNELFNBSkg7QUFLRSxvREFBMENiLFNBTDVDO0FBTUUsZUFBT21EO0FBTlQ7QUFRR0YsV0FSSDtBQVNHLFdBQUsxQixRQUFMLEVBVEg7QUFVRyxXQUFLYSxhQUFMLEVBVkg7QUFXRyxXQUFLQyxjQUFMO0FBWEgsS0FERjtBQWVELEc7OztFQTlRMkN6RSxNQUFNNEYsYSxVQXdCM0NDLFksR0FBZTtBQUNwQjlDLE1BQUksbUJBRGdCO0FBRXBCWCxhQUFXLEVBRlM7QUFHcEJOLFlBQVUsb0JBQU0sQ0FBRSxDQUhFO0FBSXBCWSxXQUFTLG1CQUFNLENBQUUsQ0FKRztBQUtwQkQsY0FBWSxLQUxRO0FBTXBCb0IscUJBQW1CLEtBTkM7QUFPcEJ0QixZQUFVLFNBUFU7QUFRcEJELGNBQVksU0FSUTtBQVNwQnNCLGVBQWEsU0FUTztBQVVwQnBCLFVBQVEsRUFWWTtBQVdwQmdDLGlCQUFlLElBWEs7QUFZcEJDLGtCQUFnQjtBQVpJLEM7U0F4QkhyRSxnQiIsImZpbGUiOiJyZXNwb25zaXZlLW5hdmJhci5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSByZWFjdC9uby1maW5kLWRvbS1ub2RlICovXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IEZsb2F0aW5nU2VsZWN0IH0gZnJvbSAnQG9wdXNjYXBpdGEvcmVhY3QtZmxvYXRpbmctc2VsZWN0JztcbmltcG9ydCB7IGRlYm91bmNlIH0gZnJvbSAnZGVib3VuY2UnO1xuXG4vLyBpbXBvcnQgJy4vcmVzcG9uc2l2ZS1uYXZiYXIuc2Nzcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlc3BvbnNpdmVOYXZiYXIgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBpZDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBhbGxvd0Nsb3NlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBvbkNsb3NlOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBuYXZSZW5kZXJlcjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgY2xhc3NOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHNob3dOYXZJdGVtQm9yZGVyOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBmb250U2l6ZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBmb250V2VpZ2h0OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHBsYWNlaG9sZGVyOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGFjdGl2ZUtleTogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnNoYXBlKHt9KSwgUHJvcFR5cGVzLm51bWJlcl0pLmlzUmVxdWlyZWQsXG4gICAgbGlzdDogUHJvcFR5cGVzLmFycmF5T2YoXG4gICAgICBQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgICBuYW1lOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMubm9kZV0pLmlzUmVxdWlyZWQsXG4gICAgICAgIGhyZWY6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5udW1iZXJdKSxcbiAgICAgIH0pXG4gICAgKS5pc1JlcXVpcmVkLFxuICAgIG9uU2VsZWN0OiBQcm9wVHlwZXMuZnVuYyxcbiAgICBoZWlnaHQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgY29tcG9uZW50TGVmdDogUHJvcFR5cGVzLm5vZGUsXG4gICAgY29tcG9uZW50UmlnaHQ6IFByb3BUeXBlcy5ub2RlLFxuICB9O1xuXG4gIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgaWQ6ICdyZXNwb25zaXZlLW5hdmJhcicsXG4gICAgY2xhc3NOYW1lOiAnJyxcbiAgICBvblNlbGVjdDogKCkgPT4ge30sXG4gICAgb25DbG9zZTogKCkgPT4ge30sXG4gICAgYWxsb3dDbG9zZTogZmFsc2UsXG4gICAgc2hvd05hdkl0ZW1Cb3JkZXI6IGZhbHNlLFxuICAgIGZvbnRTaXplOiAnaW5oZXJpdCcsXG4gICAgZm9udFdlaWdodDogJ2luaGVyaXQnLFxuICAgIHBsYWNlaG9sZGVyOiAnbW9yZS4uLicsXG4gICAgaGVpZ2h0OiAzMCxcbiAgICBjb21wb25lbnRMZWZ0OiBudWxsLFxuICAgIGNvbXBvbmVudFJpZ2h0OiBudWxsLFxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuaXRlbVdpZHRocyA9IFtdOyAvLyBzdG9yZSBpdGVtIHdpZHRocyBoZXJlLCB0aGV5IGRvbid0IGNoYW5nZVxuICB9XG5cbiAgc3RhdGUgPSB7XG4gICAgaXNTZWxlY3RWaXNpYmxlOiBmYWxzZSxcbiAgICBsYXN0VmlzaWJsZUl0ZW1JbmRleDogLTIsXG4gIH07XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuaGFuZGxlUmVzaXplKTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignb3JpZW50YXRpb25jaGFuZ2UnLCB0aGlzLnJlZnJlc2hMYXN0VmlzaWJsZUl0ZW0pOyAvLyBmb3IgbW9iaWxlIHN1cHBvcnRcbiAgICB0aGlzLnJlZnJlc2hMYXN0VmlzaWJsZUl0ZW0oKTtcbiAgfVxuXG4gIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHMsIHByZXZTdGF0ZSkge1xuICAgIC8vIFJlZnJlc2ggdmlzaWJsZSBpdGVtcyBpZiB2YWx1ZXMgY2hhbmdlXG4gICAgaWYgKHRoaXMuc3RhdGUuaXNTZWxlY3RWaXNpYmxlICE9PSBwcmV2U3RhdGUuaXNTZWxlY3RWaXNpYmxlIHx8IHRoaXMuc3RhdGUubGFzdFZpc2libGVJdGVtSW5kZXggIT09IHByZXZTdGF0ZS5sYXN0VmlzaWJsZUl0ZW1JbmRleCkge1xuICAgICAgdGhpcy5yZWZyZXNoTGFzdFZpc2libGVJdGVtKCk7XG4gICAgfVxuICB9XG5cbiAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuaGFuZGxlUmVzaXplKTtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignb3JpZW50YXRpb25jaGFuZ2UnLCB0aGlzLnJlZnJlc2hMYXN0VmlzaWJsZUl0ZW0pOyAvLyBmb3IgbW9iaWxlIHN1cHBvcnRcbiAgfVxuXG4gIGdldExhc3RWaXNpYmxlSXRlbUluZGV4ID0gKCkgPT4ge1xuICAgIGNvbnN0IG5hdkJhcldpZHRoID0gdGhpcy5uYXZiYXJDb250YWluZXJSZWYgPyB0aGlzLm5hdmJhckNvbnRhaW5lclJlZi5vZmZzZXRXaWR0aCA6IDA7XG4gICAgY29uc3Qgc2VsZWN0V2lkdGggPSB0aGlzLnNlbGVjdENvbnRhaW5lclJlZiA/IHRoaXMuc2VsZWN0Q29udGFpbmVyUmVmLm9mZnNldFdpZHRoIDogMDtcbiAgICBjb25zdCBjb21wb25lbnRMZWZ0V2lkdGggPSB0aGlzLmNvbXBvbmVudExlZnRDb250YWluZXJSZWYgPyB0aGlzLmNvbXBvbmVudExlZnRDb250YWluZXJSZWYub2Zmc2V0V2lkdGggOiAwOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgY29uc3QgY29tcG9uZW50UmlnaHRXaWR0aCA9IHRoaXMuY29tcG9uZW50UmlnaHRDb250YWluZXJSZWYgPyB0aGlzLmNvbXBvbmVudFJpZ2h0Q29udGFpbmVyUmVmLm9mZnNldFdpZHRoIDogMDsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuXG4gICAgbGV0IHJlbWFpbmluZ1dpZHRoID0gbmF2QmFyV2lkdGggLSBzZWxlY3RXaWR0aCAtIGNvbXBvbmVudExlZnRXaWR0aCAtIGNvbXBvbmVudFJpZ2h0V2lkdGg7XG4gICAgbGV0IGxhc3RWaXNpYmxlID0gMDtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5wcm9wcy5saXN0Lmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICByZW1haW5pbmdXaWR0aCAtPSB0aGlzLml0ZW1XaWR0aHNbaV07XG4gICAgICBpZiAocmVtYWluaW5nV2lkdGggPCAwKSB7XG4gICAgICAgIGxhc3RWaXNpYmxlIC09IDE7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgbGFzdFZpc2libGUgKz0gMTtcbiAgICB9XG5cbiAgICByZXR1cm4gbGFzdFZpc2libGU7XG4gIH07XG5cbiAgaGFuZGxlUmVzaXplID0gKCkgPT4gZGVib3VuY2UodGhpcy5yZWZyZXNoTGFzdFZpc2libGVJdGVtKCksIDMwMCk7XG5cbiAgcmVmcmVzaExhc3RWaXNpYmxlSXRlbSA9ICgpID0+IHtcbiAgICBjb25zdCBsYXN0VmlzaWJsZUl0ZW1JbmRleCA9IHRoaXMuZ2V0TGFzdFZpc2libGVJdGVtSW5kZXgoKTtcbiAgICBpZiAodGhpcy5zdGF0ZS5sYXN0VmlzaWJsZUl0ZW1JbmRleCAhPT0gbGFzdFZpc2libGVJdGVtSW5kZXgpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBpc1NlbGVjdFZpc2libGU6IHRoaXMucHJvcHMubGlzdC5sZW5ndGggPiBsYXN0VmlzaWJsZUl0ZW1JbmRleCArIDEsXG4gICAgICAgIGxhc3RWaXNpYmxlSXRlbUluZGV4LFxuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gIC8vIEhhbmRsZSByZWFjdC1zZWxlY3Qgb25DaGFuZ2VcbiAgaGFuZGxlT25DaGFuZ2UgPSAodmFsdWUpID0+IHtcbiAgICB0aGlzLnByb3BzLm9uU2VsZWN0KHZhbHVlKTtcbiAgfTtcblxuICAvLyBIYW5kbGUgbmF2YmFyIG9uQ2xpY2tcbiAgaGFuZGxlT25DbGljayA9IChocmVmLCBpbmRleCkgPT4gKCkgPT4ge1xuICAgIHRoaXMucHJvcHMub25TZWxlY3QoaHJlZiwgaW5kZXgpO1xuICB9O1xuXG4gIC8vIFJlbmRlciBuYXZiYXIgaXRlbVxuICBuYXZiYXJJdGVtID0gKGl0ZW0sIGluZGV4LCBjbGFzc05hbWUpID0+IHtcbiAgICBjb25zdCB7IGFjdGl2ZUtleSwgZm9udFdlaWdodCwgZm9udFNpemUsIGhlaWdodCwgYWxsb3dDbG9zZSwgb25DbG9zZSwgbmF2UmVuZGVyZXIgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBpZiAobmF2UmVuZGVyZXIpIHtcbiAgICAgIHJldHVybiBuYXZSZW5kZXJlcihpdGVtLCBpbmRleCwgY2xhc3NOYW1lLCBhY3RpdmVLZXkgPT09IGluZGV4KTtcbiAgICB9XG5cbiAgICAvLyByZXNvbHZlIGFjdGl2ZUtleUluZGV4XG4gICAgbGV0IGFjdGl2ZUtleUluZGV4ID0gYWN0aXZlS2V5O1xuICAgIGlmICh0eXBlb2YgYWN0aXZlS2V5ID09PSAnb2JqZWN0Jykge1xuICAgICAgYWN0aXZlS2V5SW5kZXggPSB0aGlzLmFjdGl2ZUl0ZW1JbmRleChhY3RpdmVLZXkpO1xuICAgIH1cbiAgICByZXR1cm4gKFxuICAgICAgPGJ1dHRvblxuICAgICAgICBjbGFzc05hbWU9e2luZGV4ID09PSBhY3RpdmVLZXlJbmRleCA/IGAke2NsYXNzTmFtZX0gc2VsZWN0ZWRgIDogYCR7Y2xhc3NOYW1lfWB9XG4gICAgICAgIHN0eWxlPXt7IGZvbnRXZWlnaHQsIGZvbnRTaXplLCBtaW5IZWlnaHQ6IGhlaWdodCB9fVxuICAgICAgICBpZD17aXRlbS5pZCB8fCBgbmF2SXRlbSR7U3RyaW5nKGluZGV4KX1gfVxuICAgICAgICBrZXk9e2l0ZW0uaWQgfHwgYG5hdml0ZW0ke1N0cmluZyhpbmRleCl9YH1cbiAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVPbkNsaWNrKGl0ZW0uaHJlZiwgaW5kZXgpfVxuICAgICAgICByZWY9eyhyKSA9PiB7XG4gICAgICAgICAgaWYgKHIgJiYgIXRoaXMuaXRlbVdpZHRoc1tpbmRleF0pIHRoaXMuaXRlbVdpZHRoc1tpbmRleF0gPSByLm9mZnNldFdpZHRoO1xuICAgICAgICB9fVxuICAgICAgPlxuICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJyZXNwb25zaXZlLW5hdmJhci1pdGVtLXRleHRcIj5cbiAgICAgICAgICB7aXRlbS5uYW1lfVxuICAgICAgICAgIHsvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUganN4LWExMXkvY2xpY2stZXZlbnRzLWhhdmUta2V5LWV2ZW50cyAqL31cbiAgICAgICAgICB7YWxsb3dDbG9zZSAmJiA8aSB0YWJJbmRleD17aW5kZXggKyAxfSByb2xlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwiZmEgZmEtdGltZXNcIiBvbkNsaWNrPXsoKSA9PiBvbkNsb3NlKGl0ZW0uaHJlZiwgaW5kZXgpfSAvPn1cbiAgICAgICAgPC9zcGFuPlxuXG4gICAgICA8L2J1dHRvbj5cbiAgICApO1xuICB9O1xuXG4gIGRvTGluZUNvdW50ID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgbGlzdCB9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gbGlzdC5zb21lKChpdGVtKSA9PiB0eXBlb2YgaXRlbS5uYW1lICE9PSAnc3RyaW5nJyk7XG4gIH07XG5cbiAgcmVzb2x2ZUFjdGl2ZUl0ZW1Gcm9tT3B0aW9ucyA9IChzZWxlY3RPcHRpb25zKSA9PiB7XG4gICAgY29uc3QgeyBhY3RpdmVLZXkgfSA9IHRoaXMucHJvcHM7XG4gICAgbGV0IGFjdGl2ZUl0ZW0gPSBzZWxlY3RPcHRpb25zLmZpbmQoKG9wdHMpID0+IG9wdHMudmFsdWUgPT09IGFjdGl2ZUtleSk7XG4gICAgaWYgKCFhY3RpdmVJdGVtKSB7XG4gICAgICBhY3RpdmVJdGVtID0gc2VsZWN0T3B0aW9ucy5maW5kKChvcHRzKSA9PiBvcHRzLnZhbHVlID09PSBhY3RpdmVLZXkudmFsdWUpO1xuICAgIH1cbiAgICByZXR1cm4gYWN0aXZlSXRlbTtcbiAgfTtcblxuICBhY3RpdmVJdGVtSW5kZXggPSAoYWN0aXZlSXRlbSkgPT4ge1xuICAgIGNvbnN0IHsgbGlzdCB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAoIWFjdGl2ZUl0ZW0pIHJldHVybiBudWxsO1xuICAgIHJldHVybiBsaXN0LmZpbmRJbmRleCgoaXRlbSkgPT4gaXRlbS5ocmVmID09PSBhY3RpdmVJdGVtLnZhbHVlKTtcbiAgfTtcblxuICAvLyBSZW5kZXIgY29tYm9ib3gsIHdoZW4gYWxsIGl0ZW1zIGRvIG5vdCBmaXRcbiAgY29tYm9ib3ggPSAoKSA9PiB7XG4gICAgY29uc3QgeyBpZCwgbGlzdCwgZm9udFNpemUsIGZvbnRXZWlnaHQsIHBsYWNlaG9sZGVyLCBzaG93TmF2SXRlbUJvcmRlciB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAoIXRoaXMuc3RhdGUuaXNTZWxlY3RWaXNpYmxlKSB7XG4gICAgICAvLyByZXR1cm4gbnVsbCBpZiBhbGwgbmF2IGl0ZW1zIGFyZSB2aXNpYmxlXG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICAvLyBzbGljZSBuYXYgaXRlbXMgbGlzdCBhbmQgc2hvdyBpbnZpc2libGUgaXRlbXMgaW4gdGhlIGNvbWJvYm94XG4gICAgY29uc3QgbmF2TGlzdCA9IHRoaXMuc3RhdGUubGFzdFZpc2libGVJdGVtSW5kZXggPiAtMiA/IGxpc3Quc2xpY2UodGhpcy5zdGF0ZS5sYXN0VmlzaWJsZUl0ZW1JbmRleCArIDEpIDogbGlzdDtcbiAgICBjb25zdCBzZWxlY3RPcHRpb25zID0gbmF2TGlzdC5tYXAoKGl0ZW0pID0+ICh7XG4gICAgICB2YWx1ZTogaXRlbS5ocmVmLFxuICAgICAgbGFiZWw6IGl0ZW0ubmFtZSxcbiAgICB9KSk7XG4gICAgY29uc3QgbGluZUNvdW50TmVlZGVkID0gdGhpcy5kb0xpbmVDb3VudCgpO1xuICAgIGNvbnN0IGN1c3RvbUxpbmVDb3VudCA9IGxpbmVDb3VudE5lZWRlZCA/ICdsaW5lLWNvdW50JyA6ICcnO1xuICAgIGNvbnN0IGN1c3RvbUJvcmRlckNsYXNzID0gbGluZUNvdW50TmVlZGVkID8gJ3NlbGVjdGVkIGxpbmUtY291bnQnIDogJ3NlbGVjdGVkJztcbiAgICBjb25zdCBjdXN0b21JbmFjdGl2ZUJvcmRlciA9IGxpbmVDb3VudE5lZWRlZCA/ICdpbmFjdGl2ZSBsaW5lLWNvdW50JyA6ICdpbmFjdGl2ZSc7XG4gICAgY29uc3QgaW5hY3RpdmVCb3JkZXIgPSBzaG93TmF2SXRlbUJvcmRlciA/IGN1c3RvbUluYWN0aXZlQm9yZGVyIDogY3VzdG9tTGluZUNvdW50O1xuICAgIC8vIFJlc29sdmUgYWN0aXZlSXRlbVxuICAgIGNvbnN0IGFjdGl2ZUl0ZW0gPSB0aGlzLnJlc29sdmVBY3RpdmVJdGVtRnJvbU9wdGlvbnMoc2VsZWN0T3B0aW9ucyk7XG4gICAgY29uc3QgYWN0aXZlSXRlbUluZGV4ID0gdGhpcy5hY3RpdmVJdGVtSW5kZXgoYWN0aXZlSXRlbSk7XG4gICAgY29uc3QgYm9yZGVyQ2xhc3MgPSBhY3RpdmVJdGVtSW5kZXggPj0gdGhpcy5zdGF0ZS5sYXN0VmlzaWJsZUl0ZW1JbmRleCArIDEgPyBjdXN0b21Cb3JkZXJDbGFzcyA6IGluYWN0aXZlQm9yZGVyOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdlxuICAgICAgICBpZD17YCR7aWR9LXNlbGVjdGB9XG4gICAgICAgIGNsYXNzTmFtZT17YHJlc3BvbnNpdmUtbmF2YmFyLXNlbGVjdCAke2JvcmRlckNsYXNzfWB9XG4gICAgICAgIHN0eWxlPXt7IGZvbnRXZWlnaHQsIGZvbnRTaXplIH19XG4gICAgICAgIHJlZj17KHIpID0+IHtcbiAgICAgICAgICB0aGlzLnNlbGVjdENvbnRhaW5lclJlZiA9IHI7XG4gICAgICAgIH19XG4gICAgICA+XG4gICAgICAgIDxGbG9hdGluZ1NlbGVjdFxuICAgICAgICAgIG5hbWU9e2Ake2lkfS1zZWxlY3QtY29tcG9uZW50YH1cbiAgICAgICAgICB2YWx1ZT17YWN0aXZlSXRlbSB8fCAnJ31cbiAgICAgICAgICBpc0NsZWFyYWJsZT17ZmFsc2V9XG4gICAgICAgICAgcGxhY2Vob2xkZXI9e3BsYWNlaG9sZGVyfVxuICAgICAgICAgIG9wdGlvbnM9e3NlbGVjdE9wdGlvbnN9XG4gICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlT25DaGFuZ2V9XG4gICAgICAgIC8+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9O1xuXG4gIC8vIFJlbmRlciBjdXN0b20gbGVmdCBzaWRlIGNvbXBvbmVudFxuICBjb21wb25lbnRMZWZ0ID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgY29tcG9uZW50TGVmdCB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAoIWNvbXBvbmVudExlZnQpIHJldHVybiBudWxsO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2XG4gICAgICAgIGNsYXNzTmFtZT1cInJlc3BvbnNpdmUtbmF2YmFyLWNvbnRhaW5lci1sZWZ0XCJcbiAgICAgICAgcmVmPXsocikgPT4ge1xuICAgICAgICAgIHRoaXMuY29tcG9uZW50TGVmdENvbnRhaW5lclJlZiA9IHI7XG4gICAgICAgIH19XG4gICAgICA+XG4gICAgICAgIHtjb21wb25lbnRMZWZ0fVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfTtcblxuICAvLyBSZW5kZXIgY3VzdG9tIHJpZ2h0IHNpZGUgY29tcG9uZW50XG4gIGNvbXBvbmVudFJpZ2h0ID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgY29tcG9uZW50UmlnaHQgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKCFjb21wb25lbnRSaWdodCkgcmV0dXJuIG51bGw7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3NOYW1lPVwicmVzcG9uc2l2ZS1uYXZiYXItY29udGFpbmVyLXJpZ2h0XCJcbiAgICAgICAgcmVmPXsocikgPT4ge1xuICAgICAgICAgIHRoaXMuY29tcG9uZW50UmlnaHRDb250YWluZXJSZWYgPSByO1xuICAgICAgICB9fVxuICAgICAgPlxuICAgICAgICB7Y29tcG9uZW50UmlnaHR9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9O1xuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IGlkLCBjbGFzc05hbWUsIGxpc3QsIHNob3dOYXZJdGVtQm9yZGVyLCBoZWlnaHQgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgdmlzaWJsZUxpc3QgPSB0aGlzLnN0YXRlLmxhc3RWaXNpYmxlSXRlbUluZGV4ID4gLTIgPyBsaXN0LnNsaWNlKDAsIHRoaXMuc3RhdGUubGFzdFZpc2libGVJdGVtSW5kZXggKyAxKSA6IGxpc3Q7XG4gICAgY29uc3QgaXRlbUNsYXNzTmFtZSA9IHNob3dOYXZJdGVtQm9yZGVyID8gJ3Jlc3BvbnNpdmUtbmF2YmFyLWl0ZW0gaW5hY3RpdmUtYm9yZGVyJyA6ICdyZXNwb25zaXZlLW5hdmJhci1pdGVtIG5vLWl0ZW0tYm9yZGVyJztcbiAgICBjb25zdCBpdGVtcyA9IHZpc2libGVMaXN0Lm1hcCgoaXRlbSwgaW5kZXgpID0+IHRoaXMubmF2YmFySXRlbShpdGVtLCBpbmRleCwgaXRlbUNsYXNzTmFtZSkpO1xuICAgIGNvbnN0IGxpbmVDb3VudCA9IHRoaXMuZG9MaW5lQ291bnQoKTtcbiAgICBjb25zdCBuYXZiYXJTdHlsZSA9IHtcbiAgICAgIG1pbkhlaWdodDogaGVpZ2h0LFxuICAgICAgbWF4SGVpZ2h0OiBoZWlnaHRcbiAgICB9O1xuICAgIGlmIChoZWlnaHQuc2xpY2UoLTIpID09PSAncHgnICYmIGxpbmVDb3VudCkge1xuICAgICAgY29uc3QgaGVpZ2h0UHggPSBwYXJzZUludChoZWlnaHQuc2xpY2UoMCwgLTIpLCAxMCk7XG4gICAgICBuYXZiYXJTdHlsZS5saW5lSGVpZ2h0ID0gYCR7aGVpZ2h0UHggLSA0fXB4YDtcbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXZcbiAgICAgICAgaWQ9e2Ake2lkfS1jb250YWluZXJgfVxuICAgICAgICByZWY9eyhyKSA9PiB7XG4gICAgICAgICAgdGhpcy5uYXZiYXJDb250YWluZXJSZWYgPSByO1xuICAgICAgICB9fVxuICAgICAgICBjbGFzc05hbWU9e2ByZXNwb25zaXZlLW5hdmJhci1jb250YWluZXIgJHtjbGFzc05hbWV9YH1cbiAgICAgICAgc3R5bGU9e25hdmJhclN0eWxlfVxuICAgICAgPlxuICAgICAgICB7aXRlbXN9XG4gICAgICAgIHt0aGlzLmNvbWJvYm94KCl9XG4gICAgICAgIHt0aGlzLmNvbXBvbmVudExlZnQoKX1cbiAgICAgICAge3RoaXMuY29tcG9uZW50UmlnaHQoKX1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cbiJdfQ==
