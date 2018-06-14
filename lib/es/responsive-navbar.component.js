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
      return React.createElement(
        'div',
        {
          id: _this.getMainPartOfId() + '-select',
          className: 'responsive-navbar-select ' + borderClass,
          style: { fontWeight: _this.props.fontWeight, fontSize: _this.props.fontSize }
        },
        React.createElement(Select, {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yZXNwb25zaXZlLW5hdmJhci5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIlJlYWN0IiwiUHJvcFR5cGVzIiwiUmVhY3RET00iLCJTZWxlY3QiLCJPdmVybGF5VHJpZ2dlciIsIlRvb2x0aXAiLCJSZXNwb25zaXZlTmF2YmFyIiwic3RhdGUiLCJ1cGRhdGVEaW1lbnNzaW9ucyIsImxhc3RWaXNpYmxlSXRlbUluZGV4IiwibGFzdFdpZHRoIiwiZ2V0TWFpblBhcnRPZklkIiwicHJvcHMiLCJpZCIsImluZGV4T2ZMYXN0VmlzaWJsZU5hdkl0ZW0iLCJjb250YWluZXIiLCJyZWZzIiwibmF2YmFyQ29udGFpbmVyIiwiY29udGFpbmVyV2lkdGgiLCJmaW5kRE9NTm9kZSIsIm9mZnNldFdpZHRoIiwicmVtYWluaW5nV2lkdGgiLCJsYXN0VmlzaWJsZSIsImkiLCJsaXN0IiwibGVuZ3RoIiwiaXRlbSIsIlN0cmluZyIsIm5vZGUiLCJpdGVtV2lkdGgiLCJoYW5kbGVSZXNpemVFdmVudCIsImRpZmZlcmVuY2UiLCJ3aW5kb3ciLCJpbm5lcldpZHRoIiwiVVBEQVRFX1RIUkVTSE9MRCIsIk1hdGgiLCJhYnMiLCJzZXRTdGF0ZSIsInNlbGVjdGlvbkNoYW5nZWQiLCJyb3V0ZXIiLCJwdXNoIiwidmFsdWUiLCJ0b29sdGlwV3JhcHBlciIsImluZGV4IiwidG9vbHRpcENvbnRlbnQiLCJ0b29sdGlwIiwic2hvd05hdkl0ZW1Ub29sdGlwIiwidG9vbHRpcERlbGF5IiwibmF2YmFySXRlbSIsImNsYXNzTmFtZSIsImFjdGl2ZUtleSIsImZvbnRXZWlnaHQiLCJmb250U2l6ZSIsIm9uU2VsZWN0IiwiaHJlZiIsIm5hbWUiLCJuYXZiYXIiLCJzbGljZSIsInNob3dOYXZJdGVtQm9yZGVyIiwiaXRlbXMiLCJtYXAiLCJuYXZiYXJTdHlsZSIsIm1pbkhlaWdodCIsImhlaWdodCIsImhlaWdodFB4IiwicGFyc2VJbnQiLCJsaW5lSGVpZ2h0IiwiY29tYm9ib3giLCJsYWJlbCIsInJlZiIsImluYWN0aXZlQm9yZGVyIiwiYm9yZGVyQ2xhc3MiLCJhY3RpdmVJdGVtIiwicGxhY2Vob2xkZXIiLCJjb21wb25lbnREaWRNb3VudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJzZXRUaW1lb3V0IiwiaW5pdGlhbFVwZGF0ZURlbGF5IiwiY29tcG9uZW50RGlkVXBkYXRlIiwiY29tcG9uZW50V2lsbFVubW91bnQiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwicmVuZGVyIiwiUHVyZUNvbXBvbmVudCIsImRlZmF1bHRQcm9wcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU9BLEtBQVAsTUFBa0IsT0FBbEI7QUFDQSxPQUFPQyxTQUFQLE1BQXNCLFlBQXRCO0FBQ0EsT0FBT0MsUUFBUCxNQUFxQixXQUFyQjtBQUNBLE9BQU9DLE1BQVAsTUFBbUIsY0FBbkI7QUFDQSxTQUFTQyxjQUFULEVBQXlCQyxPQUF6QixRQUF3QyxpQkFBeEM7QUFDQSxPQUFPLG9DQUFQO0FBQ0EsT0FBTywwQkFBUDs7SUFFcUJDLGdCOzs7Ozs7Ozs7Ozs7Z0tBbUNuQkMsSyxHQUFRO0FBQ05DLHlCQUFtQixLQURiO0FBRU5DLDRCQUFzQixDQUFDLENBRmpCO0FBR05DLGlCQUFXO0FBSEwsSyxRQThCUkMsZSxHQUFrQjtBQUFBLGFBQU8sTUFBS0MsS0FBTCxDQUFXQyxFQUFYLElBQWlCLG1CQUF4QjtBQUFBLEssUUFFbEJDLHlCLEdBQTRCLFlBQU07QUFDaEMsVUFBTUMsWUFBWSxNQUFLQyxJQUFMLENBQVVDLGVBQTVCO0FBQ0EsVUFBTUMsaUJBQWlCaEIsU0FBU2lCLFdBQVQsQ0FBcUJKLFNBQXJCLElBQ3JCYixTQUFTaUIsV0FBVCxDQUFxQkosU0FBckIsRUFBZ0NLLFdBRFgsR0FDeUIsQ0FEaEQ7O0FBR0EsVUFBSUMsaUJBQWlCSCxpQkFBaUIsR0FBdEM7O0FBRUEsVUFBSUksY0FBYyxDQUFsQjtBQUNBLFdBQUssSUFBSUMsSUFBSSxDQUFiLEVBQWdCQSxJQUFJ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O1NBREh2RSxnQiIsImZpbGUiOiJyZXNwb25zaXZlLW5hdmJhci5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSByZWFjdC9uby1hcnJheS1pbmRleC1rZXkgKi9cbi8qIGVzbGludC1kaXNhYmxlIHJlYWN0L25vLXN0cmluZy1yZWZzICovXG4vKiBlc2xpbnQtZGlzYWJsZSByZWFjdC9uby1maW5kLWRvbS1ub2RlICovXG4vKiBlc2xpbnQtZGlzYWJsZSByZWFjdC9wcm9wLXR5cGVzICovXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xuaW1wb3J0IFNlbGVjdCBmcm9tICdyZWFjdC1zZWxlY3QnO1xuaW1wb3J0IHsgT3ZlcmxheVRyaWdnZXIsIFRvb2x0aXAgfSBmcm9tICdyZWFjdC1ib290c3RyYXAnO1xuaW1wb3J0ICdyZWFjdC1zZWxlY3QvZGlzdC9yZWFjdC1zZWxlY3QuY3NzJztcbmltcG9ydCAnLi9yZXNwb25zaXZlLW5hdmJhci5zY3NzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVzcG9uc2l2ZU5hdmJhciBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgIGlkOiBudWxsLFxuICAgIG9uU2VsZWN0OiBudWxsLFxuICAgIHNob3dOYXZJdGVtQm9yZGVyOiBmYWxzZSxcbiAgICBzaG93TmF2SXRlbVRvb2x0aXA6IHRydWUsXG4gICAgdG9vbHRpcERlbGF5OiAyMDAwLFxuICAgIGZvbnRTaXplOiAnaW5oZXJpdCcsXG4gICAgZm9udFdlaWdodDogJ2luaGVyaXQnLFxuICAgIHBsYWNlaG9sZGVyOiAnbW9yZS4uLicsXG4gICAgaGVpZ2h0OiAnNDBweCcsXG4gICAgaW5pdGlhbFVwZGF0ZURlbGF5OiAyMDAsXG4gIH1cblxuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIGlkOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHNob3dOYXZJdGVtQm9yZGVyOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBzaG93TmF2SXRlbVRvb2x0aXA6IFByb3BUeXBlcy5ib29sLFxuICAgIHRvb2x0aXBEZWxheTogUHJvcFR5cGVzLm51bWJlcixcbiAgICBmb250U2l6ZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBmb250V2VpZ2h0OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIHBsYWNlaG9sZGVyOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGFjdGl2ZUtleTogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuICAgIGxpc3Q6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICBuYW1lOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgICAgUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgUHJvcFR5cGVzLm5vZGUsXG4gICAgICBdKS5pc1JlcXVpcmVkLFxuICAgICAgaHJlZjogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLm51bWJlcl0pLFxuICAgIH0pKS5pc1JlcXVpcmVkLFxuICAgIG9uU2VsZWN0OiBQcm9wVHlwZXMuZnVuYyxcbiAgICBoZWlnaHQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgaW5pdGlhbFVwZGF0ZURlbGF5OiBQcm9wVHlwZXMubnVtYmVyLFxuICB9XG5cbiAgc3RhdGUgPSB7XG4gICAgdXBkYXRlRGltZW5zc2lvbnM6IGZhbHNlLFxuICAgIGxhc3RWaXNpYmxlSXRlbUluZGV4OiAtMSxcbiAgICBsYXN0V2lkdGg6IDAsXG4gIH07XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuaGFuZGxlUmVzaXplRXZlbnQpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdvcmllbnRhdGlvbmNoYW5nZScsIHRoaXMuaGFuZGxlUmVzaXplRXZlbnQpOyAvLyBmb3IgbW9iaWxlIHN1cHBvcnRcbiAgICAvLyBDb21wb25lbnQgaXMgbm90IHJlbmRlcmVkIHlldCBieSBicm93c2VyIHdoZW4gRGlkTW91bnQgaXMgY2FsbGVkXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLmhhbmRsZVJlc2l6ZUV2ZW50KCk7XG4gICAgfSwgdGhpcy5wcm9wcy5pbml0aWFsVXBkYXRlRGVsYXkpO1xuICB9XG5cbiAgY29tcG9uZW50RGlkVXBkYXRlKCkge1xuICAgIGlmICh0aGlzLnN0YXRlLnVwZGF0ZURpbWVuc3Npb25zKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSByZWFjdC9uby1kaWQtdXBkYXRlLXNldC1zdGF0ZVxuICAgICAgICAvLyAybmQgcmVuZGVyIGlzIHRyaWdnZXJlZCBoZXJlIGluIHB1cnBvc2VcbiAgICAgICAgdXBkYXRlRGltZW5zc2lvbnM6IGZhbHNlLFxuICAgICAgICBsYXN0VmlzaWJsZUl0ZW1JbmRleDogdGhpcy5pbmRleE9mTGFzdFZpc2libGVOYXZJdGVtKCksXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5oYW5kbGVSZXNpemVFdmVudCk7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ29yaWVudGF0aW9uY2hhbmdlJywgdGhpcy5oYW5kbGVSZXNpemVFdmVudCk7IC8vIGZvciBtb2JpbGUgc3VwcG9ydFxuICB9XG5cbiAgZ2V0TWFpblBhcnRPZklkID0gKCkgPT4gKHRoaXMucHJvcHMuaWQgfHwgJ3Jlc3BvbnNpdmUtbmF2YmFyJyk7XG5cbiAgaW5kZXhPZkxhc3RWaXNpYmxlTmF2SXRlbSA9ICgpID0+IHtcbiAgICBjb25zdCBjb250YWluZXIgPSB0aGlzLnJlZnMubmF2YmFyQ29udGFpbmVyO1xuICAgIGNvbnN0IGNvbnRhaW5lcldpZHRoID0gUmVhY3RET00uZmluZERPTU5vZGUoY29udGFpbmVyKSA/XG4gICAgICBSZWFjdERPTS5maW5kRE9NTm9kZShjb250YWluZXIpLm9mZnNldFdpZHRoIDogMDtcblxuICAgIGxldCByZW1haW5pbmdXaWR0aCA9IGNvbnRhaW5lcldpZHRoIC0gMTk1O1xuXG4gICAgbGV0IGxhc3RWaXNpYmxlID0gMTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucHJvcHMubGlzdC5sZW5ndGggLSAxOyBpICs9IDEpIHtcbiAgICAgIGNvbnN0IGl0ZW0gPSB0aGlzLnJlZnNbYG5hdml0ZW1yZWYke1N0cmluZyhpKX1gXTtcbiAgICAgIGNvbnN0IG5vZGUgPSBSZWFjdERPTS5maW5kRE9NTm9kZShpdGVtKTtcbiAgICAgIGlmICghbm9kZSkge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNvbnN0IGl0ZW1XaWR0aCA9IG5vZGUub2Zmc2V0V2lkdGg7XG4gICAgICByZW1haW5pbmdXaWR0aCAtPSBpdGVtV2lkdGg7XG4gICAgICBpZiAocmVtYWluaW5nV2lkdGggPCAwKSB7XG4gICAgICAgIGxhc3RWaXNpYmxlIC09IDE7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgbGFzdFZpc2libGUgKz0gMTtcbiAgICB9XG5cbiAgICByZXR1cm4gbGFzdFZpc2libGU7XG4gIH1cblxuICBoYW5kbGVSZXNpemVFdmVudCA9ICgpID0+IHtcbiAgICBjb25zdCBkaWZmZXJlbmNlID0gd2luZG93LmlubmVyV2lkdGggLSB0aGlzLnN0YXRlLmxhc3RXaWR0aDtcbiAgICBjb25zdCBVUERBVEVfVEhSRVNIT0xEID0gNTA7XG4gICAgaWYgKE1hdGguYWJzKGRpZmZlcmVuY2UpID4gVVBEQVRFX1RIUkVTSE9MRCkge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIHVwZGF0ZURpbWVuc3Npb25zOiB0cnVlLFxuICAgICAgICBsYXN0V2lkdGg6IHdpbmRvdy5pbm5lcldpZHRoLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG4gIHNlbGVjdGlvbkNoYW5nZWQgPSAoaXRlbSkgPT4ge1xuICAgIHRoaXMucHJvcHMucm91dGVyLnB1c2goaXRlbS52YWx1ZSk7XG4gIH1cblxuICB0b29sdGlwV3JhcHBlciA9IChub2RlLCBpbmRleCwgdG9vbHRpcENvbnRlbnQpID0+IHtcbiAgICBjb25zdCB0b29sdGlwID0gPFRvb2x0aXAgaWQ9XCJ0b29sdGlwXCI+e3Rvb2x0aXBDb250ZW50fTwvVG9vbHRpcD47XG4gICAgcmV0dXJuICF0aGlzLnByb3BzLnNob3dOYXZJdGVtVG9vbHRpcCA/IG5vZGUgOlxuICAgIDxPdmVybGF5VHJpZ2dlciBwbGFjZW1lbnQ9XCJib3R0b21cIiBrZXk9e2luZGV4fSBvdmVybGF5PXt0b29sdGlwfSBkZWxheVNob3c9e3RoaXMucHJvcHMudG9vbHRpcERlbGF5fT5cbiAgICAgIHtub2RlfVxuICAgIDwvT3ZlcmxheVRyaWdnZXI+O1xuICB9XG5cbiAgbmF2YmFySXRlbSA9IChpdGVtLCBpbmRleCwgY2xhc3NOYW1lKSA9PiAoXG4gICAgPGJ1dHRvblxuICAgICAgY2xhc3NOYW1lPXtpbmRleCA9PT0gdGhpcy5wcm9wcy5hY3RpdmVLZXkgJiZcbiAgICAgICAgaW5kZXggPD0gdGhpcy5zdGF0ZS5sYXN0VmlzaWJsZUl0ZW1JbmRleCA/XG4gICAgICAgIGAke2NsYXNzTmFtZX0gc2VsZWN0ZWQtYm9yZGVyYCA6IGAke2NsYXNzTmFtZX1gfVxuICAgICAgc3R5bGU9e3sgZm9udFdlaWdodDogdGhpcy5wcm9wcy5mb250V2VpZ2h0LCBmb250U2l6ZTogdGhpcy5wcm9wcy5mb250U2l6ZSB9fVxuICAgICAgaWQ9e2l0ZW0uaWQgfHwgYG5hdml0ZW1yZWYke1N0cmluZyhpbmRleCl9YH1cbiAgICAgIGtleT17aXRlbS5pZCB8fCBgbmF2aXRlbXJlZiR7U3RyaW5nKGluZGV4KX1gfVxuICAgICAgcmVmPXtgbmF2aXRlbXJlZiR7U3RyaW5nKGluZGV4KX1gfVxuICAgICAgb25DbGljaz17KCkgPT4geyB0aGlzLnByb3BzLm9uU2VsZWN0KGl0ZW0uaHJlZik7IH19XG4gICAgPlxuICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicmVzcG9uc2l2ZS1uYXZiYXItaXRlbS10ZXh0XCI+e2l0ZW0ubmFtZX08L3NwYW4+XG4gICAgPC9idXR0b24+XG4gIClcblxuICBuYXZiYXIgPSAoKSA9PiB7XG4gICAgY29uc3QgbGlzdCA9IHRoaXMuc3RhdGUubGFzdFZpc2libGVJdGVtSW5kZXggPj0gMCA/XG4gICAgICB0aGlzLnByb3BzLmxpc3Quc2xpY2UoMCwgdGhpcy5zdGF0ZS5sYXN0VmlzaWJsZUl0ZW1JbmRleClcbiAgICAgIDogdGhpcy5wcm9wcy5saXN0O1xuICAgIGNvbnN0IGNsYXNzTmFtZSA9IHRoaXMucHJvcHMuc2hvd05hdkl0ZW1Cb3JkZXIgP1xuICAgICAgJ3Jlc3BvbnNpdmUtbmF2YmFyLWl0ZW0gaW5hY3RpdmUtYm9yZGVyJyA6ICdyZXNwb25zaXZlLW5hdmJhci1pdGVtJztcbiAgICBjb25zdCBpdGVtcyA9IGxpc3QubWFwKChpdGVtLCBpbmRleCkgPT4gKFxuICAgICAgdGhpcy50b29sdGlwV3JhcHBlcih0aGlzLm5hdmJhckl0ZW0oaXRlbSwgaW5kZXgsIGNsYXNzTmFtZSksIGluZGV4LCBpdGVtLm5hbWUpXG4gICAgKSk7XG4gICAgY29uc3QgbmF2YmFyU3R5bGUgPSB7XG4gICAgICBtaW5IZWlnaHQ6IHRoaXMucHJvcHMuaGVpZ2h0LFxuICAgIH07XG4gICAgaWYgKHRoaXMucHJvcHMuaGVpZ2h0LnNsaWNlKC0yKSA9PT0gJ3B4Jykge1xuICAgICAgY29uc3QgaGVpZ2h0UHggPSBwYXJzZUludCh0aGlzLnByb3BzLmhlaWdodC5zbGljZSgwLCAtMiksIDEwKTtcbiAgICAgIG5hdmJhclN0eWxlLmxpbmVIZWlnaHQgPSBgJHsoaGVpZ2h0UHggLSA0KX1weGA7XG4gICAgfVxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2XG4gICAgICAgIGlkPXtgJHt0aGlzLmdldE1haW5QYXJ0T2ZJZCgpfS1jb250YWluZXJgfVxuICAgICAgICByZWY9XCJuYXZiYXJDb250YWluZXJcIlxuICAgICAgICBjbGFzc05hbWU9XCJyZXNwb25zaXZlLW5hdmJhci1jb250YWluZXJcIlxuICAgICAgICBzdHlsZT17bmF2YmFyU3R5bGV9XG4gICAgICA+XG4gICAgICAgIHtpdGVtc31cbiAgICAgICAge3RoaXMuY29tYm9ib3goKX1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cblxuICBjb21ib2JveCA9ICgpID0+IHtcbiAgICBpZiAodGhpcy5zdGF0ZS5sYXN0VmlzaWJsZUl0ZW1JbmRleCA9PT0gLTEgfHxcbiAgICAgICAgdGhpcy5zdGF0ZS5sYXN0VmlzaWJsZUl0ZW1JbmRleCA+IHRoaXMucHJvcHMubGlzdC5sZW5ndGggLSAxKSB7XG4gICAgICAvLyByZXR1cm4gbnVsbCBpZiBhbGwgbmF2IGl0ZW1zIGFyZSB2aXNpYmxlXG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICAvLyBzbGljZSBuYXYgaXRlbXMgbGlzdCBhbmQgc2hvdyBpbnZpc2libGUgaXRlbXMgaW4gdGhlIGNvbWJvYm94XG4gICAgY29uc3QgbGlzdCA9IHRoaXMuc3RhdGUubGFzdFZpc2libGVJdGVtSW5kZXggPj0gMCA/XG4gICAgICB0aGlzLnByb3BzLmxpc3Quc2xpY2UodGhpcy5zdGF0ZS5sYXN0VmlzaWJsZUl0ZW1JbmRleClcbiAgICAgIDogdGhpcy5wcm9wcy5saXN0O1xuICAgIGNvbnN0IGl0ZW1zID0gbGlzdC5tYXAoKGl0ZW0sIGluZGV4KSA9PlxuICAgICAgKHtcbiAgICAgICAgdmFsdWU6IGl0ZW0uaHJlZixcbiAgICAgICAgbGFiZWw6IGl0ZW0ubmFtZSxcbiAgICAgICAgaWQ6IGluZGV4LFxuICAgICAgICByZWY6IGBuYXZpdGVtcmVmJHtTdHJpbmcoaW5kZXgpfWAsXG4gICAgICB9KSk7XG5cbiAgICBjb25zdCBpbmFjdGl2ZUJvcmRlciA9IHRoaXMucHJvcHMuc2hvd05hdkl0ZW1Cb3JkZXIgPyAnaW5hY3RpdmUtYm9yZGVyJyA6ICcnO1xuICAgIGNvbnN0IGJvcmRlckNsYXNzID0gdGhpcy5wcm9wcy5hY3RpdmVLZXkgPj0gdGhpcy5zdGF0ZS5sYXN0VmlzaWJsZUl0ZW1JbmRleCA/XG4gICAgICAnc2VsZWN0ZWQtYm9yZGVyJyA6IGluYWN0aXZlQm9yZGVyO1xuICAgIGNvbnN0IGFjdGl2ZUl0ZW0gPSB0aGlzLnByb3BzLmxpc3RbdGhpcy5wcm9wcy5hY3RpdmVLZXldO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2XG4gICAgICAgIGlkPXtgJHt0aGlzLmdldE1haW5QYXJ0T2ZJZCgpfS1zZWxlY3RgfVxuICAgICAgICBjbGFzc05hbWU9e2ByZXNwb25zaXZlLW5hdmJhci1zZWxlY3QgJHtib3JkZXJDbGFzc31gfVxuICAgICAgICBzdHlsZT17eyBmb250V2VpZ2h0OiB0aGlzLnByb3BzLmZvbnRXZWlnaHQsIGZvbnRTaXplOiB0aGlzLnByb3BzLmZvbnRTaXplIH19XG4gICAgICA+XG4gICAgICAgIDxTZWxlY3RcbiAgICAgICAgICBuYW1lPVwicmVzcG9uc2l2ZU5hdmJhclNlbGVjdFwiXG4gICAgICAgICAgbXVsdGk9e2ZhbHNlfVxuICAgICAgICAgIHZhbHVlPXthY3RpdmVJdGVtID8gYWN0aXZlSXRlbS5ocmVmIDogJyd9XG4gICAgICAgICAgY2xlYXJhYmxlPXtmYWxzZX1cbiAgICAgICAgICBwbGFjZWhvbGRlcj17dGhpcy5wcm9wcy5wbGFjZWhvbGRlcn1cbiAgICAgICAgICBvcHRpb25zPXtpdGVtc31cbiAgICAgICAgICBvbkNoYW5nZT17KGl0ZW0pID0+IHsgdGhpcy5wcm9wcy5vblNlbGVjdChpdGVtLnZhbHVlKTsgfX1cbiAgICAgICAgICBpbnB1dFByb3BzPXt7IGlkOiAnb2NSZXNwb25zaXZlTmF2YmFyU2VsZWN0JyB9fVxuICAgICAgICAvPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gdGhpcy5uYXZiYXIoKTtcbiAgfVxufVxuIl19