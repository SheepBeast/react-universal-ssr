import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Row, Col, Form, Select, Button, Table, Divider, Modal, Radio, Input, Icon, Checkbox } from 'antd'

const FormItem = Form.Item
const Option = Select.Option
const RadioGroup = Radio.Group
const RadioButton = Radio.Button
const Search = Input.Search

class Lock extends React.Component {
  constructor() {
    super()
    this.state = {
      visible: false
    }
  }

  toggleModal() {
    this.setState({
      visible: !this.state.visible
    })
  }


  render() {
    const columns = [{
      title: '设备名称',
      dataIndex: 'deviceName',
      key: 'deviceName'
    }, {
      title: '设备mac',
      dataIndex: 'deviceMac',
      key: 'deviceMac'
    }, {
      title: '关联安装位置',
      key: 'installationSite',
      dataIndex: 'installationSite'
    },
    {
      title: '设备类型',
      dataIndex: 'deviceType',
      key: 'deviceType'
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status'
    }, {
      title: '操作',
      key: 'actions',
      dataIndex: 'actions',
      render: () => {
        return (
          <span>
            <Icon type="file-text" className="mr-20 fs-16 br-50" style={{ backgroundColor: '#D5D5D5', color: '#fff', padding: 6 }} />
            <Icon type="paper-clip" className="mr-20 fs-16 br-50" style={{ backgroundColor: '#D5D5D5', color: '#fff', padding: 6 }} />
            <Icon type="shop" className="fs-16 br-50" style={{ backgroundColor: '#D5D5D5', color: '#fff', padding: 6 }} />
          </span>
        )
      }
    }];

    const data = [{
      key: '5',
      deviceMac: '11-22-33-44-55-66',
      installationSite: '享家公寓A栋B楼3层301',
      deviceType: '蓝牙锁',
      deviceName: '之家公寓4栋A106：门锁',
      status: '在线',
      actions: ''
    },
    {
      key: '1',
      deviceMac: '11-22-33-44-55-66',
      installationSite: '享家公寓A栋B楼3层301',
      deviceType: '蓝牙锁',
      deviceName: '之家公寓4栋A106：门锁',
      status: '在线',
      actions: ''
    },
    {
      key: '2',
      deviceMac: '11-22-33-44-55-66',
      installationSite: '享家公寓A栋B楼3层301',
      deviceType: '蓝牙锁',
      deviceName: '之家公寓4栋A106：门锁',
      status: '在线',
      actions: ''
    }];

    const rowSelection = {};

    return (
      <div id="Lock">
        <div className="container">
          <Row className="tc">
            <Col span={12} style={{ borderRight: '1px solid #eee' }} >
              <span className="fs-14">在线门锁</span>
              <br />
              <span className="fs-24">
                <b>1258</b>
              </span>
            </Col>
            <Col span={12}>
              <span className="fs-14">异常门锁</span>
              <br />
              <span className="fs-24" style={{ color: 'red' }}>
                <b>8</b>
              </span>
            </Col>
          </Row>
        </div>

        <div className="container">
          <Form>
            <FormItem label="房产" labelCol={{ span: 1 }} wrapperCol={{ span: 23 }}>
              <Row gutter={20}>
                <Col span={2}>
                  <Select defaultValue="0">
                    <Option value="0">全部房产</Option>
                  </Select>
                </Col>
                <Col span={2}>

                  <Select defaultValue="0">
                    <Option value="0">全部楼栋</Option>
                  </Select>
                </Col>
                <Col span={2}>
                  <Select defaultValue="0">
                    <Option value="0">全部楼层</Option>
                  </Select>

                </Col>
                <Col span={2}>

                  <Select defaultValue="0">
                    <Option value="0">全部房间</Option>
                  </Select>
                </Col>
              </Row>
            </FormItem>

            <FormItem label="设备状态" labelCol={{ span: 1 }} wrapperCol={{ span: 23 }}>
              <RadioGroup className="custom-radio-button-group" defaultValue="0">
                <RadioButton value="0">全部</RadioButton>
                <RadioButton value="1">正常</RadioButton>
                <RadioButton value="2">异常</RadioButton>
              </RadioGroup>
            </FormItem>

            <FormItem wrapperCol={{ span: 8 }}>
              <Search style={{ height: 32 }} enterButton="搜索" placeholder="请输入设备名称/设备MAC/安装关联位置"></Search>
            </FormItem>
          </Form>

          <Table dataSource={data} columns={columns} rowSelection={rowSelection} pagination={false}></Table>

        </div>


        <Modal
          title={
            <h3 className="tc" style={{ marginBottom: 0, position: 'relative' }}>
              <span>设备关联房间</span>
              <div className="pos-a" style={{ width: 55, height: 55, top: -16, right: -24 }} onClick={this.toggleModal.bind(this)} >
                <Icon type="close-circle-o" style={{ lineHeight: '55px', color: '#adadad' }} />
              </div>
            </h3>
          }
          visible={true}
          destroyOnClose={true}
          closable={false}
          footer={null}
        >
          <Form>
            <Row>
              <Col span={10} style={{
                height: 188,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
              }}>
                <FormItem label="设备名称" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
                  <span>门锁1</span>
                </FormItem>
                <FormItem label="设备MAC" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
                  123:423:321:121
              </FormItem>
              </Col>
              <Col span={6} className="tc">
                <Icon type="paper-clip" className="fs-30" style={{
                  height: 188,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center'
                }} />
              </Col>
              <Col span={8}>
                <Select defaultValue="0" className="mb-20">
                  <Option value="0">全部房产</Option>
                </Select>

                <Select defaultValue="0" className="mb-20">
                  <Option value="0">全部楼栋</Option>
                </Select>

                <Select defaultValue="0" className="mb-20">
                  <Option value="0">全部楼层</Option>
                </Select>

                <Select defaultValue="0">
                  <Option value="0">全部房间</Option>
                </Select>
              </Col>
            </Row>

            <FormItem wrapperCol={{ span: 24 }}>
              <Checkbox defaultChecked>自动重命名设备</Checkbox>
              <br />
              <Input placeholder="请先选择房间"></Input>
              <br />
              <p style={{ color: 'red' }}>与已有设备名称重复，请修改</p>
            </FormItem>
          </Form>

          <br />
          <div className="tc">
            <Button className="mr-30" style={{ width: 84 }}>取消</Button>
            <Button type="primary" style={{ width: 84 }}>确定</Button>
          </div>
        </Modal>
      </div>
    )
  }
}

export default connect()(Lock)