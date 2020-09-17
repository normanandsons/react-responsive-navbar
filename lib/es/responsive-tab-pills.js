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

      var buttonClass = classnames(className, 'grabbable', {
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
          className: classnames('dropdown-option', { selected: list[activeKey].id === item.id }),
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
        className: classnames('responsive-navbar-container', className),
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yZXNwb25zaXZlLXRhYi1waWxscy5qc3giXSwibmFtZXMiOlsiUmVhY3QiLCJQcm9wVHlwZXMiLCJjbGFzc25hbWVzIiwiZGVib3VuY2UiLCJEcm9wRG93biIsIlJlc3BvbnNpdmVUYWJQaWxscyIsInByb3BzIiwic3RhdGUiLCJkcmFnRnJvbSIsImRyYWdUbyIsImlzU2VsZWN0VmlzaWJsZSIsImxhc3RWaXNpYmxlSXRlbUluZGV4IiwiZ2V0TGFzdFZpc2libGVJdGVtSW5kZXgiLCJuYXZCYXJXaWR0aCIsIm5hdmJhckNvbnRhaW5lclJlZiIsIm9mZnNldFdpZHRoIiwic2VsZWN0V2lkdGgiLCJzZWxlY3RDb250YWluZXJSZWYiLCJjb21wb25lbnRMZWZ0V2lkdGgiLCJjb21wb25lbnRMZWZ0Q29udGFpbmVyUmVmIiwiY29tcG9uZW50UmlnaHRXaWR0aCIsImNvbXBvbmVudFJpZ2h0Q29udGFpbmVyUmVmIiwicmVtYWluaW5nV2lkdGgiLCJsYXN0VmlzaWJsZSIsImkiLCJsaXN0IiwibGVuZ3RoIiwiaXRlbVdpZHRocyIsImhhbmRsZVJlc2l6ZSIsInJlZnJlc2hMYXN0VmlzaWJsZUl0ZW0iLCJzZXRTdGF0ZSIsImhhbmRsZU9uQ2xpY2siLCJpZCIsImluZGV4Iiwib25TZWxlY3QiLCJoYW5kbGVDbG9zZSIsImV2ZW50Iiwic3RvcFByb3BhZ2F0aW9uIiwib25DbG9zZSIsImRyYWdTdGFydCIsImRyYWdFbnRlciIsImUiLCJ0YXJnZXQiLCJjbGFzc0xpc3QiLCJhZGQiLCJkcmFnTGVhdmUiLCJyZW1vdmUiLCJkcmFnRHJvcCIsIm9uUmVvcmRlciIsIm5ld0xpc3QiLCJzbGljZSIsIm1vdmVkIiwic3BsaWNlIiwibmF2YmFySXRlbSIsIml0ZW0iLCJjbGFzc05hbWUiLCJhY3RpdmVLZXkiLCJmb250V2VpZ2h0IiwiZm9udFNpemUiLCJoZWlnaHQiLCJhbGxvd0Nsb3NlIiwibmF2UmVuZGVyZXIiLCJhbGxvd1Jlb3JkZXIiLCJhY3RpdmVLZXlJbmRleCIsImFjdGl2ZUl0ZW1JbmRleCIsImJ1dHRvbkNsYXNzIiwic2VsZWN0ZWQiLCJkcmFnT3B0aW9ucyIsIm9uRHJhZ1N0YXJ0Iiwib25EcmFnRW50ZXIiLCJvbkRyYWdMZWF2ZSIsIm9uRHJhZ0VuZCIsImRyYWdnYWJsZSIsIm1pbkhlaWdodCIsIlN0cmluZyIsInIiLCJuYW1lIiwiZG9MaW5lQ291bnQiLCJzb21lIiwicmVzb2x2ZUFjdGl2ZUl0ZW1Gcm9tT3B0aW9ucyIsInNlbGVjdE9wdGlvbnMiLCJhY3RpdmVJdGVtIiwiZmluZCIsIm9wdHMiLCJ2YWx1ZSIsImZpbmRJbmRleCIsImNvbWJvYm94IiwibmF2TGlzdCIsIm1hcCIsInJlYWxJbmRleCIsImRyb3Bkb3duT3B0aW9ucyIsImNsb3NlIiwib3B0aW9ucyIsImxpbmVDb3VudE5lZWRlZCIsImN1c3RvbUJvcmRlckNsYXNzIiwiaW5hY3RpdmVCb3JkZXIiLCJib3JkZXJDbGFzcyIsImNvbXBvbmVudERpZE1vdW50Iiwid2luZG93IiwiYWRkRXZlbnRMaXN0ZW5lciIsImNvbXBvbmVudERpZFVwZGF0ZSIsInByZXZQcm9wcyIsInByZXZTdGF0ZSIsImNvbXBvbmVudFdpbGxVbm1vdW50IiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsInJlbmRlciIsInZpc2libGVMaXN0IiwiaXRlbUNsYXNzTmFtZSIsIml0ZW1zIiwibGluZUNvdW50IiwibmF2YmFyU3R5bGUiLCJtYXhIZWlnaHQiLCJoZWlnaHRQeCIsInBhcnNlSW50IiwibGluZUhlaWdodCIsIkNvbXBvbmVudCIsImRlZmF1bHRQcm9wcyIsInBsYWNlaG9sZGVyIiwiY29tcG9uZW50TGVmdCIsImNvbXBvbmVudFJpZ2h0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEtBQUtBLEtBQVosTUFBdUIsT0FBdkI7QUFDQSxPQUFPQyxTQUFQLE1BQXNCLFlBQXRCO0FBQ0EsT0FBT0MsVUFBUCxNQUF1QixZQUF2QjtBQUNBLFNBQVNDLFFBQVQsUUFBeUIsVUFBekI7QUFD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LE1BQXFCLElBQXJCLElBQTZCMkQsU0FBakMsRUFBNEM7QUFDMUMsVUFBTUcsV0FBV0MsU0FBU3RELE9BQU9ULEtBQVAsQ0FBYSxDQUFiLEVBQWdCLENBQUMsQ0FBakIsQ0FBVCxFQUE4QixFQUE5QixDQUFqQjtBQUNBNEQsa0JBQVlJLFVBQVosR0FBNEJGLFdBQVcsQ0FBdkM7QUFDRDtBQUNELFdBQ0U7QUFBQTtBQUFBO0FBQ0UsWUFBT2hGLEVBQVAsZUFERjtBQUVFLGFBQUssYUFBQzJDLENBQUQsRUFBTztBQUNWLGlCQUFLN0Qsa0JBQUwsR0FBMEI2RCxDQUExQjtBQUNELFNBSkg7QUFLRSxtQkFBV3pFLDBDQUEwQ3FELFNBQTFDLENBTGI7QUFNRSxlQUFPdUQ7QUFOVDtBQVFHRixXQVJIO0FBU0csV0FBS3RCLFFBQUw7QUFUSCxLQURGO0FBYUQsRzs7O0VBalQ2Q3RGLE1BQU1tSCxTLFVBcUI3Q0MsWSxHQUFlO0FBQ3BCcEYsTUFBSSxtQkFEZ0I7QUFFcEJ1QixhQUFXLEVBRlM7QUFHcEJyQixZQUFVLG9CQUFNLENBQUUsQ0FIRTtBQUlwQkksV0FBUyxtQkFBTSxDQUFFLENBSkc7QUFLcEJzQixjQUFZLEtBTFE7QUFNcEJFLGdCQUFjLEtBTk07QUFPcEJKLFlBQVUsU0FQVTtBQVFwQkQsY0FBWSxTQVJRO0FBU3BCNEQsZUFBYSxTQVRPO0FBVXBCMUQsVUFBUSxFQVZZO0FBV3BCMkQsaUJBQWUsSUFYSztBQVlwQkMsa0JBQWdCO0FBWkksQztTQXJCSGxILGtCIiwiZmlsZSI6InJlc3BvbnNpdmUtdGFiLXBpbGxzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBjbGFzc25hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IHsgZGVib3VuY2UgfSBmcm9tICdkZWJvdW5jZSc7XG5pbXBvcnQgRHJvcERvd24gZnJvbSAnLi9kcm9wZG93bic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlc3BvbnNpdmVUYWJQaWxscyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgaWQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgYWxsb3dDbG9zZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgb25DbG9zZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgYWxsb3dSZW9yZGVyOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBuYXZSZW5kZXJlcjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgY2xhc3NOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGZvbnRTaXplOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGZvbnRXZWlnaHQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgYWN0aXZlS2V5OiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc2hhcGUoe30pLCBQcm9wVHlwZXMubnVtYmVyXSkuaXNSZXF1aXJlZCxcbiAgICBsaXN0OiBQcm9wVHlwZXMuYXJyYXlPZihcbiAgICAgIFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICAgIG5hbWU6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5ub2RlXSkuaXNSZXF1aXJlZCxcbiAgICAgICAgaWQ6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5udW1iZXJdKSxcbiAgICAgIH0pXG4gICAgKS5pc1JlcXVpcmVkLFxuICAgIG9uU2VsZWN0OiBQcm9wVHlwZXMuZnVuYyxcbiAgICBoZWlnaHQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gIH07XG5cbiAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICBpZDogJ3Jlc3BvbnNpdmUtbmF2YmFyJyxcbiAgICBjbGFzc05hbWU6ICcnLFxuICAgIG9uU2VsZWN0OiAoKSA9PiB7fSxcbiAgICBvbkNsb3NlOiAoKSA9PiB7fSxcbiAgICBhbGxvd0Nsb3NlOiBmYWxzZSxcbiAgICBhbGxvd1Jlb3JkZXI6IGZhbHNlLFxuICAgIGZvbnRTaXplOiAnaW5oZXJpdCcsXG4gICAgZm9udFdlaWdodDogJ2luaGVyaXQnLFxuICAgIHBsYWNlaG9sZGVyOiAnbW9yZS4uLicsXG4gICAgaGVpZ2h0OiAzMCxcbiAgICBjb21wb25lbnRMZWZ0OiBudWxsLFxuICAgIGNvbXBvbmVudFJpZ2h0OiBudWxsLFxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuaXRlbVdpZHRocyA9IFtdOyAvLyBzdG9yZSBpdGVtIHdpZHRocyBoZXJlLCB0aGV5IGRvbid0IGNoYW5nZVxuICB9XG5cbiAgc3RhdGUgPSB7XG4gICAgZHJhZ0Zyb206IG51bGwsXG4gICAgZHJhZ1RvOiBudWxsLFxuICAgIGlzU2VsZWN0VmlzaWJsZTogZmFsc2UsXG4gICAgbGFzdFZpc2libGVJdGVtSW5kZXg6IC0yLFxuICB9O1xuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLmhhbmRsZVJlc2l6ZSk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ29yaWVudGF0aW9uY2hhbmdlJywgdGhpcy5yZWZyZXNoTGFzdFZpc2libGVJdGVtKTsgLy8gZm9yIG1vYmlsZSBzdXBwb3J0XG4gICAgdGhpcy5yZWZyZXNoTGFzdFZpc2libGVJdGVtKCk7XG4gIH1cblxuICBjb21wb25lbnREaWRVcGRhdGUocHJldlByb3BzLCBwcmV2U3RhdGUpIHtcbiAgICAvLyBSZWZyZXNoIHZpc2libGUgaXRlbXMgaWYgdmFsdWVzIGNoYW5nZVxuICAgIGlmICh0aGlzLnN0YXRlLmlzU2VsZWN0VmlzaWJsZSAhPT0gcHJldlN0YXRlLmlzU2VsZWN0VmlzaWJsZSB8fCB0aGlzLnN0YXRlLmxhc3RWaXNpYmxlSXRlbUluZGV4ICE9PSBwcmV2U3RhdGUubGFzdFZpc2libGVJdGVtSW5kZXgpIHtcbiAgICAgIHRoaXMucmVmcmVzaExhc3RWaXNpYmxlSXRlbSgpO1xuICAgIH1cbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLmhhbmRsZVJlc2l6ZSk7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ29yaWVudGF0aW9uY2hhbmdlJywgdGhpcy5yZWZyZXNoTGFzdFZpc2libGVJdGVtKTsgLy8gZm9yIG1vYmlsZSBzdXBwb3J0XG4gIH1cblxuICBnZXRMYXN0VmlzaWJsZUl0ZW1JbmRleCA9ICgpID0+IHtcbiAgICBjb25zdCBuYXZCYXJXaWR0aCA9IHRoaXMubmF2YmFyQ29udGFpbmVyUmVmID8gdGhpcy5uYXZiYXJDb250YWluZXJSZWYub2Zmc2V0V2lkdGggOiAwO1xuICAgIGNvbnN0IHNlbGVjdFdpZHRoID0gdGhpcy5zZWxlY3RDb250YWluZXJSZWYgPyB0aGlzLnNlbGVjdENvbnRhaW5lclJlZi5vZmZzZXRXaWR0aCA6IDA7XG4gICAgY29uc3QgY29tcG9uZW50TGVmdFdpZHRoID0gdGhpcy5jb21wb25lbnRMZWZ0Q29udGFpbmVyUmVmID8gdGhpcy5jb21wb25lbnRMZWZ0Q29udGFpbmVyUmVmLm9mZnNldFdpZHRoIDogMDsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgIGNvbnN0IGNvbXBvbmVudFJpZ2h0V2lkdGggPSB0aGlzLmNvbXBvbmVudFJpZ2h0Q29udGFpbmVyUmVmID8gdGhpcy5jb21wb25lbnRSaWdodENvbnRhaW5lclJlZi5vZmZzZXRXaWR0aCA6IDA7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcblxuICAgIGxldCByZW1haW5pbmdXaWR0aCA9IG5hdkJhcldpZHRoIC0gc2VsZWN0V2lkdGggLSBjb21wb25lbnRMZWZ0V2lkdGggLSBjb21wb25lbnRSaWdodFdpZHRoO1xuICAgIGxldCBsYXN0VmlzaWJsZSA9IDA7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucHJvcHMubGlzdC5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgcmVtYWluaW5nV2lkdGggLT0gdGhpcy5pdGVtV2lkdGhzW2ldO1xuICAgICAgaWYgKHJlbWFpbmluZ1dpZHRoIDwgMCkge1xuICAgICAgICBsYXN0VmlzaWJsZSAtPSAxO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGxhc3RWaXNpYmxlICs9IDE7XG4gICAgfVxuXG4gICAgcmV0dXJuIGxhc3RWaXNpYmxlO1xuICB9O1xuXG4gIGhhbmRsZVJlc2l6ZSA9ICgpID0+IGRlYm91bmNlKHRoaXMucmVmcmVzaExhc3RWaXNpYmxlSXRlbSgpLCAzMDApO1xuXG4gIHJlZnJlc2hMYXN0VmlzaWJsZUl0ZW0gPSAoKSA9PiB7XG4gICAgY29uc3QgbGFzdFZpc2libGVJdGVtSW5kZXggPSB0aGlzLmdldExhc3RWaXNpYmxlSXRlbUluZGV4KCk7XG4gICAgaWYgKHRoaXMuc3RhdGUubGFzdFZpc2libGVJdGVtSW5kZXggIT09IGxhc3RWaXNpYmxlSXRlbUluZGV4KSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgaXNTZWxlY3RWaXNpYmxlOiB0aGlzLnByb3BzLmxpc3QubGVuZ3RoID4gbGFzdFZpc2libGVJdGVtSW5kZXggKyAxLFxuICAgICAgICBsYXN0VmlzaWJsZUl0ZW1JbmRleCxcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcblxuICBoYW5kbGVPbkNsaWNrID0gKGlkLCBpbmRleCkgPT4ge1xuICAgIHRoaXMucHJvcHMub25TZWxlY3QoaWQsIGluZGV4KTtcbiAgfTtcblxuICBoYW5kbGVDbG9zZSA9IChldmVudCwgaWQsIGluZGV4KSA9PiB7XG4gICAgLy8gZG9uJ3QgYnViYmxlIHRvIGNsaWNrIGFsc28sIHdlIGdvdCByaWQgb2YgdGhpc1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIHRoaXMucHJvcHMub25DbG9zZShpZCwgaW5kZXgpO1xuICB9O1xuXG4gIGRyYWdTdGFydCA9IChpbmRleCkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgZHJhZ0Zyb206IGluZGV4LFxuICAgIH0pO1xuICB9O1xuXG4gIGRyYWdFbnRlciA9IChpbmRleCwgZSkgPT4ge1xuICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2Ryb3BwYWJsZScpO1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgZHJhZ1RvOiBpbmRleCxcbiAgICB9KTtcbiAgfTtcblxuICBkcmFnTGVhdmUgPSAoaW5kZXgsIGUpID0+IHtcbiAgICBlLnRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKCdkcm9wcGFibGUnKTtcbiAgfTtcblxuICBkcmFnRHJvcCA9ICgpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5vblJlb3JkZXIpIHtcbiAgICAgIGNvbnN0IHsgZHJhZ0Zyb20sIGRyYWdUbyB9ID0gdGhpcy5zdGF0ZTtcbiAgICAgIGNvbnN0IG5ld0xpc3QgPSB0aGlzLnByb3BzLmxpc3Quc2xpY2UoKTtcbiAgICAgIGNvbnN0IG1vdmVkID0gbmV3TGlzdFtkcmFnRnJvbV07XG5cbiAgICAgIG5ld0xpc3Quc3BsaWNlKGRyYWdGcm9tLCAxKTtcbiAgICAgIG5ld0xpc3Quc3BsaWNlKGRyYWdUbywgMCwgbW92ZWQpO1xuXG4gICAgICB0aGlzLnByb3BzLm9uUmVvcmRlcihuZXdMaXN0LCBkcmFnRnJvbSwgZHJhZ1RvKTtcbiAgICAgIHRoaXMucHJvcHMub25TZWxlY3QobW92ZWQsIGRyYWdUbyk7XG5cbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBkcmFnVG86IG51bGwsXG4gICAgICAgIGRyYWdGcm9tOiBudWxsLFxuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gIC8vIFJlbmRlciBuYXZiYXIgaXRlbVxuICBuYXZiYXJJdGVtID0gKGl0ZW0sIGluZGV4LCBjbGFzc05hbWUpID0+IHtcbiAgICBjb25zdCB7IGFjdGl2ZUtleSwgZm9udFdlaWdodCwgZm9udFNpemUsIGhlaWdodCwgYWxsb3dDbG9zZSwgbmF2UmVuZGVyZXIsIGFsbG93UmVvcmRlciB9ID0gdGhpcy5wcm9wcztcblxuICAgIGlmIChuYXZSZW5kZXJlcikge1xuICAgICAgcmV0dXJuIG5hdlJlbmRlcmVyKGl0ZW0sIGluZGV4LCBjbGFzc05hbWUsIGFjdGl2ZUtleSA9PT0gaW5kZXgpO1xuICAgIH1cblxuICAgIC8vIHJlc29sdmUgYWN0aXZlS2V5SW5kZXhcbiAgICBsZXQgYWN0aXZlS2V5SW5kZXggPSBhY3RpdmVLZXk7XG4gICAgaWYgKHR5cGVvZiBhY3RpdmVLZXkgPT09ICdvYmplY3QnKSB7XG4gICAgICBhY3RpdmVLZXlJbmRleCA9IHRoaXMuYWN0aXZlSXRlbUluZGV4KGFjdGl2ZUtleSk7XG4gICAgfVxuXG4gICAgY29uc3QgYnV0dG9uQ2xhc3MgPSBjbGFzc25hbWVzKGNsYXNzTmFtZSwgJ2dyYWJiYWJsZScsIHtcbiAgICAgIHNlbGVjdGVkOiBpbmRleCA9PT0gYWN0aXZlS2V5SW5kZXgsXG4gICAgICAnd2l0aC1jbG9zZSc6IGFsbG93Q2xvc2UsXG4gICAgfSk7XG5cbiAgICBjb25zdCBkcmFnT3B0aW9ucyA9IGFsbG93UmVvcmRlclxuICAgICAgPyB7XG4gICAgICAgICAgb25EcmFnU3RhcnQ6IChlKSA9PiB0aGlzLmRyYWdTdGFydChpbmRleCwgZSksXG4gICAgICAgICAgb25EcmFnRW50ZXI6IChlKSA9PiB0aGlzLmRyYWdFbnRlcihpbmRleCwgZSksXG4gICAgICAgICAgb25EcmFnTGVhdmU6IChlKSA9PiB0aGlzLmRyYWdMZWF2ZShpbmRleCwgZSksXG4gICAgICAgICAgb25EcmFnRW5kOiB0aGlzLmRyYWdEcm9wLFxuICAgICAgICAgIGRyYWdnYWJsZTogdHJ1ZSxcbiAgICAgICAgfVxuICAgICAgOiB7fTtcblxuICAgIHJldHVybiAoXG4gICAgICA8YnV0dG9uXG4gICAgICAgIHsuLi5kcmFnT3B0aW9uc31cbiAgICAgICAgY2xhc3NOYW1lPXtidXR0b25DbGFzc31cbiAgICAgICAgc3R5bGU9e3sgZm9udFdlaWdodCwgZm9udFNpemUsIG1pbkhlaWdodDogaGVpZ2h0IH19XG4gICAgICAgIGlkPXtpdGVtLmlkIHx8IGBuYXZJdGVtJHtTdHJpbmcoaW5kZXgpfWB9XG4gICAgICAgIGtleT17aXRlbS5pZCB8fCBgbmF2aXRlbSR7U3RyaW5nKGluZGV4KX1gfVxuICAgICAgICBvbkNsaWNrPXsoKSA9PiB0aGlzLmhhbmRsZU9uQ2xpY2soaXRlbS5pZCwgaW5kZXgpfVxuICAgICAgICByZWY9eyhyKSA9PiB7XG4gICAgICAgICAgaWYgKHIgJiYgIXRoaXMuaXRlbVdpZHRoc1tpbmRleF0pIHRoaXMuaXRlbVdpZHRoc1tpbmRleF0gPSByLm9mZnNldFdpZHRoO1xuICAgICAgICB9fVxuICAgICAgPlxuICAgICAgICA8c3BhbiBjbGFzc05hbWU9J3Jlc3BvbnNpdmUtbmF2YmFyLWl0ZW0tdGV4dCc+XG4gICAgICAgICAge2l0ZW0ubmFtZX1cbiAgICAgICAgICB7LyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGpzeC1hMTF5L2NsaWNrLWV2ZW50cy1oYXZlLWtleS1ldmVudHMgKi99XG4gICAgICAgICAge2FsbG93Q2xvc2UgJiYgPGkgdGFiSW5kZXg9e2luZGV4ICsgMX0gcm9sZT0nYnV0dG9uJyBjbGFzc05hbWU9J2ZhIGZhLXRpbWVzJyBvbkNsaWNrPXsoZXZlbnQpID0+IHRoaXMuaGFuZGxlQ2xvc2UoZXZlbnQsIGl0ZW0uaWQsIGluZGV4KX0gLz59XG4gICAgICAgIDwvc3Bhbj5cbiAgICAgIDwvYnV0dG9uPlxuICAgICk7XG4gIH07XG5cbiAgZG9MaW5lQ291bnQgPSAoKSA9PiB7XG4gICAgY29uc3QgeyBsaXN0IH0gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiBsaXN0LnNvbWUoKGl0ZW0pID0+IHR5cGVvZiBpdGVtLm5hbWUgIT09ICdzdHJpbmcnKTtcbiAgfTtcblxuICByZXNvbHZlQWN0aXZlSXRlbUZyb21PcHRpb25zID0gKHNlbGVjdE9wdGlvbnMpID0+IHtcbiAgICBjb25zdCB7IGFjdGl2ZUtleSB9ID0gdGhpcy5wcm9wcztcbiAgICBsZXQgYWN0aXZlSXRlbSA9IHNlbGVjdE9wdGlvbnMuZmluZCgob3B0cykgPT4gb3B0cy52YWx1ZSA9PT0gYWN0aXZlS2V5KTtcbiAgICBpZiAoIWFjdGl2ZUl0ZW0pIHtcbiAgICAgIGFjdGl2ZUl0ZW0gPSBzZWxlY3RPcHRpb25zLmZpbmQoKG9wdHMpID0+IG9wdHMudmFsdWUgPT09IGFjdGl2ZUtleS52YWx1ZSk7XG4gICAgfVxuICAgIHJldHVybiBhY3RpdmVJdGVtO1xuICB9O1xuXG4gIGFjdGl2ZUl0ZW1JbmRleCA9IChhY3RpdmVJdGVtKSA9PiB7XG4gICAgY29uc3QgeyBsaXN0IH0gPSB0aGlzLnByb3BzO1xuICAgIGlmICghYWN0aXZlSXRlbSkgcmV0dXJuIG51bGw7XG4gICAgcmV0dXJuIGxpc3QuZmluZEluZGV4KChpdGVtKSA9PiBpdGVtLmlkID09PSBhY3RpdmVJdGVtLnZhbHVlKTtcbiAgfTtcblxuICAvLyBSZW5kZXIgY29tYm9ib3gsIHdoZW4gYWxsIGl0ZW1zIGRvIG5vdCBmaXRcbiAgY29tYm9ib3ggPSAoKSA9PiB7XG4gICAgY29uc3QgeyBpZCwgbGlzdCwgZm9udFNpemUsIGZvbnRXZWlnaHQsIGFsbG93UmVvcmRlciwgYWN0aXZlS2V5LCBhbGxvd0Nsb3NlIH0gPSB0aGlzLnByb3BzO1xuICAgIGlmICghdGhpcy5zdGF0ZS5pc1NlbGVjdFZpc2libGUpIHtcbiAgICAgIC8vIHJldHVybiBudWxsIGlmIGFsbCBuYXYgaXRlbXMgYXJlIHZpc2libGVcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIC8vIHNsaWNlIG5hdiBpdGVtcyBsaXN0IGFuZCBzaG93IGludmlzaWJsZSBpdGVtcyBpbiB0aGUgY29tYm9ib3hcbiAgICBjb25zdCBuYXZMaXN0ID0gdGhpcy5zdGF0ZS5sYXN0VmlzaWJsZUl0ZW1JbmRleCA+IC0yID8gbGlzdC5zbGljZSh0aGlzLnN0YXRlLmxhc3RWaXNpYmxlSXRlbUluZGV4ICsgMSkgOiBsaXN0O1xuICAgIGNvbnN0IHNlbGVjdE9wdGlvbnMgPSBuYXZMaXN0Lm1hcCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgIGNvbnN0IHJlYWxJbmRleCA9IGluZGV4ICsgdGhpcy5zdGF0ZS5sYXN0VmlzaWJsZUl0ZW1JbmRleCArIDE7XG5cbiAgICAgIGNvbnN0IGRyYWdPcHRpb25zID0gYWxsb3dSZW9yZGVyXG4gICAgICAgID8ge1xuICAgICAgICAgIG9uRHJhZ1N0YXJ0OiAoZSkgPT4gdGhpcy5kcmFnU3RhcnQocmVhbEluZGV4LCBlKSxcbiAgICAgICAgICBvbkRyYWdFbnRlcjogKGUpID0+IHRoaXMuZHJhZ0VudGVyKHJlYWxJbmRleCwgZSksXG4gICAgICAgICAgb25EcmFnTGVhdmU6IChlKSA9PiB0aGlzLmRyYWdMZWF2ZShpbmRleCwgZSksXG4gICAgICAgICAgb25EcmFnRW5kOiB0aGlzLmRyYWdEcm9wLFxuICAgICAgICAgIGRyYWdnYWJsZTogdHJ1ZSxcbiAgICAgICAgfVxuICAgICAgICA6IHt9O1xuXG4gICAgICBjb25zdCBkcm9wZG93bk9wdGlvbnMgPSB7XG4gICAgICAgIGNsYXNzTmFtZTogY2xhc3NuYW1lcygnZHJvcGRvd24tb3B0aW9uJywgeyBzZWxlY3RlZDogbGlzdFthY3RpdmVLZXldLmlkID09PSBpdGVtLmlkIH0pLFxuICAgICAgICBjbG9zZTogYWxsb3dDbG9zZSA/IChcbiAgICAgICAgICA8aSByb2xlPSdidXR0b24nIGNsYXNzTmFtZT0nZmEgZmEtdGltZXMnIG9uQ2xpY2s9eyhldmVudCkgPT4gdGhpcy5oYW5kbGVDbG9zZShldmVudCwgaXRlbS5pZCwgcmVhbEluZGV4KX0gLz5cbiAgICAgICAgKSA6IG51bGwsXG4gICAgICAgIG9uU2VsZWN0OiAoKSA9PiB7XG4gICAgICAgICAgdGhpcy5oYW5kbGVPbkNsaWNrKGl0ZW0uaWQsIHJlYWxJbmRleCk7XG4gICAgICAgIH0sXG4gICAgICAgIC4uLmRyYWdPcHRpb25zXG4gICAgICB9O1xuXG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLml0ZW0sXG4gICAgICAgIG9wdGlvbnM6IGRyb3Bkb3duT3B0aW9uc1xuICAgICAgfTtcbiAgICB9KTtcblxuICAgIGNvbnN0IGxpbmVDb3VudE5lZWRlZCA9IHRoaXMuZG9MaW5lQ291bnQoKTtcbiAgICBjb25zdCBjdXN0b21Cb3JkZXJDbGFzcyA9IGxpbmVDb3VudE5lZWRlZCA/ICdzZWxlY3RlZCBsaW5lLWNvdW50JyA6ICdzZWxlY3RlZCc7XG4gICAgY29uc3QgaW5hY3RpdmVCb3JkZXIgPSBsaW5lQ291bnROZWVkZWQgPyAnaW5hY3RpdmUgbGluZS1jb3VudCcgOiAnaW5hY3RpdmUnO1xuICAgIC8vIFJlc29sdmUgYWN0aXZlSXRlbVxuICAgIGNvbnN0IGFjdGl2ZUl0ZW0gPSB0aGlzLnJlc29sdmVBY3RpdmVJdGVtRnJvbU9wdGlvbnMoc2VsZWN0T3B0aW9ucyk7XG4gICAgY29uc3QgYWN0aXZlSXRlbUluZGV4ID0gdGhpcy5hY3RpdmVJdGVtSW5kZXgoYWN0aXZlSXRlbSk7XG4gICAgY29uc3QgYm9yZGVyQ2xhc3MgPSBhY3RpdmVJdGVtSW5kZXggPj0gdGhpcy5zdGF0ZS5sYXN0VmlzaWJsZUl0ZW1JbmRleCArIDEgPyBjdXN0b21Cb3JkZXJDbGFzcyA6IGluYWN0aXZlQm9yZGVyOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdlxuICAgICAgICBpZD17YCR7aWR9LXNlbGVjdGB9XG4gICAgICAgIGNsYXNzTmFtZT17YHJlc3BvbnNpdmUtbmF2YmFyLXNlbGVjdCAke2JvcmRlckNsYXNzfWB9XG4gICAgICAgIHN0eWxlPXt7IGZvbnRXZWlnaHQsIGZvbnRTaXplIH19XG4gICAgICAgIHJlZj17KHIpID0+IHtcbiAgICAgICAgICB0aGlzLnNlbGVjdENvbnRhaW5lclJlZiA9IHI7XG4gICAgICAgIH19XG4gICAgICA+XG4gICAgICAgIDxEcm9wRG93biB2YWx1ZT17bGlzdFthY3RpdmVLZXldfSBvcHRpb25zPXtzZWxlY3RPcHRpb25zfSAvPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfTtcblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBpZCwgY2xhc3NOYW1lLCBsaXN0LCBoZWlnaHQgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgdmlzaWJsZUxpc3QgPSB0aGlzLnN0YXRlLmxhc3RWaXNpYmxlSXRlbUluZGV4ID4gLTIgPyBsaXN0LnNsaWNlKDAsIHRoaXMuc3RhdGUubGFzdFZpc2libGVJdGVtSW5kZXggKyAxKSA6IGxpc3Q7XG4gICAgY29uc3QgaXRlbUNsYXNzTmFtZSA9ICdyZXNwb25zaXZlLW5hdmJhci1pdGVtIGluYWN0aXZlLWJvcmRlcic7XG4gICAgY29uc3QgaXRlbXMgPSB2aXNpYmxlTGlzdC5tYXAoKGl0ZW0sIGluZGV4KSA9PiB0aGlzLm5hdmJhckl0ZW0oaXRlbSwgaW5kZXgsIGl0ZW1DbGFzc05hbWUpKTtcbiAgICBjb25zdCBsaW5lQ291bnQgPSB0aGlzLmRvTGluZUNvdW50KCk7XG4gICAgY29uc3QgbmF2YmFyU3R5bGUgPSB7XG4gICAgICBtaW5IZWlnaHQ6IGhlaWdodCxcbiAgICAgIG1heEhlaWdodDogaGVpZ2h0LFxuICAgIH07XG4gICAgaWYgKGhlaWdodC5zbGljZSgtMikgPT09ICdweCcgJiYgbGluZUNvdW50KSB7XG4gICAgICBjb25zdCBoZWlnaHRQeCA9IHBhcnNlSW50KGhlaWdodC5zbGljZSgwLCAtMiksIDEwKTtcbiAgICAgIG5hdmJhclN0eWxlLmxpbmVIZWlnaHQgPSBgJHtoZWlnaHRQeCAtIDR9cHhgO1xuICAgIH1cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdlxuICAgICAgICBpZD17YCR7aWR9LWNvbnRhaW5lcmB9XG4gICAgICAgIHJlZj17KHIpID0+IHtcbiAgICAgICAgICB0aGlzLm5hdmJhckNvbnRhaW5lclJlZiA9IHI7XG4gICAgICAgIH19XG4gICAgICAgIGNsYXNzTmFtZT17Y2xhc3NuYW1lcyhgcmVzcG9uc2l2ZS1uYXZiYXItY29udGFpbmVyYCwgY2xhc3NOYW1lKX1cbiAgICAgICAgc3R5bGU9e25hdmJhclN0eWxlfVxuICAgICAgPlxuICAgICAgICB7aXRlbXN9XG4gICAgICAgIHt0aGlzLmNvbWJvYm94KCl9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG4iXX0=