import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import ResponsiveNavbar from '../../src/index';

// Example Custom Component

const Ex1 = props => (
  <div id="custom-1-component" style={{ height: '100%' }}>
    <span>{props.name}</span>
  </div>
);

Ex1.propTypes = { name: PropTypes.string.isRequired };

const Ex2 = props => (<span style={{ color: 'red' }}>{props.name}</span>);
Ex2.propTypes = { name: PropTypes.string.isRequired };

const defaultItems = [
  { id: 'item1', name: 'Style', href: 0 },
  { id: 'item2', name: 'Item 2 longer and longer', href: 1 },
  { id: 'item3', name: 'Item 3 even longer and longer', href: 2 },
  { id: 'item4', name: 'Item 4', href: 3 },
];

const withComponents = [
  ...defaultItems,
  ...[
    { id: 'item5', name: 'Item 5', href: 4 },
    { id: 'item6', name: <Ex1 name="Item 6 is a custom component" />, href: 5 },
    { id: 'item7', name: 'Item 7', href: 6 },
    { id: 'item8', name: <Ex2 name="Item 8 is simple span element" />, href: 7 },
  ]];

const ExamplesMapper = (exampleId) => {
  switch (exampleId) {
    case 2: {
      return {
        id: 'example2-responsive-navigation-bar',
        list: withComponents,
        showNavItemBorder: true,
      };
    }
    case 3: {
      return {
        id: 'example3-responsive-navigation-bar',
        list: withComponents,
        showNavItemBorder: true,
        height: '65px',
      };
    }
    case 4: {
      return {
        id: 'example4-responsive-navigation-bar',
        list: defaultItems,
        showNavItemBorder: false,
      };
    }
    case 5: {
      return {
        id: 'example5-responsive-navigation-bar',
        list: withComponents,
        showNavItemBorder: false,
      };
    }
    case 6: {
      return {
        id: 'example5-responsive-navigation-bar',
        list: withComponents,
        showNavItemBorder: false,
        height: '65px',
      };
    }
    case 7: {
      return {
        id: 'example5-responsive-navigation-bar',
        list: defaultItems,
        componentRight: <Button>Button</Button>,
      };
    }
    default: {
      return {
        id: 'example1-responsive-navigation-bar',
        list: defaultItems,
        showNavItemBorder: true,
      };
    }
  }
};
export default class ComponentView extends React.PureComponent {
  static propTypes = {
    exampleId: PropTypes.number,
  };
  static defaultProps = {
    exampleId: 1,
  };

  constructor(props) {
    super(props);
    this.state = {
      activeKey: 0,
    };
  }

  render() {
    const exampleProps = ExamplesMapper(this.props.exampleId);
    return (
      <div style={{ padding: '20px' }}>
        <ResponsiveNavbar
          activeKey={this.state.activeKey}
          onSelect={(activeKey) => { this.setState({ activeKey }); }}
          {...exampleProps}
        />
      </div>
    );
  }
}
