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
          { className: 'responsive-navbar-item-text' },
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
          className: 'responsive-navbar-select ' + borderClass,
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
        className: (0, _classnames2.default)('responsive-navbar-container', className),
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yZXNwb25zaXZlLXRhYi1waWxscy5qc3giXSwibmFtZXMiOlsiUmVhY3QiLCJSZXNwb25zaXZlVGFiUGlsbHMiLCJwcm9wcyIsInN0YXRlIiwiZHJhZ0Zyb20iLCJkcmFnVG8iLCJpc1NlbGVjdFZpc2libGUiLCJsYXN0VmlzaWJsZUl0ZW1JbmRleCIsImdldExhc3RWaXNpYmxlSXRlbUluZGV4IiwibmF2QmFyV2lkdGgiLCJuYXZiYXJDb250YWluZXJSZWYiLCJvZmZzZXRXaWR0aCIsInNlbGVjdFdpZHRoIiwic2VsZWN0Q29udGFpbmVyUmVmIiwiY29tcG9uZW50TGVmdFdpZHRoIiwiY29tcG9uZW50TGVmdENvbnRhaW5lclJlZiIsImNvbXBvbmVudFJpZ2h0V2lkdGgiLCJjb21wb25lbnRSaWdodENvbnRhaW5lclJlZiIsInJlbWFpbmluZ1dpZHRoIiwibGFzdFZpc2libGUiLCJpIiwibGlzdCIsImxlbmd0aCIsIml0ZW1XaWR0aHMiLCJoYW5kbGVSZXNpemUiLCJyZWZyZXNoTGFzdFZpc2libGVJdGVtIiwic2V0U3RhdGUiLCJoYW5kbGVPbkNsaWNrIiwiaWQiLCJpbmRleCIsIm9uU2VsZWN0IiwiaGFuZGxlQ2xvc2UiLCJldmVudCIsInN0b3BQcm9wYWdhdGlvbiIsIm9uQ2xvc2UiLCJkcmFnU3RhcnQiLCJkcmFnRW50ZXIiLCJlIiwidGFyZ2V0IiwiY2xhc3NMaXN0IiwiYWRkIiwiZHJhZ0xlYXZlIiwicmVtb3ZlIiwiZHJhZ0Ryb3AiLCJvblJlb3JkZXIiLCJuZXdMaXN0Iiwic2xpY2UiLCJtb3ZlZCIsInNwbGljZSIsIm5hdmJhckl0ZW0iLCJpdGVtIiwiY2xhc3NOYW1lIiwiYWN0aXZlS2V5IiwiZm9udFdlaWdodCIsImZvbnRTaXplIiwiaGVpZ2h0IiwiYWxsb3dDbG9zZSIsIm5hdlJlbmRlcmVyIiwiYWxsb3dSZW9yZGVyIiwiYWN0aXZlS2V5SW5kZXgiLCJhY3RpdmVJdGVtSW5kZXgiLCJidXR0b25DbGFzcyIsInNlbGVjdGVkIiwiZHJhZ09wdGlvbnMiLCJvbkRyYWdTdGFydCIsIm9uRHJhZ0VudGVyIiwib25EcmFnTGVhdmUiLCJvbkRyYWdFbmQiLCJkcmFnZ2FibGUiLCJtaW5IZWlnaHQiLCJTdHJpbmciLCJyIiwibmFtZSIsImRvTGluZUNvdW50Iiwic29tZSIsInJlc29sdmVBY3RpdmVJdGVtRnJvbU9wdGlvbnMiLCJzZWxlY3RPcHRpb25zIiwiYWN0aXZlSXRlbSIsImZpbmQiLCJvcHRzIiwidmFsdWUiLCJmaW5kSW5kZXgiLCJjb21ib2JveCIsIm5hdkxpc3QiLCJtYXAiLCJyZWFsSW5kZXgiLCJkcm9wZG93bk9wdGlvbnMiLCJjbG9zZSIsIm9wdGlvbnMiLCJsaW5lQ291bnROZWVkZWQiLCJjdXN0b21Cb3JkZXJDbGFzcyIsImluYWN0aXZlQm9yZGVyIiwiYm9yZGVyQ2xhc3MiLCJjb21wb25lbnREaWRNb3VudCIsIndpbmRvdyIsImFkZEV2ZW50TGlzdGVuZXIiLCJjb21wb25lbnREaWRVcGRhdGUiLCJwcmV2UHJvcHMiLCJwcmV2U3RhdGUiLCJjb21wb25lbnRXaWxsVW5tb3VudCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJyZW5kZXIiLCJ2aXNpYmxlTGlzdCIsIml0ZW1DbGFzc05hbWUiLCJpdGVtcyIsImxpbmVDb3VudCIsIm5hdmJhclN0eWxlIiwibWF4SGVpZ2h0IiwiaGVpZ2h0UHgiLCJwYXJzZUludCIsImxpbmVIZWlnaHQiLCJDb21wb25lbnQiLCJkZWZhdWx0UHJvcHMiLCJwbGFjZWhvbGRlciIsImNvbXBvbmVudExlZnQiLCJjb21wb25lbnRSaWdodCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTs7SUFBWUEsSzs7QUFDWjs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0lBRXFCQyxrQjs7O0FBb0NuQiw4QkFBWUMsS0FBWixFQUFtQjtBQUFBOztBQUFBLGlEQUNqQiw0QkFBTUEsS0FBTixDQURpQjs7QUFBQSxVQUtuQkMsS0FMbUIsR0FLWDtBQUNOQyxnQkFBVSxJQURK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LFdBQVcsQ0FBdkM7QUFDRDtBQUNELFdBQ0U7QUFBQTtBQUFBO0FBQ0UsWUFBT2hGLEVBQVAsZUFERjtBQUVFLGFBQUssYUFBQzJDLENBQUQsRUFBTztBQUNWLGlCQUFLN0Qsa0JBQUwsR0FBMEI2RCxDQUExQjtBQUNELFNBSkg7QUFLRSxtQkFBVyx5REFBMENwQixTQUExQyxDQUxiO0FBTUUsZUFBT3VEO0FBTlQ7QUFRR0YsV0FSSDtBQVNHLFdBQUt0QixRQUFMO0FBVEgsS0FERjtBQWFELEc7OztFQWpUNkNsRixNQUFNK0csUyxVQXFCN0NDLFksR0FBZTtBQUNwQnBGLE1BQUksbUJBRGdCO0FBRXBCdUIsYUFBVyxFQUZTO0FBR3BCckIsWUFBVSxvQkFBTSxDQUFFLENBSEU7QUFJcEJJLFdBQVMsbUJBQU0sQ0FBRSxDQUpHO0FBS3BCc0IsY0FBWSxLQUxRO0FBTXBCRSxnQkFBYyxLQU5NO0FBT3BCSixZQUFVLFNBUFU7QUFRcEJELGNBQVksU0FSUTtBQVNwQjRELGVBQWEsU0FUTztBQVVwQjFELFVBQVEsRUFWWTtBQVdwQjJELGlCQUFlLElBWEs7QUFZcEJDLGtCQUFnQjtBQVpJLEM7a0JBckJIbEgsa0IiLCJmaWxlIjoicmVzcG9uc2l2ZS10YWItcGlsbHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IGNsYXNzbmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgeyBkZWJvdW5jZSB9IGZyb20gJ2RlYm91bmNlJztcbmltcG9ydCBEcm9wRG93biBmcm9tICcuL2Ryb3Bkb3duJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVzcG9uc2l2ZVRhYlBpbGxzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBpZDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBhbGxvd0Nsb3NlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBvbkNsb3NlOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBhbGxvd1Jlb3JkZXI6IFByb3BUeXBlcy5ib29sLFxuICAgIG5hdlJlbmRlcmVyOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBjbGFzc05hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgZm9udFNpemU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgZm9udFdlaWdodDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBhY3RpdmVLZXk6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zaGFwZSh7fSksIFByb3BUeXBlcy5udW1iZXJdKS5pc1JlcXVpcmVkLFxuICAgIGxpc3Q6IFByb3BUeXBlcy5hcnJheU9mKFxuICAgICAgUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgICAgbmFtZTogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLm5vZGVdKS5pc1JlcXVpcmVkLFxuICAgICAgICBpZDogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLm51bWJlcl0pLFxuICAgICAgfSlcbiAgICApLmlzUmVxdWlyZWQsXG4gICAgb25TZWxlY3Q6IFByb3BUeXBlcy5mdW5jLFxuICAgIGhlaWdodDogUHJvcFR5cGVzLnN0cmluZyxcbiAgfTtcblxuICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgIGlkOiAncmVzcG9uc2l2ZS1uYXZiYXInLFxuICAgIGNsYXNzTmFtZTogJycsXG4gICAgb25TZWxlY3Q6ICgpID0+IHt9LFxuICAgIG9uQ2xvc2U6ICgpID0+IHt9LFxuICAgIGFsbG93Q2xvc2U6IGZhbHNlLFxuICAgIGFsbG93UmVvcmRlcjogZmFsc2UsXG4gICAgZm9udFNpemU6ICdpbmhlcml0JyxcbiAgICBmb250V2VpZ2h0OiAnaW5oZXJpdCcsXG4gICAgcGxhY2Vob2xkZXI6ICdtb3JlLi4uJyxcbiAgICBoZWlnaHQ6IDMwLFxuICAgIGNvbXBvbmVudExlZnQ6IG51bGwsXG4gICAgY29tcG9uZW50UmlnaHQ6IG51bGwsXG4gIH07XG5cbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5pdGVtV2lkdGhzID0gW107IC8vIHN0b3JlIGl0ZW0gd2lkdGhzIGhlcmUsIHRoZXkgZG9uJ3QgY2hhbmdlXG4gIH1cblxuICBzdGF0ZSA9IHtcbiAgICBkcmFnRnJvbTogbnVsbCxcbiAgICBkcmFnVG86IG51bGwsXG4gICAgaXNTZWxlY3RWaXNpYmxlOiBmYWxzZSxcbiAgICBsYXN0VmlzaWJsZUl0ZW1JbmRleDogLTIsXG4gIH07XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuaGFuZGxlUmVzaXplKTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignb3JpZW50YXRpb25jaGFuZ2UnLCB0aGlzLnJlZnJlc2hMYXN0VmlzaWJsZUl0ZW0pOyAvLyBmb3IgbW9iaWxlIHN1cHBvcnRcbiAgICB0aGlzLnJlZnJlc2hMYXN0VmlzaWJsZUl0ZW0oKTtcbiAgfVxuXG4gIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHMsIHByZXZTdGF0ZSkge1xuICAgIC8vIFJlZnJlc2ggdmlzaWJsZSBpdGVtcyBpZiB2YWx1ZXMgY2hhbmdlXG4gICAgaWYgKHRoaXMuc3RhdGUuaXNTZWxlY3RWaXNpYmxlICE9PSBwcmV2U3RhdGUuaXNTZWxlY3RWaXNpYmxlIHx8IHRoaXMuc3RhdGUubGFzdFZpc2libGVJdGVtSW5kZXggIT09IHByZXZTdGF0ZS5sYXN0VmlzaWJsZUl0ZW1JbmRleCkge1xuICAgICAgdGhpcy5yZWZyZXNoTGFzdFZpc2libGVJdGVtKCk7XG4gICAgfVxuICB9XG5cbiAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuaGFuZGxlUmVzaXplKTtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignb3JpZW50YXRpb25jaGFuZ2UnLCB0aGlzLnJlZnJlc2hMYXN0VmlzaWJsZUl0ZW0pOyAvLyBmb3IgbW9iaWxlIHN1cHBvcnRcbiAgfVxuXG4gIGdldExhc3RWaXNpYmxlSXRlbUluZGV4ID0gKCkgPT4ge1xuICAgIGNvbnN0IG5hdkJhcldpZHRoID0gdGhpcy5uYXZiYXJDb250YWluZXJSZWYgPyB0aGlzLm5hdmJhckNvbnRhaW5lclJlZi5vZmZzZXRXaWR0aCA6IDA7XG4gICAgY29uc3Qgc2VsZWN0V2lkdGggPSB0aGlzLnNlbGVjdENvbnRhaW5lclJlZiA/IHRoaXMuc2VsZWN0Q29udGFpbmVyUmVmLm9mZnNldFdpZHRoIDogMDtcbiAgICBjb25zdCBjb21wb25lbnRMZWZ0V2lkdGggPSB0aGlzLmNvbXBvbmVudExlZnRDb250YWluZXJSZWYgPyB0aGlzLmNvbXBvbmVudExlZnRDb250YWluZXJSZWYub2Zmc2V0V2lkdGggOiAwOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgY29uc3QgY29tcG9uZW50UmlnaHRXaWR0aCA9IHRoaXMuY29tcG9uZW50UmlnaHRDb250YWluZXJSZWYgPyB0aGlzLmNvbXBvbmVudFJpZ2h0Q29udGFpbmVyUmVmLm9mZnNldFdpZHRoIDogMDsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuXG4gICAgbGV0IHJlbWFpbmluZ1dpZHRoID0gbmF2QmFyV2lkdGggLSBzZWxlY3RXaWR0aCAtIGNvbXBvbmVudExlZnRXaWR0aCAtIGNvbXBvbmVudFJpZ2h0V2lkdGg7XG4gICAgbGV0IGxhc3RWaXNpYmxlID0gMDtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5wcm9wcy5saXN0Lmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICByZW1haW5pbmdXaWR0aCAtPSB0aGlzLml0ZW1XaWR0aHNbaV07XG4gICAgICBpZiAocmVtYWluaW5nV2lkdGggPCAwKSB7XG4gICAgICAgIGxhc3RWaXNpYmxlIC09IDE7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgbGFzdFZpc2libGUgKz0gMTtcbiAgICB9XG5cbiAgICByZXR1cm4gbGFzdFZpc2libGU7XG4gIH07XG5cbiAgaGFuZGxlUmVzaXplID0gKCkgPT4gZGVib3VuY2UodGhpcy5yZWZyZXNoTGFzdFZpc2libGVJdGVtKCksIDMwMCk7XG5cbiAgcmVmcmVzaExhc3RWaXNpYmxlSXRlbSA9ICgpID0+IHtcbiAgICBjb25zdCBsYXN0VmlzaWJsZUl0ZW1JbmRleCA9IHRoaXMuZ2V0TGFzdFZpc2libGVJdGVtSW5kZXgoKTtcbiAgICBpZiAodGhpcy5zdGF0ZS5sYXN0VmlzaWJsZUl0ZW1JbmRleCAhPT0gbGFzdFZpc2libGVJdGVtSW5kZXgpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBpc1NlbGVjdFZpc2libGU6IHRoaXMucHJvcHMubGlzdC5sZW5ndGggPiBsYXN0VmlzaWJsZUl0ZW1JbmRleCArIDEsXG4gICAgICAgIGxhc3RWaXNpYmxlSXRlbUluZGV4LFxuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gIGhhbmRsZU9uQ2xpY2sgPSAoaWQsIGluZGV4KSA9PiB7XG4gICAgdGhpcy5wcm9wcy5vblNlbGVjdChpZCwgaW5kZXgpO1xuICB9O1xuXG4gIGhhbmRsZUNsb3NlID0gKGV2ZW50LCBpZCwgaW5kZXgpID0+IHtcbiAgICAvLyBkb24ndCBidWJibGUgdG8gY2xpY2sgYWxzbywgd2UgZ290IHJpZCBvZiB0aGlzXG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgdGhpcy5wcm9wcy5vbkNsb3NlKGlkLCBpbmRleCk7XG4gIH07XG5cbiAgZHJhZ1N0YXJ0ID0gKGluZGV4KSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBkcmFnRnJvbTogaW5kZXgsXG4gICAgfSk7XG4gIH07XG5cbiAgZHJhZ0VudGVyID0gKGluZGV4LCBlKSA9PiB7XG4gICAgZS50YXJnZXQuY2xhc3NMaXN0LmFkZCgnZHJvcHBhYmxlJyk7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBkcmFnVG86IGluZGV4LFxuICAgIH0pO1xuICB9O1xuXG4gIGRyYWdMZWF2ZSA9IChpbmRleCwgZSkgPT4ge1xuICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoJ2Ryb3BwYWJsZScpO1xuICB9O1xuXG4gIGRyYWdEcm9wID0gKCkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLm9uUmVvcmRlcikge1xuICAgICAgY29uc3QgeyBkcmFnRnJvbSwgZHJhZ1RvIH0gPSB0aGlzLnN0YXRlO1xuICAgICAgY29uc3QgbmV3TGlzdCA9IHRoaXMucHJvcHMubGlzdC5zbGljZSgpO1xuICAgICAgY29uc3QgbW92ZWQgPSBuZXdMaXN0W2RyYWdGcm9tXTtcblxuICAgICAgbmV3TGlzdC5zcGxpY2UoZHJhZ0Zyb20sIDEpO1xuICAgICAgbmV3TGlzdC5zcGxpY2UoZHJhZ1RvLCAwLCBtb3ZlZCk7XG5cbiAgICAgIHRoaXMucHJvcHMub25SZW9yZGVyKG5ld0xpc3QsIGRyYWdGcm9tLCBkcmFnVG8pO1xuICAgICAgdGhpcy5wcm9wcy5vblNlbGVjdChtb3ZlZCwgZHJhZ1RvKTtcblxuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIGRyYWdUbzogbnVsbCxcbiAgICAgICAgZHJhZ0Zyb206IG51bGwsXG4gICAgICB9KTtcbiAgICB9XG4gIH07XG5cbiAgLy8gUmVuZGVyIG5hdmJhciBpdGVtXG4gIG5hdmJhckl0ZW0gPSAoaXRlbSwgaW5kZXgsIGNsYXNzTmFtZSkgPT4ge1xuICAgIGNvbnN0IHsgYWN0aXZlS2V5LCBmb250V2VpZ2h0LCBmb250U2l6ZSwgaGVpZ2h0LCBhbGxvd0Nsb3NlLCBuYXZSZW5kZXJlciwgYWxsb3dSZW9yZGVyIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgaWYgKG5hdlJlbmRlcmVyKSB7XG4gICAgICByZXR1cm4gbmF2UmVuZGVyZXIoaXRlbSwgaW5kZXgsIGNsYXNzTmFtZSwgYWN0aXZlS2V5ID09PSBpbmRleCk7XG4gICAgfVxuXG4gICAgLy8gcmVzb2x2ZSBhY3RpdmVLZXlJbmRleFxuICAgIGxldCBhY3RpdmVLZXlJbmRleCA9IGFjdGl2ZUtleTtcbiAgICBpZiAodHlwZW9mIGFjdGl2ZUtleSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGFjdGl2ZUtleUluZGV4ID0gdGhpcy5hY3RpdmVJdGVtSW5kZXgoYWN0aXZlS2V5KTtcbiAgICB9XG5cbiAgICBjb25zdCBidXR0b25DbGFzcyA9IGNsYXNzbmFtZXMoY2xhc3NOYW1lLCAnZ3JhYmJhYmxlJywge1xuICAgICAgc2VsZWN0ZWQ6IGluZGV4ID09PSBhY3RpdmVLZXlJbmRleCxcbiAgICAgICd3aXRoLWNsb3NlJzogYWxsb3dDbG9zZSxcbiAgICB9KTtcblxuICAgIGNvbnN0IGRyYWdPcHRpb25zID0gYWxsb3dSZW9yZGVyXG4gICAgICA/IHtcbiAgICAgICAgICBvbkRyYWdTdGFydDogKGUpID0+IHRoaXMuZHJhZ1N0YXJ0KGluZGV4LCBlKSxcbiAgICAgICAgICBvbkRyYWdFbnRlcjogKGUpID0+IHRoaXMuZHJhZ0VudGVyKGluZGV4LCBlKSxcbiAgICAgICAgICBvbkRyYWdMZWF2ZTogKGUpID0+IHRoaXMuZHJhZ0xlYXZlKGluZGV4LCBlKSxcbiAgICAgICAgICBvbkRyYWdFbmQ6IHRoaXMuZHJhZ0Ryb3AsXG4gICAgICAgICAgZHJhZ2dhYmxlOiB0cnVlLFxuICAgICAgICB9XG4gICAgICA6IHt9O1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxidXR0b25cbiAgICAgICAgey4uLmRyYWdPcHRpb25zfVxuICAgICAgICBjbGFzc05hbWU9e2J1dHRvbkNsYXNzfVxuICAgICAgICBzdHlsZT17eyBmb250V2VpZ2h0LCBmb250U2l6ZSwgbWluSGVpZ2h0OiBoZWlnaHQgfX1cbiAgICAgICAgaWQ9e2l0ZW0uaWQgfHwgYG5hdkl0ZW0ke1N0cmluZyhpbmRleCl9YH1cbiAgICAgICAga2V5PXtpdGVtLmlkIHx8IGBuYXZpdGVtJHtTdHJpbmcoaW5kZXgpfWB9XG4gICAgICAgIG9uQ2xpY2s9eygpID0+IHRoaXMuaGFuZGxlT25DbGljayhpdGVtLmlkLCBpbmRleCl9XG4gICAgICAgIHJlZj17KHIpID0+IHtcbiAgICAgICAgICBpZiAociAmJiAhdGhpcy5pdGVtV2lkdGhzW2luZGV4XSkgdGhpcy5pdGVtV2lkdGhzW2luZGV4XSA9IHIub2Zmc2V0V2lkdGg7XG4gICAgICAgIH19XG4gICAgICA+XG4gICAgICAgIDxzcGFuIGNsYXNzTmFtZT0ncmVzcG9uc2l2ZS1uYXZiYXItaXRlbS10ZXh0Jz5cbiAgICAgICAgICB7aXRlbS5uYW1lfVxuICAgICAgICAgIHsvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUganN4LWExMXkvY2xpY2stZXZlbnRzLWhhdmUta2V5LWV2ZW50cyAqL31cbiAgICAgICAgICB7YWxsb3dDbG9zZSAmJiA8aSB0YWJJbmRleD17aW5kZXggKyAxfSByb2xlPSdidXR0b24nIGNsYXNzTmFtZT0nZmEgZmEtdGltZXMnIG9uQ2xpY2s9eyhldmVudCkgPT4gdGhpcy5oYW5kbGVDbG9zZShldmVudCwgaXRlbS5pZCwgaW5kZXgpfSAvPn1cbiAgICAgICAgPC9zcGFuPlxuICAgICAgPC9idXR0b24+XG4gICAgKTtcbiAgfTtcblxuICBkb0xpbmVDb3VudCA9ICgpID0+IHtcbiAgICBjb25zdCB7IGxpc3QgfSA9IHRoaXMucHJvcHM7XG4gICAgcmV0dXJuIGxpc3Quc29tZSgoaXRlbSkgPT4gdHlwZW9mIGl0ZW0ubmFtZSAhPT0gJ3N0cmluZycpO1xuICB9O1xuXG4gIHJlc29sdmVBY3RpdmVJdGVtRnJvbU9wdGlvbnMgPSAoc2VsZWN0T3B0aW9ucykgPT4ge1xuICAgIGNvbnN0IHsgYWN0aXZlS2V5IH0gPSB0aGlzLnByb3BzO1xuICAgIGxldCBhY3RpdmVJdGVtID0gc2VsZWN0T3B0aW9ucy5maW5kKChvcHRzKSA9PiBvcHRzLnZhbHVlID09PSBhY3RpdmVLZXkpO1xuICAgIGlmICghYWN0aXZlSXRlbSkge1xuICAgICAgYWN0aXZlSXRlbSA9IHNlbGVjdE9wdGlvbnMuZmluZCgob3B0cykgPT4gb3B0cy52YWx1ZSA9PT0gYWN0aXZlS2V5LnZhbHVlKTtcbiAgICB9XG4gICAgcmV0dXJuIGFjdGl2ZUl0ZW07XG4gIH07XG5cbiAgYWN0aXZlSXRlbUluZGV4ID0gKGFjdGl2ZUl0ZW0pID0+IHtcbiAgICBjb25zdCB7IGxpc3QgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKCFhY3RpdmVJdGVtKSByZXR1cm4gbnVsbDtcbiAgICByZXR1cm4gbGlzdC5maW5kSW5kZXgoKGl0ZW0pID0+IGl0ZW0uaWQgPT09IGFjdGl2ZUl0ZW0udmFsdWUpO1xuICB9O1xuXG4gIC8vIFJlbmRlciBjb21ib2JveCwgd2hlbiBhbGwgaXRlbXMgZG8gbm90IGZpdFxuICBjb21ib2JveCA9ICgpID0+IHtcbiAgICBjb25zdCB7IGlkLCBsaXN0LCBmb250U2l6ZSwgZm9udFdlaWdodCwgYWxsb3dSZW9yZGVyLCBhY3RpdmVLZXksIGFsbG93Q2xvc2UgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKCF0aGlzLnN0YXRlLmlzU2VsZWN0VmlzaWJsZSkge1xuICAgICAgLy8gcmV0dXJuIG51bGwgaWYgYWxsIG5hdiBpdGVtcyBhcmUgdmlzaWJsZVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgLy8gc2xpY2UgbmF2IGl0ZW1zIGxpc3QgYW5kIHNob3cgaW52aXNpYmxlIGl0ZW1zIGluIHRoZSBjb21ib2JveFxuICAgIGNvbnN0IG5hdkxpc3QgPSB0aGlzLnN0YXRlLmxhc3RWaXNpYmxlSXRlbUluZGV4ID4gLTIgPyBsaXN0LnNsaWNlKHRoaXMuc3RhdGUubGFzdFZpc2libGVJdGVtSW5kZXggKyAxKSA6IGxpc3Q7XG4gICAgY29uc3Qgc2VsZWN0T3B0aW9ucyA9IG5hdkxpc3QubWFwKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgY29uc3QgcmVhbEluZGV4ID0gaW5kZXggKyB0aGlzLnN0YXRlLmxhc3RWaXNpYmxlSXRlbUluZGV4ICsgMTtcblxuICAgICAgY29uc3QgZHJhZ09wdGlvbnMgPSBhbGxvd1Jlb3JkZXJcbiAgICAgICAgPyB7XG4gICAgICAgICAgb25EcmFnU3RhcnQ6IChlKSA9PiB0aGlzLmRyYWdTdGFydChyZWFsSW5kZXgsIGUpLFxuICAgICAgICAgIG9uRHJhZ0VudGVyOiAoZSkgPT4gdGhpcy5kcmFnRW50ZXIocmVhbEluZGV4LCBlKSxcbiAgICAgICAgICBvbkRyYWdMZWF2ZTogKGUpID0+IHRoaXMuZHJhZ0xlYXZlKGluZGV4LCBlKSxcbiAgICAgICAgICBvbkRyYWdFbmQ6IHRoaXMuZHJhZ0Ryb3AsXG4gICAgICAgICAgZHJhZ2dhYmxlOiB0cnVlLFxuICAgICAgICB9XG4gICAgICAgIDoge307XG5cbiAgICAgIGNvbnN0IGRyb3Bkb3duT3B0aW9ucyA9IHtcbiAgICAgICAgY2xhc3NOYW1lOiBjbGFzc25hbWVzKCdkcm9wZG93bi1vcHRpb24nLCB7IHNlbGVjdGVkOiBsaXN0W2FjdGl2ZUtleV0uaWQgPT09IGl0ZW0uaWQgfSksXG4gICAgICAgIGNsb3NlOiBhbGxvd0Nsb3NlID8gKFxuICAgICAgICAgIDxpIHJvbGU9J2J1dHRvbicgY2xhc3NOYW1lPSdmYSBmYS10aW1lcycgb25DbGljaz17KGV2ZW50KSA9PiB0aGlzLmhhbmRsZUNsb3NlKGV2ZW50LCBpdGVtLmlkLCByZWFsSW5kZXgpfSAvPlxuICAgICAgICApIDogbnVsbCxcbiAgICAgICAgb25TZWxlY3Q6ICgpID0+IHtcbiAgICAgICAgICB0aGlzLmhhbmRsZU9uQ2xpY2soaXRlbS5pZCwgcmVhbEluZGV4KTtcbiAgICAgICAgfSxcbiAgICAgICAgLi4uZHJhZ09wdGlvbnNcbiAgICAgIH07XG5cblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uaXRlbSxcbiAgICAgICAgb3B0aW9uczogZHJvcGRvd25PcHRpb25zXG4gICAgICB9O1xuICAgIH0pO1xuXG4gICAgY29uc3QgbGluZUNvdW50TmVlZGVkID0gdGhpcy5kb0xpbmVDb3VudCgpO1xuICAgIGNvbnN0IGN1c3RvbUJvcmRlckNsYXNzID0gbGluZUNvdW50TmVlZGVkID8gJ3NlbGVjdGVkIGxpbmUtY291bnQnIDogJ3NlbGVjdGVkJztcbiAgICBjb25zdCBpbmFjdGl2ZUJvcmRlciA9IGxpbmVDb3VudE5lZWRlZCA/ICdpbmFjdGl2ZSBsaW5lLWNvdW50JyA6ICdpbmFjdGl2ZSc7XG4gICAgLy8gUmVzb2x2ZSBhY3RpdmVJdGVtXG4gICAgY29uc3QgYWN0aXZlSXRlbSA9IHRoaXMucmVzb2x2ZUFjdGl2ZUl0ZW1Gcm9tT3B0aW9ucyhzZWxlY3RPcHRpb25zKTtcbiAgICBjb25zdCBhY3RpdmVJdGVtSW5kZXggPSB0aGlzLmFjdGl2ZUl0ZW1JbmRleChhY3RpdmVJdGVtKTtcbiAgICBjb25zdCBib3JkZXJDbGFzcyA9IGFjdGl2ZUl0ZW1JbmRleCA+PSB0aGlzLnN0YXRlLmxhc3RWaXNpYmxlSXRlbUluZGV4ICsgMSA/IGN1c3RvbUJvcmRlckNsYXNzIDogaW5hY3RpdmVCb3JkZXI7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2XG4gICAgICAgIGlkPXtgJHtpZH0tc2VsZWN0YH1cbiAgICAgICAgY2xhc3NOYW1lPXtgcmVzcG9uc2l2ZS1uYXZiYXItc2VsZWN0ICR7Ym9yZGVyQ2xhc3N9YH1cbiAgICAgICAgc3R5bGU9e3sgZm9udFdlaWdodCwgZm9udFNpemUgfX1cbiAgICAgICAgcmVmPXsocikgPT4ge1xuICAgICAgICAgIHRoaXMuc2VsZWN0Q29udGFpbmVyUmVmID0gcjtcbiAgICAgICAgfX1cbiAgICAgID5cbiAgICAgICAgPERyb3BEb3duIHZhbHVlPXtsaXN0W2FjdGl2ZUtleV19IG9wdGlvbnM9e3NlbGVjdE9wdGlvbnN9IC8+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9O1xuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IGlkLCBjbGFzc05hbWUsIGxpc3QsIGhlaWdodCB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB2aXNpYmxlTGlzdCA9IHRoaXMuc3RhdGUubGFzdFZpc2libGVJdGVtSW5kZXggPiAtMiA/IGxpc3Quc2xpY2UoMCwgdGhpcy5zdGF0ZS5sYXN0VmlzaWJsZUl0ZW1JbmRleCArIDEpIDogbGlzdDtcbiAgICBjb25zdCBpdGVtQ2xhc3NOYW1lID0gJ3Jlc3BvbnNpdmUtbmF2YmFyLWl0ZW0gaW5hY3RpdmUtYm9yZGVyJztcbiAgICBjb25zdCBpdGVtcyA9IHZpc2libGVMaXN0Lm1hcCgoaXRlbSwgaW5kZXgpID0+IHRoaXMubmF2YmFySXRlbShpdGVtLCBpbmRleCwgaXRlbUNsYXNzTmFtZSkpO1xuICAgIGNvbnN0IGxpbmVDb3VudCA9IHRoaXMuZG9MaW5lQ291bnQoKTtcbiAgICBjb25zdCBuYXZiYXJTdHlsZSA9IHtcbiAgICAgIG1pbkhlaWdodDogaGVpZ2h0LFxuICAgICAgbWF4SGVpZ2h0OiBoZWlnaHQsXG4gICAgfTtcbiAgICBpZiAoaGVpZ2h0LnNsaWNlKC0yKSA9PT0gJ3B4JyAmJiBsaW5lQ291bnQpIHtcbiAgICAgIGNvbnN0IGhlaWdodFB4ID0gcGFyc2VJbnQoaGVpZ2h0LnNsaWNlKDAsIC0yKSwgMTApO1xuICAgICAgbmF2YmFyU3R5bGUubGluZUhlaWdodCA9IGAke2hlaWdodFB4IC0gNH1weGA7XG4gICAgfVxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2XG4gICAgICAgIGlkPXtgJHtpZH0tY29udGFpbmVyYH1cbiAgICAgICAgcmVmPXsocikgPT4ge1xuICAgICAgICAgIHRoaXMubmF2YmFyQ29udGFpbmVyUmVmID0gcjtcbiAgICAgICAgfX1cbiAgICAgICAgY2xhc3NOYW1lPXtjbGFzc25hbWVzKGByZXNwb25zaXZlLW5hdmJhci1jb250YWluZXJgLCBjbGFzc05hbWUpfVxuICAgICAgICBzdHlsZT17bmF2YmFyU3R5bGV9XG4gICAgICA+XG4gICAgICAgIHtpdGVtc31cbiAgICAgICAge3RoaXMuY29tYm9ib3goKX1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cbiJdfQ==