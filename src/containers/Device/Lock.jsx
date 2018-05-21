import { Component } from 'react'
import { Row, Col, Form, Select, Button, Table, Divider , Modal} from 'antd'

const FormItem = Form.Item
const Option = Select.Option

export default class Lock extends Component {
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
      render: (text, record) => (<span>
        <a href="javascript:;">详情</a>
        <Divider type="vertical"></Divider>
        <a onClick={this.toggleModal.bind(this)}>设置</a>
      </span>)
    }];

    const data = [{
      key: '5',
      deviceMac: '11-22-33-44-55-66',
      deviceType: '蓝牙锁',
      deviceName: '之家公寓4栋A106：门锁',
      status: '在线',
      actions: ''
    },
    {
      key: '1',
      deviceMac: '11-22-33-44-55-66',
      deviceType: '蓝牙锁',
      deviceName: '之家公寓4栋A106：门锁',
      status: '在线',
      actions: ''
    },
    {
      key: '2',
      deviceMac: '11-22-33-44-55-66',
      deviceType: '蓝牙锁',
      deviceName: '之家公寓4栋A106：门锁',
      status: '在线',
      actions: ''
    }];

    const rowSelection = {};

    return (
      <div id="Lock" className="container">
        <Row>
          <Col span={12}>
            <Form>
              <FormItem>
                <Row gutter={16}>
                  <Col span={12}>
                    <Row>
                      <Col span={6}>公寓名称：</Col>
                      <Col span={16}>
                        <Select defaultValue="1">
                          <Option value="1">1</Option>
                        </Select>
                      </Col>
                    </Row>
                  </Col>
                  <Col span={12}>
                    <Row>
                      <Col span={6}>楼栋名称：</Col>
                      <Col span={16}>
                        <Select defaultValue="1">
                          <Option value="1">年</Option>
                          <Option value="2">月</Option>
                          <Option value="3">日</Option>
                        </Select>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </FormItem>

              <FormItem>
                <Row gutter={16}>
                  <Col span={12}>
                    <Row>
                      <Col span={6}>楼层名称：</Col>
                      <Col span={16}>
                        <Select defaultValue="1">
                          <Option value="1">1</Option>
                        </Select>
                      </Col>
                    </Row>
                  </Col>
                  <Col span={12}>
                    <Row>
                      <Col span={6}>房间名称：</Col>
                      <Col span={16}>
                        <Select defaultValue="1">
                          <Option value="1">年</Option>
                          <Option value="2">月</Option>
                          <Option value="3">日</Option>
                        </Select>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </FormItem>

              <FormItem>
                <Row gutter={16}>
                  <Col span={12}>
                    <Row>
                      <Col span={6}>MAC地址：</Col>
                      <Col span={16}>
                        <Select defaultValue="1">
                          <Option value="1">1</Option>
                        </Select>
                      </Col>
                    </Row>
                  </Col>
                  <Col span={12}>
                    <Button type="primary">搜索</Button>
                  </Col>
                </Row>
              </FormItem>
            </Form>
          </Col>
          <Col span={8}>
            <dl>
              <dd>在线门锁：1253</dd>
              <dd>异常门锁：6</dd>
            </dl>
          </Col>
          <Col span={6} style={{
            position: 'absolute',
            right: 20,
            bottom: 30
          }}>
            <Button style={{ float: 'right' }} type="danger">批量删除</Button>
          </Col>
        </Row>

        <Table dataSource={data} columns={columns} rowSelection={rowSelection}></Table>

        <Modal title="设备关联房间" visible={this.state.visible} onCancel={this.toggleModal.bind(this)} onOk={this.toggleModal.bind(this)}>
          <Form style={{margin: 'auto', width: '60%'}}>
            <FormItem label="门锁名称" labelCol={{ span: 6 }} wrapperCol={{ span: 18}}>
              <Select defaultValue="1">
                <Option value="1">慧享公寓-西塔-1楼-BCV106</Option>
              </Select>
            </FormItem>

            <FormItem label="门锁MAC" labelCol={{ span: 6 }} wrapperCol={{ span: 18}}>
              <Select defaultValue="1">
                <Option value="1">慧享公寓-西塔-1楼-BCV106</Option>
              </Select>
            </FormItem>

            <FormItem label="公寓名称" labelCol={{ span: 6 }} wrapperCol={{ span: 18}}>
              <Select defaultValue="1">
                <Option value="1">慧享公寓-西塔-1楼-BCV106</Option>
              </Select>
            </FormItem>

            <FormItem label="楼栋名称" labelCol={{ span: 6 }} wrapperCol={{ span: 18}}>
              <Select defaultValue="1">
                <Option value="1">慧享公寓-西塔-1楼-BCV106</Option>
              </Select>
            </FormItem>

            <FormItem label="楼层名称" labelCol={{ span: 6 }} wrapperCol={{ span: 18}}>
              <Select defaultValue="1">
                <Option value="1">慧享公寓-西塔-1楼-BCV106</Option>
              </Select>
            </FormItem>

            <FormItem label="房间名称" labelCol={{ span: 6 }} wrapperCol={{ span: 18}}>
              <Select defaultValue="1">
                <Option value="1">慧享公寓-西塔-1楼-BCV106</Option>
              </Select>
            </FormItem>
          </Form>


        </Modal>
      </div>
    )
  }
}