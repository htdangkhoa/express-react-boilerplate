import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';

import TagsInput from '../index';

describe('<TagsInput />', () => {
  it('renders', () => {
    const tree = renderer
      .create(
        <MemoryRouter>
          <TagsInput
            onChange={(tag) => {
              console.log(tag);
            }}
          />
        </MemoryRouter>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
