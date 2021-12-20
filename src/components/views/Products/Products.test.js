import React from 'react';
import { shallow } from 'enzyme';
import { ProductsComponent } from './Products';

describe('Component Product', () => {
  it('should render without crashing', () => {
    const product = {};
    const component = shallow(<ProductsComponent product={product} />);
    expect(component).toBeTruthy();
  });
});
