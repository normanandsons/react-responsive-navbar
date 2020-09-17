import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, boolean, object } from '@storybook/addon-knobs';
import { Store, StateDecorator } from '@sambego/storybook-state';

// Application
import './scss/app.component.scss';
import NavBar from '../src/responsive-tab-pills';
/* eslint-disable no-alert */
/* eslint-disable no-console */
const list = [
  {
    name: 'A',
    id: 'A',
  },
  {
    name: 'AAL',
    id: 'AAL',
  },
  {
    name: 'AAP',
    id: 'AAP',
  },
  {
    name: 'AAPL',
    id: 'AAPL',
  },
  {
    name: 'ABBV',
    id: 'ABBV',
  },
  {
    name: 'ABC',
    id: 'ABC',
  },
  {
    name: 'ABMD',
    id: 'ABMD',
  },
  {
    name: 'ABT',
    id: 'ABT',
  },
  {
    name: 'ACN',
    id: 'ACN',
  },
  {
    name: 'ADBE',
    id: 'ADBE',
  },
  {
    name: 'ADI',
    id: 'ADI',
  },
  {
    name: 'ADM',
    id: 'ADM',
  },
  {
    name: 'ADP',
    id: 'ADP',
  },
  {
    name: 'ADS',
    id: 'ADS',
  },
  {
    name: 'ADSK',
    id: 'ADSK',
  },
  {
    name: 'AEE',
    id: 'AEE',
  },
  {
    name: 'AEP',
    id: 'AEP',
  },
  {
    name: 'AES',
    id: 'AES',
  },
  {
    name: 'AFL',
    id: 'AFL',
  },
  {
    name: 'AGN',
    id: 'AGN',
  },
  {
    name: 'AIG',
    id: 'AIG',
  },
  {
    name: 'AIV',
    id: 'AIV',
  },
  {
    name: 'AIZ',
    id: 'AIZ',
  },
  {
    name: 'AJG',
    id: 'AJG',
  },
  {
    name: 'AKAM',
    id: 'AKAM',
  },
  {
    name: 'ALB',
    id: 'ALB',
  },
  {
    name: 'ALGN',
    id: 'ALGN',
  },
  {
    name: 'ALK',
    id: 'ALK',
  },
  {
    name: 'ALL',
    id: 'ALL',
  },
  {
    name: 'ALLE',
    id: 'ALLE',
  },
  {
    name: 'ALXN',
    id: 'ALXN',
  },
  {
    name: 'AMAT',
    id: 'AMAT',
  },
  {
    name: 'AMCR',
    id: 'AMCR',
  },
  {
    name: 'AMD',
    id: 'AMD',
  },
  {
    name: 'AME',
    id: 'AME',
  },
  {
    name: 'AMGN',
    id: 'AMGN',
  },
  {
    name: 'AMP',
    id: 'AMP',
  },
  {
    name: 'AMT',
    id: 'AMT',
  },
  {
    name: 'AMZN',
    id: 'AMZN',
  },
  {
    name: 'ANET',
    id: 'ANET',
  },
  {
    name: 'ANSS',
    id: 'ANSS',
  },
  {
    name: 'ANTM',
    id: 'ANTM',
  },
  {
    name: 'AON',
    id: 'AON',
  },
  {
    name: 'AOS',
    id: 'AOS',
  },
  {
    name: 'APA',
    id: 'APA',
  },
  {
    name: 'APD',
    id: 'APD',
  },
  {
    name: 'APH',
    id: 'APH',
  },
  {
    name: 'APTV',
    id: 'APTV',
  },
  {
    name: 'ARE',
    id: 'ARE',
  },
  {
    name: 'ARNC',
    id: 'ARNC',
  },
  {
    name: 'ATO',
    id: 'ATO',
  },
  {
    name: 'ATVI',
    id: 'ATVI',
  },
  {
    name: 'AVB',
    id: 'AVB',
  },
  {
    name: 'AVGO',
    id: 'AVGO',
  },
  {
    name: 'AVY',
    id: 'AVY',
  },
  {
    name: 'AWK',
    id: 'AWK',
  },
  {
    name: 'AXP',
    id: 'AXP',
  },
  {
    name: 'AZO',
    id: 'AZO',
  },
  {
    name: 'BA',
    id: 'BA',
  },
  {
    name: 'BAC',
    id: 'BAC',
  },
  {
    name: 'BAX',
    id: 'BAX',
  },
  {
    name: 'BBY',
    id: 'BBY',
  },
  {
    name: 'BDX',
    id: 'BDX',
  },
  {
    name: 'BEN',
    id: 'BEN',
  },
  {
    name: 'BF.B',
    id: 'BF.B',
  },
  {
    name: 'BIIB',
    id: 'BIIB',
  },
  {
    name: 'BK',
    id: 'BK',
  },
  {
    name: 'BKNG',
    id: 'BKNG',
  },
  {
    name: 'BKR',
    id: 'BKR',
  },
  {
    name: 'BLK',
    id: 'BLK',
  },
  {
    name: 'BLL',
    id: 'BLL',
  },
  {
    name: 'BMY',
    id: 'BMY',
  },
  {
    name: 'BR',
    id: 'BR',
  },
  {
    name: 'BRK.B',
    id: 'BRK.B',
  },
];

const store = new Store({ activeKey: 0, list });

storiesOf('@normanandsons/react-responsive-tab-pills', module)
  .addDecorator(StateDecorator(store))
  .add('React Responsive Tab Pills', () => (state) => {
    const onItemClick = (id, index) => {
      store.set({ activeKey: index });
    };

    const onItemReorder = (newList) => {
      store.set({
        list: newList,
      });
    };

    const onItemClosed = (id) => {
      let activeKey = list.findIndex((opts) => opts.id === id);
      if (activeKey !== -1) list.splice(activeKey, 1);
      store.set({
        list,
        activeKey: activeKey === state.activeKey ? Math.abs(state.activeKey - 1) : state.activeKey,
      });
    };

    const addItem = () => {
      const newRic = prompt('Enter ric');
      const items = store.get('list').slice();

      if (newRic) {
        items.push({
          name: newRic,
          id: newRic,
        });
      }
      store.set({
        list: items,
        activeKey: items.length - 1,
      });
    };

    const knobs = {
      list: object('List', state.list),
      allowClose: boolean('Can close tabs', true),
      allowReorder: boolean('Can reorder tabs', true),
      activeKey: state.activeKey,
      onSelect: onItemClick,
      onReorder: onItemReorder,
      onClose: onItemClosed,
      showNavItemBorder: boolean('Show nav item border', false),
      fontSize: text('Font size', 'inherit'),
      fontWeight: text('Font weight', 'inherit'),
      height: text('Height', '30'),
    };

    return (
      <NavBar {...knobs} className={'demo-component'}>
        <button className={'add'} onClick={addItem}>
          <i className='fa fa-plus' />
        </button>
      </NavBar>
    );
  });
