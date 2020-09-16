/* eslint-disable react/no-find-dom-node */
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { FloatingSelect } from '@opuscapita/react-floating-select';
import { debounce } from 'debounce';
import DropDown from './dropdown';

export default class ResponsiveNavbar extends React.PureComponent {
  static propTypes = {
    id: PropTypes.string,
    allowClose: PropTypes.bool,
    onClose: PropTypes.func,
    allowReorder: PropTypes.bool,
    navRenderer: PropTypes.func,
    className: PropTypes.string,
    showNavItemBorder: PropTypes.bool,
    fontSize: PropTypes.string,
    fontWeight: PropTypes.string,
    placeholder: PropTypes.string,
    activeKey: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.number]).isRequired,
    list: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
        href: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      })
    ).isRequired,
    onSelect: PropTypes.func,
    height: PropTypes.string,
    componentLeft: PropTypes.node,
    componentRight: PropTypes.node,
  };

  static defaultProps = {
    id: 'responsive-navbar',
    className: '',
    onSelect: () => {},
    onClose: () => {},
    allowClose: false,
    allowReorder: false,
    showNavItemBorder: false,
    fontSize: 'inherit',
    fontWeight: 'inherit',
    placeholder: 'more...',
    height: 30,
    componentLeft: null,
    componentRight: null,
  };

  constructor(props) {
    super(props);
    this.itemWidths = []; // store item widths here, they don't change
  }

  state = {
    dragFrom: null,
    dragTo: null,
    isSelectVisible: false,
    lastVisibleItemIndex: -2,
  };

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    window.addEventListener('orientationchange', this.refreshLastVisibleItem); // for mobile support
    this.refreshLastVisibleItem();
  }

  componentDidUpdate(prevProps, prevState) {
    // Refresh visible items if values change
    if (this.state.isSelectVisible !== prevState.isSelectVisible || this.state.lastVisibleItemIndex !== prevState.lastVisibleItemIndex) {
      this.refreshLastVisibleItem();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
    window.removeEventListener('orientationchange', this.refreshLastVisibleItem); // for mobile support
  }

  getLastVisibleItemIndex = () => {
    const navBarWidth = this.navbarContainerRef ? this.navbarContainerRef.offsetWidth : 0;
    const selectWidth = this.selectContainerRef ? this.selectContainerRef.offsetWidth : 0;
    const componentLeftWidth = this.componentLeftContainerRef ? this.componentLeftContainerRef.offsetWidth : 0; // eslint-disable-line
    const componentRightWidth = this.componentRightContainerRef ? this.componentRightContainerRef.offsetWidth : 0; // eslint-disable-line

    let remainingWidth = navBarWidth - selectWidth - componentLeftWidth - componentRightWidth;
    let lastVisible = 0;

    for (let i = 0; i < this.props.list.length; i += 1) {
      remainingWidth -= this.itemWidths[i];
      if (remainingWidth < 0) {
        lastVisible -= 1;
        break;
      }
      lastVisible += 1;
    }

    return lastVisible;
  };

  handleResize = () => debounce(this.refreshLastVisibleItem(), 300);

  refreshLastVisibleItem = () => {
    const lastVisibleItemIndex = this.getLastVisibleItemIndex();
    if (this.state.lastVisibleItemIndex !== lastVisibleItemIndex) {
      this.setState({
        isSelectVisible: this.props.list.length > lastVisibleItemIndex + 1,
        lastVisibleItemIndex,
      });
    }
  };

  // Handle navbar onClick
  handleOnClick = (href, index) => {
    this.props.onSelect(href, index);
  };

  dragStart = (index) => {
    this.setState({
      dragFrom: index,
    });
  };

  dragEnter = (index) => {
    this.setState({
      dragTo: index,
    });
  };

  dragDrop = () => {
    if (this.props.onReorder) {
      const { dragFrom, dragTo } = this.state;
      const newList = this.props.list.slice();
      const moved = newList[dragFrom];

      newList.splice(dragFrom, 1);
      newList.splice(dragTo, 0, moved);

      this.props.onReorder(newList, dragFrom, dragTo);
      this.props.onSelect(moved, dragTo);

      this.setState({
        dragTo: null,
        dragFrom: null,
      });
    }
  };

  // Render navbar item
  navbarItem = (item, index, className) => {
    const { activeKey, fontWeight, fontSize, height, allowClose, onClose, navRenderer, allowReorder } = this.props;

    if (navRenderer) {
      return navRenderer(item, index, className, activeKey === index);
    }

    // resolve activeKeyIndex
    let activeKeyIndex = activeKey;
    if (typeof activeKey === 'object') {
      activeKeyIndex = this.activeItemIndex(activeKey);
    }

    const buttonClass = classnames(className, 'grabbable', {
      selected: index === activeKeyIndex,
      'with-close': allowClose,
    });

    const dragOptions = allowReorder
      ? {
          onDragStart: () => this.dragStart(index),
          onDragEnter: () => this.dragEnter(index),
          onDragEnd: this.dragDrop,
          draggable: true,
        }
      : {};

    return (
      <button
        {...dragOptions}
        className={buttonClass}
        style={{ fontWeight, fontSize, minHeight: height }}
        id={item.id || `navItem${String(index)}`}
        key={item.href || `navitem${String(index)}`}
        onClick={() => this.handleOnClick(item.href, index)}
        ref={(r) => {
          if (r && !this.itemWidths[index]) this.itemWidths[index] = r.offsetWidth;
        }}
      >
        <span className="responsive-navbar-item-text">
          {item.name}
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
          {allowClose && <i tabIndex={index + 1} role="button" className="fa fa-times" onClick={() => onClose(item.href, index)} />}
        </span>
      </button>
    );
  };

  doLineCount = () => {
    const { list } = this.props;
    return list.some((item) => typeof item.name !== 'string');
  };

  resolveActiveItemFromOptions = (selectOptions) => {
    const { activeKey } = this.props;
    let activeItem = selectOptions.find((opts) => opts.value === activeKey);
    if (!activeItem) {
      activeItem = selectOptions.find((opts) => opts.value === activeKey.value);
    }
    return activeItem;
  };

  activeItemIndex = (activeItem) => {
    const { list } = this.props;
    if (!activeItem) return null;
    return list.findIndex((item) => item.href === activeItem.value);
  };

  // Render combobox, when all items do not fit
  combobox = () => {
    const { id, list, fontSize, fontWeight, placeholder, showNavItemBorder, allowReorder } = this.props;
    if (!this.state.isSelectVisible) {
      // return null if all nav items are visible
      return null;
    }

    // slice nav items list and show invisible items in the combobox
    const navList = this.state.lastVisibleItemIndex > -2 ? list.slice(this.state.lastVisibleItemIndex + 1) : list;
    const selectOptions = navList.map((item, index) => {
      const realIndex = index + this.state.lastVisibleItemIndex + 1;
      const dragOptions = allowReorder ? {
        onDragStart: () => this.dragStart(realIndex),
        onDragEnter: () => this.dragEnter(realIndex),
        onDragEnd: this.dragDrop,
        draggable: true,
        className: classnames('dropdown-option', {'is-selected': false}),
        onClick: () => this.handleOnClick(item.href, realIndex)
      } : {};
      return {
        value: item.href,
        label: item.name,
        options: dragOptions
      };
    });

    const lineCountNeeded = this.doLineCount();
    const customLineCount = lineCountNeeded ? 'line-count' : '';
    const customBorderClass = lineCountNeeded ? 'selected line-count' : 'selected';
    const customInactiveBorder = lineCountNeeded ? 'inactive line-count' : 'inactive';
    const inactiveBorder = showNavItemBorder ? customInactiveBorder : customLineCount;
    // Resolve activeItem
    const activeItem = this.resolveActiveItemFromOptions(selectOptions);
    const activeItemIndex = this.activeItemIndex(activeItem);
    const borderClass = activeItemIndex >= this.state.lastVisibleItemIndex + 1 ? customBorderClass : inactiveBorder; // eslint-disable-line

    return (
      <div
        id={`${id}-select`}
        className={`responsive-navbar-select ${borderClass}`}
        style={{ fontWeight, fontSize }}
        ref={(r) => {
          this.selectContainerRef = r;
        }}
      >
        {/*<FloatingSelect*/}
        {/*  name={`${id}-select-component`}*/}
        {/*  value={activeItem || ''}*/}
        {/*  isClearable={false}*/}
        {/*  placeholder={placeholder}*/}
        {/*  options={selectOptions}*/}
        {/*  onChange={this.handleOnChange}*/}
        {/*/>*/}
        <DropDown value={activeItem || ''} options={selectOptions} />
      </div>
    );
  };

  // Render custom left side component
  componentLeft = () => {
    const { componentLeft } = this.props;
    if (!componentLeft) return null;
    return (
      <div
        className="responsive-navbar-container-left"
        ref={(r) => {
          this.componentLeftContainerRef = r;
        }}
      >
        {componentLeft}
      </div>
    );
  };

  // Render custom right side component
  componentRight = () => {
    const { componentRight } = this.props;
    if (!componentRight) return null;
    return (
      <div
        className="responsive-navbar-container-right"
        ref={(r) => {
          this.componentRightContainerRef = r;
        }}
      >
        {componentRight}
      </div>
    );
  };

  render() {
    const { id, className, list, showNavItemBorder, height } = this.props;
    const visibleList = this.state.lastVisibleItemIndex > -2 ? list.slice(0, this.state.lastVisibleItemIndex + 1) : list;
    const itemClassName = showNavItemBorder ? 'responsive-navbar-item inactive-border' : 'responsive-navbar-item no-item-border';
    const items = visibleList.map((item, index) => this.navbarItem(item, index, itemClassName));
    const lineCount = this.doLineCount();
    const navbarStyle = {
      minHeight: height,
      maxHeight: height,
    };
    if (height.slice(-2) === 'px' && lineCount) {
      const heightPx = parseInt(height.slice(0, -2), 10);
      navbarStyle.lineHeight = `${heightPx - 4}px`;
    }
    return (
      <div
        id={`${id}-container`}
        ref={(r) => {
          this.navbarContainerRef = r;
        }}
        className={classnames(`responsive-navbar-container`, className)}
        style={navbarStyle}
      >
        {items}
        {this.combobox()}
        {this.componentLeft()}
        {this.componentRight()}
      </div>
    );
  }
}
