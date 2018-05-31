import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Button, Avatar, Row, Col, Breadcrumb, Card, Divider, Table, Icon, Modal, Form, Select, Input } from 'antd'

import './index.less'

const FormItem = Form.Item
const Option = Select.Option
const BreadcrumbItem = Breadcrumb.Item
const confirm = Modal.confirm

class RoomDetail extends Component {
  constructor() {
    super()
    this.state = {
      visible: false
    }
  }

  showConfirm() {
    let self = this
    confirm({
      title: '提示',
      content: '确定退租吗？',
      onOk: self.showInfo,
      onCancel: self.showCancel,
      okText: '确定',
      cancelText: '取消'
    })
  }

  showInfo() {
    Modal.info({
      title: '提示',
      content: '退租成功'
    })
  }

  showCancel() {
    Modal.info({
      title: '提示',
      content: '退租失败'
    })
  }

  toggleModal() {
    this.setState({
      visible: !this.state.visible
    })
  }

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
      <div id="RoomDetail">
        <div id="room-list" className="container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} className="mb-20" >
            <div>
              <h3>
                <b>房间详情</b>
              </h3>
              <Breadcrumb className="mr-20" style={{ display: 'inline-block' }} >
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item><a href="">Application Center</a></Breadcrumb.Item>
                <Breadcrumb.Item><a href="">Application List</a></Breadcrumb.Item>
                <Breadcrumb.Item>An Application</Breadcrumb.Item>
              </Breadcrumb>

              <b>BCV103共<span style={{ color: 'red' }}>2</span>位租客</b>

            </div>
            <div>
              <div style={{ float: 'right', marginRight: 20 }}>
                <Button type="primary" size="small" className="fs-12" style={{ width: 84, marginRight: 10 }} >返回</Button>
                <Button type="primary" size="small" className="fs-12" style={{ width: 84 }}>
                  <Link to="/AddRenter" style={{ color: 'white' }} >添加租客</Link>
                </Button>
              </div>
            </div>
          </div>

          <Divider></Divider>
          {false ?
            <Row gutter={24}>
              {[1, 2, 3, 4].map(() => (
                <Col span={6}>
                  <Card
                    style={{
                      overflow: 'hidden',
                      borderRadius: 8
                    }}
                    title={
                      <span>
                        <Avatar icon="user" size="middle" className="mr-20" style={{ backgroundColor: "#fff", color: "#D4EDFF" }} />
                        <span style={{ fontSize: 16, lineHeight: '21px' }}>罗京风</span>
                      </span>
                    }
                    extra={
                      <Icon type="exclamation-circle-o" style={{ fontSize: 21, color: '#0084E3' }} />
                    }>
                    <h4>联系电话：<span className="message-detail">2018年5月16日</span></h4>
                    <h4>租期时间：<span className="message-detail">2018年5月16日-2018年8月15日</span></h4>
                    <h4>授权方式：<span className="message-detail">限时密码、限时卡片、限时APP</span></h4>

                    <div style={{ position: 'relative', bottom: -10 }} >
                      <Divider className="mt-20 mb-20" ></Divider>

                      <Row gutter={0} className="tc btn-cols" >
                        <Col span={6} className="btn-col">
                          <Link to="/Relet">续租</Link>
                        </Col>

                        <Col span={6} className="btn-col">
                          <a onClick={this.showConfirm.bind(this)}>退租</a>
                        </Col>

                        <Col span={6} className="btn-col">
                          <a onClick={this.toggleModal.bind(this)}>换房</a>
                        </Col>

                        <Col span={6} className="btn-col">
                          <Link to="/RoomDetailInfo">查看</Link>
                        </Col>
                      </Row>
                    </div>
                  </Card>
                </Col>
              ))}

            </Row> :

            <div className="tc pt-30 pb-30">
              <Avatar style={{ width: 150, height: 150, borderRadius: '50%' }} src="http://cdn.duitang.com/uploads/item/201405/27/20140527173845_dk8uY.jpeg" />
              <br/>
              <h2 className="mt-30">暂无租客居住</h2>

            </div>
        }
        </div>


        {/* <Modal title="换房" visible={this.state.visible} onCancel={this.toggleModal.bind(this)} onOk={this.toggleModal.bind(this)}>
          <Form layout="horizontal">
            <h3 className="tc">
              <b>郑剑琪</b>
            </h3>
            <h3>
              <b>当前</b>
            </h3>
            <Divider></Divider>
            <p>居住房间：慧享公寓-西塔-1楼-BCV105</p>
            <p>合约到期：2019-06-29</p>
            <br/>

            <h3>
              <b>更换</b>
            </h3>
            <Divider></Divider>
            <FormItem label="更换房间" labelCol={{span:4}} wrapperCol={{span: 20}}>
              <Select defaultValue="1">
                <Option value="1">慧享公寓-西塔-1楼-BCV106</Option>
              </Select>
            </FormItem>
            <FormItem label="更换时间" labelCol={{span:4}} wrapperCol={{span: 20}}>
              <Input defaultValue="2018年5月14日" disabled={true}></Input>
            </FormItem>
          </Form>


        </Modal> */}

        <div id="devices-manegement" className="container">
          <h3>
            <b>设备管理</b>
          </h3>

          <h4 className="mt-20">关联门锁</h4>
          <Table dataSource={dataSource} columns={columns} pagination={false}></Table>

          <h4 className="mt-20">关联电表</h4>
          <Table dataSource={dataSource} columns={columns} pagination={false}></Table>

          <h4 className="mt-20">关联水表</h4>
          <Table dataSource={dataSource} columns={columns} pagination={false}></Table>
        </div>


      </div>
    )
  }
}

export default connect()(RoomDetail)