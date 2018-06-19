import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Avatar, Menu, Icon, Row, Col, Layout } from 'antd'

import './index.less'

class SideBar extends React.Component {
  render() {
    let userInfo = this.props.userInfo
    let { userPhoto, accountName, actions } = userInfo

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
                {/* <Menu.Item key="renter">
                  <Link to="/renter">
                    <Icon type="shop" /> <span>租客管理</span>
                  </Link>
                </Menu.Item> */}

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
                    <Link to="/role-list">角色管理</Link>
                  </Menu.Item>
                  <Menu.Item key="staff">
                    <Link to="/user-list">员工管理</Link>
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
                    <Link to="/news-list-auditting">消息审核</Link>
                  </Menu.Item>
                </Menu.SubMenu>

                <Menu.SubMenu key="account" title={
                  <span>
                    <Icon type="bell" /> <span>个人中心</span>
                  </span>
                }>
                  <Menu.Item key="account-info">
                    <Link to="/account-info">个人信息</Link>
                  </Menu.Item>
                </Menu.SubMenu>

                {/* <Menu.SubMenu key="account" title={
                  <span>
                    <Icon type="desktop" /> <span>个人中心</span>
                  </span>
                }>
                  <Menu.Item key="register">
                    <Link to="/register">注册</Link>
                  </Menu.Item>
                  <Menu.Item key="login">
                    <Link to="/device-gateway">登陆</Link>
                  </Menu.Item>
                  <Menu.Item key="forgetPassword">
                    <Link to="/device-lockList">忘记密码</Link>
                  </Menu.Item>

                  <Menu.Item key="account-center">
                    <Link to="/device-list">个人中心</Link>
                  </Menu.Item>
                  <Menu.Item key="modifyAvatar">
                    <Link to="/device-gateway">修改头像</Link>
                  </Menu.Item>
                  <Menu.Item key="modifyPassword">
                    <Link to="/device-lockList">修改密码</Link>
                  </Menu.Item>

                  <Menu.Item key="modifyMobile">
                    <Link to="/device-lockList">修改手机</Link>
                  </Menu.Item>
                </Menu.SubMenu> */}
              </Menu>
            </Layout.Sider> : null
          }
      </div>

    )
        }
      }

      const mapStateToProps = state => state

export default connect(mapStateToProps)(SideBar)