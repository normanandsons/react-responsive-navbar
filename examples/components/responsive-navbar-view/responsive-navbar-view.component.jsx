import React from 'react';
import { ResponsiveNavbar } from '../../../src/index';
import './responsive-navbar-view.scss';


class ResponsiveNavbarView extends React.Component {

  state = {
    activeKey: 0,
  };

  render() {
    const list = [
      { id: 'item1', name: 'Style', href: 0 },
      { id: 'item2', name: 'Item 2 longer and longer', href: 1 },
      { id: 'item3', name: 'Item 3 even longer and longer', href: 2 },
      { id: 'item4', name: 'Item 4', href: 3 },
    ];

    return (
      <div className="navbar-top-margin">
        <ResponsiveNavbar
          activeKey={this.state.activeKey}
          list={list}
          showNavItemBorder
          onSelect={(activeKey) => { this.setState({ activeKey }); }}
        />
      </div>
    );
  }
}

export default ResponsiveNavbarView;
