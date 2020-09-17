import React from 'react';
// import PropTypes from 'prop-types';
// import classnames from 'classnames';

class DropDown extends React.Component {
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

  render() {
    return (
      <React.Fragment>
        <a className={this.props.className} onClick={this.handleFocus}>
          <i className="fa fa-caret-down" aria-hidden="true" />
        </a>
        {this.state.open ? (
          <div className={'dropdown-options'}>
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
