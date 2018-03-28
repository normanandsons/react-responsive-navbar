'use strict';

exports.__esModule = true;
exports.default = undefined;

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

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint-disable react/no-array-index-key */
/* eslint-disable react/no-string-refs */
/* eslint-disable react/no-find-dom-node */
/* eslint-disable react/prop-types */

var ResponsiveNavbar = function (_React$PureComponent) {
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

      return _react2.default.createElement(
        'div',
        {
          id: 'responsive-navbar-container',
          ref: 'navbarContainer',
          style: { minHeight: _this.props.height }
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
}(_react2.default.PureComponent);

exports.default = ResponsiveNavbar;


ResponsiveNavbar.defaultProps = {
  onSelect: null,
  showNavItemBorder: false,
  showNavItemTooltip: true,
  tooltipDelay: 2000,
  fontSize: 'inherit',
  fontWeight: 'inherit',
  placeholder: 'more...',
  height: '40px'
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yZXNwb25zaXZlLW5hdmJhci5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIlJlc3BvbnNpdmVOYXZiYXIiLCJzdGF0ZSIsInVwZGF0ZURpbWVuc3Npb25zIiwibGFzdFZpc2libGVJdGVtSW5kZXgiLCJsYXN0V2lkdGgiLCJpbmRleE9mTGFzdFZpc2libGVOYXZJdGVtIiwiY29udGFpbmVyIiwicmVmcyIsIm5hdmJhckNvbnRhaW5lciIsImNvbnRhaW5lcldpZHRoIiwiZmluZERPTU5vZGUiLCJvZmZzZXRXaWR0aCIsInJlbWFpbmluZ1dpZHRoIiwibGFzdFZpc2libGUiLCJpIiwicHJvcHMiLCJsaXN0IiwibGVuZ3RoIiwiaXRlbSIsIlN0cmluZyIsIm5vZGUiLCJpdGVtV2lkdGgiLCJoYW5kbGVSZXNpemVFdmVudCIsImRpZmZlcmVuY2UiLCJ3aW5kb3ciLCJpbm5lcldpZHRoIiwiVVBEQVRFX1RIUkVTSE9MRCIsIk1hdGgiLCJhYnMiLCJzZXRTdGF0ZSIsInNlbGVjdGlvbkNoYW5nZWQiLCJyb3V0ZXIiLCJwdXNoIiwidmFsdWUiLCJ0b29sdGlwV3JhcHBlciIsImluZGV4IiwidG9vbHRpcENvbnRlbnQiLCJ0b29sdGlwIiwic2hvd05hdkl0ZW1Ub29sdGlwIiwidG9vbHRpcERlbGF5IiwibmF2YmFySXRlbSIsImNsYXNzTmFtZSIsImFjdGl2ZUtleSIsImZvbnRXZWlnaHQiLCJmb250U2l6ZSIsImlkIiwib25TZWxlY3QiLCJocmVmIiwibmFtZSIsIm5hdmJhciIsInNsaWNlIiwic2hvd05hdkl0ZW1Cb3JkZXIiLCJpdGVtcyIsIm1hcCIsIm1pbkhlaWdodCIsImhlaWdodCIsImNvbWJvYm94IiwibGFiZWwiLCJyZWYiLCJpbmFjdGl2ZUJvcmRlciIsImJvcmRlckNsYXNzIiwiYWN0aXZlSXRlbSIsInBsYWNlaG9sZGVyIiwiY29tcG9uZW50RGlkTW91bnQiLCJhZGRFdmVudExpc3RlbmVyIiwic2V0VGltZW91dCIsImNvbXBvbmVudERpZFVwZGF0ZSIsImNvbXBvbmVudFdpbGxVbm1vdW50IiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsInJlbmRlciIsIlB1cmVDb21wb25lbnQiLCJkZWZhdWx0UHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7O0FBS0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7K2VBWEE7QUFDQTtBQUNBO0FBQ0E7O0lBVXFCQSxnQjs7Ozs7Ozs7Ozs7O2dLQUNuQkMsSyxHQUFRO0FBQ05DLHlCQUFtQixJQURiO0FBRU5DLDRCQUFzQixDQUFDLENBRmpCO0FBR05DLGlCQUFXO0FBSEwsSyxRQThCUkMseUIsR0FBNEIsWUFBTTtBQUNoQyxVQUFNQyxZQUFZLE1BQUtDLElBQUwsQ0FBVUMsZUFBNUI7QUFDQSxVQUFNQyxpQkFBaUIsbUJBQVNDLFdBQVQsQ0FBcUJKLFNBQXJCLElBQ3JCLG1CQUFTSSxXQUFULENBQXFCSixTQUFyQixFQUFnQ0ssV0FEWCxHQUN5QixDQURoRDs7QUFHQSxVQUFJQyxpQkFBaUJILGlCQUFpQixHQUF0Qzs7QUFFQSxVQUFJSSxjQUFjLENBQWxCO0FBQ0EsV0FBSyxJQUFJQyxJQUFJLENBQWIsRUFBZ0JBLElBQUksTUFBS0MsS0FBTCxDQUFXQyxJQUFYLENBQWdCQyxNQUFoQixHQUF5QixDQUE3QyxFQUFnREgsS0FBSyxDQUFyRCxFQUF3RDtBQUN0RCxZQUFNSSxPQUFPLE1BQUtYLElBQUwsZ0JBQXVCWSxPQUFPTCxDQUFQLENBQXZCLENBQWI7QUFDQSxZQUFNTSxPQUFPLG1CQUFTVixXQUFULENBQXFCUSxJQUFyQixDQUFiO0FBQ0EsWUFBSSxDQUFDRSxJQUFMLEVBQVc7QUFDVDtBQUNEO0FBQ0QsWUFBTUMsWUFBWUQsS0FBS1QsV0FBdkI7QUFDQUMsMEJBQWtCUyxTQUFsQjtBQUNBLFlBQUlULGlCQUFpQixDQUFyQixFQUF3QjtBQUN0QkMseUJBQWUsQ0FBZjtBQUNBO0FBQ0Q7QUFDREEsdUJBQWUsQ0FBZjtBQUNEOztBQUVELGFBQU9BLFdBQVA7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Z0I7OztBQW9LckJBLGlCQUFpQnVFLFlBQWpCLEdBQWdDO0FBQzlCekIsWUFBVSxJQURvQjtBQUU5QksscUJBQW1CLEtBRlc7QUFHOUJiLHNCQUFvQixJQUhVO0FBSTlCQyxnQkFBYyxJQUpnQjtBQUs5QkssWUFBVSxTQUxvQjtBQU05QkQsY0FBWSxTQU5rQjtBQU85Qm1CLGVBQWEsU0FQaUI7QUFROUJQLFVBQVE7QUFSc0IsQ0FBaEMiLCJmaWxlIjoicmVzcG9uc2l2ZS1uYXZiYXIuY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgcmVhY3Qvbm8tYXJyYXktaW5kZXgta2V5ICovXG4vKiBlc2xpbnQtZGlzYWJsZSByZWFjdC9uby1zdHJpbmctcmVmcyAqL1xuLyogZXNsaW50LWRpc2FibGUgcmVhY3Qvbm8tZmluZC1kb20tbm9kZSAqL1xuLyogZXNsaW50LWRpc2FibGUgcmVhY3QvcHJvcC10eXBlcyAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xuaW1wb3J0IFNlbGVjdCBmcm9tICdyZWFjdC1zZWxlY3QnO1xuaW1wb3J0IHsgT3ZlcmxheVRyaWdnZXIsIFRvb2x0aXAgfSBmcm9tICdyZWFjdC1ib290c3RyYXAnO1xuaW1wb3J0ICdyZWFjdC1zZWxlY3QvZGlzdC9yZWFjdC1zZWxlY3QuY3NzJztcbmltcG9ydCAnLi9yZXNwb25zaXZlLW5hdmJhci5zY3NzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVzcG9uc2l2ZU5hdmJhciBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICBzdGF0ZSA9IHtcbiAgICB1cGRhdGVEaW1lbnNzaW9uczogdHJ1ZSxcbiAgICBsYXN0VmlzaWJsZUl0ZW1JbmRleDogLTEsXG4gICAgbGFzdFdpZHRoOiAwLFxuICB9O1xuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLmhhbmRsZVJlc2l6ZUV2ZW50KTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignb3JpZW50YXRpb25jaGFuZ2UnLCB0aGlzLmhhbmRsZVJlc2l6ZUV2ZW50KTsgLy8gZm9yIG1vYmlsZSBzdXBwb3J0XG4gICAgLy8gQ29tcG9uZW50IGlzIG5vdCByZW5kZXJlZCB5ZXQgYnkgYnJvd3NlciB3aGVuIERpZE1vdW50IGlzIGNhbGxlZFxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5oYW5kbGVSZXNpemVFdmVudCgpO1xuICAgIH0sIDIwMCk7XG4gIH1cblxuICBjb21wb25lbnREaWRVcGRhdGUoKSB7XG4gICAgaWYgKHRoaXMuc3RhdGUudXBkYXRlRGltZW5zc2lvbnMpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIHJlYWN0L25vLWRpZC11cGRhdGUtc2V0LXN0YXRlXG4gICAgICAgIC8vIDJuZCByZW5kZXIgaXMgdHJpZ2dlcmVkIGhlcmUgaW4gcHVycG9zZVxuICAgICAgICB1cGRhdGVEaW1lbnNzaW9uczogZmFsc2UsXG4gICAgICAgIGxhc3RWaXNpYmxlSXRlbUluZGV4OiB0aGlzLmluZGV4T2ZMYXN0VmlzaWJsZU5hdkl0ZW0oKSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLmhhbmRsZVJlc2l6ZUV2ZW50KTtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignb3JpZW50YXRpb25jaGFuZ2UnLCB0aGlzLmhhbmRsZVJlc2l6ZUV2ZW50KTsgLy8gZm9yIG1vYmlsZSBzdXBwb3J0XG4gIH1cblxuICBpbmRleE9mTGFzdFZpc2libGVOYXZJdGVtID0gKCkgPT4ge1xuICAgIGNvbnN0IGNvbnRhaW5lciA9IHRoaXMucmVmcy5uYXZiYXJDb250YWluZXI7XG4gICAgY29uc3QgY29udGFpbmVyV2lkdGggPSBSZWFjdERPTS5maW5kRE9NTm9kZShjb250YWluZXIpID9cbiAgICAgIFJlYWN0RE9NLmZpbmRET01Ob2RlKGNvbnRhaW5lcikub2Zmc2V0V2lkdGggOiAwO1xuXG4gICAgbGV0IHJlbWFpbmluZ1dpZHRoID0gY29udGFpbmVyV2lkdGggLSAxOTU7XG5cbiAgICBsZXQgbGFzdFZpc2libGUgPSAxO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5wcm9wcy5saXN0Lmxlbmd0aCAtIDE7IGkgKz0gMSkge1xuICAgICAgY29uc3QgaXRlbSA9IHRoaXMucmVmc1tgbmF2aXRlbXJlZiR7U3RyaW5nKGkpfWBdO1xuICAgICAgY29uc3Qgbm9kZSA9IFJlYWN0RE9NLmZpbmRET01Ob2RlKGl0ZW0pO1xuICAgICAgaWYgKCFub2RlKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY29uc3QgaXRlbVdpZHRoID0gbm9kZS5vZmZzZXRXaWR0aDtcbiAgICAgIHJlbWFpbmluZ1dpZHRoIC09IGl0ZW1XaWR0aDtcbiAgICAgIGlmIChyZW1haW5pbmdXaWR0aCA8IDApIHtcbiAgICAgICAgbGFzdFZpc2libGUgLT0gMTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBsYXN0VmlzaWJsZSArPSAxO1xuICAgIH1cblxuICAgIHJldHVybiBsYXN0VmlzaWJsZTtcbiAgfVxuXG4gIGhhbmRsZVJlc2l6ZUV2ZW50ID0gKCkgPT4ge1xuICAgIGNvbnN0IGRpZmZlcmVuY2UgPSB3aW5kb3cuaW5uZXJXaWR0aCAtIHRoaXMuc3RhdGUubGFzdFdpZHRoO1xuICAgIGNvbnN0IFVQREFURV9USFJFU0hPTEQgPSA1MDtcbiAgICBpZiAoTWF0aC5hYnMoZGlmZmVyZW5jZSkgPiBVUERBVEVfVEhSRVNIT0xEKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgdXBkYXRlRGltZW5zc2lvbnM6IHRydWUsXG4gICAgICAgIGxhc3RXaWR0aDogd2luZG93LmlubmVyV2lkdGgsXG4gICAgICB9KTtcbiAgICB9XG4gIH1cbiAgc2VsZWN0aW9uQ2hhbmdlZCA9IChpdGVtKSA9PiB7XG4gICAgdGhpcy5wcm9wcy5yb3V0ZXIucHVzaChpdGVtLnZhbHVlKTtcbiAgfVxuXG4gIHRvb2x0aXBXcmFwcGVyID0gKG5vZGUsIGluZGV4LCB0b29sdGlwQ29udGVudCkgPT4ge1xuICAgIGNvbnN0IHRvb2x0aXAgPSA8VG9vbHRpcCBpZD1cInRvb2x0aXBcIj57dG9vbHRpcENvbnRlbnR9PC9Ub29sdGlwPjtcbiAgICByZXR1cm4gIXRoaXMucHJvcHMuc2hvd05hdkl0ZW1Ub29sdGlwID8gbm9kZSA6XG4gICAgPE92ZXJsYXlUcmlnZ2VyIHBsYWNlbWVudD1cImJvdHRvbVwiIGtleT17aW5kZXh9IG92ZXJsYXk9e3Rvb2x0aXB9IGRlbGF5U2hvdz17dGhpcy5wcm9wcy50b29sdGlwRGVsYXl9PlxuICAgICAge25vZGV9XG4gICAgPC9PdmVybGF5VHJpZ2dlcj47XG4gIH1cblxuICBuYXZiYXJJdGVtID0gKGl0ZW0sIGluZGV4LCBjbGFzc05hbWUpID0+IChcbiAgICA8YnV0dG9uXG4gICAgICBjbGFzc05hbWU9e2luZGV4ID09PSB0aGlzLnByb3BzLmFjdGl2ZUtleSAmJlxuICAgICAgICBpbmRleCA8PSB0aGlzLnN0YXRlLmxhc3RWaXNpYmxlSXRlbUluZGV4ID9cbiAgICAgICAgYCR7Y2xhc3NOYW1lfSBzZWxlY3RlZC1ib3JkZXJgIDogYCR7Y2xhc3NOYW1lfWB9XG4gICAgICBzdHlsZT17eyBmb250V2VpZ2h0OiB0aGlzLnByb3BzLmZvbnRXZWlnaHQsIGZvbnRTaXplOiB0aGlzLnByb3BzLmZvbnRTaXplIH19XG4gICAgICBpZD17aXRlbS5pZCB8fCBgbmF2aXRlbXJlZiR7U3RyaW5nKGluZGV4KX1gfVxuICAgICAga2V5PXtpdGVtLmlkIHx8IGBuYXZpdGVtcmVmJHtTdHJpbmcoaW5kZXgpfWB9XG4gICAgICByZWY9e2BuYXZpdGVtcmVmJHtTdHJpbmcoaW5kZXgpfWB9XG4gICAgICBvbkNsaWNrPXsoKSA9PiB7IHRoaXMucHJvcHMub25TZWxlY3QoaXRlbS5ocmVmKTsgfX1cbiAgICA+XG4gICAgICA8c3BhbiBjbGFzc05hbWU9XCJyZXNwb25zaXZlLW5hdmJhci1pdGVtLXRleHRcIj57aXRlbS5uYW1lfTwvc3Bhbj5cbiAgICA8L2J1dHRvbj5cbiAgKVxuXG4gIG5hdmJhciA9ICgpID0+IHtcbiAgICBjb25zdCBsaXN0ID0gdGhpcy5zdGF0ZS5sYXN0VmlzaWJsZUl0ZW1JbmRleCA+PSAwID9cbiAgICAgIHRoaXMucHJvcHMubGlzdC5zbGljZSgwLCB0aGlzLnN0YXRlLmxhc3RWaXNpYmxlSXRlbUluZGV4KVxuICAgICAgOiB0aGlzLnByb3BzLmxpc3Q7XG4gICAgY29uc3QgY2xhc3NOYW1lID0gdGhpcy5wcm9wcy5zaG93TmF2SXRlbUJvcmRlciA/XG4gICAgICAncmVzcG9uc2l2ZS1uYXZiYXItaXRlbSBpbmFjdGl2ZS1ib3JkZXInIDogJ3Jlc3BvbnNpdmUtbmF2YmFyLWl0ZW0nO1xuICAgIGNvbnN0IGl0ZW1zID0gbGlzdC5tYXAoKGl0ZW0sIGluZGV4KSA9PiAoXG4gICAgICB0aGlzLnRvb2x0aXBXcmFwcGVyKHRoaXMubmF2YmFySXRlbShpdGVtLCBpbmRleCwgY2xhc3NOYW1lKSwgaW5kZXgsIGl0ZW0ubmFtZSlcbiAgICApKTtcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2XG4gICAgICAgIGlkPVwicmVzcG9uc2l2ZS1uYXZiYXItY29udGFpbmVyXCJcbiAgICAgICAgcmVmPVwibmF2YmFyQ29udGFpbmVyXCJcbiAgICAgICAgc3R5bGU9e3sgbWluSGVpZ2h0OiB0aGlzLnByb3BzLmhlaWdodCB9fVxuICAgICAgPlxuICAgICAgICB7aXRlbXN9XG4gICAgICAgIHt0aGlzLmNvbWJvYm94KCl9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG5cbiAgY29tYm9ib3ggPSAoKSA9PiB7XG4gICAgaWYgKHRoaXMuc3RhdGUubGFzdFZpc2libGVJdGVtSW5kZXggPT09IC0xIHx8XG4gICAgICAgIHRoaXMuc3RhdGUubGFzdFZpc2libGVJdGVtSW5kZXggPiB0aGlzLnByb3BzLmxpc3QubGVuZ3RoIC0gMSkge1xuICAgICAgLy8gcmV0dXJuIG51bGwgaWYgYWxsIG5hdiBpdGVtcyBhcmUgdmlzaWJsZVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgLy8gc2xpY2UgbmF2IGl0ZW1zIGxpc3QgYW5kIHNob3cgaW52aXNpYmxlIGl0ZW1zIGluIHRoZSBjb21ib2JveFxuICAgIGNvbnN0IGxpc3QgPSB0aGlzLnN0YXRlLmxhc3RWaXNpYmxlSXRlbUluZGV4ID49IDAgP1xuICAgICAgdGhpcy5wcm9wcy5saXN0LnNsaWNlKHRoaXMuc3RhdGUubGFzdFZpc2libGVJdGVtSW5kZXgpXG4gICAgICA6IHRoaXMucHJvcHMubGlzdDtcbiAgICBjb25zdCBpdGVtcyA9IGxpc3QubWFwKChpdGVtLCBpbmRleCkgPT5cbiAgICAgICh7XG4gICAgICAgIHZhbHVlOiBpdGVtLmhyZWYsXG4gICAgICAgIGxhYmVsOiBpdGVtLm5hbWUsXG4gICAgICAgIGlkOiBpbmRleCxcbiAgICAgICAgcmVmOiBgbmF2aXRlbXJlZiR7U3RyaW5nKGluZGV4KX1gLFxuICAgICAgfSkpO1xuXG4gICAgY29uc3QgaW5hY3RpdmVCb3JkZXIgPSB0aGlzLnByb3BzLnNob3dOYXZJdGVtQm9yZGVyID8gJ2luYWN0aXZlLWJvcmRlcicgOiAnJztcbiAgICBjb25zdCBib3JkZXJDbGFzcyA9IHRoaXMucHJvcHMuYWN0aXZlS2V5ID49IHRoaXMuc3RhdGUubGFzdFZpc2libGVJdGVtSW5kZXggP1xuICAgICAgJ3NlbGVjdGVkLWJvcmRlcicgOiBpbmFjdGl2ZUJvcmRlcjtcbiAgICBjb25zdCBhY3RpdmVJdGVtID0gdGhpcy5wcm9wcy5saXN0W3RoaXMucHJvcHMuYWN0aXZlS2V5XTtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdlxuICAgICAgICBpZD1cInJlc3BvbnNpdmUtbmF2YmFyLXNlbGVjdFwiXG4gICAgICAgIGNsYXNzTmFtZT17Ym9yZGVyQ2xhc3N9XG4gICAgICAgIHN0eWxlPXt7IGZvbnRXZWlnaHQ6IHRoaXMucHJvcHMuZm9udFdlaWdodCwgZm9udFNpemU6IHRoaXMucHJvcHMuZm9udFNpemUgfX1cbiAgICAgID5cbiAgICAgICAgPFNlbGVjdFxuICAgICAgICAgIG5hbWU9XCJyZXNwb25zaXZlTmF2YmFyU2VsZWN0XCJcbiAgICAgICAgICBtdWx0aT17ZmFsc2V9XG4gICAgICAgICAgdmFsdWU9e2FjdGl2ZUl0ZW0gPyBhY3RpdmVJdGVtLmhyZWYgOiAnJ31cbiAgICAgICAgICBjbGVhcmFibGU9e2ZhbHNlfVxuICAgICAgICAgIHBsYWNlaG9sZGVyPXt0aGlzLnByb3BzLnBsYWNlaG9sZGVyfVxuICAgICAgICAgIG9wdGlvbnM9e2l0ZW1zfVxuICAgICAgICAgIG9uQ2hhbmdlPXsoaXRlbSkgPT4geyB0aGlzLnByb3BzLm9uU2VsZWN0KGl0ZW0udmFsdWUpOyB9fVxuICAgICAgICAgIGlucHV0UHJvcHM9e3sgaWQ6ICdvY1Jlc3BvbnNpdmVOYXZiYXJTZWxlY3QnIH19XG4gICAgICAgIC8+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiB0aGlzLm5hdmJhcigpO1xuICB9XG59XG5cblJlc3BvbnNpdmVOYXZiYXIuZGVmYXVsdFByb3BzID0ge1xuICBvblNlbGVjdDogbnVsbCxcbiAgc2hvd05hdkl0ZW1Cb3JkZXI6IGZhbHNlLFxuICBzaG93TmF2SXRlbVRvb2x0aXA6IHRydWUsXG4gIHRvb2x0aXBEZWxheTogMjAwMCxcbiAgZm9udFNpemU6ICdpbmhlcml0JyxcbiAgZm9udFdlaWdodDogJ2luaGVyaXQnLFxuICBwbGFjZWhvbGRlcjogJ21vcmUuLi4nLFxuICBoZWlnaHQ6ICc0MHB4Jyxcbn07XG5cblJlc3BvbnNpdmVOYXZiYXIucHJvcFR5cGVzID0ge1xuICBzaG93TmF2SXRlbUJvcmRlcjogUHJvcFR5cGVzLmJvb2wsXG4gIHNob3dOYXZJdGVtVG9vbHRpcDogUHJvcFR5cGVzLmJvb2wsXG4gIHRvb2x0aXBEZWxheTogUHJvcFR5cGVzLm51bWJlcixcbiAgZm9udFNpemU6IFByb3BUeXBlcy5zdHJpbmcsXG4gIGZvbnRXZWlnaHQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gIHBsYWNlaG9sZGVyOiBQcm9wVHlwZXMuc3RyaW5nLFxuICBhY3RpdmVLZXk6IFByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcbiAgbGlzdDogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLnNoYXBlKHtcbiAgICBuYW1lOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgIFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICBQcm9wVHlwZXMubm9kZSxcbiAgICBdKS5pc1JlcXVpcmVkLFxuICAgIGhyZWY6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5udW1iZXJdKSxcbiAgfSkpLmlzUmVxdWlyZWQsXG4gIG9uU2VsZWN0OiBQcm9wVHlwZXMuZnVuYyxcbiAgaGVpZ2h0OiBQcm9wVHlwZXMuc3RyaW5nLFxufTtcbiJdfQ==