import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import apiReducer from '../../../redux/Api/rickMortyApi';
import Profile from './Profile';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

test('renders the Profile component with correct data', () => {
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

  // Mock the history object
  const history = createMemoryHistory();
  history.push('/profile', { id: 1 });

  const { getByText, getByAltText } = render(
    <Provider store={store}>
      <Router history={history}>
        <Profile />
      </Router>
    </Provider>
  );

  // Check that the profile name is rendered
  expect(getByText('Test Name')).toBeInTheDocument();

  // Check that the profile image is rendered
  expect(getByAltText('Test Name')).toHaveAttribute('src', 'test-image.jpg');
});