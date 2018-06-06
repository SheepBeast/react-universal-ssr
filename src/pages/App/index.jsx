import React from 'react'
import { Provider, connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Layout } from 'antd'

import SideBar from '../../containers/SideBar/index'
import Main from '../../containers/Main/index'

import Login from '../Login/index'

import './index.less'

class App extends React.Component {
  componentWillMount() {
    // let {tokenID } = this.props

    // if(!tokenID) {
    //   this.props.history.push('/login')
    // }

    this.props.history.push('/login')
  }

  render() {
    return (
      <div id="MyApp">
        <Layout>
          <SideBar />
          <Main />
        </Layout>
      </div>
    )
  }
}


export default withRouter(App)