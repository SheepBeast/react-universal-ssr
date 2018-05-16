import React, { Component } from 'react';
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import API from './api'

import App from './App'
import Axios from 'axios';

var api = new API()

// async function fetch() {
//   var ret = await api.fetch('appSmsInfo', { flag: 3, phoneNo: '13802402735' })
//   console.log('index ret -->', ret)
// }

// fetch()

render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('App')
)

if (module.hot) {
  module.hot.accept()
}