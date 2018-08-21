import React from 'react';
import ResponsiveNavbar from '../../src/index';

export default class ComponentView extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: 0,
    };
  }

  render() {
    const list = [
      { id: 'item1', name: 'Style', href: 0 },
      { id: 'item2', name: 'Item 2 longer and longer', href: 1 },
      { id: 'item3', name: 'Item 3 even longer and longer', href: 2 },
      { id: 'item4', name: 'Item 4', href: 3 },
    ];

    return (
      <div style={{ padding: '20px' }}>
        <ResponsiveNavbar
          activeKey={this.state.activeKey}
          id="example-responsive-navigation-bar"
          list={list}
          onSelect={(activeKey) => { this.setState({ activeKey }); }}
        />
      </div>
    );
  }
}
