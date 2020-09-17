import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { debounce } from 'debounce';
import DropDown from './dropdown';

export default class ResponsiveTabPills extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    allowClose: PropTypes.bool,
    onClose: PropTypes.func,
    allowReorder: PropTypes.bool,
    navRenderer: PropTypes.func,
    className: PropTypes.string,
    fontSize: PropTypes.string,
    fontWeight: PropTypes.string,
    activeKey: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.number]).isRequired,
    list: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      })
    ).isRequired,
    onSelect: PropTypes.func,
    height: PropTypes.string,
  };

  static defaultProps = {
    id: 'responsive-navbar',
    className: '',
    onSelect: () => {},
    onClose: () => {},
    allowClose: false,
    allowReorder: false,
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

  handleOnClick = (id, index) => {
    this.props.onSelect(id, index);
  };

  handleClose = (event, id, index) => {
    // don't bubble to click also, we got rid of this
    event.stopPropagation();
    this.props.onClose(id, index);
  };

  dragStart = (index) => {
    this.setState({
      dragFrom: index,
    });
  };

  dragEnter = (index, e) => {
    e.target.classList.add('droppable');
    this.setState({
      dragTo: index,
    });
  };

  dragLeave = (index, e) => {
    e.target.classList.remove('droppable');
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
    const { activeKey, fontWeight, fontSize, height, allowClose, navRenderer, allowReorder } = this.props;

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
          onDragStart: (e) => this.dragStart(index, e),
          onDragEnter: (e) => this.dragEnter(index, e),
          onDragLeave: (e) => this.dragLeave(index, e),
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
        key={item.id || `navitem${String(index)}`}
        onClick={() => this.handleOnClick(item.id, index)}
        ref={(r) => {
          if (r && !this.itemWidths[index]) this.itemWidths[index] = r.offsetWidth;
        }}
      >
        <span className='tab-pill-item'>
          {item.name}
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
          {allowClose && <i tabIndex={index + 1} role='button' className='fa fa-times' onClick={(event) => this.handleClose(event, item.id, index)} />}
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
    return list.findIndex((item) => item.id === activeItem.value);
  };

  // Render combobox, when all items do not fit
  combobox = () => {
    const { id, list, fontSize, fontWeight, allowReorder, activeKey, allowClose } = this.props;
    if (!this.state.isSelectVisible) {
      // return null if all nav items are visible
      return null;
    }

    // slice nav items list and show invisible items in the combobox
    const navList = this.state.lastVisibleItemIndex > -2 ? list.slice(this.state.lastVisibleItemIndex + 1) : list;
    const selectOptions = navList.map((item, index) => {
      const realIndex = index + this.state.lastVisibleItemIndex + 1;

      const dragOptions = allowReorder
        ? {
          onDragStart: (e) => this.dragStart(realIndex, e),
          onDragEnter: (e) => this.dragEnter(realIndex, e),
          onDragLeave: (e) => this.dragLeave(index, e),
          onDragEnd: this.dragDrop,
          draggable: true,
        }
        : {};

      const dropdownOptions = {
        className: classnames('dropdown-option', { selected: list[activeKey].id === item.id }),
        close: allowClose ? (
          <i role='button' className='fa fa-times' onClick={(event) => this.handleClose(event, item.id, realIndex)} />
        ) : null,
        onSelect: () => {
          this.handleOnClick(item.id, realIndex);
        },
        ...dragOptions
      };


      return {
        ...item,
        options: dropdownOptions
      };
    });

    const lineCountNeeded = this.doLineCount();
    const customBorderClass = lineCountNeeded ? 'selected line-count' : 'selected';
    const inactiveBorder = lineCountNeeded ? 'inactive line-count' : 'inactive';
    // Resolve activeItem
    const activeItem = this.resolveActiveItemFromOptions(selectOptions);
    const activeItemIndex = this.activeItemIndex(activeItem);
    const borderClass = activeItemIndex >= this.state.lastVisibleItemIndex + 1 ? customBorderClass : inactiveBorder; // eslint-disable-line

    return (
      <div
        id={`${id}-select`}
        className={`responsive-tab-dropdown ${borderClass}`}
        style={{ fontWeight, fontSize }}
        ref={(r) => {
          this.selectContainerRef = r;
        }}
      >
        <DropDown value={list[activeKey]} options={selectOptions} />
      </div>
    );
  };

  render() {
    const { id, className, list, height } = this.props;
    const visibleList = this.state.lastVisibleItemIndex > -2 ? list.slice(0, this.state.lastVisibleItemIndex + 1) : list;
    const itemClassName = 'responsive-navbar-item inactive-border';
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
        className={classnames(`responsive-tab-pills-dropdown`, className)}
        style={navbarStyle}
      >
        {items}
        {this.combobox()}
      </div>
    );
  }
}
