import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import apiReducer from '../../../redux/Api/rickMortyApi';
import Home from './Home';

test('renders the Home component and responds to user interactions', () => {
  // Mock the Redux store
  const store = configureStore({
    reducer: {
      api: apiReducer,
    },
    preloadedState: {
      api: {
        characters: {
          data: {
            results: [
              {
                id: 1,
                image: 'test-image.jpg',
                name: 'Test Name',
                status: 'Alive',
                species: 'Human',
                type: 'Test Type',
                gender: 'Male',
                location: { name: 'Test Location' },
              },
            ],
            info: {
              pages: 1,
            },
          },
          error: null,
          isLoading: false,
        },
      },
    },
  });

  const { getByText, getByPlaceholderText, getByDisplayValue } = render(
    <Provider store={store}>
      <Home />
    </Provider>
  );

  // Check that the character card is rendered
  expect(getByText('Test Name')).toBeInTheDocument();

  // Simulate a search
  fireEvent.change(getByPlaceholderText('Search'), { target: { value: 'Test' } });

  // Check that the search value is updated
  expect(getByDisplayValue('Test')).toBeInTheDocument();

  // Simulate a filter change
  fireEvent.change(getByText('Name'), { target: { value: 'Status' } });

  // Check that the filter value is updated
  expect(getByDisplayValue('Status')).toBeInTheDocument();
});