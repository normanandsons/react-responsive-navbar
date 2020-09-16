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
      open: false
    });
    option.onClick && option.onClick(option);
  }

  render() {
    return (
      <React.Fragment>
        <a className={this.props.className} onClick={this.handleFocus} onBlur={this.handleBlur}>
          <i className="fa fa-caret-down" aria-hidden="true" />
        </a>
        {this.state.open ? (
          <div className={'dropdown-options'}>
            {this.props.options.map((option) => {
              return (
                <div key={option.label} {...option.options} onClick={() => this.handleClick(option)}>
                  {option.label}
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
