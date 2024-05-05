import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from './Navbar';

test('renders the Navbar with correct links', () => {
  const { getByText } = render(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>
  );

  // Check that the Home link is rendered
  expect(getByText('Home')).toBeInTheDocument();
  expect(getByText('Home').closest('a')).toHaveAttribute('href', '/');

  // Check that the Location link is rendered
  expect(getByText('Location')).toBeInTheDocument();
  expect(getByText('Location').closest('a')).toHaveAttribute('href', '/location');

  // Check that the Episode link is rendered
  expect(getByText('Episode')).toBeInTheDocument();
  expect(getByText('Episode').closest('a')).toHaveAttribute('href', '/episode');
});