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
      "statistics": '/statistic',

      "roleManage": '',
      "roleManage-list": '/role/list',
      "roleManage-add": '/role/add',
      "roleManage-delete": '/role/delete',
      "roleManage-update": '/role/update',

      "staffManage": '/staff',
      "staffManage-list": '/staff/list',
      "staffManage-add": '/staff/add',
      "staffManage-delete": '/staff/delete',
      "staffManage-enable": '/staff/enable',
      "staffManage-modify": '/staff/modify',
      "staffManage-relateRole": '/staff/relateRole',
      "staffManage-relateProperty": '/staff/relateProperty',

      "tenantManage": '/tenant',
      "tenantManage-list": '/tenant/list',
      "tenantManage-add": '/tenant/add',
      "tenantManage-delete": '/tenant/delete',
      "tenantManage-update": '/tenant/update',
      "tenantManage-detail": '/tenant/detail',

      "deviceManage": '/device',
      "deviceManage-list": '/device/list',
      "deviceManage-add": '/device/add',
      "deviceManage-delete": '/device/delete',
      "deviceManage-modify": '/device/modify',
      "deviceManage-doorlockList": '/device/doorLockList',
      "deviceManage-sendPassword": '/device/sendPassword',
      "deviceManage-passwordList": '/device/passwordList',
      "deviceManage-deletePassword": '/device/deletePassword',
      "deviceManage-temporaryPassword": '/device/temporaryPassword',
      "deviceManage-log": '/device/log',
      "deviceManage-myDevice": '/device/myDevice',
      "deviceManage-bindingCard": '/device/bindingCard',
      "deviceManage-oneKeyOpen": '/device/oneKeyOpen',

      "msgManage": '/msg',
      "msgManage-add": '/msg/add',
      "msgManage-modify": '/msg/modify',
      "msgManage-delete": '/msg/delete',
      "msgManage-send": '/msg/send',
      "msgManage-detail": '/msg/detail',
      "msgManage-audit": '/msg/audit',

      "propertyManage": '/property',
      "propertyManage-list": '/property/list',
      "propertyManage-add": '/property/add',
      "propertyManage-delete": '/property/delete',
      "propertyManage-update": '/property/update',
      "propertyManage-detail": '/property/detail',
      "propertyManage-relateDevice": '/propery/relateDevice'
    }

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
                <Avatar size="large" src={userPhoto} />
              </div>
              <h3 className="fs-18"><b>{accountName}</b></h3>
            </div>
          </Col>
        </Row>
        <Menu
          style={{
            borderRight: 'none'
          }}
          inlineIndent={90}
          defaultSelectedKeys={['statistic']}
          mode="inline"
          theme="light">

          {
            actions.map(({ actionName, actionStr, lowerActions }) => {
              if (lowerActions) {
                return (
                  <Menu.SubMenu key={actionStr} title={<span><Icon type="desktop" /> <span>{actionName}</span></span>}>
                    {
                      lowerActions.map((lowerAction) => (
                        <Menu.Item key={lowerAction.actionStr}>
                          <Link to={Links[lowerAction.actionStr]}>
                            {lowerAction.actionName.split('-')[1]}
                          </Link>
                        </Menu.Item>
                      ))
                    }
                  </Menu.SubMenu>
                )
              } else {
                return (
                  <Menu.Item key={actionStr}>
                    <Link to={Links[actionStr]}>
                      <Icon type="pie-chart" /> <span>{actionName}</span>
                    </Link>
                  </Menu.Item>
                )
              }
            })
          }
        </Menu>
      </Layout.Sider>
    )
  }
}

const mapStateToProps = state => state

export default connect(mapStateToProps)(SideBar)