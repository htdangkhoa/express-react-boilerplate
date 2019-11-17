import React from 'react';
import { Button } from '@storybook/react/demo';

export const withText = () => <Button>Hello Button</Button>;

export const withEmoji = () => (
  <Button>
    <span role='img' aria-label='so cool'>
      😀 😎 👍 💯
    </span>
  </Button>
);

export default { title: 'Button' };
