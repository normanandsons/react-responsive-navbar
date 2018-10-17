'use strict';

exports.__esModule = true;
exports.default = undefined;

var _class, _temp2; /* eslint-disable react/no-array-index-key */
/* eslint-disable react/no-string-refs */
/* eslint-disable react/no-find-dom-node */
/* eslint-disable react/prop-types */


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactSelect = require('react-select');

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var _reactBootstrap = require('react-bootstrap');

require('react-select/dist/react-select.css');

require('./responsive-navbar.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ResponsiveNavbar = (_temp2 = _class = function (_React$PureComponent) {
  _inherits(ResponsiveNavbar, _React$PureComponent);

  function ResponsiveNavbar() {
    var _temp, _this, _ret;

    _classCallCheck(this, ResponsiveNavbar);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args))), _this), _this.state = {
      updateDimenssions: false,
      lastVisibleItemIndex: -1,
      lastWidth: 0
    }, _this.getMainPartOfId = function () {
      return _this.props.id || 'responsive-navbar';
    }, _this.indexOfLastVisibleNavItem = function () {
      var container = _this.refs.navbarContainer;
      var containerWidth = _reactDom2.default.findDOMNode(container) ? _reactDom2.default.findDOMNode(container).offsetWidth : 0;

      var remainingWidth = containerWidth - 195;

      var lastVisible = 1;
      for (var i = 0; i < _this.props.list.length - 1; i += 1) {
        var item = _this.refs['navitemref' + String(i)];
        var node = _reactDom2.default.findDOMNode(item);
        if (!node) {
          break;
        }
        var itemWidth = node.offsetWidth;
        remainingWidth -= itemWidth;
        if (remainingWidth < 0) {
          lastVisible -= 1;
          break;
        }
        lastVisible += 1;
      }

      return lastVisible;
    }, _this.handleResizeEvent = function () {
      var difference = window.innerWidth - _this.state.lastWidth;
      var UPDATE_THRESHOLD = 50;
      if (Math.abs(difference) > UPDATE_THRESHOLD) {
        _this.setState({
          updateDimenssions: true,
          lastWidth: window.innerWidth
        });
      }
    }, _this.selectionChanged = function (item) {
      _this.props.router.push(item.value);
    }, _this.tooltipWrapper = function (node, index, tooltipContent) {
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
    }, _this.navbarItem = function (item, index, className) {
      return _react2.default.createElement(
        'button',
        {
          className: index === _this.props.activeKey && index <= _this.state.lastVisibleItemIndex ? className + ' selected-border' : '' + className,
          style: { fontWeight: _this.props.fontWeight, fontSize: _this.props.fontSize },
          id: item.id || 'navitemref' + String(index),
          key: item.id || 'navitemref' + String(index),
          ref: 'navitemref' + String(index),
          onClick: function onClick() {
            _this.props.onSelect(item.href);
          }
        },
        _react2.default.createElement(
          'span',
          { className: 'responsive-navbar-item-text' },
          item.name
        )
      );
    }, _this.doLineCount = function () {
      var list = _this.props.list;

      return list.some(function (item) {
        return typeof item.name !== 'string';
      });
    }, _this.navbar = function () {
      var list = _this.state.lastVisibleItemIndex >= 0 ? _this.props.list.slice(0, _this.state.lastVisibleItemIndex) : _this.props.list;
      var className = _this.props.showNavItemBorder ? 'responsive-navbar-item inactive-border' : 'responsive-navbar-item no-item-border';
      var items = list.map(function (item, index) {
        return _this.tooltipWrapper(_this.navbarItem(item, index, className), index, item.name);
      });
      var lineCount = _this.doLineCount();
      var navbarStyle = {
        minHeight: _this.props.height
      };
      if (_this.props.height.slice(-2) === 'px' && lineCount) {
        var heightPx = parseInt(_this.props.height.slice(0, -2), 10);
        navbarStyle.lineHeight = heightPx - 4 + 'px';
      }
      return _react2.default.createElement(
        'div',
        {
          id: _this.getMainPartOfId() + '-container',
          ref: 'navbarContainer',
          className: 'responsive-navbar-container',
          style: navbarStyle
        },
        items,
        _this.combobox()
      );
    }, _this.combobox = function () {
      var _this$props = _this.props,
          list = _this$props.list,
          onSelect = _this$props.onSelect,
          fontSize = _this$props.fontSize,
          activeKey = _this$props.activeKey,
          fontWeight = _this$props.fontWeight,
          placeholder = _this$props.placeholder,
          showNavItemBorder = _this$props.showNavItemBorder;

      if (_this.state.lastVisibleItemIndex === -1 || _this.state.lastVisibleItemIndex > list.length - 1) {
        // return null if all nav items are visible
        return null;
      }

      // slice nav items list and show invisible items in the combobox
      var navList = _this.state.lastVisibleItemIndex >= 0 ? list.slice(_this.state.lastVisibleItemIndex) : list;
      var items = navList.map(function (item, index) {
        return {
          value: item.href,
          label: item.name,
          id: index,
          ref: 'navitemref' + String(index)
        };
      });
      var lineCountNeeded = _this.doLineCount();
      var customLineCount = lineCountNeeded ? 'line-count' : '';
      var customBorderClass = lineCountNeeded ? 'selected-border line-count' : 'selected-border';
      var customInactiveBorder = lineCountNeeded ? 'inactive-border line-count' : 'inactive-border';
      var inactiveBorder = showNavItemBorder ? customInactiveBorder : customLineCount;
      var borderClass = activeKey >= _this.state.lastVisibleItemIndex ? customBorderClass : inactiveBorder; // eslint-disable-line
      var activeItem = list[activeKey];
      return _react2.default.createElement(
        'div',
        {
          id: _this.getMainPartOfId() + '-select',
          className: 'responsive-navbar-select ' + borderClass,
          style: { fontWeight: fontWeight, fontSize: fontSize }
        },
        _react2.default.createElement(_reactSelect2.default, {
          name: 'responsiveNavbarSelect',
          multi: false,
          value: activeItem ? activeItem.href : '',
          clearable: false,
          placeholder: placeholder,
          options: items,
          onChange: function onChange(item) {
            onSelect(item.value);
          },
          inputProps: { id: 'ocResponsiveNavbarSelect' }
        })
      );
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  ResponsiveNavbar.prototype.componentDidMount = function componentDidMount() {
    var _this2 = this;

    window.addEventListener('resize', this.handleResizeEvent);
    window.addEventListener('orientationchange', this.handleResizeEvent); // for mobile support
    // Component is not rendered yet by browser when DidMount is called
    setTimeout(function () {
      _this2.handleResizeEvent();
    }, this.props.initialUpdateDelay);
  };

  ResponsiveNavbar.prototype.componentDidUpdate = function componentDidUpdate() {
    if (this.state.updateDimenssions) {
      this.setState({ // eslint-disable-line react/no-did-update-set-state
        // 2nd render is triggered here in purpose
        updateDimenssions: false,
        lastVisibleItemIndex: this.indexOfLastVisibleNavItem()
      });
    }
  };

  ResponsiveNavbar.prototype.componentWillUnmount = function componentWillUnmount() {
    window.removeEventListener('resize', this.handleResizeEvent);
    window.removeEventListener('orientationchange', this.handleResizeEvent); // for mobile support
  };

  ResponsiveNavbar.prototype.render = function render() {
    return this.navbar();
  };

  return ResponsiveNavbar;
}(_react2.default.PureComponent), _class.defaultProps = {
  id: null,
  onSelect: null,
  showNavItemBorder: false,
  showNavItemTooltip: true,
  tooltipDelay: 2000,
  fontSize: 'inherit',
  fontWeight: 'inherit',
  placeholder: 'more...',
  height: '40px',
  initialUpdateDelay: 200
}, _temp2);
exports.default = ResponsiveNavbar;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yZXNwb25zaXZlLW5hdmJhci5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIlJlc3BvbnNpdmVOYXZiYXIiLCJzdGF0ZSIsInVwZGF0ZURpbWVuc3Npb25zIiwibGFzdFZpc2libGVJdGVtSW5kZXgiLCJsYXN0V2lkdGgiLCJnZXRNYWluUGFydE9mSWQiLCJwcm9wcyIsImlkIiwiaW5kZXhPZkxhc3RWaXNpYmxlTmF2SXRlbSIsImNvbnRhaW5lciIsInJlZnMiLCJuYXZiYXJDb250YWluZXIiLCJjb250YWluZXJXaWR0aCIsIlJlYWN0RE9NIiwiZmluZERPTU5vZGUiLCJvZmZzZXRXaWR0aCIsInJlbWFpbmluZ1dpZHRoIiwibGFzdFZpc2libGUiLCJpIiwibGlzdCIsImxlbmd0aCIsIml0ZW0iLCJTdHJpbmciLCJub2RlIiwiaXRlbVdpZHRoIiwiaGFuZGxlUmVzaXplRXZlbnQiLCJkaWZmZXJlbmNlIiwid2luZG93IiwiaW5uZXJXaWR0aCIsIlVQREFURV9USFJFU0hPTEQiLCJNYXRoIiwiYWJzIiwic2V0U3RhdGUiLCJzZWxlY3Rpb25DaGFuZ2VkIiwicm91dGVyIiwicHVzaCIsInZhbHVlIiwidG9vbHRpcFdyYXBwZXIiLCJpbmRleCIsInRvb2x0aXBDb250ZW50IiwidG9vbHRpcCIsInNob3dOYXZJdGVtVG9vbHRpcCIsInRvb2x0aXBEZWxheSIsIm5hdmJhckl0ZW0iLCJjbGFzc05hbWUiLCJhY3RpdmVLZXkiLCJmb250V2VpZ2h0IiwiZm9udFNpemUiLCJvblNlbGVjdCIsImhyZWYiLCJuYW1lIiwiZG9MaW5lQ291bnQiLCJzb21lIiwibmF2YmFyIiwic2xpY2UiLCJzaG93TmF2SXRlbUJvcmRlciIsIml0ZW1zIiwibWFwIiwibGluZUNvdW50IiwibmF2YmFyU3R5bGUiLCJtaW5IZWlnaHQiLCJoZWlnaHQiLCJoZWlnaHRQeCIsInBhcnNlSW50IiwibGluZUhlaWdodCIsImNvbWJvYm94IiwicGxhY2Vob2xkZXIiLCJuYXZMaXN0IiwibGFiZWwiLCJyZWYiLCJsaW5lQ291bnROZWVkZWQiLCJjdXN0b21MaW5lQ291bnQiLCJjdXN0b21Cb3JkZXJDbGFzcyIsImN1c3RvbUluYWN0aXZlQm9yZGVyIiwiaW5hY3RpdmVCb3JkZXIiLCJib3JkZXJDbGFzcyIsImFjdGl2ZUl0ZW0iLCJjb21wb25lbnREaWRNb3VudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJzZXRUaW1lb3V0IiwiaW5pdGlhbFVwZGF0ZURlbGF5IiwiY29tcG9uZW50RGlkVXBkYXRlIiwiY29tcG9uZW50V2lsbFVubW91bnQiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwicmVuZGVyIiwiUmVhY3QiLCJQdXJlQ29tcG9uZW50IiwiZGVmYXVsdFByb3BzIl0sIm1hcHBpbmdzIjoiOzs7OztvQkFBQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7OztJQUVxQkEsZ0I7Ozs7Ozs7Ozs7OztnS0FtQ25CQyxLLEdBQVE7QUFDTkMseUJBQW1CLEtBRGI7QUFFTkMsNEJBQXNCLENBQUMsQ0FGakI7QUFHTkMsaUJBQVc7QUFITCxLLFFBOEJSQyxlLEdBQWtCO0FBQUEsYUFBTyxNQUFLQyxLQUFMLENBQVdDLEVBQVgsSUFBaUIsbUJBQXhCO0FBQUEsSyxRQUVsQkMseUIsR0FBNEIsWUFBTTtBQUNoQyxVQUFNQyxZQUFZLE1BQUtDLElBQUwsQ0FBVUMsZUFBNUI7QUFDQSxVQUFNQyxpQkFBaUJDLG1CQUFTQyxXQUFULENBQXFCTCxTQUFyQixJQUNyQkksbUJBQVNDLFdBQVQsQ0FBcUJMLFNBQXJCLEVBQWdDTSxXQURYLEdBQ3lCLENBRGhEOztBQUdBLFVBQUlDLGlCQUFpQkosaUJBQWlCLEdBQXRDOztBQUVBLFVBQUlLLGNBQWMsQ0FBbEI7QUFDQSxXQUFLLElBQUlDLElBQUksQ0FBYixFQUFnQkEsSUFBSSxNQUFLWixLQUFMLENBQVdhLElBQVgsQ0FBZ0JDLE1BQWhCLEdBQXlCLENBQTdDLEVBQWdERixL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Q0FBMkIsbUJBQTNCLEVBQWdELEtBQUsxRCxpQkFBckQsRUFGcUIsQ0FFb0Q7QUFDMUUsRzs7NkJBMkpEMkQsTSxxQkFBUztBQUNQLFdBQU8sS0FBSy9CLE1BQUwsRUFBUDtBQUNELEc7OztFQTVOMkNnQyxnQkFBTUMsYSxVQXNCM0NDLFksR0FBZTtBQUNwQmhGLE1BQUksSUFEZ0I7QUFFcEJ5QyxZQUFVLElBRlU7QUFHcEJPLHFCQUFtQixLQUhDO0FBSXBCZCxzQkFBb0IsSUFKQTtBQUtwQkMsZ0JBQWMsSUFMTTtBQU1wQkssWUFBVSxTQU5VO0FBT3BCRCxjQUFZLFNBUFE7QUFRcEJvQixlQUFhLFNBUk87QUFTcEJMLFVBQVEsTUFUWTtBQVVwQm1CLHNCQUFvQjtBQVZBLEM7a0JBdEJIaEYsZ0IiLCJmaWxlIjoicmVzcG9uc2l2ZS1uYXZiYXIuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgcmVhY3Qvbm8tYXJyYXktaW5kZXgta2V5ICovXG4vKiBlc2xpbnQtZGlzYWJsZSByZWFjdC9uby1zdHJpbmctcmVmcyAqL1xuLyogZXNsaW50LWRpc2FibGUgcmVhY3Qvbm8tZmluZC1kb20tbm9kZSAqL1xuLyogZXNsaW50LWRpc2FibGUgcmVhY3QvcHJvcC10eXBlcyAqL1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcbmltcG9ydCBTZWxlY3QgZnJvbSAncmVhY3Qtc2VsZWN0JztcbmltcG9ydCB7IE92ZXJsYXlUcmlnZ2VyLCBUb29sdGlwIH0gZnJvbSAncmVhY3QtYm9vdHN0cmFwJztcbmltcG9ydCAncmVhY3Qtc2VsZWN0L2Rpc3QvcmVhY3Qtc2VsZWN0LmNzcyc7XG5pbXBvcnQgJy4vcmVzcG9uc2l2ZS1uYXZiYXIuc2Nzcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlc3BvbnNpdmVOYXZiYXIgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBpZDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBzaG93TmF2SXRlbUJvcmRlcjogUHJvcFR5cGVzLmJvb2wsXG4gICAgc2hvd05hdkl0ZW1Ub29sdGlwOiBQcm9wVHlwZXMuYm9vbCxcbiAgICB0b29sdGlwRGVsYXk6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgZm9udFNpemU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgZm9udFdlaWdodDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBwbGFjZWhvbGRlcjogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBhY3RpdmVLZXk6IFByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcbiAgICBsaXN0OiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgbmFtZTogUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICAgIFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgIFByb3BUeXBlcy5ub2RlLFxuICAgICAgXSkuaXNSZXF1aXJlZCxcbiAgICAgIGhyZWY6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5udW1iZXJdKSxcbiAgICB9KSkuaXNSZXF1aXJlZCxcbiAgICBvblNlbGVjdDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgaGVpZ2h0OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGluaXRpYWxVcGRhdGVEZWxheTogUHJvcFR5cGVzLm51bWJlcixcbiAgfVxuXG4gIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgaWQ6IG51bGwsXG4gICAgb25TZWxlY3Q6IG51bGwsXG4gICAgc2hvd05hdkl0ZW1Cb3JkZXI6IGZhbHNlLFxuICAgIHNob3dOYXZJdGVtVG9vbHRpcDogdHJ1ZSxcbiAgICB0b29sdGlwRGVsYXk6IDIwMDAsXG4gICAgZm9udFNpemU6ICdpbmhlcml0JyxcbiAgICBmb250V2VpZ2h0OiAnaW5oZXJpdCcsXG4gICAgcGxhY2Vob2xkZXI6ICdtb3JlLi4uJyxcbiAgICBoZWlnaHQ6ICc0MHB4JyxcbiAgICBpbml0aWFsVXBkYXRlRGVsYXk6IDIwMCxcbiAgfVxuXG4gIHN0YXRlID0ge1xuICAgIHVwZGF0ZURpbWVuc3Npb25zOiBmYWxzZSxcbiAgICBsYXN0VmlzaWJsZUl0ZW1JbmRleDogLTEsXG4gICAgbGFzdFdpZHRoOiAwLFxuICB9O1xuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLmhhbmRsZVJlc2l6ZUV2ZW50KTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignb3JpZW50YXRpb25jaGFuZ2UnLCB0aGlzLmhhbmRsZVJlc2l6ZUV2ZW50KTsgLy8gZm9yIG1vYmlsZSBzdXBwb3J0XG4gICAgLy8gQ29tcG9uZW50IGlzIG5vdCByZW5kZXJlZCB5ZXQgYnkgYnJvd3NlciB3aGVuIERpZE1vdW50IGlzIGNhbGxlZFxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5oYW5kbGVSZXNpemVFdmVudCgpO1xuICAgIH0sIHRoaXMucHJvcHMuaW5pdGlhbFVwZGF0ZURlbGF5KTtcbiAgfVxuXG4gIGNvbXBvbmVudERpZFVwZGF0ZSgpIHtcbiAgICBpZiAodGhpcy5zdGF0ZS51cGRhdGVEaW1lbnNzaW9ucykge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgcmVhY3Qvbm8tZGlkLXVwZGF0ZS1zZXQtc3RhdGVcbiAgICAgICAgLy8gMm5kIHJlbmRlciBpcyB0cmlnZ2VyZWQgaGVyZSBpbiBwdXJwb3NlXG4gICAgICAgIHVwZGF0ZURpbWVuc3Npb25zOiBmYWxzZSxcbiAgICAgICAgbGFzdFZpc2libGVJdGVtSW5kZXg6IHRoaXMuaW5kZXhPZkxhc3RWaXNpYmxlTmF2SXRlbSgpLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuaGFuZGxlUmVzaXplRXZlbnQpO1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdvcmllbnRhdGlvbmNoYW5nZScsIHRoaXMuaGFuZGxlUmVzaXplRXZlbnQpOyAvLyBmb3IgbW9iaWxlIHN1cHBvcnRcbiAgfVxuXG4gIGdldE1haW5QYXJ0T2ZJZCA9ICgpID0+ICh0aGlzLnByb3BzLmlkIHx8ICdyZXNwb25zaXZlLW5hdmJhcicpO1xuXG4gIGluZGV4T2ZMYXN0VmlzaWJsZU5hdkl0ZW0gPSAoKSA9PiB7XG4gICAgY29uc3QgY29udGFpbmVyID0gdGhpcy5yZWZzLm5hdmJhckNvbnRhaW5lcjtcbiAgICBjb25zdCBjb250YWluZXJXaWR0aCA9IFJlYWN0RE9NLmZpbmRET01Ob2RlKGNvbnRhaW5lcikgP1xuICAgICAgUmVhY3RET00uZmluZERPTU5vZGUoY29udGFpbmVyKS5vZmZzZXRXaWR0aCA6IDA7XG5cbiAgICBsZXQgcmVtYWluaW5nV2lkdGggPSBjb250YWluZXJXaWR0aCAtIDE5NTtcblxuICAgIGxldCBsYXN0VmlzaWJsZSA9IDE7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnByb3BzLmxpc3QubGVuZ3RoIC0gMTsgaSArPSAxKSB7XG4gICAgICBjb25zdCBpdGVtID0gdGhpcy5yZWZzW2BuYXZpdGVtcmVmJHtTdHJpbmcoaSl9YF07XG4gICAgICBjb25zdCBub2RlID0gUmVhY3RET00uZmluZERPTU5vZGUoaXRlbSk7XG4gICAgICBpZiAoIW5vZGUpIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjb25zdCBpdGVtV2lkdGggPSBub2RlLm9mZnNldFdpZHRoO1xuICAgICAgcmVtYWluaW5nV2lkdGggLT0gaXRlbVdpZHRoO1xuICAgICAgaWYgKHJlbWFpbmluZ1dpZHRoIDwgMCkge1xuICAgICAgICBsYXN0VmlzaWJsZSAtPSAxO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGxhc3RWaXNpYmxlICs9IDE7XG4gICAgfVxuXG4gICAgcmV0dXJuIGxhc3RWaXNpYmxlO1xuICB9XG5cbiAgaGFuZGxlUmVzaXplRXZlbnQgPSAoKSA9PiB7XG4gICAgY29uc3QgZGlmZmVyZW5jZSA9IHdpbmRvdy5pbm5lcldpZHRoIC0gdGhpcy5zdGF0ZS5sYXN0V2lkdGg7XG4gICAgY29uc3QgVVBEQVRFX1RIUkVTSE9MRCA9IDUwO1xuICAgIGlmIChNYXRoLmFicyhkaWZmZXJlbmNlKSA+IFVQREFURV9USFJFU0hPTEQpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICB1cGRhdGVEaW1lbnNzaW9uczogdHJ1ZSxcbiAgICAgICAgbGFzdFdpZHRoOiB3aW5kb3cuaW5uZXJXaWR0aCxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuICBzZWxlY3Rpb25DaGFuZ2VkID0gKGl0ZW0pID0+IHtcbiAgICB0aGlzLnByb3BzLnJvdXRlci5wdXNoKGl0ZW0udmFsdWUpO1xuICB9XG5cbiAgdG9vbHRpcFdyYXBwZXIgPSAobm9kZSwgaW5kZXgsIHRvb2x0aXBDb250ZW50KSA9PiB7XG4gICAgY29uc3QgdG9vbHRpcCA9IDxUb29sdGlwIGlkPVwidG9vbHRpcFwiPnt0b29sdGlwQ29udGVudH08L1Rvb2x0aXA+O1xuICAgIHJldHVybiAhdGhpcy5wcm9wcy5zaG93TmF2SXRlbVRvb2x0aXAgPyBub2RlIDpcbiAgICA8T3ZlcmxheVRyaWdnZXIgcGxhY2VtZW50PVwiYm90dG9tXCIga2V5PXtpbmRleH0gb3ZlcmxheT17dG9vbHRpcH0gZGVsYXlTaG93PXt0aGlzLnByb3BzLnRvb2x0aXBEZWxheX0+XG4gICAgICB7bm9kZX1cbiAgICA8L092ZXJsYXlUcmlnZ2VyPjtcbiAgfVxuXG4gIG5hdmJhckl0ZW0gPSAoaXRlbSwgaW5kZXgsIGNsYXNzTmFtZSkgPT4gKFxuICAgIDxidXR0b25cbiAgICAgIGNsYXNzTmFtZT17aW5kZXggPT09IHRoaXMucHJvcHMuYWN0aXZlS2V5ICYmXG4gICAgICAgIGluZGV4IDw9IHRoaXMuc3RhdGUubGFzdFZpc2libGVJdGVtSW5kZXggP1xuICAgICAgICBgJHtjbGFzc05hbWV9IHNlbGVjdGVkLWJvcmRlcmAgOiBgJHtjbGFzc05hbWV9YH1cbiAgICAgIHN0eWxlPXt7IGZvbnRXZWlnaHQ6IHRoaXMucHJvcHMuZm9udFdlaWdodCwgZm9udFNpemU6IHRoaXMucHJvcHMuZm9udFNpemUgfX1cbiAgICAgIGlkPXtpdGVtLmlkIHx8IGBuYXZpdGVtcmVmJHtTdHJpbmcoaW5kZXgpfWB9XG4gICAgICBrZXk9e2l0ZW0uaWQgfHwgYG5hdml0ZW1yZWYke1N0cmluZyhpbmRleCl9YH1cbiAgICAgIHJlZj17YG5hdml0ZW1yZWYke1N0cmluZyhpbmRleCl9YH1cbiAgICAgIG9uQ2xpY2s9eygpID0+IHsgdGhpcy5wcm9wcy5vblNlbGVjdChpdGVtLmhyZWYpOyB9fVxuICAgID5cbiAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInJlc3BvbnNpdmUtbmF2YmFyLWl0ZW0tdGV4dFwiPntpdGVtLm5hbWV9PC9zcGFuPlxuICAgIDwvYnV0dG9uPlxuICApXG5cbiAgZG9MaW5lQ291bnQgPSAoKSA9PiB7XG4gICAgY29uc3QgeyBsaXN0IH0gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiBsaXN0LnNvbWUoaXRlbSA9PiB0eXBlb2YgKGl0ZW0ubmFtZSkgIT09ICdzdHJpbmcnKTtcbiAgfVxuXG4gIG5hdmJhciA9ICgpID0+IHtcbiAgICBjb25zdCBsaXN0ID0gdGhpcy5zdGF0ZS5sYXN0VmlzaWJsZUl0ZW1JbmRleCA+PSAwID9cbiAgICAgIHRoaXMucHJvcHMubGlzdC5zbGljZSgwLCB0aGlzLnN0YXRlLmxhc3RWaXNpYmxlSXRlbUluZGV4KVxuICAgICAgOiB0aGlzLnByb3BzLmxpc3Q7XG4gICAgY29uc3QgY2xhc3NOYW1lID0gdGhpcy5wcm9wcy5zaG93TmF2SXRlbUJvcmRlciA/XG4gICAgICAncmVzcG9uc2l2ZS1uYXZiYXItaXRlbSBpbmFjdGl2ZS1ib3JkZXInIDogJ3Jlc3BvbnNpdmUtbmF2YmFyLWl0ZW0gbm8taXRlbS1ib3JkZXInO1xuICAgIGNvbnN0IGl0ZW1zID0gbGlzdC5tYXAoKGl0ZW0sIGluZGV4KSA9PiAoXG4gICAgICB0aGlzLnRvb2x0aXBXcmFwcGVyKHRoaXMubmF2YmFySXRlbShpdGVtLCBpbmRleCwgY2xhc3NOYW1lKSwgaW5kZXgsIGl0ZW0ubmFtZSlcbiAgICApKTtcbiAgICBjb25zdCBsaW5lQ291bnQgPSB0aGlzLmRvTGluZUNvdW50KCk7XG4gICAgY29uc3QgbmF2YmFyU3R5bGUgPSB7XG4gICAgICBtaW5IZWlnaHQ6IHRoaXMucHJvcHMuaGVpZ2h0LFxuICAgIH07XG4gICAgaWYgKHRoaXMucHJvcHMuaGVpZ2h0LnNsaWNlKC0yKSA9PT0gJ3B4JyAmJiBsaW5lQ291bnQpIHtcbiAgICAgIGNvbnN0IGhlaWdodFB4ID0gcGFyc2VJbnQodGhpcy5wcm9wcy5oZWlnaHQuc2xpY2UoMCwgLTIpLCAxMCk7XG4gICAgICBuYXZiYXJTdHlsZS5saW5lSGVpZ2h0ID0gYCR7KGhlaWdodFB4IC0gNCl9cHhgO1xuICAgIH1cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdlxuICAgICAgICBpZD17YCR7dGhpcy5nZXRNYWluUGFydE9mSWQoKX0tY29udGFpbmVyYH1cbiAgICAgICAgcmVmPVwibmF2YmFyQ29udGFpbmVyXCJcbiAgICAgICAgY2xhc3NOYW1lPVwicmVzcG9uc2l2ZS1uYXZiYXItY29udGFpbmVyXCJcbiAgICAgICAgc3R5bGU9e25hdmJhclN0eWxlfVxuICAgICAgPlxuICAgICAgICB7aXRlbXN9XG4gICAgICAgIHt0aGlzLmNvbWJvYm94KCl9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG5cbiAgY29tYm9ib3ggPSAoKSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgbGlzdCxcbiAgICAgIG9uU2VsZWN0LFxuICAgICAgZm9udFNpemUsXG4gICAgICBhY3RpdmVLZXksXG4gICAgICBmb250V2VpZ2h0LFxuICAgICAgcGxhY2Vob2xkZXIsXG4gICAgICBzaG93TmF2SXRlbUJvcmRlcixcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAodGhpcy5zdGF0ZS5sYXN0VmlzaWJsZUl0ZW1JbmRleCA9PT0gLTEgfHxcbiAgICAgICAgdGhpcy5zdGF0ZS5sYXN0VmlzaWJsZUl0ZW1JbmRleCA+IGxpc3QubGVuZ3RoIC0gMSkge1xuICAgICAgLy8gcmV0dXJuIG51bGwgaWYgYWxsIG5hdiBpdGVtcyBhcmUgdmlzaWJsZVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgLy8gc2xpY2UgbmF2IGl0ZW1zIGxpc3QgYW5kIHNob3cgaW52aXNpYmxlIGl0ZW1zIGluIHRoZSBjb21ib2JveFxuICAgIGNvbnN0IG5hdkxpc3QgPSB0aGlzLnN0YXRlLmxhc3RWaXNpYmxlSXRlbUluZGV4ID49IDAgP1xuICAgICAgbGlzdC5zbGljZSh0aGlzLnN0YXRlLmxhc3RWaXNpYmxlSXRlbUluZGV4KSA6IGxpc3Q7XG4gICAgY29uc3QgaXRlbXMgPSBuYXZMaXN0Lm1hcCgoaXRlbSwgaW5kZXgpID0+XG4gICAgICAoe1xuICAgICAgICB2YWx1ZTogaXRlbS5ocmVmLFxuICAgICAgICBsYWJlbDogaXRlbS5uYW1lLFxuICAgICAgICBpZDogaW5kZXgsXG4gICAgICAgIHJlZjogYG5hdml0ZW1yZWYke1N0cmluZyhpbmRleCl9YCxcbiAgICAgIH0pKTtcbiAgICBjb25zdCBsaW5lQ291bnROZWVkZWQgPSB0aGlzLmRvTGluZUNvdW50KCk7XG4gICAgY29uc3QgY3VzdG9tTGluZUNvdW50ID0gbGluZUNvdW50TmVlZGVkID8gJ2xpbmUtY291bnQnIDogJyc7XG4gICAgY29uc3QgY3VzdG9tQm9yZGVyQ2xhc3MgPSBsaW5lQ291bnROZWVkZWQgPyAnc2VsZWN0ZWQtYm9yZGVyIGxpbmUtY291bnQnIDogJ3NlbGVjdGVkLWJvcmRlcic7XG4gICAgY29uc3QgY3VzdG9tSW5hY3RpdmVCb3JkZXIgPSBsaW5lQ291bnROZWVkZWQgPyAnaW5hY3RpdmUtYm9yZGVyIGxpbmUtY291bnQnIDogJ2luYWN0aXZlLWJvcmRlcic7XG4gICAgY29uc3QgaW5hY3RpdmVCb3JkZXIgPSBzaG93TmF2SXRlbUJvcmRlciA/IGN1c3RvbUluYWN0aXZlQm9yZGVyIDogY3VzdG9tTGluZUNvdW50O1xuICAgIGNvbnN0IGJvcmRlckNsYXNzID0gYWN0aXZlS2V5ID49IHRoaXMuc3RhdGUubGFzdFZpc2libGVJdGVtSW5kZXggPyBjdXN0b21Cb3JkZXJDbGFzcyA6IGluYWN0aXZlQm9yZGVyOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgY29uc3QgYWN0aXZlSXRlbSA9IGxpc3RbYWN0aXZlS2V5XTtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdlxuICAgICAgICBpZD17YCR7dGhpcy5nZXRNYWluUGFydE9mSWQoKX0tc2VsZWN0YH1cbiAgICAgICAgY2xhc3NOYW1lPXtgcmVzcG9uc2l2ZS1uYXZiYXItc2VsZWN0ICR7Ym9yZGVyQ2xhc3N9YH1cbiAgICAgICAgc3R5bGU9e3sgZm9udFdlaWdodCwgZm9udFNpemUgfX1cbiAgICAgID5cbiAgICAgICAgPFNlbGVjdFxuICAgICAgICAgIG5hbWU9XCJyZXNwb25zaXZlTmF2YmFyU2VsZWN0XCJcbiAgICAgICAgICBtdWx0aT17ZmFsc2V9XG4gICAgICAgICAgdmFsdWU9e2FjdGl2ZUl0ZW0gPyBhY3RpdmVJdGVtLmhyZWYgOiAnJ31cbiAgICAgICAgICBjbGVhcmFibGU9e2ZhbHNlfVxuICAgICAgICAgIHBsYWNlaG9sZGVyPXtwbGFjZWhvbGRlcn1cbiAgICAgICAgICBvcHRpb25zPXtpdGVtc31cbiAgICAgICAgICBvbkNoYW5nZT17KGl0ZW0pID0+IHsgb25TZWxlY3QoaXRlbS52YWx1ZSk7IH19XG4gICAgICAgICAgaW5wdXRQcm9wcz17eyBpZDogJ29jUmVzcG9uc2l2ZU5hdmJhclNlbGVjdCcgfX1cbiAgICAgICAgLz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMubmF2YmFyKCk7XG4gIH1cbn1cbiJdfQ==