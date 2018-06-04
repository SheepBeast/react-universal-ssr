import React from 'react'
import { Provider, connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Layout } from 'antd'

import SideBar from '../../containers/SideBar/index'
import Main from '../../containers/Main/index'

import Login from '../Login/index'

import './index.less'

class App extends React.Component {
  render() {

    console.log('app props -->', this.props)

    let { tokenID } = this.props
    return (
      <div id="MyApp">
        {
          tokenID ?
            <Layout>
              <SideBar />
              <Main />
            </Layout> :
            <Login />
        }
      </div>
    )
  }
}

const mapStateToProps = state => state

export default connect(mapStateToProps)(App)