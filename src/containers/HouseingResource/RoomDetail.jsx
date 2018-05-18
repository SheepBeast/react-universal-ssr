import { Component } from 'react'

import { Radio, Form, Icon, Button, Avatar, Row, Col, Breadcrumb, Card, Divider, Table } from 'antd'

const FormItem = Form.Item
const RadioGroup = Radio.Group
const RadioButton = Radio.Button
const BreadcrumbItem = Breadcrumb.Item
const CardMeta = Card.Meta

export default class RoomDetail extends Component {
  render() {
    var dataSource = [{
      key: '5',
      lockMac: '11-22-33-44-55-66',
      lockType: '蓝牙锁',
      lockBattery: '67%',
      lockSignalIntensity: '-57db',
      currentStatus: '在线',
      actions: '29.34.56.98.AB.FG'
    }]
    var columns = [{
      title: '门锁MAC',
      dataIndex: 'lockMac',
      key: 'lockMac'
    },
    {
      title: '门锁类型',
      dataIndex: 'lockType',
      key: 'lockType'
    },
    {
      title: '门锁电量',
      dataIndex: 'lockBattery',
      key: 'lockBattery'
    },
    {
      title: '门锁信号强度',
      dataIndex: 'lockSignalIntensity',
      key: 'lockSignalIntensity'
    },
    {
      title: '当前状态',
      dataIndex: 'currentStatus',
      key: 'currentStatus'
    },
    {
      title: '操作',
      dataIndex: 'actions',
      key: 'actions'
    }]


    return (
      <div id="RoomDetail" className="container">
        <h3>
          <b>房间详情</b> <small>BCV103共<span style={{ color: 'red' }}>2</span>位租客</small>
          <div style={{ float: 'right', marginRight: 20 }}>
            <Button type="default" size="small">返回</Button>&nbsp;&nbsp;
            <Button type="primary" icon="plus" size="small">添加租客</Button>
          </div>
        </h3>

        <Breadcrumb separator=">">
          <BreadcrumbItem>慧享公寓</BreadcrumbItem>
          <BreadcrumbItem>西楼</BreadcrumbItem>
          <BreadcrumbItem>1楼</BreadcrumbItem>
        </Breadcrumb>

        <br />

        <Row gutter={16}>
          <Col span={6}>
            <Card
              title={<span><Avatar icon="user" size="small" />&nbsp;&nbsp;<small>&nbsp;&nbsp;郑剑琪</small></span>}
              extra={<Icon type="info-circle" />}
              actions={[
                <span>续租</span>,
                <span>退租</span>,
                <span>换房</span>,
                <span>查看</span>
              ]}>
              <h4>联系电话：<span className="message-detail">2018年5月16日</span></h4>
              <h4>租期时间：<span className="message-detail">2018年5月16日-2018年8月15日</span></h4>
              <h4>授权方式：<span className="message-detail">限时密码、限时卡片、限时APP</span></h4>
            </Card>
          </Col>
          <Col span={6}>
            <Card
              title={<span><Avatar icon="user" size="small" />&nbsp;&nbsp;<small>&nbsp;&nbsp;郑剑琪</small></span>}
              extra={<Icon type="info-circle" />}
              actions={[
                <span>续租</span>,
                <span>退租</span>,
                <span>换房</span>,
                <span>查看</span>
              ]}>
              <h4>联系电话：<span className="message-detail">2018年5月16日</span></h4>
              <h4>租期时间：<span className="message-detail">2018年5月16日-2018年8月15日</span></h4>
              <h4>授权方式：<span className="message-detail">限时密码、限时卡片、限时APP</span></h4>
            </Card>
          </Col>
          <Col span={6}>
            <Card
              title={<span><Avatar icon="user" size="small" />&nbsp;&nbsp;<small>&nbsp;&nbsp;郑剑琪</small></span>}
              extra={<Icon type="info-circle" />}
              actions={[
                <span>续租</span>,
                <span>退租</span>,
                <span>换房</span>,
                <span>查看</span>
              ]}>
              <h4>联系电话：<span className="message-detail">2018年5月16日</span></h4>
              <h4>租期时间：<span className="message-detail">2018年5月16日-2018年8月15日</span></h4>
              <h4>授权方式：<span className="message-detail">限时密码、限时卡片、限时APP</span></h4>
            </Card>
          </Col>
          <Col span={6}>
            <Card
              title={<span><Avatar icon="user" size="small" />&nbsp;&nbsp;<small>&nbsp;&nbsp;郑剑琪</small></span>}
              extra={<Icon type="info-circle" />}
              actions={[
                <span>续租</span>,
                <span>退租</span>,
                <span>换房</span>,
                <span>查看</span>
              ]}>
              <h4>联系电话：<span className="message-detail">2018年5月16日</span></h4>
              <h4>租期时间：<span className="message-detail">2018年5月16日-2018年8月15日</span></h4>
              <h4>授权方式：<span className="message-detail">限时密码、限时卡片、限时APP</span></h4>
            </Card>
          </Col>
        </Row>

        <br />
        <Divider />

        <h3>
          <b>设备管理</b>
        </h3>


        <Table dataSource={dataSource} columns={columns} pagination={false}></Table>
        <br /><br />
        <Table dataSource={dataSource} columns={columns} pagination={false}></Table>
        <br /><br />
        <Table dataSource={dataSource} columns={columns} pagination={false}></Table>


      </div>
    )
  }
}