import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Theme from './Theme';
import { PersistGate } from 'redux-persist/integration/react'

import { Provider } from 'react-redux'
import store, { persistor } from './state/store'
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(<Provider store={store}>
  <Theme>
    <Router>
      <PersistGate loading={null} persistor={persistor}>
        <App/>
      </PersistGate>
    </Router>
  </Theme>
</Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
