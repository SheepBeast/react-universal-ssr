import React, { Component } from 'react';
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducers from './reducers'
import App from './App'

var store = createStore(reducers, window && window._INITIAL_STATE_ || {})
render(
  <Provider store={store} >
    <App />
  </Provider>,
  document.getElementById('app')
)

if (module.hot) {
  module.hot.accept()
}