import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';

import MdViewer from '../index';

describe('<MdViewer />', () => {
  it('renders', () => {
    const tree = renderer
      .create(
        <MemoryRouter>
          <MdViewer source='# Hello world!!!' />
        </MemoryRouter>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
