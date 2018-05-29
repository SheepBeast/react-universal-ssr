import React, { Component } from 'react';
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './containers/App/index'

render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('App')
)



if (module.hot) {
  module.hot.accept()
}