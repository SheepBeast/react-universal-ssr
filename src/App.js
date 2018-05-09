import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Provider } from 'react-redux'
import routes from './routes'
import configureStore from './store'

export default class App extends Component {

  render() {
    var store = configureStore()

    return (
      <Provider store={store}>
        <div id="app-container">
          <Link to="/">/</Link><br /><Link to="/home">/home</Link><br />
          {routes}
        </div>
      </Provider>
    )
  }
}