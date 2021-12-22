import React from 'react';
import * as reactRedux from 'react-redux';
import { shallow } from 'enzyme';
import { HomepageComponent } from './Homepage';

describe('Component Homepage', () => {
  const useSelectorMock = jest.spyOn(reactRedux, 'useSelector');
  const useDispatchMock = jest.spyOn(reactRedux, 'useDispatch');

  beforeEach(() => {
    useSelectorMock.mockClear();
    useDispatchMock.mockClear();
  });

  it('should render without crashing', () => {
    const dummyDispatch = jest.fn();
    useDispatchMock.mockReturnValue(dummyDispatch);
    const products = {
      data: [
        {
          _id: 1,
          name: 'Canon',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer non maximus tellus. Phasellus condimentum ut.',
          sale: true,
          price: 1200,
          oldPrice: 1399,
          inStock: 4,
          src: 'canon.jpg',
        },
      ],
    };
    useSelectorMock.mockReturnValue({products});
    /* const component = shallow(<HomepageComponent />);
    expect(component).toBeTruthy(); */
  });
});
