'use strict';

exports.__esModule = true;
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _class, _temp;

var _react = require('react');

var React = _interopRequireWildcard(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _debounce = require('debounce');

var _dropdown = require('./dropdown');

var _dropdown2 = _interopRequireDefault(_dropdown);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ResponsiveTabPills = (_temp = _class = function (_React$Component) {
  _inherits(ResponsiveTabPills, _React$Component);

  function ResponsiveTabPills(props) {
    _classCallCheck(this, ResponsiveTabPills);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.state = {
      dragFrom: null,
      dragTo: null,
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

    _this.handleOnClick = function (id, index) {
      _this.props.onSelect(id, index);
    };

    _this.handleClose = function (event, id, index) {
      // don't bubble to click also, we got rid of this
      event.stopPropagation();
      _this.props.onClose(id, index);
    };

    _this.dragStart = function (index) {
      _this.setState({
        dragFrom: index
      });
    };

    _this.dragEnter = function (index, e) {
      e.target.classList.add('droppable');
      _this.setState({
        dragTo: index
      });
    };

    _this.dragLeave = function (index, e) {
      e.target.classList.remove('droppable');
    };

    _this.dragDrop = function () {
      if (_this.props.onReorder) {
        var _this$state = _this.state,
            dragFrom = _this$state.dragFrom,
            dragTo = _this$state.dragTo;

        var newList = _this.props.list.slice();
        var moved = newList[dragFrom];

        newList.splice(dragFrom, 1);
        newList.splice(dragTo, 0, moved);

        _this.props.onReorder(newList, dragFrom, dragTo);
        _this.props.onSelect(moved, dragTo);

        _this.setState({
          dragTo: null,
          dragFrom: null
        });
      }
    };

    _this.navbarItem = function (item, index, className) {
      var _this$props = _this.props,
          activeKey = _this$props.activeKey,
          fontWeight = _this$props.fontWeight,
          fontSize = _this$props.fontSize,
          height = _this$props.height,
          allowClose = _this$props.allowClose,
          navRenderer = _this$props.navRenderer,
          allowReorder = _this$props.allowReorder;


      if (navRenderer) {
        return navRenderer(item, index, className, activeKey === index);
      }

      // resolve activeKeyIndex
      var activeKeyIndex = activeKey;
      if ((typeof activeKey === 'undefined' ? 'undefined' : _typeof(activeKey)) === 'object') {
        activeKeyIndex = _this.activeItemIndex(activeKey);
      }

      var buttonClass = (0, _classnames2.default)(className, 'grabbable', {
        selected: index === activeKeyIndex,
        'with-close': allowClose
      });

      var dragOptions = allowReorder ? {
        onDragStart: function onDragStart(e) {
          return _this.dragStart(index, e);
        },
        onDragEnter: function onDragEnter(e) {
          return _this.dragEnter(index, e);
        },
        onDragLeave: function onDragLeave(e) {
          return _this.dragLeave(index, e);
        },
        onDragEnd: _this.dragDrop,
        draggable: true
      } : {};

      return React.createElement(
        'button',
        _extends({}, dragOptions, {
          className: buttonClass,
          style: { fontWeight: fontWeight, fontSize: fontSize, minHeight: height },
          id: item.id || 'navItem' + String(index),
          key: item.id || 'navitem' + String(index),
          onClick: function onClick() {
            return _this.handleOnClick(item.id, index);
          },
          ref: function ref(r) {
            if (r && !_this.itemWidths[index]) _this.itemWidths[index] = r.offsetWidth;
          }
        }),
        React.createElement(
          'span',
          { className: 'tab-pill-item' },
          item.name,
          allowClose && React.createElement('i', { tabIndex: index + 1, role: 'button', className: 'fa fa-times', onClick: function onClick(event) {
              return _this.handleClose(event, item.id, index);
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
        return item.id === activeItem.value;
      });
    };

    _this.combobox = function () {
      var _this$props2 = _this.props,
          id = _this$props2.id,
          list = _this$props2.list,
          fontSize = _this$props2.fontSize,
          fontWeight = _this$props2.fontWeight,
          allowReorder = _this$props2.allowReorder,
          activeKey = _this$props2.activeKey,
          allowClose = _this$props2.allowClose;

      if (!_this.state.isSelectVisible) {
        // return null if all nav items are visible
        return null;
      }

      // slice nav items list and show invisible items in the combobox
      var navList = _this.state.lastVisibleItemIndex > -2 ? list.slice(_this.state.lastVisibleItemIndex + 1) : list;
      var selectOptions = navList.map(function (item, index) {
        var realIndex = index + _this.state.lastVisibleItemIndex + 1;

        var dragOptions = allowReorder ? {
          onDragStart: function onDragStart(e) {
            return _this.dragStart(realIndex, e);
          },
          onDragEnter: function onDragEnter(e) {
            return _this.dragEnter(realIndex, e);
          },
          onDragLeave: function onDragLeave(e) {
            return _this.dragLeave(index, e);
          },
          onDragEnd: _this.dragDrop,
          draggable: true
        } : {};

        var dropdownOptions = _extends({
          className: (0, _classnames2.default)('dropdown-option', { selected: list[activeKey].id === item.id }),
          close: allowClose ? React.createElement('i', { role: 'button', className: 'fa fa-times', onClick: function onClick(event) {
              return _this.handleClose(event, item.id, realIndex);
            } }) : null,
          onSelect: function onSelect() {
            _this.handleOnClick(item.id, realIndex);
          }
        }, dragOptions);

        return _extends({}, item, {
          options: dropdownOptions
        });
      });

      var lineCountNeeded = _this.doLineCount();
      var customBorderClass = lineCountNeeded ? 'selected line-count' : 'selected';
      var inactiveBorder = lineCountNeeded ? 'inactive line-count' : 'inactive';
      // Resolve activeItem
      var activeItem = _this.resolveActiveItemFromOptions(selectOptions);
      var activeItemIndex = _this.activeItemIndex(activeItem);
      var borderClass = activeItemIndex >= _this.state.lastVisibleItemIndex + 1 ? customBorderClass : inactiveBorder; // eslint-disable-line

      return React.createElement(
        'div',
        {
          id: id + '-select',
          className: 'responsive-tab-dropdown ' + borderClass,
          style: { fontWeight: fontWeight, fontSize: fontSize },
          ref: function ref(r) {
            _this.selectContainerRef = r;
          }
        },
        React.createElement(_dropdown2.default, { value: list[activeKey], options: selectOptions })
      );
    };

    _this.itemWidths = []; // store item widths here, they don't change
    return _this;
  }

  ResponsiveTabPills.prototype.componentDidMount = function componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    window.addEventListener('orientationchange', this.refreshLastVisibleItem); // for mobile support
    this.refreshLastVisibleItem();
  };

  ResponsiveTabPills.prototype.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
    // Refresh visible items if values change
    if (this.state.isSelectVisible !== prevState.isSelectVisible || this.state.lastVisibleItemIndex !== prevState.lastVisibleItemIndex) {
      this.refreshLastVisibleItem();
    }
  };

  ResponsiveTabPills.prototype.componentWillUnmount = function componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
    window.removeEventListener('orientationchange', this.refreshLastVisibleItem); // for mobile support
  };

  // Render navbar item


  // Render combobox, when all items do not fit


  ResponsiveTabPills.prototype.render = function render() {
    var _this2 = this;

    var _props = this.props,
        id = _props.id,
        className = _props.className,
        list = _props.list,
        height = _props.height;

    var visibleList = this.state.lastVisibleItemIndex > -2 ? list.slice(0, this.state.lastVisibleItemIndex + 1) : list;
    var itemClassName = 'responsive-navbar-item inactive-border';
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
        className: (0, _classnames2.default)('responsive-tab-pills-dropdown', className),
        style: navbarStyle
      },
      items,
      this.combobox()
    );
  };

  return ResponsiveTabPills;
}(React.Component), _class.defaultProps = {
  id: 'responsive-navbar',
  className: '',
  onSelect: function onSelect() {},
  onClose: function onClose() {},
  allowClose: false,
  allowReorder: false,
  fontSize: 'inherit',
  fontWeight: 'inherit',
  placeholder: 'more...',
  height: 30,
  componentLeft: null,
  componentRight: null
}, _temp);
exports.default = ResponsiveTabPills;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yZXNwb25zaXZlLXRhYi1waWxscy5qc3giXSwibmFtZXMiOlsiUmVhY3QiLCJSZXNwb25zaXZlVGFiUGlsbHMiLCJwcm9wcyIsInN0YXRlIiwiZHJhZ0Zyb20iLCJkcmFnVG8iLCJpc1NlbGVjdFZpc2libGUiLCJsYXN0VmlzaWJsZUl0ZW1JbmRleCIsImdldExhc3RWaXNpYmxlSXRlbUluZGV4IiwibmF2QmFyV2lkdGgiLCJuYXZiYXJDb250YWluZXJSZWYiLCJvZmZzZXRXaWR0aCIsInNlbGVjdFdpZHRoIiwic2VsZWN0Q29udGFpbmVyUmVmIiwiY29tcG9uZW50TGVmdFdpZHRoIiwiY29tcG9uZW50TGVmdENvbnRhaW5lclJlZiIsImNvbXBvbmVudFJpZ2h0V2lkdGgiLCJjb21wb25lbnRSaWdodENvbnRhaW5lclJlZiIsInJlbWFpbmluZ1dpZHRoIiwibGFzdFZpc2libGUiLCJpIiwibGlzdCIsImxlbmd0aCIsIml0ZW1XaWR0aHMiLCJoYW5kbGVSZXNpemUiLCJyZWZyZXNoTGFzdFZpc2libGVJdGVtIiwic2V0U3RhdGUiLCJoYW5kbGVPbkNsaWNrIiwiaWQiLCJpbmRleCIsIm9uU2VsZWN0IiwiaGFuZGxlQ2xvc2UiLCJldmVudCIsInN0b3BQcm9wYWdhdGlvbiIsIm9uQ2xvc2UiLCJkcmFnU3RhcnQiLCJkcmFnRW50ZXIiLCJlIiwidGFyZ2V0IiwiY2xhc3NMaXN0IiwiYWRkIiwiZHJhZ0xlYXZlIiwicmVtb3ZlIiwiZHJhZ0Ryb3AiLCJvblJlb3JkZXIiLCJuZXdMaXN0Iiwic2xpY2UiLCJtb3ZlZCIsInNwbGljZSIsIm5hdmJhckl0ZW0iLCJpdGVtIiwiY2xhc3NOYW1lIiwiYWN0aXZlS2V5IiwiZm9udFdlaWdodCIsImZvbnRTaXplIiwiaGVpZ2h0IiwiYWxsb3dDbG9zZSIsIm5hdlJlbmRlcmVyIiwiYWxsb3dSZW9yZGVyIiwiYWN0aXZlS2V5SW5kZXgiLCJhY3RpdmVJdGVtSW5kZXgiLCJidXR0b25DbGFzcyIsInNlbGVjdGVkIiwiZHJhZ09wdGlvbnMiLCJvbkRyYWdTdGFydCIsIm9uRHJhZ0VudGVyIiwib25EcmFnTGVhdmUiLCJvbkRyYWdFbmQiLCJkcmFnZ2FibGUiLCJtaW5IZWlnaHQiLCJTdHJpbmciLCJyIiwibmFtZSIsImRvTGluZUNvdW50Iiwic29tZSIsInJlc29sdmVBY3RpdmVJdGVtRnJvbU9wdGlvbnMiLCJzZWxlY3RPcHRpb25zIiwiYWN0aXZlSXRlbSIsImZpbmQiLCJvcHRzIiwidmFsdWUiLCJmaW5kSW5kZXgiLCJjb21ib2JveCIsIm5hdkxpc3QiLCJtYXAiLCJyZWFsSW5kZXgiLCJkcm9wZG93bk9wdGlvbnMiLCJjbG9zZSIsIm9wdGlvbnMiLCJsaW5lQ291bnROZWVkZWQiLCJjdXN0b21Cb3JkZXJDbGFzcyIsImluYWN0aXZlQm9yZGVyIiwiYm9yZGVyQ2xhc3MiLCJjb21wb25lbnREaWRNb3VudCIsIndpbmRvdyIsImFkZEV2ZW50TGlzdGVuZXIiLCJjb21wb25lbnREaWRVcGRhdGUiLCJwcmV2UHJvcHMiLCJwcmV2U3RhdGUiLCJjb21wb25lbnRXaWxsVW5tb3VudCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJyZW5kZXIiLCJ2aXNpYmxlTGlzdCIsIml0ZW1DbGFzc05hbWUiLCJpdGVtcyIsImxpbmVDb3VudCIsIm5hdmJhclN0eWxlIiwibWF4SGVpZ2h0IiwiaGVpZ2h0UHgiLCJwYXJzZUludCIsImxpbmVIZWlnaHQiLCJDb21wb25lbnQiLCJkZWZhdWx0UHJvcHMiLCJwbGFjZWhvbGRlciIsImNvbXBvbmVudExlZnQiLCJjb21wb25lbnRSaWdodCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTs7SUFBWUEsSzs7QUFDWjs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0lBRXFCQyxrQjs7O0FBb0NuQiw4QkFBWUMsS0FBWixFQUFtQjtBQUFBOztBQUFBLGlEQUNqQiw0QkFBTUEsS0FBTixDQURpQjs7QUFBQSxVQUtuQkMsS0FMbUIsR0FLWDtBQUNOQyxnQkFBVSxJQURK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V0FBVyxDQUF2QztBQUNEO0FBQ0QsV0FDRTtBQUFBO0FBQUE7QUFDRSxZQUFPaEYsRUFBUCxlQURGO0FBRUUsYUFBSyxhQUFDMkMsQ0FBRCxFQUFPO0FBQ1YsaUJBQUs3RCxrQkFBTCxHQUEwQjZELENBQTFCO0FBQ0QsU0FKSDtBQUtFLG1CQUFXLDJEQUE0Q3BCLFNBQTVDLENBTGI7QUFNRSxlQUFPdUQ7QUFOVDtBQVFHRixXQVJIO0FBU0csV0FBS3RCLFFBQUw7QUFUSCxLQURGO0FBYUQsRzs7O0VBalQ2Q2xGLE1BQU0rRyxTLFVBcUI3Q0MsWSxHQUFlO0FBQ3BCcEYsTUFBSSxtQkFEZ0I7QUFFcEJ1QixhQUFXLEVBRlM7QUFHcEJyQixZQUFVLG9CQUFNLENBQUUsQ0FIRTtBQUlwQkksV0FBUyxtQkFBTSxDQUFFLENBSkc7QUFLcEJzQixjQUFZLEtBTFE7QUFNcEJFLGdCQUFjLEtBTk07QUFPcEJKLFlBQVUsU0FQVTtBQVFwQkQsY0FBWSxTQVJRO0FBU3BCNEQsZUFBYSxTQVRPO0FBVXBCMUQsVUFBUSxFQVZZO0FBV3BCMkQsaUJBQWUsSUFYSztBQVlwQkMsa0JBQWdCO0FBWkksQztrQkFyQkhsSCxrQiIsImZpbGUiOiJyZXNwb25zaXZlLXRhYi1waWxscy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgY2xhc3NuYW1lcyBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCB7IGRlYm91bmNlIH0gZnJvbSAnZGVib3VuY2UnO1xuaW1wb3J0IERyb3BEb3duIGZyb20gJy4vZHJvcGRvd24nO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZXNwb25zaXZlVGFiUGlsbHMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIGlkOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGFsbG93Q2xvc2U6IFByb3BUeXBlcy5ib29sLFxuICAgIG9uQ2xvc2U6IFByb3BUeXBlcy5mdW5jLFxuICAgIGFsbG93UmVvcmRlcjogUHJvcFR5cGVzLmJvb2wsXG4gICAgbmF2UmVuZGVyZXI6IFByb3BUeXBlcy5mdW5jLFxuICAgIGNsYXNzTmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBmb250U2l6ZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBmb250V2VpZ2h0OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGFjdGl2ZUtleTogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnNoYXBlKHt9KSwgUHJvcFR5cGVzLm51bWJlcl0pLmlzUmVxdWlyZWQsXG4gICAgbGlzdDogUHJvcFR5cGVzLmFycmF5T2YoXG4gICAgICBQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgICBuYW1lOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMubm9kZV0pLmlzUmVxdWlyZWQsXG4gICAgICAgIGlkOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMubnVtYmVyXSksXG4gICAgICB9KVxuICAgICkuaXNSZXF1aXJlZCxcbiAgICBvblNlbGVjdDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgaGVpZ2h0OiBQcm9wVHlwZXMuc3RyaW5nLFxuICB9O1xuXG4gIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgaWQ6ICdyZXNwb25zaXZlLW5hdmJhcicsXG4gICAgY2xhc3NOYW1lOiAnJyxcbiAgICBvblNlbGVjdDogKCkgPT4ge30sXG4gICAgb25DbG9zZTogKCkgPT4ge30sXG4gICAgYWxsb3dDbG9zZTogZmFsc2UsXG4gICAgYWxsb3dSZW9yZGVyOiBmYWxzZSxcbiAgICBmb250U2l6ZTogJ2luaGVyaXQnLFxuICAgIGZvbnRXZWlnaHQ6ICdpbmhlcml0JyxcbiAgICBwbGFjZWhvbGRlcjogJ21vcmUuLi4nLFxuICAgIGhlaWdodDogMzAsXG4gICAgY29tcG9uZW50TGVmdDogbnVsbCxcbiAgICBjb21wb25lbnRSaWdodDogbnVsbCxcbiAgfTtcblxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLml0ZW1XaWR0aHMgPSBbXTsgLy8gc3RvcmUgaXRlbSB3aWR0aHMgaGVyZSwgdGhleSBkb24ndCBjaGFuZ2VcbiAgfVxuXG4gIHN0YXRlID0ge1xuICAgIGRyYWdGcm9tOiBudWxsLFxuICAgIGRyYWdUbzogbnVsbCxcbiAgICBpc1NlbGVjdFZpc2libGU6IGZhbHNlLFxuICAgIGxhc3RWaXNpYmxlSXRlbUluZGV4OiAtMixcbiAgfTtcblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5oYW5kbGVSZXNpemUpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdvcmllbnRhdGlvbmNoYW5nZScsIHRoaXMucmVmcmVzaExhc3RWaXNpYmxlSXRlbSk7IC8vIGZvciBtb2JpbGUgc3VwcG9ydFxuICAgIHRoaXMucmVmcmVzaExhc3RWaXNpYmxlSXRlbSgpO1xuICB9XG5cbiAgY29tcG9uZW50RGlkVXBkYXRlKHByZXZQcm9wcywgcHJldlN0YXRlKSB7XG4gICAgLy8gUmVmcmVzaCB2aXNpYmxlIGl0ZW1zIGlmIHZhbHVlcyBjaGFuZ2VcbiAgICBpZiAodGhpcy5zdGF0ZS5pc1NlbGVjdFZpc2libGUgIT09IHByZXZTdGF0ZS5pc1NlbGVjdFZpc2libGUgfHwgdGhpcy5zdGF0ZS5sYXN0VmlzaWJsZUl0ZW1JbmRleCAhPT0gcHJldlN0YXRlLmxhc3RWaXNpYmxlSXRlbUluZGV4KSB7XG4gICAgICB0aGlzLnJlZnJlc2hMYXN0VmlzaWJsZUl0ZW0oKTtcbiAgICB9XG4gIH1cblxuICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5oYW5kbGVSZXNpemUpO1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdvcmllbnRhdGlvbmNoYW5nZScsIHRoaXMucmVmcmVzaExhc3RWaXNpYmxlSXRlbSk7IC8vIGZvciBtb2JpbGUgc3VwcG9ydFxuICB9XG5cbiAgZ2V0TGFzdFZpc2libGVJdGVtSW5kZXggPSAoKSA9PiB7XG4gICAgY29uc3QgbmF2QmFyV2lkdGggPSB0aGlzLm5hdmJhckNvbnRhaW5lclJlZiA/IHRoaXMubmF2YmFyQ29udGFpbmVyUmVmLm9mZnNldFdpZHRoIDogMDtcbiAgICBjb25zdCBzZWxlY3RXaWR0aCA9IHRoaXMuc2VsZWN0Q29udGFpbmVyUmVmID8gdGhpcy5zZWxlY3RDb250YWluZXJSZWYub2Zmc2V0V2lkdGggOiAwO1xuICAgIGNvbnN0IGNvbXBvbmVudExlZnRXaWR0aCA9IHRoaXMuY29tcG9uZW50TGVmdENvbnRhaW5lclJlZiA/IHRoaXMuY29tcG9uZW50TGVmdENvbnRhaW5lclJlZi5vZmZzZXRXaWR0aCA6IDA7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICBjb25zdCBjb21wb25lbnRSaWdodFdpZHRoID0gdGhpcy5jb21wb25lbnRSaWdodENvbnRhaW5lclJlZiA/IHRoaXMuY29tcG9uZW50UmlnaHRDb250YWluZXJSZWYub2Zmc2V0V2lkdGggOiAwOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG5cbiAgICBsZXQgcmVtYWluaW5nV2lkdGggPSBuYXZCYXJXaWR0aCAtIHNlbGVjdFdpZHRoIC0gY29tcG9uZW50TGVmdFdpZHRoIC0gY29tcG9uZW50UmlnaHRXaWR0aDtcbiAgICBsZXQgbGFzdFZpc2libGUgPSAwO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnByb3BzLmxpc3QubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIHJlbWFpbmluZ1dpZHRoIC09IHRoaXMuaXRlbVdpZHRoc1tpXTtcbiAgICAgIGlmIChyZW1haW5pbmdXaWR0aCA8IDApIHtcbiAgICAgICAgbGFzdFZpc2libGUgLT0gMTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBsYXN0VmlzaWJsZSArPSAxO1xuICAgIH1cblxuICAgIHJldHVybiBsYXN0VmlzaWJsZTtcbiAgfTtcblxuICBoYW5kbGVSZXNpemUgPSAoKSA9PiBkZWJvdW5jZSh0aGlzLnJlZnJlc2hMYXN0VmlzaWJsZUl0ZW0oKSwgMzAwKTtcblxuICByZWZyZXNoTGFzdFZpc2libGVJdGVtID0gKCkgPT4ge1xuICAgIGNvbnN0IGxhc3RWaXNpYmxlSXRlbUluZGV4ID0gdGhpcy5nZXRMYXN0VmlzaWJsZUl0ZW1JbmRleCgpO1xuICAgIGlmICh0aGlzLnN0YXRlLmxhc3RWaXNpYmxlSXRlbUluZGV4ICE9PSBsYXN0VmlzaWJsZUl0ZW1JbmRleCkge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIGlzU2VsZWN0VmlzaWJsZTogdGhpcy5wcm9wcy5saXN0Lmxlbmd0aCA+IGxhc3RWaXNpYmxlSXRlbUluZGV4ICsgMSxcbiAgICAgICAgbGFzdFZpc2libGVJdGVtSW5kZXgsXG4gICAgICB9KTtcbiAgICB9XG4gIH07XG5cbiAgaGFuZGxlT25DbGljayA9IChpZCwgaW5kZXgpID0+IHtcbiAgICB0aGlzLnByb3BzLm9uU2VsZWN0KGlkLCBpbmRleCk7XG4gIH07XG5cbiAgaGFuZGxlQ2xvc2UgPSAoZXZlbnQsIGlkLCBpbmRleCkgPT4ge1xuICAgIC8vIGRvbid0IGJ1YmJsZSB0byBjbGljayBhbHNvLCB3ZSBnb3QgcmlkIG9mIHRoaXNcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB0aGlzLnByb3BzLm9uQ2xvc2UoaWQsIGluZGV4KTtcbiAgfTtcblxuICBkcmFnU3RhcnQgPSAoaW5kZXgpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGRyYWdGcm9tOiBpbmRleCxcbiAgICB9KTtcbiAgfTtcblxuICBkcmFnRW50ZXIgPSAoaW5kZXgsIGUpID0+IHtcbiAgICBlLnRhcmdldC5jbGFzc0xpc3QuYWRkKCdkcm9wcGFibGUnKTtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGRyYWdUbzogaW5kZXgsXG4gICAgfSk7XG4gIH07XG5cbiAgZHJhZ0xlYXZlID0gKGluZGV4LCBlKSA9PiB7XG4gICAgZS50YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSgnZHJvcHBhYmxlJyk7XG4gIH07XG5cbiAgZHJhZ0Ryb3AgPSAoKSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMub25SZW9yZGVyKSB7XG4gICAgICBjb25zdCB7IGRyYWdGcm9tLCBkcmFnVG8gfSA9IHRoaXMuc3RhdGU7XG4gICAgICBjb25zdCBuZXdMaXN0ID0gdGhpcy5wcm9wcy5saXN0LnNsaWNlKCk7XG4gICAgICBjb25zdCBtb3ZlZCA9IG5ld0xpc3RbZHJhZ0Zyb21dO1xuXG4gICAgICBuZXdMaXN0LnNwbGljZShkcmFnRnJvbSwgMSk7XG4gICAgICBuZXdMaXN0LnNwbGljZShkcmFnVG8sIDAsIG1vdmVkKTtcblxuICAgICAgdGhpcy5wcm9wcy5vblJlb3JkZXIobmV3TGlzdCwgZHJhZ0Zyb20sIGRyYWdUbyk7XG4gICAgICB0aGlzLnByb3BzLm9uU2VsZWN0KG1vdmVkLCBkcmFnVG8pO1xuXG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgZHJhZ1RvOiBudWxsLFxuICAgICAgICBkcmFnRnJvbTogbnVsbCxcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcblxuICAvLyBSZW5kZXIgbmF2YmFyIGl0ZW1cbiAgbmF2YmFySXRlbSA9IChpdGVtLCBpbmRleCwgY2xhc3NOYW1lKSA9PiB7XG4gICAgY29uc3QgeyBhY3RpdmVLZXksIGZvbnRXZWlnaHQsIGZvbnRTaXplLCBoZWlnaHQsIGFsbG93Q2xvc2UsIG5hdlJlbmRlcmVyLCBhbGxvd1Jlb3JkZXIgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBpZiAobmF2UmVuZGVyZXIpIHtcbiAgICAgIHJldHVybiBuYXZSZW5kZXJlcihpdGVtLCBpbmRleCwgY2xhc3NOYW1lLCBhY3RpdmVLZXkgPT09IGluZGV4KTtcbiAgICB9XG5cbiAgICAvLyByZXNvbHZlIGFjdGl2ZUtleUluZGV4XG4gICAgbGV0IGFjdGl2ZUtleUluZGV4ID0gYWN0aXZlS2V5O1xuICAgIGlmICh0eXBlb2YgYWN0aXZlS2V5ID09PSAnb2JqZWN0Jykge1xuICAgICAgYWN0aXZlS2V5SW5kZXggPSB0aGlzLmFjdGl2ZUl0ZW1JbmRleChhY3RpdmVLZXkpO1xuICAgIH1cblxuICAgIGNvbnN0IGJ1dHRvbkNsYXNzID0gY2xhc3NuYW1lcyhjbGFzc05hbWUsICdncmFiYmFibGUnLCB7XG4gICAgICBzZWxlY3RlZDogaW5kZXggPT09IGFjdGl2ZUtleUluZGV4LFxuICAgICAgJ3dpdGgtY2xvc2UnOiBhbGxvd0Nsb3NlLFxuICAgIH0pO1xuXG4gICAgY29uc3QgZHJhZ09wdGlvbnMgPSBhbGxvd1Jlb3JkZXJcbiAgICAgID8ge1xuICAgICAgICAgIG9uRHJhZ1N0YXJ0OiAoZSkgPT4gdGhpcy5kcmFnU3RhcnQoaW5kZXgsIGUpLFxuICAgICAgICAgIG9uRHJhZ0VudGVyOiAoZSkgPT4gdGhpcy5kcmFnRW50ZXIoaW5kZXgsIGUpLFxuICAgICAgICAgIG9uRHJhZ0xlYXZlOiAoZSkgPT4gdGhpcy5kcmFnTGVhdmUoaW5kZXgsIGUpLFxuICAgICAgICAgIG9uRHJhZ0VuZDogdGhpcy5kcmFnRHJvcCxcbiAgICAgICAgICBkcmFnZ2FibGU6IHRydWUsXG4gICAgICAgIH1cbiAgICAgIDoge307XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGJ1dHRvblxuICAgICAgICB7Li4uZHJhZ09wdGlvbnN9XG4gICAgICAgIGNsYXNzTmFtZT17YnV0dG9uQ2xhc3N9XG4gICAgICAgIHN0eWxlPXt7IGZvbnRXZWlnaHQsIGZvbnRTaXplLCBtaW5IZWlnaHQ6IGhlaWdodCB9fVxuICAgICAgICBpZD17aXRlbS5pZCB8fCBgbmF2SXRlbSR7U3RyaW5nKGluZGV4KX1gfVxuICAgICAgICBrZXk9e2l0ZW0uaWQgfHwgYG5hdml0ZW0ke1N0cmluZyhpbmRleCl9YH1cbiAgICAgICAgb25DbGljaz17KCkgPT4gdGhpcy5oYW5kbGVPbkNsaWNrKGl0ZW0uaWQsIGluZGV4KX1cbiAgICAgICAgcmVmPXsocikgPT4ge1xuICAgICAgICAgIGlmIChyICYmICF0aGlzLml0ZW1XaWR0aHNbaW5kZXhdKSB0aGlzLml0ZW1XaWR0aHNbaW5kZXhdID0gci5vZmZzZXRXaWR0aDtcbiAgICAgICAgfX1cbiAgICAgID5cbiAgICAgICAgPHNwYW4gY2xhc3NOYW1lPSd0YWItcGlsbC1pdGVtJz5cbiAgICAgICAgICB7aXRlbS5uYW1lfVxuICAgICAgICAgIHsvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUganN4LWExMXkvY2xpY2stZXZlbnRzLWhhdmUta2V5LWV2ZW50cyAqL31cbiAgICAgICAgICB7YWxsb3dDbG9zZSAmJiA8aSB0YWJJbmRleD17aW5kZXggKyAxfSByb2xlPSdidXR0b24nIGNsYXNzTmFtZT0nZmEgZmEtdGltZXMnIG9uQ2xpY2s9eyhldmVudCkgPT4gdGhpcy5oYW5kbGVDbG9zZShldmVudCwgaXRlbS5pZCwgaW5kZXgpfSAvPn1cbiAgICAgICAgPC9zcGFuPlxuICAgICAgPC9idXR0b24+XG4gICAgKTtcbiAgfTtcblxuICBkb0xpbmVDb3VudCA9ICgpID0+IHtcbiAgICBjb25zdCB7IGxpc3QgfSA9IHRoaXMucHJvcHM7XG4gICAgcmV0dXJuIGxpc3Quc29tZSgoaXRlbSkgPT4gdHlwZW9mIGl0ZW0ubmFtZSAhPT0gJ3N0cmluZycpO1xuICB9O1xuXG4gIHJlc29sdmVBY3RpdmVJdGVtRnJvbU9wdGlvbnMgPSAoc2VsZWN0T3B0aW9ucykgPT4ge1xuICAgIGNvbnN0IHsgYWN0aXZlS2V5IH0gPSB0aGlzLnByb3BzO1xuICAgIGxldCBhY3RpdmVJdGVtID0gc2VsZWN0T3B0aW9ucy5maW5kKChvcHRzKSA9PiBvcHRzLnZhbHVlID09PSBhY3RpdmVLZXkpO1xuICAgIGlmICghYWN0aXZlSXRlbSkge1xuICAgICAgYWN0aXZlSXRlbSA9IHNlbGVjdE9wdGlvbnMuZmluZCgob3B0cykgPT4gb3B0cy52YWx1ZSA9PT0gYWN0aXZlS2V5LnZhbHVlKTtcbiAgICB9XG4gICAgcmV0dXJuIGFjdGl2ZUl0ZW07XG4gIH07XG5cbiAgYWN0aXZlSXRlbUluZGV4ID0gKGFjdGl2ZUl0ZW0pID0+IHtcbiAgICBjb25zdCB7IGxpc3QgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKCFhY3RpdmVJdGVtKSByZXR1cm4gbnVsbDtcbiAgICByZXR1cm4gbGlzdC5maW5kSW5kZXgoKGl0ZW0pID0+IGl0ZW0uaWQgPT09IGFjdGl2ZUl0ZW0udmFsdWUpO1xuICB9O1xuXG4gIC8vIFJlbmRlciBjb21ib2JveCwgd2hlbiBhbGwgaXRlbXMgZG8gbm90IGZpdFxuICBjb21ib2JveCA9ICgpID0+IHtcbiAgICBjb25zdCB7IGlkLCBsaXN0LCBmb250U2l6ZSwgZm9udFdlaWdodCwgYWxsb3dSZW9yZGVyLCBhY3RpdmVLZXksIGFsbG93Q2xvc2UgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKCF0aGlzLnN0YXRlLmlzU2VsZWN0VmlzaWJsZSkge1xuICAgICAgLy8gcmV0dXJuIG51bGwgaWYgYWxsIG5hdiBpdGVtcyBhcmUgdmlzaWJsZVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgLy8gc2xpY2UgbmF2IGl0ZW1zIGxpc3QgYW5kIHNob3cgaW52aXNpYmxlIGl0ZW1zIGluIHRoZSBjb21ib2JveFxuICAgIGNvbnN0IG5hdkxpc3QgPSB0aGlzLnN0YXRlLmxhc3RWaXNpYmxlSXRlbUluZGV4ID4gLTIgPyBsaXN0LnNsaWNlKHRoaXMuc3RhdGUubGFzdFZpc2libGVJdGVtSW5kZXggKyAxKSA6IGxpc3Q7XG4gICAgY29uc3Qgc2VsZWN0T3B0aW9ucyA9IG5hdkxpc3QubWFwKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgY29uc3QgcmVhbEluZGV4ID0gaW5kZXggKyB0aGlzLnN0YXRlLmxhc3RWaXNpYmxlSXRlbUluZGV4ICsgMTtcblxuICAgICAgY29uc3QgZHJhZ09wdGlvbnMgPSBhbGxvd1Jlb3JkZXJcbiAgICAgICAgPyB7XG4gICAgICAgICAgb25EcmFnU3RhcnQ6IChlKSA9PiB0aGlzLmRyYWdTdGFydChyZWFsSW5kZXgsIGUpLFxuICAgICAgICAgIG9uRHJhZ0VudGVyOiAoZSkgPT4gdGhpcy5kcmFnRW50ZXIocmVhbEluZGV4LCBlKSxcbiAgICAgICAgICBvbkRyYWdMZWF2ZTogKGUpID0+IHRoaXMuZHJhZ0xlYXZlKGluZGV4LCBlKSxcbiAgICAgICAgICBvbkRyYWdFbmQ6IHRoaXMuZHJhZ0Ryb3AsXG4gICAgICAgICAgZHJhZ2dhYmxlOiB0cnVlLFxuICAgICAgICB9XG4gICAgICAgIDoge307XG5cbiAgICAgIGNvbnN0IGRyb3Bkb3duT3B0aW9ucyA9IHtcbiAgICAgICAgY2xhc3NOYW1lOiBjbGFzc25hbWVzKCdkcm9wZG93bi1vcHRpb24nLCB7IHNlbGVjdGVkOiBsaXN0W2FjdGl2ZUtleV0uaWQgPT09IGl0ZW0uaWQgfSksXG4gICAgICAgIGNsb3NlOiBhbGxvd0Nsb3NlID8gKFxuICAgICAgICAgIDxpIHJvbGU9J2J1dHRvbicgY2xhc3NOYW1lPSdmYSBmYS10aW1lcycgb25DbGljaz17KGV2ZW50KSA9PiB0aGlzLmhhbmRsZUNsb3NlKGV2ZW50LCBpdGVtLmlkLCByZWFsSW5kZXgpfSAvPlxuICAgICAgICApIDogbnVsbCxcbiAgICAgICAgb25TZWxlY3Q6ICgpID0+IHtcbiAgICAgICAgICB0aGlzLmhhbmRsZU9uQ2xpY2soaXRlbS5pZCwgcmVhbEluZGV4KTtcbiAgICAgICAgfSxcbiAgICAgICAgLi4uZHJhZ09wdGlvbnNcbiAgICAgIH07XG5cblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uaXRlbSxcbiAgICAgICAgb3B0aW9uczogZHJvcGRvd25PcHRpb25zXG4gICAgICB9O1xuICAgIH0pO1xuXG4gICAgY29uc3QgbGluZUNvdW50TmVlZGVkID0gdGhpcy5kb0xpbmVDb3VudCgpO1xuICAgIGNvbnN0IGN1c3RvbUJvcmRlckNsYXNzID0gbGluZUNvdW50TmVlZGVkID8gJ3NlbGVjdGVkIGxpbmUtY291bnQnIDogJ3NlbGVjdGVkJztcbiAgICBjb25zdCBpbmFjdGl2ZUJvcmRlciA9IGxpbmVDb3VudE5lZWRlZCA/ICdpbmFjdGl2ZSBsaW5lLWNvdW50JyA6ICdpbmFjdGl2ZSc7XG4gICAgLy8gUmVzb2x2ZSBhY3RpdmVJdGVtXG4gICAgY29uc3QgYWN0aXZlSXRlbSA9IHRoaXMucmVzb2x2ZUFjdGl2ZUl0ZW1Gcm9tT3B0aW9ucyhzZWxlY3RPcHRpb25zKTtcbiAgICBjb25zdCBhY3RpdmVJdGVtSW5kZXggPSB0aGlzLmFjdGl2ZUl0ZW1JbmRleChhY3RpdmVJdGVtKTtcbiAgICBjb25zdCBib3JkZXJDbGFzcyA9IGFjdGl2ZUl0ZW1JbmRleCA+PSB0aGlzLnN0YXRlLmxhc3RWaXNpYmxlSXRlbUluZGV4ICsgMSA/IGN1c3RvbUJvcmRlckNsYXNzIDogaW5hY3RpdmVCb3JkZXI7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2XG4gICAgICAgIGlkPXtgJHtpZH0tc2VsZWN0YH1cbiAgICAgICAgY2xhc3NOYW1lPXtgcmVzcG9uc2l2ZS10YWItZHJvcGRvd24gJHtib3JkZXJDbGFzc31gfVxuICAgICAgICBzdHlsZT17eyBmb250V2VpZ2h0LCBmb250U2l6ZSB9fVxuICAgICAgICByZWY9eyhyKSA9PiB7XG4gICAgICAgICAgdGhpcy5zZWxlY3RDb250YWluZXJSZWYgPSByO1xuICAgICAgICB9fVxuICAgICAgPlxuICAgICAgICA8RHJvcERvd24gdmFsdWU9e2xpc3RbYWN0aXZlS2V5XX0gb3B0aW9ucz17c2VsZWN0T3B0aW9uc30gLz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH07XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgaWQsIGNsYXNzTmFtZSwgbGlzdCwgaGVpZ2h0IH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHZpc2libGVMaXN0ID0gdGhpcy5zdGF0ZS5sYXN0VmlzaWJsZUl0ZW1JbmRleCA+IC0yID8gbGlzdC5zbGljZSgwLCB0aGlzLnN0YXRlLmxhc3RWaXNpYmxlSXRlbUluZGV4ICsgMSkgOiBsaXN0O1xuICAgIGNvbnN0IGl0ZW1DbGFzc05hbWUgPSAncmVzcG9uc2l2ZS1uYXZiYXItaXRlbSBpbmFjdGl2ZS1ib3JkZXInO1xuICAgIGNvbnN0IGl0ZW1zID0gdmlzaWJsZUxpc3QubWFwKChpdGVtLCBpbmRleCkgPT4gdGhpcy5uYXZiYXJJdGVtKGl0ZW0sIGluZGV4LCBpdGVtQ2xhc3NOYW1lKSk7XG4gICAgY29uc3QgbGluZUNvdW50ID0gdGhpcy5kb0xpbmVDb3VudCgpO1xuICAgIGNvbnN0IG5hdmJhclN0eWxlID0ge1xuICAgICAgbWluSGVpZ2h0OiBoZWlnaHQsXG4gICAgICBtYXhIZWlnaHQ6IGhlaWdodCxcbiAgICB9O1xuICAgIGlmIChoZWlnaHQuc2xpY2UoLTIpID09PSAncHgnICYmIGxpbmVDb3VudCkge1xuICAgICAgY29uc3QgaGVpZ2h0UHggPSBwYXJzZUludChoZWlnaHQuc2xpY2UoMCwgLTIpLCAxMCk7XG4gICAgICBuYXZiYXJTdHlsZS5saW5lSGVpZ2h0ID0gYCR7aGVpZ2h0UHggLSA0fXB4YDtcbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXZcbiAgICAgICAgaWQ9e2Ake2lkfS1jb250YWluZXJgfVxuICAgICAgICByZWY9eyhyKSA9PiB7XG4gICAgICAgICAgdGhpcy5uYXZiYXJDb250YWluZXJSZWYgPSByO1xuICAgICAgICB9fVxuICAgICAgICBjbGFzc05hbWU9e2NsYXNzbmFtZXMoYHJlc3BvbnNpdmUtdGFiLXBpbGxzLWRyb3Bkb3duYCwgY2xhc3NOYW1lKX1cbiAgICAgICAgc3R5bGU9e25hdmJhclN0eWxlfVxuICAgICAgPlxuICAgICAgICB7aXRlbXN9XG4gICAgICAgIHt0aGlzLmNvbWJvYm94KCl9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG4iXX0=