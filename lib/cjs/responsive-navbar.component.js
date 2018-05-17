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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yZXNwb25zaXZlLW5hdmJhci5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIlJlc3BvbnNpdmVOYXZiYXIiLCJzdGF0ZSIsInVwZGF0ZURpbWVuc3Npb25zIiwibGFzdFZpc2libGVJdGVtSW5kZXgiLCJsYXN0V2lkdGgiLCJpbmRleE9mTGFzdFZpc2libGVOYXZJdGVtIiwiY29udGFpbmVyIiwicmVmcyIsIm5hdmJhckNvbnRhaW5lciIsImNvbnRhaW5lcldpZHRoIiwiZmluZERPTU5vZGUiLCJvZmZzZXRXaWR0aCIsInJlbWFpbmluZ1dpZHRoIiwibGFzdFZpc2libGUiLCJpIiwicHJvcHMiLCJsaXN0IiwibGVuZ3RoIiwiaXRlbSIsIlN0cmluZyIsIm5vZGUiLCJpdGVtV2lkdGgiLCJoYW5kbGVSZXNpemVFdmVudCIsImRpZmZlcmVuY2UiLCJ3aW5kb3ciLCJpbm5lcldpZHRoIiwiVVBEQVRFX1RIUkVTSE9MRCIsIk1hdGgiLCJhYnMiLCJzZXRTdGF0ZSIsInNlbGVjdGlvbkNoYW5nZWQiLCJyb3V0ZXIiLCJwdXNoIiwidmFsdWUiLCJ0b29sdGlwV3JhcHBlciIsImluZGV4IiwidG9vbHRpcENvbnRlbnQiLCJ0b29sdGlwIiwic2hvd05hdkl0ZW1Ub29sdGlwIiwidG9vbHRpcERlbGF5IiwibmF2YmFySXRlbSIsImNsYXNzTmFtZSIsImFjdGl2ZUtleSIsImZvbnRXZWlnaHQiLCJmb250U2l6ZSIsImlkIiwib25TZWxlY3QiLCJocmVmIiwibmFtZSIsIm5hdmJhciIsInNsaWNlIiwic2hvd05hdkl0ZW1Cb3JkZXIiLCJpdGVtcyIsIm1hcCIsIm5hdmJhclN0eWxlIiwibWluSGVpZ2h0IiwiaGVpZ2h0IiwiaGVpZ2h0UHgiLCJwYXJzZUludCIsImxpbmVIZWlnaHQiLCJjb21ib2JveCIsImxhYmVsIiwicmVmIiwiaW5hY3RpdmVCb3JkZXIiLCJib3JkZXJDbGFzcyIsImFjdGl2ZUl0ZW0iLCJwbGFjZWhvbGRlciIsImNvbXBvbmVudERpZE1vdW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsInNldFRpbWVvdXQiLCJpbml0aWFsVXBkYXRlRGVsYXkiLCJjb21wb25lbnREaWRVcGRhdGUiLCJjb21wb25lbnRXaWxsVW5tb3VudCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJyZW5kZXIiLCJQdXJlQ29tcG9uZW50IiwiZGVmYXVsdFByb3BzIl0sIm1hcHBpbmdzIjoiOzs7OztvQkFBQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7OztJQUVxQkEsZ0I7Ozs7Ozs7Ozs7OztnS0FpQ25CQyxLLEdBQVE7QUFDTkMseUJBQW1CLEtBRGI7QUFFTkMsNEJBQXNCLENBQUMsQ0FGakI7QUFHTkMsaUJBQVc7QUFITCxLLFFBOEJSQyx5QixHQUE0QixZQUFNO0FBQ2hDLFVBQU1DLFlBQVksTUFBS0MsSUFBTCxDQUFVQyxlQUE1QjtBQUNBLFVBQU1DLGlCQUFpQixtQkFBU0MsV0FBVCxDQUFxQkosU0FBckIsSUFDckIsbUJBQVNJLFdBQVQsQ0FBcUJKLFNBQXJCLEVBQWdDSyxXQURYLEdBQ3lCLENBRGhEOztBQUdBLFVBQUlDLGlCQUFpQkgsaUJBQWlCLEdBQXRDOztBQUVBLFVBQUlJLGNBQWMsQ0FBbEI7QUFDQSxXQUFLLElBQUlDLElBQUksQ0FBYixFQUFnQkEsSUFBSSxNQUFLQyxLQUFMLENBQVdDLElBQVgsQ0FBZ0JDLE1BQWhCLEdBQXlCLENBQTdDLEVBQWdESCxLQUFLLENBQXJELEVBQXdEO0FBQ3RELFlBQU1JLE9BQU8sTUFBS1gsSUFBTCxnQkFBdUJZLE9BQU9MLENBQVAsQ0FBdkIsQ0FBYjtBQUNBLFlBQU1NLE9BQU8sbUJBQVNWLFdBQVQsQ0FBcUJRLElBQXJCLENBQWI7QUFDQSxZQUFJLENBQUNFLElBQUwsRUFBVztBQUNUO0FBQ0Q7QUFDRCxZQUFNQyxZQUFZRCxLQUFLVCxXQUF2QjtBQUNBQywwQkFBa0JTLFNBQWxCO0FBQ0EsWUFBSVQsaUJBQWlCLENBQXJC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S3RFLEtBQUwsQ0FBV0MsaUJBQWYsRUFBa0M7QUFDaEMsV0FBSzJCLFFBQUwsQ0FBYyxFQUFFO0FBQ2Q7QUFDQTNCLDJCQUFtQixLQUZQO0FBR1pDLDhCQUFzQixLQUFLRSx5QkFBTDtBQUhWLE9BQWQ7QUFLRDtBQUNGLEc7OzZCQUVEbUUsb0IsbUNBQXVCO0FBQ3JCaEQsV0FBT2lELG1CQUFQLENBQTJCLFFBQTNCLEVBQXFDLEtBQUtuRCxpQkFBMUM7QUFDQUUsV0FBT2lELG1CQUFQLENBQTJCLG1CQUEzQixFQUFnRCxLQUFLbkQsaUJBQXJELEVBRnFCLENBRW9EO0FBQzFFLEc7OzZCQXdJRG9ELE0scUJBQVM7QUFDUCxXQUFPLEtBQUt6QixNQUFMLEVBQVA7QUFDRCxHOzs7RUF2TTJDLGdCQUFNMEIsYSxVQUMzQ0MsWSxHQUFlO0FBQ3BCOUIsWUFBVSxJQURVO0FBRXBCSyxxQkFBbUIsS0FGQztBQUdwQmIsc0JBQW9CLElBSEE7QUFJcEJDLGdCQUFjLElBSk07QUFLcEJLLFlBQVUsU0FMVTtBQU1wQkQsY0FBWSxTQU5RO0FBT3BCdUIsZUFBYSxTQVBPO0FBUXBCVixVQUFRLE1BUlk7QUFTcEJjLHNCQUFvQjtBQVRBLEM7a0JBREh0RSxnQiIsImZpbGUiOiJyZXNwb25zaXZlLW5hdmJhci5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSByZWFjdC9uby1hcnJheS1pbmRleC1rZXkgKi9cbi8qIGVzbGludC1kaXNhYmxlIHJlYWN0L25vLXN0cmluZy1yZWZzICovXG4vKiBlc2xpbnQtZGlzYWJsZSByZWFjdC9uby1maW5kLWRvbS1ub2RlICovXG4vKiBlc2xpbnQtZGlzYWJsZSByZWFjdC9wcm9wLXR5cGVzICovXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xuaW1wb3J0IFNlbGVjdCBmcm9tICdyZWFjdC1zZWxlY3QnO1xuaW1wb3J0IHsgT3ZlcmxheVRyaWdnZXIsIFRvb2x0aXAgfSBmcm9tICdyZWFjdC1ib290c3RyYXAnO1xuaW1wb3J0ICdyZWFjdC1zZWxlY3QvZGlzdC9yZWFjdC1zZWxlY3QuY3NzJztcbmltcG9ydCAnLi9yZXNwb25zaXZlLW5hdmJhci5zY3NzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVzcG9uc2l2ZU5hdmJhciBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgIG9uU2VsZWN0OiBudWxsLFxuICAgIHNob3dOYXZJdGVtQm9yZGVyOiBmYWxzZSxcbiAgICBzaG93TmF2SXRlbVRvb2x0aXA6IHRydWUsXG4gICAgdG9vbHRpcERlbGF5OiAyMDAwLFxuICAgIGZvbnRTaXplOiAnaW5oZXJpdCcsXG4gICAgZm9udFdlaWdodDogJ2luaGVyaXQnLFxuICAgIHBsYWNlaG9sZGVyOiAnbW9yZS4uLicsXG4gICAgaGVpZ2h0OiAnNDBweCcsXG4gICAgaW5pdGlhbFVwZGF0ZURlbGF5OiAyMDAsXG4gIH1cblxuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIHNob3dOYXZJdGVtQm9yZGVyOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93TmF2SXRlbVRvb2x0aXA6IFByb3BUeXBlcy5ib29sLFxuICAgIHRvb2x0aXBEZWxheTogUHJvcFR5cGVzLm51bWJlcixcbiAgICBmb250U2l6ZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBmb250V2VpZ2h0OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHBsYWNlaG9sZGVyOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGFjdGl2ZUtleTogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuICAgIGxpc3Q6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICBuYW1lOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgICAgUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgUHJvcFR5cGVzLm5vZGUsXG4gICAgICBdKS5pc1JlcXVpcmVkLFxuICAgICAgaHJlZjogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLm51bWJlcl0pLFxuICAgIH0pKS5pc1JlcXVpcmVkLFxuICAgIG9uU2VsZWN0OiBQcm9wVHlwZXMuZnVuYyxcbiAgICBoZWlnaHQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgaW5pdGlhbFVwZGF0ZURlbGF5OiBQcm9wVHlwZXMubnVtYmVyLFxuICB9XG5cbiAgc3RhdGUgPSB7XG4gICAgdXBkYXRlRGltZW5zc2lvbnM6IGZhbHNlLFxuICAgIGxhc3RWaXNpYmxlSXRlbUluZGV4OiAtMSxcbiAgICBsYXN0V2lkdGg6IDAsXG4gIH07XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuaGFuZGxlUmVzaXplRXZlbnQpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdvcmllbnRhdGlvbmNoYW5nZScsIHRoaXMuaGFuZGxlUmVzaXplRXZlbnQpOyAvLyBmb3IgbW9iaWxlIHN1cHBvcnRcbiAgICAvLyBDb21wb25lbnQgaXMgbm90IHJlbmRlcmVkIHlldCBieSBicm93c2VyIHdoZW4gRGlkTW91bnQgaXMgY2FsbGVkXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLmhhbmRsZVJlc2l6ZUV2ZW50KCk7XG4gICAgfSwgdGhpcy5wcm9wcy5pbml0aWFsVXBkYXRlRGVsYXkpO1xuICB9XG5cbiAgY29tcG9uZW50RGlkVXBkYXRlKCkge1xuICAgIGlmICh0aGlzLnN0YXRlLnVwZGF0ZURpbWVuc3Npb25zKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSByZWFjdC9uby1kaWQtdXBkYXRlLXNldC1zdGF0ZVxuICAgICAgICAvLyAybmQgcmVuZGVyIGlzIHRyaWdnZXJlZCBoZXJlIGluIHB1cnBvc2VcbiAgICAgICAgdXBkYXRlRGltZW5zc2lvbnM6IGZhbHNlLFxuICAgICAgICBsYXN0VmlzaWJsZUl0ZW1JbmRleDogdGhpcy5pbmRleE9mTGFzdFZpc2libGVOYXZJdGVtKCksXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5oYW5kbGVSZXNpemVFdmVudCk7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ29yaWVudGF0aW9uY2hhbmdlJywgdGhpcy5oYW5kbGVSZXNpemVFdmVudCk7IC8vIGZvciBtb2JpbGUgc3VwcG9ydFxuICB9XG5cbiAgaW5kZXhPZkxhc3RWaXNpYmxlTmF2SXRlbSA9ICgpID0+IHtcbiAgICBjb25zdCBjb250YWluZXIgPSB0aGlzLnJlZnMubmF2YmFyQ29udGFpbmVyO1xuICAgIGNvbnN0IGNvbnRhaW5lcldpZHRoID0gUmVhY3RET00uZmluZERPTU5vZGUoY29udGFpbmVyKSA/XG4gICAgICBSZWFjdERPTS5maW5kRE9NTm9kZShjb250YWluZXIpLm9mZnNldFdpZHRoIDogMDtcblxuICAgIGxldCByZW1haW5pbmdXaWR0aCA9IGNvbnRhaW5lcldpZHRoIC0gMTk1O1xuXG4gICAgbGV0IGxhc3RWaXNpYmxlID0gMTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucHJvcHMubGlzdC5sZW5ndGggLSAxOyBpICs9IDEpIHtcbiAgICAgIGNvbnN0IGl0ZW0gPSB0aGlzLnJlZnNbYG5hdml0ZW1yZWYke1N0cmluZyhpKX1gXTtcbiAgICAgIGNvbnN0IG5vZGUgPSBSZWFjdERPTS5maW5kRE9NTm9kZShpdGVtKTtcbiAgICAgIGlmICghbm9kZSkge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNvbnN0IGl0ZW1XaWR0aCA9IG5vZGUub2Zmc2V0V2lkdGg7XG4gICAgICByZW1haW5pbmdXaWR0aCAtPSBpdGVtV2lkdGg7XG4gICAgICBpZiAocmVtYWluaW5nV2lkdGggPCAwKSB7XG4gICAgICAgIGxhc3RWaXNpYmxlIC09IDE7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgbGFzdFZpc2libGUgKz0gMTtcbiAgICB9XG5cbiAgICByZXR1cm4gbGFzdFZpc2libGU7XG4gIH1cblxuICBoYW5kbGVSZXNpemVFdmVudCA9ICgpID0+IHtcbiAgICBjb25zdCBkaWZmZXJlbmNlID0gd2luZG93LmlubmVyV2lkdGggLSB0aGlzLnN0YXRlLmxhc3RXaWR0aDtcbiAgICBjb25zdCBVUERBVEVfVEhSRVNIT0xEID0gNTA7XG4gICAgaWYgKE1hdGguYWJzKGRpZmZlcmVuY2UpID4gVVBEQVRFX1RIUkVTSE9MRCkge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIHVwZGF0ZURpbWVuc3Npb25zOiB0cnVlLFxuICAgICAgICBsYXN0V2lkdGg6IHdpbmRvdy5pbm5lcldpZHRoLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG4gIHNlbGVjdGlvbkNoYW5nZWQgPSAoaXRlbSkgPT4ge1xuICAgIHRoaXMucHJvcHMucm91dGVyLnB1c2goaXRlbS52YWx1ZSk7XG4gIH1cblxuICB0b29sdGlwV3JhcHBlciA9IChub2RlLCBpbmRleCwgdG9vbHRpcENvbnRlbnQpID0+IHtcbiAgICBjb25zdCB0b29sdGlwID0gPFRvb2x0aXAgaWQ9XCJ0b29sdGlwXCI+e3Rvb2x0aXBDb250ZW50fTwvVG9vbHRpcD47XG4gICAgcmV0dXJuICF0aGlzLnByb3BzLnNob3dOYXZJdGVtVG9vbHRpcCA/IG5vZGUgOlxuICAgIDxPdmVybGF5VHJpZ2dlciBwbGFjZW1lbnQ9XCJib3R0b21cIiBrZXk9e2luZGV4fSBvdmVybGF5PXt0b29sdGlwfSBkZWxheVNob3c9e3RoaXMucHJvcHMudG9vbHRpcERlbGF5fT5cbiAgICAgIHtub2RlfVxuICAgIDwvT3ZlcmxheVRyaWdnZXI+O1xuICB9XG5cbiAgbmF2YmFySXRlbSA9IChpdGVtLCBpbmRleCwgY2xhc3NOYW1lKSA9PiAoXG4gICAgPGJ1dHRvblxuICAgICAgY2xhc3NOYW1lPXtpbmRleCA9PT0gdGhpcy5wcm9wcy5hY3RpdmVLZXkgJiZcbiAgICAgICAgaW5kZXggPD0gdGhpcy5zdGF0ZS5sYXN0VmlzaWJsZUl0ZW1JbmRleCA/XG4gICAgICAgIGAke2NsYXNzTmFtZX0gc2VsZWN0ZWQtYm9yZGVyYCA6IGAke2NsYXNzTmFtZX1gfVxuICAgICAgc3R5bGU9e3sgZm9udFdlaWdodDogdGhpcy5wcm9wcy5mb250V2VpZ2h0LCBmb250U2l6ZTogdGhpcy5wcm9wcy5mb250U2l6ZSB9fVxuICAgICAgaWQ9e2l0ZW0uaWQgfHwgYG5hdml0ZW1yZWYke1N0cmluZyhpbmRleCl9YH1cbiAgICAgIGtleT17aXRlbS5pZCB8fCBgbmF2aXRlbXJlZiR7U3RyaW5nKGluZGV4KX1gfVxuICAgICAgcmVmPXtgbmF2aXRlbXJlZiR7U3RyaW5nKGluZGV4KX1gfVxuICAgICAgb25DbGljaz17KCkgPT4geyB0aGlzLnByb3BzLm9uU2VsZWN0KGl0ZW0uaHJlZik7IH19XG4gICAgPlxuICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicmVzcG9uc2l2ZS1uYXZiYXItaXRlbS10ZXh0XCI+e2l0ZW0ubmFtZX08L3NwYW4+XG4gICAgPC9idXR0b24+XG4gIClcblxuICBuYXZiYXIgPSAoKSA9PiB7XG4gICAgY29uc3QgbGlzdCA9IHRoaXMuc3RhdGUubGFzdFZpc2libGVJdGVtSW5kZXggPj0gMCA/XG4gICAgICB0aGlzLnByb3BzLmxpc3Quc2xpY2UoMCwgdGhpcy5zdGF0ZS5sYXN0VmlzaWJsZUl0ZW1JbmRleClcbiAgICAgIDogdGhpcy5wcm9wcy5saXN0O1xuICAgIGNvbnN0IGNsYXNzTmFtZSA9IHRoaXMucHJvcHMuc2hvd05hdkl0ZW1Cb3JkZXIgP1xuICAgICAgJ3Jlc3BvbnNpdmUtbmF2YmFyLWl0ZW0gaW5hY3RpdmUtYm9yZGVyJyA6ICdyZXNwb25zaXZlLW5hdmJhci1pdGVtJztcbiAgICBjb25zdCBpdGVtcyA9IGxpc3QubWFwKChpdGVtLCBpbmRleCkgPT4gKFxuICAgICAgdGhpcy50b29sdGlwV3JhcHBlcih0aGlzLm5hdmJhckl0ZW0oaXRlbSwgaW5kZXgsIGNsYXNzTmFtZSksIGluZGV4LCBpdGVtLm5hbWUpXG4gICAgKSk7XG4gICAgY29uc3QgbmF2YmFyU3R5bGUgPSB7XG4gICAgICBtaW5IZWlnaHQ6IHRoaXMucHJvcHMuaGVpZ2h0LFxuICAgIH07XG4gICAgaWYgKHRoaXMucHJvcHMuaGVpZ2h0LnNsaWNlKC0yKSA9PT0gJ3B4Jykge1xuICAgICAgY29uc3QgaGVpZ2h0UHggPSBwYXJzZUludCh0aGlzLnByb3BzLmhlaWdodC5zbGljZSgwLCAtMiksIDEwKTtcbiAgICAgIG5hdmJhclN0eWxlLmxpbmVIZWlnaHQgPSBgJHsoaGVpZ2h0UHggLSA0KX1weGA7XG4gICAgfVxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2XG4gICAgICAgIGlkPVwicmVzcG9uc2l2ZS1uYXZiYXItY29udGFpbmVyXCJcbiAgICAgICAgcmVmPVwibmF2YmFyQ29udGFpbmVyXCJcbiAgICAgICAgc3R5bGU9e25hdmJhclN0eWxlfVxuICAgICAgPlxuICAgICAgICB7aXRlbXN9XG4gICAgICAgIHt0aGlzLmNvbWJvYm94KCl9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG5cbiAgY29tYm9ib3ggPSAoKSA9PiB7XG4gICAgaWYgKHRoaXMuc3RhdGUubGFzdFZpc2libGVJdGVtSW5kZXggPT09IC0xIHx8XG4gICAgICAgIHRoaXMuc3RhdGUubGFzdFZpc2libGVJdGVtSW5kZXggPiB0aGlzLnByb3BzLmxpc3QubGVuZ3RoIC0gMSkge1xuICAgICAgLy8gcmV0dXJuIG51bGwgaWYgYWxsIG5hdiBpdGVtcyBhcmUgdmlzaWJsZVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgLy8gc2xpY2UgbmF2IGl0ZW1zIGxpc3QgYW5kIHNob3cgaW52aXNpYmxlIGl0ZW1zIGluIHRoZSBjb21ib2JveFxuICAgIGNvbnN0IGxpc3QgPSB0aGlzLnN0YXRlLmxhc3RWaXNpYmxlSXRlbUluZGV4ID49IDAgP1xuICAgICAgdGhpcy5wcm9wcy5saXN0LnNsaWNlKHRoaXMuc3RhdGUubGFzdFZpc2libGVJdGVtSW5kZXgpXG4gICAgICA6IHRoaXMucHJvcHMubGlzdDtcbiAgICBjb25zdCBpdGVtcyA9IGxpc3QubWFwKChpdGVtLCBpbmRleCkgPT5cbiAgICAgICh7XG4gICAgICAgIHZhbHVlOiBpdGVtLmhyZWYsXG4gICAgICAgIGxhYmVsOiBpdGVtLm5hbWUsXG4gICAgICAgIGlkOiBpbmRleCxcbiAgICAgICAgcmVmOiBgbmF2aXRlbXJlZiR7U3RyaW5nKGluZGV4KX1gLFxuICAgICAgfSkpO1xuXG4gICAgY29uc3QgaW5hY3RpdmVCb3JkZXIgPSB0aGlzLnByb3BzLnNob3dOYXZJdGVtQm9yZGVyID8gJ2luYWN0aXZlLWJvcmRlcicgOiAnJztcbiAgICBjb25zdCBib3JkZXJDbGFzcyA9IHRoaXMucHJvcHMuYWN0aXZlS2V5ID49IHRoaXMuc3RhdGUubGFzdFZpc2libGVJdGVtSW5kZXggP1xuICAgICAgJ3NlbGVjdGVkLWJvcmRlcicgOiBpbmFjdGl2ZUJvcmRlcjtcbiAgICBjb25zdCBhY3RpdmVJdGVtID0gdGhpcy5wcm9wcy5saXN0W3RoaXMucHJvcHMuYWN0aXZlS2V5XTtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdlxuICAgICAgICBpZD1cInJlc3BvbnNpdmUtbmF2YmFyLXNlbGVjdFwiXG4gICAgICAgIGNsYXNzTmFtZT17Ym9yZGVyQ2xhc3N9XG4gICAgICAgIHN0eWxlPXt7IGZvbnRXZWlnaHQ6IHRoaXMucHJvcHMuZm9udFdlaWdodCwgZm9udFNpemU6IHRoaXMucHJvcHMuZm9udFNpemUgfX1cbiAgICAgID5cbiAgICAgICAgPFNlbGVjdFxuICAgICAgICAgIG5hbWU9XCJyZXNwb25zaXZlTmF2YmFyU2VsZWN0XCJcbiAgICAgICAgICBtdWx0aT17ZmFsc2V9XG4gICAgICAgICAgdmFsdWU9e2FjdGl2ZUl0ZW0gPyBhY3RpdmVJdGVtLmhyZWYgOiAnJ31cbiAgICAgICAgICBjbGVhcmFibGU9e2ZhbHNlfVxuICAgICAgICAgIHBsYWNlaG9sZGVyPXt0aGlzLnByb3BzLnBsYWNlaG9sZGVyfVxuICAgICAgICAgIG9wdGlvbnM9e2l0ZW1zfVxuICAgICAgICAgIG9uQ2hhbmdlPXsoaXRlbSkgPT4geyB0aGlzLnByb3BzLm9uU2VsZWN0KGl0ZW0udmFsdWUpOyB9fVxuICAgICAgICAgIGlucHV0UHJvcHM9e3sgaWQ6ICdvY1Jlc3BvbnNpdmVOYXZiYXJTZWxlY3QnIH19XG4gICAgICAgIC8+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiB0aGlzLm5hdmJhcigpO1xuICB9XG59XG4iXX0=