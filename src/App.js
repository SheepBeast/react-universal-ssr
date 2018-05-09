import React, { Component } from 'react'
import { BrowserRouter, StaticRouter } from 'react-router-dom'
import routes from './routes'

export default class App extends Component {
  render() {

    var Router

    try {
      Router = window ? BrowserRouter : StaticRouter
    } catch (error) {
      Router = StaticRouter
    }

    return (
      <Router context={{}}>
        {routes}
      </Router>
    )
  }
}