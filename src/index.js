import React, { Component } from 'react';
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import axios from 'axios'

import App from './App'

axios({
  url: 'https://t.server.wisbetter.com',
  method: 'get',
  headers: {
    'Content-Type': 'text/json;charset=utf-8',
    'Content-Version': '1.2'
  },
  data: {
    method: 'manageTest',
    data: {
    }
  }
}).then((ret) => {
  console.log('ret -->', ret)
}).catch(err => {
  console.log('err -->', err)
})

render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('App')
)

if(module.hot) {
  module.hot.accept()
}