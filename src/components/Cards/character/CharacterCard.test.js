import { render, fireEvent } from '@testing-library/react';
import Card from './CharacterCard';

test('renders the character card and responds to click events', () => {
  const handleClick = jest.fn();

  const { getByText, getByAltText } = render(
    <Card
      id={1}
      image="test-image.jpg"
      name="Test Name"
      status="Alive"
      species="Human"
      type="Test Type"
      gender="Male"
      location={{ name: 'Test Location' }}
      onCardClick={handleClick}
    />
  );

  // Check that the character name is rendered
  expect(getByText('Test Name')).toBeInTheDocument();

  // Check that the character image is rendered
  expect(getByAltText('Test Name')).toHaveAttribute('src', 'test-image.jpg');

  // Check that the character status, species, and gender are rendered
  expect(getByText('Alive - Human - Male')).toBeInTheDocument();

  // Check that the character type is rendered
  expect(getByText('Test Type')).toBeInTheDocument();

  // Check that the character location is rendered
  expect(getByText('Test Location')).toBeInTheDocument();

  // Simulate a click on the card
  fireEvent.click(getByText('Test Name'));

  // Check that the click handler was called
  expect(handleClick).toHaveBeenCalledWith(1);
});