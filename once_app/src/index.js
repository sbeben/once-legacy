import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {AuthContextProvider} from './context/AuthContext';
import { Provider } from 'react-redux'
import {store} from './context/store'

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <Provider store={store}>
        <App />
      </Provider> 
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

 