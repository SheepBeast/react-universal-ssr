import React from 'react';
import { hydrate, render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider, connect } from 'react-redux'

import App from './pages/App/index'

import configureStore from './store'

let store = configureStore(__TERMINAL__ === "browser" && window._INITIAL_STATE_ || {})

const renderFn = module.hot ? render : hydrate

renderFn(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
  ,
  document.getElementById('App')
)

if (module.hot) {
  module.hot.accept()
}