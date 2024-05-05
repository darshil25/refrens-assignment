import { render } from '@testing-library/react';
import EpisodeCard from './EpisodeCard';

test('renders the episode card with correct data', () => {
  const { getByText } = render(
    <EpisodeCard
      name="Test Episode"
      airDate="Test Date"
      episode="Test Episode Number"
    />
  );

  // Check that the episode name is rendered
  expect(getByText('Test Episode')).toBeInTheDocument();

  // Check that the air date is rendered
  expect(getByText('Test Date')).toBeInTheDocument();

  // Check that the episode number is rendered
  expect(getByText('Test Episode Number')).toBeInTheDocument();
});