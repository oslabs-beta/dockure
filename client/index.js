import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import store from './store';
import styles from './scss/application.scss';

// render(<App />, document.getElementById('root'));

// Once we make files with redux, we can change the code to below.
render(
  <Provider store={store}>
    <App />,
  </Provider>,
  document.getElementById('root')
);
