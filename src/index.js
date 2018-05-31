import React from 'react';
import { hydrate } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import App from './pages/App/index'

hydrate(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('App')
)

if (module.hot) {
  module.hot.accept()
}