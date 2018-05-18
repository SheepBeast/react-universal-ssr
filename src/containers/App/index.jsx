import { Component } from 'react'
import { Provider } from 'react-redux'
import { Link } from 'react-router-dom'


import { Avatar, Menu, Icon, Row, Col, Layout } from 'antd'
const { SubMenu } = Menu
const MenuItem = Menu.Item
const { Sider, Content } = Layout

import getRoutes from '../../routes'
import configureStore from '../../store'

import './index.less'

class LeftSiderbar extends Component {
  render() {
    return (
      <Sider id="LeftSiderbar" width={280} style={{ borderRight: '1px solid #e8e8e8' }}>
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
              <h3 className="fs-18"><b>慧享公寓管理平台</b></h3>
            </div>
          </Col>
        </Row>
        <Menu
          style={{
            borderRight: 'none'
          }}
          inlineIndent={90}
          defaultSelectedKeys={['Statistic']}
          mode="inline"
          theme="light">
          <MenuItem key="Statistic">
            <Link to="/Statistic">
              <Icon type="pie-chart" /> 统计分析
            </Link>
          </MenuItem>
          <MenuItem key="HouseingResource">
            <Link to="/HousingResource">
              <Icon type="shop" /> 房源管理
            </Link>
          </MenuItem>
          <SubMenu id="Device" key="Device" title={<span><Icon type="desktop" /> 设备管理</span>}>
            <MenuItem key="MyDevice" indent>我的设备</MenuItem>
            <MenuItem key="Lock">智能门锁</MenuItem>
            <MenuItem key="ElectricityMeter">智能电表</MenuItem>
            <MenuItem key="WaterMeter">智能水表</MenuItem>
            <MenuItem key="AccessControl">智能门禁</MenuItem>
            <MenuItem key="Monitoring">智能监控</MenuItem>
          </SubMenu>
          <SubMenu id="User" key="User" title={<span><Icon type="user" /> 用户管理</span>}>
            <MenuItem key="Role">角色管理</MenuItem>
            <MenuItem key="Employeer">员工管理</MenuItem>
          </SubMenu>
          <MenuItem key="Message"><Icon type="bell" /> 消息管理</MenuItem>
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