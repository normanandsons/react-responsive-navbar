import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, boolean, object, number } from '@storybook/addon-knobs';
import { Store, StateDecorator } from '@sambego/storybook-state';

// Application
import './scss/app.component.scss';
import NavBar from '../src/responsive-navbar.component';
/* eslint-disable no-alert */
/* eslint-disable no-console */
const list = [
  {
    name: 'A',
    href: 0,
  },
  {
    name: 'AAL',
    href: 1,
  },
  {
    name: 'AAP',
    href: 2,
  },
  {
    name: 'AAPL',
    href: 3,
  },
  {
    name: 'ABBV',
    href: 4,
  },
  {
    name: 'ABC',
    href: 5,
  },
  {
    name: 'ABMD',
    href: 6,
  },
  {
    name: 'ABT',
    href: 7,
  },
  {
    name: 'ACN',
    href: 8,
  },
  {
    name: 'ADBE',
    href: 9,
  },
  {
    name: 'ADI',
    href: 10,
  },
  {
    name: 'ADM',
    href: 11,
  },
  {
    name: 'ADP',
    href: 12,
  },
  {
    name: 'ADS',
    href: 13,
  },
  {
    name: 'ADSK',
    href: 14,
  },
  {
    name: 'AEE',
    href: 15,
  },
  {
    name: 'AEP',
    href: 16,
  },
  {
    name: 'AES',
    href: 17,
  },
  {
    name: 'AFL',
    href: 18,
  },
  {
    name: 'AGN',
    href: 19,
  },
  {
    name: 'AIG',
    href: 20,
  },
  {
    name: 'AIV',
    href: 21,
  },
  {
    name: 'AIZ',
    href: 22,
  },
  {
    name: 'AJG',
    href: 23,
  },
  {
    name: 'AKAM',
    href: 24,
  },
  {
    name: 'ALB',
    href: 25,
  },
  {
    name: 'ALGN',
    href: 26,
  },
  {
    name: 'ALK',
    href: 27,
  },
  {
    name: 'ALL',
    href: 28,
  },
  {
    name: 'ALLE',
    href: 29,
  },
  {
    name: 'ALXN',
    href: 30,
  },
  {
    name: 'AMAT',
    href: 31,
  },
  {
    name: 'AMCR',
    href: 32,
  },
  {
    name: 'AMD',
    href: 33,
  },
  {
    name: 'AME',
    href: 34,
  },
  {
    name: 'AMGN',
    href: 35,
  },
  {
    name: 'AMP',
    href: 36,
  },
  {
    name: 'AMT',
    href: 37,
  },
  {
    name: 'AMZN',
    href: 38,
  },
  {
    name: 'ANET',
    href: 39,
  },
  {
    name: 'ANSS',
    href: 40,
  },
  {
    name: 'ANTM',
    href: 41,
  },
  {
    name: 'AON',
    href: 42,
  },
  {
    name: 'AOS',
    href: 43,
  },
  {
    name: 'APA',
    href: 44,
  },
  {
    name: 'APD',
    href: 45,
  },
  {
    name: 'APH',
    href: 46,
  },
  {
    name: 'APTV',
    href: 47,
  },
  {
    name: 'ARE',
    href: 48,
  },
  {
    name: 'ARNC',
    href: 49,
  },
  {
    name: 'ATO',
    href: 50,
  },
  {
    name: 'ATVI',
    href: 51,
  },
  {
    name: 'AVB',
    href: 52,
  },
  {
    name: 'AVGO',
    href: 53,
  },
  {
    name: 'AVY',
    href: 54,
  },
  {
    name: 'AWK',
    href: 55,
  },
  {
    name: 'AXP',
    href: 56,
  },
  {
    name: 'AZO',
    href: 57,
  },
  {
    name: 'BA',
    href: 58,
  },
  {
    name: 'BAC',
    href: 59,
  },
  {
    name: 'BAX',
    href: 60,
  },
  {
    name: 'BBY',
    href: 61,
  },
  {
    name: 'BDX',
    href: 62,
  },
  {
    name: 'BEN',
    href: 63,
  },
  {
    name: 'BF.B',
    href: 64,
  },
  {
    name: 'BIIB',
    href: 65,
  },
  {
    name: 'BK',
    href: 66,
  },
  {
    name: 'BKNG',
    href: 67,
  },
  {
    name: 'BKR',
    href: 68,
  },
  {
    name: 'BLK',
    href: 69,
  },
  {
    name: 'BLL',
    href: 70,
  },
  {
    name: 'BMY',
    href: 71,
  },
  {
    name: 'BR',
    href: 72,
  },
  {
    name: 'BRK.B',
    href: 73,
  },
  {
    name: 'BSX',
    href: 74,
  },
  {
    name: 'BWA',
    href: 75,
  },
  {
    name: 'BXP',
    href: 76,
  },
  {
    name: 'C',
    href: 77,
  },
  {
    name: 'CAG',
    href: 78,
  },
  {
    name: 'CAH',
    href: 79,
  },
  {
    name: 'CAT',
    href: 80,
  },
  {
    name: 'CB',
    href: 81,
  },
  {
    name: 'CBOE',
    href: 82,
  },
  {
    name: 'CBRE',
    href: 83,
  },
  {
    name: 'CCI',
    href: 84,
  },
  {
    name: 'CCL',
    href: 85,
  },
  {
    name: 'CDNS',
    href: 86,
  },
  {
    name: 'CDW',
    href: 87,
  },
  {
    name: 'CE',
    href: 88,
  },
  {
    name: 'CERN',
    href: 89,
  },
  {
    name: 'CF',
    href: 90,
  },
  {
    name: 'CFG',
    href: 91,
  },
  {
    name: 'CHD',
    href: 92,
  },
  {
    name: 'CHRW',
    href: 93,
  },
  {
    name: 'CHTR',
    href: 94,
  },
  {
    name: 'CI',
    href: 95,
  },
  {
    name: 'CINF',
    href: 96,
  },
  {
    name: 'CL',
    href: 97,
  },
  {
    name: 'CLX',
    href: 98,
  },
  {
    name: 'CMA',
    href: 99,
  },
];

const store = new Store({ activeKey: 0, list });

storiesOf('@opuscapita/react-responsive-navbar', module)
  .addDecorator(StateDecorator(store))
  .add('React Responsive NavBar', () => (state) => {
    const onItemClick = (id, index) => {
      store.set({ activeKey: index });
    };

    const onItemReorder = (newList) => {
      store.set({
        list: newList,
      });
    };

    const onItemClosed = (href) => {
      let activeKey = list.findIndex(opts => opts.href === href);
      if (activeKey !== -1) list.splice(activeKey, 1);
      store.set({
        list,
        activeKey: activeKey === state.activeKey ? Math.abs(state.activeKey - 1) : state.activeKey
      })
    }

    const showComponentLeft = boolean('Show component on left', false);
    const showComponentRight = boolean('Show component on right', false);

    const componentLeft = showComponentLeft ? <div className="demo-component">Component on left (node)</div> : null;
    const componentRight = showComponentRight ? <div className="demo-component">Component on right (node)</div> : null;

    const knobs = {
      list: object('List', state.list),
      allowClose: boolean('Can close tabs', true),
      allowReorder: boolean('Can reorder tabs', true),
      activeKey: state.activeKey,
      onSelect: onItemClick,
      onReorder: onItemReorder,
      onClose: onItemClosed,
      showNavItemBorder: boolean('Show nav item border', false),
      showNavItemToolTip: boolean('Show nav item tooltip', true),
      toolTipDelay: number('Tooltip delay', 2000),
      fontSize: text('Font size', 'inherit'),
      fontWeight: text('Font weight', 'inherit'),
      placeholder: text('Placeholder', 'more...'),
      height: text('Height', '30'),
    };

    return <NavBar {...knobs} componentLeft={componentLeft} componentRight={componentRight} />;
  });
