import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { legacy_createStore as createStore, compose, applyMiddleware } from 'redux';
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import reducers from './reducers';
import thunk from 'redux-thunk';

const store = createStore(reducers, compose(applyMiddleware(thunk)));
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

