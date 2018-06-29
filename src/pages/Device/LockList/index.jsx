import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Row, Col, Form, Button, Table, Radio, Input, message } from 'antd'
import { fetchLockList, fetchLockStatistics, deleteDevice } from '../../../actions/device';
import Modal_Bind_Device_With_Room from '../../../components/Modal_Bind_Device_With_Room.jsx'
import isRequestSuccess from '../../../utils/isRequestSuccess';

const FormItem = Form.Item
const RadioGroup = Radio.Group
const RadioButton = Radio.Button
const Search = Input.Search

const lockTypeRefers = {
  1: '网关锁',
  2: 'WIFI锁',
  3: '蓝牙锁 ',
  4: 'NB锁'
}

const stateRefers = {
  3: '在线',
  4: '离线'
}

class LockList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      deviceName: null,
      mac: null,

      options: {},


      selectedRowKeys: [],

      lockStatistics: {},
      lockList: [],

      state: -1
    }

    this.modal = {}
  }

  componentWillMount() {
    let p1 = this.props.fetchLockStatistics(),
      p2 = this.props.fetchLockList()

    Promise.all([p1, p2]).then(ret => {
      let lockStatistics = isRequestSuccess(ret[0]) && ret[0].data.data || { onlineNum: 0, exceptionNum: 0 },
        lockList = isRequestSuccess(ret[1]) && ret[1].data.data.list || []

      this.setState({ lockStatistics, lockList })

    })
  }

  filteredFetchLockList() {
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

    this.props.fetchLockList(params).then(ret => {
      let lockList = isRequestSuccess(ret) && ret.data.data.list || []

      this.setState({ lockList })

    })
  }

  onRadioGroupChange(e) {
    this.setState({
      state: e.target.value
    }, this.filteredFetchLockList)
  }

  deleteLock(params) {
    this.props.deleteLock(params).then(ret => {
      if (isRequestSuccess(ret)) {
        message.success('删除门锁成功')
      } else {
        message.success(`删除门锁失败，${ret.data.reason}`)
      }
    })
  }

  batchDelete() {
    let keys = this.state.selectedRowKeys

    if (keys.length == 0) {
      return
    }

    this.deleteLock({
      deviceId: keys
    })
  }

  bindDevice(options) {
    this.setState({ options }, () => {
      this.modal.bindDeviceWithRoom.show()
    })
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


  render() {
    var { lockStatistics, lockList } = this.state


    const dataSource = lockList.map(({
      deviceId,
      deviceName,
      mac,
      lockType,
      state,
      roomName,
      floorName,
      buildingName,
      houseName
    }) => {
      let installationSite = `${houseName || ''}${buildingName ? buildingName + '栋' : ''}${floorName ? floorName + '层' : ''}${roomName || ''}`

      if (installationSite) {
        installationSite += '：'
      }

      let _lockType = lockTypeRefers[lockType]

      deviceName = deviceName || `${installationSite}${_lockType}`

      return {
        key: deviceId,
        mac,
        installationSite,
        lockType: _lockType,
        deviceName,
        state,
        actions: {
          deviceId,
          deviceName,
          mac,
          deviceType: lockType
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
      key: 'installationSite',
      dataIndex: 'installationSite'
    },
    {
      title: '设备类型',
      dataIndex: 'lockType',
      key: 'lockType'
    },
    {
      title: '状态',
      dataIndex: 'state',
      key: 'state',
      render: (state) => {
        return <span className={state == 3 ? '' : 'danger'}>{stateRefers[state] || '异常'}</span>
      }
    }, {
      title: '操作',
      key: 'actions',
      dataIndex: 'actions',
      render: ({ deviceId, deviceName, deviceType, mac }) => {
        const url = `/device-lock-detail?lockId=${encodeURIComponent(deviceId)}`
        return (
          <span>
            <Link to={url} className="mr-20">详情</Link>
            <a className="mr-20" onClick={this.bindDevice.bind(this, { deviceId, deviceName, deviceType, mac })}>关联</a>
            <a onClick={this.deleteLock.bind(this, { deviceId: [deviceId], deviceType })}>删除</a>
          </span>
        )
      }
    }];

    const rowSelection = {
      onChange: selectedRowKeys => {
        console.log('selected row keys -->', selectedRowKeys)
        this.setState({
          selectedRowKeys
        })
      }
    }

    const { getFieldDecorator } = this.props.form


    return (
      <div id="LockList">
        <div className="container">
          <Row className="tc">
            <Col span={12} style={{ borderRight: '1px solid #eee' }} >
              <span className="fs-14">在线门锁</span>
              <br />
              <span className="fs-24">
                <b className="health">{lockStatistics.onlineNum}</b>
              </span>
            </Col>
            <Col span={12}>
              <span className="fs-14">异常门锁</span>
              <br />
              <span className="fs-24">
                <b className="danger">{lockStatistics.exceptionNum}</b>
              </span>
            </Col>
          </Row>
        </div>

        <div className="container">
          <Form>
            <FormItem label="设备状态" labelCol={{ span: 1 }} wrapperCol={{ span: 23 }}>
              <RadioGroup defaultValue="-1" className="custom-radio-button-group" onChange={this.onRadioGroupChange.bind(this)}>
                <RadioButton value="-1">全部</RadioButton>
                <RadioButton value="1">正常</RadioButton>
                <RadioButton value="0">异常</RadioButton>
              </RadioGroup>
            </FormItem>

            <FormItem>
              <Row>
                <Col span={8}>
                  {
                    getFieldDecorator('findName')(
                      <Search style={{ height: 32 }} enterButton="搜索" placeholder="请输入设备名称/设备MAC/安装关联位置" onSearch={this.filteredFetchLockList.bind(this)} />
                    )
                  }
                </Col>
                <Col className="tr">
                  <Button type="primary" onClick={this.batchDelete.bind(this)}>批量删除</Button>
                </Col>
              </Row>
            </FormItem>
          </Form>

          <Table dataSource={dataSource} columns={columns} rowSelection={rowSelection} pagination={false} />
        </div>


        <ModalBindDeviceWithRoom onInit={this.onModalBindDeviceWithRoomInit.bind(this)} onOk={this.onModalBindDeviceWithRoomOk.bind(this)} options={this.state.options} />
      </div >
    )
  }
}

const mapDispatchToProps = dispatch => ({
  fetchLockList: params => dispatch(fetchLockList(params)),
  fetchLockStatistics: params => dispatch(fetchLockStatistics(params)),
  deleteLock: params => dispatch(deleteDevice(params))
})

export default connect(null, mapDispatchToProps)(Form.create()(LockList))