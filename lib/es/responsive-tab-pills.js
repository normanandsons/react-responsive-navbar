var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { debounce } from 'debounce';
import DropDown from './dropdown';

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

      var buttonClass = classnames(className, {
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
          className: classnames('dropdown-option', { 'with-close': allowClose, selected: list[activeKey].id === item.id }),
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
        React.createElement(DropDown, { value: list[activeKey], options: selectOptions })
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
        className: classnames('responsive-tab-pills-container', className),
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
export { ResponsiveTabPills as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yZXNwb25zaXZlLXRhYi1waWxscy5qc3giXSwibmFtZXMiOlsiUmVhY3QiLCJQcm9wVHlwZXMiLCJjbGFzc25hbWVzIiwiZGVib3VuY2UiLCJEcm9wRG93biIsIlJlc3BvbnNpdmVUYWJQaWxscyIsInByb3BzIiwic3RhdGUiLCJkcmFnRnJvbSIsImRyYWdUbyIsImlzU2VsZWN0VmlzaWJsZSIsImxhc3RWaXNpYmxlSXRlbUluZGV4IiwiZ2V0TGFzdFZpc2libGVJdGVtSW5kZXgiLCJuYXZCYXJXaWR0aCIsIm5hdmJhckNvbnRhaW5lclJlZiIsIm9mZnNldFdpZHRoIiwic2VsZWN0V2lkdGgiLCJzZWxlY3RDb250YWluZXJSZWYiLCJjb21wb25lbnRMZWZ0V2lkdGgiLCJjb21wb25lbnRMZWZ0Q29udGFpbmVyUmVmIiwiY29tcG9uZW50UmlnaHRXaWR0aCIsImNvbXBvbmVudFJpZ2h0Q29udGFpbmVyUmVmIiwicmVtYWluaW5nV2lkdGgiLCJsYXN0VmlzaWJsZSIsImkiLCJsaXN0IiwibGVuZ3RoIiwiaXRlbVdpZHRocyIsImhhbmRsZVJlc2l6ZSIsInJlZnJlc2hMYXN0VmlzaWJsZUl0ZW0iLCJzZXRTdGF0ZSIsImhhbmRsZU9uQ2xpY2siLCJpZCIsImluZGV4Iiwib25TZWxlY3QiLCJoYW5kbGVDbG9zZSIsImV2ZW50Iiwic3RvcFByb3BhZ2F0aW9uIiwib25DbG9zZSIsImRyYWdTdGFydCIsImRyYWdFbnRlciIsImUiLCJ0YXJnZXQiLCJjbGFzc0xpc3QiLCJhZGQiLCJkcmFnTGVhdmUiLCJyZW1vdmUiLCJkcmFnRHJvcCIsIm9uUmVvcmRlciIsIm5ld0xpc3QiLCJzbGljZSIsIm1vdmVkIiwic3BsaWNlIiwibmF2YmFySXRlbSIsIml0ZW0iLCJjbGFzc05hbWUiLCJhY3RpdmVLZXkiLCJmb250V2VpZ2h0IiwiZm9udFNpemUiLCJoZWlnaHQiLCJhbGxvd0Nsb3NlIiwibmF2UmVuZGVyZXIiLCJhbGxvd1Jlb3JkZXIiLCJhY3RpdmVLZXlJbmRleCIsImFjdGl2ZUl0ZW1JbmRleCIsImJ1dHRvbkNsYXNzIiwic2VsZWN0ZWQiLCJkcmFnT3B0aW9ucyIsIm9uRHJhZ1N0YXJ0Iiwib25EcmFnRW50ZXIiLCJvbkRyYWdMZWF2ZSIsIm9uRHJhZ0VuZCIsImRyYWdnYWJsZSIsIm1pbkhlaWdodCIsIlN0cmluZyIsInIiLCJuYW1lIiwiZG9MaW5lQ291bnQiLCJzb21lIiwicmVzb2x2ZUFjdGl2ZUl0ZW1Gcm9tT3B0aW9ucyIsInNlbGVjdE9wdGlvbnMiLCJhY3RpdmVJdGVtIiwiZmluZCIsIm9wdHMiLCJ2YWx1ZSIsImZpbmRJbmRleCIsImNvbWJvYm94IiwibmF2TGlzdCIsIm1hcCIsInJlYWxJbmRleCIsImRyb3Bkb3duT3B0aW9ucyIsImNsb3NlIiwib3B0aW9ucyIsImxpbmVDb3VudE5lZWRlZCIsImN1c3RvbUJvcmRlckNsYXNzIiwiYm9yZGVyQ2xhc3MiLCJjb21wb25lbnREaWRNb3VudCIsIndpbmRvdyIsImFkZEV2ZW50TGlzdGVuZXIiLCJjb21wb25lbnREaWRVcGRhdGUiLCJwcmV2UHJvcHMiLCJwcmV2U3RhdGUiLCJjb21wb25lbnRXaWxsVW5tb3VudCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJyZW5kZXIiLCJ2aXNpYmxlTGlzdCIsIml0ZW1DbGFzc05hbWUiLCJpdGVtcyIsImxpbmVDb3VudCIsIm5hdmJhclN0eWxlIiwibWF4SGVpZ2h0IiwiaGVpZ2h0UHgiLCJwYXJzZUludCIsImxpbmVIZWlnaHQiLCJDb21wb25lbnQiLCJkZWZhdWx0UHJvcHMiLCJwbGFjZWhvbGRlciIsImNvbXBvbmVudExlZnQiLCJjb21wb25lbnRSaWdodCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxLQUFLQSxLQUFaLE1BQXVCLE9BQXZCO0FBQ0EsT0FBT0MsU0FBUCxNQUFzQixZQUF0QjtBQUNBLE9BQU9DLFVBQVAsTUFBdUIsWUFBdkI7QUFDQSxTQUFTQyxRQUFULFFBQXlCLFVBQXpCO0FBQ0EsT0FBT0MsUUFBUCxNQUFx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U0FBakMsRUFBNEM7QUFDMUMsVUFBTUcsV0FBV0MsU0FBU3JELE9BQU9ULEtBQVAsQ0FBYSxDQUFiLEVBQWdCLENBQUMsQ0FBakIsQ0FBVCxFQUE4QixFQUE5QixDQUFqQjtBQUNBMkQsa0JBQVlJLFVBQVosR0FBNEJGLFdBQVcsQ0FBdkM7QUFDRDtBQUNELFdBQ0U7QUFBQTtBQUFBO0FBQ0UsWUFBTy9FLEVBQVAsZUFERjtBQUVFLGFBQUssYUFBQzJDLENBQUQsRUFBTztBQUNWLGlCQUFLN0Qsa0JBQUwsR0FBMEI2RCxDQUExQjtBQUNELFNBSkg7QUFLRSxtQkFBV3pFLDZDQUE2Q3FELFNBQTdDLENBTGI7QUFNRSxlQUFPc0Q7QUFOVDtBQVFHRixXQVJIO0FBU0csV0FBS3JCLFFBQUw7QUFUSCxLQURGO0FBYUQsRzs7O0VBN1M2Q3RGLE1BQU1rSCxTLFVBcUI3Q0MsWSxHQUFlO0FBQ3BCbkYsTUFBSSxtQkFEZ0I7QUFFcEJ1QixhQUFXLEVBRlM7QUFHcEJyQixZQUFVLG9CQUFNLENBQUUsQ0FIRTtBQUlwQkksV0FBUyxtQkFBTSxDQUFFLENBSkc7QUFLcEJzQixjQUFZLEtBTFE7QUFNcEJFLGdCQUFjLEtBTk07QUFPcEJKLFlBQVUsU0FQVTtBQVFwQkQsY0FBWSxTQVJRO0FBU3BCMkQsZUFBYSxTQVRPO0FBVXBCekQsVUFBUSxFQVZZO0FBV3BCMEQsaUJBQWUsSUFYSztBQVlwQkMsa0JBQWdCO0FBWkksQztTQXJCSGpILGtCIiwiZmlsZSI6InJlc3BvbnNpdmUtdGFiLXBpbGxzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBjbGFzc25hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IHsgZGVib3VuY2UgfSBmcm9tICdkZWJvdW5jZSc7XG5pbXBvcnQgRHJvcERvd24gZnJvbSAnLi9kcm9wZG93bic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlc3BvbnNpdmVUYWJQaWxscyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgaWQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgYWxsb3dDbG9zZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgb25DbG9zZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgYWxsb3dSZW9yZGVyOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBuYXZSZW5kZXJlcjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgY2xhc3NOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGZvbnRTaXplOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGZvbnRXZWlnaHQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgYWN0aXZlS2V5OiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc2hhcGUoe30pLCBQcm9wVHlwZXMubnVtYmVyXSkuaXNSZXF1aXJlZCxcbiAgICBsaXN0OiBQcm9wVHlwZXMuYXJyYXlPZihcbiAgICAgIFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICAgIG5hbWU6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5ub2RlXSkuaXNSZXF1aXJlZCxcbiAgICAgICAgaWQ6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5udW1iZXJdKSxcbiAgICAgIH0pXG4gICAgKS5pc1JlcXVpcmVkLFxuICAgIG9uU2VsZWN0OiBQcm9wVHlwZXMuZnVuYyxcbiAgICBoZWlnaHQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gIH07XG5cbiAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICBpZDogJ3Jlc3BvbnNpdmUtbmF2YmFyJyxcbiAgICBjbGFzc05hbWU6ICcnLFxuICAgIG9uU2VsZWN0OiAoKSA9PiB7fSxcbiAgICBvbkNsb3NlOiAoKSA9PiB7fSxcbiAgICBhbGxvd0Nsb3NlOiBmYWxzZSxcbiAgICBhbGxvd1Jlb3JkZXI6IGZhbHNlLFxuICAgIGZvbnRTaXplOiAnaW5oZXJpdCcsXG4gICAgZm9udFdlaWdodDogJ2luaGVyaXQnLFxuICAgIHBsYWNlaG9sZGVyOiAnbW9yZS4uLicsXG4gICAgaGVpZ2h0OiAzMCxcbiAgICBjb21wb25lbnRMZWZ0OiBudWxsLFxuICAgIGNvbXBvbmVudFJpZ2h0OiBudWxsLFxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuaXRlbVdpZHRocyA9IFtdOyAvLyBzdG9yZSBpdGVtIHdpZHRocyBoZXJlLCB0aGV5IGRvbid0IGNoYW5nZVxuICB9XG5cbiAgc3RhdGUgPSB7XG4gICAgZHJhZ0Zyb206IG51bGwsXG4gICAgZHJhZ1RvOiBudWxsLFxuICAgIGlzU2VsZWN0VmlzaWJsZTogZmFsc2UsXG4gICAgbGFzdFZpc2libGVJdGVtSW5kZXg6IC0yLFxuICB9O1xuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLmhhbmRsZVJlc2l6ZSk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ29yaWVudGF0aW9uY2hhbmdlJywgdGhpcy5yZWZyZXNoTGFzdFZpc2libGVJdGVtKTsgLy8gZm9yIG1vYmlsZSBzdXBwb3J0XG4gICAgdGhpcy5yZWZyZXNoTGFzdFZpc2libGVJdGVtKCk7XG4gIH1cblxuICBjb21wb25lbnREaWRVcGRhdGUocHJldlByb3BzLCBwcmV2U3RhdGUpIHtcbiAgICAvLyBSZWZyZXNoIHZpc2libGUgaXRlbXMgaWYgdmFsdWVzIGNoYW5nZVxuICAgIGlmICh0aGlzLnN0YXRlLmlzU2VsZWN0VmlzaWJsZSAhPT0gcHJldlN0YXRlLmlzU2VsZWN0VmlzaWJsZSB8fCB0aGlzLnN0YXRlLmxhc3RWaXNpYmxlSXRlbUluZGV4ICE9PSBwcmV2U3RhdGUubGFzdFZpc2libGVJdGVtSW5kZXgpIHtcbiAgICAgIHRoaXMucmVmcmVzaExhc3RWaXNpYmxlSXRlbSgpO1xuICAgIH1cbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLmhhbmRsZVJlc2l6ZSk7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ29yaWVudGF0aW9uY2hhbmdlJywgdGhpcy5yZWZyZXNoTGFzdFZpc2libGVJdGVtKTsgLy8gZm9yIG1vYmlsZSBzdXBwb3J0XG4gIH1cblxuICBnZXRMYXN0VmlzaWJsZUl0ZW1JbmRleCA9ICgpID0+IHtcbiAgICBjb25zdCBuYXZCYXJXaWR0aCA9IHRoaXMubmF2YmFyQ29udGFpbmVyUmVmID8gdGhpcy5uYXZiYXJDb250YWluZXJSZWYub2Zmc2V0V2lkdGggOiAwO1xuICAgIGNvbnN0IHNlbGVjdFdpZHRoID0gdGhpcy5zZWxlY3RDb250YWluZXJSZWYgPyB0aGlzLnNlbGVjdENvbnRhaW5lclJlZi5vZmZzZXRXaWR0aCA6IDA7XG4gICAgY29uc3QgY29tcG9uZW50TGVmdFdpZHRoID0gdGhpcy5jb21wb25lbnRMZWZ0Q29udGFpbmVyUmVmID8gdGhpcy5jb21wb25lbnRMZWZ0Q29udGFpbmVyUmVmLm9mZnNldFdpZHRoIDogMDsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgIGNvbnN0IGNvbXBvbmVudFJpZ2h0V2lkdGggPSB0aGlzLmNvbXBvbmVudFJpZ2h0Q29udGFpbmVyUmVmID8gdGhpcy5jb21wb25lbnRSaWdodENvbnRhaW5lclJlZi5vZmZzZXRXaWR0aCA6IDA7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcblxuICAgIGxldCByZW1haW5pbmdXaWR0aCA9IG5hdkJhcldpZHRoIC0gc2VsZWN0V2lkdGggLSBjb21wb25lbnRMZWZ0V2lkdGggLSBjb21wb25lbnRSaWdodFdpZHRoO1xuICAgIGxldCBsYXN0VmlzaWJsZSA9IDA7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucHJvcHMubGlzdC5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgcmVtYWluaW5nV2lkdGggLT0gdGhpcy5pdGVtV2lkdGhzW2ldO1xuICAgICAgaWYgKHJlbWFpbmluZ1dpZHRoIDwgMCkge1xuICAgICAgICBsYXN0VmlzaWJsZSAtPSAxO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGxhc3RWaXNpYmxlICs9IDE7XG4gICAgfVxuXG4gICAgcmV0dXJuIGxhc3RWaXNpYmxlO1xuICB9O1xuXG4gIGhhbmRsZVJlc2l6ZSA9ICgpID0+IGRlYm91bmNlKHRoaXMucmVmcmVzaExhc3RWaXNpYmxlSXRlbSgpLCAzMDApO1xuXG4gIHJlZnJlc2hMYXN0VmlzaWJsZUl0ZW0gPSAoKSA9PiB7XG4gICAgY29uc3QgbGFzdFZpc2libGVJdGVtSW5kZXggPSB0aGlzLmdldExhc3RWaXNpYmxlSXRlbUluZGV4KCk7XG4gICAgaWYgKHRoaXMuc3RhdGUubGFzdFZpc2libGVJdGVtSW5kZXggIT09IGxhc3RWaXNpYmxlSXRlbUluZGV4KSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgaXNTZWxlY3RWaXNpYmxlOiB0aGlzLnByb3BzLmxpc3QubGVuZ3RoID4gbGFzdFZpc2libGVJdGVtSW5kZXggKyAxLFxuICAgICAgICBsYXN0VmlzaWJsZUl0ZW1JbmRleCxcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcblxuICBoYW5kbGVPbkNsaWNrID0gKGlkLCBpbmRleCkgPT4ge1xuICAgIHRoaXMucHJvcHMub25TZWxlY3QoaWQsIGluZGV4LCB0aGlzLnByb3BzLmxpc3RbaW5kZXhdKTtcbiAgfTtcblxuICBoYW5kbGVDbG9zZSA9IChldmVudCwgaWQsIGluZGV4KSA9PiB7XG4gICAgLy8gZG9uJ3QgYnViYmxlIHRvIGNsaWNrIGFsc28sIHdlIGdvdCByaWQgb2YgdGhpc1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIHRoaXMucHJvcHMub25DbG9zZShpZCwgaW5kZXgpO1xuICB9O1xuXG4gIGRyYWdTdGFydCA9IChpbmRleCkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgZHJhZ0Zyb206IGluZGV4LFxuICAgIH0pO1xuICB9O1xuXG4gIGRyYWdFbnRlciA9IChpbmRleCwgZSkgPT4ge1xuICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2Ryb3BwYWJsZScpO1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgZHJhZ1RvOiBpbmRleCxcbiAgICB9KTtcbiAgfTtcblxuICBkcmFnTGVhdmUgPSAoaW5kZXgsIGUpID0+IHtcbiAgICBlLnRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKCdkcm9wcGFibGUnKTtcbiAgfTtcblxuICBkcmFnRHJvcCA9ICgpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5vblJlb3JkZXIpIHtcbiAgICAgIGNvbnN0IHsgZHJhZ0Zyb20sIGRyYWdUbyB9ID0gdGhpcy5zdGF0ZTtcbiAgICAgIGNvbnN0IG5ld0xpc3QgPSB0aGlzLnByb3BzLmxpc3Quc2xpY2UoKTtcbiAgICAgIGNvbnN0IG1vdmVkID0gbmV3TGlzdFtkcmFnRnJvbV07XG5cbiAgICAgIG5ld0xpc3Quc3BsaWNlKGRyYWdGcm9tLCAxKTtcbiAgICAgIG5ld0xpc3Quc3BsaWNlKGRyYWdUbywgMCwgbW92ZWQpO1xuXG4gICAgICB0aGlzLnByb3BzLm9uUmVvcmRlcihuZXdMaXN0LCBkcmFnRnJvbSwgZHJhZ1RvKTtcbiAgICAgIHRoaXMucHJvcHMub25TZWxlY3QobW92ZWQsIGRyYWdUbyk7XG5cbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBkcmFnVG86IG51bGwsXG4gICAgICAgIGRyYWdGcm9tOiBudWxsLFxuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gIC8vIFJlbmRlciBuYXZiYXIgaXRlbVxuICBuYXZiYXJJdGVtID0gKGl0ZW0sIGluZGV4LCBjbGFzc05hbWUpID0+IHtcbiAgICBjb25zdCB7IGFjdGl2ZUtleSwgZm9udFdlaWdodCwgZm9udFNpemUsIGhlaWdodCwgYWxsb3dDbG9zZSwgbmF2UmVuZGVyZXIsIGFsbG93UmVvcmRlciB9ID0gdGhpcy5wcm9wcztcblxuICAgIGlmIChuYXZSZW5kZXJlcikge1xuICAgICAgcmV0dXJuIG5hdlJlbmRlcmVyKGl0ZW0sIGluZGV4LCBjbGFzc05hbWUsIGFjdGl2ZUtleSA9PT0gaW5kZXgpO1xuICAgIH1cblxuICAgIC8vIHJlc29sdmUgYWN0aXZlS2V5SW5kZXhcbiAgICBsZXQgYWN0aXZlS2V5SW5kZXggPSBhY3RpdmVLZXk7XG4gICAgaWYgKHR5cGVvZiBhY3RpdmVLZXkgPT09ICdvYmplY3QnKSB7XG4gICAgICBhY3RpdmVLZXlJbmRleCA9IHRoaXMuYWN0aXZlSXRlbUluZGV4KGFjdGl2ZUtleSk7XG4gICAgfVxuXG4gICAgY29uc3QgYnV0dG9uQ2xhc3MgPSBjbGFzc25hbWVzKGNsYXNzTmFtZSwge1xuICAgICAgc2VsZWN0ZWQ6IGluZGV4ID09PSBhY3RpdmVLZXlJbmRleCxcbiAgICAgICd3aXRoLWNsb3NlJzogYWxsb3dDbG9zZSxcbiAgICB9KTtcblxuICAgIGNvbnN0IGRyYWdPcHRpb25zID0gYWxsb3dSZW9yZGVyXG4gICAgICA/IHtcbiAgICAgICAgICBvbkRyYWdTdGFydDogKGUpID0+IHRoaXMuZHJhZ1N0YXJ0KGluZGV4LCBlKSxcbiAgICAgICAgICBvbkRyYWdFbnRlcjogKGUpID0+IHRoaXMuZHJhZ0VudGVyKGluZGV4LCBlKSxcbiAgICAgICAgICBvbkRyYWdMZWF2ZTogKGUpID0+IHRoaXMuZHJhZ0xlYXZlKGluZGV4LCBlKSxcbiAgICAgICAgICBvbkRyYWdFbmQ6IHRoaXMuZHJhZ0Ryb3AsXG4gICAgICAgICAgZHJhZ2dhYmxlOiB0cnVlLFxuICAgICAgICB9XG4gICAgICA6IHt9O1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxidXR0b25cbiAgICAgICAgey4uLmRyYWdPcHRpb25zfVxuICAgICAgICBjbGFzc05hbWU9e2J1dHRvbkNsYXNzfVxuICAgICAgICBzdHlsZT17eyBmb250V2VpZ2h0LCBmb250U2l6ZSwgbWluSGVpZ2h0OiBoZWlnaHQgfX1cbiAgICAgICAgaWQ9e2l0ZW0uaWQgfHwgYG5hdkl0ZW0ke1N0cmluZyhpbmRleCl9YH1cbiAgICAgICAga2V5PXtpdGVtLmlkIHx8IGBuYXZpdGVtJHtTdHJpbmcoaW5kZXgpfWB9XG4gICAgICAgIG9uQ2xpY2s9eygpID0+IHRoaXMuaGFuZGxlT25DbGljayhpdGVtLmlkLCBpbmRleCl9XG4gICAgICAgIHJlZj17KHIpID0+IHtcbiAgICAgICAgICBpZiAociAmJiAhdGhpcy5pdGVtV2lkdGhzW2luZGV4XSkgdGhpcy5pdGVtV2lkdGhzW2luZGV4XSA9IHIub2Zmc2V0V2lkdGg7XG4gICAgICAgIH19XG4gICAgICA+XG4gICAgICAgIDxzcGFuIGNsYXNzTmFtZT0ndGFiLXBpbGwtaW5uZXInPlxuICAgICAgICAgIHtpdGVtLm5hbWV9XG4gICAgICAgICAgey8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBqc3gtYTExeS9jbGljay1ldmVudHMtaGF2ZS1rZXktZXZlbnRzICovfVxuICAgICAgICAgIHthbGxvd0Nsb3NlICYmIDxpIHRhYkluZGV4PXtpbmRleCArIDF9IHJvbGU9J2J1dHRvbicgY2xhc3NOYW1lPSdmYSBmYS10aW1lcycgb25DbGljaz17KGV2ZW50KSA9PiB0aGlzLmhhbmRsZUNsb3NlKGV2ZW50LCBpdGVtLmlkLCBpbmRleCl9IC8+fVxuICAgICAgICA8L3NwYW4+XG4gICAgICA8L2J1dHRvbj5cbiAgICApO1xuICB9O1xuXG4gIGRvTGluZUNvdW50ID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgbGlzdCB9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gbGlzdC5zb21lKChpdGVtKSA9PiB0eXBlb2YgaXRlbS5uYW1lICE9PSAnc3RyaW5nJyk7XG4gIH07XG5cbiAgcmVzb2x2ZUFjdGl2ZUl0ZW1Gcm9tT3B0aW9ucyA9IChzZWxlY3RPcHRpb25zKSA9PiB7XG4gICAgY29uc3QgeyBhY3RpdmVLZXkgfSA9IHRoaXMucHJvcHM7XG4gICAgbGV0IGFjdGl2ZUl0ZW0gPSBzZWxlY3RPcHRpb25zLmZpbmQoKG9wdHMpID0+IG9wdHMudmFsdWUgPT09IGFjdGl2ZUtleSk7XG4gICAgaWYgKCFhY3RpdmVJdGVtKSB7XG4gICAgICBhY3RpdmVJdGVtID0gc2VsZWN0T3B0aW9ucy5maW5kKChvcHRzKSA9PiBvcHRzLnZhbHVlID09PSBhY3RpdmVLZXkudmFsdWUpO1xuICAgIH1cbiAgICByZXR1cm4gYWN0aXZlSXRlbTtcbiAgfTtcblxuICBhY3RpdmVJdGVtSW5kZXggPSAoYWN0aXZlSXRlbSkgPT4ge1xuICAgIGNvbnN0IHsgbGlzdCB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAoIWFjdGl2ZUl0ZW0pIHJldHVybiBudWxsO1xuICAgIHJldHVybiBsaXN0LmZpbmRJbmRleCgoaXRlbSkgPT4gaXRlbS5pZCA9PT0gYWN0aXZlSXRlbS52YWx1ZSk7XG4gIH07XG5cbiAgLy8gUmVuZGVyIGNvbWJvYm94LCB3aGVuIGFsbCBpdGVtcyBkbyBub3QgZml0XG4gIGNvbWJvYm94ID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgaWQsIGxpc3QsIGZvbnRTaXplLCBmb250V2VpZ2h0LCBhbGxvd1Jlb3JkZXIsIGFjdGl2ZUtleSwgYWxsb3dDbG9zZSB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAoIXRoaXMuc3RhdGUuaXNTZWxlY3RWaXNpYmxlKSB7XG4gICAgICAvLyByZXR1cm4gbnVsbCBpZiBhbGwgbmF2IGl0ZW1zIGFyZSB2aXNpYmxlXG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICAvLyBzbGljZSBuYXYgaXRlbXMgbGlzdCBhbmQgc2hvdyBpbnZpc2libGUgaXRlbXMgaW4gdGhlIGNvbWJvYm94XG4gICAgY29uc3QgbmF2TGlzdCA9IHRoaXMuc3RhdGUubGFzdFZpc2libGVJdGVtSW5kZXggPiAtMiA/IGxpc3Quc2xpY2UodGhpcy5zdGF0ZS5sYXN0VmlzaWJsZUl0ZW1JbmRleCArIDEpIDogbGlzdDtcbiAgICBjb25zdCBzZWxlY3RPcHRpb25zID0gbmF2TGlzdC5tYXAoKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICBjb25zdCByZWFsSW5kZXggPSBpbmRleCArIHRoaXMuc3RhdGUubGFzdFZpc2libGVJdGVtSW5kZXggKyAxO1xuXG4gICAgICBjb25zdCBkcmFnT3B0aW9ucyA9IGFsbG93UmVvcmRlclxuICAgICAgICA/IHtcbiAgICAgICAgICAgIG9uRHJhZ1N0YXJ0OiAoZSkgPT4gdGhpcy5kcmFnU3RhcnQocmVhbEluZGV4LCBlKSxcbiAgICAgICAgICAgIG9uRHJhZ0VudGVyOiAoZSkgPT4gdGhpcy5kcmFnRW50ZXIocmVhbEluZGV4LCBlKSxcbiAgICAgICAgICAgIG9uRHJhZ0xlYXZlOiAoZSkgPT4gdGhpcy5kcmFnTGVhdmUoaW5kZXgsIGUpLFxuICAgICAgICAgICAgb25EcmFnRW5kOiB0aGlzLmRyYWdEcm9wLFxuICAgICAgICAgICAgZHJhZ2dhYmxlOiB0cnVlLFxuICAgICAgICAgIH1cbiAgICAgICAgOiB7fTtcblxuICAgICAgY29uc3QgZHJvcGRvd25PcHRpb25zID0ge1xuICAgICAgICBjbGFzc05hbWU6IGNsYXNzbmFtZXMoJ2Ryb3Bkb3duLW9wdGlvbicsIHsgJ3dpdGgtY2xvc2UnOiBhbGxvd0Nsb3NlLCBzZWxlY3RlZDogbGlzdFthY3RpdmVLZXldLmlkID09PSBpdGVtLmlkIH0pLFxuICAgICAgICBjbG9zZTogYWxsb3dDbG9zZSA/IDxpIHJvbGU9J2J1dHRvbicgY2xhc3NOYW1lPSdmYSBmYS10aW1lcycgb25DbGljaz17KGV2ZW50KSA9PiB0aGlzLmhhbmRsZUNsb3NlKGV2ZW50LCBpdGVtLmlkLCByZWFsSW5kZXgpfSAvPiA6IG51bGwsXG4gICAgICAgIG9uU2VsZWN0OiAoKSA9PiB7XG4gICAgICAgICAgdGhpcy5oYW5kbGVPbkNsaWNrKGl0ZW0uaWQsIHJlYWxJbmRleCk7XG4gICAgICAgIH0sXG4gICAgICAgIC4uLmRyYWdPcHRpb25zLFxuICAgICAgfTtcblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uaXRlbSxcbiAgICAgICAgb3B0aW9uczogZHJvcGRvd25PcHRpb25zLFxuICAgICAgfTtcbiAgICB9KTtcblxuICAgIGNvbnN0IGxpbmVDb3VudE5lZWRlZCA9IHRoaXMuZG9MaW5lQ291bnQoKTtcbiAgICBjb25zdCBjdXN0b21Cb3JkZXJDbGFzcyA9IGxpbmVDb3VudE5lZWRlZCA/ICdzZWxlY3RlZCBsaW5lLWNvdW50JyA6ICdzZWxlY3RlZCc7XG4gICAgLy8gUmVzb2x2ZSBhY3RpdmVJdGVtXG4gICAgY29uc3QgYWN0aXZlSXRlbSA9IHRoaXMucmVzb2x2ZUFjdGl2ZUl0ZW1Gcm9tT3B0aW9ucyhzZWxlY3RPcHRpb25zKTtcbiAgICBjb25zdCBhY3RpdmVJdGVtSW5kZXggPSB0aGlzLmFjdGl2ZUl0ZW1JbmRleChhY3RpdmVJdGVtKTtcbiAgICBjb25zdCBib3JkZXJDbGFzcyA9IGFjdGl2ZUl0ZW1JbmRleCA+PSB0aGlzLnN0YXRlLmxhc3RWaXNpYmxlSXRlbUluZGV4ICsgMSA/IGN1c3RvbUJvcmRlckNsYXNzIDogJyc7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdlxuICAgICAgICBpZD17YCR7aWR9LXNlbGVjdGB9XG4gICAgICAgIGNsYXNzTmFtZT17YHJlc3BvbnNpdmUtdGFiLWRyb3Bkb3duICR7Ym9yZGVyQ2xhc3N9YH1cbiAgICAgICAgc3R5bGU9e3sgZm9udFdlaWdodCwgZm9udFNpemUgfX1cbiAgICAgICAgcmVmPXsocikgPT4ge1xuICAgICAgICAgIHRoaXMuc2VsZWN0Q29udGFpbmVyUmVmID0gcjtcbiAgICAgICAgfX1cbiAgICAgID5cbiAgICAgICAgPERyb3BEb3duIHZhbHVlPXtsaXN0W2FjdGl2ZUtleV19IG9wdGlvbnM9e3NlbGVjdE9wdGlvbnN9IC8+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9O1xuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IGlkLCBjbGFzc05hbWUsIGxpc3QsIGhlaWdodCB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB2aXNpYmxlTGlzdCA9IHRoaXMuc3RhdGUubGFzdFZpc2libGVJdGVtSW5kZXggPiAtMiA/IGxpc3Quc2xpY2UoMCwgdGhpcy5zdGF0ZS5sYXN0VmlzaWJsZUl0ZW1JbmRleCArIDEpIDogbGlzdDtcbiAgICBjb25zdCBpdGVtQ2xhc3NOYW1lID0gJ3RhYi1waWxsLWl0ZW0nO1xuICAgIGNvbnN0IGl0ZW1zID0gdmlzaWJsZUxpc3QubWFwKChpdGVtLCBpbmRleCkgPT4gdGhpcy5uYXZiYXJJdGVtKGl0ZW0sIGluZGV4LCBpdGVtQ2xhc3NOYW1lKSk7XG4gICAgY29uc3QgbGluZUNvdW50ID0gdGhpcy5kb0xpbmVDb3VudCgpO1xuICAgIGNvbnN0IG5hdmJhclN0eWxlID0ge1xuICAgICAgbWluSGVpZ2h0OiBoZWlnaHQsXG4gICAgICBtYXhIZWlnaHQ6IGhlaWdodCxcbiAgICB9O1xuICAgIGlmIChoZWlnaHQuc2xpY2UoLTIpID09PSAncHgnICYmIGxpbmVDb3VudCkge1xuICAgICAgY29uc3QgaGVpZ2h0UHggPSBwYXJzZUludChoZWlnaHQuc2xpY2UoMCwgLTIpLCAxMCk7XG4gICAgICBuYXZiYXJTdHlsZS5saW5lSGVpZ2h0ID0gYCR7aGVpZ2h0UHggLSA0fXB4YDtcbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXZcbiAgICAgICAgaWQ9e2Ake2lkfS1jb250YWluZXJgfVxuICAgICAgICByZWY9eyhyKSA9PiB7XG4gICAgICAgICAgdGhpcy5uYXZiYXJDb250YWluZXJSZWYgPSByO1xuICAgICAgICB9fVxuICAgICAgICBjbGFzc05hbWU9e2NsYXNzbmFtZXMoYHJlc3BvbnNpdmUtdGFiLXBpbGxzLWNvbnRhaW5lcmAsIGNsYXNzTmFtZSl9XG4gICAgICAgIHN0eWxlPXtuYXZiYXJTdHlsZX1cbiAgICAgID5cbiAgICAgICAge2l0ZW1zfVxuICAgICAgICB7dGhpcy5jb21ib2JveCgpfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuIl19