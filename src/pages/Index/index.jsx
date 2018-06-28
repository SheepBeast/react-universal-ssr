import React from 'react'
import { connect } from 'react-redux'
import { Layout } from 'antd'

import SideBar from '../../containers/SideBar/index'
import Main from '../../containers/Main/index'

class Index extends React.Component {
  render() {
    return (
      <div id="Index">
        <Layout>
          <SideBar />
          <Main />
        </Layout>
      </div>
    )
  }
}

export default Index