import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import {store, saveState} from './context/store';
import throttle from 'lodash/throttle';

store.subscribe(throttle(()=>{
  saveState({
    user: store.getState().user
  });
  console.log(store.getState().user);
}, 1000));

ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider> 
  </React.StrictMode>,
  document.getElementById('root')
);

 