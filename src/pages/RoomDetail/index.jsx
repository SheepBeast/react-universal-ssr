import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Button, Avatar, Row, Col, Breadcrumb, Card, Divider, Table, Icon, Modal, Form, Select, Input, DatePicker } from 'antd'

import './index.less'

const FormItem = Form.Item
const Option = Select.Option
const BreadcrumbItem = Breadcrumb.Item
const confirm = Modal.confirm

class RoomDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
  }

  componentWillMount(){

  }

  parseQueryToParams() {
    let search = this.props.location.search.replace('?', ''), k, params = {}
    search = qs.parse(search)

    for (k in search) {
      params[k] = decodeURIComponent(search[k])
    }

    return params
  }

  showConfirm() {
    let self = this
    confirm({
      title: '退租确认',
      content: '退租后对应租客的门锁相关联的APP/卡片/密码权限会消失',
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
      key: 'actions',
      render: () => {
        return (
          <span>
            <Icon type="file-text" className="mr-20 " style={{ backgroundColor: '#D5D5D5', color: '#fff', fontSize: 16, padding: 6, borderRadius: '50%' }} />
            <Icon type="paper-clip" style={{ backgroundColor: '#D5D5D5', color: '#fff', fontSize: 16, padding: 6, borderRadius: '50%' }} />
          </span>
        )
      }
    }]

    return (
      <div id="RoomDetail">
        <div id="room-list" className="container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} className="mb-20" >
            <div>
              <h3>
                <b>房间详情</b>
              </h3>
              <Breadcrumb className="mr-20" style={{ display: 'inline-block' }} separator=">" >
                <Breadcrumb.Item>慧享公寓</Breadcrumb.Item>
                <Breadcrumb.Item><a href="">西塔</a></Breadcrumb.Item>
                <Breadcrumb.Item><a href="">1楼</a></Breadcrumb.Item>
                <Breadcrumb.Item><b>BCV103共<span style={{ color: 'red' }}>2</span>位租客</b></Breadcrumb.Item>
              </Breadcrumb>



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
          {true ?
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
                          <Link to="/HousingResource/Relet">续租</Link>
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
              <br />
              <h2 className="mt-30">暂无租客居住</h2>

            </div>
          }
        </div>




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

        {
          false ?
            <Modal
              className="modal-primary"
              title={
                <h3 className="tc" style={{ marginBottom: 0, position: 'relative', color: '#fff' }}>
                  <span>换房</span>
                  <div className="pos-a" style={{ width: 55, height: 55, top: -16, right: -24 }} onClick={this.toggleModal.bind(this)} >
                    <Icon type="close-circle-o" style={{ lineHeight: '55px' }} />
                  </div>
                </h3>
              }
              visible={true}
              destroyOnClose={true}
              closable={false}
              footer={null}
            >
              <Form>
                <h3>
                  <b>郑剑琪</b>
                </h3>
                <br />
                <h3 style={{ color: '#999' }}>
                  <b>当前</b>
                </h3>
                <FormItem label="居住房间" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} style={{ marginBottom: 2 }} >
                  <b style={{ lineHeight: '31px' }}>慧享公寓-西塔-1楼-BCV105</b>
                </FormItem>

                <FormItem label="合约到期" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}  >
                  <b style={{ lineHeight: '31px' }}>2019-06-29</b>
                </FormItem>

                <h3 style={{ color: '#999' }}>
                  <b>更换</b>
                </h3>
                <FormItem label="更换房间" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
                  <Select defaultValue="1">
                    <Option value="1">慧享公寓-西塔-1楼-BCV106</Option>
                  </Select>
                </FormItem>
                <FormItem label="更换时间" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
                  <DatePicker className="w-100"></DatePicker>
                </FormItem>

                <div className="tc">
                  <Button type="primary" style={{ width: 84 }} >保存</Button>
                </div>
              </Form>
            </Modal> : ''
        }
      </div>
    )
  }
}

export default connect()(RoomDetail)