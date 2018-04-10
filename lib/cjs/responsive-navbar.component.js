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
      updateDimenssions: true,
      lastVisibleItemIndex: -1,
      lastWidth: 0
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
    }, _this.navbar = function () {
      var list = _this.state.lastVisibleItemIndex >= 0 ? _this.props.list.slice(0, _this.state.lastVisibleItemIndex) : _this.props.list;
      var className = _this.props.showNavItemBorder ? 'responsive-navbar-item inactive-border' : 'responsive-navbar-item';
      var items = list.map(function (item, index) {
        return _this.tooltipWrapper(_this.navbarItem(item, index, className), index, item.name);
      });
      var navbarStyle = {
        minHeight: _this.props.height
      };
      if (_this.props.height.slice(-2) === 'px') {
        var heightPx = parseInt(_this.props.height.slice(0, -2), 10);
        navbarStyle.lineHeight = heightPx - 4 + 'px';
      }
      return _react2.default.createElement(
        'div',
        {
          id: 'responsive-navbar-container',
          ref: 'navbarContainer',
          style: navbarStyle
        },
        items,
        _this.combobox()
      );
    }, _this.combobox = function () {
      if (_this.state.lastVisibleItemIndex === -1 || _this.state.lastVisibleItemIndex > _this.props.list.length - 1) {
        // return null if all nav items are visible
        return null;
      }

      // slice nav items list and show invisible items in the combobox
      var list = _this.state.lastVisibleItemIndex >= 0 ? _this.props.list.slice(_this.state.lastVisibleItemIndex) : _this.props.list;
      var items = list.map(function (item, index) {
        return {
          value: item.href,
          label: item.name,
          id: index,
          ref: 'navitemref' + String(index)
        };
      });

      var inactiveBorder = _this.props.showNavItemBorder ? 'inactive-border' : '';
      var borderClass = _this.props.activeKey >= _this.state.lastVisibleItemIndex ? 'selected-border' : inactiveBorder;
      var activeItem = _this.props.list[_this.props.activeKey];
      return _react2.default.createElement(
        'div',
        {
          id: 'responsive-navbar-select',
          className: borderClass,
          style: { fontWeight: _this.props.fontWeight, fontSize: _this.props.fontSize }
        },
        _react2.default.createElement(_reactSelect2.default, {
          name: 'responsiveNavbarSelect',
          multi: false,
          value: activeItem ? activeItem.href : '',
          clearable: false,
          placeholder: _this.props.placeholder,
          options: items,
          onChange: function onChange(item) {
            _this.props.onSelect(item.value);
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
    }, 200);
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
  onSelect: null,
  showNavItemBorder: false,
  showNavItemTooltip: true,
  tooltipDelay: 2000,
  fontSize: 'inherit',
  fontWeight: 'inherit',
  placeholder: 'more...',
  height: '40px'
}, _temp2);
exports.default = ResponsiveNavbar;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yZXNwb25zaXZlLW5hdmJhci5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIlJlc3BvbnNpdmVOYXZiYXIiLCJzdGF0ZSIsInVwZGF0ZURpbWVuc3Npb25zIiwibGFzdFZpc2libGVJdGVtSW5kZXgiLCJsYXN0V2lkdGgiLCJpbmRleE9mTGFzdFZpc2libGVOYXZJdGVtIiwiY29udGFpbmVyIiwicmVmcyIsIm5hdmJhckNvbnRhaW5lciIsImNvbnRhaW5lcldpZHRoIiwiZmluZERPTU5vZGUiLCJvZmZzZXRXaWR0aCIsInJlbWFpbmluZ1dpZHRoIiwibGFzdFZpc2libGUiLCJpIiwicHJvcHMiLCJsaXN0IiwibGVuZ3RoIiwiaXRlbSIsIlN0cmluZyIsIm5vZGUiLCJpdGVtV2lkdGgiLCJoYW5kbGVSZXNpemVFdmVudCIsImRpZmZlcmVuY2UiLCJ3aW5kb3ciLCJpbm5lcldpZHRoIiwiVVBEQVRFX1RIUkVTSE9MRCIsIk1hdGgiLCJhYnMiLCJzZXRTdGF0ZSIsInNlbGVjdGlvbkNoYW5nZWQiLCJyb3V0ZXIiLCJwdXNoIiwidmFsdWUiLCJ0b29sdGlwV3JhcHBlciIsImluZGV4IiwidG9vbHRpcENvbnRlbnQiLCJ0b29sdGlwIiwic2hvd05hdkl0ZW1Ub29sdGlwIiwidG9vbHRpcERlbGF5IiwibmF2YmFySXRlbSIsImNsYXNzTmFtZSIsImFjdGl2ZUtleSIsImZvbnRXZWlnaHQiLCJmb250U2l6ZSIsImlkIiwib25TZWxlY3QiLCJocmVmIiwibmFtZSIsIm5hdmJhciIsInNsaWNlIiwic2hvd05hdkl0ZW1Cb3JkZXIiLCJpdGVtcyIsIm1hcCIsIm5hdmJhclN0eWxlIiwibWluSGVpZ2h0IiwiaGVpZ2h0IiwiaGVpZ2h0UHgiLCJwYXJzZUludCIsImxpbmVIZWlnaHQiLCJjb21ib2JveCIsImxhYmVsIiwicmVmIiwiaW5hY3RpdmVCb3JkZXIiLCJib3JkZXJDbGFzcyIsImFjdGl2ZUl0ZW0iLCJwbGFjZWhvbGRlciIsImNvbXBvbmVudERpZE1vdW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsInNldFRpbWVvdXQiLCJjb21wb25lbnREaWRVcGRhdGUiLCJjb21wb25lbnRXaWxsVW5tb3VudCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJyZW5kZXIiLCJQdXJlQ29tcG9uZW50IiwiZGVmYXVsdFByb3BzIl0sIm1hcHBpbmdzIjoiOzs7OztvQkFBQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7OztJQUVxQkEsZ0I7Ozs7Ozs7Ozs7OztnS0ErQm5CQyxLLEdBQVE7QUFDTkMseUJBQW1CLElBRGI7QUFFTkMsNEJBQXNCLENBQUMsQ0FGakI7QUFHTkMsaUJBQVc7QUFITCxLLFFBOEJSQyx5QixHQUE0QixZQUFNO0FBQ2hDLFVBQU1DLFlBQVksTUFBS0MsSUFBTCxDQUFVQyxlQUE1QjtBQUNBLFVBQU1DLGlCQUFpQixtQkFBU0MsV0FBVCxDQUFxQkosU0FBckIsSUFDckIsbUJBQVNJLFdBQVQsQ0FBcUJKLFNBQXJCLEVBQWdDSyxXQURYLEdBQ3lCLENBRGhEOztBQUdBLFVBQUlDLGlCQUFpQkgsaUJBQWlCLEdBQXRDOztBQUVBLFVBQUlJLGNBQWMsQ0FBbEI7QUFDQSxXQUFLLElBQUlDLElBQUksQ0FBYixFQUFnQkEsSUFBSSxNQUFLQyxLQUFMLENBQVdDLElBQVgsQ0FBZ0JDLE1BQWhCLEdBQXlCLENBQTdDLEVBQWdESCxLQUFLLENBQXJELEVBQXdEO0FBQ3RELFlBQU1JLE9BQU8sTUFBS1gsSUFBTCxnQkFBdUJZLE9BQU9MLENBQVAsQ0FBdkIsQ0FBYjtBQUNBLFlBQU1NLE9BQU8sbUJBQVNWLFdBQVQsQ0FBcUJRLElBQXJCLENBQWI7QUFDQSxZQUFJLENBQUNFLElBQUwsRUFBVztBQUNUO0FBQ0Q7QUFDRCxZQUFNQyxZQUFZRCxLQUFLVCxXQUF2QjtBQUNBQywwQkFBa0JTLFNBQWxCO0FBQ0EsWUFBSVQsaUJBQWlCLENBQXJCLEVBQXdCO0FBQ3RCQyx5QkFBZSxD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LFFBQUwsQ0FBYyxFQUFFO0FBQ2Q7QUFDQTNCLDJCQUFtQixLQUZQO0FBR1pDLDhCQUFzQixLQUFLRSx5QkFBTDtBQUhWLE9BQWQ7QUFLRDtBQUNGLEc7OzZCQUVEa0Usb0IsbUNBQXVCO0FBQ3JCL0MsV0FBT2dELG1CQUFQLENBQTJCLFFBQTNCLEVBQXFDLEtBQUtsRCxpQkFBMUM7QUFDQUUsV0FBT2dELG1CQUFQLENBQTJCLG1CQUEzQixFQUFnRCxLQUFLbEQsaUJBQXJELEVBRnFCLENBRW9EO0FBQzFFLEc7OzZCQXdJRG1ELE0scUJBQVM7QUFDUCxXQUFPLEtBQUt4QixNQUFMLEVBQVA7QUFDRCxHOzs7RUFyTTJDLGdCQUFNeUIsYSxVQUMzQ0MsWSxHQUFlO0FBQ3BCN0IsWUFBVSxJQURVO0FBRXBCSyxxQkFBbUIsS0FGQztBQUdwQmIsc0JBQW9CLElBSEE7QUFJcEJDLGdCQUFjLElBSk07QUFLcEJLLFlBQVUsU0FMVTtBQU1wQkQsY0FBWSxTQU5RO0FBT3BCdUIsZUFBYSxTQVBPO0FBUXBCVixVQUFRO0FBUlksQztrQkFESHhELGdCIiwiZmlsZSI6InJlc3BvbnNpdmUtbmF2YmFyLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIHJlYWN0L25vLWFycmF5LWluZGV4LWtleSAqL1xuLyogZXNsaW50LWRpc2FibGUgcmVhY3Qvbm8tc3RyaW5nLXJlZnMgKi9cbi8qIGVzbGludC1kaXNhYmxlIHJlYWN0L25vLWZpbmQtZG9tLW5vZGUgKi9cbi8qIGVzbGludC1kaXNhYmxlIHJlYWN0L3Byb3AtdHlwZXMgKi9cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XG5pbXBvcnQgU2VsZWN0IGZyb20gJ3JlYWN0LXNlbGVjdCc7XG5pbXBvcnQgeyBPdmVybGF5VHJpZ2dlciwgVG9vbHRpcCB9IGZyb20gJ3JlYWN0LWJvb3RzdHJhcCc7XG5pbXBvcnQgJ3JlYWN0LXNlbGVjdC9kaXN0L3JlYWN0LXNlbGVjdC5jc3MnO1xuaW1wb3J0ICcuL3Jlc3BvbnNpdmUtbmF2YmFyLnNjc3MnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZXNwb25zaXZlTmF2YmFyIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgb25TZWxlY3Q6IG51bGwsXG4gICAgc2hvd05hdkl0ZW1Cb3JkZXI6IGZhbHNlLFxuICAgIHNob3dOYXZJdGVtVG9vbHRpcDogdHJ1ZSxcbiAgICB0b29sdGlwRGVsYXk6IDIwMDAsXG4gICAgZm9udFNpemU6ICdpbmhlcml0JyxcbiAgICBmb250V2VpZ2h0OiAnaW5oZXJpdCcsXG4gICAgcGxhY2Vob2xkZXI6ICdtb3JlLi4uJyxcbiAgICBoZWlnaHQ6ICc0MHB4JyxcbiAgfVxuXG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgc2hvd05hdkl0ZW1Cb3JkZXI6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dOYXZJdGVtVG9vbHRpcDogUHJvcFR5cGVzLmJvb2wsXG4gICAgdG9vbHRpcERlbGF5OiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIGZvbnRTaXplOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGZvbnRXZWlnaHQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgcGxhY2Vob2xkZXI6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgYWN0aXZlS2V5OiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgbGlzdDogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgIG5hbWU6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgICBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICBQcm9wVHlwZXMubm9kZSxcbiAgICAgIF0pLmlzUmVxdWlyZWQsXG4gICAgICBocmVmOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMubnVtYmVyXSksXG4gICAgfSkpLmlzUmVxdWlyZWQsXG4gICAgb25TZWxlY3Q6IFByb3BUeXBlcy5mdW5jLFxuICAgIGhlaWdodDogUHJvcFR5cGVzLnN0cmluZyxcbiAgfVxuXG4gIHN0YXRlID0ge1xuICAgIHVwZGF0ZURpbWVuc3Npb25zOiB0cnVlLFxuICAgIGxhc3RWaXNpYmxlSXRlbUluZGV4OiAtMSxcbiAgICBsYXN0V2lkdGg6IDAsXG4gIH07XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuaGFuZGxlUmVzaXplRXZlbnQpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdvcmllbnRhdGlvbmNoYW5nZScsIHRoaXMuaGFuZGxlUmVzaXplRXZlbnQpOyAvLyBmb3IgbW9iaWxlIHN1cHBvcnRcbiAgICAvLyBDb21wb25lbnQgaXMgbm90IHJlbmRlcmVkIHlldCBieSBicm93c2VyIHdoZW4gRGlkTW91bnQgaXMgY2FsbGVkXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLmhhbmRsZVJlc2l6ZUV2ZW50KCk7XG4gICAgfSwgMjAwKTtcbiAgfVxuXG4gIGNvbXBvbmVudERpZFVwZGF0ZSgpIHtcbiAgICBpZiAodGhpcy5zdGF0ZS51cGRhdGVEaW1lbnNzaW9ucykge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgcmVhY3Qvbm8tZGlkLXVwZGF0ZS1zZXQtc3RhdGVcbiAgICAgICAgLy8gMm5kIHJlbmRlciBpcyB0cmlnZ2VyZWQgaGVyZSBpbiBwdXJwb3NlXG4gICAgICAgIHVwZGF0ZURpbWVuc3Npb25zOiBmYWxzZSxcbiAgICAgICAgbGFzdFZpc2libGVJdGVtSW5kZXg6IHRoaXMuaW5kZXhPZkxhc3RWaXNpYmxlTmF2SXRlbSgpLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuaGFuZGxlUmVzaXplRXZlbnQpO1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdvcmllbnRhdGlvbmNoYW5nZScsIHRoaXMuaGFuZGxlUmVzaXplRXZlbnQpOyAvLyBmb3IgbW9iaWxlIHN1cHBvcnRcbiAgfVxuXG4gIGluZGV4T2ZMYXN0VmlzaWJsZU5hdkl0ZW0gPSAoKSA9PiB7XG4gICAgY29uc3QgY29udGFpbmVyID0gdGhpcy5yZWZzLm5hdmJhckNvbnRhaW5lcjtcbiAgICBjb25zdCBjb250YWluZXJXaWR0aCA9IFJlYWN0RE9NLmZpbmRET01Ob2RlKGNvbnRhaW5lcikgP1xuICAgICAgUmVhY3RET00uZmluZERPTU5vZGUoY29udGFpbmVyKS5vZmZzZXRXaWR0aCA6IDA7XG5cbiAgICBsZXQgcmVtYWluaW5nV2lkdGggPSBjb250YWluZXJXaWR0aCAtIDE5NTtcblxuICAgIGxldCBsYXN0VmlzaWJsZSA9IDE7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnByb3BzLmxpc3QubGVuZ3RoIC0gMTsgaSArPSAxKSB7XG4gICAgICBjb25zdCBpdGVtID0gdGhpcy5yZWZzW2BuYXZpdGVtcmVmJHtTdHJpbmcoaSl9YF07XG4gICAgICBjb25zdCBub2RlID0gUmVhY3RET00uZmluZERPTU5vZGUoaXRlbSk7XG4gICAgICBpZiAoIW5vZGUpIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjb25zdCBpdGVtV2lkdGggPSBub2RlLm9mZnNldFdpZHRoO1xuICAgICAgcmVtYWluaW5nV2lkdGggLT0gaXRlbVdpZHRoO1xuICAgICAgaWYgKHJlbWFpbmluZ1dpZHRoIDwgMCkge1xuICAgICAgICBsYXN0VmlzaWJsZSAtPSAxO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGxhc3RWaXNpYmxlICs9IDE7XG4gICAgfVxuXG4gICAgcmV0dXJuIGxhc3RWaXNpYmxlO1xuICB9XG5cbiAgaGFuZGxlUmVzaXplRXZlbnQgPSAoKSA9PiB7XG4gICAgY29uc3QgZGlmZmVyZW5jZSA9IHdpbmRvdy5pbm5lcldpZHRoIC0gdGhpcy5zdGF0ZS5sYXN0V2lkdGg7XG4gICAgY29uc3QgVVBEQVRFX1RIUkVTSE9MRCA9IDUwO1xuICAgIGlmIChNYXRoLmFicyhkaWZmZXJlbmNlKSA+IFVQREFURV9USFJFU0hPTEQpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICB1cGRhdGVEaW1lbnNzaW9uczogdHJ1ZSxcbiAgICAgICAgbGFzdFdpZHRoOiB3aW5kb3cuaW5uZXJXaWR0aCxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuICBzZWxlY3Rpb25DaGFuZ2VkID0gKGl0ZW0pID0+IHtcbiAgICB0aGlzLnByb3BzLnJvdXRlci5wdXNoKGl0ZW0udmFsdWUpO1xuICB9XG5cbiAgdG9vbHRpcFdyYXBwZXIgPSAobm9kZSwgaW5kZXgsIHRvb2x0aXBDb250ZW50KSA9PiB7XG4gICAgY29uc3QgdG9vbHRpcCA9IDxUb29sdGlwIGlkPVwidG9vbHRpcFwiPnt0b29sdGlwQ29udGVudH08L1Rvb2x0aXA+O1xuICAgIHJldHVybiAhdGhpcy5wcm9wcy5zaG93TmF2SXRlbVRvb2x0aXAgPyBub2RlIDpcbiAgICA8T3ZlcmxheVRyaWdnZXIgcGxhY2VtZW50PVwiYm90dG9tXCIga2V5PXtpbmRleH0gb3ZlcmxheT17dG9vbHRpcH0gZGVsYXlTaG93PXt0aGlzLnByb3BzLnRvb2x0aXBEZWxheX0+XG4gICAgICB7bm9kZX1cbiAgICA8L092ZXJsYXlUcmlnZ2VyPjtcbiAgfVxuXG4gIG5hdmJhckl0ZW0gPSAoaXRlbSwgaW5kZXgsIGNsYXNzTmFtZSkgPT4gKFxuICAgIDxidXR0b25cbiAgICAgIGNsYXNzTmFtZT17aW5kZXggPT09IHRoaXMucHJvcHMuYWN0aXZlS2V5ICYmXG4gICAgICAgIGluZGV4IDw9IHRoaXMuc3RhdGUubGFzdFZpc2libGVJdGVtSW5kZXggP1xuICAgICAgICBgJHtjbGFzc05hbWV9IHNlbGVjdGVkLWJvcmRlcmAgOiBgJHtjbGFzc05hbWV9YH1cbiAgICAgIHN0eWxlPXt7IGZvbnRXZWlnaHQ6IHRoaXMucHJvcHMuZm9udFdlaWdodCwgZm9udFNpemU6IHRoaXMucHJvcHMuZm9udFNpemUgfX1cbiAgICAgIGlkPXtpdGVtLmlkIHx8IGBuYXZpdGVtcmVmJHtTdHJpbmcoaW5kZXgpfWB9XG4gICAgICBrZXk9e2l0ZW0uaWQgfHwgYG5hdml0ZW1yZWYke1N0cmluZyhpbmRleCl9YH1cbiAgICAgIHJlZj17YG5hdml0ZW1yZWYke1N0cmluZyhpbmRleCl9YH1cbiAgICAgIG9uQ2xpY2s9eygpID0+IHsgdGhpcy5wcm9wcy5vblNlbGVjdChpdGVtLmhyZWYpOyB9fVxuICAgID5cbiAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInJlc3BvbnNpdmUtbmF2YmFyLWl0ZW0tdGV4dFwiPntpdGVtLm5hbWV9PC9zcGFuPlxuICAgIDwvYnV0dG9uPlxuICApXG5cbiAgbmF2YmFyID0gKCkgPT4ge1xuICAgIGNvbnN0IGxpc3QgPSB0aGlzLnN0YXRlLmxhc3RWaXNpYmxlSXRlbUluZGV4ID49IDAgP1xuICAgICAgdGhpcy5wcm9wcy5saXN0LnNsaWNlKDAsIHRoaXMuc3RhdGUubGFzdFZpc2libGVJdGVtSW5kZXgpXG4gICAgICA6IHRoaXMucHJvcHMubGlzdDtcbiAgICBjb25zdCBjbGFzc05hbWUgPSB0aGlzLnByb3BzLnNob3dOYXZJdGVtQm9yZGVyID9cbiAgICAgICdyZXNwb25zaXZlLW5hdmJhci1pdGVtIGluYWN0aXZlLWJvcmRlcicgOiAncmVzcG9uc2l2ZS1uYXZiYXItaXRlbSc7XG4gICAgY29uc3QgaXRlbXMgPSBsaXN0Lm1hcCgoaXRlbSwgaW5kZXgpID0+IChcbiAgICAgIHRoaXMudG9vbHRpcFdyYXBwZXIodGhpcy5uYXZiYXJJdGVtKGl0ZW0sIGluZGV4LCBjbGFzc05hbWUpLCBpbmRleCwgaXRlbS5uYW1lKVxuICAgICkpO1xuICAgIGNvbnN0IG5hdmJhclN0eWxlID0ge1xuICAgICAgbWluSGVpZ2h0OiB0aGlzLnByb3BzLmhlaWdodCxcbiAgICB9O1xuICAgIGlmICh0aGlzLnByb3BzLmhlaWdodC5zbGljZSgtMikgPT09ICdweCcpIHtcbiAgICAgIGNvbnN0IGhlaWdodFB4ID0gcGFyc2VJbnQodGhpcy5wcm9wcy5oZWlnaHQuc2xpY2UoMCwgLTIpLCAxMCk7XG4gICAgICBuYXZiYXJTdHlsZS5saW5lSGVpZ2h0ID0gYCR7KGhlaWdodFB4IC0gNCl9cHhgO1xuICAgIH1cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdlxuICAgICAgICBpZD1cInJlc3BvbnNpdmUtbmF2YmFyLWNvbnRhaW5lclwiXG4gICAgICAgIHJlZj1cIm5hdmJhckNvbnRhaW5lclwiXG4gICAgICAgIHN0eWxlPXtuYXZiYXJTdHlsZX1cbiAgICAgID5cbiAgICAgICAge2l0ZW1zfVxuICAgICAgICB7dGhpcy5jb21ib2JveCgpfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxuXG4gIGNvbWJvYm94ID0gKCkgPT4ge1xuICAgIGlmICh0aGlzLnN0YXRlLmxhc3RWaXNpYmxlSXRlbUluZGV4ID09PSAtMSB8fFxuICAgICAgICB0aGlzLnN0YXRlLmxhc3RWaXNpYmxlSXRlbUluZGV4ID4gdGhpcy5wcm9wcy5saXN0Lmxlbmd0aCAtIDEpIHtcbiAgICAgIC8vIHJldHVybiBudWxsIGlmIGFsbCBuYXYgaXRlbXMgYXJlIHZpc2libGVcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIC8vIHNsaWNlIG5hdiBpdGVtcyBsaXN0IGFuZCBzaG93IGludmlzaWJsZSBpdGVtcyBpbiB0aGUgY29tYm9ib3hcbiAgICBjb25zdCBsaXN0ID0gdGhpcy5zdGF0ZS5sYXN0VmlzaWJsZUl0ZW1JbmRleCA+PSAwID9cbiAgICAgIHRoaXMucHJvcHMubGlzdC5zbGljZSh0aGlzLnN0YXRlLmxhc3RWaXNpYmxlSXRlbUluZGV4KVxuICAgICAgOiB0aGlzLnByb3BzLmxpc3Q7XG4gICAgY29uc3QgaXRlbXMgPSBsaXN0Lm1hcCgoaXRlbSwgaW5kZXgpID0+XG4gICAgICAoe1xuICAgICAgICB2YWx1ZTogaXRlbS5ocmVmLFxuICAgICAgICBsYWJlbDogaXRlbS5uYW1lLFxuICAgICAgICBpZDogaW5kZXgsXG4gICAgICAgIHJlZjogYG5hdml0ZW1yZWYke1N0cmluZyhpbmRleCl9YCxcbiAgICAgIH0pKTtcblxuICAgIGNvbnN0IGluYWN0aXZlQm9yZGVyID0gdGhpcy5wcm9wcy5zaG93TmF2SXRlbUJvcmRlciA/ICdpbmFjdGl2ZS1ib3JkZXInIDogJyc7XG4gICAgY29uc3QgYm9yZGVyQ2xhc3MgPSB0aGlzLnByb3BzLmFjdGl2ZUtleSA+PSB0aGlzLnN0YXRlLmxhc3RWaXNpYmxlSXRlbUluZGV4ID9cbiAgICAgICdzZWxlY3RlZC1ib3JkZXInIDogaW5hY3RpdmVCb3JkZXI7XG4gICAgY29uc3QgYWN0aXZlSXRlbSA9IHRoaXMucHJvcHMubGlzdFt0aGlzLnByb3BzLmFjdGl2ZUtleV07XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXZcbiAgICAgICAgaWQ9XCJyZXNwb25zaXZlLW5hdmJhci1zZWxlY3RcIlxuICAgICAgICBjbGFzc05hbWU9e2JvcmRlckNsYXNzfVxuICAgICAgICBzdHlsZT17eyBmb250V2VpZ2h0OiB0aGlzLnByb3BzLmZvbnRXZWlnaHQsIGZvbnRTaXplOiB0aGlzLnByb3BzLmZvbnRTaXplIH19XG4gICAgICA+XG4gICAgICAgIDxTZWxlY3RcbiAgICAgICAgICBuYW1lPVwicmVzcG9uc2l2ZU5hdmJhclNlbGVjdFwiXG4gICAgICAgICAgbXVsdGk9e2ZhbHNlfVxuICAgICAgICAgIHZhbHVlPXthY3RpdmVJdGVtID8gYWN0aXZlSXRlbS5ocmVmIDogJyd9XG4gICAgICAgICAgY2xlYXJhYmxlPXtmYWxzZX1cbiAgICAgICAgICBwbGFjZWhvbGRlcj17dGhpcy5wcm9wcy5wbGFjZWhvbGRlcn1cbiAgICAgICAgICBvcHRpb25zPXtpdGVtc31cbiAgICAgICAgICBvbkNoYW5nZT17KGl0ZW0pID0+IHsgdGhpcy5wcm9wcy5vblNlbGVjdChpdGVtLnZhbHVlKTsgfX1cbiAgICAgICAgICBpbnB1dFByb3BzPXt7IGlkOiAnb2NSZXNwb25zaXZlTmF2YmFyU2VsZWN0JyB9fVxuICAgICAgICAvPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gdGhpcy5uYXZiYXIoKTtcbiAgfVxufVxuXG4iXX0=