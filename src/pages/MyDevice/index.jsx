import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Form, Table, Button, Input, Radio, Icon } from 'antd'

const FormItem = Form.Item
const RadioGroup = Radio.Group
const RadioButton = Radio.Button
const Search = Input.Search

import './index.less'

export default class MyDevice extends React.Component {
  render() {
    const dataSource = [{
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
    }],
      columns = [{
        title: '设备名称',
        dataIndex: 'deviceName',
        key: 'deviceName'
      }, {
        title: '设备mac',
        dataIndex: 'deviceMac',
        key: 'deviceMac'
      }, {
        title: '关联安装位置',
        dataIndex: 'installationSite',
        key: 'installationSite'
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
        render: () => {
          return (
            <span>
              <Icon type="file-text" className="mr-20 fs-16 br-50" style={{ backgroundColor: '#D5D5D5', color: '#fff', padding: 6 }} />
              <Icon type="paper-clip" className="mr-20 fs-16 br-50" style={{ backgroundColor: '#D5D5D5', color: '#fff', padding: 6 }} />
              <Icon type="shop" className="fs-16 br-50" style={{ backgroundColor: '#D5D5D5', color: '#fff', padding: 6 }} />
            </span>
          )
        }
      }]
    return (
      <div id="MyDevice" className="container">
        <Form className="mb-20">
          <FormItem label="房间状态" labelCol={{ span: 1 }} wrapperCol={{ span: 23 }}>
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

        <Table dataSource={dataSource} columns={columns} rowSelection={{}}></Table>
      </div>
    )
  }
}