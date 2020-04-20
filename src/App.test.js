import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('Renders the parent container', () => {
  const { container } = render(<App />);
  expect(container).toBeInTheDocument();
});

test('Checks if the parent has class container', () => {
  const { container } = render(<App />);
  expect(container.firstChild).toHaveClass('container');
});