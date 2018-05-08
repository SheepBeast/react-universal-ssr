import React, { Component } from 'react';
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import { loadAction } from './actions/index'
import routes from './routes'
import store from './store'
import axios from 'axios'

axios.get('https://www.yinxiangyu.com/getData').then((res) => {
  store.dispatch(loadAction(res.data))
  render(
    <Provider store={store} key="index">
      <BrowserRouter>
        {routes}
      </BrowserRouter>
    </Provider>,
    document.getElementById('app')
  )
})