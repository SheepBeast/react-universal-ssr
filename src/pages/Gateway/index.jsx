import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Form, Table, Button, Input, Radio, Icon } from 'antd'

const FormItem = Form.Item
const RadioGroup = Radio.Group
const RadioButton = Radio.Button
const Search = Input.Search

import './index.less'
import { fetchGatewayListData } from '../../actions/device';

class Gateway extends React.Component {
  componentWillMount() {
    this.props.fetchGatewayList()
  }

  onSearch(e) {
    var params = {
      findName: 'F'
    }

    this.props.fetchGatewayList(params)
  }

  render() {
    const gatewayTypeRefers = {
      1: '有线网关',
      2: '无线网关'
    }

    const stateRefers = {
      0: '异常',
      1: '正常',
      2: '低电量',
      3: '挟持告警',
      4: '离线'
    }

    const dataSource = this.props.gatewayList.map(({ deviceId, deviceName, gatewayType, hardwareVersion, mac, roomName, floorName, buildingName, houseName, state, softwareVersion }) => {
      let installationSite = `${houseName || ''}${buildingName ? buildingName + '栋' : ''}${floorName ? floorName + '层' : ''}${roomName || ''}`
      let _gatewayType = gatewayTypeRefers[gatewayType]

      return {
        key: deviceId,
        mac,
        installationSite,
        gatewayType: _gatewayType,
        deviceName: deviceName || `${installationSite}：${_gatewayType}`,
        state,
        actions: deviceId,
        hardwareVersion,
        softwareVersion
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
      title: '硬件版本',
      dataIndex: 'hardwareVersion',
      key: 'hardwareVersion'
    },
    {
      title: '固件',
      dataIndex: 'softwareVersion',
      key: 'softwareVersion'
    }, {
      title: '关联安装位置',
      dataIndex: 'installationSite',
      key: 'installationSite'
    },
    {
      title: '设备类型',
      dataIndex: 'gatewayType',
      key: 'gatewayType'
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
      <div id="Gateway" className="container">
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
  gatewayList: state.gatewayList || []
})
const mapDispatchToProps = dispatch => {
  return {
    fetchGatewayList: params => dispatch(fetchGatewayListData(params))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Gateway)