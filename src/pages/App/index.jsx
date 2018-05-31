import React from 'react'
import { Provider } from 'react-redux'
import { Layout } from 'antd'

import SideBar from '../../containers/SideBar/index'
import Main from '../../containers/Main/index'

import configureStore from '../../store'

import './index.less'

let store = configureStore(__TERMINAL__ === "browser" && window._INITIAL_STATE_ || {})

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <div id="MyApp">
          <Layout>
            <SideBar />
            <Main />
          </Layout>
        </div>
      </Provider>
    )
  }
}