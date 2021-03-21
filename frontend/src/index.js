import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { Provider } from 'react-redux';
import store from './store';

import { positions, transitions, Provider as AlertProvider,  } from 'react-alert';
import AlertTemplates from 'react-alert-template-basic';  
const optionAlert = {
  timeout: 2000,
  position: positions.TOP_RIGHT,
  transition: transitions.SCALE, 
}

ReactDOM.render(
  <Provider store={store}>
    <AlertProvider template={AlertTemplates} {...optionAlert}>
      <App />
    </AlertProvider>
  </Provider>,
  document.getElementById('root')
);
