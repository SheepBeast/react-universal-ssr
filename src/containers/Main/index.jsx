import React from 'react'
import {Layout} from 'antd'

import getRoutes from '../../router'


export default class Main extends React.Component {
  render(){
    return (
      <Layout.Content id="Main" style={{padding: '60px 30px'}} >
        {getRoutes()}
      </Layout.Content>
    )
  }
}