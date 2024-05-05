import { render, fireEvent } from '@testing-library/react';
import Pagination from './Pagination';

test('renders the Pagination component and responds to user interactions', () => {
  const handlePageChange = jest.fn();

  const { getByText } = render(
    <Pagination
      currentPage={2}
      totalPages={5}
      onPageChange={handlePageChange}
    />
  );

  // Check that the current page is rendered
  expect(getByText('2')).toBeInTheDocument();

  // Check that the previous and next pages are rendered
  expect(getByText('1')).toBeInTheDocument();
  expect(getByText('3')).toBeInTheDocument();

  // Simulate a click on the next page
  fireEvent.click(getByText('3'));

  // Check that the onPageChange handler was called with the correct argument
  expect(handlePageChange).toHaveBeenCalledWith(3);

  // Simulate a click on the previous page
  fireEvent.click(getByText('1'));

  // Check that the onPageChange handler was called with the correct argument
  expect(handlePageChange).toHaveBeenCalledWith(1);
});