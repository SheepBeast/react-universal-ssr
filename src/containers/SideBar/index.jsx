import React from 'react'
import { Link } from 'react-router-dom'
import { Avatar, Menu, Icon, Row, Col, Layout } from 'antd'

import './index.less'

export default class SideBar extends React.Component {
  render(){
    return (
      <Layout.Sider id="SideBar" width={280} className="bg-w">
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
          <Menu.Item key="Statistic">
            <Link to="/Statistic">
              <Icon type="pie-chart" /> 统计分析
            </Link>
          </Menu.Item>
          <Menu.Item key="HouseingResource">
            <Link to="/HousingResource">
              <Icon type="shop" /> 房源管理
            </Link>
          </Menu.Item>
          <Menu.SubMenu key="Device" title={<span><Icon type="desktop" /> 设备管理</span>}>
            <Menu.Item key="MyDevice">
              <Link to="/MyDevice">我的设备</Link>
            </Menu.Item>
            <Menu.Item key="Lock">
              <Link to="/Lock">智能门锁</Link>
            </Menu.Item>
            <Menu.Item key="ElectricityMeter">智能电表</Menu.Item>
            <Menu.Item key="WaterMeter">智能水表</Menu.Item>
            <Menu.Item key="AccessControl">智能门禁</Menu.Item>
            <Menu.Item key="Monitoring">智能监控</Menu.Item>
          </Menu.SubMenu>
          <Menu.SubMenu key="User" title={<span><Icon type="user" /> 用户管理</span>}>
            <Menu.Item key="Role">
              <Link to="/Role">角色管理</Link>
            </Menu.Item>
            <Menu.Item key="Staff">
              <Link to="/Staff">员工管理</Link>
            </Menu.Item>
            <Menu.Item key="Auth">
              <Link to="/Auth">权限设置</Link>
            </Menu.Item>
          </Menu.SubMenu>
          <Menu.SubMenu key="Message" title={<span><Icon type="bell" /> 消息管理</span>}>
            <Menu.Item key="AddMessage">
              <Link to="/AddMessage">新增消息</Link>
            </Menu.Item>
            <Menu.Item key="CheckMessage">
              <Link to="/CheckMessage">消息审核</Link>
            </Menu.Item>
          </Menu.SubMenu>
        </Menu>
      </Layout.Sider>
    )
  }
}