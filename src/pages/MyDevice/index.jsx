import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Form, Table, Button, Input, Radio, Icon } from 'antd'

const FormItem = Form.Item
const RadioGroup = Radio.Group
const RadioButton = Radio.Button
const Search = Input.Search

import './index.less'
import { fetchDeviceListData } from '../../actions/device';

class MyDevice extends React.Component {
  componentWillMount() {
    this.props.fetchDeviceList()
  }

  onSearch(e) {
    var params = {
      findName: '26F96'
    }

    this.props.fetchDeviceList(params)
  }

  render() {
    console.log('device list -->', this.props.deviceList)

    const deviceTypeRefers = {
      0: '网关',
      1: '摄像头',
      2: '门锁',
      3: '猫眼',
      4: '水表'
    }

    const stateRefers = {
      0: '异常',
      1: '正常',
      2: '低电量',
      3: '挟持告警',
      4: '离线'
    }
    const dataSource = this.props.deviceList.map(({ deviceId, deviceName, mac, deviceType, state, roomName, floorName, buildingName, houseName }) => {
      let installationSite = `${houseName || ''}${buildingName ? buildingName + '栋' : ''}${floorName ? floorName + '层' : ''}${roomName || ''}`
      let _deviceType = deviceTypeRefers[deviceType]

      return {
        key: deviceId,
        mac,
        installationSite,
        deviceType: _deviceType,
        deviceName: deviceName || `${installationSite}：${_deviceType}`,
        state,
        actions: ''
      }
    })


    const columns = [{
      title: '设备名称',
      dataIndex: 'deviceName',
      key: 'deviceName'
    }, {
      title: '设备mac',
      dataIndex: 'mac',
      key: 'mac'
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
      dataIndex: 'state',
      key: 'state',
      render: (state) => {
        return <span style={state === 1 ? {} : { color: 'red' }}>{stateRefers[state]}</span>
      }
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
            <Search style={{ height: 32 }} enterButton="搜索" placeholder="请输入设备名称/设备MAC/安装关联位置" onSearch={this.onSearch.bind(this)}></Search>
          </FormItem>
        </Form>

        <Table dataSource={dataSource} columns={columns} rowSelection={{}}></Table>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  deviceList: state.deviceList || []
})
const mapDispatchToProps = dispatch => {
  return {
    fetchDeviceList: params => dispatch(fetchDeviceListData(params))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyDevice)