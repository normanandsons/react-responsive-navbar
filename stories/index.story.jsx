import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, boolean, object, number } from '@storybook/addon-knobs';
import { Store, StateDecorator } from '@sambego/storybook-state';

// Application
import './scss/app.component.scss';
import NavBar from '../src/responsive-navbar.component';
/* eslint-disable no-alert */
/* eslint-disable no-console */

const store = new Store({ activeKey: 0 });
storiesOf('@opuscapita/react-responsive-navbar', module)
  .addDecorator(StateDecorator(store))
  .add('React Responsive NavBar', () => (state) => {
    const list = [
      { name: 'Item 1', href: '/item1' },
      { name: 'Item 2', href: '/item2' },
      { name: 'A bit longer name', href: '/item3' },
      { name: 'This is even longer one', href: '/item4' },
    ];

    const onItemClick = (href) => {
      const index = list.findIndex(item => item.href === href);
      store.set({ activeKey: index });
    };

    const showComponentLeft = boolean('Show component on left', false);
    const showComponentRight = boolean('Show component on right', false);

    const componentLeft = showComponentLeft ?
      <div className="demo-component">Component on left (node)</div> : null;
    const componentRight = showComponentRight ?
      <div className="demo-component">Component on right (node)</div> : null;

    const knobs = {
      list: object('List', list),
      activeKey: state.activeKey,
      onSelect: onItemClick,
      showNavItemBorder: boolean('Show nav item border', false),
      showNavItemToolTip: boolean('Show nav item tooltip', true),
      toolTipDelay: number('Tooltip delay', 2000),
      fontSize: text('Font size', 'inherit'),
      fontWeight: text('Font weight', 'inherit'),
      placeholder: text('Placeholder', 'more...'),
      height: text('Height', '40px'),
    };

    return (
      <NavBar
        {...knobs}
        componentLeft={componentLeft}
        componentRight={componentRight}
      />
    );
  });
