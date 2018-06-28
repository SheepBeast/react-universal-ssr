import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Avatar, Menu, Icon, Row, Col, Layout } from 'antd'

const { Sider } = Layout
const MenuItem = Menu.Item
const SubMenu = Menu.SubMenu

import './index.less'

class SideBar extends React.Component {
  render() {
    let { userPhoto, accountName } = this.props.userInfo

    return (
      <Sider id="SideBar" width={280} className="bg-w" style={{ borderRight: '1px solid #eee' }}>
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
          <MenuItem key="statistics">
            <Link to="/statistics">
              <Icon type="pie-chart" /> <span>统计分析</span>
            </Link>
          </MenuItem>
          <MenuItem key="property">
            <Link to="/property">
              <Icon type="shop" /> <span>房源管理</span>
            </Link>
          </MenuItem>
          <SubMenu key="device" title={
            <span>
              <Icon type="desktop" /> <span>设备管理</span>
            </span>
          }>
            <MenuItem key="myDevice">
              <Link to="/device-list">我的设备</Link>
            </MenuItem>
            <MenuItem key="gateway">
              <Link to="/device-gateway">网关管理</Link>
            </MenuItem>
            <MenuItem key="lock">
              <Link to="/device-lock-list">智能门锁</Link>
            </MenuItem>
          </SubMenu>
          <SubMenu key="user" title={
            <span>
              <Icon type="user" /> <span>用户管理</span>
            </span>
          }>
            <MenuItem key="role">
              <Link to="/role-list">角色管理</Link>
            </MenuItem>
            <MenuItem key="staff">
              <Link to="/user-list">员工管理</Link>
            </MenuItem>
          </SubMenu>
          <SubMenu key="news" title={
            <span>
              <Icon type="bell" /> <span>消息管理</span>
            </span>
          }>
            <MenuItem key="newsList">
              <Link to="/news-list">消息列表</Link>
            </MenuItem>
            <MenuItem key="checkNews">
              <Link to="/news-list-auditting">消息审核</Link>
            </MenuItem>
          </SubMenu>
        </Menu>
      </Sider>
    )
  }
}

const mapStateToProps = state => ({
  userInfo: state.userInfo || {}
})

export default connect(mapStateToProps)(SideBar)