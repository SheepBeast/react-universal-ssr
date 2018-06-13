import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { Form, Table, Button, Input, Radio, Icon, Row, Col, Tooltip } from 'antd'

const FormItem = Form.Item
const RadioGroup = Radio.Group
const RadioButton = Radio.Button
const Search = Input.Search

import './index.less'
import { fetchDeviceListData, deleteDevice } from '../../actions/device';


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





class MyDevice extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      startNum: 0
    }
  }

  componentWillMount() {
    this.props.fetchDeviceList()
  }

  fetch(state, search) {
    var options = {}

    if (!state) {
      state = this.props.form.getFieldValue('state')
    }

    if (state != '-1') {
      options.state = parseInt(state)
    }

    if (search) {
      options.findName = search
    }

    console.log('options -->', options)

    this.props.fetchDeviceList(options)
  }

  onSearch(e) {
    this.fetch(null, e)
  }

  onChange(e) {
    this.fetch(e.target.value)
  }

  deleteDevice(params) {
    this.props.deleteDevice(params)
  }

  render() {
    console.log('device list -->', this.props.deviceList)

    const dataSource = this.props.deviceList.map(({ deviceId, deviceName, mac, deviceType, state, roomName, floorName, buildingName, houseName }) => {
      let installationSite = `${houseName || ''}${buildingName ? buildingName + '栋' : ''}${floorName ? floorName + '层' : ''}${roomName || ''}`
      let _deviceType = deviceTypeRefers[deviceType]

      if (installationSite) {
        installationSite += '：'
      }

      deviceName = deviceName || `${installationSite}${_deviceType}`

      return {
        key: deviceId,
        mac,
        installationSite,
        deviceType: _deviceType,
        deviceName,
        state,
        actions: {
          deviceId,
          deviceName,
          mac,
          deviceType
        }
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
      render: ({ deviceId, deviceName, deviceType, mac }) => {
        const url = `/device-lockDetail?lockId=${encodeURIComponent(deviceId)}`
        return (
          <span>
            <Link to={url} className="mr-20">
              <Tooltip title="详情">

                <Icon type="file-text" className="fs-16 br-50 icon-gray-bg w-text" style={{ padding: 6 }} />
              </Tooltip>

            </Link>
            <a className="mr-20" onClick={
              () => {
                // this.setState({
                //   deviceName,
                //   mac
                // })
                // pipe.openModal()
              }
            }>
              <Tooltip title="关联">

                <Icon type="paper-clip" className="fs-16 br-50 icon-gray-bg w-text" style={{ padding: 6 }} />


              </Tooltip>
            </a>

            <a className="mr-20" onClick={this.deleteDevice.bind(this, { deviceId, deviceType })}>
              <Tooltip title="删除">
                <Icon type="shop" className="fs-16 br-50 icon-gray-bg w-text" style={{ padding: 6 }} />
              </Tooltip>
            </a>
          </span>
        )
      }
    }]


    const { getFieldDecorator } = this.props.form

    return (
      <div id="MyDevice" className="container">
        <Form className="mb-20">
          <FormItem label="房间状态" labelCol={{ span: 1 }} wrapperCol={{ span: 23 }}>
            {
              getFieldDecorator('state', {
                initialValue: "-1",
              })(
                <RadioGroup className="custom-radio-button-group" onChange={this.onChange.bind(this)}>
                  <RadioButton value="-1">全部</RadioButton>
                  <RadioButton value="1">正常</RadioButton>
                  <RadioButton value="0">异常</RadioButton>
                </RadioGroup>
              )
            }
          </FormItem>

          <FormItem >
            <Row>
              <Col span={8}>
                {
                  getFieldDecorator('search')(
                    <Search style={{ height: 32 }} enterButton="搜索" placeholder="请输入设备名称/设备MAC/安装关联位置" onSearch={this.onSearch.bind(this)}></Search>
                  )
                }
              </Col>
              <Col className="tr">
                <Button type="primary">批量删除</Button>
              </Col>
            </Row>

          </FormItem>
        </Form>

        <Table dataSource={dataSource} columns={columns} rowSelection={{}} pagination={false}></Table>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  deviceList: state.deviceList || []
})
const mapDispatchToProps = dispatch => {
  return {
    fetchDeviceList: params => dispatch(fetchDeviceListData(params)),
    deleteDevice: params => dispatch(deleteDevice(params))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(MyDevice))