import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Form, Table, Button, Input, Radio, Icon, Row, Col, Tooltip, message } from 'antd'
import { fetchDeviceList, deleteDevice, batchDeleteDevice, bindDevice } from '../../../actions/device';
import { roomAddDevice } from '../../../actions/property'
import isRequestSuccess from '../../../utils/isRequestSuccess';
import ModalBindDeviceWithRoom from './Modal_Bind_Device_With_Room'
import './index.less'

const FormItem = Form.Item
const RadioGroup = Radio.Group
const RadioButton = Radio.Button
const Search = Input.Search

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
      selectedRows: [],

      deviceList: [],

      options: {},

      state: -1
    }

    this.modal = {}
  }

  componentWillMount() {
    this.props.fetchDeviceList().then(ret => {
      if (isRequestSuccess(ret)) {
        let deviceList = ret.data.data.list || []

        this.setState({ deviceList })
      }
    })
  }

  onRadioGroupChange(e) {
    this.setState({
      state: e.target.value
    }, this.filteredFetchDeviceList)
  }

  onSearch(e) {
    this.setState({
      findName: e
    }, this.filteredFetchDeviceList)
  }

  filteredFetchDeviceList() {
    var params = {}

    var { state } = this.state

    if (state && state != '-1') {
      params.state = state
    }

    let findName = this.props.form.getFieldValue('findName')
    if (findName) {
      params.findName = findName
    }

    console.log('params -->', params)

    this.props.fetchDeviceList(params).then(ret => {
      if (isRequestSuccess(ret)) {
        let deviceList = ret.data.data.list || []

        this.setState({
          deviceList
        })
      }
    })
  }

  deleteDevice(params) {
    this.props.deleteDevice(params).then(ret => {
      if (isRequestSuccess(ret)) {
        message.success('删除设备成功')
        this.filteredFetchDeviceList()
      } else {
        message.error(`删除设备失败，${ret.data.reason}`)
      }
    })
  }

  batchDeleteDevice(e) {
    let rows = this.state.selectedRows

    console.log('rows -->', rows)

    if (rows.length == 0) {
      return
    }

    let list = rows.map(row => {
      var { deviceId, deviceType } = row

      return { deviceId, deviceType }
    })

    let params = { list }

    console.log('params -->', params)

    this.props.batchDeleteDevice(params).then(ret => {
      if (isRequestSuccess(ret)) {
        message.success('批量删除设备成功')
        this.filteredFetchDeviceList()
      } else {
        message.error(`批量删除设备失败，${ret.data.reason}`)
      }
    })
  }

  bindDevice(options) {
    this.setState({ options }, this.callModalBindDeviceWithRoom)
  }


  onModalBindDeviceWithRoomInit(modal) {
    this.modal.bindDeviceWithRoom = modal
  }

  onModalBindDeviceWithRoomOk(form) {
    console.log('form -->', form)

    let { houseId, buildingId, floorId, roomId, rename, deviceId, deviceType } = form
    let params = {
      deviceType,
      deviceId,
      deviceName: rename
    }

    if (roomId) {
      params.level = 4
      params.id = roomId
    } else if (floorId) {
      params.level = 3
      params.id = floorId
    } else if (buildingId) {
      params.level = 2
      params.id = buildingId
    } else if (houseId) {
      params.level = 1
      params.id = houseId
    } else {
      message.error('设备关联失败，id值不能为空')
      return
    }

    this.props.bindDevice(params).then(ret => {
      if (isRequestSuccess(ret)) {
        message.success('设备关联成功')
      } else {
        message.success(`设备关联失败，${ret.data.reason}`)
      }
    })

  }

  callModalBindDeviceWithRoom() {
    this.modal.bindDeviceWithRoom.show()
  }

  render() {
    let { deviceList } = this.state

    const dataSource = deviceList.map(({
      deviceId,
      deviceName,
      mac,
      deviceType,
      state,
      roomName,
      floorName,
      buildingName,
      houseName
    }) => {
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
        deviceType,
        deviceName,
        state,
        deviceId,
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
      key: 'deviceType',
      render: deviceType => (<span>{deviceTypeRefers[deviceType]}</span>)
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
        const url = `/device-lock-detail?lockId=${encodeURIComponent(deviceId)}`
        return (
          <span>
            {
              deviceType == 2 ?
                <span>
                  <Link to={url} className="mr-20">详情</Link>
                  <a className="mr-20" onClick={this.bindDevice.bind(this, { deviceId, deviceName, deviceType, mac })}>关联</a>
                </span> : null
            }
            <a onClick={this.deleteDevice.bind(this, { deviceId: [deviceId], deviceType })}>删除</a>
          </span>
        )
      }
    }]

    const rowSelection = {
      onChange: (_, selectedRows) => {
        this.setState({
          selectedRows
        })
      }
    }

    const { getFieldDecorator } = this.props.form

    return (
      <div id="MyDevice" className="container">
        <Form className="mb-20">
          <FormItem label="房间状态" labelCol={{ span: 1 }} wrapperCol={{ span: 23 }}>
            <RadioGroup defaultValue="-1" className="custom-radio-button-group" onChange={this.onRadioGroupChange.bind(this)}>
              <RadioButton value="-1">全部</RadioButton>
              <RadioButton value="1">正常</RadioButton>
              <RadioButton value="0">异常</RadioButton>
            </RadioGroup>
          </FormItem>

          <FormItem >
            <Row>
              <Col span={8}>
                {
                  getFieldDecorator('findName')(
                    <Search style={{ height: 32 }} enterButton="搜索" onSearch={this.filteredFetchDeviceList.bind(this)} />
                  )
                }
              </Col>
              <Col className="tr">
                <Button type="primary" onClick={this.batchDeleteDevice.bind(this)}>批量删除</Button>
              </Col>
            </Row>

          </FormItem>
        </Form>

        <Table dataSource={dataSource} columns={columns} rowSelection={rowSelection} pagination={false} />

        <ModalBindDeviceWithRoom onInit={this.onModalBindDeviceWithRoomInit.bind(this)} onOk={this.onModalBindDeviceWithRoomOk.bind(this)} options={this.state.options} />
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  fetchDeviceList: params => dispatch(fetchDeviceList(params)),
  deleteDevice: params => dispatch(deleteDevice(params)),
  batchDeleteDevice: params => dispatch(batchDeleteDevice(params)),
  bindDevice: params => dispatch(roomAddDevice(params))
})

export default connect(null, mapDispatchToProps)(Form.create()(MyDevice))