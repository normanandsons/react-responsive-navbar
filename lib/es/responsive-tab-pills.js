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

      var remainingWidth = navBarWidth - selectWidth;
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

    _this.navbarItem = function (item, index, className, isDumb) {
      var _this$props = _this.props,
          activeKey = _this$props.activeKey,
          height = _this$props.height,
          allowClose = _this$props.allowClose,
          allowReorder = _this$props.allowReorder;

      // resolve activeKeyIndex

      var activeKeyIndex = activeKey;
      if ((typeof activeKey === 'undefined' ? 'undefined' : _typeof(activeKey)) === 'object') {
        activeKeyIndex = _this.activeItemIndex(activeKey);
      }

      var buttonClass = classnames(className, {
        selected: index === activeKeyIndex,
        'with-close': !isDumb && allowClose
      });

      var dragOptions = allowReorder && !isDumb ? {
        onDragStart: function onDragStart() {
          return _this.dragStart(index);
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
          style: { minHeight: height },
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
          allowClose && !isDumb && React.createElement('i', { tabIndex: index + 1, role: 'button', className: 'fa fa-times', onClick: function onClick(event) {
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

    _this.activeItemIndex = function (activeItem) {
      var list = _this.props.list;

      return list.findIndex(function (item) {
        return item.id === activeItem.id;
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
          className: classnames('dropdown-option', { 'with-close': allowClose, selected: list[activeKey] && list[activeKey].id === item.id }),
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

      // Resolve activeItem
      var activeItem = list[activeKey] ? selectOptions.find(function (item) {
        return item.id === list[activeKey].id;
      }) : null;
      var activeButton = activeItem ? _this.navbarItem(activeItem, activeKey, 'tab-pill-item', true) : null;
      var style = { fontWeight: fontWeight, fontSize: fontSize };

      return React.createElement(
        'div',
        {
          id: id + '-select',
          className: classnames('responsive-tab-dropdown', { 'with-selected': activeButton }),
          style: style,
          ref: function ref(r) {
            _this.selectContainerRef = r;
          }
        },
        React.createElement(DropDown, { value: list[activeKey], activeInList: activeButton, options: selectOptions }),
        _this.props.children
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
    if (this.state.isSelectVisible !== prevState.isSelectVisible || this.state.lastVisibleItemIndex !== prevState.lastVisibleItemIndex || prevProps.activeKey !== this.props.activeKey || prevProps.list.length !== this.props.list.length) {
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
  height: 30
}, _temp);
export { ResponsiveTabPills as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yZXNwb25zaXZlLXRhYi1waWxscy5qc3giXSwibmFtZXMiOlsiUmVhY3QiLCJQcm9wVHlwZXMiLCJjbGFzc25hbWVzIiwiZGVib3VuY2UiLCJEcm9wRG93biIsIlJlc3BvbnNpdmVUYWJQaWxscyIsInByb3BzIiwic3RhdGUiLCJkcmFnRnJvbSIsImRyYWdUbyIsImlzU2VsZWN0VmlzaWJsZSIsImxhc3RWaXNpYmxlSXRlbUluZGV4IiwiZ2V0TGFzdFZpc2libGVJdGVtSW5kZXgiLCJuYXZCYXJXaWR0aCIsIm5hdmJhckNvbnRhaW5lclJlZiIsIm9mZnNldFdpZHRoIiwic2VsZWN0V2lkdGgiLCJzZWxlY3RDb250YWluZXJSZWYiLCJyZW1haW5pbmdXaWR0aCIsImxhc3RWaXNpYmxlIiwiaSIsImxpc3QiLCJsZW5ndGgiLCJpdGVtV2lkdGhzIiwiaGFuZGxlUmVzaXplIiwicmVmcmVzaExhc3RWaXNpYmxlSXRlbSIsInNldFN0YXRlIiwiaGFuZGxlT25DbGljayIsImlkIiwiaW5kZXgiLCJvblNlbGVjdCIsImhhbmRsZUNsb3NlIiwiZXZlbnQiLCJzdG9wUHJvcGFnYXRpb24iLCJvbkNsb3NlIiwiZHJhZ1N0YXJ0IiwiZHJhZ0VudGVyIiwiZSIsInRhcmdldCIsImNsYXNzTGlzdCIsImFkZCIsImRyYWdMZWF2ZSIsInJlbW92ZSIsImRyYWdEcm9wIiwib25SZW9yZGVyIiwibmV3TGlzdCIsInNsaWNlIiwibW92ZWQiLCJzcGxpY2UiLCJuYXZiYXJJdGVtIiwiaXRlbSIsImNsYXNzTmFtZSIsImlzRHVtYiIsImFjdGl2ZUtleSIsImhlaWdodCIsImFsbG93Q2xvc2UiLCJhbGxvd1Jlb3JkZXIiLCJhY3RpdmVLZXlJbmRleCIsImFjdGl2ZUl0ZW1JbmRleCIsImJ1dHRvbkNsYXNzIiwic2VsZWN0ZWQiLCJkcmFnT3B0aW9ucyIsIm9uRHJhZ1N0YXJ0Iiwib25EcmFnRW50ZXIiLCJvbkRyYWdMZWF2ZSIsIm9uRHJhZ0VuZCIsImRyYWdnYWJsZSIsIm1pbkhlaWdodCIsIlN0cmluZyIsInIiLCJuYW1lIiwiZG9MaW5lQ291bnQiLCJzb21lIiwiYWN0aXZlSXRlbSIsImZpbmRJbmRleCIsImNvbWJvYm94IiwiZm9udFNpemUiLCJmb250V2VpZ2h0IiwibmF2TGlzdCIsInNlbGVjdE9wdGlvbnMiLCJtYXAiLCJyZWFsSW5kZXgiLCJkcm9wZG93bk9wdGlvbnMiLCJjbG9zZSIsIm9wdGlvbnMiLCJmaW5kIiwiYWN0aXZlQnV0dG9uIiwic3R5bGUiLCJjaGlsZHJlbiIsImNvbXBvbmVudERpZE1vdW50Iiwid2luZG93IiwiYWRkRXZlbnRMaXN0ZW5lciIsImNvbXBvbmVudERpZFVwZGF0ZSIsInByZXZQcm9wcyIsInByZXZTdGF0ZSIsImNvbXBvbmVudFdpbGxVbm1vdW50IiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsInJlbmRlciIsInZpc2libGVMaXN0IiwiaXRlbUNsYXNzTmFtZSIsIml0ZW1zIiwibGluZUNvdW50IiwibmF2YmFyU3R5bGUiLCJtYXhIZWlnaHQiLCJoZWlnaHRQeCIsInBhcnNlSW50IiwibGluZUhlaWdodCIsIkNvbXBvbmVudCIsImRlZmF1bHRQcm9wcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxLQUFLQSxLQUFaLE1BQXVCLE9BQXZCO0FBQ0EsT0FBT0MsU0FBUCxNQUFzQixZQUF0QjtBQUNBLE9BQU9DLFVBQVAsTUFBdUIsWUFBdkI7QUFDQSxTQUFTQyxRQUFULFFBQXlCLFVBQXpCO0FBQ0EsT0FBT0MsUUFBUCxNQUFxQixZQUFyQjs7SUFFcUJDLGtCOzs7QUE2Qm5CLDhCQUFZQyxLQUFaLEVBQW1CO0FBQUE7O0FBQUEsaURBQ2pCLDRCQUFNQSxLQUFOLENBRGlCOztBQUFBLFVBS25CQyxLQUxtQixHQUtYO0FBQ05DLGdCQUFVLElBREo7QUFFTkMsY0FBUSxJQUZGO0FBR05DLHVCQUFpQixLQUhYO0FBSU5DLDRCQUFzQixDQUFDO0FBSmpCLEtBTFc7O0FBQUEsVUFtQ25CQyx1QkFuQ21CLEdBbUNPLFlB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QUFGTyxLQUFwQjtBQUlBLFFBQUlBLE9BQU9SLEtBQVAsQ0FBYSxDQUFDLENBQWQsTUFBcUIsSUFBckIsSUFBNkJ1RCxTQUFqQyxFQUE0QztBQUMxQyxVQUFNRyxXQUFXQyxTQUFTbkQsT0FBT1IsS0FBUCxDQUFhLENBQWIsRUFBZ0IsQ0FBQyxDQUFqQixDQUFULEVBQThCLEVBQTlCLENBQWpCO0FBQ0F3RCxrQkFBWUksVUFBWixHQUE0QkYsV0FBVyxDQUF2QztBQUNEO0FBQ0QsV0FDRTtBQUFBO0FBQUE7QUFDRSxZQUFPNUUsRUFBUCxlQURGO0FBRUUsYUFBSyxhQUFDeUMsQ0FBRCxFQUFPO0FBQ1YsaUJBQUt2RCxrQkFBTCxHQUEwQnVELENBQTFCO0FBQ0QsU0FKSDtBQUtFLG1CQUFXbkUsNkNBQTZDaUQsU0FBN0MsQ0FMYjtBQU1FLGVBQU9tRDtBQU5UO0FBUUdGLFdBUkg7QUFTRyxXQUFLekIsUUFBTDtBQVRILEtBREY7QUFhRCxHOzs7RUE1UjZDM0UsTUFBTTJHLFMsVUFtQjdDQyxZLEdBQWU7QUFDcEJoRixNQUFJLG1CQURnQjtBQUVwQnVCLGFBQVcsRUFGUztBQUdwQnJCLFlBQVUsb0JBQU0sQ0FBRSxDQUhFO0FBSXBCSSxXQUFTLG1CQUFNLENBQUUsQ0FKRztBQUtwQnFCLGNBQVksS0FMUTtBQU1wQkMsZ0JBQWMsS0FOTTtBQU9wQkYsVUFBUTtBQVBZLEM7U0FuQkhqRCxrQiIsImZpbGUiOiJyZXNwb25zaXZlLXRhYi1waWxscy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgY2xhc3NuYW1lcyBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCB7IGRlYm91bmNlIH0gZnJvbSAnZGVib3VuY2UnO1xuaW1wb3J0IERyb3BEb3duIGZyb20gJy4vZHJvcGRvd24nO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZXNwb25zaXZlVGFiUGlsbHMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIGlkOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGFsbG93Q2xvc2U6IFByb3BUeXBlcy5ib29sLFxuICAgIG9uQ2xvc2U6IFByb3BUeXBlcy5mdW5jLFxuICAgIGFsbG93UmVvcmRlcjogUHJvcFR5cGVzLmJvb2wsXG4gICAgbmF2UmVuZGVyZXI6IFByb3BUeXBlcy5mdW5jLFxuICAgIGNsYXNzTmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBhY3RpdmVLZXk6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zaGFwZSh7fSksIFByb3BUeXBlcy5udW1iZXJdKS5pc1JlcXVpcmVkLFxuICAgIGxpc3Q6IFByb3BUeXBlcy5hcnJheU9mKFxuICAgICAgUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgICAgbmFtZTogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLm5vZGVdKS5pc1JlcXVpcmVkLFxuICAgICAgICBpZDogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLm51bWJlcl0pLFxuICAgICAgfSlcbiAgICApLmlzUmVxdWlyZWQsXG4gICAgb25TZWxlY3Q6IFByb3BUeXBlcy5mdW5jLFxuICAgIGhlaWdodDogUHJvcFR5cGVzLnN0cmluZyxcbiAgfTtcblxuICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgIGlkOiAncmVzcG9uc2l2ZS1uYXZiYXInLFxuICAgIGNsYXNzTmFtZTogJycsXG4gICAgb25TZWxlY3Q6ICgpID0+IHt9LFxuICAgIG9uQ2xvc2U6ICgpID0+IHt9LFxuICAgIGFsbG93Q2xvc2U6IGZhbHNlLFxuICAgIGFsbG93UmVvcmRlcjogZmFsc2UsXG4gICAgaGVpZ2h0OiAzMCxcbiAgfTtcblxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLml0ZW1XaWR0aHMgPSBbXTsgLy8gc3RvcmUgaXRlbSB3aWR0aHMgaGVyZSwgdGhleSBkb24ndCBjaGFuZ2VcbiAgfVxuXG4gIHN0YXRlID0ge1xuICAgIGRyYWdGcm9tOiBudWxsLFxuICAgIGRyYWdUbzogbnVsbCxcbiAgICBpc1NlbGVjdFZpc2libGU6IGZhbHNlLFxuICAgIGxhc3RWaXNpYmxlSXRlbUluZGV4OiAtMixcbiAgfTtcblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5oYW5kbGVSZXNpemUpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdvcmllbnRhdGlvbmNoYW5nZScsIHRoaXMucmVmcmVzaExhc3RWaXNpYmxlSXRlbSk7IC8vIGZvciBtb2JpbGUgc3VwcG9ydFxuICAgIHRoaXMucmVmcmVzaExhc3RWaXNpYmxlSXRlbSgpO1xuICB9XG5cbiAgY29tcG9uZW50RGlkVXBkYXRlKHByZXZQcm9wcywgcHJldlN0YXRlKSB7XG4gICAgLy8gUmVmcmVzaCB2aXNpYmxlIGl0ZW1zIGlmIHZhbHVlcyBjaGFuZ2VcbiAgICBpZiAoXG4gICAgICB0aGlzLnN0YXRlLmlzU2VsZWN0VmlzaWJsZSAhPT0gcHJldlN0YXRlLmlzU2VsZWN0VmlzaWJsZSB8fFxuICAgICAgdGhpcy5zdGF0ZS5sYXN0VmlzaWJsZUl0ZW1JbmRleCAhPT0gcHJldlN0YXRlLmxhc3RWaXNpYmxlSXRlbUluZGV4IHx8XG4gICAgICBwcmV2UHJvcHMuYWN0aXZlS2V5ICE9PSB0aGlzLnByb3BzLmFjdGl2ZUtleSB8fFxuICAgICAgcHJldlByb3BzLmxpc3QubGVuZ3RoICE9PSB0aGlzLnByb3BzLmxpc3QubGVuZ3RoXG4gICAgKSB7XG4gICAgICB0aGlzLnJlZnJlc2hMYXN0VmlzaWJsZUl0ZW0oKTtcbiAgICB9XG4gIH1cblxuICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5oYW5kbGVSZXNpemUpO1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdvcmllbnRhdGlvbmNoYW5nZScsIHRoaXMucmVmcmVzaExhc3RWaXNpYmxlSXRlbSk7IC8vIGZvciBtb2JpbGUgc3VwcG9ydFxuICB9XG5cbiAgZ2V0TGFzdFZpc2libGVJdGVtSW5kZXggPSAoKSA9PiB7XG4gICAgY29uc3QgbmF2QmFyV2lkdGggPSB0aGlzLm5hdmJhckNvbnRhaW5lclJlZiA/IHRoaXMubmF2YmFyQ29udGFpbmVyUmVmLm9mZnNldFdpZHRoIDogMDtcbiAgICBjb25zdCBzZWxlY3RXaWR0aCA9IHRoaXMuc2VsZWN0Q29udGFpbmVyUmVmID8gdGhpcy5zZWxlY3RDb250YWluZXJSZWYub2Zmc2V0V2lkdGggOiAwO1xuXG4gICAgbGV0IHJlbWFpbmluZ1dpZHRoID0gbmF2QmFyV2lkdGggLSBzZWxlY3RXaWR0aDtcbiAgICBsZXQgbGFzdFZpc2libGUgPSAwO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnByb3BzLmxpc3QubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIHJlbWFpbmluZ1dpZHRoIC09IHRoaXMuaXRlbVdpZHRoc1tpXTtcbiAgICAgIGlmIChyZW1haW5pbmdXaWR0aCA8IDApIHtcbiAgICAgICAgbGFzdFZpc2libGUgLT0gMTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBsYXN0VmlzaWJsZSArPSAxO1xuICAgIH1cblxuICAgIHJldHVybiBsYXN0VmlzaWJsZTtcbiAgfTtcblxuICBoYW5kbGVSZXNpemUgPSAoKSA9PiBkZWJvdW5jZSh0aGlzLnJlZnJlc2hMYXN0VmlzaWJsZUl0ZW0oKSwgMzAwKTtcblxuICByZWZyZXNoTGFzdFZpc2libGVJdGVtID0gKCkgPT4ge1xuICAgIGNvbnN0IGxhc3RWaXNpYmxlSXRlbUluZGV4ID0gdGhpcy5nZXRMYXN0VmlzaWJsZUl0ZW1JbmRleCgpO1xuICAgIGlmICh0aGlzLnN0YXRlLmxhc3RWaXNpYmxlSXRlbUluZGV4ICE9PSBsYXN0VmlzaWJsZUl0ZW1JbmRleCkge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIGlzU2VsZWN0VmlzaWJsZTogdGhpcy5wcm9wcy5saXN0Lmxlbmd0aCA+IGxhc3RWaXNpYmxlSXRlbUluZGV4ICsgMSxcbiAgICAgICAgbGFzdFZpc2libGVJdGVtSW5kZXgsXG4gICAgICB9KTtcbiAgICB9XG4gIH07XG5cbiAgaGFuZGxlT25DbGljayA9IChpZCwgaW5kZXgpID0+IHtcbiAgICB0aGlzLnByb3BzLm9uU2VsZWN0KGlkLCBpbmRleCwgdGhpcy5wcm9wcy5saXN0W2luZGV4XSk7XG4gIH07XG5cbiAgaGFuZGxlQ2xvc2UgPSAoZXZlbnQsIGlkLCBpbmRleCkgPT4ge1xuICAgIC8vIGRvbid0IGJ1YmJsZSB0byBjbGljayBhbHNvLCB3ZSBnb3QgcmlkIG9mIHRoaXNcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB0aGlzLnByb3BzLm9uQ2xvc2UoaWQsIGluZGV4KTtcbiAgfTtcblxuICBkcmFnU3RhcnQgPSAoaW5kZXgpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGRyYWdGcm9tOiBpbmRleCxcbiAgICB9KTtcbiAgfTtcblxuICBkcmFnRW50ZXIgPSAoaW5kZXgsIGUpID0+IHtcbiAgICBlLnRhcmdldC5jbGFzc0xpc3QuYWRkKCdkcm9wcGFibGUnKTtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGRyYWdUbzogaW5kZXgsXG4gICAgfSk7XG4gIH07XG5cbiAgZHJhZ0xlYXZlID0gKGluZGV4LCBlKSA9PiB7XG4gICAgZS50YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSgnZHJvcHBhYmxlJyk7XG4gIH07XG5cbiAgZHJhZ0Ryb3AgPSAoKSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMub25SZW9yZGVyKSB7XG4gICAgICBjb25zdCB7IGRyYWdGcm9tLCBkcmFnVG8gfSA9IHRoaXMuc3RhdGU7XG4gICAgICBjb25zdCBuZXdMaXN0ID0gdGhpcy5wcm9wcy5saXN0LnNsaWNlKCk7XG4gICAgICBjb25zdCBtb3ZlZCA9IG5ld0xpc3RbZHJhZ0Zyb21dO1xuXG4gICAgICBuZXdMaXN0LnNwbGljZShkcmFnRnJvbSwgMSk7XG4gICAgICBuZXdMaXN0LnNwbGljZShkcmFnVG8sIDAsIG1vdmVkKTtcblxuICAgICAgdGhpcy5wcm9wcy5vblJlb3JkZXIobmV3TGlzdCwgZHJhZ0Zyb20sIGRyYWdUbyk7XG4gICAgICB0aGlzLnByb3BzLm9uU2VsZWN0KG1vdmVkLCBkcmFnVG8pO1xuXG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgZHJhZ1RvOiBudWxsLFxuICAgICAgICBkcmFnRnJvbTogbnVsbCxcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcblxuICAvLyBSZW5kZXIgbmF2YmFyIGl0ZW1cbiAgbmF2YmFySXRlbSA9IChpdGVtLCBpbmRleCwgY2xhc3NOYW1lLCBpc0R1bWIpID0+IHtcbiAgICBjb25zdCB7IGFjdGl2ZUtleSwgaGVpZ2h0LCBhbGxvd0Nsb3NlLCBhbGxvd1Jlb3JkZXIgfSA9IHRoaXMucHJvcHM7XG5cbiAgICAvLyByZXNvbHZlIGFjdGl2ZUtleUluZGV4XG4gICAgbGV0IGFjdGl2ZUtleUluZGV4ID0gYWN0aXZlS2V5O1xuICAgIGlmICh0eXBlb2YgYWN0aXZlS2V5ID09PSAnb2JqZWN0Jykge1xuICAgICAgYWN0aXZlS2V5SW5kZXggPSB0aGlzLmFjdGl2ZUl0ZW1JbmRleChhY3RpdmVLZXkpO1xuICAgIH1cblxuICAgIGNvbnN0IGJ1dHRvbkNsYXNzID0gY2xhc3NuYW1lcyhjbGFzc05hbWUsIHtcbiAgICAgIHNlbGVjdGVkOiBpbmRleCA9PT0gYWN0aXZlS2V5SW5kZXgsXG4gICAgICAnd2l0aC1jbG9zZSc6ICFpc0R1bWIgJiYgYWxsb3dDbG9zZSxcbiAgICB9KTtcblxuICAgIGNvbnN0IGRyYWdPcHRpb25zID1cbiAgICAgIGFsbG93UmVvcmRlciAmJiAhaXNEdW1iXG4gICAgICAgID8ge1xuICAgICAgICAgICAgb25EcmFnU3RhcnQ6ICgpID0+IHRoaXMuZHJhZ1N0YXJ0KGluZGV4KSxcbiAgICAgICAgICAgIG9uRHJhZ0VudGVyOiAoZSkgPT4gdGhpcy5kcmFnRW50ZXIoaW5kZXgsIGUpLFxuICAgICAgICAgICAgb25EcmFnTGVhdmU6IChlKSA9PiB0aGlzLmRyYWdMZWF2ZShpbmRleCwgZSksXG4gICAgICAgICAgICBvbkRyYWdFbmQ6IHRoaXMuZHJhZ0Ryb3AsXG4gICAgICAgICAgICBkcmFnZ2FibGU6IHRydWUsXG4gICAgICAgICAgfVxuICAgICAgICA6IHt9O1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxidXR0b25cbiAgICAgICAgey4uLmRyYWdPcHRpb25zfVxuICAgICAgICBjbGFzc05hbWU9e2J1dHRvbkNsYXNzfVxuICAgICAgICBzdHlsZT17eyBtaW5IZWlnaHQ6IGhlaWdodCB9fVxuICAgICAgICBrZXk9e2l0ZW0uaWQgfHwgYG5hdml0ZW0ke1N0cmluZyhpbmRleCl9YH1cbiAgICAgICAgb25DbGljaz17KCkgPT4gdGhpcy5oYW5kbGVPbkNsaWNrKGl0ZW0uaWQsIGluZGV4KX1cbiAgICAgICAgcmVmPXsocikgPT4ge1xuICAgICAgICAgIGlmIChyICYmICF0aGlzLml0ZW1XaWR0aHNbaW5kZXhdKSB0aGlzLml0ZW1XaWR0aHNbaW5kZXhdID0gci5vZmZzZXRXaWR0aDtcbiAgICAgICAgfX1cbiAgICAgID5cbiAgICAgICAgPHNwYW4gY2xhc3NOYW1lPSd0YWItcGlsbC1pbm5lcic+XG4gICAgICAgICAge2l0ZW0ubmFtZX1cbiAgICAgICAgICB7LyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGpzeC1hMTF5L2NsaWNrLWV2ZW50cy1oYXZlLWtleS1ldmVudHMgKi99XG4gICAgICAgICAge2FsbG93Q2xvc2UgJiYgIWlzRHVtYiAmJiAoXG4gICAgICAgICAgICA8aSB0YWJJbmRleD17aW5kZXggKyAxfSByb2xlPSdidXR0b24nIGNsYXNzTmFtZT0nZmEgZmEtdGltZXMnIG9uQ2xpY2s9eyhldmVudCkgPT4gdGhpcy5oYW5kbGVDbG9zZShldmVudCwgaXRlbS5pZCwgaW5kZXgpfSAvPlxuICAgICAgICAgICl9XG4gICAgICAgIDwvc3Bhbj5cbiAgICAgIDwvYnV0dG9uPlxuICAgICk7XG4gIH07XG5cbiAgZG9MaW5lQ291bnQgPSAoKSA9PiB7XG4gICAgY29uc3QgeyBsaXN0IH0gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiBsaXN0LnNvbWUoKGl0ZW0pID0+IHR5cGVvZiBpdGVtLm5hbWUgIT09ICdzdHJpbmcnKTtcbiAgfTtcblxuICBhY3RpdmVJdGVtSW5kZXggPSAoYWN0aXZlSXRlbSkgPT4ge1xuICAgIGNvbnN0IHsgbGlzdCB9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gbGlzdC5maW5kSW5kZXgoKGl0ZW0pID0+IGl0ZW0uaWQgPT09IGFjdGl2ZUl0ZW0uaWQpO1xuICB9O1xuXG4gIC8vIFJlbmRlciBjb21ib2JveCwgd2hlbiBhbGwgaXRlbXMgZG8gbm90IGZpdFxuICBjb21ib2JveCA9ICgpID0+IHtcbiAgICBjb25zdCB7IGlkLCBsaXN0LCBmb250U2l6ZSwgZm9udFdlaWdodCwgYWxsb3dSZW9yZGVyLCBhY3RpdmVLZXksIGFsbG93Q2xvc2UgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKCF0aGlzLnN0YXRlLmlzU2VsZWN0VmlzaWJsZSkge1xuICAgICAgLy8gcmV0dXJuIG51bGwgaWYgYWxsIG5hdiBpdGVtcyBhcmUgdmlzaWJsZVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgLy8gc2xpY2UgbmF2IGl0ZW1zIGxpc3QgYW5kIHNob3cgaW52aXNpYmxlIGl0ZW1zIGluIHRoZSBjb21ib2JveFxuICAgIGNvbnN0IG5hdkxpc3QgPSB0aGlzLnN0YXRlLmxhc3RWaXNpYmxlSXRlbUluZGV4ID4gLTIgPyBsaXN0LnNsaWNlKHRoaXMuc3RhdGUubGFzdFZpc2libGVJdGVtSW5kZXggKyAxKSA6IGxpc3Q7XG4gICAgY29uc3Qgc2VsZWN0T3B0aW9ucyA9IG5hdkxpc3QubWFwKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgY29uc3QgcmVhbEluZGV4ID0gaW5kZXggKyB0aGlzLnN0YXRlLmxhc3RWaXNpYmxlSXRlbUluZGV4ICsgMTtcblxuICAgICAgY29uc3QgZHJhZ09wdGlvbnMgPSBhbGxvd1Jlb3JkZXJcbiAgICAgICAgPyB7XG4gICAgICAgICAgICBvbkRyYWdTdGFydDogKGUpID0+IHRoaXMuZHJhZ1N0YXJ0KHJlYWxJbmRleCwgZSksXG4gICAgICAgICAgICBvbkRyYWdFbnRlcjogKGUpID0+IHRoaXMuZHJhZ0VudGVyKHJlYWxJbmRleCwgZSksXG4gICAgICAgICAgICBvbkRyYWdMZWF2ZTogKGUpID0+IHRoaXMuZHJhZ0xlYXZlKGluZGV4LCBlKSxcbiAgICAgICAgICAgIG9uRHJhZ0VuZDogdGhpcy5kcmFnRHJvcCxcbiAgICAgICAgICAgIGRyYWdnYWJsZTogdHJ1ZSxcbiAgICAgICAgICB9XG4gICAgICAgIDoge307XG5cbiAgICAgIGNvbnN0IGRyb3Bkb3duT3B0aW9ucyA9IHtcbiAgICAgICAgY2xhc3NOYW1lOiBjbGFzc25hbWVzKCdkcm9wZG93bi1vcHRpb24nLCB7ICd3aXRoLWNsb3NlJzogYWxsb3dDbG9zZSwgc2VsZWN0ZWQ6IGxpc3RbYWN0aXZlS2V5XSAmJiBsaXN0W2FjdGl2ZUtleV0uaWQgPT09IGl0ZW0uaWQgfSksXG4gICAgICAgIGNsb3NlOiBhbGxvd0Nsb3NlID8gPGkgcm9sZT0nYnV0dG9uJyBjbGFzc05hbWU9J2ZhIGZhLXRpbWVzJyBvbkNsaWNrPXsoZXZlbnQpID0+IHRoaXMuaGFuZGxlQ2xvc2UoZXZlbnQsIGl0ZW0uaWQsIHJlYWxJbmRleCl9IC8+IDogbnVsbCxcbiAgICAgICAgb25TZWxlY3Q6ICgpID0+IHtcbiAgICAgICAgICB0aGlzLmhhbmRsZU9uQ2xpY2soaXRlbS5pZCwgcmVhbEluZGV4KTtcbiAgICAgICAgfSxcbiAgICAgICAgLi4uZHJhZ09wdGlvbnMsXG4gICAgICB9O1xuXG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5pdGVtLFxuICAgICAgICBvcHRpb25zOiBkcm9wZG93bk9wdGlvbnMsXG4gICAgICB9O1xuICAgIH0pO1xuXG4gICAgLy8gUmVzb2x2ZSBhY3RpdmVJdGVtXG4gICAgY29uc3QgYWN0aXZlSXRlbSA9IGxpc3RbYWN0aXZlS2V5XSA/IHNlbGVjdE9wdGlvbnMuZmluZCgoaXRlbSkgPT4gaXRlbS5pZCA9PT0gbGlzdFthY3RpdmVLZXldLmlkKSA6IG51bGw7XG4gICAgY29uc3QgYWN0aXZlQnV0dG9uID0gYWN0aXZlSXRlbSA/IHRoaXMubmF2YmFySXRlbShhY3RpdmVJdGVtLCBhY3RpdmVLZXksICd0YWItcGlsbC1pdGVtJywgdHJ1ZSkgOiBudWxsO1xuICAgIGNvbnN0IHN0eWxlID0geyBmb250V2VpZ2h0LCBmb250U2l6ZSB9O1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXZcbiAgICAgICAgaWQ9e2Ake2lkfS1zZWxlY3RgfVxuICAgICAgICBjbGFzc05hbWU9e2NsYXNzbmFtZXMoYHJlc3BvbnNpdmUtdGFiLWRyb3Bkb3duYCwgeyAnd2l0aC1zZWxlY3RlZCc6IGFjdGl2ZUJ1dHRvbiB9KX1cbiAgICAgICAgc3R5bGU9e3N0eWxlfVxuICAgICAgICByZWY9eyhyKSA9PiB7XG4gICAgICAgICAgdGhpcy5zZWxlY3RDb250YWluZXJSZWYgPSByO1xuICAgICAgICB9fVxuICAgICAgPlxuICAgICAgICA8RHJvcERvd24gdmFsdWU9e2xpc3RbYWN0aXZlS2V5XX0gYWN0aXZlSW5MaXN0PXthY3RpdmVCdXR0b259IG9wdGlvbnM9e3NlbGVjdE9wdGlvbnN9IC8+XG4gICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVufVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfTtcblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBpZCwgY2xhc3NOYW1lLCBsaXN0LCBoZWlnaHQgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgdmlzaWJsZUxpc3QgPSB0aGlzLnN0YXRlLmxhc3RWaXNpYmxlSXRlbUluZGV4ID4gLTIgPyBsaXN0LnNsaWNlKDAsIHRoaXMuc3RhdGUubGFzdFZpc2libGVJdGVtSW5kZXggKyAxKSA6IGxpc3Q7XG4gICAgY29uc3QgaXRlbUNsYXNzTmFtZSA9ICd0YWItcGlsbC1pdGVtJztcbiAgICBjb25zdCBpdGVtcyA9IHZpc2libGVMaXN0Lm1hcCgoaXRlbSwgaW5kZXgpID0+IHRoaXMubmF2YmFySXRlbShpdGVtLCBpbmRleCwgaXRlbUNsYXNzTmFtZSkpO1xuICAgIGNvbnN0IGxpbmVDb3VudCA9IHRoaXMuZG9MaW5lQ291bnQoKTtcbiAgICBjb25zdCBuYXZiYXJTdHlsZSA9IHtcbiAgICAgIG1pbkhlaWdodDogaGVpZ2h0LFxuICAgICAgbWF4SGVpZ2h0OiBoZWlnaHQsXG4gICAgfTtcbiAgICBpZiAoaGVpZ2h0LnNsaWNlKC0yKSA9PT0gJ3B4JyAmJiBsaW5lQ291bnQpIHtcbiAgICAgIGNvbnN0IGhlaWdodFB4ID0gcGFyc2VJbnQoaGVpZ2h0LnNsaWNlKDAsIC0yKSwgMTApO1xuICAgICAgbmF2YmFyU3R5bGUubGluZUhlaWdodCA9IGAke2hlaWdodFB4IC0gNH1weGA7XG4gICAgfVxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2XG4gICAgICAgIGlkPXtgJHtpZH0tY29udGFpbmVyYH1cbiAgICAgICAgcmVmPXsocikgPT4ge1xuICAgICAgICAgIHRoaXMubmF2YmFyQ29udGFpbmVyUmVmID0gcjtcbiAgICAgICAgfX1cbiAgICAgICAgY2xhc3NOYW1lPXtjbGFzc25hbWVzKGByZXNwb25zaXZlLXRhYi1waWxscy1jb250YWluZXJgLCBjbGFzc05hbWUpfVxuICAgICAgICBzdHlsZT17bmF2YmFyU3R5bGV9XG4gICAgICA+XG4gICAgICAgIHtpdGVtc31cbiAgICAgICAge3RoaXMuY29tYm9ib3goKX1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cbiJdfQ==