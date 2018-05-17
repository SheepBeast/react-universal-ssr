import { Component } from 'react'
import { Provider } from 'react-redux'


import { Avatar, Menu, Icon, Row, Col, Layout } from 'antd'
const { SubMenu } = Menu
const { Sider, Content } = Layout

import getRoutes from '../../routes'
import configureStore from '../../store'

import './index.less'

class LeftSiderbar extends Component {
  render() {
    return (
      <Sider id="LeftSiderbar"  style={{ borderRight: '1px solid #e8e8e8' }}>
        <Row align="middle" justify="center">
          <Col>
            <div style={{
              textAlign: 'center',
              paddingTop: 30,
              paddingBottom: 30
            }}>
              <div style={{ marginBottom: 15 }}>
                <Avatar size="large" icon="user" />
              </div>
              <h3><b>慧享公寓管理平台</b></h3>
            </div>
          </Col>
        </Row>
        <Menu
          style={{
            borderRight: 'none'
          }}
          inlineIndent={45}
          defaultSelectedKeys={['Statistic']}
          mode="inline"
          theme="light">
          <Menu.Item key="Statistic">
            <Icon type="pie-chart" /> 统计分析
          </Menu.Item>
          <Menu.Item key="HouseingResource">
            <Icon type="shop" /> 房源管理
          </Menu.Item>
          <SubMenu id="Device" key="Device" title={<span><Icon type="desktop" /> 设备管理</span>}>
            <Menu.Item key="MyDevice" indent>我的设备</Menu.Item>
            <Menu.Item key="Lock">智能门锁</Menu.Item>
            <Menu.Item key="ElectricityMeter">智能电表</Menu.Item>
            <Menu.Item key="WaterMeter">智能水表</Menu.Item>
            <Menu.Item key="AccessControl">智能门禁</Menu.Item>
            <Menu.Item key="Monitoring">智能监控</Menu.Item>
          </SubMenu>
          <SubMenu id="User" key="User" title={<span><Icon type="user" /> 用户管理</span>}>
            <Menu.Item key="Role">角色管理</Menu.Item>
            <Menu.Item key="Employeer">员工管理</Menu.Item>
          </SubMenu>
          <Menu.Item key="Message"><Icon type="bell" /> 消息管理</Menu.Item>
        </Menu>
      </Sider>
    )
  }
}

let store = configureStore(__TERMINAL__ === "browser" && window._INITIAL_STATE_ || {})

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Layout>
          <LeftSiderbar />
          <Content>
            {getRoutes()}
          </Content>
        </Layout>
      </Provider>
    )
  }
}