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

    _this.handleResize = function () {
      return (0, _debounce.debounce)(_this.refreshLastVisibleItem);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yZXNwb25zaXZlLW5hdmJhci5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIlJlc3BvbnNpdmVOYXZiYXIiLCJwcm9wcyIsInN0YXRlIiwiaXNTZWxlY3RWaXNpYmxlIiwibGFzdFZpc2libGVJdGVtSW5kZXgiLCJnZXRMYXN0VmlzaWJsZUl0ZW1JbmRleCIsIm5hdkJhcldpZHRoIiwibmF2YmFyQ29udGFpbmVyUmVmIiwib2Zmc2V0V2lkdGgiLCJzZWxlY3RXaWR0aCIsInNlbGVjdENvbnRhaW5lclJlZiIsImNvbXBvbmVudExlZnRXaWR0aCIsImNvbXBvbmVudExlZnRDb250YWluZXJSZWYiLCJjb21wb25lbnRSaWdodFdpZHRoIiwiY29tcG9uZW50UmlnaHRDb250YWluZXJSZWYiLCJyZW1haW5pbmdXaWR0aCIsImxhc3RWaXNpYmxlIiwiaSIsImxpc3QiLCJsZW5ndGgiLCJpdGVtV2lkdGhzIiwiaGFuZGxlUmVzaXplIiwicmVmcmVzaExhc3RWaXNpYmxlSXRlbSIsInNldFN0YXRlIiwidG9vbHRpcFdyYXBwZXIiLCJub2RlIiwiaW5kZXgiLCJ0b29sdGlwQ29udGVudCIsInRvb2x0aXAiLCJzaG93TmF2SXRlbVRvb2x0aXAiLCJ0b29sdGlwRGVsYXkiLCJoYW5kbGVPbkNoYW5nZSIsInZhbHVlIiwib25TZWxlY3QiLCJoYW5kbGVPbkNsaWNrIiwiaHJlZiIsIm5hdmJhckl0ZW0iLCJpdGVtIiwiY2xhc3NOYW1lIiwiYWN0aXZlS2V5IiwiZm9udFdlaWdodCIsImZvbnRTaXplIiwiaGVpZ2h0IiwibWluSGVpZ2h0IiwiaWQiLCJTdHJpbmciLCJyIiwibmFtZSIsImRvTGluZUNvdW50Iiwic29tZSIsIm5hdmJhciIsInNob3dOYXZJdGVtQm9yZGVyIiwidmlzaWJsZUxpc3QiLCJzbGljZSIsIml0ZW1DbGFzc05hbWUiLCJpdGVtcyIsIm1hcCIsImxpbmVDb3VudCIsIm5hdmJhclN0eWxlIiwiaGVpZ2h0UHgiLCJwYXJzZUludCIsImxpbmVIZWlnaHQiLCJjb21ib2JveCIsImNvbXBvbmVudExlZnQiLCJjb21wb25lbnRSaWdodCIsInBsYWNlaG9sZGVyIiwibmF2TGlzdCIsInNlbGVjdE9wdGlvbnMiLCJsYWJlbCIsImxpbmVDb3VudE5lZWRlZCIsImN1c3RvbUxpbmVDb3VudCIsImN1c3RvbUJvcmRlckNsYXNzIiwiY3VzdG9tSW5hY3RpdmVCb3JkZXIiLCJpbmFjdGl2ZUJvcmRlciIsImJvcmRlckNsYXNzIiwiYWN0aXZlSXRlbSIsImNvbXBvbmVudERpZE1vdW50Iiwid2luZG93IiwiYWRkRXZlbnRMaXN0ZW5lciIsImNvbXBvbmVudERpZFVwZGF0ZSIsInByZXZQcm9wcyIsInByZXZTdGF0ZSIsImNvbXBvbmVudFdpbGxVbm1vdW50IiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsInJlbmRlciIsIlJlYWN0IiwiUHVyZUNvbXBvbmVudCIsImRlZmF1bHRQcm9wcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7bUJBQUE7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFQTs7Ozs7Ozs7OztJQUVxQkEsZ0I7OztBQXVDbkIsNEJBQVlDLEtBQVosRUFBbUI7QUFBQTs7QUFBQSxpREFDakIsZ0NBQU1BLEtBQU4sQ0FEaUI7O0FBQUEsVUFLbkJDLEtBTG1CLEdBS1g7QUFDTkMsdUJBQWlCLEtBRFg7QUFFTkMsNEJBQXNCLENBQUM7QUFGakIsS0FMVzs7QUFBQSxVQStCbkJDLHVCQS9CbUIsR0ErQk8sWUFBTTtBQUM5QixVQUFNQyxjQUFjLE1BQUtDLGtCQUFMLEdBQTBCLE1BQUtBLGtCQUFMLENBQXdCQyxXQUFsRCxHQUFnRSxDQUFwRjtBQUNBLFVBQU1DLGNBQWMsTUFBS0Msa0JBQUwsR0FBMEIsTUFBS0Esa0JBQUwsQ0FBd0JGLFdBQWxELEdBQWdFLENBQXBGO0FBQ0EsVUFBTUcscUJBQXFCLE1BQUtDLHlCQUFMLEdBQWlDLE1BQUtBLHlCQUFMLENBQStCSixXQUFoRSxHQUE4RSxDQUF6RyxDQUg4QixDQUc4RTtBQUM1RyxVQUFN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LG9CQUFYLEtBQW9DNkUsVUFBVTdFLG9CQUZoRCxFQUdFO0FBQ0EsV0FBS2tCLHNCQUFMO0FBQ0Q7QUFDRixHOzs2QkFFRDRELG9CLG1DQUF1QjtBQUNyQkwsV0FBT00sbUJBQVAsQ0FBMkIsUUFBM0IsRUFBcUMsS0FBSzlELFlBQTFDO0FBQ0F3RCxXQUFPTSxtQkFBUCxDQUEyQixtQkFBM0IsRUFBZ0QsS0FBSzdELHNCQUFyRCxFQUZxQixDQUV5RDtBQUMvRSxHOztBQTJDRDs7O0FBS0E7OztBQUtBOzs7QUE2QkE7OztBQXlDQTs7O0FBaURBOzs7QUFjQTs7OzZCQWNBOEQsTSxxQkFBUztBQUNQLFdBQU8sS0FBS2xDLE1BQUwsRUFBUDtBQUNELEc7OztFQTlRMkNtQyxnQkFBTUMsYSxVQXdCM0NDLFksR0FBZTtBQUNwQjNDLE1BQUksbUJBRGdCO0FBRXBCTixhQUFXLEVBRlM7QUFHcEJMLFlBQVUsb0JBQU0sQ0FBRSxDQUhFO0FBSXBCa0IscUJBQW1CLEtBSkM7QUFLcEJ0QixzQkFBb0IsSUFMQTtBQU1wQkMsZ0JBQWMsSUFOTTtBQU9wQlcsWUFBVSxTQVBVO0FBUXBCRCxjQUFZLFNBUlE7QUFTcEJ5QixlQUFhLFNBVE87QUFVcEJ2QixVQUFRLE1BVlk7QUFXcEJxQixpQkFBZSxJQVhLO0FBWXBCQyxrQkFBZ0I7QUFaSSxDO2tCQXhCSGhFLGdCIiwiZmlsZSI6InJlc3BvbnNpdmUtbmF2YmFyLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIHJlYWN0L25vLWZpbmQtZG9tLW5vZGUgKi9cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgRmxvYXRpbmdTZWxlY3QgfSBmcm9tICdAb3B1c2NhcGl0YS9yZWFjdC1mbG9hdGluZy1zZWxlY3QnO1xuaW1wb3J0IHsgT3ZlcmxheVRyaWdnZXIsIFRvb2x0aXAgfSBmcm9tICdyZWFjdC1ib290c3RyYXAnO1xuaW1wb3J0IHsgZGVib3VuY2UgfSBmcm9tICdkZWJvdW5jZSc7XG5cbmltcG9ydCAnLi9yZXNwb25zaXZlLW5hdmJhci5zY3NzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVzcG9uc2l2ZU5hdmJhciBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIGlkOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGNsYXNzTmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBzaG93TmF2SXRlbUJvcmRlcjogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd05hdkl0ZW1Ub29sdGlwOiBQcm9wVHlwZXMuYm9vbCxcbiAgICB0b29sdGlwRGVsYXk6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgZm9udFNpemU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgZm9udFdlaWdodDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBwbGFjZWhvbGRlcjogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBhY3RpdmVLZXk6IFByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcbiAgICBsaXN0OiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgbmFtZTogUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICAgIFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgIFByb3BUeXBlcy5ub2RlLFxuICAgICAgXSkuaXNSZXF1aXJlZCxcbiAgICAgIGhyZWY6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5udW1iZXJdKSxcbiAgICB9KSkuaXNSZXF1aXJlZCxcbiAgICBvblNlbGVjdDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgaGVpZ2h0OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGNvbXBvbmVudExlZnQ6IFByb3BUeXBlcy5ub2RlLFxuICAgIGNvbXBvbmVudFJpZ2h0OiBQcm9wVHlwZXMubm9kZSxcbiAgfVxuXG4gIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgaWQ6ICdyZXNwb25zaXZlLW5hdmJhcicsXG4gICAgY2xhc3NOYW1lOiAnJyxcbiAgICBvblNlbGVjdDogKCkgPT4ge30sXG4gICAgc2hvd05hdkl0ZW1Cb3JkZXI6IGZhbHNlLFxuICAgIHNob3dOYXZJdGVtVG9vbHRpcDogdHJ1ZSxcbiAgICB0b29sdGlwRGVsYXk6IDIwMDAsXG4gICAgZm9udFNpemU6ICdpbmhlcml0JyxcbiAgICBmb250V2VpZ2h0OiAnaW5oZXJpdCcsXG4gICAgcGxhY2Vob2xkZXI6ICdtb3JlLi4uJyxcbiAgICBoZWlnaHQ6ICc0MHB4JyxcbiAgICBjb21wb25lbnRMZWZ0OiBudWxsLFxuICAgIGNvbXBvbmVudFJpZ2h0OiBudWxsLFxuICB9XG5cbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5pdGVtV2lkdGhzID0gW107IC8vIHN0b3JlIGl0ZW0gd2lkdGhzIGhlcmUsIHRoZXkgZG9uJ3QgY2hhbmdlXG4gIH1cblxuICBzdGF0ZSA9IHtcbiAgICBpc1NlbGVjdFZpc2libGU6IGZhbHNlLFxuICAgIGxhc3RWaXNpYmxlSXRlbUluZGV4OiAtMixcbiAgfTtcblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5oYW5kbGVSZXNpemUpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdvcmllbnRhdGlvbmNoYW5nZScsIHRoaXMucmVmcmVzaExhc3RWaXNpYmxlSXRlbSk7IC8vIGZvciBtb2JpbGUgc3VwcG9ydFxuICAgIHRoaXMucmVmcmVzaExhc3RWaXNpYmxlSXRlbSgpO1xuICB9XG5cbiAgY29tcG9uZW50RGlkVXBkYXRlKHByZXZQcm9wcywgcHJldlN0YXRlKSB7XG4gICAgLy8gUmVmcmVzaCB2aXNpYmxlIGl0ZW1zIGlmIHZhbHVlcyBjaGFuZ2VcbiAgICBpZiAoXG4gICAgICB0aGlzLnN0YXRlLmlzU2VsZWN0VmlzaWJsZSAhPT0gcHJldlN0YXRlLmlzU2VsZWN0VmlzaWJsZSB8fFxuICAgICAgdGhpcy5zdGF0ZS5sYXN0VmlzaWJsZUl0ZW1JbmRleCAhPT0gcHJldlN0YXRlLmxhc3RWaXNpYmxlSXRlbUluZGV4XG4gICAgKSB7XG4gICAgICB0aGlzLnJlZnJlc2hMYXN0VmlzaWJsZUl0ZW0oKTtcbiAgICB9XG4gIH1cblxuICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5oYW5kbGVSZXNpemUpO1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdvcmllbnRhdGlvbmNoYW5nZScsIHRoaXMucmVmcmVzaExhc3RWaXNpYmxlSXRlbSk7IC8vIGZvciBtb2JpbGUgc3VwcG9ydFxuICB9XG5cbiAgZ2V0TGFzdFZpc2libGVJdGVtSW5kZXggPSAoKSA9PiB7XG4gICAgY29uc3QgbmF2QmFyV2lkdGggPSB0aGlzLm5hdmJhckNvbnRhaW5lclJlZiA/IHRoaXMubmF2YmFyQ29udGFpbmVyUmVmLm9mZnNldFdpZHRoIDogMDtcbiAgICBjb25zdCBzZWxlY3RXaWR0aCA9IHRoaXMuc2VsZWN0Q29udGFpbmVyUmVmID8gdGhpcy5zZWxlY3RDb250YWluZXJSZWYub2Zmc2V0V2lkdGggOiAwO1xuICAgIGNvbnN0IGNvbXBvbmVudExlZnRXaWR0aCA9IHRoaXMuY29tcG9uZW50TGVmdENvbnRhaW5lclJlZiA/IHRoaXMuY29tcG9uZW50TGVmdENvbnRhaW5lclJlZi5vZmZzZXRXaWR0aCA6IDA7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICBjb25zdCBjb21wb25lbnRSaWdodFdpZHRoID0gdGhpcy5jb21wb25lbnRSaWdodENvbnRhaW5lclJlZiA/IHRoaXMuY29tcG9uZW50UmlnaHRDb250YWluZXJSZWYub2Zmc2V0V2lkdGggOiAwOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG5cbiAgICBsZXQgcmVtYWluaW5nV2lkdGggPSBuYXZCYXJXaWR0aCAtIHNlbGVjdFdpZHRoIC0gY29tcG9uZW50TGVmdFdpZHRoIC0gY29tcG9uZW50UmlnaHRXaWR0aDtcbiAgICBsZXQgbGFzdFZpc2libGUgPSAwO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnByb3BzLmxpc3QubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIHJlbWFpbmluZ1dpZHRoIC09IHRoaXMuaXRlbVdpZHRoc1tpXTtcbiAgICAgIGlmIChyZW1haW5pbmdXaWR0aCA8IDApIHtcbiAgICAgICAgbGFzdFZpc2libGUgLT0gMTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBsYXN0VmlzaWJsZSArPSAxO1xuICAgIH1cblxuICAgIHJldHVybiBsYXN0VmlzaWJsZTtcbiAgfVxuXG4gIGhhbmRsZVJlc2l6ZSA9ICgpID0+IGRlYm91bmNlKHRoaXMucmVmcmVzaExhc3RWaXNpYmxlSXRlbSk7XG5cbiAgcmVmcmVzaExhc3RWaXNpYmxlSXRlbSA9ICgpID0+IHtcbiAgICBjb25zdCBsYXN0VmlzaWJsZUl0ZW1JbmRleCA9IHRoaXMuZ2V0TGFzdFZpc2libGVJdGVtSW5kZXgoKTtcbiAgICBpZiAodGhpcy5zdGF0ZS5sYXN0VmlzaWJsZUl0ZW1JbmRleCAhPT0gbGFzdFZpc2libGVJdGVtSW5kZXgpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBpc1NlbGVjdFZpc2libGU6IHRoaXMucHJvcHMubGlzdC5sZW5ndGggPiAobGFzdFZpc2libGVJdGVtSW5kZXggKyAxKSxcbiAgICAgICAgbGFzdFZpc2libGVJdGVtSW5kZXgsXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICB0b29sdGlwV3JhcHBlciA9IChub2RlLCBpbmRleCwgdG9vbHRpcENvbnRlbnQpID0+IHtcbiAgICBjb25zdCB0b29sdGlwID0gPFRvb2x0aXAgaWQ9XCJ0b29sdGlwXCI+e3Rvb2x0aXBDb250ZW50fTwvVG9vbHRpcD47XG4gICAgcmV0dXJuICF0aGlzLnByb3BzLnNob3dOYXZJdGVtVG9vbHRpcCA/IG5vZGUgOlxuICAgIDxPdmVybGF5VHJpZ2dlciBwbGFjZW1lbnQ9XCJib3R0b21cIiBrZXk9e2luZGV4fSBvdmVybGF5PXt0b29sdGlwfSBkZWxheVNob3c9e3RoaXMucHJvcHMudG9vbHRpcERlbGF5fT5cbiAgICAgIHtub2RlfVxuICAgIDwvT3ZlcmxheVRyaWdnZXI+O1xuICB9XG5cbiAgLy8gSGFuZGxlIHJlYWN0LXNlbGVjdCBvbkNoYW5nZVxuICBoYW5kbGVPbkNoYW5nZSA9ICh7IHZhbHVlIH0pID0+IHtcbiAgICB0aGlzLnByb3BzLm9uU2VsZWN0KHZhbHVlKTtcbiAgfVxuXG4gIC8vIEhhbmRsZSBuYXZiYXIgb25DbGlja1xuICBoYW5kbGVPbkNsaWNrID0gaHJlZiA9PiAoKSA9PiB7XG4gICAgdGhpcy5wcm9wcy5vblNlbGVjdChocmVmKTtcbiAgfVxuXG4gIC8vIFJlbmRlciBuYXZiYXIgaXRlbVxuICBuYXZiYXJJdGVtID0gKGl0ZW0sIGluZGV4LCBjbGFzc05hbWUpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBhY3RpdmVLZXksXG4gICAgICBmb250V2VpZ2h0LFxuICAgICAgZm9udFNpemUsXG4gICAgICBoZWlnaHQsXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgcmV0dXJuIChcbiAgICAgIDxidXR0b25cbiAgICAgICAgY2xhc3NOYW1lPXtpbmRleCA9PT0gYWN0aXZlS2V5ID8gYCR7Y2xhc3NOYW1lfSBzZWxlY3RlZC1ib3JkZXJgIDogYCR7Y2xhc3NOYW1lfWB9XG4gICAgICAgIHN0eWxlPXt7IGZvbnRXZWlnaHQsIGZvbnRTaXplLCBtaW5IZWlnaHQ6IGhlaWdodCB9fVxuICAgICAgICBpZD17aXRlbS5pZCB8fCBgbmF2SXRlbSR7U3RyaW5nKGluZGV4KX1gfVxuICAgICAgICBrZXk9e2l0ZW0uaWQgfHwgYG5hdml0ZW0ke1N0cmluZyhpbmRleCl9YH1cbiAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVPbkNsaWNrKGl0ZW0uaHJlZil9XG4gICAgICAgIHJlZj17KHIpID0+IHtcbiAgICAgICAgICBpZiAociAmJiAhdGhpcy5pdGVtV2lkdGhzW2luZGV4XSkgdGhpcy5pdGVtV2lkdGhzW2luZGV4XSA9IHIub2Zmc2V0V2lkdGg7XG4gICAgICAgIH19XG4gICAgICA+XG4gICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInJlc3BvbnNpdmUtbmF2YmFyLWl0ZW0tdGV4dFwiPntpdGVtLm5hbWV9PC9zcGFuPlxuICAgICAgPC9idXR0b24+XG4gICAgKTtcbiAgfVxuXG4gIGRvTGluZUNvdW50ID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgbGlzdCB9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gbGlzdC5zb21lKGl0ZW0gPT4gdHlwZW9mIChpdGVtLm5hbWUpICE9PSAnc3RyaW5nJyk7XG4gIH1cblxuICAvLyBSZW5kZXIgbmF2YmFyXG4gIG5hdmJhciA9ICgpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBpZCxcbiAgICAgIGNsYXNzTmFtZSxcbiAgICAgIGxpc3QsXG4gICAgICBzaG93TmF2SXRlbUJvcmRlcixcbiAgICAgIGhlaWdodCxcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB2aXNpYmxlTGlzdCA9IHRoaXMuc3RhdGUubGFzdFZpc2libGVJdGVtSW5kZXggPiAtMiA/XG4gICAgICBsaXN0LnNsaWNlKDAsIHRoaXMuc3RhdGUubGFzdFZpc2libGVJdGVtSW5kZXggKyAxKSA6XG4gICAgICBsaXN0O1xuICAgIGNvbnN0IGl0ZW1DbGFzc05hbWUgPSBzaG93TmF2SXRlbUJvcmRlciA/XG4gICAgICAncmVzcG9uc2l2ZS1uYXZiYXItaXRlbSBpbmFjdGl2ZS1ib3JkZXInIDpcbiAgICAgICdyZXNwb25zaXZlLW5hdmJhci1pdGVtIG5vLWl0ZW0tYm9yZGVyJztcbiAgICBjb25zdCBpdGVtcyA9IHZpc2libGVMaXN0Lm1hcCgoaXRlbSwgaW5kZXgpID0+IChcbiAgICAgIHRoaXMudG9vbHRpcFdyYXBwZXIodGhpcy5uYXZiYXJJdGVtKGl0ZW0sIGluZGV4LCBpdGVtQ2xhc3NOYW1lKSwgaW5kZXgsIGl0ZW0ubmFtZSlcbiAgICApKTtcbiAgICBjb25zdCBsaW5lQ291bnQgPSB0aGlzLmRvTGluZUNvdW50KCk7XG4gICAgY29uc3QgbmF2YmFyU3R5bGUgPSB7XG4gICAgICBtaW5IZWlnaHQ6IGhlaWdodCxcbiAgICB9O1xuICAgIGlmIChoZWlnaHQuc2xpY2UoLTIpID09PSAncHgnICYmIGxpbmVDb3VudCkge1xuICAgICAgY29uc3QgaGVpZ2h0UHggPSBwYXJzZUludChoZWlnaHQuc2xpY2UoMCwgLTIpLCAxMCk7XG4gICAgICBuYXZiYXJTdHlsZS5saW5lSGVpZ2h0ID0gYCR7KGhlaWdodFB4IC0gNCl9cHhgO1xuICAgIH1cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdlxuICAgICAgICBpZD17YCR7aWR9LWNvbnRhaW5lcmB9XG4gICAgICAgIHJlZj17KHIpID0+IHsgdGhpcy5uYXZiYXJDb250YWluZXJSZWYgPSByOyB9fVxuICAgICAgICBjbGFzc05hbWU9e2ByZXNwb25zaXZlLW5hdmJhci1jb250YWluZXIgJHtjbGFzc05hbWV9YH1cbiAgICAgICAgc3R5bGU9e25hdmJhclN0eWxlfVxuICAgICAgPlxuICAgICAgICB7aXRlbXN9XG4gICAgICAgIHt0aGlzLmNvbWJvYm94KCl9XG4gICAgICAgIHt0aGlzLmNvbXBvbmVudExlZnQoKX1cbiAgICAgICAge3RoaXMuY29tcG9uZW50UmlnaHQoKX1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cblxuICAvLyBSZW5kZXIgY29tYm9ib3gsIHdoZW4gYWxsIGl0ZW1zIGRvIG5vdCBmaXRcbiAgY29tYm9ib3ggPSAoKSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgaWQsXG4gICAgICBsaXN0LFxuICAgICAgZm9udFNpemUsXG4gICAgICBhY3RpdmVLZXksXG4gICAgICBmb250V2VpZ2h0LFxuICAgICAgcGxhY2Vob2xkZXIsXG4gICAgICBzaG93TmF2SXRlbUJvcmRlcixcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAoIXRoaXMuc3RhdGUuaXNTZWxlY3RWaXNpYmxlKSB7XG4gICAgICAvLyByZXR1cm4gbnVsbCBpZiBhbGwgbmF2IGl0ZW1zIGFyZSB2aXNpYmxlXG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICAvLyBzbGljZSBuYXYgaXRlbXMgbGlzdCBhbmQgc2hvdyBpbnZpc2libGUgaXRlbXMgaW4gdGhlIGNvbWJvYm94XG4gICAgY29uc3QgbmF2TGlzdCA9IHRoaXMuc3RhdGUubGFzdFZpc2libGVJdGVtSW5kZXggPiAtMiA/XG4gICAgICBsaXN0LnNsaWNlKHRoaXMuc3RhdGUubGFzdFZpc2libGVJdGVtSW5kZXggKyAxKSA6IGxpc3Q7XG4gICAgY29uc3Qgc2VsZWN0T3B0aW9ucyA9IG5hdkxpc3QubWFwKGl0ZW0gPT4gKHtcbiAgICAgIHZhbHVlOiBpdGVtLmhyZWYsXG4gICAgICBsYWJlbDogaXRlbS5uYW1lLFxuICAgIH0pKTtcbiAgICBjb25zdCBsaW5lQ291bnROZWVkZWQgPSB0aGlzLmRvTGluZUNvdW50KCk7XG4gICAgY29uc3QgY3VzdG9tTGluZUNvdW50ID0gbGluZUNvdW50TmVlZGVkID8gJ2xpbmUtY291bnQnIDogJyc7XG4gICAgY29uc3QgY3VzdG9tQm9yZGVyQ2xhc3MgPSBsaW5lQ291bnROZWVkZWQgPyAnc2VsZWN0ZWQtYm9yZGVyIGxpbmUtY291bnQnIDogJ3NlbGVjdGVkLWJvcmRlcic7XG4gICAgY29uc3QgY3VzdG9tSW5hY3RpdmVCb3JkZXIgPSBsaW5lQ291bnROZWVkZWQgPyAnaW5hY3RpdmUtYm9yZGVyIGxpbmUtY291bnQnIDogJ2luYWN0aXZlLWJvcmRlcic7XG4gICAgY29uc3QgaW5hY3RpdmVCb3JkZXIgPSBzaG93TmF2SXRlbUJvcmRlciA/IGN1c3RvbUluYWN0aXZlQm9yZGVyIDogY3VzdG9tTGluZUNvdW50O1xuICAgIGNvbnN0IGJvcmRlckNsYXNzID0gYWN0aXZlS2V5ID49ICh0aGlzLnN0YXRlLmxhc3RWaXNpYmxlSXRlbUluZGV4ICsgMSkgPyBjdXN0b21Cb3JkZXJDbGFzcyA6IGluYWN0aXZlQm9yZGVyOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgY29uc3QgYWN0aXZlSXRlbSA9IGxpc3RbYWN0aXZlS2V5XTtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdlxuICAgICAgICBpZD17YCR7aWR9LXNlbGVjdGB9XG4gICAgICAgIGNsYXNzTmFtZT17YHJlc3BvbnNpdmUtbmF2YmFyLXNlbGVjdCAke2JvcmRlckNsYXNzfWB9XG4gICAgICAgIHN0eWxlPXt7IGZvbnRXZWlnaHQsIGZvbnRTaXplIH19XG4gICAgICAgIHJlZj17KHIpID0+IHsgdGhpcy5zZWxlY3RDb250YWluZXJSZWYgPSByOyB9fVxuICAgICAgPlxuICAgICAgICA8RmxvYXRpbmdTZWxlY3RcbiAgICAgICAgICBuYW1lPXtgJHtpZH0tc2VsZWN0LWNvbXBvbmVudGB9XG4gICAgICAgICAgdmFsdWU9e2FjdGl2ZUl0ZW0gPyBhY3RpdmVJdGVtLmhyZWYgOiAnJ31cbiAgICAgICAgICBpc0NsZWFyYWJsZT17ZmFsc2V9XG4gICAgICAgICAgcGxhY2Vob2xkZXI9e3BsYWNlaG9sZGVyfVxuICAgICAgICAgIG9wdGlvbnM9e3NlbGVjdE9wdGlvbnN9XG4gICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlT25DaGFuZ2V9XG4gICAgICAgIC8+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG5cbiAgLy8gUmVuZGVyIGN1c3RvbSBsZWZ0IHNpZGUgY29tcG9uZW50XG4gIGNvbXBvbmVudExlZnQgPSAoKSA9PiB7XG4gICAgY29uc3QgeyBjb21wb25lbnRMZWZ0IH0gPSB0aGlzLnByb3BzO1xuICAgIGlmICghY29tcG9uZW50TGVmdCkgcmV0dXJuIG51bGw7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3NOYW1lPVwicmVzcG9uc2l2ZS1uYXZiYXItY29udGFpbmVyLWxlZnRcIlxuICAgICAgICByZWY9eyhyKSA9PiB7IHRoaXMuY29tcG9uZW50TGVmdENvbnRhaW5lclJlZiA9IHI7IH19XG4gICAgICA+XG4gICAgICAgIHsgY29tcG9uZW50TGVmdCB9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG5cbiAgLy8gUmVuZGVyIGN1c3RvbSByaWdodCBzaWRlIGNvbXBvbmVudFxuICBjb21wb25lbnRSaWdodCA9ICgpID0+IHtcbiAgICBjb25zdCB7IGNvbXBvbmVudFJpZ2h0IH0gPSB0aGlzLnByb3BzO1xuICAgIGlmICghY29tcG9uZW50UmlnaHQpIHJldHVybiBudWxsO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2XG4gICAgICAgIGNsYXNzTmFtZT1cInJlc3BvbnNpdmUtbmF2YmFyLWNvbnRhaW5lci1yaWdodFwiXG4gICAgICAgIHJlZj17KHIpID0+IHsgdGhpcy5jb21wb25lbnRSaWdodENvbnRhaW5lclJlZiA9IHI7IH19XG4gICAgICA+XG4gICAgICAgIHsgY29tcG9uZW50UmlnaHQgfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gdGhpcy5uYXZiYXIoKTtcbiAgfVxufVxuIl19