import { Component } from 'react'
import { Form, Radio, Select, Input, Row, Col, Button, Table, Divider } from 'antd'

const FormItem = Form.Item
const RadioGroup = Radio.Group
const RadioButton = Radio.Button
const Option = Select.Option
const Search = Input.Search

import './MyDevice.less'

export default class Device extends Component {
  render() {
    const dataSource = [{
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
    }],
      columns = [{
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
      },
      {
        title: '操作',
        key: 'actions',
        dataIndex: 'actions',
        render: (text, record) => (<span>
          <a href="javascript:;">增加</a>
          <Divider type="vertical"></Divider>
          <a href="javascript:;">修改</a>
          <Divider type="vertical"></Divider>
          <a href="javascript:;">删除</a>
        </span>)
      }]


    return (
      <div id="Device" className="container">
        <Form>
          <FormItem label="我的设备" labelCol={{ span: 2 }} wrapperCol={{ span: 8 }}>
            <RadioGroup>
              <RadioButton value="1">正常</RadioButton>
              <RadioButton value="2">异常</RadioButton>
            </RadioGroup>
          </FormItem>

          <FormItem>
            <Row gutter={16}>
              <Col span={2}>
                <Select defaultValue="1">
                  <Option value="1">全部</Option>
                </Select>
              </Col>
              <Col span={8}>
                <Search placeholder="请输入设备名称或MAC，或按房间进行搜索" enterButton="搜索" />
              </Col>
              <Col span={2} offset={12}>
                <Button type="danger">批量删除</Button>
              </Col>
            </Row>
          </FormItem>
        </Form>

        <Table dataSource={dataSource} columns={columns} pagination={false}></Table>
      </div>
    )
  }
}