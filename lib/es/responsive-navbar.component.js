var _class, _temp2;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* eslint-disable react/no-array-index-key */
/* eslint-disable react/no-string-refs */
/* eslint-disable react/no-find-dom-node */
/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import Select from 'react-select';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import 'react-select/dist/react-select.css';
import './responsive-navbar.scss';

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
      var containerWidth = ReactDOM.findDOMNode(container) ? ReactDOM.findDOMNode(container).offsetWidth : 0;

      var remainingWidth = containerWidth - 195;

      var lastVisible = 1;
      for (var i = 0; i < _this.props.list.length - 1; i += 1) {
        var item = _this.refs['navitemref' + String(i)];
        var node = ReactDOM.findDOMNode(item);
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
      var tooltip = React.createElement(
        Tooltip,
        { id: 'tooltip' },
        tooltipContent
      );
      return !_this.props.showNavItemTooltip ? node : React.createElement(
        OverlayTrigger,
        { placement: 'bottom', key: index, overlay: tooltip, delayShow: _this.props.tooltipDelay },
        node
      );
    }, _this.navbarItem = function (item, index, className) {
      return React.createElement(
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
        React.createElement(
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
      return React.createElement(
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
      return React.createElement(
        'div',
        {
          id: _this.getMainPartOfId() + '-select',
          className: 'responsive-navbar-select ' + borderClass,
          style: { fontWeight: fontWeight, fontSize: fontSize }
        },
        React.createElement(Select, {
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
}(React.PureComponent), _class.defaultProps = {
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
export { ResponsiveNavbar as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yZXNwb25zaXZlLW5hdmJhci5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIlJlYWN0IiwiUHJvcFR5cGVzIiwiUmVhY3RET00iLCJTZWxlY3QiLCJPdmVybGF5VHJpZ2dlciIsIlRvb2x0aXAiLCJSZXNwb25zaXZlTmF2YmFyIiwic3RhdGUiLCJ1cGRhdGVEaW1lbnNzaW9ucyIsImxhc3RWaXNpYmxlSXRlbUluZGV4IiwibGFzdFdpZHRoIiwiZ2V0TWFpblBhcnRPZklkIiwicHJvcHMiLCJpZCIsImluZGV4T2ZMYXN0VmlzaWJsZU5hdkl0ZW0iLCJjb250YWluZXIiLCJyZWZzIiwibmF2YmFyQ29udGFpbmVyIiwiY29udGFpbmVyV2lkdGgiLCJmaW5kRE9NTm9kZSIsIm9mZnNldFdpZHRoIiwicmVtYWluaW5nV2lkdGgiLCJsYXN0VmlzaWJsZSIsImkiLCJsaXN0IiwibGVuZ3RoIiwiaXRlbSIsIlN0cmluZyIsIm5vZGUiLCJpdGVtV2lkdGgiLCJoYW5kbGVSZXNpemVFdmVudCIsImRpZmZlcmVuY2UiLCJ3aW5kb3ciLCJpbm5lcldpZHRoIiwiVVBEQVRFX1RIUkVTSE9MRCIsIk1hdGgiLCJhYnMiLCJzZXRTdGF0ZSIsInNlbGVjdGlvbkNoYW5nZWQiLCJyb3V0ZXIiLCJwdXNoIiwidmFsdWUiLCJ0b29sdGlwV3JhcHBlciIsImluZGV4IiwidG9vbHRpcENvbnRlbnQiLCJ0b29sdGlwIiwic2hvd05hdkl0ZW1Ub29sdGlwIiwidG9vbHRpcERlbGF5IiwibmF2YmFySXRlbSIsImNsYXNzTmFtZSIsImFjdGl2ZUtleSIsImZvbnRXZWlnaHQiLCJmb250U2l6ZSIsIm9uU2VsZWN0IiwiaHJlZiIsIm5hbWUiLCJkb0xpbmVDb3VudCIsInNvbWUiLCJuYXZiYXIiLCJzbGljZSIsInNob3dOYXZJdGVtQm9yZGVyIiwiaXRlbXMiLCJtYXAiLCJsaW5lQ291bnQiLCJuYXZiYXJTdHlsZSIsIm1pbkhlaWdodCIsImhlaWdodCIsImhlaWdodFB4IiwicGFyc2VJbnQiLCJsaW5lSGVpZ2h0IiwiY29tYm9ib3giLCJwbGFjZWhvbGRlciIsIm5hdkxpc3QiLCJsYWJlbCIsInJlZiIsImxpbmVDb3VudE5lZWRlZCIsImN1c3RvbUxpbmVDb3VudCIsImN1c3RvbUJvcmRlckNsYXNzIiwiY3VzdG9tSW5hY3RpdmVCb3JkZXIiLCJpbmFjdGl2ZUJvcmRlciIsImJvcmRlckNsYXNzIiwiYWN0aXZlSXRlbSIsImNvbXBvbmVudERpZE1vdW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsInNldFRpbWVvdXQiLCJpbml0aWFsVXBkYXRlRGVsYXkiLCJjb21wb25lbnREaWRVcGRhdGUiLCJjb21wb25lbnRXaWxsVW5tb3VudCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJyZW5kZXIiLCJQdXJlQ29tcG9uZW50IiwiZGVmYXVsdFByb3BzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBT0EsS0FBUCxNQUFrQixPQUFsQjtBQUNBLE9BQU9DLFNBQVAsTUFBc0IsWUFBdEI7QUFDQSxPQUFPQyxRQUFQLE1BQXFCLFdBQXJCO0FBQ0EsT0FBT0MsTUFBUCxNQUFtQixjQUFuQjtBQUNBLFNBQVNDLGNBQVQsRUFBeUJDLE9BQXpCLFFBQXdDLGlCQUF4QztBQUNBLE9BQU8sb0NBQVA7QUFDQSxPQUFPLDBCQUFQOztJQUVxQkMsZ0I7Ozs7Ozs7Ozs7OztnS0FtQ25CQyxLLEdBQVE7QUFDTkMseUJBQW1CLEtBRGI7QUFFTkMsNEJBQXNCLENBQUMsQ0FGakI7QUFHTkMsaUJBQVc7QUFITCxLLFFBOEJSQyxlLEdBQWtCO0FBQUEsYUFBTyxNQUFLQyxLQUFMLENBQVdDLEVBQVgsSUFBaUIsbUJBQXhCO0FBQUEsSyxRQUVsQkMseUIsR0FBNEIsWUFBTTtBQUNoQyxVQUFNQyxZQUFZLE1BQUtDLElBQUwsQ0FBVUMsZUFBNUI7QUFDQSxVQUFNQyxpQkFBaUJoQixTQUFTaUIsV0FBVCxDQUFxQkosU0FBckIsSUFDckJiLFNBQVNpQixXQUFULENBQXFCSixT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TCxDQUFjLEVBQUU7QUFDZDtBQUNBN0IsMkJBQW1CLEtBRlA7QUFHWkMsOEJBQXNCLEtBQUtLLHlCQUFMO0FBSFYsT0FBZDtBQUtEO0FBQ0YsRzs7NkJBRUR5RSxvQixtQ0FBdUI7QUFDckJ2RCxXQUFPd0QsbUJBQVAsQ0FBMkIsUUFBM0IsRUFBcUMsS0FBSzFELGlCQUExQztBQUNBRSxXQUFPd0QsbUJBQVAsQ0FBMkIsbUJBQTNCLEVBQWdELEtBQUsxRCxpQkFBckQsRUFGcUIsQ0FFb0Q7QUFDMUUsRzs7NkJBMkpEMkQsTSxxQkFBUztBQUNQLFdBQU8sS0FBSy9CLE1BQUwsRUFBUDtBQUNELEc7OztFQTVOMkMxRCxNQUFNMEYsYSxVQXNCM0NDLFksR0FBZTtBQUNwQjlFLE1BQUksSUFEZ0I7QUFFcEJ3QyxZQUFVLElBRlU7QUFHcEJPLHFCQUFtQixLQUhDO0FBSXBCZCxzQkFBb0IsSUFKQTtBQUtwQkMsZ0JBQWMsSUFMTTtBQU1wQkssWUFBVSxTQU5VO0FBT3BCRCxjQUFZLFNBUFE7QUFRcEJvQixlQUFhLFNBUk87QUFTcEJMLFVBQVEsTUFUWTtBQVVwQm1CLHNCQUFvQjtBQVZBLEM7U0F0QkgvRSxnQiIsImZpbGUiOiJyZXNwb25zaXZlLW5hdmJhci5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSByZWFjdC9uby1hcnJheS1pbmRleC1rZXkgKi9cbi8qIGVzbGludC1kaXNhYmxlIHJlYWN0L25vLXN0cmluZy1yZWZzICovXG4vKiBlc2xpbnQtZGlzYWJsZSByZWFjdC9uby1maW5kLWRvbS1ub2RlICovXG4vKiBlc2xpbnQtZGlzYWJsZSByZWFjdC9wcm9wLXR5cGVzICovXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xuaW1wb3J0IFNlbGVjdCBmcm9tICdyZWFjdC1zZWxlY3QnO1xuaW1wb3J0IHsgT3ZlcmxheVRyaWdnZXIsIFRvb2x0aXAgfSBmcm9tICdyZWFjdC1ib290c3RyYXAnO1xuaW1wb3J0ICdyZWFjdC1zZWxlY3QvZGlzdC9yZWFjdC1zZWxlY3QuY3NzJztcbmltcG9ydCAnLi9yZXNwb25zaXZlLW5hdmJhci5zY3NzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVzcG9uc2l2ZU5hdmJhciBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIGlkOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHNob3dOYXZJdGVtQm9yZGVyOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93TmF2SXRlbVRvb2x0aXA6IFByb3BUeXBlcy5ib29sLFxuICAgIHRvb2x0aXBEZWxheTogUHJvcFR5cGVzLm51bWJlcixcbiAgICBmb250U2l6ZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBmb250V2VpZ2h0OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHBsYWNlaG9sZGVyOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGFjdGl2ZUtleTogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuICAgIGxpc3Q6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICBuYW1lOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgICAgUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgUHJvcFR5cGVzLm5vZGUsXG4gICAgICBdKS5pc1JlcXVpcmVkLFxuICAgICAgaHJlZjogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLm51bWJlcl0pLFxuICAgIH0pKS5pc1JlcXVpcmVkLFxuICAgIG9uU2VsZWN0OiBQcm9wVHlwZXMuZnVuYyxcbiAgICBoZWlnaHQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgaW5pdGlhbFVwZGF0ZURlbGF5OiBQcm9wVHlwZXMubnVtYmVyLFxuICB9XG5cbiAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICBpZDogbnVsbCxcbiAgICBvblNlbGVjdDogbnVsbCxcbiAgICBzaG93TmF2SXRlbUJvcmRlcjogZmFsc2UsXG4gICAgc2hvd05hdkl0ZW1Ub29sdGlwOiB0cnVlLFxuICAgIHRvb2x0aXBEZWxheTogMjAwMCxcbiAgICBmb250U2l6ZTogJ2luaGVyaXQnLFxuICAgIGZvbnRXZWlnaHQ6ICdpbmhlcml0JyxcbiAgICBwbGFjZWhvbGRlcjogJ21vcmUuLi4nLFxuICAgIGhlaWdodDogJzQwcHgnLFxuICAgIGluaXRpYWxVcGRhdGVEZWxheTogMjAwLFxuICB9XG5cbiAgc3RhdGUgPSB7XG4gICAgdXBkYXRlRGltZW5zc2lvbnM6IGZhbHNlLFxuICAgIGxhc3RWaXNpYmxlSXRlbUluZGV4OiAtMSxcbiAgICBsYXN0V2lkdGg6IDAsXG4gIH07XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuaGFuZGxlUmVzaXplRXZlbnQpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdvcmllbnRhdGlvbmNoYW5nZScsIHRoaXMuaGFuZGxlUmVzaXplRXZlbnQpOyAvLyBmb3IgbW9iaWxlIHN1cHBvcnRcbiAgICAvLyBDb21wb25lbnQgaXMgbm90IHJlbmRlcmVkIHlldCBieSBicm93c2VyIHdoZW4gRGlkTW91bnQgaXMgY2FsbGVkXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLmhhbmRsZVJlc2l6ZUV2ZW50KCk7XG4gICAgfSwgdGhpcy5wcm9wcy5pbml0aWFsVXBkYXRlRGVsYXkpO1xuICB9XG5cbiAgY29tcG9uZW50RGlkVXBkYXRlKCkge1xuICAgIGlmICh0aGlzLnN0YXRlLnVwZGF0ZURpbWVuc3Npb25zKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSByZWFjdC9uby1kaWQtdXBkYXRlLXNldC1zdGF0ZVxuICAgICAgICAvLyAybmQgcmVuZGVyIGlzIHRyaWdnZXJlZCBoZXJlIGluIHB1cnBvc2VcbiAgICAgICAgdXBkYXRlRGltZW5zc2lvbnM6IGZhbHNlLFxuICAgICAgICBsYXN0VmlzaWJsZUl0ZW1JbmRleDogdGhpcy5pbmRleE9mTGFzdFZpc2libGVOYXZJdGVtKCksXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5oYW5kbGVSZXNpemVFdmVudCk7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ29yaWVudGF0aW9uY2hhbmdlJywgdGhpcy5oYW5kbGVSZXNpemVFdmVudCk7IC8vIGZvciBtb2JpbGUgc3VwcG9ydFxuICB9XG5cbiAgZ2V0TWFpblBhcnRPZklkID0gKCkgPT4gKHRoaXMucHJvcHMuaWQgfHwgJ3Jlc3BvbnNpdmUtbmF2YmFyJyk7XG5cbiAgaW5kZXhPZkxhc3RWaXNpYmxlTmF2SXRlbSA9ICgpID0+IHtcbiAgICBjb25zdCBjb250YWluZXIgPSB0aGlzLnJlZnMubmF2YmFyQ29udGFpbmVyO1xuICAgIGNvbnN0IGNvbnRhaW5lcldpZHRoID0gUmVhY3RET00uZmluZERPTU5vZGUoY29udGFpbmVyKSA/XG4gICAgICBSZWFjdERPTS5maW5kRE9NTm9kZShjb250YWluZXIpLm9mZnNldFdpZHRoIDogMDtcblxuICAgIGxldCByZW1haW5pbmdXaWR0aCA9IGNvbnRhaW5lcldpZHRoIC0gMTk1O1xuXG4gICAgbGV0IGxhc3RWaXNpYmxlID0gMTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucHJvcHMubGlzdC5sZW5ndGggLSAxOyBpICs9IDEpIHtcbiAgICAgIGNvbnN0IGl0ZW0gPSB0aGlzLnJlZnNbYG5hdml0ZW1yZWYke1N0cmluZyhpKX1gXTtcbiAgICAgIGNvbnN0IG5vZGUgPSBSZWFjdERPTS5maW5kRE9NTm9kZShpdGVtKTtcbiAgICAgIGlmICghbm9kZSkge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNvbnN0IGl0ZW1XaWR0aCA9IG5vZGUub2Zmc2V0V2lkdGg7XG4gICAgICByZW1haW5pbmdXaWR0aCAtPSBpdGVtV2lkdGg7XG4gICAgICBpZiAocmVtYWluaW5nV2lkdGggPCAwKSB7XG4gICAgICAgIGxhc3RWaXNpYmxlIC09IDE7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgbGFzdFZpc2libGUgKz0gMTtcbiAgICB9XG5cbiAgICByZXR1cm4gbGFzdFZpc2libGU7XG4gIH1cblxuICBoYW5kbGVSZXNpemVFdmVudCA9ICgpID0+IHtcbiAgICBjb25zdCBkaWZmZXJlbmNlID0gd2luZG93LmlubmVyV2lkdGggLSB0aGlzLnN0YXRlLmxhc3RXaWR0aDtcbiAgICBjb25zdCBVUERBVEVfVEhSRVNIT0xEID0gNTA7XG4gICAgaWYgKE1hdGguYWJzKGRpZmZlcmVuY2UpID4gVVBEQVRFX1RIUkVTSE9MRCkge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIHVwZGF0ZURpbWVuc3Npb25zOiB0cnVlLFxuICAgICAgICBsYXN0V2lkdGg6IHdpbmRvdy5pbm5lcldpZHRoLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG4gIHNlbGVjdGlvbkNoYW5nZWQgPSAoaXRlbSkgPT4ge1xuICAgIHRoaXMucHJvcHMucm91dGVyLnB1c2goaXRlbS52YWx1ZSk7XG4gIH1cblxuICB0b29sdGlwV3JhcHBlciA9IChub2RlLCBpbmRleCwgdG9vbHRpcENvbnRlbnQpID0+IHtcbiAgICBjb25zdCB0b29sdGlwID0gPFRvb2x0aXAgaWQ9XCJ0b29sdGlwXCI+e3Rvb2x0aXBDb250ZW50fTwvVG9vbHRpcD47XG4gICAgcmV0dXJuICF0aGlzLnByb3BzLnNob3dOYXZJdGVtVG9vbHRpcCA/IG5vZGUgOlxuICAgIDxPdmVybGF5VHJpZ2dlciBwbGFjZW1lbnQ9XCJib3R0b21cIiBrZXk9e2luZGV4fSBvdmVybGF5PXt0b29sdGlwfSBkZWxheVNob3c9e3RoaXMucHJvcHMudG9vbHRpcERlbGF5fT5cbiAgICAgIHtub2RlfVxuICAgIDwvT3ZlcmxheVRyaWdnZXI+O1xuICB9XG5cbiAgbmF2YmFySXRlbSA9IChpdGVtLCBpbmRleCwgY2xhc3NOYW1lKSA9PiAoXG4gICAgPGJ1dHRvblxuICAgICAgY2xhc3NOYW1lPXtpbmRleCA9PT0gdGhpcy5wcm9wcy5hY3RpdmVLZXkgJiZcbiAgICAgICAgaW5kZXggPD0gdGhpcy5zdGF0ZS5sYXN0VmlzaWJsZUl0ZW1JbmRleCA/XG4gICAgICAgIGAke2NsYXNzTmFtZX0gc2VsZWN0ZWQtYm9yZGVyYCA6IGAke2NsYXNzTmFtZX1gfVxuICAgICAgc3R5bGU9e3sgZm9udFdlaWdodDogdGhpcy5wcm9wcy5mb250V2VpZ2h0LCBmb250U2l6ZTogdGhpcy5wcm9wcy5mb250U2l6ZSB9fVxuICAgICAgaWQ9e2l0ZW0uaWQgfHwgYG5hdml0ZW1yZWYke1N0cmluZyhpbmRleCl9YH1cbiAgICAgIGtleT17aXRlbS5pZCB8fCBgbmF2aXRlbXJlZiR7U3RyaW5nKGluZGV4KX1gfVxuICAgICAgcmVmPXtgbmF2aXRlbXJlZiR7U3RyaW5nKGluZGV4KX1gfVxuICAgICAgb25DbGljaz17KCkgPT4geyB0aGlzLnByb3BzLm9uU2VsZWN0KGl0ZW0uaHJlZik7IH19XG4gICAgPlxuICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicmVzcG9uc2l2ZS1uYXZiYXItaXRlbS10ZXh0XCI+e2l0ZW0ubmFtZX08L3NwYW4+XG4gICAgPC9idXR0b24+XG4gIClcblxuICBkb0xpbmVDb3VudCA9ICgpID0+IHtcbiAgICBjb25zdCB7IGxpc3QgfSA9IHRoaXMucHJvcHM7XG4gICAgcmV0dXJuIGxpc3Quc29tZShpdGVtID0+IHR5cGVvZiAoaXRlbS5uYW1lKSAhPT0gJ3N0cmluZycpO1xuICB9XG5cbiAgbmF2YmFyID0gKCkgPT4ge1xuICAgIGNvbnN0IGxpc3QgPSB0aGlzLnN0YXRlLmxhc3RWaXNpYmxlSXRlbUluZGV4ID49IDAgP1xuICAgICAgdGhpcy5wcm9wcy5saXN0LnNsaWNlKDAsIHRoaXMuc3RhdGUubGFzdFZpc2libGVJdGVtSW5kZXgpXG4gICAgICA6IHRoaXMucHJvcHMubGlzdDtcbiAgICBjb25zdCBjbGFzc05hbWUgPSB0aGlzLnByb3BzLnNob3dOYXZJdGVtQm9yZGVyID9cbiAgICAgICdyZXNwb25zaXZlLW5hdmJhci1pdGVtIGluYWN0aXZlLWJvcmRlcicgOiAncmVzcG9uc2l2ZS1uYXZiYXItaXRlbSBuby1pdGVtLWJvcmRlcic7XG4gICAgY29uc3QgaXRlbXMgPSBsaXN0Lm1hcCgoaXRlbSwgaW5kZXgpID0+IChcbiAgICAgIHRoaXMudG9vbHRpcFdyYXBwZXIodGhpcy5uYXZiYXJJdGVtKGl0ZW0sIGluZGV4LCBjbGFzc05hbWUpLCBpbmRleCwgaXRlbS5uYW1lKVxuICAgICkpO1xuICAgIGNvbnN0IGxpbmVDb3VudCA9IHRoaXMuZG9MaW5lQ291bnQoKTtcbiAgICBjb25zdCBuYXZiYXJTdHlsZSA9IHtcbiAgICAgIG1pbkhlaWdodDogdGhpcy5wcm9wcy5oZWlnaHQsXG4gICAgfTtcbiAgICBpZiAodGhpcy5wcm9wcy5oZWlnaHQuc2xpY2UoLTIpID09PSAncHgnICYmIGxpbmVDb3VudCkge1xuICAgICAgY29uc3QgaGVpZ2h0UHggPSBwYXJzZUludCh0aGlzLnByb3BzLmhlaWdodC5zbGljZSgwLCAtMiksIDEwKTtcbiAgICAgIG5hdmJhclN0eWxlLmxpbmVIZWlnaHQgPSBgJHsoaGVpZ2h0UHggLSA0KX1weGA7XG4gICAgfVxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2XG4gICAgICAgIGlkPXtgJHt0aGlzLmdldE1haW5QYXJ0T2ZJZCgpfS1jb250YWluZXJgfVxuICAgICAgICByZWY9XCJuYXZiYXJDb250YWluZXJcIlxuICAgICAgICBjbGFzc05hbWU9XCJyZXNwb25zaXZlLW5hdmJhci1jb250YWluZXJcIlxuICAgICAgICBzdHlsZT17bmF2YmFyU3R5bGV9XG4gICAgICA+XG4gICAgICAgIHtpdGVtc31cbiAgICAgICAge3RoaXMuY29tYm9ib3goKX1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cblxuICBjb21ib2JveCA9ICgpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBsaXN0LFxuICAgICAgb25TZWxlY3QsXG4gICAgICBmb250U2l6ZSxcbiAgICAgIGFjdGl2ZUtleSxcbiAgICAgIGZvbnRXZWlnaHQsXG4gICAgICBwbGFjZWhvbGRlcixcbiAgICAgIHNob3dOYXZJdGVtQm9yZGVyLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIGlmICh0aGlzLnN0YXRlLmxhc3RWaXNpYmxlSXRlbUluZGV4ID09PSAtMSB8fFxuICAgICAgICB0aGlzLnN0YXRlLmxhc3RWaXNpYmxlSXRlbUluZGV4ID4gbGlzdC5sZW5ndGggLSAxKSB7XG4gICAgICAvLyByZXR1cm4gbnVsbCBpZiBhbGwgbmF2IGl0ZW1zIGFyZSB2aXNpYmxlXG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICAvLyBzbGljZSBuYXYgaXRlbXMgbGlzdCBhbmQgc2hvdyBpbnZpc2libGUgaXRlbXMgaW4gdGhlIGNvbWJvYm94XG4gICAgY29uc3QgbmF2TGlzdCA9IHRoaXMuc3RhdGUubGFzdFZpc2libGVJdGVtSW5kZXggPj0gMCA/XG4gICAgICBsaXN0LnNsaWNlKHRoaXMuc3RhdGUubGFzdFZpc2libGVJdGVtSW5kZXgpIDogbGlzdDtcbiAgICBjb25zdCBpdGVtcyA9IG5hdkxpc3QubWFwKChpdGVtLCBpbmRleCkgPT5cbiAgICAgICh7XG4gICAgICAgIHZhbHVlOiBpdGVtLmhyZWYsXG4gICAgICAgIGxhYmVsOiBpdGVtLm5hbWUsXG4gICAgICAgIGlkOiBpbmRleCxcbiAgICAgICAgcmVmOiBgbmF2aXRlbXJlZiR7U3RyaW5nKGluZGV4KX1gLFxuICAgICAgfSkpO1xuICAgIGNvbnN0IGxpbmVDb3VudE5lZWRlZCA9IHRoaXMuZG9MaW5lQ291bnQoKTtcbiAgICBjb25zdCBjdXN0b21MaW5lQ291bnQgPSBsaW5lQ291bnROZWVkZWQgPyAnbGluZS1jb3VudCcgOiAnJztcbiAgICBjb25zdCBjdXN0b21Cb3JkZXJDbGFzcyA9IGxpbmVDb3VudE5lZWRlZCA/ICdzZWxlY3RlZC1ib3JkZXIgbGluZS1jb3VudCcgOiAnc2VsZWN0ZWQtYm9yZGVyJztcbiAgICBjb25zdCBjdXN0b21JbmFjdGl2ZUJvcmRlciA9IGxpbmVDb3VudE5lZWRlZCA/ICdpbmFjdGl2ZS1ib3JkZXIgbGluZS1jb3VudCcgOiAnaW5hY3RpdmUtYm9yZGVyJztcbiAgICBjb25zdCBpbmFjdGl2ZUJvcmRlciA9IHNob3dOYXZJdGVtQm9yZGVyID8gY3VzdG9tSW5hY3RpdmVCb3JkZXIgOiBjdXN0b21MaW5lQ291bnQ7XG4gICAgY29uc3QgYm9yZGVyQ2xhc3MgPSBhY3RpdmVLZXkgPj0gdGhpcy5zdGF0ZS5sYXN0VmlzaWJsZUl0ZW1JbmRleCA/IGN1c3RvbUJvcmRlckNsYXNzIDogaW5hY3RpdmVCb3JkZXI7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICBjb25zdCBhY3RpdmVJdGVtID0gbGlzdFthY3RpdmVLZXldO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2XG4gICAgICAgIGlkPXtgJHt0aGlzLmdldE1haW5QYXJ0T2ZJZCgpfS1zZWxlY3RgfVxuICAgICAgICBjbGFzc05hbWU9e2ByZXNwb25zaXZlLW5hdmJhci1zZWxlY3QgJHtib3JkZXJDbGFzc31gfVxuICAgICAgICBzdHlsZT17eyBmb250V2VpZ2h0LCBmb250U2l6ZSB9fVxuICAgICAgPlxuICAgICAgICA8U2VsZWN0XG4gICAgICAgICAgbmFtZT1cInJlc3BvbnNpdmVOYXZiYXJTZWxlY3RcIlxuICAgICAgICAgIG11bHRpPXtmYWxzZX1cbiAgICAgICAgICB2YWx1ZT17YWN0aXZlSXRlbSA/IGFjdGl2ZUl0ZW0uaHJlZiA6ICcnfVxuICAgICAgICAgIGNsZWFyYWJsZT17ZmFsc2V9XG4gICAgICAgICAgcGxhY2Vob2xkZXI9e3BsYWNlaG9sZGVyfVxuICAgICAgICAgIG9wdGlvbnM9e2l0ZW1zfVxuICAgICAgICAgIG9uQ2hhbmdlPXsoaXRlbSkgPT4geyBvblNlbGVjdChpdGVtLnZhbHVlKTsgfX1cbiAgICAgICAgICBpbnB1dFByb3BzPXt7IGlkOiAnb2NSZXNwb25zaXZlTmF2YmFyU2VsZWN0JyB9fVxuICAgICAgICAvPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gdGhpcy5uYXZiYXIoKTtcbiAgfVxufVxuIl19