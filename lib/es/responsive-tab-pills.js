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
        className: classnames('responsive-tab-pills-dropdown', className),
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yZXNwb25zaXZlLXRhYi1waWxscy5qc3giXSwibmFtZXMiOlsiUmVhY3QiLCJQcm9wVHlwZXMiLCJjbGFzc25hbWVzIiwiZGVib3VuY2UiLCJEcm9wRG93biIsIlJlc3BvbnNpdmVUYWJQaWxscyIsInByb3BzIiwic3RhdGUiLCJkcmFnRnJvbSIsImRyYWdUbyIsImlzU2VsZWN0VmlzaWJsZSIsImxhc3RWaXNpYmxlSXRlbUluZGV4IiwiZ2V0TGFzdFZpc2libGVJdGVtSW5kZXgiLCJuYXZCYXJXaWR0aCIsIm5hdmJhckNvbnRhaW5lclJlZiIsIm9mZnNldFdpZHRoIiwic2VsZWN0V2lkdGgiLCJzZWxlY3RDb250YWluZXJSZWYiLCJjb21wb25lbnRMZWZ0V2lkdGgiLCJjb21wb25lbnRMZWZ0Q29udGFpbmVyUmVmIiwiY29tcG9uZW50UmlnaHRXaWR0aCIsImNvbXBvbmVudFJpZ2h0Q29udGFpbmVyUmVmIiwicmVtYWluaW5nV2lkdGgiLCJsYXN0VmlzaWJsZSIsImkiLCJsaXN0IiwibGVuZ3RoIiwiaXRlbVdpZHRocyIsImhhbmRsZVJlc2l6ZSIsInJlZnJlc2hMYXN0VmlzaWJsZUl0ZW0iLCJzZXRTdGF0ZSIsImhhbmRsZU9uQ2xpY2siLCJpZCIsImluZGV4Iiwib25TZWxlY3QiLCJoYW5kbGVDbG9zZSIsImV2ZW50Iiwic3RvcFByb3BhZ2F0aW9uIiwib25DbG9zZSIsImRyYWdTdGFydCIsImRyYWdFbnRlciIsImUiLCJ0YXJnZXQiLCJjbGFzc0xpc3QiLCJhZGQiLCJkcmFnTGVhdmUiLCJyZW1vdmUiLCJkcmFnRHJvcCIsIm9uUmVvcmRlciIsIm5ld0xpc3QiLCJzbGljZSIsIm1vdmVkIiwic3BsaWNlIiwibmF2YmFySXRlbSIsIml0ZW0iLCJjbGFzc05hbWUiLCJhY3RpdmVLZXkiLCJmb250V2VpZ2h0IiwiZm9udFNpemUiLCJoZWlnaHQiLCJhbGxvd0Nsb3NlIiwibmF2UmVuZGVyZXIiLCJhbGxvd1Jlb3JkZXIiLCJhY3RpdmVLZXlJbmRleCIsImFjdGl2ZUl0ZW1JbmRleCIsImJ1dHRvbkNsYXNzIiwic2VsZWN0ZWQiLCJkcmFnT3B0aW9ucyIsIm9uRHJhZ1N0YXJ0Iiwib25EcmFnRW50ZXIiLCJvbkRyYWdMZWF2ZSIsIm9uRHJhZ0VuZCIsImRyYWdnYWJsZSIsIm1pbkhlaWdodCIsIlN0cmluZyIsInIiLCJuYW1lIiwiZG9MaW5lQ291bnQiLCJzb21lIiwicmVzb2x2ZUFjdGl2ZUl0ZW1Gcm9tT3B0aW9ucyIsInNlbGVjdE9wdGlvbnMiLCJhY3RpdmVJdGVtIiwiZmluZCIsIm9wdHMiLCJ2YWx1ZSIsImZpbmRJbmRleCIsImNvbWJvYm94IiwibmF2TGlzdCIsIm1hcCIsInJlYWxJbmRleCIsImRyb3Bkb3duT3B0aW9ucyIsImNsb3NlIiwib3B0aW9ucyIsImxpbmVDb3VudE5lZWRlZCIsImN1c3RvbUJvcmRlckNsYXNzIiwiaW5hY3RpdmVCb3JkZXIiLCJib3JkZXJDbGFzcyIsImNvbXBvbmVudERpZE1vdW50Iiwid2luZG93IiwiYWRkRXZlbnRMaXN0ZW5lciIsImNvbXBvbmVudERpZFVwZGF0ZSIsInByZXZQcm9wcyIsInByZXZTdGF0ZSIsImNvbXBvbmVudFdpbGxVbm1vdW50IiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsInJlbmRlciIsInZpc2libGVMaXN0IiwiaXRlbUNsYXNzTmFtZSIsIml0ZW1zIiwibGluZUNvdW50IiwibmF2YmFyU3R5bGUiLCJtYXhIZWlnaHQiLCJoZWlnaHRQeCIsInBhcnNlSW50IiwibGluZUhlaWdodCIsIkNvbXBvbmVudCIsImRlZmF1bHRQcm9wcyIsInBsYWNlaG9sZGVyIiwiY29tcG9uZW50TGVmdCIsImNvbXBvbmVudFJpZ2h0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEtBQUtBLEtBQVosTUFBdUIsT0FBdkI7QUFDQSxPQUFPQyxTQUFQLE1BQXNCLFlBQXRCO0FBQ0EsT0FBT0MsVUFBUCxNQUF1QixZQUF2QjtBQUNBLFNBQVNDLFFBQVQsUUFBeUIsVUFBekI7QUFD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TUFBcUIsSUFBckIsSUFBNkIyRCxTQUFqQyxFQUE0QztBQUMxQyxVQUFNRyxXQUFXQyxTQUFTdEQsT0FBT1QsS0FBUCxDQUFhLENBQWIsRUFBZ0IsQ0FBQyxDQUFqQixDQUFULEVBQThCLEVBQTlCLENBQWpCO0FBQ0E0RCxrQkFBWUksVUFBWixHQUE0QkYsV0FBVyxDQUF2QztBQUNEO0FBQ0QsV0FDRTtBQUFBO0FBQUE7QUFDRSxZQUFPaEYsRUFBUCxlQURGO0FBRUUsYUFBSyxhQUFDMkMsQ0FBRCxFQUFPO0FBQ1YsaUJBQUs3RCxrQkFBTCxHQUEwQjZELENBQTFCO0FBQ0QsU0FKSDtBQUtFLG1CQUFXekUsNENBQTRDcUQsU0FBNUMsQ0FMYjtBQU1FLGVBQU91RDtBQU5UO0FBUUdGLFdBUkg7QUFTRyxXQUFLdEIsUUFBTDtBQVRILEtBREY7QUFhRCxHOzs7RUFqVDZDdEYsTUFBTW1ILFMsVUFxQjdDQyxZLEdBQWU7QUFDcEJwRixNQUFJLG1CQURnQjtBQUVwQnVCLGFBQVcsRUFGUztBQUdwQnJCLFlBQVUsb0JBQU0sQ0FBRSxDQUhFO0FBSXBCSSxXQUFTLG1CQUFNLENBQUUsQ0FKRztBQUtwQnNCLGNBQVksS0FMUTtBQU1wQkUsZ0JBQWMsS0FOTTtBQU9wQkosWUFBVSxTQVBVO0FBUXBCRCxjQUFZLFNBUlE7QUFTcEI0RCxlQUFhLFNBVE87QUFVcEIxRCxVQUFRLEVBVlk7QUFXcEIyRCxpQkFBZSxJQVhLO0FBWXBCQyxrQkFBZ0I7QUFaSSxDO1NBckJIbEgsa0IiLCJmaWxlIjoicmVzcG9uc2l2ZS10YWItcGlsbHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IGNsYXNzbmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgeyBkZWJvdW5jZSB9IGZyb20gJ2RlYm91bmNlJztcbmltcG9ydCBEcm9wRG93biBmcm9tICcuL2Ryb3Bkb3duJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVzcG9uc2l2ZVRhYlBpbGxzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBpZDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBhbGxvd0Nsb3NlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBvbkNsb3NlOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBhbGxvd1Jlb3JkZXI6IFByb3BUeXBlcy5ib29sLFxuICAgIG5hdlJlbmRlcmVyOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBjbGFzc05hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgZm9udFNpemU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgZm9udFdlaWdodDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBhY3RpdmVLZXk6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zaGFwZSh7fSksIFByb3BUeXBlcy5udW1iZXJdKS5pc1JlcXVpcmVkLFxuICAgIGxpc3Q6IFByb3BUeXBlcy5hcnJheU9mKFxuICAgICAgUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgICAgbmFtZTogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLm5vZGVdKS5pc1JlcXVpcmVkLFxuICAgICAgICBpZDogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLm51bWJlcl0pLFxuICAgICAgfSlcbiAgICApLmlzUmVxdWlyZWQsXG4gICAgb25TZWxlY3Q6IFByb3BUeXBlcy5mdW5jLFxuICAgIGhlaWdodDogUHJvcFR5cGVzLnN0cmluZyxcbiAgfTtcblxuICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgIGlkOiAncmVzcG9uc2l2ZS1uYXZiYXInLFxuICAgIGNsYXNzTmFtZTogJycsXG4gICAgb25TZWxlY3Q6ICgpID0+IHt9LFxuICAgIG9uQ2xvc2U6ICgpID0+IHt9LFxuICAgIGFsbG93Q2xvc2U6IGZhbHNlLFxuICAgIGFsbG93UmVvcmRlcjogZmFsc2UsXG4gICAgZm9udFNpemU6ICdpbmhlcml0JyxcbiAgICBmb250V2VpZ2h0OiAnaW5oZXJpdCcsXG4gICAgcGxhY2Vob2xkZXI6ICdtb3JlLi4uJyxcbiAgICBoZWlnaHQ6IDMwLFxuICAgIGNvbXBvbmVudExlZnQ6IG51bGwsXG4gICAgY29tcG9uZW50UmlnaHQ6IG51bGwsXG4gIH07XG5cbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5pdGVtV2lkdGhzID0gW107IC8vIHN0b3JlIGl0ZW0gd2lkdGhzIGhlcmUsIHRoZXkgZG9uJ3QgY2hhbmdlXG4gIH1cblxuICBzdGF0ZSA9IHtcbiAgICBkcmFnRnJvbTogbnVsbCxcbiAgICBkcmFnVG86IG51bGwsXG4gICAgaXNTZWxlY3RWaXNpYmxlOiBmYWxzZSxcbiAgICBsYXN0VmlzaWJsZUl0ZW1JbmRleDogLTIsXG4gIH07XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuaGFuZGxlUmVzaXplKTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignb3JpZW50YXRpb25jaGFuZ2UnLCB0aGlzLnJlZnJlc2hMYXN0VmlzaWJsZUl0ZW0pOyAvLyBmb3IgbW9iaWxlIHN1cHBvcnRcbiAgICB0aGlzLnJlZnJlc2hMYXN0VmlzaWJsZUl0ZW0oKTtcbiAgfVxuXG4gIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHMsIHByZXZTdGF0ZSkge1xuICAgIC8vIFJlZnJlc2ggdmlzaWJsZSBpdGVtcyBpZiB2YWx1ZXMgY2hhbmdlXG4gICAgaWYgKHRoaXMuc3RhdGUuaXNTZWxlY3RWaXNpYmxlICE9PSBwcmV2U3RhdGUuaXNTZWxlY3RWaXNpYmxlIHx8IHRoaXMuc3RhdGUubGFzdFZpc2libGVJdGVtSW5kZXggIT09IHByZXZTdGF0ZS5sYXN0VmlzaWJsZUl0ZW1JbmRleCkge1xuICAgICAgdGhpcy5yZWZyZXNoTGFzdFZpc2libGVJdGVtKCk7XG4gICAgfVxuICB9XG5cbiAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuaGFuZGxlUmVzaXplKTtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignb3JpZW50YXRpb25jaGFuZ2UnLCB0aGlzLnJlZnJlc2hMYXN0VmlzaWJsZUl0ZW0pOyAvLyBmb3IgbW9iaWxlIHN1cHBvcnRcbiAgfVxuXG4gIGdldExhc3RWaXNpYmxlSXRlbUluZGV4ID0gKCkgPT4ge1xuICAgIGNvbnN0IG5hdkJhcldpZHRoID0gdGhpcy5uYXZiYXJDb250YWluZXJSZWYgPyB0aGlzLm5hdmJhckNvbnRhaW5lclJlZi5vZmZzZXRXaWR0aCA6IDA7XG4gICAgY29uc3Qgc2VsZWN0V2lkdGggPSB0aGlzLnNlbGVjdENvbnRhaW5lclJlZiA/IHRoaXMuc2VsZWN0Q29udGFpbmVyUmVmLm9mZnNldFdpZHRoIDogMDtcbiAgICBjb25zdCBjb21wb25lbnRMZWZ0V2lkdGggPSB0aGlzLmNvbXBvbmVudExlZnRDb250YWluZXJSZWYgPyB0aGlzLmNvbXBvbmVudExlZnRDb250YWluZXJSZWYub2Zmc2V0V2lkdGggOiAwOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgY29uc3QgY29tcG9uZW50UmlnaHRXaWR0aCA9IHRoaXMuY29tcG9uZW50UmlnaHRDb250YWluZXJSZWYgPyB0aGlzLmNvbXBvbmVudFJpZ2h0Q29udGFpbmVyUmVmLm9mZnNldFdpZHRoIDogMDsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuXG4gICAgbGV0IHJlbWFpbmluZ1dpZHRoID0gbmF2QmFyV2lkdGggLSBzZWxlY3RXaWR0aCAtIGNvbXBvbmVudExlZnRXaWR0aCAtIGNvbXBvbmVudFJpZ2h0V2lkdGg7XG4gICAgbGV0IGxhc3RWaXNpYmxlID0gMDtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5wcm9wcy5saXN0Lmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICByZW1haW5pbmdXaWR0aCAtPSB0aGlzLml0ZW1XaWR0aHNbaV07XG4gICAgICBpZiAocmVtYWluaW5nV2lkdGggPCAwKSB7XG4gICAgICAgIGxhc3RWaXNpYmxlIC09IDE7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgbGFzdFZpc2libGUgKz0gMTtcbiAgICB9XG5cbiAgICByZXR1cm4gbGFzdFZpc2libGU7XG4gIH07XG5cbiAgaGFuZGxlUmVzaXplID0gKCkgPT4gZGVib3VuY2UodGhpcy5yZWZyZXNoTGFzdFZpc2libGVJdGVtKCksIDMwMCk7XG5cbiAgcmVmcmVzaExhc3RWaXNpYmxlSXRlbSA9ICgpID0+IHtcbiAgICBjb25zdCBsYXN0VmlzaWJsZUl0ZW1JbmRleCA9IHRoaXMuZ2V0TGFzdFZpc2libGVJdGVtSW5kZXgoKTtcbiAgICBpZiAodGhpcy5zdGF0ZS5sYXN0VmlzaWJsZUl0ZW1JbmRleCAhPT0gbGFzdFZpc2libGVJdGVtSW5kZXgpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBpc1NlbGVjdFZpc2libGU6IHRoaXMucHJvcHMubGlzdC5sZW5ndGggPiBsYXN0VmlzaWJsZUl0ZW1JbmRleCArIDEsXG4gICAgICAgIGxhc3RWaXNpYmxlSXRlbUluZGV4LFxuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gIGhhbmRsZU9uQ2xpY2sgPSAoaWQsIGluZGV4KSA9PiB7XG4gICAgdGhpcy5wcm9wcy5vblNlbGVjdChpZCwgaW5kZXgpO1xuICB9O1xuXG4gIGhhbmRsZUNsb3NlID0gKGV2ZW50LCBpZCwgaW5kZXgpID0+IHtcbiAgICAvLyBkb24ndCBidWJibGUgdG8gY2xpY2sgYWxzbywgd2UgZ290IHJpZCBvZiB0aGlzXG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgdGhpcy5wcm9wcy5vbkNsb3NlKGlkLCBpbmRleCk7XG4gIH07XG5cbiAgZHJhZ1N0YXJ0ID0gKGluZGV4KSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBkcmFnRnJvbTogaW5kZXgsXG4gICAgfSk7XG4gIH07XG5cbiAgZHJhZ0VudGVyID0gKGluZGV4LCBlKSA9PiB7XG4gICAgZS50YXJnZXQuY2xhc3NMaXN0LmFkZCgnZHJvcHBhYmxlJyk7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBkcmFnVG86IGluZGV4LFxuICAgIH0pO1xuICB9O1xuXG4gIGRyYWdMZWF2ZSA9IChpbmRleCwgZSkgPT4ge1xuICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoJ2Ryb3BwYWJsZScpO1xuICB9O1xuXG4gIGRyYWdEcm9wID0gKCkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLm9uUmVvcmRlcikge1xuICAgICAgY29uc3QgeyBkcmFnRnJvbSwgZHJhZ1RvIH0gPSB0aGlzLnN0YXRlO1xuICAgICAgY29uc3QgbmV3TGlzdCA9IHRoaXMucHJvcHMubGlzdC5zbGljZSgpO1xuICAgICAgY29uc3QgbW92ZWQgPSBuZXdMaXN0W2RyYWdGcm9tXTtcblxuICAgICAgbmV3TGlzdC5zcGxpY2UoZHJhZ0Zyb20sIDEpO1xuICAgICAgbmV3TGlzdC5zcGxpY2UoZHJhZ1RvLCAwLCBtb3ZlZCk7XG5cbiAgICAgIHRoaXMucHJvcHMub25SZW9yZGVyKG5ld0xpc3QsIGRyYWdGcm9tLCBkcmFnVG8pO1xuICAgICAgdGhpcy5wcm9wcy5vblNlbGVjdChtb3ZlZCwgZHJhZ1RvKTtcblxuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIGRyYWdUbzogbnVsbCxcbiAgICAgICAgZHJhZ0Zyb206IG51bGwsXG4gICAgICB9KTtcbiAgICB9XG4gIH07XG5cbiAgLy8gUmVuZGVyIG5hdmJhciBpdGVtXG4gIG5hdmJhckl0ZW0gPSAoaXRlbSwgaW5kZXgsIGNsYXNzTmFtZSkgPT4ge1xuICAgIGNvbnN0IHsgYWN0aXZlS2V5LCBmb250V2VpZ2h0LCBmb250U2l6ZSwgaGVpZ2h0LCBhbGxvd0Nsb3NlLCBuYXZSZW5kZXJlciwgYWxsb3dSZW9yZGVyIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgaWYgKG5hdlJlbmRlcmVyKSB7XG4gICAgICByZXR1cm4gbmF2UmVuZGVyZXIoaXRlbSwgaW5kZXgsIGNsYXNzTmFtZSwgYWN0aXZlS2V5ID09PSBpbmRleCk7XG4gICAgfVxuXG4gICAgLy8gcmVzb2x2ZSBhY3RpdmVLZXlJbmRleFxuICAgIGxldCBhY3RpdmVLZXlJbmRleCA9IGFjdGl2ZUtleTtcbiAgICBpZiAodHlwZW9mIGFjdGl2ZUtleSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGFjdGl2ZUtleUluZGV4ID0gdGhpcy5hY3RpdmVJdGVtSW5kZXgoYWN0aXZlS2V5KTtcbiAgICB9XG5cbiAgICBjb25zdCBidXR0b25DbGFzcyA9IGNsYXNzbmFtZXMoY2xhc3NOYW1lLCAnZ3JhYmJhYmxlJywge1xuICAgICAgc2VsZWN0ZWQ6IGluZGV4ID09PSBhY3RpdmVLZXlJbmRleCxcbiAgICAgICd3aXRoLWNsb3NlJzogYWxsb3dDbG9zZSxcbiAgICB9KTtcblxuICAgIGNvbnN0IGRyYWdPcHRpb25zID0gYWxsb3dSZW9yZGVyXG4gICAgICA/IHtcbiAgICAgICAgICBvbkRyYWdTdGFydDogKGUpID0+IHRoaXMuZHJhZ1N0YXJ0KGluZGV4LCBlKSxcbiAgICAgICAgICBvbkRyYWdFbnRlcjogKGUpID0+IHRoaXMuZHJhZ0VudGVyKGluZGV4LCBlKSxcbiAgICAgICAgICBvbkRyYWdMZWF2ZTogKGUpID0+IHRoaXMuZHJhZ0xlYXZlKGluZGV4LCBlKSxcbiAgICAgICAgICBvbkRyYWdFbmQ6IHRoaXMuZHJhZ0Ryb3AsXG4gICAgICAgICAgZHJhZ2dhYmxlOiB0cnVlLFxuICAgICAgICB9XG4gICAgICA6IHt9O1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxidXR0b25cbiAgICAgICAgey4uLmRyYWdPcHRpb25zfVxuICAgICAgICBjbGFzc05hbWU9e2J1dHRvbkNsYXNzfVxuICAgICAgICBzdHlsZT17eyBmb250V2VpZ2h0LCBmb250U2l6ZSwgbWluSGVpZ2h0OiBoZWlnaHQgfX1cbiAgICAgICAgaWQ9e2l0ZW0uaWQgfHwgYG5hdkl0ZW0ke1N0cmluZyhpbmRleCl9YH1cbiAgICAgICAga2V5PXtpdGVtLmlkIHx8IGBuYXZpdGVtJHtTdHJpbmcoaW5kZXgpfWB9XG4gICAgICAgIG9uQ2xpY2s9eygpID0+IHRoaXMuaGFuZGxlT25DbGljayhpdGVtLmlkLCBpbmRleCl9XG4gICAgICAgIHJlZj17KHIpID0+IHtcbiAgICAgICAgICBpZiAociAmJiAhdGhpcy5pdGVtV2lkdGhzW2luZGV4XSkgdGhpcy5pdGVtV2lkdGhzW2luZGV4XSA9IHIub2Zmc2V0V2lkdGg7XG4gICAgICAgIH19XG4gICAgICA+XG4gICAgICAgIDxzcGFuIGNsYXNzTmFtZT0ndGFiLXBpbGwtaXRlbSc+XG4gICAgICAgICAge2l0ZW0ubmFtZX1cbiAgICAgICAgICB7LyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGpzeC1hMTF5L2NsaWNrLWV2ZW50cy1oYXZlLWtleS1ldmVudHMgKi99XG4gICAgICAgICAge2FsbG93Q2xvc2UgJiYgPGkgdGFiSW5kZXg9e2luZGV4ICsgMX0gcm9sZT0nYnV0dG9uJyBjbGFzc05hbWU9J2ZhIGZhLXRpbWVzJyBvbkNsaWNrPXsoZXZlbnQpID0+IHRoaXMuaGFuZGxlQ2xvc2UoZXZlbnQsIGl0ZW0uaWQsIGluZGV4KX0gLz59XG4gICAgICAgIDwvc3Bhbj5cbiAgICAgIDwvYnV0dG9uPlxuICAgICk7XG4gIH07XG5cbiAgZG9MaW5lQ291bnQgPSAoKSA9PiB7XG4gICAgY29uc3QgeyBsaXN0IH0gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiBsaXN0LnNvbWUoKGl0ZW0pID0+IHR5cGVvZiBpdGVtLm5hbWUgIT09ICdzdHJpbmcnKTtcbiAgfTtcblxuICByZXNvbHZlQWN0aXZlSXRlbUZyb21PcHRpb25zID0gKHNlbGVjdE9wdGlvbnMpID0+IHtcbiAgICBjb25zdCB7IGFjdGl2ZUtleSB9ID0gdGhpcy5wcm9wcztcbiAgICBsZXQgYWN0aXZlSXRlbSA9IHNlbGVjdE9wdGlvbnMuZmluZCgob3B0cykgPT4gb3B0cy52YWx1ZSA9PT0gYWN0aXZlS2V5KTtcbiAgICBpZiAoIWFjdGl2ZUl0ZW0pIHtcbiAgICAgIGFjdGl2ZUl0ZW0gPSBzZWxlY3RPcHRpb25zLmZpbmQoKG9wdHMpID0+IG9wdHMudmFsdWUgPT09IGFjdGl2ZUtleS52YWx1ZSk7XG4gICAgfVxuICAgIHJldHVybiBhY3RpdmVJdGVtO1xuICB9O1xuXG4gIGFjdGl2ZUl0ZW1JbmRleCA9IChhY3RpdmVJdGVtKSA9PiB7XG4gICAgY29uc3QgeyBsaXN0IH0gPSB0aGlzLnByb3BzO1xuICAgIGlmICghYWN0aXZlSXRlbSkgcmV0dXJuIG51bGw7XG4gICAgcmV0dXJuIGxpc3QuZmluZEluZGV4KChpdGVtKSA9PiBpdGVtLmlkID09PSBhY3RpdmVJdGVtLnZhbHVlKTtcbiAgfTtcblxuICAvLyBSZW5kZXIgY29tYm9ib3gsIHdoZW4gYWxsIGl0ZW1zIGRvIG5vdCBmaXRcbiAgY29tYm9ib3ggPSAoKSA9PiB7XG4gICAgY29uc3QgeyBpZCwgbGlzdCwgZm9udFNpemUsIGZvbnRXZWlnaHQsIGFsbG93UmVvcmRlciwgYWN0aXZlS2V5LCBhbGxvd0Nsb3NlIH0gPSB0aGlzLnByb3BzO1xuICAgIGlmICghdGhpcy5zdGF0ZS5pc1NlbGVjdFZpc2libGUpIHtcbiAgICAgIC8vIHJldHVybiBudWxsIGlmIGFsbCBuYXYgaXRlbXMgYXJlIHZpc2libGVcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIC8vIHNsaWNlIG5hdiBpdGVtcyBsaXN0IGFuZCBzaG93IGludmlzaWJsZSBpdGVtcyBpbiB0aGUgY29tYm9ib3hcbiAgICBjb25zdCBuYXZMaXN0ID0gdGhpcy5zdGF0ZS5sYXN0VmlzaWJsZUl0ZW1JbmRleCA+IC0yID8gbGlzdC5zbGljZSh0aGlzLnN0YXRlLmxhc3RWaXNpYmxlSXRlbUluZGV4ICsgMSkgOiBsaXN0O1xuICAgIGNvbnN0IHNlbGVjdE9wdGlvbnMgPSBuYXZMaXN0Lm1hcCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgIGNvbnN0IHJlYWxJbmRleCA9IGluZGV4ICsgdGhpcy5zdGF0ZS5sYXN0VmlzaWJsZUl0ZW1JbmRleCArIDE7XG5cbiAgICAgIGNvbnN0IGRyYWdPcHRpb25zID0gYWxsb3dSZW9yZGVyXG4gICAgICAgID8ge1xuICAgICAgICAgIG9uRHJhZ1N0YXJ0OiAoZSkgPT4gdGhpcy5kcmFnU3RhcnQocmVhbEluZGV4LCBlKSxcbiAgICAgICAgICBvbkRyYWdFbnRlcjogKGUpID0+IHRoaXMuZHJhZ0VudGVyKHJlYWxJbmRleCwgZSksXG4gICAgICAgICAgb25EcmFnTGVhdmU6IChlKSA9PiB0aGlzLmRyYWdMZWF2ZShpbmRleCwgZSksXG4gICAgICAgICAgb25EcmFnRW5kOiB0aGlzLmRyYWdEcm9wLFxuICAgICAgICAgIGRyYWdnYWJsZTogdHJ1ZSxcbiAgICAgICAgfVxuICAgICAgICA6IHt9O1xuXG4gICAgICBjb25zdCBkcm9wZG93bk9wdGlvbnMgPSB7XG4gICAgICAgIGNsYXNzTmFtZTogY2xhc3NuYW1lcygnZHJvcGRvd24tb3B0aW9uJywgeyBzZWxlY3RlZDogbGlzdFthY3RpdmVLZXldLmlkID09PSBpdGVtLmlkIH0pLFxuICAgICAgICBjbG9zZTogYWxsb3dDbG9zZSA/IChcbiAgICAgICAgICA8aSByb2xlPSdidXR0b24nIGNsYXNzTmFtZT0nZmEgZmEtdGltZXMnIG9uQ2xpY2s9eyhldmVudCkgPT4gdGhpcy5oYW5kbGVDbG9zZShldmVudCwgaXRlbS5pZCwgcmVhbEluZGV4KX0gLz5cbiAgICAgICAgKSA6IG51bGwsXG4gICAgICAgIG9uU2VsZWN0OiAoKSA9PiB7XG4gICAgICAgICAgdGhpcy5oYW5kbGVPbkNsaWNrKGl0ZW0uaWQsIHJlYWxJbmRleCk7XG4gICAgICAgIH0sXG4gICAgICAgIC4uLmRyYWdPcHRpb25zXG4gICAgICB9O1xuXG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLml0ZW0sXG4gICAgICAgIG9wdGlvbnM6IGRyb3Bkb3duT3B0aW9uc1xuICAgICAgfTtcbiAgICB9KTtcblxuICAgIGNvbnN0IGxpbmVDb3VudE5lZWRlZCA9IHRoaXMuZG9MaW5lQ291bnQoKTtcbiAgICBjb25zdCBjdXN0b21Cb3JkZXJDbGFzcyA9IGxpbmVDb3VudE5lZWRlZCA/ICdzZWxlY3RlZCBsaW5lLWNvdW50JyA6ICdzZWxlY3RlZCc7XG4gICAgY29uc3QgaW5hY3RpdmVCb3JkZXIgPSBsaW5lQ291bnROZWVkZWQgPyAnaW5hY3RpdmUgbGluZS1jb3VudCcgOiAnaW5hY3RpdmUnO1xuICAgIC8vIFJlc29sdmUgYWN0aXZlSXRlbVxuICAgIGNvbnN0IGFjdGl2ZUl0ZW0gPSB0aGlzLnJlc29sdmVBY3RpdmVJdGVtRnJvbU9wdGlvbnMoc2VsZWN0T3B0aW9ucyk7XG4gICAgY29uc3QgYWN0aXZlSXRlbUluZGV4ID0gdGhpcy5hY3RpdmVJdGVtSW5kZXgoYWN0aXZlSXRlbSk7XG4gICAgY29uc3QgYm9yZGVyQ2xhc3MgPSBhY3RpdmVJdGVtSW5kZXggPj0gdGhpcy5zdGF0ZS5sYXN0VmlzaWJsZUl0ZW1JbmRleCArIDEgPyBjdXN0b21Cb3JkZXJDbGFzcyA6IGluYWN0aXZlQm9yZGVyOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdlxuICAgICAgICBpZD17YCR7aWR9LXNlbGVjdGB9XG4gICAgICAgIGNsYXNzTmFtZT17YHJlc3BvbnNpdmUtdGFiLWRyb3Bkb3duICR7Ym9yZGVyQ2xhc3N9YH1cbiAgICAgICAgc3R5bGU9e3sgZm9udFdlaWdodCwgZm9udFNpemUgfX1cbiAgICAgICAgcmVmPXsocikgPT4ge1xuICAgICAgICAgIHRoaXMuc2VsZWN0Q29udGFpbmVyUmVmID0gcjtcbiAgICAgICAgfX1cbiAgICAgID5cbiAgICAgICAgPERyb3BEb3duIHZhbHVlPXtsaXN0W2FjdGl2ZUtleV19IG9wdGlvbnM9e3NlbGVjdE9wdGlvbnN9IC8+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9O1xuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IGlkLCBjbGFzc05hbWUsIGxpc3QsIGhlaWdodCB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB2aXNpYmxlTGlzdCA9IHRoaXMuc3RhdGUubGFzdFZpc2libGVJdGVtSW5kZXggPiAtMiA/IGxpc3Quc2xpY2UoMCwgdGhpcy5zdGF0ZS5sYXN0VmlzaWJsZUl0ZW1JbmRleCArIDEpIDogbGlzdDtcbiAgICBjb25zdCBpdGVtQ2xhc3NOYW1lID0gJ3Jlc3BvbnNpdmUtbmF2YmFyLWl0ZW0gaW5hY3RpdmUtYm9yZGVyJztcbiAgICBjb25zdCBpdGVtcyA9IHZpc2libGVMaXN0Lm1hcCgoaXRlbSwgaW5kZXgpID0+IHRoaXMubmF2YmFySXRlbShpdGVtLCBpbmRleCwgaXRlbUNsYXNzTmFtZSkpO1xuICAgIGNvbnN0IGxpbmVDb3VudCA9IHRoaXMuZG9MaW5lQ291bnQoKTtcbiAgICBjb25zdCBuYXZiYXJTdHlsZSA9IHtcbiAgICAgIG1pbkhlaWdodDogaGVpZ2h0LFxuICAgICAgbWF4SGVpZ2h0OiBoZWlnaHQsXG4gICAgfTtcbiAgICBpZiAoaGVpZ2h0LnNsaWNlKC0yKSA9PT0gJ3B4JyAmJiBsaW5lQ291bnQpIHtcbiAgICAgIGNvbnN0IGhlaWdodFB4ID0gcGFyc2VJbnQoaGVpZ2h0LnNsaWNlKDAsIC0yKSwgMTApO1xuICAgICAgbmF2YmFyU3R5bGUubGluZUhlaWdodCA9IGAke2hlaWdodFB4IC0gNH1weGA7XG4gICAgfVxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2XG4gICAgICAgIGlkPXtgJHtpZH0tY29udGFpbmVyYH1cbiAgICAgICAgcmVmPXsocikgPT4ge1xuICAgICAgICAgIHRoaXMubmF2YmFyQ29udGFpbmVyUmVmID0gcjtcbiAgICAgICAgfX1cbiAgICAgICAgY2xhc3NOYW1lPXtjbGFzc25hbWVzKGByZXNwb25zaXZlLXRhYi1waWxscy1kcm9wZG93bmAsIGNsYXNzTmFtZSl9XG4gICAgICAgIHN0eWxlPXtuYXZiYXJTdHlsZX1cbiAgICAgID5cbiAgICAgICAge2l0ZW1zfVxuICAgICAgICB7dGhpcy5jb21ib2JveCgpfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuIl19