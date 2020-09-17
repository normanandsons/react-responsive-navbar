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
      _this.props.onSelect(id, index, _this.props.list[index]);
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

      var buttonClass = (0, _classnames2.default)(className, {
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
          { className: 'tab-pill-inner' },
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
          className: (0, _classnames2.default)('dropdown-option', { 'with-close': allowClose, selected: list[activeKey].id === item.id }),
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
      // Resolve activeItem
      var activeItem = _this.resolveActiveItemFromOptions(selectOptions);
      var activeItemIndex = _this.activeItemIndex(activeItem);
      var borderClass = activeItemIndex >= _this.state.lastVisibleItemIndex + 1 ? customBorderClass : '';

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
    var itemClassName = 'tab-pill-item';
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
        className: (0, _classnames2.default)('responsive-tab-pills-container', className),
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yZXNwb25zaXZlLXRhYi1waWxscy5qc3giXSwibmFtZXMiOlsiUmVhY3QiLCJSZXNwb25zaXZlVGFiUGlsbHMiLCJwcm9wcyIsInN0YXRlIiwiZHJhZ0Zyb20iLCJkcmFnVG8iLCJpc1NlbGVjdFZpc2libGUiLCJsYXN0VmlzaWJsZUl0ZW1JbmRleCIsImdldExhc3RWaXNpYmxlSXRlbUluZGV4IiwibmF2QmFyV2lkdGgiLCJuYXZiYXJDb250YWluZXJSZWYiLCJvZmZzZXRXaWR0aCIsInNlbGVjdFdpZHRoIiwic2VsZWN0Q29udGFpbmVyUmVmIiwiY29tcG9uZW50TGVmdFdpZHRoIiwiY29tcG9uZW50TGVmdENvbnRhaW5lclJlZiIsImNvbXBvbmVudFJpZ2h0V2lkdGgiLCJjb21wb25lbnRSaWdodENvbnRhaW5lclJlZiIsInJlbWFpbmluZ1dpZHRoIiwibGFzdFZpc2libGUiLCJpIiwibGlzdCIsImxlbmd0aCIsIml0ZW1XaWR0aHMiLCJoYW5kbGVSZXNpemUiLCJyZWZyZXNoTGFzdFZpc2libGVJdGVtIiwic2V0U3RhdGUiLCJoYW5kbGVPbkNsaWNrIiwiaWQiLCJpbmRleCIsIm9uU2VsZWN0IiwiaGFuZGxlQ2xvc2UiLCJldmVudCIsInN0b3BQcm9wYWdhdGlvbiIsIm9uQ2xvc2UiLCJkcmFnU3RhcnQiLCJkcmFnRW50ZXIiLCJlIiwidGFyZ2V0IiwiY2xhc3NMaXN0IiwiYWRkIiwiZHJhZ0xlYXZlIiwicmVtb3ZlIiwiZHJhZ0Ryb3AiLCJvblJlb3JkZXIiLCJuZXdMaXN0Iiwic2xpY2UiLCJtb3ZlZCIsInNwbGljZSIsIm5hdmJhckl0ZW0iLCJpdGVtIiwiY2xhc3NOYW1lIiwiYWN0aXZlS2V5IiwiZm9udFdlaWdodCIsImZvbnRTaXplIiwiaGVpZ2h0IiwiYWxsb3dDbG9zZSIsIm5hdlJlbmRlcmVyIiwiYWxsb3dSZW9yZGVyIiwiYWN0aXZlS2V5SW5kZXgiLCJhY3RpdmVJdGVtSW5kZXgiLCJidXR0b25DbGFzcyIsInNlbGVjdGVkIiwiZHJhZ09wdGlvbnMiLCJvbkRyYWdTdGFydCIsIm9uRHJhZ0VudGVyIiwib25EcmFnTGVhdmUiLCJvbkRyYWdFbmQiLCJkcmFnZ2FibGUiLCJtaW5IZWlnaHQiLCJTdHJpbmciLCJyIiwibmFtZSIsImRvTGluZUNvdW50Iiwic29tZSIsInJlc29sdmVBY3RpdmVJdGVtRnJvbU9wdGlvbnMiLCJzZWxlY3RPcHRpb25zIiwiYWN0aXZlSXRlbSIsImZpbmQiLCJvcHRzIiwidmFsdWUiLCJmaW5kSW5kZXgiLCJjb21ib2JveCIsIm5hdkxpc3QiLCJtYXAiLCJyZWFsSW5kZXgiLCJkcm9wZG93bk9wdGlvbnMiLCJjbG9zZSIsIm9wdGlvbnMiLCJsaW5lQ291bnROZWVkZWQiLCJjdXN0b21Cb3JkZXJDbGFzcyIsImJvcmRlckNsYXNzIiwiY29tcG9uZW50RGlkTW91bnQiLCJ3aW5kb3ciLCJhZGRFdmVudExpc3RlbmVyIiwiY29tcG9uZW50RGlkVXBkYXRlIiwicHJldlByb3BzIiwicHJldlN0YXRlIiwiY29tcG9uZW50V2lsbFVubW91bnQiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwicmVuZGVyIiwidmlzaWJsZUxpc3QiLCJpdGVtQ2xhc3NOYW1lIiwiaXRlbXMiLCJsaW5lQ291bnQiLCJuYXZiYXJTdHlsZSIsIm1heEhlaWdodCIsImhlaWdodFB4IiwicGFyc2VJbnQiLCJsaW5lSGVpZ2h0IiwiQ29tcG9uZW50IiwiZGVmYXVsdFByb3BzIiwicGxhY2Vob2xkZXIiLCJjb21wb25lbnRMZWZ0IiwiY29tcG9uZW50UmlnaHQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUE7O0lBQVlBLEs7O0FBQ1o7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7OztJQUVxQkMsa0I7OztBQW9DbkIsOEJBQVlDLEtBQVosRUFBbUI7QUFBQTs7QUFBQSxpREFDakIsNEJBQU1BLEtBQU4sQ0FEaUI7O0FBQUEsVUFLbkJDLEtBTG1CLEdBS1g7QUFDTkMsZ0JBQVUsSUFESjtBQUVOQyxjQUFRLElBRkY7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LFdBQ0U7QUFBQTtBQUFBO0FBQ0UsWUFBTy9FLEVBQVAsZUFERjtBQUVFLGFBQUssYUFBQzJDLENBQUQsRUFBTztBQUNWLGlCQUFLN0Qsa0JBQUwsR0FBMEI2RCxDQUExQjtBQUNELFNBSkg7QUFLRSxtQkFBVyw0REFBNkNwQixTQUE3QyxDQUxiO0FBTUUsZUFBT3NEO0FBTlQ7QUFRR0YsV0FSSDtBQVNHLFdBQUtyQixRQUFMO0FBVEgsS0FERjtBQWFELEc7OztFQTdTNkNsRixNQUFNOEcsUyxVQXFCN0NDLFksR0FBZTtBQUNwQm5GLE1BQUksbUJBRGdCO0FBRXBCdUIsYUFBVyxFQUZTO0FBR3BCckIsWUFBVSxvQkFBTSxDQUFFLENBSEU7QUFJcEJJLFdBQVMsbUJBQU0sQ0FBRSxDQUpHO0FBS3BCc0IsY0FBWSxLQUxRO0FBTXBCRSxnQkFBYyxLQU5NO0FBT3BCSixZQUFVLFNBUFU7QUFRcEJELGNBQVksU0FSUTtBQVNwQjJELGVBQWEsU0FUTztBQVVwQnpELFVBQVEsRUFWWTtBQVdwQjBELGlCQUFlLElBWEs7QUFZcEJDLGtCQUFnQjtBQVpJLEM7a0JBckJIakgsa0IiLCJmaWxlIjoicmVzcG9uc2l2ZS10YWItcGlsbHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IGNsYXNzbmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgeyBkZWJvdW5jZSB9IGZyb20gJ2RlYm91bmNlJztcbmltcG9ydCBEcm9wRG93biBmcm9tICcuL2Ryb3Bkb3duJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVzcG9uc2l2ZVRhYlBpbGxzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBpZDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBhbGxvd0Nsb3NlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBvbkNsb3NlOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBhbGxvd1Jlb3JkZXI6IFByb3BUeXBlcy5ib29sLFxuICAgIG5hdlJlbmRlcmVyOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBjbGFzc05hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgZm9udFNpemU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgZm9udFdlaWdodDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBhY3RpdmVLZXk6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zaGFwZSh7fSksIFByb3BUeXBlcy5udW1iZXJdKS5pc1JlcXVpcmVkLFxuICAgIGxpc3Q6IFByb3BUeXBlcy5hcnJheU9mKFxuICAgICAgUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgICAgbmFtZTogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLm5vZGVdKS5pc1JlcXVpcmVkLFxuICAgICAgICBpZDogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLm51bWJlcl0pLFxuICAgICAgfSlcbiAgICApLmlzUmVxdWlyZWQsXG4gICAgb25TZWxlY3Q6IFByb3BUeXBlcy5mdW5jLFxuICAgIGhlaWdodDogUHJvcFR5cGVzLnN0cmluZyxcbiAgfTtcblxuICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgIGlkOiAncmVzcG9uc2l2ZS1uYXZiYXInLFxuICAgIGNsYXNzTmFtZTogJycsXG4gICAgb25TZWxlY3Q6ICgpID0+IHt9LFxuICAgIG9uQ2xvc2U6ICgpID0+IHt9LFxuICAgIGFsbG93Q2xvc2U6IGZhbHNlLFxuICAgIGFsbG93UmVvcmRlcjogZmFsc2UsXG4gICAgZm9udFNpemU6ICdpbmhlcml0JyxcbiAgICBmb250V2VpZ2h0OiAnaW5oZXJpdCcsXG4gICAgcGxhY2Vob2xkZXI6ICdtb3JlLi4uJyxcbiAgICBoZWlnaHQ6IDMwLFxuICAgIGNvbXBvbmVudExlZnQ6IG51bGwsXG4gICAgY29tcG9uZW50UmlnaHQ6IG51bGwsXG4gIH07XG5cbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5pdGVtV2lkdGhzID0gW107IC8vIHN0b3JlIGl0ZW0gd2lkdGhzIGhlcmUsIHRoZXkgZG9uJ3QgY2hhbmdlXG4gIH1cblxuICBzdGF0ZSA9IHtcbiAgICBkcmFnRnJvbTogbnVsbCxcbiAgICBkcmFnVG86IG51bGwsXG4gICAgaXNTZWxlY3RWaXNpYmxlOiBmYWxzZSxcbiAgICBsYXN0VmlzaWJsZUl0ZW1JbmRleDogLTIsXG4gIH07XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuaGFuZGxlUmVzaXplKTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignb3JpZW50YXRpb25jaGFuZ2UnLCB0aGlzLnJlZnJlc2hMYXN0VmlzaWJsZUl0ZW0pOyAvLyBmb3IgbW9iaWxlIHN1cHBvcnRcbiAgICB0aGlzLnJlZnJlc2hMYXN0VmlzaWJsZUl0ZW0oKTtcbiAgfVxuXG4gIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHMsIHByZXZTdGF0ZSkge1xuICAgIC8vIFJlZnJlc2ggdmlzaWJsZSBpdGVtcyBpZiB2YWx1ZXMgY2hhbmdlXG4gICAgaWYgKHRoaXMuc3RhdGUuaXNTZWxlY3RWaXNpYmxlICE9PSBwcmV2U3RhdGUuaXNTZWxlY3RWaXNpYmxlIHx8IHRoaXMuc3RhdGUubGFzdFZpc2libGVJdGVtSW5kZXggIT09IHByZXZTdGF0ZS5sYXN0VmlzaWJsZUl0ZW1JbmRleCkge1xuICAgICAgdGhpcy5yZWZyZXNoTGFzdFZpc2libGVJdGVtKCk7XG4gICAgfVxuICB9XG5cbiAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuaGFuZGxlUmVzaXplKTtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignb3JpZW50YXRpb25jaGFuZ2UnLCB0aGlzLnJlZnJlc2hMYXN0VmlzaWJsZUl0ZW0pOyAvLyBmb3IgbW9iaWxlIHN1cHBvcnRcbiAgfVxuXG4gIGdldExhc3RWaXNpYmxlSXRlbUluZGV4ID0gKCkgPT4ge1xuICAgIGNvbnN0IG5hdkJhcldpZHRoID0gdGhpcy5uYXZiYXJDb250YWluZXJSZWYgPyB0aGlzLm5hdmJhckNvbnRhaW5lclJlZi5vZmZzZXRXaWR0aCA6IDA7XG4gICAgY29uc3Qgc2VsZWN0V2lkdGggPSB0aGlzLnNlbGVjdENvbnRhaW5lclJlZiA/IHRoaXMuc2VsZWN0Q29udGFpbmVyUmVmLm9mZnNldFdpZHRoIDogMDtcbiAgICBjb25zdCBjb21wb25lbnRMZWZ0V2lkdGggPSB0aGlzLmNvbXBvbmVudExlZnRDb250YWluZXJSZWYgPyB0aGlzLmNvbXBvbmVudExlZnRDb250YWluZXJSZWYub2Zmc2V0V2lkdGggOiAwOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgY29uc3QgY29tcG9uZW50UmlnaHRXaWR0aCA9IHRoaXMuY29tcG9uZW50UmlnaHRDb250YWluZXJSZWYgPyB0aGlzLmNvbXBvbmVudFJpZ2h0Q29udGFpbmVyUmVmLm9mZnNldFdpZHRoIDogMDsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuXG4gICAgbGV0IHJlbWFpbmluZ1dpZHRoID0gbmF2QmFyV2lkdGggLSBzZWxlY3RXaWR0aCAtIGNvbXBvbmVudExlZnRXaWR0aCAtIGNvbXBvbmVudFJpZ2h0V2lkdGg7XG4gICAgbGV0IGxhc3RWaXNpYmxlID0gMDtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5wcm9wcy5saXN0Lmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICByZW1haW5pbmdXaWR0aCAtPSB0aGlzLml0ZW1XaWR0aHNbaV07XG4gICAgICBpZiAocmVtYWluaW5nV2lkdGggPCAwKSB7XG4gICAgICAgIGxhc3RWaXNpYmxlIC09IDE7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgbGFzdFZpc2libGUgKz0gMTtcbiAgICB9XG5cbiAgICByZXR1cm4gbGFzdFZpc2libGU7XG4gIH07XG5cbiAgaGFuZGxlUmVzaXplID0gKCkgPT4gZGVib3VuY2UodGhpcy5yZWZyZXNoTGFzdFZpc2libGVJdGVtKCksIDMwMCk7XG5cbiAgcmVmcmVzaExhc3RWaXNpYmxlSXRlbSA9ICgpID0+IHtcbiAgICBjb25zdCBsYXN0VmlzaWJsZUl0ZW1JbmRleCA9IHRoaXMuZ2V0TGFzdFZpc2libGVJdGVtSW5kZXgoKTtcbiAgICBpZiAodGhpcy5zdGF0ZS5sYXN0VmlzaWJsZUl0ZW1JbmRleCAhPT0gbGFzdFZpc2libGVJdGVtSW5kZXgpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBpc1NlbGVjdFZpc2libGU6IHRoaXMucHJvcHMubGlzdC5sZW5ndGggPiBsYXN0VmlzaWJsZUl0ZW1JbmRleCArIDEsXG4gICAgICAgIGxhc3RWaXNpYmxlSXRlbUluZGV4LFxuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gIGhhbmRsZU9uQ2xpY2sgPSAoaWQsIGluZGV4KSA9PiB7XG4gICAgdGhpcy5wcm9wcy5vblNlbGVjdChpZCwgaW5kZXgsIHRoaXMucHJvcHMubGlzdFtpbmRleF0pO1xuICB9O1xuXG4gIGhhbmRsZUNsb3NlID0gKGV2ZW50LCBpZCwgaW5kZXgpID0+IHtcbiAgICAvLyBkb24ndCBidWJibGUgdG8gY2xpY2sgYWxzbywgd2UgZ290IHJpZCBvZiB0aGlzXG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgdGhpcy5wcm9wcy5vbkNsb3NlKGlkLCBpbmRleCk7XG4gIH07XG5cbiAgZHJhZ1N0YXJ0ID0gKGluZGV4KSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBkcmFnRnJvbTogaW5kZXgsXG4gICAgfSk7XG4gIH07XG5cbiAgZHJhZ0VudGVyID0gKGluZGV4LCBlKSA9PiB7XG4gICAgZS50YXJnZXQuY2xhc3NMaXN0LmFkZCgnZHJvcHBhYmxlJyk7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBkcmFnVG86IGluZGV4LFxuICAgIH0pO1xuICB9O1xuXG4gIGRyYWdMZWF2ZSA9IChpbmRleCwgZSkgPT4ge1xuICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoJ2Ryb3BwYWJsZScpO1xuICB9O1xuXG4gIGRyYWdEcm9wID0gKCkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLm9uUmVvcmRlcikge1xuICAgICAgY29uc3QgeyBkcmFnRnJvbSwgZHJhZ1RvIH0gPSB0aGlzLnN0YXRlO1xuICAgICAgY29uc3QgbmV3TGlzdCA9IHRoaXMucHJvcHMubGlzdC5zbGljZSgpO1xuICAgICAgY29uc3QgbW92ZWQgPSBuZXdMaXN0W2RyYWdGcm9tXTtcblxuICAgICAgbmV3TGlzdC5zcGxpY2UoZHJhZ0Zyb20sIDEpO1xuICAgICAgbmV3TGlzdC5zcGxpY2UoZHJhZ1RvLCAwLCBtb3ZlZCk7XG5cbiAgICAgIHRoaXMucHJvcHMub25SZW9yZGVyKG5ld0xpc3QsIGRyYWdGcm9tLCBkcmFnVG8pO1xuICAgICAgdGhpcy5wcm9wcy5vblNlbGVjdChtb3ZlZCwgZHJhZ1RvKTtcblxuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIGRyYWdUbzogbnVsbCxcbiAgICAgICAgZHJhZ0Zyb206IG51bGwsXG4gICAgICB9KTtcbiAgICB9XG4gIH07XG5cbiAgLy8gUmVuZGVyIG5hdmJhciBpdGVtXG4gIG5hdmJhckl0ZW0gPSAoaXRlbSwgaW5kZXgsIGNsYXNzTmFtZSkgPT4ge1xuICAgIGNvbnN0IHsgYWN0aXZlS2V5LCBmb250V2VpZ2h0LCBmb250U2l6ZSwgaGVpZ2h0LCBhbGxvd0Nsb3NlLCBuYXZSZW5kZXJlciwgYWxsb3dSZW9yZGVyIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgaWYgKG5hdlJlbmRlcmVyKSB7XG4gICAgICByZXR1cm4gbmF2UmVuZGVyZXIoaXRlbSwgaW5kZXgsIGNsYXNzTmFtZSwgYWN0aXZlS2V5ID09PSBpbmRleCk7XG4gICAgfVxuXG4gICAgLy8gcmVzb2x2ZSBhY3RpdmVLZXlJbmRleFxuICAgIGxldCBhY3RpdmVLZXlJbmRleCA9IGFjdGl2ZUtleTtcbiAgICBpZiAodHlwZW9mIGFjdGl2ZUtleSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGFjdGl2ZUtleUluZGV4ID0gdGhpcy5hY3RpdmVJdGVtSW5kZXgoYWN0aXZlS2V5KTtcbiAgICB9XG5cbiAgICBjb25zdCBidXR0b25DbGFzcyA9IGNsYXNzbmFtZXMoY2xhc3NOYW1lLCB7XG4gICAgICBzZWxlY3RlZDogaW5kZXggPT09IGFjdGl2ZUtleUluZGV4LFxuICAgICAgJ3dpdGgtY2xvc2UnOiBhbGxvd0Nsb3NlLFxuICAgIH0pO1xuXG4gICAgY29uc3QgZHJhZ09wdGlvbnMgPSBhbGxvd1Jlb3JkZXJcbiAgICAgID8ge1xuICAgICAgICAgIG9uRHJhZ1N0YXJ0OiAoZSkgPT4gdGhpcy5kcmFnU3RhcnQoaW5kZXgsIGUpLFxuICAgICAgICAgIG9uRHJhZ0VudGVyOiAoZSkgPT4gdGhpcy5kcmFnRW50ZXIoaW5kZXgsIGUpLFxuICAgICAgICAgIG9uRHJhZ0xlYXZlOiAoZSkgPT4gdGhpcy5kcmFnTGVhdmUoaW5kZXgsIGUpLFxuICAgICAgICAgIG9uRHJhZ0VuZDogdGhpcy5kcmFnRHJvcCxcbiAgICAgICAgICBkcmFnZ2FibGU6IHRydWUsXG4gICAgICAgIH1cbiAgICAgIDoge307XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGJ1dHRvblxuICAgICAgICB7Li4uZHJhZ09wdGlvbnN9XG4gICAgICAgIGNsYXNzTmFtZT17YnV0dG9uQ2xhc3N9XG4gICAgICAgIHN0eWxlPXt7IGZvbnRXZWlnaHQsIGZvbnRTaXplLCBtaW5IZWlnaHQ6IGhlaWdodCB9fVxuICAgICAgICBpZD17aXRlbS5pZCB8fCBgbmF2SXRlbSR7U3RyaW5nKGluZGV4KX1gfVxuICAgICAgICBrZXk9e2l0ZW0uaWQgfHwgYG5hdml0ZW0ke1N0cmluZyhpbmRleCl9YH1cbiAgICAgICAgb25DbGljaz17KCkgPT4gdGhpcy5oYW5kbGVPbkNsaWNrKGl0ZW0uaWQsIGluZGV4KX1cbiAgICAgICAgcmVmPXsocikgPT4ge1xuICAgICAgICAgIGlmIChyICYmICF0aGlzLml0ZW1XaWR0aHNbaW5kZXhdKSB0aGlzLml0ZW1XaWR0aHNbaW5kZXhdID0gci5vZmZzZXRXaWR0aDtcbiAgICAgICAgfX1cbiAgICAgID5cbiAgICAgICAgPHNwYW4gY2xhc3NOYW1lPSd0YWItcGlsbC1pbm5lcic+XG4gICAgICAgICAge2l0ZW0ubmFtZX1cbiAgICAgICAgICB7LyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGpzeC1hMTF5L2NsaWNrLWV2ZW50cy1oYXZlLWtleS1ldmVudHMgKi99XG4gICAgICAgICAge2FsbG93Q2xvc2UgJiYgPGkgdGFiSW5kZXg9e2luZGV4ICsgMX0gcm9sZT0nYnV0dG9uJyBjbGFzc05hbWU9J2ZhIGZhLXRpbWVzJyBvbkNsaWNrPXsoZXZlbnQpID0+IHRoaXMuaGFuZGxlQ2xvc2UoZXZlbnQsIGl0ZW0uaWQsIGluZGV4KX0gLz59XG4gICAgICAgIDwvc3Bhbj5cbiAgICAgIDwvYnV0dG9uPlxuICAgICk7XG4gIH07XG5cbiAgZG9MaW5lQ291bnQgPSAoKSA9PiB7XG4gICAgY29uc3QgeyBsaXN0IH0gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiBsaXN0LnNvbWUoKGl0ZW0pID0+IHR5cGVvZiBpdGVtLm5hbWUgIT09ICdzdHJpbmcnKTtcbiAgfTtcblxuICByZXNvbHZlQWN0aXZlSXRlbUZyb21PcHRpb25zID0gKHNlbGVjdE9wdGlvbnMpID0+IHtcbiAgICBjb25zdCB7IGFjdGl2ZUtleSB9ID0gdGhpcy5wcm9wcztcbiAgICBsZXQgYWN0aXZlSXRlbSA9IHNlbGVjdE9wdGlvbnMuZmluZCgob3B0cykgPT4gb3B0cy52YWx1ZSA9PT0gYWN0aXZlS2V5KTtcbiAgICBpZiAoIWFjdGl2ZUl0ZW0pIHtcbiAgICAgIGFjdGl2ZUl0ZW0gPSBzZWxlY3RPcHRpb25zLmZpbmQoKG9wdHMpID0+IG9wdHMudmFsdWUgPT09IGFjdGl2ZUtleS52YWx1ZSk7XG4gICAgfVxuICAgIHJldHVybiBhY3RpdmVJdGVtO1xuICB9O1xuXG4gIGFjdGl2ZUl0ZW1JbmRleCA9IChhY3RpdmVJdGVtKSA9PiB7XG4gICAgY29uc3QgeyBsaXN0IH0gPSB0aGlzLnByb3BzO1xuICAgIGlmICghYWN0aXZlSXRlbSkgcmV0dXJuIG51bGw7XG4gICAgcmV0dXJuIGxpc3QuZmluZEluZGV4KChpdGVtKSA9PiBpdGVtLmlkID09PSBhY3RpdmVJdGVtLnZhbHVlKTtcbiAgfTtcblxuICAvLyBSZW5kZXIgY29tYm9ib3gsIHdoZW4gYWxsIGl0ZW1zIGRvIG5vdCBmaXRcbiAgY29tYm9ib3ggPSAoKSA9PiB7XG4gICAgY29uc3QgeyBpZCwgbGlzdCwgZm9udFNpemUsIGZvbnRXZWlnaHQsIGFsbG93UmVvcmRlciwgYWN0aXZlS2V5LCBhbGxvd0Nsb3NlIH0gPSB0aGlzLnByb3BzO1xuICAgIGlmICghdGhpcy5zdGF0ZS5pc1NlbGVjdFZpc2libGUpIHtcbiAgICAgIC8vIHJldHVybiBudWxsIGlmIGFsbCBuYXYgaXRlbXMgYXJlIHZpc2libGVcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIC8vIHNsaWNlIG5hdiBpdGVtcyBsaXN0IGFuZCBzaG93IGludmlzaWJsZSBpdGVtcyBpbiB0aGUgY29tYm9ib3hcbiAgICBjb25zdCBuYXZMaXN0ID0gdGhpcy5zdGF0ZS5sYXN0VmlzaWJsZUl0ZW1JbmRleCA+IC0yID8gbGlzdC5zbGljZSh0aGlzLnN0YXRlLmxhc3RWaXNpYmxlSXRlbUluZGV4ICsgMSkgOiBsaXN0O1xuICAgIGNvbnN0IHNlbGVjdE9wdGlvbnMgPSBuYXZMaXN0Lm1hcCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgIGNvbnN0IHJlYWxJbmRleCA9IGluZGV4ICsgdGhpcy5zdGF0ZS5sYXN0VmlzaWJsZUl0ZW1JbmRleCArIDE7XG5cbiAgICAgIGNvbnN0IGRyYWdPcHRpb25zID0gYWxsb3dSZW9yZGVyXG4gICAgICAgID8ge1xuICAgICAgICAgICAgb25EcmFnU3RhcnQ6IChlKSA9PiB0aGlzLmRyYWdTdGFydChyZWFsSW5kZXgsIGUpLFxuICAgICAgICAgICAgb25EcmFnRW50ZXI6IChlKSA9PiB0aGlzLmRyYWdFbnRlcihyZWFsSW5kZXgsIGUpLFxuICAgICAgICAgICAgb25EcmFnTGVhdmU6IChlKSA9PiB0aGlzLmRyYWdMZWF2ZShpbmRleCwgZSksXG4gICAgICAgICAgICBvbkRyYWdFbmQ6IHRoaXMuZHJhZ0Ryb3AsXG4gICAgICAgICAgICBkcmFnZ2FibGU6IHRydWUsXG4gICAgICAgICAgfVxuICAgICAgICA6IHt9O1xuXG4gICAgICBjb25zdCBkcm9wZG93bk9wdGlvbnMgPSB7XG4gICAgICAgIGNsYXNzTmFtZTogY2xhc3NuYW1lcygnZHJvcGRvd24tb3B0aW9uJywgeyAnd2l0aC1jbG9zZSc6IGFsbG93Q2xvc2UsIHNlbGVjdGVkOiBsaXN0W2FjdGl2ZUtleV0uaWQgPT09IGl0ZW0uaWQgfSksXG4gICAgICAgIGNsb3NlOiBhbGxvd0Nsb3NlID8gPGkgcm9sZT0nYnV0dG9uJyBjbGFzc05hbWU9J2ZhIGZhLXRpbWVzJyBvbkNsaWNrPXsoZXZlbnQpID0+IHRoaXMuaGFuZGxlQ2xvc2UoZXZlbnQsIGl0ZW0uaWQsIHJlYWxJbmRleCl9IC8+IDogbnVsbCxcbiAgICAgICAgb25TZWxlY3Q6ICgpID0+IHtcbiAgICAgICAgICB0aGlzLmhhbmRsZU9uQ2xpY2soaXRlbS5pZCwgcmVhbEluZGV4KTtcbiAgICAgICAgfSxcbiAgICAgICAgLi4uZHJhZ09wdGlvbnMsXG4gICAgICB9O1xuXG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5pdGVtLFxuICAgICAgICBvcHRpb25zOiBkcm9wZG93bk9wdGlvbnMsXG4gICAgICB9O1xuICAgIH0pO1xuXG4gICAgY29uc3QgbGluZUNvdW50TmVlZGVkID0gdGhpcy5kb0xpbmVDb3VudCgpO1xuICAgIGNvbnN0IGN1c3RvbUJvcmRlckNsYXNzID0gbGluZUNvdW50TmVlZGVkID8gJ3NlbGVjdGVkIGxpbmUtY291bnQnIDogJ3NlbGVjdGVkJztcbiAgICAvLyBSZXNvbHZlIGFjdGl2ZUl0ZW1cbiAgICBjb25zdCBhY3RpdmVJdGVtID0gdGhpcy5yZXNvbHZlQWN0aXZlSXRlbUZyb21PcHRpb25zKHNlbGVjdE9wdGlvbnMpO1xuICAgIGNvbnN0IGFjdGl2ZUl0ZW1JbmRleCA9IHRoaXMuYWN0aXZlSXRlbUluZGV4KGFjdGl2ZUl0ZW0pO1xuICAgIGNvbnN0IGJvcmRlckNsYXNzID0gYWN0aXZlSXRlbUluZGV4ID49IHRoaXMuc3RhdGUubGFzdFZpc2libGVJdGVtSW5kZXggKyAxID8gY3VzdG9tQm9yZGVyQ2xhc3MgOiAnJztcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2XG4gICAgICAgIGlkPXtgJHtpZH0tc2VsZWN0YH1cbiAgICAgICAgY2xhc3NOYW1lPXtgcmVzcG9uc2l2ZS10YWItZHJvcGRvd24gJHtib3JkZXJDbGFzc31gfVxuICAgICAgICBzdHlsZT17eyBmb250V2VpZ2h0LCBmb250U2l6ZSB9fVxuICAgICAgICByZWY9eyhyKSA9PiB7XG4gICAgICAgICAgdGhpcy5zZWxlY3RDb250YWluZXJSZWYgPSByO1xuICAgICAgICB9fVxuICAgICAgPlxuICAgICAgICA8RHJvcERvd24gdmFsdWU9e2xpc3RbYWN0aXZlS2V5XX0gb3B0aW9ucz17c2VsZWN0T3B0aW9uc30gLz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH07XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgaWQsIGNsYXNzTmFtZSwgbGlzdCwgaGVpZ2h0IH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHZpc2libGVMaXN0ID0gdGhpcy5zdGF0ZS5sYXN0VmlzaWJsZUl0ZW1JbmRleCA+IC0yID8gbGlzdC5zbGljZSgwLCB0aGlzLnN0YXRlLmxhc3RWaXNpYmxlSXRlbUluZGV4ICsgMSkgOiBsaXN0O1xuICAgIGNvbnN0IGl0ZW1DbGFzc05hbWUgPSAndGFiLXBpbGwtaXRlbSc7XG4gICAgY29uc3QgaXRlbXMgPSB2aXNpYmxlTGlzdC5tYXAoKGl0ZW0sIGluZGV4KSA9PiB0aGlzLm5hdmJhckl0ZW0oaXRlbSwgaW5kZXgsIGl0ZW1DbGFzc05hbWUpKTtcbiAgICBjb25zdCBsaW5lQ291bnQgPSB0aGlzLmRvTGluZUNvdW50KCk7XG4gICAgY29uc3QgbmF2YmFyU3R5bGUgPSB7XG4gICAgICBtaW5IZWlnaHQ6IGhlaWdodCxcbiAgICAgIG1heEhlaWdodDogaGVpZ2h0LFxuICAgIH07XG4gICAgaWYgKGhlaWdodC5zbGljZSgtMikgPT09ICdweCcgJiYgbGluZUNvdW50KSB7XG4gICAgICBjb25zdCBoZWlnaHRQeCA9IHBhcnNlSW50KGhlaWdodC5zbGljZSgwLCAtMiksIDEwKTtcbiAgICAgIG5hdmJhclN0eWxlLmxpbmVIZWlnaHQgPSBgJHtoZWlnaHRQeCAtIDR9cHhgO1xuICAgIH1cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdlxuICAgICAgICBpZD17YCR7aWR9LWNvbnRhaW5lcmB9XG4gICAgICAgIHJlZj17KHIpID0+IHtcbiAgICAgICAgICB0aGlzLm5hdmJhckNvbnRhaW5lclJlZiA9IHI7XG4gICAgICAgIH19XG4gICAgICAgIGNsYXNzTmFtZT17Y2xhc3NuYW1lcyhgcmVzcG9uc2l2ZS10YWItcGlsbHMtY29udGFpbmVyYCwgY2xhc3NOYW1lKX1cbiAgICAgICAgc3R5bGU9e25hdmJhclN0eWxlfVxuICAgICAgPlxuICAgICAgICB7aXRlbXN9XG4gICAgICAgIHt0aGlzLmNvbWJvYm94KCl9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG4iXX0=