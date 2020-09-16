'use strict';

exports.__esModule = true;
exports.default = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _class, _temp; /* eslint-disable react/no-find-dom-node */


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactFloatingSelect = require('@opuscapita/react-floating-select');

var _debounce = require('debounce');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
      return (0, _debounce.debounce)(_this.refreshLastVisibleItem(), 300);
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
      var activeKeyIndex = activeKey;
      if ((typeof activeKey === 'undefined' ? 'undefined' : _typeof(activeKey)) === 'object') {
        activeKeyIndex = _this.activeItemIndex(activeKey);
      }
      return _react2.default.createElement(
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
        _react2.default.createElement(
          'span',
          { className: 'responsive-navbar-item-text' },
          item.name,
          allowClose && _react2.default.createElement('i', { tabIndex: index + 1, role: 'button', className: 'fa fa-times', onClick: function onClick() {
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
    return _react2.default.createElement(
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
}(_react2.default.PureComponent), _class.defaultProps = {
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
exports.default = ResponsiveNavbar;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yZXNwb25zaXZlLW5hdmJhci5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIlJlc3BvbnNpdmVOYXZiYXIiLCJwcm9wcyIsInN0YXRlIiwiaXNTZWxlY3RWaXNpYmxlIiwibGFzdFZpc2libGVJdGVtSW5kZXgiLCJnZXRMYXN0VmlzaWJsZUl0ZW1JbmRleCIsIm5hdkJhcldpZHRoIiwibmF2YmFyQ29udGFpbmVyUmVmIiwib2Zmc2V0V2lkdGgiLCJzZWxlY3RXaWR0aCIsInNlbGVjdENvbnRhaW5lclJlZiIsImNvbXBvbmVudExlZnRXaWR0aCIsImNvbXBvbmVudExlZnRDb250YWluZXJSZWYiLCJjb21wb25lbnRSaWdodFdpZHRoIiwiY29tcG9uZW50UmlnaHRDb250YWluZXJSZWYiLCJyZW1haW5pbmdXaWR0aCIsImxhc3RWaXNpYmxlIiwiaSIsImxpc3QiLCJsZW5ndGgiLCJpdGVtV2lkdGhzIiwiaGFuZGxlUmVzaXplIiwicmVmcmVzaExhc3RWaXNpYmxlSXRlbSIsInNldFN0YXRlIiwiaGFuZGxlT25DaGFuZ2UiLCJ2YWx1ZSIsIm9uU2VsZWN0IiwiaGFuZGxlT25DbGljayIsImhyZWYiLCJpbmRleCIsIm5hdmJhckl0ZW0iLCJpdGVtIiwiY2xhc3NOYW1lIiwiYWN0aXZlS2V5IiwiZm9udFdlaWdodCIsImZvbnRTaXplIiwiaGVpZ2h0IiwiYWxsb3dDbG9zZSIsIm9uQ2xvc2UiLCJuYXZSZW5kZXJlciIsImFjdGl2ZUtleUluZGV4IiwiYWN0aXZlSXRlbUluZGV4IiwibWluSGVpZ2h0IiwiaWQiLCJTdHJpbmciLCJyIiwibmFtZSIsImRvTGluZUNvdW50Iiwic29tZSIsInJlc29sdmVBY3RpdmVJdGVtRnJvbU9wdGlvbnMiLCJzZWxlY3RPcHRpb25zIiwiYWN0aXZlSXRlbSIsImZpbmQiLCJvcHRzIiwiZmluZEluZGV4IiwiY29tYm9ib3giLCJwbGFjZWhvbGRlciIsInNob3dOYXZJdGVtQm9yZGVyIiwibmF2TGlzdCIsInNsaWNlIiwibWFwIiwibGFiZWwiLCJsaW5lQ291bnROZWVkZWQiLCJjdXN0b21MaW5lQ291bnQiLCJjdXN0b21Cb3JkZXJDbGFzcyIsImN1c3RvbUluYWN0aXZlQm9yZGVyIiwiaW5hY3RpdmVCb3JkZXIiLCJib3JkZXJDbGFzcyIsImNvbXBvbmVudExlZnQiLCJjb21wb25lbnRSaWdodCIsImNvbXBvbmVudERpZE1vdW50Iiwid2luZG93IiwiYWRkRXZlbnRMaXN0ZW5lciIsImNvbXBvbmVudERpZFVwZGF0ZSIsInByZXZQcm9wcyIsInByZXZTdGF0ZSIsImNvbXBvbmVudFdpbGxVbm1vdW50IiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsInJlbmRlciIsInZpc2libGVMaXN0IiwiaXRlbUNsYXNzTmFtZSIsIml0ZW1zIiwibGluZUNvdW50IiwibmF2YmFyU3R5bGUiLCJtYXhIZWlnaHQiLCJoZWlnaHRQeCIsInBhcnNlSW50IiwibGluZUhlaWdodCIsIlJlYWN0IiwiUHVyZUNvbXBvbmVudCIsImRlZmF1bHRQcm9wcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7OzttQkFBQTs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7Ozs7Ozs7O0FBRUE7O0lBRXFCQSxnQjs7O0FBdUNuQiw0QkFBWUMsS0FBWixFQUFtQjtBQUFBOztBQUFBLGlEQUNqQixnQ0FBTUEsS0FBTixDQURpQjs7QUFBQSxVQUtuQkMsS0FMbUIsR0FLWDtBQUNOQyx1QkFBaUIsS0FEWDtBQUVOQyw0QkFBc0IsQ0FBQztBQUZqQixLQUxXOztBQUFBLFVBNEJuQkMsdUJBNUJtQixHQTRCTyxZQUFNO0FBQzlCLFVBQU1DLGNBQWMsTUFBS0Msa0JBQUwsR0FBMEIsTUFBS0Esa0JBQUwsQ0FBd0JDLFdBQWxELEdBQWdFLENBQXBGO0FBQ0EsVUFBTUMsY0FBYyxNQUFLQyxrQkFBTCxHQUEwQixNQUFLQSxrQkFBTCxDQUF3QkYsV0FBbEQsR0FBZ0UsQ0FBcEY7QUFDQSxVQUFNRyxxQkFBcUIsTUFBS0MseUJBQUwsR0FBaUMsTUFBS0EseUJBQUwsQ0FBK0JK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O0FBRUUsYUFBSyxhQUFDRSxDQUFELEVBQU87QUFDVixpQkFBS3RDLGtCQUFMLEdBQTBCc0MsQ0FBMUI7QUFDRCxTQUpIO0FBS0Usb0RBQTBDYixTQUw1QztBQU1FLGVBQU9tRDtBQU5UO0FBUUdGLFdBUkg7QUFTRyxXQUFLMUIsUUFBTCxFQVRIO0FBVUcsV0FBS2EsYUFBTCxFQVZIO0FBV0csV0FBS0MsY0FBTDtBQVhILEtBREY7QUFlRCxHOzs7RUE5UTJDbUIsZ0JBQU1DLGEsVUF3QjNDQyxZLEdBQWU7QUFDcEIvQyxNQUFJLG1CQURnQjtBQUVwQlgsYUFBVyxFQUZTO0FBR3BCTixZQUFVLG9CQUFNLENBQUUsQ0FIRTtBQUlwQlksV0FBUyxtQkFBTSxDQUFFLENBSkc7QUFLcEJELGNBQVksS0FMUTtBQU1wQm9CLHFCQUFtQixLQU5DO0FBT3BCdEIsWUFBVSxTQVBVO0FBUXBCRCxjQUFZLFNBUlE7QUFTcEJzQixlQUFhLFNBVE87QUFVcEJwQixVQUFRLEVBVlk7QUFXcEJnQyxpQkFBZSxJQVhLO0FBWXBCQyxrQkFBZ0I7QUFaSSxDO2tCQXhCSHJFLGdCIiwiZmlsZSI6InJlc3BvbnNpdmUtbmF2YmFyLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIHJlYWN0L25vLWZpbmQtZG9tLW5vZGUgKi9cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgRmxvYXRpbmdTZWxlY3QgfSBmcm9tICdAb3B1c2NhcGl0YS9yZWFjdC1mbG9hdGluZy1zZWxlY3QnO1xuaW1wb3J0IHsgZGVib3VuY2UgfSBmcm9tICdkZWJvdW5jZSc7XG5cbi8vIGltcG9ydCAnLi9yZXNwb25zaXZlLW5hdmJhci5zY3NzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVzcG9uc2l2ZU5hdmJhciBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIGlkOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGFsbG93Q2xvc2U6IFByb3BUeXBlcy5ib29sLFxuICAgIG9uQ2xvc2U6IFByb3BUeXBlcy5mdW5jLFxuICAgIG5hdlJlbmRlcmVyOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBjbGFzc05hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgc2hvd05hdkl0ZW1Cb3JkZXI6IFByb3BUeXBlcy5ib29sLFxuICAgIGZvbnRTaXplOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGZvbnRXZWlnaHQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgcGxhY2Vob2xkZXI6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgYWN0aXZlS2V5OiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc2hhcGUoe30pLCBQcm9wVHlwZXMubnVtYmVyXSkuaXNSZXF1aXJlZCxcbiAgICBsaXN0OiBQcm9wVHlwZXMuYXJyYXlPZihcbiAgICAgIFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICAgIG5hbWU6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5ub2RlXSkuaXNSZXF1aXJlZCxcbiAgICAgICAgaHJlZjogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLm51bWJlcl0pLFxuICAgICAgfSlcbiAgICApLmlzUmVxdWlyZWQsXG4gICAgb25TZWxlY3Q6IFByb3BUeXBlcy5mdW5jLFxuICAgIGhlaWdodDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBjb21wb25lbnRMZWZ0OiBQcm9wVHlwZXMubm9kZSxcbiAgICBjb21wb25lbnRSaWdodDogUHJvcFR5cGVzLm5vZGUsXG4gIH07XG5cbiAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICBpZDogJ3Jlc3BvbnNpdmUtbmF2YmFyJyxcbiAgICBjbGFzc05hbWU6ICcnLFxuICAgIG9uU2VsZWN0OiAoKSA9PiB7fSxcbiAgICBvbkNsb3NlOiAoKSA9PiB7fSxcbiAgICBhbGxvd0Nsb3NlOiBmYWxzZSxcbiAgICBzaG93TmF2SXRlbUJvcmRlcjogZmFsc2UsXG4gICAgZm9udFNpemU6ICdpbmhlcml0JyxcbiAgICBmb250V2VpZ2h0OiAnaW5oZXJpdCcsXG4gICAgcGxhY2Vob2xkZXI6ICdtb3JlLi4uJyxcbiAgICBoZWlnaHQ6IDMwLFxuICAgIGNvbXBvbmVudExlZnQ6IG51bGwsXG4gICAgY29tcG9uZW50UmlnaHQ6IG51bGwsXG4gIH07XG5cbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5pdGVtV2lkdGhzID0gW107IC8vIHN0b3JlIGl0ZW0gd2lkdGhzIGhlcmUsIHRoZXkgZG9uJ3QgY2hhbmdlXG4gIH1cblxuICBzdGF0ZSA9IHtcbiAgICBpc1NlbGVjdFZpc2libGU6IGZhbHNlLFxuICAgIGxhc3RWaXNpYmxlSXRlbUluZGV4OiAtMixcbiAgfTtcblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5oYW5kbGVSZXNpemUpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdvcmllbnRhdGlvbmNoYW5nZScsIHRoaXMucmVmcmVzaExhc3RWaXNpYmxlSXRlbSk7IC8vIGZvciBtb2JpbGUgc3VwcG9ydFxuICAgIHRoaXMucmVmcmVzaExhc3RWaXNpYmxlSXRlbSgpO1xuICB9XG5cbiAgY29tcG9uZW50RGlkVXBkYXRlKHByZXZQcm9wcywgcHJldlN0YXRlKSB7XG4gICAgLy8gUmVmcmVzaCB2aXNpYmxlIGl0ZW1zIGlmIHZhbHVlcyBjaGFuZ2VcbiAgICBpZiAodGhpcy5zdGF0ZS5pc1NlbGVjdFZpc2libGUgIT09IHByZXZTdGF0ZS5pc1NlbGVjdFZpc2libGUgfHwgdGhpcy5zdGF0ZS5sYXN0VmlzaWJsZUl0ZW1JbmRleCAhPT0gcHJldlN0YXRlLmxhc3RWaXNpYmxlSXRlbUluZGV4KSB7XG4gICAgICB0aGlzLnJlZnJlc2hMYXN0VmlzaWJsZUl0ZW0oKTtcbiAgICB9XG4gIH1cblxuICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5oYW5kbGVSZXNpemUpO1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdvcmllbnRhdGlvbmNoYW5nZScsIHRoaXMucmVmcmVzaExhc3RWaXNpYmxlSXRlbSk7IC8vIGZvciBtb2JpbGUgc3VwcG9ydFxuICB9XG5cbiAgZ2V0TGFzdFZpc2libGVJdGVtSW5kZXggPSAoKSA9PiB7XG4gICAgY29uc3QgbmF2QmFyV2lkdGggPSB0aGlzLm5hdmJhckNvbnRhaW5lclJlZiA/IHRoaXMubmF2YmFyQ29udGFpbmVyUmVmLm9mZnNldFdpZHRoIDogMDtcbiAgICBjb25zdCBzZWxlY3RXaWR0aCA9IHRoaXMuc2VsZWN0Q29udGFpbmVyUmVmID8gdGhpcy5zZWxlY3RDb250YWluZXJSZWYub2Zmc2V0V2lkdGggOiAwO1xuICAgIGNvbnN0IGNvbXBvbmVudExlZnRXaWR0aCA9IHRoaXMuY29tcG9uZW50TGVmdENvbnRhaW5lclJlZiA/IHRoaXMuY29tcG9uZW50TGVmdENvbnRhaW5lclJlZi5vZmZzZXRXaWR0aCA6IDA7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICBjb25zdCBjb21wb25lbnRSaWdodFdpZHRoID0gdGhpcy5jb21wb25lbnRSaWdodENvbnRhaW5lclJlZiA/IHRoaXMuY29tcG9uZW50UmlnaHRDb250YWluZXJSZWYub2Zmc2V0V2lkdGggOiAwOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG5cbiAgICBsZXQgcmVtYWluaW5nV2lkdGggPSBuYXZCYXJXaWR0aCAtIHNlbGVjdFdpZHRoIC0gY29tcG9uZW50TGVmdFdpZHRoIC0gY29tcG9uZW50UmlnaHRXaWR0aDtcbiAgICBsZXQgbGFzdFZpc2libGUgPSAwO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnByb3BzLmxpc3QubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIHJlbWFpbmluZ1dpZHRoIC09IHRoaXMuaXRlbVdpZHRoc1tpXTtcbiAgICAgIGlmIChyZW1haW5pbmdXaWR0aCA8IDApIHtcbiAgICAgICAgbGFzdFZpc2libGUgLT0gMTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBsYXN0VmlzaWJsZSArPSAxO1xuICAgIH1cblxuICAgIHJldHVybiBsYXN0VmlzaWJsZTtcbiAgfTtcblxuICBoYW5kbGVSZXNpemUgPSAoKSA9PiBkZWJvdW5jZSh0aGlzLnJlZnJlc2hMYXN0VmlzaWJsZUl0ZW0oKSwgMzAwKTtcblxuICByZWZyZXNoTGFzdFZpc2libGVJdGVtID0gKCkgPT4ge1xuICAgIGNvbnN0IGxhc3RWaXNpYmxlSXRlbUluZGV4ID0gdGhpcy5nZXRMYXN0VmlzaWJsZUl0ZW1JbmRleCgpO1xuICAgIGlmICh0aGlzLnN0YXRlLmxhc3RWaXNpYmxlSXRlbUluZGV4ICE9PSBsYXN0VmlzaWJsZUl0ZW1JbmRleCkge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIGlzU2VsZWN0VmlzaWJsZTogdGhpcy5wcm9wcy5saXN0Lmxlbmd0aCA+IGxhc3RWaXNpYmxlSXRlbUluZGV4ICsgMSxcbiAgICAgICAgbGFzdFZpc2libGVJdGVtSW5kZXgsXG4gICAgICB9KTtcbiAgICB9XG4gIH07XG5cbiAgLy8gSGFuZGxlIHJlYWN0LXNlbGVjdCBvbkNoYW5nZVxuICBoYW5kbGVPbkNoYW5nZSA9ICh2YWx1ZSkgPT4ge1xuICAgIHRoaXMucHJvcHMub25TZWxlY3QodmFsdWUpO1xuICB9O1xuXG4gIC8vIEhhbmRsZSBuYXZiYXIgb25DbGlja1xuICBoYW5kbGVPbkNsaWNrID0gKGhyZWYsIGluZGV4KSA9PiAoKSA9PiB7XG4gICAgdGhpcy5wcm9wcy5vblNlbGVjdChocmVmLCBpbmRleCk7XG4gIH07XG5cbiAgLy8gUmVuZGVyIG5hdmJhciBpdGVtXG4gIG5hdmJhckl0ZW0gPSAoaXRlbSwgaW5kZXgsIGNsYXNzTmFtZSkgPT4ge1xuICAgIGNvbnN0IHsgYWN0aXZlS2V5LCBmb250V2VpZ2h0LCBmb250U2l6ZSwgaGVpZ2h0LCBhbGxvd0Nsb3NlLCBvbkNsb3NlLCBuYXZSZW5kZXJlciB9ID0gdGhpcy5wcm9wcztcblxuICAgIGlmIChuYXZSZW5kZXJlcikge1xuICAgICAgcmV0dXJuIG5hdlJlbmRlcmVyKGl0ZW0sIGluZGV4LCBjbGFzc05hbWUsIGFjdGl2ZUtleSA9PT0gaW5kZXgpO1xuICAgIH1cblxuICAgIC8vIHJlc29sdmUgYWN0aXZlS2V5SW5kZXhcbiAgICBsZXQgYWN0aXZlS2V5SW5kZXggPSBhY3RpdmVLZXk7XG4gICAgaWYgKHR5cGVvZiBhY3RpdmVLZXkgPT09ICdvYmplY3QnKSB7XG4gICAgICBhY3RpdmVLZXlJbmRleCA9IHRoaXMuYWN0aXZlSXRlbUluZGV4KGFjdGl2ZUtleSk7XG4gICAgfVxuICAgIHJldHVybiAoXG4gICAgICA8YnV0dG9uXG4gICAgICAgIGNsYXNzTmFtZT17aW5kZXggPT09IGFjdGl2ZUtleUluZGV4ID8gYCR7Y2xhc3NOYW1lfSBzZWxlY3RlZGAgOiBgJHtjbGFzc05hbWV9YH1cbiAgICAgICAgc3R5bGU9e3sgZm9udFdlaWdodCwgZm9udFNpemUsIG1pbkhlaWdodDogaGVpZ2h0IH19XG4gICAgICAgIGlkPXtpdGVtLmlkIHx8IGBuYXZJdGVtJHtTdHJpbmcoaW5kZXgpfWB9XG4gICAgICAgIGtleT17aXRlbS5pZCB8fCBgbmF2aXRlbSR7U3RyaW5nKGluZGV4KX1gfVxuICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZU9uQ2xpY2soaXRlbS5ocmVmLCBpbmRleCl9XG4gICAgICAgIHJlZj17KHIpID0+IHtcbiAgICAgICAgICBpZiAociAmJiAhdGhpcy5pdGVtV2lkdGhzW2luZGV4XSkgdGhpcy5pdGVtV2lkdGhzW2luZGV4XSA9IHIub2Zmc2V0V2lkdGg7XG4gICAgICAgIH19XG4gICAgICA+XG4gICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInJlc3BvbnNpdmUtbmF2YmFyLWl0ZW0tdGV4dFwiPlxuICAgICAgICAgIHtpdGVtLm5hbWV9XG4gICAgICAgICAgey8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBqc3gtYTExeS9jbGljay1ldmVudHMtaGF2ZS1rZXktZXZlbnRzICovfVxuICAgICAgICAgIHthbGxvd0Nsb3NlICYmIDxpIHRhYkluZGV4PXtpbmRleCArIDF9IHJvbGU9XCJidXR0b25cIiBjbGFzc05hbWU9XCJmYSBmYS10aW1lc1wiIG9uQ2xpY2s9eygpID0+IG9uQ2xvc2UoaXRlbS5ocmVmLCBpbmRleCl9IC8+fVxuICAgICAgICA8L3NwYW4+XG5cbiAgICAgIDwvYnV0dG9uPlxuICAgICk7XG4gIH07XG5cbiAgZG9MaW5lQ291bnQgPSAoKSA9PiB7XG4gICAgY29uc3QgeyBsaXN0IH0gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiBsaXN0LnNvbWUoKGl0ZW0pID0+IHR5cGVvZiBpdGVtLm5hbWUgIT09ICdzdHJpbmcnKTtcbiAgfTtcblxuICByZXNvbHZlQWN0aXZlSXRlbUZyb21PcHRpb25zID0gKHNlbGVjdE9wdGlvbnMpID0+IHtcbiAgICBjb25zdCB7IGFjdGl2ZUtleSB9ID0gdGhpcy5wcm9wcztcbiAgICBsZXQgYWN0aXZlSXRlbSA9IHNlbGVjdE9wdGlvbnMuZmluZCgob3B0cykgPT4gb3B0cy52YWx1ZSA9PT0gYWN0aXZlS2V5KTtcbiAgICBpZiAoIWFjdGl2ZUl0ZW0pIHtcbiAgICAgIGFjdGl2ZUl0ZW0gPSBzZWxlY3RPcHRpb25zLmZpbmQoKG9wdHMpID0+IG9wdHMudmFsdWUgPT09IGFjdGl2ZUtleS52YWx1ZSk7XG4gICAgfVxuICAgIHJldHVybiBhY3RpdmVJdGVtO1xuICB9O1xuXG4gIGFjdGl2ZUl0ZW1JbmRleCA9IChhY3RpdmVJdGVtKSA9PiB7XG4gICAgY29uc3QgeyBsaXN0IH0gPSB0aGlzLnByb3BzO1xuICAgIGlmICghYWN0aXZlSXRlbSkgcmV0dXJuIG51bGw7XG4gICAgcmV0dXJuIGxpc3QuZmluZEluZGV4KChpdGVtKSA9PiBpdGVtLmhyZWYgPT09IGFjdGl2ZUl0ZW0udmFsdWUpO1xuICB9O1xuXG4gIC8vIFJlbmRlciBjb21ib2JveCwgd2hlbiBhbGwgaXRlbXMgZG8gbm90IGZpdFxuICBjb21ib2JveCA9ICgpID0+IHtcbiAgICBjb25zdCB7IGlkLCBsaXN0LCBmb250U2l6ZSwgZm9udFdlaWdodCwgcGxhY2Vob2xkZXIsIHNob3dOYXZJdGVtQm9yZGVyIH0gPSB0aGlzLnByb3BzO1xuICAgIGlmICghdGhpcy5zdGF0ZS5pc1NlbGVjdFZpc2libGUpIHtcbiAgICAgIC8vIHJldHVybiBudWxsIGlmIGFsbCBuYXYgaXRlbXMgYXJlIHZpc2libGVcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIC8vIHNsaWNlIG5hdiBpdGVtcyBsaXN0IGFuZCBzaG93IGludmlzaWJsZSBpdGVtcyBpbiB0aGUgY29tYm9ib3hcbiAgICBjb25zdCBuYXZMaXN0ID0gdGhpcy5zdGF0ZS5sYXN0VmlzaWJsZUl0ZW1JbmRleCA+IC0yID8gbGlzdC5zbGljZSh0aGlzLnN0YXRlLmxhc3RWaXNpYmxlSXRlbUluZGV4ICsgMSkgOiBsaXN0O1xuICAgIGNvbnN0IHNlbGVjdE9wdGlvbnMgPSBuYXZMaXN0Lm1hcCgoaXRlbSkgPT4gKHtcbiAgICAgIHZhbHVlOiBpdGVtLmhyZWYsXG4gICAgICBsYWJlbDogaXRlbS5uYW1lLFxuICAgIH0pKTtcbiAgICBjb25zdCBsaW5lQ291bnROZWVkZWQgPSB0aGlzLmRvTGluZUNvdW50KCk7XG4gICAgY29uc3QgY3VzdG9tTGluZUNvdW50ID0gbGluZUNvdW50TmVlZGVkID8gJ2xpbmUtY291bnQnIDogJyc7XG4gICAgY29uc3QgY3VzdG9tQm9yZGVyQ2xhc3MgPSBsaW5lQ291bnROZWVkZWQgPyAnc2VsZWN0ZWQgbGluZS1jb3VudCcgOiAnc2VsZWN0ZWQnO1xuICAgIGNvbnN0IGN1c3RvbUluYWN0aXZlQm9yZGVyID0gbGluZUNvdW50TmVlZGVkID8gJ2luYWN0aXZlIGxpbmUtY291bnQnIDogJ2luYWN0aXZlJztcbiAgICBjb25zdCBpbmFjdGl2ZUJvcmRlciA9IHNob3dOYXZJdGVtQm9yZGVyID8gY3VzdG9tSW5hY3RpdmVCb3JkZXIgOiBjdXN0b21MaW5lQ291bnQ7XG4gICAgLy8gUmVzb2x2ZSBhY3RpdmVJdGVtXG4gICAgY29uc3QgYWN0aXZlSXRlbSA9IHRoaXMucmVzb2x2ZUFjdGl2ZUl0ZW1Gcm9tT3B0aW9ucyhzZWxlY3RPcHRpb25zKTtcbiAgICBjb25zdCBhY3RpdmVJdGVtSW5kZXggPSB0aGlzLmFjdGl2ZUl0ZW1JbmRleChhY3RpdmVJdGVtKTtcbiAgICBjb25zdCBib3JkZXJDbGFzcyA9IGFjdGl2ZUl0ZW1JbmRleCA+PSB0aGlzLnN0YXRlLmxhc3RWaXNpYmxlSXRlbUluZGV4ICsgMSA/IGN1c3RvbUJvcmRlckNsYXNzIDogaW5hY3RpdmVCb3JkZXI7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2XG4gICAgICAgIGlkPXtgJHtpZH0tc2VsZWN0YH1cbiAgICAgICAgY2xhc3NOYW1lPXtgcmVzcG9uc2l2ZS1uYXZiYXItc2VsZWN0ICR7Ym9yZGVyQ2xhc3N9YH1cbiAgICAgICAgc3R5bGU9e3sgZm9udFdlaWdodCwgZm9udFNpemUgfX1cbiAgICAgICAgcmVmPXsocikgPT4ge1xuICAgICAgICAgIHRoaXMuc2VsZWN0Q29udGFpbmVyUmVmID0gcjtcbiAgICAgICAgfX1cbiAgICAgID5cbiAgICAgICAgPEZsb2F0aW5nU2VsZWN0XG4gICAgICAgICAgbmFtZT17YCR7aWR9LXNlbGVjdC1jb21wb25lbnRgfVxuICAgICAgICAgIHZhbHVlPXthY3RpdmVJdGVtIHx8ICcnfVxuICAgICAgICAgIGlzQ2xlYXJhYmxlPXtmYWxzZX1cbiAgICAgICAgICBwbGFjZWhvbGRlcj17cGxhY2Vob2xkZXJ9XG4gICAgICAgICAgb3B0aW9ucz17c2VsZWN0T3B0aW9uc31cbiAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVPbkNoYW5nZX1cbiAgICAgICAgLz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH07XG5cbiAgLy8gUmVuZGVyIGN1c3RvbSBsZWZ0IHNpZGUgY29tcG9uZW50XG4gIGNvbXBvbmVudExlZnQgPSAoKSA9PiB7XG4gICAgY29uc3QgeyBjb21wb25lbnRMZWZ0IH0gPSB0aGlzLnByb3BzO1xuICAgIGlmICghY29tcG9uZW50TGVmdCkgcmV0dXJuIG51bGw7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3NOYW1lPVwicmVzcG9uc2l2ZS1uYXZiYXItY29udGFpbmVyLWxlZnRcIlxuICAgICAgICByZWY9eyhyKSA9PiB7XG4gICAgICAgICAgdGhpcy5jb21wb25lbnRMZWZ0Q29udGFpbmVyUmVmID0gcjtcbiAgICAgICAgfX1cbiAgICAgID5cbiAgICAgICAge2NvbXBvbmVudExlZnR9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9O1xuXG4gIC8vIFJlbmRlciBjdXN0b20gcmlnaHQgc2lkZSBjb21wb25lbnRcbiAgY29tcG9uZW50UmlnaHQgPSAoKSA9PiB7XG4gICAgY29uc3QgeyBjb21wb25lbnRSaWdodCB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAoIWNvbXBvbmVudFJpZ2h0KSByZXR1cm4gbnVsbDtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdlxuICAgICAgICBjbGFzc05hbWU9XCJyZXNwb25zaXZlLW5hdmJhci1jb250YWluZXItcmlnaHRcIlxuICAgICAgICByZWY9eyhyKSA9PiB7XG4gICAgICAgICAgdGhpcy5jb21wb25lbnRSaWdodENvbnRhaW5lclJlZiA9IHI7XG4gICAgICAgIH19XG4gICAgICA+XG4gICAgICAgIHtjb21wb25lbnRSaWdodH1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH07XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgaWQsIGNsYXNzTmFtZSwgbGlzdCwgc2hvd05hdkl0ZW1Cb3JkZXIsIGhlaWdodCB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB2aXNpYmxlTGlzdCA9IHRoaXMuc3RhdGUubGFzdFZpc2libGVJdGVtSW5kZXggPiAtMiA/IGxpc3Quc2xpY2UoMCwgdGhpcy5zdGF0ZS5sYXN0VmlzaWJsZUl0ZW1JbmRleCArIDEpIDogbGlzdDtcbiAgICBjb25zdCBpdGVtQ2xhc3NOYW1lID0gc2hvd05hdkl0ZW1Cb3JkZXIgPyAncmVzcG9uc2l2ZS1uYXZiYXItaXRlbSBpbmFjdGl2ZS1ib3JkZXInIDogJ3Jlc3BvbnNpdmUtbmF2YmFyLWl0ZW0gbm8taXRlbS1ib3JkZXInO1xuICAgIGNvbnN0IGl0ZW1zID0gdmlzaWJsZUxpc3QubWFwKChpdGVtLCBpbmRleCkgPT4gdGhpcy5uYXZiYXJJdGVtKGl0ZW0sIGluZGV4LCBpdGVtQ2xhc3NOYW1lKSk7XG4gICAgY29uc3QgbGluZUNvdW50ID0gdGhpcy5kb0xpbmVDb3VudCgpO1xuICAgIGNvbnN0IG5hdmJhclN0eWxlID0ge1xuICAgICAgbWluSGVpZ2h0OiBoZWlnaHQsXG4gICAgICBtYXhIZWlnaHQ6IGhlaWdodFxuICAgIH07XG4gICAgaWYgKGhlaWdodC5zbGljZSgtMikgPT09ICdweCcgJiYgbGluZUNvdW50KSB7XG4gICAgICBjb25zdCBoZWlnaHRQeCA9IHBhcnNlSW50KGhlaWdodC5zbGljZSgwLCAtMiksIDEwKTtcbiAgICAgIG5hdmJhclN0eWxlLmxpbmVIZWlnaHQgPSBgJHtoZWlnaHRQeCAtIDR9cHhgO1xuICAgIH1cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdlxuICAgICAgICBpZD17YCR7aWR9LWNvbnRhaW5lcmB9XG4gICAgICAgIHJlZj17KHIpID0+IHtcbiAgICAgICAgICB0aGlzLm5hdmJhckNvbnRhaW5lclJlZiA9IHI7XG4gICAgICAgIH19XG4gICAgICAgIGNsYXNzTmFtZT17YHJlc3BvbnNpdmUtbmF2YmFyLWNvbnRhaW5lciAke2NsYXNzTmFtZX1gfVxuICAgICAgICBzdHlsZT17bmF2YmFyU3R5bGV9XG4gICAgICA+XG4gICAgICAgIHtpdGVtc31cbiAgICAgICAge3RoaXMuY29tYm9ib3goKX1cbiAgICAgICAge3RoaXMuY29tcG9uZW50TGVmdCgpfVxuICAgICAgICB7dGhpcy5jb21wb25lbnRSaWdodCgpfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuIl19