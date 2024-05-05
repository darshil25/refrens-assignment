import { render } from '@testing-library/react';
import ResidentCard from './ResidentCard';

test('renders the resident card with correct data', () => {
  const { getByText, getByAltText } = render(
    <ResidentCard
      name="Test Resident"
      image="test-image.jpg"
    />
  );

  // Check that the resident name is rendered
  expect(getByText('Test Resident')).toBeInTheDocument();

  // Check that the resident image is rendered
  expect(getByAltText('Test Resident')).toHaveAttribute('src', 'test-image.jpg');
});