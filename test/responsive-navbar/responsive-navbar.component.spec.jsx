import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';

import ResponsiveTabPills from '../../src/index';

describe('Responsive navbar component', () => {
  const list = [
    { id: 'Item1', name: 'Style', href: '/autocomplete' },
    { id: 'Item2', name: 'Item 2 longer and longer', href: '/autocomplete' },
    { id: 'Item3', name: 'Item 3 even longer and longer', href: '/autocomplete' },
    { id: 'Item4', name: 'Item 4', href: '/autocomplete' },
  ];

  it('should render navbar correctly', () => {
    const activeKey = 2;

    const wrapper = mount(<ResponsiveTabPills
      activeKey={activeKey}
      list={list}
      router={[]}
    />);

    expect(wrapper.props().activeKey).to.eql(2);
    expect(wrapper.find('button').at(0).text()).to.eql('Style');
    expect(wrapper.state()).to.eql({
      isSelectVisible: false,
      lastVisibleItemIndex: 4,
    });
  });

});
