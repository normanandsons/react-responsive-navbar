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
      return _react2.default.createElement(
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yZXNwb25zaXZlLW5hdmJhci5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIlJlc3BvbnNpdmVOYXZiYXIiLCJwcm9wcyIsInN0YXRlIiwiaXNTZWxlY3RWaXNpYmxlIiwibGFzdFZpc2libGVJdGVtSW5kZXgiLCJnZXRMYXN0VmlzaWJsZUl0ZW1JbmRleCIsIm5hdkJhcldpZHRoIiwibmF2YmFyQ29udGFpbmVyUmVmIiwib2Zmc2V0V2lkdGgiLCJzZWxlY3RXaWR0aCIsInNlbGVjdENvbnRhaW5lclJlZiIsImNvbXBvbmVudFJpZ2h0V2lkdGgiLCJjb21wb25lbnRSaWdodENvbnRhaW5lclJlZiIsInJlbWFpbmluZ1dpZHRoIiwibGFzdFZpc2libGUiLCJpIiwibGlzdCIsImxlbmd0aCIsIml0ZW1XaWR0aHMiLCJyZWZyZXNoTGFzdFZpc2libGVJdGVtIiwic2V0U3RhdGUiLCJ0b29sdGlwV3JhcHBlciIsIm5vZGUiLCJpbmRleCIsInRvb2x0aXBDb250ZW50IiwidG9vbHRpcCIsInNob3dOYXZJdGVtVG9vbHRpcCIsInRvb2x0aXBEZWxheSIsImhhbmRsZU9uQ2hhbmdlIiwidmFsdWUiLCJvblNlbGVjdCIsImhhbmRsZU9uQ2xpY2siLCJocmVmIiwibmF2YmFySXRlbSIsIml0ZW0iLCJjbGFzc05hbWUiLCJhY3RpdmVLZXkiLCJmb250V2VpZ2h0IiwiZm9udFNpemUiLCJpZCIsIlN0cmluZyIsInIiLCJuYW1lIiwiZG9MaW5lQ291bnQiLCJzb21lIiwibmF2YmFyIiwic2hvd05hdkl0ZW1Cb3JkZXIiLCJoZWlnaHQiLCJ2aXNpYmxlTGlzdCIsInNsaWNlIiwiaXRlbUNsYXNzTmFtZSIsIml0ZW1zIiwibWFwIiwibGluZUNvdW50IiwibmF2YmFyU3R5bGUiLCJtaW5IZWlnaHQiLCJoZWlnaHRQeCIsInBhcnNlSW50IiwibGluZUhlaWdodCIsImNvbWJvYm94IiwiY29tcG9uZW50UmlnaHQiLCJwbGFjZWhvbGRlciIsIm5hdkxpc3QiLCJzZWxlY3RPcHRpb25zIiwibGFiZWwiLCJsaW5lQ291bnROZWVkZWQiLCJjdXN0b21MaW5lQ291bnQiLCJjdXN0b21Cb3JkZXJDbGFzcyIsImN1c3RvbUluYWN0aXZlQm9yZGVyIiwiaW5hY3RpdmVCb3JkZXIiLCJib3JkZXJDbGFzcyIsImFjdGl2ZUl0ZW0iLCJjb21wb25lbnREaWRNb3VudCIsIndpbmRvdyIsImFkZEV2ZW50TGlzdGVuZXIiLCJjb21wb25lbnREaWRVcGRhdGUiLCJwcmV2UHJvcHMiLCJwcmV2U3RhdGUiLCJjb21wb25lbnRXaWxsVW5tb3VudCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJyZW5kZXIiLCJSZWFjdCIsIlB1cmVDb21wb25lbnQiLCJkZWZhdWx0UHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7O21CQUFBOzs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7SUFFcUJBLGdCOzs7QUFxQ25CLDRCQUFZQyxLQUFaLEVBQW1CO0FBQUE7O0FBQUEsaURBQ2pCLGdDQUFNQSxLQUFOLENBRGlCOztBQUFBLFVBS25CQyxLQUxtQixHQUtYO0FBQ05DLHVCQUFpQixLQURYO0FBRU5DLDRCQUFzQixDQUFDO0FBRmpCLEtBTFc7O0FBQUEsVUErQm5CQyx1QkEvQm1CLEdBK0JPLFlBQU07QUFDOUIsVUFBTUMsY0FBYyxNQUFLQyxrQkFBTCxHQUEwQixNQUFLQSxrQkFBTCxDQUF3QkMsV0FBbEQsR0FBZ0UsQ0FBcEY7QUFDQSxVQUFNQyxjQUFjLE1BQUtDLGtCQUFMLEdBQTBCLE1BQUtBLGtCQUFMLENBQXdCRixXQUFsRCxHQUFnRSxDQUFwRjtBQUNBLFVBQU1HLHNCQUFzQixNQUFLQywwQkFBTCxHQUFrQyxNQUFLQSwwQkFBTCxDQUFnQ0osV0FBbEUsR0FBZ0YsQ0FBNUcsQ0FIOEIsQ0FHaUY7O0FBRS9HLFVBQUlLLGlCQUFpQlAsY0FBY0csV0FBZCxHQUE0QkUsbUJBQWpEO0FBQ0EsVUFBSUcsY0FBYyxDQUFsQjs7QUFFQSxXQUFLLElBQUlDLElBQUks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c2xpbnQtZGlzYWJsZSByZWFjdC9uby1maW5kLWRvbS1ub2RlICovXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IEZsb2F0aW5nU2VsZWN0IH0gZnJvbSAnQG9wdXNjYXBpdGEvcmVhY3QtZmxvYXRpbmctc2VsZWN0JztcbmltcG9ydCB7IE92ZXJsYXlUcmlnZ2VyLCBUb29sdGlwIH0gZnJvbSAncmVhY3QtYm9vdHN0cmFwJztcbmltcG9ydCB7IGRlYm91bmNlIH0gZnJvbSAnZGVib3VuY2UnO1xuXG5pbXBvcnQgJy4vcmVzcG9uc2l2ZS1uYXZiYXIuc2Nzcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlc3BvbnNpdmVOYXZiYXIgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBpZDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBjbGFzc05hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgc2hvd05hdkl0ZW1Cb3JkZXI6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dOYXZJdGVtVG9vbHRpcDogUHJvcFR5cGVzLmJvb2wsXG4gICAgdG9vbHRpcERlbGF5OiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIGZvbnRTaXplOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGZvbnRXZWlnaHQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgcGxhY2Vob2xkZXI6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgYWN0aXZlS2V5OiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgbGlzdDogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgIG5hbWU6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgICBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICBQcm9wVHlwZXMubm9kZSxcbiAgICAgIF0pLmlzUmVxdWlyZWQsXG4gICAgICBocmVmOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMubnVtYmVyXSksXG4gICAgfSkpLmlzUmVxdWlyZWQsXG4gICAgb25TZWxlY3Q6IFByb3BUeXBlcy5mdW5jLFxuICAgIGhlaWdodDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBjb21wb25lbnRSaWdodDogUHJvcFR5cGVzLm5vZGUsXG4gIH1cblxuICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgIGlkOiAncmVzcG9uc2l2ZS1uYXZiYXInLFxuICAgIGNsYXNzTmFtZTogJycsXG4gICAgb25TZWxlY3Q6ICgpID0+IHt9LFxuICAgIHNob3dOYXZJdGVtQm9yZGVyOiBmYWxzZSxcbiAgICBzaG93TmF2SXRlbVRvb2x0aXA6IHRydWUsXG4gICAgdG9vbHRpcERlbGF5OiAyMDAwLFxuICAgIGZvbnRTaXplOiAnaW5oZXJpdCcsXG4gICAgZm9udFdlaWdodDogJ2luaGVyaXQnLFxuICAgIHBsYWNlaG9sZGVyOiAnbW9yZS4uLicsXG4gICAgaGVpZ2h0OiAnNDBweCcsXG4gICAgY29tcG9uZW50UmlnaHQ6IG51bGwsXG4gIH1cblxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLml0ZW1XaWR0aHMgPSBbXTsgLy8gc3RvcmUgaXRlbSB3aWR0aHMgaGVyZSwgdGhleSBkb24ndCBjaGFuZ2VcbiAgfVxuXG4gIHN0YXRlID0ge1xuICAgIGlzU2VsZWN0VmlzaWJsZTogZmFsc2UsXG4gICAgbGFzdFZpc2libGVJdGVtSW5kZXg6IC0yLFxuICB9O1xuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBkZWJvdW5jZSh0aGlzLnJlZnJlc2hMYXN0VmlzaWJsZUl0ZW0pKTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignb3JpZW50YXRpb25jaGFuZ2UnLCB0aGlzLnJlZnJlc2hMYXN0VmlzaWJsZUl0ZW0pOyAvLyBmb3IgbW9iaWxlIHN1cHBvcnRcbiAgICB0aGlzLnJlZnJlc2hMYXN0VmlzaWJsZUl0ZW0oKTtcbiAgfVxuXG4gIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHMsIHByZXZTdGF0ZSkge1xuICAgIC8vIFJlZnJlc2ggdmlzaWJsZSBpdGVtcyBpZiB2YWx1ZXMgY2hhbmdlXG4gICAgaWYgKFxuICAgICAgdGhpcy5zdGF0ZS5pc1NlbGVjdFZpc2libGUgIT09IHByZXZTdGF0ZS5pc1NlbGVjdFZpc2libGUgfHxcbiAgICAgIHRoaXMuc3RhdGUubGFzdFZpc2libGVJdGVtSW5kZXggIT09IHByZXZTdGF0ZS5sYXN0VmlzaWJsZUl0ZW1JbmRleFxuICAgICkge1xuICAgICAgdGhpcy5yZWZyZXNoTGFzdFZpc2libGVJdGVtKCk7XG4gICAgfVxuICB9XG5cbiAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGRlYm91bmNlKHRoaXMucmVmcmVzaExhc3RWaXNpYmxlSXRlbSkpO1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdvcmllbnRhdGlvbmNoYW5nZScsIHRoaXMucmVmcmVzaExhc3RWaXNpYmxlSXRlbSk7IC8vIGZvciBtb2JpbGUgc3VwcG9ydFxuICB9XG5cbiAgZ2V0TGFzdFZpc2libGVJdGVtSW5kZXggPSAoKSA9PiB7XG4gICAgY29uc3QgbmF2QmFyV2lkdGggPSB0aGlzLm5hdmJhckNvbnRhaW5lclJlZiA/IHRoaXMubmF2YmFyQ29udGFpbmVyUmVmLm9mZnNldFdpZHRoIDogMDtcbiAgICBjb25zdCBzZWxlY3RXaWR0aCA9IHRoaXMuc2VsZWN0Q29udGFpbmVyUmVmID8gdGhpcy5zZWxlY3RDb250YWluZXJSZWYub2Zmc2V0V2lkdGggOiAwO1xuICAgIGNvbnN0IGNvbXBvbmVudFJpZ2h0V2lkdGggPSB0aGlzLmNvbXBvbmVudFJpZ2h0Q29udGFpbmVyUmVmID8gdGhpcy5jb21wb25lbnRSaWdodENvbnRhaW5lclJlZi5vZmZzZXRXaWR0aCA6IDA7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcblxuICAgIGxldCByZW1haW5pbmdXaWR0aCA9IG5hdkJhcldpZHRoIC0gc2VsZWN0V2lkdGggLSBjb21wb25lbnRSaWdodFdpZHRoO1xuICAgIGxldCBsYXN0VmlzaWJsZSA9IDA7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucHJvcHMubGlzdC5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgcmVtYWluaW5nV2lkdGggLT0gdGhpcy5pdGVtV2lkdGhzW2ldO1xuICAgICAgaWYgKHJlbWFpbmluZ1dpZHRoIDwgMCkge1xuICAgICAgICBsYXN0VmlzaWJsZSAtPSAxO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGxhc3RWaXNpYmxlICs9IDE7XG4gICAgfVxuXG4gICAgcmV0dXJuIGxhc3RWaXNpYmxlO1xuICB9XG5cbiAgcmVmcmVzaExhc3RWaXNpYmxlSXRlbSA9ICgpID0+IHtcbiAgICBjb25zdCBsYXN0VmlzaWJsZUl0ZW1JbmRleCA9IHRoaXMuZ2V0TGFzdFZpc2libGVJdGVtSW5kZXgoKTtcbiAgICBpZiAodGhpcy5zdGF0ZS5sYXN0VmlzaWJsZUl0ZW1JbmRleCAhPT0gbGFzdFZpc2libGVJdGVtSW5kZXgpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBpc1NlbGVjdFZpc2libGU6IHRoaXMucHJvcHMubGlzdC5sZW5ndGggPiAobGFzdFZpc2libGVJdGVtSW5kZXggKyAxKSxcbiAgICAgICAgbGFzdFZpc2libGVJdGVtSW5kZXgsXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICB0b29sdGlwV3JhcHBlciA9IChub2RlLCBpbmRleCwgdG9vbHRpcENvbnRlbnQpID0+IHtcbiAgICBjb25zdCB0b29sdGlwID0gPFRvb2x0aXAgaWQ9XCJ0b29sdGlwXCI+e3Rvb2x0aXBDb250ZW50fTwvVG9vbHRpcD47XG4gICAgcmV0dXJuICF0aGlzLnByb3BzLnNob3dOYXZJdGVtVG9vbHRpcCA/IG5vZGUgOlxuICAgIDxPdmVybGF5VHJpZ2dlciBwbGFjZW1lbnQ9XCJib3R0b21cIiBrZXk9e2luZGV4fSBvdmVybGF5PXt0b29sdGlwfSBkZWxheVNob3c9e3RoaXMucHJvcHMudG9vbHRpcERlbGF5fT5cbiAgICAgIHtub2RlfVxuICAgIDwvT3ZlcmxheVRyaWdnZXI+O1xuICB9XG5cbiAgLy8gSGFuZGxlIHJlYWN0LXNlbGVjdCBvbkNoYW5nZVxuICBoYW5kbGVPbkNoYW5nZSA9ICh7IHZhbHVlIH0pID0+IHtcbiAgICB0aGlzLnByb3BzLm9uU2VsZWN0KHZhbHVlKTtcbiAgfVxuXG4gIC8vIEhhbmRsZSBuYXZiYXIgb25DbGlja1xuICBoYW5kbGVPbkNsaWNrID0gaHJlZiA9PiAoKSA9PiB7XG4gICAgdGhpcy5wcm9wcy5vblNlbGVjdChocmVmKTtcbiAgfVxuXG4gIC8vIFJlbmRlciBuYXZiYXIgaXRlbVxuICBuYXZiYXJJdGVtID0gKGl0ZW0sIGluZGV4LCBjbGFzc05hbWUpID0+IChcbiAgICA8YnV0dG9uXG4gICAgICBjbGFzc05hbWU9e2luZGV4ID09PSB0aGlzLnByb3BzLmFjdGl2ZUtleSA/IGAke2NsYXNzTmFtZX0gc2VsZWN0ZWQtYm9yZGVyYCA6IGAke2NsYXNzTmFtZX1gfVxuICAgICAgc3R5bGU9e3sgZm9udFdlaWdodDogdGhpcy5wcm9wcy5mb250V2VpZ2h0LCBmb250U2l6ZTogdGhpcy5wcm9wcy5mb250U2l6ZSB9fVxuICAgICAgaWQ9e2l0ZW0uaWQgfHwgYG5hdkl0ZW0ke1N0cmluZyhpbmRleCl9YH1cbiAgICAgIGtleT17aXRlbS5pZCB8fCBgbmF2aXRlbSR7U3RyaW5nKGluZGV4KX1gfVxuICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVPbkNsaWNrKGl0ZW0uaHJlZil9XG4gICAgICByZWY9eyhyKSA9PiB7XG4gICAgICAgIGlmIChyICYmICF0aGlzLml0ZW1XaWR0aHNbaW5kZXhdKSB0aGlzLml0ZW1XaWR0aHNbaW5kZXhdID0gci5vZmZzZXRXaWR0aDtcbiAgICAgIH19XG4gICAgPlxuICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicmVzcG9uc2l2ZS1uYXZiYXItaXRlbS10ZXh0XCI+e2l0ZW0ubmFtZX08L3NwYW4+XG4gICAgPC9idXR0b24+XG4gIClcblxuICBkb0xpbmVDb3VudCA9ICgpID0+IHtcbiAgICBjb25zdCB7IGxpc3QgfSA9IHRoaXMucHJvcHM7XG4gICAgcmV0dXJuIGxpc3Quc29tZShpdGVtID0+IHR5cGVvZiAoaXRlbS5uYW1lKSAhPT0gJ3N0cmluZycpO1xuICB9XG5cbiAgLy8gUmVuZGVyIG5hdmJhclxuICBuYXZiYXIgPSAoKSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgaWQsXG4gICAgICBjbGFzc05hbWUsXG4gICAgICBsaXN0LFxuICAgICAgc2hvd05hdkl0ZW1Cb3JkZXIsXG4gICAgICBoZWlnaHQsXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgdmlzaWJsZUxpc3QgPSB0aGlzLnN0YXRlLmxhc3RWaXNpYmxlSXRlbUluZGV4ID4gLTIgP1xuICAgICAgbGlzdC5zbGljZSgwLCB0aGlzLnN0YXRlLmxhc3RWaXNpYmxlSXRlbUluZGV4ICsgMSkgOlxuICAgICAgbGlzdDtcbiAgICBjb25zdCBpdGVtQ2xhc3NOYW1lID0gc2hvd05hdkl0ZW1Cb3JkZXIgP1xuICAgICAgJ3Jlc3BvbnNpdmUtbmF2YmFyLWl0ZW0gaW5hY3RpdmUtYm9yZGVyJyA6XG4gICAgICAncmVzcG9uc2l2ZS1uYXZiYXItaXRlbSBuby1pdGVtLWJvcmRlcic7XG4gICAgY29uc3QgaXRlbXMgPSB2aXNpYmxlTGlzdC5tYXAoKGl0ZW0sIGluZGV4KSA9PiAoXG4gICAgICB0aGlzLnRvb2x0aXBXcmFwcGVyKHRoaXMubmF2YmFySXRlbShpdGVtLCBpbmRleCwgaXRlbUNsYXNzTmFtZSksIGluZGV4LCBpdGVtLm5hbWUpXG4gICAgKSk7XG4gICAgY29uc3QgbGluZUNvdW50ID0gdGhpcy5kb0xpbmVDb3VudCgpO1xuICAgIGNvbnN0IG5hdmJhclN0eWxlID0ge1xuICAgICAgbWluSGVpZ2h0OiBoZWlnaHQsXG4gICAgfTtcbiAgICBpZiAoaGVpZ2h0LnNsaWNlKC0yKSA9PT0gJ3B4JyAmJiBsaW5lQ291bnQpIHtcbiAgICAgIGNvbnN0IGhlaWdodFB4ID0gcGFyc2VJbnQoaGVpZ2h0LnNsaWNlKDAsIC0yKSwgMTApO1xuICAgICAgbmF2YmFyU3R5bGUubGluZUhlaWdodCA9IGAkeyhoZWlnaHRQeCAtIDQpfXB4YDtcbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXZcbiAgICAgICAgaWQ9e2Ake2lkfS1jb250YWluZXJgfVxuICAgICAgICByZWY9eyhyKSA9PiB7IHRoaXMubmF2YmFyQ29udGFpbmVyUmVmID0gcjsgfX1cbiAgICAgICAgY2xhc3NOYW1lPXtgcmVzcG9uc2l2ZS1uYXZiYXItY29udGFpbmVyICR7Y2xhc3NOYW1lfWB9XG4gICAgICAgIHN0eWxlPXtuYXZiYXJTdHlsZX1cbiAgICAgID5cbiAgICAgICAge2l0ZW1zfVxuICAgICAgICB7dGhpcy5jb21ib2JveCgpfVxuICAgICAgICB7dGhpcy5jb21wb25lbnRSaWdodCgpfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxuXG4gIC8vIFJlbmRlciBjb21ib2JveCwgd2hlbiBhbGwgaXRlbXMgZG8gbm90IGZpdFxuICBjb21ib2JveCA9ICgpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBpZCxcbiAgICAgIGxpc3QsXG4gICAgICBmb250U2l6ZSxcbiAgICAgIGFjdGl2ZUtleSxcbiAgICAgIGZvbnRXZWlnaHQsXG4gICAgICBwbGFjZWhvbGRlcixcbiAgICAgIHNob3dOYXZJdGVtQm9yZGVyLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIGlmICghdGhpcy5zdGF0ZS5pc1NlbGVjdFZpc2libGUpIHtcbiAgICAgIC8vIHJldHVybiBudWxsIGlmIGFsbCBuYXYgaXRlbXMgYXJlIHZpc2libGVcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIC8vIHNsaWNlIG5hdiBpdGVtcyBsaXN0IGFuZCBzaG93IGludmlzaWJsZSBpdGVtcyBpbiB0aGUgY29tYm9ib3hcbiAgICBjb25zdCBuYXZMaXN0ID0gdGhpcy5zdGF0ZS5sYXN0VmlzaWJsZUl0ZW1JbmRleCA+IC0yID9cbiAgICAgIGxpc3Quc2xpY2UodGhpcy5zdGF0ZS5sYXN0VmlzaWJsZUl0ZW1JbmRleCArIDEpIDogbGlzdDtcbiAgICBjb25zdCBzZWxlY3RPcHRpb25zID0gbmF2TGlzdC5tYXAoaXRlbSA9PiAoe1xuICAgICAgdmFsdWU6IGl0ZW0uaHJlZixcbiAgICAgIGxhYmVsOiBpdGVtLm5hbWUsXG4gICAgfSkpO1xuICAgIGNvbnN0IGxpbmVDb3VudE5lZWRlZCA9IHRoaXMuZG9MaW5lQ291bnQoKTtcbiAgICBjb25zdCBjdXN0b21MaW5lQ291bnQgPSBsaW5lQ291bnROZWVkZWQgPyAnbGluZS1jb3VudCcgOiAnJztcbiAgICBjb25zdCBjdXN0b21Cb3JkZXJDbGFzcyA9IGxpbmVDb3VudE5lZWRlZCA/ICdzZWxlY3RlZC1ib3JkZXIgbGluZS1jb3VudCcgOiAnc2VsZWN0ZWQtYm9yZGVyJztcbiAgICBjb25zdCBjdXN0b21JbmFjdGl2ZUJvcmRlciA9IGxpbmVDb3VudE5lZWRlZCA/ICdpbmFjdGl2ZS1ib3JkZXIgbGluZS1jb3VudCcgOiAnaW5hY3RpdmUtYm9yZGVyJztcbiAgICBjb25zdCBpbmFjdGl2ZUJvcmRlciA9IHNob3dOYXZJdGVtQm9yZGVyID8gY3VzdG9tSW5hY3RpdmVCb3JkZXIgOiBjdXN0b21MaW5lQ291bnQ7XG4gICAgY29uc3QgYm9yZGVyQ2xhc3MgPSBhY3RpdmVLZXkgPj0gKHRoaXMuc3RhdGUubGFzdFZpc2libGVJdGVtSW5kZXggKyAxKSA/IGN1c3RvbUJvcmRlckNsYXNzIDogaW5hY3RpdmVCb3JkZXI7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICBjb25zdCBhY3RpdmVJdGVtID0gbGlzdFthY3RpdmVLZXldO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2XG4gICAgICAgIGlkPXtgJHtpZH0tc2VsZWN0YH1cbiAgICAgICAgY2xhc3NOYW1lPXtgcmVzcG9uc2l2ZS1uYXZiYXItc2VsZWN0ICR7Ym9yZGVyQ2xhc3N9YH1cbiAgICAgICAgc3R5bGU9e3sgZm9udFdlaWdodCwgZm9udFNpemUgfX1cbiAgICAgICAgcmVmPXsocikgPT4geyB0aGlzLnNlbGVjdENvbnRhaW5lclJlZiA9IHI7IH19XG4gICAgICA+XG4gICAgICAgIDxGbG9hdGluZ1NlbGVjdFxuICAgICAgICAgIG5hbWU9e2Ake2lkfS1zZWxlY3QtY29tcG9uZW50YH1cbiAgICAgICAgICB2YWx1ZT17YWN0aXZlSXRlbSA/IGFjdGl2ZUl0ZW0uaHJlZiA6ICcnfVxuICAgICAgICAgIGlzQ2xlYXJhYmxlPXtmYWxzZX1cbiAgICAgICAgICBwbGFjZWhvbGRlcj17cGxhY2Vob2xkZXJ9XG4gICAgICAgICAgb3B0aW9ucz17c2VsZWN0T3B0aW9uc31cbiAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVPbkNoYW5nZX1cbiAgICAgICAgLz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cblxuICAvLyBSZW5kZXIgY3VzdG9tIHJpZ2h0IHNpZGUgY29tcG9uZW50XG4gIGNvbXBvbmVudFJpZ2h0ID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgY29tcG9uZW50UmlnaHQgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKCFjb21wb25lbnRSaWdodCkgcmV0dXJuIG51bGw7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3NOYW1lPVwicmVzcG9uc2l2ZS1uYXZiYXItY29udGFpbmVyLXJpZ2h0XCJcbiAgICAgICAgcmVmPXsocikgPT4geyB0aGlzLmNvbXBvbmVudFJpZ2h0Q29udGFpbmVyUmVmID0gcjsgfX1cbiAgICAgID5cbiAgICAgICAgeyBjb21wb25lbnRSaWdodCB9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiB0aGlzLm5hdmJhcigpO1xuICB9XG59XG4iXX0=