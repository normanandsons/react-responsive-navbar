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
  componentRight: null
}, _temp);
exports.default = ResponsiveNavbar;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yZXNwb25zaXZlLW5hdmJhci5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIlJlc3BvbnNpdmVOYXZiYXIiLCJwcm9wcyIsInN0YXRlIiwiaXNTZWxlY3RWaXNpYmxlIiwibGFzdFZpc2libGVJdGVtSW5kZXgiLCJnZXRMYXN0VmlzaWJsZUl0ZW1JbmRleCIsIm5hdkJhcldpZHRoIiwibmF2YmFyQ29udGFpbmVyUmVmIiwib2Zmc2V0V2lkdGgiLCJzZWxlY3RXaWR0aCIsInNlbGVjdENvbnRhaW5lclJlZiIsImNvbXBvbmVudFJpZ2h0V2lkdGgiLCJjb21wb25lbnRSaWdodENvbnRhaW5lclJlZiIsInJlbWFpbmluZ1dpZHRoIiwibGFzdFZpc2libGUiLCJpIiwibGlzdCIsImxlbmd0aCIsIml0ZW1XaWR0aHMiLCJyZWZyZXNoTGFzdFZpc2libGVJdGVtIiwic2V0U3RhdGUiLCJ0b29sdGlwV3JhcHBlciIsIm5vZGUiLCJpbmRleCIsInRvb2x0aXBDb250ZW50IiwidG9vbHRpcCIsInNob3dOYXZJdGVtVG9vbHRpcCIsInRvb2x0aXBEZWxheSIsImhhbmRsZU9uQ2hhbmdlIiwidmFsdWUiLCJvblNlbGVjdCIsImhhbmRsZU9uQ2xpY2siLCJocmVmIiwibmF2YmFySXRlbSIsIml0ZW0iLCJjbGFzc05hbWUiLCJhY3RpdmVLZXkiLCJmb250V2VpZ2h0IiwiZm9udFNpemUiLCJoZWlnaHQiLCJtaW5IZWlnaHQiLCJpZCIsIlN0cmluZyIsInIiLCJuYW1lIiwiZG9MaW5lQ291bnQiLCJzb21lIiwibmF2YmFyIiwic2hvd05hdkl0ZW1Cb3JkZXIiLCJ2aXNpYmxlTGlzdCIsInNsaWNlIiwiaXRlbUNsYXNzTmFtZSIsIml0ZW1zIiwibWFwIiwibGluZUNvdW50IiwibmF2YmFyU3R5bGUiLCJoZWlnaHRQeCIsInBhcnNlSW50IiwibGluZUhlaWdodCIsImNvbWJvYm94IiwiY29tcG9uZW50UmlnaHQiLCJwbGFjZWhvbGRlciIsIm5hdkxpc3QiLCJzZWxlY3RPcHRpb25zIiwibGFiZWwiLCJsaW5lQ291bnROZWVkZWQiLCJjdXN0b21MaW5lQ291bnQiLCJjdXN0b21Cb3JkZXJDbGFzcyIsImN1c3RvbUluYWN0aXZlQm9yZGVyIiwiaW5hY3RpdmVCb3JkZXIiLCJib3JkZXJDbGFzcyIsImFjdGl2ZUl0ZW0iLCJjb21wb25lbnREaWRNb3VudCIsIndpbmRvdyIsImFkZEV2ZW50TGlzdGVuZXIiLCJjb21wb25lbnREaWRVcGRhdGUiLCJwcmV2UHJvcHMiLCJwcmV2U3RhdGUiLCJjb21wb25lbnRXaWxsVW5tb3VudCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJyZW5kZXIiLCJSZWFjdCIsIlB1cmVDb21wb25lbnQiLCJkZWZhdWx0UHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7O21CQUFBOzs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7SUFFcUJBLGdCOzs7QUFxQ25CLDRCQUFZQyxLQUFaLEVBQW1CO0FBQUE7O0FBQUEsaURBQ2pCLGdDQUFNQSxLQUFOLENBRGlCOztBQUFBLFVBS25CQyxLQUxtQixHQUtYO0FBQ05DLHVCQUFpQixLQURYO0FBRU5DLDRCQUFzQixDQUFDO0FBRmpCLEtBTFc7O0FBQUEsVUErQm5CQyx1QkEvQm1CLEdBK0JPLFlBQU07QUFDOUIsVUFBTUMsY0FBYyxNQUFLQyxrQkFBTCxHQUEwQixNQUFLQSxrQkFBTCxDQUF3QkMsV0FBbEQsR0FBZ0UsQ0FBcEY7QUFDQSxVQUFNQyxjQUFjLE1BQUtDLGtCQUFMLEdBQTBCLE1BQUtBLGtCQUFMLENBQXdCRixXQUFsRCxHQUFnRSxDQUFwRjtBQUNBLFVBQU1HLHNCQUFzQixNQUFLQywwQkFBTCxHQUFrQyxNQUFLQSwwQkFBTCxDQUFnQ0osV0FBbEUsR0FBZ0YsQ0FBNUcsQ0FIOEIsQ0FHaUY7O0FBRS9HLFVBQUlLLGlCQUFpQlAsY0FBY0csV0FBZCxHQUE0QkUsbUJBQWpEO0FBQ0EsVUFBSUcsY0FBYyxDQUFsQjs7QUFFQSxXQUFLLElBQUlDLElBQUksQ0FBYixFQUFnQkEsSUFBSSxNQUFLZCxLQUFMLENBQVdlLElBQVgsQ0FBZ0JDLE1BQXBDLEVBQTRDRixLQUFLLENBQWpELEVBQW9EO0FBQ2xERiwwQkFBa0IsTUFBS0ssVUFBTCxDQUFnQkgsQ0FBaEIsQ0FBbEI7QUFDQSxZQUFJRixpQkFBaUIsQ0FBckIsRUFBd0I7QUFDdEJDLHlCQUFlLENBQWY7QUFDQTtBQUNEO0FBQ0RBLHVCQUFlLENBQWY7QUFDRDs7QUFFRCxhQUFPQSxXQUFQO0FBQ0QsS0FqRGtCOztBQUFBLFVBbURuQkssc0JBbkRtQixHQW1ETSxZQUFNO0FBQzdCLFVBQU1mLHVCQUF1QixNQUFLQyx1QkFBTCxFQUE3QjtBQUNBLFVBQUksTUFBS0gsS0FBTCxDQUFXRSxvQkFBWCxLQUFvQ0Esb0JBQXhDLEVBQThEO0FBQzVELGNBQUtnQixRQUFMLENBQWM7QUFDWmpCLDJCQUFpQixNQUFLRixLQUFMLENBQVdlLElBQVgsQ0FBZ0JDLE1BQWhCLEdBQTBCYix1QkFBdUIsQ0FEdEQ7QUFFWkE7QUFGWSxTQUFkO0FBSUQ7QUFDRixLQTNEa0I7O0FBQUEsVUE2RG5CaUIsY0E3RG1CLEdBNkRGLFVBQUNDLElBQUQsRUFBT0MsS0FBUCxFQUFjQyxjQUFkLEVBQWlDO0FBQ2hELFVBQU1DLFVBQVU7QUFBQywrQkFBRDtBQUFBLFVBQVMsSUFBRyxTQUFaO0FBQXVCRDtBQUF2QixPQUFoQjtBQUNBLGFBQU8sQ0FBQyxNQUFLdkIsS0FBTCxDQUFXeUIsa0JBQVosR0FBaUNKLElBQWpDLEdBQ1A7QUFBQyxzQ0FBRDtBQUFBLFVBQWdCLFdBQVUsUUFBMUIsRUFBbUMsS0FBS0MsS0FBeEMsRUFBK0MsU0FBU0UsT0FBeEQsRUFBaUUsV0FBVyxNQUFLeEIsS0FBTCxDQUFXMEIsWUFBdkY7QUFDR0w7QUFESCxPQURBO0FBSUQsS0FuRWtCOztBQUFBLFVBc0VuQk0sY0F0RW1CLEdBc0VGLGdCQUFlO0FBQUEsVUFBWkMsS0FBWSxRQUFaQSxLQUFZOztBQUM5QixZQUFLNUIsS0FBTCxDQUFXNkIsUUFBWCxDQUFvQkQsS0FBcEI7QUFDRCxLQXhFa0I7O0FBQUEsVUEyRW5CRSxhQTNFbUIsR0EyRUg7QUFBQSxhQUFRLFlBQU07QUFDNUIsY0FBSzlCLEtBQUwsQ0FBVzZCLFFBQVgsQ0FBb0JFLElBQXBCO0FBQ0QsT0FGZTtBQUFBLEtBM0VHOztBQUFBLFVBZ0ZuQkMsVUFoRm1CLEdBZ0ZOLFVBQUNDLElBQUQsRUFBT1gsS0FBUCxFQUFjWSxTQUFkLEVBQTRCO0FBQUEsd0JBTW5DLE1BQUtsQyxLQU44QjtBQUFBLFVBRXJDbUMsU0FGcUMsZUFFckNBLFNBRnFDO0FBQUEsVUFHckNDLFVBSHFDLGVBR3JDQSxVQUhxQztBQUFBLFVBSXJDQyxRQUpxQyxlQUlyQ0EsUUFKcUM7QUFBQSxVQUtyQ0MsTUFMcUMsZUFLckNBLE1BTHFDOztBQU92QyxhQUNFO0FBQUE7QUFBQTtBQUNFLHFCQUFXaEIsVUFBVWEsU0FBVixHQUF5QkQsU0FBekIsNkJBQTBEQSxTQUR2RTtBQUVFLGlCQUFPLEVBQUVFLHNCQUFGLEVBQWNDLGtCQUFkLEVBQXdCRSxXQUFXRCxNQUFuQyxFQUZUO0FBR0UsY0FBSUwsS0FBS08sRUFBTCxnQkFBcUJDLE9BQU9uQixLQUFQLENBSDNCO0FBSUUsZUFBS1csS0FBS08sRUFBTCxnQkFBcUJDLE9BQU9uQixLQUFQLENBSjVCO0FBS0UsbUJBQVMsTUFBS1EsYUFBTCxDQUFtQkcsS0FBS0YsSUFBeEIsQ0FMWDtBQU1FLGVBQUssYUFBQ1csQ0FBRCxFQUFPO0FBQ1YsZ0JBQUlBLEtBQUssQ0FBQyxNQUFLekIsVUFBTCxDQUFnQkssS0FBaEIsQ0FBVixFQUFrQyxNQUFLTCxVQUFMLENBQWdCSyxLQUFoQixJQUF5Qm9CLEVBQUVuQyxXQUEzQjtBQUNuQztBQVJIO0FBVUU7QUFBQTtBQUFBLFlBQU0sV0FBVSw2QkFBaEI7QUFBK0MwQixlQUFLVTtBQUFwRDtBQVZGLE9BREY7QUFjRCxLQXJHa0I7O0FBQUEsVUF1R25CQyxXQXZHbUIsR0F1R0wsWUFBTTtBQUFBLFVBQ1Y3QixJQURVLEdBQ0QsTUFBS2YsS0FESixDQUNWZSxJQURVOztBQUVsQixhQUFPQSxLQUFLOEIsSUFBTCxDQUFVO0FBQUEsZUFBUSxPQUFRWixLQUFLVSxJQUFiLEtBQXVCLFFBQS9CO0FBQUEsT0FBVixDQUFQO0FBQ0QsS0ExR2tCOztBQUFBLFVBNkduQkcsTUE3R21CLEdBNkdWLFlBQU07QUFBQSx5QkFPVCxNQUFLOUMsS0FQSTtBQUFBLFVBRVh3QyxFQUZXLGdCQUVYQSxFQUZXO0FBQUEsVUFHWE4sU0FIVyxnQkFHWEEsU0FIVztBQUFBLFVBSVhuQixJQUpXLGdCQUlYQSxJQUpXO0FBQUEsVUFLWGdDLGlCQUxXLGdCQUtYQSxpQkFMVztBQUFBLFVBTVhULE1BTlcsZ0JBTVhBLE1BTlc7O0FBUWIsVUFBTVUsY0FBYyxNQUFLL0MsS0FBTCxDQUFXRSxvQkFBWCxHQUFrQyxDQUFDLENBQW5DLEdBQ2xCWSxLQUFLa0MsS0FBTCxDQUFXLENBQVgsRUFBYyxNQUFLaEQsS0FBTCxDQUFXRSxvQkFBWCxHQUFrQyxDQUFoRCxDQURrQixHQUVsQlksSUFGRjtBQUdBLFVBQU1tQyxnQkFBZ0JILG9CQUNwQix3Q0FEb0IsR0FFcEIsdUNBRkY7QUFHQSxVQUFNSSxRQUFRSCxZQUFZSSxHQUFaLENBQWdCLFVBQUNuQixJQUFELEVBQU9YLEtBQVA7QUFBQSxlQUM1QixNQUFLRixjQUFMLENBQW9CLE1BQUtZLFVBQUwsQ0FBZ0JDLElBQWhCLEVBQXNCWCxLQUF0QixFQUE2QjRCLGFBQTdCLENBQXBCLEVBQWlFNUIsS0FBakUsRUFBd0VXLEtBQUtVLElBQTdFLENBRDRCO0FBQUEsT0FBaEIsQ0FBZDtBQUdBLFVBQU1VLFlBQVksTUFBS1QsV0FBTCxFQUFsQjtBQUNBLFVBQU1VLGNBQWM7QUFDbEJmLG1CQUFXRDtBQURPLE9BQXBCO0FBR0EsVUFBSUEsT0FBT1csS0FBUCxDQUFhLENBQUMsQ0FBZCxNQUFxQixJQUFyQixJQUE2QkksU0FBakMsRUFBNEM7QUFDMUMsWUFBTUUsV0FBV0MsU0FBU2xCLE9BQU9XLEtBQVAsQ0FBYSxDQUFiLEVBQWdCLENBQUMsQ0FBakIsQ0FBVCxFQUE4QixFQUE5QixDQUFqQjtBQUNBSyxvQkFBWUcsVUFBWixHQUE2QkYsV0FBVyxDQUF4QztBQUNEO0FBQ0QsYUFDRTtBQUFBO0FBQUE7QUFDRSxjQUFPZixFQUFQLGVBREY7QUFFRSxlQUFLLGFBQUNFLENBQUQsRUFBTztBQUFFLGtCQUFLcEMsa0JBQUwsR0FBMEJvQyxDQUExQjtBQUE4QixXQUY5QztBQUdFLHNEQUEwQ1IsU0FINUM7QUFJRSxpQkFBT29CO0FBSlQ7QUFNR0gsYUFOSDtBQU9HLGNBQUtPLFFBQUwsRUFQSDtBQVFHLGNBQUtDLGNBQUw7QUFSSCxPQURGO0FBWUQsS0FsSmtCOztBQUFBLFVBcUpuQkQsUUFySm1CLEdBcUpSLFlBQU07QUFBQSx5QkFTWCxNQUFLMUQsS0FUTTtBQUFBLFVBRWJ3QyxFQUZhLGdCQUViQSxFQUZhO0FBQUEsVUFHYnpCLElBSGEsZ0JBR2JBLElBSGE7QUFBQSxVQUlic0IsUUFKYSxnQkFJYkEsUUFKYTtBQUFBLFVBS2JGLFNBTGEsZ0JBS2JBLFNBTGE7QUFBQSxVQU1iQyxVQU5hLGdCQU1iQSxVQU5hO0FBQUEsVUFPYndCLFdBUGEsZ0JBT2JBLFdBUGE7QUFBQSxVQVFiYixpQkFSYSxnQkFRYkEsaUJBUmE7O0FBVWYsVUFBSSxDQUFDLE1BQUs5QyxLQUFMLENBQVdDLGVBQWhCLEVBQWlDO0FBQy9CO0FBQ0EsZUFBTyxJQUFQO0FBQ0Q7O0FBRUQ7QUFDQSxVQUFNMkQsVUFBVSxNQUFLNUQsS0FBTCxDQUFXRSxvQkFBWCxHQUFrQyxDQUFDLENBQW5DLEdBQ2RZLEtBQUtrQyxLQUFMLENBQVcsTUFBS2hELEtBQUwsQ0FBV0Usb0JBQVgsR0FBa0MsQ0FBN0MsQ0FEYyxHQUNvQ1ksSUFEcEQ7QUFFQSxVQUFNK0MsZ0JBQWdCRCxRQUFRVCxHQUFSLENBQVk7QUFBQSxlQUFTO0FBQ3pDeEIsaUJBQU9LLEtBQUtGLElBRDZCO0FBRXpDZ0MsaUJBQU85QixLQUFLVTtBQUY2QixTQUFUO0FBQUEsT0FBWixDQUF0QjtBQUlBLFVBQU1xQixrQkFBa0IsTUFBS3BCLFdBQUwsRUFBeEI7QUFDQSxVQUFNcUIsa0JBQWtCRCxrQkFBa0IsWUFBbEIsR0FBaUMsRUFBekQ7QUFDQSxVQUFNRSxvQkFBb0JGLGtCQUFrQiw0QkFBbEIsR0FBaUQsaUJBQTNFO0FBQ0EsVUFBTUcsdUJBQXVCSCxrQkFBa0IsNEJBQWxCLEdBQWlELGlCQUE5RTtBQUNBLFVBQU1JLGlCQUFpQnJCLG9CQUFvQm9CLG9CQUFwQixHQUEyQ0YsZUFBbEU7QUFDQSxVQUFNSSxjQUFjbEMsYUFBYyxNQUFLbEMsS0FBTCxDQUFXRSxvQkFBWCxHQUFrQyxDQUFoRCxHQUFxRCtELGlCQUFyRCxHQUF5RUUsY0FBN0YsQ0EzQmUsQ0EyQjhGO0FBQzdHLFVBQU1FLGFBQWF2RCxLQUFLb0IsU0FBTCxDQUFuQjtBQUNBLGFBQ0U7QUFBQTtBQUFBO0FBQ0UsY0FBT0ssRUFBUCxZQURGO0FBRUUsbURBQXVDNkIsV0FGekM7QUFHRSxpQkFBTyxFQUFFakMsc0JBQUYsRUFBY0Msa0JBQWQsRUFIVDtBQUlFLGVBQUssYUFBQ0ssQ0FBRCxFQUFPO0FBQUUsa0JBQUtqQyxrQkFBTCxHQUEwQmlDLENBQTFCO0FBQThCO0FBSjlDO0FBTUUsc0NBQUMsbUNBQUQ7QUFDRSxnQkFBU0YsRUFBVCxzQkFERjtBQUVFLGlCQUFPOEIsYUFBYUEsV0FBV3ZDLElBQXhCLEdBQStCLEVBRnhDO0FBR0UsdUJBQWEsS0FIZjtBQUlFLHVCQUFhNkIsV0FKZjtBQUtFLG1CQUFTRSxhQUxYO0FBTUUsb0JBQVUsTUFBS25DO0FBTmpCO0FBTkYsT0FERjtBQWlCRCxLQW5Na0I7O0FBQUEsVUFzTW5CZ0MsY0F0TW1CLEdBc01GLFlBQU07QUFBQSxVQUNiQSxjQURhLEdBQ00sTUFBSzNELEtBRFgsQ0FDYjJELGNBRGE7O0FBRXJCLFVBQUksQ0FBQ0EsY0FBTCxFQUFxQixPQUFPLElBQVA7QUFDckIsYUFDRTtBQUFBO0FBQUE7QUFDRSxxQkFBVSxtQ0FEWjtBQUVFLGVBQUssYUFBQ2pCLENBQUQsRUFBTztBQUFFLGtCQUFLL0IsMEJBQUwsR0FBa0MrQixDQUFsQztBQUFzQztBQUZ0RDtBQUlJaUI7QUFKSixPQURGO0FBUUQsS0FqTmtCOztBQUVqQixVQUFLMUMsVUFBTCxHQUFrQixFQUFsQixDQUZpQixDQUVLO0FBRkw7QUFHbEI7OzZCQU9Ec0QsaUIsZ0NBQW9CO0FBQ2xCQyxXQUFPQyxnQkFBUCxDQUF3QixRQUF4QixFQUFrQyx3QkFBUyxLQUFLdkQsc0JBQWQsQ0FBbEM7QUFDQXNELFdBQU9DLGdCQUFQLENBQXdCLG1CQUF4QixFQUE2QyxLQUFLdkQsc0JBQWxELEVBRmtCLENBRXlEO0FBQzNFLFNBQUtBLHNCQUFMO0FBQ0QsRzs7NkJBRUR3RCxrQiwrQkFBbUJDLFMsRUFBV0MsUyxFQUFXO0FBQ3ZDO0FBQ0EsUUFDRSxLQUFLM0UsS0FBTCxDQUFXQyxlQUFYLEtBQStCMEUsVUFBVTFFLGVBQXpDLElBQ0EsS0FBS0QsS0FBTCxDQUFXRSxvQkFBWCxLQUFvQ3lFLFVBQVV6RSxvQkFGaEQsRUFHRTtBQUNBLFdBQUtlLHNCQUFMO0FBQ0Q7QUFDRixHOzs2QkFFRDJELG9CLG1DQUF1QjtBQUNyQkwsV0FBT00sbUJBQVAsQ0FBMkIsUUFBM0IsRUFBcUMsd0JBQVMsS0FBSzVELHNCQUFkLENBQXJDO0FBQ0FzRCxXQUFPTSxtQkFBUCxDQUEyQixtQkFBM0IsRUFBZ0QsS0FBSzVELHNCQUFyRCxFQUZxQixDQUV5RDtBQUMvRSxHOztBQXdDRDs7O0FBS0E7OztBQUtBOzs7QUE2QkE7OztBQXdDQTs7O0FBaURBOzs7NkJBY0E2RCxNLHFCQUFTO0FBQ1AsV0FBTyxLQUFLakMsTUFBTCxFQUFQO0FBQ0QsRzs7O0VBMVAyQ2tDLGdCQUFNQyxhLFVBdUIzQ0MsWSxHQUFlO0FBQ3BCMUMsTUFBSSxtQkFEZ0I7QUFFcEJOLGFBQVcsRUFGUztBQUdwQkwsWUFBVSxvQkFBTSxDQUFFLENBSEU7QUFJcEJrQixxQkFBbUIsS0FKQztBQUtwQnRCLHNCQUFvQixJQUxBO0FBTXBCQyxnQkFBYyxJQU5NO0FBT3BCVyxZQUFVLFNBUFU7QUFRcEJELGNBQVksU0FSUTtBQVNwQndCLGVBQWEsU0FUTztBQVVwQnRCLFVBQVEsTUFWWTtBQVdwQnFCLGtCQUFnQjtBQVhJLEM7a0JBdkJINUQsZ0IiLCJmaWxlIjoicmVzcG9uc2l2ZS1uYXZiYXIuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgcmVhY3Qvbm8tZmluZC1kb20tbm9kZSAqL1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBGbG9hdGluZ1NlbGVjdCB9IGZyb20gJ0BvcHVzY2FwaXRhL3JlYWN0LWZsb2F0aW5nLXNlbGVjdCc7XG5pbXBvcnQgeyBPdmVybGF5VHJpZ2dlciwgVG9vbHRpcCB9IGZyb20gJ3JlYWN0LWJvb3RzdHJhcCc7XG5pbXBvcnQgeyBkZWJvdW5jZSB9IGZyb20gJ2RlYm91bmNlJztcblxuaW1wb3J0ICcuL3Jlc3BvbnNpdmUtbmF2YmFyLnNjc3MnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZXNwb25zaXZlTmF2YmFyIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgaWQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgY2xhc3NOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHNob3dOYXZJdGVtQm9yZGVyOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93TmF2SXRlbVRvb2x0aXA6IFByb3BUeXBlcy5ib29sLFxuICAgIHRvb2x0aXBEZWxheTogUHJvcFR5cGVzLm51bWJlcixcbiAgICBmb250U2l6ZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBmb250V2VpZ2h0OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHBsYWNlaG9sZGVyOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGFjdGl2ZUtleTogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuICAgIGxpc3Q6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICBuYW1lOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgICAgUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgUHJvcFR5cGVzLm5vZGUsXG4gICAgICBdKS5pc1JlcXVpcmVkLFxuICAgICAgaHJlZjogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLm51bWJlcl0pLFxuICAgIH0pKS5pc1JlcXVpcmVkLFxuICAgIG9uU2VsZWN0OiBQcm9wVHlwZXMuZnVuYyxcbiAgICBoZWlnaHQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgY29tcG9uZW50UmlnaHQ6IFByb3BUeXBlcy5ub2RlLFxuICB9XG5cbiAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICBpZDogJ3Jlc3BvbnNpdmUtbmF2YmFyJyxcbiAgICBjbGFzc05hbWU6ICcnLFxuICAgIG9uU2VsZWN0OiAoKSA9PiB7fSxcbiAgICBzaG93TmF2SXRlbUJvcmRlcjogZmFsc2UsXG4gICAgc2hvd05hdkl0ZW1Ub29sdGlwOiB0cnVlLFxuICAgIHRvb2x0aXBEZWxheTogMjAwMCxcbiAgICBmb250U2l6ZTogJ2luaGVyaXQnLFxuICAgIGZvbnRXZWlnaHQ6ICdpbmhlcml0JyxcbiAgICBwbGFjZWhvbGRlcjogJ21vcmUuLi4nLFxuICAgIGhlaWdodDogJzQwcHgnLFxuICAgIGNvbXBvbmVudFJpZ2h0OiBudWxsLFxuICB9XG5cbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5pdGVtV2lkdGhzID0gW107IC8vIHN0b3JlIGl0ZW0gd2lkdGhzIGhlcmUsIHRoZXkgZG9uJ3QgY2hhbmdlXG4gIH1cblxuICBzdGF0ZSA9IHtcbiAgICBpc1NlbGVjdFZpc2libGU6IGZhbHNlLFxuICAgIGxhc3RWaXNpYmxlSXRlbUluZGV4OiAtMixcbiAgfTtcblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgZGVib3VuY2UodGhpcy5yZWZyZXNoTGFzdFZpc2libGVJdGVtKSk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ29yaWVudGF0aW9uY2hhbmdlJywgdGhpcy5yZWZyZXNoTGFzdFZpc2libGVJdGVtKTsgLy8gZm9yIG1vYmlsZSBzdXBwb3J0XG4gICAgdGhpcy5yZWZyZXNoTGFzdFZpc2libGVJdGVtKCk7XG4gIH1cblxuICBjb21wb25lbnREaWRVcGRhdGUocHJldlByb3BzLCBwcmV2U3RhdGUpIHtcbiAgICAvLyBSZWZyZXNoIHZpc2libGUgaXRlbXMgaWYgdmFsdWVzIGNoYW5nZVxuICAgIGlmIChcbiAgICAgIHRoaXMuc3RhdGUuaXNTZWxlY3RWaXNpYmxlICE9PSBwcmV2U3RhdGUuaXNTZWxlY3RWaXNpYmxlIHx8XG4gICAgICB0aGlzLnN0YXRlLmxhc3RWaXNpYmxlSXRlbUluZGV4ICE9PSBwcmV2U3RhdGUubGFzdFZpc2libGVJdGVtSW5kZXhcbiAgICApIHtcbiAgICAgIHRoaXMucmVmcmVzaExhc3RWaXNpYmxlSXRlbSgpO1xuICAgIH1cbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCBkZWJvdW5jZSh0aGlzLnJlZnJlc2hMYXN0VmlzaWJsZUl0ZW0pKTtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignb3JpZW50YXRpb25jaGFuZ2UnLCB0aGlzLnJlZnJlc2hMYXN0VmlzaWJsZUl0ZW0pOyAvLyBmb3IgbW9iaWxlIHN1cHBvcnRcbiAgfVxuXG4gIGdldExhc3RWaXNpYmxlSXRlbUluZGV4ID0gKCkgPT4ge1xuICAgIGNvbnN0IG5hdkJhcldpZHRoID0gdGhpcy5uYXZiYXJDb250YWluZXJSZWYgPyB0aGlzLm5hdmJhckNvbnRhaW5lclJlZi5vZmZzZXRXaWR0aCA6IDA7XG4gICAgY29uc3Qgc2VsZWN0V2lkdGggPSB0aGlzLnNlbGVjdENvbnRhaW5lclJlZiA/IHRoaXMuc2VsZWN0Q29udGFpbmVyUmVmLm9mZnNldFdpZHRoIDogMDtcbiAgICBjb25zdCBjb21wb25lbnRSaWdodFdpZHRoID0gdGhpcy5jb21wb25lbnRSaWdodENvbnRhaW5lclJlZiA/IHRoaXMuY29tcG9uZW50UmlnaHRDb250YWluZXJSZWYub2Zmc2V0V2lkdGggOiAwOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG5cbiAgICBsZXQgcmVtYWluaW5nV2lkdGggPSBuYXZCYXJXaWR0aCAtIHNlbGVjdFdpZHRoIC0gY29tcG9uZW50UmlnaHRXaWR0aDtcbiAgICBsZXQgbGFzdFZpc2libGUgPSAwO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnByb3BzLmxpc3QubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIHJlbWFpbmluZ1dpZHRoIC09IHRoaXMuaXRlbVdpZHRoc1tpXTtcbiAgICAgIGlmIChyZW1haW5pbmdXaWR0aCA8IDApIHtcbiAgICAgICAgbGFzdFZpc2libGUgLT0gMTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBsYXN0VmlzaWJsZSArPSAxO1xuICAgIH1cblxuICAgIHJldHVybiBsYXN0VmlzaWJsZTtcbiAgfVxuXG4gIHJlZnJlc2hMYXN0VmlzaWJsZUl0ZW0gPSAoKSA9PiB7XG4gICAgY29uc3QgbGFzdFZpc2libGVJdGVtSW5kZXggPSB0aGlzLmdldExhc3RWaXNpYmxlSXRlbUluZGV4KCk7XG4gICAgaWYgKHRoaXMuc3RhdGUubGFzdFZpc2libGVJdGVtSW5kZXggIT09IGxhc3RWaXNpYmxlSXRlbUluZGV4KSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgaXNTZWxlY3RWaXNpYmxlOiB0aGlzLnByb3BzLmxpc3QubGVuZ3RoID4gKGxhc3RWaXNpYmxlSXRlbUluZGV4ICsgMSksXG4gICAgICAgIGxhc3RWaXNpYmxlSXRlbUluZGV4LFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgdG9vbHRpcFdyYXBwZXIgPSAobm9kZSwgaW5kZXgsIHRvb2x0aXBDb250ZW50KSA9PiB7XG4gICAgY29uc3QgdG9vbHRpcCA9IDxUb29sdGlwIGlkPVwidG9vbHRpcFwiPnt0b29sdGlwQ29udGVudH08L1Rvb2x0aXA+O1xuICAgIHJldHVybiAhdGhpcy5wcm9wcy5zaG93TmF2SXRlbVRvb2x0aXAgPyBub2RlIDpcbiAgICA8T3ZlcmxheVRyaWdnZXIgcGxhY2VtZW50PVwiYm90dG9tXCIga2V5PXtpbmRleH0gb3ZlcmxheT17dG9vbHRpcH0gZGVsYXlTaG93PXt0aGlzLnByb3BzLnRvb2x0aXBEZWxheX0+XG4gICAgICB7bm9kZX1cbiAgICA8L092ZXJsYXlUcmlnZ2VyPjtcbiAgfVxuXG4gIC8vIEhhbmRsZSByZWFjdC1zZWxlY3Qgb25DaGFuZ2VcbiAgaGFuZGxlT25DaGFuZ2UgPSAoeyB2YWx1ZSB9KSA9PiB7XG4gICAgdGhpcy5wcm9wcy5vblNlbGVjdCh2YWx1ZSk7XG4gIH1cblxuICAvLyBIYW5kbGUgbmF2YmFyIG9uQ2xpY2tcbiAgaGFuZGxlT25DbGljayA9IGhyZWYgPT4gKCkgPT4ge1xuICAgIHRoaXMucHJvcHMub25TZWxlY3QoaHJlZik7XG4gIH1cblxuICAvLyBSZW5kZXIgbmF2YmFyIGl0ZW1cbiAgbmF2YmFySXRlbSA9IChpdGVtLCBpbmRleCwgY2xhc3NOYW1lKSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgYWN0aXZlS2V5LFxuICAgICAgZm9udFdlaWdodCxcbiAgICAgIGZvbnRTaXplLFxuICAgICAgaGVpZ2h0LFxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiAoXG4gICAgICA8YnV0dG9uXG4gICAgICAgIGNsYXNzTmFtZT17aW5kZXggPT09IGFjdGl2ZUtleSA/IGAke2NsYXNzTmFtZX0gc2VsZWN0ZWQtYm9yZGVyYCA6IGAke2NsYXNzTmFtZX1gfVxuICAgICAgICBzdHlsZT17eyBmb250V2VpZ2h0LCBmb250U2l6ZSwgbWluSGVpZ2h0OiBoZWlnaHQgfX1cbiAgICAgICAgaWQ9e2l0ZW0uaWQgfHwgYG5hdkl0ZW0ke1N0cmluZyhpbmRleCl9YH1cbiAgICAgICAga2V5PXtpdGVtLmlkIHx8IGBuYXZpdGVtJHtTdHJpbmcoaW5kZXgpfWB9XG4gICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlT25DbGljayhpdGVtLmhyZWYpfVxuICAgICAgICByZWY9eyhyKSA9PiB7XG4gICAgICAgICAgaWYgKHIgJiYgIXRoaXMuaXRlbVdpZHRoc1tpbmRleF0pIHRoaXMuaXRlbVdpZHRoc1tpbmRleF0gPSByLm9mZnNldFdpZHRoO1xuICAgICAgICB9fVxuICAgICAgPlxuICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJyZXNwb25zaXZlLW5hdmJhci1pdGVtLXRleHRcIj57aXRlbS5uYW1lfTwvc3Bhbj5cbiAgICAgIDwvYnV0dG9uPlxuICAgICk7XG4gIH1cblxuICBkb0xpbmVDb3VudCA9ICgpID0+IHtcbiAgICBjb25zdCB7IGxpc3QgfSA9IHRoaXMucHJvcHM7XG4gICAgcmV0dXJuIGxpc3Quc29tZShpdGVtID0+IHR5cGVvZiAoaXRlbS5uYW1lKSAhPT0gJ3N0cmluZycpO1xuICB9XG5cbiAgLy8gUmVuZGVyIG5hdmJhclxuICBuYXZiYXIgPSAoKSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgaWQsXG4gICAgICBjbGFzc05hbWUsXG4gICAgICBsaXN0LFxuICAgICAgc2hvd05hdkl0ZW1Cb3JkZXIsXG4gICAgICBoZWlnaHQsXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgdmlzaWJsZUxpc3QgPSB0aGlzLnN0YXRlLmxhc3RWaXNpYmxlSXRlbUluZGV4ID4gLTIgP1xuICAgICAgbGlzdC5zbGljZSgwLCB0aGlzLnN0YXRlLmxhc3RWaXNpYmxlSXRlbUluZGV4ICsgMSkgOlxuICAgICAgbGlzdDtcbiAgICBjb25zdCBpdGVtQ2xhc3NOYW1lID0gc2hvd05hdkl0ZW1Cb3JkZXIgP1xuICAgICAgJ3Jlc3BvbnNpdmUtbmF2YmFyLWl0ZW0gaW5hY3RpdmUtYm9yZGVyJyA6XG4gICAgICAncmVzcG9uc2l2ZS1uYXZiYXItaXRlbSBuby1pdGVtLWJvcmRlcic7XG4gICAgY29uc3QgaXRlbXMgPSB2aXNpYmxlTGlzdC5tYXAoKGl0ZW0sIGluZGV4KSA9PiAoXG4gICAgICB0aGlzLnRvb2x0aXBXcmFwcGVyKHRoaXMubmF2YmFySXRlbShpdGVtLCBpbmRleCwgaXRlbUNsYXNzTmFtZSksIGluZGV4LCBpdGVtLm5hbWUpXG4gICAgKSk7XG4gICAgY29uc3QgbGluZUNvdW50ID0gdGhpcy5kb0xpbmVDb3VudCgpO1xuICAgIGNvbnN0IG5hdmJhclN0eWxlID0ge1xuICAgICAgbWluSGVpZ2h0OiBoZWlnaHQsXG4gICAgfTtcbiAgICBpZiAoaGVpZ2h0LnNsaWNlKC0yKSA9PT0gJ3B4JyAmJiBsaW5lQ291bnQpIHtcbiAgICAgIGNvbnN0IGhlaWdodFB4ID0gcGFyc2VJbnQoaGVpZ2h0LnNsaWNlKDAsIC0yKSwgMTApO1xuICAgICAgbmF2YmFyU3R5bGUubGluZUhlaWdodCA9IGAkeyhoZWlnaHRQeCAtIDQpfXB4YDtcbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXZcbiAgICAgICAgaWQ9e2Ake2lkfS1jb250YWluZXJgfVxuICAgICAgICByZWY9eyhyKSA9PiB7IHRoaXMubmF2YmFyQ29udGFpbmVyUmVmID0gcjsgfX1cbiAgICAgICAgY2xhc3NOYW1lPXtgcmVzcG9uc2l2ZS1uYXZiYXItY29udGFpbmVyICR7Y2xhc3NOYW1lfWB9XG4gICAgICAgIHN0eWxlPXtuYXZiYXJTdHlsZX1cbiAgICAgID5cbiAgICAgICAge2l0ZW1zfVxuICAgICAgICB7dGhpcy5jb21ib2JveCgpfVxuICAgICAgICB7dGhpcy5jb21wb25lbnRSaWdodCgpfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxuXG4gIC8vIFJlbmRlciBjb21ib2JveCwgd2hlbiBhbGwgaXRlbXMgZG8gbm90IGZpdFxuICBjb21ib2JveCA9ICgpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBpZCxcbiAgICAgIGxpc3QsXG4gICAgICBmb250U2l6ZSxcbiAgICAgIGFjdGl2ZUtleSxcbiAgICAgIGZvbnRXZWlnaHQsXG4gICAgICBwbGFjZWhvbGRlcixcbiAgICAgIHNob3dOYXZJdGVtQm9yZGVyLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIGlmICghdGhpcy5zdGF0ZS5pc1NlbGVjdFZpc2libGUpIHtcbiAgICAgIC8vIHJldHVybiBudWxsIGlmIGFsbCBuYXYgaXRlbXMgYXJlIHZpc2libGVcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIC8vIHNsaWNlIG5hdiBpdGVtcyBsaXN0IGFuZCBzaG93IGludmlzaWJsZSBpdGVtcyBpbiB0aGUgY29tYm9ib3hcbiAgICBjb25zdCBuYXZMaXN0ID0gdGhpcy5zdGF0ZS5sYXN0VmlzaWJsZUl0ZW1JbmRleCA+IC0yID9cbiAgICAgIGxpc3Quc2xpY2UodGhpcy5zdGF0ZS5sYXN0VmlzaWJsZUl0ZW1JbmRleCArIDEpIDogbGlzdDtcbiAgICBjb25zdCBzZWxlY3RPcHRpb25zID0gbmF2TGlzdC5tYXAoaXRlbSA9PiAoe1xuICAgICAgdmFsdWU6IGl0ZW0uaHJlZixcbiAgICAgIGxhYmVsOiBpdGVtLm5hbWUsXG4gICAgfSkpO1xuICAgIGNvbnN0IGxpbmVDb3VudE5lZWRlZCA9IHRoaXMuZG9MaW5lQ291bnQoKTtcbiAgICBjb25zdCBjdXN0b21MaW5lQ291bnQgPSBsaW5lQ291bnROZWVkZWQgPyAnbGluZS1jb3VudCcgOiAnJztcbiAgICBjb25zdCBjdXN0b21Cb3JkZXJDbGFzcyA9IGxpbmVDb3VudE5lZWRlZCA/ICdzZWxlY3RlZC1ib3JkZXIgbGluZS1jb3VudCcgOiAnc2VsZWN0ZWQtYm9yZGVyJztcbiAgICBjb25zdCBjdXN0b21JbmFjdGl2ZUJvcmRlciA9IGxpbmVDb3VudE5lZWRlZCA/ICdpbmFjdGl2ZS1ib3JkZXIgbGluZS1jb3VudCcgOiAnaW5hY3RpdmUtYm9yZGVyJztcbiAgICBjb25zdCBpbmFjdGl2ZUJvcmRlciA9IHNob3dOYXZJdGVtQm9yZGVyID8gY3VzdG9tSW5hY3RpdmVCb3JkZXIgOiBjdXN0b21MaW5lQ291bnQ7XG4gICAgY29uc3QgYm9yZGVyQ2xhc3MgPSBhY3RpdmVLZXkgPj0gKHRoaXMuc3RhdGUubGFzdFZpc2libGVJdGVtSW5kZXggKyAxKSA/IGN1c3RvbUJvcmRlckNsYXNzIDogaW5hY3RpdmVCb3JkZXI7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICBjb25zdCBhY3RpdmVJdGVtID0gbGlzdFthY3RpdmVLZXldO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2XG4gICAgICAgIGlkPXtgJHtpZH0tc2VsZWN0YH1cbiAgICAgICAgY2xhc3NOYW1lPXtgcmVzcG9uc2l2ZS1uYXZiYXItc2VsZWN0ICR7Ym9yZGVyQ2xhc3N9YH1cbiAgICAgICAgc3R5bGU9e3sgZm9udFdlaWdodCwgZm9udFNpemUgfX1cbiAgICAgICAgcmVmPXsocikgPT4geyB0aGlzLnNlbGVjdENvbnRhaW5lclJlZiA9IHI7IH19XG4gICAgICA+XG4gICAgICAgIDxGbG9hdGluZ1NlbGVjdFxuICAgICAgICAgIG5hbWU9e2Ake2lkfS1zZWxlY3QtY29tcG9uZW50YH1cbiAgICAgICAgICB2YWx1ZT17YWN0aXZlSXRlbSA/IGFjdGl2ZUl0ZW0uaHJlZiA6ICcnfVxuICAgICAgICAgIGlzQ2xlYXJhYmxlPXtmYWxzZX1cbiAgICAgICAgICBwbGFjZWhvbGRlcj17cGxhY2Vob2xkZXJ9XG4gICAgICAgICAgb3B0aW9ucz17c2VsZWN0T3B0aW9uc31cbiAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVPbkNoYW5nZX1cbiAgICAgICAgLz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cblxuICAvLyBSZW5kZXIgY3VzdG9tIHJpZ2h0IHNpZGUgY29tcG9uZW50XG4gIGNvbXBvbmVudFJpZ2h0ID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgY29tcG9uZW50UmlnaHQgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKCFjb21wb25lbnRSaWdodCkgcmV0dXJuIG51bGw7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3NOYW1lPVwicmVzcG9uc2l2ZS1uYXZiYXItY29udGFpbmVyLXJpZ2h0XCJcbiAgICAgICAgcmVmPXsocikgPT4geyB0aGlzLmNvbXBvbmVudFJpZ2h0Q29udGFpbmVyUmVmID0gcjsgfX1cbiAgICAgID5cbiAgICAgICAgeyBjb21wb25lbnRSaWdodCB9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiB0aGlzLm5hdmJhcigpO1xuICB9XG59XG4iXX0=