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
          style: { "min-height": _this.props.height }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yZXNwb25zaXZlLW5hdmJhci5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIlJlc3BvbnNpdmVOYXZiYXIiLCJzdGF0ZSIsInVwZGF0ZURpbWVuc3Npb25zIiwibGFzdFZpc2libGVJdGVtSW5kZXgiLCJsYXN0V2lkdGgiLCJpbmRleE9mTGFzdFZpc2libGVOYXZJdGVtIiwiY29udGFpbmVyIiwicmVmcyIsIm5hdmJhckNvbnRhaW5lciIsImNvbnRhaW5lcldpZHRoIiwiZmluZERPTU5vZGUiLCJvZmZzZXRXaWR0aCIsInJlbWFpbmluZ1dpZHRoIiwibGFzdFZpc2libGUiLCJpIiwicHJvcHMiLCJsaXN0IiwibGVuZ3RoIiwiaXRlbSIsIlN0cmluZyIsIm5vZGUiLCJpdGVtV2lkdGgiLCJoYW5kbGVSZXNpemVFdmVudCIsImRpZmZlcmVuY2UiLCJ3aW5kb3ciLCJpbm5lcldpZHRoIiwiVVBEQVRFX1RIUkVTSE9MRCIsIk1hdGgiLCJhYnMiLCJzZXRTdGF0ZSIsInNlbGVjdGlvbkNoYW5nZWQiLCJyb3V0ZXIiLCJwdXNoIiwidmFsdWUiLCJ0b29sdGlwV3JhcHBlciIsImluZGV4IiwidG9vbHRpcENvbnRlbnQiLCJ0b29sdGlwIiwic2hvd05hdkl0ZW1Ub29sdGlwIiwidG9vbHRpcERlbGF5IiwibmF2YmFySXRlbSIsImNsYXNzTmFtZSIsImFjdGl2ZUtleSIsImZvbnRXZWlnaHQiLCJmb250U2l6ZSIsImlkIiwib25TZWxlY3QiLCJocmVmIiwibmFtZSIsIm5hdmJhciIsInNsaWNlIiwic2hvd05hdkl0ZW1Cb3JkZXIiLCJpdGVtcyIsIm1hcCIsImhlaWdodCIsImNvbWJvYm94IiwibGFiZWwiLCJyZWYiLCJpbmFjdGl2ZUJvcmRlciIsImJvcmRlckNsYXNzIiwiYWN0aXZlSXRlbSIsInBsYWNlaG9sZGVyIiwiY29tcG9uZW50RGlkTW91bnQiLCJhZGRFdmVudExpc3RlbmVyIiwic2V0VGltZW91dCIsImNvbXBvbmVudERpZFVwZGF0ZSIsImNvbXBvbmVudFdpbGxVbm1vdW50IiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsInJlbmRlciIsIlB1cmVDb21wb25lbnQiLCJkZWZhdWx0UHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7O0FBS0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7K2VBWEE7QUFDQTtBQUNBO0FBQ0E7O0lBVXFCQSxnQjs7Ozs7Ozs7Ozs7O2dLQUVuQkMsSyxHQUFRO0FBQ05DLHlCQUFtQixJQURiO0FBRU5DLDRCQUFzQixDQUFDLENBRmpCO0FBR05DLGlCQUFXO0FBSEwsSyxRQThCUkMseUIsR0FBNEIsWUFBTTtBQUNoQyxVQUFNQyxZQUFZLE1BQUtDLElBQUwsQ0FBVUMsZUFBNUI7QUFDQSxVQUFNQyxpQkFBaUIsbUJBQVNDLFdBQVQsQ0FBcUJKLFNBQXJCLElBQ3JCLG1CQUFTSSxXQUFULENBQXFCSixTQUFyQixFQUFnQ0ssV0FEWCxHQUN5QixDQURoRDs7QUFHQSxVQUFJQyxpQkFBaUJILGlCQUFpQixHQUF0Qzs7QUFFQSxVQUFJSSxjQUFjLENBQWxCO0FBQ0EsV0FBSyxJQUFJQyxJQUFJLENBQWIsRUFBZ0JBLElBQUksTUFBS0MsS0FBTCxDQUFXQyxJQUFYLENBQWdCQyxNQUFoQixHQUF5QixDQUE3QyxFQUFnREgsS0FBSyxDQUFyRCxFQUF3RDtBQUN0RCxZQUFNSSxPQUFPLE1BQUtYLElBQUwsZ0JBQXVCWSxPQUFPTCxDQUFQLENBQXZCLENBQWI7QUFDQSxZQUFNTSxPQUFPLG1CQUFTVixXQUFULENBQXFCUSxJQUFyQixDQUFiO0FBQ0EsWUFBSSxDQUFDRSxJQUFMLEVBQVc7QUFDVDtBQUNEO0FBQ0QsWUFBTUMsWUFBWUQsS0FBS1QsV0FBdkI7QUFDQUMsMEJBQWtCUyxTQUFsQjtBQUNBLFlBQUlULGlCQUFpQixDQUFyQixFQUF3QjtBQUN0QkMseUJBQWUsQ0FBZjtBQUNBO0FBQ0Q7QUFDREEsdUJBQWUsQ0FBZjtBQUNEOztBQUVELGFBQU9BLFdBQVA7QUFDRCxLLFFBRURT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aUJBQWlCc0UsWUFBakIsR0FBZ0M7QUFDOUJ4QixZQUFVLElBRG9CO0FBRTlCSyxxQkFBbUIsS0FGVztBQUc5QmIsc0JBQW9CLElBSFU7QUFJOUJDLGdCQUFjLElBSmdCO0FBSzlCSyxZQUFVLFNBTG9CO0FBTTlCRCxjQUFZLFNBTmtCO0FBTzlCa0IsZUFBYSxTQVBpQjtBQVE5QlAsVUFBUTtBQVJzQixDQUFoQyIsImZpbGUiOiJyZXNwb25zaXZlLW5hdmJhci5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSByZWFjdC9uby1hcnJheS1pbmRleC1rZXkgKi9cclxuLyogZXNsaW50LWRpc2FibGUgcmVhY3Qvbm8tc3RyaW5nLXJlZnMgKi9cclxuLyogZXNsaW50LWRpc2FibGUgcmVhY3Qvbm8tZmluZC1kb20tbm9kZSAqL1xyXG4vKiBlc2xpbnQtZGlzYWJsZSByZWFjdC9wcm9wLXR5cGVzICovXHJcblxyXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xyXG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcclxuaW1wb3J0IFNlbGVjdCBmcm9tICdyZWFjdC1zZWxlY3QnO1xyXG5pbXBvcnQgeyBPdmVybGF5VHJpZ2dlciwgVG9vbHRpcCB9IGZyb20gJ3JlYWN0LWJvb3RzdHJhcCc7XHJcbmltcG9ydCAncmVhY3Qtc2VsZWN0L2Rpc3QvcmVhY3Qtc2VsZWN0LmNzcyc7XHJcbmltcG9ydCAnLi9yZXNwb25zaXZlLW5hdmJhci5zY3NzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlc3BvbnNpdmVOYXZiYXIgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50IHtcclxuXHJcbiAgc3RhdGUgPSB7XHJcbiAgICB1cGRhdGVEaW1lbnNzaW9uczogdHJ1ZSxcclxuICAgIGxhc3RWaXNpYmxlSXRlbUluZGV4OiAtMSxcclxuICAgIGxhc3RXaWR0aDogMCxcclxuICB9O1xyXG5cclxuICBjb21wb25lbnREaWRNb3VudCgpIHtcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLmhhbmRsZVJlc2l6ZUV2ZW50KTtcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdvcmllbnRhdGlvbmNoYW5nZScsIHRoaXMuaGFuZGxlUmVzaXplRXZlbnQpOyAvLyBmb3IgbW9iaWxlIHN1cHBvcnRcclxuICAgIC8vIENvbXBvbmVudCBpcyBub3QgcmVuZGVyZWQgeWV0IGJ5IGJyb3dzZXIgd2hlbiBEaWRNb3VudCBpcyBjYWxsZWRcclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICB0aGlzLmhhbmRsZVJlc2l6ZUV2ZW50KCk7XHJcbiAgICB9LCAyMDApO1xyXG4gIH1cclxuXHJcbiAgY29tcG9uZW50RGlkVXBkYXRlKCkge1xyXG4gICAgaWYgKHRoaXMuc3RhdGUudXBkYXRlRGltZW5zc2lvbnMpIHtcclxuICAgICAgdGhpcy5zZXRTdGF0ZSh7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgcmVhY3Qvbm8tZGlkLXVwZGF0ZS1zZXQtc3RhdGVcclxuICAgICAgICAgICAgICAgICAgICAgIC8vIDJuZCByZW5kZXIgaXMgdHJpZ2dlcmVkIGhlcmUgaW4gcHVycG9zZVxyXG4gICAgICAgIHVwZGF0ZURpbWVuc3Npb25zOiBmYWxzZSxcclxuICAgICAgICBsYXN0VmlzaWJsZUl0ZW1JbmRleDogdGhpcy5pbmRleE9mTGFzdFZpc2libGVOYXZJdGVtKCksXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XHJcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5oYW5kbGVSZXNpemVFdmVudCk7XHJcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignb3JpZW50YXRpb25jaGFuZ2UnLCB0aGlzLmhhbmRsZVJlc2l6ZUV2ZW50KTsgLy8gZm9yIG1vYmlsZSBzdXBwb3J0XHJcbiAgfVxyXG5cclxuICBpbmRleE9mTGFzdFZpc2libGVOYXZJdGVtID0gKCkgPT4ge1xyXG4gICAgY29uc3QgY29udGFpbmVyID0gdGhpcy5yZWZzLm5hdmJhckNvbnRhaW5lcjtcclxuICAgIGNvbnN0IGNvbnRhaW5lcldpZHRoID0gUmVhY3RET00uZmluZERPTU5vZGUoY29udGFpbmVyKSA/XHJcbiAgICAgIFJlYWN0RE9NLmZpbmRET01Ob2RlKGNvbnRhaW5lcikub2Zmc2V0V2lkdGggOiAwO1xyXG5cclxuICAgIGxldCByZW1haW5pbmdXaWR0aCA9IGNvbnRhaW5lcldpZHRoIC0gMTk1O1xyXG5cclxuICAgIGxldCBsYXN0VmlzaWJsZSA9IDE7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucHJvcHMubGlzdC5sZW5ndGggLSAxOyBpICs9IDEpIHtcclxuICAgICAgY29uc3QgaXRlbSA9IHRoaXMucmVmc1tgbmF2aXRlbXJlZiR7U3RyaW5nKGkpfWBdO1xyXG4gICAgICBjb25zdCBub2RlID0gUmVhY3RET00uZmluZERPTU5vZGUoaXRlbSk7XHJcbiAgICAgIGlmICghbm9kZSkge1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGNvbnN0IGl0ZW1XaWR0aCA9IG5vZGUub2Zmc2V0V2lkdGg7XHJcbiAgICAgIHJlbWFpbmluZ1dpZHRoIC09IGl0ZW1XaWR0aDtcclxuICAgICAgaWYgKHJlbWFpbmluZ1dpZHRoIDwgMCkge1xyXG4gICAgICAgIGxhc3RWaXNpYmxlIC09IDE7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgICAgbGFzdFZpc2libGUgKz0gMTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbGFzdFZpc2libGU7XHJcbiAgfVxyXG5cclxuICBoYW5kbGVSZXNpemVFdmVudCA9ICgpID0+IHtcclxuICAgIGNvbnN0IGRpZmZlcmVuY2UgPSB3aW5kb3cuaW5uZXJXaWR0aCAtIHRoaXMuc3RhdGUubGFzdFdpZHRoO1xyXG4gICAgY29uc3QgVVBEQVRFX1RIUkVTSE9MRCA9IDUwO1xyXG4gICAgaWYgKE1hdGguYWJzKGRpZmZlcmVuY2UpID4gVVBEQVRFX1RIUkVTSE9MRCkge1xyXG4gICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICB1cGRhdGVEaW1lbnNzaW9uczogdHJ1ZSxcclxuICAgICAgICBsYXN0V2lkdGg6IHdpbmRvdy5pbm5lcldpZHRoLFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcbiAgc2VsZWN0aW9uQ2hhbmdlZCA9IChpdGVtKSA9PiB7XHJcbiAgICB0aGlzLnByb3BzLnJvdXRlci5wdXNoKGl0ZW0udmFsdWUpO1xyXG4gIH1cclxuXHJcbiAgdG9vbHRpcFdyYXBwZXIgPSAobm9kZSwgaW5kZXgsIHRvb2x0aXBDb250ZW50KSA9PiB7XHJcbiAgICBjb25zdCB0b29sdGlwID0gPFRvb2x0aXAgaWQ9XCJ0b29sdGlwXCI+e3Rvb2x0aXBDb250ZW50fTwvVG9vbHRpcD47XHJcbiAgICByZXR1cm4gIXRoaXMucHJvcHMuc2hvd05hdkl0ZW1Ub29sdGlwID8gbm9kZSA6XHJcbiAgICA8T3ZlcmxheVRyaWdnZXIgcGxhY2VtZW50PVwiYm90dG9tXCIga2V5PXtpbmRleH0gb3ZlcmxheT17dG9vbHRpcH0gZGVsYXlTaG93PXt0aGlzLnByb3BzLnRvb2x0aXBEZWxheX0+XHJcbiAgICAgIHtub2RlfVxyXG4gICAgPC9PdmVybGF5VHJpZ2dlcj47XHJcbiAgfVxyXG5cclxuICBuYXZiYXJJdGVtID0gKGl0ZW0sIGluZGV4LCBjbGFzc05hbWUpID0+IChcclxuICAgIDxidXR0b25cclxuICAgICAgY2xhc3NOYW1lPXtpbmRleCA9PT0gdGhpcy5wcm9wcy5hY3RpdmVLZXkgJiZcclxuICAgICAgICBpbmRleCA8PSB0aGlzLnN0YXRlLmxhc3RWaXNpYmxlSXRlbUluZGV4ID9cclxuICAgICAgICBgJHtjbGFzc05hbWV9IHNlbGVjdGVkLWJvcmRlcmAgOiBgJHtjbGFzc05hbWV9YH1cclxuICAgICAgc3R5bGU9e3sgZm9udFdlaWdodDogdGhpcy5wcm9wcy5mb250V2VpZ2h0LCBmb250U2l6ZTogdGhpcy5wcm9wcy5mb250U2l6ZSB9fVxyXG4gICAgICBpZD17aXRlbS5pZCB8fCBgbmF2aXRlbXJlZiR7U3RyaW5nKGluZGV4KX1gfVxyXG4gICAgICBrZXk9e2l0ZW0uaWQgfHwgYG5hdml0ZW1yZWYke1N0cmluZyhpbmRleCl9YH1cclxuICAgICAgcmVmPXtgbmF2aXRlbXJlZiR7U3RyaW5nKGluZGV4KX1gfVxyXG4gICAgICBvbkNsaWNrPXsoKSA9PiB7IHRoaXMucHJvcHMub25TZWxlY3QoaXRlbS5ocmVmKTsgfX1cclxuICAgID5cclxuICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicmVzcG9uc2l2ZS1uYXZiYXItaXRlbS10ZXh0XCI+e2l0ZW0ubmFtZX08L3NwYW4+XHJcbiAgICA8L2J1dHRvbj5cclxuICApXHJcblxyXG4gIG5hdmJhciA9ICgpID0+IHtcclxuICAgIGNvbnN0IGxpc3QgPSB0aGlzLnN0YXRlLmxhc3RWaXNpYmxlSXRlbUluZGV4ID49IDAgP1xyXG4gICAgICB0aGlzLnByb3BzLmxpc3Quc2xpY2UoMCwgdGhpcy5zdGF0ZS5sYXN0VmlzaWJsZUl0ZW1JbmRleClcclxuICAgICAgOiB0aGlzLnByb3BzLmxpc3Q7XHJcbiAgICBjb25zdCBjbGFzc05hbWUgPSB0aGlzLnByb3BzLnNob3dOYXZJdGVtQm9yZGVyID9cclxuICAgICAgJ3Jlc3BvbnNpdmUtbmF2YmFyLWl0ZW0gaW5hY3RpdmUtYm9yZGVyJyA6ICdyZXNwb25zaXZlLW5hdmJhci1pdGVtJztcclxuICAgIGNvbnN0IGl0ZW1zID0gbGlzdC5tYXAoKGl0ZW0sIGluZGV4KSA9PiAoXHJcbiAgICAgIHRoaXMudG9vbHRpcFdyYXBwZXIodGhpcy5uYXZiYXJJdGVtKGl0ZW0sIGluZGV4LCBjbGFzc05hbWUpLCBpbmRleCwgaXRlbS5uYW1lKVxyXG4gICAgKSk7XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgPGRpdlxyXG4gICAgICAgIGlkPVwicmVzcG9uc2l2ZS1uYXZiYXItY29udGFpbmVyXCJcclxuICAgICAgICByZWY9eyduYXZiYXJDb250YWluZXInfVxyXG4gICAgICAgIHN0eWxlPXt7IFwibWluLWhlaWdodFwiOiB0aGlzLnByb3BzLmhlaWdodCB9fVxyXG4gICAgICA+XHJcbiAgICAgICAge2l0ZW1zfVxyXG4gICAgICAgIHt0aGlzLmNvbWJvYm94KCl9XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIGNvbWJvYm94ID0gKCkgPT4ge1xyXG4gICAgaWYgKHRoaXMuc3RhdGUubGFzdFZpc2libGVJdGVtSW5kZXggPT09IC0xIHx8XHJcbiAgICAgICAgdGhpcy5zdGF0ZS5sYXN0VmlzaWJsZUl0ZW1JbmRleCA+IHRoaXMucHJvcHMubGlzdC5sZW5ndGggLSAxKSB7XHJcbiAgICAgIC8vIHJldHVybiBudWxsIGlmIGFsbCBuYXYgaXRlbXMgYXJlIHZpc2libGVcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gc2xpY2UgbmF2IGl0ZW1zIGxpc3QgYW5kIHNob3cgaW52aXNpYmxlIGl0ZW1zIGluIHRoZSBjb21ib2JveFxyXG4gICAgY29uc3QgbGlzdCA9IHRoaXMuc3RhdGUubGFzdFZpc2libGVJdGVtSW5kZXggPj0gMCA/XHJcbiAgICAgIHRoaXMucHJvcHMubGlzdC5zbGljZSh0aGlzLnN0YXRlLmxhc3RWaXNpYmxlSXRlbUluZGV4KVxyXG4gICAgICA6IHRoaXMucHJvcHMubGlzdDtcclxuICAgIGNvbnN0IGl0ZW1zID0gbGlzdC5tYXAoKGl0ZW0sIGluZGV4KSA9PlxyXG4gICAgICAoe1xyXG4gICAgICAgIHZhbHVlOiBpdGVtLmhyZWYsXHJcbiAgICAgICAgbGFiZWw6IGl0ZW0ubmFtZSxcclxuICAgICAgICBpZDogaW5kZXgsXHJcbiAgICAgICAgcmVmOiBgbmF2aXRlbXJlZiR7U3RyaW5nKGluZGV4KX1gLFxyXG4gICAgICB9KSxcclxuICAgICk7XHJcblxyXG4gICAgY29uc3QgaW5hY3RpdmVCb3JkZXIgPSB0aGlzLnByb3BzLnNob3dOYXZJdGVtQm9yZGVyID8gJ2luYWN0aXZlLWJvcmRlcicgOiAnJztcclxuICAgIGNvbnN0IGJvcmRlckNsYXNzID0gdGhpcy5wcm9wcy5hY3RpdmVLZXkgPj0gdGhpcy5zdGF0ZS5sYXN0VmlzaWJsZUl0ZW1JbmRleCA/XHJcbiAgICAnc2VsZWN0ZWQtYm9yZGVyJyA6IGluYWN0aXZlQm9yZGVyO1xyXG4gICAgY29uc3QgYWN0aXZlSXRlbSA9IHRoaXMucHJvcHMubGlzdFt0aGlzLnByb3BzLmFjdGl2ZUtleV07XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8ZGl2XHJcbiAgICAgICAgaWQ9XCJyZXNwb25zaXZlLW5hdmJhci1zZWxlY3RcIlxyXG4gICAgICAgIGNsYXNzTmFtZT17Ym9yZGVyQ2xhc3N9XHJcbiAgICAgICAgc3R5bGU9e3sgZm9udFdlaWdodDogdGhpcy5wcm9wcy5mb250V2VpZ2h0LCBmb250U2l6ZTogdGhpcy5wcm9wcy5mb250U2l6ZSB9fVxyXG4gICAgICA+XHJcbiAgICAgICAgPFNlbGVjdFxyXG4gICAgICAgICAgbmFtZT1cInJlc3BvbnNpdmVOYXZiYXJTZWxlY3RcIlxyXG4gICAgICAgICAgbXVsdGk9e2ZhbHNlfVxyXG4gICAgICAgICAgdmFsdWU9e2FjdGl2ZUl0ZW0gPyBhY3RpdmVJdGVtLmhyZWYgOiAnJ31cclxuICAgICAgICAgIGNsZWFyYWJsZT17ZmFsc2V9XHJcbiAgICAgICAgICBwbGFjZWhvbGRlcj17dGhpcy5wcm9wcy5wbGFjZWhvbGRlcn1cclxuICAgICAgICAgIG9wdGlvbnM9e2l0ZW1zfVxyXG4gICAgICAgICAgb25DaGFuZ2U9eyhpdGVtKSA9PiB7IHRoaXMucHJvcHMub25TZWxlY3QoaXRlbS52YWx1ZSk7IH19XHJcbiAgICAgICAgICBpbnB1dFByb3BzPXt7IGlkOiAnb2NSZXNwb25zaXZlTmF2YmFyU2VsZWN0JyB9fVxyXG4gICAgICAgIC8+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHJlbmRlcigpIHtcclxuICAgIHJldHVybiB0aGlzLm5hdmJhcigpO1xyXG4gIH1cclxufVxyXG5cclxuUmVzcG9uc2l2ZU5hdmJhci5kZWZhdWx0UHJvcHMgPSB7XHJcbiAgb25TZWxlY3Q6IG51bGwsXHJcbiAgc2hvd05hdkl0ZW1Cb3JkZXI6IGZhbHNlLFxyXG4gIHNob3dOYXZJdGVtVG9vbHRpcDogdHJ1ZSxcclxuICB0b29sdGlwRGVsYXk6IDIwMDAsXHJcbiAgZm9udFNpemU6ICdpbmhlcml0JyxcclxuICBmb250V2VpZ2h0OiAnaW5oZXJpdCcsXHJcbiAgcGxhY2Vob2xkZXI6ICdtb3JlLi4uJyxcclxuICBoZWlnaHQ6ICc0MHB4JyxcclxufTtcclxuXHJcblJlc3BvbnNpdmVOYXZiYXIucHJvcFR5cGVzID0ge1xyXG4gIHNob3dOYXZJdGVtQm9yZGVyOiBQcm9wVHlwZXMuYm9vbCxcclxuICBzaG93TmF2SXRlbVRvb2x0aXA6IFByb3BUeXBlcy5ib29sLFxyXG4gIHRvb2x0aXBEZWxheTogUHJvcFR5cGVzLm51bWJlcixcclxuICBmb250U2l6ZTogUHJvcFR5cGVzLnN0cmluZyxcclxuICBmb250V2VpZ2h0OiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gIHBsYWNlaG9sZGVyOiBQcm9wVHlwZXMuc3RyaW5nLFxyXG4gIGFjdGl2ZUtleTogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxyXG4gIGxpc3Q6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5zaGFwZSh7XHJcbiAgICBuYW1lOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcclxuICAgICAgUHJvcFR5cGVzLnN0cmluZyxcclxuICAgICAgUHJvcFR5cGVzLm5vZGUsXHJcbiAgICBdKS5pc1JlcXVpcmVkLFxyXG4gICAgaHJlZjogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLm51bWJlcl0pLFxyXG4gIH0pKS5pc1JlcXVpcmVkLFxyXG4gIG9uU2VsZWN0OiBQcm9wVHlwZXMuZnVuYyxcclxuICBoZWlnaHQ6IFByb3BUeXBlcy5zdHJpbmcsXHJcbn07XHJcbiJdfQ==