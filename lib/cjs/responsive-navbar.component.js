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
          id: _this.getMainPartOfId() + '-container',
          ref: 'navbarContainer',
          className: 'responsive-navbar-container',
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
          id: _this.getMainPartOfId() + '-select',
          className: 'responsive-navbar-select ' + borderClass,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yZXNwb25zaXZlLW5hdmJhci5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIlJlc3BvbnNpdmVOYXZiYXIiLCJzdGF0ZSIsInVwZGF0ZURpbWVuc3Npb25zIiwibGFzdFZpc2libGVJdGVtSW5kZXgiLCJsYXN0V2lkdGgiLCJnZXRNYWluUGFydE9mSWQiLCJwcm9wcyIsImlkIiwiaW5kZXhPZkxhc3RWaXNpYmxlTmF2SXRlbSIsImNvbnRhaW5lciIsInJlZnMiLCJuYXZiYXJDb250YWluZXIiLCJjb250YWluZXJXaWR0aCIsImZpbmRET01Ob2RlIiwib2Zmc2V0V2lkdGgiLCJyZW1haW5pbmdXaWR0aCIsImxhc3RWaXNpYmxlIiwiaSIsImxpc3QiLCJsZW5ndGgiLCJpdGVtIiwiU3RyaW5nIiwibm9kZSIsIml0ZW1XaWR0aCIsImhhbmRsZVJlc2l6ZUV2ZW50IiwiZGlmZmVyZW5jZSIsIndpbmRvdyIsImlubmVyV2lkdGgiLCJVUERBVEVfVEhSRVNIT0xEIiwiTWF0aCIsImFicyIsInNldFN0YXRlIiwic2VsZWN0aW9uQ2hhbmdlZCIsInJvdXRlciIsInB1c2giLCJ2YWx1ZSIsInRvb2x0aXBXcmFwcGVyIiwiaW5kZXgiLCJ0b29sdGlwQ29udGVudCIsInRvb2x0aXAiLCJzaG93TmF2SXRlbVRvb2x0aXAiLCJ0b29sdGlwRGVsYXkiLCJuYXZiYXJJdGVtIiwiY2xhc3NOYW1lIiwiYWN0aXZlS2V5IiwiZm9udFdlaWdodCIsImZvbnRTaXplIiwib25TZWxlY3QiLCJocmVmIiwibmFtZSIsIm5hdmJhciIsInNsaWNlIiwic2hvd05hdkl0ZW1Cb3JkZXIiLCJpdGVtcyIsIm1hcCIsIm5hdmJhclN0eWxlIiwibWluSGVpZ2h0IiwiaGVpZ2h0IiwiaGVpZ2h0UHgiLCJwYXJzZUludCIsImxpbmVIZWlnaHQiLCJjb21ib2JveCIsImxhYmVsIiwicmVmIiwiaW5hY3RpdmVCb3JkZXIiLCJib3JkZXJDbGFzcyIsImFjdGl2ZUl0ZW0iLCJwbGFjZWhvbGRlciIsImNvbXBvbmVudERpZE1vdW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsInNldFRpbWVvdXQiLCJpbml0aWFsVXBkYXRlRGVsYXkiLCJjb21wb25lbnREaWRVcGRhdGUiLCJjb21wb25lbnRXaWxsVW5tb3VudCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJyZW5kZXIiLCJQdXJlQ29tcG9uZW50IiwiZGVmYXVsdFByb3BzIl0sIm1hcHBpbmdzIjoiOzs7OztvQkFBQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7OztJQUVxQkEsZ0I7Ozs7Ozs7Ozs7OztnS0FtQ25CQyxLLEdBQVE7QUFDTkMseUJBQW1CLEtBRGI7QUFFTkMsNEJBQXNCLENBQUMsQ0FGakI7QUFHTkMsaUJBQVc7QUFITCxLLFFBOEJSQyxlLEdBQWtCO0FBQUEsYUFBTyxNQUFLQyxLQUFMLENBQVdDLEVBQVgsSUFBaUIsbUJBQXhCO0FBQUEsSyxRQUVsQkMseUIsR0FBNEIsWUFBTTtBQUNoQyxVQUFNQyxZQUFZLE1BQUtDLElBQUwsQ0FBVUMsZUFBNUI7QUFDQSxVQUFNQyxpQkFBaUIsbUJBQVNDLFdBQVQsQ0FBcUJKLFNBQXJCLElBQ3JCLG1CQUFTSSxXQUFULENBQXFCSixTQUFyQixFQUFnQ0ssV0FEWCxHQUN5QixDQURoRDs7QUFHQSxVQUFJQyxpQkFBaUJILGlCQUFpQixHQUF0Qzs7QUFFQSxVQUFJSSxjQUFjLENBQWxCO0FBQ0EsV0FBSyxJQUFJQyxJQUFJLENBQWIsRUFBZ0JBLElBQUksTUFBS1gsS0FBTCxDQUFXWSxJQUFYLENBQWdCQyxNQUFoQixHQUF5QixDQUE3QyxFQUFnREYsS0FBSyxDQUFyRCxFQUF3RDtBQUN0RCxZQUFNRyxPQUFPLE1BQUtWLElBQUwsZ0JBQXVCVyxPQUFPSixDQUFQLENBQXZCLENBQWI7QUFDQSxZQUFNSyxPQUFPLG1CQUFTVCxXQUFULENBQXFCTyxJQUFyQixDQUFiO0FBQ0EsWUFBSSxDQUFDRSxJQUFMLEVB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aUJBQWxELEVBRmtCLENBRW9EO0FBQ3RFO0FBQ0E4QyxlQUFXLFlBQU07QUFDZixhQUFLOUMsaUJBQUw7QUFDRCxLQUZELEVBRUcsS0FBS2xCLEtBQUwsQ0FBV2lFLGtCQUZkO0FBR0QsRzs7NkJBRURDLGtCLGlDQUFxQjtBQUNuQixRQUFJLEtBQUt2RSxLQUFMLENBQVdDLGlCQUFmLEVBQWtDO0FBQ2hDLFdBQUs2QixRQUFMLENBQWMsRUFBRTtBQUNkO0FBQ0E3QiwyQkFBbUIsS0FGUDtBQUdaQyw4QkFBc0IsS0FBS0sseUJBQUw7QUFIVixPQUFkO0FBS0Q7QUFDRixHOzs2QkFFRGlFLG9CLG1DQUF1QjtBQUNyQi9DLFdBQU9nRCxtQkFBUCxDQUEyQixRQUEzQixFQUFxQyxLQUFLbEQsaUJBQTFDO0FBQ0FFLFdBQU9nRCxtQkFBUCxDQUEyQixtQkFBM0IsRUFBZ0QsS0FBS2xELGlCQUFyRCxFQUZxQixDQUVvRDtBQUMxRSxHOzs2QkEySURtRCxNLHFCQUFTO0FBQ1AsV0FBTyxLQUFLekIsTUFBTCxFQUFQO0FBQ0QsRzs7O0VBNU0yQyxnQkFBTTBCLGEsVUFDM0NDLFksR0FBZTtBQUNwQnRFLE1BQUksSUFEZ0I7QUFFcEJ3QyxZQUFVLElBRlU7QUFHcEJLLHFCQUFtQixLQUhDO0FBSXBCWixzQkFBb0IsSUFKQTtBQUtwQkMsZ0JBQWMsSUFMTTtBQU1wQkssWUFBVSxTQU5VO0FBT3BCRCxjQUFZLFNBUFE7QUFRcEJzQixlQUFhLFNBUk87QUFTcEJWLFVBQVEsTUFUWTtBQVVwQmMsc0JBQW9CO0FBVkEsQztrQkFESHZFLGdCIiwiZmlsZSI6InJlc3BvbnNpdmUtbmF2YmFyLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIHJlYWN0L25vLWFycmF5LWluZGV4LWtleSAqL1xuLyogZXNsaW50LWRpc2FibGUgcmVhY3Qvbm8tc3RyaW5nLXJlZnMgKi9cbi8qIGVzbGludC1kaXNhYmxlIHJlYWN0L25vLWZpbmQtZG9tLW5vZGUgKi9cbi8qIGVzbGludC1kaXNhYmxlIHJlYWN0L3Byb3AtdHlwZXMgKi9cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XG5pbXBvcnQgU2VsZWN0IGZyb20gJ3JlYWN0LXNlbGVjdCc7XG5pbXBvcnQgeyBPdmVybGF5VHJpZ2dlciwgVG9vbHRpcCB9IGZyb20gJ3JlYWN0LWJvb3RzdHJhcCc7XG5pbXBvcnQgJ3JlYWN0LXNlbGVjdC9kaXN0L3JlYWN0LXNlbGVjdC5jc3MnO1xuaW1wb3J0ICcuL3Jlc3BvbnNpdmUtbmF2YmFyLnNjc3MnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZXNwb25zaXZlTmF2YmFyIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudCB7XG4gIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgaWQ6IG51bGwsXG4gICAgb25TZWxlY3Q6IG51bGwsXG4gICAgc2hvd05hdkl0ZW1Cb3JkZXI6IGZhbHNlLFxuICAgIHNob3dOYXZJdGVtVG9vbHRpcDogdHJ1ZSxcbiAgICB0b29sdGlwRGVsYXk6IDIwMDAsXG4gICAgZm9udFNpemU6ICdpbmhlcml0JyxcbiAgICBmb250V2VpZ2h0OiAnaW5oZXJpdCcsXG4gICAgcGxhY2Vob2xkZXI6ICdtb3JlLi4uJyxcbiAgICBoZWlnaHQ6ICc0MHB4JyxcbiAgICBpbml0aWFsVXBkYXRlRGVsYXk6IDIwMCxcbiAgfVxuXG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgaWQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgc2hvd05hdkl0ZW1Cb3JkZXI6IFByb3BUeXBlcy5ib29sLFxuICAgIHNob3dOYXZJdGVtVG9vbHRpcDogUHJvcFR5cGVzLmJvb2wsXG4gICAgdG9vbHRpcERlbGF5OiBQcm9wVHlwZXMubnVtYmVyLFxuICAgIGZvbnRTaXplOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGZvbnRXZWlnaHQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgcGxhY2Vob2xkZXI6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgYWN0aXZlS2V5OiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgbGlzdDogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgIG5hbWU6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgICBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICBQcm9wVHlwZXMubm9kZSxcbiAgICAgIF0pLmlzUmVxdWlyZWQsXG4gICAgICBocmVmOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMubnVtYmVyXSksXG4gICAgfSkpLmlzUmVxdWlyZWQsXG4gICAgb25TZWxlY3Q6IFByb3BUeXBlcy5mdW5jLFxuICAgIGhlaWdodDogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBpbml0aWFsVXBkYXRlRGVsYXk6IFByb3BUeXBlcy5udW1iZXIsXG4gIH1cblxuICBzdGF0ZSA9IHtcbiAgICB1cGRhdGVEaW1lbnNzaW9uczogZmFsc2UsXG4gICAgbGFzdFZpc2libGVJdGVtSW5kZXg6IC0xLFxuICAgIGxhc3RXaWR0aDogMCxcbiAgfTtcblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5oYW5kbGVSZXNpemVFdmVudCk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ29yaWVudGF0aW9uY2hhbmdlJywgdGhpcy5oYW5kbGVSZXNpemVFdmVudCk7IC8vIGZvciBtb2JpbGUgc3VwcG9ydFxuICAgIC8vIENvbXBvbmVudCBpcyBub3QgcmVuZGVyZWQgeWV0IGJ5IGJyb3dzZXIgd2hlbiBEaWRNb3VudCBpcyBjYWxsZWRcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuaGFuZGxlUmVzaXplRXZlbnQoKTtcbiAgICB9LCB0aGlzLnByb3BzLmluaXRpYWxVcGRhdGVEZWxheSk7XG4gIH1cblxuICBjb21wb25lbnREaWRVcGRhdGUoKSB7XG4gICAgaWYgKHRoaXMuc3RhdGUudXBkYXRlRGltZW5zc2lvbnMpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIHJlYWN0L25vLWRpZC11cGRhdGUtc2V0LXN0YXRlXG4gICAgICAgIC8vIDJuZCByZW5kZXIgaXMgdHJpZ2dlcmVkIGhlcmUgaW4gcHVycG9zZVxuICAgICAgICB1cGRhdGVEaW1lbnNzaW9uczogZmFsc2UsXG4gICAgICAgIGxhc3RWaXNpYmxlSXRlbUluZGV4OiB0aGlzLmluZGV4T2ZMYXN0VmlzaWJsZU5hdkl0ZW0oKSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLmhhbmRsZVJlc2l6ZUV2ZW50KTtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignb3JpZW50YXRpb25jaGFuZ2UnLCB0aGlzLmhhbmRsZVJlc2l6ZUV2ZW50KTsgLy8gZm9yIG1vYmlsZSBzdXBwb3J0XG4gIH1cblxuICBnZXRNYWluUGFydE9mSWQgPSAoKSA9PiAodGhpcy5wcm9wcy5pZCB8fCAncmVzcG9uc2l2ZS1uYXZiYXInKTtcblxuICBpbmRleE9mTGFzdFZpc2libGVOYXZJdGVtID0gKCkgPT4ge1xuICAgIGNvbnN0IGNvbnRhaW5lciA9IHRoaXMucmVmcy5uYXZiYXJDb250YWluZXI7XG4gICAgY29uc3QgY29udGFpbmVyV2lkdGggPSBSZWFjdERPTS5maW5kRE9NTm9kZShjb250YWluZXIpID9cbiAgICAgIFJlYWN0RE9NLmZpbmRET01Ob2RlKGNvbnRhaW5lcikub2Zmc2V0V2lkdGggOiAwO1xuXG4gICAgbGV0IHJlbWFpbmluZ1dpZHRoID0gY29udGFpbmVyV2lkdGggLSAxOTU7XG5cbiAgICBsZXQgbGFzdFZpc2libGUgPSAxO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5wcm9wcy5saXN0Lmxlbmd0aCAtIDE7IGkgKz0gMSkge1xuICAgICAgY29uc3QgaXRlbSA9IHRoaXMucmVmc1tgbmF2aXRlbXJlZiR7U3RyaW5nKGkpfWBdO1xuICAgICAgY29uc3Qgbm9kZSA9IFJlYWN0RE9NLmZpbmRET01Ob2RlKGl0ZW0pO1xuICAgICAgaWYgKCFub2RlKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY29uc3QgaXRlbVdpZHRoID0gbm9kZS5vZmZzZXRXaWR0aDtcbiAgICAgIHJlbWFpbmluZ1dpZHRoIC09IGl0ZW1XaWR0aDtcbiAgICAgIGlmIChyZW1haW5pbmdXaWR0aCA8IDApIHtcbiAgICAgICAgbGFzdFZpc2libGUgLT0gMTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBsYXN0VmlzaWJsZSArPSAxO1xuICAgIH1cblxuICAgIHJldHVybiBsYXN0VmlzaWJsZTtcbiAgfVxuXG4gIGhhbmRsZVJlc2l6ZUV2ZW50ID0gKCkgPT4ge1xuICAgIGNvbnN0IGRpZmZlcmVuY2UgPSB3aW5kb3cuaW5uZXJXaWR0aCAtIHRoaXMuc3RhdGUubGFzdFdpZHRoO1xuICAgIGNvbnN0IFVQREFURV9USFJFU0hPTEQgPSA1MDtcbiAgICBpZiAoTWF0aC5hYnMoZGlmZmVyZW5jZSkgPiBVUERBVEVfVEhSRVNIT0xEKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgdXBkYXRlRGltZW5zc2lvbnM6IHRydWUsXG4gICAgICAgIGxhc3RXaWR0aDogd2luZG93LmlubmVyV2lkdGgsXG4gICAgICB9KTtcbiAgICB9XG4gIH1cbiAgc2VsZWN0aW9uQ2hhbmdlZCA9IChpdGVtKSA9PiB7XG4gICAgdGhpcy5wcm9wcy5yb3V0ZXIucHVzaChpdGVtLnZhbHVlKTtcbiAgfVxuXG4gIHRvb2x0aXBXcmFwcGVyID0gKG5vZGUsIGluZGV4LCB0b29sdGlwQ29udGVudCkgPT4ge1xuICAgIGNvbnN0IHRvb2x0aXAgPSA8VG9vbHRpcCBpZD1cInRvb2x0aXBcIj57dG9vbHRpcENvbnRlbnR9PC9Ub29sdGlwPjtcbiAgICByZXR1cm4gIXRoaXMucHJvcHMuc2hvd05hdkl0ZW1Ub29sdGlwID8gbm9kZSA6XG4gICAgPE92ZXJsYXlUcmlnZ2VyIHBsYWNlbWVudD1cImJvdHRvbVwiIGtleT17aW5kZXh9IG92ZXJsYXk9e3Rvb2x0aXB9IGRlbGF5U2hvdz17dGhpcy5wcm9wcy50b29sdGlwRGVsYXl9PlxuICAgICAge25vZGV9XG4gICAgPC9PdmVybGF5VHJpZ2dlcj47XG4gIH1cblxuICBuYXZiYXJJdGVtID0gKGl0ZW0sIGluZGV4LCBjbGFzc05hbWUpID0+IChcbiAgICA8YnV0dG9uXG4gICAgICBjbGFzc05hbWU9e2luZGV4ID09PSB0aGlzLnByb3BzLmFjdGl2ZUtleSAmJlxuICAgICAgICBpbmRleCA8PSB0aGlzLnN0YXRlLmxhc3RWaXNpYmxlSXRlbUluZGV4ID9cbiAgICAgICAgYCR7Y2xhc3NOYW1lfSBzZWxlY3RlZC1ib3JkZXJgIDogYCR7Y2xhc3NOYW1lfWB9XG4gICAgICBzdHlsZT17eyBmb250V2VpZ2h0OiB0aGlzLnByb3BzLmZvbnRXZWlnaHQsIGZvbnRTaXplOiB0aGlzLnByb3BzLmZvbnRTaXplIH19XG4gICAgICBpZD17aXRlbS5pZCB8fCBgbmF2aXRlbXJlZiR7U3RyaW5nKGluZGV4KX1gfVxuICAgICAga2V5PXtpdGVtLmlkIHx8IGBuYXZpdGVtcmVmJHtTdHJpbmcoaW5kZXgpfWB9XG4gICAgICByZWY9e2BuYXZpdGVtcmVmJHtTdHJpbmcoaW5kZXgpfWB9XG4gICAgICBvbkNsaWNrPXsoKSA9PiB7IHRoaXMucHJvcHMub25TZWxlY3QoaXRlbS5ocmVmKTsgfX1cbiAgICA+XG4gICAgICA8c3BhbiBjbGFzc05hbWU9XCJyZXNwb25zaXZlLW5hdmJhci1pdGVtLXRleHRcIj57aXRlbS5uYW1lfTwvc3Bhbj5cbiAgICA8L2J1dHRvbj5cbiAgKVxuXG4gIG5hdmJhciA9ICgpID0+IHtcbiAgICBjb25zdCBsaXN0ID0gdGhpcy5zdGF0ZS5sYXN0VmlzaWJsZUl0ZW1JbmRleCA+PSAwID9cbiAgICAgIHRoaXMucHJvcHMubGlzdC5zbGljZSgwLCB0aGlzLnN0YXRlLmxhc3RWaXNpYmxlSXRlbUluZGV4KVxuICAgICAgOiB0aGlzLnByb3BzLmxpc3Q7XG4gICAgY29uc3QgY2xhc3NOYW1lID0gdGhpcy5wcm9wcy5zaG93TmF2SXRlbUJvcmRlciA/XG4gICAgICAncmVzcG9uc2l2ZS1uYXZiYXItaXRlbSBpbmFjdGl2ZS1ib3JkZXInIDogJ3Jlc3BvbnNpdmUtbmF2YmFyLWl0ZW0nO1xuICAgIGNvbnN0IGl0ZW1zID0gbGlzdC5tYXAoKGl0ZW0sIGluZGV4KSA9PiAoXG4gICAgICB0aGlzLnRvb2x0aXBXcmFwcGVyKHRoaXMubmF2YmFySXRlbShpdGVtLCBpbmRleCwgY2xhc3NOYW1lKSwgaW5kZXgsIGl0ZW0ubmFtZSlcbiAgICApKTtcbiAgICBjb25zdCBuYXZiYXJTdHlsZSA9IHtcbiAgICAgIG1pbkhlaWdodDogdGhpcy5wcm9wcy5oZWlnaHQsXG4gICAgfTtcbiAgICBpZiAodGhpcy5wcm9wcy5oZWlnaHQuc2xpY2UoLTIpID09PSAncHgnKSB7XG4gICAgICBjb25zdCBoZWlnaHRQeCA9IHBhcnNlSW50KHRoaXMucHJvcHMuaGVpZ2h0LnNsaWNlKDAsIC0yKSwgMTApO1xuICAgICAgbmF2YmFyU3R5bGUubGluZUhlaWdodCA9IGAkeyhoZWlnaHRQeCAtIDQpfXB4YDtcbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXZcbiAgICAgICAgaWQ9e2Ake3RoaXMuZ2V0TWFpblBhcnRPZklkKCl9LWNvbnRhaW5lcmB9XG4gICAgICAgIHJlZj1cIm5hdmJhckNvbnRhaW5lclwiXG4gICAgICAgIGNsYXNzTmFtZT1cInJlc3BvbnNpdmUtbmF2YmFyLWNvbnRhaW5lclwiXG4gICAgICAgIHN0eWxlPXtuYXZiYXJTdHlsZX1cbiAgICAgID5cbiAgICAgICAge2l0ZW1zfVxuICAgICAgICB7dGhpcy5jb21ib2JveCgpfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxuXG4gIGNvbWJvYm94ID0gKCkgPT4ge1xuICAgIGlmICh0aGlzLnN0YXRlLmxhc3RWaXNpYmxlSXRlbUluZGV4ID09PSAtMSB8fFxuICAgICAgICB0aGlzLnN0YXRlLmxhc3RWaXNpYmxlSXRlbUluZGV4ID4gdGhpcy5wcm9wcy5saXN0Lmxlbmd0aCAtIDEpIHtcbiAgICAgIC8vIHJldHVybiBudWxsIGlmIGFsbCBuYXYgaXRlbXMgYXJlIHZpc2libGVcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIC8vIHNsaWNlIG5hdiBpdGVtcyBsaXN0IGFuZCBzaG93IGludmlzaWJsZSBpdGVtcyBpbiB0aGUgY29tYm9ib3hcbiAgICBjb25zdCBsaXN0ID0gdGhpcy5zdGF0ZS5sYXN0VmlzaWJsZUl0ZW1JbmRleCA+PSAwID9cbiAgICAgIHRoaXMucHJvcHMubGlzdC5zbGljZSh0aGlzLnN0YXRlLmxhc3RWaXNpYmxlSXRlbUluZGV4KVxuICAgICAgOiB0aGlzLnByb3BzLmxpc3Q7XG4gICAgY29uc3QgaXRlbXMgPSBsaXN0Lm1hcCgoaXRlbSwgaW5kZXgpID0+XG4gICAgICAoe1xuICAgICAgICB2YWx1ZTogaXRlbS5ocmVmLFxuICAgICAgICBsYWJlbDogaXRlbS5uYW1lLFxuICAgICAgICBpZDogaW5kZXgsXG4gICAgICAgIHJlZjogYG5hdml0ZW1yZWYke1N0cmluZyhpbmRleCl9YCxcbiAgICAgIH0pKTtcblxuICAgIGNvbnN0IGluYWN0aXZlQm9yZGVyID0gdGhpcy5wcm9wcy5zaG93TmF2SXRlbUJvcmRlciA/ICdpbmFjdGl2ZS1ib3JkZXInIDogJyc7XG4gICAgY29uc3QgYm9yZGVyQ2xhc3MgPSB0aGlzLnByb3BzLmFjdGl2ZUtleSA+PSB0aGlzLnN0YXRlLmxhc3RWaXNpYmxlSXRlbUluZGV4ID9cbiAgICAgICdzZWxlY3RlZC1ib3JkZXInIDogaW5hY3RpdmVCb3JkZXI7XG4gICAgY29uc3QgYWN0aXZlSXRlbSA9IHRoaXMucHJvcHMubGlzdFt0aGlzLnByb3BzLmFjdGl2ZUtleV07XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXZcbiAgICAgICAgaWQ9e2Ake3RoaXMuZ2V0TWFpblBhcnRPZklkKCl9LXNlbGVjdGB9XG4gICAgICAgIGNsYXNzTmFtZT17YHJlc3BvbnNpdmUtbmF2YmFyLXNlbGVjdCAke2JvcmRlckNsYXNzfWB9XG4gICAgICAgIHN0eWxlPXt7IGZvbnRXZWlnaHQ6IHRoaXMucHJvcHMuZm9udFdlaWdodCwgZm9udFNpemU6IHRoaXMucHJvcHMuZm9udFNpemUgfX1cbiAgICAgID5cbiAgICAgICAgPFNlbGVjdFxuICAgICAgICAgIG5hbWU9XCJyZXNwb25zaXZlTmF2YmFyU2VsZWN0XCJcbiAgICAgICAgICBtdWx0aT17ZmFsc2V9XG4gICAgICAgICAgdmFsdWU9e2FjdGl2ZUl0ZW0gPyBhY3RpdmVJdGVtLmhyZWYgOiAnJ31cbiAgICAgICAgICBjbGVhcmFibGU9e2ZhbHNlfVxuICAgICAgICAgIHBsYWNlaG9sZGVyPXt0aGlzLnByb3BzLnBsYWNlaG9sZGVyfVxuICAgICAgICAgIG9wdGlvbnM9e2l0ZW1zfVxuICAgICAgICAgIG9uQ2hhbmdlPXsoaXRlbSkgPT4geyB0aGlzLnByb3BzLm9uU2VsZWN0KGl0ZW0udmFsdWUpOyB9fVxuICAgICAgICAgIGlucHV0UHJvcHM9e3sgaWQ6ICdvY1Jlc3BvbnNpdmVOYXZiYXJTZWxlY3QnIH19XG4gICAgICAgIC8+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiB0aGlzLm5hdmJhcigpO1xuICB9XG59XG4iXX0=