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

      var buttonClass = (0, _classnames2.default)(className, {
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
          className: (0, _classnames2.default)('dropdown-option', { 'with-close': allowClose, selected: list[activeKey] && list[activeKey].id === item.id }),
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
          className: (0, _classnames2.default)('responsive-tab-dropdown', { 'with-selected': activeButton }),
          style: style,
          ref: function ref(r) {
            _this.selectContainerRef = r;
          }
        },
        React.createElement(_dropdown2.default, { value: list[activeKey], activeInList: activeButton, options: selectOptions }),
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
  height: 30
}, _temp);
exports.default = ResponsiveTabPills;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yZXNwb25zaXZlLXRhYi1waWxscy5qc3giXSwibmFtZXMiOlsiUmVhY3QiLCJSZXNwb25zaXZlVGFiUGlsbHMiLCJwcm9wcyIsInN0YXRlIiwiZHJhZ0Zyb20iLCJkcmFnVG8iLCJpc1NlbGVjdFZpc2libGUiLCJsYXN0VmlzaWJsZUl0ZW1JbmRleCIsImdldExhc3RWaXNpYmxlSXRlbUluZGV4IiwibmF2QmFyV2lkdGgiLCJuYXZiYXJDb250YWluZXJSZWYiLCJvZmZzZXRXaWR0aCIsInNlbGVjdFdpZHRoIiwic2VsZWN0Q29udGFpbmVyUmVmIiwicmVtYWluaW5nV2lkdGgiLCJsYXN0VmlzaWJsZSIsImkiLCJsaXN0IiwibGVuZ3RoIiwiaXRlbVdpZHRocyIsImhhbmRsZVJlc2l6ZSIsInJlZnJlc2hMYXN0VmlzaWJsZUl0ZW0iLCJzZXRTdGF0ZSIsImhhbmRsZU9uQ2xpY2siLCJpZCIsImluZGV4Iiwib25TZWxlY3QiLCJoYW5kbGVDbG9zZSIsImV2ZW50Iiwic3RvcFByb3BhZ2F0aW9uIiwib25DbG9zZSIsImRyYWdTdGFydCIsImRyYWdFbnRlciIsImUiLCJ0YXJnZXQiLCJjbGFzc0xpc3QiLCJhZGQiLCJkcmFnTGVhdmUiLCJyZW1vdmUiLCJkcmFnRHJvcCIsIm9uUmVvcmRlciIsIm5ld0xpc3QiLCJzbGljZSIsIm1vdmVkIiwic3BsaWNlIiwibmF2YmFySXRlbSIsIml0ZW0iLCJjbGFzc05hbWUiLCJpc0R1bWIiLCJhY3RpdmVLZXkiLCJoZWlnaHQiLCJhbGxvd0Nsb3NlIiwiYWxsb3dSZW9yZGVyIiwiYWN0aXZlS2V5SW5kZXgiLCJhY3RpdmVJdGVtSW5kZXgiLCJidXR0b25DbGFzcyIsInNlbGVjdGVkIiwiZHJhZ09wdGlvbnMiLCJvbkRyYWdTdGFydCIsIm9uRHJhZ0VudGVyIiwib25EcmFnTGVhdmUiLCJvbkRyYWdFbmQiLCJkcmFnZ2FibGUiLCJtaW5IZWlnaHQiLCJTdHJpbmciLCJyIiwibmFtZSIsImRvTGluZUNvdW50Iiwic29tZSIsImFjdGl2ZUl0ZW0iLCJmaW5kSW5kZXgiLCJjb21ib2JveCIsImZvbnRTaXplIiwiZm9udFdlaWdodCIsIm5hdkxpc3QiLCJzZWxlY3RPcHRpb25zIiwibWFwIiwicmVhbEluZGV4IiwiZHJvcGRvd25PcHRpb25zIiwiY2xvc2UiLCJvcHRpb25zIiwiZmluZCIsImFjdGl2ZUJ1dHRvbiIsInN0eWxlIiwiY2hpbGRyZW4iLCJjb21wb25lbnREaWRNb3VudCIsIndpbmRvdyIsImFkZEV2ZW50TGlzdGVuZXIiLCJjb21wb25lbnREaWRVcGRhdGUiLCJwcmV2UHJvcHMiLCJwcmV2U3RhdGUiLCJjb21wb25lbnRXaWxsVW5tb3VudCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJyZW5kZXIiLCJ2aXNpYmxlTGlzdCIsIml0ZW1DbGFzc05hbWUiLCJpdGVtcyIsImxpbmVDb3VudCIsIm5hdmJhclN0eWxlIiwibWF4SGVpZ2h0IiwiaGVpZ2h0UHgiLCJwYXJzZUludCIsImxpbmVIZWlnaHQiLCJDb21wb25lbnQiLCJkZWZhdWx0UHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUE7O0lBQVlBLEs7O0FBQ1o7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7OztJQUVxQkMsa0I7OztBQTZCbkIsOEJBQVlDLEtBQVosRUFBbUI7QUFBQTs7QUFBQSxpREFDakIsNEJBQU1BLEtBQU4sQ0FEaUI7O0FBQUEsVUFLbkJDLEtBTG1CLEdBS1g7QUFDTkMsZ0JBQVUsSUFESjtBQUVOQyxjQUFRLElBRkY7QUFHTkMsdUJBQWlCLEtBSFg7QUFJTkMsNEJBQXNCLENBQUM7QUFKakIsS0FMVzs7QUFBQSxVQW1DbkJDLHVCQW5DbUIsR0FtQ08sWUFBTTtBQUM5QixVQUFNQyxjQUFjLE1BQUtDLGtCQUFMLEdBQTBCLE1BQUtBLGtCQUFMLENBQXdCQyxXQUFsRCxHQUFnRSxDQUFwRjtBQUNBLFVBQU1DLGNBQWMsTUFBS0Msa0JBQUwsR0FBMEIsTUFBS0Esa0JBQUwsQ0FBd0JGLFdBQWxELEdBQWdF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VCxFQUE4QixFQUE5QixDQUFqQjtBQUNBd0Qsa0JBQVlJLFVBQVosR0FBNEJGLFdBQVcsQ0FBdkM7QUFDRDtBQUNELFdBQ0U7QUFBQTtBQUFBO0FBQ0UsWUFBTzVFLEVBQVAsZUFERjtBQUVFLGFBQUssYUFBQ3lDLENBQUQsRUFBTztBQUNWLGlCQUFLdkQsa0JBQUwsR0FBMEJ1RCxDQUExQjtBQUNELFNBSkg7QUFLRSxtQkFBVyw0REFBNkNsQixTQUE3QyxDQUxiO0FBTUUsZUFBT21EO0FBTlQ7QUFRR0YsV0FSSDtBQVNHLFdBQUt6QixRQUFMO0FBVEgsS0FERjtBQWFELEc7OztFQTVSNkN2RSxNQUFNdUcsUyxVQW1CN0NDLFksR0FBZTtBQUNwQmhGLE1BQUksbUJBRGdCO0FBRXBCdUIsYUFBVyxFQUZTO0FBR3BCckIsWUFBVSxvQkFBTSxDQUFFLENBSEU7QUFJcEJJLFdBQVMsbUJBQU0sQ0FBRSxDQUpHO0FBS3BCcUIsY0FBWSxLQUxRO0FBTXBCQyxnQkFBYyxLQU5NO0FBT3BCRixVQUFRO0FBUFksQztrQkFuQkhqRCxrQiIsImZpbGUiOiJyZXNwb25zaXZlLXRhYi1waWxscy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgY2xhc3NuYW1lcyBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCB7IGRlYm91bmNlIH0gZnJvbSAnZGVib3VuY2UnO1xuaW1wb3J0IERyb3BEb3duIGZyb20gJy4vZHJvcGRvd24nO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZXNwb25zaXZlVGFiUGlsbHMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIGlkOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGFsbG93Q2xvc2U6IFByb3BUeXBlcy5ib29sLFxuICAgIG9uQ2xvc2U6IFByb3BUeXBlcy5mdW5jLFxuICAgIGFsbG93UmVvcmRlcjogUHJvcFR5cGVzLmJvb2wsXG4gICAgbmF2UmVuZGVyZXI6IFByb3BUeXBlcy5mdW5jLFxuICAgIGNsYXNzTmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBhY3RpdmVLZXk6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zaGFwZSh7fSksIFByb3BUeXBlcy5udW1iZXJdKS5pc1JlcXVpcmVkLFxuICAgIGxpc3Q6IFByb3BUeXBlcy5hcnJheU9mKFxuICAgICAgUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgICAgbmFtZTogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLm5vZGVdKS5pc1JlcXVpcmVkLFxuICAgICAgICBpZDogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLm51bWJlcl0pLFxuICAgICAgfSlcbiAgICApLmlzUmVxdWlyZWQsXG4gICAgb25TZWxlY3Q6IFByb3BUeXBlcy5mdW5jLFxuICAgIGhlaWdodDogUHJvcFR5cGVzLnN0cmluZyxcbiAgfTtcblxuICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgIGlkOiAncmVzcG9uc2l2ZS1uYXZiYXInLFxuICAgIGNsYXNzTmFtZTogJycsXG4gICAgb25TZWxlY3Q6ICgpID0+IHt9LFxuICAgIG9uQ2xvc2U6ICgpID0+IHt9LFxuICAgIGFsbG93Q2xvc2U6IGZhbHNlLFxuICAgIGFsbG93UmVvcmRlcjogZmFsc2UsXG4gICAgaGVpZ2h0OiAzMCxcbiAgfTtcblxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLml0ZW1XaWR0aHMgPSBbXTsgLy8gc3RvcmUgaXRlbSB3aWR0aHMgaGVyZSwgdGhleSBkb24ndCBjaGFuZ2VcbiAgfVxuXG4gIHN0YXRlID0ge1xuICAgIGRyYWdGcm9tOiBudWxsLFxuICAgIGRyYWdUbzogbnVsbCxcbiAgICBpc1NlbGVjdFZpc2libGU6IGZhbHNlLFxuICAgIGxhc3RWaXNpYmxlSXRlbUluZGV4OiAtMixcbiAgfTtcblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5oYW5kbGVSZXNpemUpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdvcmllbnRhdGlvbmNoYW5nZScsIHRoaXMucmVmcmVzaExhc3RWaXNpYmxlSXRlbSk7IC8vIGZvciBtb2JpbGUgc3VwcG9ydFxuICAgIHRoaXMucmVmcmVzaExhc3RWaXNpYmxlSXRlbSgpO1xuICB9XG5cbiAgY29tcG9uZW50RGlkVXBkYXRlKHByZXZQcm9wcywgcHJldlN0YXRlKSB7XG4gICAgLy8gUmVmcmVzaCB2aXNpYmxlIGl0ZW1zIGlmIHZhbHVlcyBjaGFuZ2VcbiAgICBpZiAoXG4gICAgICB0aGlzLnN0YXRlLmlzU2VsZWN0VmlzaWJsZSAhPT0gcHJldlN0YXRlLmlzU2VsZWN0VmlzaWJsZSB8fFxuICAgICAgdGhpcy5zdGF0ZS5sYXN0VmlzaWJsZUl0ZW1JbmRleCAhPT0gcHJldlN0YXRlLmxhc3RWaXNpYmxlSXRlbUluZGV4IHx8XG4gICAgICBwcmV2UHJvcHMuYWN0aXZlS2V5ICE9PSB0aGlzLnByb3BzLmFjdGl2ZUtleSB8fFxuICAgICAgcHJldlByb3BzLmxpc3QubGVuZ3RoICE9PSB0aGlzLnByb3BzLmxpc3QubGVuZ3RoXG4gICAgKSB7XG4gICAgICB0aGlzLnJlZnJlc2hMYXN0VmlzaWJsZUl0ZW0oKTtcbiAgICB9XG4gIH1cblxuICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5oYW5kbGVSZXNpemUpO1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdvcmllbnRhdGlvbmNoYW5nZScsIHRoaXMucmVmcmVzaExhc3RWaXNpYmxlSXRlbSk7IC8vIGZvciBtb2JpbGUgc3VwcG9ydFxuICB9XG5cbiAgZ2V0TGFzdFZpc2libGVJdGVtSW5kZXggPSAoKSA9PiB7XG4gICAgY29uc3QgbmF2QmFyV2lkdGggPSB0aGlzLm5hdmJhckNvbnRhaW5lclJlZiA/IHRoaXMubmF2YmFyQ29udGFpbmVyUmVmLm9mZnNldFdpZHRoIDogMDtcbiAgICBjb25zdCBzZWxlY3RXaWR0aCA9IHRoaXMuc2VsZWN0Q29udGFpbmVyUmVmID8gdGhpcy5zZWxlY3RDb250YWluZXJSZWYub2Zmc2V0V2lkdGggOiAwO1xuXG4gICAgbGV0IHJlbWFpbmluZ1dpZHRoID0gbmF2QmFyV2lkdGggLSBzZWxlY3RXaWR0aDtcbiAgICBsZXQgbGFzdFZpc2libGUgPSAwO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnByb3BzLmxpc3QubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIHJlbWFpbmluZ1dpZHRoIC09IHRoaXMuaXRlbVdpZHRoc1tpXTtcbiAgICAgIGlmIChyZW1haW5pbmdXaWR0aCA8IDApIHtcbiAgICAgICAgbGFzdFZpc2libGUgLT0gMTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBsYXN0VmlzaWJsZSArPSAxO1xuICAgIH1cblxuICAgIHJldHVybiBsYXN0VmlzaWJsZTtcbiAgfTtcblxuICBoYW5kbGVSZXNpemUgPSAoKSA9PiBkZWJvdW5jZSh0aGlzLnJlZnJlc2hMYXN0VmlzaWJsZUl0ZW0oKSwgMzAwKTtcblxuICByZWZyZXNoTGFzdFZpc2libGVJdGVtID0gKCkgPT4ge1xuICAgIGNvbnN0IGxhc3RWaXNpYmxlSXRlbUluZGV4ID0gdGhpcy5nZXRMYXN0VmlzaWJsZUl0ZW1JbmRleCgpO1xuICAgIGlmICh0aGlzLnN0YXRlLmxhc3RWaXNpYmxlSXRlbUluZGV4ICE9PSBsYXN0VmlzaWJsZUl0ZW1JbmRleCkge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIGlzU2VsZWN0VmlzaWJsZTogdGhpcy5wcm9wcy5saXN0Lmxlbmd0aCA+IGxhc3RWaXNpYmxlSXRlbUluZGV4ICsgMSxcbiAgICAgICAgbGFzdFZpc2libGVJdGVtSW5kZXgsXG4gICAgICB9KTtcbiAgICB9XG4gIH07XG5cbiAgaGFuZGxlT25DbGljayA9IChpZCwgaW5kZXgpID0+IHtcbiAgICB0aGlzLnByb3BzLm9uU2VsZWN0KGlkLCBpbmRleCwgdGhpcy5wcm9wcy5saXN0W2luZGV4XSk7XG4gIH07XG5cbiAgaGFuZGxlQ2xvc2UgPSAoZXZlbnQsIGlkLCBpbmRleCkgPT4ge1xuICAgIC8vIGRvbid0IGJ1YmJsZSB0byBjbGljayBhbHNvLCB3ZSBnb3QgcmlkIG9mIHRoaXNcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB0aGlzLnByb3BzLm9uQ2xvc2UoaWQsIGluZGV4KTtcbiAgfTtcblxuICBkcmFnU3RhcnQgPSAoaW5kZXgpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGRyYWdGcm9tOiBpbmRleCxcbiAgICB9KTtcbiAgfTtcblxuICBkcmFnRW50ZXIgPSAoaW5kZXgsIGUpID0+IHtcbiAgICBlLnRhcmdldC5jbGFzc0xpc3QuYWRkKCdkcm9wcGFibGUnKTtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGRyYWdUbzogaW5kZXgsXG4gICAgfSk7XG4gIH07XG5cbiAgZHJhZ0xlYXZlID0gKGluZGV4LCBlKSA9PiB7XG4gICAgZS50YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSgnZHJvcHBhYmxlJyk7XG4gIH07XG5cbiAgZHJhZ0Ryb3AgPSAoKSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMub25SZW9yZGVyKSB7XG4gICAgICBjb25zdCB7IGRyYWdGcm9tLCBkcmFnVG8gfSA9IHRoaXMuc3RhdGU7XG4gICAgICBjb25zdCBuZXdMaXN0ID0gdGhpcy5wcm9wcy5saXN0LnNsaWNlKCk7XG4gICAgICBjb25zdCBtb3ZlZCA9IG5ld0xpc3RbZHJhZ0Zyb21dO1xuXG4gICAgICBuZXdMaXN0LnNwbGljZShkcmFnRnJvbSwgMSk7XG4gICAgICBuZXdMaXN0LnNwbGljZShkcmFnVG8sIDAsIG1vdmVkKTtcblxuICAgICAgdGhpcy5wcm9wcy5vblJlb3JkZXIobmV3TGlzdCwgZHJhZ0Zyb20sIGRyYWdUbyk7XG4gICAgICB0aGlzLnByb3BzLm9uU2VsZWN0KG1vdmVkLCBkcmFnVG8pO1xuXG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgZHJhZ1RvOiBudWxsLFxuICAgICAgICBkcmFnRnJvbTogbnVsbCxcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcblxuICAvLyBSZW5kZXIgbmF2YmFyIGl0ZW1cbiAgbmF2YmFySXRlbSA9IChpdGVtLCBpbmRleCwgY2xhc3NOYW1lLCBpc0R1bWIpID0+IHtcbiAgICBjb25zdCB7IGFjdGl2ZUtleSwgaGVpZ2h0LCBhbGxvd0Nsb3NlLCBhbGxvd1Jlb3JkZXIgfSA9IHRoaXMucHJvcHM7XG5cbiAgICAvLyByZXNvbHZlIGFjdGl2ZUtleUluZGV4XG4gICAgbGV0IGFjdGl2ZUtleUluZGV4ID0gYWN0aXZlS2V5O1xuICAgIGlmICh0eXBlb2YgYWN0aXZlS2V5ID09PSAnb2JqZWN0Jykge1xuICAgICAgYWN0aXZlS2V5SW5kZXggPSB0aGlzLmFjdGl2ZUl0ZW1JbmRleChhY3RpdmVLZXkpO1xuICAgIH1cblxuICAgIGNvbnN0IGJ1dHRvbkNsYXNzID0gY2xhc3NuYW1lcyhjbGFzc05hbWUsIHtcbiAgICAgIHNlbGVjdGVkOiBpbmRleCA9PT0gYWN0aXZlS2V5SW5kZXgsXG4gICAgICAnd2l0aC1jbG9zZSc6ICFpc0R1bWIgJiYgYWxsb3dDbG9zZSxcbiAgICB9KTtcblxuICAgIGNvbnN0IGRyYWdPcHRpb25zID1cbiAgICAgIGFsbG93UmVvcmRlciAmJiAhaXNEdW1iXG4gICAgICAgID8ge1xuICAgICAgICAgICAgb25EcmFnU3RhcnQ6ICgpID0+IHRoaXMuZHJhZ1N0YXJ0KGluZGV4KSxcbiAgICAgICAgICAgIG9uRHJhZ0VudGVyOiAoZSkgPT4gdGhpcy5kcmFnRW50ZXIoaW5kZXgsIGUpLFxuICAgICAgICAgICAgb25EcmFnTGVhdmU6IChlKSA9PiB0aGlzLmRyYWdMZWF2ZShpbmRleCwgZSksXG4gICAgICAgICAgICBvbkRyYWdFbmQ6IHRoaXMuZHJhZ0Ryb3AsXG4gICAgICAgICAgICBkcmFnZ2FibGU6IHRydWUsXG4gICAgICAgICAgfVxuICAgICAgICA6IHt9O1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxidXR0b25cbiAgICAgICAgey4uLmRyYWdPcHRpb25zfVxuICAgICAgICBjbGFzc05hbWU9e2J1dHRvbkNsYXNzfVxuICAgICAgICBzdHlsZT17eyBtaW5IZWlnaHQ6IGhlaWdodCB9fVxuICAgICAgICBrZXk9e2l0ZW0uaWQgfHwgYG5hdml0ZW0ke1N0cmluZyhpbmRleCl9YH1cbiAgICAgICAgb25DbGljaz17KCkgPT4gdGhpcy5oYW5kbGVPbkNsaWNrKGl0ZW0uaWQsIGluZGV4KX1cbiAgICAgICAgcmVmPXsocikgPT4ge1xuICAgICAgICAgIGlmIChyICYmICF0aGlzLml0ZW1XaWR0aHNbaW5kZXhdKSB0aGlzLml0ZW1XaWR0aHNbaW5kZXhdID0gci5vZmZzZXRXaWR0aDtcbiAgICAgICAgfX1cbiAgICAgID5cbiAgICAgICAgPHNwYW4gY2xhc3NOYW1lPSd0YWItcGlsbC1pbm5lcic+XG4gICAgICAgICAge2l0ZW0ubmFtZX1cbiAgICAgICAgICB7LyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGpzeC1hMTF5L2NsaWNrLWV2ZW50cy1oYXZlLWtleS1ldmVudHMgKi99XG4gICAgICAgICAge2FsbG93Q2xvc2UgJiYgIWlzRHVtYiAmJiAoXG4gICAgICAgICAgICA8aSB0YWJJbmRleD17aW5kZXggKyAxfSByb2xlPSdidXR0b24nIGNsYXNzTmFtZT0nZmEgZmEtdGltZXMnIG9uQ2xpY2s9eyhldmVudCkgPT4gdGhpcy5oYW5kbGVDbG9zZShldmVudCwgaXRlbS5pZCwgaW5kZXgpfSAvPlxuICAgICAgICAgICl9XG4gICAgICAgIDwvc3Bhbj5cbiAgICAgIDwvYnV0dG9uPlxuICAgICk7XG4gIH07XG5cbiAgZG9MaW5lQ291bnQgPSAoKSA9PiB7XG4gICAgY29uc3QgeyBsaXN0IH0gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiBsaXN0LnNvbWUoKGl0ZW0pID0+IHR5cGVvZiBpdGVtLm5hbWUgIT09ICdzdHJpbmcnKTtcbiAgfTtcblxuICBhY3RpdmVJdGVtSW5kZXggPSAoYWN0aXZlSXRlbSkgPT4ge1xuICAgIGNvbnN0IHsgbGlzdCB9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gbGlzdC5maW5kSW5kZXgoKGl0ZW0pID0+IGl0ZW0uaWQgPT09IGFjdGl2ZUl0ZW0uaWQpO1xuICB9O1xuXG4gIC8vIFJlbmRlciBjb21ib2JveCwgd2hlbiBhbGwgaXRlbXMgZG8gbm90IGZpdFxuICBjb21ib2JveCA9ICgpID0+IHtcbiAgICBjb25zdCB7IGlkLCBsaXN0LCBmb250U2l6ZSwgZm9udFdlaWdodCwgYWxsb3dSZW9yZGVyLCBhY3RpdmVLZXksIGFsbG93Q2xvc2UgfSA9IHRoaXMucHJvcHM7XG4gICAgaWYgKCF0aGlzLnN0YXRlLmlzU2VsZWN0VmlzaWJsZSkge1xuICAgICAgLy8gcmV0dXJuIG51bGwgaWYgYWxsIG5hdiBpdGVtcyBhcmUgdmlzaWJsZVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgLy8gc2xpY2UgbmF2IGl0ZW1zIGxpc3QgYW5kIHNob3cgaW52aXNpYmxlIGl0ZW1zIGluIHRoZSBjb21ib2JveFxuICAgIGNvbnN0IG5hdkxpc3QgPSB0aGlzLnN0YXRlLmxhc3RWaXNpYmxlSXRlbUluZGV4ID4gLTIgPyBsaXN0LnNsaWNlKHRoaXMuc3RhdGUubGFzdFZpc2libGVJdGVtSW5kZXggKyAxKSA6IGxpc3Q7XG4gICAgY29uc3Qgc2VsZWN0T3B0aW9ucyA9IG5hdkxpc3QubWFwKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgY29uc3QgcmVhbEluZGV4ID0gaW5kZXggKyB0aGlzLnN0YXRlLmxhc3RWaXNpYmxlSXRlbUluZGV4ICsgMTtcblxuICAgICAgY29uc3QgZHJhZ09wdGlvbnMgPSBhbGxvd1Jlb3JkZXJcbiAgICAgICAgPyB7XG4gICAgICAgICAgICBvbkRyYWdTdGFydDogKGUpID0+IHRoaXMuZHJhZ1N0YXJ0KHJlYWxJbmRleCwgZSksXG4gICAgICAgICAgICBvbkRyYWdFbnRlcjogKGUpID0+IHRoaXMuZHJhZ0VudGVyKHJlYWxJbmRleCwgZSksXG4gICAgICAgICAgICBvbkRyYWdMZWF2ZTogKGUpID0+IHRoaXMuZHJhZ0xlYXZlKGluZGV4LCBlKSxcbiAgICAgICAgICAgIG9uRHJhZ0VuZDogdGhpcy5kcmFnRHJvcCxcbiAgICAgICAgICAgIGRyYWdnYWJsZTogdHJ1ZSxcbiAgICAgICAgICB9XG4gICAgICAgIDoge307XG5cbiAgICAgIGNvbnN0IGRyb3Bkb3duT3B0aW9ucyA9IHtcbiAgICAgICAgY2xhc3NOYW1lOiBjbGFzc25hbWVzKCdkcm9wZG93bi1vcHRpb24nLCB7ICd3aXRoLWNsb3NlJzogYWxsb3dDbG9zZSwgc2VsZWN0ZWQ6IGxpc3RbYWN0aXZlS2V5XSAmJiBsaXN0W2FjdGl2ZUtleV0uaWQgPT09IGl0ZW0uaWQgfSksXG4gICAgICAgIGNsb3NlOiBhbGxvd0Nsb3NlID8gPGkgcm9sZT0nYnV0dG9uJyBjbGFzc05hbWU9J2ZhIGZhLXRpbWVzJyBvbkNsaWNrPXsoZXZlbnQpID0+IHRoaXMuaGFuZGxlQ2xvc2UoZXZlbnQsIGl0ZW0uaWQsIHJlYWxJbmRleCl9IC8+IDogbnVsbCxcbiAgICAgICAgb25TZWxlY3Q6ICgpID0+IHtcbiAgICAgICAgICB0aGlzLmhhbmRsZU9uQ2xpY2soaXRlbS5pZCwgcmVhbEluZGV4KTtcbiAgICAgICAgfSxcbiAgICAgICAgLi4uZHJhZ09wdGlvbnMsXG4gICAgICB9O1xuXG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5pdGVtLFxuICAgICAgICBvcHRpb25zOiBkcm9wZG93bk9wdGlvbnMsXG4gICAgICB9O1xuICAgIH0pO1xuXG4gICAgLy8gUmVzb2x2ZSBhY3RpdmVJdGVtXG4gICAgY29uc3QgYWN0aXZlSXRlbSA9IGxpc3RbYWN0aXZlS2V5XSA/IHNlbGVjdE9wdGlvbnMuZmluZCgoaXRlbSkgPT4gaXRlbS5pZCA9PT0gbGlzdFthY3RpdmVLZXldLmlkKSA6IG51bGw7XG4gICAgY29uc3QgYWN0aXZlQnV0dG9uID0gYWN0aXZlSXRlbSA/IHRoaXMubmF2YmFySXRlbShhY3RpdmVJdGVtLCBhY3RpdmVLZXksICd0YWItcGlsbC1pdGVtJywgdHJ1ZSkgOiBudWxsO1xuICAgIGNvbnN0IHN0eWxlID0geyBmb250V2VpZ2h0LCBmb250U2l6ZSB9O1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXZcbiAgICAgICAgaWQ9e2Ake2lkfS1zZWxlY3RgfVxuICAgICAgICBjbGFzc05hbWU9e2NsYXNzbmFtZXMoYHJlc3BvbnNpdmUtdGFiLWRyb3Bkb3duYCwgeyAnd2l0aC1zZWxlY3RlZCc6IGFjdGl2ZUJ1dHRvbiB9KX1cbiAgICAgICAgc3R5bGU9e3N0eWxlfVxuICAgICAgICByZWY9eyhyKSA9PiB7XG4gICAgICAgICAgdGhpcy5zZWxlY3RDb250YWluZXJSZWYgPSByO1xuICAgICAgICB9fVxuICAgICAgPlxuICAgICAgICA8RHJvcERvd24gdmFsdWU9e2xpc3RbYWN0aXZlS2V5XX0gYWN0aXZlSW5MaXN0PXthY3RpdmVCdXR0b259IG9wdGlvbnM9e3NlbGVjdE9wdGlvbnN9IC8+XG4gICAgICAgIHt0aGlzLnByb3BzLmNoaWxkcmVufVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfTtcblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBpZCwgY2xhc3NOYW1lLCBsaXN0LCBoZWlnaHQgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgdmlzaWJsZUxpc3QgPSB0aGlzLnN0YXRlLmxhc3RWaXNpYmxlSXRlbUluZGV4ID4gLTIgPyBsaXN0LnNsaWNlKDAsIHRoaXMuc3RhdGUubGFzdFZpc2libGVJdGVtSW5kZXggKyAxKSA6IGxpc3Q7XG4gICAgY29uc3QgaXRlbUNsYXNzTmFtZSA9ICd0YWItcGlsbC1pdGVtJztcbiAgICBjb25zdCBpdGVtcyA9IHZpc2libGVMaXN0Lm1hcCgoaXRlbSwgaW5kZXgpID0+IHRoaXMubmF2YmFySXRlbShpdGVtLCBpbmRleCwgaXRlbUNsYXNzTmFtZSkpO1xuICAgIGNvbnN0IGxpbmVDb3VudCA9IHRoaXMuZG9MaW5lQ291bnQoKTtcbiAgICBjb25zdCBuYXZiYXJTdHlsZSA9IHtcbiAgICAgIG1pbkhlaWdodDogaGVpZ2h0LFxuICAgICAgbWF4SGVpZ2h0OiBoZWlnaHQsXG4gICAgfTtcbiAgICBpZiAoaGVpZ2h0LnNsaWNlKC0yKSA9PT0gJ3B4JyAmJiBsaW5lQ291bnQpIHtcbiAgICAgIGNvbnN0IGhlaWdodFB4ID0gcGFyc2VJbnQoaGVpZ2h0LnNsaWNlKDAsIC0yKSwgMTApO1xuICAgICAgbmF2YmFyU3R5bGUubGluZUhlaWdodCA9IGAke2hlaWdodFB4IC0gNH1weGA7XG4gICAgfVxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2XG4gICAgICAgIGlkPXtgJHtpZH0tY29udGFpbmVyYH1cbiAgICAgICAgcmVmPXsocikgPT4ge1xuICAgICAgICAgIHRoaXMubmF2YmFyQ29udGFpbmVyUmVmID0gcjtcbiAgICAgICAgfX1cbiAgICAgICAgY2xhc3NOYW1lPXtjbGFzc25hbWVzKGByZXNwb25zaXZlLXRhYi1waWxscy1jb250YWluZXJgLCBjbGFzc05hbWUpfVxuICAgICAgICBzdHlsZT17bmF2YmFyU3R5bGV9XG4gICAgICA+XG4gICAgICAgIHtpdGVtc31cbiAgICAgICAge3RoaXMuY29tYm9ib3goKX1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cbiJdfQ==