import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Row, Col, Form, Select, Button, Table, Divider, Radio, Input, Icon, Checkbox, Tooltip } from 'antd'
import { fetchLockList, fetchLockStatistics, deleteDevice } from '../../../actions/device';

import ModalBindDeviceWithRoom from './ModalBindDeviceWithRoom'

const FormItem = Form.Item
const Option = Select.Option
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
      selectedRowKeys: []
    }

    this.modal = {}
  }

  componentWillMount() {
    this.props.fetchLocStatistics()
    this.props.fetchLockList()
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

    this.props.fetchLockList(options)
  }

  onSearch(e) {
    this.fetch(null, e)
  }

  onChange(e) {
    this.fetch(e.target.value)
  }

  deleteLock(params) {
    // 门锁类型
    params.deviceType = 2

    this.props.deleteLock(params)
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

  bindDevice(params) {
    this.setState(params, () => {
      this.modal.bindDeviceWithRoom.show()
    })
  }

  onModalBindDeviceWithRoomInit(modal) {
    this.modal.bindDeviceWithRoom = modal
  }

  onModalBindDeviceWithRoomOk(form) {
    console.log('form -->', form)
  }


  render() {
    let lockStatistics = this.props.lockStatistics

    const dataSource = this.props.lockList.map(({
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
          mac
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
      render: ({ deviceId, deviceName, mac }) => {
        const url = `/device-lockDetail?lockId=${encodeURIComponent(deviceId)}`
        return (
          <span>
            <Link to={url} className="mr-20">详情</Link>
            <a className="mr-20" onClick={this.bindDevice.bind(this, { deviceName, mac })}>关联</a>
            <a onClick={this.deleteLock.bind(this, { deviceId: [deviceId] })}>删除</a>
          </span>
        )
      }
    }];

    let { deviceName, mac } = this.state

    let options = { deviceName, mac }

    const { getFieldDecorator } = this.props.form
    const rowSelection = {
      onChange: selectedRowKeys => {
        console.log('selected row keys -->', selectedRowKeys)
        this.setState({
          selectedRowKeys
        })
      }
    }

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

            <FormItem>
              <Row>
                <Col span={8}>
                  {
                    getFieldDecorator('search')(
                      <Search style={{ height: 32 }} enterButton="搜索" placeholder="请输入设备名称/设备MAC/安装关联位置" onSearch={this.onSearch.bind(this)}></Search>
                    )
                  }
                </Col>
                <Col className="tr">
                  <Button type="primary" onClick={this.batchDelete.bind(this)}>批量删除</Button>
                </Col>
              </Row>
            </FormItem>
          </Form>

          <Table dataSource={dataSource} columns={columns} rowSelection={rowSelection} pagination={false}></Table>

        </div>


        <ModalBindDeviceWithRoom options={options} onInit={this.onModalBindDeviceWithRoomInit.bind(this)} onOk={this.onModalBindDeviceWithRoomOk.bind(this)} />
      </div >
    )
  }
}

const mapStateToProps = state => ({
  lockStatistics: state.lockStatistics || {
    onlineNum: 0,
    exceptionNum: 0
  },
  lockList: state.lockList || []
})
const mapDispatchToProps = dispatch => {
  return {
    fetchLockList: params => dispatch(fetchLockList(params)),
    fetchLocStatistics: params => dispatch(fetchLockStatistics(params)),
    deleteLock: params => dispatch(deleteDevice(params))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(LockList))