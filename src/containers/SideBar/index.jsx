import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Avatar, Menu, Icon, Row, Col, Layout } from 'antd'

import './index.less'

class SideBar extends React.Component {
  render() {
    let userInfo = this.props.userInfo
    let { userPhoto, accountName, actions } = userInfo

    const Links = {
      "statistics": '/statistics',

      "roleManage": '',
      "roleManage-list": '/role-list',
      "roleManage-add": '/role-add',
      "roleManage-delete": '/role-delete',
      "roleManage-update": '/role-update',

      "staffManage": '/user',
      "staffManage-list": '/user-list',
      "staffManage-add": '/user-add',
      "staffManage-delete": '/user-delete',
      "staffManage-enable": '/user-enable',
      "staffManage-modify": '/user-modify',
      "staffManage-relateRole": '/user-relateRole',
      "staffManage-relateProperty": '/user-relateProperty',

      "tenantManage": '/tenant',
      "tenantManage-list": '/tenant/list',
      "tenantManage-add": '/tenant/add',
      "tenantManage-delete": '/tenant/delete',
      "tenantManage-update": '/tenant/update',
      "tenantManage-detail": '/tenant/detail',

      "deviceManage": '/device',
      "deviceManage-list": '/device-list',
      "deviceManage-add": '/device-add',
      "deviceManage-delete": '/device-delete',
      "deviceManage-modify": '/device-modify',
      "deviceManage-doorlockList": '/device-lockList',
      "deviceManage-sendPassword": '/device-sendPassword',
      "deviceManage-passwordList": '/device-passwordList',
      "deviceManage-deletePassword": '/device-deletePassword',
      "deviceManage-temporaryPassword": '/device-temporaryPassword',
      "deviceManage-log": '/device-log',
      "deviceManage-myDevice": '/device-myDevice',
      "deviceManage-bindingCard": '/device-bindingCard',
      "deviceManage-oneKeyOpen": '/device-oneKeyOpen',

      "msgManage": '/news',
      "msgManage-add": '/news-add',
      "msgManage-modify": '/news-modify',
      "msgManage-delete": '/news-delete',
      "msgManage-send": '/news-send',
      "msgManage-detail": '/news-detail',
      "msgManage-audit": '/news-audit',

      "propertyManage": '/property',
      "propertyManage-list": '/property-list',
      "propertyManage-add": '/property-add',
      "propertyManage-delete": '/property-delete',
      "propertyManage-update": '/property-update',
      "propertyManage-detail": '/property-detail',
      "propertyManage-relateDevice": '/property-relateDevice'
    }


    return (
      <div>
        {
          this.props.tokenID ?
            <Layout.Sider id="SideBar" width={280} className="bg-w">
              <div style={{
                textAlign: 'center',
                paddingTop: 30,
                paddingBottom: 30
              }}>
                <div style={{ marginBottom: 15 }}>
                  <Avatar size="large" src={userPhoto} />
                </div>
                <h3 className="fs-18"><b>{accountName}</b></h3>
              </div>
              <Menu
                style={{
                  borderRight: 'none'
                }}
                inlineIndent={90}
                defaultSelectedKeys={['Statistic']}
                mode="inline"
                theme="light">
                <Menu.Item key="statistics">
                  <Link to="/statistics">
                    <Icon type="pie-chart" /> <span>统计分析</span>
                  </Link>
                </Menu.Item>
                <Menu.Item key="property">
                  <Link to="/property">
                    <Icon type="shop" /> <span>房源管理</span>
                  </Link>
                </Menu.Item>
                <Menu.Item key="renter">
                  <Link to="/renter">
                    <Icon type="shop" /> <span>租客管理</span>
                  </Link>
                </Menu.Item>

                <Menu.SubMenu key="device" title={
                  <span>
                    <Icon type="desktop" /> <span>设备管理</span>
                  </span>
                }>
                  <Menu.Item key="myDevice">
                    <Link to="/device-list">我的设备</Link>
                  </Menu.Item>
                  <Menu.Item key="gateway">
                    <Link to="/device-gateway">网关管理</Link>
                  </Menu.Item>
                  <Menu.Item key="lock">
                    <Link to="/device-lockList">智能门锁</Link>
                  </Menu.Item>
                </Menu.SubMenu>
                <Menu.SubMenu key="user" title={
                  <span>
                    <Icon type="user" /> <span>用户管理</span>
                  </span>
                }>
                  <Menu.Item key="role">
                    <Link to="/role">角色管理</Link>
                  </Menu.Item>
                  <Menu.Item key="user">
                    <Link to="/user">员工管理</Link>
                  </Menu.Item>
                </Menu.SubMenu>
                <Menu.SubMenu key="news" title={
                  <span>
                    <Icon type="bell" /> <span>消息管理</span>
                  </span>
                }>
                  <Menu.Item key="newsList">
                    <Link to="/news-list">消息列表</Link>
                  </Menu.Item>
                  <Menu.Item key="checkNews">
                    <Link to="/news-check">消息审核</Link>
                  </Menu.Item>
                </Menu.SubMenu>
              </Menu>
            </Layout.Sider> : null
        }
      </div>

    )
  }
}

const mapStateToProps = state => state

export default connect(mapStateToProps)(SideBar)