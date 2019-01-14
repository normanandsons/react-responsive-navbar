'use strict';

exports.__esModule = true;
exports.default = undefined;

var _class, _temp; /* eslint-disable react/no-find-dom-node */


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactFloatingSelect = require('@opuscapita/react-floating-select');

var _reactBootstrap = require('react-bootstrap');

var _debounce = require('debounce');

require('./responsive-navbar.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
      var tooltip = _react2.default.createElement(
        _reactBootstrap.Tooltip,
        { id: 'tooltip' },
        tooltipContent
      );
      return !_this.props.showNavItemTooltip ? node : _react2.default.createElement(
        _reactBootstrap.OverlayTrigger,
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

      return _react2.default.createElement(
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
        _react2.default.createElement(
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
      return _react2.default.createElement(
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
      return _react2.default.createElement(
        'div',
        {
          id: id + '-select',
          className: 'responsive-navbar-select ' + borderClass,
          style: { fontWeight: fontWeight, fontSize: fontSize },
          ref: function ref(r) {
            _this.selectContainerRef = r;
          }
        },
        _react2.default.createElement(_reactFloatingSelect.FloatingSelect, {
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
      return _react2.default.createElement(
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
      return _react2.default.createElement(
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
    window.addEventListener('resize', (0, _debounce.debounce)(this.refreshLastVisibleItem));
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
    window.removeEventListener('resize', (0, _debounce.debounce)(this.refreshLastVisibleItem));
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
}(_react2.default.PureComponent), _class.defaultProps = {
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
exports.default = ResponsiveNavbar;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yZXNwb25zaXZlLW5hdmJhci5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIlJlc3BvbnNpdmVOYXZiYXIiLCJwcm9wcyIsInN0YXRlIiwiaXNTZWxlY3RWaXNpYmxlIiwibGFzdFZpc2libGVJdGVtSW5kZXgiLCJnZXRMYXN0VmlzaWJsZUl0ZW1JbmRleCIsIm5hdkJhcldpZHRoIiwibmF2YmFyQ29udGFpbmVyUmVmIiwib2Zmc2V0V2lkdGgiLCJzZWxlY3RXaWR0aCIsInNlbGVjdENvbnRhaW5lclJlZiIsImNvbXBvbmVudExlZnRXaWR0aCIsImNvbXBvbmVudExlZnRDb250YWluZXJSZWYiLCJjb21wb25lbnRSaWdodFdpZHRoIiwiY29tcG9uZW50UmlnaHRDb250YWluZXJSZWYiLCJyZW1haW5pbmdXaWR0aCIsImxhc3RWaXNpYmxlIiwiaSIsImxpc3QiLCJsZW5ndGgiLCJpdGVtV2lkdGhzIiwicmVmcmVzaExhc3RWaXNpYmxlSXRlbSIsInNldFN0YXRlIiwidG9vbHRpcFdyYXBwZXIiLCJub2RlIiwiaW5kZXgiLCJ0b29sdGlwQ29udGVudCIsInRvb2x0aXAiLCJzaG93TmF2SXRlbVRvb2x0aXAiLCJ0b29sdGlwRGVsYXkiLCJoYW5kbGVPbkNoYW5nZSIsInZhbHVlIiwib25TZWxlY3QiLCJoYW5kbGVPbkNsaWNrIiwiaHJlZiIsIm5hdmJhckl0ZW0iLCJpdGVtIiwiY2xhc3NOYW1lIiwiYWN0aXZlS2V5IiwiZm9udFdlaWdodCIsImZvbnRTaXplIiwiaGVpZ2h0IiwibWluSGVpZ2h0IiwiaWQiLCJTdHJpbmciLCJyIiwibmFtZSIsImRvTGluZUNvdW50Iiwic29tZSIsIm5hdmJhciIsInNob3dOYXZJdGVtQm9yZGVyIiwidmlzaWJsZUxpc3QiLCJzbGljZSIsIml0ZW1DbGFzc05hbWUiLCJpdGVtcyIsIm1hcCIsImxpbmVDb3VudCIsIm5hdmJhclN0eWxlIiwiaGVpZ2h0UHgiLCJwYXJzZUludCIsImxpbmVIZWlnaHQiLCJjb21ib2JveCIsImNvbXBvbmVudExlZnQiLCJjb21wb25lbnRSaWdodCIsInBsYWNlaG9sZGVyIiwibmF2TGlzdCIsInNlbGVjdE9wdGlvbnMiLCJsYWJlbCIsImxpbmVDb3VudE5lZWRlZCIsImN1c3RvbUxpbmVDb3VudCIsImN1c3RvbUJvcmRlckNsYXNzIiwiY3VzdG9tSW5hY3RpdmVCb3JkZXIiLCJpbmFjdGl2ZUJvcmRlciIsImJvcmRlckNsYXNzIiwiYWN0aXZlSXRlbSIsImNvbXBvbmVudERpZE1vdW50Iiwid2luZG93IiwiYWRkRXZlbnRMaXN0ZW5lciIsImNvbXBvbmVudERpZFVwZGF0ZSIsInByZXZQcm9wcyIsInByZXZTdGF0ZSIsImNvbXBvbmVudFdpbGxVbm1vdW50IiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsInJlbmRlciIsIlJlYWN0IiwiUHVyZUNvbXBvbmVudCIsImRlZmF1bHRQcm9wcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7bUJBQUE7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFQTs7Ozs7Ozs7OztJQUVxQkEsZ0I7OztBQXVDbkIsNEJBQVlDLEtBQVosRUFBbUI7QUFBQTs7QUFBQSxpREFDakIsZ0NBQU1BLEtBQU4sQ0FEaUI7O0FBQUEsVUFLbkJDLEtBTG1CLEdBS1g7QUFDTkMsdUJBQWlCLEtBRFg7QUFFTkMsNEJBQXNCLENBQUM7QUFGakIsS0FMVzs7QUFBQSxVQStCbkJDLHVCQS9CbUIsR0ErQk8sWUFBTTtBQUM5QixVQUFNQyxjQUFjLE1BQUtDLGtCQUFMLEdBQTBCLE1BQUtBLGtCQUFMLENBQXdCQyxXQUFsRCxHQUFnRSxDQUFwRjtBQUNBLFVBQU1DLGNBQWMsTUFBS0Msa0JBQUwsR0FBMEIsTUFBS0Esa0JBQUwsQ0FBd0JGLFdBQWxELEdBQWdFLENBQXBGO0FBQ0EsVUFBTUcscUJBQXFCLE1BQUtDLHlCQUFMLEdBQWlDLE1BQUtBLHlCQUFMLENBQStCSixXQUFoRSxHQUE4RSxDQUF6RyxDQUg4QixDQUc4RTtBQUM1RyxVQUFNSyxzQkFBc0IsTUFBS0Ms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QixtQ0FBdUI7QUFDckJMLFdBQU9NLG1CQUFQLENBQTJCLFFBQTNCLEVBQXFDLHdCQUFTLEtBQUs3RCxzQkFBZCxDQUFyQztBQUNBdUQsV0FBT00sbUJBQVAsQ0FBMkIsbUJBQTNCLEVBQWdELEtBQUs3RCxzQkFBckQsRUFGcUIsQ0FFeUQ7QUFDL0UsRzs7QUF5Q0Q7OztBQUtBOzs7QUFLQTs7O0FBNkJBOzs7QUF5Q0E7OztBQWlEQTs7O0FBY0E7Ozs2QkFjQThELE0scUJBQVM7QUFDUCxXQUFPLEtBQUtsQyxNQUFMLEVBQVA7QUFDRCxHOzs7RUE1UTJDbUMsZ0JBQU1DLGEsVUF3QjNDQyxZLEdBQWU7QUFDcEIzQyxNQUFJLG1CQURnQjtBQUVwQk4sYUFBVyxFQUZTO0FBR3BCTCxZQUFVLG9CQUFNLENBQUUsQ0FIRTtBQUlwQmtCLHFCQUFtQixLQUpDO0FBS3BCdEIsc0JBQW9CLElBTEE7QUFNcEJDLGdCQUFjLElBTk07QUFPcEJXLFlBQVUsU0FQVTtBQVFwQkQsY0FBWSxTQVJRO0FBU3BCeUIsZUFBYSxTQVRPO0FBVXBCdkIsVUFBUSxNQVZZO0FBV3BCcUIsaUJBQWUsSUFYSztBQVlwQkMsa0JBQWdCO0FBWkksQztrQkF4QkgvRCxnQiIsImZpbGUiOiJyZXNwb25zaXZlLW5hdmJhci5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSByZWFjdC9uby1maW5kLWRvbS1ub2RlICovXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IEZsb2F0aW5nU2VsZWN0IH0gZnJvbSAnQG9wdXNjYXBpdGEvcmVhY3QtZmxvYXRpbmctc2VsZWN0JztcbmltcG9ydCB7IE92ZXJsYXlUcmlnZ2VyLCBUb29sdGlwIH0gZnJvbSAncmVhY3QtYm9vdHN0cmFwJztcbmltcG9ydCB7IGRlYm91bmNlIH0gZnJvbSAnZGVib3VuY2UnO1xuXG5pbXBvcnQgJy4vcmVzcG9uc2l2ZS1uYXZiYXIuc2Nzcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlc3BvbnNpdmVOYXZiYXIgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBpZDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBjbGFzc05hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgc2hvd05hdkl0ZW1Cb3JkZXI6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dOYXZJdGVtVG9vbHRpcDogUHJvcFR5cGVzLmJvb2wsXG4gICAgdG9vbHRpcERlbGF5OiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIGZvbnRTaXplOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGZvbnRXZWlnaHQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgcGxhY2Vob2xkZXI6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgYWN0aXZlS2V5OiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgbGlzdDogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgIG5hbWU6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgICBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICBQcm9wVHlwZXMubm9kZSxcbiAgICAgIF0pLmlzUmVxdWlyZWQsXG4gICAgICBocmVmOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMubnVtYmVyXSksXG4gICAgfSkpLmlzUmVxdWlyZWQsXG4gICAgb25TZWxlY3Q6IFByb3BUeXBlcy5mdW5jLFxuICAgIGhlaWdodDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBjb21wb25lbnRMZWZ0OiBQcm9wVHlwZXMubm9kZSxcbiAgICBjb21wb25lbnRSaWdodDogUHJvcFR5cGVzLm5vZGUsXG4gIH1cblxuICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgIGlkOiAncmVzcG9uc2l2ZS1uYXZiYXInLFxuICAgIGNsYXNzTmFtZTogJycsXG4gICAgb25TZWxlY3Q6ICgpID0+IHt9LFxuICAgIHNob3dOYXZJdGVtQm9yZGVyOiBmYWxzZSxcbiAgICBzaG93TmF2SXRlbVRvb2x0aXA6IHRydWUsXG4gICAgdG9vbHRpcERlbGF5OiAyMDAwLFxuICAgIGZvbnRTaXplOiAnaW5oZXJpdCcsXG4gICAgZm9udFdlaWdodDogJ2luaGVyaXQnLFxuICAgIHBsYWNlaG9sZGVyOiAnbW9yZS4uLicsXG4gICAgaGVpZ2h0OiAnNDBweCcsXG4gICAgY29tcG9uZW50TGVmdDogbnVsbCxcbiAgICBjb21wb25lbnRSaWdodDogbnVsbCxcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuaXRlbVdpZHRocyA9IFtdOyAvLyBzdG9yZSBpdGVtIHdpZHRocyBoZXJlLCB0aGV5IGRvbid0IGNoYW5nZVxuICB9XG5cbiAgc3RhdGUgPSB7XG4gICAgaXNTZWxlY3RWaXNpYmxlOiBmYWxzZSxcbiAgICBsYXN0VmlzaWJsZUl0ZW1JbmRleDogLTIsXG4gIH07XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGRlYm91bmNlKHRoaXMucmVmcmVzaExhc3RWaXNpYmxlSXRlbSkpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdvcmllbnRhdGlvbmNoYW5nZScsIHRoaXMucmVmcmVzaExhc3RWaXNpYmxlSXRlbSk7IC8vIGZvciBtb2JpbGUgc3VwcG9ydFxuICAgIHRoaXMucmVmcmVzaExhc3RWaXNpYmxlSXRlbSgpO1xuICB9XG5cbiAgY29tcG9uZW50RGlkVXBkYXRlKHByZXZQcm9wcywgcHJldlN0YXRlKSB7XG4gICAgLy8gUmVmcmVzaCB2aXNpYmxlIGl0ZW1zIGlmIHZhbHVlcyBjaGFuZ2VcbiAgICBpZiAoXG4gICAgICB0aGlzLnN0YXRlLmlzU2VsZWN0VmlzaWJsZSAhPT0gcHJldlN0YXRlLmlzU2VsZWN0VmlzaWJsZSB8fFxuICAgICAgdGhpcy5zdGF0ZS5sYXN0VmlzaWJsZUl0ZW1JbmRleCAhPT0gcHJldlN0YXRlLmxhc3RWaXNpYmxlSXRlbUluZGV4XG4gICAgKSB7XG4gICAgICB0aGlzLnJlZnJlc2hMYXN0VmlzaWJsZUl0ZW0oKTtcbiAgICB9XG4gIH1cblxuICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgZGVib3VuY2UodGhpcy5yZWZyZXNoTGFzdFZpc2libGVJdGVtKSk7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ29yaWVudGF0aW9uY2hhbmdlJywgdGhpcy5yZWZyZXNoTGFzdFZpc2libGVJdGVtKTsgLy8gZm9yIG1vYmlsZSBzdXBwb3J0XG4gIH1cblxuICBnZXRMYXN0VmlzaWJsZUl0ZW1JbmRleCA9ICgpID0+IHtcbiAgICBjb25zdCBuYXZCYXJXaWR0aCA9IHRoaXMubmF2YmFyQ29udGFpbmVyUmVmID8gdGhpcy5uYXZiYXJDb250YWluZXJSZWYub2Zmc2V0V2lkdGggOiAwO1xuICAgIGNvbnN0IHNlbGVjdFdpZHRoID0gdGhpcy5zZWxlY3RDb250YWluZXJSZWYgPyB0aGlzLnNlbGVjdENvbnRhaW5lclJlZi5vZmZzZXRXaWR0aCA6IDA7XG4gICAgY29uc3QgY29tcG9uZW50TGVmdFdpZHRoID0gdGhpcy5jb21wb25lbnRMZWZ0Q29udGFpbmVyUmVmID8gdGhpcy5jb21wb25lbnRMZWZ0Q29udGFpbmVyUmVmLm9mZnNldFdpZHRoIDogMDsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgIGNvbnN0IGNvbXBvbmVudFJpZ2h0V2lkdGggPSB0aGlzLmNvbXBvbmVudFJpZ2h0Q29udGFpbmVyUmVmID8gdGhpcy5jb21wb25lbnRSaWdodENvbnRhaW5lclJlZi5vZmZzZXRXaWR0aCA6IDA7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcblxuICAgIGxldCByZW1haW5pbmdXaWR0aCA9IG5hdkJhcldpZHRoIC0gc2VsZWN0V2lkdGggLSBjb21wb25lbnRMZWZ0V2lkdGggLSBjb21wb25lbnRSaWdodFdpZHRoO1xuICAgIGxldCBsYXN0VmlzaWJsZSA9IDA7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucHJvcHMubGlzdC5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgcmVtYWluaW5nV2lkdGggLT0gdGhpcy5pdGVtV2lkdGhzW2ldO1xuICAgICAgaWYgKHJlbWFpbmluZ1dpZHRoIDwgMCkge1xuICAgICAgICBsYXN0VmlzaWJsZSAtPSAxO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGxhc3RWaXNpYmxlICs9IDE7XG4gICAgfVxuXG4gICAgcmV0dXJuIGxhc3RWaXNpYmxlO1xuICB9XG5cbiAgcmVmcmVzaExhc3RWaXNpYmxlSXRlbSA9ICgpID0+IHtcbiAgICBjb25zdCBsYXN0VmlzaWJsZUl0ZW1JbmRleCA9IHRoaXMuZ2V0TGFzdFZpc2libGVJdGVtSW5kZXgoKTtcbiAgICBpZiAodGhpcy5zdGF0ZS5sYXN0VmlzaWJsZUl0ZW1JbmRleCAhPT0gbGFzdFZpc2libGVJdGVtSW5kZXgpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBpc1NlbGVjdFZpc2libGU6IHRoaXMucHJvcHMubGlzdC5sZW5ndGggPiAobGFzdFZpc2libGVJdGVtSW5kZXggKyAxKSxcbiAgICAgICAgbGFzdFZpc2libGVJdGVtSW5kZXgsXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICB0b29sdGlwV3JhcHBlciA9IChub2RlLCBpbmRleCwgdG9vbHRpcENvbnRlbnQpID0+IHtcbiAgICBjb25zdCB0b29sdGlwID0gPFRvb2x0aXAgaWQ9XCJ0b29sdGlwXCI+e3Rvb2x0aXBDb250ZW50fTwvVG9vbHRpcD47XG4gICAgcmV0dXJuICF0aGlzLnByb3BzLnNob3dOYXZJdGVtVG9vbHRpcCA/IG5vZGUgOlxuICAgIDxPdmVybGF5VHJpZ2dlciBwbGFjZW1lbnQ9XCJib3R0b21cIiBrZXk9e2luZGV4fSBvdmVybGF5PXt0b29sdGlwfSBkZWxheVNob3c9e3RoaXMucHJvcHMudG9vbHRpcERlbGF5fT5cbiAgICAgIHtub2RlfVxuICAgIDwvT3ZlcmxheVRyaWdnZXI+O1xuICB9XG5cbiAgLy8gSGFuZGxlIHJlYWN0LXNlbGVjdCBvbkNoYW5nZVxuICBoYW5kbGVPbkNoYW5nZSA9ICh7IHZhbHVlIH0pID0+IHtcbiAgICB0aGlzLnByb3BzLm9uU2VsZWN0KHZhbHVlKTtcbiAgfVxuXG4gIC8vIEhhbmRsZSBuYXZiYXIgb25DbGlja1xuICBoYW5kbGVPbkNsaWNrID0gaHJlZiA9PiAoKSA9PiB7XG4gICAgdGhpcy5wcm9wcy5vblNlbGVjdChocmVmKTtcbiAgfVxuXG4gIC8vIFJlbmRlciBuYXZiYXIgaXRlbVxuICBuYXZiYXJJdGVtID0gKGl0ZW0sIGluZGV4LCBjbGFzc05hbWUpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBhY3RpdmVLZXksXG4gICAgICBmb250V2VpZ2h0LFxuICAgICAgZm9udFNpemUsXG4gICAgICBoZWlnaHQsXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgcmV0dXJuIChcbiAgICAgIDxidXR0b25cbiAgICAgICAgY2xhc3NOYW1lPXtpbmRleCA9PT0gYWN0aXZlS2V5ID8gYCR7Y2xhc3NOYW1lfSBzZWxlY3RlZC1ib3JkZXJgIDogYCR7Y2xhc3NOYW1lfWB9XG4gICAgICAgIHN0eWxlPXt7IGZvbnRXZWlnaHQsIGZvbnRTaXplLCBtaW5IZWlnaHQ6IGhlaWdodCB9fVxuICAgICAgICBpZD17aXRlbS5pZCB8fCBgbmF2SXRlbSR7U3RyaW5nKGluZGV4KX1gfVxuICAgICAgICBrZXk9e2l0ZW0uaWQgfHwgYG5hdml0ZW0ke1N0cmluZyhpbmRleCl9YH1cbiAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVPbkNsaWNrKGl0ZW0uaHJlZil9XG4gICAgICAgIHJlZj17KHIpID0+IHtcbiAgICAgICAgICBpZiAociAmJiAhdGhpcy5pdGVtV2lkdGhzW2luZGV4XSkgdGhpcy5pdGVtV2lkdGhzW2luZGV4XSA9IHIub2Zmc2V0V2lkdGg7XG4gICAgICAgIH19XG4gICAgICA+XG4gICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInJlc3BvbnNpdmUtbmF2YmFyLWl0ZW0tdGV4dFwiPntpdGVtLm5hbWV9PC9zcGFuPlxuICAgICAgPC9idXR0b24+XG4gICAgKTtcbiAgfVxuXG4gIGRvTGluZUNvdW50ID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgbGlzdCB9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gbGlzdC5zb21lKGl0ZW0gPT4gdHlwZW9mIChpdGVtLm5hbWUpICE9PSAnc3RyaW5nJyk7XG4gIH1cblxuICAvLyBSZW5kZXIgbmF2YmFyXG4gIG5hdmJhciA9ICgpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBpZCxcbiAgICAgIGNsYXNzTmFtZSxcbiAgICAgIGxpc3QsXG4gICAgICBzaG93TmF2SXRlbUJvcmRlcixcbiAgICAgIGhlaWdodCxcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB2aXNpYmxlTGlzdCA9IHRoaXMuc3RhdGUubGFzdFZpc2libGVJdGVtSW5kZXggPiAtMiA/XG4gICAgICBsaXN0LnNsaWNlKDAsIHRoaXMuc3RhdGUubGFzdFZpc2libGVJdGVtSW5kZXggKyAxKSA6XG4gICAgICBsaXN0O1xuICAgIGNvbnN0IGl0ZW1DbGFzc05hbWUgPSBzaG93TmF2SXRlbUJvcmRlciA/XG4gICAgICAncmVzcG9uc2l2ZS1uYXZiYXItaXRlbSBpbmFjdGl2ZS1ib3JkZXInIDpcbiAgICAgICdyZXNwb25zaXZlLW5hdmJhci1pdGVtIG5vLWl0ZW0tYm9yZGVyJztcbiAgICBjb25zdCBpdGVtcyA9IHZpc2libGVMaXN0Lm1hcCgoaXRlbSwgaW5kZXgpID0+IChcbiAgICAgIHRoaXMudG9vbHRpcFdyYXBwZXIodGhpcy5uYXZiYXJJdGVtKGl0ZW0sIGluZGV4LCBpdGVtQ2xhc3NOYW1lKSwgaW5kZXgsIGl0ZW0ubmFtZSlcbiAgICApKTtcbiAgICBjb25zdCBsaW5lQ291bnQgPSB0aGlzLmRvTGluZUNvdW50KCk7XG4gICAgY29uc3QgbmF2YmFyU3R5bGUgPSB7XG4gICAgICBtaW5IZWlnaHQ6IGhlaWdodCxcbiAgICB9O1xuICAgIGlmIChoZWlnaHQuc2xpY2UoLTIpID09PSAncHgnICYmIGxpbmVDb3VudCkge1xuICAgICAgY29uc3QgaGVpZ2h0UHggPSBwYXJzZUludChoZWlnaHQuc2xpY2UoMCwgLTIpLCAxMCk7XG4gICAgICBuYXZiYXJTdHlsZS5saW5lSGVpZ2h0ID0gYCR7KGhlaWdodFB4IC0gNCl9cHhgO1xuICAgIH1cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdlxuICAgICAgICBpZD17YCR7aWR9LWNvbnRhaW5lcmB9XG4gICAgICAgIHJlZj17KHIpID0+IHsgdGhpcy5uYXZiYXJDb250YWluZXJSZWYgPSByOyB9fVxuICAgICAgICBjbGFzc05hbWU9e2ByZXNwb25zaXZlLW5hdmJhci1jb250YWluZXIgJHtjbGFzc05hbWV9YH1cbiAgICAgICAgc3R5bGU9e25hdmJhclN0eWxlfVxuICAgICAgPlxuICAgICAgICB7aXRlbXN9XG4gICAgICAgIHt0aGlzLmNvbWJvYm94KCl9XG4gICAgICAgIHt0aGlzLmNvbXBvbmVudExlZnQoKX1cbiAgICAgICAge3RoaXMuY29tcG9uZW50UmlnaHQoKX1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cblxuICAvLyBSZW5kZXIgY29tYm9ib3gsIHdoZW4gYWxsIGl0ZW1zIGRvIG5vdCBmaXRcbiAgY29tYm9ib3ggPSAoKSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgaWQsXG4gICAgICBsaXN0LFxuICAgICAgZm9udFNpemUsXG4gICAgICBhY3RpdmVLZXksXG4gICAgICBmb250V2VpZ2h0LFxuICAgICAgcGxhY2Vob2xkZXIsXG4gICAgICBzaG93TmF2SXRlbUJvcmRlcixcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAoIXRoaXMuc3RhdGUuaXNTZWxlY3RWaXNpYmxlKSB7XG4gICAgICAvLyByZXR1cm4gbnVsbCBpZiBhbGwgbmF2IGl0ZW1zIGFyZSB2aXNpYmxlXG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICAvLyBzbGljZSBuYXYgaXRlbXMgbGlzdCBhbmQgc2hvdyBpbnZpc2libGUgaXRlbXMgaW4gdGhlIGNvbWJvYm94XG4gICAgY29uc3QgbmF2TGlzdCA9IHRoaXMuc3RhdGUubGFzdFZpc2libGVJdGVtSW5kZXggPiAtMiA/XG4gICAgICBsaXN0LnNsaWNlKHRoaXMuc3RhdGUubGFzdFZpc2libGVJdGVtSW5kZXggKyAxKSA6IGxpc3Q7XG4gICAgY29uc3Qgc2VsZWN0T3B0aW9ucyA9IG5hdkxpc3QubWFwKGl0ZW0gPT4gKHtcbiAgICAgIHZhbHVlOiBpdGVtLmhyZWYsXG4gICAgICBsYWJlbDogaXRlbS5uYW1lLFxuICAgIH0pKTtcbiAgICBjb25zdCBsaW5lQ291bnROZWVkZWQgPSB0aGlzLmRvTGluZUNvdW50KCk7XG4gICAgY29uc3QgY3VzdG9tTGluZUNvdW50ID0gbGluZUNvdW50TmVlZGVkID8gJ2xpbmUtY291bnQnIDogJyc7XG4gICAgY29uc3QgY3VzdG9tQm9yZGVyQ2xhc3MgPSBsaW5lQ291bnROZWVkZWQgPyAnc2VsZWN0ZWQtYm9yZGVyIGxpbmUtY291bnQnIDogJ3NlbGVjdGVkLWJvcmRlcic7XG4gICAgY29uc3QgY3VzdG9tSW5hY3RpdmVCb3JkZXIgPSBsaW5lQ291bnROZWVkZWQgPyAnaW5hY3RpdmUtYm9yZGVyIGxpbmUtY291bnQnIDogJ2luYWN0aXZlLWJvcmRlcic7XG4gICAgY29uc3QgaW5hY3RpdmVCb3JkZXIgPSBzaG93TmF2SXRlbUJvcmRlciA/IGN1c3RvbUluYWN0aXZlQm9yZGVyIDogY3VzdG9tTGluZUNvdW50O1xuICAgIGNvbnN0IGJvcmRlckNsYXNzID0gYWN0aXZlS2V5ID49ICh0aGlzLnN0YXRlLmxhc3RWaXNpYmxlSXRlbUluZGV4ICsgMSkgPyBjdXN0b21Cb3JkZXJDbGFzcyA6IGluYWN0aXZlQm9yZGVyOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgY29uc3QgYWN0aXZlSXRlbSA9IGxpc3RbYWN0aXZlS2V5XTtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdlxuICAgICAgICBpZD17YCR7aWR9LXNlbGVjdGB9XG4gICAgICAgIGNsYXNzTmFtZT17YHJlc3BvbnNpdmUtbmF2YmFyLXNlbGVjdCAke2JvcmRlckNsYXNzfWB9XG4gICAgICAgIHN0eWxlPXt7IGZvbnRXZWlnaHQsIGZvbnRTaXplIH19XG4gICAgICAgIHJlZj17KHIpID0+IHsgdGhpcy5zZWxlY3RDb250YWluZXJSZWYgPSByOyB9fVxuICAgICAgPlxuICAgICAgICA8RmxvYXRpbmdTZWxlY3RcbiAgICAgICAgICBuYW1lPXtgJHtpZH0tc2VsZWN0LWNvbXBvbmVudGB9XG4gICAgICAgICAgdmFsdWU9e2FjdGl2ZUl0ZW0gPyBhY3RpdmVJdGVtLmhyZWYgOiAnJ31cbiAgICAgICAgICBpc0NsZWFyYWJsZT17ZmFsc2V9XG4gICAgICAgICAgcGxhY2Vob2xkZXI9e3BsYWNlaG9sZGVyfVxuICAgICAgICAgIG9wdGlvbnM9e3NlbGVjdE9wdGlvbnN9XG4gICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlT25DaGFuZ2V9XG4gICAgICAgIC8+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG5cbiAgLy8gUmVuZGVyIGN1c3RvbSBsZWZ0IHNpZGUgY29tcG9uZW50XG4gIGNvbXBvbmVudExlZnQgPSAoKSA9PiB7XG4gICAgY29uc3QgeyBjb21wb25lbnRMZWZ0IH0gPSB0aGlzLnByb3BzO1xuICAgIGlmICghY29tcG9uZW50TGVmdCkgcmV0dXJuIG51bGw7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3NOYW1lPVwicmVzcG9uc2l2ZS1uYXZiYXItY29udGFpbmVyLWxlZnRcIlxuICAgICAgICByZWY9eyhyKSA9PiB7IHRoaXMuY29tcG9uZW50TGVmdENvbnRhaW5lclJlZiA9IHI7IH19XG4gICAgICA+XG4gICAgICAgIHsgY29tcG9uZW50TGVmdCB9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG5cbiAgLy8gUmVuZGVyIGN1c3RvbSByaWdodCBzaWRlIGNvbXBvbmVudFxuICBjb21wb25lbnRSaWdodCA9ICgpID0+IHtcbiAgICBjb25zdCB7IGNvbXBvbmVudFJpZ2h0IH0gPSB0aGlzLnByb3BzO1xuICAgIGlmICghY29tcG9uZW50UmlnaHQpIHJldHVybiBudWxsO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2XG4gICAgICAgIGNsYXNzTmFtZT1cInJlc3BvbnNpdmUtbmF2YmFyLWNvbnRhaW5lci1yaWdodFwiXG4gICAgICAgIHJlZj17KHIpID0+IHsgdGhpcy5jb21wb25lbnRSaWdodENvbnRhaW5lclJlZiA9IHI7IH19XG4gICAgICA+XG4gICAgICAgIHsgY29tcG9uZW50UmlnaHQgfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gdGhpcy5uYXZiYXIoKTtcbiAgfVxufVxuIl19