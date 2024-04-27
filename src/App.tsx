import React from 'react';
import logo from './logo.svg';
import './App.css';
import MainLayout from './layout/main';
import HomePage from './pages';
import { Provider } from 'react-redux';
import { store } from '@/state/store';
import { ThemeProvider } from '@emotion/react';
import { theme } from '@/constants/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <MainLayout>
          <HomePage />
        </MainLayout>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
