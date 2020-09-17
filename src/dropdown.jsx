import React from 'react';
import PropTypes from 'prop-types';

class DropDown extends React.Component {
  static PropTypes = {
    activeInList: PropTypes.object,
    value: PropTypes.object,
    options: PropTypes.array
  };

  state = {
    open: false,
  };

  handleFocus = () => {
    this.setState({
      open: !this.state.open,
    });
  };

  handleClick = (option) => {
    this.setState({
      open: false,
    });
    option.onSelect && option.onSelect();
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.open && this.dropdownContainer.current) {
      const selected = this.dropdownContainer.current.querySelector('.selected');
      if (selected) {
        this.dropdownContainer.current.scrollTop = selected.offsetTop;
      }
    }
  }

  dropdownContainer = React.createRef();

  render() {
    const {options, activeInList} = this.props;
    if (!options || !options.length) return null;

    return (
      <React.Fragment>
        {activeInList}
        <a className={this.props.className} onClick={this.handleFocus}>
          <i className="fa fa-caret-down" aria-hidden="true" />
        </a>
        {this.state.open ? (
          <div className={'dropdown-options'} ref={this.dropdownContainer}>
            {this.props.options.map((option) => {
              const { onSelect, close: Close, ...rest } = option.options;
              return (
                <div key={option.id} {...rest} onClick={() => this.handleClick(option.options)}>
                  {option.name} {Close}
                </div>
              );
            })}
          </div>
        ) : null}
      </React.Fragment>
    );
  }
}

export default DropDown;
