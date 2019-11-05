import React from 'react';
import { Button } from '@storybook/react/demo';
import Layout from 'components/Layout';

export const withLayout = () => (
  <Layout title='Hello'>
    <p>hello</p>
  </Layout>
);

export const withText = () => <Button>Hello Button</Button>;

export const withEmoji = () => (
  <Button>
    <span role='img' aria-label='so cool'>
      😀 😎 👍 💯
    </span>
  </Button>
);

export default { title: 'Button' };
